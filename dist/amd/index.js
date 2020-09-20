"use strict";var __awaiter=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))(function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t(function(e){e(n)})).then(c,s)}a((o=o.apply(e,n||[])).next())})};define("errors",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.CHAIN_ID_NOT_SET=n.CHAIN_ID_FAILED=n.MODULE_ERROR=n.CHAIN_CONFIG_NOT_AVAILABLE=n.CHAIN_NO_PROVIDER=void 0,n.CHAIN_NO_PROVIDER=6e3,n.CHAIN_CONFIG_NOT_AVAILABLE=6001,n.MODULE_ERROR=1e3,n.CHAIN_ID_FAILED=2001,n.CHAIN_ID_NOT_SET=2002}),define("utils/internals",["require","exports"],function(e,n){function t(e,t,o){if(null==e)return n.noop;const r=e.subscribe(t,o);return r.unsubscribe?()=>r.unsubscribe():r}Object.defineProperty(n,"__esModule",{value:!0}),n.get_store_value=n.safe_not_equal=n.subscribe=n.noop=void 0,n.noop=(()=>void 0),n.subscribe=t,n.safe_not_equal=function(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e},n.get_store_value=function(e){let n;return t(e,e=>n=e)(),n}}),define("utils/store",["require","exports","utils/internals"],function(e,n,t){Object.defineProperty(n,"__esModule",{value:!0}),n.get=n.writable=n.readable=void 0,Object.defineProperty(n,"get",{enumerable:!0,get:function(){return t.get_store_value}});const o=[];function r(e,n=t.noop){let r=null;const i=[];function c(n){if(t.safe_not_equal(e,n)&&(e=n,r)){const n=!o.length;for(let n=0;n<i.length;n+=1){const t=i[n];t[1](),o.push(t,e)}if(n){for(let e=0;e<o.length;e+=2)o[e][0](o[e+1]);o.length=0}}}return{set:c,update:function(n){c(n(e))},subscribe:function(o,s=t.noop){const a=[o,s];return i.push(a),1===i.length&&(r=n(c)||t.noop),o(e),()=>{const e=i.indexOf(a);-1!==e&&i.splice(e,1),0===i.length&&null!==r&&(r(),r=null)}}}}n.readable=function(e,n){return{subscribe:r(e,n).subscribe}},n.writable=r}),define("utils/builtin",["require","exports"],function(e,n){function t(){if("undefined"!=typeof window){const e=window;if(e.ethereum)return e.ethereum;if(e.web3)return e.web3.currentProvider}return null}Object.defineProperty(n,"__esModule",{value:!0}),n.getVendor=n.fetchEthereum=n.getEthereum=void 0,n.getEthereum=t,n.fetchEthereum=function(){return new Promise(e=>{"complete"!==document.readyState?document.onreadystatechange=function(){"complete"===document.readyState&&(document.onreadystatechange=null,e(t()))}:e(t())})},n.getVendor=function(e){return e?e.isMetaMask?"Metamask":-1!=navigator.userAgent.indexOf("Opera")||-1!=navigator.userAgent.indexOf("OPR/")?"Opera":"unknown":void 0}}),define("utils/index",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.timeout=void 0,n.timeout=function(e,n,t){return new Promise((o,r)=>{let i=!1;const c=setTimeout(()=>{i=!0,t?"function"==typeof t?o(t()):r(t.error||t):r(new Error("TimedOut"))},e);n.then(e=>{i||(clearTimeout(c),o(e))}).catch(e=>{i||(clearTimeout(c),r(e))})})}}),define("utils/ethers",["require","exports","utils/internals"],function(e,n,t){function o(e,n,{onTxRequested:t,onTxCancelled:o,onTxSent:r,onSignatureRequested:i,onSignatureCancelled:c,onSignatureReceived:s}){n=Object.assign({sendTransaction:(e,n,i)=>__awaiter(this,void 0,void 0,function*(){let c;t(i[0]);try{c=yield e.bind(n)(...i)}catch(e){throw o(i[0]),e}return r(c),c}),signMessage:(e,n,t)=>__awaiter(this,void 0,void 0,function*(){let o;i(t[0]);try{o=yield e.bind(n)(...t)}catch(e){throw c(t[0]),e}return s(o),o})},n);const a={};return new Proxy(e,{get:(t,o)=>{const r=n[o];return r?function(n,t){let o=a[n];return o||(o=new Proxy(e[n],t),a[n]=o),o}(o,{apply:r}):t[o]}})}function r(e,n){return o(e,{connectUnchecked:(e,t,r)=>{return function(e,n){return o(e,{},n)}(e.bind(t)(...r),n)}},n)}Object.defineProperty(n,"__esModule",{value:!0}),n.proxyWeb3Provider=n.proxyContract=void 0,n.proxyContract=function e(n,o,r){const i=r?Object.assign({onContractTxRequested:t.noop,onContractTxCancelled:t.noop,onContractTxSent:t.noop},r):{onContractTxRequested:t.noop,onContractTxCancelled:t.noop,onContractTxSent:t.noop},{onContractTxRequested:c,onContractTxCancelled:s,onContractTxSent:a}=i,d={},u=n.interface.functions,l={};for(const e of Object.keys(u))l[u[e].name]=e;const g={};for(const e of Object.keys(n))g[e]=n[e];g.functions={};for(const e of Object.keys(n.functions))g.functions[e]=n.functions[e];function f(e,t){let r=d[t];if(!r){let i=n.interface.functions[t];i||(i=n.interface.functions[l[t]]),r=new Proxy(e[t],{apply:(n,r,d)=>__awaiter(this,void 0,void 0,function*(){const r=d.length;let u,l,g;r===i.inputs.length+1&&"object"==typeof d[r-1]&&(u=d[r]),u&&(l=u.outcome,delete(u=Object.assign({},u)).outcome),c({name:o,method:t,overrides:u,outcome:l});try{g=yield n.bind(e)(...d)}catch(e){throw s({name:o,method:t,overrides:u,outcome:l}),e}return a({hash:g.hash,name:o,method:t,overrides:u,outcome:l}),g})}),d[t]=r}return r}const v=new Proxy(g.functions,{get:(e,t)=>f(n.functions,t)});return new Proxy(g,{get:(t,i)=>"functions"===i?v:n.functions[i]?f(n.functions,i):"_proxiedContract"===i?n:"connect"===i?t=>e(n.connect(t),o,r):"toJSON"===i?()=>({address:n.address,abi:n.interface.fragments,functionsSignatures:n.interface.fragments.map(e=>e.format("full"))}):t[i]})},n.proxyWeb3Provider=function(e,n){const o=n?Object.assign({onTxRequested:t.noop,onTxCancelled:t.noop,onTxSent:t.noop,onSignatureRequested:t.noop,onSignatureCancelled:t.noop,onSignatureReceived:t.noop},n):{onTxRequested:t.noop,onTxCancelled:t.noop,onTxSent:t.noop,onSignatureRequested:t.noop,onSignatureCancelled:t.noop,onSignatureReceived:t.noop},i=new Proxy(e.getSigner,{apply:(n,t,i)=>r(n.bind(e)(...i),o)});return new Proxy(e,{get:(e,n)=>"getSigner"===n?i:"signMessage"===n?i:"sendTransaction"===n?i:"connectUnchecked"===n?i:e[n]})}}),define("index",["require","exports","@ethersproject/contracts","@ethersproject/providers","utils/store","utils/builtin","utils/index","utils/ethers","named-logs","errors"],function(e,n,t,o,r,i,c,s,a,d){Object.defineProperty(n,"__esModule",{value:!0});const u=a.logs("web3w:index"),l="undefined"!=typeof window,g={state:"Idle",probing:!1,available:void 0,error:void 0,vendor:void 0},f={state:"Idle",fetching:!1,stale:void 0,amount:void 0,error:void 0,blockNumber:void 0},v={state:"Idle",connecting:!1,loadingData:!1,contracts:void 0,error:void 0},h={state:"Idle",connecting:!1,disconnecting:!1,loadingModule:!1,unlocking:!1,address:void 0,options:["builtin"],selected:void 0,pendingUserConfirmation:void 0,error:void 0},p={inProgress:!1,executing:!1,executionError:void 0,error:void 0};function m(e){const n=r.writable(e);return n.data=e,n}const b=[],w=m(h),y=m(b),x=m(g),_=m(v),C=m(f),I=m(p);function E(e,n){for(const t of Object.keys(n)){const o=n,r=e;if(r.data[t]&&"object"==typeof o[t])for(const e of Object.keys(o[t]))r.data[t][e]=o[t][e];else r.data[t]=o[t]}try{u.debug(JSON.stringify(e.data,null,"  "))}catch(n){u.error(n,e.data)}e.set(e.data)}let P,S,O,R,T,A,N,k,L,D,j,q=!1;function M(e){return __awaiter(this,void 0,void 0,function*(){if("0xNaN"===e){if(u.warn("onChainChanged bug (return 0xNaN), metamask bug?"),!S)throw new Error("no web3Provider to get chainId");e=yield F(S,"eth_chainId")}const n=parseInt(e.slice(2),16).toString();u.debug("onChainChanged",{chainId:e,chainIdAsDecimal:n}),E(_,{contracts:void 0,addresses:void 0,state:"Connected",chainId:n,notSupported:void 0}),h.address&&(u.log("LOAD_CHAIN from chainChanged"),yield ee(n,h.address,!0))})}function U(e){return e[0]!==h.address}function H(e){return __awaiter(this,void 0,void 0,function*(){if(!U(e))return void u.debug("false account changed",e);u.debug("onAccountsChanged",{accounts:e});const n=e[0];if(n)if(E(w,{address:n,state:"Ready"}),"Connected"===v.state){if(!v.chainId)throw new Error("no chainId while connected");u.log("LOAD_CHAIN from accountsChanged"),yield ee(v.chainId,n,!1)}else te(n);else E(w,{address:n,state:"Locked"}),te(n)})}function F(e,n,t){var o;if(e.request)return e.request({method:n,params:t});const r=null===(o=e.sendAsync)||void 0===o?void 0:o.bind(e);if(r)return new Promise((e,o)=>{r({method:n,params:t},(n,t)=>{n?o(n):t.error?o(t.error):e(t.result)})});throw new Error("provider not supported")}function W(e){return new Promise(n=>{setTimeout(n,e)})}function V(e,n){return __awaiter(this,void 0,void 0,function*(){for(;q;){let t=[];try{t=yield F(e,"eth_accounts")}catch(e){}if(u.debug({accounts:t}),q&&U(t))try{n(t)}catch(e){u.error(e)}yield W(3e3)}})}function G(){S&&!q&&(u.log("LISTENNING"),S.on?(S.on("chainChanged",M),S.on("accountsChanged",H),V(S,H)):(!function(e,n){__awaiter(this,void 0,void 0,function*(){for(;q;){const t=yield F(e,"eth_chainId"),o=parseInt(t.slice(2),16).toString();if(q&&v.chainId!==o)try{n(t)}catch(e){u.error(e)}yield W(3e3)}})}(S,M),V(S,H)),q=!0)}function $({chainId:e}){const n=parseInt(e.slice(2),16).toString();u.debug("onConnect",{chainId:e,chainIdAsDecimal:n})}function B(e){u.debug("onDisconnect",{error:e})}function Y(e){return"string"==typeof e&&e.length>2&&"0x"===e.slice(0,2).toLowerCase()}function J(e){h.pendingUserConfirmation?h.pendingUserConfirmation.push(e):h.pendingUserConfirmation=[e],E(w,{pendingUserConfirmation:h.pendingUserConfirmation})}function X(e){if(h.pendingUserConfirmation){const n=h.pendingUserConfirmation.indexOf(e);n>=0&&(h.pendingUserConfirmation.splice(n,1),0===h.pendingUserConfirmation.length&&(h.pendingUserConfirmation=void 0),E(w,{pendingUserConfirmation:h.pendingUserConfirmation}))}}const z={onTxRequested:e=>{u.debug("onTxRequested",{transaction:e}),J("transaction")},onTxCancelled:e=>{u.debug("onTxCancelled",{transaction:e}),X("transaction")},onTxSent:e=>{u.debug("onTxSent",{transaction:e}),X("transaction")},onSignatureRequested:e=>{u.debug("onSignatureRequested",{message:e}),J("signature")},onSignatureCancelled:e=>{u.debug("onSignatureCancelled",{message:e}),X("signature")},onSignatureReceived:e=>{u.debug("onSignatureReceived",{signature:e}),X("signature")},onContractTxRequested:({name:e,method:n,overrides:t,outcome:o})=>{u.debug("onContractTxRequest",{name:e,method:n,overrides:t,outcome:o})},onContractTxCancelled:({name:e,method:n,overrides:t,outcome:o})=>{u.debug("onContractTxCancelled",{name:e,method:n,overrides:t,outcome:o})},onContractTxSent:({hash:e,name:n,method:t,overrides:o,outcome:r})=>{u.debug("onContractTxSent",{hash:e,name:n,method:t,overrides:o,outcome:r}),e&&function(e){b.push(e),y.set(b)}({hash:e,name:n,method:t,overrides:o,outcome:r})}},K="_web3w_previous_wallet_type";function Q(e){localStorage.setItem(K,e)}function Z(e,n){return __awaiter(this,void 0,void 0,function*(){const t=ne(n);let o;if("Idle"===v.state){let e;E(_,{connecting:!0});try{e=(yield t.getNetwork()).chainId}catch(e){const n={code:d.CHAIN_ID_FAILED,message:"Failed to fetch chainId"};throw E(_,{error:n,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(n.message)}o=String(e),E(_,{chainId:o,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Connected"})}else o=v.chainId;if(!o){const e={code:d.CHAIN_ID_NOT_SET,message:"chainId is not set even though chain is connected"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}u.log("LOAD_CHAIN from setupChain"),yield ee(o,e,n)})}function ee(e,n,o){return __awaiter(this,void 0,void 0,function*(){const r=ne(o);E(_,{loadingData:!0});const i={},c={};let a={},l=R;if("function"==typeof l&&(l=yield l(e)),l){if(l.chainId){const n=l;if(e!==n.chainId&&e!=(Y(g=n.chainId)?""+parseInt(g.slice(2)):g)){const t={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig only available for ${n.chainId} , not available for ${e}`};throw E(_,{error:t,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(t.message)}a=n.contracts}else{const n=l,t=n[e]||n[function(e){return Y(e)?e:"0x"+parseInt(e).toString(16)}(e)];if(!t){const n={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig not available for ${e}`};throw E(_,{error:n,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(n.message)}a=t.contracts}for(const e of Object.keys(a)){const o=a[e];o.abi&&(i[e]=s.proxyContract(new t.Contract(o.address,o.abi,r.getSigner(n)),e,z)),c[e]=o.address}}var g;if(E(_,{state:"Ready",loadingData:!1,connecting:!1,chainId:e,addresses:c,contracts:i}),"Ready"===h.state&&(u.log("READY"),L&&void 0===p.executionError&&!p.executing)){u.log(" => executing...");const e=L;if(j){let n;try{u.log("executing after chain Setup"),n=j(i)}catch(e){return void E(I,{executionError:e,executing:!1})}"then"in n?(E(I,{error:void 0,executionError:void 0,executing:!0}),n.then(()=>{E(I,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),e(i),k=void 0,D=void 0,L=void 0}).catch(e=>{E(I,{executionError:e,executing:!1})})):(E(I,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),L(i))}else E(I,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),L(i)}})}function ne(e){if(void 0===P||void 0===S){const e={code:d.CHAIN_NO_PROVIDER,message:"no provider setup yet"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}return e&&(P=s.proxyWeb3Provider(new o.Web3Provider(S),z)),P}function te(e){const n=ne(!1),t=v.contracts;if(t)for(const o of Object.keys(t))t[o]=t[o].connect(e?n.getSigner(e):n)}function oe(e,n){return __awaiter(this,void 0,void 0,function*(){!h.selected||"Ready"!==h.state&&"Locked"!==h.state||(yield ue());let t,r=e;if(!r)if(0===A.length)r="builtin";else{if(1!==A.length){const e=`No Wallet Type Specified, choose from ${h.options}`;throw new Error(e)}r=A[0]}if("builtin"==r&&"Ready"===g.state&&!g.available){throw new Error("No Builtin Wallet")}if(E(w,{address:void 0,connecting:!0,selected:e,state:"Idle",error:void 0}),P=void 0,S=void 0,"builtin"===r){T=void 0;const e=yield ce();S=e,P=s.proxyWeb3Provider(new o.Web3Provider(e),z)}else{let t;if("string"==typeof r){if(A)for(const n of A)"string"!=typeof n&&n.id===e&&(t=n)}else e=(t=r).id;if(!t){const n=`no module found ${e}`;throw E(w,{error:{message:n,code:1},selected:void 0,connecting:!1}),new Error(n)}try{"load"in t&&(E(w,{loadingModule:!0}),t=yield t.load(),E(w,{loadingModule:!1}));const{web3Provider:e}=yield t.setup(n);S=e,P=s.proxyWeb3Provider(new o.Web3Provider(S),z),T=t}catch(e){throw"USER_CANCELED"===e.message?E(w,{connecting:!1,selected:void 0,loadingModule:!1}):E(w,{error:{code:d.MODULE_ERROR,message:e.message},selected:void 0,connecting:!1,loadingModule:!1}),e}}if(!P){const n=`no provider found for wallet type ${e}`;throw E(w,{error:{message:n,code:1},selected:void 0,connecting:!1}),new Error(n)}S&&(u.debug("listenning for connection..."),S.on&&S.on("connect",$),S.on&&S.on("disconnect",B));try{t="builtin"===e&&"Metamask"===g.vendor?yield c.timeout(2e3,P.listAccounts(),{error:'Metamask timed out. Please reload the page (see <a href="https://github.com/MetaMask/metamask-extension/issues/7221">here</a>)'}):yield P.listAccounts()}catch(e){throw E(w,{error:e,selected:void 0,connecting:!1}),e}Q(e);const i=t&&t[0];i?(E(w,{address:i,state:"Ready",connecting:void 0}),G(),u.log("SETUP_CHAIN from select"),yield Z(i,!1)):(G(),E(w,{address:void 0,state:"Locked",connecting:void 0}))})}let re,ie;function ce(){return re||(re=new Promise((e,n)=>__awaiter(this,void 0,void 0,function*(){if("Ready"===g.state)return e();E(x,{probing:!0});try{const e=yield i.fetchEthereum();e?(e.autoRefreshOnNetworkChange=!1,O=e,E(x,{state:"Ready",vendor:i.getVendor(e),available:!0,probing:!1})):E(x,{state:"Ready",vendor:void 0,available:!1,probing:!1})}catch(e){return E(x,{error:e.message||e,vendor:void 0,available:void 0,probing:!1}),n(e)}e(O)})))}function se(e,n){return __awaiter(this,void 0,void 0,function*(){return yield oe(e,n),"Locked"!==h.state||le()})}function ae(e){return()=>{E(e,{error:void 0})}}function de(e){S&&q&&(u.log("STOP LISTENNING"),u.debug("stop listenning for changes..."),S.removeListener&&S.removeListener("chainChanged",M),S.removeListener&&S.removeListener("accountsChanged",H),q=!1),S&&(u.debug("stop listenning for connection..."),S.removeListener&&S.removeListener("connect",$),S.removeListener&&S.removeListener("disconnect",B)),E(w,{state:"Idle",address:void 0,connecting:!1,unlocking:void 0,selected:void 0,error:void 0}),E(C,{state:"Idle",amount:void 0,error:void 0,blockNumber:void 0}),E(_,{contracts:void 0,addresses:void 0,state:"Idle",notSupported:void 0,chainId:void 0,error:void 0}),e||E(I,{error:void 0,executing:!1,executionError:void 0,inProgress:!1}),j=void 0,D=void 0,L=void 0,k=void 0,Q("")}function ue(e){if(h.disconnecting)throw new Error("already disconnecting");const n=e&&e.logout,t=e&&e.wait,o=e&&e.keepFlow;return new Promise((e,r)=>{if(T)if(n){let n;try{n=T.logout()}catch(e){r(e)}t&&n&&"then"in n?(E(w,{disconnecting:!0}),n.then(()=>{T&&T.disconnect(),T=void 0,de(o),E(w,{disconnecting:!1}),e()}).catch(e=>{E(w,{disconnecting:!1,error:e}),r(e)})):(T.disconnect(),T=void 0,de(o),e())}else T.disconnect(),T=void 0,de(o),e();else de(o),e()})}function le(){if(ie)return ie;let e=!1;const n=new Promise((n,t)=>__awaiter(this,void 0,void 0,function*(){if("Locked"===h.state){let t;E(w,{unlocking:!0});try{t=(t=yield null==P?void 0:P.send("eth_requestAccounts",[]))||[]}catch(e){t=[]}if(!(t.length>0))return E(w,{unlocking:!1}),ie=void 0,e=!0,n(!1);{const e=t[0];E(w,{address:e,state:"Ready",unlocking:void 0}),u.log("SETUP_CHAIN from unlock"),yield Z(e,!0)}return ie=void 0,e=!0,n(!0)}return e=!0,t(new Error("Not Locked"))}));return e||(ie=n),n}function ge(){if(u.log("RETRYING..."),"Ready"===v.state&&"Ready"===h.state){if(v.contracts){const e=v.contracts;if(j){let n;try{u.log("EXECUTING RETRY"),n=j(e)}catch(e){return E(I,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in n)return E(I,{executing:!0}),n.then(()=>(j=void 0,E(I,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),L&&L(e))).catch(e=>(E(I,{executionError:e,executing:!1}),Promise.reject(e)))}return L&&L(e),Promise.resolve()}return Promise.reject("contracts not set")}return"Locked"===h.state?N.flow&&N.flow.autoUnlock&&le().catch(e=>{E(I,{error:e})}):"Idle"===h.state&&1===h.options.length&&N.flow&&N.flow.autoSelect&&se(h.options[0]).catch(e=>{E(I,{error:e})}),k?k.then(()=>void 0):Promise.resolve()}function fe(e,n){return p.inProgress&&pe(),he(void 0,e,n)}function ve(e){return he(e)}function he(e,n,t){if(p.inProgress)throw new Error("flow in progress");if("Ready"===v.state&&"Ready"===h.state&&(!n||n===h.selected)){if(D=void 0,L=void 0,k=void 0,v.contracts){const n=v.contracts;if(e){let t;try{u.log("EXECUTING DIRECT"),t=e(n)}catch(e){return E(I,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in t)return j=e,E(I,{inProgress:!0,error:void 0,executing:!0}),t.then(()=>(j=void 0,E(I,{inProgress:!1,error:void 0,executionError:void 0}),n)).catch(e=>(E(I,{executionError:e,executing:!1}),Promise.reject(e)))}return Promise.resolve(n)}return Promise.reject("contracts not set")}return k||(j=e,E(I,{inProgress:!0,executing:!1,executionError:void 0,error:void 0}),k=new Promise((e,n)=>{L=e,D=n}),n&&n!==h.selected?ue().catch(e=>{E(I,{error:e})}).then(()=>{se(n,t).catch(e=>{E(I,{error:e})})}):"Locked"===h.state?N.flow&&N.flow.autoUnlock&&le().catch(e=>{E(I,{error:e})}):"Idle"===h.state&&1===h.options.length&&N.flow&&N.flow.autoSelect&&se(h.options[0]).catch(e=>{E(I,{error:e})}),k)}function pe(){D&&D({code:1,message:"Cancel"}),k=void 0,D=void 0,L=void 0,j=void 0,E(I,{inProgress:!1,error:void 0,executionError:void 0,executing:!1})}n.default=(e=>{(e=Object.assign({},e||{})).options&&0!==e.options.length||(e.options=["builtin"]),e.builtin=e.builtin||{autoProbe:!1},e.flow=e.flow||{autoSelect:!1,autoUnlock:!1};const{debug:n,chainConfigs:t,builtin:o}=e;if(N=e,R=t,n&&"undefined"!=typeof window&&(window.$wallet=h,window.$transactions=b),A=e.options,E(w,{state:"Idle",options:A.map(e=>{if("object"==typeof e){if(!e.id)throw new Error("options need to be string or have an id");return e.id}return e})}),E(x,{state:"Idle"}),E(_,{state:"Idle"}),E(C,{state:"Idle"}),l){if(e.autoSelectPrevious){const e=localStorage.getItem(K);e&&""!==e&&oe(e)}o.autoProbe&&ce()}return{transactions:{subscribe:y.subscribe},balance:{subscribe:C.subscribe,acknowledgeError:ae(C)},chain:{subscribe:_.subscribe,acknowledgeError:ae(_)},builtin:{subscribe:x.subscribe,acknowledgeError:ae(x),probe:ce},wallet:{subscribe:w.subscribe,connect:se,unlock:le,acknowledgeError:ae(w),disconnect:ue,get options(){return h.options},get address(){return h.address},get provider(){return P},get web3Provider(){return S},get chain(){return v},get contracts(){return v.contracts},get balance(){return f.amount}},flow:{subscribe:I.subscribe,execute:ve,retry:ge,cancel:pe,connect:fe}}})}),define("utils/web",["require","exports"],function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.isPrivateWindow=void 0,n.isPrivateWindow=function(){return new Promise(function(e){if("undefined"!=typeof window)try{if(navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1==navigator.userAgent.indexOf("CriOS")&&-1==navigator.userAgent.indexOf("FxiOS")){let n=!1;if(window.safariIncognito)n=!0;else try{window.openDatabase(null,null,null,null),window.localStorage.setItem("test",1),e(!1)}catch(t){n=!0,e(!0)}}else if(navigator.userAgent.includes("Firefox")){const n=indexedDB.open("test");n.onerror=function(){e(!0)},n.onsuccess=function(){e(!1)}}else if(navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Trident")||navigator.userAgent.includes("msie"))window.indexedDB||!window.PointerEvent&&!window.MSPointerEvent||e(!0),e(!1);else{(function(){const e=navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);if(null!=e&&5==e.length)return e.map(e=>parseInt(e,10))[1]>=76})()&&e(function(){return __awaiter(this,void 0,void 0,function*(){if("storage"in navigator&&"estimate"in navigator.storage){const{quota:e}=yield navigator.storage.estimate();return!!(e&&e<12e7)}return!1})}());const n=window.RequestFileSystem||window.webkitRequestFileSystem;n?n(window.TEMPORARY,100,function(){e(!1)},function(){e(!0)}):e(!1)}}catch(n){console.error(n),e(!1)}else e(!1)})}});