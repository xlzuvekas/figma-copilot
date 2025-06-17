function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// This is the main code file for the Cursor MCP Figma plugin
// It handles Figma API commands

// Plugin state
var state = {
  serverPort: 3055 // Default port
};

// Helper function for progress updates
function sendProgressUpdate(commandId, commandType, status, progress, totalItems, processedItems, message) {
  var payload = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  var update = {
    type: "command_progress",
    commandId: commandId,
    commandType: commandType,
    status: status,
    progress: progress,
    totalItems: totalItems,
    processedItems: processedItems,
    message: message,
    timestamp: Date.now()
  };

  // Add optional chunk information if present
  if (payload) {
    if (payload.currentChunk !== undefined && payload.totalChunks !== undefined) {
      update.currentChunk = payload.currentChunk;
      update.totalChunks = payload.totalChunks;
      update.chunkSize = payload.chunkSize;
    }
    update.payload = payload;
  }

  // Send to UI
  figma.ui.postMessage(update);
  console.log("Progress update: ".concat(status, " - ").concat(progress, "% - ").concat(message));
  return update;
}

// Show UI
figma.showUI(__html__, {
  width: 350,
  height: 450
});

// Plugin commands from UI
figma.ui.onmessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(msg) {
    var result, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _t = msg.type;
          _context.n = _t === "update-settings" ? 1 : _t === "notify" ? 2 : _t === "close-plugin" ? 3 : _t === "execute-command" ? 4 : 8;
          break;
        case 1:
          updateSettings(msg);
          return _context.a(3, 8);
        case 2:
          figma.notify(msg.message);
          return _context.a(3, 8);
        case 3:
          figma.closePlugin();
          return _context.a(3, 8);
        case 4:
          _context.p = 4;
          _context.n = 5;
          return handleCommand(msg.command, msg.params);
        case 5:
          result = _context.v;
          // Send result back to UI
          figma.ui.postMessage({
            type: "command-result",
            id: msg.id,
            result: result
          });
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t2 = _context.v;
          figma.ui.postMessage({
            type: "command-error",
            id: msg.id,
            error: _t2.message || "Error executing command"
          });
        case 7:
          return _context.a(3, 8);
        case 8:
          return _context.a(2);
      }
    }, _callee, null, [[4, 6]]);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

// Listen for plugin commands from menu
figma.on("run", function (_ref2) {
  var command = _ref2.command;
  figma.ui.postMessage({
    type: "auto-connect"
  });
});

// Update plugin settings
function updateSettings(settings) {
  if (settings.serverPort) {
    state.serverPort = settings.serverPort;
  }
  figma.clientStorage.setAsync("settings", {
    serverPort: state.serverPort
  });
}

// Handle commands from UI
function handleCommand(_x2, _x3) {
  return _handleCommand.apply(this, arguments);
} // Command implementations
function _handleCommand() {
  _handleCommand = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(command, params) {
    var instanceNode, targetNodes, sourceInstanceData, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _t6 = command;
          _context7.n = _t6 === "get_document_info" ? 1 : _t6 === "get_selection" ? 3 : _t6 === "get_node_info" ? 5 : _t6 === "get_nodes_info" ? 8 : _t6 === "read_my_design" ? 11 : _t6 === "create_rectangle" ? 13 : _t6 === "create_frame" ? 15 : _t6 === "create_slide" ? 17 : _t6 === "create_slide_row" ? 19 : _t6 === "set_slide_grid" ? 21 : _t6 === "get_focused_slide" ? 23 : _t6 === "get_slide_transition" ? 25 : _t6 === "set_slide_transition" ? 27 : _t6 === "get_slides_mode" ? 29 : _t6 === "set_slides_mode" ? 31 : _t6 === "get_slide_grid" ? 33 : _t6 === "create_text" ? 35 : _t6 === "create_shape_with_text" ? 37 : _t6 === "create_table" ? 39 : _t6 === "create_gif" ? 41 : _t6 === "set_fill_color" ? 43 : _t6 === "set_stroke_color" ? 45 : _t6 === "move_node" ? 47 : _t6 === "resize_node" ? 49 : _t6 === "delete_node" ? 51 : _t6 === "delete_multiple_nodes" ? 53 : _t6 === "get_styles" ? 55 : _t6 === "get_local_components" ? 57 : _t6 === "create_component_instance" ? 59 : _t6 === "export_node_as_image" ? 61 : _t6 === "set_corner_radius" ? 63 : _t6 === "set_text_content" ? 65 : _t6 === "clone_node" ? 67 : _t6 === "scan_text_nodes" ? 69 : _t6 === "set_multiple_text_contents" ? 71 : _t6 === "get_annotations" ? 73 : _t6 === "set_annotation" ? 75 : _t6 === "scan_nodes_by_types" ? 77 : _t6 === "set_multiple_annotations" ? 79 : _t6 === "get_instance_overrides" ? 81 : _t6 === "set_instance_overrides" ? 87 : _t6 === "set_layout_mode" ? 95 : _t6 === "set_padding" ? 97 : _t6 === "set_axis_align" ? 99 : _t6 === "set_layout_sizing" ? 101 : _t6 === "set_item_spacing" ? 103 : _t6 === "get_reactions" ? 105 : _t6 === "set_default_connector" ? 108 : _t6 === "create_connections" ? 110 : _t6 === "set_text_style_range" ? 112 : _t6 === "get_text_style_range" ? 114 : _t6 === "set_text_decoration_range" ? 116 : _t6 === "get_text_decoration_range" ? 118 : _t6 === "set_range_font" ? 120 : _t6 === "set_range_font_size" ? 122 : _t6 === "set_range_fills" ? 124 : _t6 === "get_styled_text_segments" ? 126 : _t6 === "set_component_description" ? 128 : _t6 === "get_component_description" ? 130 : _t6 === "normalize_markdown" ? 132 : _t6 === "update_text_preserve_formatting" ? 134 : _t6 === "smart_text_replace" ? 136 : _t6 === "set_multiple_text_contents_with_styles" ? 138 : _t6 === "clone_multiple_nodes" ? 140 : _t6 === "get_multiple_nodes_info" ? 142 : _t6 === "set_multiple_nodes_property" ? 144 : _t6 === "scan_nodes_with_options" ? 146 : _t6 === "get_connection_status" ? 148 : _t6 === "execute_batch" ? 150 : 152;
          break;
        case 1:
          _context7.n = 2;
          return getDocumentInfo();
        case 2:
          return _context7.a(2, _context7.v);
        case 3:
          _context7.n = 4;
          return getSelection();
        case 4:
          return _context7.a(2, _context7.v);
        case 5:
          if (!(!params || !params.nodeId)) {
            _context7.n = 6;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 6:
          _context7.n = 7;
          return getNodeInfo(params.nodeId);
        case 7:
          return _context7.a(2, _context7.v);
        case 8:
          if (!(!params || !params.nodeIds || !Array.isArray(params.nodeIds))) {
            _context7.n = 9;
            break;
          }
          throw new Error("Missing or invalid nodeIds parameter");
        case 9:
          _context7.n = 10;
          return getNodesInfo(params.nodeIds);
        case 10:
          return _context7.a(2, _context7.v);
        case 11:
          _context7.n = 12;
          return readMyDesign();
        case 12:
          return _context7.a(2, _context7.v);
        case 13:
          _context7.n = 14;
          return createRectangle(params);
        case 14:
          return _context7.a(2, _context7.v);
        case 15:
          _context7.n = 16;
          return createFrame(params);
        case 16:
          return _context7.a(2, _context7.v);
        case 17:
          _context7.n = 18;
          return createSlide(params);
        case 18:
          return _context7.a(2, _context7.v);
        case 19:
          _context7.n = 20;
          return createSlideRow(params);
        case 20:
          return _context7.a(2, _context7.v);
        case 21:
          _context7.n = 22;
          return setSlideGrid(params);
        case 22:
          return _context7.a(2, _context7.v);
        case 23:
          _context7.n = 24;
          return getFocusedSlide();
        case 24:
          return _context7.a(2, _context7.v);
        case 25:
          _context7.n = 26;
          return getSlideTransition(params);
        case 26:
          return _context7.a(2, _context7.v);
        case 27:
          _context7.n = 28;
          return setSlideTransition(params);
        case 28:
          return _context7.a(2, _context7.v);
        case 29:
          _context7.n = 30;
          return getSlidesMode();
        case 30:
          return _context7.a(2, _context7.v);
        case 31:
          _context7.n = 32;
          return setSlidesMode(params);
        case 32:
          return _context7.a(2, _context7.v);
        case 33:
          _context7.n = 34;
          return getSlideGrid();
        case 34:
          return _context7.a(2, _context7.v);
        case 35:
          _context7.n = 36;
          return createText(params);
        case 36:
          return _context7.a(2, _context7.v);
        case 37:
          _context7.n = 38;
          return createShapeWithText(params);
        case 38:
          return _context7.a(2, _context7.v);
        case 39:
          _context7.n = 40;
          return createTable(params);
        case 40:
          return _context7.a(2, _context7.v);
        case 41:
          _context7.n = 42;
          return createGif(params);
        case 42:
          return _context7.a(2, _context7.v);
        case 43:
          _context7.n = 44;
          return setFillColor(params);
        case 44:
          return _context7.a(2, _context7.v);
        case 45:
          _context7.n = 46;
          return setStrokeColor(params);
        case 46:
          return _context7.a(2, _context7.v);
        case 47:
          _context7.n = 48;
          return moveNode(params);
        case 48:
          return _context7.a(2, _context7.v);
        case 49:
          _context7.n = 50;
          return resizeNode(params);
        case 50:
          return _context7.a(2, _context7.v);
        case 51:
          _context7.n = 52;
          return deleteNode(params);
        case 52:
          return _context7.a(2, _context7.v);
        case 53:
          _context7.n = 54;
          return deleteMultipleNodes(params);
        case 54:
          return _context7.a(2, _context7.v);
        case 55:
          _context7.n = 56;
          return getStyles();
        case 56:
          return _context7.a(2, _context7.v);
        case 57:
          _context7.n = 58;
          return getLocalComponents();
        case 58:
          return _context7.a(2, _context7.v);
        case 59:
          _context7.n = 60;
          return createComponentInstance(params);
        case 60:
          return _context7.a(2, _context7.v);
        case 61:
          _context7.n = 62;
          return exportNodeAsImage(params);
        case 62:
          return _context7.a(2, _context7.v);
        case 63:
          _context7.n = 64;
          return setCornerRadius(params);
        case 64:
          return _context7.a(2, _context7.v);
        case 65:
          _context7.n = 66;
          return setTextContent(params);
        case 66:
          return _context7.a(2, _context7.v);
        case 67:
          _context7.n = 68;
          return cloneNode(params);
        case 68:
          return _context7.a(2, _context7.v);
        case 69:
          _context7.n = 70;
          return scanTextNodes(params);
        case 70:
          return _context7.a(2, _context7.v);
        case 71:
          _context7.n = 72;
          return setMultipleTextContents(params);
        case 72:
          return _context7.a(2, _context7.v);
        case 73:
          _context7.n = 74;
          return getAnnotations(params);
        case 74:
          return _context7.a(2, _context7.v);
        case 75:
          _context7.n = 76;
          return setAnnotation(params);
        case 76:
          return _context7.a(2, _context7.v);
        case 77:
          _context7.n = 78;
          return scanNodesByTypes(params);
        case 78:
          return _context7.a(2, _context7.v);
        case 79:
          _context7.n = 80;
          return setMultipleAnnotations(params);
        case 80:
          return _context7.a(2, _context7.v);
        case 81:
          if (!(params && params.instanceNodeId)) {
            _context7.n = 85;
            break;
          }
          _context7.n = 82;
          return figma.getNodeByIdAsync(params.instanceNodeId);
        case 82:
          instanceNode = _context7.v;
          if (instanceNode) {
            _context7.n = 83;
            break;
          }
          throw new Error("Instance node not found with ID: ".concat(params.instanceNodeId));
        case 83:
          _context7.n = 84;
          return getInstanceOverrides(instanceNode);
        case 84:
          return _context7.a(2, _context7.v);
        case 85:
          _context7.n = 86;
          return getInstanceOverrides();
        case 86:
          return _context7.a(2, _context7.v);
        case 87:
          if (!(params && params.targetNodeIds)) {
            _context7.n = 95;
            break;
          }
          if (Array.isArray(params.targetNodeIds)) {
            _context7.n = 88;
            break;
          }
          throw new Error("targetNodeIds must be an array");
        case 88:
          _context7.n = 89;
          return getValidTargetInstances(params.targetNodeIds);
        case 89:
          targetNodes = _context7.v;
          if (targetNodes.success) {
            _context7.n = 90;
            break;
          }
          figma.notify(targetNodes.message);
          return _context7.a(2, {
            success: false,
            message: targetNodes.message
          });
        case 90:
          if (!params.sourceInstanceId) {
            _context7.n = 94;
            break;
          }
          // get source instance data
          sourceInstanceData = null;
          _context7.n = 91;
          return getSourceInstanceData(params.sourceInstanceId);
        case 91:
          sourceInstanceData = _context7.v;
          if (sourceInstanceData.success) {
            _context7.n = 92;
            break;
          }
          figma.notify(sourceInstanceData.message);
          return _context7.a(2, {
            success: false,
            message: sourceInstanceData.message
          });
        case 92:
          _context7.n = 93;
          return setInstanceOverrides(targetNodes.targetInstances, sourceInstanceData);
        case 93:
          return _context7.a(2, _context7.v);
        case 94:
          throw new Error("Missing sourceInstanceId parameter");
        case 95:
          _context7.n = 96;
          return setLayoutMode(params);
        case 96:
          return _context7.a(2, _context7.v);
        case 97:
          _context7.n = 98;
          return setPadding(params);
        case 98:
          return _context7.a(2, _context7.v);
        case 99:
          _context7.n = 100;
          return setAxisAlign(params);
        case 100:
          return _context7.a(2, _context7.v);
        case 101:
          _context7.n = 102;
          return setLayoutSizing(params);
        case 102:
          return _context7.a(2, _context7.v);
        case 103:
          _context7.n = 104;
          return setItemSpacing(params);
        case 104:
          return _context7.a(2, _context7.v);
        case 105:
          if (!(!params || !params.nodeIds || !Array.isArray(params.nodeIds))) {
            _context7.n = 106;
            break;
          }
          throw new Error("Missing or invalid nodeIds parameter");
        case 106:
          _context7.n = 107;
          return getReactions(params.nodeIds);
        case 107:
          return _context7.a(2, _context7.v);
        case 108:
          _context7.n = 109;
          return setDefaultConnector(params);
        case 109:
          return _context7.a(2, _context7.v);
        case 110:
          _context7.n = 111;
          return createConnections(params);
        case 111:
          return _context7.a(2, _context7.v);
        case 112:
          _context7.n = 113;
          return setTextStyleRange(params);
        case 113:
          return _context7.a(2, _context7.v);
        case 114:
          _context7.n = 115;
          return getTextStyleRange(params);
        case 115:
          return _context7.a(2, _context7.v);
        case 116:
          _context7.n = 117;
          return setTextDecorationRange(params);
        case 117:
          return _context7.a(2, _context7.v);
        case 118:
          _context7.n = 119;
          return getTextDecorationRange(params);
        case 119:
          return _context7.a(2, _context7.v);
        case 120:
          _context7.n = 121;
          return setRangeFont(params);
        case 121:
          return _context7.a(2, _context7.v);
        case 122:
          _context7.n = 123;
          return setRangeFontSize(params);
        case 123:
          return _context7.a(2, _context7.v);
        case 124:
          _context7.n = 125;
          return setRangeFills(params);
        case 125:
          return _context7.a(2, _context7.v);
        case 126:
          _context7.n = 127;
          return getStyledTextSegments(params);
        case 127:
          return _context7.a(2, _context7.v);
        case 128:
          _context7.n = 129;
          return setComponentDescription(params);
        case 129:
          return _context7.a(2, _context7.v);
        case 130:
          _context7.n = 131;
          return getComponentDescription(params);
        case 131:
          return _context7.a(2, _context7.v);
        case 132:
          _context7.n = 133;
          return normalizeMarkdown(params);
        case 133:
          return _context7.a(2, _context7.v);
        case 134:
          _context7.n = 135;
          return updateTextPreserveFormatting(params);
        case 135:
          return _context7.a(2, _context7.v);
        case 136:
          _context7.n = 137;
          return smartTextReplace(params);
        case 137:
          return _context7.a(2, _context7.v);
        case 138:
          _context7.n = 139;
          return setMultipleTextContentsWithStyles(params);
        case 139:
          return _context7.a(2, _context7.v);
        case 140:
          _context7.n = 141;
          return cloneMultipleNodes(params);
        case 141:
          return _context7.a(2, _context7.v);
        case 142:
          _context7.n = 143;
          return getMultipleNodesInfo(params);
        case 143:
          return _context7.a(2, _context7.v);
        case 144:
          _context7.n = 145;
          return setMultipleNodesProperty(params);
        case 145:
          return _context7.a(2, _context7.v);
        case 146:
          _context7.n = 147;
          return scanNodesWithOptions(params);
        case 147:
          return _context7.a(2, _context7.v);
        case 148:
          _context7.n = 149;
          return getConnectionStatus(params);
        case 149:
          return _context7.a(2, _context7.v);
        case 150:
          _context7.n = 151;
          return executeBatch(params);
        case 151:
          return _context7.a(2, _context7.v);
        case 152:
          throw new Error("Unknown command: ".concat(command));
        case 153:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return _handleCommand.apply(this, arguments);
}
function getDocumentInfo() {
  return _getDocumentInfo.apply(this, arguments);
}
function _getDocumentInfo() {
  _getDocumentInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
    var page;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return figma.currentPage.loadAsync();
        case 1:
          page = figma.currentPage;
          return _context8.a(2, {
            name: page.name,
            id: page.id,
            type: page.type,
            children: page.children.map(function (node) {
              return {
                id: node.id,
                name: node.name,
                type: node.type
              };
            }),
            currentPage: {
              id: page.id,
              name: page.name,
              childCount: page.children.length
            },
            pages: [{
              id: page.id,
              name: page.name,
              childCount: page.children.length
            }]
          });
      }
    }, _callee8);
  }));
  return _getDocumentInfo.apply(this, arguments);
}
function getSelection() {
  return _getSelection.apply(this, arguments);
}
function _getSelection() {
  _getSelection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          return _context9.a(2, {
            selectionCount: figma.currentPage.selection.length,
            selection: figma.currentPage.selection.map(function (node) {
              return {
                id: node.id,
                name: node.name,
                type: node.type,
                visible: node.visible
              };
            })
          });
      }
    }, _callee9);
  }));
  return _getSelection.apply(this, arguments);
}
function rgbaToHex(color) {
  var r = Math.round(color.r * 255);
  var g = Math.round(color.g * 255);
  var b = Math.round(color.b * 255);
  var a = color.a !== undefined ? Math.round(color.a * 255) : 255;
  if (a === 255) {
    return "#" + [r, g, b].map(function (x) {
      return x.toString(16).padStart(2, "0");
    }).join("");
  }
  return "#" + [r, g, b, a].map(function (x) {
    return x.toString(16).padStart(2, "0");
  }).join("");
}
function filterFigmaNode(node) {
  if (node.type === "VECTOR") {
    return null;
  }
  var filtered = {
    id: node.id,
    name: node.name,
    type: node.type
  };

  // Handle slide-specific node types
  if (node.type === "SLIDE") {
    filtered.width = 1920;
    filtered.height = 1080;
  } else if (node.type === "INTERACTIVE_SLIDE_ELEMENT") {
    filtered.interactiveSlideElementType = node.interactiveSlideElementType;
    filtered.x = node.x;
    filtered.y = node.y;
    filtered.width = node.width;
    filtered.height = node.height;
  }
  if (node.fills && node.fills.length > 0) {
    filtered.fills = node.fills.map(function (fill) {
      var processedFill = Object.assign({}, fill);
      delete processedFill.boundVariables;
      delete processedFill.imageRef;
      if (processedFill.gradientStops) {
        processedFill.gradientStops = processedFill.gradientStops.map(function (stop) {
          var processedStop = Object.assign({}, stop);
          if (processedStop.color) {
            processedStop.color = rgbaToHex(processedStop.color);
          }
          delete processedStop.boundVariables;
          return processedStop;
        });
      }
      if (processedFill.color) {
        processedFill.color = rgbaToHex(processedFill.color);
      }
      return processedFill;
    });
  }
  if (node.strokes && node.strokes.length > 0) {
    filtered.strokes = node.strokes.map(function (stroke) {
      var processedStroke = Object.assign({}, stroke);
      delete processedStroke.boundVariables;
      if (processedStroke.color) {
        processedStroke.color = rgbaToHex(processedStroke.color);
      }
      return processedStroke;
    });
  }
  if (node.cornerRadius !== undefined) {
    filtered.cornerRadius = node.cornerRadius;
  }
  if (node.absoluteBoundingBox) {
    filtered.absoluteBoundingBox = node.absoluteBoundingBox;
  }
  if (node.characters) {
    filtered.characters = node.characters;
  }
  if (node.style) {
    filtered.style = {
      fontFamily: node.style.fontFamily,
      fontStyle: node.style.fontStyle,
      fontWeight: node.style.fontWeight,
      fontSize: node.style.fontSize,
      textAlignHorizontal: node.style.textAlignHorizontal,
      letterSpacing: node.style.letterSpacing,
      lineHeightPx: node.style.lineHeightPx
    };
  }
  if (node.children) {
    filtered.children = node.children.map(function (child) {
      return filterFigmaNode(child);
    }).filter(function (child) {
      return child !== null;
    });
  }
  return filtered;
}
function getNodeInfo(_x4) {
  return _getNodeInfo.apply(this, arguments);
}
function _getNodeInfo() {
  _getNodeInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(nodeId) {
    var currentPage, slides, slideRows, node, response, _error$message, _error$message2, _t7, _t8;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          if (!(nodeId === "0:3" || nodeId.includes(":3"))) {
            _context0.n = 4;
            break;
          }
          _context0.p = 1;
          currentPage = figma.currentPage;
          if (!(figma.editorType === "slides")) {
            _context0.n = 2;
            break;
          }
          // For Figma Slides, return information about the slide structure
          slides = currentPage.findAll(function (n) {
            return n.type === 'SLIDE';
          });
          slideRows = currentPage.findAll(function (n) {
            return n.type === 'SLIDE_ROW';
          });
          return _context0.a(2, {
            id: nodeId,
            name: "Slide Grid",
            type: "SLIDE_GRID",
            editorType: figma.editorType,
            slideCount: slides.length,
            rowCount: slideRows.length,
            message: "SLIDE_GRID nodes cannot be accessed directly. Use scan_nodes_by_types or get_slide_grid instead.",
            alternativeTools: ["scan_nodes_by_types", "get_slide_grid", "get_document_info"],
            pageInfo: {
              id: currentPage.id,
              name: currentPage.name,
              type: currentPage.type
            }
          });
        case 2:
          _context0.n = 4;
          break;
        case 3:
          _context0.p = 3;
          _t7 = _context0.v;
          return _context0.a(2, {
            id: nodeId,
            type: "SLIDE_GRID",
            error: "SLIDE_GRID node cannot be accessed directly",
            message: "This is a special node type in Figma Slides. Use scan_nodes_by_types with SLIDE and SLIDE_ROW types instead.",
            alternativeTools: ["scan_nodes_by_types", "get_slide_grid", "get_document_info"]
          });
        case 4:
          _context0.p = 4;
          _context0.n = 5;
          return figma.getNodeByIdAsync(nodeId);
        case 5:
          node = _context0.v;
          if (node) {
            _context0.n = 7;
            break;
          }
          if (!(figma.editorType === "slides")) {
            _context0.n = 6;
            break;
          }
          return _context0.a(2, {
            id: nodeId,
            error: "Node not found with ID: ".concat(nodeId),
            message: "This might be a special node type. Try using scan_nodes_by_types or get_document_info instead.",
            alternativeTools: ["scan_nodes_by_types", "get_document_info", "get_slide_grid"]
          });
        case 6:
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 7:
          _context0.n = 8;
          return node.exportAsync({
            format: "JSON_REST_V1"
          });
        case 8:
          response = _context0.v;
          return _context0.a(2, filterFigmaNode(response.document));
        case 9:
          _context0.p = 9;
          _t8 = _context0.v;
          if (!((_error$message = _t8.message) !== null && _error$message !== void 0 && _error$message.includes("cannot read property") || (_error$message2 = _t8.message) !== null && _error$message2 !== void 0 && _error$message2.includes("null"))) {
            _context0.n = 10;
            break;
          }
          return _context0.a(2, {
            id: nodeId,
            error: _t8.message,
            message: "This node type may require special handling. Try using scan_nodes_by_types or get_document_info instead.",
            alternativeTools: ["scan_nodes_by_types", "get_document_info", "get_slide_grid"],
            editorType: figma.editorType
          });
        case 10:
          throw _t8;
        case 11:
          return _context0.a(2);
      }
    }, _callee0, null, [[4, 9], [1, 3]]);
  }));
  return _getNodeInfo.apply(this, arguments);
}
function getNodesInfo(_x5) {
  return _getNodesInfo.apply(this, arguments);
}
function _getNodesInfo() {
  _getNodesInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(nodeIds) {
    var nodes, validNodes, responses, _t9;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return Promise.all(nodeIds.map(function (id) {
            return figma.getNodeByIdAsync(id);
          }));
        case 1:
          nodes = _context10.v;
          // Filter out any null values (nodes that weren't found)
          validNodes = nodes.filter(function (node) {
            return node !== null;
          }); // Export all valid nodes in parallel
          _context10.n = 2;
          return Promise.all(validNodes.map(/*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(node) {
              var response;
              return _regenerator().w(function (_context1) {
                while (1) switch (_context1.n) {
                  case 0:
                    _context1.n = 1;
                    return node.exportAsync({
                      format: "JSON_REST_V1"
                    });
                  case 1:
                    response = _context1.v;
                    return _context1.a(2, {
                      nodeId: node.id,
                      document: filterFigmaNode(response.document)
                    });
                }
              }, _callee1);
            }));
            return function (_x85) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 2:
          responses = _context10.v;
          return _context10.a(2, responses);
        case 3:
          _context10.p = 3;
          _t9 = _context10.v;
          throw new Error("Error getting nodes info: ".concat(_t9.message));
        case 4:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 3]]);
  }));
  return _getNodesInfo.apply(this, arguments);
}
function getReactions(_x6) {
  return _getReactions.apply(this, arguments);
}
function _getReactions() {
  _getReactions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(nodeIds) {
    var commandId, findNodesWithReactions, _findNodesWithReactions, highlightNodeWithAnimation, _highlightNodeWithAnimation, getNodePath, allResults, processedCount, totalCount, i, nodeId, node, processedNodes, nodeResults, _t1, _t10;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.p = 0;
          getNodePath = function _getNodePath(node) {
            var path = [];
            var current = node;
            while (current && current.parent) {
              path.unshift(current.name);
              current = current.parent;
            }
            return path.join(' > ');
          };
          _highlightNodeWithAnimation = function _highlightNodeWithAni2() {
            _highlightNodeWithAnimation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(node) {
              var originalStrokeWeight, originalStrokes;
              return _regenerator().w(function (_context12) {
                while (1) switch (_context12.n) {
                  case 0:
                    // Save original stroke properties
                    originalStrokeWeight = node.strokeWeight;
                    originalStrokes = node.strokes ? _toConsumableArray(node.strokes) : [];
                    try {
                      // Apply orange border stroke
                      node.strokeWeight = 4;
                      node.strokes = [{
                        type: 'SOLID',
                        color: {
                          r: 1,
                          g: 0.5,
                          b: 0
                        },
                        // Orange color
                        opacity: 0.8
                      }];

                      // Set timeout for animation effect (restore to original after 1.5 seconds)
                      setTimeout(function () {
                        try {
                          // Restore original stroke properties
                          node.strokeWeight = originalStrokeWeight;
                          node.strokes = originalStrokes;
                        } catch (restoreError) {
                          console.error("Error restoring node stroke: ".concat(restoreError.message));
                        }
                      }, 1500);
                    } catch (highlightError) {
                      console.error("Error highlighting node: ".concat(highlightError.message));
                      // Continue even if highlighting fails
                    }
                  case 1:
                    return _context12.a(2);
                }
              }, _callee12);
            }));
            return _highlightNodeWithAnimation.apply(this, arguments);
          };
          highlightNodeWithAnimation = function _highlightNodeWithAni(_x87) {
            return _highlightNodeWithAnimation.apply(this, arguments);
          };
          _findNodesWithReactions = function _findNodesWithReactio2() {
            _findNodesWithReactions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(node) {
              var processedNodes,
                depth,
                results,
                filteredReactions,
                hasFilteredReactions,
                _iterator,
                _step,
                child,
                _args11 = arguments,
                _t0;
              return _regenerator().w(function (_context11) {
                while (1) switch (_context11.n) {
                  case 0:
                    processedNodes = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : new Set();
                    depth = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 0;
                    results = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : [];
                    if (!processedNodes.has(node.id)) {
                      _context11.n = 1;
                      break;
                    }
                    return _context11.a(2, results);
                  case 1:
                    processedNodes.add(node.id);

                    // Check if the current node has reactions
                    filteredReactions = [];
                    if (node.reactions && node.reactions.length > 0) {
                      // Filter out reactions with navigation === 'CHANGE_TO'
                      filteredReactions = node.reactions.filter(function (r) {
                        // Some reactions may have action or actions array
                        if (r.action && r.action.navigation === 'CHANGE_TO') return false;
                        if (Array.isArray(r.actions)) {
                          // If any action in actions array is CHANGE_TO, exclude
                          return !r.actions.some(function (a) {
                            return a.navigation === 'CHANGE_TO';
                          });
                        }
                        return true;
                      });
                    }
                    hasFilteredReactions = filteredReactions.length > 0; // If the node has filtered reactions, add it to results and apply highlight effect
                    if (!hasFilteredReactions) {
                      _context11.n = 2;
                      break;
                    }
                    results.push({
                      id: node.id,
                      name: node.name,
                      type: node.type,
                      depth: depth,
                      hasReactions: true,
                      reactions: filteredReactions,
                      path: getNodePath(node)
                    });
                    // Apply highlight effect (orange border)
                    _context11.n = 2;
                    return highlightNodeWithAnimation(node);
                  case 2:
                    if (!node.children) {
                      _context11.n = 9;
                      break;
                    }
                    _iterator = _createForOfIteratorHelper(node.children);
                    _context11.p = 3;
                    _iterator.s();
                  case 4:
                    if ((_step = _iterator.n()).done) {
                      _context11.n = 6;
                      break;
                    }
                    child = _step.value;
                    _context11.n = 5;
                    return findNodesWithReactions(child, processedNodes, depth + 1, results);
                  case 5:
                    _context11.n = 4;
                    break;
                  case 6:
                    _context11.n = 8;
                    break;
                  case 7:
                    _context11.p = 7;
                    _t0 = _context11.v;
                    _iterator.e(_t0);
                  case 8:
                    _context11.p = 8;
                    _iterator.f();
                    return _context11.f(8);
                  case 9:
                    return _context11.a(2, results);
                }
              }, _callee11, null, [[3, 7, 8, 9]]);
            }));
            return _findNodesWithReactions.apply(this, arguments);
          };
          findNodesWithReactions = function _findNodesWithReactio(_x86) {
            return _findNodesWithReactions.apply(this, arguments);
          };
          commandId = generateCommandId();
          sendProgressUpdate(commandId, "get_reactions", "started", 0, nodeIds.length, 0, "Starting deep search for reactions in ".concat(nodeIds.length, " nodes and their children"));

          // Function to find nodes with reactions from the node and all its children

          // Function to apply animated highlight effect to a node

          // Get node hierarchy path as a string
          // Array to store all results
          allResults = [];
          processedCount = 0;
          totalCount = nodeIds.length; // Iterate through each node and its children to search for reactions
          i = 0;
        case 1:
          if (!(i < nodeIds.length)) {
            _context13.n = 8;
            break;
          }
          _context13.p = 2;
          nodeId = nodeIds[i];
          _context13.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context13.v;
          if (node) {
            _context13.n = 4;
            break;
          }
          processedCount++;
          sendProgressUpdate(commandId, "get_reactions", "in_progress", processedCount / totalCount, totalCount, processedCount, "Node not found: ".concat(nodeId));
          return _context13.a(3, 7);
        case 4:
          // Search for reactions in the node and its children
          processedNodes = new Set();
          _context13.n = 5;
          return findNodesWithReactions(node, processedNodes);
        case 5:
          nodeResults = _context13.v;
          // Add results
          allResults = allResults.concat(nodeResults);

          // Update progress
          processedCount++;
          sendProgressUpdate(commandId, "get_reactions", "in_progress", processedCount / totalCount, totalCount, processedCount, "Processed node ".concat(processedCount, "/").concat(totalCount, ", found ").concat(nodeResults.length, " nodes with reactions"));
          _context13.n = 7;
          break;
        case 6:
          _context13.p = 6;
          _t1 = _context13.v;
          processedCount++;
          sendProgressUpdate(commandId, "get_reactions", "in_progress", processedCount / totalCount, totalCount, processedCount, "Error processing node: ".concat(_t1.message));
        case 7:
          i++;
          _context13.n = 1;
          break;
        case 8:
          // Completion update
          sendProgressUpdate(commandId, "get_reactions", "completed", 1, totalCount, totalCount, "Completed deep search: found ".concat(allResults.length, " nodes with reactions."));
          return _context13.a(2, {
            nodesCount: nodeIds.length,
            nodesWithReactions: allResults.length,
            nodes: allResults
          });
        case 9:
          _context13.p = 9;
          _t10 = _context13.v;
          throw new Error("Failed to get reactions: ".concat(_t10.message));
        case 10:
          return _context13.a(2);
      }
    }, _callee13, null, [[2, 6], [0, 9]]);
  }));
  return _getReactions.apply(this, arguments);
}
function readMyDesign() {
  return _readMyDesign.apply(this, arguments);
}
function _readMyDesign() {
  _readMyDesign = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
    var nodes, validNodes, responses, _t11;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return Promise.all(figma.currentPage.selection.map(function (node) {
            return figma.getNodeByIdAsync(node.id);
          }));
        case 1:
          nodes = _context15.v;
          // Filter out any null values (nodes that weren't found)
          validNodes = nodes.filter(function (node) {
            return node !== null;
          }); // Export all valid nodes in parallel
          _context15.n = 2;
          return Promise.all(validNodes.map(/*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(node) {
              var response;
              return _regenerator().w(function (_context14) {
                while (1) switch (_context14.n) {
                  case 0:
                    _context14.n = 1;
                    return node.exportAsync({
                      format: "JSON_REST_V1"
                    });
                  case 1:
                    response = _context14.v;
                    return _context14.a(2, {
                      nodeId: node.id,
                      document: filterFigmaNode(response.document)
                    });
                }
              }, _callee14);
            }));
            return function (_x88) {
              return _ref14.apply(this, arguments);
            };
          }()));
        case 2:
          responses = _context15.v;
          return _context15.a(2, responses);
        case 3:
          _context15.p = 3;
          _t11 = _context15.v;
          throw new Error("Error getting nodes info: ".concat(_t11.message));
        case 4:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 3]]);
  }));
  return _readMyDesign.apply(this, arguments);
}
function createRectangle(_x7) {
  return _createRectangle.apply(this, arguments);
}
function _createRectangle() {
  _createRectangle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(params) {
    var _ref15, _ref15$x, x, _ref15$y, y, _ref15$width, width, _ref15$height, height, _ref15$name, name, parentId, rect, parentNode;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          _ref15 = params || {}, _ref15$x = _ref15.x, x = _ref15$x === void 0 ? 0 : _ref15$x, _ref15$y = _ref15.y, y = _ref15$y === void 0 ? 0 : _ref15$y, _ref15$width = _ref15.width, width = _ref15$width === void 0 ? 100 : _ref15$width, _ref15$height = _ref15.height, height = _ref15$height === void 0 ? 100 : _ref15$height, _ref15$name = _ref15.name, name = _ref15$name === void 0 ? "Rectangle" : _ref15$name, parentId = _ref15.parentId;
          rect = figma.createRectangle();
          rect.x = x;
          rect.y = y;
          rect.resize(width, height);
          rect.name = name;

          // If parentId is provided, append to that node, otherwise append to current page
          if (!parentId) {
            _context16.n = 4;
            break;
          }
          _context16.n = 1;
          return figma.getNodeByIdAsync(parentId);
        case 1:
          parentNode = _context16.v;
          if (parentNode) {
            _context16.n = 2;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 2:
          if ("appendChild" in parentNode) {
            _context16.n = 3;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 3:
          parentNode.appendChild(rect);
          _context16.n = 5;
          break;
        case 4:
          figma.currentPage.appendChild(rect);
        case 5:
          return _context16.a(2, {
            id: rect.id,
            name: rect.name,
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            parentId: rect.parent ? rect.parent.id : undefined
          });
      }
    }, _callee16);
  }));
  return _createRectangle.apply(this, arguments);
}
function createFrame(_x8) {
  return _createFrame.apply(this, arguments);
} // Helper functions for slide coordinate transformation
function _createFrame() {
  _createFrame = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(params) {
    var _ref16, _ref16$x, x, _ref16$y, y, _ref16$width, width, _ref16$height, height, _ref16$name, name, parentId, fillColor, strokeColor, strokeWeight, _ref16$layoutMode, layoutMode, _ref16$layoutWrap, layoutWrap, _ref16$paddingTop, paddingTop, _ref16$paddingRight, paddingRight, _ref16$paddingBottom, paddingBottom, _ref16$paddingLeft, paddingLeft, _ref16$primaryAxisAli, primaryAxisAlignItems, _ref16$counterAxisAli, counterAxisAlignItems, _ref16$layoutSizingHo, layoutSizingHorizontal, _ref16$layoutSizingVe, layoutSizingVertical, _ref16$itemSpacing, itemSpacing, frame, paintStyle, strokeStyle, parentNode;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          _ref16 = params || {}, _ref16$x = _ref16.x, x = _ref16$x === void 0 ? 0 : _ref16$x, _ref16$y = _ref16.y, y = _ref16$y === void 0 ? 0 : _ref16$y, _ref16$width = _ref16.width, width = _ref16$width === void 0 ? 100 : _ref16$width, _ref16$height = _ref16.height, height = _ref16$height === void 0 ? 100 : _ref16$height, _ref16$name = _ref16.name, name = _ref16$name === void 0 ? "Frame" : _ref16$name, parentId = _ref16.parentId, fillColor = _ref16.fillColor, strokeColor = _ref16.strokeColor, strokeWeight = _ref16.strokeWeight, _ref16$layoutMode = _ref16.layoutMode, layoutMode = _ref16$layoutMode === void 0 ? "NONE" : _ref16$layoutMode, _ref16$layoutWrap = _ref16.layoutWrap, layoutWrap = _ref16$layoutWrap === void 0 ? "NO_WRAP" : _ref16$layoutWrap, _ref16$paddingTop = _ref16.paddingTop, paddingTop = _ref16$paddingTop === void 0 ? 10 : _ref16$paddingTop, _ref16$paddingRight = _ref16.paddingRight, paddingRight = _ref16$paddingRight === void 0 ? 10 : _ref16$paddingRight, _ref16$paddingBottom = _ref16.paddingBottom, paddingBottom = _ref16$paddingBottom === void 0 ? 10 : _ref16$paddingBottom, _ref16$paddingLeft = _ref16.paddingLeft, paddingLeft = _ref16$paddingLeft === void 0 ? 10 : _ref16$paddingLeft, _ref16$primaryAxisAli = _ref16.primaryAxisAlignItems, primaryAxisAlignItems = _ref16$primaryAxisAli === void 0 ? "MIN" : _ref16$primaryAxisAli, _ref16$counterAxisAli = _ref16.counterAxisAlignItems, counterAxisAlignItems = _ref16$counterAxisAli === void 0 ? "MIN" : _ref16$counterAxisAli, _ref16$layoutSizingHo = _ref16.layoutSizingHorizontal, layoutSizingHorizontal = _ref16$layoutSizingHo === void 0 ? "FIXED" : _ref16$layoutSizingHo, _ref16$layoutSizingVe = _ref16.layoutSizingVertical, layoutSizingVertical = _ref16$layoutSizingVe === void 0 ? "FIXED" : _ref16$layoutSizingVe, _ref16$itemSpacing = _ref16.itemSpacing, itemSpacing = _ref16$itemSpacing === void 0 ? 0 : _ref16$itemSpacing;
          frame = figma.createFrame();
          frame.x = x;
          frame.y = y;
          frame.resize(width, height);
          frame.name = name;

          // Set layout mode if provided
          if (layoutMode !== "NONE") {
            frame.layoutMode = layoutMode;
            frame.layoutWrap = layoutWrap;

            // Set padding values only when layoutMode is not NONE
            frame.paddingTop = paddingTop;
            frame.paddingRight = paddingRight;
            frame.paddingBottom = paddingBottom;
            frame.paddingLeft = paddingLeft;

            // Set axis alignment only when layoutMode is not NONE
            frame.primaryAxisAlignItems = primaryAxisAlignItems;
            frame.counterAxisAlignItems = counterAxisAlignItems;

            // Set layout sizing only when layoutMode is not NONE
            frame.layoutSizingHorizontal = layoutSizingHorizontal;
            frame.layoutSizingVertical = layoutSizingVertical;

            // Set item spacing only when layoutMode is not NONE
            frame.itemSpacing = itemSpacing;
          }

          // Set fill color if provided
          if (fillColor) {
            paintStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(fillColor.r) || 0,
                g: parseFloat(fillColor.g) || 0,
                b: parseFloat(fillColor.b) || 0
              },
              opacity: parseFloat(fillColor.a) || 1
            };
            frame.fills = [paintStyle];
          }

          // Set stroke color and weight if provided
          if (strokeColor) {
            strokeStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(strokeColor.r) || 0,
                g: parseFloat(strokeColor.g) || 0,
                b: parseFloat(strokeColor.b) || 0
              },
              opacity: parseFloat(strokeColor.a) || 1
            };
            frame.strokes = [strokeStyle];
          }

          // Set stroke weight if provided
          if (strokeWeight !== undefined) {
            frame.strokeWeight = strokeWeight;
          }

          // If parentId is provided, append to that node, otherwise append to current page
          if (!parentId) {
            _context17.n = 4;
            break;
          }
          _context17.n = 1;
          return figma.getNodeByIdAsync(parentId);
        case 1:
          parentNode = _context17.v;
          if (parentNode) {
            _context17.n = 2;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 2:
          if ("appendChild" in parentNode) {
            _context17.n = 3;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 3:
          parentNode.appendChild(frame);
          _context17.n = 5;
          break;
        case 4:
          figma.currentPage.appendChild(frame);
        case 5:
          return _context17.a(2, {
            id: frame.id,
            name: frame.name,
            x: frame.x,
            y: frame.y,
            width: frame.width,
            height: frame.height,
            fills: frame.fills,
            strokes: frame.strokes,
            strokeWeight: frame.strokeWeight,
            layoutMode: frame.layoutMode,
            layoutWrap: frame.layoutWrap,
            parentId: frame.parent ? frame.parent.id : undefined
          });
      }
    }, _callee17);
  }));
  return _createFrame.apply(this, arguments);
}
function getSlidePosition(slide) {
  // Slides are positioned in absolute coordinates
  // Return the slide's absolute position
  return {
    x: slide.x,
    y: slide.y
  };
}
function toAbsoluteCoordinates(slide, localX, localY) {
  // Convert local slide coordinates to absolute document coordinates
  var slidePos = getSlidePosition(slide);
  return {
    x: slidePos.x + localX,
    y: slidePos.y + localY
  };
}
function toLocalCoordinates(slide, absoluteX, absoluteY) {
  // Convert absolute document coordinates to local slide coordinates
  var slidePos = getSlidePosition(slide);
  return {
    x: absoluteX - slidePos.x,
    y: absoluteY - slidePos.y
  };
}
function getTargetSlide(_x9) {
  return _getTargetSlide.apply(this, arguments);
}
function _getTargetSlide() {
  _getTargetSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(parentId) {
    var parent, current;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.n) {
        case 0:
          if (!parentId) {
            _context18.n = 5;
            break;
          }
          _context18.n = 1;
          return figma.getNodeByIdAsync(parentId);
        case 1:
          parent = _context18.v;
          if (!(parent && parent.type === 'SLIDE')) {
            _context18.n = 2;
            break;
          }
          return _context18.a(2, parent);
        case 2:
          // If parent is not a slide, traverse up to find the containing slide
          current = parent;
        case 3:
          if (!(current && current.parent)) {
            _context18.n = 5;
            break;
          }
          if (!(current.type === 'SLIDE')) {
            _context18.n = 4;
            break;
          }
          return _context18.a(2, current);
        case 4:
          current = current.parent;
          _context18.n = 3;
          break;
        case 5:
          if (!(figma.editorType === 'slides' && figma.currentPage.focusedSlide)) {
            _context18.n = 6;
            break;
          }
          return _context18.a(2, figma.currentPage.focusedSlide);
        case 6:
          return _context18.a(2, null);
      }
    }, _callee18);
  }));
  return _getTargetSlide.apply(this, arguments);
}
function createSlide(_x0) {
  return _createSlide.apply(this, arguments);
}
function _createSlide() {
  _createSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(params) {
    var _ref17, _ref17$name, name, parentId, fillColor, strokeColor, strokeWeight, slide, paintStyle, strokeStyle, parentNode, slideRows, slideRow;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.n) {
        case 0:
          _ref17 = params || {}, _ref17$name = _ref17.name, name = _ref17$name === void 0 ? "Slide" : _ref17$name, parentId = _ref17.parentId, fillColor = _ref17.fillColor, strokeColor = _ref17.strokeColor, strokeWeight = _ref17.strokeWeight; // Check if we're in a Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context19.n = 1;
            break;
          }
          throw new Error("createSlide can only be used in Figma Slides documents");
        case 1:
          if (!(typeof figma.createSlide !== 'function')) {
            _context19.n = 2;
            break;
          }
          throw new Error("createSlide API is not available. Please ensure you're using the latest version of Figma with Slides support.");
        case 2:
          slide = figma.createSlide();
          slide.name = name;

          // Set fill color if provided
          if (fillColor) {
            paintStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(fillColor.r) || 0,
                g: parseFloat(fillColor.g) || 0,
                b: parseFloat(fillColor.b) || 0
              },
              opacity: parseFloat(fillColor.a) || 1
            };
            slide.fills = [paintStyle];
          }

          // Set stroke color if provided
          if (strokeColor) {
            strokeStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(strokeColor.r) || 0,
                g: parseFloat(strokeColor.g) || 0,
                b: parseFloat(strokeColor.b) || 0
              },
              opacity: parseFloat(strokeColor.a) || 1
            };
            slide.strokes = [strokeStyle];
          }

          // Set stroke weight if provided
          if (strokeWeight !== undefined) {
            slide.strokeWeight = strokeWeight;
          }

          // If parentId is provided, append to that node (should be a SLIDE_ROW)
          if (!parentId) {
            _context19.n = 6;
            break;
          }
          _context19.n = 3;
          return figma.getNodeByIdAsync(parentId);
        case 3:
          parentNode = _context19.v;
          if (parentNode) {
            _context19.n = 4;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 4:
          if (!(parentNode.type !== "SLIDE_ROW")) {
            _context19.n = 5;
            break;
          }
          throw new Error("Parent node must be a SLIDE_ROW, got: ".concat(parentNode.type));
        case 5:
          parentNode.appendChild(slide);
          _context19.n = 9;
          break;
        case 6:
          // Find or create a slide row
          slideRows = figma.currentPage.children.filter(function (node) {
            return node.type === "SLIDE_ROW";
          });
          if (!(slideRows.length > 0)) {
            _context19.n = 7;
            break;
          }
          slideRows[0].appendChild(slide);
          _context19.n = 9;
          break;
        case 7:
          if (!(typeof figma.createSlideRow !== 'function')) {
            _context19.n = 8;
            break;
          }
          throw new Error("createSlideRow API is not available. Please ensure you're using the latest version of Figma with Slides support.");
        case 8:
          slideRow = figma.createSlideRow();
          figma.currentPage.appendChild(slideRow);
          slideRow.appendChild(slide);
        case 9:
          return _context19.a(2, {
            id: slide.id,
            name: slide.name,
            type: slide.type,
            width: slide.width,
            height: slide.height,
            fills: slide.fills,
            strokes: slide.strokes,
            strokeWeight: slide.strokeWeight,
            parentId: slide.parent ? slide.parent.id : undefined
          });
      }
    }, _callee19);
  }));
  return _createSlide.apply(this, arguments);
}
function createSlideRow(_x1) {
  return _createSlideRow.apply(this, arguments);
}
function _createSlideRow() {
  _createSlideRow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(params) {
    var _ref18, _ref18$name, name, parentId, slideRow, parentNode;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.n) {
        case 0:
          _ref18 = params || {}, _ref18$name = _ref18.name, name = _ref18$name === void 0 ? "Slide Row" : _ref18$name, parentId = _ref18.parentId; // Check if we're in a Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context20.n = 1;
            break;
          }
          throw new Error("createSlideRow can only be used in Figma Slides documents");
        case 1:
          if (!(typeof figma.createSlideRow !== 'function')) {
            _context20.n = 2;
            break;
          }
          throw new Error("createSlideRow API is not available. Please ensure you're using the latest version of Figma with Slides support.");
        case 2:
          slideRow = figma.createSlideRow();
          slideRow.name = name;

          // Slide rows are typically added to the current page
          if (!parentId) {
            _context20.n = 6;
            break;
          }
          _context20.n = 3;
          return figma.getNodeByIdAsync(parentId);
        case 3:
          parentNode = _context20.v;
          if (parentNode) {
            _context20.n = 4;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 4:
          if ("appendChild" in parentNode) {
            _context20.n = 5;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 5:
          parentNode.appendChild(slideRow);
          _context20.n = 7;
          break;
        case 6:
          figma.currentPage.appendChild(slideRow);
        case 7:
          return _context20.a(2, {
            id: slideRow.id,
            name: slideRow.name,
            type: slideRow.type,
            parentId: slideRow.parent ? slideRow.parent.id : undefined
          });
      }
    }, _callee20);
  }));
  return _createSlideRow.apply(this, arguments);
}
function setSlideGrid(_x10) {
  return _setSlideGrid.apply(this, arguments);
}
function _setSlideGrid() {
  _setSlideGrid = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(params) {
    var _ref19, slides, slideArrangements, _iterator2, _step2, _row, slideNodes, _iterator3, _step3, _slideId, node, SLIDE_WIDTH, SLIDE_HEIGHT, SPACING, START_X, START_Y, updatedCount, rowIndex, row, colIndex, slideId, slide, _t12, _t13, _t14;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.n) {
        case 0:
          _ref19 = params || {}, slides = _ref19.slides; // Check if we're in a Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context21.n = 1;
            break;
          }
          throw new Error("setSlideGrid can only be used in Figma Slides documents");
        case 1:
          if (!(!slides || !Array.isArray(slides))) {
            _context21.n = 2;
            break;
          }
          throw new Error("slides parameter must be an array of slide arrangements");
        case 2:
          _context21.p = 2;
          // Validate and convert slide IDs to nodes first
          slideArrangements = [];
          _iterator2 = _createForOfIteratorHelper(slides);
          _context21.p = 3;
          _iterator2.s();
        case 4:
          if ((_step2 = _iterator2.n()).done) {
            _context21.n = 15;
            break;
          }
          _row = _step2.value;
          slideNodes = [];
          _iterator3 = _createForOfIteratorHelper(_row);
          _context21.p = 5;
          _iterator3.s();
        case 6:
          if ((_step3 = _iterator3.n()).done) {
            _context21.n = 10;
            break;
          }
          _slideId = _step3.value;
          _context21.n = 7;
          return figma.getNodeByIdAsync(_slideId);
        case 7:
          node = _context21.v;
          if (!(!node || node.type !== "SLIDE")) {
            _context21.n = 8;
            break;
          }
          throw new Error("Invalid slide ID: ".concat(_slideId));
        case 8:
          slideNodes.push(node);
        case 9:
          _context21.n = 6;
          break;
        case 10:
          _context21.n = 12;
          break;
        case 11:
          _context21.p = 11;
          _t12 = _context21.v;
          _iterator3.e(_t12);
        case 12:
          _context21.p = 12;
          _iterator3.f();
          return _context21.f(12);
        case 13:
          slideArrangements.push(slideNodes);
        case 14:
          _context21.n = 4;
          break;
        case 15:
          _context21.n = 17;
          break;
        case 16:
          _context21.p = 16;
          _t13 = _context21.v;
          _iterator2.e(_t13);
        case 17:
          _context21.p = 17;
          _iterator2.f();
          return _context21.f(17);
        case 18:
          if (!(typeof figma.setSlideGrid === 'function')) {
            _context21.n = 19;
            break;
          }
          // Apply the new slide grid arrangement
          figma.setSlideGrid(slideArrangements);
          return _context21.a(2, {
            success: true,
            message: "Slide grid updated with ".concat(slides.length, " rows"),
            method: 'figma.setSlideGrid'
          });
        case 19:
          if (!(typeof figma.currentPage.setSlideGrid === 'function')) {
            _context21.n = 20;
            break;
          }
          // Apply the new slide grid arrangement
          figma.currentPage.setSlideGrid(slideArrangements);
          return _context21.a(2, {
            success: true,
            message: "Slide grid updated with ".concat(slides.length, " rows"),
            method: 'figma.currentPage.setSlideGrid'
          });
        case 20:
          // Manual fallback implementation: manually arrange slides by position
          // Constants for slide spacing (based on standard slide dimensions)
          SLIDE_WIDTH = 1920;
          SLIDE_HEIGHT = 1080;
          SPACING = 240;
          START_X = 240;
          START_Y = 240;
          updatedCount = 0;
          rowIndex = 0;
        case 21:
          if (!(rowIndex < slides.length)) {
            _context21.n = 26;
            break;
          }
          row = slides[rowIndex];
          colIndex = 0;
        case 22:
          if (!(colIndex < row.length)) {
            _context21.n = 25;
            break;
          }
          slideId = row[colIndex];
          _context21.n = 23;
          return figma.getNodeByIdAsync(slideId);
        case 23:
          slide = _context21.v;
          if (slide && slide.type === 'SLIDE') {
            slide.x = START_X + colIndex * (SLIDE_WIDTH + SPACING);
            slide.y = START_Y + rowIndex * (SLIDE_HEIGHT + SPACING);
            updatedCount++;
          }
        case 24:
          colIndex++;
          _context21.n = 22;
          break;
        case 25:
          rowIndex++;
          _context21.n = 21;
          break;
        case 26:
          return _context21.a(2, {
            success: true,
            message: "Manually positioned ".concat(updatedCount, " slides in ").concat(slides.length, " rows"),
            method: 'manual'
          });
        case 27:
          _context21.n = 29;
          break;
        case 28:
          _context21.p = 28;
          _t14 = _context21.v;
          throw new Error("Failed to set slide grid: ".concat(_t14.message));
        case 29:
          return _context21.a(2);
      }
    }, _callee21, null, [[5, 11, 12, 13], [3, 16, 17, 18], [2, 28]]);
  }));
  return _setSlideGrid.apply(this, arguments);
}
function getFocusedSlide() {
  return _getFocusedSlide.apply(this, arguments);
}
function _getFocusedSlide() {
  _getFocusedSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
    var focusedSlide;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.n) {
        case 0:
          if (!(figma.editorType !== "slides")) {
            _context22.n = 1;
            break;
          }
          throw new Error("getFocusedSlide can only be used in Figma Slides documents");
        case 1:
          focusedSlide = figma.currentPage.focusedSlide;
          if (focusedSlide) {
            _context22.n = 2;
            break;
          }
          return _context22.a(2, {
            focusedSlide: null,
            message: "No slide is currently focused"
          });
        case 2:
          return _context22.a(2, {
            focusedSlide: {
              id: focusedSlide.id,
              name: focusedSlide.name,
              type: focusedSlide.type,
              width: focusedSlide.width,
              height: focusedSlide.height
            }
          });
      }
    }, _callee22);
  }));
  return _getFocusedSlide.apply(this, arguments);
}
function getSlideTransition(_x11) {
  return _getSlideTransition.apply(this, arguments);
}
function _getSlideTransition() {
  _getSlideTransition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(params) {
    var _ref20, slideId, slide, transition;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.n) {
        case 0:
          _ref20 = params || {}, slideId = _ref20.slideId; // Check if we're in Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context23.n = 1;
            break;
          }
          throw new Error("getSlideTransition can only be used in Figma Slides documents");
        case 1:
          if (slideId) {
            _context23.n = 2;
            break;
          }
          throw new Error("Missing slideId parameter");
        case 2:
          _context23.n = 3;
          return figma.getNodeByIdAsync(slideId);
        case 3:
          slide = _context23.v;
          if (slide) {
            _context23.n = 4;
            break;
          }
          throw new Error("Slide not found with ID: ".concat(slideId));
        case 4:
          if (!(slide.type !== "SLIDE")) {
            _context23.n = 5;
            break;
          }
          throw new Error("Node is not a slide: ".concat(slideId));
        case 5:
          transition = slide.getSlideTransition();
          return _context23.a(2, {
            slideId: slideId,
            transition: transition
          });
      }
    }, _callee23);
  }));
  return _getSlideTransition.apply(this, arguments);
}
function setSlideTransition(_x12) {
  return _setSlideTransition.apply(this, arguments);
}
function _setSlideTransition() {
  _setSlideTransition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(params) {
    var _ref21, slideId, transition, slide, validStyles, validCurves;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.n) {
        case 0:
          _ref21 = params || {}, slideId = _ref21.slideId, transition = _ref21.transition; // Check if we're in Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context24.n = 1;
            break;
          }
          throw new Error("setSlideTransition can only be used in Figma Slides documents");
        case 1:
          if (slideId) {
            _context24.n = 2;
            break;
          }
          throw new Error("Missing slideId parameter");
        case 2:
          if (transition) {
            _context24.n = 3;
            break;
          }
          throw new Error("Missing transition parameter");
        case 3:
          _context24.n = 4;
          return figma.getNodeByIdAsync(slideId);
        case 4:
          slide = _context24.v;
          if (slide) {
            _context24.n = 5;
            break;
          }
          throw new Error("Slide not found with ID: ".concat(slideId));
        case 5:
          if (!(slide.type !== "SLIDE")) {
            _context24.n = 6;
            break;
          }
          throw new Error("Node is not a slide: ".concat(slideId));
        case 6:
          // Validate transition properties
          validStyles = ['NONE', 'DISSOLVE', 'SLIDE_FROM_LEFT', 'SLIDE_FROM_RIGHT', 'SLIDE_FROM_TOP', 'SLIDE_FROM_BOTTOM', 'PUSH_FROM_LEFT', 'PUSH_FROM_RIGHT', 'PUSH_FROM_TOP', 'PUSH_FROM_BOTTOM', 'MOVE_FROM_LEFT', 'MOVE_FROM_RIGHT', 'MOVE_FROM_TOP', 'MOVE_FROM_BOTTOM', 'SLIDE_OUT_TO_LEFT', 'SLIDE_OUT_TO_RIGHT', 'SLIDE_OUT_TO_TOP', 'SLIDE_OUT_TO_BOTTOM', 'MOVE_OUT_TO_LEFT', 'MOVE_OUT_TO_RIGHT', 'MOVE_OUT_TO_TOP', 'MOVE_OUT_TO_BOTTOM', 'SMART_ANIMATE'];
          validCurves = ['LINEAR', 'EASE_IN', 'EASE_OUT', 'EASE_IN_AND_OUT', 'EASE_IN_BACK', 'EASE_OUT_BACK', 'EASE_IN_AND_OUT_BACK'];
          if (!(transition.style && !validStyles.includes(transition.style))) {
            _context24.n = 7;
            break;
          }
          throw new Error("Invalid transition style: ".concat(transition.style));
        case 7:
          if (!(transition.curve && !validCurves.includes(transition.curve))) {
            _context24.n = 8;
            break;
          }
          throw new Error("Invalid transition curve: ".concat(transition.curve));
        case 8:
          if (!(transition.duration !== undefined && (transition.duration < 0.01 || transition.duration > 10))) {
            _context24.n = 9;
            break;
          }
          throw new Error("Transition duration must be between 0.01 and 10 seconds");
        case 9:
          if (!(transition.timing && transition.timing.type !== 'ON_CLICK' && transition.timing.type !== 'AFTER_DELAY')) {
            _context24.n = 10;
            break;
          }
          throw new Error("Invalid timing type. Must be 'ON_CLICK' or 'AFTER_DELAY'");
        case 10:
          if (!(transition.timing && transition.timing.type === 'AFTER_DELAY' && transition.timing.delay !== undefined)) {
            _context24.n = 11;
            break;
          }
          if (!(transition.timing.delay < 0 || transition.timing.delay > 30)) {
            _context24.n = 11;
            break;
          }
          throw new Error("Transition delay must be between 0 and 30 seconds");
        case 11:
          slide.setSlideTransition(transition);
          return _context24.a(2, {
            success: true,
            slideId: slideId,
            transition: slide.getSlideTransition()
          });
      }
    }, _callee24);
  }));
  return _setSlideTransition.apply(this, arguments);
}
function getSlidesMode() {
  return _getSlidesMode.apply(this, arguments);
}
function _getSlidesMode() {
  _getSlidesMode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
    var mode, modeMap, _t15;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.n) {
        case 0:
          if (!(figma.editorType !== "slides")) {
            _context25.n = 1;
            break;
          }
          throw new Error("getSlidesMode can only be used in Figma Slides documents");
        case 1:
          _context25.p = 1;
          if (!(figma.viewport && 'slidesMode' in figma.viewport)) {
            _context25.n = 2;
            break;
          }
          mode = figma.viewport.slidesMode; // Map API values back to our expected values
          modeMap = {
            'GRID': 'grid',
            'SINGLE_SLIDE': 'single-slide'
          };
          return _context25.a(2, {
            mode: modeMap[mode] || mode
          });
        case 2:
          throw new Error("Slides mode API not available in current Figma version");
        case 3:
          _context25.n = 5;
          break;
        case 4:
          _context25.p = 4;
          _t15 = _context25.v;
          throw new Error("Failed to get slides mode: ".concat(_t15.message));
        case 5:
          return _context25.a(2);
      }
    }, _callee25, null, [[1, 4]]);
  }));
  return _getSlidesMode.apply(this, arguments);
}
function setSlidesMode(_x13) {
  return _setSlidesMode.apply(this, arguments);
}
function _setSlidesMode() {
  _setSlidesMode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(params) {
    var _ref22, mode, modeMap, mappedMode, _t16;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.n) {
        case 0:
          _ref22 = params || {}, mode = _ref22.mode; // Check if we're in Figma Slides document
          if (!(figma.editorType !== "slides")) {
            _context26.n = 1;
            break;
          }
          throw new Error("setSlidesMode can only be used in Figma Slides documents");
        case 1:
          if (mode) {
            _context26.n = 2;
            break;
          }
          throw new Error("Missing mode parameter");
        case 2:
          if (!(mode !== 'grid' && mode !== 'single-slide')) {
            _context26.n = 3;
            break;
          }
          throw new Error("Invalid mode. Must be 'grid' or 'single-slide'");
        case 3:
          _context26.p = 3;
          if (!(figma.viewport && 'slidesMode' in figma.viewport)) {
            _context26.n = 7;
            break;
          }
          // Try to set the slides mode
          modeMap = {
            'grid': 'GRID',
            'single-slide': 'SINGLE_SLIDE'
          }; // Use the mapped value or original if mapping doesn't exist
          mappedMode = modeMap[mode] || mode; // Try different approaches to set the mode
          if (!(typeof figma.viewport.setViewMode === 'function')) {
            _context26.n = 5;
            break;
          }
          _context26.n = 4;
          return figma.viewport.setViewMode(mappedMode);
        case 4:
          _context26.n = 6;
          break;
        case 5:
          // Try direct assignment
          figma.viewport.slidesMode = mappedMode;
        case 6:
          return _context26.a(2, {
            success: true,
            mode: mode
          });
        case 7:
          throw new Error("Slides mode API not available in current Figma version");
        case 8:
          _context26.n = 10;
          break;
        case 9:
          _context26.p = 9;
          _t16 = _context26.v;
          throw new Error("Failed to set slides mode: ".concat(_t16.message));
        case 10:
          return _context26.a(2);
      }
    }, _callee26, null, [[3, 9]]);
  }));
  return _setSlidesMode.apply(this, arguments);
}
function getSlideGrid() {
  return _getSlideGrid.apply(this, arguments);
}
function _getSlideGrid() {
  _getSlideGrid = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
    var slides, slideRows, rowToSlidesMap, slideToRowMap, grid, rowInfo, sortedRows, orphanedSlides, SLIDE_HEIGHT, SPACING, ROW_HEIGHT, orphansByRow, _t17;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.n) {
        case 0:
          if (!(figma.editorType !== "slides")) {
            _context27.n = 1;
            break;
          }
          throw new Error("getSlideGrid can only be used in Figma Slides documents");
        case 1:
          _context27.p = 1;
          // Primary method: Use proven scanning approach that works reliably
          // Find all slides and slide rows using the same approach as scan_nodes_by_types
          slides = figma.currentPage.findAll(function (n) {
            return n.type === 'SLIDE';
          });
          slideRows = figma.currentPage.findAll(function (n) {
            return n.type === 'SLIDE_ROW';
          });
          if (!(slides.length === 0)) {
            _context27.n = 2;
            break;
          }
          return _context27.a(2, {
            grid: [],
            totalSlides: 0,
            rows: 0,
            slideRows: [],
            method: 'scanning',
            message: 'No slides found in the presentation'
          });
        case 2:
          // Build a map of slide row IDs to their slides
          rowToSlidesMap = {};
          slideToRowMap = {}; // First, map each slide to its parent row
          slides.forEach(function (slide) {
            var parent = slide.parent;
            while (parent && parent.type !== 'SLIDE_ROW') {
              parent = parent.parent;
            }
            if (parent && parent.type === 'SLIDE_ROW') {
              slideToRowMap[slide.id] = parent.id;
              if (!rowToSlidesMap[parent.id]) {
                rowToSlidesMap[parent.id] = [];
              }
              rowToSlidesMap[parent.id].push(slide);
            }
          });

          // Create grid structure based on slide rows
          grid = [];
          rowInfo = []; // Sort slide rows by their Y position to maintain order
          sortedRows = _toConsumableArray(slideRows).sort(function (a, b) {
            return a.y - b.y;
          });
          sortedRows.forEach(function (row) {
            var slidesInRow = rowToSlidesMap[row.id] || [];

            // Sort slides in each row by X position
            var sortedSlidesInRow = slidesInRow.sort(function (a, b) {
              return a.x - b.x;
            }).map(function (slide) {
              return {
                id: slide.id,
                name: slide.name,
                type: slide.type,
                x: slide.x,
                y: slide.y,
                width: slide.width,
                height: slide.height
              };
            });
            if (sortedSlidesInRow.length > 0) {
              grid.push(sortedSlidesInRow);
              rowInfo.push({
                id: row.id,
                name: row.name,
                slideCount: sortedSlidesInRow.length,
                y: row.y
              });
            }
          });

          // Handle any orphaned slides (slides not in a SLIDE_ROW)
          orphanedSlides = slides.filter(function (slide) {
            return !slideToRowMap[slide.id];
          });
          if (orphanedSlides.length > 0) {
            // Group orphaned slides by their Y position
            SLIDE_HEIGHT = 1080;
            SPACING = 240;
            ROW_HEIGHT = SLIDE_HEIGHT + SPACING;
            orphansByRow = {};
            orphanedSlides.forEach(function (slide) {
              var row = Math.floor((slide.y - 240) / ROW_HEIGHT);
              if (!orphansByRow[row]) orphansByRow[row] = [];
              orphansByRow[row].push({
                id: slide.id,
                name: slide.name,
                type: slide.type,
                x: slide.x,
                y: slide.y,
                width: slide.width,
                height: slide.height
              });
            });

            // Add orphaned slides to grid
            Object.keys(orphansByRow).sort(function (a, b) {
              return Number(a) - Number(b);
            }).forEach(function (rowKey) {
              var slidesInRow = orphansByRow[rowKey].sort(function (a, b) {
                return a.x - b.x;
              });
              grid.push(slidesInRow);
              rowInfo.push({
                id: "orphan-row-".concat(rowKey),
                name: "Orphaned Slides Row ".concat(rowKey),
                slideCount: slidesInRow.length,
                y: slidesInRow[0].y,
                isOrphaned: true
              });
            });
          }
          return _context27.a(2, {
            grid: grid,
            totalSlides: slides.length,
            rows: grid.length,
            slideRows: rowInfo,
            method: 'scanning',
            hasOrphanedSlides: orphanedSlides.length > 0,
            orphanedSlidesCount: orphanedSlides.length
          });
        case 3:
          _context27.p = 3;
          _t17 = _context27.v;
          throw new Error("Failed to get slide grid: ".concat(_t17.message));
        case 4:
          return _context27.a(2);
      }
    }, _callee27, null, [[1, 3]]);
  }));
  return _getSlideGrid.apply(this, arguments);
}
function createText(_x14) {
  return _createText.apply(this, arguments);
}
function _createText() {
  _createText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(params) {
    var _ref23, _ref23$x, x, _ref23$y, y, _ref23$text, text, _ref23$fontSize, fontSize, _ref23$fontWeight, fontWeight, _ref23$fontColor, fontColor, _ref23$name, name, parentId, getFontStyle, actualX, actualY, targetSlide, absoluteCoords, textNode, paintStyle, parentNode, _t18;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.n) {
        case 0:
          _ref23 = params || {}, _ref23$x = _ref23.x, x = _ref23$x === void 0 ? 0 : _ref23$x, _ref23$y = _ref23.y, y = _ref23$y === void 0 ? 0 : _ref23$y, _ref23$text = _ref23.text, text = _ref23$text === void 0 ? "Text" : _ref23$text, _ref23$fontSize = _ref23.fontSize, fontSize = _ref23$fontSize === void 0 ? 14 : _ref23$fontSize, _ref23$fontWeight = _ref23.fontWeight, fontWeight = _ref23$fontWeight === void 0 ? 400 : _ref23$fontWeight, _ref23$fontColor = _ref23.fontColor, fontColor = _ref23$fontColor === void 0 ? {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          } : _ref23$fontColor, _ref23$name = _ref23.name, name = _ref23$name === void 0 ? "" : _ref23$name, parentId = _ref23.parentId; // Map common font weights to Figma font styles
          getFontStyle = function getFontStyle(weight) {
            switch (weight) {
              case 100:
                return "Thin";
              case 200:
                return "Extra Light";
              case 300:
                return "Light";
              case 400:
                return "Regular";
              case 500:
                return "Medium";
              case 600:
                return "Semi Bold";
              case 700:
                return "Bold";
              case 800:
                return "Extra Bold";
              case 900:
                return "Black";
              default:
                return "Regular";
            }
          }; // Handle coordinate transformation for slides
          actualX = x;
          actualY = y;
          targetSlide = null;
          if (!(figma.editorType === "slides")) {
            _context28.n = 2;
            break;
          }
          _context28.n = 1;
          return getTargetSlide(parentId);
        case 1:
          targetSlide = _context28.v;
          if (targetSlide) {
            // Convert local coordinates to absolute coordinates
            absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
            actualX = absoluteCoords.x;
            actualY = absoluteCoords.y;
          }
        case 2:
          textNode = figma.createText();
          textNode.x = actualX;
          textNode.y = actualY;
          textNode.name = name || text;
          _context28.p = 3;
          _context28.n = 4;
          return figma.loadFontAsync({
            family: "Inter",
            style: getFontStyle(fontWeight)
          });
        case 4:
          textNode.fontName = {
            family: "Inter",
            style: getFontStyle(fontWeight)
          };
          textNode.fontSize = parseInt(fontSize);
          _context28.n = 6;
          break;
        case 5:
          _context28.p = 5;
          _t18 = _context28.v;
          console.error("Error setting font size", _t18);
        case 6:
          setCharacters(textNode, text);

          // Set text color
          paintStyle = {
            type: "SOLID",
            color: {
              r: parseFloat(fontColor.r) || 0,
              g: parseFloat(fontColor.g) || 0,
              b: parseFloat(fontColor.b) || 0
            },
            opacity: parseFloat(fontColor.a) || 1
          };
          textNode.fills = [paintStyle];

          // If parentId is provided, append to that node, otherwise append to current page
          if (!parentId) {
            _context28.n = 10;
            break;
          }
          _context28.n = 7;
          return figma.getNodeByIdAsync(parentId);
        case 7:
          parentNode = _context28.v;
          if (parentNode) {
            _context28.n = 8;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 8:
          if ("appendChild" in parentNode) {
            _context28.n = 9;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 9:
          parentNode.appendChild(textNode);
          _context28.n = 11;
          break;
        case 10:
          figma.currentPage.appendChild(textNode);
        case 11:
          return _context28.a(2, {
            id: textNode.id,
            name: textNode.name,
            x: textNode.x,
            y: textNode.y,
            width: textNode.width,
            height: textNode.height,
            characters: textNode.characters,
            fontSize: textNode.fontSize,
            fontWeight: fontWeight,
            fontColor: fontColor,
            fontName: textNode.fontName,
            fills: textNode.fills,
            parentId: textNode.parent ? textNode.parent.id : undefined
          });
      }
    }, _callee28, null, [[3, 5]]);
  }));
  return _createText.apply(this, arguments);
}
function createShapeWithText(_x15) {
  return _createShapeWithText.apply(this, arguments);
}
function _createShapeWithText() {
  _createShapeWithText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(params) {
    var _ref24, _ref24$x, x, _ref24$y, y, _ref24$width, width, _ref24$height, height, _ref24$shapeType, shapeType, _ref24$text, text, fillColor, strokeColor, strokeWeight, _ref24$fontSize, fontSize, _ref24$fontWeight, fontWeight, _ref24$fontColor, fontColor, _ref24$name, name, parentId, shapeWithText, actualX, actualY, targetSlide, absoluteCoords, paintStyle, strokeStyle, textPaintStyle, parentNode, result, localCoords, _t19;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.n) {
        case 0:
          _ref24 = params || {}, _ref24$x = _ref24.x, x = _ref24$x === void 0 ? 0 : _ref24$x, _ref24$y = _ref24.y, y = _ref24$y === void 0 ? 0 : _ref24$y, _ref24$width = _ref24.width, width = _ref24$width === void 0 ? 200 : _ref24$width, _ref24$height = _ref24.height, height = _ref24$height === void 0 ? 100 : _ref24$height, _ref24$shapeType = _ref24.shapeType, shapeType = _ref24$shapeType === void 0 ? "RECTANGLE" : _ref24$shapeType, _ref24$text = _ref24.text, text = _ref24$text === void 0 ? "Shape Text" : _ref24$text, fillColor = _ref24.fillColor, strokeColor = _ref24.strokeColor, strokeWeight = _ref24.strokeWeight, _ref24$fontSize = _ref24.fontSize, fontSize = _ref24$fontSize === void 0 ? "16" : _ref24$fontSize, _ref24$fontWeight = _ref24.fontWeight, fontWeight = _ref24$fontWeight === void 0 ? "Regular" : _ref24$fontWeight, _ref24$fontColor = _ref24.fontColor, fontColor = _ref24$fontColor === void 0 ? {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          } : _ref24$fontColor, _ref24$name = _ref24.name, name = _ref24$name === void 0 ? "Shape with Text" : _ref24$name, parentId = _ref24.parentId; // Check if we're in Figma Slides or FigJam
          if (!(figma.editorType !== "slides" && figma.editorType !== "figjam")) {
            _context29.n = 1;
            break;
          }
          throw new Error("createShapeWithText is only available in Figma Slides and FigJam");
        case 1:
          if (!(typeof figma.createShapeWithText !== 'function')) {
            _context29.n = 2;
            break;
          }
          throw new Error("createShapeWithText API is not available. Please ensure you're using the latest version of Figma with Slides/FigJam support.");
        case 2:
          shapeWithText = figma.createShapeWithText(); // Handle coordinate transformation for slides
          actualX = x;
          actualY = y;
          targetSlide = null;
          if (!(figma.editorType === "slides")) {
            _context29.n = 4;
            break;
          }
          _context29.n = 3;
          return getTargetSlide(parentId);
        case 3:
          targetSlide = _context29.v;
          if (targetSlide) {
            // Convert local coordinates to absolute coordinates
            absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
            actualX = absoluteCoords.x;
            actualY = absoluteCoords.y;
          }
        case 4:
          shapeWithText.x = actualX;
          shapeWithText.y = actualY;
          shapeWithText.resize(width, height);
          shapeWithText.name = name;
          shapeWithText.shapeType = shapeType;

          // Set shape fill color if provided
          if (fillColor) {
            paintStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(fillColor.r) || 0,
                g: parseFloat(fillColor.g) || 0,
                b: parseFloat(fillColor.b) || 0
              },
              opacity: parseFloat(fillColor.a) || 1
            };
            shapeWithText.fills = [paintStyle];
          }

          // Set stroke if provided
          if (strokeColor) {
            strokeStyle = {
              type: "SOLID",
              color: {
                r: parseFloat(strokeColor.r) || 0,
                g: parseFloat(strokeColor.g) || 0,
                b: parseFloat(strokeColor.b) || 0
              },
              opacity: parseFloat(strokeColor.a) || 1
            };
            shapeWithText.strokes = [strokeStyle];
          }
          if (strokeWeight !== undefined) {
            shapeWithText.strokeWeight = strokeWeight;
          }

          // Set text
          _context29.p = 5;
          _context29.n = 6;
          return figma.loadFontAsync({
            family: "Inter",
            style: getFontStyle(fontWeight)
          });
        case 6:
          shapeWithText.text.fontName = {
            family: "Inter",
            style: getFontStyle(fontWeight)
          };
          shapeWithText.text.fontSize = parseInt(fontSize);
          shapeWithText.text.characters = text;

          // Set text color
          textPaintStyle = {
            type: "SOLID",
            color: {
              r: parseFloat(fontColor.r) || 0,
              g: parseFloat(fontColor.g) || 0,
              b: parseFloat(fontColor.b) || 0
            },
            opacity: parseFloat(fontColor.a) || 1
          };
          shapeWithText.text.fills = [textPaintStyle];
          _context29.n = 8;
          break;
        case 7:
          _context29.p = 7;
          _t19 = _context29.v;
          console.error("Error setting text properties:", _t19);
        case 8:
          if (!parentId) {
            _context29.n = 12;
            break;
          }
          _context29.n = 9;
          return figma.getNodeByIdAsync(parentId);
        case 9:
          parentNode = _context29.v;
          if (parentNode) {
            _context29.n = 10;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 10:
          if ("appendChild" in parentNode) {
            _context29.n = 11;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 11:
          parentNode.appendChild(shapeWithText);
          _context29.n = 13;
          break;
        case 12:
          figma.currentPage.appendChild(shapeWithText);
        case 13:
          result = {
            id: shapeWithText.id,
            name: shapeWithText.name,
            x: shapeWithText.x,
            y: shapeWithText.y,
            width: shapeWithText.width,
            height: shapeWithText.height,
            shapeType: shapeWithText.shapeType,
            text: shapeWithText.text.characters,
            parentId: shapeWithText.parent ? shapeWithText.parent.id : undefined
          }; // Include local coordinates if on a slide
          if (targetSlide) {
            localCoords = toLocalCoordinates(targetSlide, shapeWithText.x, shapeWithText.y);
            result.localX = localCoords.x;
            result.localY = localCoords.y;
            result.slideId = targetSlide.id;
          }
          return _context29.a(2, result);
      }
    }, _callee29, null, [[5, 7]]);
  }));
  return _createShapeWithText.apply(this, arguments);
}
function createTable(_x16) {
  return _createTable.apply(this, arguments);
}
function _createTable() {
  _createTable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(params) {
    var _ref25, _ref25$x, x, _ref25$y, y, _ref25$rows, rows, _ref25$columns, columns, _ref25$cellWidth, cellWidth, _ref25$cellHeight, cellHeight, _ref25$name, name, parentId, actualX, actualY, targetSlide, absoluteCoords, table, row, col, cell, parentNode, tableFrame, r, rowFrame, c, cellFrame, _parentNode, _t20;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.n) {
        case 0:
          _ref25 = params || {}, _ref25$x = _ref25.x, x = _ref25$x === void 0 ? 0 : _ref25$x, _ref25$y = _ref25.y, y = _ref25$y === void 0 ? 0 : _ref25$y, _ref25$rows = _ref25.rows, rows = _ref25$rows === void 0 ? 3 : _ref25$rows, _ref25$columns = _ref25.columns, columns = _ref25$columns === void 0 ? 3 : _ref25$columns, _ref25$cellWidth = _ref25.cellWidth, cellWidth = _ref25$cellWidth === void 0 ? 100 : _ref25$cellWidth, _ref25$cellHeight = _ref25.cellHeight, cellHeight = _ref25$cellHeight === void 0 ? 40 : _ref25$cellHeight, _ref25$name = _ref25.name, name = _ref25$name === void 0 ? "Table" : _ref25$name, parentId = _ref25.parentId; // Check if we're in Figma Slides or Design
          if (!(figma.editorType !== "slides" && figma.editorType !== "figma")) {
            _context30.n = 1;
            break;
          }
          throw new Error("createTable is only available in Figma Design and Slides");
        case 1:
          _context30.p = 1;
          // Handle coordinate transformation for slides
          actualX = x;
          actualY = y;
          targetSlide = null;
          if (!(figma.editorType === "slides")) {
            _context30.n = 3;
            break;
          }
          _context30.n = 2;
          return getTargetSlide(parentId);
        case 2:
          targetSlide = _context30.v;
          if (targetSlide) {
            // Convert local coordinates to absolute coordinates
            absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
            actualX = absoluteCoords.x;
            actualY = absoluteCoords.y;
          }
        case 3:
          if (!(typeof figma.createTable === 'function')) {
            _context30.n = 9;
            break;
          }
          table = figma.createTable();
          table.x = actualX;
          table.y = actualY;
          table.name = name;

          // Resize the table to accommodate the cells
          table.resize(columns * cellWidth, rows * cellHeight);

          // Create cells
          for (row = 0; row < rows; row++) {
            for (col = 0; col < columns; col++) {
              cell = table.cellAt(row, col);
              if (cell) {
                cell.resize(cellWidth, cellHeight);
              }
            }
          }

          // Append to parent or current page
          if (!parentId) {
            _context30.n = 7;
            break;
          }
          _context30.n = 4;
          return figma.getNodeByIdAsync(parentId);
        case 4:
          parentNode = _context30.v;
          if (parentNode) {
            _context30.n = 5;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 5:
          if ("appendChild" in parentNode) {
            _context30.n = 6;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 6:
          parentNode.appendChild(table);
          _context30.n = 8;
          break;
        case 7:
          figma.currentPage.appendChild(table);
        case 8:
          return _context30.a(2, {
            id: table.id,
            name: table.name,
            x: table.x,
            y: table.y,
            width: table.width,
            height: table.height,
            rows: rows,
            columns: columns,
            parentId: table.parent ? table.parent.id : undefined
          });
        case 9:
          // Fallback: Create table-like structure with frames
          tableFrame = figma.createFrame();
          tableFrame.name = name;
          tableFrame.x = actualX;
          tableFrame.y = actualY;
          tableFrame.layoutMode = "VERTICAL";
          tableFrame.itemSpacing = 0;
          tableFrame.paddingLeft = 0;
          tableFrame.paddingRight = 0;
          tableFrame.paddingTop = 0;
          tableFrame.paddingBottom = 0;
          tableFrame.clipsContent = true;

          // Create rows
          for (r = 0; r < rows; r++) {
            rowFrame = figma.createFrame();
            rowFrame.name = "Row ".concat(r + 1);
            rowFrame.layoutMode = "HORIZONTAL";
            rowFrame.itemSpacing = 0;
            rowFrame.layoutSizingHorizontal = "HUG";
            rowFrame.layoutSizingVertical = "HUG";

            // Create cells in each row
            for (c = 0; c < columns; c++) {
              cellFrame = figma.createFrame();
              cellFrame.name = "Cell ".concat(r + 1, "-").concat(c + 1);
              cellFrame.resize(cellWidth, cellHeight);

              // Add border to cells
              cellFrame.strokes = [{
                type: 'SOLID',
                color: {
                  r: 0.8,
                  g: 0.8,
                  b: 0.8
                }
              }];
              cellFrame.strokeWeight = 1;
              cellFrame.strokeAlign = "INSIDE";

              // Add white background
              cellFrame.fills = [{
                type: 'SOLID',
                color: {
                  r: 1,
                  g: 1,
                  b: 1
                }
              }];
              rowFrame.appendChild(cellFrame);
            }
            tableFrame.appendChild(rowFrame);
          }

          // Resize table frame to fit content
          tableFrame.resize(columns * cellWidth, rows * cellHeight);

          // Append to parent or current page
          if (!parentId) {
            _context30.n = 13;
            break;
          }
          _context30.n = 10;
          return figma.getNodeByIdAsync(parentId);
        case 10:
          _parentNode = _context30.v;
          if (_parentNode) {
            _context30.n = 11;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 11:
          if ("appendChild" in _parentNode) {
            _context30.n = 12;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 12:
          _parentNode.appendChild(tableFrame);
          _context30.n = 14;
          break;
        case 13:
          figma.currentPage.appendChild(tableFrame);
        case 14:
          return _context30.a(2, {
            id: tableFrame.id,
            name: tableFrame.name,
            x: tableFrame.x,
            y: tableFrame.y,
            width: tableFrame.width,
            height: tableFrame.height,
            rows: rows,
            columns: columns,
            type: "TABLE_FRAME",
            // Custom type to indicate fallback
            parentId: tableFrame.parent ? tableFrame.parent.id : undefined,
            message: "Created table-like structure using frames (native table API not available)"
          });
        case 15:
          _context30.n = 17;
          break;
        case 16:
          _context30.p = 16;
          _t20 = _context30.v;
          throw new Error("Failed to create table: ".concat(_t20.message));
        case 17:
          return _context30.a(2);
      }
    }, _callee30, null, [[1, 16]]);
  }));
  return _createTable.apply(this, arguments);
}
function createGif(_x17) {
  return _createGif.apply(this, arguments);
}
function _createGif() {
  _createGif = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(params) {
    var _ref26, url, _ref26$x, x, _ref26$y, y, _ref26$width, width, _ref26$height, height, _ref26$name, name, parentId, actualX, actualY, targetSlide, absoluteCoords, gif, parentNode, media, _parentNode2, placeholder, label, _parentNode3, _t21, _t22;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.n) {
        case 0:
          _ref26 = params || {}, url = _ref26.url, _ref26$x = _ref26.x, x = _ref26$x === void 0 ? 0 : _ref26$x, _ref26$y = _ref26.y, y = _ref26$y === void 0 ? 0 : _ref26$y, _ref26$width = _ref26.width, width = _ref26$width === void 0 ? 300 : _ref26$width, _ref26$height = _ref26.height, height = _ref26$height === void 0 ? 200 : _ref26$height, _ref26$name = _ref26.name, name = _ref26$name === void 0 ? "GIF" : _ref26$name, parentId = _ref26.parentId; // Check if we're in Figma Slides or FigJam
          if (!(figma.editorType !== "slides" && figma.editorType !== "figjam")) {
            _context31.n = 1;
            break;
          }
          throw new Error("createGif is only available in Figma Slides and FigJam");
        case 1:
          if (url) {
            _context31.n = 2;
            break;
          }
          throw new Error("Missing url parameter for GIF");
        case 2:
          _context31.p = 2;
          // Handle coordinate transformation for slides
          actualX = x;
          actualY = y;
          targetSlide = null;
          if (!(figma.editorType === "slides")) {
            _context31.n = 4;
            break;
          }
          _context31.n = 3;
          return getTargetSlide(parentId);
        case 3:
          targetSlide = _context31.v;
          if (targetSlide) {
            // Convert local coordinates to absolute coordinates
            absoluteCoords = toAbsoluteCoordinates(targetSlide, x, y);
            actualX = absoluteCoords.x;
            actualY = absoluteCoords.y;
          }
        case 4:
          if (!(typeof figma.createGifAsync === 'function')) {
            _context31.n = 11;
            break;
          }
          _context31.n = 5;
          return figma.createGifAsync(url);
        case 5:
          gif = _context31.v;
          gif.x = actualX;
          gif.y = actualY;
          gif.resize(width, height);
          gif.name = name;

          // Append to parent or current page
          if (!parentId) {
            _context31.n = 9;
            break;
          }
          _context31.n = 6;
          return figma.getNodeByIdAsync(parentId);
        case 6:
          parentNode = _context31.v;
          if (parentNode) {
            _context31.n = 7;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 7:
          if ("appendChild" in parentNode) {
            _context31.n = 8;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 8:
          parentNode.appendChild(gif);
          _context31.n = 10;
          break;
        case 9:
          figma.currentPage.appendChild(gif);
        case 10:
          return _context31.a(2, {
            id: gif.id,
            name: gif.name,
            x: gif.x,
            y: gif.y,
            width: gif.width,
            height: gif.height,
            url: url,
            parentId: gif.parent ? gif.parent.id : undefined
          });
        case 11:
          if (!(typeof figma.createMedia === 'function')) {
            _context31.n = 17;
            break;
          }
          // Try createMedia as alternative
          media = figma.createMedia();
          media.x = actualX;
          media.y = actualY;
          media.resize(width, height);
          media.name = name;

          // Note: setMediaAsync would require fetching and converting the GIF
          // For now, we'll create a placeholder

          // Append to parent or current page
          if (!parentId) {
            _context31.n = 15;
            break;
          }
          _context31.n = 12;
          return figma.getNodeByIdAsync(parentId);
        case 12:
          _parentNode2 = _context31.v;
          if (_parentNode2) {
            _context31.n = 13;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 13:
          if ("appendChild" in _parentNode2) {
            _context31.n = 14;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 14:
          _parentNode2.appendChild(media);
          _context31.n = 16;
          break;
        case 15:
          figma.currentPage.appendChild(media);
        case 16:
          return _context31.a(2, {
            id: media.id,
            name: media.name,
            x: media.x,
            y: media.y,
            width: media.width,
            height: media.height,
            url: url,
            type: media.type,
            parentId: media.parent ? media.parent.id : undefined,
            message: "Created media placeholder - GIF upload requires additional implementation"
          });
        case 17:
          // Fallback: Create a frame with an image fill placeholder
          placeholder = figma.createFrame();
          placeholder.name = name;
          placeholder.x = actualX;
          placeholder.y = actualY;
          placeholder.resize(width, height);

          // Add a semi-transparent fill to indicate it's a placeholder
          placeholder.fills = [{
            type: 'SOLID',
            color: {
              r: 0.9,
              g: 0.9,
              b: 0.9
            },
            opacity: 0.5
          }];

          // Add stroke to make it visible
          placeholder.strokes = [{
            type: 'SOLID',
            color: {
              r: 0.5,
              g: 0.5,
              b: 0.5
            }
          }];
          placeholder.strokeWeight = 2;
          placeholder.strokeAlign = "INSIDE";

          // Add a text label
          label = figma.createText();
          _context31.p = 18;
          _context31.n = 19;
          return figma.loadFontAsync({
            family: "Inter",
            style: "Regular"
          });
        case 19:
          label.fontName = {
            family: "Inter",
            style: "Regular"
          };
          label.characters = "GIF Placeholder\n" + url.substring(0, 30) + "...";
          label.fontSize = 14;
          label.textAlignHorizontal = "CENTER";
          label.textAlignVertical = "CENTER";
          label.resize(width - 20, height - 20);
          label.x = 10;
          label.y = 10;
          placeholder.appendChild(label);
          _context31.n = 21;
          break;
        case 20:
          _context31.p = 20;
          _t21 = _context31.v;
          console.warn("Could not load font for GIF placeholder label");
        case 21:
          if (!parentId) {
            _context31.n = 25;
            break;
          }
          _context31.n = 22;
          return figma.getNodeByIdAsync(parentId);
        case 22:
          _parentNode3 = _context31.v;
          if (_parentNode3) {
            _context31.n = 23;
            break;
          }
          throw new Error("Parent node not found with ID: ".concat(parentId));
        case 23:
          if ("appendChild" in _parentNode3) {
            _context31.n = 24;
            break;
          }
          throw new Error("Parent node does not support children: ".concat(parentId));
        case 24:
          _parentNode3.appendChild(placeholder);
          _context31.n = 26;
          break;
        case 25:
          figma.currentPage.appendChild(placeholder);
        case 26:
          return _context31.a(2, {
            id: placeholder.id,
            name: placeholder.name,
            x: placeholder.x,
            y: placeholder.y,
            width: placeholder.width,
            height: placeholder.height,
            url: url,
            type: "GIF_PLACEHOLDER",
            parentId: placeholder.parent ? placeholder.parent.id : undefined,
            message: "Created GIF placeholder frame (native GIF API not available)"
          });
        case 27:
          _context31.n = 29;
          break;
        case 28:
          _context31.p = 28;
          _t22 = _context31.v;
          throw new Error("Failed to create GIF: ".concat(_t22.message));
        case 29:
          return _context31.a(2);
      }
    }, _callee31, null, [[18, 20], [2, 28]]);
  }));
  return _createGif.apply(this, arguments);
}
function setFillColor(_x18) {
  return _setFillColor.apply(this, arguments);
}
function _setFillColor() {
  _setFillColor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(params) {
    var _ref27, nodeId, _ref27$color, r, g, b, a, node, rgbColor, paintStyle;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.n) {
        case 0:
          console.log("setFillColor", params);
          _ref27 = params || {}, nodeId = _ref27.nodeId, _ref27$color = _ref27.color, r = _ref27$color.r, g = _ref27$color.g, b = _ref27$color.b, a = _ref27$color.a;
          if (nodeId) {
            _context32.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context32.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context32.v;
          if (node) {
            _context32.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          if ("fills" in node) {
            _context32.n = 4;
            break;
          }
          throw new Error("Node does not support fills: ".concat(nodeId));
        case 4:
          // Create RGBA color
          rgbColor = {
            r: parseFloat(r) || 0,
            g: parseFloat(g) || 0,
            b: parseFloat(b) || 0,
            a: parseFloat(a) || 1
          }; // Set fill
          paintStyle = {
            type: "SOLID",
            color: {
              r: parseFloat(rgbColor.r),
              g: parseFloat(rgbColor.g),
              b: parseFloat(rgbColor.b)
            },
            opacity: parseFloat(rgbColor.a)
          };
          console.log("paintStyle", paintStyle);
          node.fills = [paintStyle];
          return _context32.a(2, {
            id: node.id,
            name: node.name,
            fills: [paintStyle]
          });
      }
    }, _callee32);
  }));
  return _setFillColor.apply(this, arguments);
}
function setStrokeColor(_x19) {
  return _setStrokeColor.apply(this, arguments);
}
function _setStrokeColor() {
  _setStrokeColor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(params) {
    var _ref28, nodeId, _ref28$color, r, g, b, a, _ref28$weight, weight, node, rgbColor, paintStyle;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.n) {
        case 0:
          _ref28 = params || {}, nodeId = _ref28.nodeId, _ref28$color = _ref28.color, r = _ref28$color.r, g = _ref28$color.g, b = _ref28$color.b, a = _ref28$color.a, _ref28$weight = _ref28.weight, weight = _ref28$weight === void 0 ? 1 : _ref28$weight;
          if (nodeId) {
            _context33.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context33.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context33.v;
          if (node) {
            _context33.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          if ("strokes" in node) {
            _context33.n = 4;
            break;
          }
          throw new Error("Node does not support strokes: ".concat(nodeId));
        case 4:
          // Create RGBA color
          rgbColor = {
            r: r !== undefined ? r : 0,
            g: g !== undefined ? g : 0,
            b: b !== undefined ? b : 0,
            a: a !== undefined ? a : 1
          }; // Set stroke
          paintStyle = {
            type: "SOLID",
            color: {
              r: rgbColor.r,
              g: rgbColor.g,
              b: rgbColor.b
            },
            opacity: rgbColor.a
          };
          node.strokes = [paintStyle];

          // Set stroke weight if available
          if ("strokeWeight" in node) {
            node.strokeWeight = weight;
          }
          return _context33.a(2, {
            id: node.id,
            name: node.name,
            strokes: node.strokes,
            strokeWeight: "strokeWeight" in node ? node.strokeWeight : undefined
          });
      }
    }, _callee33);
  }));
  return _setStrokeColor.apply(this, arguments);
}
function moveNode(_x20) {
  return _moveNode.apply(this, arguments);
}
function _moveNode() {
  _moveNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(params) {
    var _ref29, nodeId, x, y, node;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.n) {
        case 0:
          _ref29 = params || {}, nodeId = _ref29.nodeId, x = _ref29.x, y = _ref29.y;
          if (nodeId) {
            _context34.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(x === undefined || y === undefined)) {
            _context34.n = 2;
            break;
          }
          throw new Error("Missing x or y parameters");
        case 2:
          _context34.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context34.v;
          if (node) {
            _context34.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(!("x" in node) || !("y" in node))) {
            _context34.n = 5;
            break;
          }
          throw new Error("Node does not support position: ".concat(nodeId));
        case 5:
          node.x = x;
          node.y = y;
          return _context34.a(2, {
            id: node.id,
            name: node.name,
            x: node.x,
            y: node.y
          });
      }
    }, _callee34);
  }));
  return _moveNode.apply(this, arguments);
}
function resizeNode(_x21) {
  return _resizeNode.apply(this, arguments);
}
function _resizeNode() {
  _resizeNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(params) {
    var _ref30, nodeId, width, height, node;
    return _regenerator().w(function (_context35) {
      while (1) switch (_context35.n) {
        case 0:
          _ref30 = params || {}, nodeId = _ref30.nodeId, width = _ref30.width, height = _ref30.height;
          if (nodeId) {
            _context35.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(width === undefined || height === undefined)) {
            _context35.n = 2;
            break;
          }
          throw new Error("Missing width or height parameters");
        case 2:
          _context35.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context35.v;
          if (node) {
            _context35.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if ("resize" in node) {
            _context35.n = 5;
            break;
          }
          throw new Error("Node does not support resizing: ".concat(nodeId));
        case 5:
          node.resize(width, height);
          return _context35.a(2, {
            id: node.id,
            name: node.name,
            width: node.width,
            height: node.height
          });
      }
    }, _callee35);
  }));
  return _resizeNode.apply(this, arguments);
}
function deleteNode(_x22) {
  return _deleteNode.apply(this, arguments);
}
function _deleteNode() {
  _deleteNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(params) {
    var _ref31, nodeId, node, nodeInfo;
    return _regenerator().w(function (_context36) {
      while (1) switch (_context36.n) {
        case 0:
          _ref31 = params || {}, nodeId = _ref31.nodeId;
          if (nodeId) {
            _context36.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context36.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context36.v;
          if (node) {
            _context36.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          // Save node info before deleting
          nodeInfo = {
            id: node.id,
            name: node.name,
            type: node.type
          };
          node.remove();
          return _context36.a(2, nodeInfo);
      }
    }, _callee36);
  }));
  return _deleteNode.apply(this, arguments);
}
function getStyles() {
  return _getStyles.apply(this, arguments);
}
function _getStyles() {
  _getStyles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
    var styles, _t23, _t24, _t25, _t26;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.n) {
        case 0:
          if (!(figma.editorType === "slides")) {
            _context37.n = 1;
            break;
          }
          return _context37.a(2, {
            error: "Styles are not supported in Figma Slides",
            colors: [],
            texts: [],
            effects: [],
            grids: []
          });
        case 1:
          _context37.n = 2;
          return figma.getLocalPaintStylesAsync();
        case 2:
          _t23 = _context37.v;
          _context37.n = 3;
          return figma.getLocalTextStylesAsync();
        case 3:
          _t24 = _context37.v;
          _context37.n = 4;
          return figma.getLocalEffectStylesAsync();
        case 4:
          _t25 = _context37.v;
          _context37.n = 5;
          return figma.getLocalGridStylesAsync();
        case 5:
          _t26 = _context37.v;
          styles = {
            colors: _t23,
            texts: _t24,
            effects: _t25,
            grids: _t26
          };
          return _context37.a(2, {
            colors: styles.colors.map(function (style) {
              return {
                id: style.id,
                name: style.name,
                key: style.key,
                paint: style.paints[0]
              };
            }),
            texts: styles.texts.map(function (style) {
              return {
                id: style.id,
                name: style.name,
                key: style.key,
                fontSize: style.fontSize,
                fontName: style.fontName
              };
            }),
            effects: styles.effects.map(function (style) {
              return {
                id: style.id,
                name: style.name,
                key: style.key
              };
            }),
            grids: styles.grids.map(function (style) {
              return {
                id: style.id,
                name: style.name,
                key: style.key
              };
            })
          });
      }
    }, _callee37);
  }));
  return _getStyles.apply(this, arguments);
}
function getLocalComponents() {
  return _getLocalComponents.apply(this, arguments);
} // async function getTeamComponents() {
//   try {
//     const teamComponents =
//       await figma.teamLibrary.getAvailableComponentsAsync();
//     return {
//       count: teamComponents.length,
//       components: teamComponents.map((component) => ({
//         key: component.key,
//         name: component.name,
//         description: component.description,
//         libraryName: component.libraryName,
//       })),
//     };
//   } catch (error) {
//     throw new Error(`Error getting team components: ${error.message}`);
//   }
// }
function _getLocalComponents() {
  _getLocalComponents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38() {
    var components;
    return _regenerator().w(function (_context38) {
      while (1) switch (_context38.n) {
        case 0:
          if (!(figma.editorType === "slides")) {
            _context38.n = 1;
            break;
          }
          return _context38.a(2, {
            error: "Components are not supported in Figma Slides",
            count: 0,
            components: []
          });
        case 1:
          _context38.n = 2;
          return figma.loadAllPagesAsync();
        case 2:
          components = figma.root.findAllWithCriteria({
            types: ["COMPONENT"]
          });
          return _context38.a(2, {
            count: components.length,
            components: components.map(function (component) {
              return {
                id: component.id,
                name: component.name,
                key: "key" in component ? component.key : null
              };
            })
          });
      }
    }, _callee38);
  }));
  return _getLocalComponents.apply(this, arguments);
}
function createComponentInstance(_x23) {
  return _createComponentInstance.apply(this, arguments);
}
function _createComponentInstance() {
  _createComponentInstance = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(params) {
    var _ref32, componentKey, _ref32$x, x, _ref32$y, y, component, instance, _t27;
    return _regenerator().w(function (_context39) {
      while (1) switch (_context39.n) {
        case 0:
          _ref32 = params || {}, componentKey = _ref32.componentKey, _ref32$x = _ref32.x, x = _ref32$x === void 0 ? 0 : _ref32$x, _ref32$y = _ref32.y, y = _ref32$y === void 0 ? 0 : _ref32$y; // Check if we're in Figma Slides
          if (!(figma.editorType === "slides")) {
            _context39.n = 1;
            break;
          }
          throw new Error("Components are not supported in Figma Slides");
        case 1:
          if (componentKey) {
            _context39.n = 2;
            break;
          }
          throw new Error("Missing componentKey parameter");
        case 2:
          _context39.p = 2;
          _context39.n = 3;
          return figma.importComponentByKeyAsync(componentKey);
        case 3:
          component = _context39.v;
          instance = component.createInstance();
          instance.x = x;
          instance.y = y;
          figma.currentPage.appendChild(instance);
          return _context39.a(2, {
            id: instance.id,
            name: instance.name,
            x: instance.x,
            y: instance.y,
            width: instance.width,
            height: instance.height,
            componentId: instance.componentId
          });
        case 4:
          _context39.p = 4;
          _t27 = _context39.v;
          throw new Error("Error creating component instance: ".concat(_t27.message));
        case 5:
          return _context39.a(2);
      }
    }, _callee39, null, [[2, 4]]);
  }));
  return _createComponentInstance.apply(this, arguments);
}
function exportNodeAsImage(_x24) {
  return _exportNodeAsImage.apply(this, arguments);
}
function _exportNodeAsImage() {
  _exportNodeAsImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(params) {
    var _ref33, nodeId, _ref33$scale, scale, format, node, settings, bytes, mimeType, base64, _t28, _t29;
    return _regenerator().w(function (_context40) {
      while (1) switch (_context40.n) {
        case 0:
          _ref33 = params || {}, nodeId = _ref33.nodeId, _ref33$scale = _ref33.scale, scale = _ref33$scale === void 0 ? 1 : _ref33$scale;
          format = "PNG";
          if (nodeId) {
            _context40.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context40.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context40.v;
          if (node) {
            _context40.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          if ("exportAsync" in node) {
            _context40.n = 4;
            break;
          }
          throw new Error("Node does not support exporting: ".concat(nodeId));
        case 4:
          _context40.p = 4;
          settings = {
            format: format,
            constraint: {
              type: "SCALE",
              value: scale
            }
          };
          _context40.n = 5;
          return node.exportAsync(settings);
        case 5:
          bytes = _context40.v;
          _t28 = format;
          _context40.n = _t28 === "PNG" ? 6 : _t28 === "JPG" ? 7 : _t28 === "SVG" ? 8 : _t28 === "PDF" ? 9 : 10;
          break;
        case 6:
          mimeType = "image/png";
          return _context40.a(3, 11);
        case 7:
          mimeType = "image/jpeg";
          return _context40.a(3, 11);
        case 8:
          mimeType = "image/svg+xml";
          return _context40.a(3, 11);
        case 9:
          mimeType = "application/pdf";
          return _context40.a(3, 11);
        case 10:
          mimeType = "application/octet-stream";
        case 11:
          // Proper way to convert Uint8Array to base64
          base64 = customBase64Encode(bytes); // const imageData = `data:${mimeType};base64,${base64}`;
          return _context40.a(2, {
            nodeId: nodeId,
            format: format,
            scale: scale,
            mimeType: mimeType,
            imageData: base64
          });
        case 12:
          _context40.p = 12;
          _t29 = _context40.v;
          throw new Error("Error exporting node as image: ".concat(_t29.message));
        case 13:
          return _context40.a(2);
      }
    }, _callee40, null, [[4, 12]]);
  }));
  return _exportNodeAsImage.apply(this, arguments);
}
function customBase64Encode(bytes) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var base64 = "";
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;
  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
    d = chunk & 63; // 63 = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += chars[a] + chars[b] + chars[c] + chars[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3 = 2^2 - 1

    base64 += chars[a] + chars[b] + "==";
  } else if (byteRemainder === 2) {
    chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15 = 2^4 - 1

    base64 += chars[a] + chars[b] + chars[c] + "=";
  }
  return base64;
}
function setCornerRadius(_x25) {
  return _setCornerRadius.apply(this, arguments);
}
function _setCornerRadius() {
  _setCornerRadius = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(params) {
    var _ref34, nodeId, radius, corners, node;
    return _regenerator().w(function (_context41) {
      while (1) switch (_context41.n) {
        case 0:
          _ref34 = params || {}, nodeId = _ref34.nodeId, radius = _ref34.radius, corners = _ref34.corners;
          if (nodeId) {
            _context41.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(radius === undefined)) {
            _context41.n = 2;
            break;
          }
          throw new Error("Missing radius parameter");
        case 2:
          _context41.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context41.v;
          if (node) {
            _context41.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if ("cornerRadius" in node) {
            _context41.n = 5;
            break;
          }
          throw new Error("Node does not support corner radius: ".concat(nodeId));
        case 5:
          // If corners array is provided, set individual corner radii
          if (corners && Array.isArray(corners) && corners.length === 4) {
            if ("topLeftRadius" in node) {
              // Node supports individual corner radii
              if (corners[0]) node.topLeftRadius = radius;
              if (corners[1]) node.topRightRadius = radius;
              if (corners[2]) node.bottomRightRadius = radius;
              if (corners[3]) node.bottomLeftRadius = radius;
            } else {
              // Node only supports uniform corner radius
              node.cornerRadius = radius;
            }
          } else {
            // Set uniform corner radius
            node.cornerRadius = radius;
          }
          return _context41.a(2, {
            id: node.id,
            name: node.name,
            cornerRadius: "cornerRadius" in node ? node.cornerRadius : undefined,
            topLeftRadius: "topLeftRadius" in node ? node.topLeftRadius : undefined,
            topRightRadius: "topRightRadius" in node ? node.topRightRadius : undefined,
            bottomRightRadius: "bottomRightRadius" in node ? node.bottomRightRadius : undefined,
            bottomLeftRadius: "bottomLeftRadius" in node ? node.bottomLeftRadius : undefined
          });
      }
    }, _callee41);
  }));
  return _setCornerRadius.apply(this, arguments);
}
function setTextContent(_x26) {
  return _setTextContent.apply(this, arguments);
} // Initialize settings on load
function _setTextContent() {
  _setTextContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(params) {
    var _ref35, nodeId, text, node, textNode, fontsToLoad, hasMixedFonts, loadResults, failedLoads, fallbackFont, success, safeFontName, _t30;
    return _regenerator().w(function (_context42) {
      while (1) switch (_context42.n) {
        case 0:
          _ref35 = params || {}, nodeId = _ref35.nodeId, text = _ref35.text;
          if (nodeId) {
            _context42.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(text === undefined)) {
            _context42.n = 2;
            break;
          }
          throw new Error("Missing text parameter");
        case 2:
          _context42.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context42.v;
          if (node) {
            _context42.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type === "TEXT")) {
            _context42.n = 5;
            break;
          }
          textNode = node;
          _context42.n = 7;
          break;
        case 5:
          if (!(node.type === "TABLE_CELL")) {
            _context42.n = 6;
            break;
          }
          textNode = node.text; // Access the text sublayer
          console.log("Handling TABLE_CELL node ".concat(nodeId, ", accessing text sublayer"));
          _context42.n = 7;
          break;
        case 6:
          throw new Error("Node is not a text node or table cell: ".concat(nodeId, " (type: ").concat(node.type, ")"));
        case 7:
          _context42.p = 7;
          // FIX: Don't access node.fontName directly first - it might throw "Cannot unwrap symbol"
          // Instead, use getRangeAllFontNames which is safe for mixed fonts
          fontsToLoad = [];
          hasMixedFonts = false;
          try {
            // Safe way to get all fonts without triggering the symbol error
            fontsToLoad = textNode.getRangeAllFontNames(0, textNode.characters.length);
            console.log("Found ".concat(fontsToLoad.length, " fonts in text node:"), fontsToLoad.map(function (f) {
              return "".concat(f.family, " ").concat(f.style);
            }));
            hasMixedFonts = fontsToLoad.length > 1;
          } catch (e) {
            console.warn("Could not get fonts from text node:", e.message);
          }

          // Check if node has missing fonts before trying to load
          if (!textNode.hasMissingFont) {
            _context42.n = 8;
            break;
          }
          console.warn("Text node has missing fonts - will use fallback strategy");
          _context42.n = 10;
          break;
        case 8:
          if (!(fontsToLoad.length > 0)) {
            _context42.n = 10;
            break;
          }
          _context42.n = 9;
          return Promise.allSettled(fontsToLoad.map(function (font) {
            return figma.loadFontAsync(font);
          }));
        case 9:
          loadResults = _context42.v;
          failedLoads = loadResults.filter(function (r) {
            return r.status === 'rejected';
          });
          if (failedLoads.length > 0) {
            console.warn("Failed to load ".concat(failedLoads.length, " out of ").concat(fontsToLoad.length, " fonts"));
          }
        case 10:
          // Now use setCharacters with appropriate strategy
          fallbackFont = {
            family: "Inter",
            style: "Regular"
          };
          if (!(hasMixedFonts || textNode.hasMissingFont)) {
            _context42.n = 13;
            break;
          }
          _context42.n = 11;
          return setCharacters(textNode, text, {
            smartStrategy: "prevail",
            fallbackFont: fallbackFont
          });
        case 11:
          success = _context42.v;
          if (success) {
            _context42.n = 12;
            break;
          }
          throw new Error("Failed to set text content with mixed fonts");
        case 12:
          _context42.n = 14;
          break;
        case 13:
          _context42.n = 14;
          return setCharacters(textNode, text, {
            fallbackFont: fallbackFont
          });
        case 14:
          // Return safe values - avoid returning figma.mixed
          safeFontName = fallbackFont;
          try {
            // Only try to access fontName after we've set the text
            if (textNode.fontName !== figma.mixed) {
              safeFontName = textNode.fontName;
            }
          } catch (e) {
            // Even this check can throw, so we catch it
            console.warn("Could not get fontName for return value");
          }
          return _context42.a(2, {
            id: node.id,
            name: node.name,
            characters: textNode.characters,
            fontName: safeFontName
          });
        case 15:
          _context42.p = 15;
          _t30 = _context42.v;
          throw new Error("Error setting text content: ".concat(_t30.message));
        case 16:
          return _context42.a(2);
      }
    }, _callee42, null, [[7, 15]]);
  }));
  return _setTextContent.apply(this, arguments);
}
(function () {
  var _initializePlugin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var savedSettings, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return figma.clientStorage.getAsync("settings");
        case 1:
          savedSettings = _context2.v;
          if (savedSettings) {
            if (savedSettings.serverPort) {
              state.serverPort = savedSettings.serverPort;
            }
          }

          // Send initial settings to UI
          figma.ui.postMessage({
            type: "init-settings",
            settings: {
              serverPort: state.serverPort
            }
          });
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t3 = _context2.v;
          console.error("Error loading settings:", _t3);
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  function initializePlugin() {
    return _initializePlugin.apply(this, arguments);
  }
  return initializePlugin;
})()();
function uniqBy(arr, predicate) {
  var cb = typeof predicate === "function" ? predicate : function (o) {
    return o[predicate];
  };
  return _toConsumableArray(arr.reduce(function (map, item) {
    var key = item === null || item === undefined ? item : cb(item);
    map.has(key) || map.set(key, item);
    return map;
  }, new Map()).values());
}
var setCharacters = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(node, characters, options) {
    var fallbackFont, fontHashTree, i, charFont, key, prevailedTreeItem, _prevailedTreeItem$0$, _prevailedTreeItem$0$2, family, style, prevailedFont, firstCharFont, _t4, _t5;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          fallbackFont = options && options.fallbackFont || {
            family: "Inter",
            style: "Regular"
          };
          _context3.p = 1;
          if (!(node.fontName === figma.mixed)) {
            _context3.n = 8;
            break;
          }
          if (!(options && options.smartStrategy === "prevail")) {
            _context3.n = 3;
            break;
          }
          fontHashTree = {};
          for (i = 1; i < node.characters.length; i++) {
            charFont = node.getRangeFontName(i - 1, i);
            key = "".concat(charFont.family, "::").concat(charFont.style);
            fontHashTree[key] = fontHashTree[key] ? fontHashTree[key] + 1 : 1;
          }
          prevailedTreeItem = Object.entries(fontHashTree).sort(function (a, b) {
            return b[1] - a[1];
          })[0];
          _prevailedTreeItem$0$ = prevailedTreeItem[0].split("::"), _prevailedTreeItem$0$2 = _slicedToArray(_prevailedTreeItem$0$, 2), family = _prevailedTreeItem$0$2[0], style = _prevailedTreeItem$0$2[1];
          prevailedFont = {
            family: family,
            style: style
          };
          _context3.n = 2;
          return figma.loadFontAsync(prevailedFont);
        case 2:
          node.fontName = prevailedFont;
          _context3.n = 7;
          break;
        case 3:
          if (!(options && options.smartStrategy === "strict")) {
            _context3.n = 4;
            break;
          }
          return _context3.a(2, setCharactersWithStrictMatchFont(node, characters, fallbackFont));
        case 4:
          if (!(options && options.smartStrategy === "experimental")) {
            _context3.n = 5;
            break;
          }
          return _context3.a(2, setCharactersWithSmartMatchFont(node, characters, fallbackFont));
        case 5:
          firstCharFont = node.getRangeFontName(0, 1);
          _context3.n = 6;
          return figma.loadFontAsync(firstCharFont);
        case 6:
          node.fontName = firstCharFont;
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.n = 9;
          return figma.loadFontAsync({
            family: node.fontName.family,
            style: node.fontName.style
          });
        case 9:
          _context3.n = 12;
          break;
        case 10:
          _context3.p = 10;
          _t4 = _context3.v;
          console.warn("Failed to load \"".concat(node.fontName["family"], " ").concat(node.fontName["style"], "\" font and replaced with fallback \"").concat(fallbackFont.family, " ").concat(fallbackFont.style, "\""), _t4);
          _context3.n = 11;
          return figma.loadFontAsync(fallbackFont);
        case 11:
          node.fontName = fallbackFont;
        case 12:
          _context3.p = 12;
          node.characters = characters;
          return _context3.a(2, true);
        case 13:
          _context3.p = 13;
          _t5 = _context3.v;
          console.warn("Failed to set characters. Skipped.", _t5);
          return _context3.a(2, false);
      }
    }, _callee3, null, [[12, 13], [1, 10]]);
  }));
  return function setCharacters(_x27, _x28, _x29) {
    return _ref3.apply(this, arguments);
  };
}();
var setCharactersWithStrictMatchFont = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(node, characters, fallbackFont) {
    var fontHashTree, i, startIdx, startCharFont, startCharFontVal, charFont;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          fontHashTree = {};
          i = 1;
        case 1:
          if (!(i < node.characters.length)) {
            _context5.n = 6;
            break;
          }
          startIdx = i - 1;
          startCharFont = node.getRangeFontName(startIdx, i);
          startCharFontVal = "".concat(startCharFont.family, "::").concat(startCharFont.style);
        case 2:
          if (!(i < node.characters.length)) {
            _context5.n = 4;
            break;
          }
          i++;
          charFont = node.getRangeFontName(i - 1, i);
          if (!(startCharFontVal !== "".concat(charFont.family, "::").concat(charFont.style))) {
            _context5.n = 3;
            break;
          }
          return _context5.a(3, 4);
        case 3:
          _context5.n = 2;
          break;
        case 4:
          fontHashTree["".concat(startIdx, "_").concat(i)] = startCharFontVal;
        case 5:
          i++;
          _context5.n = 1;
          break;
        case 6:
          _context5.n = 7;
          return figma.loadFontAsync(fallbackFont);
        case 7:
          node.fontName = fallbackFont;
          node.characters = characters;
          console.log(fontHashTree);
          _context5.n = 8;
          return Promise.all(Object.keys(fontHashTree).map(/*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(range) {
              var _range$split, _range$split2, start, end, _fontHashTree$range$s, _fontHashTree$range$s2, family, style, matchedFont;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    console.log(range, fontHashTree[range]);
                    _range$split = range.split("_"), _range$split2 = _slicedToArray(_range$split, 2), start = _range$split2[0], end = _range$split2[1];
                    _fontHashTree$range$s = fontHashTree[range].split("::"), _fontHashTree$range$s2 = _slicedToArray(_fontHashTree$range$s, 2), family = _fontHashTree$range$s2[0], style = _fontHashTree$range$s2[1];
                    matchedFont = {
                      family: family,
                      style: style
                    };
                    _context4.n = 1;
                    return figma.loadFontAsync(matchedFont);
                  case 1:
                    return _context4.a(2, node.setRangeFontName(Number(start), Number(end), matchedFont));
                }
              }, _callee4);
            }));
            return function (_x33) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 8:
          return _context5.a(2, true);
      }
    }, _callee5);
  }));
  return function setCharactersWithStrictMatchFont(_x30, _x31, _x32) {
    return _ref4.apply(this, arguments);
  };
}();
var getDelimiterPos = function getDelimiterPos(str, delimiter) {
  var startIdx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var endIdx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : str.length;
  var indices = [];
  var temp = startIdx;
  for (var i = startIdx; i < endIdx; i++) {
    if (str[i] === delimiter && i + startIdx !== endIdx && temp !== i + startIdx) {
      indices.push([temp, i + startIdx]);
      temp = i + startIdx + 1;
    }
  }
  temp !== endIdx && indices.push([temp, endIdx]);
  return indices.filter(Boolean);
};
var buildLinearOrder = function buildLinearOrder(node) {
  var fontTree = [];
  var newLinesPos = getDelimiterPos(node.characters, "\n");
  newLinesPos.forEach(function (_ref6, n) {
    var _ref7 = _slicedToArray(_ref6, 2),
      newLinesRangeStart = _ref7[0],
      newLinesRangeEnd = _ref7[1];
    var newLinesRangeFont = node.getRangeFontName(newLinesRangeStart, newLinesRangeEnd);
    if (newLinesRangeFont === figma.mixed) {
      var spacesPos = getDelimiterPos(node.characters, " ", newLinesRangeStart, newLinesRangeEnd);
      spacesPos.forEach(function (_ref8, s) {
        var _ref9 = _slicedToArray(_ref8, 2),
          spacesRangeStart = _ref9[0],
          spacesRangeEnd = _ref9[1];
        var spacesRangeFont = node.getRangeFontName(spacesRangeStart, spacesRangeEnd);
        if (spacesRangeFont === figma.mixed) {
          var _spacesRangeFont = node.getRangeFontName(spacesRangeStart, spacesRangeStart[0]);
          fontTree.push({
            start: spacesRangeStart,
            delimiter: " ",
            family: _spacesRangeFont.family,
            style: _spacesRangeFont.style
          });
        } else {
          fontTree.push({
            start: spacesRangeStart,
            delimiter: " ",
            family: spacesRangeFont.family,
            style: spacesRangeFont.style
          });
        }
      });
    } else {
      fontTree.push({
        start: newLinesRangeStart,
        delimiter: "\n",
        family: newLinesRangeFont.family,
        style: newLinesRangeFont.style
      });
    }
  });
  return fontTree.sort(function (a, b) {
    return +a.start - +b.start;
  }).map(function (_ref0) {
    var family = _ref0.family,
      style = _ref0.style,
      delimiter = _ref0.delimiter;
    return {
      family: family,
      style: style,
      delimiter: delimiter
    };
  });
};
var setCharactersWithSmartMatchFont = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(node, characters, fallbackFont) {
    var rangeTree, fontsToLoad, prevPos;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          rangeTree = buildLinearOrder(node);
          fontsToLoad = uniqBy(rangeTree, function (_ref10) {
            var family = _ref10.family,
              style = _ref10.style;
            return "".concat(family, "::").concat(style);
          }).map(function (_ref11) {
            var family = _ref11.family,
              style = _ref11.style;
            return {
              family: family,
              style: style
            };
          });
          _context6.n = 1;
          return Promise.all([].concat(_toConsumableArray(fontsToLoad), [fallbackFont]).map(figma.loadFontAsync));
        case 1:
          node.fontName = fallbackFont;
          node.characters = characters;
          prevPos = 0;
          rangeTree.forEach(function (_ref12) {
            var family = _ref12.family,
              style = _ref12.style,
              delimiter = _ref12.delimiter;
            if (prevPos < node.characters.length) {
              var delimeterPos = node.characters.indexOf(delimiter, prevPos);
              var endPos = delimeterPos > prevPos ? delimeterPos : node.characters.length;
              var matchedFont = {
                family: family,
                style: style
              };
              node.setRangeFontName(prevPos, endPos, matchedFont);
              prevPos = endPos + 1;
            }
          });
          return _context6.a(2, true);
      }
    }, _callee6);
  }));
  return function setCharactersWithSmartMatchFont(_x34, _x35, _x36) {
    return _ref1.apply(this, arguments);
  };
}();

// Add the cloneNode function implementation
function cloneNode(_x37) {
  return _cloneNode.apply(this, arguments);
}
function _cloneNode() {
  _cloneNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(params) {
    var _ref36, nodeId, x, y, node, clone;
    return _regenerator().w(function (_context43) {
      while (1) switch (_context43.n) {
        case 0:
          _ref36 = params || {}, nodeId = _ref36.nodeId, x = _ref36.x, y = _ref36.y;
          if (nodeId) {
            _context43.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context43.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context43.v;
          if (node) {
            _context43.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          // Clone the node
          clone = node.clone(); // If x and y are provided, move the clone to that position
          if (!(x !== undefined && y !== undefined)) {
            _context43.n = 5;
            break;
          }
          if (!(!("x" in clone) || !("y" in clone))) {
            _context43.n = 4;
            break;
          }
          throw new Error("Cloned node does not support position: ".concat(nodeId));
        case 4:
          clone.x = x;
          clone.y = y;
        case 5:
          // Add the clone to the same parent as the original node
          if (node.parent) {
            node.parent.appendChild(clone);
          } else {
            figma.currentPage.appendChild(clone);
          }
          return _context43.a(2, {
            id: clone.id,
            name: clone.name,
            x: "x" in clone ? clone.x : undefined,
            y: "y" in clone ? clone.y : undefined,
            width: "width" in clone ? clone.width : undefined,
            height: "height" in clone ? clone.height : undefined
          });
      }
    }, _callee43);
  }));
  return _cloneNode.apply(this, arguments);
}
function scanTextNodes(_x38) {
  return _scanTextNodes.apply(this, arguments);
} // Helper function to collect all nodes that need to be processed
function _scanTextNodes() {
  _scanTextNodes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(params) {
    var _ref37, nodeId, _ref37$useChunking, useChunking, _ref37$chunkSize, chunkSize, _ref37$commandId, commandId, node, textNodes, nodesToProcess, totalNodes, totalChunks, allTextNodes, processedNodes, chunksProcessed, i, chunkEnd, chunkNodes, chunkTextNodes, _iterator4, _step4, nodeInfo, textNodeInfo, _t31, _t32, _t33;
    return _regenerator().w(function (_context44) {
      while (1) switch (_context44.n) {
        case 0:
          console.log("Starting to scan text nodes from node ID: ".concat(params.nodeId));
          _ref37 = params || {}, nodeId = _ref37.nodeId, _ref37$useChunking = _ref37.useChunking, useChunking = _ref37$useChunking === void 0 ? true : _ref37$useChunking, _ref37$chunkSize = _ref37.chunkSize, chunkSize = _ref37$chunkSize === void 0 ? 10 : _ref37$chunkSize, _ref37$commandId = _ref37.commandId, commandId = _ref37$commandId === void 0 ? generateCommandId() : _ref37$commandId;
          _context44.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context44.v;
          if (node) {
            _context44.n = 2;
            break;
          }
          console.error("Node with ID ".concat(nodeId, " not found"));
          // Send error progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "error", 0, 0, 0, "Node with ID ".concat(nodeId, " not found"), {
            error: "Node not found: ".concat(nodeId)
          });
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (useChunking) {
            _context44.n = 6;
            break;
          }
          textNodes = [];
          _context44.p = 3;
          // Send started progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "started", 0, 1,
          // Not known yet how many nodes there are
          0, "Starting scan of node \"".concat(node.name || nodeId, "\" without chunking"), null);
          _context44.n = 4;
          return findTextNodes(node, [], 0, textNodes);
        case 4:
          // Send completed progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "completed", 100, textNodes.length, textNodes.length, "Scan complete. Found ".concat(textNodes.length, " text nodes."), {
            textNodes: textNodes
          });
          return _context44.a(2, {
            success: true,
            message: "Scanned ".concat(textNodes.length, " text nodes."),
            count: textNodes.length,
            textNodes: textNodes,
            commandId: commandId
          });
        case 5:
          _context44.p = 5;
          _t31 = _context44.v;
          console.error("Error scanning text nodes:", _t31);

          // Send error progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "error", 0, 0, 0, "Error scanning text nodes: ".concat(_t31.message), {
            error: _t31.message
          });
          throw new Error("Error scanning text nodes: ".concat(_t31.message));
        case 6:
          // Chunked implementation
          console.log("Using chunked scanning with chunk size: ".concat(chunkSize));

          // First, collect all nodes to process (without processing them yet)
          nodesToProcess = []; // Send started progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "started", 0, 0,
          // Not known yet how many nodes there are
          0, "Starting chunked scan of node \"".concat(node.name || nodeId, "\""), {
            chunkSize: chunkSize
          });
          _context44.n = 7;
          return collectNodesToProcess(node, [], 0, nodesToProcess);
        case 7:
          totalNodes = nodesToProcess.length;
          console.log("Found ".concat(totalNodes, " total nodes to process"));

          // Calculate number of chunks needed
          totalChunks = Math.ceil(totalNodes / chunkSize);
          console.log("Will process in ".concat(totalChunks, " chunks"));

          // Send update after node collection
          sendProgressUpdate(commandId, "scan_text_nodes", "in_progress", 5,
          // 5% progress for collection phase
          totalNodes, 0, "Found ".concat(totalNodes, " nodes to scan. Will process in ").concat(totalChunks, " chunks."), {
            totalNodes: totalNodes,
            totalChunks: totalChunks,
            chunkSize: chunkSize
          });

          // Process nodes in chunks
          allTextNodes = [];
          processedNodes = 0;
          chunksProcessed = 0;
          i = 0;
        case 8:
          if (!(i < totalNodes)) {
            _context44.n = 21;
            break;
          }
          chunkEnd = Math.min(i + chunkSize, totalNodes);
          console.log("Processing chunk ".concat(chunksProcessed + 1, "/").concat(totalChunks, " (nodes ").concat(i, " to ").concat(chunkEnd - 1, ")"));

          // Send update before processing chunk
          sendProgressUpdate(commandId, "scan_text_nodes", "in_progress", Math.round(5 + chunksProcessed / totalChunks * 90),
          // 5-95% for processing
          totalNodes, processedNodes, "Processing chunk ".concat(chunksProcessed + 1, "/").concat(totalChunks), {
            currentChunk: chunksProcessed + 1,
            totalChunks: totalChunks,
            textNodesFound: allTextNodes.length
          });
          chunkNodes = nodesToProcess.slice(i, chunkEnd);
          chunkTextNodes = []; // Process each node in this chunk
          _iterator4 = _createForOfIteratorHelper(chunkNodes);
          _context44.p = 9;
          _iterator4.s();
        case 10:
          if ((_step4 = _iterator4.n()).done) {
            _context44.n = 16;
            break;
          }
          nodeInfo = _step4.value;
          if (!(nodeInfo.node.type === "TEXT")) {
            _context44.n = 14;
            break;
          }
          _context44.p = 11;
          _context44.n = 12;
          return processTextNode(nodeInfo.node, nodeInfo.parentPath, nodeInfo.depth);
        case 12:
          textNodeInfo = _context44.v;
          if (textNodeInfo) {
            chunkTextNodes.push(textNodeInfo);
          }
          _context44.n = 14;
          break;
        case 13:
          _context44.p = 13;
          _t32 = _context44.v;
          console.error("Error processing text node: ".concat(_t32.message));
          // Continue with other nodes
        case 14:
          _context44.n = 15;
          return delay(5);
        case 15:
          _context44.n = 10;
          break;
        case 16:
          _context44.n = 18;
          break;
        case 17:
          _context44.p = 17;
          _t33 = _context44.v;
          _iterator4.e(_t33);
        case 18:
          _context44.p = 18;
          _iterator4.f();
          return _context44.f(18);
        case 19:
          // Add results from this chunk
          allTextNodes.push.apply(allTextNodes, chunkTextNodes);
          processedNodes += chunkNodes.length;
          chunksProcessed++;

          // Send update after processing chunk
          sendProgressUpdate(commandId, "scan_text_nodes", "in_progress", Math.round(5 + chunksProcessed / totalChunks * 90),
          // 5-95% for processing
          totalNodes, processedNodes, "Processed chunk ".concat(chunksProcessed, "/").concat(totalChunks, ". Found ").concat(allTextNodes.length, " text nodes so far."), {
            currentChunk: chunksProcessed,
            totalChunks: totalChunks,
            processedNodes: processedNodes,
            textNodesFound: allTextNodes.length,
            chunkResult: chunkTextNodes
          });

          // Small delay between chunks to prevent UI freezing
          if (!(i + chunkSize < totalNodes)) {
            _context44.n = 20;
            break;
          }
          _context44.n = 20;
          return delay(50);
        case 20:
          i += chunkSize;
          _context44.n = 8;
          break;
        case 21:
          // Send completed progress update
          sendProgressUpdate(commandId, "scan_text_nodes", "completed", 100, totalNodes, processedNodes, "Scan complete. Found ".concat(allTextNodes.length, " text nodes."), {
            textNodes: allTextNodes,
            processedNodes: processedNodes,
            chunks: chunksProcessed
          });
          return _context44.a(2, {
            success: true,
            message: "Chunked scan complete. Found ".concat(allTextNodes.length, " text nodes."),
            totalNodes: allTextNodes.length,
            processedNodes: processedNodes,
            chunks: chunksProcessed,
            textNodes: allTextNodes,
            commandId: commandId
          });
      }
    }, _callee44, null, [[11, 13], [9, 17, 18, 19], [3, 5]]);
  }));
  return _scanTextNodes.apply(this, arguments);
}
function collectNodesToProcess(_x39) {
  return _collectNodesToProcess.apply(this, arguments);
} // Process a single text node
function _collectNodesToProcess() {
  _collectNodesToProcess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(node) {
    var parentPath,
      depth,
      nodesToProcess,
      nodePath,
      _iterator5,
      _step5,
      child,
      _args45 = arguments,
      _t34;
    return _regenerator().w(function (_context45) {
      while (1) switch (_context45.n) {
        case 0:
          parentPath = _args45.length > 1 && _args45[1] !== undefined ? _args45[1] : [];
          depth = _args45.length > 2 && _args45[2] !== undefined ? _args45[2] : 0;
          nodesToProcess = _args45.length > 3 && _args45[3] !== undefined ? _args45[3] : [];
          if (!(node.visible === false)) {
            _context45.n = 1;
            break;
          }
          return _context45.a(2);
        case 1:
          // Get the path to this node
          nodePath = [].concat(_toConsumableArray(parentPath), [node.name || "Unnamed ".concat(node.type)]); // Add this node to the processing list
          nodesToProcess.push({
            node: node,
            parentPath: nodePath,
            depth: depth
          });

          // Recursively add children
          if (!("children" in node)) {
            _context45.n = 8;
            break;
          }
          _iterator5 = _createForOfIteratorHelper(node.children);
          _context45.p = 2;
          _iterator5.s();
        case 3:
          if ((_step5 = _iterator5.n()).done) {
            _context45.n = 5;
            break;
          }
          child = _step5.value;
          _context45.n = 4;
          return collectNodesToProcess(child, nodePath, depth + 1, nodesToProcess);
        case 4:
          _context45.n = 3;
          break;
        case 5:
          _context45.n = 7;
          break;
        case 6:
          _context45.p = 6;
          _t34 = _context45.v;
          _iterator5.e(_t34);
        case 7:
          _context45.p = 7;
          _iterator5.f();
          return _context45.f(7);
        case 8:
          return _context45.a(2);
      }
    }, _callee45, null, [[2, 6, 7, 8]]);
  }));
  return _collectNodesToProcess.apply(this, arguments);
}
function processTextNode(_x40, _x41, _x42) {
  return _processTextNode.apply(this, arguments);
} // A delay function that returns a promise
function _processTextNode() {
  _processTextNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46(node, parentPath, depth) {
    var fontFamily, fontStyle, safeTextNode, originalFills, _t35, _t36;
    return _regenerator().w(function (_context46) {
      while (1) switch (_context46.n) {
        case 0:
          if (!(node.type !== "TEXT")) {
            _context46.n = 1;
            break;
          }
          return _context46.a(2, null);
        case 1:
          _context46.p = 1;
          // Safely extract font information
          fontFamily = "";
          fontStyle = "";
          if (node.fontName) {
            if (_typeof(node.fontName) === "object") {
              if ("family" in node.fontName) fontFamily = node.fontName.family;
              if ("style" in node.fontName) fontStyle = node.fontName.style;
            }
          }

          // Create a safe representation of the text node
          safeTextNode = {
            id: node.id,
            name: node.name || "Text",
            type: node.type,
            characters: node.characters,
            fontSize: typeof node.fontSize === "number" ? node.fontSize : 0,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            x: typeof node.x === "number" ? node.x : 0,
            y: typeof node.y === "number" ? node.y : 0,
            width: typeof node.width === "number" ? node.width : 0,
            height: typeof node.height === "number" ? node.height : 0,
            path: parentPath.join(" > "),
            depth: depth
          }; // Highlight the node briefly (optional visual feedback)
          _context46.p = 2;
          originalFills = JSON.parse(JSON.stringify(node.fills));
          node.fills = [{
            type: "SOLID",
            color: {
              r: 1,
              g: 0.5,
              b: 0
            },
            opacity: 0.3
          }];

          // Brief delay for the highlight to be visible
          _context46.n = 3;
          return delay(100);
        case 3:
          try {
            node.fills = originalFills;
          } catch (err) {
            console.error("Error resetting fills:", err);
          }
          _context46.n = 5;
          break;
        case 4:
          _context46.p = 4;
          _t35 = _context46.v;
          console.error("Error highlighting text node:", _t35);
          // Continue anyway, highlighting is just visual feedback
        case 5:
          return _context46.a(2, safeTextNode);
        case 6:
          _context46.p = 6;
          _t36 = _context46.v;
          console.error("Error processing text node:", _t36);
          return _context46.a(2, null);
      }
    }, _callee46, null, [[2, 4], [1, 6]]);
  }));
  return _processTextNode.apply(this, arguments);
}
function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

// Keep the original findTextNodes for backward compatibility
function findTextNodes(_x43) {
  return _findTextNodes.apply(this, arguments);
} // Replace text in a specific node
function _findTextNodes() {
  _findTextNodes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(node) {
    var parentPath,
      depth,
      textNodes,
      nodePath,
      fontFamily,
      fontStyle,
      safeTextNode,
      originalFills,
      _iterator6,
      _step6,
      child,
      _args47 = arguments,
      _t37,
      _t38,
      _t39;
    return _regenerator().w(function (_context47) {
      while (1) switch (_context47.n) {
        case 0:
          parentPath = _args47.length > 1 && _args47[1] !== undefined ? _args47[1] : [];
          depth = _args47.length > 2 && _args47[2] !== undefined ? _args47[2] : 0;
          textNodes = _args47.length > 3 && _args47[3] !== undefined ? _args47[3] : [];
          if (!(node.visible === false)) {
            _context47.n = 1;
            break;
          }
          return _context47.a(2);
        case 1:
          // Get the path to this node including its name
          nodePath = [].concat(_toConsumableArray(parentPath), [node.name || "Unnamed ".concat(node.type)]);
          if (!(node.type === "TEXT")) {
            _context47.n = 8;
            break;
          }
          _context47.p = 2;
          // Safely extract font information to avoid Symbol serialization issues
          fontFamily = "";
          fontStyle = "";
          if (node.fontName) {
            if (_typeof(node.fontName) === "object") {
              if ("family" in node.fontName) fontFamily = node.fontName.family;
              if ("style" in node.fontName) fontStyle = node.fontName.style;
            }
          }

          // Create a safe representation of the text node with only serializable properties
          safeTextNode = {
            id: node.id,
            name: node.name || "Text",
            type: node.type,
            characters: node.characters,
            fontSize: typeof node.fontSize === "number" ? node.fontSize : 0,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            x: typeof node.x === "number" ? node.x : 0,
            y: typeof node.y === "number" ? node.y : 0,
            width: typeof node.width === "number" ? node.width : 0,
            height: typeof node.height === "number" ? node.height : 0,
            path: nodePath.join(" > "),
            depth: depth
          }; // Only highlight the node if it's not being done via API
          _context47.p = 3;
          // Safe way to create a temporary highlight without causing serialization issues
          originalFills = JSON.parse(JSON.stringify(node.fills));
          node.fills = [{
            type: "SOLID",
            color: {
              r: 1,
              g: 0.5,
              b: 0
            },
            opacity: 0.3
          }];

          // Promise-based delay instead of setTimeout
          _context47.n = 4;
          return delay(500);
        case 4:
          try {
            node.fills = originalFills;
          } catch (err) {
            console.error("Error resetting fills:", err);
          }
          _context47.n = 6;
          break;
        case 5:
          _context47.p = 5;
          _t37 = _context47.v;
          console.error("Error highlighting text node:", _t37);
          // Continue anyway, highlighting is just visual feedback
        case 6:
          textNodes.push(safeTextNode);
          _context47.n = 8;
          break;
        case 7:
          _context47.p = 7;
          _t38 = _context47.v;
          console.error("Error processing text node:", _t38);
          // Skip this node but continue with others
        case 8:
          if (!("children" in node)) {
            _context47.n = 15;
            break;
          }
          _iterator6 = _createForOfIteratorHelper(node.children);
          _context47.p = 9;
          _iterator6.s();
        case 10:
          if ((_step6 = _iterator6.n()).done) {
            _context47.n = 12;
            break;
          }
          child = _step6.value;
          _context47.n = 11;
          return findTextNodes(child, nodePath, depth + 1, textNodes);
        case 11:
          _context47.n = 10;
          break;
        case 12:
          _context47.n = 14;
          break;
        case 13:
          _context47.p = 13;
          _t39 = _context47.v;
          _iterator6.e(_t39);
        case 14:
          _context47.p = 14;
          _iterator6.f();
          return _context47.f(14);
        case 15:
          return _context47.a(2);
      }
    }, _callee47, null, [[9, 13, 14, 15], [3, 5], [2, 7]]);
  }));
  return _findTextNodes.apply(this, arguments);
}
function setMultipleTextContents(_x44) {
  return _setMultipleTextContents.apply(this, arguments);
} // New text formatting preservation functions
function _setMultipleTextContents() {
  _setMultipleTextContents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(params) {
    var _ref38, nodeId, text, commandId, errorMsg, results, successCount, failureCount, CHUNK_SIZE, chunks, i, chunkIndex, chunk, chunkPromises, chunkResults;
    return _regenerator().w(function (_context49) {
      while (1) switch (_context49.n) {
        case 0:
          _ref38 = params || {}, nodeId = _ref38.nodeId, text = _ref38.text;
          commandId = params.commandId || generateCommandId();
          if (!(!nodeId || !text || !Array.isArray(text))) {
            _context49.n = 1;
            break;
          }
          errorMsg = "Missing required parameters: nodeId and text array"; // Send error progress update
          sendProgressUpdate(commandId, "set_multiple_text_contents", "error", 0, 0, 0, errorMsg, {
            error: errorMsg
          });
          throw new Error(errorMsg);
        case 1:
          console.log("Starting text replacement for node: ".concat(nodeId, " with ").concat(text.length, " text replacements"));

          // Send started progress update
          sendProgressUpdate(commandId, "set_multiple_text_contents", "started", 0, text.length, 0, "Starting text replacement for ".concat(text.length, " nodes"), {
            totalReplacements: text.length
          });

          // Define the results array and counters
          results = [];
          successCount = 0;
          failureCount = 0; // Split text replacements into chunks of 5
          CHUNK_SIZE = 5;
          chunks = [];
          for (i = 0; i < text.length; i += CHUNK_SIZE) {
            chunks.push(text.slice(i, i + CHUNK_SIZE));
          }
          console.log("Split ".concat(text.length, " replacements into ").concat(chunks.length, " chunks"));

          // Send chunking info update
          sendProgressUpdate(commandId, "set_multiple_text_contents", "in_progress", 5,
          // 5% progress for planning phase
          text.length, 0, "Preparing to replace text in ".concat(text.length, " nodes using ").concat(chunks.length, " chunks"), {
            totalReplacements: text.length,
            chunks: chunks.length,
            chunkSize: CHUNK_SIZE
          });

          // Process each chunk sequentially
          chunkIndex = 0;
        case 2:
          if (!(chunkIndex < chunks.length)) {
            _context49.n = 5;
            break;
          }
          chunk = chunks[chunkIndex];
          console.log("Processing chunk ".concat(chunkIndex + 1, "/").concat(chunks.length, " with ").concat(chunk.length, " replacements"));

          // Send chunk processing start update
          sendProgressUpdate(commandId, "set_multiple_text_contents", "in_progress", Math.round(5 + chunkIndex / chunks.length * 90),
          // 5-95% for processing
          text.length, successCount + failureCount, "Processing text replacements chunk ".concat(chunkIndex + 1, "/").concat(chunks.length), {
            currentChunk: chunkIndex + 1,
            totalChunks: chunks.length,
            successCount: successCount,
            failureCount: failureCount
          });

          // Process replacements within a chunk in parallel
          chunkPromises = chunk.map(/*#__PURE__*/function () {
            var _ref39 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(replacement) {
              var textNode, textToUpdate, originalText, originalFills, _t40, _t41;
              return _regenerator().w(function (_context48) {
                while (1) switch (_context48.n) {
                  case 0:
                    if (!(!replacement.nodeId || replacement.text === undefined)) {
                      _context48.n = 1;
                      break;
                    }
                    console.error("Missing nodeId or text for replacement");
                    return _context48.a(2, {
                      success: false,
                      nodeId: replacement.nodeId || "unknown",
                      error: "Missing nodeId or text in replacement entry"
                    });
                  case 1:
                    _context48.p = 1;
                    console.log("Attempting to replace text in node: ".concat(replacement.nodeId));

                    // Get the text node to update (just to check it exists and get original text)
                    _context48.n = 2;
                    return figma.getNodeByIdAsync(replacement.nodeId);
                  case 2:
                    textNode = _context48.v;
                    if (textNode) {
                      _context48.n = 3;
                      break;
                    }
                    console.error("Text node not found: ".concat(replacement.nodeId));
                    return _context48.a(2, {
                      success: false,
                      nodeId: replacement.nodeId,
                      error: "Node not found: ".concat(replacement.nodeId)
                    });
                  case 3:
                    if (!(textNode.type === "TEXT")) {
                      _context48.n = 4;
                      break;
                    }
                    textToUpdate = textNode;
                    originalText = textNode.characters;
                    _context48.n = 6;
                    break;
                  case 4:
                    if (!(textNode.type === "TABLE_CELL")) {
                      _context48.n = 5;
                      break;
                    }
                    // Table cells have a text sublayer
                    textToUpdate = textNode.text;
                    originalText = textToUpdate.characters;
                    console.log("Handling TABLE_CELL node ".concat(replacement.nodeId, ", accessing text sublayer"));
                    _context48.n = 6;
                    break;
                  case 5:
                    console.error("Node is not a text node or table cell: ".concat(replacement.nodeId, " (type: ").concat(textNode.type, ")"));
                    return _context48.a(2, {
                      success: false,
                      nodeId: replacement.nodeId,
                      error: "Node is not a text node or table cell: ".concat(replacement.nodeId, " (type: ").concat(textNode.type, ")")
                    });
                  case 6:
                    // Save original text for the result
                    console.log("Original text: \"".concat(originalText, "\""));
                    console.log("Will translate to: \"".concat(replacement.text, "\""));

                    // Highlight the node before changing text

                    try {
                      // Save original fills for restoration later
                      originalFills = JSON.parse(JSON.stringify(textNode.fills));
                      // Apply highlight color (orange with 30% opacity)
                      textNode.fills = [{
                        type: "SOLID",
                        color: {
                          r: 1,
                          g: 0.5,
                          b: 0
                        },
                        opacity: 0.3
                      }];
                    } catch (highlightErr) {
                      console.error("Error highlighting text node: ".concat(highlightErr.message));
                      // Continue anyway, highlighting is just visual feedback
                    }

                    // Use the existing setTextContent function to handle font loading and text setting
                    _context48.n = 7;
                    return setTextContent({
                      nodeId: replacement.nodeId,
                      text: replacement.text
                    });
                  case 7:
                    if (!originalFills) {
                      _context48.n = 11;
                      break;
                    }
                    _context48.p = 8;
                    _context48.n = 9;
                    return delay(500);
                  case 9:
                    textNode.fills = originalFills;
                    _context48.n = 11;
                    break;
                  case 10:
                    _context48.p = 10;
                    _t40 = _context48.v;
                    console.error("Error restoring fills: ".concat(_t40.message));
                  case 11:
                    console.log("Successfully replaced text in node: ".concat(replacement.nodeId));
                    return _context48.a(2, {
                      success: true,
                      nodeId: replacement.nodeId,
                      originalText: originalText,
                      translatedText: replacement.text
                    });
                  case 12:
                    _context48.p = 12;
                    _t41 = _context48.v;
                    console.error("Error replacing text in node ".concat(replacement.nodeId, ": ").concat(_t41.message));
                    return _context48.a(2, {
                      success: false,
                      nodeId: replacement.nodeId,
                      error: "Error applying replacement: ".concat(_t41.message)
                    });
                }
              }, _callee48, null, [[8, 10], [1, 12]]);
            }));
            return function (_x89) {
              return _ref39.apply(this, arguments);
            };
          }()); // Wait for all replacements in this chunk to complete
          _context49.n = 3;
          return Promise.all(chunkPromises);
        case 3:
          chunkResults = _context49.v;
          // Process results for this chunk
          chunkResults.forEach(function (result) {
            if (result.success) {
              successCount++;
            } else {
              failureCount++;
            }
            results.push(result);
          });

          // Send chunk processing complete update with partial results
          sendProgressUpdate(commandId, "set_multiple_text_contents", "in_progress", Math.round(5 + (chunkIndex + 1) / chunks.length * 90),
          // 5-95% for processing
          text.length, successCount + failureCount, "Completed chunk ".concat(chunkIndex + 1, "/").concat(chunks.length, ". ").concat(successCount, " successful, ").concat(failureCount, " failed so far."), {
            currentChunk: chunkIndex + 1,
            totalChunks: chunks.length,
            successCount: successCount,
            failureCount: failureCount,
            chunkResults: chunkResults
          });

          // Add a small delay between chunks to avoid overloading Figma
          if (!(chunkIndex < chunks.length - 1)) {
            _context49.n = 4;
            break;
          }
          console.log("Pausing between chunks to avoid overloading Figma...");
          _context49.n = 4;
          return delay(1000);
        case 4:
          chunkIndex++;
          _context49.n = 2;
          break;
        case 5:
          console.log("Replacement complete: ".concat(successCount, " successful, ").concat(failureCount, " failed"));

          // Send completed progress update
          sendProgressUpdate(commandId, "set_multiple_text_contents", "completed", 100, text.length, successCount + failureCount, "Text replacement complete: ".concat(successCount, " successful, ").concat(failureCount, " failed"), {
            totalReplacements: text.length,
            replacementsApplied: successCount,
            replacementsFailed: failureCount,
            completedInChunks: chunks.length,
            results: results
          });
          return _context49.a(2, {
            success: successCount > 0,
            nodeId: nodeId,
            replacementsApplied: successCount,
            replacementsFailed: failureCount,
            totalReplacements: text.length,
            results: results,
            completedInChunks: chunks.length,
            commandId: commandId
          });
      }
    }, _callee49);
  }));
  return _setMultipleTextContents.apply(this, arguments);
}
function updateTextPreserveFormatting(_x45) {
  return _updateTextPreserveFormatting.apply(this, arguments);
}
function _updateTextPreserveFormatting() {
  _updateTextPreserveFormatting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(params) {
    var _ref40, nodeId, newText, _ref40$preserveFormat, preserveFormattingStrategy, node, oldText, formatting, styleProps, currentStart, currentStyle, rangeEnd, _iterator7, _step7, _prop, _value, i, matches, _i, _Object$keys, prop, value, fontsToLoad, _i2, _formatting, format, _iterator8, _step8, font, _i3, _formatting2, _format, start, end, oldLength, newLength, _i4, _Object$entries, _Object$entries$_i, _prop2, _value2, _t42, _t43, _t44, _t45;
    return _regenerator().w(function (_context50) {
      while (1) switch (_context50.n) {
        case 0:
          _ref40 = params || {}, nodeId = _ref40.nodeId, newText = _ref40.newText, _ref40$preserveFormat = _ref40.preserveFormattingStrategy, preserveFormattingStrategy = _ref40$preserveFormat === void 0 ? "stretch" : _ref40$preserveFormat;
          if (nodeId) {
            _context50.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(!newText && newText !== "")) {
            _context50.n = 2;
            break;
          }
          throw new Error("Missing newText parameter");
        case 2:
          _context50.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context50.v;
          if (!(!node || node.type !== 'TEXT')) {
            _context50.n = 4;
            break;
          }
          throw new Error("Node ".concat(nodeId, " is not a text node"));
        case 4:
          // Step 1: Capture current formatting
          oldText = node.characters;
          formatting = []; // Get all style properties for each character range
          styleProps = ['fontSize', 'fontName', 'fontWeight', 'textDecoration', 'fills', 'letterSpacing', 'lineHeight', 'textCase'];
          currentStart = 0;
        case 5:
          if (!(currentStart < oldText.length)) {
            _context50.n = 16;
            break;
          }
          currentStyle = {};
          rangeEnd = currentStart + 1; // Get style for current position
          _iterator7 = _createForOfIteratorHelper(styleProps);
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              _prop = _step7.value;
              try {
                _value = node.getRangeProperty(currentStart, currentStart + 1, _prop);
                if (_value !== figma.mixed) {
                  currentStyle[_prop] = _value;
                }
              } catch (e) {
                // Property might not exist
              }
            }

            // Find how far this style extends
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          i = currentStart + 1;
        case 6:
          if (!(i <= oldText.length)) {
            _context50.n = 15;
            break;
          }
          matches = true;
          _i = 0, _Object$keys = Object.keys(currentStyle);
        case 7:
          if (!(_i < _Object$keys.length)) {
            _context50.n = 12;
            break;
          }
          prop = _Object$keys[_i];
          _context50.p = 8;
          value = node.getRangeProperty(i - 1, i, prop);
          if (!(JSON.stringify(value) !== JSON.stringify(currentStyle[prop]))) {
            _context50.n = 9;
            break;
          }
          matches = false;
          return _context50.a(3, 12);
        case 9:
          _context50.n = 11;
          break;
        case 10:
          _context50.p = 10;
          _t42 = _context50.v;
          matches = false;
          return _context50.a(3, 12);
        case 11:
          _i++;
          _context50.n = 7;
          break;
        case 12:
          if (matches) {
            _context50.n = 13;
            break;
          }
          rangeEnd = i - 1;
          return _context50.a(3, 15);
        case 13:
          rangeEnd = i;
        case 14:
          i++;
          _context50.n = 6;
          break;
        case 15:
          formatting.push({
            start: currentStart,
            end: rangeEnd,
            style: currentStyle
          });
          currentStart = rangeEnd;
          _context50.n = 5;
          break;
        case 16:
          // Step 2: Update text
          // Load all fonts that might be needed
          fontsToLoad = new Set();
          for (_i2 = 0, _formatting = formatting; _i2 < _formatting.length; _i2++) {
            format = _formatting[_i2];
            if (format.style.fontName) {
              fontsToLoad.add(format.style.fontName);
            }
          }

          // Also load current font as fallback
          if (node.fontName !== figma.mixed) {
            fontsToLoad.add(node.fontName);
          }

          // Load fonts
          _iterator8 = _createForOfIteratorHelper(fontsToLoad);
          _context50.p = 17;
          _iterator8.s();
        case 18:
          if ((_step8 = _iterator8.n()).done) {
            _context50.n = 23;
            break;
          }
          font = _step8.value;
          _context50.p = 19;
          _context50.n = 20;
          return figma.loadFontAsync(font);
        case 20:
          _context50.n = 22;
          break;
        case 21:
          _context50.p = 21;
          _t43 = _context50.v;
          console.warn("Failed to load font ".concat(font.family, " ").concat(font.style, ":"), _t43);
        case 22:
          _context50.n = 18;
          break;
        case 23:
          _context50.n = 25;
          break;
        case 24:
          _context50.p = 24;
          _t44 = _context50.v;
          _iterator8.e(_t44);
        case 25:
          _context50.p = 25;
          _iterator8.f();
          return _context50.f(25);
        case 26:
          // Update the text
          node.characters = newText;

          // Step 3: Reapply formatting based on strategy
          _i3 = 0, _formatting2 = formatting;
        case 27:
          if (!(_i3 < _formatting2.length)) {
            _context50.n = 39;
            break;
          }
          _format = _formatting2[_i3];
          start = _format.start;
          end = _format.end;
          if (!(preserveFormattingStrategy === "stretch")) {
            _context50.n = 28;
            break;
          }
          // Stretch formatting proportionally
          oldLength = oldText.length;
          newLength = newText.length;
          if (oldLength > 0) {
            start = Math.floor(_format.start * newLength / oldLength);
            end = Math.floor(_format.end * newLength / oldLength);
          }
          _context50.n = 31;
          break;
        case 28:
          if (!(preserveFormattingStrategy === "repeat")) {
            _context50.n = 29;
            break;
          }
          // Repeat pattern if new text is longer
          // Keep as-is if shorter
          end = Math.min(end, newText.length);
          _context50.n = 31;
          break;
        case 29:
          if (!(preserveFormattingStrategy === "reset_overflow")) {
            _context50.n = 31;
            break;
          }
          if (!(start >= newText.length)) {
            _context50.n = 30;
            break;
          }
          return _context50.a(3, 38);
        case 30:
          end = Math.min(end, newText.length);
        case 31:
          if (!(start >= newText.length || start >= end)) {
            _context50.n = 32;
            break;
          }
          return _context50.a(3, 38);
        case 32:
          end = Math.min(end, newText.length);

          // Apply each style property
          _i4 = 0, _Object$entries = Object.entries(_format.style);
        case 33:
          if (!(_i4 < _Object$entries.length)) {
            _context50.n = 38;
            break;
          }
          _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2), _prop2 = _Object$entries$_i[0], _value2 = _Object$entries$_i[1];
          _context50.p = 34;
          if (!(_prop2 === 'fontName' && _value2)) {
            _context50.n = 35;
            break;
          }
          _context50.n = 35;
          return figma.loadFontAsync(_value2);
        case 35:
          node.setRangeProperty(start, end, _prop2, _value2);
          _context50.n = 37;
          break;
        case 36:
          _context50.p = 36;
          _t45 = _context50.v;
          console.warn("Failed to apply ".concat(_prop2, " to range ").concat(start, "-").concat(end, ":"), _t45);
        case 37:
          _i4++;
          _context50.n = 33;
          break;
        case 38:
          _i3++;
          _context50.n = 27;
          break;
        case 39:
          return _context50.a(2, {
            success: true,
            nodeId: nodeId,
            oldLength: oldText.length,
            newLength: newText.length,
            formattingStrategy: preserveFormattingStrategy,
            formattingRanges: formatting.length
          });
      }
    }, _callee50, null, [[34, 36], [19, 21], [17, 24, 25, 26], [8, 10]]);
  }));
  return _updateTextPreserveFormatting.apply(this, arguments);
}
function smartTextReplace(_x46) {
  return _smartTextReplace.apply(this, arguments);
}
function _smartTextReplace() {
  _smartTextReplace = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(params) {
    var _ref41, nodeId, replacements, _ref41$matchCase, matchCase, node, originalText, formatting, i, charFormat, styleProps, _i5, _styleProps, prop, value, newText, newFormatting, _iterator9, _step9, replacement, find, replace, searchText, searchFor, offset, index, replaceFormatting, baseFormat, _i7, fontsToLoad, _iterator0, _step0, format, _iterator1, _step1, font, currentStart, currentFormat, rangeEnd, _i6, _Object$entries2, _Object$entries2$_i, _prop3, _value3, _t46, _t47, _t48;
    return _regenerator().w(function (_context51) {
      while (1) switch (_context51.n) {
        case 0:
          _ref41 = params || {}, nodeId = _ref41.nodeId, replacements = _ref41.replacements, _ref41$matchCase = _ref41.matchCase, matchCase = _ref41$matchCase === void 0 ? true : _ref41$matchCase;
          if (nodeId) {
            _context51.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(!replacements || !Array.isArray(replacements))) {
            _context51.n = 2;
            break;
          }
          throw new Error("Missing or invalid replacements parameter");
        case 2:
          _context51.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context51.v;
          if (!(!node || node.type !== 'TEXT')) {
            _context51.n = 4;
            break;
          }
          throw new Error("Node ".concat(nodeId, " is not a text node"));
        case 4:
          // Get current text and formatting
          originalText = node.characters;
          formatting = []; // Capture formatting for each character
          for (i = 0; i < originalText.length; i++) {
            charFormat = {};
            styleProps = ['fontSize', 'fontName', 'fontWeight', 'textDecoration', 'fills'];
            for (_i5 = 0, _styleProps = styleProps; _i5 < _styleProps.length; _i5++) {
              prop = _styleProps[_i5];
              try {
                value = node.getRangeProperty(i, i + 1, prop);
                if (value !== figma.mixed) {
                  charFormat[prop] = value;
                }
              } catch (e) {
                // Property might not exist
              }
            }
            formatting.push(charFormat);
          }

          // Build new text and formatting mapping
          newText = originalText;
          newFormatting = [].concat(formatting); // Process replacements
          _iterator9 = _createForOfIteratorHelper(replacements);
          _context51.p = 5;
          _iterator9.s();
        case 6:
          if ((_step9 = _iterator9.n()).done) {
            _context51.n = 9;
            break;
          }
          replacement = _step9.value;
          find = replacement.find, replace = replacement.replace;
          if (!(!find || replace === undefined)) {
            _context51.n = 7;
            break;
          }
          return _context51.a(3, 8);
        case 7:
          searchText = matchCase ? newText : newText.toLowerCase();
          searchFor = matchCase ? find : find.toLowerCase();
          offset = 0;
          index = searchText.indexOf(searchFor, offset);
          while (index !== -1) {
            // Calculate formatting for replacement
            replaceFormatting = []; // Use formatting from first character of found text
            baseFormat = newFormatting[index] || {};
            for (_i7 = 0; _i7 < replace.length; _i7++) {
              replaceFormatting.push(_objectSpread({}, baseFormat));
            }

            // Replace text
            newText = newText.substring(0, index) + replace + newText.substring(index + find.length);

            // Update formatting array
            newFormatting.splice.apply(newFormatting, [index, find.length].concat(replaceFormatting));

            // Continue searching
            offset = index + replace.length;
            index = searchText.indexOf(searchFor, offset);
          }
        case 8:
          _context51.n = 6;
          break;
        case 9:
          _context51.n = 11;
          break;
        case 10:
          _context51.p = 10;
          _t46 = _context51.v;
          _iterator9.e(_t46);
        case 11:
          _context51.p = 11;
          _iterator9.f();
          return _context51.f(11);
        case 12:
          // Load required fonts
          fontsToLoad = new Set();
          _iterator0 = _createForOfIteratorHelper(newFormatting);
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              format = _step0.value;
              if (format.fontName) {
                fontsToLoad.add(format.fontName);
              }
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          _iterator1 = _createForOfIteratorHelper(fontsToLoad);
          _context51.p = 13;
          _iterator1.s();
        case 14:
          if ((_step1 = _iterator1.n()).done) {
            _context51.n = 19;
            break;
          }
          font = _step1.value;
          _context51.p = 15;
          _context51.n = 16;
          return figma.loadFontAsync(font);
        case 16:
          _context51.n = 18;
          break;
        case 17:
          _context51.p = 17;
          _t47 = _context51.v;
          console.warn("Failed to load font:", _t47);
        case 18:
          _context51.n = 14;
          break;
        case 19:
          _context51.n = 21;
          break;
        case 20:
          _context51.p = 20;
          _t48 = _context51.v;
          _iterator1.e(_t48);
        case 21:
          _context51.p = 21;
          _iterator1.f();
          return _context51.f(21);
        case 22:
          // Apply new text
          node.characters = newText;

          // Apply formatting
          currentStart = 0;
          while (currentStart < newText.length) {
            currentFormat = newFormatting[currentStart];
            rangeEnd = currentStart + 1; // Find how far this format extends
            while (rangeEnd < newText.length && JSON.stringify(newFormatting[rangeEnd]) === JSON.stringify(currentFormat)) {
              rangeEnd++;
            }

            // Apply format to range
            for (_i6 = 0, _Object$entries2 = Object.entries(currentFormat); _i6 < _Object$entries2.length; _i6++) {
              _Object$entries2$_i = _slicedToArray(_Object$entries2[_i6], 2), _prop3 = _Object$entries2$_i[0], _value3 = _Object$entries2$_i[1];
              try {
                node.setRangeProperty(currentStart, rangeEnd, _prop3, _value3);
              } catch (e) {
                console.warn("Failed to apply ".concat(_prop3, ":"), e);
              }
            }
            currentStart = rangeEnd;
          }
          return _context51.a(2, {
            success: true,
            nodeId: nodeId,
            originalText: originalText,
            newText: newText,
            replacementCount: replacements.length
          });
      }
    }, _callee51, null, [[15, 17], [13, 20, 21, 22], [5, 10, 11, 12]]);
  }));
  return _smartTextReplace.apply(this, arguments);
}
function setMultipleTextContentsWithStyles(_x47) {
  return _setMultipleTextContentsWithStyles.apply(this, arguments);
} // Batch operation functions
function _setMultipleTextContentsWithStyles() {
  _setMultipleTextContentsWithStyles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52(params) {
    var _ref42, nodeId, updates, parentNode, results, _iterator10, _step10, update, textNodeId, text, styles, textNode, fontsToLoad, _iterator11, _step11, style, _iterator12, _step12, font, _iterator13, _step13, _style, start, end, bold, italic, fontSize, fontFamily, fills, currentFont, newStyle, fontStyle, _t49, _t50, _t51, _t52, _t53, _t54, _t55;
    return _regenerator().w(function (_context52) {
      while (1) switch (_context52.n) {
        case 0:
          _ref42 = params || {}, nodeId = _ref42.nodeId, updates = _ref42.updates;
          if (nodeId) {
            _context52.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(!updates || !Array.isArray(updates))) {
            _context52.n = 2;
            break;
          }
          throw new Error("Missing or invalid updates parameter");
        case 2:
          _context52.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          parentNode = _context52.v;
          if (parentNode) {
            _context52.n = 4;
            break;
          }
          throw new Error("Parent node not found: ".concat(nodeId));
        case 4:
          results = [];
          _iterator10 = _createForOfIteratorHelper(updates);
          _context52.p = 5;
          _iterator10.s();
        case 6:
          if ((_step10 = _iterator10.n()).done) {
            _context52.n = 37;
            break;
          }
          update = _step10.value;
          textNodeId = update.nodeId, text = update.text, styles = update.styles;
          _context52.p = 7;
          _context52.n = 8;
          return figma.getNodeByIdAsync(textNodeId);
        case 8:
          textNode = _context52.v;
          if (!(!textNode || textNode.type !== 'TEXT')) {
            _context52.n = 9;
            break;
          }
          results.push({
            nodeId: textNodeId,
            success: false,
            error: 'Not a text node'
          });
          return _context52.a(3, 36);
        case 9:
          // Load fonts if needed
          fontsToLoad = new Set();
          if (styles) {
            _iterator11 = _createForOfIteratorHelper(styles);
            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                style = _step11.value;
                if (style.fontFamily) {
                  fontsToLoad.add({
                    family: style.fontFamily,
                    style: style.fontStyle || 'Regular'
                  });
                }
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
          }
          _iterator12 = _createForOfIteratorHelper(fontsToLoad);
          _context52.p = 10;
          _iterator12.s();
        case 11:
          if ((_step12 = _iterator12.n()).done) {
            _context52.n = 16;
            break;
          }
          font = _step12.value;
          _context52.p = 12;
          _context52.n = 13;
          return figma.loadFontAsync(font);
        case 13:
          _context52.n = 15;
          break;
        case 14:
          _context52.p = 14;
          _t49 = _context52.v;
          console.warn("Failed to load font:", _t49);
        case 15:
          _context52.n = 11;
          break;
        case 16:
          _context52.n = 18;
          break;
        case 17:
          _context52.p = 17;
          _t50 = _context52.v;
          _iterator12.e(_t50);
        case 18:
          _context52.p = 18;
          _iterator12.f();
          return _context52.f(18);
        case 19:
          // Update text
          textNode.characters = text;

          // Apply styles
          if (!styles) {
            _context52.n = 34;
            break;
          }
          _iterator13 = _createForOfIteratorHelper(styles);
          _context52.p = 20;
          _iterator13.s();
        case 21:
          if ((_step13 = _iterator13.n()).done) {
            _context52.n = 31;
            break;
          }
          _style = _step13.value;
          start = _style.start, end = _style.end, bold = _style.bold, italic = _style.italic, fontSize = _style.fontSize, fontFamily = _style.fontFamily, fills = _style.fills;
          if (!(start !== undefined && end !== undefined)) {
            _context52.n = 30;
            break;
          }
          if (bold !== undefined) {
            textNode.setRangeProperty(start, end, 'fontWeight', bold ? 700 : 400);
          }
          if (!(italic !== undefined)) {
            _context52.n = 25;
            break;
          }
          // Note: italic might need font style change
          currentFont = textNode.getRangeProperty(start, end, 'fontName');
          if (!(currentFont && currentFont !== figma.mixed)) {
            _context52.n = 25;
            break;
          }
          newStyle = italic ? 'Italic' : 'Regular';
          _context52.p = 22;
          _context52.n = 23;
          return figma.loadFontAsync({
            family: currentFont.family,
            style: newStyle
          });
        case 23:
          textNode.setRangeProperty(start, end, 'fontName', {
            family: currentFont.family,
            style: newStyle
          });
          _context52.n = 25;
          break;
        case 24:
          _context52.p = 24;
          _t51 = _context52.v;
          console.warn("Failed to set italic:", _t51);
        case 25:
          if (fontSize !== undefined) {
            textNode.setRangeProperty(start, end, 'fontSize', fontSize);
          }
          if (!fontFamily) {
            _context52.n = 29;
            break;
          }
          fontStyle = _style.fontStyle || 'Regular';
          _context52.p = 26;
          _context52.n = 27;
          return figma.loadFontAsync({
            family: fontFamily,
            style: fontStyle
          });
        case 27:
          textNode.setRangeProperty(start, end, 'fontName', {
            family: fontFamily,
            style: fontStyle
          });
          _context52.n = 29;
          break;
        case 28:
          _context52.p = 28;
          _t52 = _context52.v;
          console.warn("Failed to set font:", _t52);
        case 29:
          if (fills) {
            textNode.setRangeProperty(start, end, 'fills', fills);
          }
        case 30:
          _context52.n = 21;
          break;
        case 31:
          _context52.n = 33;
          break;
        case 32:
          _context52.p = 32;
          _t53 = _context52.v;
          _iterator13.e(_t53);
        case 33:
          _context52.p = 33;
          _iterator13.f();
          return _context52.f(33);
        case 34:
          results.push({
            nodeId: textNodeId,
            success: true
          });
          _context52.n = 36;
          break;
        case 35:
          _context52.p = 35;
          _t54 = _context52.v;
          results.push({
            nodeId: textNodeId,
            success: false,
            error: _t54.message
          });
        case 36:
          _context52.n = 6;
          break;
        case 37:
          _context52.n = 39;
          break;
        case 38:
          _context52.p = 38;
          _t55 = _context52.v;
          _iterator10.e(_t55);
        case 39:
          _context52.p = 39;
          _iterator10.f();
          return _context52.f(39);
        case 40:
          return _context52.a(2, {
            success: true,
            results: results,
            totalUpdated: results.filter(function (r) {
              return r.success;
            }).length,
            totalFailed: results.filter(function (r) {
              return !r.success;
            }).length
          });
      }
    }, _callee52, null, [[26, 28], [22, 24], [20, 32, 33, 34], [12, 14], [10, 17, 18, 19], [7, 35], [5, 38, 39, 40]]);
  }));
  return _setMultipleTextContentsWithStyles.apply(this, arguments);
}
function cloneMultipleNodes(_x48) {
  return _cloneMultipleNodes.apply(this, arguments);
}
function _cloneMultipleNodes() {
  _cloneMultipleNodes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(params) {
    var _ref43, sourceNodeId, positions, parentId, sourceNode, results, commandId, totalCount, CHUNK_SIZE, chunks, i, processedCount, chunkIndex, chunk, chunkPromises, chunkResults;
    return _regenerator().w(function (_context54) {
      while (1) switch (_context54.n) {
        case 0:
          _ref43 = params || {}, sourceNodeId = _ref43.sourceNodeId, positions = _ref43.positions, parentId = _ref43.parentId;
          if (sourceNodeId) {
            _context54.n = 1;
            break;
          }
          throw new Error("Missing sourceNodeId parameter");
        case 1:
          if (!(!positions || !Array.isArray(positions))) {
            _context54.n = 2;
            break;
          }
          throw new Error("Missing or invalid positions parameter");
        case 2:
          _context54.n = 3;
          return figma.getNodeByIdAsync(sourceNodeId);
        case 3:
          sourceNode = _context54.v;
          if (sourceNode) {
            _context54.n = 4;
            break;
          }
          throw new Error("Source node not found: ".concat(sourceNodeId));
        case 4:
          results = [];
          commandId = uuidv4();
          totalCount = positions.length; // Send initial progress
          sendProgressUpdate(commandId, "clone_multiple_nodes", "started", 0, totalCount, 0, "Starting to clone ".concat(totalCount, " nodes"));

          // Process clones in chunks for better performance
          CHUNK_SIZE = 10;
          chunks = [];
          for (i = 0; i < positions.length; i += CHUNK_SIZE) {
            chunks.push(positions.slice(i, i + CHUNK_SIZE));
          }
          processedCount = 0;
          chunkIndex = 0;
        case 5:
          if (!(chunkIndex < chunks.length)) {
            _context54.n = 8;
            break;
          }
          chunk = chunks[chunkIndex]; // Process chunk
          chunkPromises = chunk.map(/*#__PURE__*/function () {
            var _ref44 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53(position) {
              var clone, parentNode, _t56;
              return _regenerator().w(function (_context53) {
                while (1) switch (_context53.n) {
                  case 0:
                    _context53.p = 0;
                    clone = sourceNode.clone();
                    if (position.x !== undefined) clone.x = position.x;
                    if (position.y !== undefined) clone.y = position.y;

                    // Handle parent attachment
                    if (!parentId) {
                      _context53.n = 2;
                      break;
                    }
                    _context53.n = 1;
                    return figma.getNodeByIdAsync(parentId);
                  case 1:
                    parentNode = _context53.v;
                    if (parentNode && "appendChild" in parentNode) {
                      parentNode.appendChild(clone);
                    } else {
                      figma.currentPage.appendChild(clone);
                    }
                    _context53.n = 3;
                    break;
                  case 2:
                    figma.currentPage.appendChild(clone);
                  case 3:
                    return _context53.a(2, {
                      success: true,
                      id: clone.id,
                      name: clone.name,
                      position: {
                        x: clone.x,
                        y: clone.y
                      }
                    });
                  case 4:
                    _context53.p = 4;
                    _t56 = _context53.v;
                    return _context53.a(2, {
                      success: false,
                      error: _t56.message,
                      position: position
                    });
                }
              }, _callee53, null, [[0, 4]]);
            }));
            return function (_x90) {
              return _ref44.apply(this, arguments);
            };
          }());
          _context54.n = 6;
          return Promise.all(chunkPromises);
        case 6:
          chunkResults = _context54.v;
          results.push.apply(results, _toConsumableArray(chunkResults));
          processedCount += chunk.length;

          // Update progress
          sendProgressUpdate(commandId, "clone_multiple_nodes", "in_progress", Math.round(processedCount / totalCount * 100), totalCount, processedCount, "Cloned ".concat(processedCount, "/").concat(totalCount, " nodes"));
        case 7:
          chunkIndex++;
          _context54.n = 5;
          break;
        case 8:
          // Final progress update
          sendProgressUpdate(commandId, "clone_multiple_nodes", "completed", 100, totalCount, totalCount, "Successfully cloned ".concat(results.filter(function (r) {
            return r.success;
          }).length, " nodes"));
          return _context54.a(2, {
            success: true,
            results: results,
            totalCloned: results.filter(function (r) {
              return r.success;
            }).length,
            totalFailed: results.filter(function (r) {
              return !r.success;
            }).length,
            commandId: commandId
          });
      }
    }, _callee54);
  }));
  return _cloneMultipleNodes.apply(this, arguments);
}
function getMultipleNodesInfo(_x49) {
  return _getMultipleNodesInfo.apply(this, arguments);
}
function _getMultipleNodesInfo() {
  _getMultipleNodesInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(params) {
    var _ref45, nodeIds, results, promises, nodeResults;
    return _regenerator().w(function (_context56) {
      while (1) switch (_context56.n) {
        case 0:
          _ref45 = params || {}, nodeIds = _ref45.nodeIds;
          if (!(!nodeIds || !Array.isArray(nodeIds))) {
            _context56.n = 1;
            break;
          }
          throw new Error("Missing or invalid nodeIds parameter");
        case 1:
          results = []; // Process in parallel for speed
          promises = nodeIds.map(/*#__PURE__*/function () {
            var _ref46 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(nodeId) {
              var node, _t57, _t58, _t59;
              return _regenerator().w(function (_context55) {
                while (1) switch (_context55.n) {
                  case 0:
                    _context55.p = 0;
                    _context55.n = 1;
                    return figma.getNodeByIdAsync(nodeId);
                  case 1:
                    node = _context55.v;
                    if (node) {
                      _context55.n = 2;
                      break;
                    }
                    return _context55.a(2, {
                      nodeId: nodeId,
                      success: false,
                      error: 'Node not found'
                    });
                  case 2:
                    _t57 = nodeId;
                    _context55.n = 3;
                    return getNodeInfoData(node);
                  case 3:
                    _t58 = _context55.v;
                    return _context55.a(2, {
                      nodeId: _t57,
                      success: true,
                      info: _t58
                    });
                  case 4:
                    _context55.p = 4;
                    _t59 = _context55.v;
                    return _context55.a(2, {
                      nodeId: nodeId,
                      success: false,
                      error: _t59.message
                    });
                }
              }, _callee55, null, [[0, 4]]);
            }));
            return function (_x91) {
              return _ref46.apply(this, arguments);
            };
          }());
          _context56.n = 2;
          return Promise.all(promises);
        case 2:
          nodeResults = _context56.v;
          return _context56.a(2, {
            success: true,
            results: nodeResults,
            totalFound: nodeResults.filter(function (r) {
              return r.success;
            }).length,
            totalNotFound: nodeResults.filter(function (r) {
              return !r.success;
            }).length
          });
      }
    }, _callee56);
  }));
  return _getMultipleNodesInfo.apply(this, arguments);
}
function setMultipleNodesProperty(_x50) {
  return _setMultipleNodesProperty.apply(this, arguments);
}
function _setMultipleNodesProperty() {
  _setMultipleNodesProperty = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee57(params) {
    var _ref47, nodeIds, property, value, results, _iterator14, _step14, nodeId, node, _t60, _t61;
    return _regenerator().w(function (_context57) {
      while (1) switch (_context57.n) {
        case 0:
          _ref47 = params || {}, nodeIds = _ref47.nodeIds, property = _ref47.property, value = _ref47.value;
          if (!(!nodeIds || !Array.isArray(nodeIds))) {
            _context57.n = 1;
            break;
          }
          throw new Error("Missing or invalid nodeIds parameter");
        case 1:
          if (property) {
            _context57.n = 2;
            break;
          }
          throw new Error("Missing property parameter");
        case 2:
          if (!(value === undefined)) {
            _context57.n = 3;
            break;
          }
          throw new Error("Missing value parameter");
        case 3:
          results = [];
          _iterator14 = _createForOfIteratorHelper(nodeIds);
          _context57.p = 4;
          _iterator14.s();
        case 5:
          if ((_step14 = _iterator14.n()).done) {
            _context57.n = 11;
            break;
          }
          nodeId = _step14.value;
          _context57.p = 6;
          _context57.n = 7;
          return figma.getNodeByIdAsync(nodeId);
        case 7:
          node = _context57.v;
          if (node) {
            _context57.n = 8;
            break;
          }
          results.push({
            nodeId: nodeId,
            success: false,
            error: 'Node not found'
          });
          return _context57.a(3, 10);
        case 8:
          // Special handling for certain properties
          if (property === 'fills' || property === 'strokes') {
            node[property] = value;
          } else if (property === 'visible' || property === 'locked') {
            node[property] = value;
          } else if (property === 'opacity') {
            node.opacity = value;
          } else if (property === 'x' || property === 'y') {
            node[property] = value;
          } else if (property === 'width' || property === 'height') {
            if ('resize' in node) {
              if (property === 'width') {
                node.resize(value, node.height);
              } else {
                node.resize(node.width, value);
              }
            }
          } else {
            // Try to set property directly
            node[property] = value;
          }
          results.push({
            nodeId: nodeId,
            success: true
          });
          _context57.n = 10;
          break;
        case 9:
          _context57.p = 9;
          _t60 = _context57.v;
          results.push({
            nodeId: nodeId,
            success: false,
            error: _t60.message
          });
        case 10:
          _context57.n = 5;
          break;
        case 11:
          _context57.n = 13;
          break;
        case 12:
          _context57.p = 12;
          _t61 = _context57.v;
          _iterator14.e(_t61);
        case 13:
          _context57.p = 13;
          _iterator14.f();
          return _context57.f(13);
        case 14:
          return _context57.a(2, {
            success: true,
            results: results,
            totalUpdated: results.filter(function (r) {
              return r.success;
            }).length,
            totalFailed: results.filter(function (r) {
              return !r.success;
            }).length
          });
      }
    }, _callee57, null, [[6, 9], [4, 12, 13, 14]]);
  }));
  return _setMultipleNodesProperty.apply(this, arguments);
}
function scanNodesWithOptions(_x51) {
  return _scanNodesWithOptions.apply(this, arguments);
}
function _scanNodesWithOptions() {
  _scanNodesWithOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee59(params) {
    var _ref48, nodeId, _ref48$options, options, _options$maxDepth, maxDepth, _options$nodeTypes, nodeTypes, _options$timeout, timeout, _options$returnPartia, returnPartialOnTimeout, _options$includeHidde, includeHidden, startTime, results, visited, scanNode, _scanNode, rootNode, elapsed, _t63;
    return _regenerator().w(function (_context59) {
      while (1) switch (_context59.n) {
        case 0:
          _scanNode = function _scanNode3() {
            _scanNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee58(node) {
              var depth,
                _iterator15,
                _step15,
                child,
                _args58 = arguments,
                _t62;
              return _regenerator().w(function (_context58) {
                while (1) switch (_context58.n) {
                  case 0:
                    depth = _args58.length > 1 && _args58[1] !== undefined ? _args58[1] : 0;
                    if (!(Date.now() - startTime > timeout)) {
                      _context58.n = 2;
                      break;
                    }
                    if (!returnPartialOnTimeout) {
                      _context58.n = 1;
                      break;
                    }
                    return _context58.a(2);
                  case 1:
                    throw new Error("Scan timed out after ".concat(timeout, "ms. Found ").concat(results.length, " nodes so far."));
                  case 2:
                    if (!(maxDepth !== -1 && depth > maxDepth)) {
                      _context58.n = 3;
                      break;
                    }
                    return _context58.a(2);
                  case 3:
                    if (!visited.has(node.id)) {
                      _context58.n = 4;
                      break;
                    }
                    return _context58.a(2);
                  case 4:
                    visited.add(node.id);

                    // Check visibility
                    if (!(!includeHidden && !node.visible)) {
                      _context58.n = 5;
                      break;
                    }
                    return _context58.a(2);
                  case 5:
                    // Check if node matches requested types
                    if (nodeTypes.includes(node.type)) {
                      results.push({
                        id: node.id,
                        name: node.name,
                        type: node.type,
                        depth: depth,
                        characters: node.type === 'TEXT' ? node.characters : undefined
                      });
                    }

                    // Recursively scan children
                    if (!("children" in node)) {
                      _context58.n = 12;
                      break;
                    }
                    _iterator15 = _createForOfIteratorHelper(node.children);
                    _context58.p = 6;
                    _iterator15.s();
                  case 7:
                    if ((_step15 = _iterator15.n()).done) {
                      _context58.n = 9;
                      break;
                    }
                    child = _step15.value;
                    _context58.n = 8;
                    return scanNode(child, depth + 1);
                  case 8:
                    _context58.n = 7;
                    break;
                  case 9:
                    _context58.n = 11;
                    break;
                  case 10:
                    _context58.p = 10;
                    _t62 = _context58.v;
                    _iterator15.e(_t62);
                  case 11:
                    _context58.p = 11;
                    _iterator15.f();
                    return _context58.f(11);
                  case 12:
                    return _context58.a(2);
                }
              }, _callee58, null, [[6, 10, 11, 12]]);
            }));
            return _scanNode.apply(this, arguments);
          };
          scanNode = function _scanNode2(_x92) {
            return _scanNode.apply(this, arguments);
          };
          _ref48 = params || {}, nodeId = _ref48.nodeId, _ref48$options = _ref48.options, options = _ref48$options === void 0 ? {} : _ref48$options;
          if (nodeId) {
            _context59.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _options$maxDepth = options.maxDepth, maxDepth = _options$maxDepth === void 0 ? -1 : _options$maxDepth, _options$nodeTypes = options.nodeTypes, nodeTypes = _options$nodeTypes === void 0 ? ["TEXT"] : _options$nodeTypes, _options$timeout = options.timeout, timeout = _options$timeout === void 0 ? 30000 : _options$timeout, _options$returnPartia = options.returnPartialOnTimeout, returnPartialOnTimeout = _options$returnPartia === void 0 ? true : _options$returnPartia, _options$includeHidde = options.includeHidden, includeHidden = _options$includeHidde === void 0 ? false : _options$includeHidde;
          startTime = Date.now();
          results = [];
          visited = new Set();
          _context59.p = 2;
          _context59.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          rootNode = _context59.v;
          if (rootNode) {
            _context59.n = 4;
            break;
          }
          throw new Error("Node not found: ".concat(nodeId));
        case 4:
          _context59.n = 5;
          return scanNode(rootNode, 0);
        case 5:
          elapsed = Date.now() - startTime;
          return _context59.a(2, {
            success: true,
            nodes: results,
            totalFound: results.length,
            elapsed: elapsed,
            timedOut: elapsed >= timeout,
            options: {
              maxDepth: maxDepth,
              nodeTypes: nodeTypes,
              timeout: timeout,
              includeHidden: includeHidden
            }
          });
        case 6:
          _context59.p = 6;
          _t63 = _context59.v;
          if (!(_t63.message.includes('timed out') && returnPartialOnTimeout)) {
            _context59.n = 7;
            break;
          }
          return _context59.a(2, {
            success: true,
            nodes: results,
            totalFound: results.length,
            elapsed: Date.now() - startTime,
            timedOut: true,
            partial: true,
            options: {
              maxDepth: maxDepth,
              nodeTypes: nodeTypes,
              timeout: timeout,
              includeHidden: includeHidden
            }
          });
        case 7:
          throw _t63;
        case 8:
          return _context59.a(2);
      }
    }, _callee59, null, [[2, 6]]);
  }));
  return _scanNodesWithOptions.apply(this, arguments);
}
function getConnectionStatus(_x52) {
  return _getConnectionStatus.apply(this, arguments);
}
function _getConnectionStatus() {
  _getConnectionStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee60(params) {
    return _regenerator().w(function (_context60) {
      while (1) switch (_context60.n) {
        case 0:
          return _context60.a(2, {
            connected: true,
            pluginActive: true,
            documentOpen: !!figma.currentPage,
            editorType: figma.editorType,
            timestamp: Date.now()
          });
      }
    }, _callee60);
  }));
  return _getConnectionStatus.apply(this, arguments);
}
function executeBatch(_x53) {
  return _executeBatch.apply(this, arguments);
} // Helper function for getNodeInfo
function _executeBatch() {
  _executeBatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee61(params) {
    var _ref49, commands, _ref49$stopOnError, stopOnError, results, commandId, totalCount, i, _commands$i, command, cmdParams, result, _t64;
    return _regenerator().w(function (_context61) {
      while (1) switch (_context61.n) {
        case 0:
          _ref49 = params || {}, commands = _ref49.commands, _ref49$stopOnError = _ref49.stopOnError, stopOnError = _ref49$stopOnError === void 0 ? false : _ref49$stopOnError;
          if (!(!commands || !Array.isArray(commands))) {
            _context61.n = 1;
            break;
          }
          throw new Error("Missing or invalid commands parameter");
        case 1:
          results = [];
          commandId = uuidv4();
          totalCount = commands.length; // Send initial progress
          sendProgressUpdate(commandId, "execute_batch", "started", 0, totalCount, 0, "Starting batch execution of ".concat(totalCount, " commands"));
          i = 0;
        case 2:
          if (!(i < commands.length)) {
            _context61.n = 8;
            break;
          }
          _commands$i = commands[i], command = _commands$i.command, cmdParams = _commands$i.params;
          _context61.p = 3;
          _context61.n = 4;
          return handleCommand(command, cmdParams);
        case 4:
          result = _context61.v;
          results.push({
            index: i,
            command: command,
            success: true,
            result: result
          });
          _context61.n = 6;
          break;
        case 5:
          _context61.p = 5;
          _t64 = _context61.v;
          results.push({
            index: i,
            command: command,
            success: false,
            error: _t64.message
          });
          if (!stopOnError) {
            _context61.n = 6;
            break;
          }
          return _context61.a(3, 8);
        case 6:
          // Update progress
          sendProgressUpdate(commandId, "execute_batch", "in_progress", Math.round((i + 1) / totalCount * 100), totalCount, i + 1, "Executed ".concat(i + 1, "/").concat(totalCount, " commands"));
        case 7:
          i++;
          _context61.n = 2;
          break;
        case 8:
          // Final progress
          sendProgressUpdate(commandId, "execute_batch", "completed", 100, totalCount, totalCount, "Batch execution completed");
          return _context61.a(2, {
            success: true,
            results: results,
            totalExecuted: results.length,
            totalSucceeded: results.filter(function (r) {
              return r.success;
            }).length,
            totalFailed: results.filter(function (r) {
              return !r.success;
            }).length,
            commandId: commandId
          });
      }
    }, _callee61, null, [[3, 5]]);
  }));
  return _executeBatch.apply(this, arguments);
}
function getNodeInfoData(_x54) {
  return _getNodeInfoData.apply(this, arguments);
} // Text styling functions
function _getNodeInfoData() {
  _getNodeInfoData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee62(node) {
    var info;
    return _regenerator().w(function (_context62) {
      while (1) switch (_context62.n) {
        case 0:
          info = {
            id: node.id,
            name: node.name,
            type: node.type,
            visible: node.visible
          }; // Add type-specific properties
          if (node.type === "TEXT") {
            info.characters = node.characters;
            info.fontSize = node.fontSize;
            info.fontName = node.fontName;
          }
          if ("x" in node) info.x = node.x;
          if ("y" in node) info.y = node.y;
          if ("width" in node) info.width = node.width;
          if ("height" in node) info.height = node.height;
          if ("fills" in node) info.fills = node.fills;
          if ("strokes" in node) info.strokes = node.strokes;
          if ("opacity" in node) info.opacity = node.opacity;

          // Add children info if it's a container
          if ("children" in node) {
            info.children = node.children.map(function (child) {
              return {
                id: child.id,
                name: child.name,
                type: child.type,
                visible: child.visible
              };
            });
          }
          return _context62.a(2, info);
      }
    }, _callee62);
  }));
  return _getNodeInfoData.apply(this, arguments);
}
function setTextStyleRange(_x55) {
  return _setTextStyleRange.apply(this, arguments);
}
function _setTextStyleRange() {
  _setTextStyleRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee63(params) {
    var _ref50, nodeId, start, end, bold, italic, underline, strikethrough, node, fonts, decoration, currentFont, newStyle, newFont, _currentFont, _newStyle, _newFont, _t65, _t66, _t67;
    return _regenerator().w(function (_context63) {
      while (1) switch (_context63.n) {
        case 0:
          _ref50 = params || {}, nodeId = _ref50.nodeId, start = _ref50.start, end = _ref50.end, bold = _ref50.bold, italic = _ref50.italic, underline = _ref50.underline, strikethrough = _ref50.strikethrough;
          if (nodeId) {
            _context63.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context63.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          _context63.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context63.v;
          if (node) {
            _context63.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "TEXT")) {
            _context63.n = 5;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 5:
          _context63.p = 5;
          // Load fonts for the range
          fonts = node.getRangeAllFontNames(start, end);
          _context63.n = 6;
          return Promise.all(fonts.map(function (font) {
            return figma.loadFontAsync(font);
          }));
        case 6:
          // Apply text decorations
          if (underline !== undefined || strikethrough !== undefined) {
            decoration = "NONE";
            if (underline && strikethrough) {
              decoration = "UNDERLINE_STRIKETHROUGH";
            } else if (underline) {
              decoration = "UNDERLINE";
            } else if (strikethrough) {
              decoration = "STRIKETHROUGH";
            }
            node.setRangeTextDecoration(start, end, decoration);
          }

          // Apply font weight for bold
          if (!(bold !== undefined)) {
            _context63.n = 10;
            break;
          }
          currentFont = node.getRangeFontName(start, end);
          if (!(currentFont !== figma.mixed)) {
            _context63.n = 10;
            break;
          }
          newStyle = bold ? "Bold" : "Regular";
          newFont = {
            family: currentFont.family,
            style: newStyle
          }; // Try to load the bold/regular variant
          _context63.p = 7;
          _context63.n = 8;
          return figma.loadFontAsync(newFont);
        case 8:
          node.setRangeFontName(start, end, newFont);
          _context63.n = 10;
          break;
        case 9:
          _context63.p = 9;
          _t65 = _context63.v;
          console.warn("Could not load ".concat(newFont.family, " ").concat(newFont.style, ", using font weight instead"));
          // Fallback to font weight if style not available
          node.setRangeFontWeight(start, end, bold ? 700 : 400);
        case 10:
          if (!(italic !== undefined)) {
            _context63.n = 14;
            break;
          }
          _currentFont = node.getRangeFontName(start, end);
          if (!(_currentFont !== figma.mixed)) {
            _context63.n = 14;
            break;
          }
          _newStyle = italic ? "Italic" : "Regular";
          _newFont = {
            family: _currentFont.family,
            style: _newStyle
          };
          _context63.p = 11;
          _context63.n = 12;
          return figma.loadFontAsync(_newFont);
        case 12:
          node.setRangeFontName(start, end, _newFont);
          _context63.n = 14;
          break;
        case 13:
          _context63.p = 13;
          _t66 = _context63.v;
          console.warn("Could not load ".concat(_newFont.family, " ").concat(_newFont.style));
        case 14:
          return _context63.a(2, {
            success: true,
            nodeId: nodeId,
            start: start,
            end: end,
            styles: {
              bold: bold,
              italic: italic,
              underline: underline,
              strikethrough: strikethrough
            }
          });
        case 15:
          _context63.p = 15;
          _t67 = _context63.v;
          throw new Error("Failed to set text style: ".concat(_t67.message));
        case 16:
          return _context63.a(2);
      }
    }, _callee63, null, [[11, 13], [7, 9], [5, 15]]);
  }));
  return _setTextStyleRange.apply(this, arguments);
}
function getTextStyleRange(_x56) {
  return _getTextStyleRange.apply(this, arguments);
}
function _getTextStyleRange() {
  _getTextStyleRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee64(params) {
    var _ref51, nodeId, start, end, node, decoration, fontName, fontWeight, styles, _t68;
    return _regenerator().w(function (_context64) {
      while (1) switch (_context64.n) {
        case 0:
          _ref51 = params || {}, nodeId = _ref51.nodeId, start = _ref51.start, end = _ref51.end;
          if (nodeId) {
            _context64.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context64.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          _context64.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context64.v;
          if (node) {
            _context64.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "TEXT")) {
            _context64.n = 5;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 5:
          _context64.p = 5;
          decoration = node.getRangeTextDecoration(start, end);
          fontName = node.getRangeFontName(start, end);
          fontWeight = node.getRangeFontWeight(start, end);
          styles = {
            underline: false,
            strikethrough: false,
            bold: false,
            italic: false
          }; // Parse text decoration
          if (decoration !== figma.mixed) {
            styles.underline = decoration.includes("UNDERLINE");
            styles.strikethrough = decoration.includes("STRIKETHROUGH");
          }

          // Parse font style
          if (fontName !== figma.mixed) {
            styles.italic = fontName.style.toLowerCase().includes("italic");
            styles.bold = fontName.style.toLowerCase().includes("bold");
          } else if (fontWeight !== figma.mixed) {
            styles.bold = fontWeight >= 600;
          }
          return _context64.a(2, {
            nodeId: nodeId,
            start: start,
            end: end,
            styles: styles,
            decoration: decoration,
            fontName: fontName,
            fontWeight: fontWeight
          });
        case 6:
          _context64.p = 6;
          _t68 = _context64.v;
          throw new Error("Failed to get text style: ".concat(_t68.message));
        case 7:
          return _context64.a(2);
      }
    }, _callee64, null, [[5, 6]]);
  }));
  return _getTextStyleRange.apply(this, arguments);
}
function setTextDecorationRange(_x57) {
  return _setTextDecorationRange.apply(this, arguments);
}
function _setTextDecorationRange() {
  _setTextDecorationRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee65(params) {
    var _ref52, nodeId, start, end, style, color, thickness, offset, skipInk, node, fonts, _t69;
    return _regenerator().w(function (_context65) {
      while (1) switch (_context65.n) {
        case 0:
          _ref52 = params || {}, nodeId = _ref52.nodeId, start = _ref52.start, end = _ref52.end, style = _ref52.style, color = _ref52.color, thickness = _ref52.thickness, offset = _ref52.offset, skipInk = _ref52.skipInk;
          if (nodeId) {
            _context65.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context65.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          _context65.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context65.v;
          if (node) {
            _context65.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "TEXT")) {
            _context65.n = 5;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 5:
          _context65.p = 5;
          // Load fonts for the range
          fonts = node.getRangeAllFontNames(start, end);
          _context65.n = 6;
          return Promise.all(fonts.map(function (font) {
            return figma.loadFontAsync(font);
          }));
        case 6:
          // Set decoration style if provided
          if (style !== undefined) {
            node.setRangeTextDecorationStyle(start, end, style);
          }

          // Set decoration color if provided
          if (color !== undefined) {
            node.setRangeTextDecorationColor(start, end, color);
          }

          // Set decoration thickness if provided
          if (thickness !== undefined) {
            node.setRangeTextDecorationThickness(start, end, thickness);
          }

          // Set decoration offset if provided
          if (offset !== undefined) {
            node.setRangeTextDecorationOffset(start, end, offset);
          }

          // Set skip ink if provided
          if (skipInk !== undefined) {
            node.setRangeTextDecorationSkipInk(start, end, skipInk);
          }
          return _context65.a(2, {
            success: true,
            nodeId: nodeId,
            start: start,
            end: end,
            decoration: {
              style: style,
              color: color,
              thickness: thickness,
              offset: offset,
              skipInk: skipInk
            }
          });
        case 7:
          _context65.p = 7;
          _t69 = _context65.v;
          throw new Error("Failed to set text decoration: ".concat(_t69.message));
        case 8:
          return _context65.a(2);
      }
    }, _callee65, null, [[5, 7]]);
  }));
  return _setTextDecorationRange.apply(this, arguments);
}
function getTextDecorationRange(_x58) {
  return _getTextDecorationRange.apply(this, arguments);
}
function _getTextDecorationRange() {
  _getTextDecorationRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee66(params) {
    var _ref53, nodeId, start, end, node, decoration, _t70;
    return _regenerator().w(function (_context66) {
      while (1) switch (_context66.n) {
        case 0:
          _ref53 = params || {}, nodeId = _ref53.nodeId, start = _ref53.start, end = _ref53.end;
          if (nodeId) {
            _context66.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context66.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          _context66.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context66.v;
          if (node) {
            _context66.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "TEXT")) {
            _context66.n = 5;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 5:
          _context66.p = 5;
          decoration = {
            style: node.getRangeTextDecorationStyle(start, end),
            color: node.getRangeTextDecorationColor(start, end),
            thickness: node.getRangeTextDecorationThickness(start, end),
            offset: node.getRangeTextDecorationOffset(start, end),
            skipInk: node.getRangeTextDecorationSkipInk(start, end)
          };
          return _context66.a(2, {
            nodeId: nodeId,
            start: start,
            end: end,
            decoration: decoration
          });
        case 6:
          _context66.p = 6;
          _t70 = _context66.v;
          throw new Error("Failed to get text decoration: ".concat(_t70.message));
        case 7:
          return _context66.a(2);
      }
    }, _callee66, null, [[5, 6]]);
  }));
  return _getTextDecorationRange.apply(this, arguments);
}
function setRangeFont(_x59) {
  return _setRangeFont.apply(this, arguments);
}
function _setRangeFont() {
  _setRangeFont = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee67(params) {
    var _ref54, nodeId, start, end, fontFamily, fontStyle, node, font, _t71;
    return _regenerator().w(function (_context67) {
      while (1) switch (_context67.n) {
        case 0:
          _ref54 = params || {}, nodeId = _ref54.nodeId, start = _ref54.start, end = _ref54.end, fontFamily = _ref54.fontFamily, fontStyle = _ref54.fontStyle;
          if (nodeId) {
            _context67.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context67.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          if (fontFamily) {
            _context67.n = 3;
            break;
          }
          throw new Error("Missing fontFamily parameter");
        case 3:
          _context67.n = 4;
          return figma.getNodeByIdAsync(nodeId);
        case 4:
          node = _context67.v;
          if (node) {
            _context67.n = 5;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 5:
          if (!(node.type !== "TEXT")) {
            _context67.n = 6;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 6:
          _context67.p = 6;
          font = {
            family: fontFamily,
            style: fontStyle || "Regular"
          }; // Load the font
          _context67.n = 7;
          return figma.loadFontAsync(font);
        case 7:
          // Set the font for the range
          node.setRangeFontName(start, end, font);
          return _context67.a(2, {
            success: true,
            nodeId: nodeId,
            start: start,
            end: end,
            font: font
          });
        case 8:
          _context67.p = 8;
          _t71 = _context67.v;
          throw new Error("Failed to set font: ".concat(_t71.message));
        case 9:
          return _context67.a(2);
      }
    }, _callee67, null, [[6, 8]]);
  }));
  return _setRangeFont.apply(this, arguments);
}
function setRangeFontSize(_x60) {
  return _setRangeFontSize.apply(this, arguments);
}
function _setRangeFontSize() {
  _setRangeFontSize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee68(params) {
    var _ref55, nodeId, start, end, fontSize, node, fonts, _t72;
    return _regenerator().w(function (_context68) {
      while (1) switch (_context68.n) {
        case 0:
          _ref55 = params || {}, nodeId = _ref55.nodeId, start = _ref55.start, end = _ref55.end, fontSize = _ref55.fontSize;
          if (nodeId) {
            _context68.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context68.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          if (!(fontSize === undefined)) {
            _context68.n = 3;
            break;
          }
          throw new Error("Missing fontSize parameter");
        case 3:
          _context68.n = 4;
          return figma.getNodeByIdAsync(nodeId);
        case 4:
          node = _context68.v;
          if (node) {
            _context68.n = 5;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 5:
          if (!(node.type !== "TEXT")) {
            _context68.n = 6;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 6:
          _context68.p = 6;
          // Load fonts for the range
          fonts = node.getRangeAllFontNames(start, end);
          _context68.n = 7;
          return Promise.all(fonts.map(function (font) {
            return figma.loadFontAsync(font);
          }));
        case 7:
          // Set the font size for the range
          node.setRangeFontSize(start, end, fontSize);
          return _context68.a(2, {
            success: true,
            nodeId: nodeId,
            start: start,
            end: end,
            fontSize: fontSize
          });
        case 8:
          _context68.p = 8;
          _t72 = _context68.v;
          throw new Error("Failed to set font size: ".concat(_t72.message));
        case 9:
          return _context68.a(2);
      }
    }, _callee68, null, [[6, 8]]);
  }));
  return _setRangeFontSize.apply(this, arguments);
}
function setRangeFills(_x61) {
  return _setRangeFills.apply(this, arguments);
}
function _setRangeFills() {
  _setRangeFills = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee69(params) {
    var _ref56, nodeId, start, end, color, node, fonts, paint, _t73;
    return _regenerator().w(function (_context69) {
      while (1) switch (_context69.n) {
        case 0:
          _ref56 = params || {}, nodeId = _ref56.nodeId, start = _ref56.start, end = _ref56.end, color = _ref56.color;
          if (nodeId) {
            _context69.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(start === undefined || end === undefined)) {
            _context69.n = 2;
            break;
          }
          throw new Error("Missing start or end parameters");
        case 2:
          if (color) {
            _context69.n = 3;
            break;
          }
          throw new Error("Missing color parameter");
        case 3:
          _context69.n = 4;
          return figma.getNodeByIdAsync(nodeId);
        case 4:
          node = _context69.v;
          if (node) {
            _context69.n = 5;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 5:
          if (!(node.type !== "TEXT")) {
            _context69.n = 6;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 6:
          _context69.p = 6;
          // Load fonts for the range
          fonts = node.getRangeAllFontNames(start, end);
          _context69.n = 7;
          return Promise.all(fonts.map(function (font) {
            return figma.loadFontAsync(font);
          }));
        case 7:
          // Create paint from color
          paint = {
            type: "SOLID",
            color: {
              r: parseFloat(color.r) || 0,
              g: parseFloat(color.g) || 0,
              b: parseFloat(color.b) || 0
            },
            opacity: parseFloat(color.a) || 1
          }; // Set the fills for the range
          node.setRangeFills(start, end, [paint]);
          return _context69.a(2, {
            success: true,
            nodeId: nodeId,
            start: start,
            end: end,
            color: color
          });
        case 8:
          _context69.p = 8;
          _t73 = _context69.v;
          throw new Error("Failed to set text color: ".concat(_t73.message));
        case 9:
          return _context69.a(2);
      }
    }, _callee69, null, [[6, 8]]);
  }));
  return _setRangeFills.apply(this, arguments);
}
function getStyledTextSegments(_x62) {
  return _getStyledTextSegments.apply(this, arguments);
} // Component description functions
function _getStyledTextSegments() {
  _getStyledTextSegments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee70(params) {
    var _ref57, nodeId, fields, start, end, node, segments, _t74;
    return _regenerator().w(function (_context70) {
      while (1) switch (_context70.n) {
        case 0:
          _ref57 = params || {}, nodeId = _ref57.nodeId, fields = _ref57.fields, start = _ref57.start, end = _ref57.end;
          if (nodeId) {
            _context70.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(!fields || !Array.isArray(fields))) {
            _context70.n = 2;
            break;
          }
          throw new Error("Missing or invalid fields parameter");
        case 2:
          _context70.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context70.v;
          if (node) {
            _context70.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "TEXT")) {
            _context70.n = 5;
            break;
          }
          throw new Error("Node is not a text node: ".concat(nodeId));
        case 5:
          _context70.p = 5;
          // Get styled segments
          segments = node.getStyledTextSegments(fields, start, end);
          return _context70.a(2, {
            nodeId: nodeId,
            segments: segments,
            fields: fields
          });
        case 6:
          _context70.p = 6;
          _t74 = _context70.v;
          throw new Error("Failed to get styled text segments: ".concat(_t74.message));
        case 7:
          return _context70.a(2);
      }
    }, _callee70, null, [[5, 6]]);
  }));
  return _getStyledTextSegments.apply(this, arguments);
}
function setComponentDescription(_x63) {
  return _setComponentDescription.apply(this, arguments);
}
function _setComponentDescription() {
  _setComponentDescription = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee71(params) {
    var _ref58, nodeId, descriptionMarkdown, node, normalized, _t75;
    return _regenerator().w(function (_context71) {
      while (1) switch (_context71.n) {
        case 0:
          _ref58 = params || {}, nodeId = _ref58.nodeId, descriptionMarkdown = _ref58.descriptionMarkdown;
          if (nodeId) {
            _context71.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          if (!(descriptionMarkdown === undefined)) {
            _context71.n = 2;
            break;
          }
          throw new Error("Missing descriptionMarkdown parameter");
        case 2:
          _context71.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context71.v;
          if (node) {
            _context71.n = 4;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 4:
          if (!(node.type !== "COMPONENT" && node.type !== "COMPONENT_SET")) {
            _context71.n = 5;
            break;
          }
          throw new Error("Node is not a component: ".concat(nodeId));
        case 5:
          _context71.p = 5;
          // Normalize the markdown if needed
          normalized = figma.util.normalizeMarkdown(descriptionMarkdown); // Set the description
          node.descriptionMarkdown = normalized;
          return _context71.a(2, {
            success: true,
            nodeId: nodeId,
            descriptionMarkdown: node.descriptionMarkdown,
            normalized: normalized !== descriptionMarkdown
          });
        case 6:
          _context71.p = 6;
          _t75 = _context71.v;
          throw new Error("Failed to set component description: ".concat(_t75.message));
        case 7:
          return _context71.a(2);
      }
    }, _callee71, null, [[5, 6]]);
  }));
  return _setComponentDescription.apply(this, arguments);
}
function getComponentDescription(_x64) {
  return _getComponentDescription.apply(this, arguments);
}
function _getComponentDescription() {
  _getComponentDescription = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee72(params) {
    var _ref59, nodeId, node;
    return _regenerator().w(function (_context72) {
      while (1) switch (_context72.n) {
        case 0:
          _ref59 = params || {}, nodeId = _ref59.nodeId;
          if (nodeId) {
            _context72.n = 1;
            break;
          }
          throw new Error("Missing nodeId parameter");
        case 1:
          _context72.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context72.v;
          if (node) {
            _context72.n = 3;
            break;
          }
          throw new Error("Node not found with ID: ".concat(nodeId));
        case 3:
          if (!(node.type !== "COMPONENT" && node.type !== "COMPONENT_SET")) {
            _context72.n = 4;
            break;
          }
          throw new Error("Node is not a component: ".concat(nodeId));
        case 4:
          return _context72.a(2, {
            nodeId: nodeId,
            descriptionMarkdown: node.descriptionMarkdown || "",
            type: node.type
          });
      }
    }, _callee72);
  }));
  return _getComponentDescription.apply(this, arguments);
}
function normalizeMarkdown(_x65) {
  return _normalizeMarkdown.apply(this, arguments);
} // Function to generate simple UUIDs for command IDs
function _normalizeMarkdown() {
  _normalizeMarkdown = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee73(params) {
    var _ref60, markdown, normalized, _t76;
    return _regenerator().w(function (_context73) {
      while (1) switch (_context73.n) {
        case 0:
          _ref60 = params || {}, markdown = _ref60.markdown;
          if (!(markdown === undefined)) {
            _context73.n = 1;
            break;
          }
          throw new Error("Missing markdown parameter");
        case 1:
          _context73.p = 1;
          normalized = figma.util.normalizeMarkdown(markdown);
          return _context73.a(2, {
            original: markdown,
            normalized: normalized,
            changed: normalized !== markdown
          });
        case 2:
          _context73.p = 2;
          _t76 = _context73.v;
          throw new Error("Failed to normalize markdown: ".concat(_t76.message));
        case 3:
          return _context73.a(2);
      }
    }, _callee73, null, [[1, 2]]);
  }));
  return _normalizeMarkdown.apply(this, arguments);
}
function generateCommandId() {
  return "cmd_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function getAnnotations(_x66) {
  return _getAnnotations.apply(this, arguments);
}
function _getAnnotations() {
  _getAnnotations = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee75(params) {
    var nodeId, _params$includeCatego, includeCategories, categoriesMap, categories, node, result, annotations, _processNode, _result, _t78;
    return _regenerator().w(function (_context75) {
      while (1) switch (_context75.n) {
        case 0:
          _context75.p = 0;
          nodeId = params.nodeId, _params$includeCatego = params.includeCategories, includeCategories = _params$includeCatego === void 0 ? true : _params$includeCatego; // Get categories first if needed
          categoriesMap = {};
          if (!includeCategories) {
            _context75.n = 2;
            break;
          }
          _context75.n = 1;
          return figma.annotations.getAnnotationCategoriesAsync();
        case 1:
          categories = _context75.v;
          categoriesMap = categories.reduce(function (map, category) {
            map[category.id] = {
              id: category.id,
              label: category.label,
              color: category.color,
              isPreset: category.isPreset
            };
            return map;
          }, {});
        case 2:
          if (!nodeId) {
            _context75.n = 6;
            break;
          }
          _context75.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context75.v;
          if (node) {
            _context75.n = 4;
            break;
          }
          throw new Error("Node not found: ".concat(nodeId));
        case 4:
          if ("annotations" in node) {
            _context75.n = 5;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support annotations"));
        case 5:
          result = {
            nodeId: node.id,
            name: node.name,
            annotations: node.annotations || []
          };
          if (includeCategories) {
            result.categories = Object.values(categoriesMap);
          }
          return _context75.a(2, result);
        case 6:
          // Get all annotations in the current page
          annotations = [];
          _processNode = /*#__PURE__*/function () {
            var _ref61 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee74(node) {
              var _iterator16, _step16, child, _t77;
              return _regenerator().w(function (_context74) {
                while (1) switch (_context74.n) {
                  case 0:
                    if ("annotations" in node && node.annotations && node.annotations.length > 0) {
                      annotations.push({
                        nodeId: node.id,
                        name: node.name,
                        annotations: node.annotations
                      });
                    }
                    if (!("children" in node)) {
                      _context74.n = 7;
                      break;
                    }
                    _iterator16 = _createForOfIteratorHelper(node.children);
                    _context74.p = 1;
                    _iterator16.s();
                  case 2:
                    if ((_step16 = _iterator16.n()).done) {
                      _context74.n = 4;
                      break;
                    }
                    child = _step16.value;
                    _context74.n = 3;
                    return _processNode(child);
                  case 3:
                    _context74.n = 2;
                    break;
                  case 4:
                    _context74.n = 6;
                    break;
                  case 5:
                    _context74.p = 5;
                    _t77 = _context74.v;
                    _iterator16.e(_t77);
                  case 6:
                    _context74.p = 6;
                    _iterator16.f();
                    return _context74.f(6);
                  case 7:
                    return _context74.a(2);
                }
              }, _callee74, null, [[1, 5, 6, 7]]);
            }));
            return function processNode(_x93) {
              return _ref61.apply(this, arguments);
            };
          }(); // Start from current page
          _context75.n = 7;
          return _processNode(figma.currentPage);
        case 7:
          _result = {
            annotatedNodes: annotations
          };
          if (includeCategories) {
            _result.categories = Object.values(categoriesMap);
          }
          return _context75.a(2, _result);
        case 8:
          _context75.n = 10;
          break;
        case 9:
          _context75.p = 9;
          _t78 = _context75.v;
          console.error("Error in getAnnotations:", _t78);
          throw _t78;
        case 10:
          return _context75.a(2);
      }
    }, _callee75, null, [[0, 9]]);
  }));
  return _getAnnotations.apply(this, arguments);
}
function setAnnotation(_x67) {
  return _setAnnotation.apply(this, arguments);
}
/**
 * Scan for nodes with specific types within a node
 * @param {Object} params - Parameters object
 * @param {string} params.nodeId - ID of the node to scan within
 * @param {Array<string>} params.types - Array of node types to find (e.g. ['COMPONENT', 'FRAME'])
 * @returns {Object} - Object containing found nodes
 */
function _setAnnotation() {
  _setAnnotation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee76(params) {
    var nodeId, annotationId, labelMarkdown, categoryId, properties, node, newAnnotation, _t79;
    return _regenerator().w(function (_context76) {
      while (1) switch (_context76.n) {
        case 0:
          _context76.p = 0;
          console.log("=== setAnnotation Debug Start ===");
          console.log("Input params:", JSON.stringify(params, null, 2));
          nodeId = params.nodeId, annotationId = params.annotationId, labelMarkdown = params.labelMarkdown, categoryId = params.categoryId, properties = params.properties; // Validate required parameters
          if (nodeId) {
            _context76.n = 1;
            break;
          }
          console.error("Validation failed: Missing nodeId");
          return _context76.a(2, {
            success: false,
            error: "Missing nodeId"
          });
        case 1:
          if (labelMarkdown) {
            _context76.n = 2;
            break;
          }
          console.error("Validation failed: Missing labelMarkdown");
          return _context76.a(2, {
            success: false,
            error: "Missing labelMarkdown"
          });
        case 2:
          console.log("Attempting to get node:", nodeId);
          // Get and validate node
          _context76.n = 3;
          return figma.getNodeByIdAsync(nodeId);
        case 3:
          node = _context76.v;
          console.log("Node lookup result:", {
            id: nodeId,
            found: !!node,
            type: node ? node.type : undefined,
            name: node ? node.name : undefined,
            hasAnnotations: node ? "annotations" in node : false
          });
          if (node) {
            _context76.n = 4;
            break;
          }
          console.error("Node lookup failed:", nodeId);
          return _context76.a(2, {
            success: false,
            error: "Node not found: ".concat(nodeId)
          });
        case 4:
          if ("annotations" in node) {
            _context76.n = 5;
            break;
          }
          console.error("Node annotation support check failed:", {
            nodeType: node.type,
            nodeId: node.id
          });
          return _context76.a(2, {
            success: false,
            error: "Node type ".concat(node.type, " does not support annotations")
          });
        case 5:
          // Create the annotation object
          newAnnotation = {
            labelMarkdown: labelMarkdown
          }; // Validate and add categoryId if provided
          if (categoryId) {
            console.log("Adding categoryId to annotation:", categoryId);
            newAnnotation.categoryId = categoryId;
          }

          // Validate and add properties if provided
          if (properties && Array.isArray(properties) && properties.length > 0) {
            console.log("Adding properties to annotation:", JSON.stringify(properties, null, 2));
            newAnnotation.properties = properties;
          }

          // Log current annotations before update
          console.log("Current node annotations:", node.annotations);

          // Overwrite annotations
          console.log("Setting new annotation:", JSON.stringify(newAnnotation, null, 2));
          node.annotations = [newAnnotation];

          // Verify the update
          console.log("Updated node annotations:", node.annotations);
          console.log("=== setAnnotation Debug End ===");
          return _context76.a(2, {
            success: true,
            nodeId: node.id,
            name: node.name,
            annotations: node.annotations
          });
        case 6:
          _context76.p = 6;
          _t79 = _context76.v;
          console.error("=== setAnnotation Error ===");
          console.error("Error details:", {
            message: _t79.message,
            stack: _t79.stack,
            params: JSON.stringify(params, null, 2)
          });
          return _context76.a(2, {
            success: false,
            error: _t79.message
          });
      }
    }, _callee76, null, [[0, 6]]);
  }));
  return _setAnnotation.apply(this, arguments);
}
function scanNodesByTypes(_x68) {
  return _scanNodesByTypes.apply(this, arguments);
}
/**
 * Helper function to recursively find nodes with specific types
 * @param {SceneNode} node - The root node to start searching from
 * @param {Array<string>} types - Array of node types to find
 * @param {Array} matchingNodes - Array to store found nodes
 */
function _scanNodesByTypes() {
  _scanNodesByTypes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee77(params) {
    var _ref62, nodeId, _ref62$types, types, node, matchingNodes, commandId;
    return _regenerator().w(function (_context77) {
      while (1) switch (_context77.n) {
        case 0:
          console.log("Starting to scan nodes by types from node ID: ".concat(params.nodeId));
          _ref62 = params || {}, nodeId = _ref62.nodeId, _ref62$types = _ref62.types, types = _ref62$types === void 0 ? [] : _ref62$types;
          if (!(!types || types.length === 0)) {
            _context77.n = 1;
            break;
          }
          throw new Error("No types specified to search for");
        case 1:
          _context77.n = 2;
          return figma.getNodeByIdAsync(nodeId);
        case 2:
          node = _context77.v;
          if (node) {
            _context77.n = 3;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 3:
          // Simple implementation without chunking
          matchingNodes = []; // Send a single progress update to notify start
          commandId = generateCommandId();
          sendProgressUpdate(commandId, "scan_nodes_by_types", "started", 0, 1, 0, "Starting scan of node \"".concat(node.name || nodeId, "\" for types: ").concat(types.join(", ")), null);

          // Recursively find nodes with specified types
          _context77.n = 4;
          return findNodesByTypes(node, types, matchingNodes);
        case 4:
          // Send completion update
          sendProgressUpdate(commandId, "scan_nodes_by_types", "completed", 100, matchingNodes.length, matchingNodes.length, "Scan complete. Found ".concat(matchingNodes.length, " matching nodes."), {
            matchingNodes: matchingNodes
          });
          return _context77.a(2, {
            success: true,
            message: "Found ".concat(matchingNodes.length, " matching nodes."),
            count: matchingNodes.length,
            matchingNodes: matchingNodes,
            searchedTypes: types
          });
      }
    }, _callee77);
  }));
  return _scanNodesByTypes.apply(this, arguments);
}
function findNodesByTypes(_x69, _x70) {
  return _findNodesByTypes.apply(this, arguments);
} // Set multiple annotations with async progress updates
function _findNodesByTypes() {
  _findNodesByTypes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee78(node, types) {
    var matchingNodes,
      _iterator17,
      _step17,
      child,
      _args78 = arguments,
      _t80;
    return _regenerator().w(function (_context78) {
      while (1) switch (_context78.n) {
        case 0:
          matchingNodes = _args78.length > 2 && _args78[2] !== undefined ? _args78[2] : [];
          if (!(node.visible === false)) {
            _context78.n = 1;
            break;
          }
          return _context78.a(2);
        case 1:
          // Check if this node is one of the specified types
          if (types.includes(node.type)) {
            // Create a minimal representation with just ID, type and bbox
            matchingNodes.push({
              id: node.id,
              name: node.name || "Unnamed ".concat(node.type),
              type: node.type,
              // Basic bounding box info
              bbox: {
                x: typeof node.x === "number" ? node.x : 0,
                y: typeof node.y === "number" ? node.y : 0,
                width: typeof node.width === "number" ? node.width : 0,
                height: typeof node.height === "number" ? node.height : 0
              }
            });
          }

          // Recursively process children of container nodes
          if (!("children" in node)) {
            _context78.n = 8;
            break;
          }
          _iterator17 = _createForOfIteratorHelper(node.children);
          _context78.p = 2;
          _iterator17.s();
        case 3:
          if ((_step17 = _iterator17.n()).done) {
            _context78.n = 5;
            break;
          }
          child = _step17.value;
          _context78.n = 4;
          return findNodesByTypes(child, types, matchingNodes);
        case 4:
          _context78.n = 3;
          break;
        case 5:
          _context78.n = 7;
          break;
        case 6:
          _context78.p = 6;
          _t80 = _context78.v;
          _iterator17.e(_t80);
        case 7:
          _context78.p = 7;
          _iterator17.f();
          return _context78.f(7);
        case 8:
          return _context78.a(2);
      }
    }, _callee78, null, [[2, 6, 7, 8]]);
  }));
  return _findNodesByTypes.apply(this, arguments);
}
function setMultipleAnnotations(_x71) {
  return _setMultipleAnnotations.apply(this, arguments);
}
function _setMultipleAnnotations() {
  _setMultipleAnnotations = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee79(params) {
    var nodeId, annotations, results, successCount, failureCount, i, annotation, result, errorResult, summary, _t81;
    return _regenerator().w(function (_context79) {
      while (1) switch (_context79.n) {
        case 0:
          console.log("=== setMultipleAnnotations Debug Start ===");
          console.log("Input params:", JSON.stringify(params, null, 2));
          nodeId = params.nodeId, annotations = params.annotations;
          if (!(!annotations || annotations.length === 0)) {
            _context79.n = 1;
            break;
          }
          console.error("Validation failed: No annotations provided");
          return _context79.a(2, {
            success: false,
            error: "No annotations provided"
          });
        case 1:
          console.log("Processing ".concat(annotations.length, " annotations for node ").concat(nodeId));
          results = [];
          successCount = 0;
          failureCount = 0; // Process annotations sequentially
          i = 0;
        case 2:
          if (!(i < annotations.length)) {
            _context79.n = 7;
            break;
          }
          annotation = annotations[i];
          console.log("\nProcessing annotation ".concat(i + 1, "/").concat(annotations.length, ":"), JSON.stringify(annotation, null, 2));
          _context79.p = 3;
          console.log("Calling setAnnotation with params:", {
            nodeId: annotation.nodeId,
            labelMarkdown: annotation.labelMarkdown,
            categoryId: annotation.categoryId,
            properties: annotation.properties
          });
          _context79.n = 4;
          return setAnnotation({
            nodeId: annotation.nodeId,
            labelMarkdown: annotation.labelMarkdown,
            categoryId: annotation.categoryId,
            properties: annotation.properties
          });
        case 4:
          result = _context79.v;
          console.log("setAnnotation result:", JSON.stringify(result, null, 2));
          if (result.success) {
            successCount++;
            results.push({
              success: true,
              nodeId: annotation.nodeId
            });
            console.log("\u2713 Annotation ".concat(i + 1, " applied successfully"));
          } else {
            failureCount++;
            results.push({
              success: false,
              nodeId: annotation.nodeId,
              error: result.error
            });
            console.error("\u2717 Annotation ".concat(i + 1, " failed:"), result.error);
          }
          _context79.n = 6;
          break;
        case 5:
          _context79.p = 5;
          _t81 = _context79.v;
          failureCount++;
          errorResult = {
            success: false,
            nodeId: annotation.nodeId,
            error: _t81.message
          };
          results.push(errorResult);
          console.error("\u2717 Annotation ".concat(i + 1, " failed with error:"), _t81);
          console.error("Error details:", {
            message: _t81.message,
            stack: _t81.stack
          });
        case 6:
          i++;
          _context79.n = 2;
          break;
        case 7:
          summary = {
            success: successCount > 0,
            annotationsApplied: successCount,
            annotationsFailed: failureCount,
            totalAnnotations: annotations.length,
            results: results
          };
          console.log("\n=== setMultipleAnnotations Summary ===");
          console.log(JSON.stringify(summary, null, 2));
          console.log("=== setMultipleAnnotations Debug End ===");
          return _context79.a(2, summary);
      }
    }, _callee79, null, [[3, 5]]);
  }));
  return _setMultipleAnnotations.apply(this, arguments);
}
function deleteMultipleNodes(_x72) {
  return _deleteMultipleNodes.apply(this, arguments);
} // Implementation for getInstanceOverrides function
function _deleteMultipleNodes() {
  _deleteMultipleNodes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee81(params) {
    var _ref63, nodeIds, commandId, errorMsg, results, successCount, failureCount, CHUNK_SIZE, chunks, i, chunkIndex, chunk, chunkPromises, chunkResults;
    return _regenerator().w(function (_context81) {
      while (1) switch (_context81.n) {
        case 0:
          _ref63 = params || {}, nodeIds = _ref63.nodeIds;
          commandId = generateCommandId();
          if (!(!nodeIds || !Array.isArray(nodeIds) || nodeIds.length === 0)) {
            _context81.n = 1;
            break;
          }
          errorMsg = "Missing or invalid nodeIds parameter";
          sendProgressUpdate(commandId, "delete_multiple_nodes", "error", 0, 0, 0, errorMsg, {
            error: errorMsg
          });
          throw new Error(errorMsg);
        case 1:
          console.log("Starting deletion of ".concat(nodeIds.length, " nodes"));

          // Send started progress update
          sendProgressUpdate(commandId, "delete_multiple_nodes", "started", 0, nodeIds.length, 0, "Starting deletion of ".concat(nodeIds.length, " nodes"), {
            totalNodes: nodeIds.length
          });
          results = [];
          successCount = 0;
          failureCount = 0; // Process nodes in chunks of 5 to avoid overwhelming Figma
          CHUNK_SIZE = 5;
          chunks = [];
          for (i = 0; i < nodeIds.length; i += CHUNK_SIZE) {
            chunks.push(nodeIds.slice(i, i + CHUNK_SIZE));
          }
          console.log("Split ".concat(nodeIds.length, " deletions into ").concat(chunks.length, " chunks"));

          // Send chunking info update
          sendProgressUpdate(commandId, "delete_multiple_nodes", "in_progress", 5, nodeIds.length, 0, "Preparing to delete ".concat(nodeIds.length, " nodes using ").concat(chunks.length, " chunks"), {
            totalNodes: nodeIds.length,
            chunks: chunks.length,
            chunkSize: CHUNK_SIZE
          });

          // Process each chunk sequentially
          chunkIndex = 0;
        case 2:
          if (!(chunkIndex < chunks.length)) {
            _context81.n = 5;
            break;
          }
          chunk = chunks[chunkIndex];
          console.log("Processing chunk ".concat(chunkIndex + 1, "/").concat(chunks.length, " with ").concat(chunk.length, " nodes"));

          // Send chunk processing start update
          sendProgressUpdate(commandId, "delete_multiple_nodes", "in_progress", Math.round(5 + chunkIndex / chunks.length * 90), nodeIds.length, successCount + failureCount, "Processing deletion chunk ".concat(chunkIndex + 1, "/").concat(chunks.length), {
            currentChunk: chunkIndex + 1,
            totalChunks: chunks.length,
            successCount: successCount,
            failureCount: failureCount
          });

          // Process deletions within a chunk in parallel
          chunkPromises = chunk.map(/*#__PURE__*/function () {
            var _ref64 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee80(nodeId) {
              var node, nodeInfo, _t82;
              return _regenerator().w(function (_context80) {
                while (1) switch (_context80.n) {
                  case 0:
                    _context80.p = 0;
                    _context80.n = 1;
                    return figma.getNodeByIdAsync(nodeId);
                  case 1:
                    node = _context80.v;
                    if (node) {
                      _context80.n = 2;
                      break;
                    }
                    console.error("Node not found: ".concat(nodeId));
                    return _context80.a(2, {
                      success: false,
                      nodeId: nodeId,
                      error: "Node not found: ".concat(nodeId)
                    });
                  case 2:
                    // Save node info before deleting
                    nodeInfo = {
                      id: node.id,
                      name: node.name,
                      type: node.type
                    }; // Delete the node
                    node.remove();
                    console.log("Successfully deleted node: ".concat(nodeId));
                    return _context80.a(2, {
                      success: true,
                      nodeId: nodeId,
                      nodeInfo: nodeInfo
                    });
                  case 3:
                    _context80.p = 3;
                    _t82 = _context80.v;
                    console.error("Error deleting node ".concat(nodeId, ": ").concat(_t82.message));
                    return _context80.a(2, {
                      success: false,
                      nodeId: nodeId,
                      error: _t82.message
                    });
                }
              }, _callee80, null, [[0, 3]]);
            }));
            return function (_x94) {
              return _ref64.apply(this, arguments);
            };
          }()); // Wait for all deletions in this chunk to complete
          _context81.n = 3;
          return Promise.all(chunkPromises);
        case 3:
          chunkResults = _context81.v;
          // Process results for this chunk
          chunkResults.forEach(function (result) {
            if (result.success) {
              successCount++;
            } else {
              failureCount++;
            }
            results.push(result);
          });

          // Send chunk processing complete update
          sendProgressUpdate(commandId, "delete_multiple_nodes", "in_progress", Math.round(5 + (chunkIndex + 1) / chunks.length * 90), nodeIds.length, successCount + failureCount, "Completed chunk ".concat(chunkIndex + 1, "/").concat(chunks.length, ". ").concat(successCount, " successful, ").concat(failureCount, " failed so far."), {
            currentChunk: chunkIndex + 1,
            totalChunks: chunks.length,
            successCount: successCount,
            failureCount: failureCount,
            chunkResults: chunkResults
          });

          // Add a small delay between chunks
          if (!(chunkIndex < chunks.length - 1)) {
            _context81.n = 4;
            break;
          }
          console.log("Pausing between chunks...");
          _context81.n = 4;
          return delay(1000);
        case 4:
          chunkIndex++;
          _context81.n = 2;
          break;
        case 5:
          console.log("Deletion complete: ".concat(successCount, " successful, ").concat(failureCount, " failed"));

          // Send completed progress update
          sendProgressUpdate(commandId, "delete_multiple_nodes", "completed", 100, nodeIds.length, successCount + failureCount, "Node deletion complete: ".concat(successCount, " successful, ").concat(failureCount, " failed"), {
            totalNodes: nodeIds.length,
            nodesDeleted: successCount,
            nodesFailed: failureCount,
            completedInChunks: chunks.length,
            results: results
          });
          return _context81.a(2, {
            success: successCount > 0,
            nodesDeleted: successCount,
            nodesFailed: failureCount,
            totalNodes: nodeIds.length,
            results: results,
            completedInChunks: chunks.length,
            commandId: commandId
          });
      }
    }, _callee81);
  }));
  return _deleteMultipleNodes.apply(this, arguments);
}
function getInstanceOverrides() {
  return _getInstanceOverrides.apply(this, arguments);
}
/**
 * Helper function to validate and get target instances
 * @param {string[]} targetNodeIds - Array of instance node IDs
 * @returns {instanceNode[]} targetInstances - Array of target instances
 */
function _getInstanceOverrides() {
  _getInstanceOverrides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee82() {
    var instanceNode,
      sourceInstance,
      selection,
      instances,
      overrides,
      mainComponent,
      returnData,
      _args82 = arguments,
      _t83;
    return _regenerator().w(function (_context82) {
      while (1) switch (_context82.n) {
        case 0:
          instanceNode = _args82.length > 0 && _args82[0] !== undefined ? _args82[0] : null;
          console.log("=== getInstanceOverrides called ===");
          sourceInstance = null; // Check if an instance node was passed directly
          if (!instanceNode) {
            _context82.n = 2;
            break;
          }
          console.log("Using provided instance node");

          // Validate that the provided node is an instance
          if (!(instanceNode.type !== "INSTANCE")) {
            _context82.n = 1;
            break;
          }
          console.error("Provided node is not an instance");
          figma.notify("Provided node is not a component instance");
          return _context82.a(2, {
            success: false,
            message: "Provided node is not a component instance"
          });
        case 1:
          sourceInstance = instanceNode;
          _context82.n = 5;
          break;
        case 2:
          // No node provided, use selection
          console.log("No node provided, using current selection");

          // Get the current selection
          selection = figma.currentPage.selection; // Check if there's anything selected
          if (!(selection.length === 0)) {
            _context82.n = 3;
            break;
          }
          console.log("No nodes selected");
          figma.notify("Please select at least one instance");
          return _context82.a(2, {
            success: false,
            message: "No nodes selected"
          });
        case 3:
          // Filter for instances in the selection
          instances = selection.filter(function (node) {
            return node.type === "INSTANCE";
          });
          if (!(instances.length === 0)) {
            _context82.n = 4;
            break;
          }
          console.log("No instances found in selection");
          figma.notify("Please select at least one component instance");
          return _context82.a(2, {
            success: false,
            message: "No instances found in selection"
          });
        case 4:
          // Take the first instance from the selection
          sourceInstance = instances[0];
        case 5:
          _context82.p = 5;
          console.log("Getting instance information:");
          console.log(sourceInstance);

          // Get component overrides and main component
          overrides = sourceInstance.overrides || [];
          console.log("  Raw Overrides:", overrides);

          // Get main component
          _context82.n = 6;
          return sourceInstance.getMainComponentAsync();
        case 6:
          mainComponent = _context82.v;
          if (mainComponent) {
            _context82.n = 7;
            break;
          }
          console.error("Failed to get main component");
          figma.notify("Failed to get main component");
          return _context82.a(2, {
            success: false,
            message: "Failed to get main component"
          });
        case 7:
          // return data to MCP server
          returnData = {
            success: true,
            message: "Got component information from \"".concat(sourceInstance.name, "\" for overrides.length: ").concat(overrides.length),
            sourceInstanceId: sourceInstance.id,
            mainComponentId: mainComponent.id,
            overridesCount: overrides.length
          };
          console.log("Data to return to MCP server:", returnData);
          figma.notify("Got component information from \"".concat(sourceInstance.name, "\""));
          return _context82.a(2, returnData);
        case 8:
          _context82.p = 8;
          _t83 = _context82.v;
          console.error("Error in getInstanceOverrides:", _t83);
          figma.notify("Error: ".concat(_t83.message));
          return _context82.a(2, {
            success: false,
            message: "Error: ".concat(_t83.message)
          });
      }
    }, _callee82, null, [[5, 8]]);
  }));
  return _getInstanceOverrides.apply(this, arguments);
}
function getValidTargetInstances(_x73) {
  return _getValidTargetInstances.apply(this, arguments);
}
/**
 * Helper function to validate and get saved override data
 * @param {string} sourceInstanceId - Source instance ID
 * @returns {Promise<Object>} - Validation result with source instance data or error
 */
function _getValidTargetInstances() {
  _getValidTargetInstances = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee83(targetNodeIds) {
    var targetInstances, _iterator18, _step18, targetNodeId, targetNode, _t84;
    return _regenerator().w(function (_context83) {
      while (1) switch (_context83.n) {
        case 0:
          targetInstances = []; // Handle array of instances or single instance
          if (!Array.isArray(targetNodeIds)) {
            _context83.n = 11;
            break;
          }
          if (!(targetNodeIds.length === 0)) {
            _context83.n = 1;
            break;
          }
          return _context83.a(2, {
            success: false,
            message: "No instances provided"
          });
        case 1:
          _iterator18 = _createForOfIteratorHelper(targetNodeIds);
          _context83.p = 2;
          _iterator18.s();
        case 3:
          if ((_step18 = _iterator18.n()).done) {
            _context83.n = 6;
            break;
          }
          targetNodeId = _step18.value;
          _context83.n = 4;
          return figma.getNodeByIdAsync(targetNodeId);
        case 4:
          targetNode = _context83.v;
          if (targetNode && targetNode.type === "INSTANCE") {
            targetInstances.push(targetNode);
          }
        case 5:
          _context83.n = 3;
          break;
        case 6:
          _context83.n = 8;
          break;
        case 7:
          _context83.p = 7;
          _t84 = _context83.v;
          _iterator18.e(_t84);
        case 8:
          _context83.p = 8;
          _iterator18.f();
          return _context83.f(8);
        case 9:
          if (!(targetInstances.length === 0)) {
            _context83.n = 10;
            break;
          }
          return _context83.a(2, {
            success: false,
            message: "No valid instances provided"
          });
        case 10:
          _context83.n = 12;
          break;
        case 11:
          return _context83.a(2, {
            success: false,
            message: "Invalid target node IDs provided"
          });
        case 12:
          return _context83.a(2, {
            success: true,
            message: "Valid target instances provided",
            targetInstances: targetInstances
          });
      }
    }, _callee83, null, [[2, 7, 8, 9]]);
  }));
  return _getValidTargetInstances.apply(this, arguments);
}
function getSourceInstanceData(_x74) {
  return _getSourceInstanceData.apply(this, arguments);
}
/**
 * Sets saved overrides to the selected component instance(s)
 * @param {InstanceNode[] | null} targetInstances - Array of instance nodes to set overrides to
 * @param {Object} sourceResult - Source instance data from getSourceInstanceData
 * @returns {Promise<Object>} - Result of the set operation
 */
function _getSourceInstanceData() {
  _getSourceInstanceData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee84(sourceInstanceId) {
    var sourceInstance, mainComponent;
    return _regenerator().w(function (_context84) {
      while (1) switch (_context84.n) {
        case 0:
          if (sourceInstanceId) {
            _context84.n = 1;
            break;
          }
          return _context84.a(2, {
            success: false,
            message: "Missing source instance ID"
          });
        case 1:
          _context84.n = 2;
          return figma.getNodeByIdAsync(sourceInstanceId);
        case 2:
          sourceInstance = _context84.v;
          if (sourceInstance) {
            _context84.n = 3;
            break;
          }
          return _context84.a(2, {
            success: false,
            message: "Source instance not found. The original instance may have been deleted."
          });
        case 3:
          if (!(sourceInstance.type !== "INSTANCE")) {
            _context84.n = 4;
            break;
          }
          return _context84.a(2, {
            success: false,
            message: "Source node is not a component instance."
          });
        case 4:
          _context84.n = 5;
          return sourceInstance.getMainComponentAsync();
        case 5:
          mainComponent = _context84.v;
          if (mainComponent) {
            _context84.n = 6;
            break;
          }
          return _context84.a(2, {
            success: false,
            message: "Failed to get main component from source instance."
          });
        case 6:
          return _context84.a(2, {
            success: true,
            sourceInstance: sourceInstance,
            mainComponent: mainComponent,
            overrides: sourceInstance.overrides || []
          });
      }
    }, _callee84);
  }));
  return _getSourceInstanceData.apply(this, arguments);
}
function setInstanceOverrides(_x75, _x76) {
  return _setInstanceOverrides.apply(this, arguments);
}
function _setInstanceOverrides() {
  _setInstanceOverrides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee85(targetInstances, sourceResult) {
    var sourceInstance, mainComponent, overrides, _results, totalAppliedCount, _iterator19, _step19, targetInstance, appliedCount, _iterator20, _step20, override, overrideNodeId, overrideNode, sourceNode, fieldApplied, _iterator21, _step21, field, properties, key, instanceCount, message, _message, _message2, _t85, _t86, _t87, _t88, _t89, _t90;
    return _regenerator().w(function (_context85) {
      while (1) switch (_context85.n) {
        case 0:
          _context85.p = 0;
          sourceInstance = sourceResult.sourceInstance, mainComponent = sourceResult.mainComponent, overrides = sourceResult.overrides;
          console.log("Processing ".concat(targetInstances.length, " instances with ").concat(overrides.length, " overrides"));
          console.log("Source instance: ".concat(sourceInstance.id, ", Main component: ").concat(mainComponent.id));
          console.log("Overrides:", overrides);

          // Process all instances
          _results = [];
          totalAppliedCount = 0;
          _iterator19 = _createForOfIteratorHelper(targetInstances);
          _context85.p = 1;
          _iterator19.s();
        case 2:
          if ((_step19 = _iterator19.n()).done) {
            _context85.n = 31;
            break;
          }
          targetInstance = _step19.value;
          _context85.p = 3;
          // // Skip if trying to apply to the source instance itself
          // if (targetInstance.id === sourceInstance.id) {
          //   console.log(`Skipping source instance itself: ${targetInstance.id}`);
          //   results.push({
          //     success: false,
          //     instanceId: targetInstance.id,
          //     instanceName: targetInstance.name,
          //     message: "This is the source instance itself, skipping"
          //   });
          //   continue;
          // }

          // Swap component
          try {
            targetInstance.swapComponent(mainComponent);
            console.log("Swapped component for instance \"".concat(targetInstance.name, "\""));
          } catch (error) {
            console.error("Error swapping component for instance \"".concat(targetInstance.name, "\":"), error);
            _results.push({
              success: false,
              instanceId: targetInstance.id,
              instanceName: targetInstance.name,
              message: "Error: ".concat(error.message)
            });
          }

          // Prepare overrides by replacing node IDs
          appliedCount = 0; // Apply each override
          _iterator20 = _createForOfIteratorHelper(overrides);
          _context85.p = 4;
          _iterator20.s();
        case 5:
          if ((_step20 = _iterator20.n()).done) {
            _context85.n = 25;
            break;
          }
          override = _step20.value;
          if (!(!override.id || !override.overriddenFields || override.overriddenFields.length === 0)) {
            _context85.n = 6;
            break;
          }
          return _context85.a(3, 24);
        case 6:
          // Replace source instance ID with target instance ID in the node path
          overrideNodeId = override.id.replace(sourceInstance.id, targetInstance.id);
          _context85.n = 7;
          return figma.getNodeByIdAsync(overrideNodeId);
        case 7:
          overrideNode = _context85.v;
          if (overrideNode) {
            _context85.n = 8;
            break;
          }
          console.log("Override node not found: ".concat(overrideNodeId));
          return _context85.a(3, 24);
        case 8:
          _context85.n = 9;
          return figma.getNodeByIdAsync(override.id);
        case 9:
          sourceNode = _context85.v;
          if (sourceNode) {
            _context85.n = 10;
            break;
          }
          console.log("Source node not found: ".concat(override.id));
          return _context85.a(3, 24);
        case 10:
          // Apply each overridden field
          fieldApplied = false;
          _iterator21 = _createForOfIteratorHelper(override.overriddenFields);
          _context85.p = 11;
          _iterator21.s();
        case 12:
          if ((_step21 = _iterator21.n()).done) {
            _context85.n = 20;
            break;
          }
          field = _step21.value;
          _context85.p = 13;
          if (!(field === "componentProperties")) {
            _context85.n = 14;
            break;
          }
          // Apply component properties
          if (sourceNode.componentProperties && overrideNode.componentProperties) {
            properties = {};
            for (key in sourceNode.componentProperties) {
              // if INSTANCE_SWAP use id, otherwise use value
              if (sourceNode.componentProperties[key].type === 'INSTANCE_SWAP') {
                properties[key] = sourceNode.componentProperties[key].value;
              } else {
                properties[key] = sourceNode.componentProperties[key].value;
              }
            }
            overrideNode.setProperties(properties);
            fieldApplied = true;
          }
          _context85.n = 17;
          break;
        case 14:
          if (!(field === "characters" && overrideNode.type === "TEXT")) {
            _context85.n = 16;
            break;
          }
          _context85.n = 15;
          return figma.loadFontAsync(overrideNode.fontName);
        case 15:
          overrideNode.characters = sourceNode.characters;
          fieldApplied = true;
          _context85.n = 17;
          break;
        case 16:
          if (field in overrideNode) {
            // Direct property assignment
            overrideNode[field] = sourceNode[field];
            fieldApplied = true;
          }
        case 17:
          _context85.n = 19;
          break;
        case 18:
          _context85.p = 18;
          _t85 = _context85.v;
          console.error("Error applying field ".concat(field, ":"), _t85);
        case 19:
          _context85.n = 12;
          break;
        case 20:
          _context85.n = 22;
          break;
        case 21:
          _context85.p = 21;
          _t86 = _context85.v;
          _iterator21.e(_t86);
        case 22:
          _context85.p = 22;
          _iterator21.f();
          return _context85.f(22);
        case 23:
          if (fieldApplied) {
            appliedCount++;
          }
        case 24:
          _context85.n = 5;
          break;
        case 25:
          _context85.n = 27;
          break;
        case 26:
          _context85.p = 26;
          _t87 = _context85.v;
          _iterator20.e(_t87);
        case 27:
          _context85.p = 27;
          _iterator20.f();
          return _context85.f(27);
        case 28:
          if (appliedCount > 0) {
            totalAppliedCount += appliedCount;
            _results.push({
              success: true,
              instanceId: targetInstance.id,
              instanceName: targetInstance.name,
              appliedCount: appliedCount
            });
            console.log("Applied ".concat(appliedCount, " overrides to \"").concat(targetInstance.name, "\""));
          } else {
            _results.push({
              success: false,
              instanceId: targetInstance.id,
              instanceName: targetInstance.name,
              message: "No overrides were applied"
            });
          }
          _context85.n = 30;
          break;
        case 29:
          _context85.p = 29;
          _t88 = _context85.v;
          console.error("Error processing instance \"".concat(targetInstance.name, "\":"), _t88);
          _results.push({
            success: false,
            instanceId: targetInstance.id,
            instanceName: targetInstance.name,
            message: "Error: ".concat(_t88.message)
          });
        case 30:
          _context85.n = 2;
          break;
        case 31:
          _context85.n = 33;
          break;
        case 32:
          _context85.p = 32;
          _t89 = _context85.v;
          _iterator19.e(_t89);
        case 33:
          _context85.p = 33;
          _iterator19.f();
          return _context85.f(33);
        case 34:
          if (!(totalAppliedCount > 0)) {
            _context85.n = 35;
            break;
          }
          instanceCount = _results.filter(function (r) {
            return r.success;
          }).length;
          message = "Applied ".concat(totalAppliedCount, " overrides to ").concat(instanceCount, " instances");
          figma.notify(message);
          return _context85.a(2, {
            success: true,
            message: message,
            totalCount: totalAppliedCount,
            results: _results
          });
        case 35:
          _message = "No overrides applied to any instance";
          figma.notify(_message);
          return _context85.a(2, {
            success: false,
            message: _message,
            results: _results
          });
        case 36:
          _context85.n = 38;
          break;
        case 37:
          _context85.p = 37;
          _t90 = _context85.v;
          console.error("Error in setInstanceOverrides:", _t90);
          _message2 = "Error: ".concat(_t90.message);
          figma.notify(_message2);
          return _context85.a(2, {
            success: false,
            message: _message2
          });
        case 38:
          return _context85.a(2);
      }
    }, _callee85, null, [[13, 18], [11, 21, 22, 23], [4, 26, 27, 28], [3, 29], [1, 32, 33, 34], [0, 37]]);
  }));
  return _setInstanceOverrides.apply(this, arguments);
}
function setLayoutMode(_x77) {
  return _setLayoutMode.apply(this, arguments);
}
function _setLayoutMode() {
  _setLayoutMode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee86(params) {
    var _ref65, nodeId, _ref65$layoutMode, layoutMode, _ref65$layoutWrap, layoutWrap, node;
    return _regenerator().w(function (_context86) {
      while (1) switch (_context86.n) {
        case 0:
          _ref65 = params || {}, nodeId = _ref65.nodeId, _ref65$layoutMode = _ref65.layoutMode, layoutMode = _ref65$layoutMode === void 0 ? "NONE" : _ref65$layoutMode, _ref65$layoutWrap = _ref65.layoutWrap, layoutWrap = _ref65$layoutWrap === void 0 ? "NO_WRAP" : _ref65$layoutWrap; // Get the target node
          _context86.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context86.v;
          if (node) {
            _context86.n = 2;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (!(node.type !== "FRAME" && node.type !== "SLIDE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET" && node.type !== "INSTANCE")) {
            _context86.n = 3;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support layoutMode"));
        case 3:
          // Set layout mode
          node.layoutMode = layoutMode;

          // Set layoutWrap if applicable
          if (layoutMode !== "NONE") {
            node.layoutWrap = layoutWrap;
          }
          return _context86.a(2, {
            id: node.id,
            name: node.name,
            layoutMode: node.layoutMode,
            layoutWrap: node.layoutWrap
          });
      }
    }, _callee86);
  }));
  return _setLayoutMode.apply(this, arguments);
}
function setPadding(_x78) {
  return _setPadding.apply(this, arguments);
}
function _setPadding() {
  _setPadding = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee87(params) {
    var _ref66, nodeId, paddingTop, paddingRight, paddingBottom, paddingLeft, node;
    return _regenerator().w(function (_context87) {
      while (1) switch (_context87.n) {
        case 0:
          _ref66 = params || {}, nodeId = _ref66.nodeId, paddingTop = _ref66.paddingTop, paddingRight = _ref66.paddingRight, paddingBottom = _ref66.paddingBottom, paddingLeft = _ref66.paddingLeft; // Get the target node
          _context87.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context87.v;
          if (node) {
            _context87.n = 2;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (!(node.type !== "FRAME" && node.type !== "SLIDE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET" && node.type !== "INSTANCE")) {
            _context87.n = 3;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support padding"));
        case 3:
          if (!(node.layoutMode === "NONE")) {
            _context87.n = 4;
            break;
          }
          throw new Error("Padding can only be set on auto-layout frames (layoutMode must not be NONE)");
        case 4:
          // Set padding values if provided
          if (paddingTop !== undefined) node.paddingTop = paddingTop;
          if (paddingRight !== undefined) node.paddingRight = paddingRight;
          if (paddingBottom !== undefined) node.paddingBottom = paddingBottom;
          if (paddingLeft !== undefined) node.paddingLeft = paddingLeft;
          return _context87.a(2, {
            id: node.id,
            name: node.name,
            paddingTop: node.paddingTop,
            paddingRight: node.paddingRight,
            paddingBottom: node.paddingBottom,
            paddingLeft: node.paddingLeft
          });
      }
    }, _callee87);
  }));
  return _setPadding.apply(this, arguments);
}
function setAxisAlign(_x79) {
  return _setAxisAlign.apply(this, arguments);
}
function _setAxisAlign() {
  _setAxisAlign = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee88(params) {
    var _ref67, nodeId, primaryAxisAlignItems, counterAxisAlignItems, node;
    return _regenerator().w(function (_context88) {
      while (1) switch (_context88.n) {
        case 0:
          _ref67 = params || {}, nodeId = _ref67.nodeId, primaryAxisAlignItems = _ref67.primaryAxisAlignItems, counterAxisAlignItems = _ref67.counterAxisAlignItems; // Get the target node
          _context88.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context88.v;
          if (node) {
            _context88.n = 2;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (!(node.type !== "FRAME" && node.type !== "SLIDE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET" && node.type !== "INSTANCE")) {
            _context88.n = 3;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support axis alignment"));
        case 3:
          if (!(node.layoutMode === "NONE")) {
            _context88.n = 4;
            break;
          }
          throw new Error("Axis alignment can only be set on auto-layout frames (layoutMode must not be NONE)");
        case 4:
          if (!(primaryAxisAlignItems !== undefined)) {
            _context88.n = 6;
            break;
          }
          if (["MIN", "MAX", "CENTER", "SPACE_BETWEEN"].includes(primaryAxisAlignItems)) {
            _context88.n = 5;
            break;
          }
          throw new Error("Invalid primaryAxisAlignItems value. Must be one of: MIN, MAX, CENTER, SPACE_BETWEEN");
        case 5:
          node.primaryAxisAlignItems = primaryAxisAlignItems;
        case 6:
          if (!(counterAxisAlignItems !== undefined)) {
            _context88.n = 9;
            break;
          }
          if (["MIN", "MAX", "CENTER", "BASELINE"].includes(counterAxisAlignItems)) {
            _context88.n = 7;
            break;
          }
          throw new Error("Invalid counterAxisAlignItems value. Must be one of: MIN, MAX, CENTER, BASELINE");
        case 7:
          if (!(counterAxisAlignItems === "BASELINE" && node.layoutMode !== "HORIZONTAL")) {
            _context88.n = 8;
            break;
          }
          throw new Error("BASELINE alignment is only valid for horizontal auto-layout frames");
        case 8:
          node.counterAxisAlignItems = counterAxisAlignItems;
        case 9:
          return _context88.a(2, {
            id: node.id,
            name: node.name,
            primaryAxisAlignItems: node.primaryAxisAlignItems,
            counterAxisAlignItems: node.counterAxisAlignItems,
            layoutMode: node.layoutMode
          });
      }
    }, _callee88);
  }));
  return _setAxisAlign.apply(this, arguments);
}
function setLayoutSizing(_x80) {
  return _setLayoutSizing.apply(this, arguments);
}
function _setLayoutSizing() {
  _setLayoutSizing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee89(params) {
    var _ref68, nodeId, layoutSizingHorizontal, layoutSizingVertical, node;
    return _regenerator().w(function (_context89) {
      while (1) switch (_context89.n) {
        case 0:
          _ref68 = params || {}, nodeId = _ref68.nodeId, layoutSizingHorizontal = _ref68.layoutSizingHorizontal, layoutSizingVertical = _ref68.layoutSizingVertical; // Get the target node
          _context89.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context89.v;
          if (node) {
            _context89.n = 2;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (!(node.type !== "FRAME" && node.type !== "SLIDE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET" && node.type !== "INSTANCE")) {
            _context89.n = 3;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support layout sizing"));
        case 3:
          if (!(node.layoutMode === "NONE")) {
            _context89.n = 4;
            break;
          }
          throw new Error("Layout sizing can only be set on auto-layout frames (layoutMode must not be NONE)");
        case 4:
          if (!(layoutSizingHorizontal !== undefined)) {
            _context89.n = 8;
            break;
          }
          if (["FIXED", "HUG", "FILL"].includes(layoutSizingHorizontal)) {
            _context89.n = 5;
            break;
          }
          throw new Error("Invalid layoutSizingHorizontal value. Must be one of: FIXED, HUG, FILL");
        case 5:
          if (!(layoutSizingHorizontal === "HUG" && !["FRAME", "SLIDE", "TEXT"].includes(node.type))) {
            _context89.n = 6;
            break;
          }
          throw new Error("HUG sizing is only valid on auto-layout frames and text nodes");
        case 6:
          if (!(layoutSizingHorizontal === "FILL" && (!node.parent || node.parent.layoutMode === "NONE"))) {
            _context89.n = 7;
            break;
          }
          throw new Error("FILL sizing is only valid on auto-layout children");
        case 7:
          node.layoutSizingHorizontal = layoutSizingHorizontal;
        case 8:
          if (!(layoutSizingVertical !== undefined)) {
            _context89.n = 12;
            break;
          }
          if (["FIXED", "HUG", "FILL"].includes(layoutSizingVertical)) {
            _context89.n = 9;
            break;
          }
          throw new Error("Invalid layoutSizingVertical value. Must be one of: FIXED, HUG, FILL");
        case 9:
          if (!(layoutSizingVertical === "HUG" && !["FRAME", "TEXT"].includes(node.type))) {
            _context89.n = 10;
            break;
          }
          throw new Error("HUG sizing is only valid on auto-layout frames and text nodes");
        case 10:
          if (!(layoutSizingVertical === "FILL" && (!node.parent || node.parent.layoutMode === "NONE"))) {
            _context89.n = 11;
            break;
          }
          throw new Error("FILL sizing is only valid on auto-layout children");
        case 11:
          node.layoutSizingVertical = layoutSizingVertical;
        case 12:
          return _context89.a(2, {
            id: node.id,
            name: node.name,
            layoutSizingHorizontal: node.layoutSizingHorizontal,
            layoutSizingVertical: node.layoutSizingVertical,
            layoutMode: node.layoutMode
          });
      }
    }, _callee89);
  }));
  return _setLayoutSizing.apply(this, arguments);
}
function setItemSpacing(_x81) {
  return _setItemSpacing.apply(this, arguments);
}
function _setItemSpacing() {
  _setItemSpacing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee90(params) {
    var _ref69, nodeId, itemSpacing, node;
    return _regenerator().w(function (_context90) {
      while (1) switch (_context90.n) {
        case 0:
          _ref69 = params || {}, nodeId = _ref69.nodeId, itemSpacing = _ref69.itemSpacing; // Get the target node
          _context90.n = 1;
          return figma.getNodeByIdAsync(nodeId);
        case 1:
          node = _context90.v;
          if (node) {
            _context90.n = 2;
            break;
          }
          throw new Error("Node with ID ".concat(nodeId, " not found"));
        case 2:
          if (!(node.type !== "FRAME" && node.type !== "SLIDE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET" && node.type !== "INSTANCE")) {
            _context90.n = 3;
            break;
          }
          throw new Error("Node type ".concat(node.type, " does not support item spacing"));
        case 3:
          if (!(node.layoutMode === "NONE")) {
            _context90.n = 4;
            break;
          }
          throw new Error("Item spacing can only be set on auto-layout frames (layoutMode must not be NONE)");
        case 4:
          if (!(itemSpacing !== undefined)) {
            _context90.n = 6;
            break;
          }
          if (!(typeof itemSpacing !== "number")) {
            _context90.n = 5;
            break;
          }
          throw new Error("Item spacing must be a number");
        case 5:
          node.itemSpacing = itemSpacing;
        case 6:
          return _context90.a(2, {
            id: node.id,
            name: node.name,
            itemSpacing: node.itemSpacing,
            layoutMode: node.layoutMode
          });
      }
    }, _callee90);
  }));
  return _setItemSpacing.apply(this, arguments);
}
function setDefaultConnector(_x82) {
  return _setDefaultConnector.apply(this, arguments);
}
function _setDefaultConnector() {
  _setDefaultConnector = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee91(params) {
    var _ref70, connectorId, node, existingConnectorId, existingConnector, currentPageConnectors, foundConnector, autoFoundId, _t91, _t92, _t93;
    return _regenerator().w(function (_context91) {
      while (1) switch (_context91.n) {
        case 0:
          _ref70 = params || {}, connectorId = _ref70.connectorId; // If connectorId is provided, search and set by that ID (do not check existing storage)
          if (!connectorId) {
            _context91.n = 5;
            break;
          }
          _context91.n = 1;
          return figma.getNodeByIdAsync(connectorId);
        case 1:
          node = _context91.v;
          if (node) {
            _context91.n = 2;
            break;
          }
          throw new Error("Connector node not found with ID: ".concat(connectorId));
        case 2:
          if (!(node.type !== 'CONNECTOR')) {
            _context91.n = 3;
            break;
          }
          throw new Error("Node is not a connector: ".concat(connectorId));
        case 3:
          _context91.n = 4;
          return figma.clientStorage.setAsync('defaultConnectorId', connectorId);
        case 4:
          return _context91.a(2, {
            success: true,
            message: "Default connector set to: ".concat(connectorId),
            connectorId: connectorId
          });
        case 5:
          _context91.p = 5;
          _context91.n = 6;
          return figma.clientStorage.getAsync('defaultConnectorId');
        case 6:
          existingConnectorId = _context91.v;
          if (!existingConnectorId) {
            _context91.n = 12;
            break;
          }
          _context91.p = 7;
          _context91.n = 8;
          return figma.getNodeByIdAsync(existingConnectorId);
        case 8:
          existingConnector = _context91.v;
          if (!(existingConnector && existingConnector.type === 'CONNECTOR')) {
            _context91.n = 9;
            break;
          }
          return _context91.a(2, {
            success: true,
            message: "Default connector is already set to: ".concat(existingConnectorId),
            connectorId: existingConnectorId,
            exists: true
          });
        case 9:
          console.log("Stored connector ID ".concat(existingConnectorId, " is no longer valid, finding a new connector..."));
        case 10:
          _context91.n = 12;
          break;
        case 11:
          _context91.p = 11;
          _t91 = _context91.v;
          console.log("Error finding stored connector: ".concat(_t91.message, ". Will try to set a new one."));
        case 12:
          _context91.n = 14;
          break;
        case 13:
          _context91.p = 13;
          _t92 = _context91.v;
          console.log("Error checking for existing connector: ".concat(_t92.message));
        case 14:
          _context91.p = 14;
          // Find CONNECTOR type nodes in the current page
          currentPageConnectors = figma.currentPage.findAllWithCriteria({
            types: ['CONNECTOR']
          });
          if (!(currentPageConnectors && currentPageConnectors.length > 0)) {
            _context91.n = 16;
            break;
          }
          // Use the first connector found
          foundConnector = currentPageConnectors[0];
          autoFoundId = foundConnector.id; // Set the found connector as the default connector
          _context91.n = 15;
          return figma.clientStorage.setAsync('defaultConnectorId', autoFoundId);
        case 15:
          return _context91.a(2, {
            success: true,
            message: "Automatically found and set default connector to: ".concat(autoFoundId),
            connectorId: autoFoundId,
            autoSelected: true
          });
        case 16:
          throw new Error('No connector found in the current page. Please create a connector in Figma first or specify a connector ID.');
        case 17:
          _context91.n = 19;
          break;
        case 18:
          _context91.p = 18;
          _t93 = _context91.v;
          throw new Error("Failed to find a connector: ".concat(_t93.message));
        case 19:
          return _context91.a(2);
      }
    }, _callee91, null, [[14, 18], [7, 11], [5, 13]]);
  }));
  return _setDefaultConnector.apply(this, arguments);
}
function createCursorNode(_x83) {
  return _createCursorNode.apply(this, arguments);
}
function _createCursorNode() {
  _createCursorNode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee92(targetNodeId) {
    var svgString, targetNode, parentNodeId, parentNode, importedNode, cursorNode, _t94;
    return _regenerator().w(function (_context92) {
      while (1) switch (_context92.n) {
        case 0:
          svgString = "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M16 8V35.2419L22 28.4315L27 39.7823C27 39.7823 28.3526 40.2722 29 39.7823C29.6474 39.2924 30.2913 38.3057 30 37.5121C28.6247 33.7654 25 26.1613 25 26.1613H32L16 8Z\" fill=\"#202125\" />\n  </svg>";
          _context92.p = 1;
          _context92.n = 2;
          return figma.getNodeByIdAsync(targetNodeId);
        case 2:
          targetNode = _context92.v;
          if (targetNode) {
            _context92.n = 3;
            break;
          }
          throw new Error("Target node not found");
        case 3:
          // The targetNodeId has semicolons since it is a nested node.
          // So we need to get the parent node ID from the target node ID and check if we can appendChild to it or not.
          parentNodeId = targetNodeId.includes(';') ? targetNodeId.split(';')[0] : targetNodeId;
          if (parentNodeId) {
            _context92.n = 4;
            break;
          }
          throw new Error("Could not determine parent node ID");
        case 4:
          _context92.n = 5;
          return figma.getNodeByIdAsync(parentNodeId);
        case 5:
          parentNode = _context92.v;
          if (parentNode) {
            _context92.n = 6;
            break;
          }
          throw new Error("Parent node not found");
        case 6:
          if (!(parentNode.type === 'INSTANCE' || parentNode.type === 'COMPONENT' || parentNode.type === 'COMPONENT_SET')) {
            _context92.n = 7;
            break;
          }
          parentNode = parentNode.parent;
          if (parentNode) {
            _context92.n = 7;
            break;
          }
          throw new Error("Parent node not found");
        case 7:
          _context92.n = 8;
          return figma.createNodeFromSvg(svgString);
        case 8:
          importedNode = _context92.v;
          if (!(!importedNode || !importedNode.id)) {
            _context92.n = 9;
            break;
          }
          throw new Error("Failed to create imported cursor node");
        case 9:
          importedNode.name = "TTF_Connector / Mouse Cursor";
          importedNode.resize(48, 48);
          cursorNode = importedNode.findOne(function (node) {
            return node.type === 'VECTOR';
          });
          if (cursorNode) {
            cursorNode.fills = [{
              type: 'SOLID',
              color: {
                r: 0,
                g: 0,
                b: 0
              },
              opacity: 1
            }];
            cursorNode.strokes = [{
              type: 'SOLID',
              color: {
                r: 1,
                g: 1,
                b: 1
              },
              opacity: 1
            }];
            cursorNode.strokeWeight = 2;
            cursorNode.strokeAlign = 'OUTSIDE';
            cursorNode.effects = [{
              type: "DROP_SHADOW",
              color: {
                r: 0,
                g: 0,
                b: 0,
                a: 0.3
              },
              offset: {
                x: 1,
                y: 1
              },
              radius: 2,
              spread: 0,
              visible: true,
              blendMode: "NORMAL"
            }];
          }

          // Append the cursor node to the parent node
          parentNode.appendChild(importedNode);

          // if the parentNode has auto-layout enabled, set the layoutPositioning to ABSOLUTE
          if ('layoutMode' in parentNode && parentNode.layoutMode !== 'NONE') {
            importedNode.layoutPositioning = 'ABSOLUTE';
          }

          // Adjust the importedNode's position to the targetNode's position
          if (targetNode.absoluteBoundingBox && parentNode.absoluteBoundingBox) {
            // if the targetNode has absoluteBoundingBox, set the importedNode's absoluteBoundingBox to the targetNode's absoluteBoundingBox
            console.log('targetNode.absoluteBoundingBox', targetNode.absoluteBoundingBox);
            console.log('parentNode.absoluteBoundingBox', parentNode.absoluteBoundingBox);
            importedNode.x = targetNode.absoluteBoundingBox.x - parentNode.absoluteBoundingBox.x + targetNode.absoluteBoundingBox.width / 2 - 48 / 2;
            importedNode.y = targetNode.absoluteBoundingBox.y - parentNode.absoluteBoundingBox.y + targetNode.absoluteBoundingBox.height / 2 - 48 / 2;
          } else if ('x' in targetNode && 'y' in targetNode && 'width' in targetNode && 'height' in targetNode) {
            // if the targetNode has x, y, width, height, calculate center based on relative position
            console.log('targetNode.x/y/width/height', targetNode.x, targetNode.y, targetNode.width, targetNode.height);
            importedNode.x = targetNode.x + targetNode.width / 2 - 48 / 2;
            importedNode.y = targetNode.y + targetNode.height / 2 - 48 / 2;
          } else {
            // Fallback: Place at top-left of target if possible, otherwise at (0,0) relative to parent
            if ('x' in targetNode && 'y' in targetNode) {
              console.log('Fallback to targetNode x/y');
              importedNode.x = targetNode.x;
              importedNode.y = targetNode.y;
            } else {
              console.log('Fallback to (0,0)');
              importedNode.x = 0;
              importedNode.y = 0;
            }
          }

          // get the importedNode ID and the importedNode
          console.log('importedNode', importedNode);
          return _context92.a(2, {
            id: importedNode.id,
            node: importedNode
          });
        case 10:
          _context92.p = 10;
          _t94 = _context92.v;
          console.error("Error creating cursor from SVG:", _t94);
          return _context92.a(2, {
            id: null,
            node: null,
            error: _t94.message
          });
      }
    }, _callee92, null, [[1, 10]]);
  }));
  return _createCursorNode.apply(this, arguments);
}
function createConnections(_x84) {
  return _createConnections.apply(this, arguments);
}
function _createConnections() {
  _createConnections = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee93(params) {
    var connections, commandId, defaultConnectorId, defaultConnector, results, processedCount, totalCount, fontLoaded, i, _connections$i, originalStartId, originalEndId, text, startId, endId, cursorResult, startNode, _cursorResult, endNode, clonedConnector, fontName, _t95, _t96, _t97, _t98, _t99;
    return _regenerator().w(function (_context93) {
      while (1) switch (_context93.n) {
        case 0:
          if (!(!params || !params.connections || !Array.isArray(params.connections))) {
            _context93.n = 1;
            break;
          }
          throw new Error('Missing or invalid connections parameter');
        case 1:
          connections = params.connections; // Command ID for progress tracking
          commandId = generateCommandId();
          sendProgressUpdate(commandId, "create_connections", "started", 0, connections.length, 0, "Starting to create ".concat(connections.length, " connections"));

          // Get default connector ID from client storage
          _context93.n = 2;
          return figma.clientStorage.getAsync('defaultConnectorId');
        case 2:
          defaultConnectorId = _context93.v;
          if (defaultConnectorId) {
            _context93.n = 3;
            break;
          }
          throw new Error('No default connector set. Please try one of the following options to create connections:\n1. Create a connector in FigJam and copy/paste it to your current page, then run the "set_default_connector" command.\n2. Select an existing connector on the current page, then run the "set_default_connector" command.');
        case 3:
          _context93.n = 4;
          return figma.getNodeByIdAsync(defaultConnectorId);
        case 4:
          defaultConnector = _context93.v;
          if (defaultConnector) {
            _context93.n = 5;
            break;
          }
          throw new Error("Default connector not found with ID: ".concat(defaultConnectorId));
        case 5:
          if (!(defaultConnector.type !== 'CONNECTOR')) {
            _context93.n = 6;
            break;
          }
          throw new Error("Node is not a connector: ".concat(defaultConnectorId));
        case 6:
          // Results array for connection creation
          results = [];
          processedCount = 0;
          totalCount = connections.length; // Preload fonts (used for text if provided)
          fontLoaded = false;
          i = 0;
        case 7:
          if (!(i < connections.length)) {
            _context93.n = 36;
            break;
          }
          _context93.p = 8;
          _connections$i = connections[i], originalStartId = _connections$i.startNodeId, originalEndId = _connections$i.endNodeId, text = _connections$i.text;
          startId = originalStartId;
          endId = originalEndId; // Check and potentially replace start node ID
          if (!startId.includes(';')) {
            _context93.n = 11;
            break;
          }
          console.log("Nested start node detected: ".concat(startId, ". Creating cursor node."));
          _context93.n = 9;
          return createCursorNode(startId);
        case 9:
          cursorResult = _context93.v;
          if (!(!cursorResult || !cursorResult.id)) {
            _context93.n = 10;
            break;
          }
          throw new Error("Failed to create cursor node for nested start node: ".concat(startId));
        case 10:
          startId = cursorResult.id;
        case 11:
          _context93.n = 12;
          return figma.getNodeByIdAsync(startId);
        case 12:
          startNode = _context93.v;
          if (startNode) {
            _context93.n = 13;
            break;
          }
          throw new Error("Start node not found with ID: ".concat(startId));
        case 13:
          if (!endId.includes(';')) {
            _context93.n = 16;
            break;
          }
          console.log("Nested end node detected: ".concat(endId, ". Creating cursor node."));
          _context93.n = 14;
          return createCursorNode(endId);
        case 14:
          _cursorResult = _context93.v;
          if (!(!_cursorResult || !_cursorResult.id)) {
            _context93.n = 15;
            break;
          }
          throw new Error("Failed to create cursor node for nested end node: ".concat(endId));
        case 15:
          endId = _cursorResult.id;
        case 16:
          _context93.n = 17;
          return figma.getNodeByIdAsync(endId);
        case 17:
          endNode = _context93.v;
          if (endNode) {
            _context93.n = 18;
            break;
          }
          throw new Error("End node not found with ID: ".concat(endId));
        case 18:
          // Clone the default connector
          clonedConnector = defaultConnector.clone(); // Update connector name using potentially replaced node names
          clonedConnector.name = "TTF_Connector/".concat(startNode.id, "/").concat(endNode.id);

          // Set start and end points using potentially replaced IDs
          clonedConnector.connectorStart = {
            endpointNodeId: startId,
            magnet: 'AUTO'
          };
          clonedConnector.connectorEnd = {
            endpointNodeId: endId,
            magnet: 'AUTO'
          };

          // Add text (if provided)
          if (!text) {
            _context93.n = 33;
            break;
          }
          _context93.p = 19;
          _context93.p = 20;
          if (!(defaultConnector.text && defaultConnector.text.fontName)) {
            _context93.n = 22;
            break;
          }
          fontName = defaultConnector.text.fontName;
          _context93.n = 21;
          return figma.loadFontAsync(fontName);
        case 21:
          clonedConnector.text.fontName = fontName;
          _context93.n = 23;
          break;
        case 22:
          _context93.n = 23;
          return figma.loadFontAsync({
            family: "Inter",
            style: "Regular"
          });
        case 23:
          _context93.n = 31;
          break;
        case 24:
          _context93.p = 24;
          _t95 = _context93.v;
          _context93.p = 25;
          _context93.n = 26;
          return figma.loadFontAsync({
            family: "Inter",
            style: "Medium"
          });
        case 26:
          _context93.n = 31;
          break;
        case 27:
          _context93.p = 27;
          _t96 = _context93.v;
          _context93.p = 28;
          _context93.n = 29;
          return figma.loadFontAsync({
            family: "System",
            style: "Regular"
          });
        case 29:
          _context93.n = 31;
          break;
        case 30:
          _context93.p = 30;
          _t97 = _context93.v;
          throw new Error("Failed to load any font: ".concat(_t95.message));
        case 31:
          // Set the text
          clonedConnector.text.characters = text;
          _context93.n = 33;
          break;
        case 32:
          _context93.p = 32;
          _t98 = _context93.v;
          console.error("Error setting text:", _t98);
          // Continue with connection even if text setting fails
          results.push({
            id: clonedConnector.id,
            startNodeId: startNodeId,
            endNodeId: endNodeId,
            text: "",
            textError: _t98.message
          });

          // Continue to next connection
          return _context93.a(3, 35);
        case 33:
          // Add to results (using the *original* IDs for reference if needed)
          results.push({
            id: clonedConnector.id,
            originalStartNodeId: originalStartId,
            originalEndNodeId: originalEndId,
            usedStartNodeId: startId,
            // ID actually used for connection
            usedEndNodeId: endId,
            // ID actually used for connection
            text: text || ""
          });

          // Update progress
          processedCount++;
          sendProgressUpdate(commandId, "create_connections", "in_progress", processedCount / totalCount, totalCount, processedCount, "Created connection ".concat(processedCount, "/").concat(totalCount));
          _context93.n = 35;
          break;
        case 34:
          _context93.p = 34;
          _t99 = _context93.v;
          console.error("Error creating connection", _t99);
          // Continue processing remaining connections even if an error occurs
          processedCount++;
          sendProgressUpdate(commandId, "create_connections", "in_progress", processedCount / totalCount, totalCount, processedCount, "Error creating connection: ".concat(_t99.message));
          results.push({
            error: _t99.message,
            connectionInfo: connections[i]
          });
        case 35:
          i++;
          _context93.n = 7;
          break;
        case 36:
          // Completion update
          sendProgressUpdate(commandId, "create_connections", "completed", 1, totalCount, totalCount, "Completed creating ".concat(results.length, " connections"));
          return _context93.a(2, {
            success: true,
            count: results.length,
            connections: results
          });
      }
    }, _callee93, null, [[28, 30], [25, 27], [20, 24], [19, 32], [8, 34]]);
  }));
  return _createConnections.apply(this, arguments);
}
