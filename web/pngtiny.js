(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
        module.exports.default = module.exports
    } else {
        root.pngtiny = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
var pngtiny={};
pngtiny.instantiateWasm=function(importObject, receiveInstance){
    fetch('pngtiny.wasm').then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
    ).then(result =>
        receiveInstance(result.instance)
    );
};

var a;
a || (a = typeof pngtiny !== 'undefined' ? pngtiny : {});
var k = {}, l;
for (l in a) {
  a.hasOwnProperty(l) && (k[l] = a[l]);
}
var p = !1, q = !1, r = !1, t = !1;
p = "object" === typeof window;
q = "function" === typeof importScripts;
r = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
t = !p && !r && !q;
var v = "", w, z, A, B, C;
if (r) {
  v = q ? require("path").dirname(v) + "/" : __dirname + "/", w = function(b, c) {
    B || (B = require("fs"));
    C || (C = require("path"));
    b = C.normalize(b);
    return B.readFileSync(b, c ? null : "utf8");
  }, A = function(b) {
    b = w(b, !0);
    b.buffer || (b = new Uint8Array(b));
    b.buffer || D("Assertion failed: undefined");
    return b;
  }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), "undefined" !== typeof module && (module.exports = a), process.on("uncaughtException", function(b) {
    throw b;
  }), process.on("unhandledRejection", D), a.inspect = function() {
    return "[Emscripten Module object]";
  };
} else {
  if (t) {
    "undefined" != typeof read && (w = function(b) {
      return read(b);
    }), A = function(b) {
      if ("function" === typeof readbuffer) {
        return new Uint8Array(readbuffer(b));
      }
      b = read(b, "binary");
      "object" === typeof b || D("Assertion failed: undefined");
      return b;
    }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
  } else {
    if (p || q) {
      q ? v = self.location.href : "undefined" !== typeof document && document.currentScript && (v = document.currentScript.src), v = 0 !== v.indexOf("blob:") ? v.substr(0, v.lastIndexOf("/") + 1) : "", w = function(b) {
        var c = new XMLHttpRequest;
        c.open("GET", b, !1);
        c.send(null);
        return c.responseText;
      }, q && (A = function(b) {
        var c = new XMLHttpRequest;
        c.open("GET", b, !1);
        c.responseType = "arraybuffer";
        c.send(null);
        return new Uint8Array(c.response);
      }), z = function(b, c, f) {
        var d = new XMLHttpRequest;
        d.open("GET", b, !0);
        d.responseType = "arraybuffer";
        d.onload = function() {
          200 == d.status || 0 == d.status && d.response ? c(d.response) : f();
        };
        d.onerror = f;
        d.send(null);
      };
    }
  }
}
var aa = a.print || console.log.bind(console), F = a.printErr || console.warn.bind(console);
for (l in k) {
  k.hasOwnProperty(l) && (a[l] = k[l]);
}
k = null;
var G = 0, H;
a.wasmBinary && (H = a.wasmBinary);
var noExitRuntime = a.noExitRuntime || !0;
"object" !== typeof WebAssembly && D("no native wasm support detected");
var I, J = !1, ba = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
var ca, K, L;
function da() {
  var b = I.buffer;
  ca = b;
  a.HEAP8 = new Int8Array(b);
  a.HEAP16 = new Int16Array(b);
  a.HEAP32 = L = new Int32Array(b);
  a.HEAPU8 = K = new Uint8Array(b);
  a.HEAPU16 = new Uint16Array(b);
  a.HEAPU32 = new Uint32Array(b);
  a.HEAPF32 = new Float32Array(b);
  a.HEAPF64 = new Float64Array(b);
}
var M, ea = [], fa = [], ha = [];
function ia() {
  var b = a.preRun.shift();
  ea.unshift(b);
}
var N = 0, O = null, P = null;
a.preloadedImages = {};
a.preloadedAudios = {};
function D(b) {
  if (a.onAbort) {
    a.onAbort(b);
  }
  F(b);
  J = !0;
  throw new WebAssembly.RuntimeError("abort(" + b + "). Build with -s ASSERTIONS=1 for more info.");
}
function ja() {
  return Q.startsWith("data:application/octet-stream;base64,");
}
var Q = "pngtiny.wasm";
if (!ja()) {
  var ma = Q;
  Q = a.locateFile ? a.locateFile(ma, v) : v + ma;
}
function na() {
  var b = Q;
  try {
    if (b == Q && H) {
      return new Uint8Array(H);
    }
    if (A) {
      return A(b);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (c) {
    D(c);
  }
}
function oa() {
  if (!H && (p || q)) {
    if ("function" === typeof fetch && !Q.startsWith("file://")) {
      return fetch(Q, {credentials:"same-origin"}).then(function(b) {
        if (!b.ok) {
          throw "failed to load wasm binary file at '" + Q + "'";
        }
        return b.arrayBuffer();
      }).catch(function() {
        return na();
      });
    }
    if (z) {
      return new Promise(function(b, c) {
        z(Q, function(f) {
          b(new Uint8Array(f));
        }, c);
      });
    }
  }
  return Promise.resolve().then(function() {
    return na();
  });
}
function R(b) {
  for (; 0 < b.length;) {
    var c = b.shift();
    if ("function" == typeof c) {
      c(a);
    } else {
      var f = c.h;
      "number" === typeof f ? void 0 === c.g ? M.get(f)() : M.get(f)(c.g) : f(void 0 === c.g ? null : c.g);
    }
  }
}
var pa = [null, [], []], ta = {abort:function() {
  D();
}, emscripten_longjmp:function(b, c) {
  S(b, c || 1);
  throw "longjmp";
}, emscripten_memcpy_big:function(b, c, f) {
  K.copyWithin(b, c, c + f);
}, emscripten_resize_heap:function(b) {
  var c = K.length;
  b >>>= 0;
  if (1073741824 < b) {
    return !1;
  }
  for (var f = 1; 4 >= f; f *= 2) {
    var d = c * (1 + 0.2 / f);
    d = Math.min(d, b + 100663296);
    d = Math.max(b, d);
    0 < d % 65536 && (d += 65536 - d % 65536);
    a: {
      try {
        I.grow(Math.min(1073741824, d) - ca.byteLength + 65535 >>> 16);
        da();
        var e = 1;
        break a;
      } catch (g) {
      }
      e = void 0;
    }
    if (e) {
      return !0;
    }
  }
  return !1;
}, fd_close:function() {
  return 0;
}, fd_seek:function() {
}, fd_write:function(b, c, f, d) {
  for (var e = 0, g = 0; g < f; g++) {
    for (var x = L[c + 8 * g >> 2], ka = L[c + (8 * g + 4) >> 2], T = 0; T < ka; T++) {
      var E = K[x + T], U = pa[b];
      if (0 === E || 10 === E) {
        E = 1 === b ? aa : F;
        var m = U;
        for (var n = 0, u = n + NaN, y = n; m[y] && !(y >= u);) {
          ++y;
        }
        if (16 < y - n && m.subarray && ba) {
          m = ba.decode(m.subarray(n, y));
        } else {
          for (u = ""; n < y;) {
            var h = m[n++];
            if (h & 128) {
              var V = m[n++] & 63;
              if (192 == (h & 224)) {
                u += String.fromCharCode((h & 31) << 6 | V);
              } else {
                var la = m[n++] & 63;
                h = 224 == (h & 240) ? (h & 15) << 12 | V << 6 | la : (h & 7) << 18 | V << 12 | la << 6 | m[n++] & 63;
                65536 > h ? u += String.fromCharCode(h) : (h -= 65536, u += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023));
              }
            } else {
              u += String.fromCharCode(h);
            }
          }
          m = u;
        }
        E(m);
        U.length = 0;
      } else {
        U.push(E);
      }
    }
    e += ka;
  }
  L[d >> 2] = e;
  return 0;
}, getTempRet0:function() {
  return G;
}, invoke_iii:qa, invoke_vii:ra, invoke_viiii:sa, setTempRet0:function(b) {
  G = b;
}};
(function() {
  function b(e) {
    a.asm = e.exports;
    I = a.asm.memory;
    da();
    M = a.asm.__indirect_function_table;
    fa.unshift(a.asm.__wasm_call_ctors);
    N--;
    a.monitorRunDependencies && a.monitorRunDependencies(N);
    0 == N && (null !== O && (clearInterval(O), O = null), P && (e = P, P = null, e()));
  }
  function c(e) {
    b(e.instance);
  }
  function f(e) {
    return oa().then(function(g) {
      return WebAssembly.instantiate(g, d);
    }).then(e, function(g) {
      F("failed to asynchronously prepare wasm: " + g);
      D(g);
    });
  }
  var d = {env:ta, wasi_snapshot_preview1:ta, };
  N++;
  a.monitorRunDependencies && a.monitorRunDependencies(N);
  if (a.instantiateWasm) {
    try {
      return a.instantiateWasm(d, b);
    } catch (e) {
      return F("Module.instantiateWasm callback failed with error: " + e), !1;
    }
  }
  (function() {
    return H || "function" !== typeof WebAssembly.instantiateStreaming || ja() || Q.startsWith("file://") || "function" !== typeof fetch ? f(c) : fetch(Q, {credentials:"same-origin"}).then(function(e) {
      return WebAssembly.instantiateStreaming(e, d).then(c, function(g) {
        F("wasm streaming compile failed: " + g);
        F("falling back to ArrayBuffer instantiation");
        return f(c);
      });
    });
  })();
  return {};
})();
a.___wasm_call_ctors = function() {
  return (a.___wasm_call_ctors = a.asm.__wasm_call_ctors).apply(null, arguments);
};
a._free = function() {
  return (a._free = a.asm.free).apply(null, arguments);
};
a._tiny = function() {
  return (a._tiny = a.asm.tiny).apply(null, arguments);
};
a._malloc = function() {
  return (a._malloc = a.asm.malloc).apply(null, arguments);
};
a.___errno_location = function() {
  return (a.___errno_location = a.asm.__errno_location).apply(null, arguments);
};
var W = a.stackSave = function() {
  return (W = a.stackSave = a.asm.stackSave).apply(null, arguments);
}, X = a.stackRestore = function() {
  return (X = a.stackRestore = a.asm.stackRestore).apply(null, arguments);
};
a.stackAlloc = function() {
  return (a.stackAlloc = a.asm.stackAlloc).apply(null, arguments);
};
var S = a._setThrew = function() {
  return (S = a._setThrew = a.asm.setThrew).apply(null, arguments);
};
a.dynCall_jiji = function() {
  return (a.dynCall_jiji = a.asm.dynCall_jiji).apply(null, arguments);
};
function sa(b, c, f, d, e) {
  var g = W();
  try {
    M.get(b)(c, f, d, e);
  } catch (x) {
    X(g);
    if (x !== x + 0 && "longjmp" !== x) {
      throw x;
    }
    S(1, 0);
  }
}
function qa(b, c, f) {
  var d = W();
  try {
    return M.get(b)(c, f);
  } catch (e) {
    X(d);
    if (e !== e + 0 && "longjmp" !== e) {
      throw e;
    }
    S(1, 0);
  }
}
function ra(b, c, f) {
  var d = W();
  try {
    M.get(b)(c, f);
  } catch (e) {
    X(d);
    if (e !== e + 0 && "longjmp" !== e) {
      throw e;
    }
    S(1, 0);
  }
}
var Y;
P = function ua() {
  Y || Z();
  Y || (P = ua);
};
function Z() {
  function b() {
    if (!Y && (Y = !0, a.calledRun = !0, !J)) {
      R(fa);
      if (a.onRuntimeInitialized) {
        a.onRuntimeInitialized();
      }
      if (a.postRun) {
        for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) {
          var c = a.postRun.shift();
          ha.unshift(c);
        }
      }
      R(ha);
    }
  }
  if (!(0 < N)) {
    if (a.preRun) {
      for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) {
        ia();
      }
    }
    R(ea);
    0 < N || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        a.setStatus("");
      }, 1);
      b();
    }, 1)) : b());
  }
}
a.run = Z;
if (a.preInit) {
  for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); 0 < a.preInit.length;) {
    a.preInit.pop()();
  }
}
Z();


return pngtiny;
}));
