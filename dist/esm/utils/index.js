export function timeout(e,t,o){return new Promise((r,n)=>{let i=!1;const u=setTimeout(()=>{i=!0,o?"function"==typeof o?r(o()):n(o.error||o):n(new Error("TimedOut"))},e);t.then(e=>{i||(clearTimeout(u),r(e))}).catch(e=>{i||(clearTimeout(u),n(e))})})}