"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var build_url_1 = __importDefault(require("build-url"));
/// <reference types="dokuinjs" />
function Run(inputConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var name, description, baseURL, author, endpoints, endpoints_1, endpoints_1_1, endpoint, builtURL, response, status_1, statusText, headers, data, finalResponse, err_1, _b, status_2, statusText, headers, data, finalErrResponse, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    name = inputConfig.name, description = inputConfig.description, baseURL = inputConfig.baseURL, author = inputConfig.author, endpoints = inputConfig.endpoints;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 8, 9, 10]);
                    endpoints_1 = __values(endpoints), endpoints_1_1 = endpoints_1.next();
                    _d.label = 2;
                case 2:
                    if (!!endpoints_1_1.done) return [3 /*break*/, 7];
                    endpoint = endpoints_1_1.value;
                    builtURL = build_url_1.default(baseURL, {
                        path: typeof endpoint.path !== 'undefined' ? endpoint.path : baseURL,
                        queryParams: typeof endpoint.query !== 'undefined' ? endpoint.query : {}
                    });
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, shootAPI(__assign({ url: builtURL }, endpoint))];
                case 4:
                    response = _d.sent();
                    status_1 = response.status, statusText = response.statusText, headers = response.headers, data = response.data;
                    finalResponse = {
                        status: status_1,
                        statusText: statusText,
                        headers: headers,
                        body: data
                    };
                    endpoint.response = finalResponse;
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _d.sent();
                    _b = err_1.response, status_2 = _b.status, statusText = _b.statusText, headers = _b.headers, data = _b.data;
                    finalErrResponse = {
                        status: status_2,
                        statusText: statusText,
                        headers: headers,
                        body: data
                    };
                    (_a = endpoint.errorResponse) === null || _a === void 0 ? void 0 : _a.push(finalErrResponse);
                    return [3 /*break*/, 6];
                case 6:
                    endpoints_1_1 = endpoints_1.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (endpoints_1_1 && !endpoints_1_1.done && (_c = endpoints_1.return)) _c.call(endpoints_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, { name: name, description: description, baseURL: baseURL, author: author, endpoints: endpoints }];
            }
        });
    });
}
exports.default = Run;
function shootAPI(shootData) {
    return __awaiter(this, void 0, void 0, function () {
        var url, _a, method, headers, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = shootData.url, _a = shootData.method, method = _a === void 0 ? 'GET' : _a, headers = shootData.headers, body = shootData.body;
                    return [4 /*yield*/, axios_1.default({
                            url: url,
                            method: method,
                            headers: headers,
                            data: body
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.shootAPI = shootAPI;
//# sourceMappingURL=run.js.map