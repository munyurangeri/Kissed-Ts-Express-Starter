"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { invoke } from "wagner-core";
/**
 * GET /
 * API Desecription.
 */
exports.index = function () {
    let api = express_1.Router();
    api.get('/', (req, res) => {
        res.json({ data: {
                description: "Hola, Mondo! Xenia API v1!"
            } });
    });
    return api;
};
