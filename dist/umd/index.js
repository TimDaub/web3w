var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(i,r){function d(e){try{a(n.next(e))}catch(e){r(e)}}function s(e){try{a(n.throw(e))}catch(e){r(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o(function(e){e(t)})).then(d,s)}a((n=n.apply(e,t||[])).next())})};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","@ethersproject/contracts","@ethersproject/providers","./utils/store","./utils/builtin","./utils/index.js","./utils/ethers","named-logs","./errors"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=e("@ethersproject/contracts"),n=e("@ethersproject/providers"),i=e("./utils/store"),r=e("./utils/builtin"),d=e("./utils/index.js"),s=e("./utils/ethers"),a=e("named-logs"),c=e("./errors"),u=a.logs("web3w:index"),l="undefined"!=typeof window,g={state:"Idle",loading:!1,available:void 0,error:void 0,vendor:void 0},f={state:"Idle",loading:!1,stale:void 0,amount:void 0,error:void 0,blockNumber:void 0},v={state:"Idle",loading:!1,contracts:{},error:void 0},h={state:"Idle",loading:!1,unlocking:!1,address:void 0,options:void 0,selected:void 0,pendingUserConfirmation:void 0,error:void 0};function b(e){const t=i.writable(e);return t.data=e,t}const m=[],p=b(h),w=b(m),y=b(g),C=b(v),I=b(f);function _(e,t){for(const o of Object.keys(t)){const n=t,i=e;if(i.data[o]&&"object"==typeof n[o])for(const e of Object.keys(n[o]))i.data[o][e]=n[o][e];else i.data[o]=n[o]}try{u.debug(JSON.stringify(e.data,null,"  "))}catch(t){u.error(t,e.data)}e.set(e.data)}let x,k,R,S,E,L,N;function j(e){u.debug("onChainChanged",{chainId:e})}function O(e){u.debug("onAccountsChanged",{accounts:e})}function P({chainId:e}){u.debug("onConnect",{chainId:e})}function T(e){u.debug("onDisconnect",{error:e})}function U(e){return"string"==typeof e&&e.length>2&&"0x"===e.slice(0,2).toLowerCase()}function A(e){h.pendingUserConfirmation?h.pendingUserConfirmation.push(e):h.pendingUserConfirmation=[e],_(p,{pendingUserConfirmation:h.pendingUserConfirmation})}function q(e){if(h.pendingUserConfirmation){const t=h.pendingUserConfirmation.indexOf(e);t>=0&&(h.pendingUserConfirmation.splice(t,1),0===h.pendingUserConfirmation.length&&(h.pendingUserConfirmation=void 0),_(p,{pendingUserConfirmation:h.pendingUserConfirmation}))}}const $={onTxRequested:e=>{u.debug("onTxRequested",{transaction:e}),A("transaction")},onTxCancelled:e=>{u.debug("onTxCancelled",{transaction:e}),q("transaction")},onTxSent:e=>{u.debug("onTxSent",{transaction:e}),q("transaction")},onSignatureRequested:e=>{u.debug("onSignatureRequested",{message:e}),A("signature")},onSignatureCancelled:e=>{u.debug("onSignatureCancelled",{message:e}),q("signature")},onSignatureReceived:e=>{u.debug("onSignatureReceived",{signature:e}),q("signature")},onContractTxRequested:({name:e,method:t,overrides:o,outcome:n})=>{u.debug("onContractTxRequest",{name:e,method:t,overrides:o,outcome:n})},onContractTxCancelled:({name:e,method:t,overrides:o,outcome:n})=>{u.debug("onContractTxCancelled",{name:e,method:t,overrides:o,outcome:n})},onContractTxSent:({hash:e,name:t,method:o,overrides:n,outcome:i})=>{u.debug("onContractTxSent",{hash:e,name:t,method:o,overrides:n,outcome:i}),e&&function(e){m.push(e),w.set(m)}({hash:e,name:t,method:o,overrides:n,outcome:i})}},M="_web3w_previous_wallet_type";function W(e){localStorage.setItem(M,e)}function D(e){return __awaiter(this,void 0,void 0,function*(){if(void 0===x){const e={code:c.CHAIN_NO_PROVIDER,message:"no provider setup yet"};throw _(C,{error:e,loading:!1,state:"Idle"}),new Error(e.message)}_(C,{loading:!0});const t={},n={};let i={};const{chainId:r}=yield x.getNetwork(),d=String(r);let a=E;if("function"==typeof a&&(a=yield a(d)),a){if(a.chainId){const e=a;if(d!==e.chainId&&d!=(U(u=e.chainId)?""+parseInt(u.slice(2)):u)){const t={code:c.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig only available for ${e.chainId} , not available for ${d}`};throw _(C,{error:t,chainId:d,notSupported:!0,loading:!1,state:"Idle"}),new Error(t.message)}i=e.contracts}else{const e=a,t=e[d]||e[function(e){return U(e)?e:"0x"+parseInt(e).toString(16)}(d)];if(!t){const e={code:c.CHAIN_CONFIG_NOT_AVAILABLE,message:`chainConfig not available for ${d}`};throw _(C,{error:e,chainId:d,notSupported:!0,loading:!1,state:"Idle"}),new Error(e.message)}i=t.contracts}for(const r of Object.keys(i)){const d=i[r];d.abi&&(t[r]=s.proxyContract(new o.Contract(d.address,d.abi,x.getSigner(e)),r,$)),n[r]=d.address}}var u;_(C,{state:"Ready",loading:void 0,chainId:d,addresses:n,contracts:t})})}function V(e,t){return __awaiter(this,void 0,void 0,function*(){!h.selected||"Ready"!==h.state&&"Locked"!==h.state||(yield z());let o,i=e;if(!i)if(0===N.length)i="builtin";else{if(1!==N.length){const e=`No Wallet Type Specified, choose from ${h.options}`;throw new Error(e)}i=N[0]}if("builtin"==i&&"Ready"===g.state&&!g.available){throw new Error("No Builtin Wallet")}if(_(p,{address:void 0,loading:!0,selected:e,state:"Idle",error:void 0}),x=void 0,k=void 0,"builtin"===i)L=void 0,yield F(),x=R,k=S;else{let o;if("string"==typeof i){if(N)for(const t of N)"string"!=typeof t&&t.id===e&&(o=t)}else e=(o=i).id;if(!o){const t=`no module found ${e}`;throw _(p,{error:{message:t,code:1},selected:void 0,loading:!1}),new Error(t)}try{const{web3Provider:e}=yield o.setup(t);k=e,x=s.proxyWeb3Provider(new n.Web3Provider(k),$),L=o}catch(e){throw"USER_CANCELED"===e.message?_(p,{loading:!1,selected:void 0}):_(p,{error:{code:c.MODULE_ERROR,message:e.message},selected:void 0,loading:!1}),e}}if(!x){const t=`no provider found for wallet type ${e}`;throw _(p,{error:{message:t,code:1},selected:void 0,loading:!1}),new Error(t)}k&&(u.debug("listenning for connection..."),k.on("connect",P),k.on("disconnect",T));try{o="builtin"===e&&"Metamask"===g.vendor?yield d.timeout(2e3,x.listAccounts(),{error:'Metamask timed out. Please reload the page (see <a href="https://github.com/MetaMask/metamask-extension/issues/7221">here</a>)'}):yield d.timeout(2e4,x.listAccounts())}catch(e){throw _(p,{error:e,selected:void 0,loading:!1}),e}W(e);const r=o&&o[0];r?(_(p,{address:r,state:"Ready",loading:void 0}),function(e){k&&(u.debug("listenning for changes...",{address:e}),k.on("chainChanged",j),k.on("accountsChanged",O))}(r),yield D(r)):_(p,{address:void 0,state:"Locked",loading:void 0})})}let B,H;function F(){return B||(B=new Promise((e,t)=>__awaiter(this,void 0,void 0,function*(){if("Ready"===g.state)return e();_(y,{loading:!0});try{const e=yield r.fetchEthereum();e?(S=e,R=s.proxyWeb3Provider(new n.Web3Provider(e),$),_(y,{state:"Ready",vendor:r.getVendor(e),available:!0,loading:void 0})):_(y,{state:"Ready",vendor:void 0,available:!1,loading:void 0})}catch(e){return _(y,{error:e.message||e,vendor:void 0,available:void 0,loading:!1}),t(e)}e()})))}function G(e,t){return __awaiter(this,void 0,void 0,function*(){return yield V(e,t),"Locked"!==h.state||K()})}function J(e){z()}function z(){return __awaiter(this,void 0,void 0,function*(){k&&(u.debug("stop listenning for changes..."),k.removeListener("chainChanged",j),k.removeListener("accountsChanged",O)),k&&(u.debug("stop listenning for connection..."),k.removeListener("connect",P),k.removeListener("disconnect",T)),L&&(yield L.logout(),L=void 0),_(p,{state:"Idle",address:void 0,loading:!1,unlocking:void 0,selected:void 0,error:void 0}),_(I,{state:"Idle",amount:void 0,error:void 0,blockNumber:void 0}),_(C,{contracts:void 0,state:"Idle",notSupported:void 0,chainId:void 0,error:void 0}),W("")})}function K(){if(H)return H;let e=!1;const t=new Promise((t,o)=>__awaiter(this,void 0,void 0,function*(){if("Locked"===h.state){let o;_(p,{unlocking:!0});try{o=(o=yield null==x?void 0:x.send("eth_requestAccounts",[]))||[]}catch(e){o=[]}if(!(o.length>0))return _(p,{unlocking:!1}),H=void 0,e=!0,t(!1);{const e=o[0];_(p,{address:e,state:"Ready",unlocking:void 0}),yield D(e)}return H=void 0,e=!0,t(!0)}return e=!0,o(new Error("Not Locked"))}));return e||(H=t),t}t.default=(e=>{(e=Object.assign({},e||{})).builtin=e.builtin||{autoProbe:!1};const{debug:t,chainConfigs:o,builtin:n}=e;if(E=o,t&&"undefined"!=typeof window&&(window.$wallet=h,window.$transactions=m),N=e.options||[],_(p,{state:"Idle",options:N.map(e=>{if("object"==typeof e){if(!e.id)throw new Error("options need to be string or have an id");return e.id}return e})}),_(y,{state:"Idle"}),_(C,{state:"Idle"}),_(I,{state:"Idle"}),l){if(e.autoSelectPrevious){const e=localStorage.getItem(M);e&&""!==e&&V(e)}n.autoProbe&&F()}return{transactions:{subscribe:w.subscribe},balance:{subscribe:I.subscribe},chain:{subscribe:C.subscribe},builtin:{subscribe:y.subscribe,probe:F},wallet:{subscribe:p.subscribe,connect:G,unlock:K,acknowledgeError:J,logout:z,get address(){return h.address},get provider(){return x},get web3Provider(){return k},get chain(){return v},get contracts(){return v.contracts},get balance(){return f.amount}}}})});