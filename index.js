const express = require("express");
const path = require("path");
const cors = require("cors");
const PDFDocument = require("pdfkit");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  appendToSheet,
  getTodayRows,
  appendAdminToSheet,
} = require("./utils/sheets");
const { sendNotification } = require("./utils/sendNotification");
const { exportToExcel, exportAdminExcel } = require("./utils/exportExcel");
const { sendWhatsAppMessage } = require("./utils/sendWhatsApp.js");
const { getAllRows } = require("./utils/sheets");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "robots.txt"));
});

app.post("/api/submit", async (req, res) => {
  try {
    const { service, date, time, firstName, email, phone, message } = req.body;

    if (!service || !date || !time || !firstName || !phone) {
      return res.status(400).json({
        success: false,
        error:
          "Please fill all required fields (service, date, time, name, phone).",
      });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Invalid email format.",
        });
      }
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number format.",
      });
    }

    const timestamp = new Date().toISOString();
    const formData = {
      timestamp,
      service,
      date,
      time,
      firstName,
      email: email || "N/A",
      phone,
      message: message || "",
    };

    const sheetResult = await appendToSheet(formData);

    if (!sheetResult.success) {
      throw new Error(sheetResult.error);
    }

    try {
      await sendNotification(formData);
      const combinedMessage = `
      👤 Name: ${firstName}
      📞 Phone: ${phone}
      🛠 Service: ${service}
      📅 Date & Time: ${date} ${time}
      💬 Message: ${message || "No message"}`
;
      await sendWhatsAppMessage({
        to: process.env.ADMIN_WA_NUMBER,
        templateName: "form_submission_alert",
        params: [combinedMessage],
      });
    } catch (notifError) {
      console.error("WhatsApp notification failed:", notifError.message);
    }

    res.status(200).json({
      success: true,
      message: "Appointment request submitted! We'll contact you soon.",
      data: {
        id: sheetResult.rowNumber,
        timestamp: formData.timestamp,
      },
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.post("/api/admin/check-password", (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { password } = req.body;
  if (password === adminPassword) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
    res.status(200).json({ ok: true, token });
  } else {
    res.status(401).json({ ok: false, error: "Incorrect password" });
  }
});

app.use("/api", adminAuth);

app.post("/api/admin/submit", async (req, res) => {
  try {
    const {
      name,
      roomNo,
      address,
      contact,
      paymentMode,
      timeIn,
      timeOut,
      therapyName,
      duration,
      therapist,
      date,
      membership,
      price,
    } = req.body;

    if (!name || !therapyName || !date || !price || !paymentMode) {
      return res.status(400).json({
        success: false,
        error:
          "Please fill all required fields (name, therapy name, date, price, payment mode).",
      });
    }

    const sheetResult = await appendAdminToSheet(req.body);
    if (!sheetResult.success) throw new Error("Sheet failed");

    const doc = new PDFDocument({ size: "A4", margin: 30 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="therapy-form.pdf"');

    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = 40;
    let y = margin;

    doc
      .roundedRect(
        margin - 15,
        margin - 15,
        pageWidth - 50,
        pageHeight - 50,
        10
      )
      .lineWidth(1)
      .stroke("#999");

    const logoPath = path.join(process.cwd(), "dist/logo.png");
    doc.image(logoPath, margin, y, { width: 60 });

    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor("#2c2c2c")
      .text("RELAX THAI SPA", margin + 80, y + 10);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#555")
      .text("Wellness • Therapy • Relaxation", margin + 80, y + 40);

    doc.fontSize(10).text(`Date: ${date || ""}`, pageWidth - 180, y + 20);

    y += 90;

    doc
      .moveTo(margin, y)
      .lineTo(pageWidth - margin, y)
      .stroke("#ccc");
    y += 25;

    const drawField = (label, value, x, y, w = 240) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333")
        .text(label, x, y);
      doc.roundedRect(x, y + 14, w, 26, 5).stroke("#aaa");
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#000")
        .text(value || "", x + 8, y + 22);
    };

    drawField("Client Name", name, margin, y);
    drawField("Membership Card No", membership, pageWidth / 2 + 10, y, 200);
    y += 55;
    drawField("Room No", roomNo, margin, y, 150);

    y += 55;

    drawField("Address", address, margin, y, pageWidth - margin * 2);

    y += 55;

    drawField("Contact No", contact, margin, y);
    drawField("Payment Mode", paymentMode, pageWidth / 2 + 10, y);

    y += 70;

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#2c2c2c")
      .text("Service Details", margin, y);

    y += 15;
    doc
      .moveTo(margin, y)
      .lineTo(pageWidth - margin, y)
      .stroke("#ccc");
    y += 25;

    const drawBox = (label, value, x, y, w = 180, h = 30) => {
      doc.font("Helvetica").fontSize(10).fillColor("#333").text(label, x, y);
      doc.roundedRect(x, y + 14, w, h, 5).stroke("#aaa");
      doc.text(value || "", x + 8, y + 24);
    };

    drawBox("Time In", timeIn, margin, y);
    drawBox("Time Out", timeOut, margin, y + 55);
    drawBox("Duration", duration, margin, y + 110);
    drawBox("Price", price, margin, y + 165);

    drawBox("Therapy Name", therapyName, pageWidth / 2 + 10, y, 240, 70);

    drawBox("Therapist", therapist, pageWidth / 2 + 10, y + 95, 240);

    y += 260;

    doc
      .fontSize(10)
      .fillColor("#444")
      .text("Customer Signature", pageWidth - 200, y);

    doc
      .moveTo(pageWidth - 260, y + 15)
      .lineTo(pageWidth - margin, y + 15)
      .stroke("#333");

    doc
      .fontSize(9)
      .fillColor("#777")
      .text(
        "Thank you for choosing Relax Thai Spa. We wish you wellness & relaxation.",
        margin,
        pageHeight - 80,
        { align: "center", width: pageWidth - margin * 2 }
      );

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/api/admin/export", async (req, res) => {
  try {
    const rows = await getAllRows("admin");

    if (!rows || rows.length <= 1) {
      return res.status(404).json({
        success: false,
        message: "No admin data found",
      });
    }

    const excelBuffer = await exportAdminExcel(rows);
    const filename = `customervisits.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.send(excelBuffer);
  } catch (error) {
    console.error("Error exporting admin excel:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export admin data",
      error: error.message,
    });
  }
});

app.get("/api/export", async (req, res) => {
  try {
    const rows = await getTodayRows();
    if (!rows || rows.length <= 1) {
      return res.status(200).json({
        success: false,
        message: "No submissions found for today.",
      });
    }

    const excelBuffer = await exportToExcel(rows);
    const today = new Date().toISOString().split("T")[0];
    const filename = `relax-thai-spa-bookings-${today}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(excelBuffer);
  } catch (error) {
    console.error("❌ Error exporting data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export data.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.get("/api/export-all", async (req, res) => {
  try {
    const rows = await getAllRows();

    if (!rows || rows.length <= 1) {
      return res.status(404).json({
        success: false,
        message: "No data found in the sheet.",
      });
    }

    const excelBuffer = await exportToExcel(rows);
    const filename = `relax-thai-spa-bookings-all.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(excelBuffer);
  } catch (error) {
    console.error("❌ Error exporting ALL data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export all data.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    sheetId: process.env.SHEET_ID ? "configured" : "missing",
    adminEmail: process.env.ADMIN_EMAIL ? "configured" : "missing",
  });
});

app.get("/api/stats", async (req, res) => {
  try {
    const rows = await getTodayRows();
    const count = rows.length > 1 ? rows.length - 1 : 0;

    res.json({
      success: true,
      today: new Date().toISOString().split("T")[0],
      bookings: count,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics.",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Relax Thai Spa app listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received, shutting down gracefully");
  process.exit(0);
});
