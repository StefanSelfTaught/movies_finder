parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"u9EY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.spinner=exports.trending2=exports.trending=exports.pagination=exports.next=exports.previous=exports.moviesList=exports.inputSearch=exports.searchForm=exports.apiKey=void 0;var e="ce2eb2231a371296cf6ff11a39206d6e";exports.apiKey=e;var t=document.getElementById("searchForm");exports.searchForm=t;var r=document.getElementById("inputSearch");exports.inputSearch=r;var n=document.getElementById("moviesList");exports.moviesList=n;var s=document.getElementById("previous");exports.previous=s;var o=document.getElementById("next");exports.next=o;var i=document.getElementById("pagination-container");exports.pagination=i;var p=document.getElementById("trending-movies");exports.trending=p;var a=document.getElementById("trending-shows");exports.trending2=a;var d='\n    <div class="mb-5 spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">\n      <span class="sr-only">Loading...</span>\n    </div>';exports.spinner=d;
},{}],"SeWx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.genres=void 0;var e=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}];exports.genres=e;
},{}],"GdpI":[function(require,module,exports) {
"use strict";var e=i(require("./variables.js")),t=require("./moviesGenres.js");function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function i(e){if(e&&e.__esModule)return e;var t=n();if(t&&t.has(e))return t.get(e);var i={};if(null!=e){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var r=a?Object.getOwnPropertyDescriptor(e,s):null;r&&(r.get||r.set)?Object.defineProperty(i,s,r):i[s]=e[s]}}return i.default=e,t&&t.set(e,i),i}!function(){fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ce2eb2231a371296cf6ff11a39206d6e").then(function(e){return e.json()}).then(function(n){var i=n.results.splice(0,8),a="";i.map(function(e){var n=t.genres.filter(function(t){if(t.id===e.genre_ids[0]||t.id===e.genre_ids[1])return t.id}).map(function(e){return e.name}).join(", ");a+='\n          <div class="mr-3 card" style="width: 15rem; padding-bottom: 0;">\n              <img class="card-img-top card-img" src="https://image.tmdb.org/t/p/w500'.concat(e.poster_path,'" alt="Card image cap">\n              <div class="card-body">\n                <h5 class="card-title card-movie-title">').concat(e.title,'</h5>\n                <p class="card-text card-details">').concat(e.release_date.split("-")[0]," | ").concat(n,"</p>\n              </div>\n          </div>\n          ")}),e.trending.innerHTML=a,e.trending.children[0].classList.add("ml-5")}),e.inputSearch.addEventListener("input",function(e){e.preventDefault(),n(e.target.value,1)});var n=function t(n,i){e.inputSearch.value.length>0&&(e.moviesList.innerHTML=e.spinner),function(t){1==t?(e.previous.disabled=!0,e.previous.classList.add("button-disabled")):(e.previous.disabled=!1,e.previous.classList.remove("button-disabled"))}(i),n.length>0?(e.trending.style.display="none",document.getElementById("trending-title").style.display="none",fetch("https://api.themoviedb.org/3/search/movie?api_key=".concat(e.apiKey,"&query=").concat(n,"&page=").concat(i)).then(function(e){return e.json()}).then(function(n){!function(t,n){t===n?(e.next.disabled=!0,e.next.classList.add("button-disabled")):(e.next.disabled=!1,e.next.classList.remove("button-disabled"))}(i,n.total_pages),console.log(n);var a="",s=n.results;s.map(function(e){var t;t=e.overview.length>260?e.overview.split(" ").splice(0,30).join(" ")+"...":""==e.overview?"No description":e.overview,null!==e.poster_path&&null!==e.backdrop_path&&(a+='\n              <div class="card-v2">\n                <div class="poster">\n                  <img\n                    src="https://image.tmdb.org/t/p/w300'.concat(e.poster_path,'"\n                  />\n                </div>\n                <div class="details">\n                  <h2>').concat(e.title,"<br /><span>Relased in: ").concat(e.release_date,'</span></h2>\n                  <div class="rating">\n                    <i class="fas fa-star"></i>\n                    <span>').concat(e.vote_average,' / 10</span>\n                  </div>\n                  <div class="info">\n                    <p>\n                      ').concat(t,'\n                    </p>\n                  </div>\n                  <div class="more-info">\n                    <a href="https://www.themoviedb.org/movie/').concat(e.id,'" target="_blank" class="btn btn-dark">More Details</a>\n                  </div>\n                </div>\n              </div>\n            '))}),0!==s.length?e.moviesList.innerHTML=a:(e.moviesList.innerHTML='<h2 class="no-results">No results founded</h2>',e.next.disabled=!0,e.next.classList.add("button-disabled")),e.pagination.style.visibility="visible",e.next.addEventListener("click",function(){window.scrollTo(0,240),t(e.inputSearch.value,++i)}),previous.addEventListener("click",function(){window.scrollTo(0,240),t(e.inputSearch.value,--i)})})):(e.trending.style.display="flex",document.getElementById("trending-title").style.display="block",e.moviesList.innerHTML=null,e.pagination.style.visibility="hidden")}}();
},{"./variables.js":"u9EY","./moviesGenres.js":"SeWx"}]},{},["GdpI"], null)
//# sourceMappingURL=/moviesSearch.01ae6b0d.js.map