(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1057:(e,t,a)=>{"use strict";let i;a.r(t),a.d(t,{default:()=>g});var r=a(5155),l=a(2115),n=a(3915),s=a(3004),o=a(858),c=a(3422),d=a.n(c),u=a(5411),p=a.n(u),m=a(9509);p().accessToken=m.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN||"pk.eyJ1IjoiZGVyZXBlbnRlIiwiYSI6ImNtOWFjejdpMDA0NHcydG9nYmU2b2ZqczUifQ.grOqIV3Cp0nlHLKOSUuAzQ";let b={apiKey:m.env.NEXT_PUBLIC_FIREBASE_API_KEY||"AIzaSyBvv0sR3gp5hBXchYsm2LQWYHo77aOMvhg",authDomain:m.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN||"breadcrumbs-db570.firebaseapp.com",projectId:m.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID||"breadcrumbs-db570",storageBucket:m.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET||"breadcrumbs-db570.appspot.com"},S=(0,n.Wp)(b);(0,s.xI)(S);try{i=(0,o.c7)(S)}catch(e){console.error("Firebase Storage failed to initialize:",e),i=null}function g(){let[e,t]=(0,l.useState)(null),[a,n]=(0,l.useState)([]),[s,c]=(0,l.useState)([]);(0,l.useEffect)(()=>{e||t(new(p()).Map({container:"map",style:"mapbox://styles/mapbox/dark-v10",center:[139.6917,35.6895],zoom:10}))},[e]);let u=async t=>{if(!i)return void alert("Firebase Storage not available.");let a=Array.from(t.target.files||[]),r=[];for(let t of a){let a=await t.arrayBuffer(),l=d().readFromBinaryFile(a);if((null==l?void 0:l.GPSLatitude)&&(null==l?void 0:l.GPSLongitude)){let a=l.GPSLatitude[0]+l.GPSLatitude[1]/60+l.GPSLatitude[2]/3600,n=l.GPSLongitude[0]+l.GPSLongitude[1]/60+l.GPSLongitude[2]/3600;try{let s=(0,o.KR)(i,"images/".concat(t.name));await (0,o.D)(s,t);let c=await (0,o.qk)(s),d={lat:a,lon:n,url:c,timestamp:l.DateTimeOriginal||new Date().toISOString()};r.push(d),e&&new(p()).Marker().setLngLat([n,a]).addTo(e)}catch(e){console.error("Upload error:",e)}}}let l=r.sort((e,t)=>new Date(e.timestamp).getTime()-new Date(t.timestamp).getTime());n(l),c(l)};return(0,r.jsxs)("div",{className:"w-screen h-screen bg-black text-white",children:[(0,r.jsxs)("div",{className:"absolute top-4 left-4 z-10 space-y-2",children:[(0,r.jsx)("input",{type:"file",accept:"image/*",multiple:!0,onChange:u,className:"bg-white text-black rounded px-2 py-1"}),(0,r.jsx)("button",{onClick:()=>{if(!e||0===s.length)return;let t=0,a=()=>{if(t>=s.length)return;let{lat:i,lon:r,url:l}=s[t];new(p()).Popup().setLngLat([r,i]).setHTML('<img src="'.concat(l,'" width="200" style="border-radius:12px;" />')).addTo(e),t++,setTimeout(a,2e3)};a()},className:"bg-white text-black rounded px-2 py-1",children:"Start Slideshow"})]}),(0,r.jsx)("div",{id:"map",className:"w-full h-full"})]})}},8505:(e,t,a)=>{Promise.resolve().then(a.bind(a,1057))}},e=>{var t=t=>e(e.s=t);e.O(0,[240,765,936,441,684,358],()=>t(8505)),_N_E=e.O()}]);