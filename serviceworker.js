/* Configuration of the Service Worker */
var CACHE_VERSION = 'cache-v1';
var zip_with_the_website = 'http://localhost/mywebsite.zip';
var individual_requests = ['/scripts.js','/styles.css'];
var filter_location_of_zip = ['webzipdir/'];
var tags_to_replace = {
  '<mcheader></mcheader>': '<header><h1>Custom Header</h1></header>',
  '<mcfooter></mcfooter>': '<footer><small>Custom Footer</small></footer>'
};
var server_headers = {
  'Strict-Transport-Security': 'max-age=31556926',
  'Access-Control-Allow-Origin': '*.mydomain.com',
  'X-Content-Security-Policy': "default-src 'self' data: 'unsafe-inline' *.google-analytics.com *.googleusercontent.com *.googleapis.com;",
  'Content-Security-Policy': "default-src 'self' data: 'unsafe-inline' *.google-analytics.com *.googleusercontent.com *.googleapis.com;",
  'Feature-Policy': "payment 'none'; geolocation 'self'; camera 'none'; microphone 'none';",
  'Upgrade-Insecure-Requests': '1',
  'Referrer-Policy': 'no-referrer-when-downgrade',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Connection': 'keep-alive',
  'Vary': 'Accept-Encoding',
  'Cache-Control': 'public, max-age=60, must-revalidate, no-transform'
};
var service_worker_routes = function(rurl){
  return rurl.indexOf('mydomain.com') > -1 &&
    rurl.indexOf('/__/') == -1 && 
    rurl.indexOf('google-analytics.com') == -1 && 
    rurl.indexOf('.pdf') == -1 && 
    rurl.indexOf('serviceworker.js') == -1 && 
    rurl.indexOf('mywebsite.zip') == -1 && 
}

/* typedarray.js
 Copyright (c) 2010, Linden Research, Inc.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
var ArrayBuffer,ArrayBufferView,Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,DataView;
(function(){function l(){document&&document.createTextNode("").splitText(1);throw new RangeError("INDEX_SIZE_ERR");}function m(a){if(Object.getOwnPropertyNames&&Object.defineProperty){var c=Object.getOwnPropertyNames(a),b;for(b=0;b<c.length;b+=1)Object.defineProperty(a,c[b],{value:a[c[b]],writable:!1,enumerable:!1,configurable:!1})}}function u(a){function c(c){Object.defineProperty(a,c,{get:function(){return a._getter(c)},set:function(e){a._setter(c,e)},enumerable:!0,configurable:!1})}if(Object.defineProperty){var b;
for(b=0;b<a.length;b+=1)c(b)}}function p(a,c){var b=32-c;return a<<b>>b}function q(a,c){var b=32-c;return a<<b>>>b}function v(a){return[a&255]}function w(a){return p(a[0],8)}function x(a){return[a&255]}function y(a){return q(a[0],8)}function z(a){return[a>>8&255,a&255]}function A(a){return p(a[0]<<8|a[1],16)}function B(a){return[a>>8&255,a&255]}function C(a){return q(a[0]<<8|a[1],16)}function D(a){return[a>>24&255,a>>16&255,a>>8&255,a&255]}function E(a){return p(a[0]<<24|a[1]<<16|a[2]<<8|a[3],32)}
function F(a){return[a>>24&255,a>>16&255,a>>8&255,a&255]}function G(a){return q(a[0]<<24|a[1]<<16|a[2]<<8|a[3],32)}function r(a,c,b){var f=(1<<c-1)-1;if(isNaN(a)){var e=(1<<f)-1;f=Math.pow(2,b-1);var d=0}else if(Infinity===a||-Infinity===a)e=(1<<f)-1,f=0,d=0>a?1:0;else if(0===a)f=e=0,d=-Infinity===1/a?1:0;else if(d=0>a,a=Math.abs(a),a>=Math.pow(2,1-f)){var g=Math.min(Math.floor(Math.log(a)/Math.LN2),f);e=g+f;f=Math.round(a*Math.pow(2,b-g)-Math.pow(2,b))}else e=0,f=Math.round(a/Math.pow(2,1-f-b));
for(a=[];b;--b)a.push(f%2?1:0),f=Math.floor(f/2);for(b=c;b;--b)a.push(e%2?1:0),e=Math.floor(e/2);a.push(d?1:0);a.reverse();c=a.join("");for(d=[];c.length;)d.push(parseInt(c.substring(0,8),2)),c=c.substring(8);return d}function t(a,c,b){var f=[],e,d;for(e=a.length;e;--e){var g=a[e-1];for(d=8;d;--d)f.push(g%2?1:0),g>>=1}f.reverse();d=f.join("");a=(1<<c-1)-1;f=parseInt(d.substring(0,1),2)?-1:1;e=parseInt(d.substring(1,1+c),2);d=parseInt(d.substring(1+c),2);return e===(1<<c)-1?0!==d?NaN:Infinity*f:0<
e?f*Math.pow(2,e-a)*(1+d/Math.pow(2,b)):0!==d?d/Math.pow(2,b)*Math.pow(2,-(a-1))*f:0>f?-0:0}function H(a){return t(a,11,52)}function I(a){return r(a,11,52)}function J(a){return t(a,8,23)}function K(a){return r(a,8,23)}var h={ToInt32:function(a){return a>>0},ToUint32:function(a){return a>>>0}};Object.prototype.__defineGetter__&&!Object.defineProperty&&(Object.defineProperty=function(a,c,b){b.hasOwnProperty("get")&&a.__defineGetter__(c,b.get);b.hasOwnProperty("set")&&a.__defineSetter__(c,b.set)});ArrayBuffer||
function(){function a(a,b,f){var e=function(a,c,b){var d;if(arguments.length&&"number"!==typeof arguments[0])if("object"===typeof arguments[0]&&arguments[0].constructor===e){var g=arguments[0];this.length=g.length;this.byteLength=this.length*this.BYTES_PER_ELEMENT;this.buffer=new ArrayBuffer(this.byteLength);for(d=this.byteOffset=0;d<this.length;d+=1)this._setter(d,g._getter(d))}else if("object"!==typeof arguments[0]||arguments[0]instanceof ArrayBuffer)if("object"===typeof arguments[0]&&arguments[0]instanceof
ArrayBuffer){this.buffer=a;this.byteOffset=h.ToUint32(c);this.byteOffset>this.buffer.byteLength&&l();if(this.byteOffset%this.BYTES_PER_ELEMENT)throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");3>arguments.length?(this.byteLength=this.buffer.byteLength-this.byteOffset,this.byteLength%this.BYTES_PER_ELEMENT&&l(),this.length=this.byteLength/this.BYTES_PER_ELEMENT):(this.length=h.ToUint32(b),this.byteLength=this.length*this.BYTES_PER_ELEMENT);this.byteOffset+
this.byteLength>this.buffer.byteLength&&l()}else throw new TypeError("Unexpected argument type(s)");else for(g=arguments[0],this.length=h.ToUint32(g.length),this.byteLength=this.length*this.BYTES_PER_ELEMENT,this.buffer=new ArrayBuffer(this.byteLength),d=this.byteOffset=0;d<this.length;d+=1){var f=g[d];this._setter(d,Number(f))}else{this.length=h.ToInt32(arguments[0]);if(0>b)throw new RangeError("ArrayBufferView size is not a small enough positive integer.");this.byteLength=this.length*this.BYTES_PER_ELEMENT;
this.buffer=new ArrayBuffer(this.byteLength);this.byteOffset=0}this.constructor=e;m(this);u(this)};e.prototype=new ArrayBufferView;e.prototype.BYTES_PER_ELEMENT=a;e.prototype._pack=b;e.prototype._unpack=f;e.BYTES_PER_ELEMENT=a;e.prototype._getter=function(a){if(1>arguments.length)throw new SyntaxError("Not enough arguments");a=h.ToUint32(a);if(!(a>=this.length)){var d=[],e;var c=0;for(e=this.byteOffset+a*this.BYTES_PER_ELEMENT;c<this.BYTES_PER_ELEMENT;c+=1,e+=1)d.push(this.buffer._bytes[e]);return this._unpack(d)}};
e.prototype.get=e.prototype._getter;e.prototype._setter=function(a,e){if(2>arguments.length)throw new SyntaxError("Not enough arguments");a=h.ToUint32(a);if(!(a>=this.length)){var d=this._pack(e),c;var b=0;for(c=this.byteOffset+a*this.BYTES_PER_ELEMENT;b<this.BYTES_PER_ELEMENT;b+=1,c+=1)this.buffer._bytes[c]=d[b]}};e.prototype.set=function(a,e){if(1>arguments.length)throw new SyntaxError("Not enough arguments");var d;if("object"===typeof arguments[0]&&arguments[0].constructor===this.constructor){var c=
arguments[0];var b=h.ToUint32(arguments[1]);b+c.length>this.length&&l();var g=this.byteOffset+b*this.BYTES_PER_ELEMENT;b=c.length*this.BYTES_PER_ELEMENT;if(c.buffer===this.buffer){var f=[];var k=0;for(d=c.byteOffset;k<b;k+=1,d+=1)f[k]=c.buffer._bytes[d];for(k=0;k<b;k+=1,g+=1)this.buffer._bytes[g]=f[k]}else for(k=0,d=c.byteOffset;k<b;k+=1,d+=1,g+=1)this.buffer._bytes[g]=c.buffer._bytes[d]}else if("object"===typeof arguments[0]&&"undefined"!==typeof arguments[0].length)for(c=arguments[0],f=h.ToUint32(c.length),
b=h.ToUint32(arguments[1]),b+f>this.length&&l(),k=0;k<f;k+=1)d=c[k],this._setter(b+k,Number(d));else throw new TypeError("Unexpected argument type(s)");};e.prototype.subarray=function(a,c){a=h.ToInt32(a);c=h.ToInt32(c);1>arguments.length&&(a=0);2>arguments.length&&(c=this.length);0>a&&(a=this.length+a);0>c&&(c=this.length+c);var b=this.length;a=0>a?0:a>b?b:a;b=this.length;b=(0>c?0:c>b?b:c)-a;0>b&&(b=0);return new this.constructor(this.buffer,a*this.BYTES_PER_ELEMENT,b)};return e}ArrayBuffer=function(a){a=
h.ToInt32(a);if(0>a)throw new RangeError("ArrayBuffer size is not a small enough positive integer.");this.byteLength=a;this._bytes=[];this._bytes.length=a;for(a=0;a<this.byteLength;a+=1)this._bytes[a]=0;m(this)};ArrayBufferView=function(){};Int8Array=Int8Array||a(1,v,w);Uint8Array=Uint8Array||a(1,x,y);Int16Array=Int16Array||a(2,z,A);Uint16Array=Uint16Array||a(2,B,C);Int32Array=Int32Array||a(4,D,E);Uint32Array=Uint32Array||a(4,F,G);Float32Array=Float32Array||a(4,K,J);Float64Array=Float64Array||a(8,
I,H)}();DataView||function(){function a(a,b){return"function"===typeof a.get?a.get(b):a[b]}function c(b){return function(c,e){c=h.ToUint32(c);c+b.BYTES_PER_ELEMENT>this.byteLength&&l();c+=this.byteOffset;var d=new Uint8Array(this.buffer,c,b.BYTES_PER_ELEMENT),g=[],n;for(n=0;n<b.BYTES_PER_ELEMENT;n+=1)g.push(a(d,n));!!e===!!f&&g.reverse();return a(new b((new Uint8Array(g)).buffer),0)}}function b(b){return function(c,e,m){c=h.ToUint32(c);c+b.BYTES_PER_ELEMENT>this.byteLength&&l();e=new b([e]);e=new Uint8Array(e.buffer);
var d=[],g;for(g=0;g<b.BYTES_PER_ELEMENT;g+=1)d.push(a(e,g));!!m===!!f&&d.reverse();(new Uint8Array(this.buffer,c,b.BYTES_PER_ELEMENT)).set(d)}}var f=function(){var b=new Uint16Array([4660]);b=new Uint8Array(b.buffer);return 18===a(b,0)}();DataView=function(a,b,c){if(!("object"===typeof a&&a instanceof ArrayBuffer))throw new TypeError("TypeError");this.buffer=a;this.byteOffset=h.ToUint32(b);this.byteOffset>this.buffer.byteLength&&l();this.byteLength=3>arguments.length?this.buffer.byteLength-this.byteOffset:
h.ToUint32(c);this.byteOffset+this.byteLength>this.buffer.byteLength&&l();m(this)};ArrayBufferView&&(DataView.prototype=new ArrayBufferView);DataView.prototype.getUint8=c(Uint8Array);DataView.prototype.getInt8=c(Int8Array);DataView.prototype.getUint16=c(Uint16Array);DataView.prototype.getInt16=c(Int16Array);DataView.prototype.getUint32=c(Uint32Array);DataView.prototype.getInt32=c(Int32Array);DataView.prototype.getFloat32=c(Float32Array);DataView.prototype.getFloat64=c(Float64Array);DataView.prototype.setUint8=
b(Uint8Array);DataView.prototype.setInt8=b(Int8Array);DataView.prototype.setUint16=b(Uint16Array);DataView.prototype.setInt16=b(Int16Array);DataView.prototype.setUint32=b(Uint32Array);DataView.prototype.setInt32=b(Int32Array);DataView.prototype.setFloat32=b(Float32Array);DataView.prototype.setFloat64=b(Float64Array)}()})();

/* zip.js 
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.
 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 JZlib is based on zlib-1.1.3, so all credit should go authors
 Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 and contributors of zlib.
*/
(function(r){function C(){this.crc=-1}function J(){}function V(a,b,c){if(0>b||0>c||b+c>a.size)throw new RangeError("offset:"+b+", length:"+c+", size:"+a.size);if(a.slice)return a.slice(b,b+c);if(a.webkitSlice)return a.webkitSlice(b,b+c);if(a.mozSlice)return a.mozSlice(b,b+c);if(a.msSlice)return a.msSlice(b,b+c)}function x(a,b){var c=new ArrayBuffer(a);var d=new Uint8Array(c);b&&d.set(b,0);return{buffer:c,array:d,view:new DataView(c)}}function D(){}function E(a){var b=this,c;b.size=0;b.init=function(d,
f){var e=new Blob([a],{type:"text/plain"});c=new y(e);c.init(function(){b.size=c.size;d()},f)};b.readUint8Array=function(a,b,e,k){c.readUint8Array(a,b,e,k)}}function F(a){var b=this,c;b.size=0;b.init=function(d){for(var f=a.length;"="==a.charAt(f-1);)f--;c=a.indexOf(",")+1;b.size=Math.floor(.75*(f-c));d()};b.readUint8Array=function(b,f,e){var d=x(f),l=4*Math.floor(b/3),n=r.atob(a.substring(l+c,4*Math.ceil((b+f)/3)+c));for(b=l=b-3*Math.floor(l/4);b<l+f;b++)d.array[b-l]=n.charCodeAt(b);e(d.array)}}
function y(a){var b=this;b.size=0;b.init=function(c){b.size=a.size;c()};b.readUint8Array=function(c,b,f,e){var d=new FileReader;d.onload=function(a){f(new Uint8Array(a.target.result))};d.onerror=e;try{d.readAsArrayBuffer(V(a,c,b))}catch(l){e(l)}}}function B(){}function G(a){var b;this.init=function(a){b=new Blob([],{type:"text/plain"});a()};this.writeUint8Array=function(a,d){b=new Blob([b,N?a:a.buffer],{type:"text/plain"});d()};this.getData=function(c,d){var f=new FileReader;f.onload=function(a){c(a.target.result)};
f.onerror=d;f.readAsText(b,a)}}function H(a){var b="",c="";this.init=function(c){b+="data:"+(a||"")+";base64,";c()};this.writeUint8Array=function(a,f){var d,k=c.length,l=c;c="";for(d=0;d<3*Math.floor((k+a.length)/3)-k;d++)l+=String.fromCharCode(a[d]);for(;d<a.length;d++)c+=String.fromCharCode(a[d]);2<l.length?b+=r.btoa(l):c=l;f()};this.getData=function(a){a(b+r.btoa(c))}}function I(a){var b;this.init=function(c){b=new Blob([],{type:a});c()};this.writeUint8Array=function(c,d){b=new Blob([b,N?c:c.buffer],
{type:a});d()};this.getData=function(a){a(b)}}function K(a,b,c,d,f,e,k,l,n,v){function p(){a.removeEventListener("message",w,!1);l(L,g)}function w(b){b=b.data;var c=b.data,l=b.error;if(l)l.toString=function(){return"Error: "+this.message},n(l);else if(b.sn===h)switch("number"===typeof b.codecTime&&(a.codecTime+=b.codecTime),"number"===typeof b.crcTime&&(a.crcTime+=b.crcTime),b.type){case "append":c?(L+=c.length,d.writeUint8Array(c,function(){m()},v)):m();break;case "flush":g=b.crc;c?(L+=c.length,
d.writeUint8Array(c,function(){p()},v)):p();break;case "progress":k&&k(q+b.loaded,e);break;case "importScripts":case "newTask":case "echo":break;default:console.warn("zip.js:launchWorkerProcess: unknown message: ",b)}}function m(){q=524288*t;q<=e?c.readUint8Array(f+q,Math.min(524288,e-q),function(c){k&&k(q,e);var d=0===q?b:{sn:h};d.type="append";d.data=c;try{a.postMessage(d,[c.buffer])}catch(z){a.postMessage(d)}t++},n):a.postMessage({sn:h,type:"flush"})}var t=0,q,h=b.sn,g;var L=0;a.addEventListener("message",
w,!1);m()}function M(a,b,c,d,f,e,k,l,n,v){function p(){m=524288*w;if(m<f)b.readUint8Array(d+m,Math.min(524288,f-m),function(b){try{var d=a.append(b,function(a){k&&k(m+a,f)})}catch(z){n(z);return}d?(t+=d.length,c.writeUint8Array(d,function(){w++;setTimeout(p,1)},v),h&&g.append(d)):(w++,setTimeout(p,1));q&&g.append(b);k&&k(m,f)},n);else{try{var e=a.flush()}catch(W){n(W);return}e?(h&&g.append(e),t+=e.length,c.writeUint8Array(e,function(){l(t,g.get())},v)):l(t,g.get())}}var w=0,m,t=0,q="input"===e,h=
"output"===e,g=new C;p()}function O(a,b,c,d,f,e,k,l,n,v,p){r.zip.useWebWorkers&&k?K(a,{sn:b,codecClass:"NOOP",crcType:"input"},c,d,f,e,n,l,v,p):M(new J,c,d,f,e,"input",n,l,v,p)}function P(a){var b,c="",d="\u00c7\u00fc\u00e9\u00e2\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u00ec\u00c4\u00c5\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u00ff\u00d6\u00dc\u00f8\u00a3\u00d8\u00d7\u0192\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u00aa\u00ba\u00bf\u00ae\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb___\u00a6\u00a6\u00c1\u00c2\u00c0\u00a9\u00a6\u00a6++\u00a2\u00a5++--+-+\u00e3\u00c3++--\u00a6-+\u00a4\u00f0\u00d0\u00ca\u00cb\u00c8i\u00cd\u00ce\u00cf++__\u00a6\u00cc_\u00d3\u00df\u00d4\u00d2\u00f5\u00d5\u00b5\u00fe\u00de\u00da\u00db\u00d9\u00fd\u00dd\u00af\u00b4\u00ad\u00b1_\u00be\u00b6\u00a7\u00f7\u00b8\u00b0\u00a8\u00b7\u00b9\u00b3\u00b2_ ".split("");
for(b=0;b<a.length;b++){var f=a.charCodeAt(b)&255;c=127<f?c+d[f-128]:c+String.fromCharCode(f)}return c}function Q(a){var b,c="";for(b=0;b<a.length;b++)c+=String.fromCharCode(a[b]);return c}function R(a,b,c,d,f){a.version=b.view.getUint16(c,!0);a.bitFlag=b.view.getUint16(c+2,!0);a.compressionMethod=b.view.getUint16(c+4,!0);a.lastModDateRaw=b.view.getUint32(c+6,!0);a:{var e=a.lastModDateRaw,k=(e&4294901760)>>16;e&=65535;try{var l=new Date(1980+((k&65024)>>9),((k&480)>>5)-1,k&31,(e&63488)>>11,(e&2016)>>
5,2*(e&31),0);break a}catch(n){}l=void 0}a.lastModDate=l;if(1===(a.bitFlag&1))f("File contains encrypted entry.");else{if(d||8!=(a.bitFlag&8))a.crc32=b.view.getUint32(c+10,!0),a.compressedSize=b.view.getUint32(c+14,!0),a.uncompressedSize=b.view.getUint32(c+18,!0);4294967295===a.compressedSize||4294967295===a.uncompressedSize?f("File is using Zip64 (4gb+ file size)."):(a.filenameLength=b.view.getUint16(c+22,!0),a.extraFieldLength=b.view.getUint16(c+24,!0))}}function X(a,b,c){function d(){}function f(b){function d(d,
l){a.readUint8Array(a.size-d,d,function(a){for(var c=a.length-22;0<=c;c--)if(80===a[c]&&75===a[c+1]&&5===a[c+2]&&6===a[c+3]){b(new DataView(a.buffer,c,22));return}l()},function(){c("Error while reading zip file.")})}22>a.size?c("File format is not recognized."):d(22,function(){d(Math.min(65558,a.size),function(){c("File format is not recognized.")})})}var e=0;d.prototype.getData=function(b,d,f,k){function l(a){var b=x(4);b.view.setUint32(0,a);return h.crc32==b.view.getUint32(0)}function m(a,f){k&&
!l(f)?c("CRC failed."):b.getData(function(a){d(a)})}function t(a){c(a||"Error while reading file data.")}function q(a){c(a||"Error while writing file data.")}var h=this;a.readUint8Array(h.offset,30,function(d){d=x(d.length,d);if(1347093252!=d.view.getUint32(0))c("File format is not recognized.");else{R(h,d,4,!1,c);var l=h.offset+30+h.filenameLength+h.extraFieldLength;b.init(function(){if(0===h.compressionMethod)O(h._worker,e++,a,b,l,h.compressedSize,k,m,f,t,q);else{var c=e++,d=h.compressedSize,g=
k?"output":"none";r.zip.useWebWorkers?K(h._worker,{sn:c,codecClass:"Inflater",crcType:g},a,b,l,d,f,m,t,q):M(new r.zip.Inflater,a,b,l,d,g,f,m,t,q)}},q)}},t)};var k={getEntries:function(b){var l=this._worker;f(function(f){var e=f.getUint32(16,!0);var k=f.getUint16(8,!0);0>e||e>=a.size?c("File format is not recognized."):a.readUint8Array(e,a.size-e,function(a){var f=0,e=[],h=x(a.length,a);for(a=0;a<k;a++){var g=new d;g._worker=l;if(1347092738!=h.view.getUint32(f)){c("File format is not recognized.");
return}R(g,h,f+6,!0,c);g.commentLength=h.view.getUint16(f+32,!0);g.directory=16==(h.view.getUint8(f+38)&16);g.offset=h.view.getUint32(f+42,!0);var m=Q(h.array.subarray(f+46,f+46+g.filenameLength));g.filename=2048===(g.bitFlag&2048)?decodeURIComponent(escape(m)):P(m);g.directory||"/"!=g.filename.charAt(g.filename.length-1)||(g.directory=!0);m=Q(h.array.subarray(f+46+g.filenameLength+g.extraFieldLength,f+46+g.filenameLength+g.extraFieldLength+g.commentLength));g.comment=2048===(g.bitFlag&2048)?decodeURIComponent(escape(m)):
P(m);e.push(g);f+=46+g.filenameLength+g.extraFieldLength+g.commentLength}b(e)},function(){c("Error while reading zip file.")})})},close:function(a){this._worker&&(this._worker.terminate(),this._worker=null);a&&a()},_worker:null};r.zip.useWebWorkers?S("inflater",function(a){k._worker=a;b(k)},function(a){c(a)}):b(k)}function T(a){var b,c=[];for(b=0;b<a.length;b++)c.push(a.charCodeAt(b));return c}function Y(a,b,c,d){function f(a){c(a||"Error while writing zip file.")}function e(a){c(a||"Error while reading file data.")}
var k={},l=[],n=0,v=0,p={add:function(b,m,t,q,h){function g(c){A=h.lastModDate||new Date;u=x(26);k[b]={headerArray:u.array,directory:h.directory,filename:z,offset:n,comment:T(unescape(encodeURIComponent(h.comment||"")))};u.view.setUint32(0,335546376);h.version&&u.view.setUint8(0,h.version);d||0===h.level||h.directory||u.view.setUint16(4,2048);u.view.setUint16(6,(A.getHours()<<6|A.getMinutes())<<5|A.getSeconds()/2,!0);u.view.setUint16(8,(A.getFullYear()-1980<<4|A.getMonth()+1)<<5|A.getDate(),!0);u.view.setUint16(22,
z.length,!0);var e=x(30+z.length);e.view.setUint32(0,1347093252);e.array.set(u.array,4);e.array.set(z,30);n+=e.array.length;a.writeUint8Array(e.array,c,f)}function p(b,c){var d=x(16);n+=b||0;d.view.setUint32(0,1347094280);"undefined"!=typeof c&&(u.view.setUint32(10,c,!0),d.view.setUint32(4,c,!0));m&&(d.view.setUint32(8,b,!0),u.view.setUint32(14,b,!0),d.view.setUint32(12,m.size,!0),u.view.setUint32(18,m.size,!0));a.writeUint8Array(d.array,function(){n+=16;t()},f)}function w(){h=h||{};b=b.trim();h.directory&&
"/"!=b.charAt(b.length-1)&&(b+="/");k.hasOwnProperty(b)?c("File already exists."):(z=T(unescape(encodeURIComponent(b))),l.push(b),g(function(){if(m)if(d||0===h.level)O(y,v++,m,a,0,m.size,!0,p,q,e,f);else{var b=v++;r.zip.useWebWorkers?K(y,{sn:b,options:{level:h.level},codecClass:"Deflater",crcType:"input"},m,a,0,m.size,q,p,e,f):M(new r.zip.Deflater,m,a,0,m.size,"input",q,p,e,f)}else p()},f))}var u,z,A,y=this._worker;m?m.init(w,e):w()},close:function(b){this._worker&&(this._worker.terminate(),this._worker=
null);var c=0,d=0,e;for(e=0;e<l.length;e++){var h=k[l[e]];c+=46+h.filename.length+h.comment.length}var g=x(c+22);for(e=0;e<l.length;e++)h=k[l[e]],g.view.setUint32(d,1347092738),g.view.setUint16(d+4,5120),g.array.set(h.headerArray,d+6),g.view.setUint16(d+32,h.comment.length,!0),h.directory&&g.view.setUint8(d+38,16),g.view.setUint32(d+42,h.offset,!0),g.array.set(h.filename,d+46),g.array.set(h.comment,d+46+h.filename.length),d+=46+h.filename.length+h.comment.length;g.view.setUint32(d,1347093766);g.view.setUint16(d+
8,l.length,!0);g.view.setUint16(d+10,l.length,!0);g.view.setUint32(d+12,c,!0);g.view.setUint32(d+16,n,!0);a.writeUint8Array(g.array,function(){a.getData(b)},f)},_worker:null};r.zip.useWebWorkers?S("deflater",function(a){p._worker=a;b(p)},function(a){c(a)}):b(p)}function Z(a){var b=document.createElement("a");return a.map(function(a){b.href=a;return b.href})}function S(a,b,c){function d(a){a=a.data;a.error?(k.terminate(),c(a.error)):"importScripts"===a.type&&(k.removeEventListener("message",d),k.removeEventListener("error",
f),b(k))}function f(a){k.terminate();c(a)}if(null!==r.zip.workerScripts&&null!==r.zip.workerScriptsPath)c(Error("Either zip.workerScripts or zip.workerScriptsPath may be set, not both."));else{if(r.zip.workerScripts){var e=r.zip.workerScripts[a];if(!Array.isArray(e)){c(Error("zip.workerScripts."+a+" is not an array!"));return}e=Z(e)}else e=aa[a].slice(0),e[0]=(r.zip.workerScriptsPath||"")+e[0];var k=new Worker(e[0]);k.codecTime=k.crcTime=0;k.postMessage({type:"importScripts",scripts:e.slice(1)});
k.addEventListener("message",d);k.addEventListener("error",f)}}function U(a){console.error(a)}try{var N=0===(new Blob([new DataView(new ArrayBuffer(0))])).size}catch(a){}C.prototype.append=function(a){for(var b=this.crc|0,c=this.table,d=0,f=a.length|0;d<f;d++)b=b>>>8^c[(b^a[d])&255];this.crc=b};C.prototype.get=function(){return~this.crc};C.prototype.table=function(){var a,b,c=[];for(a=0;256>a;a++){var d=a;for(b=0;8>b;b++)d=d&1?d>>>1^3988292384:d>>>1;c[a]=d}return c}();J.prototype.append=function(a,
b){return a};J.prototype.flush=function(){};E.prototype=new D;E.prototype.constructor=E;F.prototype=new D;F.prototype.constructor=F;y.prototype=new D;y.prototype.constructor=y;B.prototype.getData=function(a){a(this.data)};G.prototype=new B;G.prototype.constructor=G;H.prototype=new B;H.prototype.constructor=H;I.prototype=new B;I.prototype.constructor=I;var aa={deflater:["z-worker.js","deflate.js"],inflater:["z-worker.js","inflate.js"]};r.zip={Reader:D,Writer:B,BlobReader:y,Data64URIReader:F,TextReader:E,
BlobWriter:I,Data64URIWriter:H,TextWriter:G,createReader:function(a,b,c){c=c||U;a.init(function(){X(a,b,c)},c)},createWriter:function(a,b,c,d){c=c||U;d=!!d;a.init(function(){Y(a,b,c,d)},c)},useWebWorkers:!0,workerScriptsPath:null,workerScripts:null}})(this);
/* ArrayBufferReader.js */
(function(c){function a(a){var b=this;this.init=function(f,d){try{b.data=new Uint8Array(a),b.size=b.data.length,f()}catch(e){d(e)}};this.readUint8Array=function(a,d,e,c){e(new Uint8Array(b.data.subarray(a,a+d)))}}a.prototype=new c.Reader;a.prototype.constructor=a;c.ArrayBufferReader=a})(zip);
/* inflate.js */
(function(H){function M(){function h(a,h,q,p,I,D,b,c,e,k,l){var g,f,m,d;var w=0;var C=q;do n[a[h+w]]++,w++,C--;while(0!==C);if(n[0]==q)return b[0]=-1,c[0]=0;var v=c[0];for(f=1;15>=f&&0===n[f];f++);var E=f;v<f&&(v=f);for(C=15;0!==C&&0===n[C];C--);var G=C;v>C&&(v=C);c[0]=v;for(c=1<<f;f<C;f++,c<<=1)if(0>(c-=n[f]))return-3;if(0>(c-=n[C]))return-3;n[C]+=c;x[1]=f=0;w=1;for(m=2;0!==--C;)x[m]=f+=n[w],m++,w++;w=C=0;do 0!==(f=a[h+w])&&(l[x[f]++]=C),w++;while(++C<q);q=x[G];w=x[0]=C=0;h=-1;var t=-v;for(d=m=y[0]=
0;E<=G;E++)for(a=n[E];0!==a--;){for(;E>t+v;){h++;t+=v;d=G-t;d=d>v?v:d;if((g=1<<(f=E-t))>a+1&&(g-=a+1,m=E,f<d))for(;++f<d&&!((g<<=1)<=n[++m]);)g-=n[m];d=1<<f;if(1440<k[0]+d)return-3;y[h]=m=k[0];k[0]+=d;0!==h?(x[h]=C,z[0]=f,z[1]=v,f=C>>>t-v,z[2]=m-y[h-1]-f,e.set(z,3*(y[h-1]+f))):b[0]=m}z[1]=E-t;w>=q?z[0]=192:l[w]<p?(z[0]=256>l[w]?0:96,z[2]=l[w++]):(z[0]=D[l[w]-p]+16+64,z[2]=I[l[w++]-p]);g=1<<E-t;for(f=C>>>t;f<d;f+=g)e.set(z,3*(m+f));for(f=1<<E-1;0!==(C&f);f>>>=1)C^=f;C^=f;for(f=(1<<t)-1;(C&f)!=x[h];)h--,
t-=v,f=(1<<t)-1}return 0!==c&&1!=G?-5:0}function p(h){var v;a||(a=[],q=[],n=new Int32Array(16),z=[],y=new Int32Array(15),x=new Int32Array(16));q.length<h&&(q=[]);for(v=0;v<h;v++)q[v]=0;for(v=0;16>v;v++)n[v]=0;for(v=0;3>v;v++)z[v]=0;y.set(n.subarray(0,15),0);x.set(n.subarray(0,16),0)}var a,q,n,z,y,x;this.inflate_trees_bits=function(n,v,z,x,y){p(19);a[0]=0;n=h(n,0,19,19,null,null,z,v,x,a,q);if(-3==n)y.msg="oversubscribed dynamic bit lengths tree";else if(-5==n||0===v[0])y.msg="incomplete dynamic bit lengths tree",
n=-3;return n};this.inflate_trees_dynamic=function(n,v,z,x,y,D,b,c,e){p(288);a[0]=0;D=h(z,0,n,257,R,S,D,x,c,a,q);if(0!=D||0===x[0])return-3==D?e.msg="oversubscribed literal/length tree":-4!=D&&(e.msg="incomplete literal/length tree",D=-3),D;p(288);D=h(z,n,v,0,T,U,b,y,c,a,q);return 0!=D||0===y[0]&&257<n?(-3==D?e.msg="oversubscribed distance tree":-5==D?(e.msg="incomplete distance tree",D=-3):-4!=D&&(e.msg="empty distance tree with lengths",D=-3),D):0}}function V(){var h,p=0,a,q=0,n=0,z=0,y=0,x=0,E=
0,v=0,G,L=0,I,D=0;this.init=function(b,c,e,k,l,g){h=0;E=b;v=c;G=e;L=k;I=l;D=g;a=null};this.proc=function(b,c,e){var k;var l=c.next_in_index;var g=c.avail_in;var f=b.bitb;var m=b.bitk;var d=b.write;for(k=d<b.read?b.read-d-1:b.end-d;;)switch(h){case 0:if(258<=k&&10<=g){b.bitb=f;b.bitk=m;c.avail_in=g;c.total_in+=l-c.next_in_index;c.next_in_index=l;b.write=d;a:{var w,C=G,Q=L,H=I,M=D,t=b,A=c;k=A.next_in_index;d=A.avail_in;var B=t.bitb;var r=t.bitk;g=t.write;l=g<t.read?t.read-g-1:t.end-g;m=J[E];f=J[v];
do{for(;20>r;)d--,B|=(A.read_byte(k++)&255)<<r,r+=8;var K=B&m;var F=C;var N=Q;var u=3*(N+K);if(0===(w=F[u]))B>>=F[u+1],r-=F[u+1],t.window[g++]=F[u+2],l--;else{do{B>>=F[u+1];r-=F[u+1];if(0!==(w&16)){w&=15;e=F[u+2]+(B&J[w]);B>>=w;for(r-=w;15>r;)d--,B|=(A.read_byte(k++)&255)<<r,r+=8;K=B&f;F=H;N=M;u=3*(N+K);w=F[u];do if(B>>=F[u+1],r-=F[u+1],0!==(w&16)){for(w&=15;r<w;)d--,B|=(A.read_byte(k++)&255)<<r,r+=8;u=F[u+2]+(B&J[w]);B>>=w;r-=w;l-=e;if(g>=u)u=g-u,0<g-u&&2>g-u?(t.window[g++]=t.window[u++],t.window[g++]=
t.window[u++]):(t.window.set(t.window.subarray(u,u+2),g),g+=2,u+=2),e-=2;else{u=g-u;do u+=t.end;while(0>u);w=t.end-u;if(e>w){e-=w;if(0<g-u&&w>g-u){do t.window[g++]=t.window[u++];while(0!==--w)}else t.window.set(t.window.subarray(u,u+w),g),g+=w;u=0}}if(0<g-u&&e>g-u){do t.window[g++]=t.window[u++];while(0!==--e)}else t.window.set(t.window.subarray(u,u+e),g),g+=e;break}else if(0===(w&64))K+=F[u+2],K+=B&J[w],u=3*(N+K),w=F[u];else{A.msg="invalid distance code";e=A.avail_in-d;e=r>>3<e?r>>3:e;d+=e;k-=e;
r-=e<<3;t.bitb=B;t.bitk=r;A.avail_in=d;A.total_in+=k-A.next_in_index;A.next_in_index=k;t.write=g;e=-3;break a}while(1);break}if(0===(w&64)){if(K+=F[u+2],K+=B&J[w],u=3*(N+K),0===(w=F[u])){B>>=F[u+1];r-=F[u+1];t.window[g++]=F[u+2];l--;break}}else{0!==(w&32)?(e=A.avail_in-d,e=r>>3<e?r>>3:e,d+=e,k-=e,r-=e<<3,t.bitb=B,t.bitk=r,A.avail_in=d,A.total_in+=k-A.next_in_index,A.next_in_index=k,t.write=g,e=1):(A.msg="invalid literal/length code",e=A.avail_in-d,e=r>>3<e?r>>3:e,d+=e,k-=e,r-=e<<3,t.bitb=B,t.bitk=
r,A.avail_in=d,A.total_in+=k-A.next_in_index,A.next_in_index=k,t.write=g,e=-3);break a}}while(1)}}while(258<=l&&10<=d);e=A.avail_in-d;e=r>>3<e?r>>3:e;k-=e;t.bitb=B;t.bitk=r-(e<<3);A.avail_in=d+e;A.total_in+=k-A.next_in_index;A.next_in_index=k;t.write=g;e=0}l=c.next_in_index;g=c.avail_in;f=b.bitb;m=b.bitk;d=b.write;k=d<b.read?b.read-d-1:b.end-d;if(0!=e){h=1==e?7:9;break}}n=E;a=G;q=L;h=1;case 1:for(r=n;m<r;){if(0!==g)e=0;else return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=
l,b.write=d,b.inflate_flush(c,e);g--;f|=(c.read_byte(l++)&255)<<m;m+=8}r=3*(q+(f&J[r]));f>>>=a[r+1];m-=a[r+1];B=a[r];if(0===B){z=a[r+2];h=6;break}if(0!==(B&16)){y=B&15;p=a[r+2];h=2;break}if(0===(B&64)){n=B;q=r/3+a[r+2];break}if(0!==(B&32)){h=7;break}h=9;c.msg="invalid literal/length code";e=-3;b.bitb=f;b.bitk=m;c.avail_in=g;c.total_in+=l-c.next_in_index;c.next_in_index=l;b.write=d;return b.inflate_flush(c,e);case 2:for(r=y;m<r;){if(0!==g)e=0;else return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=
l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);g--;f|=(c.read_byte(l++)&255)<<m;m+=8}p+=f&J[r];f>>=r;m-=r;n=v;a=I;q=D;h=3;case 3:for(r=n;m<r;){if(0!==g)e=0;else return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);g--;f|=(c.read_byte(l++)&255)<<m;m+=8}r=3*(q+(f&J[r]));f>>=a[r+1];m-=a[r+1];B=a[r];if(0!==(B&16)){y=B&15;x=a[r+2];h=4;break}if(0===(B&64)){n=B;q=r/3+a[r+2];break}h=9;c.msg="invalid distance code";e=-3;b.bitb=
f;b.bitk=m;c.avail_in=g;c.total_in+=l-c.next_in_index;c.next_in_index=l;b.write=d;return b.inflate_flush(c,e);case 4:for(r=y;m<r;){if(0!==g)e=0;else return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);g--;f|=(c.read_byte(l++)&255)<<m;m+=8}x+=f&J[r];f>>=r;m-=r;h=5;case 5:for(r=d-x;0>r;)r+=b.end;for(;0!==p;){if(0===k&&(d==b.end&&0!==b.read&&(d=0,k=d<b.read?b.read-d-1:b.end-d),0===k&&(b.write=d,e=b.inflate_flush(c,e),d=b.write,k=d<b.read?
b.read-d-1:b.end-d,d==b.end&&0!==b.read&&(d=0,k=d<b.read?b.read-d-1:b.end-d),0===k)))return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);b.window[d++]=b.window[r++];k--;r==b.end&&(r=0);p--}h=0;break;case 6:if(0===k&&(d==b.end&&0!==b.read&&(d=0,k=d<b.read?b.read-d-1:b.end-d),0===k&&(b.write=d,e=b.inflate_flush(c,e),d=b.write,k=d<b.read?b.read-d-1:b.end-d,d==b.end&&0!==b.read&&(d=0,k=d<b.read?b.read-d-1:b.end-d),0===k)))return b.bitb=
f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);e=0;b.window[d++]=z;k--;h=0;break;case 7:7<m&&(m-=8,g++,l--);b.write=d;e=b.inflate_flush(c,e);d=b.write;if(b.read!=b.write)return b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);h=8;case 8:return e=1,b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);case 9:return e=-3,b.bitb=
f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e);default:return e=-2,b.bitb=f,b.bitk=m,c.avail_in=g,c.total_in+=l-c.next_in_index,c.next_in_index=l,b.write=d,b.inflate_flush(c,e)}};this.free=function(){}}function W(h,p){var a=this,q=0,n=0,z=0,y=0,x,E=[0],v=[0],G=new V,L=0,I=new Int32Array(4320),D=new M;a.bitk=0;a.bitb=0;a.window=new Uint8Array(p);a.end=p;a.read=0;a.write=0;a.reset=function(b,c){c&&(c[0]=0);6==q&&G.free(b);q=0;a.bitk=0;a.bitb=0;
a.read=a.write=0};a.reset(h,null);a.inflate_flush=function(b,c){var e=b.next_out_index;var k=a.read;var l=(k<=a.write?a.write:a.end)-k;l>b.avail_out&&(l=b.avail_out);0!==l&&-5==c&&(c=0);b.avail_out-=l;b.total_out+=l;b.next_out.set(a.window.subarray(k,k+l),e);e+=l;k+=l;k==a.end&&(k=0,a.write==a.end&&(a.write=0),l=a.write-k,l>b.avail_out&&(l=b.avail_out),0!==l&&-5==c&&(c=0),b.avail_out-=l,b.total_out+=l,b.next_out.set(a.window.subarray(k,k+l),e),e+=l,k+=l);b.next_out_index=e;a.read=k;return c};a.proc=
function(b,c){var e;var k=b.next_in_index;var l=b.avail_in;var g=a.bitb;var f=a.bitk;var m=a.write;for(e=m<a.read?a.read-m-1:a.end-m;;)switch(q){case 0:for(;3>f;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}var d=g&7;L=d&1;switch(d>>>1){case 0:g>>>=3;f-=3;d=f&7;g>>>=d;f-=d;q=1;break;case 1:d=[];var h=[],p=[[]],H=[[]];M.inflate_trees_fixed(d,h,p,H);G.init(d[0],h[0],p[0],
0,H[0],0);g>>>=3;f-=3;q=6;break;case 2:g>>>=3;f-=3;q=3;break;case 3:return g>>>=3,f-=3,q=9,b.msg="invalid block type",c=-3,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c)}break;case 1:for(;32>f;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}if((~g>>>16&65535)!=(g&65535))return q=9,b.msg="invalid stored block lengths",
c=-3,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);n=g&65535;g=f=0;q=0!==n?2:0!==L?7:0;break;case 2:if(0===l||0===e&&(m==a.end&&0!==a.read&&(m=0,e=m<a.read?a.read-m-1:a.end-m),0===e&&(a.write=m,c=a.inflate_flush(b,c),m=a.write,e=m<a.read?a.read-m-1:a.end-m,m==a.end&&0!==a.read&&(m=0,e=m<a.read?a.read-m-1:a.end-m),0===e)))return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,
c);c=0;d=n;d>l&&(d=l);d>e&&(d=e);a.window.set(b.read_buf(k,d),m);k+=d;l-=d;m+=d;e-=d;if(0!==(n-=d))break;q=0!==L?7:0;break;case 3:for(;14>f;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}z=d=g&16383;if(29<(d&31)||29<(d>>5&31))return q=9,b.msg="too many length or distance symbols",c=-3,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=
m,a.inflate_flush(b,c);d=258+(d&31)+(d>>5&31);if(!x||x.length<d)x=[];else for(e=0;e<d;e++)x[e]=0;g>>>=14;f-=14;y=0;q=4;case 4:for(;y<4+(z>>>10);){for(;3>f;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}x[O[y++]]=g&7;g>>>=3;f-=3}for(;19>y;)x[O[y++]]=0;E[0]=7;d=D.inflate_trees_bits(x,E,v,I,b);if(0!=d)return c=d,-3==c&&(x=null,q=9),a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=
k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);y=0;q=5;case 5:for(;;){d=z;if(y>=258+(d&31)+(d>>5&31))break;for(d=E[0];f<d;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}d=I[3*(v[0]+(g&J[d]))+1];p=I[3*(v[0]+(g&J[d]))+2];if(16>p)g>>>=d,f-=d,x[y++]=p;else{e=18==p?7:p-14;for(h=18==p?11:3;f<d+e;){if(0!==l)c=0;else return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=
k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);l--;g|=(b.read_byte(k++)&255)<<f;f+=8}g>>>=d;f-=d;h+=g&J[e];g>>>=e;f-=e;e=y;d=z;if(e+h>258+(d&31)+(d>>5&31)||16==p&&1>e)return x=null,q=9,b.msg="invalid bit length repeat",c=-3,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);p=16==p?x[e-1]:0;do x[e++]=p;while(0!==--h);y=e}}v[0]=-1;e=[];h=[];p=[];H=[];e[0]=9;h[0]=6;d=z;d=D.inflate_trees_dynamic(257+(d&31),1+(d>>5&31),x,e,
h,p,H,I,b);if(0!=d)return-3==d&&(x=null,q=9),c=d,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);G.init(e[0],h[0],I,p[0],I,H[0]);q=6;case 6:a.bitb=g;a.bitk=f;b.avail_in=l;b.total_in+=k-b.next_in_index;b.next_in_index=k;a.write=m;if(1!=(c=G.proc(a,b,c)))return a.inflate_flush(b,c);c=0;G.free(b);k=b.next_in_index;l=b.avail_in;g=a.bitb;f=a.bitk;m=a.write;e=m<a.read?a.read-m-1:a.end-m;if(0===L){q=0;break}q=7;case 7:a.write=m;c=a.inflate_flush(b,
c);m=a.write;if(a.read!=a.write)return a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);q=8;case 8:return c=1,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);case 9:return c=-3,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=k,a.write=m,a.inflate_flush(b,c);default:return c=-2,a.bitb=g,a.bitk=f,b.avail_in=l,b.total_in+=k-b.next_in_index,b.next_in_index=
k,a.write=m,a.inflate_flush(b,c)}};a.free=function(b){a.reset(b,null);I=a.window=null};a.set_dictionary=function(b,c,e){a.window.set(b.subarray(c,c+e),0);a.read=a.write=e};a.sync_point=function(){return 1==q?1:0}}function X(){function h(a){if(!a||!a.istate)return-2;a.total_in=a.total_out=0;a.msg=null;a.istate.mode=7;a.istate.blocks.reset(a,null);return 0}var p=this;p.mode=0;p.method=0;p.was=[0];p.need=0;p.marker=0;p.wbits=0;p.inflateEnd=function(a){p.blocks&&p.blocks.free(a);p.blocks=null;return 0};
p.inflateInit=function(a,q){a.msg=null;p.blocks=null;if(8>q||15<q)return p.inflateEnd(a),-2;p.wbits=q;a.istate.blocks=new W(a,1<<q);h(a);return 0};p.inflate=function(a,h){var n;if(!a||!a.istate||!a.next_in)return-2;h=4==h?-5:0;for(n=-5;;)switch(a.istate.mode){case 0:if(0===a.avail_in)return n;n=h;a.avail_in--;a.total_in++;if(8!=((a.istate.method=a.read_byte(a.next_in_index++))&15)){a.istate.mode=13;a.msg="unknown compression method";a.istate.marker=5;break}if((a.istate.method>>4)+8>a.istate.wbits){a.istate.mode=
13;a.msg="invalid window size";a.istate.marker=5;break}a.istate.mode=1;case 1:if(0===a.avail_in)return n;n=h;a.avail_in--;a.total_in++;var q=a.read_byte(a.next_in_index++)&255;if(0!==((a.istate.method<<8)+q)%31){a.istate.mode=13;a.msg="incorrect header check";a.istate.marker=5;break}if(0===(q&32)){a.istate.mode=7;break}a.istate.mode=2;case 2:if(0===a.avail_in)return n;n=h;a.avail_in--;a.total_in++;a.istate.need=(a.read_byte(a.next_in_index++)&255)<<24&4278190080;a.istate.mode=3;case 3:if(0===a.avail_in)return n;
n=h;a.avail_in--;a.total_in++;a.istate.need+=(a.read_byte(a.next_in_index++)&255)<<16&16711680;a.istate.mode=4;case 4:if(0===a.avail_in)return n;n=h;a.avail_in--;a.total_in++;a.istate.need+=(a.read_byte(a.next_in_index++)&255)<<8&65280;a.istate.mode=5;case 5:if(0===a.avail_in)return n;a.avail_in--;a.total_in++;a.istate.need+=a.read_byte(a.next_in_index++)&255;a.istate.mode=6;return 2;case 6:return a.istate.mode=13,a.msg="need dictionary",a.istate.marker=0,-2;case 7:n=a.istate.blocks.proc(a,n);if(-3==
n){a.istate.mode=13;a.istate.marker=0;break}0==n&&(n=h);if(1!=n)return n;a.istate.blocks.reset(a,a.istate.was);a.istate.mode=12;case 12:return 1;case 13:return-3;default:return-2}};p.inflateSetDictionary=function(a,h,n){var q=0,p=n;if(!a||!a.istate||6!=a.istate.mode)return-2;p>=1<<a.istate.wbits&&(p=(1<<a.istate.wbits)-1,q=n-p);a.istate.blocks.set_dictionary(h,q,p);a.istate.mode=7;return 0};p.inflateSync=function(a){var q,n;if(!a||!a.istate)return-2;13!=a.istate.mode&&(a.istate.mode=13,a.istate.marker=
0);if(0===(q=a.avail_in))return-5;var p=a.next_in_index;for(n=a.istate.marker;0!==q&&4>n;)a.read_byte(p)==Y[n]?n++:n=0!==a.read_byte(p)?0:4-n,p++,q--;a.total_in+=p-a.next_in_index;a.next_in_index=p;a.avail_in=q;a.istate.marker=n;if(4!=n)return-3;q=a.total_in;p=a.total_out;h(a);a.total_in=q;a.total_out=p;a.istate.mode=7;return 0};p.inflateSyncPoint=function(a){return a&&a.istate&&a.istate.blocks?a.istate.blocks.sync_point():-2}}function P(){}var J=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,
16383,32767,65535],Z=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,
248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,
0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,
7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,
48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,
0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,
163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,
8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],aa=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,
86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],R=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],S=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],T=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],U=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,
11,12,12,13,13];M.inflate_trees_fixed=function(h,p,a,q){h[0]=9;p[0]=5;a[0]=Z;q[0]=aa;return 0};var O=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Y=[0,0,255,255];P.prototype={inflateInit:function(h){this.istate=new X;h||(h=15);return this.istate.inflateInit(this,h)},inflate:function(h){return this.istate?this.istate.inflate(this,h):-2},inflateEnd:function(){if(!this.istate)return-2;var h=this.istate.inflateEnd(this);this.istate=null;return h},inflateSync:function(){return this.istate?this.istate.inflateSync(this):
-2},inflateSetDictionary:function(h,p){return this.istate?this.istate.inflateSetDictionary(this,h,p):-2},read_byte:function(h){return this.next_in.subarray(h,h+1)[0]},read_buf:function(h,p){return this.next_in.subarray(h,h+p)}};H=H.zip||H;H.Inflater=H._jzlib_Inflater=function(){var h=new P,p=new Uint8Array(512),a=!1;h.inflateInit();h.next_out=p;this.append=function(q,n){var z=[],y=0,x=0,E=0;if(0!==q.length){h.next_in_index=0;h.next_in=q;h.avail_in=q.length;do{h.next_out_index=0;h.avail_out=512;0!==
h.avail_in||a||(h.next_in_index=0,a=!0);var v=h.inflate(0);if(a&&-5===v){if(0!==h.avail_in)throw Error("inflating: bad input");}else if(0!==v&&1!==v)throw Error("inflating: "+h.msg);if((a||1===v)&&h.avail_in===q.length)throw Error("inflating: bad input");h.next_out_index&&(512===h.next_out_index?z.push(new Uint8Array(p)):z.push(new Uint8Array(p.subarray(0,h.next_out_index))));E+=h.next_out_index;n&&0<h.next_in_index&&h.next_in_index!=y&&(n(h.next_in_index),y=h.next_in_index)}while(0<h.avail_in||0===
h.avail_out);var G=new Uint8Array(E);z.forEach(function(a){G.set(a,x);x+=a.length});return G}};this.flush=function(){h.inflateEnd()}}})(this);

/* sw-packer
 Copyright (c) 2019 Curso Católico. All rights reserved.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
var contentTypesByExtension = {
   'css': 'text/css; charset=utf-8',
   'js': 'application/javascript; charset=utf-8',
   'json': 'application/json; charset=utf-8',
   'html': 'text/html; charset=utf-8',
   'htm': 'text/html; charset=utf-8',
   'txt': 'text/plain; charset=utf-8',
   'xml': 'text/xml; charset=utf-8',
   'ttf': 'font/ttf',
   'woff': 'font/woff',
   'woff2': 'font/woff2',
   'png': 'image/png',
   'jpg': 'image/jpeg',
   'jpeg': 'image/jpeg',
   'ico': 'image/x-icon',
   'svg': 'image/svg+xml',
   'webp': 'image/webp',
   'zip': 'application/zip'
};
zip.useWebWorkers = false;
String.prototype.replaceAll = function(s, r) {
   return this.split(s).join(r);
};

function getZipReader(data) {
   return new Promise(function(fulfill, reject) {
      zip.createReader(new zip.ArrayBufferReader(data), fulfill, reject);
   });
}

function cacheContents(reader) {
   return new Promise(function(fulfill, reject) {
      reader.getEntries(function(entries) {
         Promise.all(entries.map(cacheEntry)).then(fulfill, reject);
      });
   });
}

function storeMyNewElement(cache, myblob, filename) {
   var myheaders = JSON.parse(JSON.stringify(server_headers));
   myheaders['Content-Type'] = getContentType(filename);
   myheaders['Server'] = 'ServiceWorker';
   var response = new Response(myblob, {
      status: '200',
      headers: myheaders
   });
   return cache.put(new Request(getLocation(filename)), response);
}

function cacheEntry(entry) {
   if(entry.directory) {
      return Promise.resolve();
   }
   return new Promise(function(fulfill, reject) {
      entry.getData(new zip.BlobWriter(), function(data) {
         return caches.open(CACHE_VERSION).then(function(cache) {
            var myfilename = entry.filename;
            if(myfilename.indexOf('.html') > -1) {
               return new Response(data).text().then(function(d) {
                  for(var key in tags_to_replace) {
                     d = d.replaceAll(key, tags_to_replace[key]);
                  }
                  try {
                     return storeMyNewElement(cache, new Blob([d]), myfilename);
                  } catch (e) {
                     return Promise.resolve();
                  }
               });
            } else {
               return storeMyNewElement(cache, data, myfilename);
            }
         }).then(fulfill, reject);
      });
   });
}

function getLocation(filename) {
   var fnmod = filename;
   for(var i = 0; i < filter_location_of_zip.length; i++) {
      fnmod = fnmod.replace(filter_location_of_zip[i], '');
   }
   fnmod = fnmod.replace('index.html', '');
   return location.origin + "/" + fnmod;
}

function getContentType(filename) {
   var tokens = filename.split('.');
   var extension = tokens[tokens.length - 1];
   return contentTypesByExtension[extension] || 'text/plain; charset=utf-8';
}

function cleanOldCache(data) {
   return caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
         if(key !== CACHE_VERSION) {
            return caches.delete(key);
         }
      }));
   });
}

function gdf_part_get_from_network(request, cache) {
   return fetch(request).then(function(response) {
      if(response) {
         if(response.status == 0 || (response.status >= 300 && response.status < 400)) {
            return response;
         } else if(response.status >= 200 && response.status < 300) {
            if(request.method == 'GET') cache.put(request, response.clone());
            return response;
         } else return cache.match('/');
      }
   }).catch(function(error) {
      return cache.match('/');
   });
};

function gdf_cache_network_offline(event) {
   var rurl = event.request.url.toLowerCase(),
      request = event.request;
   if(service_worker_routes(rurl)) {
      event.respondWith(caches.open(CACHE_VERSION).then(function(cache) {
         return cache.match(request).then(function(cacheResponse) {
            try {
               return cacheResponse.clone().text().then(function(responsetext) {
                  if(responsetext == "") {
                     return gdf_part_get_from_network(request, cache);
                  } else {
                     return cacheResponse;
                  }
               }) || gdf_part_get_from_network(request, cache);
            } catch (err) {
               return gdf_part_get_from_network(request, cache);
            }
         });
      }));
   }
};
self.addEventListener('install', function(event) {
   var iruniq = individual_requests.filter(function(x, i, a) {
      return a.indexOf(x) == i;
   });
   event.waitUntil(fetch(zip_with_the_website).then(function(r) {
      return r.arrayBuffer();
   }).then(getZipReader).then(cacheContents).then(cleanOldCache).then(function(r) {
      return caches.open(CACHE_VERSION).then(function(cache) {
         return cache.addAll(iruniq);
      }).then(function(r) {
         return self.skipWaiting();
      });
   }));
});
self.addEventListener('activate', function(event) {
   event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', gdf_cache_network_offline);

