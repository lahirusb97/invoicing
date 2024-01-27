(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{60024:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return i.Z},getTypographyUtilityClass:function(){return n.f},typographyClasses:function(){return n.Z}});var i=a(85269),n=a(61041)},19142:function(e,t,a){Promise.resolve().then(a.bind(a,60024)),Promise.resolve().then(a.bind(a,72148)),Promise.resolve().then(a.bind(a,6344))},6344:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var i=a(57437),n=a(2265),r=a(57292),o=a(52653),s=a(33533),l=a(93046),d=a(90517),c=a(67070);let h=n.forwardRef(function(e,t){return(0,i.jsx)(c.Z,{elevation:6,ref:t,variant:"filled",...e})});function m(){let e=(0,l.I0)(),t=(0,l.v9)(e=>e.snack_bar.OPEN),a=(0,l.v9)(e=>e.snack_bar.TYPE),c=(0,l.v9)(e=>e.snack_bar.MSG),m=(t,a)=>{"clickaway"!==a&&e((0,d.At)())},u=(0,i.jsx)(n.Fragment,{children:(0,i.jsx)(o.Z,{size:"medium","aria-label":"close",color:"inherit",onClick:m,children:(0,i.jsx)(s.Z,{fontSize:"small"})})});return(0,i.jsx)("div",{children:(0,i.jsx)(r.Z,{open:t,autoHideDuration:2e3,onClose:m,action:u,anchorOrigin:{vertical:"bottom",horizontal:"center"},children:(0,i.jsx)(h,{onClose:m,severity:a,sx:{width:"100%"},children:c})})})}},72148:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return ee}});var i=a(57437),n=a(2265),r=a(35843),o=a(20791),s=a(13428),l=a(57042),d=a(95600),c=a(87927),h=a(26520),m=a(25702);function u(e){return(0,m.Z)("MuiFormGroup",e)}(0,h.Z)("MuiFormGroup",["root","row","error"]);var g=a(59592),x=a(54379);let p=["className","row"],f=e=>{let{classes:t,row:a,error:i}=e;return(0,d.Z)({root:["root",a&&"row",i&&"error"]},u,t)},y=(0,r.ZP)("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.row&&t.row]}})(({ownerState:e})=>(0,s.Z)({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),j=n.forwardRef(function(e,t){let a=(0,c.Z)({props:e,name:"MuiFormGroup"}),{className:n,row:r=!1}=a,d=(0,o.Z)(a,p),h=(0,g.Z)(),m=(0,x.Z)({props:a,muiFormControl:h,states:["error"]}),u=(0,s.Z)({},a,{row:r,error:m.error}),j=f(u);return(0,i.jsx)(y,(0,s.Z)({className:(0,l.Z)(j.root,n),ownerState:u,ref:t},d))});var Z=a(45421),v=a(42498),w=a(85269),b=a(99500),_=a(92750),D=a(74124),N=a(95742),S=a(33457),P=a(93046),E=a(79245),M=a(78276),k=a(52653),I=a(15795),C=a(29872),O=a(73701),A=a(66988),R=a(98489),T=a(30666),z=a(39279),Y=a(1274),U=a(49050),F=a(53216);a(5226),a(42307);var J=a(24086),K=a(33421),X=a(3291),G=a(90517),W=e=>{let{loading:t,invoiceData:a}=e,r=(0,P.v9)(e=>e.user_data.USER_DATA),o=(0,P.v9)(e=>e.dashboard_data.MONTH_INCOME),s=new Intl.DateTimeFormat("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),l=(0,P.I0)(),d=(0,n.useMemo)(()=>[{accessorKey:"invoice_id",header:"#",size:150},{accessorKey:"date",header:"Date",size:150},{accessorKey:"name",header:"Coustomer Name",size:150},{accessorKey:"grand_total",header:"Total Amount",size:150},{accessorKey:"payment",header:"Paied Amount",size:150,Cell:e=>{let{renderedCellValue:t,row:a}=e;return(0,i.jsxs)(w.Z,{variant:"inherit",children:["Rs.",t]})}},{header:"Blance",size:150,Cell:e=>{let{renderedCellValue:t,row:a}=e;return(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsx)(w.Z,{color:a.original.grand_total-a.original.payment>0?"red":"green",variant:"h6",children:"Rs."}),(0,i.jsx)(w.Z,{color:a.original.grand_total-a.original.payment>0?"red":"green",fontWeight:"bold",variant:"h6",children:a.original.grand_total-a.original.payment})]})}}],[]),[c,h]=(0,n.useState)(""),m=async e=>{if(c.length>0&&0>=!parseInt(c)){let t=a[e],i=t.date.toDate().getFullYear().toString(),n=(0,J.JU)((0,J.hJ)((0,J.ad)(),"invoice",r.shop_id,i.toString()),t.id);(0,J.r7)(n,{payment:a[e].payment+parseInt(c),payment_history:(0,J.vr)({date:new Date,payment:parseInt(c)})}).then(()=>{let e=new Date;o.day_income.hasOwnProperty(new Date().getDate())?(async()=>{let t=(0,J.JU)((0,J.hJ)((0,J.ad)(),"dashboard",r.shop_id,i.toString()),(e.getMonth()+1).toString()),a={day_income:{[e.getDate()]:{amount:o.day_income[e.getDate()].amount+parseInt(c),cost:o.day_income[e.getDate()].cost}},total_income:o.total_income+parseInt(c)};try{await (0,J.r7)(t,a),l((0,G.mX)({open:!0,type:"sucess",msg:"Invoice Updated"})),h("")}catch(e){l((0,G.mX)({open:!0,type:"error",msg:e}))}})():(async()=>{let e=new Date,t=(0,J.JU)((0,J.hJ)((0,J.ad)(),"dashboard",r.shop_id,e.getFullYear().toString()),(e.getMonth()+1).toString()),a={day_income:{[new Date().getDate()]:{amount:parseInt(c),cost:0}},total_income:o.total_income+parseInt(c),total_cost:o.total_cost+parseInt(c)};try{await (0,J.pl)(t,a),h(""),l((0,G.mX)({open:!0,type:"sucess",msg:"Invoice Updated"}))}catch(e){l((0,G.mX)({open:!0,type:"error",msg:e}))}})()}).catch(e=>{l((0,G.mX)({open:!0,type:"error",msg:e}))})}else l((0,G.mX)({open:!0,type:"error",msg:"payemnt input cant be empty or 0"}))};return(0,i.jsx)(S.P2,{options:{columnResizing:!0,width:"100vw"},state:{isLoading:t},columns:d,data:a.map(e=>({key:e.invoice_id,...e,date:e.date.toDate().toLocaleDateString()})),enableRowActions:!0,renderRowActions:e=>{let{row:t}=e;return(0,i.jsx)(E.Z,{sx:{display:"flex",gap:"1rem"},children:(0,i.jsx)(M.Z,{title:"Delete",children:(0,i.jsx)(k.Z,{color:"error",onClick:async()=>{let e=(0,J.JU)((0,J.hJ)((0,J.ad)(),"invoice",r.shop_id,a[t.id].date.toDate().getFullYear().toString()),a[t.id].id);await (0,J.oe)(e).then(()=>{console.log("Data deleted successfully")}).catch(e=>{console.error("Error deleting data: ",e)})},children:(0,i.jsx)(F.Z,{})})})})},renderDetailPanel:e=>{let{row:t}=e;return(0,i.jsxs)("div",{children:[(0,i.jsx)(w.Z,{variant:"h6",children:"Invoice Details"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(I.Z,{component:C.Z,children:(0,i.jsxs)(O.Z,{size:"small",sx:{minWidth:300},"aria-label":"spanning table",children:[(0,i.jsxs)(A.Z,{children:[(0,i.jsxs)(R.Z,{className:"bg-gray-700 ",children:[(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"center",colSpan:4,children:"Details"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"right",children:"Price"})]}),(0,i.jsxs)(R.Z,{className:"bg-gray-600 ",children:[(0,i.jsx)(T.Z,{className:"text-white font-semibold",children:"Name"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"left",children:"Qty."}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"left",children:"Modal Number"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"left",children:"Warenty"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"right",children:"Unit Price"})]})]}),(0,i.jsxs)(z.Z,{children:[a[t.id].items.map(e=>(0,i.jsxs)(R.Z,{children:[(0,i.jsx)(T.Z,{className:"capitalize",children:e.name}),(0,i.jsx)(T.Z,{align:"left",children:e.qty}),(0,i.jsx)(T.Z,{align:"left",children:e.modal}),(0,i.jsx)(T.Z,{align:"left",children:e.warenty}),(0,i.jsxs)(T.Z,{align:"right",children:["Rs.",e.price]})]},e.id)),(0,i.jsxs)(R.Z,{children:[(0,i.jsx)(T.Z,{align:"right",colSpan:4,children:"Grand Total"}),(0,i.jsxs)(T.Z,{align:"right",children:["Rs.",a[t.id].grand_total]})]}),(0,i.jsxs)(R.Z,{children:[(0,i.jsx)(T.Z,{align:"right",colSpan:4,children:"Total Paied Amount"}),(0,i.jsxs)(T.Z,{align:"right",children:["Rs.",a[t.id].payment]})]}),(0,i.jsxs)(R.Z,{children:[(0,i.jsxs)(T.Z,{align:"right",colSpan:4,children:["Blance"," "]}),(0,i.jsxs)(T.Z,{align:"right",children:["Rs.",a[t.id].grand_total-a[t.id].payment]})]})]})]})}),(0,i.jsxs)("div",{className:"flex flex-wrap items-end",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(w.Z,{variant:"h6",children:"Payment History"}),(0,i.jsx)(I.Z,{component:C.Z,children:(0,i.jsxs)(O.Z,{size:"small",sx:{maxWidth:350},"aria-label":"spanning table",children:[(0,i.jsx)(A.Z,{children:(0,i.jsxs)(R.Z,{className:"bg-gray-700 ",children:[(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"center",children:"Date"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"center",children:"Time"}),(0,i.jsx)(T.Z,{className:"text-white font-semibold",align:"right",children:"Amoust"})]})}),(0,i.jsx)(z.Z,{children:a[t.id].payment_history.map(e=>(0,i.jsxs)(R.Z,{children:[(0,i.jsx)(T.Z,{align:"left",className:"capitalize",children:e.date.toDate().toLocaleDateString()}),(0,i.jsx)(T.Z,{align:"left",className:"capitalize",children:s.format(e.date.toDate())}),(0,i.jsxs)(T.Z,{align:"right",children:["Rs.",e.payment]})]},e.id))})]})})]}),a[t.id].grand_total>a[t.id].payment?(0,i.jsxs)("div",{className:"flex item-center mx-0 sm:mx-2",children:[(0,i.jsx)(Y.Z,{type:"number",onChange:e=>h(e.target.value),value:c,size:"small",placeholder:"Enter Coustomer Payment",label:"new Payment",variant:"outlined"}),(0,i.jsx)(U.Z,{onClick:()=>m(t.id),variant:"contained",children:"Pay"})]}):(0,i.jsx)(w.Z,{variant:"h6",color:"success.main",fontWeight:"bold",margin:"0 10px",children:"Payment Complete"}),(0,i.jsx)(U.Z,{variant:"contained",onClick:()=>{l((0,X.wn)({open:!0,data:{name:a[t.id].name,mobile:a[t.id].mobile,items:a[t.id].items,grand_total:a[t.id].grand_total,payment:a[t.id].payment,invoice_num:a[t.id].invoice_number,date:"".concat(a[t.id].date.toDate().getFullYear(),"/").concat(a[t.id].date.toDate().getMonth()+1,"/").concat(a[t.id].date.toDate().getDate()),time:s.format(a[t.id].date)}}))},children:"Print Invoice"})]})]})]})}})},B=a(74548),H=a.n(B),L=a(91797),Q=a(22079),q=a(26337);function V(){let e=(0,P.v9)(e=>e.invoice_edit_open.OPEN);(0,P.v9)(e=>e.user_data.USER_DATA);let t=(0,P.I0)();return(0,i.jsx)("div",{children:(0,i.jsxs)(Q.Z,{fullWidth:!0,open:e,onClose:()=>{t((0,K.Oi)(!1))},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,i.jsx)(L.Z,{id:"alert-dialog-title",children:"Add new Item"}),(0,i.jsx)(q.Z,{})]})})}let $=(0,r.ZP)(Z.Z)(e=>{let{theme:t}=e;return{width:28,height:16,padding:0,display:"flex","&:active":{"& .MuiSwitch-thumb":{width:15},"& .MuiSwitch-switchBase.Mui-checked":{transform:"translateX(9px)"}},"& .MuiSwitch-switchBase":{padding:2,"&.Mui-checked":{transform:"translateX(12px)",color:"#fff","& + .MuiSwitch-track":{opacity:1,backgroundColor:"dark"===t.palette.mode?"#177ddc":"#1890ff"}}},"& .MuiSwitch-thumb":{boxShadow:"0 2px 4px 0 rgb(0 35 11 / 20%)",width:12,height:12,borderRadius:6,transition:t.transitions.create(["width"],{duration:200})},"& .MuiSwitch-track":{borderRadius:8,opacity:1,backgroundColor:"dark"===t.palette.mode?"rgba(255,255,255,.35)":"rgba(0,0,0,.25)",boxSizing:"border-box"}}});function ee(){let[e,t]=n.useState(!0),[a,r]=n.useState(H()(new Date));(0,P.v9)(e=>e.user_data.loading);let o=(0,P.v9)(e=>e.user_data.USER_DATA),[s,l]=n.useState(!1),[d,c]=n.useState([]),[h,m]=n.useState(!1);(0,P.I0)();let u=async()=>{if(l(!0),e){let e=H()(a).startOf("day"),t=H()(a).endOf("day"),i=(0,J.cf)((0,J.IO)((0,J.hJ)((0,J.ad)(),"invoice",o.shop_id,a.format("YYYY").toString()),(0,J.ar)("date",">=",J.EK.fromDate(e.toDate())),(0,J.ar)("date","<=",J.EK.fromDate(t.toDate()))),e=>{c(e.docs.map(e=>({id:e.id,...e.data()}))),l(!1)});return()=>i()}{let e=H()(a).startOf("month"),t=H()(a).endOf("month"),i=(0,J.cf)((0,J.IO)((0,J.hJ)((0,J.ad)(),"invoice",o.shop_id,a.format("YYYY").toString()),(0,J.ar)("date",">=",J.EK.fromDate(e.toDate())),(0,J.ar)("date","<=",J.EK.fromDate(t.toDate()))),e=>{c(e.docs.map(e=>({id:e.id,...e.data()}))),l(!1)});return()=>i()}};return(0,i.jsxs)("div",{children:[(0,i.jsx)(j,{children:(0,i.jsxs)(v.Z,{direction:"row",spacing:1,alignItems:"center",children:[(0,i.jsx)(w.Z,{children:"Monthly"}),(0,i.jsx)($,{onChange:e=>t(e.target.checked),defaultChecked:!0,value:e,inputProps:{"aria-label":"ant design"}}),(0,i.jsx)(w.Z,{children:"Daily"})]})}),(0,i.jsxs)("div",{className:"flex sm:flex-row flex-col",children:[(0,i.jsx)(D._,{dateAdapter:_.y,children:(0,i.jsx)(b.C,{components:["DatePicker","DatePicker"],children:(0,i.jsx)(N.M,{value:a,label:e?"select date":"select month",views:e?["month","year","day"]:["month","year"],onChange:e=>r(e)})})}),(0,i.jsx)(U.Z,{className:"sm:my-0 my-2",variant:"contained",onClick:u,children:"Filter Bills"})]}),(0,i.jsx)("div",{className:"w-screen2",children:(0,i.jsx)(W,{loading:s,invoiceData:d})}),(0,i.jsx)(V,{})]})}},90517:function(e,t,a){"use strict";a.d(t,{At:function(){return r},mX:function(){return n}});let i=(0,a(39730).oM)({name:"snack_bar",initialState:{OPEN:!1,TYPE:"sucess",MSG:""},reducers:{openScackbar:(e,t)=>{let{open:a,type:i,msg:n}=t.payload;e.OPEN=a,e.TYPE=i,e.MSG=n},closeScackbar:e=>{e.OPEN=!1}}}),{openScackbar:n,closeScackbar:r}=i.actions;t.ZP=i.reducer},5226:function(e,t,a){"use strict";a.d(t,{WJ:function(){return r},dR:function(){return n}});let i=(0,a(39730).oM)({name:"edit_open",initialState:{OPEN:!1,ITEM:[]},reducers:{setItemData:(e,t)=>{e.ITEM=t.payload},editDialog:(e,t)=>{e.OPEN=t.payload}}}),{setItemData:n,editDialog:r}=i.actions;t.ZP=i.reducer},3291:function(e,t,a){"use strict";a.d(t,{Q5:function(){return r},wn:function(){return n}});let i=(0,a(39730).oM)({name:"invoice_print",initialState:{OPEN:!1,DATA:{}},reducers:{openPrintDialog:(e,t)=>{let{open:a,data:i}=t.payload;e.OPEN=a,e.DATA=i},closePrintDialog:e=>{e.OPEN=!1,e.DATA={}}}}),{openPrintDialog:n,closePrintDialog:r}=i.actions;t.ZP=i.reducer},33421:function(e,t,a){"use strict";a.d(t,{Oi:function(){return n}});let i=(0,a(39730).oM)({name:"invoice_edit_open",initialState:{OPEN:!1,ITEM:{}},reducers:{setInvoiceData:(e,t)=>{e.ITEM=t.payload,console.log(t.payload)},openCloseInvoiceEdit:(e,t)=>{e.OPEN=t.payload}}}),{openCloseInvoiceEdit:n,setInvoiceData:r}=i.actions;t.ZP=i.reducer}},function(e){e.O(0,[358,481,712,704,502,679,274,46,730,19,14,564,215,870,292,971,938,744],function(){return e(e.s=19142)}),_N_E=e.O()}]);