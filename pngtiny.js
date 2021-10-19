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
var h = {}, k;
for (k in b) {
  b.hasOwnProperty(k) && (h[k] = b[k]);
}
var m = "./this.program";
function n(a, c) {
  throw c;
}
var p = !1, q = !1, r = !1, t = !1;
p = "object" === typeof window;
q = "function" === typeof importScripts;
r = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
t = !p && !r && !q;
var u = "", v, w, x, y, z;
if (r) {
  u = q ? require("path").dirname(u) + "/" : __dirname + "/", v = function(a, c) {
    y || (y = require("fs"));
    z || (z = require("path"));
    a = z.normalize(a);
    return y.readFileSync(a, c ? null : "utf8");
  }, x = function(a) {
    a = v(a, !0);
    a.buffer || (a = new Uint8Array(a));
    a.buffer || A("Assertion failed: undefined");
    return a;
  }, 1 < process.argv.length && (m = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), "undefined" !== typeof module && (module.exports = b), process.on("uncaughtException", function(a) {
    if (!(a instanceof B)) {
      throw a;
    }
  }), process.on("unhandledRejection", A), n = function(a) {
    process.exit(a);
  }, b.inspect = function() {
    return "[Emscripten Module object]";
  };
} else {
  if (t) {
    "undefined" != typeof read && (v = function(a) {
      return read(a);
    }), x = function(a) {
      if ("function" === typeof readbuffer) {
        return new Uint8Array(readbuffer(a));
      }
      a = read(a, "binary");
      "object" === typeof a || A("Assertion failed: undefined");
      return a;
    }, "function" === typeof quit && (n = function(a) {
      quit(a);
    }), "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
  } else {
    if (p || q) {
      q ? u = self.location.href : "undefined" !== typeof document && document.currentScript && (u = document.currentScript.src), u = 0 !== u.indexOf("blob:") ? u.substr(0, u.lastIndexOf("/") + 1) : "", v = function(a) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !1);
        c.send(null);
        return c.responseText;
      }, q && (x = function(a) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !1);
        c.responseType = "arraybuffer";
        c.send(null);
        return new Uint8Array(c.response);
      }), w = function(a, c, f) {
        var e = new XMLHttpRequest;
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = function() {
          200 == e.status || 0 == e.status && e.response ? c(e.response) : f();
        };
        e.onerror = f;
        e.send(null);
      };
    }
  }
}
var aa = b.print || console.log.bind(console), C = b.printErr || console.warn.bind(console);
for (k in h) {
  h.hasOwnProperty(k) && (b[k] = h[k]);
}
h = null;
b.thisProgram && (m = b.thisProgram);
b.quit && (n = b.quit);
var D = 0, E;
b.wasmBinary && (E = b.wasmBinary);
var noExitRuntime = b.noExitRuntime || !0;
"object" !== typeof WebAssembly && A("no native wasm support detected");
var F, G = !1, ba = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function ca(a, c, f) {
  var e = c + f;
  for (f = c; a[f] && !(f >= e);) {
    ++f;
  }
  if (16 < f - c && a.subarray && ba) {
    return ba.decode(a.subarray(c, f));
  }
  for (e = ""; c < f;) {
    var d = a[c++];
    if (d & 128) {
      var g = a[c++] & 63;
      if (192 == (d & 224)) {
        e += String.fromCharCode((d & 31) << 6 | g);
      } else {
        var l = a[c++] & 63;
        d = 224 == (d & 240) ? (d & 15) << 12 | g << 6 | l : (d & 7) << 18 | g << 12 | l << 6 | a[c++] & 63;
        65536 > d ? e += String.fromCharCode(d) : (d -= 65536, e += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023));
      }
    } else {
      e += String.fromCharCode(d);
    }
  }
  return e;
}
function H(a) {
  return a ? ca(I, a, void 0) : "";
}
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
var da, J, I, K;
function ea() {
  var a = F.buffer;
  da = a;
  b.HEAP8 = J = new Int8Array(a);
  b.HEAP16 = new Int16Array(a);
  b.HEAP32 = K = new Int32Array(a);
  b.HEAPU8 = I = new Uint8Array(a);
  b.HEAPU16 = new Uint16Array(a);
  b.HEAPU32 = new Uint32Array(a);
  b.HEAPF32 = new Float32Array(a);
  b.HEAPF64 = new Float64Array(a);
}
var L, fa = [], ha = [], ia = [];
function ja() {
  var a = b.preRun.shift();
  fa.unshift(a);
}
var M = 0, N = null, O = null;
b.preloadedImages = {};
b.preloadedAudios = {};
function A(a) {
  if (b.onAbort) {
    b.onAbort(a);
  }
  C(a);
  G = !0;
  throw new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
}
function ka() {
  return P.startsWith("data:application/octet-stream;base64,");
}
var P = "pngtiny.wasm";
if (!ka()) {
  var la = P;
  P = b.locateFile ? b.locateFile(la, u) : u + la;
}
function ma() {
  var a = P;
  try {
    if (a == P && E) {
      return new Uint8Array(E);
    }
    if (x) {
      return x(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (c) {
    A(c);
  }
}
function oa() {
  if (!E && (p || q)) {
    if ("function" === typeof fetch && !P.startsWith("file://")) {
      return fetch(P, {credentials:"same-origin"}).then(function(a) {
        if (!a.ok) {
          throw "failed to load wasm binary file at '" + P + "'";
        }
        return a.arrayBuffer();
      }).catch(function() {
        return ma();
      });
    }
    if (w) {
      return new Promise(function(a, c) {
        w(P, function(f) {
          a(new Uint8Array(f));
        }, c);
      });
    }
  }
  return Promise.resolve().then(function() {
    return ma();
  });
}
function Q(a) {
  for (; 0 < a.length;) {
    var c = a.shift();
    if ("function" == typeof c) {
      c(b);
    } else {
      var f = c.h;
      "number" === typeof f ? void 0 === c.g ? L.get(f)() : L.get(f)(c.g) : f(void 0 === c.g ? null : c.g);
    }
  }
}
var pa = {};
function qa() {
  if (!R) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:m || "./this.program"}, c;
    for (c in pa) {
      a[c] = pa[c];
    }
    var f = [];
    for (c in a) {
      f.push(c + "=" + a[c]);
    }
    R = f;
  }
  return R;
}
var R, ra = [null, [], []], va = {__assert_fail:function(a, c, f, e) {
  A("Assertion failed: " + H(a) + ", at: " + [c ? H(c) : "unknown filename", f, e ? H(e) : "unknown function"]);
}, abort:function() {
  A();
}, emscripten_longjmp:function(a, c) {
  S(a, c || 1);
  throw "longjmp";
}, emscripten_memcpy_big:function(a, c, f) {
  I.copyWithin(a, c, c + f);
}, emscripten_resize_heap:function(a) {
  var c = I.length;
  a >>>= 0;
  if (1073741824 < a) {
    return !1;
  }
  for (var f = 1; 4 >= f; f *= 2) {
    var e = c * (1 + 0.2 / f);
    e = Math.min(e, a + 100663296);
    e = Math.max(a, e);
    0 < e % 65536 && (e += 65536 - e % 65536);
    a: {
      try {
        F.grow(Math.min(1073741824, e) - da.byteLength + 65535 >>> 16);
        ea();
        var d = 1;
        break a;
      } catch (g) {
      }
      d = void 0;
    }
    if (d) {
      return !0;
    }
  }
  return !1;
}, environ_get:function(a, c) {
  var f = 0;
  qa().forEach(function(e, d) {
    var g = c + f;
    d = K[a + 4 * d >> 2] = g;
    for (g = 0; g < e.length; ++g) {
      J[d++ >> 0] = e.charCodeAt(g);
    }
    J[d >> 0] = 0;
    f += e.length + 1;
  });
  return 0;
}, environ_sizes_get:function(a, c) {
  var f = qa();
  K[a >> 2] = f.length;
  var e = 0;
  f.forEach(function(d) {
    e += d.length + 1;
  });
  K[c >> 2] = e;
  return 0;
}, exit:function(a) {
  if (!noExitRuntime) {
    if (b.onExit) {
      b.onExit(a);
    }
    G = !0;
  }
  n(a, new B(a));
}, fd_close:function() {
  return 0;
}, fd_seek:function() {
}, fd_write:function(a, c, f, e) {
  for (var d = 0, g = 0; g < f; g++) {
    for (var l = K[c + 8 * g >> 2], na = K[c + (8 * g + 4) >> 2], T = 0; T < na; T++) {
      var U = I[l + T], V = ra[a];
      0 === U || 10 === U ? ((1 === a ? aa : C)(ca(V, 0)), V.length = 0) : V.push(U);
    }
    d += na;
  }
  K[e >> 2] = d;
  return 0;
}, getTempRet0:function() {
  return D;
}, invoke_iii:sa, invoke_vii:ta, invoke_viiii:ua, setTempRet0:function(a) {
  D = a;
}};
(function() {
  function a(d) {
    b.asm = d.exports;
    F = b.asm.memory;
    ea();
    L = b.asm.__indirect_function_table;
    ha.unshift(b.asm.__wasm_call_ctors);
    M--;
    b.monitorRunDependencies && b.monitorRunDependencies(M);
    0 == M && (null !== N && (clearInterval(N), N = null), O && (d = O, O = null, d()));
  }
  function c(d) {
    a(d.instance);
  }
  function f(d) {
    return oa().then(function(g) {
      return WebAssembly.instantiate(g, e);
    }).then(d, function(g) {
      C("failed to asynchronously prepare wasm: " + g);
      A(g);
    });
  }
  var e = {env:va, wasi_snapshot_preview1:va, };
  M++;
  b.monitorRunDependencies && b.monitorRunDependencies(M);
  if (b.instantiateWasm) {
    try {
      return b.instantiateWasm(e, a);
    } catch (d) {
      return C("Module.instantiateWasm callback failed with error: " + d), !1;
    }
  }
  (function() {
    return E || "function" !== typeof WebAssembly.instantiateStreaming || ka() || P.startsWith("file://") || "function" !== typeof fetch ? f(c) : fetch(P, {credentials:"same-origin"}).then(function(d) {
      return WebAssembly.instantiateStreaming(d, e).then(c, function(g) {
        C("wasm streaming compile failed: " + g);
        C("falling back to ArrayBuffer instantiation");
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
var W = b.stackSave = function() {
  return (W = b.stackSave = b.asm.stackSave).apply(null, arguments);
}, X = b.stackRestore = function() {
  return (X = b.stackRestore = b.asm.stackRestore).apply(null, arguments);
};
b.stackAlloc = function() {
  return (b.stackAlloc = b.asm.stackAlloc).apply(null, arguments);
};
var S = b._setThrew = function() {
  return (S = b._setThrew = b.asm.setThrew).apply(null, arguments);
};
b.dynCall_jiji = function() {
  return (b.dynCall_jiji = b.asm.dynCall_jiji).apply(null, arguments);
};
function ua(a, c, f, e, d) {
  var g = W();
  try {
    L.get(a)(c, f, e, d);
  } catch (l) {
    X(g);
    if (l !== l + 0 && "longjmp" !== l) {
      throw l;
    }
    S(1, 0);
  }
}
function sa(a, c, f) {
  var e = W();
  try {
    return L.get(a)(c, f);
  } catch (d) {
    X(e);
    if (d !== d + 0 && "longjmp" !== d) {
      throw d;
    }
    S(1, 0);
  }
}
function ta(a, c, f) {
  var e = W();
  try {
    L.get(a)(c, f);
  } catch (d) {
    X(e);
    if (d !== d + 0 && "longjmp" !== d) {
      throw d;
    }
    S(1, 0);
  }
}
var Y;
function B(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
O = function wa() {
  Y || Z();
  Y || (O = wa);
};
function Z() {
  function a() {
    if (!Y && (Y = !0, b.calledRun = !0, !G)) {
      Q(ha);
      if (b.onRuntimeInitialized) {
        b.onRuntimeInitialized();
      }
      if (b.postRun) {
        for ("function" == typeof b.postRun && (b.postRun = [b.postRun]); b.postRun.length;) {
          var c = b.postRun.shift();
          ia.unshift(c);
        }
      }
      Q(ia);
    }
  }
  if (!(0 < M)) {
    if (b.preRun) {
      for ("function" == typeof b.preRun && (b.preRun = [b.preRun]); b.preRun.length;) {
        ja();
      }
    }
    Q(fa);
    0 < M || (b.setStatus ? (b.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        b.setStatus("");
      }, 1);
      a();
    }, 1)) : a());
  }
}
b.run = Z;
if (b.preInit) {
  for ("function" == typeof b.preInit && (b.preInit = [b.preInit]); 0 < b.preInit.length;) {
    b.preInit.pop()();
  }
}
Z();


return pngtiny;
}));
