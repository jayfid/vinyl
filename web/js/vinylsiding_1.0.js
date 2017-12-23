"use strict";function Vinylsiding(e){this.util=e,window.onload=function(){Vinylsiding.prototype.setDynamicHeights(),Vinylsiding.prototype.secureTargetBlank(),Vinylsiding.prototype.lazyLoad()},this.modules={}}function lazyLoadImage(e){var t=e.querySelector(".base-image"),n=new Image,i=new Image;n.onload=function(){Vinylsiding.util.removeClass(t,"blurry")},n.src=t.src,i.className="loading",i.onload=function(){Vinylsiding.util.removeClass(i,"loading")},i.src=t.dataset.vimageLarge,e.appendChild(i)}Vinylsiding.prototype.addModule=function(e,t){return this.modules[e]=t,"function"==typeof t.beforeLoad&&t.beforeLoad(this),!0},Vinylsiding.prototype.callModule=function(e,t,n){if(!this.modules.hasOwnProperty(e))throw new Error("");if(!this.modules[e].hasOwnProperty(t))throw new Error("");if("function"!=typeof this.modules[e][t])throw new Error("");return this.modules[e][t](n)},Vinylsiding.prototype.secureTargetBlank=function(){var e=document.querySelectorAll('a[target="_blank"]');if(e&&e.length)for(var t=0,n=e.length;t<n;t++)e[t].setAttribute("rel","noopener noreferrer")},Vinylsiding.prototype.setDynamicHeights=function(){var e=document.querySelectorAll(".set-height");if(!e||!e.length)return!1;for(var t,n,i=0,o=e.length;i<o;i++)(n=(t=e[i].getAttribute("data-height-ref"))?document.querySelector("#"+t):e[i])&&this.util.setHeightOnElement(e[i],n)},Vinylsiding.prototype.lazyLoad=function(){var e=document.querySelectorAll(".vinyl-lazyloader");if(e.length)for(var t=0,n=e.length;t<n;t++)lazyLoadImage(e[t])};var define=define||!1;define&&define("Vinylsiding",["Utility"],function(e){return new Vinylsiding(e)});
//# sourceMappingURL=/js/vinylsiding_1.0.js.map