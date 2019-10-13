// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinner = exports.trending2 = exports.trending = exports.pagination = exports.next = exports.previous = exports.moviesList = exports.inputSearch = exports.searchForm = exports.apiKey = void 0;
var apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
exports.apiKey = apiKey;
var searchForm = document.getElementById('searchForm');
exports.searchForm = searchForm;
var inputSearch = document.getElementById('inputSearch');
exports.inputSearch = inputSearch;
var moviesList = document.getElementById('moviesList');
exports.moviesList = moviesList;
var previous = document.getElementById('previous');
exports.previous = previous;
var next = document.getElementById('next');
exports.next = next;
var pagination = document.getElementById('pagination-container');
exports.pagination = pagination;
var trending = document.getElementById('trending-movies');
exports.trending = trending;
var trending2 = document.getElementById('trending-shows');
exports.trending2 = trending2;
var spinner = "\n    <div class=\"mb-5 spinner-border text-light\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n      <span class=\"sr-only\">Loading...</span>\n    </div>";
exports.spinner = spinner;
},{}],"js/genres.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genres = void 0;
var genres = [{
  id: 28,
  name: "Action"
}, {
  id: 12,
  name: "Adventure"
}, {
  id: 16,
  name: "Animation"
}, {
  id: 35,
  name: "Comedy"
}, {
  id: 80,
  name: "Crime"
}, {
  id: 99,
  name: "Documentary"
}, {
  id: 18,
  name: "Drama"
}, {
  id: 10751,
  name: "Family"
}, {
  id: 14,
  name: "Fantasy"
}, {
  id: 36,
  name: "History"
}, {
  id: 27,
  name: "Horror"
}, {
  id: 10402,
  name: "Music"
}, {
  id: 9648,
  name: "Mystery"
}, {
  id: 10749,
  name: "Romance"
}, {
  id: 878,
  name: "Science Fiction"
}, {
  id: 10770,
  name: "TV Movie"
}, {
  id: 53,
  name: "Thriller"
}, {
  id: 10752,
  name: "War"
}, {
  id: 37,
  name: "Western"
}];
exports.genres = genres;
},{}],"js/moviesSearch.js":[function(require,module,exports) {
"use strict";

var variables = _interopRequireWildcard(require("./variables.js"));

var _genres = require("./genres.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(function () {
  fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=ce2eb2231a371296cf6ff11a39206d6e').then(function (data) {
    return data.json();
  }).then(function (res) {
    var topRMovies = res.results.splice(0, 8);
    var output = '';
    var genresArray = '';
    topRMovies.map(function (movie) {
      genresArray = _genres.genres.filter(function (genre) {
        if (genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]) {
          return genre.id;
        }
      });
      var genreOutput = genresArray.map(function (genre) {
        return genre.name;
      }).join(", ");
      output += "\n          <div class=\"mr-3 card\" style=\"width: 15rem; padding-bottom: 0;\">\n              <img class=\"card-img-top card-img\" src=\"https://image.tmdb.org/t/p/w500".concat(movie.poster_path, "\" alt=\"Card image cap\">\n              <div class=\"card-body\">\n                <h5 class=\"card-title card-movie-title\">").concat(movie.title, "</h5>\n                <p class=\"card-text card-details\">").concat(movie.release_date.split("-")[0], " | ").concat(genreOutput, "</p>\n              </div>\n          </div>\n          ");
    });
    variables.trending.innerHTML = output;
    variables.trending.children[0].classList.add("ml-5");
  });
  variables.inputSearch.addEventListener('input', function (e) {
    e.preventDefault();
    getMovies(e.target.value, 1);
  });

  var previousDisabled = function previousDisabled(page) {
    if (page == 1) {
      variables.previous.disabled = true;
      variables.previous.classList.add('button-disabled');
    } else {
      variables.previous.disabled = false;
      variables.previous.classList.remove('button-disabled');
    }
  };

  var nextDisabled = function nextDisabled(page, totalPages) {
    if (page === totalPages) {
      variables.next.disabled = true;
      variables.next.classList.add('button-disabled');
    } else {
      variables.next.disabled = false;
      variables.next.classList.remove('button-disabled');
    }
  };

  var getMovies = function getMovies(movie, page) {
    if (variables.inputSearch.value.length > 0) {
      variables.moviesList.innerHTML = variables.spinner;
    }

    previousDisabled(page);

    if (movie.length > 0) {
      variables.trending.style.display = 'none';
      document.getElementById('trending-title').style.display = 'none';
      fetch("https://api.themoviedb.org/3/search/movie?api_key=".concat(variables.apiKey, "&query=").concat(movie, "&page=").concat(page)).then(function (resp) {
        return resp.json();
      }).then(function (data) {
        nextDisabled(page, data.total_pages);
        console.log(data);
        var output = '';
        var movies = data.results;
        movies.map(function (movie) {
          var descp;

          if (movie.overview.length > 260) {
            descp = movie.overview.split(" ").splice(0, 30).join(" ") + '...';
          } else if (movie.overview == "") {
            descp = "No description";
          } else {
            descp = movie.overview;
          }

          if (movie.poster_path !== null && movie.backdrop_path !== null) {
            output += "\n              <div class=\"card-v2\">\n                <div class=\"poster\">\n                  <img\n                    src=\"https://image.tmdb.org/t/p/w300".concat(movie.poster_path, "\"\n                  />\n                </div>\n                <div class=\"details\">\n                  <h2>").concat(movie.title, "<br /><span>Relased in: ").concat(movie.release_date, "</span></h2>\n                  <div class=\"rating\">\n                    <i class=\"fas fa-star\"></i>\n                    <span>").concat(movie.vote_average, " / 10</span>\n                  </div>\n                  <div class=\"info\">\n                    <p>\n                      ").concat(descp, "\n                    </p>\n                  </div>\n                  <div class=\"more-info\">\n                    <a href=\"https://www.themoviedb.org/movie/").concat(movie.id, "\" target=\"_blank\" class=\"btn btn-dark\">More Details</a>\n                  </div>\n                </div>\n              </div>\n            ");
          }
        });

        if (movies.length !== 0) {
          variables.moviesList.innerHTML = output;
        } else {
          variables.moviesList.innerHTML = "<h2 class=\"no-results\">No results founded</h2>";
          variables.next.disabled = true;
          variables.next.classList.add('button-disabled');
        }

        variables.pagination.style.visibility = 'visible';
        variables.next.addEventListener('click', function () {
          window.scrollTo(0, 240);
          getMovies(variables.inputSearch.value, ++page);
        });
        previous.addEventListener('click', function () {
          window.scrollTo(0, 240);
          getMovies(variables.inputSearch.value, --page);
        });
      });
    } else {
      variables.trending.style.display = 'flex';
      document.getElementById('trending-title').style.display = 'block';
      variables.moviesList.innerHTML = null;
      variables.pagination.style.visibility = 'hidden';
    }
  };
})();
},{"./variables.js":"js/variables.js","./genres.js":"js/genres.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1503" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/moviesSearch.js"], null)
//# sourceMappingURL=/moviesSearch.6465a4d8.js.map