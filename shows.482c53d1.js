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
})({"js/genres.js":[function(require,module,exports) {
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
},{}],"js/shows.js":[function(require,module,exports) {
"use strict";

var _genres = require("./genres.js");

(function () {
  var onTheAir = document.getElementById('on-the-air');
  var popularShows = document.getElementById('popular-shows');
  var topRatedShows = document.getElementById('top-rated-shows');
  var apiKey = 'ce2eb2231a371296cf6ff11a39206d6e';
  fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1').then(function (data) {
    return data.json();
  }).then(function (res) {
    var topRMovies = res.results.splice(9, 6);
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
      output += "\n\t\t\t\t\t<div class=\"mr-3 card\" style=\"width: 20rem;\">\n\t\t\t\t        <img class=\"card-img-top card-img\" src=\"https://image.tmdb.org/t/p/w500".concat(movie.poster_path, "\" alt=\"Card image cap\">\n\t\t\t\t        <div class=\"card-body\">\n\t\t\t\t          <h5 class=\"card-title card-movie-title\">").concat(movie.name, "</h5>\n\t\t\t\t          <p class=\"card-text card-details\">").concat(movie.first_air_date.split("-")[0], " | ").concat(genreOutput, "</p>\n\t\t\t\t        </div>\n      \t\t\t\t</div>\n\t\t\t\t\t");
    });
    onTheAir.innerHTML = output;
    onTheAir.children[0].classList.add("ml-5");
  });
  fetch('https://api.themoviedb.org/3/tv/popular?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1').then(function (data) {
    return data.json();
  }).then(function (res) {
    var topPopularMovies = res.results.splice(0, 6);
    var output = '';
    var genresArray = '';
    topPopularMovies.map(function (movie) {
      genresArray = _genres.genres.filter(function (genre) {
        if (genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]) {
          return genre.id;
        }
      });
      var genreOutput = genresArray.map(function (genre) {
        return genre.name;
      }).join(", ");
      output += "\n\t\t\t\t\t<div class=\"mr-3 card\" style=\"width: 20rem;\">\n\t\t\t\t        <img class=\"card-img-top card-img\" src=\"https://image.tmdb.org/t/p/w500".concat(movie.poster_path, "\" alt=\"Card image cap\">\n\t\t\t\t        <div class=\"card-body\">\n\t\t\t\t          <h5 class=\"card-title card-movie-title\">").concat(movie.name, "</h5>\n\t\t\t\t          <p class=\"card-text card-details\">").concat(movie.first_air_date.split("-")[0], " | ").concat(genreOutput, "</p>\n\t\t\t\t        </div>\n      \t\t\t\t</div>\n\t\t\t\t");
    });
    popularShows.innerHTML = output;
    popularShows.children[0].classList.add("ml-5");
  });
  fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=ce2eb2231a371296cf6ff11a39206d6e&page=1').then(function (data) {
    return data.json();
  }).then(function (res) {
    var topPopularMovies = res.results.splice(0, 7);
    var output = '';
    var genresArray = '';
    topPopularMovies.map(function (movie) {
      genresArray = _genres.genres.filter(function (genre) {
        if (genre.id === movie.genre_ids[0] || genre.id === movie.genre_ids[1]) {
          return genre.id;
        }
      });
      var genreOutput = genresArray.map(function (genre) {
        return genre.name;
      }).join(", ");
      output += "\n\t\t\t\t\t<div class=\"mr-3 card\" style=\"width: 20rem;\">\n\t\t\t\t        <img class=\"card-img-top card-img\" src=\"https://image.tmdb.org/t/p/w500".concat(movie.poster_path, "\" alt=\"Card image cap\">\n\t\t\t\t        <div class=\"card-body\">\n\t\t\t\t          <h5 class=\"card-title card-movie-title\">").concat(movie.name, "</h5>\n\t\t\t\t          <p class=\"card-text card-details\">").concat(movie.first_air_date.split("-")[0], " | ").concat(genreOutput, "</p>\n\t\t\t\t        </div>\n      \t\t\t\t</div>\n\t\t\t\t");
    });
    topRatedShows.innerHTML = output;
    topRatedShows.children[0].classList.add("ml-5");
  });
})();
},{"./genres.js":"js/genres.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "11109" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/shows.js"], null)
//# sourceMappingURL=/shows.482c53d1.js.map