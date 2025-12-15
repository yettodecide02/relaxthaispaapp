import{r as d,j as n,l as U}from"./index-N-Mm9I8x.js";let Q={data:""},X=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Q},ee=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,te=/\/\*[^]*?\*\/|  +/g,_=/\n+/g,O=(e,t)=>{let a="",r="",o="";for(let i in e){let s=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+s+";":r+=i[1]=="f"?O(s,i):i+"{"+O(s,i[1]=="k"?"":t)+"}":typeof s=="object"?r+=O(s,t?t.replace(/([^,])+/g,c=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,m=>/&/.test(m)?m.replace(/&/g,c):c?c+" "+m:m)):i):s!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=O.p?O.p(i,s):i+":"+s+";")}return a+(t&&o?t+"{"+o+"}":o)+r},C={},q=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+q(e[a]);return t}return e},ae=(e,t,a,r,o)=>{let i=q(e),s=C[i]||(C[i]=(m=>{let p=0,f=11;for(;p<m.length;)f=101*f+m.charCodeAt(p++)>>>0;return"go"+f})(i));if(!C[s]){let m=i!==e?e:(p=>{let f,l,g=[{}];for(;f=ee.exec(p.replace(te,""));)f[4]?g.shift():f[3]?(l=f[3].replace(_," ").trim(),g.unshift(g[0][l]=g[0][l]||{})):g[0][f[1]]=f[2].replace(_," ").trim();return g[0]})(e);C[s]=O(o?{["@keyframes "+s]:m}:m,a?"":"."+s)}let c=a&&C.g?C.g:null;return a&&(C.g=C[s]),((m,p,f,l)=>{l?p.data=p.data.replace(l,m):p.data.indexOf(m)===-1&&(p.data=f?m+p.data:p.data+m)})(C[s],t,r,c),s},se=(e,t,a)=>e.reduce((r,o,i)=>{let s=t[i];if(s&&s.call){let c=s(a),m=c&&c.props&&c.props.className||/^go/.test(c)&&c;s=m?"."+m:c&&typeof c=="object"?c.props?"":O(c,""):c===!1?"":c}return r+o+(s??"")},"");function L(e){let t=this||{},a=e.call?e(t.p):e;return ae(a.unshift?a.raw?se(a,[].slice.call(arguments,1),t.p):a.reduce((r,o)=>Object.assign(r,o&&o.call?o(t.p):o),{}):a,X(t.target),t.g,t.o,t.k)}let B,M,P;L.bind({g:1});let k=L.bind({k:1});function oe(e,t,a,r){O.p=t,B=e,M=a,P=r}function S(e,t){let a=this||{};return function(){let r=arguments;function o(i,s){let c=Object.assign({},i),m=c.className||o.className;a.p=Object.assign({theme:M&&M()},c),a.o=/ *go\d+/.test(m),c.className=L.apply(a,r)+(m?" "+m:"");let p=e;return e[0]&&(p=c.as||e,delete c.as),P&&p[0]&&P(c),B(p,c)}return t?t(o):o}}var re=e=>typeof e=="function",T=(e,t)=>re(e)?e(t):e,ie=(()=>{let e=0;return()=>(++e).toString()})(),J=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ne=20,R="default",V=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:r}=t;return V(e,{type:e.toasts.find(s=>s.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,dismissed:!0,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+i}))}}},D=[],W={toasts:[],pausedAt:void 0,settings:{toastLimit:ne}},j={},Y=(e,t=R)=>{j[t]=V(j[t]||W,e),D.forEach(([a,r])=>{a===t&&r(j[t])})},Z=e=>Object.keys(j).forEach(t=>Y(e,t)),le=e=>Object.keys(j).find(t=>j[t].toasts.some(a=>a.id===e)),z=(e=R)=>t=>{Y(t,e)},ce={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},de=(e={},t=R)=>{let[a,r]=d.useState(j[t]||W),o=d.useRef(j[t]);d.useEffect(()=>(o.current!==j[t]&&r(j[t]),D.push([t,r]),()=>{let s=D.findIndex(([c])=>c===t);s>-1&&D.splice(s,1)}),[t]);let i=a.toasts.map(s=>{var c,m,p;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((c=e[s.type])==null?void 0:c.removeDelay)||e?.removeDelay,duration:s.duration||((m=e[s.type])==null?void 0:m.duration)||e?.duration||ce[s.type],style:{...e.style,...(p=e[s.type])==null?void 0:p.style,...s.style}}});return{...a,toasts:i}},me=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||ie()}),A=e=>(t,a)=>{let r=me(t,e,a);return z(r.toasterId||le(r.id))({type:2,toast:r}),r.id},b=(e,t)=>A("blank")(e,t);b.error=A("error");b.success=A("success");b.loading=A("loading");b.custom=A("custom");b.dismiss=(e,t)=>{let a={type:3,toastId:e};t?z(t)(a):Z(a)};b.dismissAll=e=>b.dismiss(void 0,e);b.remove=(e,t)=>{let a={type:4,toastId:e};t?z(t)(a):Z(a)};b.removeAll=e=>b.remove(void 0,e);b.promise=(e,t,a)=>{let r=b.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?T(t.success,o):void 0;return i?b.success(i,{id:r,...a,...a?.success}):b.dismiss(r),o}).catch(o=>{let i=t.error?T(t.error,o):void 0;i?b.error(i,{id:r,...a,...a?.error}):b.dismiss(r)}),e};var ue=1e3,pe=(e,t="default")=>{let{toasts:a,pausedAt:r}=de(e,t),o=d.useRef(new Map).current,i=d.useCallback((l,g=ue)=>{if(o.has(l))return;let u=setTimeout(()=>{o.delete(l),s({type:4,toastId:l})},g);o.set(l,u)},[]);d.useEffect(()=>{if(r)return;let l=Date.now(),g=a.map(u=>{if(u.duration===1/0)return;let h=(u.duration||0)+u.pauseDuration-(l-u.createdAt);if(h<0){u.visible&&b.dismiss(u.id);return}return setTimeout(()=>b.dismiss(u.id,t),h)});return()=>{g.forEach(u=>u&&clearTimeout(u))}},[a,r,t]);let s=d.useCallback(z(t),[t]),c=d.useCallback(()=>{s({type:5,time:Date.now()})},[s]),m=d.useCallback((l,g)=>{s({type:1,toast:{id:l,height:g}})},[s]),p=d.useCallback(()=>{r&&s({type:6,time:Date.now()})},[r,s]),f=d.useCallback((l,g)=>{let{reverseOrder:u=!1,gutter:h=8,defaultPosition:y}=g||{},x=a.filter(v=>(v.position||y)===(l.position||y)&&v.height),N=x.findIndex(v=>v.id===l.id),w=x.filter((v,E)=>E<N&&v.visible).length;return x.filter(v=>v.visible).slice(...u?[w+1]:[0,w]).reduce((v,E)=>v+(E.height||0)+h,0)},[a]);return d.useEffect(()=>{a.forEach(l=>{if(l.dismissed)i(l.id,l.removeDelay);else{let g=o.get(l.id);g&&(clearTimeout(g),o.delete(l.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:m,startPause:c,endPause:p,calculateOffset:f}}},fe=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,he=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ge=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,be=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${he} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ge} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,xe=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ye=S("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${xe} 1s linear infinite;
`,ve=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,we=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,je=S("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ve} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${we} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Ne=S("div")`
  position: absolute;
`,Ce=S("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ke=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=S("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ke} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Oe=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return t!==void 0?typeof t=="string"?d.createElement(Ee,null,t):t:a==="blank"?null:d.createElement(Ce,null,d.createElement(ye,{...r}),a!=="loading"&&d.createElement(Ne,null,a==="error"?d.createElement(be,{...r}):d.createElement(je,{...r})))},Se=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ie=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ae="0%{opacity:0;} 100%{opacity:1;}",$e="0%{opacity:1;} 100%{opacity:0;}",De=S("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Te=S("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Le=(e,t)=>{let a=e.includes("top")?1:-1,[r,o]=J()?[Ae,$e]:[Se(a),Ie(a)];return{animation:t?`${k(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ze=d.memo(({toast:e,position:t,style:a,children:r})=>{let o=e.height?Le(e.position||t||"top-center",e.visible):{opacity:0},i=d.createElement(Oe,{toast:e}),s=d.createElement(Te,{...e.ariaProps},T(e.message,e));return d.createElement(De,{className:e.className,style:{...o,...a,...e.style}},typeof r=="function"?r({icon:i,message:s}):d.createElement(d.Fragment,null,i,s))});oe(d.createElement);var Me=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let i=d.useCallback(s=>{if(s){let c=()=>{let m=s.getBoundingClientRect().height;r(e,m)};c(),new MutationObserver(c).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return d.createElement("div",{ref:i,className:t,style:a},o)},Pe=(e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:J()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...o}},Re=L`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,H=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,toasterId:i,containerStyle:s,containerClassName:c})=>{let{toasts:m,handlers:p}=pe(a,i);return d.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...s},className:c,onMouseEnter:p.startPause,onMouseLeave:p.endPause},m.map(f=>{let l=f.position||t,g=p.calculateOffset(f,{reverseOrder:e,gutter:r,defaultPosition:t}),u=Pe(l,g);return d.createElement(Me,{id:f.id,key:f.id,onHeightUpdate:p.updateHeight,className:f.visible?Re:"",style:u},f.type==="custom"?T(f.message,f):o?o(f):d.createElement(ze,{toast:f,position:l}))}))},I=b;const Ue=()=>{const[e,t]=d.useState(""),[a,r]=d.useState(!1),[o,i]=d.useState({name:"",roomNo:"",address:"",contact:"",paymentMode:"",timeIn:"",timeOut:"",therapyName:"",duration:"",therapist:"",date:new Date().toISOString().split("T")[0],membership:"",price:""}),[s,c]=d.useState(!1);d.useEffect(()=>{const u=localStorage.getItem("adminAuth");if(localStorage.getItem("token")&&u){const{timestamp:y}=JSON.parse(u),x=10080*60*1e3;Date.now()-y<x?r(!0):(localStorage.removeItem("adminAuth"),localStorage.removeItem("token"))}},[]);const m=async()=>{const u=await fetch("/api/admin/check-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})});u.ok?(r(!0),localStorage.setItem("adminAuth",JSON.stringify({timestamp:Date.now()})),localStorage.setItem("token",(await u.json()).token)):I.error("Incorrect password")},p=async u=>{try{const h=await fetch(u,{method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"application/json"}}),y=h.headers.get("Content-Type");if(y&&y.includes("application/json")){const E=await h.json();I.error(E.message||"Nothing to download.");return}const x=await h.blob();if(x.size===0){I.error("No data available to download.");return}const N=URL.createObjectURL(x),w=document.createElement("a");w.href=N;const v=h.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g,"")||"download.xlsx";w.download=v,document.body.appendChild(w),w.click(),w.remove(),URL.revokeObjectURL(N),I.success("File downloaded successfully!")}catch{I.error("Error downloading file.")}},f=(u,h)=>{if(!u||!h)return"";const[y,x]=u.split(":").map(Number),[N,w]=h.split(":").map(Number),v=y*60+x,E=N*60+w;if(E<=v)return"";const F=E-v,G=Math.floor(F/60),K=F%60;return`${G}h ${K}m`},l=u=>{const{name:h,value:y}=u.target;i(x=>{const N={...x,[h]:y};return(h==="timeIn"||h==="timeOut")&&(N.duration=f(h==="timeIn"?y:x.timeIn,h==="timeOut"?y:x.timeOut)),N})},g=async u=>{u.preventDefault(),c(!0);try{const h=await fetch("/api/admin/submit",{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,"Content-Type":"application/json"},body:JSON.stringify(o)});if(!h.ok)throw new Error("Submission failed");const y=await h.blob(),x=window.URL.createObjectURL(y);window.open(x,"_blank"),I.success("Application submitted successfully!"),i({name:"",roomNo:"",address:"",contact:"",paymentMode:"",timeIn:"",timeOut:"",therapyName:"",duration:"",therapist:"",date:"",membership:""})}catch{I.error("Error submitting application")}c(!1)};return a?n.jsxs(n.Fragment,{children:[n.jsx(H,{position:"top-center"}),n.jsxs("div",{className:"bg-neutral-50 min-h-screen ",children:[n.jsx("div",{className:"flex justify-center",children:n.jsx("img",{src:U,alt:"Logo",className:"object-contain mb-4"})}),n.jsx("h1",{className:"text-2xl sm:text-3xl font-bold mb-6 text-center text-neutral-800",children:"Admin Dashboard"}),n.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center flex-wrap gap-4 mb-6",children:[n.jsx("button",{onClick:()=>p("/api/export"),className:"bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-lg text-white font-medium w-full sm:w-auto shadow",children:"Today's Applications"}),n.jsx("button",{onClick:()=>p("/api/export-all"),className:"bg-amber-600 hover:bg-amber-700 px-5 py-3 rounded-lg text-white font-medium w-full sm:w-auto shadow",children:"All Applications"}),n.jsx("button",{onClick:()=>p("/api/admin/export"),className:"bg-amber-700 hover:bg-amber-800 px-5 py-3 rounded-lg text-white font-medium w-full sm:w-auto shadow",children:"Customer Visits Report"})]}),n.jsxs("div",{className:"max-w-3xl mx-auto bg-white shadow-md p-4 sm:p-6 rounded-lg border border-neutral-300",children:[n.jsx("h2",{className:"text-xl sm:text-2xl font-semibold mb-4 text-neutral-800",children:"Add Customer Visit"}),n.jsxs("form",{onSubmit:g,className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:[n.jsx("input",{name:"name",value:o.name,onChange:l,className:"input",placeholder:"Name*",required:!0}),n.jsx("input",{name:"roomNo",value:o.roomNo,onChange:l,className:"input",placeholder:"Room No"}),n.jsx("input",{name:"address",value:o.address,onChange:l,className:"input",placeholder:"Address"}),n.jsx("input",{name:"contact",value:o.contact,onChange:l,className:"input",placeholder:"Contact"}),n.jsx("input",{name:"paymentMode",value:o.paymentMode,onChange:l,className:"input",placeholder:"Mode of Payment*",required:!0}),n.jsx("input",{name:"therapyName",value:o.therapyName,onChange:l,className:"input",placeholder:"Name of Therapy*"}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-sm text-neutral-600 mb-1",children:"Time In"}),n.jsx("input",{type:"time",name:"timeIn",value:o.timeIn,onChange:l,className:"input"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-sm text-neutral-600 mb-1",children:"Time Out"}),n.jsx("input",{type:"time",name:"timeOut",value:o.timeOut,onChange:l,className:"input"})]}),n.jsx("input",{name:"duration",value:o.duration,onChange:l,className:"input",placeholder:"Time Duration"}),n.jsx("input",{name:"therapist",value:o.therapist,onChange:l,className:"input",placeholder:"Therapist Name*",required:!0}),n.jsx("input",{type:"date",name:"date",value:o.date,onChange:l,className:"input"}),n.jsx("input",{name:"membership",value:o.membership,onChange:l,className:"input",placeholder:"Membership Card"}),n.jsx("input",{name:"price",value:o.price,onChange:l,className:"input",placeholder:"Price*",type:"number",required:!0}),n.jsx("button",{type:"submit",disabled:s,className:"mt-4 sm:col-span-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded text-lg",children:s?"Submitting...":"Submit"})]})]})]})]}):n.jsxs(n.Fragment,{children:[n.jsx(H,{position:"top-center"}),n.jsx("div",{className:"flex h-screen items-center justify-center bg-neutral-100 px-4",children:n.jsxs("div",{className:"bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-xs border border-neutral-300",children:[n.jsx("div",{className:"flex justify-center mb-4",children:n.jsx("img",{src:U,loading:"lazy",alt:"Logo",className:"object-contain"})}),n.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-center text-neutral-800 mb-4",children:"Admin Login"}),n.jsx("input",{type:"password",placeholder:"Enter Password",className:"w-full border border-neutral-300 rounded px-3 py-2 mb-4 focus:outline-amber-500",value:e,onChange:u=>t(u.target.value)}),n.jsx("button",{onClick:m,className:"w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded",children:"Login"})]})})]})};export{Ue as default};
