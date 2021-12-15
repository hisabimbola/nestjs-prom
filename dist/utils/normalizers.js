"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeStatusCode = exports.normalizePath = void 0;
const url = require("url");
const UrlValueParser = require("url-value-parser");
function normalizePath(originalUrl, extraMasks, placeholder) {
    const { pathname } = url.parse(originalUrl);
    const urlParser = new UrlValueParser({ extraMasks });
    return urlParser.replacePathValues(pathname, placeholder);
}
exports.normalizePath = normalizePath;
function normalizeStatusCode(statusCode) {
    if (statusCode >= 200 && statusCode < 300)
        return "2XX";
    if (statusCode >= 300 && statusCode < 400)
        return "3XX";
    if (statusCode >= 400 && statusCode < 500)
        return "4XX";
    return "5XX";
}
exports.normalizeStatusCode = normalizeStatusCode;
