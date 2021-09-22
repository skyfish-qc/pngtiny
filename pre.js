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