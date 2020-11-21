"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function s(e){try{c(o.next(e))}catch(e){i(e)}}function a(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(s,a)}c((o=o.apply(e,t||[])).next())})};define("errors",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.CHAIN_ID_NOT_SET=t.CHAIN_ID_FAILED=t.MODULE_ERROR=t.CHAIN_CONFIG_NOT_AVAILABLE=t.CHAIN_NO_PROVIDER=void 0,t.CHAIN_NO_PROVIDER=6e3,t.CHAIN_CONFIG_NOT_AVAILABLE=6001,t.MODULE_ERROR=1e3,t.CHAIN_ID_FAILED=2001,t.CHAIN_ID_NOT_SET=2002}),define("utils/internals",["require","exports"],function(e,t){function n(e,n,o){if(null==e)return t.noop;const r=e.subscribe(n,o);return r.unsubscribe?()=>r.unsubscribe():r}Object.defineProperty(t,"__esModule",{value:!0}),t.get_store_value=t.safe_not_equal=t.subscribe=t.noop=void 0,t.noop=(()=>void 0),t.subscribe=n,t.safe_not_equal=function(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e},t.get_store_value=function(e){let t;return n(e,e=>t=e)(),t}}),define("utils/store",["require","exports","utils/internals"],function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.get=t.writable=t.readable=void 0,Object.defineProperty(t,"get",{enumerable:!0,get:function(){return n.get_store_value}});const o=[];function r(e,t=n.noop){let r=null;const i=[];function s(t){if(n.safe_not_equal(e,t)&&(e=t,r)){const t=!o.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),o.push(n,e)}if(t){for(let e=0;e<o.length;e+=2)o[e][0](o[e+1]);o.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(o,a=n.noop){const c=[o,a];return i.push(c),1===i.length&&(r=t(s)||n.noop),o(e),()=>{const e=i.indexOf(c);-1!==e&&i.splice(e,1),0===i.length&&null!==r&&(r(),r=null)}}}}t.readable=function(e,t){return{subscribe:r(e,t).subscribe}},t.writable=r}),define("utils/builtin",["require","exports"],function(e,t){function n(){if("undefined"!=typeof window){const e=window;if(e.ethereum)return e.ethereum;if(e.web3)return e.web3.currentProvider}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.getVendor=t.fetchEthereum=t.getEthereum=void 0,t.getEthereum=n,t.fetchEthereum=function(){return new Promise(e=>{"complete"!==document.readyState?document.onreadystatechange=function(){"complete"===document.readyState&&(document.onreadystatechange=null,e(n()))}:e(n())})},t.getVendor=function(e){return e?e.isMetaMask?"Metamask":-1!=navigator.userAgent.indexOf("Opera")||-1!=navigator.userAgent.indexOf("OPR/")?"Opera":"unknown":void 0}}),define("utils/index",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.timeout=void 0,t.timeout=function(e,t,n){return new Promise((o,r)=>{let i=!1;const s=setTimeout(()=>{i=!0,n?"function"==typeof n?o(n()):r(n.error||n):r(new Error("TimedOut"))},e);t.then(e=>{i||(clearTimeout(s),o(e))}).catch(e=>{i||(clearTimeout(s),r(e))})})}}),define("utils/ethers",["require","exports","utils/internals","named-logs"],function(e,t,n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.proxyWeb3Provider=t.proxyContract=void 0;const r=o.logs("web3w:ethers");function i(e,t,{onTxRequested:n,onTxCancelled:o,onTxSent:r,onSignatureRequested:i,onSignatureCancelled:s,onSignatureReceived:a}){t=Object.assign({sendTransaction:(t,i,s)=>__awaiter(this,void 0,void 0,function*(){const a=yield e.getAddress(),c=yield(yield e.getChainId()).toString(),d=Object.assign(Object.assign({},s[0]),{from:a,chainId:c});let u;n(d);try{u=yield t.bind(i)(...s)}catch(e){throw o(d),e}const l=(yield e.provider.getBlock("latest")).timestamp;return r(Object.assign(Object.assign({},u),{submissionBlockTime:l,chainId:c})),u}),signMessage:(t,n,o)=>__awaiter(this,void 0,void 0,function*(){const r=yield e.getAddress(),c={from:r,message:o[0]};let d;i(c);try{d=yield t.bind(n)(...o)}catch(e){throw s(c),e}return a({from:r,signature:d}),d})},t);const c={};return new Proxy(e,{get:(n,o)=>{const r=t[o];return r?function(t,n){let o=c[t];return o||(o=new Proxy(e[t],n),c[t]=o),o}(o,{apply:r}):n[o]}})}function s(e,t){return i(e,{connectUnchecked:(e,n,o)=>{return function(e,t){return i(e,{},t)}(e.bind(n)(...o),t)}},t)}t.proxyContract=function e(t,o,i,s){r.log("PROXY",{name:o});const a=s?Object.assign({onContractTxRequested:n.noop,onContractTxCancelled:n.noop,onContractTxSent:n.noop},s):{onContractTxRequested:n.noop,onContractTxCancelled:n.noop,onContractTxSent:n.noop},{onContractTxRequested:c,onContractTxCancelled:d,onContractTxSent:u}=a,l={},f=t.interface.fragments.filter(e=>"event"===e.type).map(e=>JSON.parse(e.format("json"))),g=t.interface.functions,h={};for(const e of Object.keys(g))h[g[e].name]=e;const v={};for(const e of Object.keys(t))v[e]=t[e];v.functions={};for(const e of Object.keys(t.functions))v.functions[e]=t.functions[e];function m(e,n){let r=l[n];if(!r){let s=t.interface.functions[n];s||(s=t.interface.functions[h[n]]),r=new Proxy(e[n],{apply:(r,a,l)=>__awaiter(this,void 0,void 0,function*(){const a=yield t.signer.getAddress(),g=l.length;let h,v,m,b=l;g===s.inputs.length+1&&"object"==typeof l[g-1]&&(b=b.slice(0,g-1),h=l[g]),h&&(v=h.metadata,delete(h=Object.assign({},h)).metadata),c({to:t.address,from:a,chainId:i,eventsABI:f,contractName:o,args:b,method:n,overrides:h,metadata:v});try{m=yield r.bind(e)(...l)}catch(e){throw d({to:t.address,from:a,chainId:i,eventsABI:f,contractName:o,args:b,method:n,overrides:h,metadata:v}),e}return u({hash:m.hash,to:t.address,from:a,chainId:i,eventsABI:f,contractName:o,args:b,method:n,overrides:h,metadata:v}),m})}),l[n]=r}return r}const b=new Proxy(v.functions,{get:(e,n)=>m(t.functions,n)});return new Proxy(v,{get:(n,r)=>"functions"===r?b:t.functions[r]?m(t.functions,r):"_proxiedContract"===r?t:"connect"===r?n=>e(t.connect(n),o,i,s):"toJSON"===r?()=>({address:t.address,abi:t.interface.fragments,functionsSignatures:t.interface.fragments.map(e=>e.format("full"))}):n[r]})},t.proxyWeb3Provider=function(e,t){const o=t?Object.assign({onTxRequested:n.noop,onTxCancelled:n.noop,onTxSent:n.noop,onSignatureRequested:n.noop,onSignatureCancelled:n.noop,onSignatureReceived:n.noop},t):{onTxRequested:n.noop,onTxCancelled:n.noop,onTxSent:n.noop,onSignatureRequested:n.noop,onSignatureCancelled:n.noop,onSignatureReceived:n.noop},r=new Proxy(e.getSigner,{apply:(t,n,r)=>s(t.bind(e)(...r),o)});return new Proxy(e,{get:(e,t)=>"getSigner"===t?r:e[t]})}}),define("index",["require","exports","@ethersproject/contracts","@ethersproject/providers","@ethersproject/abi","utils/store","utils/builtin","utils/index","utils/ethers","named-logs","errors"],function(e,t,n,o,r,i,s,a,c,d,u){Object.defineProperty(t,"__esModule",{value:!0});const l=d.logs("web3w:index"),f="undefined"!=typeof window,g={state:"Idle",probing:!1,available:void 0,error:void 0,vendor:void 0},h={state:"Idle",fetching:!1,stale:void 0,amount:void 0,error:void 0,blockNumber:void 0},v={state:"Idle",connecting:!1,loadingData:!1,contracts:void 0,error:void 0},m={state:"Idle",connecting:!1,disconnecting:!1,loadingModule:!1,unlocking:!1,address:void 0,options:["builtin"],selected:void 0,pendingUserConfirmation:void 0,error:void 0},b={inProgress:!1,executing:!1,executionError:void 0,error:void 0};function p(e){const t=i.writable(e);return t.data=e,t}const w=[],y=p(m),I=p(w),x=p(g),_=p(v),C=p(h),S=p(b);let P="_web3w_transactions",k="_web3w_previous_wallet_type";function E(e,t){for(const n of Object.keys(t)){const o=t,r=e;if(r.data[n]&&"object"==typeof o[n])for(const e of Object.keys(o[n]))r.data[n][e]=o[n][e];else r.data[n]=o[n]}try{l.debug(JSON.stringify(e.data,null,"  "))}catch(t){l.error(t,e.data)}e.set(e.data)}let O,N,R,A,T,L,j,D,q,M,U,$=!1;function H(e){return __awaiter(this,void 0,void 0,function*(){if("0xNaN"===e){if(l.warn("onChainChanged bug (return 0xNaN), metamask bug?"),!N)throw new Error("no web3Provider to get chainId");e=yield W(N,"eth_chainId")}const t=parseInt(e.slice(2),16).toString();l.debug("onChainChanged",{chainId:e,chainIdAsDecimal:t}),E(_,{contracts:void 0,addresses:void 0,state:"Connected",chainId:t,notSupported:void 0}),m.address&&(_e(m.address,t),l.log("LOAD_CHAIN from chainChanged"),yield ne(t,m.address,!0))})}function B(e){return e[0]!==m.address}function F(e){return __awaiter(this,void 0,void 0,function*(){if(!B(e))return void l.debug("false account changed",e);l.debug("onAccountsChanged",{accounts:e});const t=e[0];if(t)if(E(y,{address:t,state:"Ready"}),v.chainId&&_e(t,v.chainId),"Connected"===v.state){if(!v.chainId)throw new Error("no chainId while connected");l.log("LOAD_CHAIN from accountsChanged"),yield ne(v.chainId,t,!1)}else re(t);else xe(),E(y,{address:t,state:"Locked"}),re(t)})}function W(e,t,n){var o;if(e.request)return e.request({method:t,params:n});const r=null===(o=e.sendAsync)||void 0===o?void 0:o.bind(e);if(r)return new Promise((e,o)=>{r({method:t,params:n},(t,n)=>{t?o(t):n.error?o(n.error):e(n.result)})});throw new Error("provider not supported")}function J(e){return new Promise(t=>{setTimeout(t,e)})}function V(e,t){return __awaiter(this,void 0,void 0,function*(){for(;$;){let n=[];try{n=yield W(e,"eth_accounts")}catch(e){}if(l.debug({accounts:n}),$&&B(n))try{t(n)}catch(e){l.error(e)}yield J(3e3)}})}function G(){N&&!$&&(l.log("LISTENNING"),N.on?(N.on("chainChanged",H),N.on("accountsChanged",F),V(N,F)):(!function(e,t){__awaiter(this,void 0,void 0,function*(){for(;$;){const n=yield W(e,"eth_chainId"),o=parseInt(n.slice(2),16).toString();if($&&v.chainId!==o)try{t(n)}catch(e){l.error(e)}yield J(3e3)}})}(N,H),V(N,F)),$=!0)}function z(e){const t=e&&e.chainId;if(t){const e=parseInt(t.slice(2),16).toString();l.debug("onConnect",{chainId:t,chainIdAsDecimal:e})}else l.warn("onConnect","no connection object passed in")}function Y(e){l.debug("onDisconnect",{error:e})}function X(e){return"string"==typeof e&&e.length>2&&"0x"===e.slice(0,2).toLowerCase()}function K(e){m.pendingUserConfirmation?m.pendingUserConfirmation.push(e):m.pendingUserConfirmation=[e],E(y,{pendingUserConfirmation:m.pendingUserConfirmation})}function Q(e){if(m.pendingUserConfirmation){const t=m.pendingUserConfirmation.indexOf(e);t>=0&&(m.pendingUserConfirmation.splice(t,1),0===m.pendingUserConfirmation.length&&(m.pendingUserConfirmation=void 0),E(y,{pendingUserConfirmation:m.pendingUserConfirmation}))}}const Z={onTxRequested:e=>{l.debug("onTxRequested",{txRequest:e}),K("transaction")},onTxCancelled:e=>{l.debug("onTxCancelled",{txRequest:e}),Q("transaction")},onTxSent:({hash:e,from:t,gasLimit:n,nonce:o,gasPrice:r,data:i,value:s,chainId:a,to:c,submissionBlockTime:d})=>{if(l.debug("onTxSent",{hash:e,from:t,gasLimit:n,nonce:o,gasPrice:r,data:i,value:s,chainId:a,to:c}),e){!function(e,t,n){Ie(e,t,n,!0)}(t,a,{hash:e,from:t,acknowledged:!1,status:"pending",to:c,nonce:o,gasLimit:n.toString(),gasPrice:r.toString(),data:i,value:s.toString(),submissionBlockTime:d,confirmations:0,finalized:!1})}Q("transaction")},onSignatureRequested:e=>{l.debug("onSignatureRequested",{sigRequest:e}),K("signature")},onSignatureCancelled:e=>{l.debug("onSignatureCancelled",{sigRequest:e}),Q("signature")},onSignatureReceived:e=>{l.debug("onSignatureReceived",{sigResponse:e}),Q("signature")},onContractTxRequested:({from:e,contractName:t,method:n,overrides:o,metadata:r})=>{l.debug("onContractTxRequest",{from:e,contractName:t,method:n,overrides:o,metadata:r})},onContractTxCancelled:({from:e,contractName:t,method:n,overrides:o,metadata:r})=>{l.debug("onContractTxCancelled",{from:e,contractName:t,method:n,overrides:o,metadata:r})},onContractTxSent:({hash:e,from:t,contractName:n,method:o,args:r,eventsABI:i,overrides:s,metadata:a,to:c,chainId:d})=>{var u,f,g;if(l.debug("onContractTxSent",{hash:e,from:t,contractName:n,method:o,args:r,eventsABI:i,overrides:s,metadata:a,to:c}),e){let l;s&&s.nonce&&(l=parseInt(s.nonce.toString())),ye(t,d,{hash:e,from:t,acknowledged:!1,contractName:n,method:o,args:r,eventsABI:i,metadata:a,to:c,nonce:l,gasLimit:null===(u=null==s?void 0:s.gasLimit)||void 0===u?void 0:u.toString(),gasPrice:null===(f=null==s?void 0:s.gasPrice)||void 0===f?void 0:f.toString(),value:null===(g=null==s?void 0:s.value)||void 0===g?void 0:g.toString()},!1)}}};function ee(e){try{localStorage.setItem(k,e)}catch(e){}}function te(e,t){return __awaiter(this,void 0,void 0,function*(){const n=oe(t);let o;if("Idle"===v.state){let e;E(_,{connecting:!0});try{e=(yield n.getNetwork()).chainId}catch(e){const t={code:u.CHAIN_ID_FAILED,message:"Failed to fetch chainId"};throw E(_,{error:t,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(t.message)}o=String(e),E(_,{chainId:o,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Connected"})}else o=v.chainId;if(!o){const e={code:u.CHAIN_ID_NOT_SET,message:"chainId is not set even though chain is connected"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}_e(e,o),l.log("LOAD_CHAIN from setupChain"),yield ne(o,e,t)})}function ne(e,t,o){return __awaiter(this,void 0,void 0,function*(){const r=oe(o);E(_,{loadingData:!0});const i={},s={};let a={},d=A;if("function"==typeof d&&(d=yield d(e)),d){if(d.chainId){const t=d;if(e!==t.chainId&&e!=(X(f=t.chainId)?""+parseInt(f.slice(2)):f)){const n={code:u.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig only available for ${t.chainId} , not available for ${e}`};throw E(_,{error:n,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(n.message)}a=t.contracts}else{const t=d,n=t[e]||t[function(e){return X(e)?e:"0x"+parseInt(e).toString(16)}(e)];if(!n){const t={code:u.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig not available for ${e}`};throw E(_,{error:t,chainId:e,notSupported:!0,connecting:!1,loadingData:!1,state:"Connected"}),new Error(t.message)}a=n.contracts}for(const o of Object.keys(a)){const d=a[o];d.abi&&(l.log({contractName:o}),i[o]=c.proxyContract(new n.Contract(d.address,d.abi,r.getSigner(t)),o,e,Z)),s[o]=d.address}}var f;if(E(_,{state:"Ready",loadingData:!1,connecting:!1,chainId:e,addresses:s,contracts:i}),"Ready"===m.state&&(l.log("READY"),q&&void 0===b.executionError&&!b.executing)){l.log(" => executing...");const e=q;if(U){let t;try{l.log("executing after chain Setup"),t=U(i)}catch(e){return void E(S,{executionError:e,executing:!1})}"then"in t?(E(S,{error:void 0,executionError:void 0,executing:!0}),t.then(()=>{E(S,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),e(i),D=void 0,M=void 0,q=void 0}).catch(e=>{E(S,{executionError:e,executing:!1})})):(E(S,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q(i),D=void 0,M=void 0,q=void 0)}else E(S,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q(i),D=void 0,M=void 0,q=void 0}})}function oe(e){if(void 0===O||void 0===N){const e={code:u.CHAIN_NO_PROVIDER,message:"no provider setup yet"};throw E(_,{error:e,connecting:!1,loadingData:!1,contracts:void 0,addresses:void 0,state:"Idle"}),new Error(e.message)}return e&&(O=c.proxyWeb3Provider(new o.Web3Provider(N),Z)),O}function re(e){const t=oe(!1),n=v.contracts;if(n)for(const o of Object.keys(n))n[o]=n[o].connect(e?t.getSigner(e):t)}function ie(e,t){return __awaiter(this,void 0,void 0,function*(){!m.selected||"Ready"!==m.state&&"Locked"!==m.state||(yield ge());let n,r=e;if(!r)if(0===L.length)r="builtin";else{if(1!==L.length){const e=`No Wallet Type Specified, choose from ${m.options}`;throw new Error(e)}r=L[0]}if("builtin"==r&&"Ready"===g.state&&!g.available){throw new Error("No Builtin Wallet")}if(E(y,{address:void 0,connecting:!0,selected:e,state:"Idle",error:void 0}),O=void 0,N=void 0,"builtin"===r){T=void 0;const e=yield de();N=e,O=c.proxyWeb3Provider(new o.Web3Provider(e),Z)}else{let n;if("string"==typeof r){if(L)for(const t of L)"string"!=typeof t&&t.id===e&&(n=t)}else e=(n=r).id;if(!n){const t=`no module found ${e}`;throw E(y,{error:{message:t,code:1},selected:void 0,connecting:!1}),new Error(t)}try{"load"in n&&(E(y,{loadingModule:!0}),n=yield n.load(),E(y,{loadingModule:!1})),l.log("setting up module");const{web3Provider:e}=yield n.setup(t);l.log("module setup"),N=e,O=c.proxyWeb3Provider(new o.Web3Provider(N),Z),T=n}catch(e){throw"USER_CANCELED"===e.message?E(y,{connecting:!1,selected:void 0,loadingModule:!1}):E(y,{error:{code:u.MODULE_ERROR,message:e.message},selected:void 0,connecting:!1,loadingModule:!1}),e}}if(!O){const t=`no provider found for wallet type ${e}`;throw E(y,{error:{message:t,code:1},selected:void 0,connecting:!1}),new Error(t)}N&&(l.debug("listenning for connection..."),N.on&&N.on("connect",z),N.on&&N.on("disconnect",Y));try{if("builtin"===e&&"Metamask"===g.vendor)n=yield a.timeout(2e3,O.listAccounts(),{error:'Metamask timed out. Please reload the page (see <a href="https://github.com/MetaMask/metamask-extension/issues/7221">here</a>)'});else{l.log("fetching accounts...");try{n=yield O.listAccounts()}catch(e){if(4100!==e.code)throw e;l.log(`4100 ${e.name}`),n=[]}l.log(`accounts: ${n}`)}}catch(e){throw E(y,{error:e,selected:void 0,connecting:!1}),e}ee(e);const i=n&&n[0];i?(E(y,{address:i,state:"Ready",connecting:void 0}),G(),l.log("SETUP_CHAIN from select"),yield te(i,!1)):(G(),E(y,{address:void 0,state:"Locked",connecting:void 0}))})}let se,ae,ce;function de(){return se||(se=new Promise((e,t)=>__awaiter(this,void 0,void 0,function*(){if("Ready"===g.state)return e();E(x,{probing:!0});try{const e=yield s.fetchEthereum();e?(e.autoRefreshOnNetworkChange=!1,R=e,E(x,{state:"Ready",vendor:s.getVendor(e),available:!0,probing:!1})):E(x,{state:"Ready",vendor:void 0,available:!1,probing:!1})}catch(e){return E(x,{error:e.message||e,vendor:void 0,available:void 0,probing:!1}),t(e)}e(R)})))}function ue(e,t){return __awaiter(this,void 0,void 0,function*(){return yield ie(e,t),"Locked"!==m.state||he()})}function le(e){return()=>{E(e,{error:void 0})}}function fe(e){N&&$&&(l.log("STOP LISTENNING"),l.debug("stop listenning for changes..."),N.removeListener&&N.removeListener("chainChanged",H),N.removeListener&&N.removeListener("accountsChanged",F),$=!1),N&&(l.debug("stop listenning for connection..."),N.removeListener&&N.removeListener("connect",z),N.removeListener&&N.removeListener("disconnect",Y)),E(y,{state:"Idle",address:void 0,connecting:!1,unlocking:void 0,selected:void 0,error:void 0}),xe(),E(C,{state:"Idle",amount:void 0,error:void 0,blockNumber:void 0}),E(_,{contracts:void 0,addresses:void 0,state:"Idle",notSupported:void 0,chainId:void 0,error:void 0}),e||(E(S,{error:void 0,executing:!1,executionError:void 0,inProgress:!1}),U=void 0,M=void 0,q=void 0,D=void 0),ee("")}function ge(e){if(m.disconnecting)throw new Error("already disconnecting");const t=e&&e.logout,n=e&&e.wait,o=e&&e.keepFlow;return new Promise((e,r)=>{if(T)if(t){let t;try{t=T.logout()}catch(e){r(e)}n&&t&&"then"in t?(E(y,{disconnecting:!0}),t.then(()=>{T&&T.disconnect(),T=void 0,fe(o),E(y,{disconnecting:!1}),e()}).catch(e=>{E(y,{disconnecting:!1,error:e}),r(e)})):(T.disconnect(),T=void 0,fe(o),e())}else T.disconnect(),T=void 0,fe(o),e();else fe(o),e()})}function he(){if(ae)return ae;let e=!1;const t=new Promise((t,n)=>__awaiter(this,void 0,void 0,function*(){if("Locked"===m.state){let n;E(y,{unlocking:!0});try{n=(n=yield null==O?void 0:O.send("eth_requestAccounts",[]))||[]}catch(e){n=[]}if(!(n.length>0))return E(y,{unlocking:!1}),ae=void 0,e=!0,t(!1);{const e=n[0];E(y,{address:e,state:"Ready",unlocking:void 0}),l.log("SETUP_CHAIN from unlock"),yield te(e,!0)}return ae=void 0,e=!0,t(!0)}return e=!0,n(new Error("Not Locked"))}));return e||(ae=t),t}function ve(){if(l.log("RETRYING..."),E(S,{executionError:void 0}),"Ready"===v.state&&"Ready"===m.state){if(v.contracts){const e=v.contracts;if(U){let t;try{l.log("EXECUTING RETRY"),t=U(e)}catch(e){return E(S,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in t)return E(S,{executing:!0}),t.then(()=>(U=void 0,E(S,{inProgress:!1,error:void 0,executionError:void 0,executing:!1}),q&&q(e))).catch(e=>(E(S,{executionError:e,executing:!1}),Promise.reject(e)))}return q&&q(e),Promise.resolve()}return Promise.reject("contracts not set")}return"Locked"===m.state?j.flow&&j.flow.autoUnlock&&he().catch(e=>{E(S,{error:e})}):"Idle"===m.state&&1===m.options.length&&j.flow&&j.flow.autoSelect&&ue(m.options[0]).catch(e=>{E(S,{error:e})}),D?D.then(()=>void 0):Promise.resolve()}function me(e,t){return b.inProgress&&we(),pe(void 0,e,t)}function be(e){return pe(e)}function pe(e,t,n){if(b.inProgress)throw new Error("flow in progress");if("Ready"===v.state&&"Ready"===m.state&&(!t||t===m.selected)){if(M=void 0,q=void 0,D=void 0,v.contracts){const t=v.contracts;if(e){let n;try{l.log("EXECUTING DIRECT"),n=e(t)}catch(e){return E(S,{executionError:e,executing:!1}),Promise.reject(e)}if("then"in n)return U=e,E(S,{inProgress:!0,error:void 0,executing:!0}),n.then(()=>(U=void 0,E(S,{inProgress:!1,error:void 0,executionError:void 0}),t)).catch(e=>(E(S,{executionError:e,executing:!1}),Promise.reject(e)))}return Promise.resolve(t)}return Promise.reject("contracts not set")}return D||(U=e,E(S,{inProgress:!0,executing:!1,executionError:void 0,error:void 0}),D=new Promise((e,t)=>{q=e,M=t}),t&&t!==m.selected?m.selected?ge({keepFlow:!0}).catch(e=>{E(S,{error:e})}).then(()=>{ue(t,n).catch(e=>{E(S,{error:{code:11,message:`failed to connect to ${t}`,errorObject:e}}),ge()})}):ue(t,n).catch(e=>{E(S,{error:{code:11,message:`failed to connect to ${t}`,errorObject:e}}),ge()}):"Locked"===m.state?j.flow&&j.flow.autoUnlock&&he().catch(e=>{E(S,{error:e})}):"Idle"===m.state&&1===m.options.length&&j.flow&&j.flow.autoSelect&&ue(m.options[0]).catch(e=>{E(S,{error:e})}),D)}function we(){M&&M({code:1,message:"Cancel"}),D=void 0,M=void 0,q=void 0,U=void 0,E(S,{inProgress:!1,error:void 0,executionError:void 0,executing:!1})}function ye(e,t,n,o){if(!w.find(e=>e.hash===n.hash))throw new Error("cannot update non-existing Transaction record");Ie(e,t,n,o)}function Ie(e,t,n,o){if(m.address&&m.address.toLowerCase()===e.toLowerCase()&&v.chainId&&t===v.chainId){l.log("TransactionRecord",n);const r=w.find(e=>e.hash===n.hash);if(r){const e=r,t=n;for(const n of Object.keys(t))(o||!o&&void 0===e[n])&&(e[n]=t[n])}else w.push(n);try{localStorage.setItem(P+`_${e.toLowerCase()}_${t}`,JSON.stringify(w))}catch(e){}I.set(w)}else try{const r=P+`_${e.toLowerCase()}_${t}`,i=localStorage.getItem(r)||"[]",s=JSON.parse(i),a=s.find(e=>e.hash===n.hash);if(a){const e=a,t=n;for(const r of Object.keys(n))(!o&&void 0===e[r]||o&&void 0!==t[r])&&(e[r]=t[r])}else s.push(n);localStorage.setItem(r,JSON.stringify(s))}catch(e){}}function xe(){w.splice(0,w.length),I.set(w),Ce()}function _e(e,t){try{const n=localStorage.getItem(P+`_${e.toLowerCase()}_${t}`);let o=[];n&&(o=JSON.parse(n)),w.splice(0,w.length,...o),I.set(w),function(e,t){Ce(),Pe(e,t),ce=setInterval(()=>Pe(e,t),1e3*j.transactions.pollingPeriod)}(e,t)}catch(e){}}function Ce(){ce&&(clearInterval(ce),ce=void 0)}let Se=!1;function Pe(e,t){return __awaiter(this,void 0,void 0,function*(){if(Se)return;Se=!0;const n=j.transactions.finality,o=w.concat();for(const i of o){if(!O)break;if(m.address!==e||v.chainId!==t)break;if(!ce)break;let o;try{o=yield O.getBlock("latest")}catch(e){l.error(e);break}if(i.finalized)continue;if(!O)break;if(m.address!==e||v.chainId!==t)break;if(!ce)break;let s=0;if(o.number>=n)try{s=yield O.getTransactionCount(e,o.number-Math.max(1,n)+1)}catch(e){l.error(e);break}if(!O)break;if(m.address!==e||v.chainId!==t)break;if(!ce)break;let a,c=0;try{c=yield O.getTransactionCount(e)}catch(e){l.error(e);break}if(!O)break;if(m.address!==e||v.chainId!==t)break;if(!ce)break;try{a=yield O.getTransactionReceipt(i.hash)}catch(e){l.error(e);continue}if(m.address!==e||v.chainId!==t)break;if(!ce)break;const d={hash:i.hash};let u=!1;if(a&&a.blockHash){if(void 0!==a.status){const e=1===a.status;d.status=e?"success":"failure",e&&(d.events=[])}else a.logs.length>0?d.status="success":d.status="mined";if(i.eventsABI&&a.logs.length>0){const e=new r.Interface(i.eventsABI);d.events=a.logs.reduce((t,n)=>{let o;try{o=e.parseLog(n)}catch(e){l.error(e)}if(o){const e={};for(const t of Object.keys(o.args)){const n=o.args[t];e[t]=JSON.parse(JSON.stringify(n))}const n={args:e,name:o.name,signature:o.signature};t.push(n)}return t},[])}d.blockHash=a.blockHash,d.confirmations=a.confirmations,a.confirmations>=n&&(d.finalized=!0,(i.acknowledged||j.transactions.autoDelete)&&(u=!0))}else s>i.nonce?(d.status="cancelled",d.finalized=!0,d.confirmations=Math.max(1,n),(i.acknowledged||j.transactions.autoDelete)&&(u=!0)):c>i.nonce?(d.status="cancelled",d.confirmations=1):(d.status="pending",d.confirmations=0),d.blockHash=void 0,d.blockNumber=void 0,d.events=void 0;if(i.status!==d.status&&(d.acknowledged=!1),u)ke(i.hash);else{d.lastCheck=o.timestamp;try{ye(e,t,d,!0)}catch(e){l.error(e)}}}Se=!1})}function ke(e){if(l.log(`deleting  ${e}`),m.address&&v.chainId){const t=w.findIndex(t=>t.hash===e);w.splice(t,1);try{localStorage.setItem(P+`_${m.address.toLowerCase()}_${v.chainId}`,JSON.stringify(w))}catch(e){}I.set(w)}}t.default=(e=>{(j={builtin:{autoProbe:!!e.builtin&&e.builtin.autoProbe},flow:{autoSelect:!(!e.flow||!e.flow.autoSelect),autoUnlock:!(!e.flow||!e.flow.autoUnlock)},debug:e.debug||!1,chainConfigs:e.chainConfigs,options:e.options||[],autoSelectPrevious:!!e.autoSelectPrevious,localStoragePrefix:e.localStoragePrefix||"",transactions:{autoDelete:!e.transactions||void 0===e.transactions.autoDelete||e.transactions.autoDelete,finality:e.transactions&&e.transactions.finality||12,pollingPeriod:e.transactions&&e.transactions.pollingPeriod||10}}).options&&0!==j.options.length||(j.options=["builtin"]),k=j.localStoragePrefix+k,P=j.localStoragePrefix+P;const{debug:t,chainConfigs:n,builtin:o}=j;if(A=n,t&&"undefined"!=typeof window&&(window.$wallet=m,window.$transactions=w),L=j.options,E(y,{state:"Idle",options:L.map(e=>{if("object"==typeof e){if(!e.id)throw new Error("options need to be string or have an id");return e.id}return e})}),E(x,{state:"Idle"}),E(_,{state:"Idle"}),E(C,{state:"Idle"}),f){if(e.autoSelectPrevious){const e=function(){try{return localStorage.getItem(k)}catch(e){return null}}();e&&""!==e&&ie(e)}o.autoProbe&&de()}return{transactions:{subscribe:I.subscribe,acknowledge(e,t){if(m.address&&v.chainId){const n=w.find(t=>t.hash===e);if(n)if(n.finalized)ke(e);else{n.lastAcknowledgment=t,n.acknowledged=!0;try{localStorage.setItem(P+`_${m.address.toLowerCase()}_${v.chainId}`,JSON.stringify(w))}catch(e){}I.set(w)}}}},balance:{subscribe:C.subscribe,acknowledgeError:le(C)},chain:{subscribe:_.subscribe,acknowledgeError:le(_)},builtin:{subscribe:x.subscribe,acknowledgeError:le(x),probe:de},wallet:{subscribe:y.subscribe,connect:ue,unlock:he,acknowledgeError:le(y),disconnect:ge,get options(){return m.options},get address(){return m.address},get provider(){return O},get web3Provider(){return N},get chain(){return v},get contracts(){return v.contracts},get balance(){return h.amount}},flow:{subscribe:S.subscribe,execute:be,retry:ve,cancel:we,connect:me}}})}),define("utils/web",["require","exports"],function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.isPrivateWindow=void 0,t.isPrivateWindow=function(){return new Promise(function(e){if("undefined"!=typeof window)try{if(navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1==navigator.userAgent.indexOf("CriOS")&&-1==navigator.userAgent.indexOf("FxiOS")){let t=!1;if(window.safariIncognito)t=!0;else try{window.openDatabase(null,null,null,null),window.localStorage.setItem("test",1),e(!1)}catch(n){t=!0,e(!0)}}else if(navigator.userAgent.includes("Firefox")){const t=indexedDB.open("test");t.onerror=function(){e(!0)},t.onsuccess=function(){e(!1)}}else if(navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Trident")||navigator.userAgent.includes("msie"))window.indexedDB||!window.PointerEvent&&!window.MSPointerEvent||e(!0),e(!1);else{(function(){const e=navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);if(null!=e&&5==e.length)return e.map(e=>parseInt(e,10))[1]>=76})()&&e(function(){return __awaiter(this,void 0,void 0,function*(){if("storage"in navigator&&"estimate"in navigator.storage){const{quota:e}=yield navigator.storage.estimate();return!!(e&&e<12e7)}return!1})}());const t=window.RequestFileSystem||window.webkitRequestFileSystem;t?t(window.TEMPORARY,100,function(){e(!1)},function(){e(!0)}):e(!1)}}catch(t){console.error(t),e(!1)}else e(!1)})}});