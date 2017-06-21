"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * GET /
 * Home page.
 */
exports.index = function () {
    let api = express_1.Router();
    api.get('/', (req, res) => {
        res.send("Hola, Mondo! Xenia API v1!");
    });
    return api;
};
