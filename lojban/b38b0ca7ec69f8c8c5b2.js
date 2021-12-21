const CACHE_NAME="sutysisku";function getOrFetch(e){if(!e)return;if(0===e.status)return e;const t=e.url.split(".").pop(),r=new Headers(e.headers);return r.set("Cross-Origin-Embedder-Policy","require-corp"),r.set("Cross-Origin-Opener-Policy","same-origin"),"wasm"===t&&r.set("content-type","application/wasm"),new Response(e.body,{status:e.status,statusText:e.statusText,headers:r})}function fromNetwork(e,t){return new Promise((function(r,n){var s=setTimeout(n,t);fetch(e).then((function(e){clearTimeout(s),r(e)}),n)}))}function fromCache(e){return caches.open(CACHE_NAME).then((function(t){return t.match(e).then((function(e){return e||Promise.reject("no-match")}))}))}function unableToResolve(){return new Response("<h1>Service Unavailable</h1>",{status:503,statusText:"Service Unavailable",headers:new Headers({"Content-Type":"text/html"})})}"undefined"==typeof window?(self.addEventListener("install",(()=>self.skipWaiting())),self.addEventListener("activate",(function(e){e.waitUntil(self.clients.claim()),e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(CACHE_NAME!==e)return caches.delete(e)}))))).then((()=>{self.clients.matchAll().then((function(e){}))})))})),self.addEventListener("message",(e=>{e.data&&"deregister"===e.data.type&&self.registration.unregister().then((()=>self.clients.matchAll())).then((e=>{e.forEach((e=>e.navigate(e.url)))}))})),self.addEventListener("fetch",(function(e){"only-if-cached"===e.request.cache&&"same-origin"!==e.request.mode||e.respondWith(caches.open(CACHE_NAME).then((async function(t){let r;try{r=getOrFetch(await t.match(e.request))}catch(e){}if(r)return r;try{r=getOrFetch(await fetch(e.request))}catch(e){}return r||unableToResolve()})))}))):(()=>{const e={shouldRegister:()=>!0,shouldDeregister:()=>!1,doReload:()=>!0,quiet:!1,...window.coi},t=navigator;e.shouldDeregister()&&t.serviceWorker&&t.serviceWorker.controller&&t.serviceWorker.controller.postMessage({type:"deregister"}),!1===window.crossOriginIsolated&&e.shouldRegister()&&(window.isSecureContext?t.serviceWorker&&t.serviceWorker.register(window.document.currentScript.src).then((r=>{e.quiet,console.log("COOP/COEP Service Worker registered",r.scope),r.addEventListener("updatefound",(()=>{!e.quiet&&console.log("Reloading page to make use of updated COOP/COEP Service Worker."),e.doReload()})),r.active&&!t.serviceWorker.controller&&(!e.quiet&&console.log("Reloading page to make use of COOP/COEP Service Worker."),e.doReload())}),(t=>{!e.quiet&&console.error("COOP/COEP Service Worker failed to register:",t)})):!e.quiet&&console.log("COOP/COEP Service Worker not registered, a secure context is required."))})();