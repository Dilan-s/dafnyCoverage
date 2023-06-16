/* Chartist.js 0.11.4
 * Copyright © 2019 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */

!function (a, b) { "function" == typeof define && define.amd ? define("Chartist", [], function () { return a.Chartist = b() }) : "object" == typeof module && module.exports ? module.exports = b() : a.Chartist = b() }(this, function () {
    var a = { version: "0.11.4" }; return function (a, b) { "use strict"; var c = a.window, d = a.document; b.namespaces = { svg: "http://www.w3.org/2000/svg", xmlns: "http://www.w3.org/2000/xmlns/", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", ct: "http://gionkunz.github.com/chartist-js/ct" }, b.noop = function (a) { return a }, b.alphaNumerate = function (a) { return String.fromCharCode(97 + a % 26) }, b.extend = function (a) { var c, d, e; for (a = a || {}, c = 1; c < arguments.length; c++) { d = arguments[c]; for (var f in d) e = d[f], "object" != typeof e || null === e || e instanceof Array ? a[f] = e : a[f] = b.extend(a[f], e) } return a }, b.replaceAll = function (a, b, c) { return a.replace(new RegExp(b, "g"), c) }, b.ensureUnit = function (a, b) { return "number" == typeof a && (a += b), a }, b.quantity = function (a) { if ("string" == typeof a) { var b = /^(\d+)\s*(.*)$/g.exec(a); return { value: +b[1], unit: b[2] || void 0 } } return { value: a } }, b.querySelector = function (a) { return a instanceof Node ? a : d.querySelector(a) }, b.times = function (a) { return Array.apply(null, new Array(a)) }, b.sum = function (a, b) { return a + (b ? b : 0) }, b.mapMultiply = function (a) { return function (b) { return b * a } }, b.mapAdd = function (a) { return function (b) { return b + a } }, b.serialMap = function (a, c) { var d = [], e = Math.max.apply(null, a.map(function (a) { return a.length })); return b.times(e).forEach(function (b, e) { var f = a.map(function (a) { return a[e] }); d[e] = c.apply(null, f) }), d }, b.roundWithPrecision = function (a, c) { var d = Math.pow(10, c || b.precision); return Math.round(a * d) / d }, b.precision = 8, b.escapingMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }, b.serialize = function (a) { return null === a || void 0 === a ? a : ("number" == typeof a ? a = "" + a : "object" == typeof a && (a = JSON.stringify({ data: a })), Object.keys(b.escapingMap).reduce(function (a, c) { return b.replaceAll(a, c, b.escapingMap[c]) }, a)) }, b.deserialize = function (a) { if ("string" != typeof a) return a; a = Object.keys(b.escapingMap).reduce(function (a, c) { return b.replaceAll(a, b.escapingMap[c], c) }, a); try { a = JSON.parse(a), a = void 0 !== a.data ? a.data : a } catch (c) { } return a }, b.createSvg = function (a, c, d, e) { var f; return c = c || "100%", d = d || "100%", Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function (a) { return a.getAttributeNS(b.namespaces.xmlns, "ct") }).forEach(function (b) { a.removeChild(b) }), f = new b.Svg("svg").attr({ width: c, height: d }).addClass(e), f._node.style.width = c, f._node.style.height = d, a.appendChild(f._node), f }, b.normalizeData = function (a, c, d) { var e, f = { raw: a, normalized: {} }; return f.normalized.series = b.getDataArray({ series: a.series || [] }, c, d), e = f.normalized.series.every(function (a) { return a instanceof Array }) ? Math.max.apply(null, f.normalized.series.map(function (a) { return a.length })) : f.normalized.series.length, f.normalized.labels = (a.labels || []).slice(), Array.prototype.push.apply(f.normalized.labels, b.times(Math.max(0, e - f.normalized.labels.length)).map(function () { return "" })), c && b.reverseData(f.normalized), f }, b.safeHasProperty = function (a, b) { return null !== a && "object" == typeof a && a.hasOwnProperty(b) }, b.isDataHoleValue = function (a) { return null === a || void 0 === a || "number" == typeof a && isNaN(a) }, b.reverseData = function (a) { a.labels.reverse(), a.series.reverse(); for (var b = 0; b < a.series.length; b++)"object" == typeof a.series[b] && void 0 !== a.series[b].data ? a.series[b].data.reverse() : a.series[b] instanceof Array && a.series[b].reverse() }, b.getDataArray = function (a, c, d) { function e(a) { if (b.safeHasProperty(a, "value")) return e(a.value); if (b.safeHasProperty(a, "data")) return e(a.data); if (a instanceof Array) return a.map(e); if (!b.isDataHoleValue(a)) { if (d) { var c = {}; return "string" == typeof d ? c[d] = b.getNumberOrUndefined(a) : c.y = b.getNumberOrUndefined(a), c.x = a.hasOwnProperty("x") ? b.getNumberOrUndefined(a.x) : c.x, c.y = a.hasOwnProperty("y") ? b.getNumberOrUndefined(a.y) : c.y, c } return b.getNumberOrUndefined(a) } } return a.series.map(e) }, b.normalizePadding = function (a, b) { return b = b || 0, "number" == typeof a ? { top: a, right: a, bottom: a, left: a } : { top: "number" == typeof a.top ? a.top : b, right: "number" == typeof a.right ? a.right : b, bottom: "number" == typeof a.bottom ? a.bottom : b, left: "number" == typeof a.left ? a.left : b } }, b.getMetaData = function (a, b) { var c = a.data ? a.data[b] : a[b]; return c ? c.meta : void 0 }, b.orderOfMagnitude = function (a) { return Math.floor(Math.log(Math.abs(a)) / Math.LN10) }, b.projectLength = function (a, b, c) { return b / c.range * a }, b.getAvailableHeight = function (a, c) { return Math.max((b.quantity(c.height).value || a.height()) - (c.chartPadding.top + c.chartPadding.bottom) - c.axisX.offset, 0) }, b.getHighLow = function (a, c, d) { function e(a) { if (void 0 !== a) if (a instanceof Array) for (var b = 0; b < a.length; b++)e(a[b]); else { var c = d ? +a[d] : +a; g && c > f.high && (f.high = c), h && c < f.low && (f.low = c) } } c = b.extend({}, c, d ? c["axis" + d.toUpperCase()] : {}); var f = { high: void 0 === c.high ? -Number.MAX_VALUE : +c.high, low: void 0 === c.low ? Number.MAX_VALUE : +c.low }, g = void 0 === c.high, h = void 0 === c.low; return (g || h) && e(a), (c.referenceValue || 0 === c.referenceValue) && (f.high = Math.max(c.referenceValue, f.high), f.low = Math.min(c.referenceValue, f.low)), f.high <= f.low && (0 === f.low ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high > 0 ? f.low = 0 : (f.high = 1, f.low = 0)), f }, b.isNumeric = function (a) { return null !== a && isFinite(a) }, b.isFalseyButZero = function (a) { return !a && 0 !== a }, b.getNumberOrUndefined = function (a) { return b.isNumeric(a) ? +a : void 0 }, b.isMultiValue = function (a) { return "object" == typeof a && ("x" in a || "y" in a) }, b.getMultiValue = function (a, c) { return b.isMultiValue(a) ? b.getNumberOrUndefined(a[c || "y"]) : b.getNumberOrUndefined(a) }, b.rho = function (a) { function b(a, c) { return a % c === 0 ? c : b(c, a % c) } function c(a) { return a * a + 1 } if (1 === a) return a; var d, e = 2, f = 2; if (a % 2 === 0) return 2; do e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e - f), a); while (1 === d); return d }, b.getBounds = function (a, c, d, e) { function f(a, b) { return a === (a += b) && (a *= 1 + (b > 0 ? o : -o)), a } var g, h, i, j = 0, k = { high: c.high, low: c.low }; k.valueRange = k.high - k.low, k.oom = b.orderOfMagnitude(k.valueRange), k.step = Math.pow(10, k.oom), k.min = Math.floor(k.low / k.step) * k.step, k.max = Math.ceil(k.high / k.step) * k.step, k.range = k.max - k.min, k.numberOfSteps = Math.round(k.range / k.step); var l = b.projectLength(a, k.step, k), m = l < d, n = e ? b.rho(k.range) : 0; if (e && b.projectLength(a, 1, k) >= d) k.step = 1; else if (e && n < k.step && b.projectLength(a, n, k) >= d) k.step = n; else for (; ;) { if (m && b.projectLength(a, k.step, k) <= d) k.step *= 2; else { if (m || !(b.projectLength(a, k.step / 2, k) >= d)) break; if (k.step /= 2, e && k.step % 1 !== 0) { k.step *= 2; break } } if (j++ > 1e3) throw new Error("Exceeded maximum number of iterations while optimizing scale step!") } var o = 2.221e-16; for (k.step = Math.max(k.step, o), h = k.min, i = k.max; h + k.step <= k.low;)h = f(h, k.step); for (; i - k.step >= k.high;)i = f(i, -k.step); k.min = h, k.max = i, k.range = k.max - k.min; var p = []; for (g = k.min; g <= k.max; g = f(g, k.step)) { var q = b.roundWithPrecision(g); q !== p[p.length - 1] && p.push(q) } return k.values = p, k }, b.polarToCartesian = function (a, b, c, d) { var e = (d - 90) * Math.PI / 180; return { x: a + c * Math.cos(e), y: b + c * Math.sin(e) } }, b.createChartRect = function (a, c, d) { var e = !(!c.axisX && !c.axisY), f = e ? c.axisY.offset : 0, g = e ? c.axisX.offset : 0, h = a.width() || b.quantity(c.width).value || 0, i = a.height() || b.quantity(c.height).value || 0, j = b.normalizePadding(c.chartPadding, d); h = Math.max(h, f + j.left + j.right), i = Math.max(i, g + j.top + j.bottom); var k = { padding: j, width: function () { return this.x2 - this.x1 }, height: function () { return this.y1 - this.y2 } }; return e ? ("start" === c.axisX.position ? (k.y2 = j.top + g, k.y1 = Math.max(i - j.bottom, k.y2 + 1)) : (k.y2 = j.top, k.y1 = Math.max(i - j.bottom - g, k.y2 + 1)), "start" === c.axisY.position ? (k.x1 = j.left + f, k.x2 = Math.max(h - j.right, k.x1 + 1)) : (k.x1 = j.left, k.x2 = Math.max(h - j.right - f, k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math.max(h - j.right, k.x1 + 1), k.y2 = j.top, k.y1 = Math.max(i - j.bottom, k.y2 + 1)), k }, b.createGrid = function (a, c, d, e, f, g, h, i) { var j = {}; j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d.counterUnits.pos + "1"] = e, j[d.counterUnits.pos + "2"] = e + f; var k = g.elem("line", j, h.join(" ")); i.emit("draw", b.extend({ type: "grid", axis: d, index: c, group: g, element: k }, j)) }, b.createGridBackground = function (a, b, c, d) { var e = a.elem("rect", { x: b.x1, y: b.y2, width: b.width(), height: b.height() }, c, !0); d.emit("draw", { type: "gridBackground", group: a, element: e }) }, b.createLabel = function (a, c, e, f, g, h, i, j, k, l, m) { var n, o = {}; if (o[g.units.pos] = a + i[g.units.pos], o[g.counterUnits.pos] = i[g.counterUnits.pos], o[g.units.len] = c, o[g.counterUnits.len] = Math.max(0, h - 10), l) { var p = d.createElement("span"); p.className = k.join(" "), p.setAttribute("xmlns", b.namespaces.xhtml), p.innerText = f[e], p.style[g.units.len] = Math.round(o[g.units.len]) + "px", p.style[g.counterUnits.len] = Math.round(o[g.counterUnits.len]) + "px", n = j.foreignObject(p, b.extend({ style: "overflow: visible;" }, o)) } else n = j.elem("text", o, k.join(" ")).text(f[e]); m.emit("draw", b.extend({ type: "label", axis: g, index: e, group: j, element: n, text: f[e] }, o)) }, b.getSeriesOption = function (a, b, c) { if (a.name && b.series && b.series[a.name]) { var d = b.series[a.name]; return d.hasOwnProperty(c) ? d[c] : b[c] } return b[c] }, b.optionsProvider = function (a, d, e) { function f(a) { var f = h; if (h = b.extend({}, j), d) for (i = 0; i < d.length; i++) { var g = c.matchMedia(d[i][0]); g.matches && (h = b.extend(h, d[i][1])) } e && a && e.emit("optionsChanged", { previousOptions: f, currentOptions: h }) } function g() { k.forEach(function (a) { a.removeListener(f) }) } var h, i, j = b.extend({}, a), k = []; if (!c.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill."; if (d) for (i = 0; i < d.length; i++) { var l = c.matchMedia(d[i][0]); l.addListener(f), k.push(l) } return f(), { removeMediaQueryListeners: g, getCurrentOptions: function () { return b.extend({}, h) } } }, b.splitIntoSegments = function (a, c, d) { var e = { increasingX: !1, fillHoles: !1 }; d = b.extend({}, e, d); for (var f = [], g = !0, h = 0; h < a.length; h += 2)void 0 === b.getMultiValue(c[h / 2].value) ? d.fillHoles || (g = !0) : (d.increasingX && h >= 2 && a[h] <= a[h - 2] && (g = !0), g && (f.push({ pathCoordinates: [], valueData: [] }), g = !1), f[f.length - 1].pathCoordinates.push(a[h], a[h + 1]), f[f.length - 1].valueData.push(c[h / 2])); return f } }(this || global, a), function (a, b) { "use strict"; b.Interpolation = {}, b.Interpolation.none = function (a) { var c = { fillHoles: !1 }; return a = b.extend({}, c, a), function (c, d) { for (var e = new b.Svg.Path, f = !0, g = 0; g < c.length; g += 2) { var h = c[g], i = c[g + 1], j = d[g / 2]; void 0 !== b.getMultiValue(j.value) ? (f ? e.move(h, i, !1, j) : e.line(h, i, !1, j), f = !1) : a.fillHoles || (f = !0) } return e } }, b.Interpolation.simple = function (a) { var c = { divisor: 2, fillHoles: !1 }; a = b.extend({}, c, a); var d = 1 / Math.max(1, a.divisor); return function (c, e) { for (var f, g, h, i = new b.Svg.Path, j = 0; j < c.length; j += 2) { var k = c[j], l = c[j + 1], m = (k - f) * d, n = e[j / 2]; void 0 !== n.value ? (void 0 === h ? i.move(k, l, !1, n) : i.curve(f + m, g, k - m, l, k, l, !1, n), f = k, g = l, h = n) : a.fillHoles || (f = k = h = void 0) } return i } }, b.Interpolation.cardinal = function (a) { var c = { tension: 1, fillHoles: !1 }; a = b.extend({}, c, a); var d = Math.min(1, Math.max(0, a.tension)), e = 1 - d; return function f(c, g) { var h = b.splitIntoSegments(c, g, { fillHoles: a.fillHoles }); if (h.length) { if (h.length > 1) { var i = []; return h.forEach(function (a) { i.push(f(a.pathCoordinates, a.valueData)) }), b.Svg.Path.join(i) } if (c = h[0].pathCoordinates, g = h[0].valueData, c.length <= 4) return b.Interpolation.none()(c, g); for (var j, k = (new b.Svg.Path).move(c[0], c[1], !1, g[0]), l = 0, m = c.length; m - 2 * !j > l; l += 2) { var n = [{ x: +c[l - 2], y: +c[l - 1] }, { x: +c[l], y: +c[l + 1] }, { x: +c[l + 2], y: +c[l + 3] }, { x: +c[l + 4], y: +c[l + 5] }]; j ? l ? m - 4 === l ? n[3] = { x: +c[0], y: +c[1] } : m - 2 === l && (n[2] = { x: +c[0], y: +c[1] }, n[3] = { x: +c[2], y: +c[3] }) : n[0] = { x: +c[m - 2], y: +c[m - 1] } : m - 4 === l ? n[3] = n[2] : l || (n[0] = { x: +c[l], y: +c[l + 1] }), k.curve(d * (-n[0].x + 6 * n[1].x + n[2].x) / 6 + e * n[2].x, d * (-n[0].y + 6 * n[1].y + n[2].y) / 6 + e * n[2].y, d * (n[1].x + 6 * n[2].x - n[3].x) / 6 + e * n[2].x, d * (n[1].y + 6 * n[2].y - n[3].y) / 6 + e * n[2].y, n[2].x, n[2].y, !1, g[(l + 2) / 2]) } return k } return b.Interpolation.none()([]) } }, b.Interpolation.monotoneCubic = function (a) { var c = { fillHoles: !1 }; return a = b.extend({}, c, a), function d(c, e) { var f = b.splitIntoSegments(c, e, { fillHoles: a.fillHoles, increasingX: !0 }); if (f.length) { if (f.length > 1) { var g = []; return f.forEach(function (a) { g.push(d(a.pathCoordinates, a.valueData)) }), b.Svg.Path.join(g) } if (c = f[0].pathCoordinates, e = f[0].valueData, c.length <= 4) return b.Interpolation.none()(c, e); var h, i, j = [], k = [], l = c.length / 2, m = [], n = [], o = [], p = []; for (h = 0; h < l; h++)j[h] = c[2 * h], k[h] = c[2 * h + 1]; for (h = 0; h < l - 1; h++)o[h] = k[h + 1] - k[h], p[h] = j[h + 1] - j[h], n[h] = o[h] / p[h]; for (m[0] = n[0], m[l - 1] = n[l - 2], h = 1; h < l - 1; h++)0 === n[h] || 0 === n[h - 1] || n[h - 1] > 0 != n[h] > 0 ? m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[h]) / ((2 * p[h] + p[h - 1]) / n[h - 1] + (p[h] + 2 * p[h - 1]) / n[h]), isFinite(m[h]) || (m[h] = 0)); for (i = (new b.Svg.Path).move(j[0], k[0], !1, e[0]), h = 0; h < l - 1; h++)i.curve(j[h] + p[h] / 3, k[h] + m[h] * p[h] / 3, j[h + 1] - p[h] / 3, k[h + 1] - m[h + 1] * p[h] / 3, j[h + 1], k[h + 1], !1, e[h + 1]); return i } return b.Interpolation.none()([]) } }, b.Interpolation.step = function (a) { var c = { postpone: !0, fillHoles: !1 }; return a = b.extend({}, c, a), function (c, d) { for (var e, f, g, h = new b.Svg.Path, i = 0; i < c.length; i += 2) { var j = c[i], k = c[i + 1], l = d[i / 2]; void 0 !== l.value ? (void 0 === g ? h.move(j, k, !1, l) : (a.postpone ? h.line(j, f, !1, g) : h.line(e, k, !1, l), h.line(j, k, !1, l)), e = j, f = k, g = l) : a.fillHoles || (e = f = g = void 0) } return h } } }(this || global, a), function (a, b) { "use strict"; b.EventEmitter = function () { function a(a, b) { d[a] = d[a] || [], d[a].push(b) } function b(a, b) { d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 === d[a].length && delete d[a]) : delete d[a]) } function c(a, b) { d[a] && d[a].forEach(function (a) { a(b) }), d["*"] && d["*"].forEach(function (c) { c(a, b) }) } var d = []; return { addEventHandler: a, removeEventHandler: b, emit: c } } }(this || global, a), function (a, b) { "use strict"; function c(a) { var b = []; if (a.length) for (var c = 0; c < a.length; c++)b.push(a[c]); return b } function d(a, c) { var d = c || this.prototype || b.Class, e = Object.create(d); b.Class.cloneDefinitions(e, a); var f = function () { var a, c = e.constructor || function () { }; return a = this === b ? Object.create(e) : this, c.apply(a, Array.prototype.slice.call(arguments, 0)), a }; return f.prototype = e, f["super"] = d, f.extend = this.extend, f } function e() { var a = c(arguments), b = a[0]; return a.splice(1, a.length - 1).forEach(function (a) { Object.getOwnPropertyNames(a).forEach(function (c) { delete b[c], Object.defineProperty(b, c, Object.getOwnPropertyDescriptor(a, c)) }) }), b } b.Class = { extend: d, cloneDefinitions: e } }(this || global, a), function (a, b) { "use strict"; function c(a, c, d) { return a && (this.data = a || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.eventEmitter.emit("data", { type: "update", data: this.data })), c && (this.options = b.extend({}, d ? this.options : this.defaultOptions, c), this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = b.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), this } function d() { return this.initializeTimeoutId ? i.clearTimeout(this.initializeTimeoutId) : (i.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners()), this } function e(a, b) { return this.eventEmitter.addEventHandler(a, b), this } function f(a, b) { return this.eventEmitter.removeEventHandler(a, b), this } function g() { i.addEventListener("resize", this.resizeListener), this.optionsProvider = b.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.eventEmitter.addEventHandler("optionsChanged", function () { this.update() }.bind(this)), this.options.plugins && this.options.plugins.forEach(function (a) { a instanceof Array ? a[0](this, a[1]) : a(this) }.bind(this)), this.eventEmitter.emit("data", { type: "initial", data: this.data }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0 } function h(a, c, d, e, f) { this.container = b.querySelector(a), this.data = c || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.defaultOptions = d, this.options = e, this.responsiveOptions = f, this.eventEmitter = b.EventEmitter(), this.supportsForeignObject = b.Svg.isSupported("Extensibility"), this.supportsAnimations = b.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function () { this.update() }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(g.bind(this), 0) } var i = a.window; b.Base = b.Class.extend({ constructor: h, optionsProvider: void 0, container: void 0, svg: void 0, eventEmitter: void 0, createChart: function () { throw new Error("Base chart type can't be instantiated!") }, update: c, detach: d, on: e, off: f, version: b.version, supportsForeignObject: !1 }) }(this || global, a), function (a, b) { "use strict"; function c(a, c, d, e, f) { a instanceof Element ? this._node = a : (this._node = y.createElementNS(b.namespaces.svg, a), "svg" === a && this.attr({ "xmlns:ct": b.namespaces.ct })), c && this.attr(c), d && this.addClass(d), e && (f && e._node.firstChild ? e._node.insertBefore(this._node, e._node.firstChild) : e._node.appendChild(this._node)) } function d(a, c) { return "string" == typeof a ? c ? this._node.getAttributeNS(c, a) : this._node.getAttribute(a) : (Object.keys(a).forEach(function (c) { if (void 0 !== a[c]) if (c.indexOf(":") !== -1) { var d = c.split(":"); this._node.setAttributeNS(b.namespaces[d[0]], c, a[c]) } else this._node.setAttribute(c, a[c]) }.bind(this)), this) } function e(a, c, d, e) { return new b.Svg(a, c, d, this, e) } function f() { return this._node.parentNode instanceof SVGElement ? new b.Svg(this._node.parentNode) : null } function g() { for (var a = this._node; "svg" !== a.nodeName;)a = a.parentNode; return new b.Svg(a) } function h(a) { var c = this._node.querySelector(a); return c ? new b.Svg(c) : null } function i(a) { var c = this._node.querySelectorAll(a); return c.length ? new b.Svg.List(c) : null } function j() { return this._node } function k(a, c, d, e) { if ("string" == typeof a) { var f = y.createElement("div"); f.innerHTML = a, a = f.firstChild } a.setAttribute("xmlns", b.namespaces.xmlns); var g = this.elem("foreignObject", c, d, e); return g._node.appendChild(a), g } function l(a) { return this._node.appendChild(y.createTextNode(a)), this } function m() { for (; this._node.firstChild;)this._node.removeChild(this._node.firstChild); return this } function n() { return this._node.parentNode.removeChild(this._node), this.parent() } function o(a) { return this._node.parentNode.replaceChild(a._node, this._node), a } function p(a, b) { return b && this._node.firstChild ? this._node.insertBefore(a._node, this._node.firstChild) : this._node.appendChild(a._node), this } function q() { return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : [] } function r(a) { return this._node.setAttribute("class", this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function (a, b, c) { return c.indexOf(a) === b }).join(" ")), this } function s(a) { var b = a.trim().split(/\s+/); return this._node.setAttribute("class", this.classes(this._node).filter(function (a) { return b.indexOf(a) === -1 }).join(" ")), this } function t() { return this._node.setAttribute("class", ""), this } function u() { return this._node.getBoundingClientRect().height } function v() { return this._node.getBoundingClientRect().width } function w(a, c, d) { return void 0 === c && (c = !0), Object.keys(a).forEach(function (e) { function f(a, c) { var f, g, h, i = {}; a.easing && (h = a.easing instanceof Array ? a.easing : b.Svg.Easing[a.easing], delete a.easing), a.begin = b.ensureUnit(a.begin, "ms"), a.dur = b.ensureUnit(a.dur, "ms"), h && (a.calcMode = "spline", a.keySplines = h.join(" "), a.keyTimes = "0;1"), c && (a.fill = "freeze", i[e] = a.from, this.attr(i), g = b.quantity(a.begin || 0).value, a.begin = "indefinite"), f = this.elem("animate", b.extend({ attributeName: e }, a)), c && setTimeout(function () { try { f._node.beginElement() } catch (b) { i[e] = a.to, this.attr(i), f.remove() } }.bind(this), g), d && f._node.addEventListener("beginEvent", function () { d.emit("animationBegin", { element: this, animate: f._node, params: a }) }.bind(this)), f._node.addEventListener("endEvent", function () { d && d.emit("animationEnd", { element: this, animate: f._node, params: a }), c && (i[e] = a.to, this.attr(i), f.remove()) }.bind(this)) } a[e] instanceof Array ? a[e].forEach(function (a) { f.bind(this)(a, !1) }.bind(this)) : f.bind(this)(a[e], c) }.bind(this)), this } function x(a) { var c = this; this.svgElements = []; for (var d = 0; d < a.length; d++)this.svgElements.push(new b.Svg(a[d])); Object.keys(b.Svg.prototype).filter(function (a) { return ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(a) === -1 }).forEach(function (a) { c[a] = function () { var d = Array.prototype.slice.call(arguments, 0); return c.svgElements.forEach(function (c) { b.Svg.prototype[a].apply(c, d) }), c } }) } var y = a.document; b.Svg = b.Class.extend({ constructor: c, attr: d, elem: e, parent: f, root: g, querySelector: h, querySelectorAll: i, getNode: j, foreignObject: k, text: l, empty: m, remove: n, replace: o, append: p, classes: q, addClass: r, removeClass: s, removeAllClasses: t, height: u, width: v, animate: w }), b.Svg.isSupported = function (a) { return y.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + a, "1.1") }; var z = { easeInSine: [.47, 0, .745, .715], easeOutSine: [.39, .575, .565, 1], easeInOutSine: [.445, .05, .55, .95], easeInQuad: [.55, .085, .68, .53], easeOutQuad: [.25, .46, .45, .94], easeInOutQuad: [.455, .03, .515, .955], easeInCubic: [.55, .055, .675, .19], easeOutCubic: [.215, .61, .355, 1], easeInOutCubic: [.645, .045, .355, 1], easeInQuart: [.895, .03, .685, .22], easeOutQuart: [.165, .84, .44, 1], easeInOutQuart: [.77, 0, .175, 1], easeInQuint: [.755, .05, .855, .06], easeOutQuint: [.23, 1, .32, 1], easeInOutQuint: [.86, 0, .07, 1], easeInExpo: [.95, .05, .795, .035], easeOutExpo: [.19, 1, .22, 1], easeInOutExpo: [1, 0, 0, 1], easeInCirc: [.6, .04, .98, .335], easeOutCirc: [.075, .82, .165, 1], easeInOutCirc: [.785, .135, .15, .86], easeInBack: [.6, -.28, .735, .045], easeOutBack: [.175, .885, .32, 1.275], easeInOutBack: [.68, -.55, .265, 1.55] }; b.Svg.Easing = z, b.Svg.List = b.Class.extend({ constructor: x }) }(this || global, a), function (a, b) { "use strict"; function c(a, c, d, e, f, g) { var h = b.extend({ command: f ? a.toLowerCase() : a.toUpperCase() }, c, g ? { data: g } : {}); d.splice(e, 0, h) } function d(a, b) { a.forEach(function (c, d) { t[c.command.toLowerCase()].forEach(function (e, f) { b(c, e, d, f, a) }) }) } function e(a, c) { this.pathElements = [], this.pos = 0, this.close = a, this.options = b.extend({}, u, c) } function f(a) { return void 0 !== a ? (this.pos = Math.max(0, Math.min(this.pathElements.length, a)), this) : this.pos } function g(a) { return this.pathElements.splice(this.pos, a), this } function h(a, b, d, e) { return c("M", { x: +a, y: +b }, this.pathElements, this.pos++, d, e), this } function i(a, b, d, e) { return c("L", { x: +a, y: +b }, this.pathElements, this.pos++, d, e), this } function j(a, b, d, e, f, g, h, i) { return c("C", { x1: +a, y1: +b, x2: +d, y2: +e, x: +f, y: +g }, this.pathElements, this.pos++, h, i), this } function k(a, b, d, e, f, g, h, i, j) { return c("A", { rx: +a, ry: +b, xAr: +d, lAf: +e, sf: +f, x: +g, y: +h }, this.pathElements, this.pos++, i, j), this } function l(a) { var c = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function (a, b) { return b.match(/[A-Za-z]/) && a.push([]), a[a.length - 1].push(b), a }, []); "Z" === c[c.length - 1][0].toUpperCase() && c.pop(); var d = c.map(function (a) { var c = a.shift(), d = t[c.toLowerCase()]; return b.extend({ command: c }, d.reduce(function (b, c, d) { return b[c] = +a[d], b }, {})) }), e = [this.pos, 0]; return Array.prototype.push.apply(e, d), Array.prototype.splice.apply(this.pathElements, e), this.pos += d.length, this } function m() { var a = Math.pow(10, this.options.accuracy); return this.pathElements.reduce(function (b, c) { var d = t[c.command.toLowerCase()].map(function (b) { return this.options.accuracy ? Math.round(c[b] * a) / a : c[b] }.bind(this)); return b + c.command + d.join(",") }.bind(this), "") + (this.close ? "Z" : "") } function n(a, b) { return d(this.pathElements, function (c, d) { c[d] *= "x" === d[0] ? a : b }), this } function o(a, b) { return d(this.pathElements, function (c, d) { c[d] += "x" === d[0] ? a : b }), this } function p(a) { return d(this.pathElements, function (b, c, d, e, f) { var g = a(b, c, d, e, f); (g || 0 === g) && (b[c] = g) }), this } function q(a) { var c = new b.Svg.Path(a || this.close); return c.pos = this.pos, c.pathElements = this.pathElements.slice().map(function (a) { return b.extend({}, a) }), c.options = b.extend({}, this.options), c } function r(a) { var c = [new b.Svg.Path]; return this.pathElements.forEach(function (d) { d.command === a.toUpperCase() && 0 !== c[c.length - 1].pathElements.length && c.push(new b.Svg.Path), c[c.length - 1].pathElements.push(d) }), c } function s(a, c, d) { for (var e = new b.Svg.Path(c, d), f = 0; f < a.length; f++)for (var g = a[f], h = 0; h < g.pathElements.length; h++)e.pathElements.push(g.pathElements[h]); return e } var t = { m: ["x", "y"], l: ["x", "y"], c: ["x1", "y1", "x2", "y2", "x", "y"], a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"] }, u = { accuracy: 3 }; b.Svg.Path = b.Class.extend({ constructor: e, position: f, remove: g, move: h, line: i, curve: j, arc: k, scale: n, translate: o, transform: p, parse: l, stringify: m, clone: q, splitByCommand: r }), b.Svg.Path.elementDescriptions = t, b.Svg.Path.join = s }(this || global, a), function (a, b) { "use strict"; function c(a, b, c, d) { this.units = a, this.counterUnits = a === e.x ? e.y : e.x, this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a.rectStart], this.gridOffset = b[a.rectOffset], this.ticks = c, this.options = d } function d(a, c, d, e, f) { var g = e["axis" + this.units.pos.toUpperCase()], h = this.ticks.map(this.projectValue.bind(this)), i = this.ticks.map(g.labelInterpolationFnc); h.forEach(function (j, k) { var l, m = { x: 0, y: 0 }; l = h[k + 1] ? h[k + 1] - j : Math.max(this.axisLength - j, 30), b.isFalseyButZero(i[k]) && "" !== i[k] || ("x" === this.units.pos ? (j = this.chartRect.x1 + j, m.x = e.axisX.labelOffset.x, "start" === e.axisX.position ? m.y = this.chartRect.padding.top + e.axisX.labelOffset.y + (d ? 5 : 20) : m.y = this.chartRect.y1 + e.axisX.labelOffset.y + (d ? 5 : 20)) : (j = this.chartRect.y1 - j, m.y = e.axisY.labelOffset.y - (d ? l : 0), "start" === e.axisY.position ? m.x = d ? this.chartRect.padding.left + e.axisY.labelOffset.x : this.chartRect.x1 - 10 : m.x = this.chartRect.x2 + e.axisY.labelOffset.x + 10), g.showGrid && b.createGrid(j, k, this, this.gridOffset, this.chartRect[this.counterUnits.len](), a, [e.classNames.grid, e.classNames[this.units.dir]], f), g.showLabel && b.createLabel(j, l, k, i, this, g.offset, m, c, [e.classNames.label, e.classNames[this.units.dir], "start" === g.position ? e.classNames[g.position] : e.classNames.end], d, f)) }.bind(this)) } var e = (a.window, a.document, { x: { pos: "x", len: "width", dir: "horizontal", rectStart: "x1", rectEnd: "x2", rectOffset: "y2" }, y: { pos: "y", len: "height", dir: "vertical", rectStart: "y2", rectEnd: "y1", rectOffset: "x1" } }); b.Axis = b.Class.extend({ constructor: c, createGridAndLabels: d, projectValue: function (a, b, c) { throw new Error("Base axis can't be instantiated!") } }), b.Axis.units = e }(this || global, a), function (a, b) { "use strict"; function c(a, c, d, e) { var f = e.highLow || b.getHighLow(c, e, a.pos); this.bounds = b.getBounds(d[a.rectEnd] - d[a.rectStart], f, e.scaleMinSpace || 20, e.onlyInteger), this.range = { min: this.bounds.min, max: this.bounds.max }, b.AutoScaleAxis["super"].constructor.call(this, a, d, this.bounds.values, e) } function d(a) { return this.axisLength * (+b.getMultiValue(a, this.units.pos) - this.bounds.min) / this.bounds.range } a.window, a.document; b.AutoScaleAxis = b.Axis.extend({ constructor: c, projectValue: d }) }(this || global, a), function (a, b) { "use strict"; function c(a, c, d, e) { var f = e.highLow || b.getHighLow(c, e, a.pos); this.divisor = e.divisor || 1, this.ticks = e.ticks || b.times(this.divisor).map(function (a, b) { return f.low + (f.high - f.low) / this.divisor * b }.bind(this)), this.ticks.sort(function (a, b) { return a - b }), this.range = { min: f.low, max: f.high }, b.FixedScaleAxis["super"].constructor.call(this, a, d, this.ticks, e), this.stepLength = this.axisLength / this.divisor } function d(a) { return this.axisLength * (+b.getMultiValue(a, this.units.pos) - this.range.min) / (this.range.max - this.range.min) } a.window, a.document; b.FixedScaleAxis = b.Axis.extend({ constructor: c, projectValue: d }) }(this || global, a), function (a, b) { "use strict"; function c(a, c, d, e) { b.StepAxis["super"].constructor.call(this, a, d, e.ticks, e); var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0)); this.stepLength = this.axisLength / f } function d(a, b) { return this.stepLength * b } a.window, a.document; b.StepAxis = b.Axis.extend({ constructor: c, projectValue: d }) }(this || global, a), function (a, b) { "use strict"; function c(a) { var c = b.normalizeData(this.data, a.reverseData, !0); this.svg = b.createSvg(this.container, a.width, a.height, a.classNames.chart); var d, f, g = this.svg.elem("g").addClass(a.classNames.gridGroup), h = this.svg.elem("g"), i = this.svg.elem("g").addClass(a.classNames.labelGroup), j = b.createChartRect(this.svg, a, e.padding); d = void 0 === a.axisX.type ? new b.StepAxis(b.Axis.units.x, c.normalized.series, j, b.extend({}, a.axisX, { ticks: c.normalized.labels, stretch: a.fullWidth })) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, j, a.axisX), f = void 0 === a.axisY.type ? new b.AutoScaleAxis(b.Axis.units.y, c.normalized.series, j, b.extend({}, a.axisY, { high: b.isNumeric(a.high) ? a.high : a.axisY.high, low: b.isNumeric(a.low) ? a.low : a.axisY.low })) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, j, a.axisY), d.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), f.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && b.createGridBackground(g, j, a.classNames.gridBackground, this.eventEmitter), c.raw.series.forEach(function (e, g) { var i = h.elem("g"); i.attr({ "ct:series-name": e.name, "ct:meta": b.serialize(e.meta) }), i.addClass([a.classNames.series, e.className || a.classNames.series + "-" + b.alphaNumerate(g)].join(" ")); var k = [], l = []; c.normalized.series[g].forEach(function (a, h) { var i = { x: j.x1 + d.projectValue(a, h, c.normalized.series[g]), y: j.y1 - f.projectValue(a, h, c.normalized.series[g]) }; k.push(i.x, i.y), l.push({ value: a, valueIndex: h, meta: b.getMetaData(e, h) }) }.bind(this)); var m = { lineSmooth: b.getSeriesOption(e, a, "lineSmooth"), showPoint: b.getSeriesOption(e, a, "showPoint"), showLine: b.getSeriesOption(e, a, "showLine"), showArea: b.getSeriesOption(e, a, "showArea"), areaBase: b.getSeriesOption(e, a, "areaBase") }, n = "function" == typeof m.lineSmooth ? m.lineSmooth : m.lineSmooth ? b.Interpolation.monotoneCubic() : b.Interpolation.none(), o = n(k, l); if (m.showPoint && o.pathElements.forEach(function (c) { var h = i.elem("line", { x1: c.x, y1: c.y, x2: c.x + .01, y2: c.y }, a.classNames.point).attr({ "ct:value": [c.data.value.x, c.data.value.y].filter(b.isNumeric).join(","), "ct:meta": b.serialize(c.data.meta) }); this.eventEmitter.emit("draw", { type: "point", value: c.data.value, index: c.data.valueIndex, meta: c.data.meta, series: e, seriesIndex: g, axisX: d, axisY: f, group: i, element: h, x: c.x, y: c.y }) }.bind(this)), m.showLine) { var p = i.elem("path", { d: o.stringify() }, a.classNames.line, !0); this.eventEmitter.emit("draw", { type: "line", values: c.normalized.series[g], path: o.clone(), chartRect: j, index: g, series: e, seriesIndex: g, seriesMeta: e.meta, axisX: d, axisY: f, group: i, element: p }) } if (m.showArea && f.range) { var q = Math.max(Math.min(m.areaBase, f.range.max), f.range.min), r = j.y1 - f.projectValue(q); o.splitByCommand("M").filter(function (a) { return a.pathElements.length > 1 }).map(function (a) { var b = a.pathElements[0], c = a.pathElements[a.pathElements.length - 1]; return a.clone(!0).position(0).remove(1).move(b.x, r).line(b.x, b.y).position(a.pathElements.length + 1).line(c.x, r) }).forEach(function (b) { var h = i.elem("path", { d: b.stringify() }, a.classNames.area, !0); this.eventEmitter.emit("draw", { type: "area", values: c.normalized.series[g], path: b.clone(), series: e, seriesIndex: g, axisX: d, axisY: f, chartRect: j, index: g, group: i, element: h }) }.bind(this)) } }.bind(this)), this.eventEmitter.emit("created", { bounds: f.bounds, chartRect: j, axisX: d, axisY: f, svg: this.svg, options: a }) } function d(a, c, d, f) { b.Line["super"].constructor.call(this, a, c, e, b.extend({}, e, d), f) } var e = (a.window, a.document, { axisX: { offset: 30, position: "end", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: b.noop, type: void 0 }, axisY: { offset: 40, position: "start", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: b.noop, type: void 0, scaleMinSpace: 20, onlyInteger: !1 }, width: void 0, height: void 0, showLine: !0, showPoint: !0, showArea: !1, areaBase: 0, lineSmooth: !0, showGridBackground: !1, low: void 0, high: void 0, chartPadding: { top: 15, right: 15, bottom: 5, left: 10 }, fullWidth: !1, reverseData: !1, classNames: { chart: "ct-chart-line", label: "ct-label", labelGroup: "ct-labels", series: "ct-series", line: "ct-line", point: "ct-point", area: "ct-area", grid: "ct-grid", gridGroup: "ct-grids", gridBackground: "ct-grid-background", vertical: "ct-vertical", horizontal: "ct-horizontal", start: "ct-start", end: "ct-end" } }); b.Line = b.Base.extend({ constructor: d, createChart: c }) }(this || global, a), function (a, b) {
        "use strict"; function c(a) {
            var c, d; a.distributeSeries ? (c = b.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), c.normalized.series = c.normalized.series.map(function (a) { return [a] })) : c = b.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), this.svg = b.createSvg(this.container, a.width, a.height, a.classNames.chart + (a.horizontalBars ? " " + a.classNames.horizontalBars : "")); var f = this.svg.elem("g").addClass(a.classNames.gridGroup), g = this.svg.elem("g"), h = this.svg.elem("g").addClass(a.classNames.labelGroup);
            if (a.stackBars && 0 !== c.normalized.series.length) { var i = b.serialMap(c.normalized.series, function () { return Array.prototype.slice.call(arguments).map(function (a) { return a }).reduce(function (a, b) { return { x: a.x + (b && b.x) || 0, y: a.y + (b && b.y) || 0 } }, { x: 0, y: 0 }) }); d = b.getHighLow([i], a, a.horizontalBars ? "x" : "y") } else d = b.getHighLow(c.normalized.series, a, a.horizontalBars ? "x" : "y"); d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a.low || (0 === a.low ? 0 : d.low); var j, k, l, m, n, o = b.createChartRect(this.svg, a, e.padding); k = a.distributeSeries && a.stackBars ? c.normalized.labels.slice(0, 1) : c.normalized.labels, a.horizontalBars ? (j = m = void 0 === a.axisX.type ? new b.AutoScaleAxis(b.Axis.units.x, c.normalized.series, o, b.extend({}, a.axisX, { highLow: d, referenceValue: 0 })) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, o, b.extend({}, a.axisX, { highLow: d, referenceValue: 0 })), l = n = void 0 === a.axisY.type ? new b.StepAxis(b.Axis.units.y, c.normalized.series, o, { ticks: k }) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, o, a.axisY)) : (l = m = void 0 === a.axisX.type ? new b.StepAxis(b.Axis.units.x, c.normalized.series, o, { ticks: k }) : a.axisX.type.call(b, b.Axis.units.x, c.normalized.series, o, a.axisX), j = n = void 0 === a.axisY.type ? new b.AutoScaleAxis(b.Axis.units.y, c.normalized.series, o, b.extend({}, a.axisY, { highLow: d, referenceValue: 0 })) : a.axisY.type.call(b, b.Axis.units.y, c.normalized.series, o, b.extend({}, a.axisY, { highLow: d, referenceValue: 0 }))); var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 - j.projectValue(0), q = []; l.createGridAndLabels(f, h, this.supportsForeignObject, a, this.eventEmitter), j.createGridAndLabels(f, h, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && b.createGridBackground(f, o, a.classNames.gridBackground, this.eventEmitter), c.raw.series.forEach(function (d, e) { var f, h, i = e - (c.raw.series.length - 1) / 2; f = a.distributeSeries && !a.stackBars ? l.axisLength / c.normalized.series.length / 2 : a.distributeSeries && a.stackBars ? l.axisLength / 2 : l.axisLength / c.normalized.series[e].length / 2, h = g.elem("g"), h.attr({ "ct:series-name": d.name, "ct:meta": b.serialize(d.meta) }), h.addClass([a.classNames.series, d.className || a.classNames.series + "-" + b.alphaNumerate(e)].join(" ")), c.normalized.series[e].forEach(function (g, k) { var r, s, t, u; if (u = a.distributeSeries && !a.stackBars ? e : a.distributeSeries && a.stackBars ? 0 : k, r = a.horizontalBars ? { x: o.x1 + j.projectValue(g && g.x ? g.x : 0, k, c.normalized.series[e]), y: o.y1 - l.projectValue(g && g.y ? g.y : 0, u, c.normalized.series[e]) } : { x: o.x1 + l.projectValue(g && g.x ? g.x : 0, u, c.normalized.series[e]), y: o.y1 - j.projectValue(g && g.y ? g.y : 0, k, c.normalized.series[e]) }, l instanceof b.StepAxis && (l.options.stretch || (r[l.units.pos] += f * (a.horizontalBars ? -1 : 1)), r[l.units.pos] += a.stackBars || a.distributeSeries ? 0 : i * a.seriesBarDistance * (a.horizontalBars ? -1 : 1)), t = q[k] || p, q[k] = t - (p - r[l.counterUnits.pos]), void 0 !== g) { var v = {}; v[l.units.pos + "1"] = r[l.units.pos], v[l.units.pos + "2"] = r[l.units.pos], !a.stackBars || "accumulate" !== a.stackMode && a.stackMode ? (v[l.counterUnits.pos + "1"] = p, v[l.counterUnits.pos + "2"] = r[l.counterUnits.pos]) : (v[l.counterUnits.pos + "1"] = t, v[l.counterUnits.pos + "2"] = q[k]), v.x1 = Math.min(Math.max(v.x1, o.x1), o.x2), v.x2 = Math.min(Math.max(v.x2, o.x1), o.x2), v.y1 = Math.min(Math.max(v.y1, o.y2), o.y1), v.y2 = Math.min(Math.max(v.y2, o.y2), o.y1); var w = b.getMetaData(d, k); s = h.elem("line", v, a.classNames.bar).attr({ "ct:value": [g.x, g.y].filter(b.isNumeric).join(","), "ct:meta": b.serialize(w) }), this.eventEmitter.emit("draw", b.extend({ type: "bar", value: g, index: k, meta: w, series: d, seriesIndex: e, axisX: m, axisY: n, chartRect: o, group: h, element: s }, v)) } }.bind(this)) }.bind(this)), this.eventEmitter.emit("created", { bounds: j.bounds, chartRect: o, axisX: m, axisY: n, svg: this.svg, options: a })
        } function d(a, c, d, f) { b.Bar["super"].constructor.call(this, a, c, e, b.extend({}, e, d), f) } var e = (a.window, a.document, { axisX: { offset: 30, position: "end", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: b.noop, scaleMinSpace: 30, onlyInteger: !1 }, axisY: { offset: 40, position: "start", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: b.noop, scaleMinSpace: 20, onlyInteger: !1 }, width: void 0, height: void 0, high: void 0, low: void 0, referenceValue: 0, chartPadding: { top: 15, right: 15, bottom: 5, left: 10 }, seriesBarDistance: 15, stackBars: !1, stackMode: "accumulate", horizontalBars: !1, distributeSeries: !1, reverseData: !1, showGridBackground: !1, classNames: { chart: "ct-chart-bar", horizontalBars: "ct-horizontal-bars", label: "ct-label", labelGroup: "ct-labels", series: "ct-series", bar: "ct-bar", grid: "ct-grid", gridGroup: "ct-grids", gridBackground: "ct-grid-background", vertical: "ct-vertical", horizontal: "ct-horizontal", start: "ct-start", end: "ct-end" } }); b.Bar = b.Base.extend({ constructor: d, createChart: c })
    }(this || global, a), function (a, b) { "use strict"; function c(a, b, c) { var d = b.x > a.x; return d && "explode" === c || !d && "implode" === c ? "start" : d && "implode" === c || !d && "explode" === c ? "end" : "middle" } function d(a) { var d, e, g, h, i, j = b.normalizeData(this.data), k = [], l = a.startAngle; this.svg = b.createSvg(this.container, a.width, a.height, a.donut ? a.classNames.chartDonut : a.classNames.chartPie), e = b.createChartRect(this.svg, a, f.padding), g = Math.min(e.width() / 2, e.height() / 2), i = a.total || j.normalized.series.reduce(function (a, b) { return a + b }, 0); var m = b.quantity(a.donutWidth); "%" === m.unit && (m.value *= g / 100), g -= a.donut && !a.donutSolid ? m.value / 2 : 0, h = "outside" === a.labelPosition || a.donut && !a.donutSolid ? g : "center" === a.labelPosition ? 0 : a.donutSolid ? g - m.value / 2 : g / 2, h += a.labelOffset; var n = { x: e.x1 + e.width() / 2, y: e.y2 + e.height() / 2 }, o = 1 === j.raw.series.filter(function (a) { return a.hasOwnProperty("value") ? 0 !== a.value : 0 !== a }).length; j.raw.series.forEach(function (a, b) { k[b] = this.svg.elem("g", null, null) }.bind(this)), a.showLabel && (d = this.svg.elem("g", null, null)), j.raw.series.forEach(function (e, f) { if (0 !== j.normalized.series[f] || !a.ignoreEmptyValues) { k[f].attr({ "ct:series-name": e.name }), k[f].addClass([a.classNames.series, e.className || a.classNames.series + "-" + b.alphaNumerate(f)].join(" ")); var p = i > 0 ? l + j.normalized.series[f] / i * 360 : 0, q = Math.max(0, l - (0 === f || o ? 0 : .2)); p - q >= 359.99 && (p = q + 359.99); var r, s, t, u = b.polarToCartesian(n.x, n.y, g, q), v = b.polarToCartesian(n.x, n.y, g, p), w = new b.Svg.Path(!a.donut || a.donutSolid).move(v.x, v.y).arc(g, g, 0, p - l > 180, 0, u.x, u.y); a.donut ? a.donutSolid && (t = g - m.value, r = b.polarToCartesian(n.x, n.y, t, l - (0 === f || o ? 0 : .2)), s = b.polarToCartesian(n.x, n.y, t, p), w.line(r.x, r.y), w.arc(t, t, 0, p - l > 180, 1, s.x, s.y)) : w.line(n.x, n.y); var x = a.classNames.slicePie; a.donut && (x = a.classNames.sliceDonut, a.donutSolid && (x = a.classNames.sliceDonutSolid)); var y = k[f].elem("path", { d: w.stringify() }, x); if (y.attr({ "ct:value": j.normalized.series[f], "ct:meta": b.serialize(e.meta) }), a.donut && !a.donutSolid && (y._node.style.strokeWidth = m.value + "px"), this.eventEmitter.emit("draw", { type: "slice", value: j.normalized.series[f], totalDataSum: i, index: f, meta: e.meta, series: e, group: k[f], element: y, path: w.clone(), center: n, radius: g, startAngle: l, endAngle: p }), a.showLabel) { var z; z = 1 === j.raw.series.length ? { x: n.x, y: n.y } : b.polarToCartesian(n.x, n.y, h, l + (p - l) / 2); var A; A = j.normalized.labels && !b.isFalseyButZero(j.normalized.labels[f]) ? j.normalized.labels[f] : j.normalized.series[f]; var B = a.labelInterpolationFnc(A, f); if (B || 0 === B) { var C = d.elem("text", { dx: z.x, dy: z.y, "text-anchor": c(n, z, a.labelDirection) }, a.classNames.label).text("" + B); this.eventEmitter.emit("draw", { type: "label", index: f, group: d, element: C, text: "" + B, x: z.x, y: z.y }) } } l = p } }.bind(this)), this.eventEmitter.emit("created", { chartRect: e, svg: this.svg, options: a }) } function e(a, c, d, e) { b.Pie["super"].constructor.call(this, a, c, f, b.extend({}, f, d), e) } var f = (a.window, a.document, { width: void 0, height: void 0, chartPadding: 5, classNames: { chartPie: "ct-chart-pie", chartDonut: "ct-chart-donut", series: "ct-series", slicePie: "ct-slice-pie", sliceDonut: "ct-slice-donut", sliceDonutSolid: "ct-slice-donut-solid", label: "ct-label" }, startAngle: 0, total: void 0, donut: !1, donutSolid: !1, donutWidth: 60, showLabel: !0, labelOffset: 0, labelPosition: "inside", labelInterpolationFnc: b.noop, labelDirection: "neutral", reverseData: !1, ignoreEmptyValues: !1 }); b.Pie = b.Base.extend({ constructor: e, createChart: d, determineAnchorPosition: c }) }(this || global, a), a
});
//# sourceMappingURL=chartist.min.js.map

var i, l, selectedLine = null;

/* Navigate to hash without browser history entry */
var navigateToHash = function () {
    if (window.history !== undefined && window.history.replaceState !== undefined) {
        window.history.replaceState(undefined, undefined, this.getAttribute("href"));
    }
};

var hashLinks = document.getElementsByClassName('navigatetohash');
for (i = 0, l = hashLinks.length; i < l; i++) {
    hashLinks[i].addEventListener('click', navigateToHash);
}

/* Switch test method */
var switchTestMethod = function () {
    var method = this.getAttribute("value");
    console.log("Selected test method: " + method);

    var lines, i, l, coverageData, lineAnalysis, cells;

    lines = document.querySelectorAll('.lineAnalysis tr');

    for (i = 1, l = lines.length; i < l; i++) {
        coverageData = JSON.parse(lines[i].getAttribute('data-coverage').replace(/'/g, '"'));
        lineAnalysis = coverageData[method];
        cells = lines[i].querySelectorAll('td');
        if (lineAnalysis === undefined) {
            lineAnalysis = coverageData.AllTestMethods;
            if (lineAnalysis.LVS !== 'gray') {
                cells[0].setAttribute('class', 'red');
                cells[1].innerText = cells[1].textContent = '0';
                cells[4].setAttribute('class', 'lightred');
            }
        } else {
            cells[0].setAttribute('class', lineAnalysis.LVS);
            cells[1].innerText = cells[1].textContent = lineAnalysis.VC;
            cells[4].setAttribute('class', 'light' + lineAnalysis.LVS);
        }
    }
};

var testMethods = document.getElementsByClassName('switchtestmethod');
for (i = 0, l = testMethods.length; i < l; i++) {
    testMethods[i].addEventListener('change', switchTestMethod);
}

/* Highlight test method by line */
var toggleLine = function () {
    if (selectedLine === this) {
        selectedLine = null;
    } else {
        selectedLine = null;
        unhighlightTestMethods();
        highlightTestMethods.call(this);
        selectedLine = this;
    }
    
};
var highlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var lineAnalysis;
    var coverageData = JSON.parse(this.getAttribute('data-coverage').replace(/'/g, '"'));
    var testMethods = document.getElementsByClassName('testmethod');

    for (i = 0, l = testMethods.length; i < l; i++) {
        lineAnalysis = coverageData[testMethods[i].id];
        if (lineAnalysis === undefined) {
            testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
        } else {
            testMethods[i].className += ' light' + lineAnalysis.LVS;
        }
    }
};
var unhighlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var testMethods = document.getElementsByClassName('testmethod');
    for (i = 0, l = testMethods.length; i < l; i++) {
        testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
    }
};
var coverableLines = document.getElementsByClassName('coverableline');
for (i = 0, l = coverableLines.length; i < l; i++) {
    coverableLines[i].addEventListener('click', toggleLine);
    coverableLines[i].addEventListener('mouseenter', highlightTestMethods);
    coverableLines[i].addEventListener('mouseleave', unhighlightTestMethods);
}

/* History charts */
var renderChart = function (chart) {
    // Remove current children (e.g. PNG placeholder)
    while (chart.firstChild) {
        chart.firstChild.remove();
    }

    var chartData = window[chart.getAttribute('data-data')];
    var options = {
        axisY: {
            type: undefined,
            onlyInteger: true
        },
        lineSmooth: false,
        low: 0,
        high: 100,
        scaleMinSpace: 20,
        onlyInteger: true,
        fullWidth: true
    };
    var lineChart = new Chartist.Line(chart, {
        labels: [],
        series: chartData.series
    }, options);

    /* Zoom */
    var zoomButtonDiv = document.createElement("div");
    zoomButtonDiv.className = "toggleZoom";
    var zoomButtonLink = document.createElement("a");
    zoomButtonLink.setAttribute("href", "");
    var zoomButtonText = document.createElement("i");
    zoomButtonText.className = "icon-search-plus";

    zoomButtonLink.appendChild(zoomButtonText);
    zoomButtonDiv.appendChild(zoomButtonLink);

    chart.appendChild(zoomButtonDiv);

    zoomButtonDiv.addEventListener('click', function (event) {
        event.preventDefault();

        if (options.axisY.type === undefined) {
            options.axisY.type = Chartist.AutoScaleAxis;
            zoomButtonText.className = "icon-search-minus";
        } else {
            options.axisY.type = undefined;
            zoomButtonText.className = "icon-search-plus";
        }

        lineChart.update(null, options);
    });

    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";

    chart.appendChild(tooltip);

    /* Tooltips */
    var showToolTip = function () {
        var index = this.getAttribute('ct:meta');

        tooltip.innerHTML = chartData.tooltips[index];
        tooltip.style.display = 'block';
    };

    var moveToolTip = function (event) {
        var box = chart.getBoundingClientRect();
        var left = event.pageX - box.left - window.pageXOffset;
        var top = event.pageY - box.top - window.pageYOffset;

        left = left + 20;
        top = top - tooltip.offsetHeight / 2;

        if (left + tooltip.offsetWidth > box.width) {
            left -= tooltip.offsetWidth + 40;
        }

        if (top < 0) {
            top = 0;
        }

        if (top + tooltip.offsetHeight > box.height) {
            top = box.height - tooltip.offsetHeight;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    };

    var hideToolTip = function () {
        tooltip.style.display = 'none';
    };
    chart.addEventListener('mousemove', moveToolTip);

    lineChart.on('created', function () {
        var chartPoints = chart.getElementsByClassName('ct-point');
        for (i = 0, l = chartPoints.length; i < l; i++) {
            chartPoints[i].addEventListener('mousemove', showToolTip);
            chartPoints[i].addEventListener('mouseout', hideToolTip);
        }
    });
};

var charts = document.getElementsByClassName('historychart');
for (i = 0, l = charts.length; i < l; i++) {
    renderChart(charts[i]);
}

var assemblies = [
  {
    "name": "Dafny",
    "classes": [
      { "name": "Dafny.Dafny", "rp": "Dafny_Dafny.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 9, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
  {
    "name": "DafnyCore",
    "classes": [
      { "name": "ConstructorWarning", "rp": "DafnyCore_ConstructorWarning.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 69, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "ConstructorWarningVisitor", "rp": "DafnyCore_ConstructorWarningVisitor.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 69, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyAttributeOptions", "rp": "DafnyCore_DafnyAttributeOptions.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 1656, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyCore.DooFile", "rp": "DafnyCore_DooFile.html", "cl": 21, "ucl": 133, "cal": 154, "tl": 268, "cb": 18, "tb": 96, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "ErrorReportingCommandLineParseState", "rp": "DafnyCore_ErrorReportingCommandLineParseState.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 1656, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "ExtensionMethods.PythonExtensions", "rp": "DafnyCore_PythonExtensions.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 1764, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Formatting.__default", "rp": "DafnyCore___default.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 47, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Abstemious", "rp": "DafnyCore_Abstemious.html", "cl": 0, "ucl": 57, "cal": 57, "tl": 77, "cb": 0, "tb": 80, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AbstractModuleDecl", "rp": "DafnyCore_AbstractModuleDecl.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 2573, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AbstractSignatureCloner", "rp": "DafnyCore_AbstractSignatureCloner.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 963, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AbstractTypeDecl", "rp": "DafnyCore_AbstractTypeDecl.html", "cl": 0, "ucl": 70, "cal": 70, "tl": 2573, "cb": 0, "tb": 116, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ActualBinding", "rp": "DafnyCore_ActualBinding.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ActualBindings", "rp": "DafnyCore_ActualBindings.html", "cl": 18, "ucl": 4, "cal": 22, "tl": 1056, "cb": 18, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AliasModuleDecl", "rp": "DafnyCore_AliasModuleDecl.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 2573, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AlphaConvertingSubstituter", "rp": "DafnyCore_AlphaConvertingSubstituter.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 32, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AlternativeLoopStmt", "rp": "DafnyCore_AlternativeLoopStmt.html", "cl": 0, "ucl": 55, "cal": 55, "tl": 88, "cb": 0, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AlternativeStmt", "rp": "DafnyCore_AlternativeStmt.html", "cl": 0, "ucl": 36, "cal": 36, "tl": 60, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ApplyExpr", "rp": "DafnyCore_ApplyExpr.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 3754, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ApplySuffix", "rp": "DafnyCore_ApplySuffix.html", "cl": 19, "ucl": 22, "cal": 41, "tl": 3754, "cb": 8, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ArrayClassDecl", "rp": "DafnyCore_ArrayClassDecl.html", "cl": 9, "ucl": 1, "cal": 10, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ArrowType", "rp": "DafnyCore_ArrowType.html", "cl": 29, "ucl": 37, "cal": 66, "tl": 143, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ArrowTypeDecl", "rp": "DafnyCore_ArrowTypeDecl.html", "cl": 9, "ucl": 1, "cal": 10, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ArtificialType", "rp": "DafnyCore_ArtificialType.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssemblyPlugin", "rp": "DafnyCore_AssemblyPlugin.html", "cl": 0, "ucl": 46, "cal": 46, "tl": 144, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssertLabel", "rp": "DafnyCore_AssertLabel.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssertStmt", "rp": "DafnyCore_AssertStmt.html", "cl": 32, "ucl": 24, "cal": 56, "tl": 95, "cb": 10, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssignmentRhs", "rp": "DafnyCore_AssignmentRhs.html", "cl": 22, "ucl": 10, "cal": 32, "tl": 1136, "cb": 2, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssignOrReturnStmt", "rp": "DafnyCore_AssignOrReturnStmt.html", "cl": 0, "ucl": 220, "cal": 220, "tl": 336, "cb": 0, "tb": 248, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssignStmt", "rp": "DafnyCore_AssignStmt.html", "cl": 51, "ucl": 27, "cal": 78, "tl": 136, "cb": 30, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssignSuchThatStmt", "rp": "DafnyCore_AssignSuchThatStmt.html", "cl": 0, "ucl": 61, "cal": 61, "tl": 110, "cb": 0, "tb": 52, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AssumeStmt", "rp": "DafnyCore_AssumeStmt.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 35, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ASTVisitor<T>", "rp": "DafnyCore_ASTVisitor_1.html", "cl": 169, "ucl": 89, "cal": 258, "tl": 393, "cb": 176, "tb": 308, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AttributedExpression", "rp": "DafnyCore_AttributedExpression.html", "cl": 19, "ucl": 12, "cal": 31, "tl": 3754, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AttributedToken", "rp": "DafnyCore_AttributedToken.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Attributes", "rp": "DafnyCore_Attributes.html", "cl": 47, "ucl": 60, "cal": 107, "tl": 1056, "cb": 36, "tb": 128, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AttributesExtensions", "rp": "DafnyCore_AttributesExtensions.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 1056, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Auditor.Assumption", "rp": "DafnyCore_Assumption.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 124, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Auditor.AssumptionDescription", "rp": "DafnyCore_AssumptionDescription.html", "cl": 0, "ucl": 107, "cal": 107, "tl": 124, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Auditor.Auditor", "rp": "DafnyCore_Auditor.html", "cl": 36, "ucl": 82, "cal": 118, "tl": 162, "cb": 0, "tb": 154, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Auditor.AuditReport", "rp": "DafnyCore_AuditReport.html", "cl": 0, "ucl": 150, "cal": 150, "tl": 205, "cb": 0, "tb": 108, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AutoContractsRewriter", "rp": "DafnyCore_AutoContractsRewriter.html", "cl": 15, "ucl": 331, "cal": 346, "tl": 512, "cb": 20, "tb": 376, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AutoGeneratedExpression", "rp": "DafnyCore_AutoGeneratedExpression.html", "cl": 8, "ucl": 5, "cal": 13, "tl": 3754, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AutoGeneratedToken", "rp": "DafnyCore_AutoGeneratedToken.html", "cl": 8, "ucl": 8, "cal": 16, "tl": 28, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AutoGhostIdentifierExpr", "rp": "DafnyCore_AutoGhostIdentifierExpr.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.AutoReqFunctionRewriter", "rp": "DafnyCore_AutoReqFunctionRewriter.html", "cl": 13, "ucl": 267, "cal": 280, "tl": 368, "cb": 12, "tb": 300, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BasicType", "rp": "DafnyCore_BasicType.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BatchErrorReporter", "rp": "DafnyCore_BatchErrorReporter.html", "cl": 20, "ucl": 1, "cal": 21, "tl": 35, "cb": 6, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BigIntegerParser", "rp": "DafnyCore_BigIntegerParser.html", "cl": 7, "ucl": 2, "cal": 9, "tl": 29, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BigOrdinalType", "rp": "DafnyCore_BigOrdinalType.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 2889, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BinaryExpr", "rp": "DafnyCore_BinaryExpr.html", "cl": 57, "ucl": 154, "cal": 211, "tl": 3754, "cb": 54, "tb": 558, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BitvectorOptimization", "rp": "DafnyCore_BitvectorOptimization.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 49, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BitvectorOptimizationVisitor", "rp": "DafnyCore_BitvectorOptimizationVisitor.html", "cl": 6, "ucl": 14, "cal": 20, "tl": 49, "cb": 2, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BitvectorType", "rp": "DafnyCore_BitvectorType.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 2889, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BlockStmt", "rp": "DafnyCore_BlockStmt.html", "cl": 10, "ucl": 35, "cal": 45, "tl": 74, "cb": 0, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoogieOptionBag", "rp": "DafnyCore_BoogieOptionBag.html", "cl": 94, "ucl": 60, "cal": 154, "tl": 187, "cb": 0, "tb": 84, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoogieRangeToken", "rp": "DafnyCore_BoogieRangeToken.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 374, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoogieStmtListBuilder", "rp": "DafnyCore_BoogieStmtListBuilder.html", "cl": 28, "ucl": 1, "cal": 29, "tl": 48, "cb": 22, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoolType", "rp": "DafnyCore_BoolType.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BottomUpVisitor", "rp": "DafnyCore_BottomUpVisitor.html", "cl": 48, "ucl": 29, "cal": 77, "tl": 1056, "cb": 18, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoundVar", "rp": "DafnyCore_BoundVar.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BoxingCastExpr", "rp": "DafnyCore_BoxingCastExpr.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BreakStmt", "rp": "DafnyCore_BreakStmt.html", "cl": 16, "ucl": 10, "cal": 26, "tl": 59, "cb": 8, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Buffer", "rp": "DafnyCore_Buffer.html", "cl": 59, "ucl": 33, "cal": 92, "tl": 1135, "cb": 70, "tb": 108, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BuiltIns", "rp": "DafnyCore_BuiltIns.html", "cl": 177, "ucl": 13, "cal": 190, "tl": 308, "cb": 70, "tb": 96, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CalcStmt", "rp": "DafnyCore_CalcStmt.html", "cl": 0, "ucl": 248, "cal": 248, "tl": 427, "cb": 0, "tb": 340, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CallableWrapper", "rp": "DafnyCore_CallableWrapper.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CallGraphBuilder", "rp": "DafnyCore_CallGraphBuilder.html", "cl": 95, "ucl": 79, "cal": 174, "tl": 321, "cb": 100, "tb": 224, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CallStmt", "rp": "DafnyCore_CallStmt.html", "cl": 31, "ucl": 5, "cal": 36, "tl": 78, "cb": 12, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CaptureStateExtensions", "rp": "DafnyCore_CaptureStateExtensions.html", "cl": 6, "ucl": 13, "cal": 19, "tl": 35, "cb": 8, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CasePattern<T>", "rp": "DafnyCore_CasePattern_1.html", "cl": 0, "ucl": 55, "cal": 55, "tl": 3754, "cb": 0, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ChainingExpression", "rp": "DafnyCore_ChainingExpression.html", "cl": 43, "ucl": 39, "cal": 82, "tl": 3754, "cb": 18, "tb": 68, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CharLiteralExpr", "rp": "DafnyCore_CharLiteralExpr.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CharType", "rp": "DafnyCore_CharType.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ClassDecl", "rp": "DafnyCore_ClassDecl.html", "cl": 26, "ucl": 55, "cal": 81, "tl": 2573, "cb": 6, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Cloner", "rp": "DafnyCore_Cloner.html", "cl": 306, "ucl": 230, "cal": 536, "tl": 963, "cb": 276, "tb": 496, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ClonerButDropMethodBodies", "rp": "DafnyCore_ClonerButDropMethodBodies.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 963, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ClonerButIVariablesAreKeptOnce", "rp": "DafnyCore_ClonerButIVariablesAreKeptOnce.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 28, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ClonerKeepParensExpressions", "rp": "DafnyCore_ClonerKeepParensExpressions.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 963, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CoCallResolution", "rp": "DafnyCore_CoCallResolution.html", "cl": 0, "ucl": 199, "cal": 199, "tl": 7092, "cb": 0, "tb": 264, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CoDatatypeDecl", "rp": "DafnyCore_CoDatatypeDecl.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CodeContextWrapper", "rp": "DafnyCore_CodeContextWrapper.html", "cl": 9, "ucl": 8, "cal": 17, "tl": 2573, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CollectionType", "rp": "DafnyCore_CollectionType.html", "cl": 28, "ucl": 8, "cal": 36, "tl": 2889, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CommonOptionBag", "rp": "DafnyCore_CommonOptionBag.html", "cl": 230, "ucl": 32, "cal": 262, "tl": 317, "cb": 4, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CompilationCloner", "rp": "DafnyCore_CompilationCloner.html", "cl": 13, "ucl": 32, "cal": 45, "tl": 963, "cb": 6, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CompilerErrors", "rp": "DafnyCore_CompilerErrors.html", "cl": 0, "ucl": 113, "cal": 113, "tl": 202, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CoverageInstrumenter", "rp": "DafnyCore_CoverageInstrumenter.html", "cl": 17, "ucl": 34, "cal": 51, "tl": 85, "cb": 12, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CppCompiler", "rp": "DafnyCore_CppCompiler.html", "cl": 0, "ucl": 1775, "cal": 1775, "tl": 2454, "cb": 0, "tb": 2252, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CppCompilerBackend", "rp": "DafnyCore_CppCompilerBackend.html", "cl": 3, "ucl": 37, "cal": 40, "tl": 61, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CsharpBackend", "rp": "DafnyCore_CsharpBackend.html", "cl": 78, "ucl": 39, "cal": 117, "tl": 170, "cb": 28, "tb": 76, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CsharpCompiler", "rp": "DafnyCore_CsharpCompiler.html", "cl": 1103, "ucl": 1125, "cal": 2228, "tl": 3237, "cb": 1481, "tb": 3144, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.CsharpSynthesizer", "rp": "DafnyCore_CsharpSynthesizer.html", "cl": 7, "ucl": 178, "cal": 185, "tl": 350, "cb": 0, "tb": 128, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.DafnyBackend", "rp": "DafnyCore_DafnyBackend.html", "cl": 3, "ucl": 22, "cal": 25, "tl": 54, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.DafnyCompiler", "rp": "DafnyCore_DafnyCompiler.html", "cl": 0, "ucl": 420, "cal": 420, "tl": 757, "cb": 0, "tb": 158, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.DatatypeWrapperEraser", "rp": "DafnyCore_DatatypeWrapperEraser.html", "cl": 55, "ucl": 45, "cal": 100, "tl": 190, "cb": 66, "tb": 136, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.ExecutableBackend", "rp": "DafnyCore_ExecutableBackend.html", "cl": 61, "ucl": 62, "cal": 123, "tl": 213, "cb": 24, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.GoBackend", "rp": "DafnyCore_GoBackend.html", "cl": 41, "ucl": 70, "cal": 111, "tl": 187, "cb": 8, "tb": 80, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.GoCompiler", "rp": "DafnyCore_GoCompiler.html", "cl": 1242, "ucl": 1355, "cal": 2597, "tl": 3694, "cb": 1419, "tb": 2992, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.InternalCompilersPluginConfiguration", "rp": "DafnyCore_InternalCompilersPluginConfiguration.html", "cl": 13, "ucl": 0, "cal": 13, "tl": 20, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.JavaBackend", "rp": "DafnyCore_JavaBackend.html", "cl": 77, "ucl": 58, "cal": 135, "tl": 198, "cb": 32, "tb": 80, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.JavaCompiler", "rp": "DafnyCore_JavaCompiler.html", "cl": 1516, "ucl": 1632, "cal": 3148, "tl": 4110, "cb": 1670, "tb": 3574, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.JavaScriptBackend", "rp": "DafnyCore_JavaScriptBackend.html", "cl": 49, "ucl": 10, "cal": 59, "tl": 100, "cb": 10, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "rp": "DafnyCore_JavaScriptCompiler.html", "cl": 820, "ucl": 1014, "cal": 1834, "tl": 2499, "cb": 991, "tb": 2184, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.LibraryBackend", "rp": "DafnyCore_LibraryBackend.html", "cl": 3, "ucl": 45, "cal": 48, "tl": 87, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.PythonBackend", "rp": "DafnyCore_PythonBackend.html", "cl": 32, "ucl": 39, "cal": 71, "tl": 108, "cb": 4, "tb": 36, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.PythonCompiler", "rp": "DafnyCore_PythonCompiler.html", "cl": 618, "ucl": 608, "cal": 1226, "tl": 1764, "cb": 765, "tb": 1516, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Compilers.SinglePassCompiler", "rp": "DafnyCore_SinglePassCompiler.html", "cl": 1473, "ucl": 2224, "cal": 3697, "tl": 5631, "cb": 1306, "tb": 3434, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ComprehensionExpr", "rp": "DafnyCore_ComprehensionExpr.html", "cl": 21, "ucl": 253, "cal": 274, "tl": 500, "cb": 8, "tb": 288, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConcreteSyntaxExpression", "rp": "DafnyCore_ConcreteSyntaxExpression.html", "cl": 20, "ucl": 8, "cal": 28, "tl": 3754, "cb": 24, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConcreteSyntaxTree", "rp": "DafnyCore_ConcreteSyntaxTree.html", "cl": 128, "ucl": 21, "cal": 149, "tl": 225, "cb": 24, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConcreteSyntaxTreeUtils", "rp": "DafnyCore_ConcreteSyntaxTreeUtils.html", "cl": 62, "ucl": 6, "cal": 68, "tl": 105, "cb": 43, "tb": 46, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConcreteUpdateStatement", "rp": "DafnyCore_ConcreteUpdateStatement.html", "cl": 16, "ucl": 7, "cal": 23, "tl": 43, "cb": 14, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConfiguredPlugin", "rp": "DafnyCore_ConfiguredPlugin.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 144, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Cons<T>", "rp": "DafnyCore_Cons_1.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 68, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConsoleErrorReporter", "rp": "DafnyCore_ConsoleErrorReporter.html", "cl": 22, "ucl": 17, "cal": 39, "tl": 263, "cb": 26, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConstantField", "rp": "DafnyCore_ConstantField.html", "cl": 0, "ucl": 27, "cal": 27, "tl": 729, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Constructor", "rp": "DafnyCore_Constructor.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 729, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ConversionExpr", "rp": "DafnyCore_ConversionExpr.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyAction", "rp": "DafnyCore_DafnyAction.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 129, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyCodeActionEdit", "rp": "DafnyCore_DafnyCodeActionEdit.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 129, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyConsolePrinter", "rp": "DafnyCore_DafnyConsolePrinter.html", "cl": 35, "ucl": 48, "cal": 83, "tl": 117, "cb": 12, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyDiagnostic", "rp": "DafnyCore_DafnyDiagnostic.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 263, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyFile", "rp": "DafnyCore_DafnyFile.html", "cl": 33, "ucl": 69, "cal": 102, "tl": 178, "cb": 24, "tb": 92, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyJsonConsolePrinter", "rp": "DafnyCore_DafnyJsonConsolePrinter.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 123, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyMain", "rp": "DafnyCore_DafnyMain.html", "cl": 141, "ucl": 63, "cal": 204, "tl": 344, "cb": 96, "tb": 186, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyOptions", "rp": "DafnyCore_DafnyOptions.html", "cl": 328, "ucl": 941, "cal": 1269, "tl": 1656, "cb": 288, "tb": 880, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyPosition", "rp": "DafnyCore_DafnyPosition.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 129, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyRange", "rp": "DafnyCore_DafnyRange.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 129, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyRelatedInformation", "rp": "DafnyCore_DafnyRelatedInformation.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 263, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeCtor", "rp": "DafnyCore_DatatypeCtor.html", "cl": 10, "ucl": 7, "cal": 17, "tl": 2573, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeDecl", "rp": "DafnyCore_DatatypeDecl.html", "cl": 13, "ucl": 94, "cal": 107, "tl": 2573, "cb": 12, "tb": 160, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeDestructor", "rp": "DafnyCore_DatatypeDestructor.html", "cl": 12, "ucl": 6, "cal": 18, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeDiscriminator", "rp": "DafnyCore_DatatypeDiscriminator.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeUpdateExpr", "rp": "DafnyCore_DatatypeUpdateExpr.html", "cl": 0, "ucl": 39, "cal": 39, "tl": 3754, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DatatypeValue", "rp": "DafnyCore_DatatypeValue.html", "cl": 23, "ucl": 13, "cal": 36, "tl": 3754, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Declaration", "rp": "DafnyCore_Declaration.html", "cl": 59, "ucl": 36, "cal": 95, "tl": 2573, "cb": 32, "tb": 88, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DeepModuleSignatureCloner", "rp": "DafnyCore_DeepModuleSignatureCloner.html", "cl": 5, "ucl": 14, "cal": 19, "tl": 963, "cb": 2, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DefaultClassDecl", "rp": "DafnyCore_DefaultClassDecl.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DefaultModuleDefinition", "rp": "DafnyCore_DefaultModuleDefinition.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DefaultValueExpression", "rp": "DafnyCore_DefaultValueExpression.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DependencyMap", "rp": "DafnyCore_DependencyMap.html", "cl": 0, "ucl": 35, "cal": 35, "tl": 941, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DetectUnderspecificationVisitor", "rp": "DafnyCore_DetectUnderspecificationVisitor.html", "cl": 0, "ucl": 285, "cal": 285, "tl": 589, "cb": 0, "tb": 542, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DeveloperOptionBag", "rp": "DafnyCore_DeveloperOptionBag.html", "cl": 45, "ucl": 3, "cal": 48, "tl": 65, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DiagnosticMessageData", "rp": "DafnyCore_DiagnosticMessageData.html", "cl": 0, "ucl": 77, "cal": 77, "tl": 123, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DisjunctivePattern", "rp": "DafnyCore_DisjunctivePattern.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 39, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DisplayExpression", "rp": "DafnyCore_DisplayExpression.html", "cl": 4, "ucl": 2, "cal": 6, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DividedBlockStmt", "rp": "DafnyCore_DividedBlockStmt.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 38, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DontUseICallable", "rp": "DafnyCore_DontUseICallable.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DPreType", "rp": "DafnyCore_DPreType.html", "cl": 0, "ucl": 82, "cal": 82, "tl": 352, "cb": 0, "tb": 84, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ErrorPlugin", "rp": "DafnyCore_ErrorPlugin.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 144, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ErrorRegistry", "rp": "DafnyCore_ErrorRegistry.html", "cl": 26, "ucl": 43, "cal": 69, "tl": 129, "cb": 12, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ErrorReporter", "rp": "DafnyCore_ErrorReporter.html", "cl": 22, "ucl": 57, "cal": 79, "tl": 263, "cb": 6, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ErrorReporterSink", "rp": "DafnyCore_ErrorReporterSink.html", "cl": 1, "ucl": 11, "cal": 12, "tl": 263, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ErrorReporterWrapper", "rp": "DafnyCore_ErrorReporterWrapper.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 263, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Errors", "rp": "DafnyCore_Errors.html", "cl": 6, "ucl": 328, "cal": 334, "tl": 7227, "cb": 0, "tb": 586, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExistsExpr", "rp": "DafnyCore_ExistsExpr.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExpectContracts", "rp": "DafnyCore_ExpectContracts.html", "cl": 0, "ucl": 181, "cal": 181, "tl": 293, "cb": 0, "tb": 152, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExpectStmt", "rp": "DafnyCore_ExpectStmt.html", "cl": 17, "ucl": 3, "cal": 20, "tl": 39, "cb": 8, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExportSignature", "rp": "DafnyCore_ExportSignature.html", "cl": 0, "ucl": 27, "cal": 27, "tl": 2573, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExprDotName", "rp": "DafnyCore_ExprDotName.html", "cl": 12, "ucl": 2, "cal": 14, "tl": 3754, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Expression", "rp": "DafnyCore_Expression.html", "cl": 115, "ucl": 328, "cal": 443, "tl": 3754, "cb": 86, "tb": 356, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExpressionPair", "rp": "DafnyCore_ExpressionPair.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExpressionTester", "rp": "DafnyCore_ExpressionTester.html", "cl": 136, "ucl": 283, "cal": 419, "tl": 604, "cb": 258, "tb": 812, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExprRhs", "rp": "DafnyCore_ExprRhs.html", "cl": 8, "ucl": 9, "cal": 17, "tl": 1136, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExprSubstituter", "rp": "DafnyCore_ExprSubstituter.html", "cl": 0, "ucl": 52, "cal": 52, "tl": 78, "cb": 0, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtendedPattern", "rp": "DafnyCore_ExtendedPattern.html", "cl": 18, "ucl": 76, "cal": 94, "tl": 166, "cb": 14, "tb": 104, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtremeCloner", "rp": "DafnyCore_ExtremeCloner.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 66, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtremeLemma", "rp": "DafnyCore_ExtremeLemma.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtremeLemmaBodyCloner", "rp": "DafnyCore_ExtremeLemmaBodyCloner.html", "cl": 0, "ucl": 55, "cal": 55, "tl": 109, "cb": 0, "tb": 80, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtremeLemmaSpecificationSubstituter", "rp": "DafnyCore_ExtremeLemmaSpecificationSubstituter.html", "cl": 0, "ucl": 49, "cal": 49, "tl": 84, "cb": 0, "tb": 76, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ExtremePredicate", "rp": "DafnyCore_ExtremePredicate.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FatalError", "rp": "DafnyCore_FatalError.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 7227, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FeatureDescriptionAttribute", "rp": "DafnyCore_FeatureDescriptionAttribute.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 197, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Field", "rp": "DafnyCore_Field.html", "cl": 6, "ucl": 48, "cal": 54, "tl": 729, "cb": 0, "tb": 52, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FileSyntax", "rp": "DafnyCore_FileSyntax.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 21, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ForallCtx", "rp": "DafnyCore_ForallCtx.html", "cl": 1, "ucl": 3, "cal": 4, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ForallExpr", "rp": "DafnyCore_ForallExpr.html", "cl": 2, "ucl": 15, "cal": 17, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ForallStmt", "rp": "DafnyCore_ForallStmt.html", "cl": 0, "ucl": 80, "cal": 80, "tl": 156, "cb": 0, "tb": 60, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ForallStmtRewriter", "rp": "DafnyCore_ForallStmtRewriter.html", "cl": 15, "ucl": 226, "cal": 241, "tl": 334, "cb": 8, "tb": 228, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ForLoopStmt", "rp": "DafnyCore_ForLoopStmt.html", "cl": 22, "ucl": 26, "cal": 48, "tl": 83, "cb": 6, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Formal", "rp": "DafnyCore_Formal.html", "cl": 16, "ucl": 2, "cal": 18, "tl": 1056, "cb": 10, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FrameExpression", "rp": "DafnyCore_FrameExpression.html", "cl": 13, "ucl": 12, "cal": 25, "tl": 3754, "cb": 5, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FreeVariablesUtil", "rp": "DafnyCore_FreeVariablesUtil.html", "cl": 0, "ucl": 133, "cal": 133, "tl": 166, "cb": 0, "tb": 172, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FreshExpr", "rp": "DafnyCore_FreshExpr.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FreshIdGenerator", "rp": "DafnyCore_FreshIdGenerator.html", "cl": 46, "ucl": 0, "cal": 46, "tl": 68, "cb": 12, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Function", "rp": "DafnyCore_Function.html", "cl": 64, "ucl": 240, "cal": 304, "tl": 477, "cb": 14, "tb": 336, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FunctionCallExpr", "rp": "DafnyCore_FunctionCallExpr.html", "cl": 26, "ucl": 32, "cal": 58, "tl": 3754, "cb": 6, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FunctionCallSubstituter", "rp": "DafnyCore_FunctionCallSubstituter.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 42, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.GhostInterestVisitor", "rp": "DafnyCore_GhostInterestVisitor.html", "cl": 198, "ucl": 250, "cal": 448, "tl": 579, "cb": 349, "tb": 892, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Graph<T>", "rp": "DafnyCore_Graph_1.html", "cl": 156, "ucl": 108, "cal": 264, "tl": 464, "cb": 94, "tb": 192, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.GreatestLemma", "rp": "DafnyCore_GreatestLemma.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.GreatestPredicate", "rp": "DafnyCore_GreatestPredicate.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.GuardedAlternative", "rp": "DafnyCore_GuardedAlternative.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 1136, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.HavocRhs", "rp": "DafnyCore_HavocRhs.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.HoleCtx", "rp": "DafnyCore_HoleCtx.html", "cl": 4, "ucl": 6, "cal": 10, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ICommandSpec", "rp": "DafnyCore_ICommandSpec.html", "cl": 66, "ucl": 2, "cal": 68, "tl": 96, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IdCtx", "rp": "DafnyCore_IdCtx.html", "cl": 11, "ucl": 38, "cal": 49, "tl": 425, "cb": 2, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IdentifierExpr", "rp": "DafnyCore_IdentifierExpr.html", "cl": 18, "ucl": 9, "cal": 27, "tl": 3754, "cb": 4, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IdPattern", "rp": "DafnyCore_IdPattern.html", "cl": 55, "ucl": 74, "cal": 129, "tl": 187, "cb": 48, "tb": 132, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IEnumerableComparer<T>", "rp": "DafnyCore_IEnumerableComparer_1.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 941, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IfStmt", "rp": "DafnyCore_IfStmt.html", "cl": 33, "ucl": 19, "cal": 52, "tl": 89, "cb": 10, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IllegalDafnyFile", "rp": "DafnyCore_IllegalDafnyFile.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 344, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ImplicitFormal", "rp": "DafnyCore_ImplicitFormal.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ImplicitIdentifierExpr", "rp": "DafnyCore_ImplicitIdentifierExpr.html", "cl": 1, "ucl": 2, "cal": 3, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ImplicitThisExpr", "rp": "DafnyCore_ImplicitThisExpr.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ImplicitThisExpr_ConstructorCall", "rp": "DafnyCore_ImplicitThisExpr_ConstructorCall.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Include", "rp": "DafnyCore_Include.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 1056, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IncludedLemmaBodyRemover", "rp": "DafnyCore_IncludedLemmaBodyRemover.html", "cl": 9, "ucl": 3, "cal": 12, "tl": 30, "cb": 12, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IncludeHandler", "rp": "DafnyCore_IncludeHandler.html", "cl": 11, "ucl": 2, "cal": 13, "tl": 28, "cb": 8, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IndDatatypeDecl", "rp": "DafnyCore_IndDatatypeDecl.html", "cl": 7, "ucl": 1, "cal": 8, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IndentationFormatter", "rp": "DafnyCore_IndentationFormatter.html", "cl": 0, "ucl": 163, "cal": 163, "tl": 332, "cb": 0, "tb": 184, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InductionHeuristic", "rp": "DafnyCore_InductionHeuristic.html", "cl": 0, "ucl": 99, "cal": 99, "tl": 175, "cb": 0, "tb": 192, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InductionRewriter", "rp": "DafnyCore_InductionRewriter.html", "cl": 40, "ucl": 104, "cal": 144, "tl": 208, "cb": 42, "tb": 232, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InferDecreasesClause", "rp": "DafnyCore_InferDecreasesClause.html", "cl": 53, "ucl": 96, "cal": 149, "tl": 214, "cb": 66, "tb": 164, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InferredTypeProxy", "rp": "DafnyCore_InferredTypeProxy.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InternalDocstringRewritersPluginConfiguration", "rp": "DafnyCore_InternalDocstringRewritersPluginConfiguration.html", "cl": 2, "ucl": 8, "cal": 10, "tl": 19, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.InternalTypeSynonymDecl", "rp": "DafnyCore_InternalTypeSynonymDecl.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IntType", "rp": "DafnyCore_IntType.html", "cl": 10, "ucl": 1, "cal": 11, "tl": 2889, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IntVarietiesSupertype", "rp": "DafnyCore_IntVarietiesSupertype.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 2889, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IRewriter", "rp": "DafnyCore_IRewriter.html", "cl": 19, "ucl": 1, "cal": 20, "tl": 126, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ITEExpr", "rp": "DafnyCore_ITEExpr.html", "cl": 12, "ucl": 54, "cal": 66, "tl": 3754, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IteratorDecl", "rp": "DafnyCore_IteratorDecl.html", "cl": 0, "ucl": 353, "cal": 353, "tl": 498, "cb": 0, "tb": 180, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IToken", "rp": "DafnyCore_IToken.html", "cl": 1, "ucl": 4, "cal": 5, "tl": 374, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IVariable", "rp": "DafnyCore_IVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.IVariableContracts", "rp": "DafnyCore_IVariableContracts.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.JavadocLikeDocstringRewriter", "rp": "DafnyCore_JavadocLikeDocstringRewriter.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 56, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.JsonConsoleErrorReporter", "rp": "DafnyCore_JsonConsoleErrorReporter.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 123, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Label", "rp": "DafnyCore_Label.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 1136, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LambdaExpr", "rp": "DafnyCore_LambdaExpr.html", "cl": 0, "ucl": 58, "cal": 58, "tl": 3754, "cb": 0, "tb": 52, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LeastLemma", "rp": "DafnyCore_LeastLemma.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LeastPredicate", "rp": "DafnyCore_LeastPredicate.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LeftMargin", "rp": "DafnyCore_LeftMargin.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 262, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LegacyUiForOption", "rp": "DafnyCore_LegacyUiForOption.html", "cl": 8, "ucl": 27, "cal": 35, "tl": 44, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Lemma", "rp": "DafnyCore_Lemma.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LetExpr", "rp": "DafnyCore_LetExpr.html", "cl": 0, "ucl": 84, "cal": 84, "tl": 133, "cb": 0, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LetOrFailExpr", "rp": "DafnyCore_LetOrFailExpr.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 3754, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LineSegment", "rp": "DafnyCore_LineSegment.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 24, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LinkedListEnumerator<T>", "rp": "DafnyCore_LinkedListEnumerator_1.html", "cl": 11, "ucl": 4, "cal": 15, "tl": 68, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LinkedLists", "rp": "DafnyCore_LinkedLists.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 68, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LitCtx", "rp": "DafnyCore_LitCtx.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LiteralExpr", "rp": "DafnyCore_LiteralExpr.html", "cl": 21, "ucl": 9, "cal": 30, "tl": 3754, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LiteralModuleDecl", "rp": "DafnyCore_LiteralModuleDecl.html", "cl": 5, "ucl": 45, "cal": 50, "tl": 2573, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LitPattern", "rp": "DafnyCore_LitPattern.html", "cl": 36, "ucl": 1, "cal": 37, "tl": 87, "cb": 14, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LList<T>", "rp": "DafnyCore_LList_1.html", "cl": 4, "ucl": 13, "cal": 17, "tl": 1136, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LocalLinter", "rp": "DafnyCore_LocalLinter.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 64, "cb": 8, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LocalVariable", "rp": "DafnyCore_LocalVariable.html", "cl": 45, "ucl": 13, "cal": 58, "tl": 1136, "cb": 26, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LoopStmt", "rp": "DafnyCore_LoopStmt.html", "cl": 35, "ucl": 14, "cal": 49, "tl": 88, "cb": 30, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MapComprehension", "rp": "DafnyCore_MapComprehension.html", "cl": 0, "ucl": 30, "cal": 30, "tl": 3754, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MapDisplayExpr", "rp": "DafnyCore_MapDisplayExpr.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 3754, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MapType", "rp": "DafnyCore_MapType.html", "cl": 30, "ucl": 19, "cal": 49, "tl": 2889, "cb": 24, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchCase", "rp": "DafnyCore_MatchCase.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchCaseExpr", "rp": "DafnyCore_MatchCaseExpr.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchCaseStmt", "rp": "DafnyCore_MatchCaseStmt.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchExpr", "rp": "DafnyCore_MatchExpr.html", "cl": 0, "ucl": 44, "cal": 44, "tl": 425, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchFlattener", "rp": "DafnyCore_MatchFlattener.html", "cl": 274, "ucl": 217, "cal": 491, "tl": 768, "cb": 218, "tb": 448, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchingContext", "rp": "DafnyCore_MatchingContext.html", "cl": 3, "ucl": 6, "cal": 9, "tl": 425, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MatchStmt", "rp": "DafnyCore_MatchStmt.html", "cl": 0, "ucl": 50, "cal": 50, "tl": 425, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MemberDecl", "rp": "DafnyCore_MemberDecl.html", "cl": 25, "ucl": 25, "cal": 50, "tl": 729, "cb": 20, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MemberSelectExpr", "rp": "DafnyCore_MemberSelectExpr.html", "cl": 73, "ucl": 78, "cal": 151, "tl": 302, "cb": 56, "tb": 104, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MergeOrdered<T>", "rp": "DafnyCore_MergeOrdered_1.html", "cl": 0, "ucl": 52, "cal": 52, "tl": 86, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Method", "rp": "DafnyCore_Method.html", "cl": 116, "ucl": 107, "cal": 223, "tl": 355, "cb": 82, "tb": 248, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MethodCallInformation", "rp": "DafnyCore_MethodCallInformation.html", "cl": 5, "ucl": 2, "cal": 7, "tl": 6714, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModifyStmt", "rp": "DafnyCore_ModifyStmt.html", "cl": 0, "ucl": 48, "cal": 48, "tl": 79, "cb": 0, "tb": 60, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModuleDecl", "rp": "DafnyCore_ModuleDecl.html", "cl": 6, "ucl": 27, "cal": 33, "tl": 2573, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModuleDefinition", "rp": "DafnyCore_ModuleDefinition.html", "cl": 146, "ucl": 84, "cal": 230, "tl": 2573, "cb": 142, "tb": 276, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModuleExportDecl", "rp": "DafnyCore_ModuleExportDecl.html", "cl": 0, "ucl": 53, "cal": 53, "tl": 2573, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModuleQualifiedId", "rp": "DafnyCore_ModuleQualifiedId.html", "cl": 0, "ucl": 52, "cal": 52, "tl": 2573, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ModuleSignature", "rp": "DafnyCore_ModuleSignature.html", "cl": 11, "ucl": 9, "cal": 20, "tl": 2573, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MultiSelectExpr", "rp": "DafnyCore_MultiSelectExpr.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MultiSetDisplayExpr", "rp": "DafnyCore_MultiSetDisplayExpr.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MultiSetFormingExpr", "rp": "DafnyCore_MultiSetFormingExpr.html", "cl": 5, "ucl": 2, "cal": 7, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MultiSetType", "rp": "DafnyCore_MultiSetType.html", "cl": 18, "ucl": 6, "cal": 24, "tl": 2889, "cb": 6, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Name", "rp": "DafnyCore_Name.html", "cl": 18, "ucl": 9, "cal": 27, "tl": 50, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NameSegment", "rp": "DafnyCore_NameSegment.html", "cl": 11, "ucl": 8, "cal": 19, "tl": 3754, "cb": 4, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NativeType", "rp": "DafnyCore_NativeType.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NegationExpression", "rp": "DafnyCore_NegationExpression.html", "cl": 18, "ucl": 3, "cal": 21, "tl": 3754, "cb": 8, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedMatchCase", "rp": "DafnyCore_NestedMatchCase.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 18, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedMatchCaseExpr", "rp": "DafnyCore_NestedMatchCaseExpr.html", "cl": 16, "ucl": 1, "cal": 17, "tl": 39, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedMatchCaseStmt", "rp": "DafnyCore_NestedMatchCaseStmt.html", "cl": 28, "ucl": 6, "cal": 34, "tl": 59, "cb": 12, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedMatchExpr", "rp": "DafnyCore_NestedMatchExpr.html", "cl": 53, "ucl": 11, "cal": 64, "tl": 104, "cb": 30, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedMatchStmt", "rp": "DafnyCore_NestedMatchStmt.html", "cl": 70, "ucl": 18, "cal": 88, "tl": 133, "cb": 40, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NestedToken", "rp": "DafnyCore_NestedToken.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 374, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NewLine", "rp": "DafnyCore_NewLine.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 11, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NewtypeDecl", "rp": "DafnyCore_NewtypeDecl.html", "cl": 0, "ucl": 65, "cal": 65, "tl": 2573, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Nil<T>", "rp": "DafnyCore_Nil_1.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 68, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NoContext", "rp": "DafnyCore_NoContext.html", "cl": 3, "ucl": 8, "cal": 11, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Node", "rp": "DafnyCore_Node.html", "cl": 28, "ucl": 136, "cal": 164, "tl": 364, "cb": 32, "tb": 164, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NonglobalVariable", "rp": "DafnyCore_NonglobalVariable.html", "cl": 53, "ucl": 15, "cal": 68, "tl": 1056, "cb": 48, "tb": 68, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NonNullTypeDecl", "rp": "DafnyCore_NonNullTypeDecl.html", "cl": 16, "ucl": 4, "cal": 20, "tl": 2573, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.OldExpr", "rp": "DafnyCore_OldExpr.html", "cl": 0, "ucl": 23, "cal": 23, "tl": 47, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.OneBodyLoopStmt", "rp": "DafnyCore_OneBodyLoopStmt.html", "cl": 18, "ucl": 43, "cal": 61, "tl": 92, "cb": 12, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.OpaqueMemberRewriter", "rp": "DafnyCore_OpaqueMemberRewriter.html", "cl": 20, "ucl": 77, "cal": 97, "tl": 157, "cb": 20, "tb": 88, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Options", "rp": "DafnyCore_Options.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 1656, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ParamTypeProxy", "rp": "DafnyCore_ParamTypeProxy.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 2889, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ParensExpression", "rp": "DafnyCore_ParensExpression.html", "cl": 9, "ucl": 10, "cal": 19, "tl": 3754, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ParseErrors", "rp": "DafnyCore_ParseErrors.html", "cl": 308, "ucl": 0, "cal": 308, "tl": 424, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Parser", "rp": "DafnyCore_Parser.html", "cl": 2125, "ucl": 3306, "cal": 5431, "tl": 7227, "cb": 1659, "tb": 5472, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PluginRewriter", "rp": "DafnyCore_PluginRewriter.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 17, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Plugins.DocstringRewriter", "rp": "DafnyCore_DocstringRewriter.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 19, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Plugins.IExecutableBackend", "rp": "DafnyCore_IExecutableBackend.html", "cl": 11, "ucl": 5, "cal": 16, "tl": 163, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Plugins.PluginConfiguration", "rp": "DafnyCore_PluginConfiguration.html", "cl": 6, "ucl": 5, "cal": 11, "tl": 51, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Plugins.Rewriter", "rp": "DafnyCore_Rewriter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 56, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrecedenceLinter", "rp": "DafnyCore_PrecedenceLinter.html", "cl": 13, "ucl": 0, "cal": 13, "tl": 262, "cb": 12, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrecedenceLinterVisitor", "rp": "DafnyCore_PrecedenceLinterVisitor.html", "cl": 106, "ucl": 38, "cal": 144, "tl": 262, "cb": 140, "tb": 192, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Predicate", "rp": "DafnyCore_Predicate.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PredicateStmt", "rp": "DafnyCore_PredicateStmt.html", "cl": 6, "ucl": 5, "cal": 11, "tl": 29, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrefixCallSubstituter", "rp": "DafnyCore_PrefixCallSubstituter.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 28, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrefixLemma", "rp": "DafnyCore_PrefixLemma.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrefixPredicate", "rp": "DafnyCore_PrefixPredicate.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PreType", "rp": "DafnyCore_PreType.html", "cl": 0, "ucl": 80, "cal": 80, "tl": 352, "cb": 0, "tb": 116, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PreTypePlaceholder", "rp": "DafnyCore_PreTypePlaceholder.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 352, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PreTypeProxy", "rp": "DafnyCore_PreTypeProxy.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 352, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PreTypeResolver", "rp": "DafnyCore_PreTypeResolver.html", "cl": 0, "ucl": 205, "cal": 205, "tl": 362, "cb": 0, "tb": 232, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PreTypeToTypeVisitor", "rp": "DafnyCore_PreTypeToTypeVisitor.html", "cl": 0, "ucl": 125, "cal": 125, "tl": 180, "cb": 0, "tb": 240, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrintEffectEnforcement", "rp": "DafnyCore_PrintEffectEnforcement.html", "cl": 24, "ucl": 45, "cal": 69, "tl": 86, "cb": 38, "tb": 132, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Printer", "rp": "DafnyCore_Printer.html", "cl": 912, "ucl": 1653, "cal": 2565, "tl": 3095, "cb": 1016, "tb": 2962, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.PrintStmt", "rp": "DafnyCore_PrintStmt.html", "cl": 25, "ucl": 6, "cal": 31, "tl": 57, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProduceStmt", "rp": "DafnyCore_ProduceStmt.html", "cl": 34, "ucl": 13, "cal": 47, "tl": 1136, "cb": 52, "tb": 72, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Program", "rp": "DafnyCore_Program.html", "cl": 25, "ucl": 21, "cal": 46, "tl": 1056, "cb": 4, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProgramTraverser", "rp": "DafnyCore_ProgramTraverser.html", "cl": 75, "ucl": 95, "cal": 170, "tl": 941, "cb": 100, "tb": 304, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProjectFile", "rp": "DafnyCore_ProjectFile.html", "cl": 0, "ucl": 90, "cal": 90, "tl": 139, "cb": 0, "tb": 76, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.AlternativeIsComplete", "rp": "DafnyCore_AlternativeIsComplete.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ArrayInitEmpty", "rp": "DafnyCore_ArrayInitEmpty.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ArrayInitSizeValid", "rp": "DafnyCore_ArrayInitSizeValid.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.AssertStatement", "rp": "DafnyCore_AssertStatement.html", "cl": 4, "ucl": 4, "cal": 8, "tl": 1073, "cb": 1, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.AssignmentShrinks", "rp": "DafnyCore_AssignmentShrinks.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.BoilerplateTriple", "rp": "DafnyCore_BoilerplateTriple.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.CalculationStep", "rp": "DafnyCore_CalculationStep.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.CharOverflow", "rp": "DafnyCore_CharOverflow.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.CharUnderflow", "rp": "DafnyCore_CharUnderflow.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ComprehensionNoAlias", "rp": "DafnyCore_ComprehensionNoAlias.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ConversionFit", "rp": "DafnyCore_ConversionFit.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ConversionIsNatural", "rp": "DafnyCore_ConversionIsNatural.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ConversionPositive", "rp": "DafnyCore_ConversionPositive.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ConversionSatisfiesConstraints", "rp": "DafnyCore_ConversionSatisfiesConstraints.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.DecreasesBoundedBelow", "rp": "DafnyCore_DecreasesBoundedBelow.html", "cl": 6, "ucl": 4, "cal": 10, "tl": 1073, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.DefiniteAssignment", "rp": "DafnyCore_DefiniteAssignment.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.DestructorValid", "rp": "DafnyCore_DestructorValid.html", "cl": 4, "ucl": 3, "cal": 7, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.DistinctLHS", "rp": "DafnyCore_DistinctLHS.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 1073, "cb": 6, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.DivisorNonZero", "rp": "DafnyCore_DivisorNonZero.html", "cl": 4, "ucl": 5, "cal": 9, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ElementInDomain", "rp": "DafnyCore_ElementInDomain.html", "cl": 4, "ucl": 9, "cal": 13, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.EnsuresStronger", "rp": "DafnyCore_EnsuresStronger.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ForallLHSUnique", "rp": "DafnyCore_ForallLHSUnique.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ForallPostcondition", "rp": "DafnyCore_ForallPostcondition.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ForRangeAssignable", "rp": "DafnyCore_ForRangeAssignable.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ForRangeBoundsValid", "rp": "DafnyCore_ForRangeBoundsValid.html", "cl": 1, "ucl": 2, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.FrameDereferenceNonNull", "rp": "DafnyCore_FrameDereferenceNonNull.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.FrameSubset", "rp": "DafnyCore_FrameSubset.html", "cl": 4, "ucl": 7, "cal": 11, "tl": 1073, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.FunctionContractOverride", "rp": "DafnyCore_FunctionContractOverride.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 1073, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.IndicesInDomain", "rp": "DafnyCore_IndicesInDomain.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.InRange", "rp": "DafnyCore_InRange.html", "cl": 8, "ucl": 21, "cal": 29, "tl": 1073, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.IsAllocated", "rp": "DafnyCore_IsAllocated.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 1073, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.IsInteger", "rp": "DafnyCore_IsInteger.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.IsNonRecursive", "rp": "DafnyCore_IsNonRecursive.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.IsOlderProofObligation", "rp": "DafnyCore_IsOlderProofObligation.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 1073, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.LetSuchThatExists", "rp": "DafnyCore_LetSuchThatExists.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.LetSuchThatUnique", "rp": "DafnyCore_LetSuchThatUnique.html", "cl": 0, "ucl": 29, "cal": 29, "tl": 1073, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.LoopInvariant", "rp": "DafnyCore_LoopInvariant.html", "cl": 4, "ucl": 4, "cal": 8, "tl": 1073, "cb": 4, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.MatchIsComplete", "rp": "DafnyCore_MatchIsComplete.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.Modifiable", "rp": "DafnyCore_Modifiable.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.NonNegative", "rp": "DafnyCore_NonNegative.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.NonNull", "rp": "DafnyCore_NonNull.html", "cl": 4, "ucl": 5, "cal": 9, "tl": 1073, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.NotGhostVariant", "rp": "DafnyCore_NotGhostVariant.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.OrdinalSubtractionIsNatural", "rp": "DafnyCore_OrdinalSubtractionIsNatural.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.OrdinalSubtractionUnderflow", "rp": "DafnyCore_OrdinalSubtractionUnderflow.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.PatternShapeIsValid", "rp": "DafnyCore_PatternShapeIsValid.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.PreconditionSatisfied", "rp": "DafnyCore_PreconditionSatisfied.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 1073, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.PrefixEqualityLimit", "rp": "DafnyCore_PrefixEqualityLimit.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ProofObligationDescriptionWithNoExpr", "rp": "DafnyCore_ProofObligationDescriptionWithNoExpr.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.RequiresWeaker", "rp": "DafnyCore_RequiresWeaker.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.SequenceSelectRangeValid", "rp": "DafnyCore_SequenceSelectRangeValid.html", "cl": 6, "ucl": 13, "cal": 19, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ShiftLowerBound", "rp": "DafnyCore_ShiftLowerBound.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ShiftUpperBound", "rp": "DafnyCore_ShiftUpperBound.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.SubrangeCheck", "rp": "DafnyCore_SubrangeCheck.html", "cl": 8, "ucl": 9, "cal": 17, "tl": 1073, "cb": 4, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.Terminates", "rp": "DafnyCore_Terminates.html", "cl": 5, "ucl": 7, "cal": 12, "tl": 1073, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.TraitDecreases", "rp": "DafnyCore_TraitDecreases.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.TraitFrame", "rp": "DafnyCore_TraitFrame.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 1073, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ValidConstructorNames", "rp": "DafnyCore_ValidConstructorNames.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.ValidInRecursion", "rp": "DafnyCore_ValidInRecursion.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.WitnessCheck", "rp": "DafnyCore_WitnessCheck.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 1073, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProofObligationDescription.YieldEnsures", "rp": "DafnyCore_YieldEnsures.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 1073, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ProvideRevealAllRewriter", "rp": "DafnyCore_ProvideRevealAllRewriter.html", "cl": 8, "ucl": 34, "cal": 42, "tl": 62, "cb": 6, "tb": 96, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifiedVar", "rp": "DafnyCore_QuantifiedVar.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 1056, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifiedVariableDomainCloner", "rp": "DafnyCore_QuantifiedVariableDomainCloner.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifiedVariableDomainToken", "rp": "DafnyCore_QuantifiedVariableDomainToken.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 374, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifiedVariableRangeCloner", "rp": "DafnyCore_QuantifiedVariableRangeCloner.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifiedVariableRangeToken", "rp": "DafnyCore_QuantifiedVariableRangeToken.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 374, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifierExpr", "rp": "DafnyCore_QuantifierExpr.html", "cl": 17, "ucl": 54, "cal": 71, "tl": 112, "cb": 6, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.QuantifierSplittingRewriter", "rp": "DafnyCore_QuantifierSplittingRewriter.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 17, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RangeNode", "rp": "DafnyCore_RangeNode.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 364, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RangeToken", "rp": "DafnyCore_RangeToken.html", "cl": 6, "ucl": 47, "cal": 53, "tl": 374, "cb": 2, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RealType", "rp": "DafnyCore_RealType.html", "cl": 10, "ucl": 1, "cal": 11, "tl": 2889, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RealVarietiesSupertype", "rp": "DafnyCore_RealVarietiesSupertype.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 2889, "cb": 2, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RefinedWhileStmt", "rp": "DafnyCore_RefinedWhileStmt.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RefinementCloner", "rp": "DafnyCore_RefinementCloner.html", "cl": 0, "ucl": 48, "cal": 48, "tl": 1716, "cb": 0, "tb": 36, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RefinementToken", "rp": "DafnyCore_RefinementToken.html", "cl": 6, "ucl": 18, "cal": 24, "tl": 1716, "cb": 6, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RefinementTransformer", "rp": "DafnyCore_RefinementTransformer.html", "cl": 30, "ucl": 1147, "cal": 1177, "tl": 1716, "cb": 24, "tb": 1600, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolutionContext", "rp": "DafnyCore_ResolutionContext.html", "cl": 37, "ucl": 2, "cal": 39, "tl": 41, "cb": 24, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolutionErrors", "rp": "DafnyCore_ResolutionErrors.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 27, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Resolver", "rp": "DafnyCore_Resolver.html", "cl": 4311, "ucl": 6278, "cal": 10589, "tl": 15049, "cb": 5142, "tb": 13836, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Resolver_IdentifierExpr", "rp": "DafnyCore_Resolver_IdentifierExpr.html", "cl": 9, "ucl": 27, "cal": 36, "tl": 3754, "cb": 4, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolverBottomUpVisitor", "rp": "DafnyCore_ResolverBottomUpVisitor.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 11, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolverPass", "rp": "DafnyCore_ResolverPass.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 362, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolverTopDownVisitor<T>", "rp": "DafnyCore_ResolverTopDownVisitor_1.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 7092, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ReturnStmt", "rp": "DafnyCore_ReturnStmt.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 21, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RevealableTypeDeclHelper", "rp": "DafnyCore_RevealableTypeDeclHelper.html", "cl": 4, "ucl": 2, "cal": 6, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RevealStmt", "rp": "DafnyCore_RevealStmt.html", "cl": 0, "ucl": 28, "cal": 28, "tl": 1136, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RunAllTestsMainMethod", "rp": "DafnyCore_RunAllTestsMainMethod.html", "cl": 0, "ucl": 106, "cal": 106, "tl": 236, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Scanner", "rp": "DafnyCore_Scanner.html", "cl": 364, "ucl": 309, "cal": 673, "tl": 1135, "cb": 1414, "tb": 3562, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Scope<T>", "rp": "DafnyCore_Scope_1.html", "cl": 55, "ucl": 8, "cal": 63, "tl": 107, "cb": 32, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ScopeCloner", "rp": "DafnyCore_ScopeCloner.html", "cl": 0, "ucl": 105, "cal": 105, "tl": 963, "cb": 0, "tb": 88, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SelfType", "rp": "DafnyCore_SelfType.html", "cl": 3, "ucl": 17, "cal": 20, "tl": 2889, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SeqConstructionExpr", "rp": "DafnyCore_SeqConstructionExpr.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 3754, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SeqDisplayExpr", "rp": "DafnyCore_SeqDisplayExpr.html", "cl": 2, "ucl": 3, "cal": 5, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SeqSelectExpr", "rp": "DafnyCore_SeqSelectExpr.html", "cl": 19, "ucl": 2, "cal": 21, "tl": 3754, "cb": 12, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SeqType", "rp": "DafnyCore_SeqType.html", "cl": 20, "ucl": 4, "cal": 24, "tl": 2889, "cb": 12, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SeqUpdateExpr", "rp": "DafnyCore_SeqUpdateExpr.html", "cl": 10, "ucl": 2, "cal": 12, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SetComprehension", "rp": "DafnyCore_SetComprehension.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 3754, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SetDisplayExpr", "rp": "DafnyCore_SetDisplayExpr.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SetType", "rp": "DafnyCore_SetType.html", "cl": 22, "ucl": 5, "cal": 27, "tl": 2889, "cb": 18, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SinglyLinkedList<T>", "rp": "DafnyCore_SinglyLinkedList_1.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 68, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SkeletonStatement", "rp": "DafnyCore_SkeletonStatement.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 1136, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SourcePreprocessor", "rp": "DafnyCore_SourcePreprocessor.html", "cl": 40, "ucl": 70, "cal": 110, "tl": 201, "cb": 30, "tb": 108, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SpecialField", "rp": "DafnyCore_SpecialField.html", "cl": 12, "ucl": 3, "cal": 15, "tl": 729, "cb": 4, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SpecialFunction", "rp": "DafnyCore_SpecialFunction.html", "cl": 4, "ucl": 1, "cal": 5, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Specification<T>", "rp": "DafnyCore_Specification_1.html", "cl": 9, "ucl": 3, "cal": 12, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Statement", "rp": "DafnyCore_Statement.html", "cl": 41, "ucl": 44, "cal": 85, "tl": 1136, "cb": 20, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.StaticReceiverExpr", "rp": "DafnyCore_StaticReceiverExpr.html", "cl": 21, "ucl": 17, "cal": 38, "tl": 97, "cb": 8, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.StmtExpr", "rp": "DafnyCore_StmtExpr.html", "cl": 0, "ucl": 35, "cal": 35, "tl": 3754, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.StringLiteralExpr", "rp": "DafnyCore_StringLiteralExpr.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SubsetConstraintGhostChecker", "rp": "DafnyCore_SubsetConstraintGhostChecker.html", "cl": 23, "ucl": 63, "cal": 86, "tl": 120, "cb": 58, "tb": 168, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SubsetTypeDecl", "rp": "DafnyCore_SubsetTypeDecl.html", "cl": 15, "ucl": 1, "cal": 16, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Substituter", "rp": "DafnyCore_Substituter.html", "cl": 76, "ucl": 796, "cal": 872, "tl": 1085, "cb": 74, "tb": 1032, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SubstitutingCloner", "rp": "DafnyCore_SubstitutingCloner.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 23, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.SuffixExpr", "rp": "DafnyCore_SuffixExpr.html", "cl": 12, "ucl": 8, "cal": 20, "tl": 3754, "cb": 6, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TailRecursion", "rp": "DafnyCore_TailRecursion.html", "cl": 115, "ucl": 359, "cal": 474, "tl": 675, "cb": 178, "tb": 716, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TernaryExpr", "rp": "DafnyCore_TernaryExpr.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TestGenerationOptions", "rp": "DafnyCore_TestGenerationOptions.html", "cl": 13, "ucl": 52, "cal": 65, "tl": 96, "cb": 26, "tb": 92, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ThisExpr", "rp": "DafnyCore_ThisExpr.html", "cl": 2, "ucl": 6, "cal": 8, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ThisSurrogate", "rp": "DafnyCore_ThisSurrogate.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TimeLimitRewriter", "rp": "DafnyCore_TimeLimitRewriter.html", "cl": 13, "ucl": 26, "cal": 39, "tl": 56, "cb": 20, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Token", "rp": "DafnyCore_Token.html", "cl": 36, "ucl": 6, "cal": 42, "tl": 374, "cb": 4, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TokenExtensions", "rp": "DafnyCore_TokenExtensions.html", "cl": 18, "ucl": 5, "cal": 23, "tl": 374, "cb": 18, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TokenNewIndentCollector", "rp": "DafnyCore_TokenNewIndentCollector.html", "cl": 0, "ucl": 702, "cal": 702, "tl": 1138, "cb": 0, "tb": 1272, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TokenNode", "rp": "DafnyCore_TokenNode.html", "cl": 37, "ucl": 2, "cal": 39, "tl": 364, "cb": 40, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TokenWrapper", "rp": "DafnyCore_TokenWrapper.html", "cl": 4, "ucl": 22, "cal": 26, "tl": 374, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TopDownVisitor<T>", "rp": "DafnyCore_TopDownVisitor_1.html", "cl": 57, "ucl": 15, "cal": 72, "tl": 1056, "cb": 30, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TopLevelDecl", "rp": "DafnyCore_TopLevelDecl.html", "cl": 27, "ucl": 26, "cal": 53, "tl": 2573, "cb": 12, "tb": 52, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TopLevelDeclWithMembers", "rp": "DafnyCore_TopLevelDeclWithMembers.html", "cl": 16, "ucl": 59, "cal": 75, "tl": 2573, "cb": 6, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TraitDecl", "rp": "DafnyCore_TraitDecl.html", "cl": 1, "ucl": 12, "cal": 13, "tl": 2573, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Translator", "rp": "DafnyCore_Translator.html", "cl": 5085, "ucl": 8269, "cal": 13354, "tl": 19782, "cb": 4271, "tb": 11328, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TriggerGeneratingRewriter", "rp": "DafnyCore_TriggerGeneratingRewriter.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 23, "cb": 6, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.DeduplicateExtension", "rp": "DafnyCore_DeduplicateExtension.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 536, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.ExprExtensions", "rp": "DafnyCore_ExprExtensions.html", "cl": 0, "ucl": 363, "cal": 363, "tl": 536, "cb": 0, "tb": 588, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.MatchingLoopRewriter", "rp": "DafnyCore_MatchingLoopRewriter.html", "cl": 0, "ucl": 35, "cal": 35, "tl": 195, "cb": 0, "tb": 36, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.QuantifierCollector", "rp": "DafnyCore_QuantifierCollector.html", "cl": 17, "ucl": 30, "cal": 47, "tl": 73, "cb": 12, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.QuantifiersCollection", "rp": "DafnyCore_QuantifiersCollection.html", "cl": 0, "ucl": 241, "cal": 241, "tl": 369, "cb": 0, "tb": 216, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.QuantifierSplitter", "rp": "DafnyCore_QuantifierSplitter.html", "cl": 13, "ucl": 85, "cal": 98, "tl": 195, "cb": 18, "tb": 164, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.QuantifierWithTriggers", "rp": "DafnyCore_QuantifierWithTriggers.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 369, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerAnnotation", "rp": "DafnyCore_TriggerAnnotation.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 468, "cb": 0, "tb": 24, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerAnnotationsCache", "rp": "DafnyCore_TriggerAnnotationsCache.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 468, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerCandidate", "rp": "DafnyCore_TriggerCandidate.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 468, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerMatch", "rp": "DafnyCore_TriggerMatch.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 536, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggersCollector", "rp": "DafnyCore_TriggersCollector.html", "cl": 4, "ucl": 200, "cal": 204, "tl": 468, "cb": 0, "tb": 298, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerTerm", "rp": "DafnyCore_TriggerTerm.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 468, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Triggers.TriggerUtils", "rp": "DafnyCore_TriggerUtils.html", "cl": 0, "ucl": 192, "cal": 192, "tl": 296, "cb": 0, "tb": 160, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TriviaFormatterHelper", "rp": "DafnyCore_TriviaFormatterHelper.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 32, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TryRecoverStatement", "rp": "DafnyCore_TryRecoverStatement.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TupleTypeDecl", "rp": "DafnyCore_TupleTypeDecl.html", "cl": 52, "ucl": 1, "cal": 53, "tl": 89, "cb": 34, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TwoStateFunction", "rp": "DafnyCore_TwoStateFunction.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TwoStateLemma", "rp": "DafnyCore_TwoStateLemma.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TwoStatePredicate", "rp": "DafnyCore_TwoStatePredicate.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 729, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Type", "rp": "DafnyCore_Type.html", "cl": 651, "ucl": 472, "cal": 1123, "tl": 2889, "cb": 768, "tb": 1616, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeConstraint", "rp": "DafnyCore_TypeConstraint.html", "cl": 51, "ucl": 46, "cal": 97, "tl": 116, "cb": 2, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeDeclSynonymInfo", "rp": "DafnyCore_TypeDeclSynonymInfo.html", "cl": 6, "ucl": 3, "cal": 9, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeParameter", "rp": "DafnyCore_TypeParameter.html", "cl": 73, "ucl": 50, "cal": 123, "tl": 2573, "cb": 42, "tb": 100, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeProxy", "rp": "DafnyCore_TypeProxy.html", "cl": 116, "ucl": 26, "cal": 142, "tl": 2889, "cb": 134, "tb": 176, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeRhs", "rp": "DafnyCore_TypeRhs.html", "cl": 55, "ucl": 39, "cal": 94, "tl": 1136, "cb": 38, "tb": 92, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeSynonymDecl", "rp": "DafnyCore_TypeSynonymDecl.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 2573, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeSynonymDeclBase", "rp": "DafnyCore_TypeSynonymDeclBase.html", "cl": 24, "ucl": 42, "cal": 66, "tl": 2573, "cb": 12, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeTestExpr", "rp": "DafnyCore_TypeTestExpr.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TypeUnaryExpr", "rp": "DafnyCore_TypeUnaryExpr.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnaryExpr", "rp": "DafnyCore_UnaryExpr.html", "cl": 4, "ucl": 8, "cal": 12, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnaryOpExpr", "rp": "DafnyCore_UnaryOpExpr.html", "cl": 21, "ucl": 13, "cal": 34, "tl": 3754, "cb": 24, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnboxingCastExpr", "rp": "DafnyCore_UnboxingCastExpr.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnchangedExpr", "rp": "DafnyCore_UnchangedExpr.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 42, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnderspecificationDetector", "rp": "DafnyCore_UnderspecificationDetector.html", "cl": 0, "ucl": 154, "cal": 154, "tl": 589, "cb": 0, "tb": 160, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UndisposableTextWriter", "rp": "DafnyCore_UndisposableTextWriter.html", "cl": 0, "ucl": 173, "cal": 173, "tl": 247, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnsupportedFeatureException", "rp": "DafnyCore_UnsupportedFeatureException.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 197, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UnusedPreType", "rp": "DafnyCore_UnusedPreType.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 352, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UpdateStmt", "rp": "DafnyCore_UpdateStmt.html", "cl": 82, "ucl": 45, "cal": 127, "tl": 187, "cb": 68, "tb": 120, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UselessOldLinterVisitor", "rp": "DafnyCore_UselessOldLinterVisitor.html", "cl": 11, "ucl": 16, "cal": 27, "tl": 64, "cb": 14, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UserDefinedType", "rp": "DafnyCore_UserDefinedType.html", "cl": 199, "ucl": 83, "cal": 282, "tl": 2889, "cb": 220, "tb": 352, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UserSuppliedAttributes", "rp": "DafnyCore_UserSuppliedAttributes.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 1056, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.UTF8Buffer", "rp": "DafnyCore_UTF8Buffer.html", "cl": 12, "ucl": 22, "cal": 34, "tl": 1135, "cb": 28, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Util", "rp": "DafnyCore_Util.html", "cl": 153, "ucl": 272, "cal": 425, "tl": 941, "cb": 102, "tb": 436, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ValuetypeDecl", "rp": "DafnyCore_ValuetypeDecl.html", "cl": 23, "ucl": 5, "cal": 28, "tl": 2573, "cb": 8, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VarDeclPattern", "rp": "DafnyCore_VarDeclPattern.html", "cl": 0, "ucl": 28, "cal": 28, "tl": 1136, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VarDeclStmt", "rp": "DafnyCore_VarDeclStmt.html", "cl": 22, "ucl": 11, "cal": 33, "tl": 1136, "cb": 18, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Verbatim", "rp": "DafnyCore_Verbatim.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 11, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VisibilityScope", "rp": "DafnyCore_VisibilityScope.html", "cl": 36, "ucl": 8, "cal": 44, "tl": 71, "cb": 18, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.WhileStmt", "rp": "DafnyCore_WhileStmt.html", "cl": 15, "ucl": 20, "cal": 35, "tl": 1136, "cb": 6, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.WildcardExpr", "rp": "DafnyCore_WildcardExpr.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 3754, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.WriterState", "rp": "DafnyCore_WriterState.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 12, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.YieldStmt", "rp": "DafnyCore_YieldStmt.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 1136, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
  {
    "name": "DafnyDriver",
    "classes": [
      { "name": "Microsoft.Dafny.AuditCommand", "rp": "DafnyDriver_AuditCommand.html", "cl": 10, "ucl": 5, "cal": 15, "tl": 27, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.BuildCommand", "rp": "DafnyDriver_BuildCommand.html", "cl": 11, "ucl": 5, "cal": 16, "tl": 27, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CommandRegistry", "rp": "DafnyDriver_CommandRegistry.html", "cl": 67, "ucl": 120, "cal": 187, "tl": 304, "cb": 52, "tb": 164, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.CSVTestLogger", "rp": "DafnyDriver_CSVTestLogger.html", "cl": 0, "ucl": 44, "cal": 44, "tl": 83, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyDriver", "rp": "DafnyDriver_DafnyDriver.html", "cl": 336, "ucl": 329, "cal": 665, "tl": 971, "cb": 282, "tb": 760, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.FormatCommand", "rp": "DafnyDriver_FormatCommand.html", "cl": 8, "ucl": 4, "cal": 12, "tl": 24, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.HelpResult", "rp": "DafnyDriver_HelpResult.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 304, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LocalTestLoggerEvents", "rp": "DafnyDriver_LocalTestLoggerEvents.html", "cl": 0, "ucl": 141, "cal": 141, "tl": 427, "cb": 0, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.MeasureComplexityCommand", "rp": "DafnyDriver_MeasureComplexityCommand.html", "cl": 24, "ucl": 3, "cal": 27, "tl": 44, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.NoExecutableBackend", "rp": "DafnyDriver_NoExecutableBackend.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 971, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ParseArgumentFailure", "rp": "DafnyDriver_ParseArgumentFailure.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 304, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ParseArgumentSuccess", "rp": "DafnyDriver_ParseArgumentSuccess.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 304, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ResolveCommand", "rp": "DafnyDriver_ResolveCommand.html", "cl": 7, "ucl": 4, "cal": 11, "tl": 40, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.RunCommand", "rp": "DafnyDriver_RunCommand.html", "cl": 25, "ucl": 12, "cal": 37, "tl": 58, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TestCommand", "rp": "DafnyDriver_TestCommand.html", "cl": 18, "ucl": 8, "cal": 26, "tl": 43, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TextLogger", "rp": "DafnyDriver_TextLogger.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 51, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.TranslateCommand", "rp": "DafnyDriver_TranslateCommand.html", "cl": 23, "ucl": 6, "cal": 29, "tl": 42, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VerificationResultLogger", "rp": "DafnyDriver_VerificationResultLogger.html", "cl": 0, "ucl": 80, "cal": 80, "tl": 125, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VerifyCommand", "rp": "DafnyDriver_VerifyCommand.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 40, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
  {
    "name": "DafnyLanguageServer",
    "classes": [
      { "name": "DafnyServer.CounterexampleGeneration.DafnyModel", "rp": "DafnyLanguageServer_DafnyModel.html", "cl": 0, "ucl": 631, "cal": 631, "tl": 945, "cb": 0, "tb": 972, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyServer.CounterexampleGeneration.DafnyModelState", "rp": "DafnyLanguageServer_DafnyModelState.html", "cl": 0, "ucl": 135, "cal": 135, "tl": 234, "cb": 0, "tb": 104, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyServer.CounterexampleGeneration.DafnyModelTypeUtils", "rp": "DafnyLanguageServer_DafnyModelTypeUtils.html", "cl": 0, "ucl": 61, "cal": 61, "tl": 121, "cb": 0, "tb": 88, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "ImplementationId", "rp": "DafnyLanguageServer_ImplementationId.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 137, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyCodeAction", "rp": "DafnyLanguageServer_DafnyCodeAction.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.AnnotatedRange", "rp": "DafnyLanguageServer_AnnotatedRange.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 202, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.AnnotatedSpan", "rp": "DafnyLanguageServer_AnnotatedSpan.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 202, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DafnyModelVariable", "rp": "DafnyLanguageServer_DafnyModelVariable.html", "cl": 0, "ucl": 65, "cal": 65, "tl": 287, "cb": 0, "tb": 48, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DafnyModelVariableFactory", "rp": "DafnyLanguageServer_DafnyModelVariableFactory.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 287, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DuplicateVariable", "rp": "DafnyLanguageServer_DuplicateVariable.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 287, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.CounterExampleGeneration.MapVariable", "rp": "DafnyLanguageServer_MapVariable.html", "cl": 0, "ucl": 32, "cal": 32, "tl": 287, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.CounterExampleGeneration.SeqVariable", "rp": "DafnyLanguageServer_SeqVariable.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 287, "cb": 0, "tb": 36, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.DafnyLanguageServer", "rp": "DafnyLanguageServer_DafnyLanguageServer.html", "cl": 0, "ucl": 69, "cal": 69, "tl": 122, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.ErrorMessageDafnyCodeActionProvider", "rp": "DafnyLanguageServer_ErrorMessageDafnyCodeActionProvider.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 26, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.Custom.CounterExampleItem", "rp": "DafnyLanguageServer_CounterExampleItem.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 14, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.Custom.CounterExampleList", "rp": "DafnyLanguageServer_CounterExampleList.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 15, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.Custom.CounterExampleParams", "rp": "DafnyLanguageServer_CounterExampleParams.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 13, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.Custom.DafnyCounterExampleHandler", "rp": "DafnyLanguageServer_DafnyCounterExampleHandler.html", "cl": 0, "ucl": 63, "cal": 63, "tl": 103, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.Custom.VerificationHandler", "rp": "DafnyLanguageServer_VerificationHandler.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 69, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyCodeActionHandler", "rp": "DafnyLanguageServer_DafnyCodeActionHandler.html", "cl": 0, "ucl": 95, "cal": 95, "tl": 167, "cb": 0, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyCodeActionInput", "rp": "DafnyLanguageServer_DafnyCodeActionInput.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 167, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyCompletionHandler", "rp": "DafnyLanguageServer_DafnyCompletionHandler.html", "cl": 0, "ucl": 89, "cal": 89, "tl": 140, "cb": 0, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyDefinitionHandler", "rp": "DafnyLanguageServer_DafnyDefinitionHandler.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 44, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyDocumentSymbolHandler", "rp": "DafnyLanguageServer_DafnyDocumentSymbolHandler.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 46, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyFormattingHandler", "rp": "DafnyLanguageServer_DafnyFormattingHandler.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 36, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyHoverHandler", "rp": "DafnyLanguageServer_DafnyHoverHandler.html", "cl": 0, "ucl": 260, "cal": 260, "tl": 352, "cb": 0, "tb": 358, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnySignatureHelpHandler", "rp": "DafnyLanguageServer_DafnySignatureHelpHandler.html", "cl": 0, "ucl": 58, "cal": 58, "tl": 96, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.DafnyTextDocumentHandler", "rp": "DafnyLanguageServer_DafnyTextDocumentHandler.html", "cl": 0, "ucl": 62, "cal": 62, "tl": 113, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Handlers.LanguageServerExtensions", "rp": "DafnyLanguageServer_LanguageServerExtensions.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 29, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.AssertionBatchResult", "rp": "DafnyLanguageServer_AssertionBatchResult.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.BoogieExtensions", "rp": "DafnyLanguageServer_BoogieExtensions.html", "cl": 0, "ucl": 28, "cal": 28, "tl": 78, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.DafnyLangParser", "rp": "DafnyLanguageServer_DafnyLangParser.html", "cl": 0, "ucl": 107, "cal": 107, "tl": 166, "cb": 0, "tb": 28, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.DafnyPluginsOptions", "rp": "DafnyLanguageServer_DafnyPluginsOptions.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 16, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.DafnyProgramVerifier", "rp": "DafnyLanguageServer_DafnyProgramVerifier.html", "cl": 0, "ucl": 27, "cal": 27, "tl": 66, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.DiagnosticErrorReporter", "rp": "DafnyLanguageServer_DiagnosticErrorReporter.html", "cl": 0, "ucl": 135, "cal": 135, "tl": 188, "cb": 0, "tb": 88, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.GhostOptions", "rp": "DafnyLanguageServer_GhostOptions.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 16, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.GhostStateDiagnosticCollector", "rp": "DafnyLanguageServer_GhostStateDiagnosticCollector.html", "cl": 0, "ucl": 72, "cal": 72, "tl": 123, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.ImplicitFailingAssertionCodeActionProvider", "rp": "DafnyLanguageServer_ImplicitFailingAssertionCodeActionProvider.html", "cl": 0, "ucl": 80, "cal": 80, "tl": 136, "cb": 0, "tb": 168, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.LanguageServerExtensions", "rp": "DafnyLanguageServer_LanguageServerExtensions.2.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 45, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.OutputLogger", "rp": "DafnyLanguageServer_OutputLogger.html", "cl": 0, "ucl": 24, "cal": 24, "tl": 45, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.ProgramVerificationTasks", "rp": "DafnyLanguageServer_ProgramVerificationTasks.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.ServerVerificationResult", "rp": "DafnyLanguageServer_ServerVerificationResult.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 9, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.ClassSymbol", "rp": "DafnyLanguageServer_ClassSymbol.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 9, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.CompilationUnit", "rp": "DafnyLanguageServer_CompilationUnit.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 30, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.DafnyLangSymbolResolver", "rp": "DafnyLanguageServer_DafnyLangSymbolResolver.html", "cl": 0, "ucl": 228, "cal": 228, "tl": 343, "cb": 0, "tb": 100, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.DafnyLangTypeResolver", "rp": "DafnyLanguageServer_DafnyLangTypeResolver.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 40, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.DataTypeSymbol", "rp": "DafnyLanguageServer_DataTypeSymbol.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 9, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.FieldSymbol", "rp": "DafnyLanguageServer_FieldSymbol.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 21, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.FormatExtensions", "rp": "DafnyLanguageServer_FormatExtensions.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 53, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.FunctionSymbol", "rp": "DafnyLanguageServer_FunctionSymbol.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 42, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.LspSymbolGeneratingVisitor", "rp": "DafnyLanguageServer_LspSymbolGeneratingVisitor.html", "cl": 0, "ucl": 56, "cal": 56, "tl": 89, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.MemberSymbol", "rp": "DafnyLanguageServer_MemberSymbol.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 28, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.MethodSymbol", "rp": "DafnyLanguageServer_MethodSymbol.html", "cl": 0, "ucl": 28, "cal": 28, "tl": 57, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.ModuleSymbol", "rp": "DafnyLanguageServer_ModuleSymbol.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 25, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.ScopeSymbol", "rp": "DafnyLanguageServer_ScopeSymbol.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 27, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.SignatureAndCompletionTable", "rp": "DafnyLanguageServer_SignatureAndCompletionTable.html", "cl": 0, "ucl": 88, "cal": 88, "tl": 172, "cb": 0, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.Symbol", "rp": "DafnyLanguageServer_Symbol.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.SymbolExtensions", "rp": "DafnyLanguageServer_SymbolExtensions.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 27, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.SymbolLocation", "rp": "DafnyLanguageServer_SymbolLocation.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.SymbolTableFactory", "rp": "DafnyLanguageServer_SymbolTableFactory.html", "cl": 0, "ucl": 325, "cal": 325, "tl": 428, "cb": 0, "tb": 68, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.TypeWithMembersSymbolBase", "rp": "DafnyLanguageServer_TypeWithMembersSymbolBase.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 29, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.TypeWithMembersSymbolBase<T>", "rp": "DafnyLanguageServer_TypeWithMembersSymbolBase_1.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 29, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.ValueTypeSymbol", "rp": "DafnyLanguageServer_ValueTypeSymbol.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 25, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.Symbols.VariableSymbol", "rp": "DafnyLanguageServer_VariableSymbol.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 20, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.SyntaxTreeVisitor", "rp": "DafnyLanguageServer_SyntaxTreeVisitor.html", "cl": 0, "ucl": 529, "cal": 529, "tl": 703, "cb": 0, "tb": 444, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.VerificationDafnyCodeActionProvider", "rp": "DafnyLanguageServer_VerificationDafnyCodeActionProvider.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 49, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Language.VerifierOptions", "rp": "DafnyLanguageServer_VerifierOptions.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 31, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.LinqExtensions", "rp": "DafnyLanguageServer_LinqExtensions.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 25, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.MarkupTestFile", "rp": "DafnyLanguageServer_MarkupTestFile.html", "cl": 0, "ucl": 89, "cal": 89, "tl": 202, "cb": 0, "tb": 52, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Plugins.DafnyCodeActionHelpers", "rp": "DafnyLanguageServer_DafnyCodeActionHelpers.html", "cl": 0, "ucl": 88, "cal": 88, "tl": 192, "cb": 0, "tb": 160, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Plugins.DafnyCodeActionProvider", "rp": "DafnyLanguageServer_DafnyCodeActionProvider.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 77, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Plugins.DiagnosticDafnyCodeActionProvider", "rp": "DafnyLanguageServer_DiagnosticDafnyCodeActionProvider.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 77, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Plugins.InstantDafnyCodeAction", "rp": "DafnyLanguageServer_InstantDafnyCodeAction.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 19, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Plugins.PluginConfiguration", "rp": "DafnyLanguageServer_PluginConfiguration.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 24, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Program", "rp": "DafnyLanguageServer_Program.html", "cl": 0, "ucl": 35, "cal": 35, "tl": 62, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Server", "rp": "DafnyLanguageServer_Server.html", "cl": 0, "ucl": 43, "cal": 43, "tl": 78, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.ServerCommand", "rp": "DafnyLanguageServer_ServerCommand.html", "cl": 49, "ucl": 14, "cal": 63, "tl": 86, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Util.PathExtensions", "rp": "DafnyLanguageServer_PathExtensions.html", "cl": 0, "ucl": 23, "cal": 23, "tl": 75, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.BufferLine", "rp": "DafnyLanguageServer_BufferLine.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 148, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.ChangeProcessors.Relocator", "rp": "DafnyLanguageServer_Relocator.html", "cl": 0, "ucl": 274, "cal": 274, "tl": 390, "cb": 0, "tb": 172, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.ChangeProcessors.TextChangeProcessor", "rp": "DafnyLanguageServer_TextChangeProcessor.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 27, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Compilation", "rp": "DafnyLanguageServer_Compilation.html", "cl": 0, "ucl": 269, "cal": 269, "tl": 393, "cb": 0, "tb": 152, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.CompilationStatusNotificationPublisher", "rp": "DafnyLanguageServer_CompilationStatusNotificationPublisher.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 22, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Document", "rp": "DafnyLanguageServer_Document.html", "cl": 0, "ucl": 23, "cal": 23, "tl": 148, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentAfterParsing", "rp": "DafnyLanguageServer_DocumentAfterParsing.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 148, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentAfterResolution", "rp": "DafnyLanguageServer_DocumentAfterResolution.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 41, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentAfterTranslation", "rp": "DafnyLanguageServer_DocumentAfterTranslation.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 148, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentManager", "rp": "DafnyLanguageServer_DocumentManager.html", "cl": 0, "ucl": 192, "cal": 192, "tl": 272, "cb": 0, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentManagerDatabase", "rp": "DafnyLanguageServer_DocumentManagerDatabase.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 74, "cb": 0, "tb": 20, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentOptions", "rp": "DafnyLanguageServer_DocumentOptions.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 22, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.DocumentTextBuffer", "rp": "DafnyLanguageServer_DocumentTextBuffer.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 40, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.FileVerificationStatus", "rp": "DafnyLanguageServer_FileVerificationStatus.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 51, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.IdeImplementationView", "rp": "DafnyLanguageServer_IdeImplementationView.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 77, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.IdeState", "rp": "DafnyLanguageServer_IdeState.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 77, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.IdeStateObserver", "rp": "DafnyLanguageServer_IdeStateObserver.html", "cl": 0, "ucl": 43, "cal": 43, "tl": 70, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.ImplementationView", "rp": "DafnyLanguageServer_ImplementationView.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 148, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.ITelemetryPublisher", "rp": "DafnyLanguageServer_ITelemetryPublisher.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 46, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.LanguageServerExtensions", "rp": "DafnyLanguageServer_LanguageServerExtensions.3.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 56, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.NamedVerifiableStatus", "rp": "DafnyLanguageServer_NamedVerifiableStatus.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 51, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.NotificationPublisher", "rp": "DafnyLanguageServer_NotificationPublisher.html", "cl": 0, "ucl": 86, "cal": 86, "tl": 138, "cb": 0, "tb": 36, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionBatchIndex", "rp": "DafnyLanguageServer_AssertionBatchIndex.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 668, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionBatchMetrics", "rp": "DafnyLanguageServer_AssertionBatchMetrics.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 668, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionBatchVerificationTree", "rp": "DafnyLanguageServer_AssertionBatchVerificationTree.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 668, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionVerificationTree", "rp": "DafnyLanguageServer_AssertionVerificationTree.html", "cl": 0, "ucl": 74, "cal": 74, "tl": 668, "cb": 0, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.CompilationStatusParams", "rp": "DafnyLanguageServer_CompilationStatusParams.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 33, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.DocumentVerificationTree", "rp": "DafnyLanguageServer_DocumentVerificationTree.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 668, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.GhostDiagnosticsParams", "rp": "DafnyLanguageServer_GhostDiagnosticsParams.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 29, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.ImplementationVerificationTree", "rp": "DafnyLanguageServer_ImplementationVerificationTree.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 668, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.TopLevelDeclMemberVerificationTree", "rp": "DafnyLanguageServer_TopLevelDeclMemberVerificationTree.html", "cl": 0, "ucl": 46, "cal": 46, "tl": 668, "cb": 0, "tb": 32, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationStatusGutter", "rp": "DafnyLanguageServer_VerificationStatusGutter.html", "cl": 0, "ucl": 72, "cal": 72, "tl": 668, "cb": 0, "tb": 56, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationTree", "rp": "DafnyLanguageServer_VerificationTree.html", "cl": 0, "ucl": 205, "cal": 205, "tl": 668, "cb": 0, "tb": 168, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.SymbolGuesser", "rp": "DafnyLanguageServer_SymbolGuesser.html", "cl": 0, "ucl": 124, "cal": 124, "tl": 201, "cb": 0, "tb": 100, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.SymbolTable", "rp": "DafnyLanguageServer_SymbolTable.html", "cl": 0, "ucl": 39, "cal": 39, "tl": 56, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.TelemetryPublisher", "rp": "DafnyLanguageServer_TelemetryPublisher.html", "cl": 0, "ucl": 19, "cal": 19, "tl": 40, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.TextBuffer", "rp": "DafnyLanguageServer_TextBuffer.html", "cl": 0, "ucl": 62, "cal": 62, "tl": 108, "cb": 0, "tb": 44, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.TextDocumentLoader", "rp": "DafnyLanguageServer_TextDocumentLoader.html", "cl": 0, "ucl": 75, "cal": 75, "tl": 137, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.Util", "rp": "DafnyLanguageServer_Util.html", "cl": 0, "ucl": 34, "cal": 34, "tl": 77, "cb": 0, "tb": 12, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.LanguageServer.Workspace.VerificationProgressReporter", "rp": "DafnyLanguageServer_VerificationProgressReporter.html", "cl": 0, "ucl": 283, "cal": 283, "tl": 441, "cb": 0, "tb": 232, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
  {
    "name": "DafnyServer",
    "classes": [
      { "name": "DafnyServer.CounterExampleProvider", "rp": "DafnyServer_CounterExampleProvider.html", "cl": 0, "ucl": 88, "cal": 88, "tl": 155, "cb": 0, "tb": 40, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyServer.LegacySymbolTable", "rp": "DafnyServer_LegacySymbolTable.html", "cl": 0, "ucl": 367, "cal": 367, "tl": 472, "cb": 0, "tb": 236, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyServer.VersionCheck", "rp": "DafnyServer_VersionCheck.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 13, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DafnyHelper", "rp": "DafnyServer_DafnyHelper.html", "cl": 0, "ucl": 106, "cal": 106, "tl": 155, "cb": 0, "tb": 92, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Interaction", "rp": "DafnyServer_Interaction.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 64, "cb": 0, "tb": 16, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.Server", "rp": "DafnyServer_Server.html", "cl": 0, "ucl": 174, "cal": 174, "tl": 234, "cb": 0, "tb": 144, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ServerException", "rp": "DafnyServer_ServerException.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 64, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.ServerUtils", "rp": "DafnyServer_ServerUtils.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 64, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.VerificationTask", "rp": "DafnyServer_VerificationTask.html", "cl": 0, "ucl": 69, "cal": 69, "tl": 107, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
  {
    "name": "DafnyTestGeneration",
    "classes": [
      { "name": "DafnyTestGeneration.BlockBasedModifier", "rp": "DafnyTestGeneration_BlockBasedModifier.html", "cl": 0, "ucl": 53, "cal": 53, "tl": 91, "cb": 0, "tb": 76, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.DafnyInfo", "rp": "DafnyTestGeneration_DafnyInfo.html", "cl": 0, "ucl": 480, "cal": 480, "tl": 624, "cb": 0, "tb": 528, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.Main", "rp": "DafnyTestGeneration_Main.html", "cl": 0, "ucl": 129, "cal": 129, "tl": 189, "cb": 0, "tb": 100, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.Modifications", "rp": "DafnyTestGeneration_Modifications.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 211, "cb": 0, "tb": 4, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.PathBasedModifier", "rp": "DafnyTestGeneration_PathBasedModifier.html", "cl": 0, "ucl": 92, "cal": 92, "tl": 159, "cb": 0, "tb": 64, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.ProgramModification", "rp": "DafnyTestGeneration_ProgramModification.html", "cl": 0, "ucl": 135, "cal": 135, "tl": 211, "cb": 0, "tb": 116, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.ProgramModifier", "rp": "DafnyTestGeneration_ProgramModifier.html", "cl": 0, "ucl": 479, "cal": 479, "tl": 747, "cb": 0, "tb": 312, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.TestMethod", "rp": "DafnyTestGeneration_TestMethod.html", "cl": 0, "ucl": 552, "cal": 552, "tl": 774, "cb": 0, "tb": 740, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "DafnyTestGeneration.Utils", "rp": "DafnyTestGeneration_Utils.html", "cl": 0, "ucl": 135, "cal": 135, "tl": 214, "cb": 0, "tb": 84, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.DeadCodeCommand", "rp": "DafnyTestGeneration_DeadCodeCommand.html", "cl": 18, "ucl": 10, "cal": 28, "tl": 43, "cb": 0, "tb": 0, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
      { "name": "Microsoft.Dafny.GenerateTestsCommand", "rp": "DafnyTestGeneration_GenerateTestsCommand.html", "cl": 69, "ucl": 52, "cal": 121, "tl": 159, "cb": 0, "tb": 8, "cm": 0, "tm": 0, "lch": [], "bch": [], "mch": [], "hc": [], "metrics": { } },
    ]},
];

var metrics = [{ "name": "Cyclomatic complexity", "abbreviation": "cc", "explanationUrl": "https://en.wikipedia.org/wiki/Cyclomatic_complexity" }, { "name": "Line coverage", "abbreviation": "cov", "explanationUrl": "https://en.wikipedia.org/wiki/Code_coverage" }, { "name": "Branch coverage", "abbreviation": "bcov", "explanationUrl": "https://en.wikipedia.org/wiki/Code_coverage" }];

var historicCoverageExecutionTimes = [];

var riskHotspotMetrics = [
      { "name": "Cyclomatic complexity", "explanationUrl": "https://en.wikipedia.org/wiki/Cyclomatic_complexity" },
];

var riskHotspots = [
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Scanner", "reportPath": "DafnyCore_Scanner.html", "methodName": "NextToken()", "methodShortName": "NextToken()", "fileIndex": 0, "line": 596,
    "metrics": [
      { "value": 2526, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrExpr(Microsoft.Dafny.Expression)", "methodShortName": "TrExpr(...)", "fileIndex": 4, "line": 297,
    "metrics": [
      { "value": 1176, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "Confirm(Microsoft.Dafny.Resolver,System.Boolean,System.Boolean&,System.Boolean&)", "methodShortName": "Confirm(...)", "fileIndex": 1, "line": 1774,
    "metrics": [
      { "value": 1024, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintExpr(Microsoft.Dafny.Expression,System.Int32,System.Boolean,System.Boolean,System.Boolean,System.Int32,System.String,System.Int32)", "methodShortName": "PrintExpr(...)", "fileIndex": 0, "line": 2127,
    "metrics": [
      { "value": 950, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FigureOutNativeType(Microsoft.Dafny.NewtypeDecl)", "methodShortName": "FigureOutNativeType(...)", "fileIndex": 2, "line": 3207,
    "metrics": [
      { "value": 934, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Scanner", "reportPath": "DafnyCore_Scanner.html", "methodName": "CheckLiteral()", "methodShortName": "CheckLiteral()", "fileIndex": 0, "line": 497,
    "metrics": [
      { "value": 868, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "PublicIdProtect(System.String)", "methodShortName": "PublicIdProtect(...)", "fileIndex": 0, "line": 2186,
    "metrics": [
      { "value": 788, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveTopLevelDecls_Core(System.Collections.Generic.List`1<Microsoft.Dafny.TopLevelDecl>,Microsoft.Dafny.Graph`1<Microsoft.Dafny.IndDatatypeDecl>,Microsoft.Dafny.Graph`1<Microsoft.Dafny.CoDatatypeDecl>,System.String,System.Boolean)", "methodShortName": "ResolveTopLevelDecls_Core(...)", "fileIndex": 2, "line": 2300,
    "metrics": [
      { "value": 788, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CheckWellformedWithResult(Microsoft.Dafny.Expression,Microsoft.Dafny.Translator/WFOptions,Microsoft.Boogie.Expr,Microsoft.Dafny.Type,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "CheckWellformedWithResult(...)", "fileIndex": 5, "line": 249,
    "metrics": [
      { "value": 772, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.GhostInterestVisitor", "reportPath": "DafnyCore_GhostInterestVisitor.html", "methodName": "Visit(Microsoft.Dafny.Statement,System.Boolean,System.String)", "methodShortName": "Visit(...)", "fileIndex": 0, "line": 72,
    "metrics": [
      { "value": 728, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "PublicIdProtect(System.String)", "methodShortName": "PublicIdProtect(...)", "fileIndex": 0, "line": 1550,
    "metrics": [
      { "value": 708, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DafnyOptions", "reportPath": "DafnyCore_DafnyOptions.html", "methodName": "ParseDafnySpecificOption(System.String,Microsoft.Boogie.CommandLineParseState)", "methodShortName": "ParseDafnySpecificOption(...)", "fileIndex": 0, "line": 449,
    "metrics": [
      { "value": 636, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "PublicIdProtect(System.String)", "methodShortName": "PublicIdProtect(...)", "fileIndex": 0, "line": 2308,
    "metrics": [
      { "value": 624, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveExpression(Microsoft.Dafny.Expression,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveExpression(...)", "fileIndex": 1, "line": 308,
    "metrics": [
      { "value": 616, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Errors", "reportPath": "DafnyCore_Errors.html", "methodName": "GetSyntaxErrorString(System.Int32)", "methodShortName": "GetSyntaxErrorString(...)", "fileIndex": 0, "line": 6872,
    "metrics": [
      { "value": 586, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "PublicIdProtect(System.String)", "methodShortName": "PublicIdProtect(...)", "fileIndex": 0, "line": 2224,
    "metrics": [
      { "value": 572, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveStatement(Microsoft.Dafny.Statement,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveStatement(...)", "fileIndex": 1, "line": 3987,
    "metrics": [
      { "value": 564, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintStatement(Microsoft.Dafny.Statement,System.Int32)", "methodShortName": "PrintStatement(...)", "fileIndex": 0, "line": 1209,
    "metrics": [
      { "value": 464, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Substituter", "reportPath": "DafnyCore_Substituter.html", "methodName": "Substitute(Microsoft.Dafny.Expression)", "methodShortName": "Substitute(...)", "fileIndex": 0, "line": 33,
    "metrics": [
      { "value": 456, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "PublicIdProtect(System.String)", "methodShortName": "PublicIdProtect(...)", "fileIndex": 0, "line": 1463,
    "metrics": [
      { "value": 388, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrStmt(Microsoft.Dafny.Statement,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "TrStmt(...)", "fileIndex": 0, "line": 2958,
    "metrics": [
      { "value": 388, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "FunctionDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.Function&)", "methodShortName": "FunctionDecl(...)", "fileIndex": 0, "line": 2053,
    "metrics": [
      { "value": 378, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "Expr(Microsoft.Dafny.Expression,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "Expr(...)", "fileIndex": 0, "line": 4718,
    "metrics": [
      { "value": 368, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExpressionTester", "reportPath": "DafnyCore_ExpressionTester.html", "methodName": "UsesSpecFeatures(Microsoft.Dafny.Expression)", "methodShortName": "UsesSpecFeatures(...)", "fileIndex": 0, "line": 395,
    "metrics": [
      { "value": 364, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileClassMembers(Microsoft.Dafny.Program,Microsoft.Dafny.TopLevelDeclWithMembers,Microsoft.Dafny.Compilers.SinglePassCompiler/IClassWriter)", "methodShortName": "CompileClassMembers(...)", "fileIndex": 0, "line": 1824,
    "metrics": [
      { "value": 360, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "PartiallySolveTypeConstraints(System.Boolean)", "methodShortName": "PartiallySolveTypeConstraints(...)", "fileIndex": 1, "line": 2329,
    "metrics": [
      { "value": 356, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "MangleName(System.String)", "methodShortName": "MangleName(...)", "fileIndex": 0, "line": 118,
    "metrics": [
      { "value": 352, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExpressionTester", "reportPath": "DafnyCore_ExpressionTester.html", "methodName": "CheckIsCompilable(Microsoft.Dafny.Expression,Microsoft.Dafny.ICodeContext,System.Boolean)", "methodShortName": "CheckIsCompilable(...)", "fileIndex": 0, "line": 50,
    "metrics": [
      { "value": 352, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FindPredefinedDecls(Microsoft.Boogie.Program)", "methodShortName": "FindPredefinedDecls(...)", "fileIndex": 2, "line": 434,
    "metrics": [
      { "value": 348, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "PostVisitOneExpression(Microsoft.Dafny.Expression,Microsoft.Dafny.Resolver/TypeInferenceCheckingContext)", "methodShortName": "PostVisitOneExpression(...)", "fileIndex": 3, "line": 122,
    "metrics": [
      { "value": 346, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrSplitExpr(Microsoft.Dafny.Expression,System.Collections.Generic.List`1<Microsoft.Dafny.Translator/SplitExprInfo>,System.Boolean,System.Int32,System.Boolean,System.Boolean,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrSplitExpr(...)", "fileIndex": 2, "line": 10059,
    "metrics": [
      { "value": 324, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 1974,
    "metrics": [
      { "value": 318, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveModuleExport(Microsoft.Dafny.LiteralModuleDecl,Microsoft.Dafny.ModuleSignature)", "methodShortName": "ResolveModuleExport(...)", "fileIndex": 2, "line": 841,
    "metrics": [
      { "value": 312, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrStmt(Microsoft.Dafny.Statement,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrStmt(...)", "fileIndex": 6, "line": 13,
    "metrics": [
      { "value": 312, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "ExtractVariable(Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DafnyModelVariable,Microsoft.Dafny.Type)", "methodShortName": "ExtractVariable(...)", "fileIndex": 0, "line": 239,
    "metrics": [
      { "value": 308, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "JoinX(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.BuiltIns)", "methodShortName": "JoinX(...)", "fileIndex": 0, "line": 1292,
    "metrics": [
      { "value": 304, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "MergeStmtList(System.Collections.Generic.List`1<Microsoft.Dafny.Statement>,System.Collections.Generic.List`1<Microsoft.Dafny.Statement>,System.String&)", "methodShortName": "MergeStmtList(...)", "fileIndex": 0, "line": 1018,
    "metrics": [
      { "value": 296, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveProgram(Microsoft.Dafny.Program)", "methodShortName": "ResolveProgram(...)", "fileIndex": 2, "line": 391,
    "metrics": [
      { "value": 296, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DetectUnderspecificationVisitor", "reportPath": "DafnyCore_DetectUnderspecificationVisitor.html", "methodName": "ResolveOp(Microsoft.Dafny.BinaryExpr/Opcode,Microsoft.Dafny.PreType,Microsoft.Dafny.PreType)", "methodShortName": "ResolveOp(...)", "fileIndex": 0, "line": 381,
    "metrics": [
      { "value": 286, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CanCallAssumption(Microsoft.Dafny.Expression,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "CanCallAssumption(...)", "fileIndex": 2, "line": 4866,
    "metrics": [
      { "value": 284, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "MeetX(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.BuiltIns)", "methodShortName": "MeetX(...)", "fileIndex": 0, "line": 1513,
    "metrics": [
      { "value": 268, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "MergeClass(Microsoft.Dafny.TopLevelDeclWithMembers,Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "MergeClass(...)", "fileIndex": 0, "line": 712,
    "metrics": [
      { "value": 260, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "CheckTailRecursive(Microsoft.Dafny.Statement,Microsoft.Dafny.Method,Microsoft.Dafny.Statement&,System.Boolean)", "methodShortName": "CheckTailRecursive(...)", "fileIndex": 0, "line": 94,
    "metrics": [
      { "value": 260, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 3094,
    "metrics": [
      { "value": 258, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "GetDafnyType(Microsoft.Boogie.Model/Uninterpreted)", "methodShortName": "GetDafnyType(...)", "fileIndex": 0, "line": 381,
    "metrics": [
      { "value": 232, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BinaryExpr", "reportPath": "DafnyCore_BinaryExpr.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 2249,
    "metrics": [
      { "value": 224, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IsGenericInstantiation(System.Boolean)", "methodShortName": "IsGenericInstantiation(...)", "fileIndex": 0, "line": 729,
    "metrics": [
      { "value": 222, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 2050,
    "metrics": [
      { "value": 218, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintTopLevelDecls(System.Collections.Generic.List`1<Microsoft.Dafny.TopLevelDecl>,System.Int32,System.Collections.Generic.List`1<Microsoft.Dafny.IToken>,System.String)", "methodShortName": "PrintTopLevelDecls(...)", "fileIndex": 0, "line": 273,
    "metrics": [
      { "value": 216, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 2623,
    "metrics": [
      { "value": 214, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FillInDefaultLoopDecreases(Microsoft.Dafny.LoopStmt,Microsoft.Dafny.Expression,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,Microsoft.Dafny.ICallable)", "methodShortName": "FillInDefaultLoopDecreases(...)", "fileIndex": 2, "line": 5769,
    "metrics": [
      { "value": 214, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AutoContractsRewriter", "reportPath": "DafnyCore_AutoContractsRewriter.html", "methodName": "ProcessClassPostResolve(Microsoft.Dafny.ClassDecl)", "methodShortName": "ProcessClassPostResolve(...)", "fileIndex": 0, "line": 164,
    "metrics": [
      { "value": 212, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetFunctionAxiom(Microsoft.Dafny.Function,Microsoft.Dafny.Expression,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>)", "methodShortName": "GetFunctionAxiom(...)", "fileIndex": 2, "line": 2326,
    "metrics": [
      { "value": 212, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveOp(Microsoft.Dafny.BinaryExpr/Opcode,Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "ResolveOp(...)", "fileIndex": 2, "line": 6593,
    "metrics": [
      { "value": 210, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AutoReqFunctionRewriter", "reportPath": "DafnyCore_AutoReqFunctionRewriter.html", "methodName": "GenerateAutoReqs(Microsoft.Dafny.Expression)", "methodShortName": "GenerateAutoReqs(...)", "fileIndex": 0, "line": 156,
    "metrics": [
      { "value": 208, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "MergeTopLevelDecls(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TopLevelDecl,Microsoft.Dafny.TopLevelDecl,System.Int32)", "methodShortName": "MergeTopLevelDecls(...)", "fileIndex": 0, "line": 299,
    "metrics": [
      { "value": 208, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "ShallowEq_Top(Microsoft.Dafny.Expression,Microsoft.Dafny.Expression)", "methodShortName": "ShallowEq_Top(...)", "fileIndex": 0, "line": 186,
    "metrics": [
      { "value": 208, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "DiscoverAllBounds_Aux_SingleVar(System.Collections.Generic.List`1<VT>,System.Int32,Microsoft.Dafny.Expression,System.Boolean,System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>)", "methodShortName": "DiscoverAllBounds_Aux_SingleVar(...)", "fileIndex": 0, "line": 333,
    "metrics": [
      { "value": 204, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "Compile(Microsoft.Dafny.Program,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "Compile(...)", "fileIndex": 0, "line": 1330,
    "metrics": [
      { "value": 200, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetMethodLikeIndent(Microsoft.Dafny.IToken,System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.IToken>,System.Int32)", "methodShortName": "SetMethodLikeIndent(...)", "fileIndex": 0, "line": 254,
    "metrics": [
      { "value": 200, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 2811,
    "metrics": [
      { "value": 198, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CoCallResolution", "reportPath": "DafnyCore_CoCallResolution.html", "methodName": "CheckCoCalls(Microsoft.Dafny.Expression,System.Int32,Microsoft.Dafny.DatatypeValue,System.Collections.Generic.List`1<Microsoft.Dafny.CoCallResolution/CoCallInfo>,Microsoft.Dafny.Function)", "methodShortName": "CheckCoCalls(...)", "fileIndex": 0, "line": 6869,
    "metrics": [
      { "value": 196, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "PartiallyResolveTypeForMemberSelection(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String,System.Int32)", "methodShortName": "PartiallyResolveTypeForMemberSelection(...)", "fileIndex": 1, "line": 5138,
    "metrics": [
      { "value": 196, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ProcessCallStmt(Microsoft.Dafny.IToken,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,Microsoft.Dafny.Expression,Microsoft.Boogie.Expr,Microsoft.Dafny.Method,Microsoft.Dafny.Label,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Boogie.IdentifierExpr>,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "ProcessCallStmt(...)", "fileIndex": 6, "line": 1722,
    "metrics": [
      { "value": 196, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "CheckTailRecursiveExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.Function,System.Boolean,System.Boolean)", "methodShortName": "CheckTailRecursiveExpr(...)", "fileIndex": 0, "line": 419,
    "metrics": [
      { "value": 192, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "DeclareDatatype(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DeclareDatatype(...)", "fileIndex": 0, "line": 503,
    "metrics": [
      { "value": 188, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddWellformednessCheck(Microsoft.Dafny.Function)", "methodShortName": "AddWellformednessCheck(...)", "fileIndex": 2, "line": 4216,
    "metrics": [
      { "value": 188, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "DeclareDatatype(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DeclareDatatype(...)", "fileIndex": 0, "line": 312,
    "metrics": [
      { "value": 184, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 3847,
    "metrics": [
      { "value": 184, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InductionHeuristic", "reportPath": "DafnyCore_InductionHeuristic.html", "methodName": "VarOccursInArgumentToRecursiveFunction(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Expression,Microsoft.Dafny.IVariable,System.Boolean)", "methodShortName": "VarOccursInArgumentToRecursiveFunction(...)", "fileIndex": 0, "line": 33,
    "metrics": [
      { "value": 184, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "TypeAndToken(Microsoft.Dafny.IToken&,Microsoft.Dafny.Type&,System.Boolean)", "methodShortName": "TypeAndToken(...)", "fileIndex": 0, "line": 2860,
    "metrics": [
      { "value": 180, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "RegisterTopLevelDecls(Microsoft.Dafny.ModuleDefinition,System.Boolean)", "methodShortName": "RegisterTopLevelDecls(...)", "fileIndex": 2, "line": 1691,
    "metrics": [
      { "value": 180, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FunctionCall(Microsoft.Boogie.IToken,Microsoft.Dafny.Translator/BuiltinFunction,Microsoft.Boogie.Type,Microsoft.Boogie.Expr[])", "methodShortName": "FunctionCall(...)", "fileIndex": 0, "line": 214,
    "metrics": [
      { "value": 180, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 1440,
    "metrics": [
      { "value": 176, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DetectUnderspecificationVisitor", "reportPath": "DafnyCore_DetectUnderspecificationVisitor.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 0, "line": 261,
    "metrics": [
      { "value": 172, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintExtendedExpr(Microsoft.Dafny.Expression,System.Int32,System.Boolean,System.Boolean)", "methodShortName": "PrintExtendedExpr(...)", "fileIndex": 0, "line": 1936,
    "metrics": [
      { "value": 172, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "NormalizedConjuncts()", "methodShortName": "NormalizedConjuncts()", "fileIndex": 0, "line": 500,
    "metrics": [
      { "value": 172, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.DafnyDriver", "reportPath": "DafnyDriver_DafnyDriver.html", "methodName": "ProcessCommandLineArguments(System.IO.TextWriter,System.IO.TextWriter,System.IO.TextReader,System.String[],Microsoft.Dafny.DafnyOptions&,System.Collections.Generic.List`1<Microsoft.Dafny.DafnyFile>&,System.Collections.Generic.List`1<System.String>&)", "methodShortName": "ProcessCommandLineArguments(...)", "fileIndex": 0, "line": 198,
    "metrics": [
      { "value": 168, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.FreeVariablesUtil", "reportPath": "DafnyCore_FreeVariablesUtil.html", "methodName": "ComputeFreeVariables(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Expression,System.Collections.Generic.ISet`1<Microsoft.Dafny.IVariable>,System.Boolean&,System.Boolean&,System.Collections.Generic.ISet`1<Microsoft.Dafny.Label>,Microsoft.Dafny.Type&,System.Boolean)", "methodShortName": "ComputeFreeVariables(...)", "fileIndex": 0, "line": 51,
    "metrics": [
      { "value": 164, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.GhostInterestVisitor", "reportPath": "DafnyCore_GhostInterestVisitor.html", "methodName": "CheckAssignStmt(Microsoft.Dafny.AssignStmt,System.Boolean,System.String)", "methodShortName": "CheckAssignStmt(...)", "fileIndex": 0, "line": 488,
    "metrics": [
      { "value": 164, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveDotSuffix(Microsoft.Dafny.ExprDotName,System.Boolean,System.Collections.Generic.List`1<Microsoft.Dafny.ActualBinding>,Microsoft.Dafny.ResolutionContext,System.Boolean)", "methodShortName": "ResolveDotSuffix(...)", "fileIndex": 1, "line": 6139,
    "metrics": [
      { "value": 164, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "DeclareDatatype(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DeclareDatatype(...)", "fileIndex": 0, "line": 196,
    "metrics": [
      { "value": 160, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFunctionConsequenceAxiom(Microsoft.Boogie.Function,Microsoft.Dafny.Function,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>)", "methodShortName": "AddFunctionConsequenceAxiom(...)", "fileIndex": 2, "line": 2035,
    "metrics": [
      { "value": 160, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ConstrainTypeHead(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "ConstrainTypeHead(...)", "fileIndex": 1, "line": 1607,
    "metrics": [
      { "value": 158, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrExprOpt(Microsoft.Dafny.Expression,Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IVariable)", "methodShortName": "TrExprOpt(...)", "fileIndex": 0, "line": 2589,
    "metrics": [
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "VarDeclStatement(Microsoft.Dafny.Statement&)", "methodShortName": "VarDeclStatement(...)", "fileIndex": 0, "line": 3842,
    "metrics": [
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PrecedenceLinterVisitor", "reportPath": "DafnyCore_PrecedenceLinterVisitor.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.LeftMargin&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 0, "line": 83,
    "metrics": [
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentCases(System.Int32,System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.IToken>,System.Action)", "methodShortName": "SetIndentCases(...)", "fileIndex": 0, "line": 761,
    "metrics": [
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AssignOrReturnStmt", "reportPath": "DafnyCore_AssignOrReturnStmt.html", "methodName": "Resolve(Microsoft.Dafny.Resolver,Microsoft.Dafny.ResolutionContext)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 113,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InductionRewriter", "reportPath": "DafnyCore_InductionRewriter.html", "methodName": "ComputeInductionVariables(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<VarType>,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,Microsoft.Dafny.Method,Microsoft.Dafny.Attributes&)", "methodShortName": "ComputeInductionVariables(...)", "fileIndex": 0, "line": 86,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "Suffix(Microsoft.Dafny.Expression&)", "methodShortName": "Suffix(...)", "fileIndex": 0, "line": 5668,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveTypeLenient(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.Resolver/ResolveTypeOption,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.Boolean)", "methodShortName": "ResolveTypeLenient(...)", "fileIndex": 1, "line": 4727,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "InheritedTraitMembers(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "InheritedTraitMembers(...)", "fileIndex": 2, "line": 5092,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.DafnyDriver", "reportPath": "DafnyDriver_DafnyDriver.html", "methodName": "DoFormatting(System.Collections.Generic.IList`1<Microsoft.Dafny.DafnyFile>,Microsoft.Dafny.DafnyOptions,System.String,System.IO.TextWriter)", "methodShortName": "DoFormatting(...)", "fileIndex": 0, "line": 455,
    "metrics": [
      { "value": 152, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,System.Boolean&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 2, "line": 4366,
    "metrics": [
      { "value": 148, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddMethod(Microsoft.Dafny.Method,Microsoft.Dafny.Translator/MethodTranslationKind)", "methodShortName": "AddMethod(...)", "fileIndex": 1, "line": 1403,
    "metrics": [
      { "value": 148, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 3024,
    "metrics": [
      { "value": 144, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 2250,
    "metrics": [
      { "value": 144, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "IsHeadSupertypeOf(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "IsHeadSupertypeOf(...)", "fileIndex": 0, "line": 1033,
    "metrics": [
      { "value": 144, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "TypeDescriptor(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken)", "methodShortName": "TypeDescriptor(...)", "fileIndex": 0, "line": 2373,
    "metrics": [
      { "value": 142, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ConvertExpression(Microsoft.Dafny.IToken,Microsoft.Boogie.Expr,Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "ConvertExpression(...)", "fileIndex": 2, "line": 5354,
    "metrics": [
      { "value": 140, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.DafnyDriver", "reportPath": "DafnyDriver_DafnyDriver.html", "methodName": "ProcessFilesAsync()", "methodShortName": "ProcessFilesAsync()", "fileIndex": 0, "line": 358,
    "metrics": [
      { "value": 140, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "GetDefaultValue(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "GetDefaultValue(...)", "fileIndex": 0, "line": 526,
    "metrics": [
      { "value": 140, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 995,
    "metrics": [
      { "value": 136, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 1465,
    "metrics": [
      { "value": 136, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrCallStmt(Microsoft.Dafny.CallStmt,System.String,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "TrCallStmt(...)", "fileIndex": 0, "line": 4359,
    "metrics": [
      { "value": 136, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveTypeRhs(Microsoft.Dafny.TypeRhs,Microsoft.Dafny.Statement,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveTypeRhs(...)", "fileIndex": 1, "line": 4938,
    "metrics": [
      { "value": 136, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "HasMain(Microsoft.Dafny.Program,Microsoft.Dafny.Method&)", "methodShortName": "HasMain(...)", "fileIndex": 0, "line": 1590,
    "metrics": [
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DatatypeDecl", "reportPath": "DafnyCore_DatatypeDecl.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 1703,
    "metrics": [
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GuessWitnesses()", "methodShortName": "GuessWitnesses()", "fileIndex": 2, "line": 7595,
    "metrics": [
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "GetAutoInit(System.Collections.Generic.List`1<Microsoft.Dafny.UserDefinedType>)", "methodShortName": "GetAutoInit(...)", "fileIndex": 0, "line": 334,
    "metrics": [
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "GetExpansion(DafnyServer.CounterexampleGeneration.DafnyModelState,Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DafnyModelVariable)", "methodShortName": "GetExpansion(...)", "fileIndex": 0, "line": 710,
    "metrics": [
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BinaryExpr", "reportPath": "DafnyCore_BinaryExpr.html", "methodName": "ResolvedOp2SyntacticOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode)", "methodShortName": "ResolvedOp2SyntacticOp(...)", "fileIndex": 0, "line": 1989,
    "metrics": [
      { "value": 130, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Cloner", "reportPath": "DafnyCore_Cloner.html", "methodName": "CloneExprInner(Microsoft.Dafny.Expression)", "methodShortName": "CloneExprInner(...)", "fileIndex": 0, "line": 329,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ForallStmtRewriter", "reportPath": "DafnyCore_ForallStmtRewriter.html", "methodName": "InvertExpressionIter()", "methodShortName": "InvertExpressionIter()", "fileIndex": 0, "line": 221,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "MethodDecl(Microsoft.Dafny.Parser/DeclModifierData,System.Boolean,Microsoft.Dafny.Method&)", "methodShortName": "MethodDecl(...)", "fileIndex": 0, "line": 2381,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "UpdateStmt(Microsoft.Dafny.Statement&)", "methodShortName": "UpdateStmt(...)", "fileIndex": 0, "line": 3707,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveNameSegment(Microsoft.Dafny.NameSegment,System.Boolean,System.Collections.Generic.List`1<Microsoft.Dafny.ActualBinding>,Microsoft.Dafny.ResolutionContext,System.Boolean,System.Boolean,Microsoft.Dafny.ModuleDecl&)", "methodShortName": "ResolveNameSegment(...)", "fileIndex": 1, "line": 5839,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Substituter", "reportPath": "DafnyCore_Substituter.html", "methodName": "SubstStmt(Microsoft.Dafny.Statement)", "methodShortName": "SubstStmt(...)", "fileIndex": 0, "line": 753,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CheckResultToBeInType(Microsoft.Dafny.IToken,Microsoft.Dafny.Expression,Microsoft.Dafny.Type,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.Translator/ExpressionTranslator,System.String)", "methodShortName": "CheckResultToBeInType(...)", "fileIndex": 2, "line": 5494,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetReadonlyField(Microsoft.Dafny.Field)", "methodShortName": "GetReadonlyField(...)", "fileIndex": 2, "line": 6619,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrAssignmentRhs(Microsoft.Dafny.IToken,Microsoft.Boogie.IdentifierExpr,Microsoft.Dafny.IVariable,Microsoft.Dafny.Type,Microsoft.Dafny.AssignmentRhs,Microsoft.Dafny.Type,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrAssignmentRhs(...)", "fileIndex": 2, "line": 8825,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.DafnyInfo", "reportPath": "DafnyTestGeneration_DafnyInfo.html", "methodName": "CloneExpr(Microsoft.Dafny.Expression)", "methodShortName": "CloneExpr(...)", "fileIndex": 0, "line": 545,
    "metrics": [
      { "value": 128, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.DafnyCompiler", "reportPath": "DafnyCore_DafnyCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 533,
    "metrics": [
      { "value": 126, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 2975,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 887,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ModuleExport(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.ModuleDecl&)", "methodShortName": "ModuleExport(...)", "fileIndex": 0, "line": 1708,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "OneStmt(Microsoft.Dafny.Statement&)", "methodShortName": "OneStmt(...)", "fileIndex": 0, "line": 3614,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveActualParameters(Microsoft.Dafny.ActualBindings,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.IToken,System.Object,Microsoft.Dafny.ResolutionContext,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Expression)", "methodShortName": "ResolveActualParameters(...)", "fileIndex": 1, "line": 3707,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveApplySuffix(Microsoft.Dafny.ApplySuffix,Microsoft.Dafny.ResolutionContext,System.Boolean)", "methodShortName": "ResolveApplySuffix(...)", "fileIndex": 1, "line": 6416,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "DetermineEqualitySupport(Microsoft.Dafny.IndDatatypeDecl,Microsoft.Dafny.Graph`1<Microsoft.Dafny.IndDatatypeDecl>)", "methodShortName": "DetermineEqualitySupport(...)", "fileIndex": 2, "line": 5469,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddMethodImpl(Microsoft.Dafny.Method,Microsoft.Boogie.Procedure,System.Boolean)", "methodShortName": "AddMethodImpl(...)", "fileIndex": 1, "line": 516,
    "metrics": [
      { "value": 124, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BinaryExpr", "reportPath": "DafnyCore_BinaryExpr.html", "methodName": ".ctor(Microsoft.Dafny.IToken,Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression)", "methodShortName": ".ctor(...)", "fileIndex": 0, "line": 2190,
    "metrics": [
      { "value": 122, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileBinOp(Microsoft.Dafny.BinaryExpr/ResolvedOpcode,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String&,System.String&,System.String&,System.String&,System.String&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileBinOp(...)", "fileIndex": 0, "line": 1186,
    "metrics": [
      { "value": 120, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 1360,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ProgramTraverser", "reportPath": "DafnyCore_ProgramTraverser.html", "methodName": "Traverse(Microsoft.Dafny.MemberDecl,System.String,System.Object)", "methodShortName": "Traverse(...)", "fileIndex": 0, "line": 839,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetRedirectingTypeDeclDeclIndentation(System.Int32,Microsoft.Dafny.RedirectingTypeDecl)", "methodShortName": "SetRedirectingTypeDeclDeclIndentation(...)", "fileIndex": 0, "line": 457,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentUpdateStmt(Microsoft.Dafny.ConcreteUpdateStatement,System.Int32,System.Boolean)", "methodShortName": "SetIndentUpdateStmt(...)", "fileIndex": 0, "line": 610,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ComputeLessEq(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr&,Microsoft.Boogie.Expr&,Microsoft.Boogie.Expr&,System.Boolean)", "methodShortName": "ComputeLessEq(...)", "fileIndex": 2, "line": 8075,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrLoop(Microsoft.Dafny.LoopStmt,Microsoft.Dafny.Expression,Microsoft.Dafny.Translator/BodyTranslator,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Boogie.Expr,System.Boolean)", "methodShortName": "TrLoop(...)", "fileIndex": 6, "line": 1359,
    "metrics": [
      { "value": 116, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 3354,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean,Microsoft.Dafny.MemberDecl)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 671,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "RelationalExpression(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "RelationalExpression(...)", "fileIndex": 0, "line": 5286,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PreTypeToTypeVisitor", "reportPath": "DafnyCore_PreTypeToTypeVisitor.html", "methodName": "PreType2Type(Microsoft.Dafny.PreType)", "methodShortName": "PreType2Type(...)", "fileIndex": 0, "line": 29,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneStmt(Microsoft.Dafny.Statement,System.Boolean&)", "methodShortName": "VisitOneStmt(...)", "fileIndex": 2, "line": 4265,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "Equal_Improved(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "Equal_Improved(...)", "fileIndex": 0, "line": 1123,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.SyntaxTreeVisitor", "reportPath": "DafnyLanguageServer_SyntaxTreeVisitor.html", "methodName": "Visit(Microsoft.Dafny.Expression)", "methodShortName": "Visit(...)", "fileIndex": 0, "line": 413,
    "metrics": [
      { "value": 112, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CalcStmt", "reportPath": "DafnyCore_CalcStmt.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 332,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,Microsoft.Dafny.MemberDecl,System.Boolean)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 910,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 1479,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "TypeInitializationValue(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean)", "methodShortName": "TypeInitializationValue(...)", "fileIndex": 0, "line": 663,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ComprehensionExpr", "reportPath": "DafnyCore_ComprehensionExpr.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 461,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "SanitizeForBoundDiscovery(System.Collections.Generic.List`1<VT>,System.Int32,Microsoft.Dafny.BinaryExpr/ResolvedOpcode,System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>,Microsoft.Dafny.Expression&,Microsoft.Dafny.Expression&)", "methodShortName": "SanitizeForBoundDiscovery(...)", "fileIndex": 0, "line": 639,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "DetermineRootLeaf(Microsoft.Dafny.Type,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&)", "methodShortName": "DetermineRootLeaf(...)", "fileIndex": 1, "line": 1315,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddInstanceFieldAllocationAxioms(Microsoft.Boogie.Declaration,Microsoft.Dafny.Field,Microsoft.Dafny.TopLevelDeclWithMembers,System.Boolean,Microsoft.Boogie.Expr)", "methodShortName": "AddInstanceFieldAllocationAxioms(...)", "fileIndex": 1, "line": 256,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Util", "reportPath": "DafnyCore_Util.html", "methodName": "UnescapedCharacters()", "methodShortName": "UnescapedCharacters()", "fileIndex": 0, "line": 300,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.ImplicitFailingAssertionCodeActionProvider", "reportPath": "DafnyLanguageServer_ImplicitFailingAssertionCodeActionProvider.html", "methodName": "GetEdits()", "methodShortName": "GetEdits()", "fileIndex": 0, "line": 59,
    "metrics": [
      { "value": 108, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 2545,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CompileDatatypeBase(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileDatatypeBase(...)", "fileIndex": 0, "line": 1781,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExtendedPattern", "reportPath": "DafnyCore_ExtendedPattern.html", "methodName": "CheckLinearExtendedPattern(Microsoft.Dafny.Type,Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.Resolver)", "methodShortName": "CheckLinearExtendedPattern(...)", "fileIndex": 0, "line": 47,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "ResolvedTypesAreTheSame(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "ResolvedTypesAreTheSame(...)", "fileIndex": 0, "line": 456,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "PotentialMatch(Microsoft.Dafny.Statement,Microsoft.Dafny.Statement)", "methodShortName": "PotentialMatch(...)", "fileIndex": 0, "line": 1413,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveTopLevelDecls_Signatures(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.ModuleSignature,System.Collections.Generic.List`1<Microsoft.Dafny.TopLevelDecl>,Microsoft.Dafny.Graph`1<Microsoft.Dafny.IndDatatypeDecl>,Microsoft.Dafny.Graph`1<Microsoft.Dafny.CoDatatypeDecl>)", "methodShortName": "ResolveTopLevelDecls_Signatures(...)", "fileIndex": 2, "line": 2191,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.Resolver/CallingPosition&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 2, "line": 4024,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentVarDeclStmt(System.Int32,System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.IToken>,System.Boolean,System.Boolean)", "methodShortName": "SetIndentVarDeclStmt(...)", "fileIndex": 0, "line": 854,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "ReconstructType(Microsoft.Boogie.Model/Element)", "methodShortName": "ReconstructType(...)", "fileIndex": 0, "line": 506,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "CanonicalName(Microsoft.Boogie.Model/Element)", "methodShortName": "CanonicalName(...)", "fileIndex": 0, "line": 577,
    "metrics": [
      { "value": 104, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "DatatypeFieldsAndConstructor(Microsoft.Dafny.DatatypeCtor,System.Int32,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DatatypeFieldsAndConstructor(...)", "fileIndex": 0, "line": 1981,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IndentationFormatter", "reportPath": "DafnyCore_IndentationFormatter.html", "methodName": "GetNewTrivia(Microsoft.Dafny.IToken,System.Boolean)", "methodShortName": "GetNewTrivia(...)", "fileIndex": 0, "line": 147,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "IsRecognizedAttribute(Microsoft.Dafny.UserSuppliedAttributes,Microsoft.Dafny.IAttributeBearingDeclaration)", "methodShortName": "IsRecognizedAttribute(...)", "fileIndex": 2, "line": 5580,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveCasePattern(Microsoft.Dafny.CasePattern`1<VT>,Microsoft.Dafny.Type,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveCasePattern(...)", "fileIndex": 2, "line": 6216,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ProcessLhss(System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Boolean,System.Boolean,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator,System.Collections.Generic.List`1<Microsoft.Dafny.Translator/AssignToLhs>&,System.Collections.Generic.List`1<Microsoft.Boogie.IdentifierExpr>&,Microsoft.Boogie.Expr[]&,Microsoft.Boogie.Expr[]&,System.String[]&,Microsoft.Dafny.Expression)", "methodShortName": "ProcessLhss(...)", "fileIndex": 2, "line": 8649,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrPredicateStmt(Microsoft.Dafny.PredicateStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrPredicateStmt(...)", "fileIndex": 6, "line": 514,
    "metrics": [
      { "value": 100, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "CreateSubroutine(System.String,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.Type,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,System.Boolean,System.Boolean,System.String,Microsoft.Dafny.MemberDecl,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.Boolean)", "methodShortName": "CreateSubroutine(...)", "fileIndex": 0, "line": 1128,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,Microsoft.Dafny.MemberDecl)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 1398,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrRhsArray(Microsoft.Dafny.TypeRhs,System.String,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "TrRhsArray(...)", "fileIndex": 0, "line": 4128,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ProgramTraverser", "reportPath": "DafnyCore_ProgramTraverser.html", "methodName": "Traverse(Microsoft.Dafny.TopLevelDecl)", "methodShortName": "Traverse(...)", "fileIndex": 0, "line": 768,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ProvideRevealAllRewriter", "reportPath": "DafnyCore_ProvideRevealAllRewriter.html", "methodName": "PreResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PreResolve(...)", "fileIndex": 0, "line": 12,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveExprDotCall(Microsoft.Dafny.IToken,Microsoft.Dafny.Expression,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.ActualBinding>,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.ResolutionContext,System.Boolean)", "methodShortName": "ResolveExprDotCall(...)", "fileIndex": 1, "line": 6332,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "RegisterInheritedMembers(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "RegisterInheritedMembers(...)", "fileIndex": 2, "line": 4929,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentAssertLikeStatement(Microsoft.Dafny.Statement,System.Int32)", "methodShortName": "SetIndentAssertLikeStatement(...)", "fileIndex": 0, "line": 533,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "IsExprAlways(Microsoft.Boogie.Expr,System.Boolean)", "methodShortName": "IsExprAlways(...)", "fileIndex": 2, "line": 3943,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetWhereClause(Microsoft.Dafny.IToken,Microsoft.Boogie.Expr,Microsoft.Dafny.Type,Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Dafny.Translator/IsAllocType,System.Boolean)", "methodShortName": "GetWhereClause(...)", "fileIndex": 2, "line": 8390,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UpdateStmt", "reportPath": "DafnyCore_UpdateStmt.html", "methodName": "Resolve(Microsoft.Dafny.Resolver,Microsoft.Dafny.ResolutionContext)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 84,
    "metrics": [
      { "value": 96, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AbstractTypeDecl", "reportPath": "DafnyCore_AbstractTypeDecl.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 2104,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "TypeDescriptor(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken)", "methodShortName": "TypeDescriptor(...)", "fileIndex": 0, "line": 1293,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "TypeDescriptor(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken)", "methodShortName": "TypeDescriptor(...)", "fileIndex": 0, "line": 728,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ForallStmtRewriter", "reportPath": "DafnyCore_ForallStmtRewriter.html", "methodName": "VisitOneStmt(Microsoft.Dafny.Statement,System.Boolean&)", "methodShortName": "VisitOneStmt(...)", "fileIndex": 0, "line": 26,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "AssignProxyAndHandleItsConstraints_aux(Microsoft.Dafny.TypeProxy,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "AssignProxyAndHandleItsConstraints_aux(...)", "fileIndex": 1, "line": 1432,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TestGenerationOptions", "reportPath": "DafnyCore_TestGenerationOptions.html", "methodName": "ParseOption(System.String,Microsoft.Boogie.CommandLineParseState)", "methodShortName": "ParseOption(...)", "fileIndex": 0, "line": 21,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentLikeLoop(System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.IToken>,Microsoft.Dafny.Statement,System.Int32)", "methodShortName": "SetIndentLikeLoop(...)", "fileIndex": 0, "line": 936,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FunctionOverrideAxiom(Microsoft.Dafny.Function,Microsoft.Dafny.Function)", "methodShortName": "FunctionOverrideAxiom(...)", "fileIndex": 1, "line": 1017,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddDataTypeConstructor(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.DatatypeCtor,System.Boolean)", "methodShortName": "AddDataTypeConstructor(...)", "fileIndex": 3, "line": 378,
    "metrics": [
      { "value": 92, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Auditor.Auditor", "reportPath": "DafnyCore_Auditor.html", "methodName": ".cctor()", "methodShortName": ".cctor()", "fileIndex": 0, "line": 20,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitCoercionIfNecessary(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitCoercionIfNecessary(...)", "fileIndex": 0, "line": 3497,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 1061,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 1630,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InferDecreasesClause", "reportPath": "DafnyCore_InferDecreasesClause.html", "methodName": "FillInDefaultDecreases(Microsoft.Dafny.ICallable,System.Boolean)", "methodShortName": "FillInDefaultDecreases(...)", "fileIndex": 0, "line": 60,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetIndentParensExpression(System.Int32,System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.IToken>)", "methodShortName": "SetIndentParensExpression(...)", "fileIndex": 0, "line": 722,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "DoTranslation(Microsoft.Dafny.Program,Microsoft.Dafny.ModuleDefinition)", "methodShortName": "DoTranslation(...)", "fileIndex": 2, "line": 718,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddPrefixPredicateAxioms(Microsoft.Dafny.PrefixPredicate)", "methodShortName": "AddPrefixPredicateAxioms(...)", "fileIndex": 2, "line": 3024,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.TriggersCollector", "reportPath": "DafnyCore_TriggersCollector.html", "methodName": "IsPotentialTriggerCandidate(Microsoft.Dafny.Expression)", "methodShortName": "IsPotentialTriggerCandidate(...)", "fileIndex": 0, "line": 241,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Handlers.DafnyHoverHandler", "reportPath": "DafnyLanguageServer_DafnyHoverHandler.html", "methodName": "GetAssertionInformation(Microsoft.Dafny.LanguageServer.Workspace.IdeState,OmniSharp.Extensions.LanguageServer.Protocol.Models.Position,Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionVerificationTree,Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionBatchVerificationTree,System.Int32,System.Int32,Microsoft.Dafny.LanguageServer.Workspace.Notifications.TopLevelDeclMemberVerificationTree)", "methodShortName": "GetAssertionInformation(...)", "fileIndex": 0, "line": 198,
    "metrics": [
      { "value": 88, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ASTVisitor<T>", "reportPath": "DafnyCore_ASTVisitor_1.html", "methodName": "VisitExpression(Microsoft.Dafny.Expression,VisitorContext)", "methodShortName": "VisitExpression(...)", "fileIndex": 0, "line": 211,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 2281,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CompileDatatypeDowncastClone(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.Boolean,System.Boolean,Microsoft.Dafny.DatatypeCtor)", "methodShortName": "CompileDatatypeDowncastClone(...)", "fileIndex": 0, "line": 609,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "DatatypeFieldsAndConstructor(Microsoft.Dafny.DatatypeCtor,System.Int32,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DatatypeFieldsAndConstructor(...)", "fileIndex": 0, "line": 891,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Method", "reportPath": "DafnyCore_Method.html", "methodName": "Resolve(Microsoft.Dafny.Resolver)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 222,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UnderspecificationDetector", "reportPath": "DafnyCore_UnderspecificationDetector.html", "methodName": "Check(System.Collections.Generic.List`1<Microsoft.Dafny.TopLevelDecl>)", "methodShortName": "Check(...)", "fileIndex": 0, "line": 34,
    "metrics": [
      { "value": 84, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitTypeDescriptorMethod(Microsoft.Dafny.TopLevelDecl,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.String,System.String,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitTypeDescriptorMethod(...)", "fileIndex": 0, "line": 956,
    "metrics": [
      { "value": 82, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 1758,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,Microsoft.Dafny.MemberDecl)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 1374,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "TypeDescriptor(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken)", "methodShortName": "TypeDescriptor(...)", "fileIndex": 0, "line": 1600,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 2415,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "EmitMemberSelect(System.Action`1<Microsoft.Dafny.ConcreteSyntaxTree>,Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,Microsoft.Dafny.Type,System.String,System.Boolean)", "methodShortName": "EmitMemberSelect(...)", "fileIndex": 0, "line": 1200,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MatchFlattener", "reportPath": "DafnyCore_MatchFlattener.html", "methodName": "CompileHeadsContainingConstructor(Microsoft.Dafny.MatchFlattener/MatchCompilationState,Microsoft.Dafny.MatchingContext,Microsoft.Dafny.Cons`1<Microsoft.Dafny.Expression>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,System.Collections.Generic.Dictionary`2<System.String,Microsoft.Dafny.DatatypeCtor>,System.Collections.Generic.List`1<Microsoft.Dafny.MatchFlattener/PatternPath>)", "methodShortName": "CompileHeadsContainingConstructor(...)", "fileIndex": 0, "line": 313,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "SynonymTypeDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TopLevelDecl&)", "methodShortName": "SynonymTypeDecl(...)", "fileIndex": 0, "line": 1384,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintMethod(Microsoft.Dafny.Method,System.Int32,System.Boolean)", "methodShortName": "PrintMethod(...)", "fileIndex": 0, "line": 984,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.SourcePreprocessor", "reportPath": "DafnyCore_SourcePreprocessor.html", "methodName": "ProcessDirectives(System.IO.TextReader,System.Collections.Generic.List`1<System.String>,System.String)", "methodShortName": "ProcessDirectives(...)", "fileIndex": 0, "line": 69,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Substituter", "reportPath": "DafnyCore_Substituter.html", "methodName": "SubstituteBoundedPool(Microsoft.Dafny.ComprehensionExpr/BoundedPool)", "methodShortName": "SubstituteBoundedPool(...)", "fileIndex": 0, "line": 505,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Substituter", "reportPath": "DafnyCore_Substituter.html", "methodName": "SubstituteComprehensionExpr(Microsoft.Dafny.ComprehensionExpr,System.Boolean)", "methodShortName": "SubstituteComprehensionExpr(...)", "fileIndex": 0, "line": 1028,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddArrowTypeAxioms(Microsoft.Dafny.ArrowTypeDecl)", "methodShortName": "AddArrowTypeAxioms(...)", "fileIndex": 2, "line": 5971,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CheckDistinctness(Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "CheckDistinctness(...)", "fileIndex": 2, "line": 8571,
    "metrics": [
      { "value": 80, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Cloner", "reportPath": "DafnyCore_Cloner.html", "methodName": "CloneDeclaration(Microsoft.Dafny.TopLevelDecl,Microsoft.Dafny.ModuleDefinition)", "methodShortName": "CloneDeclaration(...)", "fileIndex": 0, "line": 52,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "TypeDescriptor(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken)", "methodShortName": "TypeDescriptor(...)", "fileIndex": 0, "line": 555,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileCollection(Microsoft.Dafny.ComprehensionExpr/BoundedPool,Microsoft.Dafny.IVariable,System.Boolean,System.Boolean,Microsoft.Dafny.Substituter,Microsoft.Dafny.ConcreteSyntaxTree&,Microsoft.Dafny.ConcreteSyntaxTree,System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>,System.Collections.Generic.List`1<Microsoft.Dafny.BoundVar>,System.Int32)", "methodShortName": "CompileCollection(...)", "fileIndex": 0, "line": 3515,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IsNonArrowType(Microsoft.Dafny.IToken&)", "methodShortName": "IsNonArrowType(...)", "fileIndex": 0, "line": 860,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PrintEffectEnforcement", "reportPath": "DafnyCore_PrintEffectEnforcement.html", "methodName": "PostDecreasesResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PostDecreasesResolve(...)", "fileIndex": 0, "line": 16,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckVariance(Microsoft.Dafny.Type,Microsoft.Dafny.ICallable,Microsoft.Dafny.TypeParameter/TPVariance,System.Boolean)", "methodShortName": "CheckVariance(...)", "fileIndex": 1, "line": 5563,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrType(Microsoft.Dafny.Type)", "methodShortName": "TrType(...)", "fileIndex": 2, "line": 7131,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CompatibleDecreasesTypes(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "CompatibleDecreasesTypes(...)", "fileIndex": 2, "line": 8025,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.TriggersCollector", "reportPath": "DafnyCore_TriggersCollector.html", "methodName": "Annotate(Microsoft.Dafny.Expression)", "methodShortName": "Annotate(...)", "fileIndex": 0, "line": 190,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.CommandRegistry", "reportPath": "DafnyDriver_CommandRegistry.html", "methodName": "Create(System.IO.TextWriter,System.IO.TextWriter,System.IO.TextReader,System.String[])", "methodShortName": "Create(...)", "fileIndex": 0, "line": 83,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.DafnyDriver", "reportPath": "DafnyDriver_DafnyDriver.html", "methodName": "CompileDafnyProgram()", "methodShortName": "CompileDafnyProgram()", "fileIndex": 0, "line": 845,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Handlers.DafnyHoverHandler", "reportPath": "DafnyLanguageServer_DafnyHoverHandler.html", "methodName": "GetDiagnosticsHover(Microsoft.Dafny.LanguageServer.Workspace.IdeState,OmniSharp.Extensions.LanguageServer.Protocol.Models.Position,System.Boolean&)", "methodShortName": "GetDiagnosticsHover(...)", "fileIndex": 0, "line": 73,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Plugins.DafnyCodeActionHelpers", "reportPath": "DafnyLanguageServer_DafnyCodeActionHelpers.html", "methodName": "GetMatchingEndToken(Microsoft.Dafny.Program,System.String,System.Int32,System.Int32)", "methodShortName": "GetMatchingEndToken(...)", "fileIndex": 0, "line": 130,
    "metrics": [
      { "value": 76, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ASTVisitor<T>", "reportPath": "DafnyCore_ASTVisitor_1.html", "methodName": "VisitStatement(Microsoft.Dafny.Statement,VisitorContext)", "methodShortName": "VisitStatement(...)", "fileIndex": 0, "line": 323,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 2012,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "IsPermittedAsMain(Microsoft.Dafny.Program,Microsoft.Dafny.Method,System.String&)", "methodShortName": "IsPermittedAsMain(...)", "fileIndex": 0, "line": 1706,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "EmitCallToInheritedMethod(Microsoft.Dafny.Method,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitCallToInheritedMethod(...)", "fileIndex": 0, "line": 2174,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneExpression(Microsoft.Dafny.Expression,Microsoft.Dafny.Resolver/BoundsDiscoveryVisitor/BoundsDiscoveryContext)", "methodShortName": "VisitOneExpression(...)", "fileIndex": 0, "line": 179,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveCallStmt(Microsoft.Dafny.CallStmt,Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.Type)", "methodShortName": "ResolveCallStmt(...)", "fileIndex": 1, "line": 3625,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "JoinOfAllSubtypes(Microsoft.Dafny.Type,Microsoft.Dafny.Type&,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>)", "methodShortName": "JoinOfAllSubtypes(...)", "fileIndex": 1, "line": 5437,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveOpenedImportsWorker(Microsoft.Dafny.ModuleSignature,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.ModuleDecl,System.Collections.Generic.HashSet`1<Microsoft.Dafny.ModuleSignature>,System.Boolean,Microsoft.Dafny.TopLevelDecl&)", "methodShortName": "ResolveOpenedImportsWorker(...)", "fileIndex": 2, "line": 1608,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckCanBeConstructed(Microsoft.Dafny.Type,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeParameter>)", "methodShortName": "CheckCanBeConstructed(...)", "fileIndex": 2, "line": 5399,
    "metrics": [
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ConstAtomExpression(Microsoft.Dafny.Expression&)", "methodShortName": "ConstAtomExpression(...)", "fileIndex": 0, "line": 6029,
    "metrics": [
      { "value": 70, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Abstemious", "reportPath": "DafnyCore_Abstemious.html", "methodName": "CheckDestructsAreAbstemiousCompliant(Microsoft.Dafny.Expression)", "methodShortName": "CheckDestructsAreAbstemiousCompliant(...)", "fileIndex": 0, "line": 26,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AssignOrReturnStmt", "reportPath": "DafnyCore_AssignOrReturnStmt.html", "methodName": "DesugarElephantStatement(System.Boolean,Microsoft.Dafny.Expression,Microsoft.Dafny.Type,Microsoft.Dafny.Resolver,Microsoft.Dafny.Method)", "methodShortName": "DesugarElephantStatement(...)", "fileIndex": 0, "line": 249,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,Microsoft.Dafny.MemberDecl)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 838,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "EmitConversionExpr(Microsoft.Dafny.ConversionExpr,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitConversionExpr(...)", "fileIndex": 0, "line": 1607,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Expression", "reportPath": "DafnyCore_Expression.html", "methodName": "CreateNot(Microsoft.Dafny.IToken,Microsoft.Dafny.Expression)", "methodShortName": "CreateNot(...)", "fileIndex": 0, "line": 517,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "NewtypeDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TopLevelDecl&)", "methodShortName": "NewtypeDecl(...)", "fileIndex": 0, "line": 1303,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "LetExprWithLHS(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "LetExprWithLHS(...)", "fileIndex": 0, "line": 6487,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CheckAgreement_Parameters(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.String,System.String,System.String)", "methodShortName": "CheckAgreement_Parameters(...)", "fileIndex": 0, "line": 947,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "RegisterMembers(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TopLevelDeclWithMembers,System.Collections.Generic.Dictionary`2<System.String,Microsoft.Dafny.MemberDecl>)", "methodShortName": "RegisterMembers(...)", "fileIndex": 2, "line": 1899,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FillInPostConditionsAndBodiesOfPrefixLemmas(System.Collections.Generic.List`1<Microsoft.Dafny.TopLevelDecl>)", "methodShortName": "FillInPostConditionsAndBodiesOfPrefixLemmas(...)", "fileIndex": 2, "line": 2933,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FreeVariables(Microsoft.Dafny.Expression)", "methodShortName": "FreeVariables(...)", "fileIndex": 2, "line": 6476,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrSplitFunctionCallExpr(Microsoft.Dafny.Expression,System.Collections.Generic.List`1<Microsoft.Dafny.Translator/SplitExprInfo>,System.Int32,System.Boolean,System.Boolean,Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Dafny.FunctionCallExpr)", "methodShortName": "TrSplitFunctionCallExpr(...)", "fileIndex": 2, "line": 10456,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FindFuelAttributes(Microsoft.Dafny.Attributes,Microsoft.Dafny.Translator/FuelContext)", "methodShortName": "FindFuelAttributes(...)", "fileIndex": 2, "line": 9792,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.QuantifiersCollection", "reportPath": "DafnyCore_QuantifiersCollection.html", "methodName": "CommitOne(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Triggers.QuantifierWithTriggers,System.Boolean)", "methodShortName": "CommitOne(...)", "fileIndex": 0, "line": 286,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.VerificationProgressReporter", "reportPath": "DafnyLanguageServer_VerificationProgressReporter.html", "methodName": "UpdateTree(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.LanguageServer.Workspace.DocumentAfterParsing,Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationTree)", "methodShortName": "UpdateTree(...)", "fileIndex": 0, "line": 38,
    "metrics": [
      { "value": 68, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "TopDecl(Microsoft.Dafny.ModuleDefinition,System.Collections.Generic.List`1<Microsoft.Dafny.MemberDecl>,System.Boolean,System.Boolean)", "methodShortName": "TopDecl(...)", "fileIndex": 0, "line": 1094,
    "metrics": [
      { "value": 66, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.TriggersCollector", "reportPath": "DafnyCore_TriggersCollector.html", "methodName": "TranslateToFunctionCall(Microsoft.Dafny.Expression)", "methodShortName": "TranslateToFunctionCall(...)", "fileIndex": 0, "line": 278,
    "metrics": [
      { "value": 66, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CoCallResolution", "reportPath": "DafnyCore_CoCallResolution.html", "methodName": "GuaranteedCoCtorsAux(Microsoft.Dafny.Expression)", "methodShortName": "GuaranteedCoCtorsAux(...)", "fileIndex": 0, "line": 7047,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CompileDatatypeBase(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileDatatypeBase(...)", "fileIndex": 0, "line": 416,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExtremeLemmaSpecificationSubstituter", "reportPath": "DafnyCore_ExtremeLemmaSpecificationSubstituter.html", "methodName": "CloneExpr(Microsoft.Dafny.Expression)", "methodShortName": "CloneExpr(...)", "fileIndex": 0, "line": 26,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Function", "reportPath": "DafnyCore_Function.html", "methodName": "Resolve(Microsoft.Dafny.Resolver)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 362,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MatchFlattener", "reportPath": "DafnyCore_MatchFlattener.html", "methodName": "CompileHeadsContainingLiteralPattern(Microsoft.Dafny.MatchFlattener/MatchCompilationState,Microsoft.Dafny.MatchingContext,Microsoft.Dafny.Cons`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Dafny.MatchFlattener/PatternPath>)", "methodShortName": "CompileHeadsContainingLiteralPattern(...)", "fileIndex": 0, "line": 451,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Method", "reportPath": "DafnyCore_Method.html", "methodName": "Assumptions()", "methodShortName": "Assumptions()", "fileIndex": 0, "line": 41,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "WhileStmt(Microsoft.Dafny.Statement&)", "methodShortName": "WhileStmt(...)", "fileIndex": 0, "line": 4075,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "GetRelatedTypeProxies(Microsoft.Dafny.Type,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>)", "methodShortName": "GetRelatedTypeProxies(...)", "fileIndex": 1, "line": 5401,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "MeetOfAllSupertypes(Microsoft.Dafny.Type,Microsoft.Dafny.Type&,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>,System.Boolean)", "methodShortName": "MeetOfAllSupertypes(...)", "fileIndex": 1, "line": 5497,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "BindModuleNames(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.Resolver/ModuleBindings)", "methodShortName": "BindModuleNames(...)", "fileIndex": 2, "line": 1269,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveClassMembers_Pass1(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "ResolveClassMembers_Pass1(...)", "fileIndex": 2, "line": 3096,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "InferRequiredEqualitySupport(Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type)", "methodShortName": "InferRequiredEqualitySupport(...)", "fileIndex": 2, "line": 4835,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "CheckHasNoRecursiveCall(Microsoft.Dafny.Expression,Microsoft.Dafny.Function,System.Boolean)", "methodShortName": "CheckHasNoRecursiveCall(...)", "fileIndex": 0, "line": 602,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GenerateMethodParametersChoose(Microsoft.Dafny.IToken,Microsoft.Dafny.IMethodCodeContext,Microsoft.Dafny.Translator/MethodTranslationKind,System.Boolean,System.Boolean,System.Boolean,Microsoft.Dafny.Translator/ExpressionTranslator,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>&)", "methodShortName": "GenerateMethodParametersChoose(...)", "fileIndex": 2, "line": 6873,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TypeToTy(Microsoft.Dafny.Type)", "methodShortName": "TypeToTy(...)", "fileIndex": 2, "line": 8242,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TypeProxy", "reportPath": "DafnyCore_TypeProxy.html", "methodName": "GetFamily(Microsoft.Dafny.Type)", "methodShortName": "GetFamily(...)", "fileIndex": 0, "line": 2752,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UserDefinedType", "reportPath": "DafnyCore_UserDefinedType.html", "methodName": "ComputeMayInvolveReferences(System.Collections.Generic.ISet`1<Microsoft.Dafny.DatatypeDecl>)", "methodShortName": "ComputeMayInvolveReferences(...)", "fileIndex": 0, "line": 2583,
    "metrics": [
      { "value": 64, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AutoContractsRewriter", "reportPath": "DafnyCore_AutoContractsRewriter.html", "methodName": "ProcessClassPreResolve(Microsoft.Dafny.ClassDecl)", "methodShortName": "ProcessClassPreResolve(...)", "fileIndex": 0, "line": 77,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CalcStmt", "reportPath": "DafnyCore_CalcStmt.html", "methodName": "Subsumes(Microsoft.Dafny.CalcStmt/BinaryCalcOp)", "methodShortName": "Subsumes(...)", "fileIndex": 0, "line": 61,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpBackend", "reportPath": "DafnyCore_CsharpBackend.html", "methodName": "CompileTargetProgram(System.String,System.String,System.String,System.String,System.Collections.ObjectModel.ReadOnlyCollection`1<System.String>,System.Boolean,System.IO.TextWriter,System.Object&)", "methodShortName": "CompileTargetProgram(...)", "fileIndex": 0, "line": 45,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "NeedsCustomReceiver(Microsoft.Dafny.MemberDecl)", "methodShortName": "NeedsCustomReceiver(...)", "fileIndex": 0, "line": 823,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CreateMethod(Microsoft.Dafny.Method,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.Boolean)", "methodShortName": "CreateMethod(...)", "fileIndex": 0, "line": 505,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "IsTargetSupertype(Microsoft.Dafny.Type,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "IsTargetSupertype(...)", "fileIndex": 0, "line": 786,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Function", "reportPath": "DafnyCore_Function.html", "methodName": "Assumptions()", "methodShortName": "Assumptions()", "fileIndex": 0, "line": 46,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ConstantFieldDecl(Microsoft.Dafny.Parser/DeclModifierData,System.Collections.Generic.List`1<Microsoft.Dafny.MemberDecl>,System.Boolean)", "methodShortName": "ConstantFieldDecl(...)", "fileIndex": 0, "line": 2008,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "AssignKnownEndsFullstrength(Microsoft.Dafny.TypeProxy)", "methodShortName": "AssignKnownEndsFullstrength(...)", "fileIndex": 1, "line": 2943,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "AssignKnownEndsFullstrength_SuperDirection(Microsoft.Dafny.TypeProxy)", "methodShortName": "AssignKnownEndsFullstrength_SuperDirection(...)", "fileIndex": 1, "line": 3119,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveFunctionCallExpr(Microsoft.Dafny.FunctionCallExpr,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveFunctionCallExpr(...)", "fileIndex": 1, "line": 6572,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckOverride_ResolvedParameters(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,System.String,System.String,System.String,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>)", "methodShortName": "CheckOverride_ResolvedParameters(...)", "fileIndex": 2, "line": 5257,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitType(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "VisitType(...)", "fileIndex": 2, "line": 4496,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckCharacteristics(Microsoft.Dafny.TypeParameter/TypeParameterCharacteristics,Microsoft.Dafny.Type,System.Boolean,System.String&,System.String&)", "methodShortName": "CheckCharacteristics(...)", "fileIndex": 2, "line": 4562,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "SetDeclIndentation(Microsoft.Dafny.TopLevelDecl,System.Int32)", "methodShortName": "SetDeclIndentation(...)", "fileIndex": 0, "line": 403,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FunctionHandle(Microsoft.Dafny.Function)", "methodShortName": "FunctionHandle(...)", "fileIndex": 2, "line": 5753,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "Zero(Microsoft.Dafny.IToken,Microsoft.Dafny.Type)", "methodShortName": "Zero(...)", "fileIndex": 2, "line": 7712,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.QuantifierSplitter", "reportPath": "DafnyCore_QuantifierSplitter.html", "methodName": "SplitExpr()", "methodShortName": "SplitExpr()", "fileIndex": 0, "line": 41,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.ProgramModification", "reportPath": "DafnyTestGeneration_ProgramModification.html", "methodName": "GetCounterExampleLog()", "methodShortName": "GetCounterExampleLog()", "fileIndex": 0, "line": 101,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.ProgramModifier", "reportPath": "DafnyTestGeneration_ProgramModifier.html", "methodName": "TryConvertFunctionCall(Microsoft.Boogie.NAryExpr)", "methodShortName": "TryConvertFunctionCall(...)", "fileIndex": 0, "line": 440,
    "metrics": [
      { "value": 60, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "RelOp(Microsoft.Dafny.IToken&,Microsoft.Dafny.BinaryExpr/Opcode&,Microsoft.Dafny.Expression&)", "methodShortName": "RelOp(...)", "fileIndex": 0, "line": 5415,
    "metrics": [
      { "value": 58, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Attributes", "reportPath": "DafnyCore_Attributes.html", "methodName": "ContainsMatchingValue(Microsoft.Dafny.Attributes,System.String,System.Object&,System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.Attributes/MatchingValueOption>,System.Action`1<System.String>)", "methodShortName": "ContainsMatchingValue(...)", "fileIndex": 0, "line": 314,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CommonOptionBag", "reportPath": "DafnyCore_CommonOptionBag.html", "methodName": ".cctor()", "methodShortName": ".cctor()", "fileIndex": 0, "line": 12,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "CreateMethod(Microsoft.Dafny.Method,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean)", "methodShortName": "CreateMethod(...)", "fileIndex": 0, "line": 756,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "TypeHelperName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,Microsoft.Dafny.Type)", "methodShortName": "TypeHelperName(...)", "fileIndex": 0, "line": 1446,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitToString(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.Expression,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitToString(...)", "fileIndex": 0, "line": 2162,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 1314,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ConsoleErrorReporter", "reportPath": "DafnyCore_ConsoleErrorReporter.html", "methodName": "Message(Microsoft.Dafny.MessageSource,Microsoft.Dafny.ErrorLevel,System.String,Microsoft.Dafny.IToken,System.String)", "methodShortName": "Message(...)", "fileIndex": 0, "line": 186,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DafnyMain", "reportPath": "DafnyCore_DafnyMain.html", "methodName": "Parse(System.IO.TextReader,System.Collections.Generic.IList`1<Microsoft.Dafny.DafnyFile>,System.String,Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Program&)", "methodShortName": "Parse(...)", "fileIndex": 0, "line": 56,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "CheckDeclModifiers(Microsoft.Dafny.Parser/DeclModifierData&,System.String,Microsoft.Dafny.Parser/AllowedDeclModifiers)", "methodShortName": "CheckDeclModifiers(...)", "fileIndex": 0, "line": 217,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "DatatypeDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.DatatypeDecl&)", "methodShortName": "DatatypeDecl(...)", "fileIndex": 0, "line": 1242,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "Rhs(Microsoft.Dafny.AssignmentRhs&)", "methodShortName": "Rhs(...)", "fileIndex": 0, "line": 4623,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "LogicalExpression(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "LogicalExpression(...)", "fileIndex": 0, "line": 5221,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "EndlessExpression(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "EndlessExpression(...)", "fileIndex": 0, "line": 5919,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PreTypeResolver", "reportPath": "DafnyCore_PreTypeResolver.html", "methodName": "Type2Decl(Microsoft.Dafny.Type)", "methodShortName": "Type2Decl(...)", "fileIndex": 0, "line": 188,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintMembers(System.Collections.Generic.List`1<Microsoft.Dafny.MemberDecl>,System.Int32,System.String)", "methodShortName": "PrintMembers(...)", "fileIndex": 0, "line": 696,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintFunction(Microsoft.Dafny.Function,System.Int32,System.Boolean)", "methodShortName": "PrintFunction(...)", "fileIndex": 0, "line": 910,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintRhs(Microsoft.Dafny.AssignmentRhs)", "methodShortName": "PrintRhs(...)", "fileIndex": 0, "line": 1846,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CheckIsOkayNewStatement(Microsoft.Dafny.Statement,System.Collections.Generic.Stack`1<System.String>,System.Int32)", "methodShortName": "CheckIsOkayNewStatement(...)", "fileIndex": 0, "line": 1554,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "AssignKnownEnd(Microsoft.Dafny.TypeProxy,System.Boolean,System.Boolean)", "methodShortName": "AssignKnownEnd(...)", "fileIndex": 1, "line": 2891,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckModuleExportConsistency(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "CheckModuleExportConsistency(...)", "fileIndex": 2, "line": 1160,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckForFuelAdjustments(Microsoft.Dafny.IToken,Microsoft.Dafny.Attributes,Microsoft.Dafny.ModuleDefinition)", "methodShortName": "CheckForFuelAdjustments(...)", "fileIndex": 2, "line": 3950,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.Resolver/CallingPosition&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 2, "line": 6780,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.SubsetConstraintGhostChecker", "reportPath": "DafnyCore_SubsetConstraintGhostChecker.html", "methodName": "Traverse(Microsoft.Dafny.Expression,System.String,System.Object)", "methodShortName": "Traverse(...)", "fileIndex": 0, "line": 71,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TimeLimitRewriter", "reportPath": "DafnyCore_TimeLimitRewriter.html", "methodName": "PreResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PreResolve(...)", "fileIndex": 0, "line": 16,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFunctionOverrideCheckImpl(Microsoft.Dafny.Function)", "methodShortName": "AddFunctionOverrideCheckImpl(...)", "fileIndex": 1, "line": 820,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddIteratorProc(Microsoft.Dafny.IteratorDecl,Microsoft.Dafny.Translator/MethodTranslationKind)", "methodShortName": "AddIteratorProc(...)", "fileIndex": 2, "line": 1604,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddWellformednessCheck(Microsoft.Dafny.RedirectingTypeDecl)", "methodShortName": "AddWellformednessCheck(...)", "fileIndex": 2, "line": 4496,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetOrCreateFunction(Microsoft.Dafny.Function)", "methodShortName": "GetOrCreateFunction(...)", "fileIndex": 2, "line": 6724,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrAttributes(Microsoft.Dafny.Attributes,System.String)", "methodShortName": "TrAttributes(...)", "fileIndex": 4, "line": 1923,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrForLoop(Microsoft.Dafny.ForLoopStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrForLoop(...)", "fileIndex": 6, "line": 852,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrForallStmtCall(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Dafny.BoundVar>,System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>,Microsoft.Dafny.Expression,Microsoft.Dafny.Translator/ExpressionConverter,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,Microsoft.Dafny.CallStmt,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrForallStmtCall(...)", "fileIndex": 6, "line": 1970,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UserDefinedType", "reportPath": "DafnyCore_UserDefinedType.html", "methodName": "get_SupportsEquality()", "methodShortName": "get_SupportsEquality()", "fileIndex": 0, "line": 2516,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Util", "reportPath": "DafnyCore_Util.html", "methodName": "BuildFunctionCallGraph(Microsoft.Dafny.Program)", "methodShortName": "BuildFunctionCallGraph(...)", "fileIndex": 0, "line": 449,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Util", "reportPath": "DafnyCore_Util.html", "methodName": "PrintStats(Microsoft.Dafny.Program)", "methodShortName": "PrintStats(...)", "fileIndex": 0, "line": 540,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.SyntaxTreeVisitor", "reportPath": "DafnyLanguageServer_SyntaxTreeVisitor.html", "methodName": "Visit(Microsoft.Dafny.Statement)", "methodShortName": "Visit(...)", "fileIndex": 0, "line": 164,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Plugins.DafnyCodeActionHelpers", "reportPath": "DafnyLanguageServer_DafnyCodeActionHelpers.html", "methodName": "GetIndentationBefore(Microsoft.Dafny.IToken,System.Int32,System.Int32,System.String)", "methodShortName": "GetIndentationBefore(...)", "fileIndex": 0, "line": 39,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationStatusGutter", "reportPath": "DafnyLanguageServer_VerificationStatusGutter.html", "methodName": "RenderPerLineDiagnostics(OmniSharp.Extensions.LanguageServer.Protocol.DocumentUri,Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationTree[],System.Int32,System.Boolean,OmniSharp.Extensions.LanguageServer.Protocol.Models.Container`1<OmniSharp.Extensions.LanguageServer.Protocol.Models.Diagnostic>)", "methodShortName": "RenderPerLineDiagnostics(...)", "fileIndex": 0, "line": 45,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationTree", "reportPath": "DafnyLanguageServer_VerificationTree.html", "methodName": "RenderInto(Microsoft.Dafny.LanguageServer.Workspace.Notifications.LineVerificationStatus[],System.Boolean,System.Boolean,OmniSharp.Extensions.LanguageServer.Protocol.Models.Range,OmniSharp.Extensions.LanguageServer.Protocol.Models.Range)", "methodShortName": "RenderInto(...)", "fileIndex": 0, "line": 308,
    "metrics": [
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "KeepConstraints(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "KeepConstraints(...)", "fileIndex": 1, "line": 1703,
    "metrics": [
      { "value": 54, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "AddTestCheckerIfNeeded(System.String,Microsoft.Dafny.Declaration,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "AddTestCheckerIfNeeded(...)", "fileIndex": 0, "line": 3182,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "TrExprAsInt(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.String)", "methodShortName": "TrExprAsInt(...)", "fileIndex": 0, "line": 3512,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "IsCoercionNecessary(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "IsCoercionNecessary(...)", "fileIndex": 0, "line": 3699,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileFunction(Microsoft.Dafny.Function,Microsoft.Dafny.Compilers.SinglePassCompiler/IClassWriter,System.Boolean)", "methodShortName": "CompileFunction(...)", "fileIndex": 0, "line": 2389,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileMethod(Microsoft.Dafny.Program,Microsoft.Dafny.Method,Microsoft.Dafny.Compilers.SinglePassCompiler/IClassWriter,System.Boolean)", "methodShortName": "CompileMethod(...)", "fileIndex": 0, "line": 2443,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IteratorDecl", "reportPath": "DafnyCore_IteratorDecl.html", "methodName": "CreateIteratorMethodSpecs(Microsoft.Dafny.Resolver)", "methodShortName": "CreateIteratorMethodSpecs(...)", "fileIndex": 0, "line": 189,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IfStmt(Microsoft.Dafny.Statement&)", "methodShortName": "IfStmt(...)", "fileIndex": 0, "line": 4010,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "BreakStmt(Microsoft.Dafny.Statement&)", "methodShortName": "BreakStmt(...)", "fileIndex": 0, "line": 4271,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "CalcStmt(Microsoft.Dafny.Statement&)", "methodShortName": "CalcStmt(...)", "fileIndex": 0, "line": 4308,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "PrimaryExpression(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "PrimaryExpression(...)", "fileIndex": 0, "line": 5614,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "SetDisplayExpr(Microsoft.Dafny.Expression&)", "methodShortName": "SetDisplayExpr(...)", "fileIndex": 0, "line": 5839,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PreTypeToTypeVisitor", "reportPath": "DafnyCore_PreTypeToTypeVisitor.html", "methodName": "PostVisitOneStatement(Microsoft.Dafny.Statement,Microsoft.Dafny.IASTVisitorContext)", "methodShortName": "PostVisitOneStatement(...)", "fileIndex": 0, "line": 143,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintExtendedPattern(Microsoft.Dafny.ExtendedPattern)", "methodShortName": "PrintExtendedPattern(...)", "fileIndex": 0, "line": 2936,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "PreResolveWorker(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PreResolveWorker(...)", "fileIndex": 0, "line": 209,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CloneFunction(Microsoft.Dafny.Function,Microsoft.Dafny.Function,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,System.Boolean,Microsoft.Dafny.Attributes)", "methodShortName": "CloneFunction(...)", "fileIndex": 0, "line": 531,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CheckAgreement_TypeParameters(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.String,System.String,System.Boolean)", "methodShortName": "CheckAgreement_TypeParameters(...)", "fileIndex": 0, "line": 894,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "DiscoverBestBounds_MultipleVars_AllowReordering(System.Collections.Generic.List`1<VT>,Microsoft.Dafny.Expression,System.Boolean)", "methodShortName": "DiscoverBestBounds_MultipleVars_AllowReordering(...)", "fileIndex": 0, "line": 253,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "AssignKnownEndsFullstrength_SubDirection(Microsoft.Dafny.TypeProxy)", "methodShortName": "AssignKnownEndsFullstrength_SubDirection(...)", "fileIndex": 1, "line": 2998,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckIsLvalue(Microsoft.Dafny.Expression,Microsoft.Dafny.ResolutionContext)", "methodShortName": "CheckIsLvalue(...)", "fileIndex": 1, "line": 3498,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveDotSuffix_Type(Microsoft.Dafny.ExprDotName,Microsoft.Dafny.ResolutionContext,System.Boolean,Microsoft.Dafny.Resolver/ResolveTypeOption,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>)", "methodShortName": "ResolveDotSuffix_Type(...)", "fileIndex": 1, "line": 3886,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckLocalityUpdates(Microsoft.Dafny.Statement,System.Collections.Generic.ISet`1<Microsoft.Dafny.LocalVariable>,System.String)", "methodShortName": "CheckLocalityUpdates(...)", "fileIndex": 2, "line": 6011,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.SubsetConstraintGhostChecker", "reportPath": "DafnyCore_SubsetConstraintGhostChecker.html", "methodName": "IsFieldSpecification(System.String,System.Object)", "methodShortName": "IsFieldSpecification(...)", "fileIndex": 0, "line": 63,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddMethod_Top(Microsoft.Dafny.Method,System.Boolean,System.Boolean)", "methodShortName": "AddMethod_Top(...)", "fileIndex": 1, "line": 158,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetSubrangeCheck(Microsoft.Boogie.Expr,Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.ProofObligationDescription.ProofObligationDescription&,System.String)", "methodShortName": "GetSubrangeCheck(...)", "fileIndex": 2, "line": 9124,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 2, "line": 10728,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddCoDatatypeDeclAxioms(Microsoft.Dafny.CoDatatypeDecl)", "methodShortName": "AddCoDatatypeDeclAxioms(...)", "fileIndex": 3, "line": 151,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrCalcStmt(Microsoft.Dafny.CalcStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrCalcStmt(...)", "fileIndex": 6, "line": 642,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "NormalizeExpand(System.Boolean)", "methodShortName": "NormalizeExpand(...)", "fileIndex": 0, "line": 152,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Handlers.DafnyHoverHandler", "reportPath": "DafnyLanguageServer_DafnyHoverHandler.html", "methodName": "GetTopLevelInformation(Microsoft.Dafny.LanguageServer.Workspace.Notifications.TopLevelDeclMemberVerificationTree,System.Collections.Generic.List`1<Microsoft.Dafny.LanguageServer.Workspace.Notifications.AssertionBatchVerificationTree>)", "methodShortName": "GetTopLevelInformation(...)", "fileIndex": 0, "line": 135,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyServer", "class": "DafnyServer.LegacySymbolTable", "reportPath": "DafnyServer_LegacySymbolTable.html", "methodName": "ParseBodyForFieldReferences(System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.Statement>,System.String,System.String,System.String)", "methodShortName": "ParseBodyForFieldReferences(...)", "fileIndex": 0, "line": 300,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "GetClassTypeInstance(Microsoft.Dafny.UserDefinedType,Microsoft.Dafny.Type,Microsoft.Dafny.LanguageServer.CounterExampleGeneration.DafnyModelVariable)", "methodShortName": "GetClassTypeInstance(...)", "fileIndex": 0, "line": 434,
    "metrics": [
      { "value": 52, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BinaryExpr", "reportPath": "DafnyCore_BinaryExpr.html", "methodName": "OpcodeString(Microsoft.Dafny.BinaryExpr/Opcode)", "methodShortName": "OpcodeString(...)", "fileIndex": 0, "line": 2092,
    "metrics": [
      { "value": 50, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ArrowType", "reportPath": "DafnyCore_ArrowType.html", "methodName": "PrettyArrowTypeName(Microsoft.Dafny.DafnyOptions,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.Type,Microsoft.Dafny.ModuleDefinition,System.Boolean)", "methodShortName": "PrettyArrowTypeName(...)", "fileIndex": 0, "line": 93,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CallGraphBuilder", "reportPath": "DafnyCore_CallGraphBuilder.html", "methodName": "VisitOneStatement(Microsoft.Dafny.Statement,Microsoft.Dafny.CallGraphBuilder/CallGraphBuilderContext)", "methodShortName": "VisitOneStatement(...)", "fileIndex": 0, "line": 215,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CompileDatatypeDestructorsAndAddToInterface(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree,System.String)", "methodShortName": "CompileDatatypeDestructorsAndAddToInterface(...)", "fileIndex": 0, "line": 737,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "FullTypeName(Microsoft.Dafny.UserDefinedType,Microsoft.Dafny.MemberDecl,System.Boolean)", "methodShortName": "FullTypeName(...)", "fileIndex": 0, "line": 2286,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoBackend", "reportPath": "DafnyCore_GoBackend.html", "methodName": "SendToNewGoProcess(System.String,System.String,System.Collections.ObjectModel.ReadOnlyCollection`1<System.String>,System.IO.TextWriter,System.IO.TextWriter,System.Boolean,System.Boolean)", "methodShortName": "SendToNewGoProcess(...)", "fileIndex": 0, "line": 58,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 2072,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "DeclareLocalVar(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,System.Boolean,System.String,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DeclareLocalVar(...)", "fileIndex": 0, "line": 1216,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CreateTuple(System.Int32,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateTuple(...)", "fileIndex": 0, "line": 2912,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DafnyFile", "reportPath": "DafnyCore_DafnyFile.html", "methodName": ".ctor(Microsoft.Dafny.DafnyOptions,System.String,System.Boolean)", "methodShortName": ".ctor(...)", "fileIndex": 0, "line": 55,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExprSubstituter", "reportPath": "DafnyCore_ExprSubstituter.html", "methodName": "Substitute(Microsoft.Dafny.Expression)", "methodShortName": "Substitute(...)", "fileIndex": 0, "line": 33,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Field", "reportPath": "DafnyCore_Field.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 142,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Function", "reportPath": "DafnyCore_Function.html", "methodName": "GetFunctionDeclarationKeywords(Microsoft.Dafny.DafnyOptions)", "methodShortName": "GetFunctionDeclarationKeywords(...)", "fileIndex": 0, "line": 14,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MatchFlattener", "reportPath": "DafnyCore_MatchFlattener.html", "methodName": "CompilePatternPathsForMatchee(Microsoft.Dafny.MatchFlattener/MatchCompilationState,Microsoft.Dafny.MatchingContext,System.Collections.Generic.List`1<Microsoft.Dafny.MatchFlattener/PatternPath>,Microsoft.Dafny.Cons`1<Microsoft.Dafny.Expression>)", "methodShortName": "CompilePatternPathsForMatchee(...)", "fileIndex": 0, "line": 244,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.NonglobalVariable", "reportPath": "DafnyCore_NonglobalVariable.html", "methodName": "SanitizeName(System.String)", "methodShortName": "SanitizeName(...)", "fileIndex": 0, "line": 536,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.OneBodyLoopStmt", "reportPath": "DafnyCore_OneBodyLoopStmt.html", "methodName": "ComputeBodySurrogate(Microsoft.Dafny.ErrorReporter)", "methodShortName": "ComputeBodySurrogate(...)", "fileIndex": 0, "line": 45,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "Dafny()", "methodShortName": "Dafny()", "fileIndex": 0, "line": 1041,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ClassDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TopLevelDecl&)", "methodShortName": "ClassDecl(...)", "fileIndex": 0, "line": 1183,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IteratorSpec(System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,Microsoft.Dafny.Attributes&,Microsoft.Dafny.Attributes&,Microsoft.Dafny.Attributes&)", "methodShortName": "IteratorSpec(...)", "fileIndex": 0, "line": 3124,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ForallStmt(Microsoft.Dafny.Statement&)", "methodShortName": "ForallStmt(...)", "fileIndex": 0, "line": 4418,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PreTypeToTypeVisitor", "reportPath": "DafnyCore_PreTypeToTypeVisitor.html", "methodName": "PostVisitOneExpression(Microsoft.Dafny.Expression,Microsoft.Dafny.IASTVisitorContext)", "methodShortName": "PostVisitOneExpression(...)", "fileIndex": 0, "line": 97,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ProcessAssignable(Microsoft.Dafny.TypeProxy,System.Collections.Generic.List`1<Microsoft.Dafny.Type>)", "methodShortName": "ProcessAssignable(...)", "fileIndex": 1, "line": 2728,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveIterator(Microsoft.Dafny.IteratorDecl)", "methodShortName": "ResolveIterator(...)", "fileIndex": 1, "line": 3396,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveMember(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.String,Microsoft.Dafny.NonProxyType&)", "methodShortName": "ResolveMember(...)", "fileIndex": 1, "line": 5070,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveModuleDefinition(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.ModuleSignature,System.Boolean)", "methodShortName": "ResolveModuleDefinition(...)", "fileIndex": 2, "line": 774,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveClassMemberTypes(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "ResolveClassMemberTypes(...)", "fileIndex": 2, "line": 5024,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "LiberalRHSVisit(Microsoft.Dafny.Expression)", "methodShortName": "LiberalRHSVisit(...)", "fileIndex": 2, "line": 4771,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RunAllTestsMainMethod", "reportPath": "DafnyCore_RunAllTestsMainMethod.html", "methodName": "PostResolve(Microsoft.Dafny.Program)", "methodShortName": "PostResolve(...)", "fileIndex": 0, "line": 86,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFrameAxiom(Microsoft.Dafny.Function)", "methodShortName": "AddFrameAxiom(...)", "fileIndex": 2, "line": 4003,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "DecreasesCheck(System.Collections.Generic.List`1<Microsoft.Dafny.IToken>,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Boogie.Expr>,System.Collections.Generic.List`1<Microsoft.Boogie.Expr>,Microsoft.Dafny.BoogieStmtListBuilder,System.String,System.Boolean,System.Boolean)", "methodShortName": "DecreasesCheck(...)", "fileIndex": 2, "line": 7957,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GAsVars(Microsoft.Dafny.Translator,System.Boolean,Microsoft.Boogie.Expr&,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "GAsVars(...)", "fileIndex": 2, "line": 9475,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FunctionInvocationArguments(Microsoft.Dafny.FunctionCallExpr,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr,System.Boolean,System.Boolean&)", "methodShortName": "FunctionInvocationArguments(...)", "fileIndex": 4, "line": 1651,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrInSet_Aux(Microsoft.Dafny.IToken,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr,Microsoft.Dafny.Expression,System.Boolean,System.Boolean&)", "methodShortName": "TrInSet_Aux(...)", "fileIndex": 4, "line": 1771,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "AllSubExpressions()", "methodShortName": "AllSubExpressions()", "fileIndex": 0, "line": 54,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UserDefinedType", "reportPath": "DafnyCore_UserDefinedType.html", "methodName": "Subst(System.Collections.Generic.IDictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>)", "methodShortName": "Subst(...)", "fileIndex": 0, "line": 2410,
    "metrics": [
      { "value": 48, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Auditor.AuditReport", "reportPath": "DafnyCore_AuditReport.html", "methodName": "RenderMarkdownIETF()", "methodShortName": "RenderMarkdownIETF()", "fileIndex": 0, "line": 121,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.AutoReqFunctionRewriter", "reportPath": "DafnyCore_AutoReqFunctionRewriter.html", "methodName": "PostResolveIntermediate(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PostResolveIntermediate(...)", "fileIndex": 0, "line": 22,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BoogieOptionBag", "reportPath": "DafnyCore_BoogieOptionBag.html", "methodName": ".cctor()", "methodShortName": ".cctor()", "fileIndex": 0, "line": 13,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CallGraphBuilder", "reportPath": "DafnyCore_CallGraphBuilder.html", "methodName": "VisitOneExpression(Microsoft.Dafny.Expression,Microsoft.Dafny.CallGraphBuilder/CallGraphBuilderContext)", "methodShortName": "VisitOneExpression(...)", "fileIndex": 0, "line": 151,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Cloner", "reportPath": "DafnyCore_Cloner.html", "methodName": "CloneType(Microsoft.Dafny.Type)", "methodShortName": "CloneType(...)", "fileIndex": 0, "line": 188,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 1438,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaBackend", "reportPath": "DafnyCore_JavaBackend.html", "methodName": "CompileTargetProgram(System.String,System.String,System.String,System.String,System.Collections.ObjectModel.ReadOnlyCollection`1<System.String>,System.Boolean,System.IO.TextWriter,System.Object&)", "methodShortName": "CompileTargetProgram(...)", "fileIndex": 0, "line": 63,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "DeclareDatatype(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "DeclareDatatype(...)", "fileIndex": 0, "line": 241,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "EmitMultiAssignment(System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/ILvalue>,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Dafny.ConcreteSyntaxTree>&,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitMultiAssignment(...)", "fileIndex": 0, "line": 420,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "NeedsCustomReceiver(Microsoft.Dafny.MemberDecl)", "methodShortName": "NeedsCustomReceiver(...)", "fileIndex": 0, "line": 1804,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "PartiallyEvaluate(Microsoft.Dafny.Expression)", "methodShortName": "PartiallyEvaluate(...)", "fileIndex": 0, "line": 5421,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DafnyOptions", "reportPath": "DafnyCore_DafnyOptions.html", "methodName": "SetZ3ExecutablePath()", "methodShortName": "SetZ3ExecutablePath()", "fileIndex": 0, "line": 1092,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Function", "reportPath": "DafnyCore_Function.html", "methodName": ".ctor(Microsoft.Dafny.RangeToken,Microsoft.Dafny.Name,System.Boolean,System.Boolean,System.Boolean,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.Formal,Microsoft.Dafny.Type,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,Microsoft.Dafny.Specification`1<Microsoft.Dafny.Expression>,Microsoft.Dafny.Expression,Microsoft.Dafny.IToken,Microsoft.Dafny.BlockStmt,Microsoft.Dafny.Attributes,Microsoft.Dafny.IToken)", "methodShortName": ".ctor(...)", "fileIndex": 0, "line": 81,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IdPattern", "reportPath": "DafnyCore_IdPattern.html", "methodName": "Resolve(Microsoft.Dafny.Resolver,Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.Type,System.Boolean,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 91,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InductionRewriter", "reportPath": "DafnyCore_InductionRewriter.html", "methodName": "PostDecreasesResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PostDecreasesResolve(...)", "fileIndex": 0, "line": 12,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IteratorDecl", "reportPath": "DafnyCore_IteratorDecl.html", "methodName": "Resolve(Microsoft.Dafny.Resolver)", "methodShortName": "Resolve(...)", "fileIndex": 0, "line": 322,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IteratorDecl", "reportPath": "DafnyCore_IteratorDecl.html", "methodName": "get_SubExpressions()", "methodShortName": "get_SubExpressions()", "fileIndex": 0, "line": 78,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.LambdaExpr", "reportPath": "DafnyCore_LambdaExpr.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 2645,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MemberSelectExpr", "reportPath": "DafnyCore_MemberSelectExpr.html", "methodName": "TypeArgumentSubstitutionsWithParentsAux(Microsoft.Dafny.Type,Microsoft.Dafny.MemberDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Type>)", "methodShortName": "TypeArgumentSubstitutionsWithParentsAux(...)", "fileIndex": 0, "line": 140,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ModifyStmt", "reportPath": "DafnyCore_ModifyStmt.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 44,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IteratorDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.IteratorDecl&)", "methodShortName": "IteratorDecl(...)", "fileIndex": 0, "line": 1471,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "LoopSpec(System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>&,Microsoft.Dafny.Attributes&,Microsoft.Dafny.Attributes&)", "methodShortName": "LoopSpec(...)", "fileIndex": 0, "line": 4907,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "BitvectorFactor(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "BitvectorFactor(...)", "fileIndex": 0, "line": 5533,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ParensExpression(Microsoft.Dafny.Expression&)", "methodShortName": "ParensExpression(...)", "fileIndex": 0, "line": 6169,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PrintEffectEnforcement", "reportPath": "DafnyCore_PrintEffectEnforcement.html", "methodName": "CheckNoPrintEffects(Microsoft.Dafny.Statement,Microsoft.Dafny.IMethodCodeContext)", "methodShortName": "CheckNoPrintEffects(...)", "fileIndex": 0, "line": 62,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintUpdateRHS(Microsoft.Dafny.ConcreteUpdateStatement,System.Int32)", "methodShortName": "PrintUpdateRHS(...)", "fileIndex": 0, "line": 1686,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "MergeIterator(Microsoft.Dafny.IteratorDecl,Microsoft.Dafny.IteratorDecl)", "methodShortName": "MergeIterator(...)", "fileIndex": 0, "line": 649,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CheckIsOkayUpdateStmt(Microsoft.Dafny.ConcreteUpdateStatement,Microsoft.Dafny.ModuleDefinition)", "methodShortName": "CheckIsOkayUpdateStmt(...)", "fileIndex": 0, "line": 1601,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveClassMemberBodies(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "ResolveClassMemberBodies(...)", "fileIndex": 1, "line": 3245,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveDatatypeUpdate(Microsoft.Dafny.IToken,Microsoft.Dafny.Expression,Microsoft.Dafny.DatatypeDecl,System.Collections.Generic.List`1<System.Tuple`3<Microsoft.Dafny.IToken,System.String,Microsoft.Dafny.Expression>>,Microsoft.Dafny.ResolutionContext,System.Collections.Generic.List`1<Microsoft.Dafny.MemberDecl>&,System.Collections.Generic.List`1<Microsoft.Dafny.DatatypeCtor>&)", "methodShortName": "ResolveDatatypeUpdate(...)", "fileIndex": 1, "line": 5654,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveParentTraitTypes(Microsoft.Dafny.TopLevelDeclWithMembers,Microsoft.Dafny.Graph`1<Microsoft.Dafny.TopLevelDeclWithMembers>)", "methodShortName": "ResolveParentTraitTypes(...)", "fileIndex": 2, "line": 4889,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "ConfirmTailCall(Microsoft.Dafny.IToken,Microsoft.Dafny.Method,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Boolean)", "methodShortName": "ConfirmTailCall(...)", "fileIndex": 0, "line": 309,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "DetermineTailRecursion(Microsoft.Dafny.Function)", "methodShortName": "DetermineTailRecursion(...)", "fileIndex": 0, "line": 357,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddClassMembers(Microsoft.Dafny.TopLevelDeclWithMembers,System.Boolean,System.Boolean)", "methodShortName": "AddClassMembers(...)", "fileIndex": 1, "line": 13,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrIfStmt(Microsoft.Dafny.IfStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrIfStmt(...)", "fileIndex": 6, "line": 971,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "ShallowEq(Microsoft.Dafny.ComprehensionExpr,Microsoft.Dafny.ComprehensionExpr)", "methodShortName": "ShallowEq(...)", "fileIndex": 0, "line": 336,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.QuantifierCollector", "reportPath": "DafnyCore_QuantifierCollector.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.OldExpr&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 0, "line": 24,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.QuantifierSplitter", "reportPath": "DafnyCore_QuantifierSplitter.html", "methodName": "SplitQuantifier()", "methodShortName": "SplitQuantifier()", "fileIndex": 0, "line": 71,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.TriggersCollector", "reportPath": "DafnyCore_TriggersCollector.html", "methodName": "CandidateCollectionOperation(Microsoft.Dafny.BinaryExpr)", "methodShortName": "CandidateCollectionOperation(...)", "fileIndex": 0, "line": 308,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UTF8Buffer", "reportPath": "DafnyCore_UTF8Buffer.html", "methodName": "Read()", "methodShortName": "Read()", "fileIndex": 0, "line": 186,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.DafnyDriver", "reportPath": "DafnyDriver_DafnyDriver.html", "methodName": "Compile()", "methodShortName": "Compile()", "fileIndex": 0, "line": 725,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.ImplicitFailingAssertionCodeActionProvider", "reportPath": "DafnyLanguageServer_ImplicitFailingAssertionCodeActionProvider.html", "methodName": "GetDafnyCodeActions(Microsoft.Dafny.LanguageServer.Plugins.IDafnyCodeActionInput,Microsoft.Dafny.DafnyDiagnostic,OmniSharp.Extensions.LanguageServer.Protocol.Models.Range)", "methodShortName": "GetDafnyCodeActions(...)", "fileIndex": 0, "line": 113,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.MarkupTestFile", "reportPath": "DafnyLanguageServer_MarkupTestFile.html", "methodName": "Parse(System.String,System.String&,System.Collections.Generic.List`1<System.Int32>&,System.Collections.Generic.IReadOnlyList`1<Microsoft.Dafny.LanguageServer.AnnotatedSpan>&)", "methodShortName": "Parse(...)", "fileIndex": 0, "line": 50,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.Notifications.VerificationTree", "reportPath": "DafnyLanguageServer_VerificationTree.html", "methodName": "RenderLineVerificationStatus(System.Boolean,System.Boolean,System.Boolean,Microsoft.Dafny.LanguageServer.Workspace.Notifications.CurrentStatus,Microsoft.Dafny.LanguageServer.Workspace.Notifications.GutterVerificationStatus)", "methodShortName": "RenderLineVerificationStatus(...)", "fileIndex": 0, "line": 279,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyServer", "class": "DafnyServer.LegacySymbolTable", "reportPath": "DafnyServer_LegacySymbolTable.html", "methodName": "ResolveLocalDefinitions(System.Collections.Generic.IEnumerable`1<Microsoft.Dafny.Statement>,Microsoft.Dafny.Method)", "methodShortName": "ResolveLocalDefinitions(...)", "fileIndex": 0, "line": 133,
    "metrics": [
      { "value": 44, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Auditor.Auditor", "reportPath": "DafnyCore_Auditor.html", "methodName": "PostResolve(Microsoft.Dafny.Program)", "methodShortName": "PostResolve(...)", "fileIndex": 0, "line": 122,
    "metrics": [
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ASTVisitor<T>", "reportPath": "DafnyCore_ASTVisitor_1.html", "methodName": "VisitOneDeclaration(Microsoft.Dafny.TopLevelDecl)", "methodShortName": "VisitOneDeclaration(...)", "fileIndex": 0, "line": 32,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BlockStmt", "reportPath": "DafnyCore_BlockStmt.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 32,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.BoogieOptionBag", "reportPath": "DafnyCore_BoogieOptionBag.html", "methodName": "SplitArguments(System.String)", "methodShortName": "SplitArguments(...)", "fileIndex": 0, "line": 156,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Buffer", "reportPath": "DafnyCore_Buffer.html", "methodName": "set_Pos(System.Int32)", "methodShortName": "set_Pos(...)", "fileIndex": 0, "line": 128,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CallGraphBuilder", "reportPath": "DafnyCore_CallGraphBuilder.html", "methodName": "AddCallGraphEdge(Microsoft.Dafny.IASTVisitorContext,Microsoft.Dafny.ICallable,Microsoft.Dafny.Expression,System.Boolean)", "methodShortName": "AddCallGraphEdge(...)", "fileIndex": 0, "line": 290,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "FullTypeName(Microsoft.Dafny.UserDefinedType,Microsoft.Dafny.MemberDecl)", "methodShortName": "FullTypeName(...)", "fileIndex": 0, "line": 1636,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitSeqSelectRange(Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,System.Boolean,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitSeqSelectRange(...)", "fileIndex": 0, "line": 1874,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "DeclareField(System.String,System.Boolean,System.Boolean,System.Boolean,System.String,System.String,Microsoft.Dafny.Compilers.CsharpCompiler/ClassWriter)", "methodShortName": "DeclareField(...)", "fileIndex": 0, "line": 1697,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "GetSubtypeCondition(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "GetSubtypeCondition(...)", "fileIndex": 0, "line": 1969,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "CallArrayGetOrSet(System.Boolean,System.Int32,Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CallArrayGetOrSet(...)", "fileIndex": 0, "line": 2694,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "FullTypeName(Microsoft.Dafny.UserDefinedType,Microsoft.Dafny.MemberDecl,System.Boolean)", "methodShortName": "FullTypeName(...)", "fileIndex": 0, "line": 785,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CreateClass(System.String,System.String,System.Boolean,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,Microsoft.Dafny.TopLevelDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateClass(...)", "fileIndex": 0, "line": 881,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitCoercionIfNecessary(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitCoercionIfNecessary(...)", "fileIndex": 0, "line": 3746,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CanSequentializeForall(System.Collections.Generic.List`1<Microsoft.Dafny.BoundVar>,System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression)", "methodShortName": "CanSequentializeForall(...)", "fileIndex": 0, "line": 3627,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DetectUnderspecificationVisitor", "reportPath": "DafnyCore_DetectUnderspecificationVisitor.html", "methodName": "VisitOneStmt(Microsoft.Dafny.Statement)", "methodShortName": "VisitOneStmt(...)", "fileIndex": 0, "line": 219,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Expression", "reportPath": "DafnyCore_Expression.html", "methodName": "Disjuncts()", "methodShortName": "Disjuncts()", "fileIndex": 0, "line": 158,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExtremeLemmaBodyCloner", "reportPath": "DafnyCore_ExtremeLemmaBodyCloner.html", "methodName": "CloneExpr(Microsoft.Dafny.Expression)", "methodShortName": "CloneExpr(...)", "fileIndex": 0, "line": 23,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExtremeLemmaBodyCloner", "reportPath": "DafnyCore_ExtremeLemmaBodyCloner.html", "methodName": "CloneRHS(Microsoft.Dafny.AssignmentRhs)", "methodShortName": "CloneRHS(...)", "fileIndex": 0, "line": 80,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IdPattern", "reportPath": "DafnyCore_IdPattern.html", "methodName": "CheckLinearVarPattern(Microsoft.Dafny.Type,Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.Resolver)", "methodShortName": "CheckLinearVarPattern(...)", "fileIndex": 0, "line": 139,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InferDecreasesClause", "reportPath": "DafnyCore_InferDecreasesClause.html", "methodName": "FillInDefaultDecreasesClauses(Microsoft.Dafny.Program)", "methodShortName": "FillInDefaultDecreasesClauses(...)", "fileIndex": 0, "line": 13,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ITEExpr", "reportPath": "DafnyCore_ITEExpr.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 2823,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IsLambda(System.Boolean)", "methodShortName": "IsLambda(...)", "fileIndex": 0, "line": 657,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "TraitDecl(Microsoft.Dafny.Parser/DeclModifierData,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.TraitDecl&)", "methodShortName": "TraitDecl(...)", "fileIndex": 0, "line": 1533,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "TypeIdentOptional(Microsoft.Dafny.RangeToken&,Microsoft.Dafny.Name&,Microsoft.Dafny.Type&,System.Boolean&,Microsoft.Dafny.Expression&,System.Boolean&)", "methodShortName": "TypeIdentOptional(...)", "fileIndex": 0, "line": 2806,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ImpliesExpliesExpression(Microsoft.Dafny.Expression&,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "ImpliesExpliesExpression(...)", "fileIndex": 0, "line": 5175,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.PreTypeResolver", "reportPath": "DafnyCore_PreTypeResolver.html", "methodName": "BuiltInTypeDecl(System.String)", "methodShortName": "BuiltInTypeDecl(...)", "fileIndex": 0, "line": 70,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintCallGraph(Microsoft.Dafny.ModuleDefinition,System.Int32)", "methodShortName": "PrintCallGraph(...)", "fileIndex": 0, "line": 232,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintModuleExportDecl(Microsoft.Dafny.ModuleExportDecl,System.Int32,System.String)", "methodShortName": "PrintModuleExportDecl(...)", "fileIndex": 0, "line": 521,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "TPCharacteristicsSuffix(Microsoft.Dafny.TypeParameter/TypeParameterCharacteristics)", "methodShortName": "TPCharacteristicsSuffix(...)", "fileIndex": 0, "line": 1173,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ImposeSubtypingConstraint(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.TypeConstraint/ErrorMsg)", "methodShortName": "ImposeSubtypingConstraint(...)", "fileIndex": 1, "line": 1532,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ProcessOneSubtypingConstraintAndItsSubs(Microsoft.Dafny.TypeConstraint,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeConstraint>,System.Boolean,System.Boolean&)", "methodShortName": "ProcessOneSubtypingConstraintAndItsSubs(...)", "fileIndex": 1, "line": 2812,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ProcessDependenciesDefinition(Microsoft.Dafny.ModuleDecl,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.Resolver/ModuleBindings,Microsoft.Dafny.Graph`1<Microsoft.Dafny.ModuleDecl>)", "methodShortName": "ProcessDependenciesDefinition(...)", "fileIndex": 2, "line": 1419,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "MergeSignature(Microsoft.Dafny.ModuleSignature,Microsoft.Dafny.ModuleSignature)", "methodShortName": "MergeSignature(...)", "fileIndex": 2, "line": 1498,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "EnsureSupportsErrorHandling(Microsoft.Dafny.IToken,Microsoft.Dafny.Type,System.Boolean,System.Boolean)", "methodShortName": "EnsureSupportsErrorHandling(...)", "fileIndex": 2, "line": 5949,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneDeclaration(Microsoft.Dafny.TopLevelDecl)", "methodShortName": "VisitOneDeclaration(...)", "fileIndex": 3, "line": 37,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Substituter", "reportPath": "DafnyCore_Substituter.html", "methodName": "LetExpr(Microsoft.Dafny.LetExpr)", "methodShortName": "LetExpr(...)", "fileIndex": 0, "line": 441,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TailRecursion", "reportPath": "DafnyCore_TailRecursion.html", "methodName": "DetermineTailRecursion(Microsoft.Dafny.Method)", "methodShortName": "DetermineTailRecursion(...)", "fileIndex": 0, "line": 20,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFunctionAxiom(Microsoft.Boogie.Function,Microsoft.Dafny.Function,Microsoft.Dafny.Expression)", "methodShortName": "AddFunctionAxiom(...)", "fileIndex": 2, "line": 1989,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AssumeCanCallForByMethodDecl(Microsoft.Dafny.Method,Microsoft.Dafny.BoogieStmtListBuilder)", "methodShortName": "AssumeCanCallForByMethodDecl(...)", "fileIndex": 2, "line": 3476,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "InRWClause_Aux(Microsoft.Dafny.IToken,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr,Microsoft.Boogie.Expr,System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>,System.Boolean,Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Dafny.Expression,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.IVariable,Microsoft.Dafny.Expression>)", "methodShortName": "InRWClause_Aux(...)", "fileIndex": 2, "line": 4150,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ReAssociateToTheRight(Microsoft.Dafny.Expression&)", "methodShortName": "ReAssociateToTheRight(...)", "fileIndex": 2, "line": 5225,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FuelAttrib(Microsoft.Dafny.Function,System.Boolean&)", "methodShortName": "FuelAttrib(...)", "fileIndex": 2, "line": 9646,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "FillMissingCases(Microsoft.Dafny.IMatch)", "methodShortName": "FillMissingCases(...)", "fileIndex": 6, "line": 813,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrForallProof(Microsoft.Dafny.ForallStmt,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrForallProof(...)", "fileIndex": 6, "line": 1019,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrAlternatives(System.Collections.Generic.List`1<Microsoft.Dafny.GuardedAlternative>,Microsoft.Boogie.Cmd,Microsoft.Boogie.StructuredCmd,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator,System.Boolean)", "methodShortName": "TrAlternatives(...)", "fileIndex": 6, "line": 1574,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrCallStmt(Microsoft.Dafny.CallStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Boogie.IdentifierExpr)", "methodShortName": "TrCallStmt(...)", "fileIndex": 6, "line": 1635,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "SameBoundVar(Microsoft.Dafny.IVariable,Microsoft.Dafny.IVariable)", "methodShortName": "SameBoundVar(...)", "fileIndex": 0, "line": 171,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UnaryOpExpr", "reportPath": "DafnyCore_UnaryOpExpr.html", "methodName": "ResolveOp()", "methodShortName": "ResolveOp()", "fileIndex": 0, "line": 1753,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Util", "reportPath": "DafnyCore_Util.html", "methodName": "ValidateEscaping(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.IToken,System.String,System.Boolean,Microsoft.Dafny.Errors)", "methodShortName": "ValidateEscaping(...)", "fileIndex": 0, "line": 194,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "PrettyPrintChar(System.Int32)", "methodShortName": "PrettyPrintChar(...)", "fileIndex": 0, "line": 189,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "IsPrimitive(Microsoft.Boogie.Model/Element,DafnyServer.CounterexampleGeneration.DafnyModelState)", "methodShortName": "IsPrimitive(...)", "fileIndex": 0, "line": 287,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModel", "reportPath": "DafnyLanguageServer_DafnyModel.html", "methodName": "GetFieldNames(Microsoft.Boogie.Model/Element)", "methodShortName": "GetFieldNames(...)", "fileIndex": 0, "line": 900,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Handlers.DafnyHoverHandler", "reportPath": "DafnyLanguageServer_DafnyHoverHandler.html", "methodName": "Handle()", "methodShortName": "Handle()", "fileIndex": 0, "line": 41,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyServer", "class": "Microsoft.Dafny.Server", "reportPath": "DafnyServer_Server.html", "methodName": "Main(System.String[])", "methodShortName": "Main(...)", "fileIndex": 0, "line": 15,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "ExtractInputs(DafnyServer.CounterexampleGeneration.DafnyModelState,System.Collections.Generic.IReadOnlyList`1<System.String>,System.Collections.Generic.IReadOnlyList`1<System.String>)", "methodShortName": "ExtractInputs(...)", "fileIndex": 0, "line": 155,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "GetPrimitiveAsType(System.String,Microsoft.Dafny.Type)", "methodShortName": "GetPrimitiveAsType(...)", "fileIndex": 0, "line": 508,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.TestMethod", "reportPath": "DafnyTestGeneration_TestMethod.html", "methodName": "TestMethodLines()", "methodShortName": "TestMethodLines()", "fileIndex": 0, "line": 669,
    "metrics": [
      { "value": 40, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "GetSpecialFieldInfo(Microsoft.Dafny.SpecialField/ID,System.Object,Microsoft.Dafny.Type,System.String&,System.String&,System.String&)", "methodShortName": "GetSpecialFieldInfo(...)", "fileIndex": 0, "line": 2349,
    "metrics": [
      { "value": 38, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "GetSpecialFieldInfo(Microsoft.Dafny.SpecialField/ID,System.Object,Microsoft.Dafny.Type,System.String&,System.String&,System.String&)", "methodShortName": "GetSpecialFieldInfo(...)", "fileIndex": 0, "line": 2491,
    "metrics": [
      { "value": 38, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "GetSpecialFieldInfo(Microsoft.Dafny.SpecialField/ID,System.Object,Microsoft.Dafny.Type,System.String&,System.String&,System.String&)", "methodShortName": "GetSpecialFieldInfo(...)", "fileIndex": 0, "line": 1289,
    "metrics": [
      { "value": 38, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "GetSpecialFieldInfo(Microsoft.Dafny.SpecialField/ID,System.Object,Microsoft.Dafny.Type,System.String&,System.String&,System.String&)", "methodShortName": "GetSpecialFieldInfo(...)", "fileIndex": 0, "line": 1566,
    "metrics": [
      { "value": 38, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CalcStmt", "reportPath": "DafnyCore_CalcStmt.html", "methodName": "GetInferredDefaultOp()", "methodShortName": "GetInferredDefaultOp()", "fileIndex": 0, "line": 169,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Cloner", "reportPath": "DafnyCore_Cloner.html", "methodName": "CloneFunction(Microsoft.Dafny.Function,System.String)", "methodShortName": "CloneFunction(...)", "fileIndex": 0, "line": 577,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CompileDatatypeInterfaceMembers(Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CompileDatatypeInterfaceMembers(...)", "fileIndex": 0, "line": 799,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "HasSimpleZeroInitializer(Microsoft.Dafny.Type)", "methodShortName": "HasSimpleZeroInitializer(...)", "fileIndex": 0, "line": 1985,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpSynthesizer", "reportPath": "DafnyCore_CsharpSynthesizer.html", "methodName": "SynthesizeMethod(Microsoft.Dafny.Method,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.Boolean)", "methodShortName": "SynthesizeMethod(...)", "fileIndex": 0, "line": 73,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.DatatypeWrapperEraser", "reportPath": "DafnyCore_DatatypeWrapperEraser.html", "methodName": "SimplifyType(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "SimplifyType(...)", "fileIndex": 0, "line": 32,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "CreateFunction(System.String,System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,System.Boolean,System.Boolean,Microsoft.Dafny.MemberDecl,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.Boolean)", "methodShortName": "CreateFunction(...)", "fileIndex": 0, "line": 565,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitForStmt(Microsoft.Dafny.IToken,Microsoft.Dafny.IVariable,System.Boolean,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.Statement>,Microsoft.Dafny.LList`1<Microsoft.Dafny.Label>,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitForStmt(...)", "fileIndex": 0, "line": 3611,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "CreateClass(System.String,System.String,System.Boolean,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,Microsoft.Dafny.TopLevelDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateClass(...)", "fileIndex": 0, "line": 84,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "EmitTypeTest(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitTypeTest(...)", "fileIndex": 0, "line": 2360,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "TypeName(Microsoft.Dafny.Type,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.IToken,System.Boolean,System.Boolean,Microsoft.Dafny.MemberDecl)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 630,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "EmitLiteralExpr(Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.LiteralExpr)", "methodShortName": "EmitLiteralExpr(...)", "fileIndex": 0, "line": 983,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "ForTypeDescriptors(System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,Microsoft.Dafny.TopLevelDecl,Microsoft.Dafny.MemberDecl,System.Boolean)", "methodShortName": "ForTypeDescriptors(...)", "fileIndex": 0, "line": 1027,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "IsStableExpr(Microsoft.Dafny.Expression)", "methodShortName": "IsStableExpr(...)", "fileIndex": 0, "line": 4045,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "MaybeInjectSubsetConstraint(Microsoft.Dafny.IVariable,Microsoft.Dafny.Type,Microsoft.Dafny.Type,System.Boolean,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "MaybeInjectSubsetConstraint(...)", "fileIndex": 0, "line": 5311,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.DPreType", "reportPath": "DafnyCore_DPreType.html", "methodName": "ToString()", "methodShortName": "ToString()", "fileIndex": 0, "line": 216,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExpectContracts", "reportPath": "DafnyCore_ExpectContracts.html", "methodName": "GenerateWrapper(Microsoft.Dafny.TopLevelDeclWithMembers,Microsoft.Dafny.MemberDecl)", "methodShortName": "GenerateWrapper(...)", "fileIndex": 0, "line": 87,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ExpectContracts", "reportPath": "DafnyCore_ExpectContracts.html", "methodName": "PostCompileCloneAndResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PostCompileCloneAndResolve(...)", "fileIndex": 0, "line": 247,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IndentationFormatter", "reportPath": "DafnyCore_IndentationFormatter.html", "methodName": "ReIndentMultilineComment(Microsoft.Dafny.IToken,System.String,System.Int32,System.String,System.Boolean,System.Boolean&)", "methodShortName": "ReIndentMultilineComment(...)", "fileIndex": 0, "line": 229,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.InferDecreasesClause", "reportPath": "DafnyCore_InferDecreasesClause.html", "methodName": "FrameToObjectSet(System.Collections.Generic.List`1<Microsoft.Dafny.FrameExpression>)", "methodShortName": "FrameToObjectSet(...)", "fileIndex": 0, "line": 141,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.LiteralModuleDecl", "reportPath": "DafnyCore_LiteralModuleDecl.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 464,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ModuleDefinition", "reportPath": "DafnyCore_ModuleDefinition.html", "methodName": "GetFirstTopLevelToken()", "methodShortName": "GetFirstTopLevelToken()", "fileIndex": 0, "line": 1109,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Node", "reportPath": "DafnyCore_Node.html", "methodName": "get_OwnedTokens()", "methodShortName": "get_OwnedTokens()", "fileIndex": 0, "line": 131,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Node", "reportPath": "DafnyCore_Node.html", "methodName": "ExtractDocstring(System.String)", "methodShortName": "ExtractDocstring(...)", "fileIndex": 0, "line": 218,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ClassMemberDecl(Microsoft.Dafny.Parser/DeclModifierData,System.Collections.Generic.List`1<Microsoft.Dafny.MemberDecl>,System.Boolean,System.Boolean,System.Boolean)", "methodShortName": "ClassMemberDecl(...)", "fileIndex": 0, "line": 1590,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "GIdentType(System.Boolean,System.Boolean,System.Boolean,System.Boolean,Microsoft.Dafny.RangeToken&,Microsoft.Dafny.Name&,Microsoft.Dafny.Type&,System.Boolean&,System.Boolean&,System.Boolean&,System.Boolean&)", "methodShortName": "GIdentType(...)", "fileIndex": 0, "line": 2721,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "TPCharOption(Microsoft.Dafny.TypeParameter/TypeParameterCharacteristics&)", "methodShortName": "TPCharOption(...)", "fileIndex": 0, "line": 3185,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "AssertStmt(Microsoft.Dafny.Statement&)", "methodShortName": "AssertStmt(...)", "fileIndex": 0, "line": 4197,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "ModifyStmt(Microsoft.Dafny.Statement&)", "methodShortName": "ModifyStmt(...)", "fileIndex": 0, "line": 4509,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "NewArray(System.Collections.Generic.List`1<Microsoft.Dafny.Expression>&,Microsoft.Dafny.Expression&,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>&)", "methodShortName": "NewArray(...)", "fileIndex": 0, "line": 4698,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "SingleExtendedPattern(Microsoft.Dafny.ExtendedPattern&)", "methodShortName": "SingleExtendedPattern(...)", "fileIndex": 0, "line": 4933,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintForLoopStatement(System.Int32,Microsoft.Dafny.ForLoopStmt)", "methodShortName": "PrintForLoopStatement(...)", "fileIndex": 0, "line": 1814,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintActualArguments(Microsoft.Dafny.ActualBindings,System.String,Microsoft.Boogie.IToken)", "methodShortName": "PrintActualArguments(...)", "fileIndex": 0, "line": 3000,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "PreResolve(Microsoft.Dafny.ModuleDefinition)", "methodShortName": "PreResolve(...)", "fileIndex": 0, "line": 173,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveNamesAndInferTypesForOneDeclaration(Microsoft.Dafny.TopLevelDecl)", "methodShortName": "ResolveNamesAndInferTypesForOneDeclaration(...)", "fileIndex": 1, "line": 94,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "Reaches_aux(Microsoft.Dafny.Type,Microsoft.Dafny.TypeProxy,System.Int32,System.Collections.Generic.HashSet`1<Microsoft.Dafny.TypeProxy>)", "methodShortName": "Reaches_aux(...)", "fileIndex": 1, "line": 3181,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveParameterDefaultValues(System.Collections.Generic.List`1<Microsoft.Dafny.Formal>,Microsoft.Dafny.ResolutionContext)", "methodShortName": "ResolveParameterDefaultValues(...)", "fileIndex": 1, "line": 4618,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "TypeConstraintsIncludeProxy_Aux(Microsoft.Dafny.Type,Microsoft.Dafny.TypeProxy,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>)", "methodShortName": "TypeConstraintsIncludeProxy_Aux(...)", "fileIndex": 1, "line": 4903,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "GetBaseTypeFromProxy(Microsoft.Dafny.TypeProxy,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeProxy,Microsoft.Dafny.Type>)", "methodShortName": "GetBaseTypeFromProxy(...)", "fileIndex": 1, "line": 5319,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FindCollectionType(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.Type,System.Boolean,System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>)", "methodShortName": "FindCollectionType(...)", "fileIndex": 1, "line": 2269,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveExport(Microsoft.Dafny.ModuleDecl,Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.ModuleQualifiedId,System.Collections.Generic.List`1<Microsoft.Dafny.IToken>,Microsoft.Dafny.ModuleSignature&,Microsoft.Dafny.ErrorReporter)", "methodShortName": "ResolveExport(...)", "fileIndex": 2, "line": 2113,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ComputeGroundingCtor(Microsoft.Dafny.IndDatatypeDecl)", "methodShortName": "ComputeGroundingCtor(...)", "fileIndex": 2, "line": 5357,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "VisitOneExpr(Microsoft.Dafny.Expression,Microsoft.Dafny.Resolver/CallingPosition&)", "methodShortName": "VisitOneExpr(...)", "fileIndex": 2, "line": 4126,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ScopeCloner", "reportPath": "DafnyCore_ScopeCloner.html", "methodName": "CloneModuleDefinition(Microsoft.Dafny.ModuleDefinition,Microsoft.Dafny.Name)", "methodShortName": "CloneModuleDefinition(...)", "fileIndex": 0, "line": 743,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.SubsetConstraintGhostChecker", "reportPath": "DafnyCore_SubsetConstraintGhostChecker.html", "methodName": "OnEnter(Microsoft.Dafny.MemberDecl,System.String,System.Object)", "methodShortName": "OnEnter(...)", "fileIndex": 0, "line": 49,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "SetAssertionOnlyFilter(Microsoft.Dafny.Node)", "methodShortName": "SetAssertionOnlyFilter(...)", "fileIndex": 1, "line": 1359,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddTypeDecl(Microsoft.Dafny.RevealableTypeDecl)", "methodShortName": "AddTypeDecl(...)", "fileIndex": 2, "line": 1226,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddWellformednessCheck(Microsoft.Dafny.IteratorDecl,Microsoft.Boogie.Procedure)", "methodShortName": "AddWellformednessCheck(...)", "fileIndex": 2, "line": 1685,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFuelSuccSynonymAxiom(Microsoft.Dafny.Function,System.Boolean)", "methodShortName": "AddFuelSuccSynonymAxiom(...)", "fileIndex": 2, "line": 2860,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddFunctionOverrideEnsChk(Microsoft.Dafny.Function,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.Translator/ExpressionTranslator,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.IVariable,Microsoft.Dafny.Expression>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Boogie.Variable)", "methodShortName": "AddFunctionOverrideEnsChk(...)", "fileIndex": 2, "line": 3590,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrForallAssign(Microsoft.Dafny.ForallStmt,Microsoft.Dafny.AssignStmt,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrForallAssign(...)", "fileIndex": 6, "line": 1123,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "ShallowEq(Microsoft.Dafny.LiteralExpr,Microsoft.Dafny.LiteralExpr)", "methodShortName": "ShallowEq(...)", "fileIndex": 0, "line": 520,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.MatchingLoopRewriter", "reportPath": "DafnyCore_MatchingLoopRewriter.html", "methodName": "RewriteMatchingLoops(Microsoft.Dafny.Triggers.QuantifierWithTriggers)", "methodShortName": "RewriteMatchingLoops(...)", "fileIndex": 0, "line": 155,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.QuantifiersCollection", "reportPath": "DafnyCore_QuantifiersCollection.html", "methodName": "CombineSplitQuantifier()", "methodShortName": "CombineSplitQuantifier()", "fileIndex": 0, "line": 224,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "get_HasFinitePossibleValues()", "methodShortName": "get_HasFinitePossibleValues()", "fileIndex": 0, "line": 452,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "SameHead(Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "SameHead(...)", "fileIndex": 0, "line": 1006,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "Meet(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.BuiltIns)", "methodShortName": "Meet(...)", "fileIndex": 0, "line": 1479,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Type", "reportPath": "DafnyCore_Type.html", "methodName": "IsSubtypeOf(Microsoft.Dafny.Type,System.Boolean,System.Boolean)", "methodShortName": "IsSubtypeOf(...)", "fileIndex": 0, "line": 1706,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TypeProxy", "reportPath": "DafnyCore_TypeProxy.html", "methodName": "InClusterOfArtificial_aux(System.Collections.Generic.ISet`1<Microsoft.Dafny.TypeProxy>,System.Collections.Generic.List`1<Microsoft.Dafny.Resolver/XConstraint>)", "methodShortName": "InClusterOfArtificial_aux(...)", "fileIndex": 0, "line": 2831,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UnderspecificationDetector", "reportPath": "DafnyCore_UnderspecificationDetector.html", "methodName": "CheckMember(Microsoft.Dafny.MemberDecl)", "methodShortName": "CheckMember(...)", "fileIndex": 0, "line": 129,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UserDefinedType", "reportPath": "DafnyCore_UserDefinedType.html", "methodName": "get_PartiallySupportsEquality()", "methodShortName": "get_PartiallySupportsEquality()", "fileIndex": 0, "line": 2559,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Util", "reportPath": "DafnyCore_Util.html", "methodName": "TokensWithEscapes()", "methodShortName": "TokensWithEscapes()", "fileIndex": 0, "line": 346,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "DafnyServer.CounterexampleGeneration.DafnyModelTypeUtils", "reportPath": "DafnyLanguageServer_DafnyModelTypeUtils.html", "methodName": "TransformType(Microsoft.Dafny.Type,System.Func`2<Microsoft.Dafny.UserDefinedType,Microsoft.Dafny.Type>)", "methodShortName": "TransformType(...)", "fileIndex": 0, "line": 91,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Handlers.DafnyCodeActionHandler", "reportPath": "DafnyLanguageServer_DafnyCodeActionHandler.html", "methodName": "Handle(OmniSharp.Extensions.LanguageServer.Protocol.Models.CodeAction,System.Threading.CancellationToken)", "methodShortName": "Handle(...)", "fileIndex": 0, "line": 98,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.VerificationProgressReporter", "reportPath": "DafnyLanguageServer_VerificationProgressReporter.html", "methodName": "ReportAssertionBatchResult(Microsoft.Dafny.LanguageServer.Language.AssertionBatchResult)", "methodShortName": "ReportAssertionBatchResult(...)", "fileIndex": 0, "line": 297,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Workspace.VerificationProgressReporter", "reportPath": "DafnyLanguageServer_VerificationProgressReporter.html", "methodName": "GetTargetMethodTree(Microsoft.Boogie.Implementation,Microsoft.Dafny.LanguageServer.Workspace.Notifications.ImplementationVerificationTree&,System.Boolean)", "methodShortName": "GetTargetMethodTree(...)", "fileIndex": 0, "line": 400,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyServer", "class": "Microsoft.Dafny.Server", "reportPath": "DafnyServer_Server.html", "methodName": "Respond(Microsoft.Dafny.DafnyOptions,System.String[],System.Boolean)", "methodShortName": "Respond(...)", "fileIndex": 0, "line": 165,
    "metrics": [
      { "value": 36, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ConcreteSyntaxTreeUtils", "reportPath": "DafnyCore_ConcreteSyntaxTreeUtils.html", "methodName": "Block(Microsoft.Dafny.ConcreteSyntaxTree&,System.String,System.String,Microsoft.Dafny.BlockStyle,Microsoft.Dafny.BlockStyle)", "methodShortName": "Block(...)", "fileIndex": 0, "line": 51,
    "metrics": [
      { "value": 34, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "DafnyCore.DooFile", "reportPath": "DafnyCore_DooFile.html", "methodName": "Validate(System.String,Microsoft.Dafny.DafnyOptions,System.CommandLine.Command)", "methodShortName": "Validate(...)", "fileIndex": 0, "line": 115,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ASTVisitor<T>", "reportPath": "DafnyCore_ASTVisitor_1.html", "methodName": "VisitMember(Microsoft.Dafny.MemberDecl)", "methodShortName": "VisitMember(...)", "fileIndex": 0, "line": 92,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ChainingExpression", "reportPath": "DafnyCore_ChainingExpression.html", "methodName": "ComputeDesugaring(System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.Collections.Generic.List`1<Microsoft.Dafny.BinaryExpr/Opcode>,System.Collections.Generic.List`1<Microsoft.Dafny.IToken>,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>)", "methodShortName": "ComputeDesugaring(...)", "fileIndex": 0, "line": 3460,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ClassDecl", "reportPath": "DafnyCore_ClassDecl.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 1519,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.CompilationCloner", "reportPath": "DafnyCore_CompilationCloner.html", "methodName": "CloneModuleSignature(Microsoft.Dafny.ModuleSignature,Microsoft.Dafny.ModuleSignature)", "methodShortName": "CloneModuleSignature(...)", "fileIndex": 0, "line": 929,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitNew(Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.CallStmt,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitNew(...)", "fileIndex": 0, "line": 1399,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CppCompiler", "reportPath": "DafnyCore_CppCompiler.html", "methodName": "EmitStringLiteral(System.String,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitStringLiteral(...)", "fileIndex": 0, "line": 1472,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "CreateClass(System.String,System.String,System.Boolean,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,Microsoft.Dafny.TopLevelDecl,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateClass(...)", "fileIndex": 0, "line": 257,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "EmitIntegerLiteral(System.Numerics.BigInteger,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitIntegerLiteral(...)", "fileIndex": 0, "line": 2065,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.CsharpCompiler", "reportPath": "DafnyCore_CsharpCompiler.html", "methodName": "EmitThis(Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitThis(...)", "fileIndex": 0, "line": 2317,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "CreateIterator(Microsoft.Dafny.IteratorDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateIterator(...)", "fileIndex": 0, "line": 400,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitStringLiteral(System.String,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitStringLiteral(...)", "fileIndex": 0, "line": 2161,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "UserDefinedTypeName(Microsoft.Dafny.TopLevelDecl,System.Boolean,Microsoft.Dafny.MemberDecl)", "methodShortName": "UserDefinedTypeName(...)", "fileIndex": 0, "line": 2408,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.GoCompiler", "reportPath": "DafnyCore_GoCompiler.html", "methodName": "EmitTypeTest(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitTypeTest(...)", "fileIndex": 0, "line": 3461,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitStringLiteral(System.String,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitStringLiteral(...)", "fileIndex": 0, "line": 1112,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitThis(Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitThis(...)", "fileIndex": 0, "line": 1206,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitSeqSelectRange(Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,System.Boolean,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitSeqSelectRange(...)", "fileIndex": 0, "line": 1577,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitRotate(Microsoft.Dafny.Expression,Microsoft.Dafny.Expression,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.Compilers.SinglePassCompiler/FCE_Arg_Translator)", "methodShortName": "EmitRotate(...)", "fileIndex": 0, "line": 1672,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaCompiler", "reportPath": "DafnyCore_JavaCompiler.html", "methodName": "EmitTypeTest(System.String,Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitTypeTest(...)", "fileIndex": 0, "line": 4026,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "CreateIterator(Microsoft.Dafny.IteratorDecl,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "CreateIterator(...)", "fileIndex": 0, "line": 125,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.JavaScriptCompiler", "reportPath": "DafnyCore_JavaScriptCompiler.html", "methodName": "EmitStringLiteral(System.String,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitStringLiteral(...)", "fileIndex": 0, "line": 1373,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "EmitStringLiteral(System.String,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "EmitStringLiteral(...)", "fileIndex": 0, "line": 1030,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.PythonCompiler", "reportPath": "DafnyCore_PythonCompiler.html", "methodName": "GetSpecialFieldInfo(Microsoft.Dafny.SpecialField/ID,System.Object,Microsoft.Dafny.Type,System.String&,System.String&,System.String&)", "methodShortName": "GetSpecialFieldInfo(...)", "fileIndex": 0, "line": 1150,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "ForTypeParameters(System.Collections.Generic.List`1<Microsoft.Dafny.Compilers.SinglePassCompiler/TypeArgumentInstantiation>,Microsoft.Dafny.MemberDecl,System.Boolean)", "methodShortName": "ForTypeParameters(...)", "fileIndex": 0, "line": 1006,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrCasePatternOpt(Microsoft.Dafny.CasePattern`1<VT>,Microsoft.Dafny.Expression,System.String,Microsoft.Dafny.Type,Microsoft.Dafny.IToken,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean)", "methodShortName": "TrCasePatternOpt(...)", "fileIndex": 0, "line": 2528,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "TrTailCallStmt(Microsoft.Dafny.IToken,Microsoft.Dafny.Method,Microsoft.Dafny.Expression,System.Collections.Generic.List`1<Microsoft.Dafny.Expression>,System.String,Microsoft.Dafny.ConcreteSyntaxTree)", "methodShortName": "TrTailCallStmt(...)", "fileIndex": 0, "line": 4547,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "CompileFunctionCallExpr(Microsoft.Dafny.FunctionCallExpr,Microsoft.Dafny.ConcreteSyntaxTree,System.Boolean,Microsoft.Dafny.ConcreteSyntaxTree,Microsoft.Dafny.Compilers.SinglePassCompiler/FCE_Arg_Translator)", "methodShortName": "CompileFunctionCallExpr(...)", "fileIndex": 0, "line": 5513,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Compilers.SinglePassCompiler", "reportPath": "DafnyCore_SinglePassCompiler.html", "methodName": "VisitOneStmt(Microsoft.Dafny.Statement)", "methodShortName": "VisitOneStmt(...)", "fileIndex": 0, "line": 2930,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ComprehensionExpr", "reportPath": "DafnyCore_ComprehensionExpr.html", "methodName": "CombineIntegerBounds(System.Collections.Generic.List`1<Microsoft.Dafny.ComprehensionExpr/BoundedPool>)", "methodShortName": "CombineIntegerBounds(...)", "fileIndex": 0, "line": 134,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Declaration", "reportPath": "DafnyCore_Declaration.html", "methodName": "IsExtern(Microsoft.Dafny.DafnyOptions,System.String&,System.String&)", "methodShortName": "IsExtern(...)", "fileIndex": 0, "line": 114,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.ForLoopStmt", "reportPath": "DafnyCore_ForLoopStmt.html", "methodName": "SetIndent(System.Int32,Microsoft.Dafny.TokenNewIndentCollector)", "methodShortName": "SetIndent(...)", "fileIndex": 0, "line": 49,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.IndentationFormatter", "reportPath": "DafnyCore_IndentationFormatter.html", "methodName": "ReIndentSingleLineComment(Microsoft.Dafny.IToken,System.String,System.Int32,System.Int32,System.Int32,System.Text.RegularExpressions.Group,System.Boolean&,System.String&)", "methodShortName": "ReIndentSingleLineComment(...)", "fileIndex": 0, "line": 298,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.LetExpr", "reportPath": "DafnyCore_LetExpr.html", "methodName": "get_TerminalExpressions()", "methodShortName": "get_TerminalExpressions()", "fileIndex": 0, "line": 79,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.LoopStmt", "reportPath": "DafnyCore_LoopStmt.html", "methodName": "get_LoopSpecificationExpressions()", "methodShortName": "get_LoopSpecificationExpressions()", "fileIndex": 0, "line": 51,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MatchFlattener", "reportPath": "DafnyCore_MatchFlattener.html", "methodName": "RemoveIllegalSubpatterns(Microsoft.Dafny.ExtendedPattern,System.Boolean)", "methodShortName": "RemoveIllegalSubpatterns(...)", "fileIndex": 0, "line": 167,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.MatchFlattener", "reportPath": "DafnyCore_MatchFlattener.html", "methodName": "CreateIfElseIfChain(Microsoft.Dafny.MatchFlattener/MatchCompilationState,Microsoft.Dafny.MatchingContext,Microsoft.Dafny.Expression,System.Collections.Generic.List`1<System.ValueTuple`2<Microsoft.Dafny.LiteralExpr,Microsoft.Dafny.MatchFlattener/CaseBody>>,Microsoft.Dafny.MatchFlattener/CaseBody)", "methodShortName": "CreateIfElseIfChain(...)", "fileIndex": 0, "line": 532,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Node", "reportPath": "DafnyCore_Node.html", "methodName": "Visit(System.Func`2<Microsoft.Dafny.Node,System.Boolean>,System.Action`1<Microsoft.Dafny.Node>)", "methodShortName": "Visit(...)", "fileIndex": 0, "line": 79,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "IsRelOp()", "methodShortName": "IsRelOp()", "fileIndex": 0, "line": 589,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "Lhs(Microsoft.Dafny.Expression&)", "methodShortName": "Lhs(...)", "fileIndex": 0, "line": 4681,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "CasePatternLocal(Microsoft.Dafny.CasePattern`1<Microsoft.Dafny.LocalVariable>&,System.Boolean)", "methodShortName": "CasePatternLocal(...)", "fileIndex": 0, "line": 4769,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "CalcOp(Microsoft.Dafny.IToken&,Microsoft.Dafny.CalcStmt/CalcOp&)", "methodShortName": "CalcOp(...)", "fileIndex": 0, "line": 5059,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "LiteralExpression(Microsoft.Dafny.Expression&)", "methodShortName": "LiteralExpression(...)", "fileIndex": 0, "line": 6115,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Parser", "reportPath": "DafnyCore_Parser.html", "methodName": "CasePattern(Microsoft.Dafny.CasePattern`1<Microsoft.Dafny.BoundVar>&)", "methodShortName": "CasePattern(...)", "fileIndex": 0, "line": 6583,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintClass(Microsoft.Dafny.ClassDecl,System.Int32,System.String)", "methodShortName": "PrintClass(...)", "fileIndex": 0, "line": 660,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Printer", "reportPath": "DafnyCore_Printer.html", "methodName": "PrintField(Microsoft.Dafny.Field,System.Int32)", "methodShortName": "PrintField(...)", "fileIndex": 0, "line": 874,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.RefinementTransformer", "reportPath": "DafnyCore_RefinementTransformer.html", "methodName": "CloneMethod(Microsoft.Dafny.Method,System.Collections.Generic.List`1<Microsoft.Dafny.AttributedExpression>,Microsoft.Dafny.Specification`1<Microsoft.Dafny.Expression>,Microsoft.Dafny.BlockStmt,System.Boolean,Microsoft.Dafny.Attributes)", "methodShortName": "CloneMethod(...)", "fileIndex": 0, "line": 600,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "PrintTypeConstraintState(System.Int32)", "methodShortName": "PrintTypeConstraintState(...)", "fileIndex": 1, "line": 223,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ConstrainSubtypeRelation_Equal(Microsoft.Dafny.Type,Microsoft.Dafny.Type,Microsoft.Dafny.TypeConstraint/ErrorMsg)", "methodShortName": "ConstrainSubtypeRelation_Equal(...)", "fileIndex": 1, "line": 1217,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CreateResolver_IdentifierExpr(Microsoft.Dafny.IToken,System.String,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,Microsoft.Dafny.TopLevelDecl)", "methodShortName": "CreateResolver_IdentifierExpr(...)", "fileIndex": 1, "line": 3962,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "FillInTypeArguments(Microsoft.Dafny.IToken,System.Int32,System.Collections.Generic.List`1<Microsoft.Dafny.Type>,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,Microsoft.Dafny.Resolver/ResolveTypeOption)", "methodShortName": "FillInTypeArguments(...)", "fileIndex": 1, "line": 4869,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "GetBaseTypeFromProxy_EqAux(Microsoft.Dafny.TypeProxy,Microsoft.Dafny.Type,Microsoft.Dafny.Type,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeProxy,Microsoft.Dafny.Type>)", "methodShortName": "GetBaseTypeFromProxy_EqAux(...)", "fileIndex": 1, "line": 5370,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "DesugarDatatypeUpdate(Microsoft.Dafny.IToken,Microsoft.Dafny.Expression,Microsoft.Dafny.DatatypeDecl,System.Collections.Generic.List`1<Microsoft.Dafny.DatatypeCtor>,System.Collections.Generic.Dictionary`2<System.String,System.Tuple`3<Microsoft.Dafny.BoundVar,Microsoft.Dafny.IdentifierExpr,Microsoft.Dafny.Expression>>,Microsoft.Dafny.ResolutionContext)", "methodShortName": "DesugarDatatypeUpdate(...)", "fileIndex": 1, "line": 5749,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveDatatypeValue(Microsoft.Dafny.ResolutionContext,Microsoft.Dafny.DatatypeValue,Microsoft.Dafny.DatatypeDecl,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "ResolveDatatypeValue(...)", "fileIndex": 1, "line": 6532,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveOpenedImports(Microsoft.Dafny.ModuleSignature,Microsoft.Dafny.ModuleDefinition,System.Boolean,Microsoft.Dafny.Resolver)", "methodShortName": "ResolveOpenedImports(...)", "fileIndex": 2, "line": 1561,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CanCompareWith(Microsoft.Dafny.Expression)", "methodShortName": "CanCompareWith(...)", "fileIndex": 2, "line": 4605,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "CheckOverride_TypeParameters(Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.Collections.Generic.List`1<Microsoft.Dafny.TypeParameter>,System.String,System.String,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>)", "methodShortName": "CheckOverride_TypeParameters(...)", "fileIndex": 2, "line": 5224,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Resolver", "reportPath": "DafnyCore_Resolver.html", "methodName": "ResolveIteratorSignature(Microsoft.Dafny.IteratorDecl)", "methodShortName": "ResolveIteratorSignature(...)", "fileIndex": 2, "line": 5693,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TokenNewIndentCollector", "reportPath": "DafnyCore_TokenNewIndentCollector.html", "methodName": "GetNewTokenVisualIndent(Microsoft.Dafny.IToken,System.Int32)", "methodShortName": "GetNewTokenVisualIndent(...)", "fileIndex": 0, "line": 175,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ReadPrelude()", "methodShortName": "ReadPrelude()", "fileIndex": 2, "line": 678,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "ComputeFunctionFuel()", "methodShortName": "ComputeFunctionFuel()", "fileIndex": 2, "line": 1042,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddRedirectingTypeDeclAxioms(System.Boolean,T,System.String)", "methodShortName": "AddRedirectingTypeDeclAxioms(...)", "fileIndex": 2, "line": 1313,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "NeedsDefiniteAssignmentTracker(System.Boolean,Microsoft.Dafny.Type,System.Boolean)", "methodShortName": "NeedsDefiniteAssignmentTracker(...)", "fileIndex": 2, "line": 3328,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "RemoveDefiniteAssignmentTrackers(System.Collections.Generic.List`1<Microsoft.Dafny.Statement>,System.Int32)", "methodShortName": "RemoveDefiniteAssignmentTrackers(...)", "fileIndex": 2, "line": 3387,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CondApplyBox(Microsoft.Boogie.IToken,Microsoft.Boogie.Expr,Microsoft.Dafny.Type,Microsoft.Dafny.Type)", "methodShortName": "CondApplyBox(...)", "fileIndex": 2, "line": 7189,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "AddLetSuchThenCanCallAxiom(Microsoft.Dafny.LetExpr,Microsoft.Dafny.Translator/LetSuchThatExprInfo,Microsoft.Boogie.Function)", "methodShortName": "AddLetSuchThenCanCallAxiom(...)", "fileIndex": 2, "line": 9324,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrTrigger(Microsoft.Dafny.Translator/ExpressionTranslator,Microsoft.Dafny.Attributes,Microsoft.Dafny.IToken,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.IVariable,Microsoft.Dafny.Expression>,System.Collections.Generic.Dictionary`2<Microsoft.Dafny.TypeParameter,Microsoft.Dafny.Type>)", "methodShortName": "TrTrigger(...)", "fileIndex": 2, "line": 10011,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "GetFunctionFuel(Microsoft.Dafny.Function)", "methodShortName": "GetFunctionFuel(...)", "fileIndex": 2, "line": 9739,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "CheckWellformedLetExprWithResult(Microsoft.Dafny.LetExpr,Microsoft.Dafny.Translator/WFOptions,Microsoft.Boogie.Expr,Microsoft.Dafny.Type,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.BoogieStmtListBuilder,Microsoft.Dafny.Translator/ExpressionTranslator,System.Boolean)", "methodShortName": "CheckWellformedLetExprWithResult(...)", "fileIndex": 5, "line": 1336,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Translator", "reportPath": "DafnyCore_Translator.html", "methodName": "TrMatchStmt(Microsoft.Dafny.MatchStmt,Microsoft.Dafny.BoogieStmtListBuilder,System.Collections.Generic.List`1<Microsoft.Boogie.Variable>,Microsoft.Dafny.Translator/ExpressionTranslator)", "methodShortName": "TrMatchStmt(...)", "fileIndex": 6, "line": 744,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.Triggers.ExprExtensions", "reportPath": "DafnyCore_ExprExtensions.html", "methodName": "ShallowEq(Microsoft.Dafny.QuantifierExpr,Microsoft.Dafny.QuantifierExpr)", "methodShortName": "ShallowEq(...)", "fileIndex": 0, "line": 314,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.TypeRhs", "reportPath": "DafnyCore_TypeRhs.html", "methodName": "get_NonSpecificationSubExpressions()", "methodShortName": "get_NonSpecificationSubExpressions()", "fileIndex": 0, "line": 618,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UnderspecificationDetector", "reportPath": "DafnyCore_UnderspecificationDetector.html", "methodName": "CheckMembers(Microsoft.Dafny.TopLevelDeclWithMembers)", "methodShortName": "CheckMembers(...)", "fileIndex": 0, "line": 106,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyCore", "class": "Microsoft.Dafny.UserDefinedType", "reportPath": "DafnyCore_UserDefinedType.html", "methodName": "TypeName(Microsoft.Dafny.DafnyOptions,Microsoft.Dafny.ModuleDefinition,System.Boolean)", "methodShortName": "TypeName(...)", "fileIndex": 0, "line": 2487,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyDriver", "class": "Microsoft.Dafny.VerificationResultLogger", "reportPath": "DafnyDriver_VerificationResultLogger.html", "methodName": "RaiseTestLoggerEvents(Microsoft.Dafny.DafnyOptions)", "methodShortName": "RaiseTestLoggerEvents(...)", "fileIndex": 0, "line": 30,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.DiagnosticErrorReporter", "reportPath": "DafnyLanguageServer_DiagnosticErrorReporter.html", "methodName": "CreateDiagnosticRelatedInformationFor()", "methodShortName": "CreateDiagnosticRelatedInformationFor()", "fileIndex": 0, "line": 88,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyLanguageServer", "class": "Microsoft.Dafny.LanguageServer.Language.SyntaxTreeVisitor", "reportPath": "DafnyLanguageServer_SyntaxTreeVisitor.html", "methodName": "Visit(Microsoft.Dafny.TopLevelDecl)", "methodShortName": "Visit(...)", "fileIndex": 0, "line": 29,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.BlockBasedModifier", "reportPath": "DafnyTestGeneration_BlockBasedModifier.html", "methodName": "ExtractCapturedStates(Microsoft.Boogie.Block)", "methodShortName": "ExtractCapturedStates(...)", "fileIndex": 0, "line": 78,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.DafnyInfo", "reportPath": "DafnyTestGeneration_DafnyInfo.html", "methodName": "GetNonGhostFields(Microsoft.Dafny.UserDefinedType)", "methodShortName": "GetNonGhostFields(...)", "fileIndex": 0, "line": 282,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.DafnyInfo", "reportPath": "DafnyTestGeneration_DafnyInfo.html", "methodName": "GetTypesForTrait(Microsoft.Dafny.UserDefinedType)", "methodShortName": "GetTypesForTrait(...)", "fileIndex": 0, "line": 321,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
  {
    "assembly": "DafnyTestGeneration", "class": "DafnyTestGeneration.Main", "reportPath": "DafnyTestGeneration_Main.html", "methodName": "GetTestClassForProgram()", "methodShortName": "GetTestClassForProgram()", "fileIndex": 0, "line": 137,
    "metrics": [
      { "value": 32, "exceeded": true },
    ]},
];

var branchCoverageAvailable = true;
var methodCoverageAvailable = false;


var translations = {
'top': 'Top:',
'all': 'All',
'assembly': 'Assembly',
'class': 'Class',
'method': 'Method',
'lineCoverage': 'Line coverage',
'noGrouping': 'No grouping',
'byAssembly': 'By assembly',
'byNamespace': 'By namespace, Level:',
'all': 'All',
'collapseAll': 'Collapse all',
'expandAll': 'Expand all',
'grouping': 'Grouping:',
'filter': 'Filter:',
'name': 'Name',
'covered': 'Covered',
'uncovered': 'Uncovered',
'coverable': 'Coverable',
'total': 'Total',
'coverage': 'Line coverage',
'branchCoverage': 'Branch coverage',
'methodCoverage': 'Method coverage',
'percentage': 'Percentage',
'history': 'Coverage history',
'compareHistory': 'Compare with:',
'date': 'Date',
'allChanges': 'All changes',
'selectCoverageTypes': 'Select coverage types',
'selectCoverageTypesAndMetrics': 'Select coverage types & metrics',
'coverageTypes': 'Coverage types',
'metrics': 'Metrics',
'methodCoverageProVersion': 'Feature is only available for sponsors',
'lineCoverageIncreaseOnly': 'Line coverage: Increase only',
'lineCoverageDecreaseOnly': 'Line coverage: Decrease only',
'branchCoverageIncreaseOnly': 'Branch coverage: Increase only',
'branchCoverageDecreaseOnly': 'Branch coverage: Decrease only',
'methodCoverageIncreaseOnly': 'Method coverage: Increase only',
'methodCoverageDecreaseOnly': 'Method coverage: Decrease only'
};


(()=>{"use strict";var e,_={},p={};function n(e){var a=p[e];if(void 0!==a)return a.exports;var r=p[e]={exports:{}};return _[e](r,r.exports,n),r.exports}n.m=_,e=[],n.O=(a,r,u,l)=>{if(!r){var o=1/0;for(f=0;f<e.length;f++){for(var[r,u,l]=e[f],v=!0,t=0;t<r.length;t++)(!1&l||o>=l)&&Object.keys(n.O).every(h=>n.O[h](r[t]))?r.splice(t--,1):(v=!1,l<o&&(o=l));if(v){e.splice(f--,1);var c=u();void 0!==c&&(a=c)}}return a}l=l||0;for(var f=e.length;f>0&&e[f-1][2]>l;f--)e[f]=e[f-1];e[f]=[r,u,l]},n.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return n.d(a,{a}),a},n.d=(e,a)=>{for(var r in a)n.o(a,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},n.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),(()=>{var e={666:0};n.O.j=u=>0===e[u];var a=(u,l)=>{var t,c,[f,o,v]=l,s=0;if(f.some(d=>0!==e[d])){for(t in o)n.o(o,t)&&(n.m[t]=o[t]);if(v)var b=v(n)}for(u&&u(l);s<f.length;s++)n.o(e,c=f[s])&&e[c]&&e[c][0](),e[c]=0;return n.O(b)},r=self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[];r.forEach(a.bind(null,0)),r.push=a.bind(null,r.push.bind(r))})()})();
"use strict";(self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[]).push([[429],{435:(ie,Ee,de)=>{de(583)},583:()=>{!function(t){const n=t.performance;function i(M){n&&n.mark&&n.mark(M)}function o(M,T){n&&n.measure&&n.measure(M,T)}i("Zone");const c=t.__Zone_symbol_prefix||"__zone_symbol__";function a(M){return c+M}const y=!0===t[a("forceDuplicateZoneCheck")];if(t.Zone){if(y||"function"!=typeof t.Zone.__symbol__)throw new Error("Zone already loaded.");return t.Zone}let d=(()=>{class M{static assertZonePatched(){if(t.Promise!==oe.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let e=M.current;for(;e.parent;)e=e.parent;return e}static get current(){return U.zone}static get currentTask(){return re}static __load_patch(e,r,k=!1){if(oe.hasOwnProperty(e)){if(!k&&y)throw Error("Already loaded patch: "+e)}else if(!t["__Zone_disable_"+e]){const C="Zone:"+e;i(C),oe[e]=r(t,M,z),o(C,C)}}get parent(){return this._parent}get name(){return this._name}constructor(e,r){this._parent=e,this._name=r?r.name||"unnamed":"<root>",this._properties=r&&r.properties||{},this._zoneDelegate=new v(this,this._parent&&this._parent._zoneDelegate,r)}get(e){const r=this.getZoneWith(e);if(r)return r._properties[e]}getZoneWith(e){let r=this;for(;r;){if(r._properties.hasOwnProperty(e))return r;r=r._parent}return null}fork(e){if(!e)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,e)}wrap(e,r){if("function"!=typeof e)throw new Error("Expecting function got: "+e);const k=this._zoneDelegate.intercept(this,e,r),C=this;return function(){return C.runGuarded(k,this,arguments,r)}}run(e,r,k,C){U={parent:U,zone:this};try{return this._zoneDelegate.invoke(this,e,r,k,C)}finally{U=U.parent}}runGuarded(e,r=null,k,C){U={parent:U,zone:this};try{try{return this._zoneDelegate.invoke(this,e,r,k,C)}catch($){if(this._zoneDelegate.handleError(this,$))throw $}}finally{U=U.parent}}runTask(e,r,k){if(e.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(e.zone||K).name+"; Execution: "+this.name+")");if(e.state===x&&(e.type===Q||e.type===P))return;const C=e.state!=E;C&&e._transitionTo(E,A),e.runCount++;const $=re;re=e,U={parent:U,zone:this};try{e.type==P&&e.data&&!e.data.isPeriodic&&(e.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,e,r,k)}catch(l){if(this._zoneDelegate.handleError(this,l))throw l}}finally{e.state!==x&&e.state!==h&&(e.type==Q||e.data&&e.data.isPeriodic?C&&e._transitionTo(A,E):(e.runCount=0,this._updateTaskCount(e,-1),C&&e._transitionTo(x,E,x))),U=U.parent,re=$}}scheduleTask(e){if(e.zone&&e.zone!==this){let k=this;for(;k;){if(k===e.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);k=k.parent}}e._transitionTo(X,x);const r=[];e._zoneDelegates=r,e._zone=this;try{e=this._zoneDelegate.scheduleTask(this,e)}catch(k){throw e._transitionTo(h,X,x),this._zoneDelegate.handleError(this,k),k}return e._zoneDelegates===r&&this._updateTaskCount(e,1),e.state==X&&e._transitionTo(A,X),e}scheduleMicroTask(e,r,k,C){return this.scheduleTask(new p(I,e,r,k,C,void 0))}scheduleMacroTask(e,r,k,C,$){return this.scheduleTask(new p(P,e,r,k,C,$))}scheduleEventTask(e,r,k,C,$){return this.scheduleTask(new p(Q,e,r,k,C,$))}cancelTask(e){if(e.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(e.zone||K).name+"; Execution: "+this.name+")");if(e.state===A||e.state===E){e._transitionTo(G,A,E);try{this._zoneDelegate.cancelTask(this,e)}catch(r){throw e._transitionTo(h,G),this._zoneDelegate.handleError(this,r),r}return this._updateTaskCount(e,-1),e._transitionTo(x,G),e.runCount=0,e}}_updateTaskCount(e,r){const k=e._zoneDelegates;-1==r&&(e._zoneDelegates=null);for(let C=0;C<k.length;C++)k[C]._updateTaskCount(e.type,r)}}return M.__symbol__=a,M})();const b={name:"",onHasTask:(M,T,e,r)=>M.hasTask(e,r),onScheduleTask:(M,T,e,r)=>M.scheduleTask(e,r),onInvokeTask:(M,T,e,r,k,C)=>M.invokeTask(e,r,k,C),onCancelTask:(M,T,e,r)=>M.cancelTask(e,r)};class v{constructor(T,e,r){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=T,this._parentDelegate=e,this._forkZS=r&&(r&&r.onFork?r:e._forkZS),this._forkDlgt=r&&(r.onFork?e:e._forkDlgt),this._forkCurrZone=r&&(r.onFork?this.zone:e._forkCurrZone),this._interceptZS=r&&(r.onIntercept?r:e._interceptZS),this._interceptDlgt=r&&(r.onIntercept?e:e._interceptDlgt),this._interceptCurrZone=r&&(r.onIntercept?this.zone:e._interceptCurrZone),this._invokeZS=r&&(r.onInvoke?r:e._invokeZS),this._invokeDlgt=r&&(r.onInvoke?e:e._invokeDlgt),this._invokeCurrZone=r&&(r.onInvoke?this.zone:e._invokeCurrZone),this._handleErrorZS=r&&(r.onHandleError?r:e._handleErrorZS),this._handleErrorDlgt=r&&(r.onHandleError?e:e._handleErrorDlgt),this._handleErrorCurrZone=r&&(r.onHandleError?this.zone:e._handleErrorCurrZone),this._scheduleTaskZS=r&&(r.onScheduleTask?r:e._scheduleTaskZS),this._scheduleTaskDlgt=r&&(r.onScheduleTask?e:e._scheduleTaskDlgt),this._scheduleTaskCurrZone=r&&(r.onScheduleTask?this.zone:e._scheduleTaskCurrZone),this._invokeTaskZS=r&&(r.onInvokeTask?r:e._invokeTaskZS),this._invokeTaskDlgt=r&&(r.onInvokeTask?e:e._invokeTaskDlgt),this._invokeTaskCurrZone=r&&(r.onInvokeTask?this.zone:e._invokeTaskCurrZone),this._cancelTaskZS=r&&(r.onCancelTask?r:e._cancelTaskZS),this._cancelTaskDlgt=r&&(r.onCancelTask?e:e._cancelTaskDlgt),this._cancelTaskCurrZone=r&&(r.onCancelTask?this.zone:e._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const k=r&&r.onHasTask;(k||e&&e._hasTaskZS)&&(this._hasTaskZS=k?r:b,this._hasTaskDlgt=e,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=T,r.onScheduleTask||(this._scheduleTaskZS=b,this._scheduleTaskDlgt=e,this._scheduleTaskCurrZone=this.zone),r.onInvokeTask||(this._invokeTaskZS=b,this._invokeTaskDlgt=e,this._invokeTaskCurrZone=this.zone),r.onCancelTask||(this._cancelTaskZS=b,this._cancelTaskDlgt=e,this._cancelTaskCurrZone=this.zone))}fork(T,e){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,T,e):new d(T,e)}intercept(T,e,r){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,T,e,r):e}invoke(T,e,r,k,C){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,T,e,r,k,C):e.apply(r,k)}handleError(T,e){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,T,e)}scheduleTask(T,e){let r=e;if(this._scheduleTaskZS)this._hasTaskZS&&r._zoneDelegates.push(this._hasTaskDlgtOwner),r=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,T,e),r||(r=e);else if(e.scheduleFn)e.scheduleFn(e);else{if(e.type!=I)throw new Error("Task is missing scheduleFn.");R(e)}return r}invokeTask(T,e,r,k){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,T,e,r,k):e.callback.apply(r,k)}cancelTask(T,e){let r;if(this._cancelTaskZS)r=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,T,e);else{if(!e.cancelFn)throw Error("Task is not cancelable");r=e.cancelFn(e)}return r}hasTask(T,e){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,T,e)}catch(r){this.handleError(T,r)}}_updateTaskCount(T,e){const r=this._taskCounts,k=r[T],C=r[T]=k+e;if(C<0)throw new Error("More tasks executed then were scheduled.");0!=k&&0!=C||this.hasTask(this.zone,{microTask:r.microTask>0,macroTask:r.macroTask>0,eventTask:r.eventTask>0,change:T})}}class p{constructor(T,e,r,k,C,$){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=T,this.source=e,this.data=k,this.scheduleFn=C,this.cancelFn=$,!r)throw new Error("callback is not defined");this.callback=r;const l=this;this.invoke=T===Q&&k&&k.useG?p.invokeTask:function(){return p.invokeTask.call(t,l,this,arguments)}}static invokeTask(T,e,r){T||(T=this),ee++;try{return T.runCount++,T.zone.runTask(T,e,r)}finally{1==ee&&_(),ee--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(x,X)}_transitionTo(T,e,r){if(this._state!==e&&this._state!==r)throw new Error(`${this.type} '${this.source}': can not transition to '${T}', expecting state '${e}'${r?" or '"+r+"'":""}, was '${this._state}'.`);this._state=T,T==x&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const L=a("setTimeout"),Z=a("Promise"),N=a("then");let J,B=[],H=!1;function q(M){if(J||t[Z]&&(J=t[Z].resolve(0)),J){let T=J[N];T||(T=J.then),T.call(J,M)}else t[L](M,0)}function R(M){0===ee&&0===B.length&&q(_),M&&B.push(M)}function _(){if(!H){for(H=!0;B.length;){const M=B;B=[];for(let T=0;T<M.length;T++){const e=M[T];try{e.zone.runTask(e,null,null)}catch(r){z.onUnhandledError(r)}}}z.microtaskDrainDone(),H=!1}}const K={name:"NO ZONE"},x="notScheduled",X="scheduling",A="scheduled",E="running",G="canceling",h="unknown",I="microTask",P="macroTask",Q="eventTask",oe={},z={symbol:a,currentZoneFrame:()=>U,onUnhandledError:W,microtaskDrainDone:W,scheduleMicroTask:R,showUncaughtError:()=>!d[a("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:W,patchMethod:()=>W,bindArguments:()=>[],patchThen:()=>W,patchMacroTask:()=>W,patchEventPrototype:()=>W,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>W,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>W,wrapWithCurrentZone:()=>W,filterProperties:()=>[],attachOriginToPatched:()=>W,_redefineProperty:()=>W,patchCallbacks:()=>W,nativeScheduleMicroTask:q};let U={parent:null,zone:new d(null,null)},re=null,ee=0;function W(){}o("Zone","Zone"),t.Zone=d}(typeof window<"u"&&window||typeof self<"u"&&self||global);const ie=Object.getOwnPropertyDescriptor,Ee=Object.defineProperty,de=Object.getPrototypeOf,ge=Object.create,Ve=Array.prototype.slice,Se="addEventListener",Oe="removeEventListener",Ze=Zone.__symbol__(Se),Ne=Zone.__symbol__(Oe),ce="true",ae="false",ke=Zone.__symbol__("");function Ie(t,n){return Zone.current.wrap(t,n)}function Me(t,n,i,o,c){return Zone.current.scheduleMacroTask(t,n,i,o,c)}const j=Zone.__symbol__,Pe=typeof window<"u",Te=Pe?window:void 0,Y=Pe&&Te||"object"==typeof self&&self||global,ct="removeAttribute";function Le(t,n){for(let i=t.length-1;i>=0;i--)"function"==typeof t[i]&&(t[i]=Ie(t[i],n+"_"+i));return t}function Fe(t){return!t||!1!==t.writable&&!("function"==typeof t.get&&typeof t.set>"u")}const Be=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,we=!("nw"in Y)&&typeof Y.process<"u"&&"[object process]"==={}.toString.call(Y.process),Ae=!we&&!Be&&!(!Pe||!Te.HTMLElement),Ue=typeof Y.process<"u"&&"[object process]"==={}.toString.call(Y.process)&&!Be&&!(!Pe||!Te.HTMLElement),Re={},We=function(t){if(!(t=t||Y.event))return;let n=Re[t.type];n||(n=Re[t.type]=j("ON_PROPERTY"+t.type));const i=this||t.target||Y,o=i[n];let c;return Ae&&i===Te&&"error"===t.type?(c=o&&o.call(this,t.message,t.filename,t.lineno,t.colno,t.error),!0===c&&t.preventDefault()):(c=o&&o.apply(this,arguments),null!=c&&!c&&t.preventDefault()),c};function qe(t,n,i){let o=ie(t,n);if(!o&&i&&ie(i,n)&&(o={enumerable:!0,configurable:!0}),!o||!o.configurable)return;const c=j("on"+n+"patched");if(t.hasOwnProperty(c)&&t[c])return;delete o.writable,delete o.value;const a=o.get,y=o.set,d=n.slice(2);let b=Re[d];b||(b=Re[d]=j("ON_PROPERTY"+d)),o.set=function(v){let p=this;!p&&t===Y&&(p=Y),p&&("function"==typeof p[b]&&p.removeEventListener(d,We),y&&y.call(p,null),p[b]=v,"function"==typeof v&&p.addEventListener(d,We,!1))},o.get=function(){let v=this;if(!v&&t===Y&&(v=Y),!v)return null;const p=v[b];if(p)return p;if(a){let L=a.call(this);if(L)return o.set.call(this,L),"function"==typeof v[ct]&&v.removeAttribute(n),L}return null},Ee(t,n,o),t[c]=!0}function Xe(t,n,i){if(n)for(let o=0;o<n.length;o++)qe(t,"on"+n[o],i);else{const o=[];for(const c in t)"on"==c.slice(0,2)&&o.push(c);for(let c=0;c<o.length;c++)qe(t,o[c],i)}}const ne=j("originalInstance");function ve(t){const n=Y[t];if(!n)return;Y[j(t)]=n,Y[t]=function(){const c=Le(arguments,t);switch(c.length){case 0:this[ne]=new n;break;case 1:this[ne]=new n(c[0]);break;case 2:this[ne]=new n(c[0],c[1]);break;case 3:this[ne]=new n(c[0],c[1],c[2]);break;case 4:this[ne]=new n(c[0],c[1],c[2],c[3]);break;default:throw new Error("Arg list too long.")}},ue(Y[t],n);const i=new n(function(){});let o;for(o in i)"XMLHttpRequest"===t&&"responseBlob"===o||function(c){"function"==typeof i[c]?Y[t].prototype[c]=function(){return this[ne][c].apply(this[ne],arguments)}:Ee(Y[t].prototype,c,{set:function(a){"function"==typeof a?(this[ne][c]=Ie(a,t+"."+c),ue(this[ne][c],a)):this[ne][c]=a},get:function(){return this[ne][c]}})}(o);for(o in n)"prototype"!==o&&n.hasOwnProperty(o)&&(Y[t][o]=n[o])}function le(t,n,i){let o=t;for(;o&&!o.hasOwnProperty(n);)o=de(o);!o&&t[n]&&(o=t);const c=j(n);let a=null;if(o&&(!(a=o[c])||!o.hasOwnProperty(c))&&(a=o[c]=o[n],Fe(o&&ie(o,n)))){const d=i(a,c,n);o[n]=function(){return d(this,arguments)},ue(o[n],a)}return a}function lt(t,n,i){let o=null;function c(a){const y=a.data;return y.args[y.cbIdx]=function(){a.invoke.apply(this,arguments)},o.apply(y.target,y.args),a}o=le(t,n,a=>function(y,d){const b=i(y,d);return b.cbIdx>=0&&"function"==typeof d[b.cbIdx]?Me(b.name,d[b.cbIdx],b,c):a.apply(y,d)})}function ue(t,n){t[j("OriginalDelegate")]=n}let ze=!1,je=!1;function ft(){if(ze)return je;ze=!0;try{const t=Te.navigator.userAgent;(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/")||-1!==t.indexOf("Edge/"))&&(je=!0)}catch{}return je}Zone.__load_patch("ZoneAwarePromise",(t,n,i)=>{const o=Object.getOwnPropertyDescriptor,c=Object.defineProperty,y=i.symbol,d=[],b=!0===t[y("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],v=y("Promise"),p=y("then"),L="__creationTrace__";i.onUnhandledError=l=>{if(i.showUncaughtError()){const u=l&&l.rejection;u?console.error("Unhandled Promise rejection:",u instanceof Error?u.message:u,"; Zone:",l.zone.name,"; Task:",l.task&&l.task.source,"; Value:",u,u instanceof Error?u.stack:void 0):console.error(l)}},i.microtaskDrainDone=()=>{for(;d.length;){const l=d.shift();try{l.zone.runGuarded(()=>{throw l.throwOriginal?l.rejection:l})}catch(u){N(u)}}};const Z=y("unhandledPromiseRejectionHandler");function N(l){i.onUnhandledError(l);try{const u=n[Z];"function"==typeof u&&u.call(this,l)}catch{}}function B(l){return l&&l.then}function H(l){return l}function J(l){return e.reject(l)}const q=y("state"),R=y("value"),_=y("finally"),K=y("parentPromiseValue"),x=y("parentPromiseState"),X="Promise.then",A=null,E=!0,G=!1,h=0;function I(l,u){return s=>{try{z(l,u,s)}catch(f){z(l,!1,f)}}}const P=function(){let l=!1;return function(s){return function(){l||(l=!0,s.apply(null,arguments))}}},Q="Promise resolved with itself",oe=y("currentTaskTrace");function z(l,u,s){const f=P();if(l===s)throw new TypeError(Q);if(l[q]===A){let g=null;try{("object"==typeof s||"function"==typeof s)&&(g=s&&s.then)}catch(w){return f(()=>{z(l,!1,w)})(),l}if(u!==G&&s instanceof e&&s.hasOwnProperty(q)&&s.hasOwnProperty(R)&&s[q]!==A)re(s),z(l,s[q],s[R]);else if(u!==G&&"function"==typeof g)try{g.call(s,f(I(l,u)),f(I(l,!1)))}catch(w){f(()=>{z(l,!1,w)})()}else{l[q]=u;const w=l[R];if(l[R]=s,l[_]===_&&u===E&&(l[q]=l[x],l[R]=l[K]),u===G&&s instanceof Error){const m=n.currentTask&&n.currentTask.data&&n.currentTask.data[L];m&&c(s,oe,{configurable:!0,enumerable:!1,writable:!0,value:m})}for(let m=0;m<w.length;)ee(l,w[m++],w[m++],w[m++],w[m++]);if(0==w.length&&u==G){l[q]=h;let m=s;try{throw new Error("Uncaught (in promise): "+function a(l){return l&&l.toString===Object.prototype.toString?(l.constructor&&l.constructor.name||"")+": "+JSON.stringify(l):l?l.toString():Object.prototype.toString.call(l)}(s)+(s&&s.stack?"\n"+s.stack:""))}catch(D){m=D}b&&(m.throwOriginal=!0),m.rejection=s,m.promise=l,m.zone=n.current,m.task=n.currentTask,d.push(m),i.scheduleMicroTask()}}}return l}const U=y("rejectionHandledHandler");function re(l){if(l[q]===h){try{const u=n[U];u&&"function"==typeof u&&u.call(this,{rejection:l[R],promise:l})}catch{}l[q]=G;for(let u=0;u<d.length;u++)l===d[u].promise&&d.splice(u,1)}}function ee(l,u,s,f,g){re(l);const w=l[q],m=w?"function"==typeof f?f:H:"function"==typeof g?g:J;u.scheduleMicroTask(X,()=>{try{const D=l[R],S=!!s&&_===s[_];S&&(s[K]=D,s[x]=w);const O=u.run(m,void 0,S&&m!==J&&m!==H?[]:[D]);z(s,!0,O)}catch(D){z(s,!1,D)}},s)}const M=function(){},T=t.AggregateError;class e{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(u){return z(new this(null),E,u)}static reject(u){return z(new this(null),G,u)}static any(u){if(!u||"function"!=typeof u[Symbol.iterator])return Promise.reject(new T([],"All promises were rejected"));const s=[];let f=0;try{for(let m of u)f++,s.push(e.resolve(m))}catch{return Promise.reject(new T([],"All promises were rejected"))}if(0===f)return Promise.reject(new T([],"All promises were rejected"));let g=!1;const w=[];return new e((m,D)=>{for(let S=0;S<s.length;S++)s[S].then(O=>{g||(g=!0,m(O))},O=>{w.push(O),f--,0===f&&(g=!0,D(new T(w,"All promises were rejected")))})})}static race(u){let s,f,g=new this((D,S)=>{s=D,f=S});function w(D){s(D)}function m(D){f(D)}for(let D of u)B(D)||(D=this.resolve(D)),D.then(w,m);return g}static all(u){return e.allWithCallback(u)}static allSettled(u){return(this&&this.prototype instanceof e?this:e).allWithCallback(u,{thenCallback:f=>({status:"fulfilled",value:f}),errorCallback:f=>({status:"rejected",reason:f})})}static allWithCallback(u,s){let f,g,w=new this((O,V)=>{f=O,g=V}),m=2,D=0;const S=[];for(let O of u){B(O)||(O=this.resolve(O));const V=D;try{O.then(F=>{S[V]=s?s.thenCallback(F):F,m--,0===m&&f(S)},F=>{s?(S[V]=s.errorCallback(F),m--,0===m&&f(S)):g(F)})}catch(F){g(F)}m++,D++}return m-=2,0===m&&f(S),w}constructor(u){const s=this;if(!(s instanceof e))throw new Error("Must be an instanceof Promise.");s[q]=A,s[R]=[];try{const f=P();u&&u(f(I(s,E)),f(I(s,G)))}catch(f){z(s,!1,f)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return e}then(u,s){let f=this.constructor?.[Symbol.species];(!f||"function"!=typeof f)&&(f=this.constructor||e);const g=new f(M),w=n.current;return this[q]==A?this[R].push(w,g,u,s):ee(this,w,g,u,s),g}catch(u){return this.then(null,u)}finally(u){let s=this.constructor?.[Symbol.species];(!s||"function"!=typeof s)&&(s=e);const f=new s(M);f[_]=_;const g=n.current;return this[q]==A?this[R].push(g,f,u,u):ee(this,g,f,u,u),f}}e.resolve=e.resolve,e.reject=e.reject,e.race=e.race,e.all=e.all;const r=t[v]=t.Promise;t.Promise=e;const k=y("thenPatched");function C(l){const u=l.prototype,s=o(u,"then");if(s&&(!1===s.writable||!s.configurable))return;const f=u.then;u[p]=f,l.prototype.then=function(g,w){return new e((D,S)=>{f.call(this,D,S)}).then(g,w)},l[k]=!0}return i.patchThen=C,r&&(C(r),le(t,"fetch",l=>function $(l){return function(u,s){let f=l.apply(u,s);if(f instanceof e)return f;let g=f.constructor;return g[k]||C(g),f}}(l))),Promise[n.__symbol__("uncaughtPromiseErrors")]=d,e}),Zone.__load_patch("toString",t=>{const n=Function.prototype.toString,i=j("OriginalDelegate"),o=j("Promise"),c=j("Error"),a=function(){if("function"==typeof this){const v=this[i];if(v)return"function"==typeof v?n.call(v):Object.prototype.toString.call(v);if(this===Promise){const p=t[o];if(p)return n.call(p)}if(this===Error){const p=t[c];if(p)return n.call(p)}}return n.call(this)};a[i]=n,Function.prototype.toString=a;const y=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":y.call(this)}});let ye=!1;if(typeof window<"u")try{const t=Object.defineProperty({},"passive",{get:function(){ye=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{ye=!1}const ht={useG:!0},te={},Ye={},$e=new RegExp("^"+ke+"(\\w+)(true|false)$"),Ke=j("propagationStopped");function Je(t,n){const i=(n?n(t):t)+ae,o=(n?n(t):t)+ce,c=ke+i,a=ke+o;te[t]={},te[t][ae]=c,te[t][ce]=a}function dt(t,n,i,o){const c=o&&o.add||Se,a=o&&o.rm||Oe,y=o&&o.listeners||"eventListeners",d=o&&o.rmAll||"removeAllListeners",b=j(c),v="."+c+":",p="prependListener",L="."+p+":",Z=function(R,_,K){if(R.isRemoved)return;const x=R.callback;let X;"object"==typeof x&&x.handleEvent&&(R.callback=E=>x.handleEvent(E),R.originalDelegate=x);try{R.invoke(R,_,[K])}catch(E){X=E}const A=R.options;return A&&"object"==typeof A&&A.once&&_[a].call(_,K.type,R.originalDelegate?R.originalDelegate:R.callback,A),X};function N(R,_,K){if(!(_=_||t.event))return;const x=R||_.target||t,X=x[te[_.type][K?ce:ae]];if(X){const A=[];if(1===X.length){const E=Z(X[0],x,_);E&&A.push(E)}else{const E=X.slice();for(let G=0;G<E.length&&(!_||!0!==_[Ke]);G++){const h=Z(E[G],x,_);h&&A.push(h)}}if(1===A.length)throw A[0];for(let E=0;E<A.length;E++){const G=A[E];n.nativeScheduleMicroTask(()=>{throw G})}}}const B=function(R){return N(this,R,!1)},H=function(R){return N(this,R,!0)};function J(R,_){if(!R)return!1;let K=!0;_&&void 0!==_.useG&&(K=_.useG);const x=_&&_.vh;let X=!0;_&&void 0!==_.chkDup&&(X=_.chkDup);let A=!1;_&&void 0!==_.rt&&(A=_.rt);let E=R;for(;E&&!E.hasOwnProperty(c);)E=de(E);if(!E&&R[c]&&(E=R),!E||E[b])return!1;const G=_&&_.eventNameToString,h={},I=E[b]=E[c],P=E[j(a)]=E[a],Q=E[j(y)]=E[y],oe=E[j(d)]=E[d];let z;_&&_.prepend&&(z=E[j(_.prepend)]=E[_.prepend]);const e=K?function(s){if(!h.isExisting)return I.call(h.target,h.eventName,h.capture?H:B,h.options)}:function(s){return I.call(h.target,h.eventName,s.invoke,h.options)},r=K?function(s){if(!s.isRemoved){const f=te[s.eventName];let g;f&&(g=f[s.capture?ce:ae]);const w=g&&s.target[g];if(w)for(let m=0;m<w.length;m++)if(w[m]===s){w.splice(m,1),s.isRemoved=!0,0===w.length&&(s.allRemoved=!0,s.target[g]=null);break}}if(s.allRemoved)return P.call(s.target,s.eventName,s.capture?H:B,s.options)}:function(s){return P.call(s.target,s.eventName,s.invoke,s.options)},C=_&&_.diff?_.diff:function(s,f){const g=typeof f;return"function"===g&&s.callback===f||"object"===g&&s.originalDelegate===f},$=Zone[j("UNPATCHED_EVENTS")],l=t[j("PASSIVE_EVENTS")],u=function(s,f,g,w,m=!1,D=!1){return function(){const S=this||t;let O=arguments[0];_&&_.transferEventName&&(O=_.transferEventName(O));let V=arguments[1];if(!V)return s.apply(this,arguments);if(we&&"uncaughtException"===O)return s.apply(this,arguments);let F=!1;if("function"!=typeof V){if(!V.handleEvent)return s.apply(this,arguments);F=!0}if(x&&!x(s,V,S,arguments))return;const fe=ye&&!!l&&-1!==l.indexOf(O),se=function U(s,f){return!ye&&"object"==typeof s&&s?!!s.capture:ye&&f?"boolean"==typeof s?{capture:s,passive:!0}:s?"object"==typeof s&&!1!==s.passive?{...s,passive:!0}:s:{passive:!0}:s}(arguments[2],fe);if($)for(let _e=0;_e<$.length;_e++)if(O===$[_e])return fe?s.call(S,O,V,se):s.apply(this,arguments);const xe=!!se&&("boolean"==typeof se||se.capture),nt=!(!se||"object"!=typeof se)&&se.once,gt=Zone.current;let Ge=te[O];Ge||(Je(O,G),Ge=te[O]);const rt=Ge[xe?ce:ae];let De,me=S[rt],ot=!1;if(me){if(ot=!0,X)for(let _e=0;_e<me.length;_e++)if(C(me[_e],V))return}else me=S[rt]=[];const st=S.constructor.name,it=Ye[st];it&&(De=it[O]),De||(De=st+f+(G?G(O):O)),h.options=se,nt&&(h.options.once=!1),h.target=S,h.capture=xe,h.eventName=O,h.isExisting=ot;const be=K?ht:void 0;be&&(be.taskData=h);const he=gt.scheduleEventTask(De,V,be,g,w);return h.target=null,be&&(be.taskData=null),nt&&(se.once=!0),!ye&&"boolean"==typeof he.options||(he.options=se),he.target=S,he.capture=xe,he.eventName=O,F&&(he.originalDelegate=V),D?me.unshift(he):me.push(he),m?S:void 0}};return E[c]=u(I,v,e,r,A),z&&(E[p]=u(z,L,function(s){return z.call(h.target,h.eventName,s.invoke,h.options)},r,A,!0)),E[a]=function(){const s=this||t;let f=arguments[0];_&&_.transferEventName&&(f=_.transferEventName(f));const g=arguments[2],w=!!g&&("boolean"==typeof g||g.capture),m=arguments[1];if(!m)return P.apply(this,arguments);if(x&&!x(P,m,s,arguments))return;const D=te[f];let S;D&&(S=D[w?ce:ae]);const O=S&&s[S];if(O)for(let V=0;V<O.length;V++){const F=O[V];if(C(F,m))return O.splice(V,1),F.isRemoved=!0,0===O.length&&(F.allRemoved=!0,s[S]=null,"string"==typeof f)&&(s[ke+"ON_PROPERTY"+f]=null),F.zone.cancelTask(F),A?s:void 0}return P.apply(this,arguments)},E[y]=function(){const s=this||t;let f=arguments[0];_&&_.transferEventName&&(f=_.transferEventName(f));const g=[],w=Qe(s,G?G(f):f);for(let m=0;m<w.length;m++){const D=w[m];g.push(D.originalDelegate?D.originalDelegate:D.callback)}return g},E[d]=function(){const s=this||t;let f=arguments[0];if(f){_&&_.transferEventName&&(f=_.transferEventName(f));const g=te[f];if(g){const D=s[g[ae]],S=s[g[ce]];if(D){const O=D.slice();for(let V=0;V<O.length;V++){const F=O[V];this[a].call(this,f,F.originalDelegate?F.originalDelegate:F.callback,F.options)}}if(S){const O=S.slice();for(let V=0;V<O.length;V++){const F=O[V];this[a].call(this,f,F.originalDelegate?F.originalDelegate:F.callback,F.options)}}}}else{const g=Object.keys(s);for(let w=0;w<g.length;w++){const D=$e.exec(g[w]);let S=D&&D[1];S&&"removeListener"!==S&&this[d].call(this,S)}this[d].call(this,"removeListener")}if(A)return this},ue(E[c],I),ue(E[a],P),oe&&ue(E[d],oe),Q&&ue(E[y],Q),!0}let q=[];for(let R=0;R<i.length;R++)q[R]=J(i[R],o);return q}function Qe(t,n){if(!n){const a=[];for(let y in t){const d=$e.exec(y);let b=d&&d[1];if(b&&(!n||b===n)){const v=t[y];if(v)for(let p=0;p<v.length;p++)a.push(v[p])}}return a}let i=te[n];i||(Je(n),i=te[n]);const o=t[i[ae]],c=t[i[ce]];return o?c?o.concat(c):o.slice():c?c.slice():[]}function _t(t,n){const i=t.Event;i&&i.prototype&&n.patchMethod(i.prototype,"stopImmediatePropagation",o=>function(c,a){c[Ke]=!0,o&&o.apply(c,a)})}function Et(t,n,i,o,c){const a=Zone.__symbol__(o);if(n[a])return;const y=n[a]=n[o];n[o]=function(d,b,v){return b&&b.prototype&&c.forEach(function(p){const L=`${i}.${o}::`+p,Z=b.prototype;try{if(Z.hasOwnProperty(p)){const N=t.ObjectGetOwnPropertyDescriptor(Z,p);N&&N.value?(N.value=t.wrapWithCurrentZone(N.value,L),t._redefineProperty(b.prototype,p,N)):Z[p]&&(Z[p]=t.wrapWithCurrentZone(Z[p],L))}else Z[p]&&(Z[p]=t.wrapWithCurrentZone(Z[p],L))}catch{}}),y.call(n,d,b,v)},t.attachOriginToPatched(n[o],y)}function et(t,n,i){if(!i||0===i.length)return n;const o=i.filter(a=>a.target===t);if(!o||0===o.length)return n;const c=o[0].ignoreProperties;return n.filter(a=>-1===c.indexOf(a))}function tt(t,n,i,o){t&&Xe(t,et(t,n,i),o)}function He(t){return Object.getOwnPropertyNames(t).filter(n=>n.startsWith("on")&&n.length>2).map(n=>n.substring(2))}Zone.__load_patch("util",(t,n,i)=>{const o=He(t);i.patchOnProperties=Xe,i.patchMethod=le,i.bindArguments=Le,i.patchMacroTask=lt;const c=n.__symbol__("BLACK_LISTED_EVENTS"),a=n.__symbol__("UNPATCHED_EVENTS");t[a]&&(t[c]=t[a]),t[c]&&(n[c]=n[a]=t[c]),i.patchEventPrototype=_t,i.patchEventTarget=dt,i.isIEOrEdge=ft,i.ObjectDefineProperty=Ee,i.ObjectGetOwnPropertyDescriptor=ie,i.ObjectCreate=ge,i.ArraySlice=Ve,i.patchClass=ve,i.wrapWithCurrentZone=Ie,i.filterProperties=et,i.attachOriginToPatched=ue,i._redefineProperty=Object.defineProperty,i.patchCallbacks=Et,i.getGlobalObjects=()=>({globalSources:Ye,zoneSymbolEventNames:te,eventNames:o,isBrowser:Ae,isMix:Ue,isNode:we,TRUE_STR:ce,FALSE_STR:ae,ZONE_SYMBOL_PREFIX:ke,ADD_EVENT_LISTENER_STR:Se,REMOVE_EVENT_LISTENER_STR:Oe})});const Ce=j("zoneTask");function pe(t,n,i,o){let c=null,a=null;i+=o;const y={};function d(v){const p=v.data;return p.args[0]=function(){return v.invoke.apply(this,arguments)},p.handleId=c.apply(t,p.args),v}function b(v){return a.call(t,v.data.handleId)}c=le(t,n+=o,v=>function(p,L){if("function"==typeof L[0]){const Z={isPeriodic:"Interval"===o,delay:"Timeout"===o||"Interval"===o?L[1]||0:void 0,args:L},N=L[0];L[0]=function(){try{return N.apply(this,arguments)}finally{Z.isPeriodic||("number"==typeof Z.handleId?delete y[Z.handleId]:Z.handleId&&(Z.handleId[Ce]=null))}};const B=Me(n,L[0],Z,d,b);if(!B)return B;const H=B.data.handleId;return"number"==typeof H?y[H]=B:H&&(H[Ce]=B),H&&H.ref&&H.unref&&"function"==typeof H.ref&&"function"==typeof H.unref&&(B.ref=H.ref.bind(H),B.unref=H.unref.bind(H)),"number"==typeof H||H?H:B}return v.apply(t,L)}),a=le(t,i,v=>function(p,L){const Z=L[0];let N;"number"==typeof Z?N=y[Z]:(N=Z&&Z[Ce],N||(N=Z)),N&&"string"==typeof N.type?"notScheduled"!==N.state&&(N.cancelFn&&N.data.isPeriodic||0===N.runCount)&&("number"==typeof Z?delete y[Z]:Z&&(Z[Ce]=null),N.zone.cancelTask(N)):v.apply(t,L)})}Zone.__load_patch("legacy",t=>{const n=t[Zone.__symbol__("legacyPatch")];n&&n()}),Zone.__load_patch("queueMicrotask",(t,n,i)=>{i.patchMethod(t,"queueMicrotask",o=>function(c,a){n.current.scheduleMicroTask("queueMicrotask",a[0])})}),Zone.__load_patch("timers",t=>{const n="set",i="clear";pe(t,n,i,"Timeout"),pe(t,n,i,"Interval"),pe(t,n,i,"Immediate")}),Zone.__load_patch("requestAnimationFrame",t=>{pe(t,"request","cancel","AnimationFrame"),pe(t,"mozRequest","mozCancel","AnimationFrame"),pe(t,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(t,n)=>{const i=["alert","prompt","confirm"];for(let o=0;o<i.length;o++)le(t,i[o],(a,y,d)=>function(b,v){return n.current.run(a,t,v,d)})}),Zone.__load_patch("EventTarget",(t,n,i)=>{(function mt(t,n){n.patchEventPrototype(t,n)})(t,i),function pt(t,n){if(Zone[n.symbol("patchEventTarget")])return;const{eventNames:i,zoneSymbolEventNames:o,TRUE_STR:c,FALSE_STR:a,ZONE_SYMBOL_PREFIX:y}=n.getGlobalObjects();for(let b=0;b<i.length;b++){const v=i[b],Z=y+(v+a),N=y+(v+c);o[v]={},o[v][a]=Z,o[v][c]=N}const d=t.EventTarget;d&&d.prototype&&n.patchEventTarget(t,n,[d&&d.prototype])}(t,i);const o=t.XMLHttpRequestEventTarget;o&&o.prototype&&i.patchEventTarget(t,i,[o.prototype])}),Zone.__load_patch("MutationObserver",(t,n,i)=>{ve("MutationObserver"),ve("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(t,n,i)=>{ve("IntersectionObserver")}),Zone.__load_patch("FileReader",(t,n,i)=>{ve("FileReader")}),Zone.__load_patch("on_property",(t,n,i)=>{!function Tt(t,n){if(we&&!Ue||Zone[t.symbol("patchEvents")])return;const i=n.__Zone_ignore_on_properties;let o=[];if(Ae){const c=window;o=o.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const a=function ut(){try{const t=Te.navigator.userAgent;if(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:c,ignoreProperties:["error"]}]:[];tt(c,He(c),i&&i.concat(a),de(c))}o=o.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let c=0;c<o.length;c++){const a=n[o[c]];a&&a.prototype&&tt(a.prototype,He(a.prototype),i)}}(i,t)}),Zone.__load_patch("customElements",(t,n,i)=>{!function yt(t,n){const{isBrowser:i,isMix:o}=n.getGlobalObjects();(i||o)&&t.customElements&&"customElements"in t&&n.patchCallbacks(n,t.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(t,i)}),Zone.__load_patch("XHR",(t,n)=>{!function b(v){const p=v.XMLHttpRequest;if(!p)return;const L=p.prototype;let N=L[Ze],B=L[Ne];if(!N){const h=v.XMLHttpRequestEventTarget;if(h){const I=h.prototype;N=I[Ze],B=I[Ne]}}const H="readystatechange",J="scheduled";function q(h){const I=h.data,P=I.target;P[a]=!1,P[d]=!1;const Q=P[c];N||(N=P[Ze],B=P[Ne]),Q&&B.call(P,H,Q);const oe=P[c]=()=>{if(P.readyState===P.DONE)if(!I.aborted&&P[a]&&h.state===J){const U=P[n.__symbol__("loadfalse")];if(0!==P.status&&U&&U.length>0){const re=h.invoke;h.invoke=function(){const ee=P[n.__symbol__("loadfalse")];for(let W=0;W<ee.length;W++)ee[W]===h&&ee.splice(W,1);!I.aborted&&h.state===J&&re.call(h)},U.push(h)}else h.invoke()}else!I.aborted&&!1===P[a]&&(P[d]=!0)};return N.call(P,H,oe),P[i]||(P[i]=h),E.apply(P,I.args),P[a]=!0,h}function R(){}function _(h){const I=h.data;return I.aborted=!0,G.apply(I.target,I.args)}const K=le(L,"open",()=>function(h,I){return h[o]=0==I[2],h[y]=I[1],K.apply(h,I)}),X=j("fetchTaskAborting"),A=j("fetchTaskScheduling"),E=le(L,"send",()=>function(h,I){if(!0===n.current[A]||h[o])return E.apply(h,I);{const P={target:h,url:h[y],isPeriodic:!1,args:I,aborted:!1},Q=Me("XMLHttpRequest.send",R,P,q,_);h&&!0===h[d]&&!P.aborted&&Q.state===J&&Q.invoke()}}),G=le(L,"abort",()=>function(h,I){const P=function Z(h){return h[i]}(h);if(P&&"string"==typeof P.type){if(null==P.cancelFn||P.data&&P.data.aborted)return;P.zone.cancelTask(P)}else if(!0===n.current[X])return G.apply(h,I)})}(t);const i=j("xhrTask"),o=j("xhrSync"),c=j("xhrListener"),a=j("xhrScheduled"),y=j("xhrURL"),d=j("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",t=>{t.navigator&&t.navigator.geolocation&&function at(t,n){const i=t.constructor.name;for(let o=0;o<n.length;o++){const c=n[o],a=t[c];if(a){if(!Fe(ie(t,c)))continue;t[c]=(d=>{const b=function(){return d.apply(this,Le(arguments,i+"."+c))};return ue(b,d),b})(a)}}}(t.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(t,n)=>{function i(o){return function(c){Qe(t,o).forEach(y=>{const d=t.PromiseRejectionEvent;if(d){const b=new d(o,{promise:c.promise,reason:c.rejection});y.invoke(b)}})}}t.PromiseRejectionEvent&&(n[j("unhandledPromiseRejectionHandler")]=i("unhandledrejection"),n[j("rejectionHandledHandler")]=i("rejectionhandled"))})}},ie=>{ie(ie.s=435)}]);

"use strict";(self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[]).push([[179],{445:()=>{function ve(e){return"function"==typeof e}function Yo(e){const t=e(r=>{Error.call(r),r.stack=(new Error).stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}const Qo=Yo(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:\n${t.map((r,o)=>`${o+1}) ${r.toString()}`).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=t});function jr(e,n){if(e){const t=e.indexOf(n);0<=t&&e.splice(t,1)}}class xt{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._teardowns=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;const{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(const i of t)i.remove(this);else t.remove(this);const{initialTeardown:r}=this;if(ve(r))try{r()}catch(i){n=i instanceof Qo?i.errors:[i]}const{_teardowns:o}=this;if(o){this._teardowns=null;for(const i of o)try{Ku(i)}catch(s){n=n??[],s instanceof Qo?n=[...n,...s.errors]:n.push(s)}}if(n)throw new Qo(n)}}add(n){var t;if(n&&n!==this)if(this.closed)Ku(n);else{if(n instanceof xt){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._teardowns=null!==(t=this._teardowns)&&void 0!==t?t:[]).push(n)}}_hasParent(n){const{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){const{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){const{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&jr(t,n)}remove(n){const{_teardowns:t}=this;t&&jr(t,n),n instanceof xt&&n._removeParent(this)}}xt.EMPTY=(()=>{const e=new xt;return e.closed=!0,e})();const Yu=xt.EMPTY;function Qu(e){return e instanceof xt||e&&"closed"in e&&ve(e.remove)&&ve(e.add)&&ve(e.unsubscribe)}function Ku(e){ve(e)?e():e.unsubscribe()}const Sn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Ko={setTimeout(...e){const{delegate:n}=Ko;return(n?.setTimeout||setTimeout)(...e)},clearTimeout(e){const{delegate:n}=Ko;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Ju(e){Ko.setTimeout(()=>{const{onUnhandledError:n}=Sn;if(!n)throw e;n(e)})}function Jo(){}const Py=Xs("C",void 0,void 0);function Xs(e,n,t){return{kind:e,value:n,error:t}}let An=null;function Xo(e){if(Sn.useDeprecatedSynchronousErrorHandling){const n=!An;if(n&&(An={errorThrown:!1,error:null}),e(),n){const{errorThrown:t,error:r}=An;if(An=null,t)throw r}}else e()}class ea extends xt{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,Qu(n)&&n.add(this)):this.destination=Hy}static create(n,t,r){return new ta(n,t,r)}next(n){this.isStopped?ra(function Ly(e){return Xs("N",e,void 0)}(n),this):this._next(n)}error(n){this.isStopped?ra(function ky(e){return Xs("E",void 0,e)}(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?ra(Py,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}}class ta extends ea{constructor(n,t,r){let o;if(super(),ve(n))o=n;else if(n){let i;({next:o,error:t,complete:r}=n),this&&Sn.useDeprecatedNextContext?(i=Object.create(n),i.unsubscribe=()=>this.unsubscribe()):i=n,o=o?.bind(i),t=t?.bind(i),r=r?.bind(i)}this.destination={next:o?na(o):Jo,error:na(t??Xu),complete:r?na(r):Jo}}}function na(e,n){return(...t)=>{try{e(...t)}catch(r){Sn.useDeprecatedSynchronousErrorHandling?function Vy(e){Sn.useDeprecatedSynchronousErrorHandling&&An&&(An.errorThrown=!0,An.error=e)}(r):Ju(r)}}}function Xu(e){throw e}function ra(e,n){const{onStoppedNotification:t}=Sn;t&&Ko.setTimeout(()=>t(e,n))}const Hy={closed:!0,next:Jo,error:Xu,complete:Jo},oa="function"==typeof Symbol&&Symbol.observable||"@@observable";function ia(e){return e}let qe=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){const r=new e;return r.source=this,r.operator=t,r}subscribe(t,r,o){const i=function jy(e){return e&&e instanceof ea||function By(e){return e&&ve(e.next)&&ve(e.error)&&ve(e.complete)}(e)&&Qu(e)}(t)?t:new ta(t,r,o);return Xo(()=>{const{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(t){try{return this._subscribe(t)}catch(r){t.error(r)}}forEach(t,r){return new(r=td(r))((o,i)=>{let s;s=this.subscribe(a=>{try{t(a)}catch(l){i(l),s?.unsubscribe()}},i,o)})}_subscribe(t){var r;return null===(r=this.source)||void 0===r?void 0:r.subscribe(t)}[oa](){return this}pipe(...t){return function ed(e){return 0===e.length?ia:1===e.length?e[0]:function(t){return e.reduce((r,o)=>o(r),t)}}(t)(this)}toPromise(t){return new(t=td(t))((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=n=>new e(n),e})();function td(e){var n;return null!==(n=e??Sn.Promise)&&void 0!==n?n:Promise}const $y=Yo(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});let ei=(()=>{class e extends qe{constructor(){super(),this.closed=!1,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){const r=new nd(this,this);return r.operator=t,r}_throwIfClosed(){if(this.closed)throw new $y}next(t){Xo(()=>{if(this._throwIfClosed(),!this.isStopped){const r=this.observers.slice();for(const o of r)o.next(t)}})}error(t){Xo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;const{observers:r}=this;for(;r.length;)r.shift().error(t)}})}complete(){Xo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;const{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=null}get observed(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){const{hasError:r,isStopped:o,observers:i}=this;return r||o?Yu:(i.push(t),new xt(()=>jr(i,t)))}_checkFinalizedStatuses(t){const{hasError:r,thrownError:o,isStopped:i}=this;r?t.error(o):i&&t.complete()}asObservable(){const t=new qe;return t.source=this,t}}return e.create=(n,t)=>new nd(n,t),e})();class nd extends ei{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,r;null===(r=null===(t=this.destination)||void 0===t?void 0:t.next)||void 0===r||r.call(t,n)}error(n){var t,r;null===(r=null===(t=this.destination)||void 0===t?void 0:t.error)||void 0===r||r.call(t,n)}complete(){var n,t;null===(t=null===(n=this.destination)||void 0===n?void 0:n.complete)||void 0===t||t.call(n)}_subscribe(n){var t,r;return null!==(r=null===(t=this.source)||void 0===t?void 0:t.subscribe(n))&&void 0!==r?r:Yu}}class Uy extends ei{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){const t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){const{hasError:n,thrownError:t,_value:r}=this;if(n)throw t;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}}function Tn(e){return n=>{if(function zy(e){return ve(e?.lift)}(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}class Nn extends ea{constructor(n,t,r,o,i){super(n),this.onFinalize=i,this._next=t?function(s){try{t(s)}catch(a){n.error(a)}}:super._next,this._error=o?function(s){try{o(s)}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;const{closed:t}=this;super.unsubscribe(),!t&&(null===(n=this.onFinalize)||void 0===n||n.call(this))}}function sa(e,n){return Tn((t,r)=>{let o=0;t.subscribe(new Nn(r,i=>{r.next(e.call(n,i,o++))}))})}function xn(e){return this instanceof xn?(this.v=e,this):new xn(e)}function Zy(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=function id(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(i){t[i]=e[i]&&function(s){return new Promise(function(a,l){!function o(i,s,a,l){Promise.resolve(l).then(function(c){i({value:c,done:a})},s)}(a,l,(s=e[i](s)).done,s.value)})}}}const sd=e=>e&&"number"==typeof e.length&&"function"!=typeof e;function ad(e){return ve(e?.then)}function ld(e){return ve(e[oa])}function cd(e){return Symbol.asyncIterator&&ve(e?.[Symbol.asyncIterator])}function ud(e){return new TypeError(`You provided ${null!==e&&"object"==typeof e?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}const dd=function Qy(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}();function fd(e){return ve(e?.[dd])}function hd(e){return function qy(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,r=t.apply(e,n||[]),i=[];return o={},s("next"),s("throw"),s("return"),o[Symbol.asyncIterator]=function(){return this},o;function s(h){r[h]&&(o[h]=function(p){return new Promise(function(v,w){i.push([h,p,v,w])>1||a(h,p)})})}function a(h,p){try{!function l(h){h.value instanceof xn?Promise.resolve(h.value.v).then(c,u):d(i[0][2],h)}(r[h](p))}catch(v){d(i[0][3],v)}}function c(h){a("next",h)}function u(h){a("throw",h)}function d(h,p){h(p),i.shift(),i.length&&a(i[0][0],i[0][1])}}(this,arguments,function*(){const t=e.getReader();try{for(;;){const{value:r,done:o}=yield xn(t.read());if(o)return yield xn(void 0);yield yield xn(r)}}finally{t.releaseLock()}})}function pd(e){return ve(e?.getReader)}function On(e){if(e instanceof qe)return e;if(null!=e){if(ld(e))return function Ky(e){return new qe(n=>{const t=e[oa]();if(ve(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}(e);if(sd(e))return function Jy(e){return new qe(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}(e);if(ad(e))return function Xy(e){return new qe(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,Ju)})}(e);if(cd(e))return gd(e);if(fd(e))return function eC(e){return new qe(n=>{for(const t of e)if(n.next(t),n.closed)return;n.complete()})}(e);if(pd(e))return function tC(e){return gd(hd(e))}(e)}throw ud(e)}function gd(e){return new qe(n=>{(function nC(e,n){var t,r,o,i;return function Gy(e,n,t,r){return new(t||(t=Promise))(function(i,s){function a(u){try{c(r.next(u))}catch(d){s(d)}}function l(u){try{c(r.throw(u))}catch(d){s(d)}}function c(u){u.done?i(u.value):function o(i){return i instanceof t?i:new t(function(s){s(i)})}(u.value).then(a,l)}c((r=r.apply(e,n||[])).next())})}(this,void 0,void 0,function*(){try{for(t=Zy(e);!(r=yield t.next()).done;)if(n.next(r.value),n.closed)return}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=t.return)&&(yield i.call(t))}finally{if(o)throw o.error}}n.complete()})})(e,n).catch(t=>n.error(t))})}function ln(e,n,t,r=0,o=!1){const i=n.schedule(function(){t(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function la(e,n,t=1/0){return ve(n)?la((r,o)=>sa((i,s)=>n(r,i,o,s))(On(e(r,o))),t):("number"==typeof n&&(t=n),Tn((r,o)=>function rC(e,n,t,r,o,i,s,a){const l=[];let c=0,u=0,d=!1;const h=()=>{d&&!l.length&&!c&&n.complete()},p=w=>c<r?v(w):l.push(w),v=w=>{i&&n.next(w),c++;let M=!1;On(t(w,u++)).subscribe(new Nn(n,A=>{o?.(A),i?p(A):n.next(A)},()=>{M=!0},void 0,()=>{if(M)try{for(c--;l.length&&c<r;){const A=l.shift();s?ln(n,s,()=>v(A)):v(A)}h()}catch(A){n.error(A)}}))};return e.subscribe(new Nn(n,p,()=>{d=!0,h()})),()=>{a?.()}}(r,o,e,t)))}const ca=new qe(e=>e.complete());function ua(e){return e[e.length-1]}function md(e){return function sC(e){return e&&ve(e.schedule)}(ua(e))?e.pop():void 0}function vd(e,n=0){return Tn((t,r)=>{t.subscribe(new Nn(r,o=>ln(r,e,()=>r.next(o),n),()=>ln(r,e,()=>r.complete(),n),o=>ln(r,e,()=>r.error(o),n)))})}function _d(e,n=0){return Tn((t,r)=>{r.add(e.schedule(()=>t.subscribe(r),n))})}function yd(e,n){if(!e)throw new Error("Iterable cannot be null");return new qe(t=>{ln(t,n,()=>{const r=e[Symbol.asyncIterator]();ln(t,n,()=>{r.next().then(o=>{o.done?t.complete():t.next(o.value)})},0,!0)})})}function ti(e,n){return n?function pC(e,n){if(null!=e){if(ld(e))return function cC(e,n){return On(e).pipe(_d(n),vd(n))}(e,n);if(sd(e))return function dC(e,n){return new qe(t=>{let r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}(e,n);if(ad(e))return function uC(e,n){return On(e).pipe(_d(n),vd(n))}(e,n);if(cd(e))return yd(e,n);if(fd(e))return function fC(e,n){return new qe(t=>{let r;return ln(t,n,()=>{r=e[dd](),ln(t,n,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){return void t.error(s)}i?t.complete():t.next(o)},0,!0)}),()=>ve(r?.return)&&r.return()})}(e,n);if(pd(e))return function hC(e,n){return yd(hd(e),n)}(e,n)}throw ud(e)}(e,n):On(e)}function Cd(e={}){const{connector:n=(()=>new ei),resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:o=!0}=e;return i=>{let s=null,a=null,l=null,c=0,u=!1,d=!1;const h=()=>{a?.unsubscribe(),a=null},p=()=>{h(),s=l=null,u=d=!1},v=()=>{const w=s;p(),w?.unsubscribe()};return Tn((w,M)=>{c++,!d&&!u&&h();const A=l=l??n();M.add(()=>{c--,0===c&&!d&&!u&&(a=da(v,o))}),A.subscribe(M),s||(s=new ta({next:D=>A.next(D),error:D=>{d=!0,h(),a=da(p,t,D),A.error(D)},complete:()=>{u=!0,h(),a=da(p,r),A.complete()}}),ti(w).subscribe(s))})(i)}}function da(e,n,...t){return!0===n?(e(),null):!1===n?null:n(...t).pipe(function vC(e){return e<=0?()=>ca:Tn((n,t)=>{let r=0;n.subscribe(new Nn(t,o=>{++r<=e&&(t.next(o),e<=r&&t.complete())}))})}(1)).subscribe(()=>e())}function yC(e,n){return e===n}function le(e){for(let n in e)if(e[n]===le)return n;throw Error("Could not find renamed property on target object.")}function fa(e,n){for(const t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function xe(e){if("string"==typeof e)return e;if(Array.isArray(e))return"["+e.map(xe).join(", ")+"]";if(null==e)return""+e;if(e.overriddenName)return`${e.overriddenName}`;if(e.name)return`${e.name}`;const n=e.toString();if(null==n)return""+n;const t=n.indexOf("\n");return-1===t?n:n.substring(0,t)}function ha(e,n){return null==e||""===e?null===n?"":n:null==n||""===n?e:e+" "+n}const CC=le({__forward_ref__:le});function de(e){return e.__forward_ref__=de,e.toString=function(){return xe(this())},e}function j(e){return pa(e)?e():e}function pa(e){return"function"==typeof e&&e.hasOwnProperty(CC)&&e.__forward_ref__===de}function ga(e){return e&&!!e.\u0275providers}const Dd="https://g.co/ng/security#xss";class S extends Error{constructor(n,t){super(function ni(e,n){return`NG0${Math.abs(e)}${n?": "+n:""}`}(n,t)),this.code=n}}function $(e){return"string"==typeof e?e:null==e?"":String(e)}function ri(e,n){throw new S(-201,!1)}function gt(e,n){null==e&&function ae(e,n,t,r){throw new Error(`ASSERTION ERROR: ${e}`+(null==r?"":` [Expected=> ${t} ${r} ${n} <=Actual]`))}(n,e,null,"!=")}function ue(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Wt(e){return{providers:e.providers||[],imports:e.imports||[]}}function oi(e){return wd(e,ii)||wd(e,Ed)}function wd(e,n){return e.hasOwnProperty(n)?e[n]:null}function bd(e){return e&&(e.hasOwnProperty(ma)||e.hasOwnProperty(SC))?e[ma]:null}const ii=le({\u0275prov:le}),ma=le({\u0275inj:le}),Ed=le({ngInjectableDef:le}),SC=le({ngInjectorDef:le});var H=(()=>((H=H||{})[H.Default=0]="Default",H[H.Host=1]="Host",H[H.Self=2]="Self",H[H.SkipSelf=4]="SkipSelf",H[H.Optional=8]="Optional",H))();let va;function Xe(e){const n=va;return va=e,n}function Id(e,n,t){const r=oi(e);return r&&"root"==r.providedIn?void 0===r.value?r.value=r.factory():r.value:t&H.Optional?null:void 0!==n?n:void ri(xe(e))}const fe=(()=>typeof globalThis<"u"&&globalThis||typeof global<"u"&&global||typeof window<"u"&&window||typeof self<"u"&&typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&self)(),$r={},_a="__NG_DI_FLAG__",si="ngTempTokenPath",TC=/\n/gm,Sd="__source";let Kn;function un(e){const n=Kn;return Kn=e,n}function OC(e,n=H.Default){if(void 0===Kn)throw new S(-203,!1);return null===Kn?Id(e,void 0,n):Kn.get(e,n&H.Optional?null:void 0,n)}function ne(e,n=H.Default){return(function Md(){return va}()||OC)(j(e),n)}function pe(e,n=H.Default){return ne(e,ai(n))}function ai(e){return typeof e>"u"||"number"==typeof e?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function ya(e){const n=[];for(let t=0;t<e.length;t++){const r=j(e[t]);if(Array.isArray(r)){if(0===r.length)throw new S(900,!1);let o,i=H.Default;for(let s=0;s<r.length;s++){const a=r[s],l=FC(a);"number"==typeof l?-1===l?o=a.token:i|=l:o=a}n.push(ne(o,i))}else n.push(ne(r))}return n}function Ur(e,n){return e[_a]=n,e.prototype[_a]=n,e}function FC(e){return e[_a]}function qt(e){return{toString:e}.toString()}var Ot=(()=>((Ot=Ot||{})[Ot.OnPush=0]="OnPush",Ot[Ot.Default=1]="Default",Ot))(),ct=(()=>{return(e=ct||(ct={}))[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",ct;var e})();const Zt={},oe=[],li=le({\u0275cmp:le}),Ca=le({\u0275dir:le}),Da=le({\u0275pipe:le}),Td=le({\u0275mod:le}),Yt=le({\u0275fac:le}),zr=le({__NG_ELEMENT_ID__:le}),Nd=le({__NG_ENV_ID__:le});function xd(e,n,t){let r=e.length;for(;;){const o=e.indexOf(n,t);if(-1===o)return o;if(0===o||e.charCodeAt(o-1)<=32){const i=n.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}t=o+1}}function wa(e,n,t){let r=0;for(;r<t.length;){const o=t[r];if("number"==typeof o){if(0!==o)break;r++;const i=t[r++],s=t[r++],a=t[r++];e.setAttribute(n,s,a,i)}else{const i=o,s=t[++r];Fd(i)?e.setProperty(n,i,s):e.setAttribute(n,i,s),r++}}return r}function Od(e){return 3===e||4===e||6===e}function Fd(e){return 64===e.charCodeAt(0)}function Gr(e,n){if(null!==n&&0!==n.length)if(null===e||0===e.length)e=n.slice();else{let t=-1;for(let r=0;r<n.length;r++){const o=n[r];"number"==typeof o?t=o:0===t||Rd(e,t,o,null,-1===t||2===t?n[++r]:null)}}return e}function Rd(e,n,t,r,o){let i=0,s=e.length;if(-1===n)s=-1;else for(;i<e.length;){const a=e[i++];if("number"==typeof a){if(a===n){s=-1;break}if(a>n){s=i-1;break}}}for(;i<e.length;){const a=e[i];if("number"==typeof a)break;if(a===t){if(null===r)return void(null!==o&&(e[i+1]=o));if(r===e[i+1])return void(e[i+2]=o)}i++,null!==r&&i++,null!==o&&i++}-1!==s&&(e.splice(s,0,n),i=s+1),e.splice(i++,0,t),null!==r&&e.splice(i++,0,r),null!==o&&e.splice(i++,0,o)}const Pd="ng-template";function kC(e,n,t){let r=0,o=!0;for(;r<e.length;){let i=e[r++];if("string"==typeof i&&o){const s=e[r++];if(t&&"class"===i&&-1!==xd(s.toLowerCase(),n,0))return!0}else{if(1===i){for(;r<e.length&&"string"==typeof(i=e[r++]);)if(i.toLowerCase()===n)return!0;return!1}"number"==typeof i&&(o=!1)}}return!1}function kd(e){return 4===e.type&&e.value!==Pd}function LC(e,n,t){return n===(4!==e.type||t?e.value:Pd)}function VC(e,n,t){let r=4;const o=e.attrs||[],i=function jC(e){for(let n=0;n<e.length;n++)if(Od(e[n]))return n;return e.length}(o);let s=!1;for(let a=0;a<n.length;a++){const l=n[a];if("number"!=typeof l){if(!s)if(4&r){if(r=2|1&r,""!==l&&!LC(e,l,t)||""===l&&1===n.length){if(Ct(r))return!1;s=!0}}else{const c=8&r?l:n[++a];if(8&r&&null!==e.attrs){if(!kC(e.attrs,c,t)){if(Ct(r))return!1;s=!0}continue}const d=HC(8&r?"class":l,o,kd(e),t);if(-1===d){if(Ct(r))return!1;s=!0;continue}if(""!==c){let h;h=d>i?"":o[d+1].toLowerCase();const p=8&r?h:null;if(p&&-1!==xd(p,c,0)||2&r&&c!==h){if(Ct(r))return!1;s=!0}}}}else{if(!s&&!Ct(r)&&!Ct(l))return!1;if(s&&Ct(l))continue;s=!1,r=l|1&r}}return Ct(r)||s}function Ct(e){return 0==(1&e)}function HC(e,n,t,r){if(null===n)return-1;let o=0;if(r||!t){let i=!1;for(;o<n.length;){const s=n[o];if(s===e)return o;if(3===s||6===s)i=!0;else{if(1===s||2===s){let a=n[++o];for(;"string"==typeof a;)a=n[++o];continue}if(4===s)break;if(0===s){o+=4;continue}}o+=i?1:2}return-1}return function $C(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){const r=e[t];if("number"==typeof r)return-1;if(r===n)return t;t++}return-1}(n,e)}function Ld(e,n,t=!1){for(let r=0;r<n.length;r++)if(VC(e,n[r],t))return!0;return!1}function Vd(e,n){return e?":not("+n.trim()+")":n}function zC(e){let n=e[0],t=1,r=2,o="",i=!1;for(;t<e.length;){let s=e[t];if("string"==typeof s)if(2&r){const a=e[++t];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else 8&r?o+="."+s:4&r&&(o+=" "+s);else""!==o&&!Ct(s)&&(n+=Vd(i,o),o=""),r=s,i=i||!Ct(r);t++}return""!==o&&(n+=Vd(i,o)),n}function Qt(e){return qt(()=>{const n=Bd(e),t={...n,decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Ot.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:null,data:e.data||{},encapsulation:e.encapsulation||ct.Emulated,styles:e.styles||oe,_:null,schemas:e.schemas||null,tView:null,id:""};jd(t);const r=e.dependencies;return t.directiveDefs=ci(r,!1),t.pipeDefs=ci(r,!0),t.id=function JC(e){let n=0;const t=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,e.consts,e.vars,e.decls,e.encapsulation,e.standalone,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery].join("|");for(const o of t)n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}(t),t})}function ZC(e){return ie(e)||je(e)}function YC(e){return null!==e}function dn(e){return qt(()=>({type:e.type,bootstrap:e.bootstrap||oe,declarations:e.declarations||oe,imports:e.imports||oe,exports:e.exports||oe,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function Hd(e,n){if(null==e)return Zt;const t={};for(const r in e)if(e.hasOwnProperty(r)){let o=e[r],i=o;Array.isArray(o)&&(i=o[1],o=o[0]),t[o]=r,n&&(n[o]=i)}return t}function U(e){return qt(()=>{const n=Bd(e);return jd(n),n})}function et(e){return{type:e.type,name:e.name,factory:null,pure:!1!==e.pure,standalone:!0===e.standalone,onDestroy:e.type.prototype.ngOnDestroy||null}}function ie(e){return e[li]||null}function je(e){return e[Ca]||null}function tt(e){return e[Da]||null}function Bd(e){const n={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,exportAs:e.exportAs||null,standalone:!0===e.standalone,selectors:e.selectors||oe,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Hd(e.inputs,n),outputs:Hd(e.outputs)}}function jd(e){e.features?.forEach(n=>n(e))}function ci(e,n){if(!e)return null;const t=n?tt:ZC;return()=>("function"==typeof e?e():e).map(r=>t(r)).filter(YC)}const Oe=0,T=1,W=2,_e=3,Dt=4,Fn=5,$e=6,Jn=7,De=8,Xn=9,Rn=10,z=11,qr=12,$d=13,er=14,Se=15,Zr=16,tr=17,Ft=18,Yr=19,Ud=20,fn=21,Kt=22,ui=23,di=24,X=25,ba=1,zd=2,Rt=7,fi=8,nr=9,He=11;function dt(e){return Array.isArray(e)&&"object"==typeof e[ba]}function nt(e){return Array.isArray(e)&&!0===e[ba]}function Ea(e){return 0!=(4&e.flags)}function Pn(e){return e.componentOffset>-1}function hi(e){return 1==(1&e.flags)}function wt(e){return!!e.template}function Ma(e){return 0!=(512&e[W])}function kn(e,n){return e.hasOwnProperty(Yt)?e[Yt]:null}let rD=fe.WeakRef??class nD{constructor(n){this.ref=n}deref(){return this.ref}},iD=0,Pt=null,pi=!1;function Le(e){const n=Pt;return Pt=e,n}class Yd{constructor(){this.id=iD++,this.ref=function oD(e){return new rD(e)}(this),this.producers=new Map,this.consumers=new Map,this.trackingVersion=0,this.valueVersion=0}consumerPollProducersForChange(){for(const[n,t]of this.producers){const r=t.producerNode.deref();if(void 0!==r&&t.atTrackingVersion===this.trackingVersion){if(r.producerPollStatus(t.seenValueVersion))return!0}else this.producers.delete(n),r?.consumers.delete(this.id)}return!1}producerMayHaveChanged(){const n=pi;pi=!0;try{for(const[t,r]of this.consumers){const o=r.consumerNode.deref();void 0!==o&&o.trackingVersion===r.atTrackingVersion?o.onConsumerDependencyMayHaveChanged():(this.consumers.delete(t),o?.producers.delete(this.id))}}finally{pi=n}}producerAccessed(){if(pi)throw new Error("");if(null===Pt)return;let n=Pt.producers.get(this.id);void 0===n?(n={consumerNode:Pt.ref,producerNode:this.ref,seenValueVersion:this.valueVersion,atTrackingVersion:Pt.trackingVersion},Pt.producers.set(this.id,n),this.consumers.set(Pt.id,n)):(n.seenValueVersion=this.valueVersion,n.atTrackingVersion=Pt.trackingVersion)}get hasProducers(){return this.producers.size>0}get producerUpdatesAllowed(){return!1!==Pt?.consumerAllowSignalWrites}producerPollStatus(n){return this.valueVersion!==n||(this.onProducerUpdateValueVersion(),this.valueVersion!==n)}}let Qd=null;const Jd=()=>{};class cD extends Yd{constructor(n,t,r){super(),this.watch=n,this.schedule=t,this.dirty=!1,this.cleanupFn=Jd,this.registerOnCleanup=o=>{this.cleanupFn=o},this.consumerAllowSignalWrites=r}notify(){this.dirty||this.schedule(this),this.dirty=!0}onConsumerDependencyMayHaveChanged(){this.notify()}onProducerUpdateValueVersion(){}run(){if(this.dirty=!1,0!==this.trackingVersion&&!this.consumerPollProducersForChange())return;const n=Le(this);this.trackingVersion++;try{this.cleanupFn(),this.cleanupFn=Jd,this.watch(this.registerOnCleanup)}finally{Le(n)}}cleanup(){this.cleanupFn()}}class uD{constructor(n,t,r){this.previousValue=n,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}}function Jt(){return Xd}function Xd(e){return e.type.prototype.ngOnChanges&&(e.setInput=fD),dD}function dD(){const e=tf(this),n=e?.current;if(n){const t=e.previous;if(t===Zt)e.previous=n;else for(let r in n)t[r]=n[r];e.current=null,this.ngOnChanges(n)}}function fD(e,n,t,r){const o=this.declaredInputs[t],i=tf(e)||function hD(e,n){return e[ef]=n}(e,{previous:Zt,current:null}),s=i.current||(i.current={}),a=i.previous,l=a[o];s[o]=new uD(l&&l.currentValue,n,a===Zt),e[r]=n}Jt.ngInherit=!0;const ef="__ngSimpleChanges__";function tf(e){return e[ef]||null}const kt=function(e,n,t){};function ge(e){for(;Array.isArray(e);)e=e[Oe];return e}function vi(e,n){return ge(n[e])}function rt(e,n){return ge(n[e.index])}function of(e,n){return e.data[n]}function ot(e,n){const t=n[e];return dt(t)?t:t[Oe]}function _i(e){return 128==(128&e[W])}function hn(e,n){return null==n?null:e[n]}function sf(e){e[tr]=0}function yD(e){1024&e[W]||(e[W]|=1024,lf(e,1))}function af(e){1024&e[W]&&(e[W]&=-1025,lf(e,-1))}function lf(e,n){let t=e[_e];if(null===t)return;t[Fn]+=n;let r=t;for(t=t[_e];null!==t&&(1===n&&1===r[Fn]||-1===n&&0===r[Fn]);)t[Fn]+=n,r=t,t=t[_e]}const V={lFrame:yf(null),bindingsEnabled:!0,skipHydrationRootTNode:null};function df(){return V.bindingsEnabled}function E(){return V.lFrame.lView}function re(){return V.lFrame.tView}function Y(e){return V.lFrame.contextLView=e,e[De]}function Q(e){return V.lFrame.contextLView=null,e}function Be(){let e=ff();for(;null!==e&&64===e.type;)e=e.parent;return e}function ff(){return V.lFrame.currentTNode}function Lt(e,n){const t=V.lFrame;t.currentTNode=e,t.isParent=n}function xa(){return V.lFrame.isParent}function Oa(){V.lFrame.isParent=!1}function Ze(){const e=V.lFrame;let n=e.bindingRootIndex;return-1===n&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function ir(){return V.lFrame.bindingIndex++}function en(e){const n=V.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function xD(e,n){const t=V.lFrame;t.bindingIndex=t.bindingRootIndex=e,Fa(n)}function Fa(e){V.lFrame.currentDirectiveIndex=e}function Pa(e){V.lFrame.currentQueryIndex=e}function FD(e){const n=e[T];return 2===n.type?n.declTNode:1===n.type?e[$e]:null}function vf(e,n,t){if(t&H.SkipSelf){let o=n,i=e;for(;!(o=o.parent,null!==o||t&H.Host||(o=FD(i),null===o||(i=i[er],10&o.type))););if(null===o)return!1;n=o,e=i}const r=V.lFrame=_f();return r.currentTNode=n,r.lView=e,!0}function ka(e){const n=_f(),t=e[T];V.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function _f(){const e=V.lFrame,n=null===e?null:e.child;return null===n?yf(e):n}function yf(e){const n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return null!==e&&(e.child=n),n}function Cf(){const e=V.lFrame;return V.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}const Df=Cf;function La(){const e=Cf();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Ye(){return V.lFrame.selectedIndex}function Ln(e){V.lFrame.selectedIndex=e}function ye(){const e=V.lFrame;return of(e.tView,e.selectedIndex)}let Ef=!0;function yi(){return Ef}function pn(e){Ef=e}function Ci(e,n){for(let t=n.directiveStart,r=n.directiveEnd;t<r;t++){const i=e.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=i;s&&(e.contentHooks??=[]).push(-t,s),a&&((e.contentHooks??=[]).push(t,a),(e.contentCheckHooks??=[]).push(t,a)),l&&(e.viewHooks??=[]).push(-t,l),c&&((e.viewHooks??=[]).push(t,c),(e.viewCheckHooks??=[]).push(t,c)),null!=u&&(e.destroyHooks??=[]).push(t,u)}}function Di(e,n,t){Mf(e,n,3,t)}function wi(e,n,t,r){(3&e[W])===t&&Mf(e,n,t,r)}function Va(e,n){let t=e[W];(3&t)===n&&(t&=4095,t+=1,e[W]=t)}function Mf(e,n,t,r){const i=r??-1,s=n.length-1;let a=0;for(let l=void 0!==r?65535&e[tr]:0;l<s;l++)if("number"==typeof n[l+1]){if(a=n[l],null!=r&&a>=r)break}else n[l]<0&&(e[tr]+=65536),(a<i||-1==i)&&(BD(e,t,n,l),e[tr]=(4294901760&e[tr])+l+2),l++}function If(e,n){kt(4,e,n);const t=Le(null);try{n.call(e)}finally{Le(t),kt(5,e,n)}}function BD(e,n,t,r){const o=t[r]<0,i=t[r+1],a=e[o?-t[r]:t[r]];o?e[W]>>12<e[tr]>>16&&(3&e[W])===n&&(e[W]+=4096,If(a,i)):If(a,i)}const sr=-1;class Jr{constructor(n,t,r){this.factory=n,this.resolving=!1,this.canSeeViewProviders=t,this.injectImpl=r}}function Sf(e){return e!==sr}function bi(e){return 32767&e}function Ei(e,n){let t=function zD(e){return e>>16}(e),r=n;for(;t>0;)r=r[er],t--;return r}let Ba=!0;function Mi(e){const n=Ba;return Ba=e,n}const Af=255,Tf=5;let GD=0;const Vt={};function Ii(e,n){const t=Nf(e,n);if(-1!==t)return t;const r=n[T];r.firstCreatePass&&(e.injectorIndex=n.length,ja(r.data,e),ja(n,null),ja(r.blueprint,null));const o=$a(e,n),i=e.injectorIndex;if(Sf(o)){const s=bi(o),a=Ei(o,n),l=a[T].data;for(let c=0;c<8;c++)n[i+c]=a[s+c]|l[s+c]}return n[i+8]=o,i}function ja(e,n){e.push(0,0,0,0,0,0,0,0,n)}function Nf(e,n){return-1===e.injectorIndex||e.parent&&e.parent.injectorIndex===e.injectorIndex||null===n[e.injectorIndex+8]?-1:e.injectorIndex}function $a(e,n){if(e.parent&&-1!==e.parent.injectorIndex)return e.parent.injectorIndex;let t=0,r=null,o=n;for(;null!==o;){if(r=Lf(o),null===r)return sr;if(t++,o=o[er],-1!==r.injectorIndex)return r.injectorIndex|t<<16}return sr}function Ua(e,n,t){!function WD(e,n,t){let r;"string"==typeof t?r=t.charCodeAt(0)||0:t.hasOwnProperty(zr)&&(r=t[zr]),null==r&&(r=t[zr]=GD++);const o=r&Af;n.data[e+(o>>Tf)]|=1<<o}(e,n,t)}function xf(e,n,t){if(t&H.Optional||void 0!==e)return e;ri()}function Of(e,n,t,r){if(t&H.Optional&&void 0===r&&(r=null),!(t&(H.Self|H.Host))){const o=e[Xn],i=Xe(void 0);try{return o?o.get(n,r,t&H.Optional):Id(n,r,t&H.Optional)}finally{Xe(i)}}return xf(r,0,t)}function Ff(e,n,t,r=H.Default,o){if(null!==e){if(2048&n[W]&&!(r&H.Self)){const s=function KD(e,n,t,r,o){let i=e,s=n;for(;null!==i&&null!==s&&2048&s[W]&&!(512&s[W]);){const a=Rf(i,s,t,r|H.Self,Vt);if(a!==Vt)return a;let l=i.parent;if(!l){const c=s[Ud];if(c){const u=c.get(t,Vt,r);if(u!==Vt)return u}l=Lf(s),s=s[er]}i=l}return o}(e,n,t,r,Vt);if(s!==Vt)return s}const i=Rf(e,n,t,r,Vt);if(i!==Vt)return i}return Of(n,t,r,o)}function Rf(e,n,t,r,o){const i=function YD(e){if("string"==typeof e)return e.charCodeAt(0)||0;const n=e.hasOwnProperty(zr)?e[zr]:void 0;return"number"==typeof n?n>=0?n&Af:QD:n}(t);if("function"==typeof i){if(!vf(n,e,r))return r&H.Host?xf(o,0,r):Of(n,t,r,o);try{const s=i(r);if(null!=s||r&H.Optional)return s;ri()}finally{Df()}}else if("number"==typeof i){let s=null,a=Nf(e,n),l=sr,c=r&H.Host?n[Se][$e]:null;for((-1===a||r&H.SkipSelf)&&(l=-1===a?$a(e,n):n[a+8],l!==sr&&kf(r,!1)?(s=n[T],a=bi(l),n=Ei(l,n)):a=-1);-1!==a;){const u=n[T];if(Pf(i,a,u.data)){const d=ZD(a,n,t,s,r,c);if(d!==Vt)return d}l=n[a+8],l!==sr&&kf(r,n[T].data[a+8]===c)&&Pf(i,a,n)?(s=u,a=bi(l),n=Ei(l,n)):a=-1}}return o}function ZD(e,n,t,r,o,i){const s=n[T],a=s.data[e+8],u=function Si(e,n,t,r,o){const i=e.providerIndexes,s=n.data,a=1048575&i,l=e.directiveStart,u=i>>20,h=o?a+u:e.directiveEnd;for(let p=r?a:a+u;p<h;p++){const v=s[p];if(p<l&&t===v||p>=l&&v.type===t)return p}if(o){const p=s[l];if(p&&wt(p)&&p.type===t)return l}return null}(a,s,t,null==r?Pn(a)&&Ba:r!=s&&0!=(3&a.type),o&H.Host&&i===a);return null!==u?Vn(n,s,u,a):Vt}function Vn(e,n,t,r){let o=e[t];const i=n.data;if(function jD(e){return e instanceof Jr}(o)){const s=o;s.resolving&&function DC(e,n){const t=n?`. Dependency path: ${n.join(" > ")} > ${e}`:"";throw new S(-200,`Circular dependency in DI detected for ${e}${t}`)}(function se(e){return"function"==typeof e?e.name||e.toString():"object"==typeof e&&null!=e&&"function"==typeof e.type?e.type.name||e.type.toString():$(e)}(i[t]));const a=Mi(s.canSeeViewProviders);s.resolving=!0;const l=s.injectImpl?Xe(s.injectImpl):null;vf(e,r,H.Default);try{o=e[t]=s.factory(void 0,i,e,r),n.firstCreatePass&&t>=r.directiveStart&&function HD(e,n,t){const{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=n.type.prototype;if(r){const s=Xd(n);(t.preOrderHooks??=[]).push(e,s),(t.preOrderCheckHooks??=[]).push(e,s)}o&&(t.preOrderHooks??=[]).push(0-e,o),i&&((t.preOrderHooks??=[]).push(e,i),(t.preOrderCheckHooks??=[]).push(e,i))}(t,i[t],n)}finally{null!==l&&Xe(l),Mi(a),s.resolving=!1,Df()}}return o}function Pf(e,n,t){return!!(t[n+(e>>Tf)]&1<<e)}function kf(e,n){return!(e&H.Self||e&H.Host&&n)}class ar{constructor(n,t){this._tNode=n,this._lView=t}get(n,t,r){return Ff(this._tNode,this._lView,n,ai(r),t)}}function QD(){return new ar(Be(),E())}function Ue(e){return qt(()=>{const n=e.prototype.constructor,t=n[Yt]||za(n),r=Object.prototype;let o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){const i=o[Yt]||za(o);if(i&&i!==t)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function za(e){return pa(e)?()=>{const n=za(j(e));return n&&n()}:kn(e)}function Lf(e){const n=e[T],t=n.type;return 2===t?n.declTNode:1===t?e[$e]:null}const cr="__parameters__";function dr(e,n,t){return qt(()=>{const r=function Wa(e){return function(...t){if(e){const r=e(...t);for(const o in r)this[o]=r[o]}}}(n);function o(...i){if(this instanceof o)return r.apply(this,i),this;const s=new o(...i);return a.annotation=s,a;function a(l,c,u){const d=l.hasOwnProperty(cr)?l[cr]:Object.defineProperty(l,cr,{value:[]})[cr];for(;d.length<=u;)d.push(null);return(d[u]=d[u]||[]).push(s),l}}return t&&(o.prototype=Object.create(t.prototype)),o.prototype.ngMetadataName=e,o.annotationCls=o,o})}function to(e,n){e.forEach(t=>Array.isArray(t)?to(t,n):n(t))}function Hf(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Ai(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function ft(e,n,t){let r=fr(e,n);return r>=0?e[1|r]=t:(r=~r,function nw(e,n,t,r){let o=e.length;if(o==n)e.push(t,r);else if(1===o)e.push(r,e[0]),e[0]=t;else{for(o--,e.push(e[o-1],e[o]);o>n;)e[o]=e[o-2],o--;e[n]=t,e[n+1]=r}}(e,r,n,t)),r}function qa(e,n){const t=fr(e,n);if(t>=0)return e[1|t]}function fr(e,n){return function Bf(e,n,t){let r=0,o=e.length>>t;for(;o!==r;){const i=r+(o-r>>1),s=e[i<<t];if(n===s)return i<<t;s>n?o=i:r=i+1}return~(o<<t)}(e,n,1)}const Ya=Ur(dr("Optional"),8),Qa=Ur(dr("SkipSelf"),4);function Fi(e){return 128==(128&e.flags)}var it=(()=>((it=it||{})[it.Important=1]="Important",it[it.DashCase=2]="DashCase",it))();const bw=/^>|^->|<!--|-->|--!>|<!-$/g,Ew=/(<|>)/,Mw="\u200b$1\u200b";const tl=new Map;let Iw=0;const rl="__ngContext__";function ze(e,n){dt(n)?(e[rl]=n[Yr],function Aw(e){tl.set(e[Yr],e)}(n)):e[rl]=n}let ol;function il(e,n){return ol(e,n)}function io(e){const n=e[_e];return nt(n)?n[_e]:n}function sl(e){return ih(e[qr])}function al(e){return ih(e[Dt])}function ih(e){for(;null!==e&&!nt(e);)e=e[Dt];return e}function gr(e,n,t,r,o){if(null!=r){let i,s=!1;nt(r)?i=r:dt(r)&&(s=!0,r=r[Oe]);const a=ge(r);0===e&&null!==t?null==o?uh(n,t,a):Hn(n,t,a,o||null,!0):1===e&&null!==t?Hn(n,t,a,o||null,!0):2===e?function Hi(e,n,t){const r=Li(e,n);r&&function qw(e,n,t,r){e.removeChild(n,t,r)}(e,r,n,t)}(n,a,s):3===e&&n.destroyNode(a),null!=i&&function Qw(e,n,t,r,o){const i=t[Rt];i!==ge(t)&&gr(n,e,r,i,o);for(let a=He;a<t.length;a++){const l=t[a];ao(l[T],l,e,n,r,i)}}(n,e,i,t,o)}}function ll(e,n){return e.createComment(function Kf(e){return e.replace(bw,n=>n.replace(Ew,Mw))}(n))}function ki(e,n,t){return e.createElement(n,t)}function ah(e,n){const t=e[nr],r=t.indexOf(n);af(n),t.splice(r,1)}function cl(e,n){if(e.length<=He)return;const t=He+n,r=e[t];if(r){const o=r[Zr];null!==o&&o!==e&&ah(o,r),n>0&&(e[t-1][Dt]=r[Dt]);const i=Ai(e,He+n);!function Hw(e,n){ao(e,n,n[z],2,null,null),n[Oe]=null,n[$e]=null}(r[T],r);const s=i[Ft];null!==s&&s.detachView(i[T]),r[_e]=null,r[Dt]=null,r[W]&=-129}return r}function lh(e,n){if(!(256&n[W])){const t=n[z];n[ui]?.destroy(),n[di]?.destroy(),t.destroyNode&&ao(e,n,t,3,null,null),function $w(e){let n=e[qr];if(!n)return ul(e[T],e);for(;n;){let t=null;if(dt(n))t=n[qr];else{const r=n[He];r&&(t=r)}if(!t){for(;n&&!n[Dt]&&n!==e;)dt(n)&&ul(n[T],n),n=n[_e];null===n&&(n=e),dt(n)&&ul(n[T],n),t=n&&n[Dt]}n=t}}(n)}}function ul(e,n){if(!(256&n[W])){n[W]&=-129,n[W]|=256,function Ww(e,n){let t;if(null!=e&&null!=(t=e.destroyHooks))for(let r=0;r<t.length;r+=2){const o=n[t[r]];if(!(o instanceof Jr)){const i=t[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){const a=o[i[s]],l=i[s+1];kt(4,a,l);try{l.call(a)}finally{kt(5,a,l)}}else{kt(4,o,i);try{i.call(o)}finally{kt(5,o,i)}}}}}(e,n),function Gw(e,n){const t=e.cleanup,r=n[Jn];if(null!==t)for(let i=0;i<t.length-1;i+=2)if("string"==typeof t[i]){const s=t[i+3];s>=0?r[s]():r[-s].unsubscribe(),i+=2}else t[i].call(r[t[i+1]]);null!==r&&(n[Jn]=null);const o=n[fn];if(null!==o){n[fn]=null;for(let i=0;i<o.length;i++)(0,o[i])()}}(e,n),1===n[T].type&&n[z].destroy();const t=n[Zr];if(null!==t&&nt(n[_e])){t!==n[_e]&&ah(t,n);const r=n[Ft];null!==r&&r.detachView(e)}!function Tw(e){tl.delete(e[Yr])}(n)}}function dl(e,n,t){return function ch(e,n,t){let r=n;for(;null!==r&&40&r.type;)r=(n=r).parent;if(null===r)return t[Oe];{const{componentOffset:o}=r;if(o>-1){const{encapsulation:i}=e.data[r.directiveStart+o];if(i===ct.None||i===ct.Emulated)return null}return rt(r,t)}}(e,n.parent,t)}function Hn(e,n,t,r,o){e.insertBefore(n,t,r,o)}function uh(e,n,t){e.appendChild(n,t)}function dh(e,n,t,r,o){null!==r?Hn(e,n,t,r,o):uh(e,n,t)}function Li(e,n){return e.parentNode(n)}let fl,ml,ph=function hh(e,n,t){return 40&e.type?rt(e,t):null};function Vi(e,n,t,r){const o=dl(e,r,n),i=n[z],a=function fh(e,n,t){return ph(e,n,t)}(r.parent||n[$e],r,n);if(null!=o)if(Array.isArray(t))for(let l=0;l<t.length;l++)dh(i,o,t[l],a,!1);else dh(i,o,t,a,!1);void 0!==fl&&fl(i,r,n,t,o)}function so(e,n){if(null!==n){const t=n.type;if(3&t)return rt(n,e);if(4&t)return hl(-1,e[n.index]);if(8&t){const r=n.child;if(null!==r)return so(e,r);{const o=e[n.index];return nt(o)?hl(-1,o):ge(o)}}if(32&t)return il(n,e)()||ge(e[n.index]);{const r=mh(e,n);return null!==r?Array.isArray(r)?r[0]:so(io(e[Se]),r):so(e,n.next)}}return null}function mh(e,n){return null!==n?e[Se][$e].projection[n.projection]:null}function hl(e,n){const t=He+e+1;if(t<n.length){const r=n[t],o=r[T].firstChild;if(null!==o)return so(r,o)}return n[Rt]}function pl(e,n,t,r,o,i,s){for(;null!=t;){const a=r[t.index],l=t.type;if(s&&0===n&&(a&&ze(ge(a),r),t.flags|=2),32!=(32&t.flags))if(8&l)pl(e,n,t.child,r,o,i,!1),gr(n,e,o,a,i);else if(32&l){const c=il(t,r);let u;for(;u=c();)gr(n,e,o,u,i);gr(n,e,o,a,i)}else 16&l?_h(e,n,r,t,o,i):gr(n,e,o,a,i);t=s?t.projectionNext:t.next}}function ao(e,n,t,r,o,i){pl(t,r,e.firstChild,n,o,i,!1)}function _h(e,n,t,r,o,i){const s=t[Se],l=s[$e].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++)gr(n,e,o,l[c],i);else{let c=l;const u=s[_e];Fi(r)&&(c.flags|=128),pl(e,n,c,u,o,i,!0)}}function yh(e,n,t){""===t?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function Ch(e,n,t){const{mergedAttrs:r,classes:o,styles:i}=t;null!==r&&wa(e,n,r),null!==o&&yh(e,n,o),null!==i&&function Jw(e,n,t){e.setAttribute(n,"style",t)}(e,n,i)}class Eh{constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Dd})`}}function gn(e){return e instanceof Eh?e.changingThisBreaksApplicationSecurity:e}const fb=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;var Ae=(()=>((Ae=Ae||{})[Ae.NONE=0]="NONE",Ae[Ae.HTML=1]="HTML",Ae[Ae.STYLE=2]="STYLE",Ae[Ae.SCRIPT=3]="SCRIPT",Ae[Ae.URL=4]="URL",Ae[Ae.RESOURCE_URL=5]="RESOURCE_URL",Ae))();function mn(e){const n=function fo(){const e=E();return e&&e[Rn].sanitizer}();return n?n.sanitize(Ae.URL,e)||"":function co(e,n){const t=function lb(e){return e instanceof Eh&&e.getTypeName()||null}(e);if(null!=t&&t!==n){if("ResourceURL"===t&&"URL"===n)return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${Dd})`)}return t===n}(e,"URL")?gn(e):function _l(e){return(e=String(e)).match(fb)?e:"unsafe:"+e}($(e))}class P{constructor(n,t){this._desc=n,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,"number"==typeof t?this.__NG_ELEMENT_ID__=t:void 0!==t&&(this.\u0275prov=ue({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}}const Ui=new P("ENVIRONMENT_INITIALIZER"),Oh=new P("INJECTOR",-1),Fh=new P("INJECTOR_DEF_TYPES");class Rh{get(n,t=$r){if(t===$r){const r=new Error(`NullInjectorError: No provider for ${xe(n)}!`);throw r.name="NullInjectorError",r}return t}}function Ib(...e){return{\u0275providers:kh(0,e),\u0275fromNgModule:!0}}function kh(e,...n){const t=[],r=new Set;let o;return to(n,i=>{const s=i;wl(s,t,[],r)&&(o||=[],o.push(s))}),void 0!==o&&Lh(o,t),t}function Lh(e,n){for(let t=0;t<e.length;t++){const{providers:o}=e[t];bl(o,i=>{n.push(i)})}}function wl(e,n,t,r){if(!(e=j(e)))return!1;let o=null,i=bd(e);const s=!i&&ie(e);if(i||s){if(s&&!s.standalone)return!1;o=e}else{const l=e.ngModule;if(i=bd(l),!i)return!1;o=l}const a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){const l="function"==typeof s.dependencies?s.dependencies():s.dependencies;for(const c of l)wl(c,n,t,r)}}else{if(!i)return!1;{if(null!=i.imports&&!a){let c;r.add(o);try{to(i.imports,u=>{wl(u,n,t,r)&&(c||=[],c.push(u))})}finally{}void 0!==c&&Lh(c,n)}if(!a){const c=kn(o)||(()=>new o);n.push({provide:o,useFactory:c,deps:oe},{provide:Fh,useValue:o,multi:!0},{provide:Ui,useValue:()=>ne(o),multi:!0})}const l=i.providers;null==l||a||bl(l,u=>{n.push(u)})}}return o!==e&&void 0!==e.providers}function bl(e,n){for(let t of e)ga(t)&&(t=t.\u0275providers),Array.isArray(t)?bl(t,n):n(t)}const Sb=le({provide:String,useValue:le});function El(e){return null!==e&&"object"==typeof e&&Sb in e}function Bn(e){return"function"==typeof e}const Ml=new P("Set Injector scope."),zi={},Tb={};let Il;function Gi(){return void 0===Il&&(Il=new Rh),Il}class vr{}class Sl extends vr{get destroyed(){return this._destroyed}constructor(n,t,r,o){super(),this.parent=t,this.source=r,this.scopes=o,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,Tl(n,s=>this.processProvider(s)),this.records.set(Oh,_r(void 0,this)),o.has("environment")&&this.records.set(vr,_r(void 0,this));const i=this.records.get(Ml);null!=i&&"string"==typeof i.value&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Fh.multi,oe,H.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;try{for(const t of this._ngOnDestroyHooks)t.ngOnDestroy();const n=this._onDestroyHooks;this._onDestroyHooks=[];for(const t of n)t()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear()}}onDestroy(n){return this.assertNotDestroyed(),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){this.assertNotDestroyed();const t=un(this),r=Xe(void 0);try{return n()}finally{un(t),Xe(r)}}get(n,t=$r,r=H.Default){if(this.assertNotDestroyed(),n.hasOwnProperty(Nd))return n[Nd](this);r=ai(r);const o=un(this),i=Xe(void 0);try{if(!(r&H.SkipSelf)){let a=this.records.get(n);if(void 0===a){const l=function Rb(e){return"function"==typeof e||"object"==typeof e&&e instanceof P}(n)&&oi(n);a=l&&this.injectableDefInScope(l)?_r(Al(n),zi):null,this.records.set(n,a)}if(null!=a)return this.hydrate(n,a)}return(r&H.Self?Gi():this.parent).get(n,t=r&H.Optional&&t===$r?null:t)}catch(s){if("NullInjectorError"===s.name){if((s[si]=s[si]||[]).unshift(xe(n)),o)throw s;return function RC(e,n,t,r){const o=e[si];throw n[Sd]&&o.unshift(n[Sd]),e.message=function PC(e,n,t,r=null){e=e&&"\n"===e.charAt(0)&&"\u0275"==e.charAt(1)?e.slice(2):e;let o=xe(n);if(Array.isArray(n))o=n.map(xe).join(" -> ");else if("object"==typeof n){let i=[];for(let s in n)if(n.hasOwnProperty(s)){let a=n[s];i.push(s+":"+("string"==typeof a?JSON.stringify(a):xe(a)))}o=`{${i.join(", ")}}`}return`${t}${r?"("+r+")":""}[${o}]: ${e.replace(TC,"\n  ")}`}("\n"+e.message,o,t,r),e.ngTokenPath=o,e[si]=null,e}(s,n,"R3InjectorError",this.source)}throw s}finally{Xe(i),un(o)}}resolveInjectorInitializers(){const n=un(this),t=Xe(void 0);try{const r=this.get(Ui.multi,oe,H.Self);for(const o of r)o()}finally{un(n),Xe(t)}}toString(){const n=[],t=this.records;for(const r of t.keys())n.push(xe(r));return`R3Injector[${n.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new S(205,!1)}processProvider(n){let t=Bn(n=j(n))?n:j(n&&n.provide);const r=function xb(e){return El(e)?_r(void 0,e.useValue):_r(Bh(e),zi)}(n);if(Bn(n)||!0!==n.multi)this.records.get(t);else{let o=this.records.get(t);o||(o=_r(void 0,zi,!0),o.factory=()=>ya(o.multi),this.records.set(t,o)),t=n,o.multi.push(n)}this.records.set(t,r)}hydrate(n,t){return t.value===zi&&(t.value=Tb,t.value=t.factory()),"object"==typeof t.value&&t.value&&function Fb(e){return null!==e&&"object"==typeof e&&"function"==typeof e.ngOnDestroy}(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}injectableDefInScope(n){if(!n.providedIn)return!1;const t=j(n.providedIn);return"string"==typeof t?"any"===t||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){const t=this._onDestroyHooks.indexOf(n);-1!==t&&this._onDestroyHooks.splice(t,1)}}function Al(e){const n=oi(e),t=null!==n?n.factory:kn(e);if(null!==t)return t;if(e instanceof P)throw new S(204,!1);if(e instanceof Function)return function Nb(e){const n=e.length;if(n>0)throw function no(e,n){const t=[];for(let r=0;r<e;r++)t.push(n);return t}(n,"?"),new S(204,!1);const t=function IC(e){return e&&(e[ii]||e[Ed])||null}(e);return null!==t?()=>t.factory(e):()=>new e}(e);throw new S(204,!1)}function Bh(e,n,t){let r;if(Bn(e)){const o=j(e);return kn(o)||Al(o)}if(El(e))r=()=>j(e.useValue);else if(function Hh(e){return!(!e||!e.useFactory)}(e))r=()=>e.useFactory(...ya(e.deps||[]));else if(function Vh(e){return!(!e||!e.useExisting)}(e))r=()=>ne(j(e.useExisting));else{const o=j(e&&(e.useClass||e.provide));if(!function Ob(e){return!!e.deps}(e))return kn(o)||Al(o);r=()=>new o(...ya(e.deps))}return r}function _r(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function Tl(e,n){for(const t of e)Array.isArray(t)?Tl(t,n):t&&ga(t)?Tl(t.\u0275providers,n):n(t)}const Wi=new P("AppId",{providedIn:"root",factory:()=>Pb}),Pb="ng",jh=new P("Platform Initializer"),yr=new P("Platform ID",{providedIn:"platform",factory:()=>"unknown"}),$h=new P("CSP nonce",{providedIn:"root",factory:()=>function lo(){if(void 0!==ml)return ml;if(typeof document<"u")return document;throw new S(210,!1)}().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});let zh=(e,n)=>null;function Gh(e,n){return zh(e,n)}class zb{}class Zh{}class Wb{resolveComponentFactory(n){throw function Gb(e){const n=Error(`No component factory found for ${xe(e)}.`);return n.ngComponent=e,n}(n)}}let Ki=(()=>{class e{}return e.NULL=new Wb,e})();function qb(){return Cr(Be(),E())}function Cr(e,n){return new bt(rt(e,n))}let bt=(()=>{class e{constructor(t){this.nativeElement=t}}return e.__NG_ELEMENT_ID__=qb,e})();class Qh{}let jn=(()=>{class e{}return e.__NG_ELEMENT_ID__=()=>function Yb(){const e=E(),t=ot(Be().index,e);return(dt(t)?t:e)[z]}(),e})(),Qb=(()=>{class e{}return e.\u0275prov=ue({token:e,providedIn:"root",factory:()=>null}),e})();class Ji{constructor(n){this.full=n,this.major=n.split(".")[0],this.minor=n.split(".")[1],this.patch=n.split(".").slice(2).join(".")}}const Kb=new Ji("16.0.4"),Bl={};function mo(e){for(;e;){e[W]|=64;const n=io(e);if(Ma(e)&&!n)return e;e=n}return null}function jl(e){return e.ngOriginalError}class $n{constructor(){this._console=console}handleError(n){const t=this._findOriginalError(n);this._console.error("ERROR",n),t&&this._console.error("ORIGINAL ERROR",t)}_findOriginalError(n){let t=n&&jl(n);for(;t&&jl(t);)t=jl(t);return t||null}}const Xh=new P("",{providedIn:"root",factory:()=>!1});function $l(e){return e.ownerDocument.defaultView}class op extends Yd{constructor(){super(...arguments),this.consumerAllowSignalWrites=!1,this._lView=null}set lView(n){this._lView=n}onConsumerDependencyMayHaveChanged(){mo(this._lView)}onProducerUpdateValueVersion(){}get hasReadASignal(){return this.hasProducers}runInContext(n,t,r){const o=Le(this);this.trackingVersion++;try{n(t,r)}finally{Le(o)}}destroy(){this.trackingVersion++}}let es=null;function ip(){return es??=new op,es}function sp(e,n){return e[n]??ip()}function ap(e,n){const t=ip();t.hasReadASignal&&(e[n]=es,t.lView=e,es=new op)}const G={};function f(e){lp(re(),E(),Ye()+e,!1)}function lp(e,n,t,r){if(!r)if(3==(3&n[W])){const i=e.preOrderCheckHooks;null!==i&&Di(n,i,t)}else{const i=e.preOrderHooks;null!==i&&wi(n,i,0,t)}Ln(t)}function fp(e,n=null,t=null,r){const o=hp(e,n,t,r);return o.resolveInjectorInitializers(),o}function hp(e,n=null,t=null,r,o=new Set){const i=[t||oe,Ib(e)];return r=r||("object"==typeof e?void 0:xe(e)),new Sl(i,n||Gi(),r||null,o)}let vn=(()=>{class e{static create(t,r){if(Array.isArray(t))return fp({name:""},r,t,"");{const o=t.name??"";return fp({name:o},t.parent,t.providers,o)}}}return e.THROW_IF_NOT_FOUND=$r,e.NULL=new Rh,e.\u0275prov=ue({token:e,providedIn:"any",factory:()=>ne(Oh)}),e.__NG_ELEMENT_ID__=-1,e})();function I(e,n=H.Default){const t=E();return null===t?ne(e,n):Ff(Be(),t,j(e),n)}function ts(e,n,t,r,o,i,s,a,l,c,u){const d=n.blueprint.slice();return d[Oe]=o,d[W]=140|r,(null!==c||e&&2048&e[W])&&(d[W]|=2048),sf(d),d[_e]=d[er]=e,d[De]=t,d[Rn]=s||e&&e[Rn],d[z]=a||e&&e[z],d[Xn]=l||e&&e[Xn]||null,d[$e]=i,d[Yr]=function Sw(){return Iw++}(),d[Kt]=u,d[Ud]=c,d[Se]=2==n.type?e[Se]:d,d}function wr(e,n,t,r,o){let i=e.data[n];if(null===i)i=function Ul(e,n,t,r,o){const i=ff(),s=xa(),l=e.data[n]=function _E(e,n,t,r,o,i){let s=n?n.injectorIndex:-1,a=0;return function or(){return null!==V.skipHydrationRootTNode}()&&(a|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}(0,s?i:i&&i.parent,t,n,r,o);return null===e.firstChild&&(e.firstChild=l),null!==i&&(s?null==i.child&&null!==l.parent&&(i.child=l):null===i.next&&(i.next=l,l.prev=i)),l}(e,n,t,r,o),function ND(){return V.lFrame.inI18n}()&&(i.flags|=32);else if(64&i.type){i.type=t,i.value=r,i.attrs=o;const s=function Kr(){const e=V.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}();i.injectorIndex=null===s?-1:s.injectorIndex}return Lt(i,!0),i}function vo(e,n,t,r){if(0===t)return-1;const o=n.length;for(let i=0;i<t;i++)n.push(r),e.blueprint.push(r),e.data.push(null);return o}function pp(e,n,t,r,o){const i=sp(n,ui),s=Ye(),a=2&r;try{if(Ln(-1),a&&n.length>X&&lp(e,n,X,!1),kt(a?2:0,o),a)i.runInContext(t,r,o);else{const c=Le(null);try{t(r,o)}finally{Le(c)}}}finally{a&&null===n[ui]&&ap(n,ui),Ln(s),kt(a?3:1,o)}}function zl(e,n,t){if(Ea(n)){const r=Le(null);try{const i=n.directiveEnd;for(let s=n.directiveStart;s<i;s++){const a=e.data[s];a.contentQueries&&a.contentQueries(1,t[s],s)}}finally{Le(r)}}}function Gl(e,n,t){df()&&(function ME(e,n,t,r){const o=t.directiveStart,i=t.directiveEnd;Pn(t)&&function OE(e,n,t){const r=rt(n,e),s=ns(e,ts(e,gp(t),null,t.onPush?64:16,r,n,null,e[Rn].rendererFactory.createRenderer(r,t),null,null,null));e[n.index]=s}(n,t,e.data[o+t.componentOffset]),e.firstCreatePass||Ii(t,n),ze(r,n);const s=t.initialInputs;for(let a=o;a<i;a++){const l=e.data[a],c=Vn(n,e,a,t);ze(c,n),null!==s&&FE(0,a-o,c,l,0,s),wt(l)&&(ot(t.index,n)[De]=Vn(n,e,a,t))}}(e,n,t,rt(t,n)),64==(64&t.flags)&&Cp(e,n,t))}function Wl(e,n,t=rt){const r=n.localNames;if(null!==r){let o=n.index+1;for(let i=0;i<r.length;i+=2){const s=r[i+1],a=-1===s?t(n,e):e[s];e[o++]=a}}}function gp(e){const n=e.tView;return null===n||n.incompleteFirstPass?e.tView=ql(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function ql(e,n,t,r,o,i,s,a,l,c,u){const d=X+r,h=d+o,p=function fE(e,n){const t=[];for(let r=0;r<n;r++)t.push(r<e?null:G);return t}(d,h),v="function"==typeof c?c():c;return p[T]={type:e,blueprint:p,template:t,queries:null,viewQuery:a,declTNode:n,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:"function"==typeof i?i():i,pipeRegistry:"function"==typeof s?s():s,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:u}}let mp=e=>null;function vp(e,n,t,r){for(let o in e)if(e.hasOwnProperty(o)){t=null===t?{}:t;const i=e[o];null===r?_p(t,n,o,i):r.hasOwnProperty(o)&&_p(t,n,r[o],i)}return t}function _p(e,n,t,r){e.hasOwnProperty(t)?e[t].push(n,r):e[t]=[n,r]}function ht(e,n,t,r,o,i,s,a){const l=rt(n,t);let u,c=n.inputs;!a&&null!=c&&(u=c[r])?(Jl(e,t,u,r,o),Pn(n)&&function DE(e,n){const t=ot(n,e);16&t[W]||(t[W]|=64)}(t,n.index)):3&n.type&&(r=function CE(e){return"class"===e?"className":"for"===e?"htmlFor":"formaction"===e?"formAction":"innerHtml"===e?"innerHTML":"readonly"===e?"readOnly":"tabindex"===e?"tabIndex":e}(r),o=null!=s?s(o,n.value||"",r):o,i.setProperty(l,r,o))}function Zl(e,n,t,r){if(df()){const o=null===r?null:{"":-1},i=function SE(e,n){const t=e.directiveRegistry;let r=null,o=null;if(t)for(let i=0;i<t.length;i++){const s=t[i];if(Ld(n,s.selectors,!1))if(r||(r=[]),wt(s))if(null!==s.findHostDirectiveDefs){const a=[];o=o||new Map,s.findHostDirectiveDefs(s,a,o),r.unshift(...a,s),Yl(e,n,a.length)}else r.unshift(s),Yl(e,n,0);else o=o||new Map,s.findHostDirectiveDefs?.(s,r,o),r.push(s)}return null===r?null:[r,o]}(e,t);let s,a;null===i?s=a=null:[s,a]=i,null!==s&&yp(e,n,t,s,o,a),o&&function AE(e,n,t){if(n){const r=e.localNames=[];for(let o=0;o<n.length;o+=2){const i=t[n[o+1]];if(null==i)throw new S(-301,!1);r.push(n[o],i)}}}(t,r,o)}t.mergedAttrs=Gr(t.mergedAttrs,t.attrs)}function yp(e,n,t,r,o,i){for(let c=0;c<r.length;c++)Ua(Ii(t,n),e,r[c].type);!function NE(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}(t,e.data.length,r.length);for(let c=0;c<r.length;c++){const u=r[c];u.providersResolver&&u.providersResolver(u)}let s=!1,a=!1,l=vo(e,n,r.length,null);for(let c=0;c<r.length;c++){const u=r[c];t.mergedAttrs=Gr(t.mergedAttrs,u.hostAttrs),xE(e,t,n,l,u),TE(l,u,o),null!==u.contentQueries&&(t.flags|=4),(null!==u.hostBindings||null!==u.hostAttrs||0!==u.hostVars)&&(t.flags|=64);const d=u.type.prototype;!s&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),s=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),a=!0),l++}!function yE(e,n,t){const o=n.directiveEnd,i=e.data,s=n.attrs,a=[];let l=null,c=null;for(let u=n.directiveStart;u<o;u++){const d=i[u],h=t?t.get(d):null,v=h?h.outputs:null;l=vp(d.inputs,u,l,h?h.inputs:null),c=vp(d.outputs,u,c,v);const w=null===l||null===s||kd(n)?null:RE(l,u,s);a.push(w)}null!==l&&(l.hasOwnProperty("class")&&(n.flags|=8),l.hasOwnProperty("style")&&(n.flags|=16)),n.initialInputs=a,n.inputs=l,n.outputs=c}(e,t,i)}function Cp(e,n,t){const r=t.directiveStart,o=t.directiveEnd,i=t.index,s=function OD(){return V.lFrame.currentDirectiveIndex}();try{Ln(i);for(let a=r;a<o;a++){const l=e.data[a],c=n[a];Fa(a),(null!==l.hostBindings||0!==l.hostVars||null!==l.hostAttrs)&&IE(l,c)}}finally{Ln(-1),Fa(s)}}function IE(e,n){null!==e.hostBindings&&e.hostBindings(1,n)}function Yl(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function TE(e,n,t){if(t){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)t[n.exportAs[r]]=e;wt(n)&&(t[""]=e)}}function xE(e,n,t,r,o){e.data[r]=o;const i=o.factory||(o.factory=kn(o.type)),s=new Jr(i,wt(o),I);e.blueprint[r]=s,t[r]=s,function bE(e,n,t,r,o){const i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;null===s&&(s=e.hostBindingOpCodes=[]);const a=~n.index;(function EE(e){let n=e.length;for(;n>0;){const t=e[--n];if("number"==typeof t&&t<0)return t}return 0})(s)!=a&&s.push(a),s.push(t,r,i)}}(e,n,r,vo(e,t,o.hostVars,G),o)}function Ht(e,n,t,r,o,i){const s=rt(e,n);!function Ql(e,n,t,r,o,i,s){if(null==i)e.removeAttribute(n,o,t);else{const a=null==s?$(i):s(i,r||"",o);e.setAttribute(n,o,a,t)}}(n[z],s,i,e.value,t,r,o)}function FE(e,n,t,r,o,i){const s=i[n];if(null!==s)for(let a=0;a<s.length;)Dp(r,t,s[a++],s[a++],s[a++])}function Dp(e,n,t,r,o){const i=Le(null);try{null!==e.setInput?e.setInput(n,o,t,r):n[r]=o}finally{Le(i)}}function RE(e,n,t){let r=null,o=0;for(;o<t.length;){const i=t[o];if(0!==i)if(5!==i){if("number"==typeof i)break;if(e.hasOwnProperty(i)){null===r&&(r=[]);const s=e[i];for(let a=0;a<s.length;a+=2)if(s[a]===n){r.push(i,s[a+1],t[o+1]);break}}o+=2}else o+=2;else o+=4}return r}function wp(e,n,t,r){return[e,!0,!1,n,null,0,r,t,null,null,null]}function bp(e,n){const t=e.contentQueries;if(null!==t)for(let r=0;r<t.length;r+=2){const i=t[r+1];if(-1!==i){const s=e.data[i];Pa(t[r]),s.contentQueries(2,n[i],i)}}}function ns(e,n){return e[qr]?e[$d][Dt]=n:e[qr]=n,e[$d]=n,n}function Kl(e,n,t){Pa(0);const r=Le(null);try{n(e,t)}finally{Le(r)}}function Sp(e,n){const t=e[Xn],r=t?t.get($n,null):null;r&&r.handleError(n)}function Jl(e,n,t,r,o){for(let i=0;i<t.length;){const s=t[i++],a=t[i++];Dp(e.data[s],n[s],r,a,o)}}function PE(e,n){const t=ot(n,e),r=t[T];!function kE(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}(r,t);const o=t[Oe];null!==o&&null===t[Kt]&&(t[Kt]=Gh(o,t[Xn])),Xl(r,t,t[De])}function Xl(e,n,t){ka(n);try{const r=e.viewQuery;null!==r&&Kl(1,r,t);const o=e.template;null!==o&&pp(e,n,o,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),e.staticContentQueries&&bp(e,n),e.staticViewQueries&&Kl(2,e.viewQuery,t);const i=e.components;null!==i&&function LE(e,n){for(let t=0;t<n.length;t++)PE(e,n[t])}(n,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{n[W]&=-5,La()}}let Ap=(()=>{class e{constructor(){this.all=new Set,this.queue=new Map}create(t,r,o){const i=typeof Zone>"u"?null:Zone.current,s=new cD(t,c=>{this.all.has(c)&&this.queue.set(c,i)},o);let a;this.all.add(s),s.notify();const l=()=>{s.cleanup(),a?.(),this.all.delete(s),this.queue.delete(s)};return a=r?.onDestroy(l),{destroy:l}}flush(){if(0!==this.queue.size)for(const[t,r]of this.queue)this.queue.delete(t),r?r.run(()=>t.run()):t.run()}get isQueueEmpty(){return 0===this.queue.size}}return e.\u0275prov=ue({token:e,providedIn:"root",factory:()=>new e}),e})();function rs(e,n,t){let r=t?e.styles:null,o=t?e.classes:null,i=0;if(null!==n)for(let s=0;s<n.length;s++){const a=n[s];"number"==typeof a?i=a:1==i?o=ha(o,a):2==i&&(r=ha(r,a+": "+n[++s]+";"))}t?e.styles=r:e.stylesWithoutHost=r,t?e.classes=o:e.classesWithoutHost=o}function _o(e,n,t,r,o=!1){for(;null!==t;){const i=n[t.index];if(null!==i&&r.push(ge(i)),nt(i)){for(let a=He;a<i.length;a++){const l=i[a],c=l[T].firstChild;null!==c&&_o(l[T],l,c,r)}i[Rt]!==i[Oe]&&r.push(i[Rt])}const s=t.type;if(8&s)_o(e,n,t.child,r);else if(32&s){const a=il(t,n);let l;for(;l=a();)r.push(l)}else if(16&s){const a=mh(n,t);if(Array.isArray(a))r.push(...a);else{const l=io(n[Se]);_o(l[T],l,a,r,!0)}}t=o?t.projectionNext:t.next}return r}function os(e,n,t,r=!0){const o=n[Rn].rendererFactory;o.begin&&o.begin();try{is(e,n,e.template,t)}catch(s){throw r&&Sp(n,s),s}finally{o.end&&o.end(),n[Rn].effectManager?.flush()}}function is(e,n,t,r){const o=n[W];if(256!=(256&o)){n[Rn].effectManager?.flush(),ka(n);try{sf(n),function pf(e){return V.lFrame.bindingIndex=e}(e.bindingStartIndex),null!==t&&pp(e,n,t,2,r);const s=3==(3&o);if(s){const c=e.preOrderCheckHooks;null!==c&&Di(n,c,null)}else{const c=e.preOrderHooks;null!==c&&wi(n,c,0,null),Va(n,0)}if(function UE(e){for(let n=sl(e);null!==n;n=al(n)){if(!n[zd])continue;const t=n[nr];for(let r=0;r<t.length;r++){yD(t[r])}}}(n),function $E(e){for(let n=sl(e);null!==n;n=al(n))for(let t=He;t<n.length;t++){const r=n[t],o=r[T];_i(r)&&is(o,r,o.template,r[De])}}(n),null!==e.contentQueries&&bp(e,n),s){const c=e.contentCheckHooks;null!==c&&Di(n,c)}else{const c=e.contentHooks;null!==c&&wi(n,c,1),Va(n,1)}!function dE(e,n){const t=e.hostBindingOpCodes;if(null===t)return;const r=sp(n,di);try{for(let o=0;o<t.length;o++){const i=t[o];if(i<0)Ln(~i);else{const s=i,a=t[++o],l=t[++o];xD(a,s),r.runInContext(l,2,n[s])}}}finally{null===n[di]&&ap(n,di),Ln(-1)}}(e,n);const a=e.components;null!==a&&function GE(e,n){for(let t=0;t<n.length;t++)zE(e,n[t])}(n,a);const l=e.viewQuery;if(null!==l&&Kl(2,l,r),s){const c=e.viewCheckHooks;null!==c&&Di(n,c)}else{const c=e.viewHooks;null!==c&&wi(n,c,2),Va(n,2)}!0===e.firstUpdatePass&&(e.firstUpdatePass=!1),n[W]&=-73,af(n)}finally{La()}}}function zE(e,n){const t=ot(n,e);if(_i(t)){const r=t[T];80&t[W]?is(r,t,r.template,t[De]):t[Fn]>0&&ec(t)}}function ec(e){for(let r=sl(e);null!==r;r=al(r))for(let o=He;o<r.length;o++){const i=r[o];if(_i(i))if(1024&i[W]){const s=i[T];is(s,i,s.template,i[De])}else i[Fn]>0&&ec(i)}const t=e[T].components;if(null!==t)for(let r=0;r<t.length;r++){const o=ot(t[r],e);_i(o)&&o[Fn]>0&&ec(o)}}class yo{get rootNodes(){const n=this._lView,t=n[T];return _o(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[De]}set context(n){this._lView[De]=n}get destroyed(){return 256==(256&this._lView[W])}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){const n=this._lView[_e];if(nt(n)){const t=n[fi],r=t?t.indexOf(this):-1;r>-1&&(cl(n,r),Ai(t,r))}this._attachedToViewContainer=!1}lh(this._lView[T],this._lView)}onDestroy(n){!function cf(e,n){if(256==(256&e[W]))throw new S(911,!1);null===e[fn]&&(e[fn]=[]),e[fn].push(n)}(this._lView,n)}markForCheck(){mo(this._cdRefInjectingView||this._lView)}detach(){this._lView[W]&=-129}reattach(){this._lView[W]|=128}detectChanges(){os(this._lView[T],this._lView,this.context)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new S(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null,function jw(e,n){ao(e,n,n[z],2,null,null)}(this._lView[T],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new S(902,!1);this._appRef=n}}class WE extends yo{constructor(n){super(n),this._view=n}detectChanges(){const n=this._view;os(n[T],n,n[De],!1)}checkNoChanges(){}get context(){return null}}class Tp extends Ki{constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){const t=ie(n);return new Co(t,this.ngModule)}}function Np(e){const n=[];for(let t in e)e.hasOwnProperty(t)&&n.push({propName:e[t],templateName:t});return n}class ZE{constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,r){r=ai(r);const o=this.injector.get(n,Bl,r);return o!==Bl||t===Bl?o:this.parentInjector.get(n,t,r)}}class Co extends Zh{get inputs(){return Np(this.componentDef.inputs)}get outputs(){return Np(this.componentDef.outputs)}constructor(n,t){super(),this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=function GC(e){return e.map(zC).join(",")}(n.selectors),this.ngContentSelectors=n.ngContentSelectors?n.ngContentSelectors:[],this.isBoundToModule=!!t}create(n,t,r,o){let i=(o=o||this.ngModule)instanceof vr?o:o?.injector;i&&null!==this.componentDef.getStandaloneInjector&&(i=this.componentDef.getStandaloneInjector(i)||i);const s=i?new ZE(n,i):n,a=s.get(Qh,null);if(null===a)throw new S(407,!1);const u={rendererFactory:a,sanitizer:s.get(Qb,null),effectManager:s.get(Ap,null)},d=a.createRenderer(null,this.componentDef),h=this.componentDef.selectors[0][0]||"div",p=r?function hE(e,n,t,r){const i=r.get(Xh,!1)||t===ct.ShadowDom,s=e.selectRootElement(n,i);return function pE(e){mp(e)}(s),s}(d,r,this.componentDef.encapsulation,s):ki(d,h,function qE(e){const n=e.toLowerCase();return"svg"===n?"svg":"math"===n?"math":null}(h)),v=this.componentDef.onPush?576:528,w=ql(0,null,null,1,0,null,null,null,null,null,null),M=ts(null,w,null,v,null,null,u,d,s,null,null);let A,D;ka(M);try{const F=this.componentDef;let B,J=null;F.findHostDirectiveDefs?(B=[],J=new Map,F.findHostDirectiveDefs(F,B,J),B.push(F)):B=[F];const Nt=function QE(e,n){const t=e[T],r=X;return e[r]=n,wr(t,r,2,"#host",null)}(M,p),Ry=function KE(e,n,t,r,o,i,s){const a=o[T];!function JE(e,n,t,r){for(const o of e)n.mergedAttrs=Gr(n.mergedAttrs,o.hostAttrs);null!==n.mergedAttrs&&(rs(n,n.mergedAttrs,!0),null!==t&&Ch(r,t,n))}(r,e,n,s);let l=null;null!==n&&(l=Gh(n,o[Xn]));const c=i.rendererFactory.createRenderer(n,t),u=ts(o,gp(t),null,t.onPush?64:16,o[e.index],e,i,c,null,null,l);return a.firstCreatePass&&Yl(a,e,r.length-1),ns(o,u),o[e.index]=u}(Nt,p,F,B,M,u,d);D=of(w,X),p&&function e0(e,n,t,r){if(r)wa(e,t,["ng-version",Kb.full]);else{const{attrs:o,classes:i}=function WC(e){const n=[],t=[];let r=1,o=2;for(;r<e.length;){let i=e[r];if("string"==typeof i)2===o?""!==i&&n.push(i,e[++r]):8===o&&t.push(i);else{if(!Ct(o))break;o=i}r++}return{attrs:n,classes:t}}(n.selectors[0]);o&&wa(e,t,o),i&&i.length>0&&yh(e,t,i.join(" "))}}(d,F,p,r),void 0!==t&&function t0(e,n,t){const r=e.projection=[];for(let o=0;o<n.length;o++){const i=t[o];r.push(null!=i?Array.from(i):null)}}(D,this.ngContentSelectors,t),A=function XE(e,n,t,r,o,i){const s=Be(),a=o[T],l=rt(s,o);yp(a,o,s,t,null,r);for(let u=0;u<t.length;u++)ze(Vn(o,a,s.directiveStart+u,s),o);Cp(a,o,s),l&&ze(l,o);const c=Vn(o,a,s.directiveStart+s.componentOffset,s);if(e[De]=o[De]=c,null!==i)for(const u of i)u(c,n);return zl(a,s,e),c}(Ry,F,B,J,M,[n0]),Xl(w,M,null)}finally{La()}return new YE(this.componentType,A,Cr(D,M),M,D)}}class YE extends zb{constructor(n,t,r,o,i){super(),this.location=r,this._rootLView=o,this._tNode=i,this.previousInputValues=null,this.instance=t,this.hostView=this.changeDetectorRef=new WE(o),this.componentType=n}setInput(n,t){const r=this._tNode.inputs;let o;if(null!==r&&(o=r[n])){if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;const i=this._rootLView;Jl(i[T],i,o,n,t),this.previousInputValues.set(n,t),mo(ot(this._tNode.index,i))}}get injector(){return new ar(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}}function n0(){const e=Be();Ci(E()[T],e)}function ce(e){let n=function xp(e){return Object.getPrototypeOf(e.prototype).constructor}(e.type),t=!0;const r=[e];for(;n;){let o;if(wt(e))o=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new S(903,!1);o=n.\u0275dir}if(o){if(t){r.push(o);const s=e;s.inputs=tc(e.inputs),s.declaredInputs=tc(e.declaredInputs),s.outputs=tc(e.outputs);const a=o.hostBindings;a&&a0(e,a);const l=o.viewQuery,c=o.contentQueries;if(l&&o0(e,l),c&&s0(e,c),fa(e.inputs,o.inputs),fa(e.declaredInputs,o.declaredInputs),fa(e.outputs,o.outputs),wt(o)&&o.data.animation){const u=e.data;u.animation=(u.animation||[]).concat(o.data.animation)}}const i=o.features;if(i)for(let s=0;s<i.length;s++){const a=i[s];a&&a.ngInherit&&a(e),a===ce&&(t=!1)}}n=Object.getPrototypeOf(n)}!function r0(e){let n=0,t=null;for(let r=e.length-1;r>=0;r--){const o=e[r];o.hostVars=n+=o.hostVars,o.hostAttrs=Gr(o.hostAttrs,t=Gr(t,o.hostAttrs))}}(r)}function tc(e){return e===Zt?{}:e===oe?[]:e}function o0(e,n){const t=e.viewQuery;e.viewQuery=t?(r,o)=>{n(r,o),t(r,o)}:n}function s0(e,n){const t=e.contentQueries;e.contentQueries=t?(r,o,i)=>{n(r,o,i),t(r,o,i)}:n}function a0(e,n){const t=e.hostBindings;e.hostBindings=t?(r,o)=>{n(r,o),t(r,o)}:n}function ss(e){return!!nc(e)&&(Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e)}function nc(e){return null!==e&&("function"==typeof e||"object"==typeof e)}function Bt(e,n,t){return e[n]=t}function Ge(e,n,t){return!Object.is(e[n],t)&&(e[n]=t,!0)}function Un(e,n,t,r){const o=Ge(e,n,t);return Ge(e,n+1,r)||o}function Et(e,n,t,r){const o=E();return Ge(o,ir(),n)&&(re(),Ht(ye(),o,e,n,t,r)),Et}function Er(e,n,t,r){return Ge(e,ir(),t)?n+$(t)+r:G}function C(e,n,t,r,o,i,s,a){const l=E(),c=re(),u=e+X,d=c.firstCreatePass?function O0(e,n,t,r,o,i,s,a,l){const c=n.consts,u=wr(n,e,4,s||null,hn(c,a));Zl(n,t,u,hn(c,l)),Ci(n,u);const d=u.tView=ql(2,u,r,o,i,n.directiveRegistry,n.pipeRegistry,null,n.schemas,c,null);return null!==n.queries&&(n.queries.template(n,u),d.queries=n.queries.embeddedTView(u)),u}(u,c,l,n,t,r,o,i,s):c.data[u];Lt(d,!1);const h=qp(c,l,d,e);yi()&&Vi(c,l,h,d),ze(h,l),ns(l,l[u]=wp(h,l,h,d)),hi(d)&&Gl(c,l,d),null!=s&&Wl(l,d,a)}let qp=function Zp(e,n,t,r){return pn(!0),n[z].createComment("")};function g(e,n,t){const r=E();return Ge(r,ir(),n)&&ht(re(),ye(),r,e,n,r[z],t,!1),g}function lc(e,n,t,r,o){const s=o?"class":"style";Jl(e,t,n.inputs[s],s,r)}function y(e,n,t,r){const o=E(),i=re(),s=X+e,a=o[z],l=i.firstCreatePass?function L0(e,n,t,r,o,i){const s=n.consts,l=wr(n,e,2,r,hn(s,o));return Zl(n,t,l,hn(s,i)),null!==l.attrs&&rs(l,l.attrs,!1),null!==l.mergedAttrs&&rs(l,l.mergedAttrs,!0),null!==n.queries&&n.queries.elementStart(n,l),l}(s,i,o,n,t,r):i.data[s],c=Yp(i,o,l,a,n,e);o[s]=c;const u=hi(l);return Lt(l,!0),Ch(a,c,l),32!=(32&l.flags)&&yi()&&Vi(i,o,c,l),0===function DD(){return V.lFrame.elementDepthCount}()&&ze(c,o),function wD(){V.lFrame.elementDepthCount++}(),u&&(Gl(i,o,l),zl(i,l,o)),null!==r&&Wl(o,l),y}function _(){let e=Be();xa()?Oa():(e=e.parent,Lt(e,!1));const n=e;(function ED(e){return V.skipHydrationRootTNode===e})(n)&&function AD(){V.skipHydrationRootTNode=null}(),function bD(){V.lFrame.elementDepthCount--}();const t=re();return t.firstCreatePass&&(Ci(t,e),Ea(e)&&t.queries.elementEnd(e)),null!=n.classesWithoutHost&&function $D(e){return 0!=(8&e.flags)}(n)&&lc(t,n,E(),n.classesWithoutHost,!0),null!=n.stylesWithoutHost&&function UD(e){return 0!=(16&e.flags)}(n)&&lc(t,n,E(),n.stylesWithoutHost,!1),_}function x(e,n,t,r){return y(e,n,t,r),_(),x}let Yp=(e,n,t,r,o,i)=>(pn(!0),ki(r,o,function bf(){return V.lFrame.currentNamespace}()));function ee(e,n,t){const r=E(),o=re(),i=e+X,s=o.firstCreatePass?function B0(e,n,t,r,o){const i=n.consts,s=hn(i,r),a=wr(n,e,8,"ng-container",s);return null!==s&&rs(a,s,!0),Zl(n,t,a,hn(i,o)),null!==n.queries&&n.queries.elementStart(n,a),a}(i,o,r,n,t):o.data[i];Lt(s,!0);const a=Kp(o,r,s,e);return r[i]=a,yi()&&Vi(o,r,a,s),ze(a,r),hi(s)&&(Gl(o,r,s),zl(o,s,r)),null!=t&&Wl(r,s),ee}function te(){let e=Be();const n=re();return xa()?Oa():(e=e.parent,Lt(e,!1)),n.firstCreatePass&&(Ci(n,e),Ea(e)&&n.queries.elementEnd(e)),te}let Kp=(e,n,t,r)=>(pn(!0),ll(n[z],""));function we(){return E()}function ds(e){return!!e&&"function"==typeof e.then}function Jp(e){return!!e&&"function"==typeof e.subscribe}function k(e,n,t,r){const o=E(),i=re(),s=Be();return function eg(e,n,t,r,o,i,s){const a=hi(r),c=e.firstCreatePass&&function Mp(e){return e.cleanup||(e.cleanup=[])}(e),u=n[De],d=function Ep(e){return e[Jn]||(e[Jn]=[])}(n);let h=!0;if(3&r.type||s){const w=rt(r,n),M=s?s(w):w,A=d.length,D=s?B=>s(ge(B[r.index])):r.index;let F=null;if(!s&&a&&(F=function U0(e,n,t,r){const o=e.cleanup;if(null!=o)for(let i=0;i<o.length-1;i+=2){const s=o[i];if(s===t&&o[i+1]===r){const a=n[Jn],l=o[i+2];return a.length>l?a[l]:null}"string"==typeof s&&(i+=2)}return null}(e,n,o,r.index)),null!==F)(F.__ngLastListenerFn__||F).__ngNextListenerFn__=i,F.__ngLastListenerFn__=i,h=!1;else{i=ng(r,n,u,i,!1);const B=t.listen(M,o,i);d.push(i,B),c&&c.push(o,D,A,A+1)}}else i=ng(r,n,u,i,!1);const p=r.outputs;let v;if(h&&null!==p&&(v=p[o])){const w=v.length;if(w)for(let M=0;M<w;M+=2){const J=n[v[M]][v[M+1]].subscribe(i),Nt=d.length;d.push(i,J),c&&c.push(o,r.index,Nt,-(Nt+1))}}}(i,o,o[z],s,e,n,r),k}function tg(e,n,t,r){try{return kt(6,n,t),!1!==t(r)}catch(o){return Sp(e,o),!1}finally{kt(7,n,t)}}function ng(e,n,t,r,o){return function i(s){if(s===Function)return r;mo(e.componentOffset>-1?ot(e.index,n):n);let l=tg(n,t,r,s),c=i.__ngNextListenerFn__;for(;c;)l=tg(n,t,c,s)&&l,c=c.__ngNextListenerFn__;return o&&!1===l&&s.preventDefault(),l}}function m(e=1){return function RD(e){return(V.lFrame.contextLView=function PD(e,n){for(;e>0;)n=n[er],e--;return n}(e,V.lFrame.contextLView))[De]}(e)}function _n(e,n,t){return cc(e,"",n,"",t),_n}function cc(e,n,t,r,o){const i=E(),s=Er(i,n,t,r);return s!==G&&ht(re(),ye(),i,e,s,i[z],o,!1),cc}function fs(e,n){return e<<17|n<<2}function yn(e){return e>>17&32767}function uc(e){return 2|e}function zn(e){return(131068&e)>>2}function dc(e,n){return-131069&e|n<<2}function fc(e){return 1|e}function dg(e,n,t,r,o){const i=e[t+1],s=null===n;let a=r?yn(i):zn(i),l=!1;for(;0!==a&&(!1===l||s);){const u=e[a+1];J0(e[a],n)&&(l=!0,e[a+1]=r?fc(u):uc(u)),a=r?yn(u):zn(u)}l&&(e[t+1]=r?uc(i):fc(i))}function J0(e,n){return null===e||null==n||(Array.isArray(e)?e[1]:e)===n||!(!Array.isArray(e)||"string"!=typeof n)&&fr(e,n)>=0}const Re={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function fg(e){return e.substring(Re.key,Re.keyEnd)}function hg(e,n){const t=Re.textEnd;return t===n?-1:(n=Re.keyEnd=function nM(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}(e,Re.key=n,t),Or(e,n,t))}function Or(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function hs(e,n){return function Mt(e,n,t,r){const o=E(),i=re(),s=en(2);i.firstUpdatePass&&Cg(i,e,s,r),n!==G&&Ge(o,s,n)&&wg(i,i.data[Ye()],o,o[z],e,o[s+1]=function pM(e,n){return null==e||""===e||("string"==typeof n?e+=n:"object"==typeof e&&(e=xe(gn(e)))),e}(n,t),r,s)}(e,n,null,!0),hs}function $t(e,n){for(let t=function eM(e){return function gg(e){Re.key=0,Re.keyEnd=0,Re.value=0,Re.valueEnd=0,Re.textEnd=e.length}(e),hg(e,Or(e,0,Re.textEnd))}(n);t>=0;t=hg(n,t))ft(e,fg(n),!0)}function yg(e,n){return n>=e.expandoStartIndex}function Cg(e,n,t,r){const o=e.data;if(null===o[t+1]){const i=o[Ye()],s=yg(e,t);Eg(i,r)&&null===n&&!s&&(n=!1),n=function aM(e,n,t,r){const o=function Ra(e){const n=V.lFrame.currentDirectiveIndex;return-1===n?null:e[n]}(e);let i=r?n.residualClasses:n.residualStyles;if(null===o)0===(r?n.classBindings:n.styleBindings)&&(t=Mo(t=hc(null,e,n,t,r),n.attrs,r),i=null);else{const s=n.directiveStylingLast;if(-1===s||e[s]!==o)if(t=hc(o,e,n,t,r),null===i){let l=function lM(e,n,t){const r=t?n.classBindings:n.styleBindings;if(0!==zn(r))return e[yn(r)]}(e,n,r);void 0!==l&&Array.isArray(l)&&(l=hc(null,e,n,l[1],r),l=Mo(l,n.attrs,r),function cM(e,n,t,r){e[yn(t?n.classBindings:n.styleBindings)]=r}(e,n,r,l))}else i=function uM(e,n,t){let r;const o=n.directiveEnd;for(let i=1+n.directiveStylingLast;i<o;i++)r=Mo(r,e[i].hostAttrs,t);return Mo(r,n.attrs,t)}(e,n,r)}return void 0!==i&&(r?n.residualClasses=i:n.residualStyles=i),t}(o,i,n,r),function Q0(e,n,t,r,o,i){let s=i?n.classBindings:n.styleBindings,a=yn(s),l=zn(s);e[r]=t;let u,c=!1;if(Array.isArray(t)?(u=t[1],(null===u||fr(t,u)>0)&&(c=!0)):u=t,o)if(0!==l){const h=yn(e[a+1]);e[r+1]=fs(h,a),0!==h&&(e[h+1]=dc(e[h+1],r)),e[a+1]=function Z0(e,n){return 131071&e|n<<17}(e[a+1],r)}else e[r+1]=fs(a,0),0!==a&&(e[a+1]=dc(e[a+1],r)),a=r;else e[r+1]=fs(l,0),0===a?a=r:e[l+1]=dc(e[l+1],r),l=r;c&&(e[r+1]=uc(e[r+1])),dg(e,u,r,!0),dg(e,u,r,!1),function K0(e,n,t,r,o){const i=o?e.residualClasses:e.residualStyles;null!=i&&"string"==typeof n&&fr(i,n)>=0&&(t[r+1]=fc(t[r+1]))}(n,u,e,r,i),s=fs(a,l),i?n.classBindings=s:n.styleBindings=s}(o,i,n,t,s,r)}}function hc(e,n,t,r,o){let i=null;const s=t.directiveEnd;let a=t.directiveStylingLast;for(-1===a?a=t.directiveStart:a++;a<s&&(i=n[a],r=Mo(r,i.hostAttrs,o),i!==e);)a++;return null!==e&&(t.directiveStylingLast=a),r}function Mo(e,n,t){const r=t?1:2;let o=-1;if(null!==n)for(let i=0;i<n.length;i++){const s=n[i];"number"==typeof s?o=s:o===r&&(Array.isArray(e)||(e=void 0===e?[]:["",e]),ft(e,s,!!t||n[++i]))}return void 0===e?null:e}function wg(e,n,t,r,o,i,s,a){if(!(3&n.type))return;const l=e.data,c=l[a+1],u=function Y0(e){return 1==(1&e)}(c)?bg(l,n,t,o,zn(c),s):void 0;ps(u)||(ps(i)||function q0(e){return 2==(2&e)}(c)&&(i=bg(l,null,t,o,a,s)),function Kw(e,n,t,r,o){if(n)o?e.addClass(t,r):e.removeClass(t,r);else{let i=-1===r.indexOf("-")?void 0:it.DashCase;null==o?e.removeStyle(t,r,i):("string"==typeof o&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=it.Important),e.setStyle(t,r,o,i))}}(r,s,vi(Ye(),t),o,i))}function bg(e,n,t,r,o,i){const s=null===n;let a;for(;o>0;){const l=e[o],c=Array.isArray(l),u=c?l[1]:l,d=null===u;let h=t[o+1];h===G&&(h=d?oe:void 0);let p=d?qa(h,r):u===r?h:void 0;if(c&&!ps(p)&&(p=qa(l,r)),ps(p)&&(a=p,s))return a;const v=e[o+1];o=s?yn(v):zn(v)}if(null!==n){let l=i?n.residualClasses:n.residualStyles;null!=l&&(a=qa(l,r))}return a}function ps(e){return void 0!==e}function Eg(e,n){return 0!=(e.flags&(n?8:16))}function b(e,n=""){const t=E(),r=re(),o=e+X,i=r.firstCreatePass?wr(r,o,1,n,null):r.data[o],s=Mg(r,t,i,n,e);t[o]=s,yi()&&Vi(r,t,s,i),Lt(i,!1)}let Mg=(e,n,t,r,o)=>(pn(!0),function Pi(e,n){return e.createText(n)}(n[z],r));function O(e){return q("",e,""),O}function q(e,n,t){const r=E(),o=Er(r,e,n,t);return o!==G&&function rn(e,n,t){const r=vi(n,e);!function sh(e,n,t){e.setValue(n,t)}(e[z],r,t)}(r,Ye(),o),q}function Ut(e,n,t){!function It(e,n,t,r){const o=re(),i=en(2);o.firstUpdatePass&&Cg(o,null,i,r);const s=E();if(t!==G&&Ge(s,i,t)){const a=o.data[Ye()];if(Eg(a,r)&&!yg(o,i)){let l=r?a.classesWithoutHost:a.stylesWithoutHost;null!==l&&(t=ha(l,t||"")),lc(o,a,s,t,r)}else!function hM(e,n,t,r,o,i,s,a){o===G&&(o=oe);let l=0,c=0,u=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;null!==u||null!==d;){const h=l<o.length?o[l+1]:void 0,p=c<i.length?i[c+1]:void 0;let w,v=null;u===d?(l+=2,c+=2,h!==p&&(v=d,w=p)):null===d||null!==u&&u<d?(l+=2,v=u):(c+=2,v=d,w=p),null!==v&&wg(e,n,t,r,v,w,s,a),u=l<o.length?o[l]:null,d=c<i.length?i[c]:null}}(o,a,s,s[z],s[i+1],s[i+1]=function dM(e,n,t){if(null==t||""===t)return oe;const r=[],o=gn(t);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],!0);else if("object"==typeof o)for(const i in o)o.hasOwnProperty(i)&&e(r,i,o[i]);else"string"==typeof o&&n(r,o);return r}(e,n,t),r,i)}}(ft,$t,Er(E(),e,n,t),!0)}const Rr="en-US";let qg=Rr;function mc(e,n,t,r,o){if(e=j(e),Array.isArray(e))for(let i=0;i<e.length;i++)mc(e[i],n,t,r,o);else{const i=re(),s=E();let a=Bn(e)?e:j(e.provide),l=Bh(e);const c=Be(),u=1048575&c.providerIndexes,d=c.directiveStart,h=c.providerIndexes>>20;if(Bn(e)||!e.multi){const p=new Jr(l,o,I),v=_c(a,n,o?u:u+h,d);-1===v?(Ua(Ii(c,s),i,a),vc(i,e,n.length),n.push(a),c.directiveStart++,c.directiveEnd++,o&&(c.providerIndexes+=1048576),t.push(p),s.push(p)):(t[v]=p,s[v]=p)}else{const p=_c(a,n,u+h,d),v=_c(a,n,u,u+h),M=v>=0&&t[v];if(o&&!M||!o&&!(p>=0&&t[p])){Ua(Ii(c,s),i,a);const A=function FI(e,n,t,r,o){const i=new Jr(e,t,I);return i.multi=[],i.index=n,i.componentProviders=0,_m(i,o,r&&!t),i}(o?OI:xI,t.length,o,r,l);!o&&M&&(t[v].providerFactory=A),vc(i,e,n.length,0),n.push(a),c.directiveStart++,c.directiveEnd++,o&&(c.providerIndexes+=1048576),t.push(A),s.push(A)}else vc(i,e,p>-1?p:v,_m(t[o?v:p],l,!o&&r));!o&&r&&M&&t[v].componentProviders++}}}function vc(e,n,t,r){const o=Bn(n),i=function Ab(e){return!!e.useClass}(n);if(o||i){const l=(i?j(n.useClass):n).prototype.ngOnDestroy;if(l){const c=e.destroyHooks||(e.destroyHooks=[]);if(!o&&n.multi){const u=c.indexOf(t);-1===u?c.push(t,[r,l]):c[u+1].push(r,l)}else c.push(t,l)}}}function _m(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function _c(e,n,t,r){for(let o=t;o<r;o++)if(n[o]===e)return o;return-1}function xI(e,n,t,r){return yc(this.multi,[])}function OI(e,n,t,r){const o=this.multi;let i;if(this.providerFactory){const s=this.providerFactory.componentProviders,a=Vn(t,t[T],this.providerFactory.index,r);i=a.slice(0,s),yc(o,i);for(let l=s;l<a.length;l++)i.push(a[l])}else i=[],yc(o,i);return i}function yc(e,n){for(let t=0;t<e.length;t++)n.push((0,e[t])());return n}function me(e,n=[]){return t=>{t.providersResolver=(r,o)=>function NI(e,n,t){const r=re();if(r.firstCreatePass){const o=wt(e);mc(t,r.data,r.blueprint,o,!0),mc(n,r.data,r.blueprint,o,!1)}}(r,o?o(e):e,n)}}class Pr{}class RI{}class Cc extends Pr{constructor(n,t,r){super(),this._parent=t,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new Tp(this);const o=function ut(e,n){const t=e[Td]||null;if(!t&&!0===n)throw new Error(`Type ${xe(e)} does not have '\u0275mod' property.`);return t}(n);this._bootstrapComponents=function nn(e){return e instanceof Function?e():e}(o.bootstrap),this._r3Injector=hp(n,t,[{provide:Pr,useValue:this},{provide:Ki,useValue:this.componentFactoryResolver},...r],xe(n),new Set(["environment"])),this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(n)}get injector(){return this._r3Injector}destroy(){const n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}}class Dc extends RI{constructor(n){super(),this.moduleType=n}create(n){return new Cc(this.moduleType,n,[])}}function ys(e,n,t,r){return function Im(e,n,t,r,o,i){const s=n+t;return Ge(e,s,o)?Bt(e,s+1,i?r.call(i,o):r(o)):xo(e,s+1)}(E(),Ze(),e,n,t,r)}function bc(e,n,t,r,o){return function Sm(e,n,t,r,o,i,s){const a=n+t;return Un(e,a,o,i)?Bt(e,a+2,s?r.call(s,o,i):r(o,i)):xo(e,a+2)}(E(),Ze(),e,n,t,r,o)}function Ve(e,n,t,r,o,i){return Am(E(),Ze(),e,n,t,r,o,i)}function xo(e,n){const t=e[n];return t===G?void 0:t}function Am(e,n,t,r,o,i,s,a){const l=n+t;return function as(e,n,t,r,o){const i=Un(e,n,t,r);return Ge(e,n+2,o)||i}(e,l,o,i,s)?Bt(e,l+3,a?r.call(a,o,i,s):r(o,i,s)):xo(e,l+3)}function Om(e,n,t,r,o){const i=e+X,s=E(),a=function rr(e,n){return e[n]}(s,i);return function Oo(e,n){return e[T].data[n].pure}(s,i)?Am(s,Ze(),n,a.transform,t,r,o,a):a.transform(t,r,o)}function Ec(e){return n=>{setTimeout(e,void 0,n)}}const Ee=class s1 extends ei{constructor(n=!1){super(),this.__isAsync=n}emit(n){super.next(n)}subscribe(n,t,r){let o=n,i=t||(()=>null),s=r;if(n&&"object"==typeof n){const l=n;o=l.next?.bind(l),i=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(i=Ec(i),o&&(o=Ec(o)),s&&(s=Ec(s)));const a=super.subscribe({next:o,error:i,complete:s});return n instanceof xt&&n.add(a),a}};let on=(()=>{class e{}return e.__NG_ELEMENT_ID__=u1,e})();const l1=on,c1=class extends l1{constructor(n,t,r){super(),this._declarationLView=n,this._declarationTContainer=t,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,t){return this.createEmbeddedViewImpl(n,t,null)}createEmbeddedViewImpl(n,t,r){const o=this._declarationTContainer.tView,i=ts(this._declarationLView,o,n,16,null,o.declTNode,null,null,null,t||null,r||null);i[Zr]=this._declarationLView[this._declarationTContainer.index];const a=this._declarationLView[Ft];return null!==a&&(i[Ft]=a.createEmbeddedView(o)),Xl(o,i,n),new yo(i)}};function u1(){return function Cs(e,n){return 4&e.type?new c1(n,e,Cr(e,n)):null}(Be(),E())}let zt=(()=>{class e{}return e.__NG_ELEMENT_ID__=v1,e})();function v1(){return function Vm(e,n){let t;const r=n[e.index];return nt(r)?t=r:(t=wp(r,n,null,e),n[e.index]=t,ns(n,t)),Hm(t,n,e,r),new km(t,e,n)}(Be(),E())}const _1=zt,km=class extends _1{constructor(n,t,r){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=r}get element(){return Cr(this._hostTNode,this._hostLView)}get injector(){return new ar(this._hostTNode,this._hostLView)}get parentInjector(){const n=$a(this._hostTNode,this._hostLView);if(Sf(n)){const t=Ei(n,this._hostLView),r=bi(n);return new ar(t[T].data[r+8],t)}return new ar(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){const t=Lm(this._lContainer);return null!==t&&t[n]||null}get length(){return this._lContainer.length-He}createEmbeddedView(n,t,r){let o,i;"number"==typeof r?o=r:null!=r&&(o=r.index,i=r.injector);const a=n.createEmbeddedViewImpl(t||{},i,null);return this.insertImpl(a,o,false),a}createComponent(n,t,r,o,i){const s=n&&!function eo(e){return"function"==typeof e}(n);let a;if(s)a=t;else{const w=t||{};a=w.index,r=w.injector,o=w.projectableNodes,i=w.environmentInjector||w.ngModuleRef}const l=s?n:new Co(ie(n)),c=r||this.parentInjector;if(!i&&null==l.ngModule){const M=(s?c:this.parentInjector).get(vr,null);M&&(i=M)}ie(l.componentType??{});const p=l.create(c,o,null,i);return this.insertImpl(p.hostView,a,false),p}insert(n,t){return this.insertImpl(n,t,!1)}insertImpl(n,t,r){const o=n._lView,i=o[T];if(function _D(e){return nt(e[_e])}(o)){const l=this.indexOf(n);if(-1!==l)this.detach(l);else{const c=o[_e],u=new km(c,c[$e],c[_e]);u.detach(u.indexOf(n))}}const s=this._adjustIndex(t),a=this._lContainer;if(function Uw(e,n,t,r){const o=He+r,i=t.length;r>0&&(t[o-1][Dt]=n),r<i-He?(n[Dt]=t[o],Hf(t,He+r,n)):(t.push(n),n[Dt]=null),n[_e]=t;const s=n[Zr];null!==s&&t!==s&&function zw(e,n){const t=e[nr];n[Se]!==n[_e][_e][Se]&&(e[zd]=!0),null===t?e[nr]=[n]:t.push(n)}(s,n);const a=n[Ft];null!==a&&a.insertView(e),n[W]|=128}(i,o,a,s),!r){const l=hl(s,a),c=o[z],u=Li(c,a[Rt]);null!==u&&function Bw(e,n,t,r,o,i){r[Oe]=o,r[$e]=n,ao(e,r,t,1,o,i)}(i,a[$e],c,o,u,l)}return n.attachToViewContainerRef(),Hf(Sc(a),s,n),n}move(n,t){return this.insert(n,t)}indexOf(n){const t=Lm(this._lContainer);return null!==t?t.indexOf(n):-1}remove(n){const t=this._adjustIndex(n,-1),r=cl(this._lContainer,t);r&&(Ai(Sc(this._lContainer),t),lh(r[T],r))}detach(n){const t=this._adjustIndex(n,-1),r=cl(this._lContainer,t);return r&&null!=Ai(Sc(this._lContainer),t)?new yo(r):null}_adjustIndex(n,t=0){return n??this.length+t}};function Lm(e){return e[fi]}function Sc(e){return e[fi]||(e[fi]=[])}let Hm=function Bm(e,n,t,r){if(e[Rt])return;let o;o=8&t.type?ge(r):function y1(e,n){const t=e[z],r=t.createComment(""),o=rt(n,e);return Hn(t,Li(t,o),r,function Zw(e,n){return e.nextSibling(n)}(t,o),!1),r}(n,t),e[Rt]=o};const X1=new P("Application Initializer");let Lc=(()=>{class e{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r}),this.appInits=pe(X1,{optional:!0})??[]}runInitializers(){if(this.initialized)return;const t=[];for(const o of this.appInits){const i=o();if(ds(i))t.push(i);else if(Jp(i)){const s=new Promise((a,l)=>{i.subscribe({complete:a,error:l})});t.push(s)}}const r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(o=>{this.reject(o)}),0===t.length&&r(),this.initialized=!0}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const sn=new P("LocaleId",{providedIn:"root",factory:()=>pe(sn,H.Optional|H.SkipSelf)||function tS(){return typeof $localize<"u"&&$localize.locale||Rr}()});let rS=(()=>{class e{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new Uy(!1)}add(){this.hasPendingTasks.next(!0);const t=this.taskId++;return this.pendingTasks.add(t),t}remove(t){this.pendingTasks.delete(t),0===this.pendingTasks.size&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks.next(!1)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const aS=(()=>Promise.resolve(0))();function Vc(e){typeof Zone>"u"?aS.then(()=>{e&&e.apply(null,null)}):Zone.current.scheduleMicroTask("scheduleMicrotask",e)}function dv(...e){}class Pe{constructor({enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:t=!1,shouldCoalesceRunChangeDetection:r=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new Ee(!1),this.onMicrotaskEmpty=new Ee(!1),this.onStable=new Ee(!1),this.onError=new Ee(!1),typeof Zone>"u")throw new S(908,!1);Zone.assertZonePatched();const o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&t,o.shouldCoalesceRunChangeDetection=r,o.lastRequestAnimationFrameId=-1,o.nativeRequestAnimationFrame=function lS(){let e=fe.requestAnimationFrame,n=fe.cancelAnimationFrame;if(typeof Zone<"u"&&e&&n){const t=e[Zone.__symbol__("OriginalDelegate")];t&&(e=t);const r=n[Zone.__symbol__("OriginalDelegate")];r&&(n=r)}return{nativeRequestAnimationFrame:e,nativeCancelAnimationFrame:n}}().nativeRequestAnimationFrame,function dS(e){const n=()=>{!function uS(e){e.isCheckStableRunning||-1!==e.lastRequestAnimationFrameId||(e.lastRequestAnimationFrameId=e.nativeRequestAnimationFrame.call(fe,()=>{e.fakeTopEventTask||(e.fakeTopEventTask=Zone.root.scheduleEventTask("fakeTopEventTask",()=>{e.lastRequestAnimationFrameId=-1,Bc(e),e.isCheckStableRunning=!0,Hc(e),e.isCheckStableRunning=!1},void 0,()=>{},()=>{})),e.fakeTopEventTask.invoke()}),Bc(e))}(e)};e._inner=e._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(t,r,o,i,s,a)=>{try{return fv(e),t.invokeTask(o,i,s,a)}finally{(e.shouldCoalesceEventChangeDetection&&"eventTask"===i.type||e.shouldCoalesceRunChangeDetection)&&n(),hv(e)}},onInvoke:(t,r,o,i,s,a,l)=>{try{return fv(e),t.invoke(o,i,s,a,l)}finally{e.shouldCoalesceRunChangeDetection&&n(),hv(e)}},onHasTask:(t,r,o,i)=>{t.hasTask(o,i),r===o&&("microTask"==i.change?(e._hasPendingMicrotasks=i.microTask,Bc(e),Hc(e)):"macroTask"==i.change&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(t,r,o,i)=>(t.handleError(o,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}(o)}static isInAngularZone(){return typeof Zone<"u"&&!0===Zone.current.get("isAngularZone")}static assertInAngularZone(){if(!Pe.isInAngularZone())throw new S(909,!1)}static assertNotInAngularZone(){if(Pe.isInAngularZone())throw new S(909,!1)}run(n,t,r){return this._inner.run(n,t,r)}runTask(n,t,r,o){const i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,n,cS,dv,dv);try{return i.runTask(s,t,r)}finally{i.cancelTask(s)}}runGuarded(n,t,r){return this._inner.runGuarded(n,t,r)}runOutsideAngular(n){return this._outer.run(n)}}const cS={};function Hc(e){if(0==e._nesting&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Bc(e){e.hasPendingMicrotasks=!!(e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&-1!==e.lastRequestAnimationFrameId)}function fv(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function hv(e){e._nesting--,Hc(e)}class fS{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new Ee,this.onMicrotaskEmpty=new Ee,this.onStable=new Ee,this.onError=new Ee}run(n,t,r){return n.apply(t,r)}runGuarded(n,t,r){return n.apply(t,r)}runOutsideAngular(n){return n()}runTask(n,t,r,o){return n.apply(t,r)}}const pv=new P("",{providedIn:"root",factory:gv});function gv(){const e=pe(Pe);let n=!0;return function gC(...e){const n=md(e),t=function lC(e,n){return"number"==typeof ua(e)?e.pop():n}(e,1/0),r=e;return r.length?1===r.length?On(r[0]):function oC(e=1/0){return la(ia,e)}(t)(ti(r,n)):ca}(new qe(o=>{n=e.isStable&&!e.hasPendingMacrotasks&&!e.hasPendingMicrotasks,e.runOutsideAngular(()=>{o.next(n),o.complete()})}),new qe(o=>{let i;e.runOutsideAngular(()=>{i=e.onStable.subscribe(()=>{Pe.assertNotInAngularZone(),Vc(()=>{!n&&!e.hasPendingMacrotasks&&!e.hasPendingMicrotasks&&(n=!0,o.next(!0))})})});const s=e.onUnstable.subscribe(()=>{Pe.assertInAngularZone(),n&&(n=!1,e.runOutsideAngular(()=>{o.next(!1)}))});return()=>{i.unsubscribe(),s.unsubscribe()}}).pipe(Cd()))}const mv=new P(""),ws=new P("");let Uc,jc=(()=>{class e{constructor(t,r,o){this._ngZone=t,this.registry=r,this._pendingCount=0,this._isZoneStable=!0,this._didWork=!1,this._callbacks=[],this.taskTrackingZone=null,Uc||(function hS(e){Uc=e}(o),o.addToWindow(r)),this._watchAngularEvents(),t.run(()=>{this.taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){this._ngZone.onUnstable.subscribe({next:()=>{this._didWork=!0,this._isZoneStable=!1}}),this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.subscribe({next:()=>{Pe.assertNotInAngularZone(),Vc(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}})})}increasePendingRequestCount(){return this._pendingCount+=1,this._didWork=!0,this._pendingCount}decreasePendingRequestCount(){if(this._pendingCount-=1,this._pendingCount<0)throw new Error("pending async requests below zero");return this._runCallbacksIfReady(),this._pendingCount}isStable(){return this._isZoneStable&&0===this._pendingCount&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())Vc(()=>{for(;0!==this._callbacks.length;){let t=this._callbacks.pop();clearTimeout(t.timeoutId),t.doneCb(this._didWork)}this._didWork=!1});else{let t=this.getPendingTasks();this._callbacks=this._callbacks.filter(r=>!r.updateCb||!r.updateCb(t)||(clearTimeout(r.timeoutId),!1)),this._didWork=!0}}getPendingTasks(){return this.taskTrackingZone?this.taskTrackingZone.macroTasks.map(t=>({source:t.source,creationLocation:t.creationLocation,data:t.data})):[]}addCallback(t,r,o){let i=-1;r&&r>0&&(i=setTimeout(()=>{this._callbacks=this._callbacks.filter(s=>s.timeoutId!==i),t(this._didWork,this.getPendingTasks())},r)),this._callbacks.push({doneCb:t,timeoutId:i,updateCb:o})}whenStable(t,r,o){if(o&&!this.taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(t,r,o),this._runCallbacksIfReady()}getPendingRequestCount(){return this._pendingCount}registerApplication(t){this.registry.registerApplication(t,this)}unregisterApplication(t){this.registry.unregisterApplication(t)}findProviders(t,r,o){return[]}}return e.\u0275fac=function(t){return new(t||e)(ne(Pe),ne($c),ne(ws))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})(),$c=(()=>{class e{constructor(){this._applications=new Map}registerApplication(t,r){this._applications.set(t,r)}unregisterApplication(t){this._applications.delete(t)}unregisterAllApplications(){this._applications.clear()}getTestability(t){return this._applications.get(t)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(t,r=!0){return Uc?.findTestabilityInTree(this,t,r)??null}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"platform"}),e})(),Cn=null;const vv=new P("AllowMultipleToken"),zc=new P("PlatformDestroyListeners"),_v=new P("appBootstrapListener");function Dv(e,n,t=[]){const r=`Platform: ${n}`,o=new P(r);return(i=[])=>{let s=Gc();if(!s||s.injector.get(vv,!1)){const a=[...t,...i,{provide:o,useValue:!0}];e?e(a):function mS(e){if(Cn&&!Cn.get(vv,!1))throw new S(400,!1);(function yv(){!function aD(e){Qd=e}(()=>{throw new S(600,!1)})})(),Cn=e;const n=e.get(bv);(function Cv(e){e.get(jh,null)?.forEach(t=>t())})(e)}(function wv(e=[],n){return vn.create({name:n,providers:[{provide:Ml,useValue:"platform"},{provide:zc,useValue:new Set([()=>Cn=null])},...e]})}(a,r))}return function _S(e){const n=Gc();if(!n)throw new S(401,!1);return n}()}}function Gc(){return Cn?.get(bv)??null}let bv=(()=>{class e{constructor(t){this._injector=t,this._modules=[],this._destroyListeners=[],this._destroyed=!1}bootstrapModuleFactory(t,r){const o=function yS(e="zone.js",n){return"noop"===e?new fS:"zone.js"===e?new Pe(n):e}(r?.ngZone,function Ev(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}({eventCoalescing:r?.ngZoneEventCoalescing,runCoalescing:r?.ngZoneRunCoalescing}));return o.run(()=>{const i=function kI(e,n,t){return new Cc(e,n,t)}(t.moduleType,this.injector,function Tv(e){return[{provide:Pe,useFactory:e},{provide:Ui,multi:!0,useFactory:()=>{const n=pe(DS,{optional:!0});return()=>n.initialize()}},{provide:Av,useFactory:CS},{provide:pv,useFactory:gv}]}(()=>o)),s=i.injector.get($n,null);return o.runOutsideAngular(()=>{const a=o.onError.subscribe({next:l=>{s.handleError(l)}});i.onDestroy(()=>{bs(this._modules,i),a.unsubscribe()})}),function Mv(e,n,t){try{const r=t();return ds(r)?r.catch(o=>{throw n.runOutsideAngular(()=>e.handleError(o)),o}):r}catch(r){throw n.runOutsideAngular(()=>e.handleError(r)),r}}(s,o,()=>{const a=i.injector.get(Lc);return a.runInitializers(),a.donePromise.then(()=>(function Zg(e){gt(e,"Expected localeId to be defined"),"string"==typeof e&&(qg=e.toLowerCase().replace(/_/g,"-"))}(i.injector.get(sn,Rr)||Rr),this._moduleDoBootstrap(i),i))})})}bootstrapModule(t,r=[]){const o=Iv({},r);return function pS(e,n,t){const r=new Dc(t);return Promise.resolve(r)}(0,0,t).then(i=>this.bootstrapModuleFactory(i,o))}_moduleDoBootstrap(t){const r=t.injector.get(Ro);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(o=>r.bootstrap(o));else{if(!t.instance.ngDoBootstrap)throw new S(-403,!1);t.instance.ngDoBootstrap(r)}this._modules.push(t)}onDestroy(t){this._destroyListeners.push(t)}get injector(){return this._injector}destroy(){if(this._destroyed)throw new S(404,!1);this._modules.slice().forEach(r=>r.destroy()),this._destroyListeners.forEach(r=>r());const t=this._injector.get(zc,null);t&&(t.forEach(r=>r()),t.clear()),this._destroyed=!0}get destroyed(){return this._destroyed}}return e.\u0275fac=function(t){return new(t||e)(ne(vn))},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"platform"}),e})();function Iv(e,n){return Array.isArray(n)?n.reduce(Iv,e):{...e,...n}}let Ro=(()=>{class e{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=pe(Av),this.zoneIsStable=pe(pv),this.componentTypes=[],this.components=[],this.isStable=pe(rS).hasPendingTasks.pipe(la(t=>t?function mC(...e){return ti(e,md(e))}(!1):this.zoneIsStable),function _C(e,n=ia){return e=e??yC,Tn((t,r)=>{let o,i=!0;t.subscribe(new Nn(r,s=>{const a=n(s);(i||!e(o,a))&&(i=!1,o=a,r.next(s))}))})}(),Cd()),this._injector=pe(vr)}get destroyed(){return this._destroyed}get injector(){return this._injector}bootstrap(t,r){const o=t instanceof Zh;if(!this._injector.get(Lc).done)throw!o&&function Wr(e){const n=ie(e)||je(e)||tt(e);return null!==n&&n.standalone}(t),new S(405,!1);let s;s=o?t:this._injector.get(Ki).resolveComponentFactory(t),this.componentTypes.push(s.componentType);const a=function gS(e){return e.isBoundToModule}(s)?void 0:this._injector.get(Pr),c=s.create(vn.NULL,[],r||s.selector,a),u=c.location.nativeElement,d=c.injector.get(mv,null);return d?.registerApplication(u),c.onDestroy(()=>{this.detachView(c.hostView),bs(this.components,c),d?.unregisterApplication(u)}),this._loadComponent(c),c}tick(){if(this._runningTick)throw new S(101,!1);try{this._runningTick=!0;for(let t of this._views)t.detectChanges()}catch(t){this.internalErrorHandler(t)}finally{this._runningTick=!1}}attachView(t){const r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){const r=t;bs(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t);const r=this._injector.get(_v,[]);r.push(...this._bootstrapListeners),r.forEach(o=>o(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>bs(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new S(406,!1);const t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function bs(e,n){const t=e.indexOf(n);t>-1&&e.splice(t,1)}const Av=new P("",{providedIn:"root",factory:()=>pe($n).handleError.bind(void 0)});function CS(){const e=pe(Pe),n=pe($n);return t=>e.runOutsideAngular(()=>n.handleError(t))}let DS=(()=>{class e{constructor(){this.zone=pe(Pe),this.applicationRef=pe(Ro)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();let xv=(()=>{class e{}return e.__NG_ELEMENT_ID__=bS,e})();function bS(e){return function ES(e,n,t){if(Pn(e)&&!t){const r=ot(e.index,n);return new yo(r,r)}return 47&e.type?new yo(n[Se],n):null}(Be(),E(),16==(16&e))}class Rv{constructor(){}supports(n){return ss(n)}create(n){return new NS(n)}}const TS=(e,n)=>n;class NS{constructor(n){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=n||TS}forEachItem(n){let t;for(t=this._itHead;null!==t;t=t._next)n(t)}forEachOperation(n){let t=this._itHead,r=this._removalsHead,o=0,i=null;for(;t||r;){const s=!r||t&&t.currentIndex<kv(r,o,i)?t:r,a=kv(s,o,i),l=s.currentIndex;if(s===r)o--,r=r._nextRemoved;else if(t=t._next,null==s.previousIndex)o++;else{i||(i=[]);const c=a-o,u=l-o;if(c!=u){for(let h=0;h<c;h++){const p=h<i.length?i[h]:i[h]=0,v=p+h;u<=v&&v<c&&(i[h]=p+1)}i[s.previousIndex]=u-c}}a!==l&&n(s,a,l)}}forEachPreviousItem(n){let t;for(t=this._previousItHead;null!==t;t=t._nextPrevious)n(t)}forEachAddedItem(n){let t;for(t=this._additionsHead;null!==t;t=t._nextAdded)n(t)}forEachMovedItem(n){let t;for(t=this._movesHead;null!==t;t=t._nextMoved)n(t)}forEachRemovedItem(n){let t;for(t=this._removalsHead;null!==t;t=t._nextRemoved)n(t)}forEachIdentityChange(n){let t;for(t=this._identityChangesHead;null!==t;t=t._nextIdentityChange)n(t)}diff(n){if(null==n&&(n=[]),!ss(n))throw new S(900,!1);return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let o,i,s,t=this._itHead,r=!1;if(Array.isArray(n)){this.length=n.length;for(let a=0;a<this.length;a++)i=n[a],s=this._trackByFn(a,i),null!==t&&Object.is(t.trackById,s)?(r&&(t=this._verifyReinsertion(t,i,s,a)),Object.is(t.item,i)||this._addIdentityChange(t,i)):(t=this._mismatch(t,i,s,a),r=!0),t=t._next}else o=0,function p0(e,n){if(Array.isArray(e))for(let t=0;t<e.length;t++)n(e[t]);else{const t=e[Symbol.iterator]();let r;for(;!(r=t.next()).done;)n(r.value)}}(n,a=>{s=this._trackByFn(o,a),null!==t&&Object.is(t.trackById,s)?(r&&(t=this._verifyReinsertion(t,a,s,o)),Object.is(t.item,a)||this._addIdentityChange(t,a)):(t=this._mismatch(t,a,s,o),r=!0),t=t._next,o++}),this.length=o;return this._truncate(t),this.collection=n,this.isDirty}get isDirty(){return null!==this._additionsHead||null!==this._movesHead||null!==this._removalsHead||null!==this._identityChangesHead}_reset(){if(this.isDirty){let n;for(n=this._previousItHead=this._itHead;null!==n;n=n._next)n._nextPrevious=n._next;for(n=this._additionsHead;null!==n;n=n._nextAdded)n.previousIndex=n.currentIndex;for(this._additionsHead=this._additionsTail=null,n=this._movesHead;null!==n;n=n._nextMoved)n.previousIndex=n.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(n,t,r,o){let i;return null===n?i=this._itTail:(i=n._prev,this._remove(n)),null!==(n=null===this._unlinkedRecords?null:this._unlinkedRecords.get(r,null))?(Object.is(n.item,t)||this._addIdentityChange(n,t),this._reinsertAfter(n,i,o)):null!==(n=null===this._linkedRecords?null:this._linkedRecords.get(r,o))?(Object.is(n.item,t)||this._addIdentityChange(n,t),this._moveAfter(n,i,o)):n=this._addAfter(new xS(t,r),i,o),n}_verifyReinsertion(n,t,r,o){let i=null===this._unlinkedRecords?null:this._unlinkedRecords.get(r,null);return null!==i?n=this._reinsertAfter(i,n._prev,o):n.currentIndex!=o&&(n.currentIndex=o,this._addToMoves(n,o)),n}_truncate(n){for(;null!==n;){const t=n._next;this._addToRemovals(this._unlink(n)),n=t}null!==this._unlinkedRecords&&this._unlinkedRecords.clear(),null!==this._additionsTail&&(this._additionsTail._nextAdded=null),null!==this._movesTail&&(this._movesTail._nextMoved=null),null!==this._itTail&&(this._itTail._next=null),null!==this._removalsTail&&(this._removalsTail._nextRemoved=null),null!==this._identityChangesTail&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(n,t,r){null!==this._unlinkedRecords&&this._unlinkedRecords.remove(n);const o=n._prevRemoved,i=n._nextRemoved;return null===o?this._removalsHead=i:o._nextRemoved=i,null===i?this._removalsTail=o:i._prevRemoved=o,this._insertAfter(n,t,r),this._addToMoves(n,r),n}_moveAfter(n,t,r){return this._unlink(n),this._insertAfter(n,t,r),this._addToMoves(n,r),n}_addAfter(n,t,r){return this._insertAfter(n,t,r),this._additionsTail=null===this._additionsTail?this._additionsHead=n:this._additionsTail._nextAdded=n,n}_insertAfter(n,t,r){const o=null===t?this._itHead:t._next;return n._next=o,n._prev=t,null===o?this._itTail=n:o._prev=n,null===t?this._itHead=n:t._next=n,null===this._linkedRecords&&(this._linkedRecords=new Pv),this._linkedRecords.put(n),n.currentIndex=r,n}_remove(n){return this._addToRemovals(this._unlink(n))}_unlink(n){null!==this._linkedRecords&&this._linkedRecords.remove(n);const t=n._prev,r=n._next;return null===t?this._itHead=r:t._next=r,null===r?this._itTail=t:r._prev=t,n}_addToMoves(n,t){return n.previousIndex===t||(this._movesTail=null===this._movesTail?this._movesHead=n:this._movesTail._nextMoved=n),n}_addToRemovals(n){return null===this._unlinkedRecords&&(this._unlinkedRecords=new Pv),this._unlinkedRecords.put(n),n.currentIndex=null,n._nextRemoved=null,null===this._removalsTail?(this._removalsTail=this._removalsHead=n,n._prevRemoved=null):(n._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=n),n}_addIdentityChange(n,t){return n.item=t,this._identityChangesTail=null===this._identityChangesTail?this._identityChangesHead=n:this._identityChangesTail._nextIdentityChange=n,n}}class xS{constructor(n,t){this.item=n,this.trackById=t,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}}class OS{constructor(){this._head=null,this._tail=null}add(n){null===this._head?(this._head=this._tail=n,n._nextDup=null,n._prevDup=null):(this._tail._nextDup=n,n._prevDup=this._tail,n._nextDup=null,this._tail=n)}get(n,t){let r;for(r=this._head;null!==r;r=r._nextDup)if((null===t||t<=r.currentIndex)&&Object.is(r.trackById,n))return r;return null}remove(n){const t=n._prevDup,r=n._nextDup;return null===t?this._head=r:t._nextDup=r,null===r?this._tail=t:r._prevDup=t,null===this._head}}class Pv{constructor(){this.map=new Map}put(n){const t=n.trackById;let r=this.map.get(t);r||(r=new OS,this.map.set(t,r)),r.add(n)}get(n,t){const o=this.map.get(n);return o?o.get(n,t):null}remove(n){const t=n.trackById;return this.map.get(t).remove(n)&&this.map.delete(t),n}get isEmpty(){return 0===this.map.size}clear(){this.map.clear()}}function kv(e,n,t){const r=e.previousIndex;if(null===r)return r;let o=0;return t&&r<t.length&&(o=t[r]),r+n+o}class Lv{constructor(){}supports(n){return n instanceof Map||nc(n)}create(){return new FS}}class FS{constructor(){this._records=new Map,this._mapHead=null,this._appendAfter=null,this._previousMapHead=null,this._changesHead=null,this._changesTail=null,this._additionsHead=null,this._additionsTail=null,this._removalsHead=null,this._removalsTail=null}get isDirty(){return null!==this._additionsHead||null!==this._changesHead||null!==this._removalsHead}forEachItem(n){let t;for(t=this._mapHead;null!==t;t=t._next)n(t)}forEachPreviousItem(n){let t;for(t=this._previousMapHead;null!==t;t=t._nextPrevious)n(t)}forEachChangedItem(n){let t;for(t=this._changesHead;null!==t;t=t._nextChanged)n(t)}forEachAddedItem(n){let t;for(t=this._additionsHead;null!==t;t=t._nextAdded)n(t)}forEachRemovedItem(n){let t;for(t=this._removalsHead;null!==t;t=t._nextRemoved)n(t)}diff(n){if(n){if(!(n instanceof Map||nc(n)))throw new S(900,!1)}else n=new Map;return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(n,(r,o)=>{if(t&&t.key===o)this._maybeAddToChanges(t,r),this._appendAfter=t,t=t._next;else{const i=this._getOrCreateRecordForKey(o,r);t=this._insertBeforeOrAppend(t,i)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let r=t;null!==r;r=r._nextRemoved)r===this._mapHead&&(this._mapHead=null),this._records.delete(r.key),r._nextRemoved=r._next,r.previousValue=r.currentValue,r.currentValue=null,r._prev=null,r._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,t){if(n){const r=n._prev;return t._next=n,t._prev=r,n._prev=t,r&&(r._next=t),n===this._mapHead&&(this._mapHead=t),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(n,t){if(this._records.has(n)){const o=this._records.get(n);this._maybeAddToChanges(o,t);const i=o._prev,s=o._next;return i&&(i._next=s),s&&(s._prev=i),o._next=null,o._prev=null,o}const r=new RS(n);return this._records.set(n,r),r.currentValue=t,this._addToAdditions(r),r}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;null!==n;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;null!==n;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;null!=n;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(n,t){Object.is(t,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=t,this._addToChanges(n))}_addToAdditions(n){null===this._additionsHead?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n)}_addToChanges(n){null===this._changesHead?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n)}_forEach(n,t){n instanceof Map?n.forEach(t):Object.keys(n).forEach(r=>t(n[r],r))}}class RS{constructor(n){this.key=n,this.previousValue=null,this.currentValue=null,this._nextPrevious=null,this._next=null,this._prev=null,this._nextAdded=null,this._nextRemoved=null,this._nextChanged=null}}function Vv(){return new Is([new Rv])}let Is=(()=>{class e{constructor(t){this.factories=t}static create(t,r){if(null!=r){const o=r.factories.slice();t=t.concat(o)}return new e(t)}static extend(t){return{provide:e,useFactory:r=>e.create(t,r||Vv()),deps:[[e,new Qa,new Ya]]}}find(t){const r=this.factories.find(o=>o.supports(t));if(null!=r)return r;throw new S(901,!1)}}return e.\u0275prov=ue({token:e,providedIn:"root",factory:Vv}),e})();function Hv(){return new Po([new Lv])}let Po=(()=>{class e{constructor(t){this.factories=t}static create(t,r){if(r){const o=r.factories.slice();t=t.concat(o)}return new e(t)}static extend(t){return{provide:e,useFactory:r=>e.create(t,r||Hv()),deps:[[e,new Qa,new Ya]]}}find(t){const r=this.factories.find(o=>o.supports(t));if(r)return r;throw new S(901,!1)}}return e.\u0275prov=ue({token:e,providedIn:"root",factory:Hv}),e})();const LS=Dv(null,"core",[]);let VS=(()=>{class e{constructor(t){}}return e.\u0275fac=function(t){return new(t||e)(ne(Ro))},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({}),e})();let Xc=null;function ko(){return Xc}class YS{}const qn=new P("DocumentToken"),cu=/\s+/,e_=[];let Ho=(()=>{class e{constructor(t,r,o,i){this._iterableDiffers=t,this._keyValueDiffers=r,this._ngEl=o,this._renderer=i,this.initialClasses=e_,this.stateMap=new Map}set klass(t){this.initialClasses=null!=t?t.trim().split(cu):e_}set ngClass(t){this.rawClass="string"==typeof t?t.trim().split(cu):t}ngDoCheck(){for(const r of this.initialClasses)this._updateState(r,!0);const t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(const r of t)this._updateState(r,!0);else if(null!=t)for(const r of Object.keys(t))this._updateState(r,!!t[r]);this._applyStateDiff()}_updateState(t,r){const o=this.stateMap.get(t);void 0!==o?(o.enabled!==r&&(o.changed=!0,o.enabled=r),o.touched=!0):this.stateMap.set(t,{enabled:r,changed:!0,touched:!0})}_applyStateDiff(){for(const t of this.stateMap){const r=t[0],o=t[1];o.changed?(this._toggleClass(r,o.enabled),o.changed=!1):o.touched||(o.enabled&&this._toggleClass(r,!1),this.stateMap.delete(r)),o.touched=!1}}_toggleClass(t,r){(t=t.trim()).length>0&&t.split(cu).forEach(o=>{r?this._renderer.addClass(this._ngEl.nativeElement,o):this._renderer.removeClass(this._ngEl.nativeElement,o)})}}return e.\u0275fac=function(t){return new(t||e)(I(Is),I(Po),I(bt),I(jn))},e.\u0275dir=U({type:e,selectors:[["","ngClass",""]],inputs:{klass:["class","klass"],ngClass:"ngClass"},standalone:!0}),e})();class kA{constructor(n,t,r,o){this.$implicit=n,this.ngForOf=t,this.index=r,this.count=o}get first(){return 0===this.index}get last(){return this.index===this.count-1}get even(){return this.index%2==0}get odd(){return!this.even}}let Vr=(()=>{class e{set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}constructor(t,r,o){this._viewContainer=t,this._template=r,this._differs=o,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;const t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){const t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){const r=this._viewContainer;t.forEachOperation((o,i,s)=>{if(null==o.previousIndex)r.createEmbeddedView(this._template,new kA(o.item,this._ngForOf,-1,-1),null===s?void 0:s);else if(null==s)r.remove(null===i?void 0:i);else if(null!==i){const a=r.get(i);r.move(a,s),n_(a,o)}});for(let o=0,i=r.length;o<i;o++){const a=r.get(o).context;a.index=o,a.count=i,a.ngForOf=this._ngForOf}t.forEachIdentityChange(o=>{n_(r.get(o.currentIndex),o)})}static ngTemplateContextGuard(t,r){return!0}}return e.\u0275fac=function(t){return new(t||e)(I(zt),I(on),I(Is))},e.\u0275dir=U({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0}),e})();function n_(e,n){e.context.$implicit=n.item}let Zn=(()=>{class e{constructor(t,r){this._viewContainer=t,this._context=new LA,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=r}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){r_("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){r_("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,r){return!0}}return e.\u0275fac=function(t){return new(t||e)(I(zt),I(on))},e.\u0275dir=U({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0}),e})();class LA{constructor(){this.$implicit=null,this.ngIf=null}}function r_(e,n){if(n&&!n.createEmbeddedView)throw new Error(`${e} must be a TemplateRef, but received '${xe(n)}'.`)}let s_=(()=>{class e{transform(t,r,o){if(null==t)return null;if(!this.supports(t))throw function Tt(e,n){return new S(2100,!1)}();return t.slice(r,o)}supports(t){return"string"==typeof t||Array.isArray(t)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=et({name:"slice",type:e,pure:!1,standalone:!0}),e})(),lT=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({}),e})();function l_(e){return"server"===e}class BT extends YS{constructor(){super(...arguments),this.supportsDOMEvents=!0}}class mu extends BT{static makeCurrent(){!function ZS(e){Xc||(Xc=e)}(new mu)}onAndCancel(n,t,r){return n.addEventListener(t,r),()=>{n.removeEventListener(t,r)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.parentNode&&n.parentNode.removeChild(n)}createElement(n,t){return(t=t||this.getDefaultDocument()).createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return"window"===t?window:"document"===t?n:"body"===t?n.body:null}getBaseHref(n){const t=function jT(){return jo=jo||document.querySelector("base"),jo?jo.getAttribute("href"):null}();return null==t?null:function $T(e){Bs=Bs||document.createElement("a"),Bs.setAttribute("href",e);const n=Bs.pathname;return"/"===n.charAt(0)?n:`/${n}`}(t)}resetBaseElement(){jo=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return function RA(e,n){n=encodeURIComponent(n);for(const t of e.split(";")){const r=t.indexOf("="),[o,i]=-1==r?[t,""]:[t.slice(0,r),t.slice(r+1)];if(o.trim()===n)return decodeURIComponent(i)}return null}(document.cookie,n)}}let Bs,jo=null,zT=(()=>{class e{build(){return new XMLHttpRequest}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();const vu=new P("EventManagerPlugins");let p_=(()=>{class e{constructor(t,r){this._zone=r,this._eventNameToPlugin=new Map,t.forEach(o=>{o.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,r,o){return this._findPluginFor(r).addEventListener(t,r,o)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(i=>i.supports(t)),!r)throw new S(5101,!1);return this._eventNameToPlugin.set(t,r),r}}return e.\u0275fac=function(t){return new(t||e)(ne(vu),ne(Pe))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();class g_{constructor(n){this._doc=n}}const _u="ng-app-id";let m_=(()=>{class e{constructor(t,r,o,i={}){this.doc=t,this.appId=r,this.nonce=o,this.platformId=i,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=l_(i),this.resetHostNodes()}addStyles(t){for(const r of t)1===this.changeUsageCount(r,1)&&this.onStyleAdded(r)}removeStyles(t){for(const r of t)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){const t=this.styleNodesInDOM;t&&(t.forEach(r=>r.remove()),t.clear());for(const r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(const r of this.getAllStyles())this.addStyleToHost(t,r)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(const r of this.hostNodes)this.addStyleToHost(r,t)}onStyleRemoved(t){const r=this.styleRef;r.get(t)?.elements?.forEach(o=>o.remove()),r.delete(t)}collectServerRenderedStyles(){const t=this.doc.head?.querySelectorAll(`style[${_u}="${this.appId}"]`);if(t?.length){const r=new Map;return t.forEach(o=>{null!=o.textContent&&r.set(o.textContent,o)}),r}return null}changeUsageCount(t,r){const o=this.styleRef;if(o.has(t)){const i=o.get(t);return i.usage+=r,i.usage}return o.set(t,{usage:r,elements:[]}),r}getStyleElement(t,r){const o=this.styleNodesInDOM,i=o?.get(r);if(i?.parentNode===t)return o.delete(r),i.removeAttribute(_u),i;{const s=this.doc.createElement("style");return this.nonce&&s.setAttribute("nonce",this.nonce),s.textContent=r,this.platformIsServer&&s.setAttribute(_u,this.appId),s}}addStyleToHost(t,r){const o=this.getStyleElement(t,r);t.appendChild(o);const i=this.styleRef,s=i.get(r)?.elements;s?s.push(o):i.set(r,{elements:[o],usage:1})}resetHostNodes(){const t=this.hostNodes;t.clear(),t.add(this.doc.head)}}return e.\u0275fac=function(t){return new(t||e)(ne(qn),ne(Wi),ne($h,8),ne(yr))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();const yu={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},Cu=/%COMP%/g,ZT=new P("RemoveStylesOnCompDestory",{providedIn:"root",factory:()=>!1});function __(e,n){return n.map(t=>t.replace(Cu,e))}let y_=(()=>{class e{constructor(t,r,o,i,s,a,l,c=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestory=i,this.doc=s,this.platformId=a,this.ngZone=l,this.nonce=c,this.rendererByCompId=new Map,this.platformIsServer=l_(a),this.defaultRenderer=new Du(t,s,l,this.platformIsServer)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===ct.ShadowDom&&(r={...r,encapsulation:ct.Emulated});const o=this.getOrCreateRenderer(t,r);return o instanceof D_?o.applyToHost(t):o instanceof wu&&o.applyStyles(),o}getOrCreateRenderer(t,r){const o=this.rendererByCompId;let i=o.get(r.id);if(!i){const s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestory,d=this.platformIsServer;switch(r.encapsulation){case ct.Emulated:i=new D_(l,c,r,this.appId,u,s,a,d);break;case ct.ShadowDom:return new JT(l,c,t,r,s,a,this.nonce,d);default:i=new wu(l,c,r,u,s,a,d)}i.onDestroy=()=>o.delete(r.id),o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}}return e.\u0275fac=function(t){return new(t||e)(ne(p_),ne(m_),ne(Wi),ne(ZT),ne(qn),ne(yr),ne(Pe),ne($h))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();class Du{constructor(n,t,r,o){this.eventManager=n,this.doc=t,this.ngZone=r,this.platformIsServer=o,this.data=Object.create(null),this.destroyNode=null}destroy(){}createElement(n,t){return t?this.doc.createElementNS(yu[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(C_(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){n&&(C_(n)?n.content:n).insertBefore(t,r)}removeChild(n,t){n&&n.removeChild(t)}selectRootElement(n,t){let r="string"==typeof n?this.doc.querySelector(n):n;if(!r)throw new S(5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,o){if(o){t=o+":"+t;const i=yu[o];i?n.setAttributeNS(i,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){const o=yu[r];o?n.removeAttributeNS(o,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,o){o&(it.DashCase|it.Important)?n.style.setProperty(t,r,o&it.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){r&it.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n[t]=r}setValue(n,t){n.nodeValue=t}listen(n,t,r){if("string"==typeof n&&!(n=ko().getGlobalEventTarget(this.doc,n)))throw new Error(`Unsupported event target ${n} for event ${t}`);return this.eventManager.addEventListener(n,t,this.decoratePreventDefault(r))}decoratePreventDefault(n){return t=>{if("__ngUnwrap__"===t)return n;!1===(this.platformIsServer?this.ngZone.runGuarded(()=>n(t)):n(t))&&t.preventDefault()}}}function C_(e){return"TEMPLATE"===e.tagName&&void 0!==e.content}class JT extends Du{constructor(n,t,r,o,i,s,a,l){super(n,i,s,l),this.sharedStylesHost=t,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);const c=__(o.id,o.styles);for(const u of c){const d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=u,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(this.nodeOrShadowRoot(n),t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}}class wu extends Du{constructor(n,t,r,o,i,s,a,l){super(n,i,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestory=o,this.rendererUsageCount=0,this.styles=l?__(l,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles),this.rendererUsageCount++}destroy(){this.removeStylesOnCompDestory&&(this.sharedStylesHost.removeStyles(this.styles),this.rendererUsageCount--,0===this.rendererUsageCount&&this.onDestroy?.())}}class D_ extends wu{constructor(n,t,r,o,i,s,a,l){const c=o+"-"+r.id;super(n,t,r,i,s,a,l,c),this.contentAttr=function YT(e){return"_ngcontent-%COMP%".replace(Cu,e)}(c),this.hostAttr=function QT(e){return"_nghost-%COMP%".replace(Cu,e)}(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){const r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}}let XT=(()=>{class e extends g_{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,o){return t.addEventListener(r,o,!1),()=>this.removeEventListener(t,r,o)}removeEventListener(t,r,o){return t.removeEventListener(r,o)}}return e.\u0275fac=function(t){return new(t||e)(ne(qn))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();const w_=["alt","control","meta","shift"],eN={"\b":"Backspace","\t":"Tab","\x7f":"Delete","\x1b":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},tN={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey};let nN=(()=>{class e extends g_{constructor(t){super(t)}supports(t){return null!=e.parseEventName(t)}addEventListener(t,r,o){const i=e.parseEventName(r),s=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ko().onAndCancel(t,i.domEventName,s))}static parseEventName(t){const r=t.toLowerCase().split("."),o=r.shift();if(0===r.length||"keydown"!==o&&"keyup"!==o)return null;const i=e._normalizeKey(r.pop());let s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),w_.forEach(c=>{const u=r.indexOf(c);u>-1&&(r.splice(u,1),s+=c+".")}),s+=i,0!=r.length||0===i.length)return null;const l={};return l.domEventName=o,l.fullKey=s,l}static matchEventFullKeyCode(t,r){let o=eN[t.key]||t.key,i="";return r.indexOf("code.")>-1&&(o=t.code,i="code."),!(null==o||!o)&&(o=o.toLowerCase()," "===o?o="space":"."===o&&(o="dot"),w_.forEach(s=>{s!==o&&(0,tN[s])(t)&&(i+=s+".")}),i+=o,i===r)}static eventCallback(t,r,o){return i=>{e.matchEventFullKeyCode(i,t)&&o.runGuarded(()=>r(i))}}static _normalizeKey(t){return"esc"===t?"escape":t}}return e.\u0275fac=function(t){return new(t||e)(ne(qn))},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})();const sN=Dv(LS,"browser",[{provide:yr,useValue:"browser"},{provide:jh,useValue:function rN(){mu.makeCurrent()},multi:!0},{provide:qn,useFactory:function iN(){return function nb(e){ml=e}(document),document},deps:[]}]),aN=new P(""),M_=[{provide:ws,useClass:class UT{addToWindow(n){fe.getAngularTestability=(r,o=!0)=>{const i=n.findTestabilityInTree(r,o);if(null==i)throw new S(5103,!1);return i},fe.getAllAngularTestabilities=()=>n.getAllTestabilities(),fe.getAllAngularRootElements=()=>n.getAllRootElements(),fe.frameworkStabilizers||(fe.frameworkStabilizers=[]),fe.frameworkStabilizers.push(r=>{const o=fe.getAllAngularTestabilities();let i=o.length,s=!1;const a=function(l){s=s||l,i--,0==i&&r(s)};o.forEach(function(l){l.whenStable(a)})})}findTestabilityInTree(n,t,r){return null==t?null:n.getTestability(t)??(r?ko().isShadowRoot(t)?this.findTestabilityInTree(n,t.host,!0):this.findTestabilityInTree(n,t.parentElement,!0):null)}},deps:[]},{provide:mv,useClass:jc,deps:[Pe,$c,ws]},{provide:jc,useClass:jc,deps:[Pe,$c,ws]}],I_=[{provide:Ml,useValue:"root"},{provide:$n,useFactory:function oN(){return new $n},deps:[]},{provide:vu,useClass:XT,multi:!0,deps:[qn,Pe,yr]},{provide:vu,useClass:nN,multi:!0,deps:[qn]},y_,m_,p_,{provide:Qh,useExisting:y_},{provide:class hT{},useClass:zT,deps:[]},[]];let lN=(()=>{class e{constructor(t){}static withServerTransition(t){return{ngModule:e,providers:[{provide:Wi,useValue:t.appId}]}}}return e.\u0275fac=function(t){return new(t||e)(ne(aN,12))},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({providers:[...I_,...M_],imports:[lT,VS]}),e})();typeof window<"u"&&window;const{isArray:gN}=Array,{getPrototypeOf:mN,prototype:vN,keys:_N}=Object;const{isArray:DN}=Array;function EN(e,n){return e.reduce((t,r,o)=>(t[r]=n[o],t),{})}function MN(...e){const n=function aC(e){return ve(ua(e))?e.pop():void 0}(e),{args:t,keys:r}=function yN(e){if(1===e.length){const n=e[0];if(gN(n))return{args:n,keys:null};if(function CN(e){return e&&"object"==typeof e&&mN(e)===vN}(n)){const t=_N(n);return{args:t.map(r=>n[r]),keys:t}}}return{args:e,keys:null}}(e),o=new qe(i=>{const{length:s}=t;if(!s)return void i.complete();const a=new Array(s);let l=s,c=s;for(let u=0;u<s;u++){let d=!1;On(t[u]).subscribe(new Nn(i,h=>{d||(d=!0,c--),a[u]=h},()=>l--,void 0,()=>{(!l||!d)&&(c||i.next(r?EN(r,a):a),i.complete())}))}});return n?o.pipe(function bN(e){return sa(n=>function wN(e,n){return DN(n)?e(...n):e(n)}(e,n))}(n)):o}let N_=(()=>{class e{constructor(t,r){this._renderer=t,this._elementRef=r,this.onChange=o=>{},this.onTouched=()=>{}}setProperty(t,r){this._renderer.setProperty(this._elementRef.nativeElement,t,r)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}}return e.\u0275fac=function(t){return new(t||e)(I(jn),I(bt))},e.\u0275dir=U({type:e}),e})(),Yn=(()=>{class e extends N_{}return e.\u0275fac=function(){let n;return function(r){return(n||(n=Ue(e)))(r||e)}}(),e.\u0275dir=U({type:e,features:[ce]}),e})();const Gt=new P("NgValueAccessor"),IN={provide:Gt,useExisting:de(()=>Eu),multi:!0};let Eu=(()=>{class e extends Yn{writeValue(t){this.setProperty("checked",t)}}return e.\u0275fac=function(){let n;return function(r){return(n||(n=Ue(e)))(r||e)}}(),e.\u0275dir=U({type:e,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(t,r){1&t&&k("change",function(i){return r.onChange(i.target.checked)})("blur",function(){return r.onTouched()})},features:[me([IN]),ce]}),e})();const SN={provide:Gt,useExisting:de(()=>$o),multi:!0},TN=new P("CompositionEventMode");let $o=(()=>{class e extends N_{constructor(t,r,o){super(t,r),this._compositionMode=o,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function AN(){const e=ko()?ko().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}())}writeValue(t){this.setProperty("value",t??"")}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}}return e.\u0275fac=function(t){return new(t||e)(I(jn),I(bt),I(TN,8))},e.\u0275dir=U({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(t,r){1&t&&k("input",function(i){return r._handleInput(i.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(i){return r._compositionEnd(i.target.value)})},features:[me([SN]),ce]}),e})();const We=new P("NgValidators"),bn=new P("NgAsyncValidators");function B_(e){return null!=e}function j_(e){return ds(e)?ti(e):e}function $_(e){let n={};return e.forEach(t=>{n=null!=t?{...n,...t}:n}),0===Object.keys(n).length?null:n}function U_(e,n){return n.map(t=>t(e))}function z_(e){return e.map(n=>function xN(e){return!e.validate}(n)?n:t=>n.validate(t))}function Mu(e){return null!=e?function G_(e){if(!e)return null;const n=e.filter(B_);return 0==n.length?null:function(t){return $_(U_(t,n))}}(z_(e)):null}function Iu(e){return null!=e?function W_(e){if(!e)return null;const n=e.filter(B_);return 0==n.length?null:function(t){return MN(U_(t,n).map(j_)).pipe(sa($_))}}(z_(e)):null}function q_(e,n){return null===e?[n]:Array.isArray(e)?[...e,n]:[e,n]}function Su(e){return e?Array.isArray(e)?e:[e]:[]}function $s(e,n){return Array.isArray(e)?e.includes(n):e===n}function Q_(e,n){const t=Su(n);return Su(e).forEach(o=>{$s(t,o)||t.push(o)}),t}function K_(e,n){return Su(n).filter(t=>!$s(e,t))}class J_{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Mu(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Iu(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control&&this.control.reset(n)}hasError(n,t){return!!this.control&&this.control.hasError(n,t)}getError(n,t){return this.control?this.control.getError(n,t):null}}class Je extends J_{get formDirective(){return null}get path(){return null}}class En extends J_{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class X_{constructor(n){this._cd=n}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}let Us=(()=>{class e extends X_{constructor(t){super(t)}}return e.\u0275fac=function(t){return new(t||e)(I(En,2))},e.\u0275dir=U({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,r){2&t&&hs("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},features:[ce]}),e})();const Uo="VALID",Gs="INVALID",Hr="PENDING",zo="DISABLED";function Ws(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}class ry{constructor(n,t){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(n),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get valid(){return this.status===Uo}get invalid(){return this.status===Gs}get pending(){return this.status==Hr}get disabled(){return this.status===zo}get enabled(){return this.status!==zo}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Q_(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Q_(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(K_(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(K_(n,this._rawAsyncValidators))}hasValidator(n){return $s(this._rawValidators,n)}hasAsyncValidator(n){return $s(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){this.touched=!0,this._parent&&!n.onlySelf&&this._parent.markAsTouched(n)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(n=>n.markAllAsTouched())}markAsUntouched(n={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(t=>{t.markAsUntouched({onlySelf:!0})}),this._parent&&!n.onlySelf&&this._parent._updateTouched(n)}markAsDirty(n={}){this.pristine=!1,this._parent&&!n.onlySelf&&this._parent.markAsDirty(n)}markAsPristine(n={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(t=>{t.markAsPristine({onlySelf:!0})}),this._parent&&!n.onlySelf&&this._parent._updatePristine(n)}markAsPending(n={}){this.status=Hr,!1!==n.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!n.onlySelf&&this._parent.markAsPending(n)}disable(n={}){const t=this._parentMarkedDirty(n.onlySelf);this.status=zo,this.errors=null,this._forEachChild(r=>{r.disable({...n,onlySelf:!0})}),this._updateValue(),!1!==n.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...n,skipPristineCheck:t}),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){const t=this._parentMarkedDirty(n.onlySelf);this.status=Uo,this._forEachChild(r=>{r.enable({...n,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors({...n,skipPristineCheck:t}),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(n){this._parent&&!n.onlySelf&&(this._parent.updateValueAndValidity(n),n.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Uo||this.status===Hr)&&this._runAsyncValidator(n.emitEvent)),!1!==n.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!n.onlySelf&&this._parent.updateValueAndValidity(n)}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?zo:Uo}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n){if(this.asyncValidator){this.status=Hr,this._hasOwnPendingAsyncValidator=!0;const t=j_(this.asyncValidator(this));this._asyncValidationSubscription=t.subscribe(r=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(r,{emitEvent:n})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(n,t={}){this.errors=n,this._updateControlsErrors(!1!==t.emitEvent)}get(n){let t=n;return null==t||(Array.isArray(t)||(t=t.split(".")),0===t.length)?null:t.reduce((r,o)=>r&&r._find(o),this)}getError(n,t){const r=t?this.get(t):this;return r&&r.errors?r.errors[n]:null}hasError(n,t){return!!this.getError(n,t)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(n)}_initObservables(){this.valueChanges=new Ee,this.statusChanges=new Ee}_calculateStatus(){return this._allControlsDisabled()?zo:this.errors?Gs:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Hr)?Hr:this._anyControlsHaveStatus(Gs)?Gs:Uo}_anyControlsHaveStatus(n){return this._anyControls(t=>t.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n={}){this.pristine=!this._anyControlsDirty(),this._parent&&!n.onlySelf&&this._parent._updatePristine(n)}_updateTouched(n={}){this.touched=this._anyControlsTouched(),this._parent&&!n.onlySelf&&this._parent._updateTouched(n)}_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Ws(n)&&null!=n.updateOn&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=function kN(e){return Array.isArray(e)?Mu(e):e||null}(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=function LN(e){return Array.isArray(e)?Iu(e):e||null}(this._rawAsyncValidators)}}const Br=new P("CallSetDisabledState",{providedIn:"root",factory:()=>qs}),qs="always";function Go(e,n,t=qs){(function Fu(e,n){const t=function Z_(e){return e._rawValidators}(e);null!==n.validator?e.setValidators(q_(t,n.validator)):"function"==typeof t&&e.setValidators([t]);const r=function Y_(e){return e._rawAsyncValidators}(e);null!==n.asyncValidator?e.setAsyncValidators(q_(r,n.asyncValidator)):"function"==typeof r&&e.setAsyncValidators([r]);const o=()=>e.updateValueAndValidity();Qs(n._rawValidators,o),Qs(n._rawAsyncValidators,o)})(e,n),n.valueAccessor.writeValue(e.value),(e.disabled||"always"===t)&&n.valueAccessor.setDisabledState?.(e.disabled),function BN(e,n){n.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,"change"===e.updateOn&&oy(e,n)})}(e,n),function $N(e,n){const t=(r,o)=>{n.valueAccessor.writeValue(r),o&&n.viewToModelUpdate(r)};e.registerOnChange(t),n._registerOnDestroy(()=>{e._unregisterOnChange(t)})}(e,n),function jN(e,n){n.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,"blur"===e.updateOn&&e._pendingChange&&oy(e,n),"submit"!==e.updateOn&&e.markAsTouched()})}(e,n),function HN(e,n){if(n.valueAccessor.setDisabledState){const t=r=>{n.valueAccessor.setDisabledState(r)};e.registerOnDisabledChange(t),n._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}(e,n)}function Qs(e,n){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(n)})}function oy(e,n){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function ay(e,n){const t=e.indexOf(n);t>-1&&e.splice(t,1)}function ly(e){return"object"==typeof e&&null!==e&&2===Object.keys(e).length&&"value"in e&&"disabled"in e}const cy=class extends ry{constructor(n=null,t,r){super(function Nu(e){return(Ws(e)?e.validators:e)||null}(t),function xu(e,n){return(Ws(n)?n.asyncValidators:e)||null}(r,t)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(n),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Ws(t)&&(t.nonNullable||t.initialValueIsDefault)&&(this.defaultValue=ly(n)?n.value:n)}setValue(n,t={}){this.value=this._pendingValue=n,this._onChange.length&&!1!==t.emitModelToViewChange&&this._onChange.forEach(r=>r(this.value,!1!==t.emitViewToModelChange)),this.updateValueAndValidity(t)}patchValue(n,t={}){this.setValue(n,t)}reset(n=this.defaultValue,t={}){this._applyFormState(n),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),this._pendingChange=!1}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){ay(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){ay(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(n){ly(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}},QN={provide:En,useExisting:de(()=>qo)},fy=(()=>Promise.resolve())();let qo=(()=>{class e extends En{constructor(t,r,o,i,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this.control=new cy,this._registered=!1,this.name="",this.update=new Ee,this._parent=t,this._setValidators(r),this._setAsyncValidators(o),this.valueAccessor=function ku(e,n){if(!n)return null;let t,r,o;return Array.isArray(n),n.forEach(i=>{i.constructor===$o?t=i:function GN(e){return Object.getPrototypeOf(e.constructor)===Yn}(i)?r=i:o=i}),o||r||t||null}(0,i)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){const r=t.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),function Pu(e,n){if(!e.hasOwnProperty("model"))return!1;const t=e.model;return!!t.isFirstChange()||!Object.is(n,t.currentValue)}(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){Go(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(t){fy.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){const r=t.isDisabled.currentValue,o=0!==r&&function Jc(e){return"boolean"==typeof e?e:null!=e&&"false"!==e}(r);fy.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?function Zs(e,n){return[...n.path,e]}(t,this._parent):[t]}}return e.\u0275fac=function(t){return new(t||e)(I(Je,9),I(We,10),I(bn,10),I(Gt,10),I(xv,8),I(Br,8))},e.\u0275dir=U({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[me([QN]),ce,Jt]}),e})(),py=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({}),e})();const tx={provide:Gt,useExisting:de(()=>Vu),multi:!0};let Vu=(()=>{class e extends Yn{writeValue(t){this.setProperty("value",parseFloat(t))}registerOnChange(t){this.onChange=r=>{t(""==r?null:parseFloat(r))}}}return e.\u0275fac=function(){let n;return function(r){return(n||(n=Ue(e)))(r||e)}}(),e.\u0275dir=U({type:e,selectors:[["input","type","range","formControlName",""],["input","type","range","formControl",""],["input","type","range","ngModel",""]],hostBindings:function(t,r){1&t&&k("change",function(i){return r.onChange(i.target.value)})("input",function(i){return r.onChange(i.target.value)})("blur",function(){return r.onTouched()})},features:[me([tx]),ce]}),e})();const ax={provide:Gt,useExisting:de(()=>Zo),multi:!0};function Cy(e,n){return null==e?`${n}`:(n&&"object"==typeof n&&(n="Object"),`${e}: ${n}`.slice(0,50))}let Zo=(()=>{class e extends Yn{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){this.value=t;const o=Cy(this._getOptionId(t),t);this.setProperty("value",o)}registerOnChange(t){this.onChange=r=>{this.value=this._getOptionValue(r),t(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(const r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r),t))return r;return null}_getOptionValue(t){const r=function lx(e){return e.split(":")[0]}(t);return this._optionMap.has(r)?this._optionMap.get(r):t}}return e.\u0275fac=function(){let n;return function(r){return(n||(n=Ue(e)))(r||e)}}(),e.\u0275dir=U({type:e,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(t,r){1&t&&k("change",function(i){return r.onChange(i.target.value)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},features:[me([ax]),ce]}),e})(),$u=(()=>{class e{constructor(t,r,o){this._element=t,this._renderer=r,this._select=o,this._select&&(this.id=this._select._registerOption())}set ngValue(t){null!=this._select&&(this._select._optionMap.set(this.id,t),this._setElementValue(Cy(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._setElementValue(t),this._select&&this._select.writeValue(this._select.value)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return e.\u0275fac=function(t){return new(t||e)(I(bt),I(jn),I(Zo,9))},e.\u0275dir=U({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),e})();const cx={provide:Gt,useExisting:de(()=>Uu),multi:!0};function Dy(e,n){return null==e?`${n}`:("string"==typeof n&&(n=`'${n}'`),n&&"object"==typeof n&&(n="Object"),`${e}: ${n}`.slice(0,50))}let Uu=(()=>{class e extends Yn{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){let r;if(this.value=t,Array.isArray(t)){const o=t.map(i=>this._getOptionId(i));r=(i,s)=>{i._setSelected(o.indexOf(s.toString())>-1)}}else r=(o,i)=>{o._setSelected(!1)};this._optionMap.forEach(r)}registerOnChange(t){this.onChange=r=>{const o=[],i=r.selectedOptions;if(void 0!==i){const s=i;for(let a=0;a<s.length;a++){const c=this._getOptionValue(s[a].value);o.push(c)}}else{const s=r.options;for(let a=0;a<s.length;a++){const l=s[a];if(l.selected){const c=this._getOptionValue(l.value);o.push(c)}}}this.value=o,t(o)}}_registerOption(t){const r=(this._idCounter++).toString();return this._optionMap.set(r,t),r}_getOptionId(t){for(const r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r)._value,t))return r;return null}_getOptionValue(t){const r=function ux(e){return e.split(":")[0]}(t);return this._optionMap.has(r)?this._optionMap.get(r)._value:t}}return e.\u0275fac=function(){let n;return function(r){return(n||(n=Ue(e)))(r||e)}}(),e.\u0275dir=U({type:e,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(t,r){1&t&&k("change",function(i){return r.onChange(i.target)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},features:[me([cx]),ce]}),e})(),zu=(()=>{class e{constructor(t,r,o){this._element=t,this._renderer=r,this._select=o,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){null!=this._select&&(this._value=t,this._setElementValue(Dy(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(Dy(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return e.\u0275fac=function(t){return new(t||e)(I(bt),I(jn),I(Uu,9))},e.\u0275dir=U({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),e})(),yx=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({imports:[py]}),e})(),Dx=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Br,useValue:t.callSetDisabledState??qs}]}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=dn({type:e}),e.\u0275inj=Wt({imports:[yx]}),e})();class xy{constructor(){this.riskHotspotsSettings=null,this.coverageInfoSettings=null}}class wx{constructor(){this.showLineCoverage=!0,this.showBranchCoverage=!0,this.showMethodCoverage=!0,this.visibleMetrics=[],this.groupingMaximum=0,this.grouping=0,this.historyComparisionDate="",this.historyComparisionType="",this.filter="",this.sortBy="name",this.sortOrder="asc",this.collapseStates=[]}}class bx{constructor(n){this.et="",this.et=n.et,this.cl=n.cl,this.ucl=n.ucl,this.cal=n.cal,this.tl=n.tl,this.lcq=n.lcq,this.cb=n.cb,this.tb=n.tb,this.bcq=n.bcq,this.cm=n.cm,this.tm=n.tm,this.mcq=n.mcq}get coverageRatioText(){return 0===this.tl?"-":this.cl+"/"+this.cal}get branchCoverageRatioText(){return 0===this.tb?"-":this.cb+"/"+this.tb}get methodCoverageRatioText(){return 0===this.tm?"-":this.cm+"/"+this.tm}}class Mn{static roundNumber(n,t){return Math.floor(n*Math.pow(10,t))/Math.pow(10,t)}static getNthOrLastIndexOf(n,t,r){let o=0,i=-1,s=-1;for(;o<r&&(s=n.indexOf(t,i+1),-1!==s);)i=s,o++;return i}}class Oy{constructor(){this.name="",this.coveredLines=0,this.uncoveredLines=0,this.coverableLines=0,this.totalLines=0,this.coveredBranches=0,this.totalBranches=0,this.coveredMethods=0,this.totalMethods=0}get coverage(){return 0===this.coverableLines?NaN:Mn.roundNumber(100*this.coveredLines/this.coverableLines,1)}get coveragePercentage(){return 0===this.coverableLines?"":this.coverage+"%"}get coverageRatioText(){return 0===this.coverableLines?"-":this.coveredLines+"/"+this.coverableLines}get branchCoverage(){return 0===this.totalBranches?NaN:Mn.roundNumber(100*this.coveredBranches/this.totalBranches,1)}get branchCoveragePercentage(){return 0===this.totalBranches?"":this.branchCoverage+"%"}get branchCoverageRatioText(){return 0===this.totalBranches?"-":this.coveredBranches+"/"+this.totalBranches}get methodCoverage(){return 0===this.totalMethods?NaN:Mn.roundNumber(100*this.coveredMethods/this.totalMethods,1)}get methodCoveragePercentage(){return 0===this.totalMethods?"":this.methodCoverage+"%"}get methodCoverageRatioText(){return 0===this.totalMethods?"-":this.coveredMethods+"/"+this.totalMethods}}class Wu extends Oy{constructor(n,t){super(),this.reportPath="",this.lineCoverageHistory=[],this.branchCoverageHistory=[],this.methodCoverageHistory=[],this.historicCoverages=[],this.currentHistoricCoverage=null,this.name=n.name,this.reportPath=n.rp?n.rp+t:n.rp,this.coveredLines=n.cl,this.uncoveredLines=n.ucl,this.coverableLines=n.cal,this.totalLines=n.tl,this.coveredBranches=n.cb,this.totalBranches=n.tb,this.coveredMethods=n.cm,this.totalMethods=n.tm,this.lineCoverageHistory=n.lch,this.branchCoverageHistory=n.bch,this.methodCoverageHistory=n.mch,n.hc.forEach(r=>{this.historicCoverages.push(new bx(r))}),this.metrics=n.metrics}get coverage(){return 0===this.coverableLines?NaN:Mn.roundNumber(100*this.coveredLines/this.coverableLines,1)}visible(n,t){if(""!==n&&-1===this.name.toLowerCase().indexOf(n.toLowerCase()))return!1;if(""===t||null===this.currentHistoricCoverage)return!0;if("allChanges"===t){if(this.coveredLines===this.currentHistoricCoverage.cl&&this.uncoveredLines===this.currentHistoricCoverage.ucl&&this.coverableLines===this.currentHistoricCoverage.cal&&this.totalLines===this.currentHistoricCoverage.tl&&this.coveredBranches===this.currentHistoricCoverage.cb&&this.totalBranches===this.currentHistoricCoverage.tb&&this.coveredMethods===this.currentHistoricCoverage.cm&&this.totalMethods===this.currentHistoricCoverage.tm)return!1}else if("lineCoverageIncreaseOnly"===t){let r=this.coverage;if(isNaN(r)||r<=this.currentHistoricCoverage.lcq)return!1}else if("lineCoverageDecreaseOnly"===t){let r=this.coverage;if(isNaN(r)||r>=this.currentHistoricCoverage.lcq)return!1}else if("branchCoverageIncreaseOnly"===t){let r=this.branchCoverage;if(isNaN(r)||r<=this.currentHistoricCoverage.bcq)return!1}else if("branchCoverageDecreaseOnly"===t){let r=this.branchCoverage;if(isNaN(r)||r>=this.currentHistoricCoverage.bcq)return!1}else if("methodCoverageIncreaseOnly"===t){let r=this.methodCoverage;if(isNaN(r)||r<=this.currentHistoricCoverage.mcq)return!1}else if("methodCoverageDecreaseOnly"===t){let r=this.methodCoverage;if(isNaN(r)||r>=this.currentHistoricCoverage.mcq)return!1}return!0}updateCurrentHistoricCoverage(n){if(this.currentHistoricCoverage=null,""!==n)for(let t=0;t<this.historicCoverages.length;t++)if(this.historicCoverages[t].et===n){this.currentHistoricCoverage=this.historicCoverages[t];break}}}class In extends Oy{constructor(n,t){super(),this.subElements=[],this.classes=[],this.collapsed=!1,this.name=n,this.collapsed=n.indexOf("Test")>-1&&null===t}visible(n,t){if(""!==n&&this.name.toLowerCase().indexOf(n.toLowerCase())>-1)return!0;for(let r=0;r<this.subElements.length;r++)if(this.subElements[r].visible(n,t))return!0;for(let r=0;r<this.classes.length;r++)if(this.classes[r].visible(n,t))return!0;return!1}insertClass(n,t){if(this.coveredLines+=n.coveredLines,this.uncoveredLines+=n.uncoveredLines,this.coverableLines+=n.coverableLines,this.totalLines+=n.totalLines,this.coveredBranches+=n.coveredBranches,this.totalBranches+=n.totalBranches,this.coveredMethods+=n.coveredMethods,this.totalMethods+=n.totalMethods,null===t)return void this.classes.push(n);let r=Mn.getNthOrLastIndexOf(n.name,".",t);-1===r&&(r=Mn.getNthOrLastIndexOf(n.name,"\\",t));let o=-1===r?"-":n.name.substring(0,r);for(let s=0;s<this.subElements.length;s++)if(this.subElements[s].name===o)return void this.subElements[s].insertClass(n,null);let i=new In(o,this);this.subElements.push(i),i.insertClass(n,null)}collapse(){this.collapsed=!0;for(let n=0;n<this.subElements.length;n++)this.subElements[n].collapse()}expand(){this.collapsed=!1;for(let n=0;n<this.subElements.length;n++)this.subElements[n].expand()}toggleCollapse(n){n.preventDefault(),this.collapsed=!this.collapsed}updateCurrentHistoricCoverage(n){for(let t=0;t<this.subElements.length;t++)this.subElements[t].updateCurrentHistoricCoverage(n);for(let t=0;t<this.classes.length;t++)this.classes[t].updateCurrentHistoricCoverage(n)}static sortCodeElementViewModels(n,t,r){let o=r?-1:1,i=r?1:-1;"name"===t?n.sort(function(s,a){return s.name===a.name?0:s.name<a.name?o:i}):"covered"===t?n.sort(function(s,a){return s.coveredLines===a.coveredLines?0:s.coveredLines<a.coveredLines?o:i}):"uncovered"===t?n.sort(function(s,a){return s.uncoveredLines===a.uncoveredLines?0:s.uncoveredLines<a.uncoveredLines?o:i}):"coverable"===t?n.sort(function(s,a){return s.coverableLines===a.coverableLines?0:s.coverableLines<a.coverableLines?o:i}):"total"===t?n.sort(function(s,a){return s.totalLines===a.totalLines?0:s.totalLines<a.totalLines?o:i}):"coverage"===t?n.sort(function(s,a){return s.coverage===a.coverage?0:isNaN(s.coverage)?o:isNaN(a.coverage)?i:s.coverage<a.coverage?o:i}):"branchcoverage"===t?n.sort(function(s,a){return s.branchCoverage===a.branchCoverage?0:isNaN(s.branchCoverage)?o:isNaN(a.branchCoverage)?i:s.branchCoverage<a.branchCoverage?o:i}):"methodcoverage"===t&&n.sort(function(s,a){return s.methodCoverage===a.methodCoverage?0:isNaN(s.methodCoverage)?o:isNaN(a.methodCoverage)?i:s.methodCoverage<a.methodCoverage?o:i})}changeSorting(n,t){In.sortCodeElementViewModels(this.subElements,n,t);let r=t?-1:1,o=t?1:-1;this.classes.sort("name"===n?function(i,s){return i.name===s.name?0:i.name<s.name?r:o}:"covered"===n?function(i,s){return i.coveredLines===s.coveredLines?0:i.coveredLines<s.coveredLines?r:o}:"uncovered"===n?function(i,s){return i.uncoveredLines===s.uncoveredLines?0:i.uncoveredLines<s.uncoveredLines?r:o}:"coverable"===n?function(i,s){return i.coverableLines===s.coverableLines?0:i.coverableLines<s.coverableLines?r:o}:"total"===n?function(i,s){return i.totalLines===s.totalLines?0:i.totalLines<s.totalLines?r:o}:"coverage"===n?function(i,s){return i.coverage===s.coverage?0:isNaN(i.coverage)?r:isNaN(s.coverage)?o:i.coverage<s.coverage?r:o}:"covered_branches"===n?function(i,s){return i.coveredBranches===s.coveredBranches?0:i.coveredBranches<s.coveredBranches?r:o}:"total_branches"===n?function(i,s){return i.totalBranches===s.totalBranches?0:i.totalBranches<s.totalBranches?r:o}:"branchcoverage"===n?function(i,s){return i.branchCoverage===s.branchCoverage?0:isNaN(i.branchCoverage)?r:isNaN(s.branchCoverage)?o:i.branchCoverage<s.branchCoverage?r:o}:"covered_methods"===n?function(i,s){return i.coveredMethods===s.coveredMethods?0:i.coveredMethods<s.coveredMethods?r:o}:"total_methods"===n?function(i,s){return i.totalMethods===s.totalMethods?0:i.totalMethods<s.totalMethods?r:o}:"methodcoverage"===n?function(i,s){return i.methodCoverage===s.methodCoverage?0:isNaN(i.methodCoverage)?r:isNaN(s.methodCoverage)?o:i.methodCoverage<s.methodCoverage?r:o}:function(i,s){const a=i.metrics[n],l=s.metrics[n];return a===l?0:isNaN(a)?r:isNaN(l)?o:a<l?r:o});for(let i=0;i<this.subElements.length;i++)this.subElements[i].changeSorting(n,t)}}let qu=(()=>{class e{get nativeWindow(){return function Ex(){return window}()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=ue({token:e,factory:e.\u0275fac}),e})(),Mx=(()=>{class e{constructor(){this.translations={}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["pro-button"]],inputs:{translations:"translations"},decls:3,vars:1,consts:[["href","https://reportgenerator.io/pro","target","_blank",1,"pro-button","pro-button-tiny",3,"title"]],template:function(t,r){1&t&&(b(0,"\xa0"),y(1,"a",0),b(2,"PRO"),_()),2&t&&(f(1),_n("title",r.translations.methodCoverageProVersion))},encapsulation:2}),e})();function Ix(e,n){if(1&e){const t=we();y(0,"div",3)(1,"label")(2,"input",4),k("ngModelChange",function(o){return Y(t),Q(m().showBranchCoverage=o)})("change",function(){Y(t);const o=m();return Q(o.showBranchCoverageChange.emit(o.showBranchCoverage))}),_(),b(3),_()()}if(2&e){const t=m();f(2),g("ngModel",t.showBranchCoverage),f(1),q(" ",t.translations.branchCoverage,"")}}function Sx(e,n){1&e&&x(0,"pro-button",9),2&e&&g("translations",m().translations)}function Ax(e,n){1&e&&x(0,"pro-button",9),2&e&&g("translations",m(2).translations)}function Tx(e,n){1&e&&(y(0,"a",13),x(1,"i",14),_()),2&e&&g("href",m().$implicit.explanationUrl,mn)}function Nx(e,n){if(1&e){const t=we();y(0,"div",3)(1,"label")(2,"input",11),k("change",function(){const i=Y(t).$implicit;return Q(m(2).toggleMetric(i))}),_(),b(3),_(),b(4,"\xa0"),C(5,Tx,2,1,"a",12),_()}if(2&e){const t=n.$implicit,r=m(2);f(2),g("checked",r.isMetricSelected(t))("disabled",!r.methodCoverageAvailable),f(1),q(" ",t.name,""),f(2),g("ngIf",t.explanationUrl)}}function xx(e,n){if(1&e&&(ee(0),x(1,"br")(2,"br"),y(3,"b"),b(4),_(),C(5,Ax,1,1,"pro-button",7),C(6,Nx,6,4,"div",10),te()),2&e){const t=m();f(4),O(t.translations.metrics),f(1),g("ngIf",!t.methodCoverageAvailable),f(1),g("ngForOf",t.metrics)}}let Ox=(()=>{class e{constructor(){this.visible=!1,this.visibleChange=new Ee,this.translations={},this.branchCoverageAvailable=!1,this.methodCoverageAvailable=!1,this.metrics=[],this.showLineCoverage=!1,this.showLineCoverageChange=new Ee,this.showBranchCoverage=!1,this.showBranchCoverageChange=new Ee,this.showMethodCoverage=!1,this.showMethodCoverageChange=new Ee,this.visibleMetrics=[],this.visibleMetricsChange=new Ee}isMetricSelected(t){return void 0!==this.visibleMetrics.find(r=>r.name===t.name)}toggleMetric(t){let r=this.visibleMetrics.find(o=>o.name===t.name);r?this.visibleMetrics.splice(this.visibleMetrics.indexOf(r),1):this.visibleMetrics.push(t),this.visibleMetrics=[...this.visibleMetrics],this.visibleMetricsChange.emit(this.visibleMetrics)}close(){this.visible=!1,this.visibleChange.emit(this.visible)}cancelEvent(t){t.stopPropagation()}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["popup"]],inputs:{visible:"visible",translations:"translations",branchCoverageAvailable:"branchCoverageAvailable",methodCoverageAvailable:"methodCoverageAvailable",metrics:"metrics",showLineCoverage:"showLineCoverage",showBranchCoverage:"showBranchCoverage",showMethodCoverage:"showMethodCoverage",visibleMetrics:"visibleMetrics"},outputs:{visibleChange:"visibleChange",showLineCoverageChange:"showLineCoverageChange",showBranchCoverageChange:"showBranchCoverageChange",showMethodCoverageChange:"showMethodCoverageChange",visibleMetricsChange:"visibleMetricsChange"},decls:17,vars:9,consts:[[1,"popup-container",3,"click"],[1,"popup",3,"click"],[1,"close",3,"click"],[1,"mt-1"],["type","checkbox",3,"ngModel","ngModelChange","change"],["class","mt-1",4,"ngIf"],["type","checkbox",3,"ngModel","disabled","ngModelChange","change"],[3,"translations",4,"ngIf"],[4,"ngIf"],[3,"translations"],["class","mt-1",4,"ngFor","ngForOf"],["type","checkbox",3,"checked","disabled","change"],["target","_blank",3,"href",4,"ngIf"],["target","_blank",3,"href"],[1,"icon-info-circled"]],template:function(t,r){1&t&&(y(0,"div",0),k("click",function(){return r.close()}),y(1,"div",1),k("click",function(i){return r.cancelEvent(i)}),y(2,"div",2),k("click",function(){return r.close()}),b(3,"X"),_(),y(4,"b"),b(5),_(),y(6,"div",3)(7,"label")(8,"input",4),k("ngModelChange",function(i){return r.showLineCoverage=i})("change",function(){return r.showLineCoverageChange.emit(r.showLineCoverage)}),_(),b(9),_()(),C(10,Ix,4,2,"div",5),y(11,"div",3)(12,"label")(13,"input",6),k("ngModelChange",function(i){return r.showMethodCoverage=i})("change",function(){return r.showMethodCoverageChange.emit(r.showMethodCoverage)}),_(),b(14),_(),C(15,Sx,1,1,"pro-button",7),_(),C(16,xx,7,3,"ng-container",8),_()()),2&t&&(f(5),O(r.translations.coverageTypes),f(3),g("ngModel",r.showLineCoverage),f(1),q(" ",r.translations.coverage,""),f(1),g("ngIf",r.branchCoverageAvailable),f(3),g("ngModel",r.showMethodCoverage)("disabled",!r.methodCoverageAvailable),f(1),q(" ",r.translations.methodCoverage,""),f(1),g("ngIf",!r.methodCoverageAvailable),f(1),g("ngIf",r.metrics.length>0))},dependencies:[Vr,Zn,Eu,Us,qo,Mx],encapsulation:2}),e})();function Fx(e,n){1&e&&x(0,"td",3)}function Rx(e,n){1&e&&x(0,"td"),2&e&&Ut("green ",m().greenClass,"")}function Px(e,n){1&e&&x(0,"td"),2&e&&Ut("red ",m().redClass,"")}let Fy=(()=>{class e{constructor(){this.grayVisible=!0,this.greenVisible=!1,this.redVisible=!1,this.greenClass="",this.redClass="",this._percentage=NaN}get percentage(){return this._percentage}set percentage(t){this._percentage=t,this.grayVisible=isNaN(t),this.greenVisible=!isNaN(t)&&Math.round(t)>0,this.redVisible=!isNaN(t)&&100-Math.round(t)>0,this.greenClass="covered"+Math.round(t),this.redClass="covered"+(100-Math.round(t))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["coverage-bar"]],inputs:{percentage:"percentage"},decls:4,vars:3,consts:[[1,"coverage"],["class","gray covered100",4,"ngIf"],[3,"class",4,"ngIf"],[1,"gray","covered100"]],template:function(t,r){1&t&&(y(0,"table",0),C(1,Fx,1,0,"td",1),C(2,Rx,1,3,"td",2),C(3,Px,1,3,"td",2),_()),2&t&&(f(1),g("ngIf",r.grayVisible),f(1),g("ngIf",r.greenVisible),f(1),g("ngIf",r.redVisible))},dependencies:[Zn],encapsulation:2,changeDetection:0}),e})();const kx=["codeelement-row",""];function Lx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.coveredLines)}}function Vx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.uncoveredLines)}}function Hx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.coverableLines)}}function Bx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.totalLines)}}function jx(e,n){if(1&e&&(y(0,"th",6),b(1),_()),2&e){const t=m();g("title",t.element.coverageRatioText),f(1),O(t.element.coveragePercentage)}}function $x(e,n){if(1&e&&(y(0,"th",5),x(1,"coverage-bar",7),_()),2&e){const t=m();f(1),g("percentage",t.element.coverage)}}function Ux(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.coveredBranches)}}function zx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.totalBranches)}}function Gx(e,n){if(1&e&&(y(0,"th",6),b(1),_()),2&e){const t=m();g("title",t.element.branchCoverageRatioText),f(1),O(t.element.branchCoveragePercentage)}}function Wx(e,n){if(1&e&&(y(0,"th",5),x(1,"coverage-bar",7),_()),2&e){const t=m();f(1),g("percentage",t.element.branchCoverage)}}function qx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.coveredMethods)}}function Zx(e,n){if(1&e&&(y(0,"th",5),b(1),_()),2&e){const t=m();f(1),O(t.element.totalMethods)}}function Yx(e,n){if(1&e&&(y(0,"th",6),b(1),_()),2&e){const t=m();g("title",t.element.methodCoverageRatioText),f(1),O(t.element.methodCoveragePercentage)}}function Qx(e,n){if(1&e&&(y(0,"th",5),x(1,"coverage-bar",7),_()),2&e){const t=m();f(1),g("percentage",t.element.methodCoverage)}}function Kx(e,n){1&e&&x(0,"th",5)}const Jx=function(e,n){return{"icon-plus":e,"icon-minus":n}};let Xx=(()=>{class e{constructor(){this.collapsed=!1,this.lineCoverageAvailable=!1,this.branchCoverageAvailable=!1,this.methodCoverageAvailable=!1,this.visibleMetrics=[]}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["","codeelement-row",""]],inputs:{element:"element",collapsed:"collapsed",lineCoverageAvailable:"lineCoverageAvailable",branchCoverageAvailable:"branchCoverageAvailable",methodCoverageAvailable:"methodCoverageAvailable",visibleMetrics:"visibleMetrics"},attrs:kx,decls:19,vars:20,consts:[["href","#",3,"click"],[3,"ngClass"],["class","right",4,"ngIf"],["class","right",3,"title",4,"ngIf"],["class","right",4,"ngFor","ngForOf"],[1,"right"],[1,"right",3,"title"],[3,"percentage"]],template:function(t,r){1&t&&(y(0,"th")(1,"a",0),k("click",function(i){return r.element.toggleCollapse(i)}),x(2,"i",1),b(3),_()(),C(4,Lx,2,1,"th",2),C(5,Vx,2,1,"th",2),C(6,Hx,2,1,"th",2),C(7,Bx,2,1,"th",2),C(8,jx,2,2,"th",3),C(9,$x,2,1,"th",2),C(10,Ux,2,1,"th",2),C(11,zx,2,1,"th",2),C(12,Gx,2,2,"th",3),C(13,Wx,2,1,"th",2),C(14,qx,2,1,"th",2),C(15,Zx,2,1,"th",2),C(16,Yx,2,2,"th",3),C(17,Qx,2,1,"th",2),C(18,Kx,1,0,"th",4)),2&t&&(f(2),g("ngClass",bc(17,Jx,r.element.collapsed,!r.element.collapsed)),f(1),q(" ",r.element.name,""),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngForOf",r.visibleMetrics))},dependencies:[Ho,Vr,Zn,Fy],encapsulation:2,changeDetection:0}),e})();const eO=["coverage-history-chart",""];let tO=(()=>{class e{constructor(){this.path=null,this._historicCoverages=[]}get historicCoverages(){return this._historicCoverages}set historicCoverages(t){if(this._historicCoverages=t,t.length>1){let r="";for(let o=0;o<t.length;o++)r+=0===o?"M":"L",r+=`${Mn.roundNumber(30*o/(t.length-1),1)}`,r+=`,${Mn.roundNumber(18-18*t[o]/100,1)}`;this.path=r}else this.path=null}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["","coverage-history-chart",""]],inputs:{historicCoverages:"historicCoverages"},attrs:eO,decls:3,vars:1,consts:[["width","30","height","18",1,"ct-chart-line"],[1,"ct-series","ct-series-a"],[1,"ct-line"]],template:function(t,r){1&t&&(function wf(){V.lFrame.currentNamespace="svg"}(),y(0,"svg",0)(1,"g",1),x(2,"path",2),_()()),2&t&&(f(2),Et("d",r.path))},encapsulation:2,changeDetection:0}),e})();const nO=["class-row",""];function rO(e,n){if(1&e&&(y(0,"a",5),b(1),_()),2&e){const t=m();g("href",t.clazz.reportPath,mn),f(1),O(t.clazz.name)}}function oO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m();f(1),O(t.clazz.name)}}function iO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.coveredLines,t.clazz.currentHistoricCoverage.cl),""),f(1),q(" ",t.clazz.coveredLines," "),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),q(" ",t.clazz.currentHistoricCoverage.cl," ")}}function sO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.coveredLines," ")}}function aO(e,n){if(1&e&&(y(0,"td",6),C(1,iO,5,6,"ng-container",1),C(2,sO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function lO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.currentHistoricCoverage.ucl,t.clazz.uncoveredLines),""),f(1),q(" ",t.clazz.uncoveredLines," "),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),q(" ",t.clazz.currentHistoricCoverage.ucl," ")}}function cO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.uncoveredLines," ")}}function uO(e,n){if(1&e&&(y(0,"td",6),C(1,lO,5,6,"ng-container",1),C(2,cO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function dO(e,n){if(1&e&&(ee(0),y(1,"div",8),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(2),O(t.clazz.coverableLines),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),O(t.clazz.currentHistoricCoverage.cal)}}function fO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.coverableLines," ")}}function hO(e,n){if(1&e&&(y(0,"td",6),C(1,dO,5,3,"ng-container",1),C(2,fO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function pO(e,n){if(1&e&&(ee(0),y(1,"div",8),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(2),O(t.clazz.totalLines),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),O(t.clazz.currentHistoricCoverage.tl)}}function gO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.totalLines," ")}}function mO(e,n){if(1&e&&(y(0,"td",6),C(1,pO,5,3,"ng-container",1),C(2,gO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}const Zu=function(e){return{historiccoverageoffset:e}};function vO(e,n){if(1&e&&x(0,"div",11),2&e){const t=m(2);_n("title",t.translations.history+": "+t.translations.coverage),g("historicCoverages",t.clazz.lineCoverageHistory)("ngClass",ys(3,Zu,null!==t.clazz.currentHistoricCoverage))}}function _O(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.coverage,t.clazz.currentHistoricCoverage.lcq),""),f(1),q(" ",t.clazz.coveragePercentage," "),f(1),g("title",t.clazz.currentHistoricCoverage.et+": "+t.clazz.currentHistoricCoverage.coverageRatioText),f(1),q("",t.clazz.currentHistoricCoverage.lcq,"%")}}function yO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.coveragePercentage," ")}}function CO(e,n){if(1&e&&(y(0,"td",9),C(1,vO,1,5,"div",10),C(2,_O,5,6,"ng-container",1),C(3,yO,2,1,"ng-container",1),_()),2&e){const t=m();g("title",t.clazz.coverageRatioText),f(1),g("ngIf",t.clazz.lineCoverageHistory.length>1),f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function DO(e,n){if(1&e&&(y(0,"td",6),x(1,"coverage-bar",12),_()),2&e){const t=m();f(1),g("percentage",t.clazz.coverage)}}function wO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.coveredBranches,t.clazz.currentHistoricCoverage.cb),""),f(1),q(" ",t.clazz.coveredBranches," "),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),q(" ",t.clazz.currentHistoricCoverage.cb," ")}}function bO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.coveredBranches," ")}}function EO(e,n){if(1&e&&(y(0,"td",6),C(1,wO,5,6,"ng-container",1),C(2,bO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function MO(e,n){if(1&e&&(ee(0),y(1,"div",8),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(2),O(t.clazz.totalBranches),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),O(t.clazz.currentHistoricCoverage.tb)}}function IO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.totalBranches," ")}}function SO(e,n){if(1&e&&(y(0,"td",6),C(1,MO,5,3,"ng-container",1),C(2,IO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function AO(e,n){if(1&e&&x(0,"div",14),2&e){const t=m(2);_n("title",t.translations.history+": "+t.translations.branchCoverage),g("historicCoverages",t.clazz.branchCoverageHistory)("ngClass",ys(3,Zu,null!==t.clazz.currentHistoricCoverage))}}function TO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.branchCoverage,t.clazz.currentHistoricCoverage.bcq),""),f(1),q(" ",t.clazz.branchCoveragePercentage," "),f(1),g("title",t.clazz.currentHistoricCoverage.et+": "+t.clazz.currentHistoricCoverage.branchCoverageRatioText),f(1),q("",t.clazz.currentHistoricCoverage.bcq,"%")}}function NO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.branchCoveragePercentage," ")}}function xO(e,n){if(1&e&&(y(0,"td",9),C(1,AO,1,5,"div",13),C(2,TO,5,6,"ng-container",1),C(3,NO,2,1,"ng-container",1),_()),2&e){const t=m();g("title",t.clazz.branchCoverageRatioText),f(1),g("ngIf",t.clazz.branchCoverageHistory.length>1),f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function OO(e,n){if(1&e&&(y(0,"td",6),x(1,"coverage-bar",12),_()),2&e){const t=m();f(1),g("percentage",t.clazz.branchCoverage)}}function FO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.coveredMethods,t.clazz.currentHistoricCoverage.cm),""),f(1),q(" ",t.clazz.coveredMethods," "),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),q(" ",t.clazz.currentHistoricCoverage.cm," ")}}function RO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.coveredMethods," ")}}function PO(e,n){if(1&e&&(y(0,"td",6),C(1,FO,5,6,"ng-container",1),C(2,RO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function kO(e,n){if(1&e&&(ee(0),y(1,"div",8),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(2),O(t.clazz.totalMethods),f(1),g("title",t.clazz.currentHistoricCoverage.et),f(1),O(t.clazz.currentHistoricCoverage.tm)}}function LO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.totalMethods," ")}}function VO(e,n){if(1&e&&(y(0,"td",6),C(1,kO,5,3,"ng-container",1),C(2,LO,2,1,"ng-container",1),_()),2&e){const t=m();f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function HO(e,n){if(1&e&&x(0,"div",16),2&e){const t=m(2);_n("title",t.translations.history+": "+t.translations.methodCoverage),g("historicCoverages",t.clazz.methodCoverageHistory)("ngClass",ys(3,Zu,null!==t.clazz.currentHistoricCoverage))}}function BO(e,n){if(1&e&&(ee(0),y(1,"div"),b(2),_(),y(3,"div",7),b(4),_(),te()),2&e){const t=m(2);f(1),Ut("currenthistory ",t.getClassName(t.clazz.methodCoverage,t.clazz.currentHistoricCoverage.mcq),""),f(1),q(" ",t.clazz.methodCoveragePercentage," "),f(1),g("title",t.clazz.currentHistoricCoverage.et+": "+t.clazz.currentHistoricCoverage.methodCoverageRatioText),f(1),q("",t.clazz.currentHistoricCoverage.mcq,"%")}}function jO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),q(" ",t.clazz.methodCoveragePercentage," ")}}function $O(e,n){if(1&e&&(y(0,"td",9),C(1,HO,1,5,"div",15),C(2,BO,5,6,"ng-container",1),C(3,jO,2,1,"ng-container",1),_()),2&e){const t=m();g("title",t.clazz.methodCoverageRatioText),f(1),g("ngIf",t.clazz.methodCoverageHistory.length>1),f(1),g("ngIf",null!==t.clazz.currentHistoricCoverage),f(1),g("ngIf",null===t.clazz.currentHistoricCoverage)}}function UO(e,n){if(1&e&&(y(0,"td",6),x(1,"coverage-bar",12),_()),2&e){const t=m();f(1),g("percentage",t.clazz.methodCoverage)}}function zO(e,n){if(1&e&&(y(0,"td",6),b(1),_()),2&e){const t=n.$implicit,r=m();f(1),O(r.clazz.metrics[t.abbreviation])}}let GO=(()=>{class e{constructor(){this.translations={},this.lineCoverageAvailable=!1,this.branchCoverageAvailable=!1,this.methodCoverageAvailable=!1,this.visibleMetrics=[],this.historyComparisionDate=""}getClassName(t,r){return t>r?"lightgreen":t<r?"lightred":"lightgraybg"}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=Qt({type:e,selectors:[["","class-row",""]],inputs:{clazz:"clazz",translations:"translations",lineCoverageAvailable:"lineCoverageAvailable",branchCoverageAvailable:"branchCoverageAvailable",methodCoverageAvailable:"methodCoverageAvailable",visibleMetrics:"visibleMetrics",historyComparisionDate:"historyComparisionDate"},attrs:nO,decls:18,vars:17,consts:[[3,"href",4,"ngIf"],[4,"ngIf"],["class","right",4,"ngIf"],["class","right",3,"title",4,"ngIf"],["class","right",4,"ngFor","ngForOf"],[3,"href"],[1,"right"],[3,"title"],[1,"currenthistory"],[1,"right",3,"title"],["coverage-history-chart","","class","tinylinecoveragechart ct-chart",3,"historicCoverages","ngClass","title",4,"ngIf"],["coverage-history-chart","",1,"tinylinecoveragechart","ct-chart",3,"historicCoverages","ngClass","title"],[3,"percentage"],["coverage-history-chart","","class","tinybranchcoveragechart ct-chart",3,"historicCoverages","ngClass","title",4,"ngIf"],["coverage-history-chart","",1,"tinybranchcoveragechart","ct-chart",3,"historicCoverages","ngClass","title"],["coverage-history-chart","","class","tinymethodcoveragechart ct-chart",3,"historicCoverages","ngClass","title",4,"ngIf"],["coverage-history-chart","",1,"tinymethodcoveragechart","ct-chart",3,"historicCoverages","ngClass","title"]],template:function(t,r){1&t&&(y(0,"td"),C(1,rO,2,2,"a",0),C(2,oO,2,1,"ng-container",1),_(),C(3,aO,3,2,"td",2),C(4,uO,3,2,"td",2),C(5,hO,3,2,"td",2),C(6,mO,3,2,"td",2),C(7,CO,4,4,"td",3),C(8,DO,2,1,"td",2),C(9,EO,3,2,"td",2),C(10,SO,3,2,"td",2),C(11,xO,4,4,"td",3),C(12,OO,2,1,"td",2),C(13,PO,3,2,"td",2),C(14,VO,3,2,"td",2),C(15,$O,4,4,"td",3),C(16,UO,2,1,"td",2),C(17,zO,2,1,"td",4)),2&t&&(f(1),g("ngIf",""!==r.clazz.reportPath),f(1),g("ngIf",""===r.clazz.reportPath),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.lineCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.branchCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngIf",r.methodCoverageAvailable),f(1),g("ngForOf",r.visibleMetrics))},dependencies:[Ho,Vr,Zn,tO,Fy],encapsulation:2,changeDetection:0}),e})();function WO(e,n){if(1&e){const t=we();y(0,"popup",28),k("visibleChange",function(o){return Y(t),Q(m(2).popupVisible=o)})("showLineCoverageChange",function(o){return Y(t),Q(m(2).settings.showLineCoverage=o)})("showBranchCoverageChange",function(o){return Y(t),Q(m(2).settings.showBranchCoverage=o)})("showMethodCoverageChange",function(o){return Y(t),Q(m(2).settings.showMethodCoverage=o)})("visibleMetricsChange",function(o){return Y(t),Q(m(2).settings.visibleMetrics=o)}),_()}if(2&e){const t=m(2);g("visible",t.popupVisible)("translations",t.translations)("branchCoverageAvailable",t.branchCoverageAvailable)("methodCoverageAvailable",t.methodCoverageAvailable)("metrics",t.metrics)("showLineCoverage",t.settings.showLineCoverage)("showBranchCoverage",t.settings.showBranchCoverage)("showMethodCoverage",t.settings.showMethodCoverage)("visibleMetrics",t.settings.visibleMetrics)}}function qO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),O(t.translations.noGrouping)}}function ZO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),O(t.translations.byAssembly)}}function YO(e,n){if(1&e&&(ee(0),b(1),te()),2&e){const t=m(2);f(1),O(t.translations.byNamespace+" "+t.settings.grouping)}}function QO(e,n){if(1&e&&(y(0,"option",32),b(1),_()),2&e){const t=n.$implicit;g("value",t),f(1),O(t)}}function KO(e,n){1&e&&x(0,"br")}function JO(e,n){if(1&e&&(y(0,"option",40),b(1),_()),2&e){const t=m(4);f(1),q(" ",t.translations.branchCoverageIncreaseOnly," ")}}function XO(e,n){if(1&e&&(y(0,"option",41),b(1),_()),2&e){const t=m(4);f(1),q(" ",t.translations.branchCoverageDecreaseOnly," ")}}function eF(e,n){if(1&e&&(y(0,"option",42),b(1),_()),2&e){const t=m(4);f(1),q(" ",t.translations.methodCoverageIncreaseOnly," ")}}function tF(e,n){if(1&e&&(y(0,"option",43),b(1),_()),2&e){const t=m(4);f(1),q(" ",t.translations.methodCoverageDecreaseOnly," ")}}function nF(e,n){if(1&e){const t=we();y(0,"div")(1,"select",29),k("ngModelChange",function(o){return Y(t),Q(m(3).settings.historyComparisionType=o)}),y(2,"option",30),b(3),_(),y(4,"option",33),b(5),_(),y(6,"option",34),b(7),_(),y(8,"option",35),b(9),_(),C(10,JO,2,1,"option",36),C(11,XO,2,1,"option",37),C(12,eF,2,1,"option",38),C(13,tF,2,1,"option",39),_()()}if(2&e){const t=m(3);f(1),g("ngModel",t.settings.historyComparisionType),f(2),O(t.translations.filter),f(2),O(t.translations.allChanges),f(2),O(t.translations.lineCoverageIncreaseOnly),f(2),O(t.translations.lineCoverageDecreaseOnly),f(1),g("ngIf",t.branchCoverageAvailable),f(1),g("ngIf",t.branchCoverageAvailable),f(1),g("ngIf",t.methodCoverageAvailable),f(1),g("ngIf",t.methodCoverageAvailable)}}function rF(e,n){if(1&e){const t=we();ee(0),y(1,"div"),b(2),y(3,"select",29),k("ngModelChange",function(o){return Y(t),Q(m(2).settings.historyComparisionDate=o)})("ngModelChange",function(){return Y(t),Q(m(2).updateCurrentHistoricCoverage())}),y(4,"option",30),b(5),_(),C(6,QO,2,2,"option",31),_()(),C(7,KO,1,0,"br",0),C(8,nF,14,9,"div",0),te()}if(2&e){const t=m(2);f(2),q(" ",t.translations.compareHistory," "),f(1),g("ngModel",t.settings.historyComparisionDate),f(2),O(t.translations.date),f(1),g("ngForOf",t.historicCoverageExecutionTimes),f(1),g("ngIf",""!==t.settings.historyComparisionDate),f(1),g("ngIf",""!==t.settings.historyComparisionDate)}}function oF(e,n){1&e&&x(0,"col",44)}function iF(e,n){1&e&&x(0,"col",45)}function sF(e,n){1&e&&x(0,"col",46)}function aF(e,n){1&e&&x(0,"col",47)}function lF(e,n){1&e&&x(0,"col",48)}function cF(e,n){1&e&&x(0,"col",49)}function uF(e,n){1&e&&x(0,"col",44)}function dF(e,n){1&e&&x(0,"col",47)}function fF(e,n){1&e&&x(0,"col",48)}function hF(e,n){1&e&&x(0,"col",49)}function pF(e,n){1&e&&x(0,"col",44)}function gF(e,n){1&e&&x(0,"col",47)}function mF(e,n){1&e&&x(0,"col",48)}function vF(e,n){1&e&&x(0,"col",49)}function _F(e,n){1&e&&x(0,"col",49)}function yF(e,n){if(1&e&&(y(0,"th",50),b(1),_()),2&e){const t=m(2);f(1),O(t.translations.coverage)}}function CF(e,n){if(1&e&&(y(0,"th",51),b(1),_()),2&e){const t=m(2);f(1),O(t.translations.branchCoverage)}}function DF(e,n){if(1&e&&(y(0,"th",51),b(1),_()),2&e){const t=m(2);f(1),O(t.translations.methodCoverage)}}function wF(e,n){if(1&e&&(y(0,"th",4),b(1),_()),2&e){const t=m(2);Et("colspan",t.settings.visibleMetrics.length),f(1),O(t.translations.metrics)}}const pt=function(e,n,t){return{"icon-up-dir_active":e,"icon-down-dir_active":n,"icon-down-dir":t}};function bF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("covered",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"covered"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"covered"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"covered"!==t.settings.sortBy)),f(1),O(t.translations.covered)}}function EF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("uncovered",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"uncovered"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"uncovered"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"uncovered"!==t.settings.sortBy)),f(1),O(t.translations.uncovered)}}function MF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("coverable",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"coverable"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"coverable"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"coverable"!==t.settings.sortBy)),f(1),O(t.translations.coverable)}}function IF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("total",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"total"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"total"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"total"!==t.settings.sortBy)),f(1),O(t.translations.total)}}function SF(e,n){if(1&e){const t=we();y(0,"th",52)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("coverage",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"coverage"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"coverage"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"coverage"!==t.settings.sortBy)),f(1),O(t.translations.percentage)}}function AF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("covered_branches",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"covered_branches"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"covered_branches"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"covered_branches"!==t.settings.sortBy)),f(1),O(t.translations.covered)}}function TF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("total_branches",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"total_branches"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"total_branches"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"total_branches"!==t.settings.sortBy)),f(1),O(t.translations.total)}}function NF(e,n){if(1&e){const t=we();y(0,"th",52)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("branchcoverage",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"branchcoverage"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"branchcoverage"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"branchcoverage"!==t.settings.sortBy)),f(1),O(t.translations.percentage)}}function xF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("covered_methods",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"covered_methods"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"covered_methods"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"covered_methods"!==t.settings.sortBy)),f(1),O(t.translations.covered)}}function OF(e,n){if(1&e){const t=we();y(0,"th",6)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("total_methods",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"total_methods"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"total_methods"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"total_methods"!==t.settings.sortBy)),f(1),O(t.translations.total)}}function FF(e,n){if(1&e){const t=we();y(0,"th",52)(1,"a",3),k("click",function(o){return Y(t),Q(m(2).updateSorting("methodcoverage",o))}),x(2,"i",24),b(3),_()()}if(2&e){const t=m(2);f(2),g("ngClass",Ve(2,pt,"methodcoverage"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"methodcoverage"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"methodcoverage"!==t.settings.sortBy)),f(1),O(t.translations.percentage)}}function RF(e,n){if(1&e){const t=we();y(0,"th")(1,"a",3),k("click",function(o){const s=Y(t).$implicit;return Q(m(2).updateSorting(s.abbreviation,o))}),x(2,"i",24),b(3),_(),y(4,"a",53),x(5,"i",54),_()()}if(2&e){const t=n.$implicit,r=m(2);f(2),g("ngClass",Ve(3,pt,r.settings.sortBy===t.abbreviation&&"desc"===r.settings.sortOrder,r.settings.sortBy===t.abbreviation&&"asc"===r.settings.sortOrder,r.settings.sortBy!==t.abbreviation)),f(1),O(t.name),f(1),_n("href",t.explanationUrl,mn)}}function PF(e,n){if(1&e&&x(0,"tr",56),2&e){const t=m().$implicit,r=m(2);g("element",t)("collapsed",t.collapsed)("lineCoverageAvailable",r.settings.showLineCoverage)("branchCoverageAvailable",r.branchCoverageAvailable&&r.settings.showBranchCoverage)("methodCoverageAvailable",r.methodCoverageAvailable&&r.settings.showMethodCoverage)("visibleMetrics",r.settings.visibleMetrics)}}function kF(e,n){if(1&e&&x(0,"tr",58),2&e){const t=m().$implicit,r=m(3);g("clazz",t)("translations",r.translations)("lineCoverageAvailable",r.settings.showLineCoverage)("branchCoverageAvailable",r.branchCoverageAvailable&&r.settings.showBranchCoverage)("methodCoverageAvailable",r.methodCoverageAvailable&&r.settings.showMethodCoverage)("visibleMetrics",r.settings.visibleMetrics)("historyComparisionDate",r.settings.historyComparisionDate)}}function LF(e,n){if(1&e&&(ee(0),C(1,kF,1,7,"tr",57),te()),2&e){const t=n.$implicit,r=m().$implicit,o=m(2);f(1),g("ngIf",!r.collapsed&&t.visible(o.settings.filter,o.settings.historyComparisionType))}}function VF(e,n){if(1&e&&x(0,"tr",61),2&e){const t=m().$implicit,r=m(5);g("clazz",t)("translations",r.translations)("lineCoverageAvailable",r.settings.showLineCoverage)("branchCoverageAvailable",r.branchCoverageAvailable&&r.settings.showBranchCoverage)("methodCoverageAvailable",r.methodCoverageAvailable&&r.settings.showMethodCoverage)("visibleMetrics",r.settings.visibleMetrics)("historyComparisionDate",r.settings.historyComparisionDate)}}function HF(e,n){if(1&e&&(ee(0),C(1,VF,1,7,"tr",60),te()),2&e){const t=n.$implicit,r=m(2).$implicit,o=m(3);f(1),g("ngIf",!r.collapsed&&t.visible(o.settings.filter,o.settings.historyComparisionType))}}function BF(e,n){if(1&e&&(ee(0),x(1,"tr",59),C(2,HF,2,1,"ng-container",27),te()),2&e){const t=m().$implicit,r=m(3);f(1),g("element",t)("collapsed",t.collapsed)("lineCoverageAvailable",r.settings.showLineCoverage)("branchCoverageAvailable",r.branchCoverageAvailable&&r.settings.showBranchCoverage)("methodCoverageAvailable",r.methodCoverageAvailable&&r.settings.showMethodCoverage)("visibleMetrics",r.settings.visibleMetrics),f(1),g("ngForOf",t.classes)}}function jF(e,n){if(1&e&&(ee(0),C(1,BF,3,7,"ng-container",0),te()),2&e){const t=n.$implicit,r=m().$implicit,o=m(2);f(1),g("ngIf",!r.collapsed&&t.visible(o.settings.filter,o.settings.historyComparisionType))}}function $F(e,n){if(1&e&&(ee(0),C(1,PF,1,6,"tr",55),C(2,LF,2,1,"ng-container",27),C(3,jF,2,1,"ng-container",27),te()),2&e){const t=n.$implicit,r=m(2);f(1),g("ngIf",t.visible(r.settings.filter,r.settings.historyComparisionType)),f(1),g("ngForOf",t.classes),f(1),g("ngForOf",t.subElements)}}function UF(e,n){if(1&e){const t=we();y(0,"div"),C(1,WO,1,9,"popup",1),y(2,"div",2)(3,"div")(4,"a",3),k("click",function(o){return Y(t),Q(m().collapseAll(o))}),b(5),_(),b(6," | "),y(7,"a",3),k("click",function(o){return Y(t),Q(m().expandAll(o))}),b(8),_()(),y(9,"div",4),C(10,qO,2,1,"ng-container",0),C(11,ZO,2,1,"ng-container",0),C(12,YO,2,1,"ng-container",0),x(13,"br"),b(14),y(15,"input",5),k("ngModelChange",function(o){return Y(t),Q(m().settings.grouping=o)})("ngModelChange",function(){return Y(t),Q(m().updateCoverageInfo())}),_()(),y(16,"div",4),C(17,rF,9,6,"ng-container",0),_(),y(18,"div",6)(19,"div")(20,"button",7),k("click",function(){return Y(t),Q(m().popupVisible=!0)}),x(21,"i",8),b(22),_()(),x(23,"br"),y(24,"div")(25,"span"),b(26),_(),y(27,"input",9),k("ngModelChange",function(o){return Y(t),Q(m().settings.filter=o)}),_()()()(),y(28,"div",10)(29,"table",11)(30,"colgroup"),x(31,"col",12),C(32,oF,1,0,"col",13),C(33,iF,1,0,"col",14),C(34,sF,1,0,"col",15),C(35,aF,1,0,"col",16),C(36,lF,1,0,"col",17),C(37,cF,1,0,"col",18),C(38,uF,1,0,"col",13),C(39,dF,1,0,"col",16),C(40,fF,1,0,"col",17),C(41,hF,1,0,"col",18),C(42,pF,1,0,"col",13),C(43,gF,1,0,"col",16),C(44,mF,1,0,"col",17),C(45,vF,1,0,"col",18),C(46,_F,1,0,"col",19),_(),y(47,"thead")(48,"tr",20),x(49,"th"),C(50,yF,2,1,"th",21),C(51,CF,2,1,"th",22),C(52,DF,2,1,"th",22),C(53,wF,2,2,"th",23),_(),y(54,"tr")(55,"th")(56,"a",3),k("click",function(o){return Y(t),Q(m().updateSorting("name",o))}),x(57,"i",24),b(58),_()(),C(59,bF,4,6,"th",25),C(60,EF,4,6,"th",25),C(61,MF,4,6,"th",25),C(62,IF,4,6,"th",25),C(63,SF,4,6,"th",26),C(64,AF,4,6,"th",25),C(65,TF,4,6,"th",25),C(66,NF,4,6,"th",26),C(67,xF,4,6,"th",25),C(68,OF,4,6,"th",25),C(69,FF,4,6,"th",26),C(70,RF,6,7,"th",27),_()(),y(71,"tbody"),C(72,$F,4,3,"ng-container",27),_()()()()}if(2&e){const t=m();f(1),g("ngIf",t.popupVisible),f(4),O(t.translations.collapseAll),f(3),O(t.translations.expandAll),f(2),g("ngIf",-1===t.settings.grouping),f(1),g("ngIf",0===t.settings.grouping),f(1),g("ngIf",t.settings.grouping>0),f(2),q(" ",t.translations.grouping," "),f(1),g("max",t.settings.groupingMaximum)("ngModel",t.settings.grouping),f(2),g("ngIf",t.historicCoverageExecutionTimes.length>0),f(5),O(t.metrics.length>0?t.translations.selectCoverageTypesAndMetrics:t.translations.selectCoverageTypes),f(4),q("",t.translations.filter," "),f(1),g("ngModel",t.settings.filter),f(5),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngForOf",t.settings.visibleMetrics),f(4),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.settings.visibleMetrics.length>0),f(4),g("ngClass",Ve(47,pt,"name"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"name"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"name"!==t.settings.sortBy)),f(1),O(t.translations.name),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.settings.showLineCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.branchCoverageAvailable&&t.settings.showBranchCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngIf",t.methodCoverageAvailable&&t.settings.showMethodCoverage),f(1),g("ngForOf",t.settings.visibleMetrics),f(2),g("ngForOf",t.codeElements)}}let zF=(()=>{class e{constructor(t){this.queryString="",this.historicCoverageExecutionTimes=[],this.branchCoverageAvailable=!1,this.methodCoverageAvailable=!1,this.metrics=[],this.codeElements=[],this.translations={},this.popupVisible=!1,this.settings=new wx,this.window=t.nativeWindow}ngOnInit(){this.historicCoverageExecutionTimes=this.window.historicCoverageExecutionTimes,this.branchCoverageAvailable=this.window.branchCoverageAvailable,this.methodCoverageAvailable=this.window.methodCoverageAvailable,this.metrics=this.window.metrics,this.translations=this.window.translations;let t=!1;if(void 0!==this.window.history&&void 0!==this.window.history.replaceState&&null!==this.window.history.state&&null!=this.window.history.state.coverageInfoSettings)console.log("Coverage info: Restoring from history",this.window.history.state.coverageInfoSettings),t=!0,this.settings=JSON.parse(JSON.stringify(this.window.history.state.coverageInfoSettings));else{let o=0,i=this.window.assemblies;for(let s=0;s<i.length;s++)for(let a=0;a<i[s].classes.length;a++)o=Math.max(o,(i[s].classes[a].name.match(/\.|\\/g)||[]).length);this.settings.groupingMaximum=o,console.log("Grouping maximum: "+o),this.settings.showBranchCoverage=this.branchCoverageAvailable,this.settings.showMethodCoverage=this.methodCoverageAvailable}const r=window.location.href.indexOf("?");r>-1&&(this.queryString=window.location.href.substring(r)),this.updateCoverageInfo(),t&&this.restoreCollapseState()}onBeforeUnload(){if(this.saveCollapseState(),void 0!==this.window.history&&void 0!==this.window.history.replaceState){console.log("Coverage info: Updating history",this.settings);let t=new xy;null!==window.history.state&&(t=JSON.parse(JSON.stringify(this.window.history.state))),t.coverageInfoSettings=JSON.parse(JSON.stringify(this.settings)),window.history.replaceState(t,"")}}updateCoverageInfo(){let t=(new Date).getTime(),r=this.window.assemblies,o=[],i=0;if(0===this.settings.grouping)for(let l=0;l<r.length;l++){let c=new In(r[l].name,null);o.push(c);for(let u=0;u<r[l].classes.length;u++)c.insertClass(new Wu(r[l].classes[u],this.queryString),null),i++}else if(-1===this.settings.grouping){let l=new In(this.translations.all,null);o.push(l);for(let c=0;c<r.length;c++)for(let u=0;u<r[c].classes.length;u++)l.insertClass(new Wu(r[c].classes[u],this.queryString),null),i++}else for(let l=0;l<r.length;l++){let c=new In(r[l].name,null);o.push(c);for(let u=0;u<r[l].classes.length;u++)c.insertClass(new Wu(r[l].classes[u],this.queryString),this.settings.grouping),i++}let s=-1,a=1;"name"===this.settings.sortBy&&(s="asc"===this.settings.sortOrder?-1:1,a="asc"===this.settings.sortOrder?1:-1),o.sort(function(l,c){return l.name===c.name?0:l.name<c.name?s:a}),In.sortCodeElementViewModels(o,this.settings.sortBy,"asc"===this.settings.sortOrder);for(let l=0;l<o.length;l++)o[l].changeSorting(this.settings.sortBy,"asc"===this.settings.sortOrder);this.codeElements=o,console.log(`Processing assemblies finished (Duration: ${(new Date).getTime()-t}ms, Assemblies: ${o.length}, Classes: ${i})`),""!==this.settings.historyComparisionDate&&this.updateCurrentHistoricCoverage()}updateCurrentHistoricCoverage(){let t=(new Date).getTime();for(let r=0;r<this.codeElements.length;r++)this.codeElements[r].updateCurrentHistoricCoverage(this.settings.historyComparisionDate);console.log(`Updating current historic coverage finished (Duration: ${(new Date).getTime()-t}ms)`)}collapseAll(t){t.preventDefault();for(let r=0;r<this.codeElements.length;r++)this.codeElements[r].collapse()}expandAll(t){t.preventDefault();for(let r=0;r<this.codeElements.length;r++)this.codeElements[r].expand()}updateSorting(t,r){r.preventDefault(),this.settings.sortOrder=t===this.settings.sortBy&&"asc"===this.settings.sortOrder?"desc":"asc",this.settings.sortBy=t,console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`),In.sortCodeElementViewModels(this.codeElements,this.settings.sortBy,"asc"===this.settings.sortOrder);for(let o=0;o<this.codeElements.length;o++)this.codeElements[o].changeSorting(this.settings.sortBy,"asc"===this.settings.sortOrder)}saveCollapseState(){this.settings.collapseStates=[];let t=r=>{for(let o=0;o<r.length;o++)this.settings.collapseStates.push(r[o].collapsed),t(r[o].subElements)};t(this.codeElements)}restoreCollapseState(){let t=0,r=o=>{for(let i=0;i<o.length;i++)this.settings.collapseStates.length>t&&(o[i].collapsed=this.settings.collapseStates[t]),t++,r(o[i].subElements)};r(this.codeElements)}}return e.\u0275fac=function(t){return new(t||e)(I(qu))},e.\u0275cmp=Qt({type:e,selectors:[["coverage-info"]],hostBindings:function(t,r){1&t&&k("beforeunload",function(){return r.onBeforeUnload()},0,$l)},decls:1,vars:1,consts:[[4,"ngIf"],[3,"visible","translations","branchCoverageAvailable","methodCoverageAvailable","metrics","showLineCoverage","showBranchCoverage","showMethodCoverage","visibleMetrics","visibleChange","showLineCoverageChange","showBranchCoverageChange","showMethodCoverageChange","visibleMetricsChange",4,"ngIf"],[1,"customizebox"],["href","#",3,"click"],[1,"center"],["type","range","step","1","min","-1",3,"max","ngModel","ngModelChange"],[1,"right"],["type","button",3,"click"],[1,"icon-cog"],["type","text",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"overview","table-fixed","stripped"],[1,"column-min-200"],["class","column90",4,"ngIf"],["class","column105",4,"ngIf"],["class","column100",4,"ngIf"],["class","column70",4,"ngIf"],["class","column98",4,"ngIf"],["class","column112",4,"ngIf"],["class","column112",4,"ngFor","ngForOf"],[1,"header"],["class","center","colspan","6",4,"ngIf"],["class","center","colspan","4",4,"ngIf"],["class","center",4,"ngIf"],[1,"icon-down-dir",3,"ngClass"],["class","right",4,"ngIf"],["class","center","colspan","2",4,"ngIf"],[4,"ngFor","ngForOf"],[3,"visible","translations","branchCoverageAvailable","methodCoverageAvailable","metrics","showLineCoverage","showBranchCoverage","showMethodCoverage","visibleMetrics","visibleChange","showLineCoverageChange","showBranchCoverageChange","showMethodCoverageChange","visibleMetricsChange"],[3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["value","allChanges"],["value","lineCoverageIncreaseOnly"],["value","lineCoverageDecreaseOnly"],["value","branchCoverageIncreaseOnly",4,"ngIf"],["value","branchCoverageDecreaseOnly",4,"ngIf"],["value","methodCoverageIncreaseOnly",4,"ngIf"],["value","methodCoverageDecreaseOnly",4,"ngIf"],["value","branchCoverageIncreaseOnly"],["value","branchCoverageDecreaseOnly"],["value","methodCoverageIncreaseOnly"],["value","methodCoverageDecreaseOnly"],[1,"column90"],[1,"column105"],[1,"column100"],[1,"column70"],[1,"column98"],[1,"column112"],["colspan","6",1,"center"],["colspan","4",1,"center"],["colspan","2",1,"center"],["target","_blank",3,"href"],[1,"icon-info-circled"],["codeelement-row","",3,"element","collapsed","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics",4,"ngIf"],["codeelement-row","",3,"element","collapsed","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics"],["class-row","",3,"clazz","translations","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics","historyComparisionDate",4,"ngIf"],["class-row","",3,"clazz","translations","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics","historyComparisionDate"],["codeelement-row","",1,"namespace",3,"element","collapsed","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics"],["class","namespace","class-row","",3,"clazz","translations","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics","historyComparisionDate",4,"ngIf"],["class-row","",1,"namespace",3,"clazz","translations","lineCoverageAvailable","branchCoverageAvailable","methodCoverageAvailable","visibleMetrics","historyComparisionDate"]],template:function(t,r){1&t&&C(0,UF,73,51,"div",0),2&t&&g("ngIf",r.codeElements.length>0)},dependencies:[Ho,Vr,Zn,$u,zu,$o,Vu,Zo,Us,qo,Ox,Xx,GO],encapsulation:2}),e})();class GF{constructor(){this.assembly="",this.numberOfRiskHotspots=10,this.filter="",this.sortBy="",this.sortOrder="asc"}}function WF(e,n){if(1&e&&(y(0,"option",15),b(1),_()),2&e){const t=n.$implicit;g("value",t),f(1),O(t)}}function qF(e,n){if(1&e&&(y(0,"span"),b(1),_()),2&e){const t=m(2);f(1),O(t.translations.top)}}function ZF(e,n){1&e&&(y(0,"option",22),b(1,"20"),_())}function YF(e,n){1&e&&(y(0,"option",23),b(1,"50"),_())}function QF(e,n){1&e&&(y(0,"option",24),b(1,"100"),_())}function KF(e,n){if(1&e&&(y(0,"option",15),b(1),_()),2&e){const t=m(3);g("value",t.totalNumberOfRiskHotspots),f(1),O(t.translations.all)}}function JF(e,n){if(1&e){const t=we();y(0,"select",16),k("ngModelChange",function(o){return Y(t),Q(m(2).settings.numberOfRiskHotspots=o)}),y(1,"option",17),b(2,"10"),_(),C(3,ZF,2,0,"option",18),C(4,YF,2,0,"option",19),C(5,QF,2,0,"option",20),C(6,KF,2,2,"option",21),_()}if(2&e){const t=m(2);g("ngModel",t.settings.numberOfRiskHotspots),f(3),g("ngIf",t.totalNumberOfRiskHotspots>10),f(1),g("ngIf",t.totalNumberOfRiskHotspots>20),f(1),g("ngIf",t.totalNumberOfRiskHotspots>50),f(1),g("ngIf",t.totalNumberOfRiskHotspots>100)}}function XF(e,n){1&e&&x(0,"col",25)}const Js=function(e,n,t){return{"icon-up-dir_active":e,"icon-down-dir_active":n,"icon-down-dir":t}};function eR(e,n){if(1&e){const t=we();y(0,"th")(1,"a",12),k("click",function(o){const s=Y(t).index;return Q(m(2).updateSorting(""+s,o))}),x(2,"i",13),b(3),_(),y(4,"a",26),x(5,"i",27),_()()}if(2&e){const t=n.$implicit,r=n.index,o=m(2);f(2),g("ngClass",Ve(3,Js,o.settings.sortBy===""+r&&"desc"===o.settings.sortOrder,o.settings.sortBy===""+r&&"asc"===o.settings.sortOrder,o.settings.sortBy!==""+r)),f(1),O(t.name),f(1),_n("href",t.explanationUrl,mn)}}const tR=function(e,n){return{lightred:e,lightgreen:n}};function nR(e,n){if(1&e&&(y(0,"td",31),b(1),_()),2&e){const t=n.$implicit;g("ngClass",bc(2,tR,t.exceeded,!t.exceeded)),f(1),O(t.value)}}function rR(e,n){if(1&e&&(y(0,"tr")(1,"td"),b(2),_(),y(3,"td")(4,"a",28),b(5),_()(),y(6,"td",29)(7,"a",28),b(8),_()(),C(9,nR,2,5,"td",30),_()),2&e){const t=n.$implicit,r=m(2);f(2),O(t.assembly),f(2),g("href",t.reportPath+r.queryString,mn),f(1),O(t.class),f(1),g("title",t.methodName),f(1),g("href",t.reportPath+r.queryString+"#file"+t.fileIndex+"_line"+t.line,mn),f(1),q(" ",t.methodShortName," "),f(1),g("ngForOf",t.metrics)}}function oR(e,n){if(1&e){const t=we();y(0,"div")(1,"div",1)(2,"div")(3,"select",2),k("ngModelChange",function(o){return Y(t),Q(m().settings.assembly=o)})("ngModelChange",function(){return Y(t),Q(m().updateRiskHotpots())}),y(4,"option",3),b(5),_(),C(6,WF,2,2,"option",4),_()(),y(7,"div",5),C(8,qF,2,1,"span",0),C(9,JF,7,5,"select",6),_(),x(10,"div",5),y(11,"div",7)(12,"span"),b(13),_(),y(14,"input",8),k("ngModelChange",function(o){return Y(t),Q(m().settings.filter=o)})("ngModelChange",function(){return Y(t),Q(m().updateRiskHotpots())}),_()()(),y(15,"div",9)(16,"table",10)(17,"colgroup"),x(18,"col")(19,"col")(20,"col"),C(21,XF,1,0,"col",11),_(),y(22,"thead")(23,"tr")(24,"th")(25,"a",12),k("click",function(o){return Y(t),Q(m().updateSorting("assembly",o))}),x(26,"i",13),b(27),_()(),y(28,"th")(29,"a",12),k("click",function(o){return Y(t),Q(m().updateSorting("class",o))}),x(30,"i",13),b(31),_()(),y(32,"th")(33,"a",12),k("click",function(o){return Y(t),Q(m().updateSorting("method",o))}),x(34,"i",13),b(35),_()(),C(36,eR,6,7,"th",14),_()(),y(37,"tbody"),C(38,rR,10,7,"tr",14),function xm(e,n){const t=re();let r;const o=e+X;t.firstCreatePass?(r=function t1(e,n){if(n)for(let t=n.length-1;t>=0;t--){const r=n[t];if(e===r.name)return r}}(n,t.pipeRegistry),t.data[o]=r,r.onDestroy&&(t.destroyHooks??=[]).push(o,r.onDestroy)):r=t.data[o];const i=r.factory||(r.factory=kn(r.type)),s=Xe(I);try{const a=Mi(!1),l=i();return Mi(a),function P0(e,n,t,r){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=r}(t,E(),o,l),l}finally{Xe(s)}}(39,"slice"),_()()()()}if(2&e){const t=m();f(3),g("ngModel",t.settings.assembly),f(2),O(t.translations.assembly),f(1),g("ngForOf",t.assemblies),f(2),g("ngIf",t.totalNumberOfRiskHotspots>10),f(1),g("ngIf",t.totalNumberOfRiskHotspots>10),f(4),q("",t.translations.filter," "),f(1),g("ngModel",t.settings.filter),f(7),g("ngForOf",t.riskHotspotMetrics),f(5),g("ngClass",Ve(20,Js,"assembly"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"assembly"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"assembly"!==t.settings.sortBy)),f(1),O(t.translations.assembly),f(3),g("ngClass",Ve(24,Js,"class"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"class"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"class"!==t.settings.sortBy)),f(1),O(t.translations.class),f(3),g("ngClass",Ve(28,Js,"method"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"method"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"method"!==t.settings.sortBy)),f(1),O(t.translations.method),f(1),g("ngForOf",t.riskHotspotMetrics),f(2),g("ngForOf",Om(39,16,t.riskHotspots,0,t.settings.numberOfRiskHotspots))}}let iR=(()=>{class e{constructor(t){this.queryString="",this.riskHotspotMetrics=[],this.riskHotspots=[],this.totalNumberOfRiskHotspots=0,this.assemblies=[],this.translations={},this.settings=new GF,this.window=t.nativeWindow}ngOnInit(){this.riskHotspotMetrics=this.window.riskHotspotMetrics,this.translations=this.window.translations,void 0!==this.window.history&&void 0!==this.window.history.replaceState&&null!==this.window.history.state&&null!=this.window.history.state.riskHotspotsSettings&&(console.log("Risk hotspots: Restoring from history",this.window.history.state.riskHotspotsSettings),this.settings=JSON.parse(JSON.stringify(this.window.history.state.riskHotspotsSettings)));const t=window.location.href.indexOf("?");t>-1&&(this.queryString=window.location.href.substring(t)),this.updateRiskHotpots()}onDonBeforeUnlodad(){if(void 0!==this.window.history&&void 0!==this.window.history.replaceState){console.log("Risk hotspots: Updating history",this.settings);let t=new xy;null!==window.history.state&&(t=JSON.parse(JSON.stringify(this.window.history.state))),t.riskHotspotsSettings=JSON.parse(JSON.stringify(this.settings)),window.history.replaceState(t,"")}}updateRiskHotpots(){const t=this.window.riskHotspots;if(this.totalNumberOfRiskHotspots=t.length,0===this.assemblies.length){let s=[];for(let a=0;a<t.length;a++)-1===s.indexOf(t[a].assembly)&&s.push(t[a].assembly);this.assemblies=s.sort()}let r=[];for(let s=0;s<t.length;s++)""!==this.settings.filter&&-1===t[s].class.toLowerCase().indexOf(this.settings.filter.toLowerCase())||""!==this.settings.assembly&&t[s].assembly!==this.settings.assembly||r.push(t[s]);let o="asc"===this.settings.sortOrder?-1:1,i="asc"===this.settings.sortOrder?1:-1;if("assembly"===this.settings.sortBy)r.sort(function(s,a){return s.assembly===a.assembly?0:s.assembly<a.assembly?o:i});else if("class"===this.settings.sortBy)r.sort(function(s,a){return s.class===a.class?0:s.class<a.class?o:i});else if("method"===this.settings.sortBy)r.sort(function(s,a){return s.methodShortName===a.methodShortName?0:s.methodShortName<a.methodShortName?o:i});else if(""!==this.settings.sortBy){let s=parseInt(this.settings.sortBy,10);r.sort(function(a,l){return a.metrics[s].value===l.metrics[s].value?0:a.metrics[s].value<l.metrics[s].value?o:i})}this.riskHotspots=r}updateSorting(t,r){r.preventDefault(),this.settings.sortOrder=t===this.settings.sortBy&&"asc"===this.settings.sortOrder?"desc":"asc",this.settings.sortBy=t,console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`),this.updateRiskHotpots()}}return e.\u0275fac=function(t){return new(t||e)(I(qu))},e.\u0275cmp=Qt({type:e,selectors:[["risk-hotspots"]],hostBindings:function(t,r){1&t&&k("beforeunload",function(){return r.onDonBeforeUnlodad()},0,$l)},decls:1,vars:1,consts:[[4,"ngIf"],[1,"customizebox"],["name","assembly",3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"center"],[3,"ngModel","ngModelChange",4,"ngIf"],[1,"right"],["type","text",3,"ngModel","ngModelChange"],[1,"table-responsive"],[1,"overview","table-fixed","stripped"],["class","column105",4,"ngFor","ngForOf"],["href","#",3,"click"],[1,"icon-down-dir",3,"ngClass"],[4,"ngFor","ngForOf"],[3,"value"],[3,"ngModel","ngModelChange"],["value","10"],["value","20",4,"ngIf"],["value","50",4,"ngIf"],["value","100",4,"ngIf"],[3,"value",4,"ngIf"],["value","20"],["value","50"],["value","100"],[1,"column105"],["target","_blank",3,"href"],[1,"icon-info-circled"],[3,"href"],[3,"title"],["class","right",3,"ngClass",4,"ngFor","ngForOf"],[1,"right",3,"ngClass"]],template:function(t,r){1&t&&C(0,oR,40,32,"div",0),2&t&&g("ngIf",r.totalNumberOfRiskHotspots>0)},dependencies:[Ho,Vr,Zn,$u,zu,$o,Zo,Us,qo,s_],encapsulation:2}),e})(),sR=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=dn({type:e,bootstrap:[iR,zF]}),e.\u0275inj=Wt({providers:[qu],imports:[lN,Dx]}),e})();sN().bootstrapModule(sR).catch(e=>console.error(e))}},ve=>{ve(ve.s=445)}]);