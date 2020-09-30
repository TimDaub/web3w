"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function c(e){try{a(o.next(e))}catch(e){i(e)}}function s(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(c,s)}a((o=o.apply(e,t||[])).next())})};define("errors",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.CHAIN_ID_NOT_SET=t.CHAIN_ID_FAILED=t.MODULE_ERROR=t.CHAIN_CONFIG_NOT_AVAILABLE=t.CHAIN_NO_PROVIDER=void 0,t.CHAIN_NO_PROVIDER=6e3,t.CHAIN_CONFIG_NOT_AVAILABLE=6001,t.MODULE_ERROR=1e3,t.CHAIN_ID_FAILED=2001,t.CHAIN_ID_NOT_SET=2002}),define("utils/internals",["require","exports"],function(e,t){function n(e,n,o){if(null==e)return t.noop;const r=e.subscribe(n,o);return r.unsubscribe?()=>r.unsubscribe():r}Object.defineProperty(t,"__esModule",{value:!0}),t.get_store_value=t.safe_not_equal=t.subscribe=t.noop=void 0,t.noop=(()=>void 0),t.subscribe=n,t.safe_not_equal=function(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e},t.get_store_value=function(e){let t;return n(e,e=>t=e)(),t}}),define("utils/store",["require","exports","utils/internals"],function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.get=t.writable=t.readable=void 0,Object.defineProperty(t,"get",{enumerable:!0,get:function(){return n.get_store_value}});const o=[];function r(e,t=n.noop){let r=null;const i=[];function c(t){if(n.safe_not_equal(e,t)&&(e=t,r)){const t=!o.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),o.push(n,e)}if(t){for(let e=0;e<o.length;e+=2)o[e][0](o[e+1]);o.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(o,s=n.noop){const a=[o,s];return i.push(a),1===i.length&&(r=t(c)||n.noop),o(e),()=>{const e=i.indexOf(a);-1!==e&&i.splice(e,1),0===i.length&&null!==r&&(r(),r=null)}}}}t.readable=function(e,t){return{subscribe:r(e,t).subscribe}},t.writable=r}),define("utils/builtin",["require","exports"],function(e,t){function n(){if("undefined"!=typeof window){const e=window;if(e.ethereum)return e.ethereum;if(e.web3)return e.web3.currentProvider}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.getVendor=t.fetchEthereum=t.getEthereum=void 0,t.getEthereum=n,t.fetchEthereum=function(){return new Promise(e=>{"complete"!==document.readyState?document.onreadystatechange=function(){"complete"===document.readyState&&(document.onreadystatechange=null,e(n()))}:e(n())})},t.getVendor=function(e){return e?e.isMetaMask?"Metamask":-1!=navigator.userAgent.indexOf("Opera")||-1!=navigator.userAgent.indexOf("OPR/")?"Opera":"unknown":void 0}}),define("utils/index",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.timeout=void 0,t.timeout=function(e,t,n){return new Promise((o,r)=>{let i=!1;const c=setTimeout(()=>{i=!0,n?"function"==typeof n?o(n()):r(n.error||n):r(new Error("TimedOut"))},e);t.then(e=>{i||(clearTimeout(c),o(e))}).catch(e=>{i||(clearTimeout(c),r(e))})})}}),define("utils/ethers",["require","exports","utils/internals","named-logs"],function(e,t,n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.proxyWeb3Provider=t.proxyContract=void 0;const r=o.logs("web3w:ethers");function i(e,t,{onTxRequested:n,onTxCancelled:o,onTxSent:r,onSignatureRequested:i,onSignatureCancelled:c,onSignatureReceived:s}){t=Object.assign({sendTransaction:(t,i,c)=>__awaiter(this,void 0,void 0,function*(){const s=yield e.getAddress(),a=yield(yield e.getChainId()).toString(),d=Object.assign(Object.assign({},c[0]),{from:s,chainId:a});let u;n(d);try{u=yield t.bind(i)(...c)}catch(e){throw o(d),e}return r(Object.assign(Object.assign({},u),{chainId:a})),u}),signMessage:(t,n,o)=>__awaiter(this,void 0,void 0,function*(){const r=yield e.getAddress(),a={from:r,message:o[0]};let d;i(a);try{d=yield t.bind(n)(...o)}catch(e){throw c(a),e}return s({from:r,signature:d}),d})},t);const a={};return new Proxy(e,{get:(n,o)=>{const r=t[o];return r?function(t,n){let o=a[t];return o||(o=new Proxy(e[t],n),a[t]=o),o}(o,{apply:r}):n[o]}})}function c(e,t){return i(e,{connectUnchecked:(e,n,o)=>{return function(e,t){return i(e,{},t)}(e.bind(n)(...o),t)}},t)}t.proxyContract=function e(t,o,i,c){r.log("PROXY",{name:o});const s=c?Object.assign({onContractTxRequested:n.noop,onContractTxCancelled:n.noop,onContractTxSent:n.noop},c):{onContractTxRequested:n.noop,onContractTxCancelled:n.noop,onContractTxSent:n.noop},{onContractTxRequested:a,onContractTxCancelled:d,onContractTxSent:u}=s,l={},g=t.interface.fragments.filter(e=>"event"===e.type).map(e=>JSON.parse(e.format("json"))),f=t.interface.functions,v={};for(const e of Object.keys(f))v[f[e].name]=e;const h={};for(const e of Object.keys(t))h[e]=t[e];h.functions={};for(const e of Object.keys(t.functions))h.functions[e]=t.functions[e];function m(e,n){let r=l[n];if(!r){let c=t.interface.functions[n];c||(c=t.interface.functions[v[n]]),r=new Proxy(e[n],{apply:(r,s,l)=>__awaiter(this,void 0,void 0,function*(){const s=yield t.signer.getAddress(),f=l.length;let v,h,m,p=l;f===c.inputs.length+1&&"object"==typeof l[f-1]&&(p=p.slice(0,f-1),v=l[f]),v&&(h=v.metadata,delete(v=Object.assign({},v)).metadata),a({to:t.address,from:s,chainId:i,eventsABI:g,contractName:o,args:p,method:n,overrides:v,metadata:h});try{m=yield r.bind(e)(...l)}catch(e){throw d({to:t.address,from:s,chainId:i,eventsABI:g,contractName:o,args:p,method:n,overrides:v,metadata:h}),e}return u({hash:m.hash,to:t.address,from:s,chainId:i,eventsABI:g,contractName:o,args:p,method:n,overrides:v,metadata:h}),m})}),l[n]=r}return r}const p=new Proxy(h.functions,{get:(e,n)=>m(t.functions,n)});return new Proxy(h,{get:(n,r)=>"functions"===r?p:t.functions[r]?m(t.functions,r):"_proxiedContract"===r?t:"connect"===r?n=>e(t.connect(n),o,i,c):"toJSON"===r?()=>({address:t.address,abi:t.interface.fragments,functionsSignatures:t.interface.fragments.map(e=>e.format("full"))}):n[r]})},t.proxyWeb3Provider=function(e,t){const o=t?Object.assign({onTxRequested:n.noop,onTxCancelled:n.noop,onTxSent:n.noop,onSignatureRequested:n.noop,onSignatureCancelled:n.noop,onSignatureReceived:n.noop},t):{onTxRequested:n.noop,onTxCancelled:n.noop,onTxSent:n.noop,onSignatureRequested:n.noop,onSignatureCancelled:n.noop,onSignatureReceived:n.noop},r=new Proxy(e.getSigner,{apply:(t,n,r)=>c(t.bind(e)(...r),o)});return new Proxy(e,{get:(e,t)=>"getSigner"===t?r:e[t]})}}),define("index",["require","exports","@ethersproject/contracts","@ethersproject/providers","utils/store","utils/builtin","utils/index","utils/ethers","named-logs","errors"],function(e,t,n,o,r,i,c,s,a,d){Object.defineProperty(t,"__esModule",{value:!0});const u=a.logs("web3w:index"),l="undefined"!=typeof window,g={state:"Idle",probing:!1,available:void 0,error:void 0,vendor:void 0},f={state:"Idle",fetching:!1,stale:void 0,amount:void 0,error:void 0,blockNumber:void 0},v={state:"Idle",connecting:!1,loadingData:!1,contracts:void 0,error:void 0},h={state:"Idle",connecting:!1,disconnecting:!1,loadingModule:!1,unlocking:!1,address:void 0,options:["builtin"],selected:void 0,pendingUserConfirmation:void 0,error:void 0},m={inProgress:!1,executing:!1,executionError:void 0,error:void 0};function p(e){const t=r.writable(e);return t.data=e,t}const b=[],w=p(h),y=p(b),I=p(g),_=p(v),x=p(f),C=p(m);let S="_web3w_transactions",P="_web3w_previous_wallet_type";function E(e,t){for(const n of Object.keys(t)){const o=t,r=e;if(r.data[n]&&"object"==typeof o[n])for(const e of Object.keys(o[n]))r.data[n][e]=o[n][e];else r.data[n]=o[n]}try{u.debug(JSON.stringify(e.data,null,"  "))}catch(t){u.error(t,e.data)}e.set(e.data)}let O,N,R,A,T,k,L,j,q,D,M,U=!1;function H(e){return __awaiter(this,void 0,void 0,function*(){if("0xNaN"===e){if(u.warn("onChainChanged bug (return 0xNaN), metamask bug?"),!N)throw new Error("no web3Provider to get chainId");e=yield B(N,"eth_chainId")}const t=parseInt(e.slice(2),16).toString();u.debug("onChainChanged",{chainId:e,chainIdAsDecimal:t}),E(_,{contracts:void 0,addresses:void 0,state:"Connected",chainId:t,notSupported:void 0}),h.address&&(ye(h.address,t),u.log("LOAD_CHAIN from chainChanged"),yield te(t,h.address,!0))})}function $(e){return e[0]!==h.address}function F(e){return __awaiter(this,void 0,void 0,function*(){if(!$(e))return void u.debug("false account changed",e);u.debug("onAccountsChanged",{accounts:e});const t=e[0];if(t)if(E(w,{address:t,state:"Ready"}),v.chainId&&ye(t,v.chainId),"Connected"===v.state){if(!v.chainId)throw new Error("no chainId while connected");u.log("LOAD_CHAIN from accountsChanged"),yield te(v.chainId,t,!1)}else oe(t);else we(),E(w,{address:t,state:"Locked"}),oe(t)})}function B(e,t,n){var o;if(e.request)return e.request({method:t,params:n});const r=null===(o=e.sendAsync)||void 0===o?void 0:o.bind(e);if(r)return new Promise((e,o)=>{r({method:t,params:n},(t,n)=>{t?o(t):n.error?o(n.error):e(n.result)})});throw new Error("provider not supported")}function W(e){return new Promise(t=>{setTimeout(t,e)})}function V(e,t){return __awaiter(this,void 0,void 0,function*(){for(;U;){let n=[];try{n=yield B(e,"eth_accounts")}catch(e){}if(u.debug({accounts:n}),U&&$(n))try{t(n)}catch(e){u.error(e)}yield W(3e3)}})}function G(){N&&!U&&(u.log("LISTENNING"),N.on?(N.on("chainChanged",H),N.on("accountsChanged",F),V(N,F)):(!function(e,t){__awaiter(this,void 0,void 0,function*(){for(;U;){const n=yield B(e,"eth_chainId"),o=parseInt(n.slice(2),16).toString();if(U&&v.chainId!==o)try{t(n)}catch(e){u.error(e)}yield W(3e3)}})}(N,H),V(N,F)),U=!0)}function J(e){const t=e&&e.chainId;if(t){const e=parseInt(t.slice(2),16).toString();u.debug("onConnect",{chainId:t,chainIdAsDecimal:e})}else u.warn("onConnect","no connection object passed in")}function Y(e){u.debug("onDisconnect",{error:e})}function X(e){return"string"==typeof e&&e.length>2&&"0x"===e.slice(0,2).toLowerCase()}function z(e){h.pendingUserConfirmation?h.pendingUserConfirmation.push(e):h.pendingUserConfirmation=[e],E(w,{pendingUserConfirmation:h.pendingUserConfirmation})}function K(e){if(h.pendingUserConfirmation){const t=h.pendingUserConfirmation.indexOf(e);t>=0&&(h.pendingUserConfirmation.splice(t,1),0===h.pendingUserConfirmation.length&&(h.pendingUserConfirmation=void 0),E(w,{pendingUserConfirmation:h.pendingUserConfirmation}))}}const Q={onTxRequested:e=>{u.debug("onTxRequested",{txRequest:e}),z("transaction")},onTxCancelled:e=>{u.debug("onTxCancelled",{txRequest:e}),K("transaction")},onTxSent:({hash:e,from:t,gasLimit:n,nonce:o,gasPrice:r,data:i,value:c,chainId:s,to:a})=>{if(u.debug("onTxSent",{hash:e,from:t,gasLimit:n,nonce:o,gasPrice:r,data:i,value:c,chainId:s,to:a}),e){be(t,s,{hash:e,from:t,acknowledged:!1,cancelled:!1,cancelationAcknowledged:!1,to:a,nonce:o,gasLimit:n.toString(),gasPrice:r.toString(),data:i,value:c.toString(),chainId:s})}K("transaction")},onSignatureRequested:e=>{u.debug("onSignatureRequested",{sigRequest:e}),z("signature")},onSignatureCancelled:e=>{u.debug("onSignatureCancelled",{sigRequest:e}),K("signature")},onSignatureReceived:e=>{u.debug("onSignatureReceived",{sigResponse:e}),K("signature")},onContractTxRequested:({from:e,contractName:t,method:n,overrides:o,metadata:r})=>{u.debug("onContractTxRequest",{from:e,contractName:t,method:n,overrides:o,metadata:r})},onContractTxCancelled:({from:e,contractName:t,method:n,overrides:o,metadata:r})=>{u.debug("onContractTxCancelled",{from:e,contractName:t,method:n,overrides:o,metadata:r})},onContractTxSent:({hash:e,from:t,contractName:n,method:o,args:r,eventsABI:i,overrides:c,metadata:s,to:a,chainId:d})=>{var l,g,f;if(u.debug("onContractTxSent",{hash:e,from:t,contractName:n,method:o,args:r,eventsABI:i,overrides:c,metadata:s,to:a}),e){let u;c&&c.nonce&&(u=parseInt(c.nonce.toString())),be(t,d,{hash:e,from:t,acknowledged:!1,cancelled:!1,cancelationAcknowledged:!1,contractName:n,method:o,args:r,eventsABI:i,metadata:s,to:a,nonce:u,gasLimit:null===(l=null==c?void 0:c.gasLimit)||void 0===l?void 0:l.toString(),gasPrice:null===(g=null==c?void 0:c.gasPrice)||void 0===g?void 0:g.toString(),value:null===(f=null==c?void 0:c.value)||void 0===f?void 0:f.toString()})}}};function Z(e){try{localStorage.setItem(P,e)}catch(e){}}function ee(e,t){return __awaiter(this,void 0,void 0,function*(){const n=ne(t);let o;if("Idle"===v.state){let e;E(_,{connecting:!0});try{e=(yield n.getNetwork()).chainId}catch(e){const t={code:d.CHAIN_ID_FAILED,message:"Failed to fetch chainId"};throw E(_,{error:t,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(t.message)}o=String(e),E(_,{chainId:o,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Connected"})}else o=v.chainId;if(!o){const e={code:d.CHAIN_ID_NOT_SET,message:"chainId is not set even though chain is connected"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}ye(e,o),u.log("LOAD_CHAIN from setupChain"),yield te(o,e,t)})}function te(e,t,o){return __awaiter(this,void 0,void 0,function*(){const r=ne(o);E(_,{loadingData:!0});const i={},c={};let a={},l=A;if("function"==typeof l&&(l=yield l(e)),l){if(l.chainId){const t=l;if(e!==t.chainId&&e!=(X(g=t.chainId)?""+parseInt(g.slice(2)):g)){const n={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig only available for ${t.chainId} , not available for ${e}`};throw E(_,{error:n,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(n.message)}a=t.contracts}else{const t=l,n=t[e]||t[function(e){return X(e)?e:"0x"+parseInt(e).toString(16)}(e)];if(!n){const t={code:d.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig not available for ${e}`};throw E(_,{error:t,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(t.message)}a=n.contracts}for(const o of Object.keys(a)){const d=a[o];d.abi&&(u.log({contractName:o}),i[o]=s.proxyContract(new n.Contract(d.address,d.abi,r.getSigner(t)),o,e,Q)),c[o]=d.address}}var g;if(E(_,{state:"Ready",loadingData:!1,connecting:!1,chainId:e,addresses:c,contracts:i}),"Ready"===h.state&&(u.log("READY"),q&&void 0===m.executionError&&!m.executing)){u.log(" => executing...");const e=q;if(M){let t;try{u.log("executing after chain Setup"),t=M(i)}catch(e){return void E(C,{executionError:e,executing:!1})}"then"in t?(E(C,{error:void 0,executionError:void 0,executing:!0}),t.then(()=>{E(C,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),e(i),j=void 0,D=void 0,q=void 0}).catch(e=>{E(C,{executionError:e,executing:!1})})):(E(C,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q(i),j=void 0,D=void 0,q=void 0)}else E(C,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q(i),j=void 0,D=void 0,q=void 0}})}function ne(e){if(void 0===O||void 0===N){const e={code:d.CHAIN_NO_PROVIDER,message:"no provider setup yet"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}return e&&(O=s.proxyWeb3Provider(new o.Web3Provider(N),Q)),O}function oe(e){const t=ne(!1),n=v.contracts;if(n)for(const o of Object.keys(n))n[o]=n[o].connect(e?t.getSigner(e):t)}function re(e,t){return __awaiter(this,void 0,void 0,function*(){!h.selected||"Ready"!==h.state&&"Locked"!==h.state||(yield le());let n,r=e;if(!r)if(0===k.length)r="builtin";else{if(1!==k.length){const e=`No Wallet Type Specified, choose from ${h.options}`;throw new Error(e)}r=k[0]}if("builtin"==r&&"Ready"===g.state&&!g.available){throw new Error("No Builtin Wallet")}if(E(w,{address:void 0,connecting:!0,selected:e,state:"Idle",error:void 0}),O=void 0,N=void 0,"builtin"===r){T=void 0;const e=yield se();N=e,O=s.proxyWeb3Provider(new o.Web3Provider(e),Q)}else{let n;if("string"==typeof r){if(k)for(const t of k)"string"!=typeof t&&t.id===e&&(n=t)}else e=(n=r).id;if(!n){const t=`no module found ${e}`;throw E(w,{error:{message:t,code:1},selected:void 0,connecting:!1}),new Error(t)}try{"load"in n&&(E(w,{loadingModule:!0}),n=yield n.load(),E(w,{loadingModule:!1})),u.log("setting up module");const{web3Provider:e}=yield n.setup(t);u.log("module setup"),N=e,O=s.proxyWeb3Provider(new o.Web3Provider(N),Q),T=n}catch(e){throw"USER_CANCELED"===e.message?E(w,{connecting:!1,selected:void 0,loadingModule:!1}):E(w,{error:{code:d.MODULE_ERROR,message:e.message},selected:void 0,connecting:!1,loadingModule:!1}),e}}if(!O){const t=`no provider found for wallet type ${e}`;throw E(w,{error:{message:t,code:1},selected:void 0,connecting:!1}),new Error(t)}N&&(u.debug("listenning for connection..."),N.on&&N.on("connect",J),N.on&&N.on("disconnect",Y));try{"builtin"===e&&"Metamask"===g.vendor?n=yield c.timeout(2e3,O.listAccounts(),{error:'Metamask timed out. Please reload the page (see <a href="https://github.com/MetaMask/metamask-extension/issues/7221">here</a>)'}):(u.log("fetching accounts..."),n=yield O.listAccounts(),u.log(`accounts: ${n}`))}catch(e){throw E(w,{error:e,selected:void 0,connecting:!1}),e}Z(e);const i=n&&n[0];i?(E(w,{address:i,state:"Ready",connecting:void 0}),G(),u.log("SETUP_CHAIN from select"),yield ee(i,!1)):(G(),E(w,{address:void 0,state:"Locked",connecting:void 0}))})}let ie,ce;function se(){return ie||(ie=new Promise((e,t)=>__awaiter(this,void 0,void 0,function*(){if("Ready"===g.state)return e();E(I,{probing:!0});try{const e=yield i.fetchEthereum();e?(e.autoRefreshOnNetworkChange=!1,R=e,E(I,{state:"Ready",vendor:i.getVendor(e),available:!0,probing:!1})):E(I,{state:"Ready",vendor:void 0,available:!1,probing:!1})}catch(e){return E(I,{error:e.message||e,vendor:void 0,available:void 0,probing:!1}),t(e)}e(R)})))}function ae(e,t){return __awaiter(this,void 0,void 0,function*(){return yield re(e,t),"Locked"!==h.state||ge()})}function de(e){return()=>{E(e,{error:void 0})}}function ue(e){N&&U&&(u.log("STOP LISTENNING"),u.debug("stop listenning for changes..."),N.removeListener&&N.removeListener("chainChanged",H),N.removeListener&&N.removeListener("accountsChanged",F),U=!1),N&&(u.debug("stop listenning for connection..."),N.removeListener&&N.removeListener("connect",J),N.removeListener&&N.removeListener("disconnect",Y)),E(w,{state:"Idle",address:void 0,connecting:!1,unlocking:void 0,selected:void 0,error:void 0}),we(),E(x,{state:"Idle",amount:void 0,error:void 0,blockNumber:void 0}),E(_,{contracts:void 0,addresses:void 0,state:"Idle",notSupported:void 0,chainId:void 0,error:void 0}),e||(E(C,{error:void 0,executing:!1,executionError:void 0,inProgress:!1}),M=void 0,D=void 0,q=void 0,j=void 0),Z("")}function le(e){if(h.disconnecting)throw new Error("already disconnecting");const t=e&&e.logout,n=e&&e.wait,o=e&&e.keepFlow;return new Promise((e,r)=>{if(T)if(t){let t;try{t=T.logout()}catch(e){r(e)}n&&t&&"then"in t?(E(w,{disconnecting:!0}),t.then(()=>{T&&T.disconnect(),T=void 0,ue(o),E(w,{disconnecting:!1}),e()}).catch(e=>{E(w,{disconnecting:!1,error:e}),r(e)})):(T.disconnect(),T=void 0,ue(o),e())}else T.disconnect(),T=void 0,ue(o),e();else ue(o),e()})}function ge(){if(ce)return ce;let e=!1;const t=new Promise((t,n)=>__awaiter(this,void 0,void 0,function*(){if("Locked"===h.state){let n;E(w,{unlocking:!0});try{n=(n=yield null==O?void 0:O.send("eth_requestAccounts",[]))||[]}catch(e){n=[]}if(!(n.length>0))return E(w,{unlocking:!1}),ce=void 0,e=!0,t(!1);{const e=n[0];E(w,{address:e,state:"Ready",unlocking:void 0}),u.log("SETUP_CHAIN from unlock"),yield ee(e,!0)}return ce=void 0,e=!0,t(!0)}return e=!0,n(new Error("Not Locked"))}));return e||(ce=t),t}function fe(){if(u.log("RETRYING..."),"Ready"===v.state&&"Ready"===h.state){if(v.contracts){const e=v.contracts;if(M){let t;try{u.log("EXECUTING RETRY"),t=M(e)}catch(e){return E(C,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in t)return E(C,{executing:!0}),t.then(()=>(M=void 0,E(C,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q&&q(e))).catch(e=>(E(C,{executionError:e,executing:!1}),Promise.reject(e)))}return q&&q(e),Promise.resolve()}return Promise.reject("contracts not set")}return"Locked"===h.state?L.flow&&L.flow.autoUnlock&&ge().catch(e=>{E(C,{error:e})}):"Idle"===h.state&&1===h.options.length&&L.flow&&L.flow.autoSelect&&ae(h.options[0]).catch(e=>{E(C,{error:e})}),j?j.then(()=>void 0):Promise.resolve()}function ve(e,t){return m.inProgress&&pe(),me(void 0,e,t)}function he(e){return me(e)}function me(e,t,n){if(m.inProgress)throw new Error("flow in progress");if("Ready"===v.state&&"Ready"===h.state&&(!t||t===h.selected)){if(D=void 0,q=void 0,j=void 0,v.contracts){const t=v.contracts;if(e){let n;try{u.log("EXECUTING DIRECT"),n=e(t)}catch(e){return E(C,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in n)return M=e,E(C,{inProgress:!0,error:void 0,executing:!0}),n.then(()=>(M=void 0,E(C,{inProgress:!1,error:void 0,executionError:void 0}),t)).catch(e=>(E(C,{executionError:e,executing:!1}),Promise.reject(e)))}return Promise.resolve(t)}return Promise.reject("contracts not set")}return j||(M=e,E(C,{inProgress:!0,executing:!1,executionError:void 0,error:void 0}),j=new Promise((e,t)=>{q=e,D=t}),t&&t!==h.selected?h.selected?le({keepFlow:!0}).catch(e=>{E(C,{error:e})}).then(()=>{ae(t,n).catch(e=>{E(C,{error:{code:11,message:`failed to connect to ${t}`,errorObject:e}}),le()})}):ae(t,n).catch(e=>{E(C,{error:{code:11,message:`failed to connect to ${t}`,errorObject:e}}),le()}):"Locked"===h.state?L.flow&&L.flow.autoUnlock&&ge().catch(e=>{E(C,{error:e})}):"Idle"===h.state&&1===h.options.length&&L.flow&&L.flow.autoSelect&&ae(h.options[0]).catch(e=>{E(C,{error:e})}),j)}function pe(){D&&D({code:1,message:"Cancel"}),j=void 0,D=void 0,q=void 0,M=void 0,E(C,{inProgress:!1,error:void 0,executionError:void 0,executing:!1})}function be(e,t,n){!function(e,t,n,o){if(h.address&&h.address.toLowerCase()===e.toLowerCase()&&v.chainId&&t===v.chainId){u.log("TransactionRecord",n);const r=b.find(e=>e.hash===n.hash);if(r){const e=r,t=n;for(const n of Object.keys(t))(!o&&void 0===e[n]||o&&void 0!==t[n])&&(e[n]=t[n])}else b.push(n);try{localStorage.setItem(S+`_${e.toLowerCase()}_${t}`,JSON.stringify(b))}catch(e){}y.set(b)}else try{const r=S+`_${e.toLowerCase()}_${t}`,i=localStorage.getItem(r)||"[]",c=JSON.parse(i),s=c.find(e=>e.hash===n.hash);if(s){const e=s,t=n;for(const r of Object.keys(n))(!o&&void 0===e[r]||o&&void 0!==t[r])&&(e[r]=t[r])}else c.push(n);localStorage.setItem(r,JSON.stringify(c))}catch(e){}}(e,t,n,!1)}function we(){b.splice(0,b.length),y.set(b)}function ye(e,t){try{const n=localStorage.getItem(S+`_${e.toLowerCase()}_${t}`);let o=[];n&&(o=JSON.parse(n)),b.splice(0,b.length,...o),y.set(b)}catch(e){}}t.default=(e=>{P=(e.localStoragePrefix||"")+P,S=(e.localStoragePrefix||"")+S,(e=Object.assign({},e||{})).options&&0!==e.options.length||(e.options=["builtin"]),e.builtin=e.builtin||{autoProbe:!1},e.flow=e.flow||{autoSelect:!1,autoUnlock:!1};const{debug:t,chainConfigs:n,builtin:o}=e;if(L=e,A=n,t&&"undefined"!=typeof window&&(window.$wallet=h,window.$transactions=b),k=e.options,E(w,{state:"Idle",options:k.map(e=>{if("object"==typeof e){if(!e.id)throw new Error("options need to be string or have an id");return e.id}return e})}),E(I,{state:"Idle"}),E(_,{state:"Idle"}),E(x,{state:"Idle"}),l){if(e.autoSelectPrevious){const e=function(){try{return localStorage.getItem(P)}catch(e){return null}}();e&&""!==e&&re(e)}o.autoProbe&&se()}return{transactions:{subscribe:y.subscribe},balance:{subscribe:x.subscribe,acknowledgeError:de(x)},chain:{subscribe:_.subscribe,acknowledgeError:de(_)},builtin:{subscribe:I.subscribe,acknowledgeError:de(I),probe:se},wallet:{subscribe:w.subscribe,connect:ae,unlock:ge,acknowledgeError:de(w),disconnect:le,get options(){return h.options},get address(){return h.address},get provider(){return O},get web3Provider(){return N},get chain(){return v},get contracts(){return v.contracts},get balance(){return f.amount}},flow:{subscribe:C.subscribe,execute:he,retry:fe,cancel:pe,connect:ve}}})}),define("utils/web",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.isPrivateWindow=void 0,t.isPrivateWindow=function(){return new Promise(function(e){if("undefined"!=typeof window)try{if(navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1==navigator.userAgent.indexOf("CriOS")&&-1==navigator.userAgent.indexOf("FxiOS")){let t=!1;if(window.safariIncognito)t=!0;else try{window.openDatabase(null,null,null,null),window.localStorage.setItem("test",1),e(!1)}catch(n){t=!0,e(!0)}}else if(navigator.userAgent.includes("Firefox")){const t=indexedDB.open("test");t.onerror=function(){e(!0)},t.onsuccess=function(){e(!1)}}else if(navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Trident")||navigator.userAgent.includes("msie"))window.indexedDB||!window.PointerEvent&&!window.MSPointerEvent||e(!0),e(!1);else{(function(){const e=navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);if(null!=e&&5==e.length)return e.map(e=>parseInt(e,10))[1]>=76})()&&e(function(){return __awaiter(this,void 0,void 0,function*(){if("storage"in navigator&&"estimate"in navigator.storage){const{quota:e}=yield navigator.storage.estimate();return!!(e&&e<12e7)}return!1})}());const t=window.RequestFileSystem||window.webkitRequestFileSystem;t?t(window.TEMPORARY,100,function(){e(!1)},function(){e(!0)}):e(!1)}}catch(t){console.error(t),e(!1)}else e(!1)})}});