(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{52844:function(e,n,i){Promise.resolve().then(i.bind(i,98334)),Promise.resolve().then(i.bind(i,94400)),Promise.resolve().then(i.bind(i,37002))},98334:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return u}});var t=i(57437),a=i(79245),r=i(2265),s=i(45009),o=i(55496),l=i(24033),c=i(24086),d=i(93046),h=i(37475);function u(e){let{children:n}=e,[i,u,x]=(0,o.F_)(s.I8),p=(0,d.I0)(),g=(0,l.useRouter)();return u||i||(0,l.redirect)("/"),(0,r.useEffect)(()=>{!u&&i&&(async()=>{if(i){let e=(0,c.hJ)((0,c.ad)(),"user"),n=(0,c.IO)(e,(0,c.ar)("uid","==",i.uid));(0,c.cf)(n,e=>{e.empty?(p((0,h.vg)({user:[],loading:!1})),g.push("/register"),setUidCheck(!1)):e.forEach(e=>{i.uid===e.data().uid&&p((0,h.vg)({user:e.data(),loading:!1}))})})}})()},[i]),(0,t.jsx)(a.Z,{component:"main",sx:{flexGrow:1,mt:9,ml:1},children:n})}},94400:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return L}});var t=i(57437),a=i(2265),r=i(35843),s=i(41101),o=i(79245),l=i(64111),c=i(76500),d=i(34989),h=i(35266),u=i(3857),x=i(52653),p=i(52513),g=i(3401),m=i(23922),j=i(69299),Z=i(72502),f=i(8864),b=i(38212),y=i(51659),v=i(61362),P=i(70226),D=i(54383),S=i(37965),w=i(61396),_=i.n(w),A=i(45009),I=i(55496),k=i(53085),O=i(93046),C=i(42307),N=i(82842),T=i(24086),E=i(8680),M=i(46565),R=i(24033),H=i(85269);let U=e=>({width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden"}),F=e=>({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(e.spacing(7)," + 1px)"),[e.breakpoints.up("sm")]:{width:"calc(".concat(e.spacing(8)," + 1px)")}}),W=(0,r.ZP)("div")(e=>{let{theme:n}=e;return{display:"flex",alignItems:"center",justifyContent:"flex-end",padding:n.spacing(0,1),...n.mixins.toolbar}}),K=(0,r.ZP)(c.Z,{shouldForwardProp:e=>"open"!==e})(e=>{let{theme:n,open:i}=e;return{zIndex:n.zIndex.drawer+1,transition:n.transitions.create(["width","margin"],{easing:n.transitions.easing.sharp,duration:n.transitions.duration.leavingScreen}),backgroundColor:"white",...i&&{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:n.transitions.create(["width","margin"],{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen})}}}),z=(0,r.ZP)(l.ZP,{shouldForwardProp:e=>"open"!==e})(e=>{let{theme:n,open:i}=e;return{width:240,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box",...i&&{...U(n),"& .MuiDrawer-paper":U(n)},...!i&&{...F(n),"& .MuiDrawer-paper":F(n)}}});function L(e){let{children:n}=e,i=(0,s.Z)(),[r,l]=a.useState(!1),[c,w]=a.useState(""),[U,F,L]=(0,I.F_)(A.I8),X=new Date,B=X.getFullYear(),G=(0,O.v9)(e=>e.user_data.USER_DATA),J=(0,R.usePathname)(),Y=(0,O.I0)(),Q=[{name:"Dashboard",icon:(0,t.jsx)(y.Z,{}),rPath:"/admin"},{name:"Inventory",icon:(0,t.jsx)(v.Z,{}),rPath:"/admin/inventory"},{name:"Invoice",icon:(0,t.jsx)(P.Z,{}),rPath:"/admin/invoice"},{name:"Invoice History",icon:(0,t.jsx)(D.Z,{}),rPath:"/admin/history"}];return a.useEffect(()=>{if(G.shop_id)try{Y((0,N.KO)({product:[],loading:!0})),(0,M.wx)({incomeData:[],loading:!0});let e=(0,C.N8)(),n=(0,C.iH)(e,"shop/"+G.shop_id);(0,C.jM)(n,e=>{let n=e.val();if(n){var i;Y((0,N.KO)({product:Object.values(n),loading:!1})),i=G.shop_id,(0,T.cf)((0,T.JU)((0,T.ad)(),"shop",i),e=>{e.exists()?Y((0,E.I1)({shopdata:e.data(),loading:!1})):Y((0,E.I1)({shopdata:[],loading:!1}))})}else Y((0,N.KO)({product:[],loading:!1}))}),(async()=>{let e=(0,T.JU)((0,T.hJ)((0,T.ad)(),"dashboard",G.shop_id,B.toString()),(X.getMonth()+1).toString());try{(0,T.cf)(e,e=>{e.exists()&&Y((0,M.wx)({incomeData:e.data(),loading:!1}))})}catch(e){console.error("Error getting document:",e)}})()}catch(e){console.log(e)}},[G]),(0,t.jsxs)(o.Z,{sx:{display:"flex"},children:[(0,t.jsx)(u.ZP,{}),(0,t.jsxs)("div",{children:[" ",(0,t.jsx)(K,{position:"fixed",open:r,children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)(x.Z,{color:"primary","aria-label":"open drawer",onClick:()=>{l(!0)},edge:"start",sx:{marginRight:5,...r&&{display:"none"}},children:(0,t.jsx)(p.Z,{})}),(0,t.jsx)(H.Z,{className:"ml-4 text-black",variant:"h6",children:"/admin/inventory"===J?"Inventory":"/admin/invoice"===J?"Invoice":"/admin/history"===J?"Invoice History":"Dashboard"})]})})}),(0,t.jsxs)(z,{variant:"permanent",open:r,children:[(0,t.jsxs)(W,{className:"flex justify-between",children:[(0,t.jsx)(H.Z,{className:"ml-4",variant:"h6",children:"My Shop"}),(0,t.jsx)(x.Z,{onClick:()=>{l(!1)},children:"rtl"===i.direction?(0,t.jsx)(m.Z,{}):(0,t.jsx)(g.Z,{})})]}),(0,t.jsxs)(h.Z,{children:[Q.map((e,n)=>(0,t.jsx)(j.ZP,{disablePadding:!0,sx:{display:"block",bgcolor:J===e.rPath?"#a039a9":"white"},children:(0,t.jsx)(_(),{className:"no-underline text-black hover:bg-slate-700",href:e.rPath,children:(0,t.jsxs)(Z.Z,{sx:{minHeight:48,justifyContent:r?"initial":"center",px:2.5},children:[(0,t.jsx)(f.Z,{sx:{minWidth:0,mr:r?3:"auto",justifyContent:"center",color:J===e.rPath?"white":"black"},children:e.icon}),(0,t.jsx)(b.Z,{primary:e.name,sx:{opacity:r?1:0,color:J===e.rPath?"white":"black"}})]})})},e.name)),(0,t.jsx)(j.ZP,{onClick:async()=>{let e=(0,k.v0)();(0,k.w7)(e).then(()=>{}).catch(e=>{})},disablePadding:!0,sx:{display:"block"},children:(0,t.jsxs)(Z.Z,{sx:{minHeight:48,justifyContent:r?"initial":"center",px:2.5},children:[(0,t.jsx)(f.Z,{sx:{minWidth:0,mr:r?3:"auto",justifyContent:"center"},children:(0,t.jsx)(S.Z,{})}),(0,t.jsx)(b.Z,{primary:"Logout",sx:{opacity:r?1:0}})]})})]})]})]})]})}},37002:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return D}});var t=i(57437),a=i(2265),r=i(49050),s=i(22079),o=i(42834),l=i(26337),c=i(91797),d=i(93046),h=i(3291),u=i(65984),x=i(85269),p=i(54986),g=i(15700),m=i(73701),j=i(39279),Z=i(30666),f=i(15795),b=i(66988),y=i(98489),v=i(29872),P=i(38889);function D(){let e=(0,d.v9)(e=>e.invoice_print.OPEN),n=(0,d.v9)(e=>e.invoice_print.DATA),i=(0,d.I0)(),D=()=>{i((0,h.Q5)(!1))},S=a.useRef(),w=(0,P.useReactToPrint)({content:()=>S.current});return(0,t.jsx)(a.Fragment,{children:(0,t.jsxs)(s.Z,{open:e,onClose:D,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,t.jsx)(c.Z,{id:"alert-dialog-title",children:"Invoice Print"}),(0,t.jsxs)(l.Z,{ref:S,children:[(0,t.jsxs)(u.Z,{className:"p-2 flex flex-col justify-center items-center",variant:"outlined",children:[(0,t.jsx)(x.Z,{fontWeight:"bold",variant:"h5",children:"Shop Name"}),(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)(g.Z,{className:"mx-2"}),(0,t.jsx)(x.Z,{variant:"body1",children:"071-xxxxxxxx"})]}),(0,t.jsx)(x.Z,{variant:"body1",children:"1st Street, Colombo"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)(x.Z,{fontWeight:"bold",variant:"subtitle1",children:["Invoice Number: ",n.invoice_num]}),(0,t.jsxs)(x.Z,{variant:"subtitle1",children:["Date: ",n.date," - ",n.time]}),(0,t.jsxs)(x.Z,{variant:"body1",children:["Name: ",n.name]}),(0,t.jsxs)(x.Z,{variant:"body1",children:["Mobile: ",n.mobile]})]}),(0,t.jsx)(p.Z,{color:"black"}),(0,t.jsx)("div",{children:(0,t.jsx)(f.Z,{component:v.Z,children:(0,t.jsxs)(m.Z,{size:"small",sx:{minWidth:300},"aria-label":"spanning table",children:[(0,t.jsx)(b.Z,{children:(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(Z.Z,{align:"right",children:"#"}),(0,t.jsx)(Z.Z,{children:"Desc"}),(0,t.jsx)(Z.Z,{align:"right",children:"Unit Price"})]})}),(0,t.jsxs)(j.Z,{children:[n.items&&n.items.map((e,n)=>(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(Z.Z,{align:"right",children:n}),(0,t.jsxs)(Z.Z,{children:[e.name," ",(0,t.jsx)("br",{})," X",e.qty,(0,t.jsx)("br",{}),"Modal: ",e.modal,(0,t.jsx)("br",{}),"Warenty: ",e.warenty]}),(0,t.jsx)(Z.Z,{align:"right",children:e.price})]},e.desc)),(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(Z.Z,{align:"right",colSpan:2,children:"Total"}),(0,t.jsx)(Z.Z,{align:"right",children:n.grand_total})]}),(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(Z.Z,{align:"right",colSpan:2,children:"Payment"}),(0,t.jsx)(Z.Z,{align:"right",children:n.payment})]}),(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(Z.Z,{align:"right",colSpan:2,children:"Blance"}),(0,t.jsx)(Z.Z,{align:"right",children:n.grand_total-n.payment})]})]})]})})})]}),(0,t.jsxs)(o.Z,{children:[(0,t.jsx)(r.Z,{onClick:D,children:"Close"}),(0,t.jsx)(r.Z,{onClick:w,autoFocus:!0,children:"Print"})]})]})})}},45009:function(e,n,i){"use strict";i.d(n,{I8:function(){return o}});var t=i(20994),a=i(53085),r=i(24086);let s=(0,t.C6)().length?(0,t.Mq)():(0,t.ZF)({apiKey:"AIzaSyDbXjllLhPy84r2SRFYHULeb2UFuoQyu-U",authDomain:"mystock-eb624.firebaseapp.com",databaseURL:"https://mystock-eb624-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"mystock-eb624",storageBucket:"mystock-eb624.appspot.com",messagingSenderId:"1055843147843",appId:"1:1055843147843:web:da9d7923459661f437b4f6",measurementId:"G-HK066TWRX2"}),o=(0,a.v0)(s);(0,r.ad)(s)},46565:function(e,n,i){"use strict";i.d(n,{wx:function(){return a}});let t=(0,i(39730).oM)({name:"dashboard_data",initialState:{MONTH_INCOME:{},DASHBOARD_DATA:{},loading:!0,error:!1},reducers:{setSalesData:(e,n)=>{let{incomeData:i,loading:t}=n.payload;e.MONTH_INCOME=i,e.loading=t},dashboardData:(e,n)=>{let{dashboardData:i}=n.payload;e.DASHBOARD_DATA=i}}}),{setSalesData:a,dashboardData:r}=t.actions;n.ZP=t.reducer},3291:function(e,n,i){"use strict";i.d(n,{Q5:function(){return r},wn:function(){return a}});let t=(0,i(39730).oM)({name:"invoice_print",initialState:{OPEN:!1,DATA:{}},reducers:{openPrintDialog:(e,n)=>{let{open:i,data:t}=n.payload;e.OPEN=i,e.DATA=t},closePrintDialog:e=>{e.OPEN=!1,e.DATA={}}}}),{openPrintDialog:a,closePrintDialog:r}=t.actions;n.ZP=t.reducer},82842:function(e,n,i){"use strict";i.d(n,{KO:function(){return a}});let t=(0,i(39730).oM)({name:"product_data",initialState:{PRODUCT_DATA:[],loading:!0,error:!1},reducers:{setProductData:(e,n)=>{let{product:i,loading:t}=n.payload;e.PRODUCT_DATA=i,e.loading=t}}}),{setProductData:a}=t.actions;n.ZP=t.reducer},8680:function(e,n,i){"use strict";i.d(n,{I1:function(){return a}});let t=(0,i(39730).oM)({name:"shop_data",initialState:{SHOP_DATA:[],CATEGORYS:[],loading:!0,error:!1},reducers:{setShopData:(e,n)=>{let{shopdata:i,loading:t}=n.payload;e.SHOP_DATA=i,e.CATEGORYS=Object.entries(i.category).map(e=>{let[n,{Count:i}]=e;return{Name:n,Count:i}}),e.loading=t}}}),{setShopData:a}=t.actions;n.ZP=t.reducer},37475:function(e,n,i){"use strict";i.d(n,{vg:function(){return a}});let t=(0,i(39730).oM)({name:"user_data",initialState:{USER_DATA:[],loading:!0,error:!1},reducers:{setuserData:(e,n)=>{let{user:i,loading:t}=n.payload;e.USER_DATA=i,e.loading=t}}}),{setuserData:a}=t.actions;n.ZP=t.reducer}},function(e){e.O(0,[358,481,220,704,502,679,46,730,19,564,561,520,889,834,971,938,744],function(){return e(e.s=52844)}),_N_E=e.O()}]);