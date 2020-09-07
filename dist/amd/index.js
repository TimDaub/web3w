"use strict";var __awaiter=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))(function(r,i){function s(e){try{a(o.next(e))}catch(e){i(e)}}function c(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t(function(e){e(n)})).then(s,c)}a((o=o.apply(e,n||[])).next())})};define("errors",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CHAIN_ID_NOT_SET=n.CHAIN_ID_FAILED=n.MODULE_ERROR=n.CHAIN_CONFIG_NOT_AVAILABLE=n.CHAIN_NO_PROVIDER=void 0,n.CHAIN_NO_PROVIDER=6e3,n.CHAIN_CONFIG_NOT_AVAILABLE=6001,n.MODULE_ERROR=1e3,n.CHAIN_ID_FAILED=2001,n.CHAIN_ID_NOT_SET=2002}),define("utils/internals",["require","exports"],function(e,n){function t(e,t,o){if(null==e)return n.noop;const r=e.subscribe(t,o);return r.unsubscribe?()=>r.unsubscribe():r}Object.defineProperty(n,"__esModule",{value:!0}),n.get_store_value=n.safe_not_equal=n.subscribe=n.noop=void 0,n.noop=(()=>void 0),n.subscribe=t,n.safe_not_equal=function(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e},n.get_store_value=function(e){let n;return t(e,e=>n=e)(),n}}),define("utils/store",["require","exports","utils/internals"],function(e,n,t){Object.defineProperty(n,"__esModule",{value:!0}),n.get=n.writable=n.readable=void 0,Object.defineProperty(n,"get",{enumerable:!0,get:function(){return t.get_store_value}});const o=[];function r(e,n=t.noop){let r=null;const i=[];function s(n){if(t.safe_not_equal(e,n)&&(e=n,r)){const n=!o.length;for(let n=0;n<i.length;n+=1){const t=i[n];t[1](),o.push(t,e)}if(n){for(let e=0;e<o.length;e+=2)o[e][0](o[e+1]);o.length=0}}}return{set:s,update:function(n){s(n(e))},subscribe:function(o,c=t.noop){const a=[o,c];return i.push(a),1===i.length&&(r=n(s)||t.noop),o(e),()=>{const e=i.indexOf(a);-1!==e&&i.splice(e,1),0===i.length&&null!==r&&(r(),r=null)}}}}n.readable=function(e,n){return{subscribe:r(e,n).subscribe}},n.writable=r}),define("utils/builtin",["require","exports"],function(e,n){function t(){if("undefined"!=typeof window){const e=window;if(e.ethereum)return e.ethereum;if(e.web3)return e.web3.currentProvider}return null}Object.defineProperty(n,"__esModule",{value:!0}),n.getVendor=n.fetchEthereum=n.getEthereum=void 0,n.getEthereum=t,n.fetchEthereum=function(){return new Promise(e=>{"complete"!==document.readyState?document.onreadystatechange=function(){"complete"===document.readyState&&(document.onreadystatechange=null,e(t()))}:e(t())})},n.getVendor=function(e){return e?e.isMetaMask?"Metamask":-1!=navigator.userAgent.indexOf("Opera")||-1!=navigator.userAgent.indexOf("OPR/")?"Opera":"unknown":void 0}}),define("utils/index",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.timeout=void 0,n.timeout=function(e,n,t){return new Promise((o,r)=>{let i=!1;const s=setTimeout(()=>{i=!0,t?"function"==typeof t?o(t()):r(t.error||t):r(new Error("TimedOut"))},e);n.then(e=>{i||(clearTimeout(s),o(e))}).catch(e=>{i||(clearTimeout(s),r(e))})})}}),define("utils/ethers",["require","exports","utils/internals"],function(e,n,t){function o(e,n,{onTxRequested:t,onTxCancelled:o,onTxSent:r,onSignatureRequested:i,onSignatureCancelled:s,onSignatureReceived:c}){n=Object.assign({sendTransaction:(e,n,i)=>__awaiter(this,void 0,void 0,function*(){let s;t(i[0]);try{s=yield e.bind(n)(...i)}catch(e){throw o(i[0]),e}return r(s),s}),signMessage:(e,n,t)=>__awaiter(this,void 0,void 0,function*(){let o;i(t[0]);try{o=yield e.bind(n)(...t)}catch(e){throw s(t[0]),e}return c(o),o})},n);const a={};return new Proxy(e,{get:(t,o)=>{const r=n[o];return r?function(n,t){let o=a[n];return o||(o=new Proxy(e[n],t),a[n]=o),o}(o,{apply:r}):t[o]}})}function r(e,n){return o(e,{connectUnchecked:(e,t,r)=>{return function(e,n){return o(e,{},n)}(e.bind(t)(...r),n)}},n)}Object.defineProperty(n,"__esModule",{value:!0}),n.proxyWeb3Provider=n.proxyContract=void 0,n.proxyContract=function e(n,o,r){const i=r?Object.assign({onContractTxRequested:t.noop,onContractTxCancelled:t.noop,onContractTxSent:t.noop},r):{onContractTxRequested:t.noop,onContractTxCancelled:t.noop,onContractTxSent:t.noop},{onContractTxRequested:s,onContractTxCancelled:c,onContractTxSent:a}=i,d={},u=n.interface.functions,l={};for(const e of Object.keys(u))l[u[e].name]=e;const f={};for(const e of Object.keys(n))f[e]=n[e];f.functions={};for(const e of Object.keys(n.functions))f.functions[e]=n.functions[e];function g(e,t){let r=d[t];if(!r){let i=n.interface.functions[t];i||(i=n.interface.functions[l[t]]),r=new Proxy(e[t],{apply:(n,r,d)=>__awaiter(this,void 0,void 0,function*(){const r=d.length;let u,l,f;r===i.inputs.length+1&&"object"==typeof d[r-1]&&(u=d[r]),u&&(l=u.outcome,delete(u=Object.assign({},u)).outcome),s({name:o,method:t,overrides:u,outcome:l});try{f=yield n.bind(e)(...d)}catch(e){throw c({name:o,method:t,overrides:u,outcome:l}),e}return a({hash:f.hash,name:o,method:t,overrides:u,outcome:l}),f})}),d[t]=r}return r}const v=new Proxy(f.functions,{get:(e,t)=>g(n.functions,t)});return new Proxy(f,{get:(t,i)=>"functions"===i?v:n.functions[i]?g(n.functions,i):"_proxiedContract"===i?n:"connect"===i?t=>e(n.connect(t),o,r):"toJSON"===i?()=>({address:n.address,abi:n.interface.fragments,functionsSignatures:n.interface.fragments.map(e=>e.format("full"))}):t[i]})},n.proxyWeb3Provider=function(e,n){const o=n?Object.assign({onTxRequested:t.noop,onTxCancelled:t.noop,onTxSent:t.noop,onSignatureRequested:t.noop,onSignatureCancelled:t.noop,onSignatureReceived:t.noop},n):{onTxRequested:t.noop,onTxCancelled:t.noop,onTxSent:t.noop,onSignatureRequested:t.noop,onSignatureCancelled:t.noop,onSignatureReceived:t.noop},i=new Proxy(e.getSigner,{apply:(n,t,i)=>r(n.bind(e)(...i),o)});return new Proxy(e,{get:(e,n)=>"getSigner"===n?i:"signMessage"===n?i:"sendTransaction"===n?i:"connectUnchecked"===n?i:e[n]})}}),define("index",["require","exports","@ethersproject/contracts","@ethersproject/providers","utils/store","utils/builtin","utils/index","utils/ethers","named-logs","errors"],function(e,n,t,o,r,i,s,c,a,d){Object.defineProperty(n,"__esModule",{value:!0});const u=a.logs("web3w:index"),l="undefined"!=typeof window,f={state:"Idle",probing:!1,available:void 0,error:void 0,vendor:void 0},g={state:"Idle",fetching:!1,stale:void 0,amount:void 0,error:void 0,blockNumber:void 0},v={state:"Idle",connecting:!1,loadingData:!1,contracts:void 0,error:void 0},h={state:"Idle",connecting:!1,unlocking:!1,address:void 0,options:["builtin"],selected:void 0,pendingUserConfirmation:void 0,error:void 0},p={inProgress:!1,error:void 0};function b(e){const n=r.writable(e);return n.data=e,n}const m=[],w=b(h),y=b(m),_=b(f),C=b(v),I=b(g),x=b(p);function P(e,n){for(const t of Object.keys(n)){const o=n,r=e;if(r.data[t]&&"object"==typeof o[t])for(const e of Object.keys(o[t]))r.data[t][e]=o[t][e];else r.data[t]=o[t]}try{u.debug(JSON.stringify(e.data,null,"  "))}catch(n){u.error(n,e.data)}e.set(e.data)}let O,S,R,E,T,A,k,N,q,L,j=!1;function D(e){return __awaiter(this,void 0,void 0,function*(){if("0xNaN"===e){if(u.warn("onChainChanged bug (return 0xNaN), metamask bug?"),!S)throw new Error("no web3Provider to get chainId");e=yield H(S,"eth_chainId")}const n=parseInt(e.slice(2),16).toString();u.debug("onChainChanged",{chainId:e,chainIdAsDecimal:n}),P(C,{contracts:void 0,addresses:void 0,state:"Connected",chainId:n,notSupported:void 0}),h.address&&(yield Z(n,h.address,!0))})}function M(e){return e[0]!==h.address}function U(e){return __awaiter(this,void 0,void 0,function*(){if(!M(e))return void u.debug("false account changed",e);u.debug("onAccountsChanged",{accounts:e});const n=e[0];if(n)if(P(w,{address:n,state:"Ready"}),"Connected"===v.state){if(!v.chainId)throw new Error("no chainId while connected");yield Z(v.chainId,n,!1)}else ne(n);else P(w,{address:n,state:"Locked"}),ne(n)})}function H(e,n,t){var o;if(e.request)return e.request({method:n,params:t});const r=null===(o=e.sendAsync)||void 0===o?void 0:o.bind(e);if(r)return new Promise((e,o)=>{r({method:n,params:t},(n,t)=>{n?o(n):t.error?o(t.error):e(t.result)})});throw new Error("provider not supported")}function F(e){return new Promise(n=>{setTimeout(n,e)})}function W(e,n){return __awaiter(this,void 0,void 0,function*(){for(;j;){let t=[];try{t=yield H(e,"eth_accounts")}catch(e){}if(u.debug({accounts:t}),j&&M(t))try{n(t)}catch(e){u.error(e)}yield F(3e3)}})}function V(){S&&!j&&(j=!0,S.on?(S.on("chainChanged",D),S.on("accountsChanged",U),W(S,U)):(!function(e,n){__awaiter(this,void 0,void 0,function*(){for(;j;){const t=yield H(e,"eth_chainId"),o=parseInt(t.slice(2),16).toString();if(j&&v.chainId!==o)try{n(t)}catch(e){u.error(e)}yield F(3e3)}})}(S,D),W(S,U)))}function $({chainId:e}){const n=parseInt(e.slice(2),16).toString();u.debug("onConnect",{chainId:e,chainIdAsDecimal:n})}function B(e){u.debug("onDisconnect",{error:e})}function G(e){return"string"==typeof e&&e.length>2&&"0x"===e.slice(0,2).toLowerCase()}function J(e){h.pendingUserConfirmation?h.pendingUserConfirmation.push(e):h.pendingUserConfirmation=[e],P(w,{pendingUserConfirmation:h.pendingUserConfirmation})}function Y(e){if(h.pendingUserConfirmation){const n=h.pendingUserConfirmation.indexOf(e);n>=0&&(h.pendingUserConfirmation.splice(n,1),0===h.pendingUserConfirmation.length&&(h.pendingUserConfirmation=void 0),P(w,{pendingUserConfirmation:h.pendingUserConfirmation}))}}const z={onTxRequested:e=>{u.debug("onTxRequested",{transaction:e}),J("transaction")},onTxCancelled:e=>{u.debug("onTxCancelled",{transaction:e}),Y("transaction")},onTxSent:e=>{u.debug("onTxSent",{transaction:e}),Y("transaction")},onSignatureRequested:e=>{u.debug("onSignatureRequested",{message:e}),J("signature")},onSignatureCancelled:e=>{u.debug("onSignatureCancelled",{message:e}),Y("signature")},onSignatureReceived:e=>{u.debug("onSignatureReceived",{signature:e}),Y("signature")},onContractTxRequested:({name:e,method:n,overrides:t,outcome:o})=>{u.debug("onContractTxRequest",{name:e,method:n,overrides:t,outcome:o})},onContractTxCancelled:({name:e,method:n,overrides:t,outcome:o})=>{u.debug("onContractTxCancelled",{name:e,method:n,overrides:t,outcome:o})},onContractTxSent:({hash:e,name:n,method:t,overrides:o,outcome:r})=>{u.debug("onContractTxSent",{hash:e,name:n,method:t,overrides:o,outcome:r}),e&&function(e){m.push(e),y.set(m)}({hash:e,name:n,method:t,overrides:o,outcome:r})}},K="_web3w_previous_wallet_type";function Q(e){localStorage.setItem(K,e)}function X(e,n){return __awaiter(this,void 0,void 0,function*(){const t=ee(n);let o;if("Idle"===v.state){let e;P(C,{connecting:!0});try{e=(yield t.getNetwork()).chainId}catch(e){const n={code:d.CHAIN_ID_FAILED,message:"Failed to fetch chainId"};throw P(C,{error:n,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(n.message)}o=String(e),P(C,{chainId:o,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Connected"})}else o=v.chainId;if(!o){const e={code:d.CHAIN_ID_NOT_SET,message:"chainId is not set even though chain is connected"};throw P(C,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}yield Z(o,e,n)})}function Z(e,n,o){return __awaiter(this,void 0,void 0,function*(){const r=ee(o);P(C,{loadingData:!0});const i={},s={};let a={},u=E;if("function"==typeof u&&(u=yield u(e)),u){if(u.chainId){const n=u;if(e!==n.chainId&&e!=(G(l=n.chainId)?""+parseInt(l.slice(2)):l)){const t={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig only available for ${n.chainId} , not available for ${e}`};throw P(C,{error:t,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(t.message)}a=n.contracts}else{const n=u,t=n[e]||n[function(e){return G(e)?e:"0x"+parseInt(e).toString(16)}(e)];if(!t){const n={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig not available for ${e}`};throw P(C,{error:n,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(n.message)}a=t.contracts}for(const e of Object.keys(a)){const o=a[e];o.abi&&(i[e]=c.proxyContract(new t.Contract(o.address,o.abi,r.getSigner(n)),e,z)),s[e]=o.address}}var l;if(P(C,{state:"Ready",loadingData:!1,connecting:!1,chainId:e,addresses:s,contracts:i}),"Ready"===h.state&&N){const e=N;L?L(i).then(()=>{P(x,{inProgress:!1,error:void 0}),e(i),k=void 0,q=void 0,N=void 0}).catch(e=>{P(x,{error:e})}):(P(x,{inProgress:!1,error:void 0}),N(i))}})}function ee(e){if(void 0===O||void 0===S){const e={code:d.CHAIN_NO_PROVIDER,message:"no provider setup yet"};throw P(C,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}return e&&(O=c.proxyWeb3Provider(new o.Web3Provider(S),z)),O}function ne(e){const n=ee(!1),t=v.contracts;if(t)for(const o of Object.keys(t))t[o]=t[o].connect(e?n.getSigner(e):n)}function te(e,n){return __awaiter(this,void 0,void 0,function*(){!h.selected||"Ready"!==h.state&&"Locked"!==h.state||(yield ae());let t,r=e;if(!r)if(0===A.length)r="builtin";else{if(1!==A.length){const e=`No Wallet Type Specified, choose from ${h.options}`;throw new Error(e)}r=A[0]}if("builtin"==r&&"Ready"===f.state&&!f.available){throw new Error("No Builtin Wallet")}if(P(w,{address:void 0,connecting:!0,selected:e,state:"Idle",error:void 0}),O=void 0,S=void 0,"builtin"===r){T=void 0;const e=yield ie();S=e,O=c.proxyWeb3Provider(new o.Web3Provider(e),z)}else{let t;if("string"==typeof r){if(A)for(const n of A)"string"!=typeof n&&n.id===e&&(t=n)}else e=(t=r).id;if(!t){const n=`no module found ${e}`;throw P(w,{error:{message:n,code:1},selected:void 0,connecting:!1}),new Error(n)}try{const{web3Provider:e}=yield t.setup(n);S=e,O=c.proxyWeb3Provider(new o.Web3Provider(S),z),T=t}catch(e){throw"USER_CANCELED"===e.message?P(w,{connecting:!1,selected:void 0}):P(w,{error:{code:d.MODULE_ERROR,message:e.message},selected:void 0,connecting:!1}),e}}if(!O){const n=`no provider found for wallet type ${e}`;throw P(w,{error:{message:n,code:1},selected:void 0,connecting:!1}),new Error(n)}S&&(u.debug("listenning for connection..."),S.on&&S.on("connect",$),S.on&&S.on("disconnect",B));try{t="builtin"===e&&"Metamask"===f.vendor?yield s.timeout(2e3,O.listAccounts(),{error:'Metamask timed out. Please reload the page (see <a href="https://github.com/MetaMask/metamask-extension/issues/7221">here</a>)'}):yield s.timeout(2e4,O.listAccounts())}catch(e){throw P(w,{error:e,selected:void 0,connecting:!1}),e}Q(e);const i=t&&t[0];i?(P(w,{address:i,state:"Ready",connecting:void 0}),V(),yield X(i,!1)):(V(),P(w,{address:void 0,state:"Locked",connecting:void 0}))})}let oe,re;function ie(){return oe||(oe=new Promise((e,n)=>__awaiter(this,void 0,void 0,function*(){if("Ready"===f.state)return e();P(_,{probing:!0});try{const e=yield i.fetchEthereum();e?(e.autoRefreshOnNetworkChange=!1,R=e,P(_,{state:"Ready",vendor:i.getVendor(e),available:!0,probing:!1})):P(_,{state:"Ready",vendor:void 0,available:!1,probing:!1})}catch(e){return P(_,{error:e.message||e,vendor:void 0,available:void 0,probing:!1}),n(e)}e(R)})))}function se(e,n){return __awaiter(this,void 0,void 0,function*(){return yield te(e,n),"Locked"!==h.state||de()})}function ce(e){return()=>{P(e,{error:void 0})}}function ae(){return __awaiter(this,void 0,void 0,function*(){j=!1,S&&j&&(u.debug("stop listenning for changes..."),S.removeListener&&S.removeListener("chainChanged",D),S.removeListener&&S.removeListener("accountsChanged",U)),S&&(u.debug("stop listenning for connection..."),S.removeListener&&S.removeListener("connect",$),S.removeListener&&S.removeListener("disconnect",B)),T&&(yield T.logout(),T=void 0),P(w,{state:"Idle",address:void 0,connecting:!1,unlocking:void 0,selected:void 0,error:void 0}),P(I,{state:"Idle",amount:void 0,error:void 0,blockNumber:void 0}),P(C,{contracts:void 0,addresses:void 0,state:"Idle",notSupported:void 0,chainId:void 0,error:void 0}),Q("")})}function de(){if(re)return re;let e=!1;const n=new Promise((n,t)=>__awaiter(this,void 0,void 0,function*(){if("Locked"===h.state){let t;P(w,{unlocking:!0});try{t=(t=yield null==O?void 0:O.send("eth_requestAccounts",[]))||[]}catch(e){t=[]}if(!(t.length>0))return P(w,{unlocking:!1}),re=void 0,e=!0,n(!1);{const e=t[0];P(w,{address:e,state:"Ready",unlocking:void 0}),yield X(e,!0)}return re=void 0,e=!0,n(!0)}return e=!0,t(new Error("Not Locked"))}));return e||(re=n),n}n.default=(e=>{(e=Object.assign({},e||{})).options&&0!==e.options.length||(e.options=["builtin"]),e.builtin=e.builtin||{autoProbe:!1},e.flow=e.flow||{autoSelect:!1,autoUnlock:!1};const{debug:n,chainConfigs:t,builtin:o}=e;if(E=t,n&&"undefined"!=typeof window&&(window.$wallet=h,window.$transactions=m),A=e.options,P(w,{state:"Idle",options:A.map(e=>{if("object"==typeof e){if(!e.id)throw new Error("options need to be string or have an id");return e.id}return e})}),P(_,{state:"Idle"}),P(C,{state:"Idle"}),P(I,{state:"Idle"}),l){if(e.autoSelectPrevious){const e=localStorage.getItem(K);e&&""!==e&&te(e)}o.autoProbe&&ie()}return{transactions:{subscribe:y.subscribe},balance:{subscribe:I.subscribe,acknowledgeError:ce(I)},chain:{subscribe:C.subscribe,acknowledgeError:ce(C)},builtin:{subscribe:_.subscribe,acknowledgeError:ce(_),probe:ie},wallet:{subscribe:w.subscribe,connect:se,unlock:de,acknowledgeError:ce(w),logout:ae,get options(){return h.options},get address(){return h.address},get provider(){return O},get web3Provider(){return S},get chain(){return v},get contracts(){return v.contracts},get balance(){return g.amount}},flow:{subscribe:x.subscribe,retry(){if("Ready"===v.state&&"Ready"===h.state){if(v.contracts){const e=v.contracts;if(L){const n=L(e);if("then"in n)return n.then(()=>(L=void 0,P(x,{inProgress:!1,error:void 0}),N&&N(e))).catch(e=>(P(x,{error:e}),Promise.reject(e)))}return N&&N(e),Promise.resolve()}return Promise.reject("contracts not set")}return"Locked"===h.state?e.flow&&e.flow.autoUnlock&&de().catch(e=>{P(x,{error:e})}):"Idle"===h.state&&1===h.options.length&&e.flow&&e.flow.autoSelect&&se(h.options[0]).catch(e=>{P(x,{error:e})}),k?k.then(()=>void 0):Promise.resolve()},execute(n){if(p.inProgress)throw new Error("flow in progress");if("Ready"===v.state&&"Ready"===h.state){if(q=void 0,N=void 0,k=void 0,v.contracts){const e=v.contracts;if(n){const t=n(e);if("then"in t)return L=n,P(x,{inProgress:!0,error:void 0}),t.then(()=>(L=void 0,P(x,{inProgress:!1,error:void 0}),e)).catch(e=>(P(x,{error:e}),Promise.reject(e)))}return Promise.resolve(e)}return Promise.reject("contracts not set")}return k||(L=n,P(x,{inProgress:!0}),k=new Promise((e,n)=>{N=e,q=n}),"Locked"===h.state?e.flow&&e.flow.autoUnlock&&de().catch(e=>{P(x,{error:e})}):"Idle"===h.state&&1===h.options.length&&e.flow&&e.flow.autoSelect&&se(h.options[0]).catch(e=>{P(x,{error:e})}),k)},cancel(){q&&q({code:1,message:"Cancel"}),k=void 0,q=void 0,N=void 0,L=void 0,P(x,{inProgress:!1,error:void 0})}}}})}),define("utils/web",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.isPrivateWindow=void 0,n.isPrivateWindow=function(){return new Promise(function(e){if("undefined"!=typeof window)try{if(navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1==navigator.userAgent.indexOf("CriOS")&&-1==navigator.userAgent.indexOf("FxiOS")){let n=!1;if(window.safariIncognito)n=!0;else try{window.openDatabase(null,null,null,null),window.localStorage.setItem("test",1),e(!1)}catch(t){n=!0,e(!0)}}else if(navigator.userAgent.includes("Firefox")){const n=indexedDB.open("test");n.onerror=function(){e(!0)},n.onsuccess=function(){e(!1)}}else if(navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Trident")||navigator.userAgent.includes("msie"))window.indexedDB||!window.PointerEvent&&!window.MSPointerEvent||e(!0),e(!1);else{(function(){const e=navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);if(null!=e&&5==e.length)return e.map(e=>parseInt(e,10))[1]>=76})()&&e(function(){return __awaiter(this,void 0,void 0,function*(){if("storage"in navigator&&"estimate"in navigator.storage){const{quota:e}=yield navigator.storage.estimate();return!!(e&&e<12e7)}return!1})}());const n=window.RequestFileSystem||window.webkitRequestFileSystem;n?n(window.TEMPORARY,100,function(){e(!1)},function(){e(!0)}):e(!1)}}catch(n){console.error(n),e(!1)}else e(!1)})}});