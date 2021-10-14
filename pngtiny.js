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

var b;
b || (b = typeof pngtiny !== 'undefined' ? pngtiny : {});
var k = {}, l;
for (l in b) {
  b.hasOwnProperty(l) && (k[l] = b[l]);
}
var p = "./this.program";
function q(a, c) {
  throw c;
}
var r = !1, t = !1, u = !1, ba = !1;
r = "object" === typeof window;
t = "function" === typeof importScripts;
u = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
ba = !r && !u && !t;
var w = "", x, A, B, C, D;
if (u) {
  w = t ? require("path").dirname(w) + "/" : __dirname + "/", x = function(a, c) {
    C || (C = require("fs"));
    D || (D = require("path"));
    a = D.normalize(a);
    return C.readFileSync(a, c ? null : "utf8");
  }, B = function(a) {
    a = x(a, !0);
    a.buffer || (a = new Uint8Array(a));
    a.buffer || E("Assertion failed: undefined");
    return a;
  }, 1 < process.argv.length && (p = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), "undefined" !== typeof module && (module.exports = b), process.on("uncaughtException", function(a) {
    if (!(a instanceof ca)) {
      throw a;
    }
  }), process.on("unhandledRejection", E), q = function(a) {
    process.exit(a);
  }, b.inspect = function() {
    return "[Emscripten Module object]";
  };
} else {
  if (ba) {
    "undefined" != typeof read && (x = function(a) {
      return read(a);
    }), B = function(a) {
      if ("function" === typeof readbuffer) {
        return new Uint8Array(readbuffer(a));
      }
      a = read(a, "binary");
      "object" === typeof a || E("Assertion failed: undefined");
      return a;
    }, "function" === typeof quit && (q = function(a) {
      quit(a);
    }), "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
  } else {
    if (r || t) {
      t ? w = self.location.href : "undefined" !== typeof document && document.currentScript && (w = document.currentScript.src), w = 0 !== w.indexOf("blob:") ? w.substr(0, w.lastIndexOf("/") + 1) : "", x = function(a) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !1);
        c.send(null);
        return c.responseText;
      }, t && (B = function(a) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !1);
        c.responseType = "arraybuffer";
        c.send(null);
        return new Uint8Array(c.response);
      }), A = function(a, c, f) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
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
var da = b.print || console.log.bind(console), G = b.printErr || console.warn.bind(console);
for (l in k) {
  k.hasOwnProperty(l) && (b[l] = k[l]);
}
k = null;
b.thisProgram && (p = b.thisProgram);
b.quit && (q = b.quit);
var ea = 0, H;
b.wasmBinary && (H = b.wasmBinary);
var noExitRuntime = b.noExitRuntime || !0;
"object" !== typeof WebAssembly && E("no native wasm support detected");
var I, J = !1, fa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
var ha, K, L, M;
function ia() {
  var a = I.buffer;
  ha = a;
  b.HEAP8 = K = new Int8Array(a);
  b.HEAP16 = new Int16Array(a);
  b.HEAP32 = M = new Int32Array(a);
  b.HEAPU8 = L = new Uint8Array(a);
  b.HEAPU16 = new Uint16Array(a);
  b.HEAPU32 = new Uint32Array(a);
  b.HEAPF32 = new Float32Array(a);
  b.HEAPF64 = new Float64Array(a);
}
var N, ja = [], ka = [], la = [];
function ma() {
  var a = b.preRun.shift();
  ja.unshift(a);
}
var O = 0, P = null, Q = null;
b.preloadedImages = {};
b.preloadedAudios = {};
function E(a) {
  if (b.onAbort) {
    b.onAbort(a);
  }
  G(a);
  J = !0;
  throw new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
}
function na() {
  return R.startsWith("data:application/octet-stream;base64,");
}
var R = "pngtiny.wasm";
if (!na()) {
  var oa = R;
  R = b.locateFile ? b.locateFile(oa, w) : w + oa;
}
function pa() {
  var a = R;
  try {
    if (a == R && H) {
      return new Uint8Array(H);
    }
    if (B) {
      return B(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (c) {
    E(c);
  }
}
function qa() {
  if (!H && (r || t)) {
    if ("function" === typeof fetch && !R.startsWith("file://")) {
      return fetch(R, {credentials:"same-origin"}).then(function(a) {
        if (!a.ok) {
          throw "failed to load wasm binary file at '" + R + "'";
        }
        return a.arrayBuffer();
      }).catch(function() {
        return pa();
      });
    }
    if (A) {
      return new Promise(function(a, c) {
        A(R, function(f) {
          a(new Uint8Array(f));
        }, c);
      });
    }
  }
  return Promise.resolve().then(function() {
    return pa();
  });
}
function S(a) {
  for (; 0 < a.length;) {
    var c = a.shift();
    if ("function" == typeof c) {
      c(b);
    } else {
      var f = c.h;
      "number" === typeof f ? void 0 === c.g ? N.get(f)() : N.get(f)(c.g) : f(void 0 === c.g ? null : c.g);
    }
  }
}
var ta = {};
function ua() {
  if (!T) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:p || "./this.program"}, c;
    for (c in ta) {
      a[c] = ta[c];
    }
    var f = [];
    for (c in a) {
      f.push(c + "=" + a[c]);
    }
    T = f;
  }
  return T;
}
var T, va = [null, [], []], za = {abort:function() {
  E();
}, emscripten_longjmp:function(a, c) {
  U(a, c || 1);
  throw "longjmp";
}, emscripten_memcpy_big:function(a, c, f) {
  L.copyWithin(a, c, c + f);
}, emscripten_resize_heap:function(a) {
  var c = L.length;
  a >>>= 0;
  if (1073741824 < a) {
    return !1;
  }
  for (var f = 1; 4 >= f; f *= 2) {
    var d = c * (1 + 0.2 / f);
    d = Math.min(d, a + 100663296);
    d = Math.max(a, d);
    0 < d % 65536 && (d += 65536 - d % 65536);
    a: {
      try {
        I.grow(Math.min(1073741824, d) - ha.byteLength + 65535 >>> 16);
        ia();
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
}, environ_get:function(a, c) {
  var f = 0;
  ua().forEach(function(d, e) {
    var g = c + f;
    e = M[a + 4 * e >> 2] = g;
    for (g = 0; g < d.length; ++g) {
      K[e++ >> 0] = d.charCodeAt(g);
    }
    K[e >> 0] = 0;
    f += d.length + 1;
  });
  return 0;
}, environ_sizes_get:function(a, c) {
  var f = ua();
  M[a >> 2] = f.length;
  var d = 0;
  f.forEach(function(e) {
    d += e.length + 1;
  });
  M[c >> 2] = d;
  return 0;
}, exit:function(a) {
  if (!noExitRuntime) {
    if (b.onExit) {
      b.onExit(a);
    }
    J = !0;
  }
  q(a, new ca(a));
}, fd_close:function() {
  return 0;
}, fd_seek:function() {
}, fd_write:function(a, c, f, d) {
  for (var e = 0, g = 0; g < f; g++) {
    for (var y = M[c + 8 * g >> 2], ra = M[c + (8 * g + 4) >> 2], Y = 0; Y < ra; Y++) {
      var F = L[y + Y], Z = va[a];
      if (0 === F || 10 === F) {
        F = 1 === a ? da : G;
        var m = Z;
        for (var n = 0, v = n + NaN, z = n; m[z] && !(z >= v);) {
          ++z;
        }
        if (16 < z - n && m.subarray && fa) {
          m = fa.decode(m.subarray(n, z));
        } else {
          for (v = ""; n < z;) {
            var h = m[n++];
            if (h & 128) {
              var aa = m[n++] & 63;
              if (192 == (h & 224)) {
                v += String.fromCharCode((h & 31) << 6 | aa);
              } else {
                var sa = m[n++] & 63;
                h = 224 == (h & 240) ? (h & 15) << 12 | aa << 6 | sa : (h & 7) << 18 | aa << 12 | sa << 6 | m[n++] & 63;
                65536 > h ? v += String.fromCharCode(h) : (h -= 65536, v += String.fromCharCode(55296 | h >> 10, 56320 | h & 1023));
              }
            } else {
              v += String.fromCharCode(h);
            }
          }
          m = v;
        }
        F(m);
        Z.length = 0;
      } else {
        Z.push(F);
      }
    }
    e += ra;
  }
  M[d >> 2] = e;
  return 0;
}, getTempRet0:function() {
  return ea;
}, invoke_iii:wa, invoke_vii:xa, invoke_viiii:ya, setTempRet0:function(a) {
  ea = a;
}};
(function() {
  function a(e) {
    b.asm = e.exports;
    I = b.asm.memory;
    ia();
    N = b.asm.__indirect_function_table;
    ka.unshift(b.asm.__wasm_call_ctors);
    O--;
    b.monitorRunDependencies && b.monitorRunDependencies(O);
    0 == O && (null !== P && (clearInterval(P), P = null), Q && (e = Q, Q = null, e()));
  }
  function c(e) {
    a(e.instance);
  }
  function f(e) {
    return qa().then(function(g) {
      return WebAssembly.instantiate(g, d);
    }).then(e, function(g) {
      G("failed to asynchronously prepare wasm: " + g);
      E(g);
    });
  }
  var d = {env:za, wasi_snapshot_preview1:za, };
  O++;
  b.monitorRunDependencies && b.monitorRunDependencies(O);
  if (b.instantiateWasm) {
    try {
      return b.instantiateWasm(d, a);
    } catch (e) {
      return G("Module.instantiateWasm callback failed with error: " + e), !1;
    }
  }
  (function() {
    return H || "function" !== typeof WebAssembly.instantiateStreaming || na() || R.startsWith("file://") || "function" !== typeof fetch ? f(c) : fetch(R, {credentials:"same-origin"}).then(function(e) {
      return WebAssembly.instantiateStreaming(e, d).then(c, function(g) {
        G("wasm streaming compile failed: " + g);
        G("falling back to ArrayBuffer instantiation");
        return f(c);
      });
    });
  })();
  return {};
})();
b.___wasm_call_ctors = function() {
  return (b.___wasm_call_ctors = b.asm.__wasm_call_ctors).apply(null, arguments);
};
b._tiny = function() {
  return (b._tiny = b.asm.tiny).apply(null, arguments);
};
b._malloc = function() {
  return (b._malloc = b.asm.malloc).apply(null, arguments);
};
b._free = function() {
  return (b._free = b.asm.free).apply(null, arguments);
};
b.___errno_location = function() {
  return (b.___errno_location = b.asm.__errno_location).apply(null, arguments);
};
var V = b.stackSave = function() {
  return (V = b.stackSave = b.asm.stackSave).apply(null, arguments);
}, W = b.stackRestore = function() {
  return (W = b.stackRestore = b.asm.stackRestore).apply(null, arguments);
};
b.stackAlloc = function() {
  return (b.stackAlloc = b.asm.stackAlloc).apply(null, arguments);
};
var U = b._setThrew = function() {
  return (U = b._setThrew = b.asm.setThrew).apply(null, arguments);
};
b.dynCall_jiji = function() {
  return (b.dynCall_jiji = b.asm.dynCall_jiji).apply(null, arguments);
};
function ya(a, c, f, d, e) {
  var g = V();
  try {
    N.get(a)(c, f, d, e);
  } catch (y) {
    W(g);
    if (y !== y + 0 && "longjmp" !== y) {
      throw y;
    }
    U(1, 0);
  }
}
function wa(a, c, f) {
  var d = V();
  try {
    return N.get(a)(c, f);
  } catch (e) {
    W(d);
    if (e !== e + 0 && "longjmp" !== e) {
      throw e;
    }
    U(1, 0);
  }
}
function xa(a, c, f) {
  var d = V();
  try {
    N.get(a)(c, f);
  } catch (e) {
    W(d);
    if (e !== e + 0 && "longjmp" !== e) {
      throw e;
    }
    U(1, 0);
  }
}
var X;
function ca(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
Q = function Aa() {
  X || Ba();
  X || (Q = Aa);
};
function Ba() {
  function a() {
    if (!X && (X = !0, b.calledRun = !0, !J)) {
      S(ka);
      if (b.onRuntimeInitialized) {
        b.onRuntimeInitialized();
      }
      if (b.postRun) {
        for ("function" == typeof b.postRun && (b.postRun = [b.postRun]); b.postRun.length;) {
          var c = b.postRun.shift();
          la.unshift(c);
        }
      }
      S(la);
    }
  }
  if (!(0 < O)) {
    if (b.preRun) {
      for ("function" == typeof b.preRun && (b.preRun = [b.preRun]); b.preRun.length;) {
        ma();
      }
    }
    S(ja);
    0 < O || (b.setStatus ? (b.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        b.setStatus("");
      }, 1);
      a();
    }, 1)) : a());
  }
}
b.run = Ba;
if (b.preInit) {
  for ("function" == typeof b.preInit && (b.preInit = [b.preInit]); 0 < b.preInit.length;) {
    b.preInit.pop()();
  }
}
Ba();


return pngtiny;
}));
