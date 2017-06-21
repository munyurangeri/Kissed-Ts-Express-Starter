"use strict";
/**
 * Module dependencies
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
/**
 *
 */
const api = require("./api/index");
/**
 * Bootstraping Express server.
 */
exports.server = function () {
    /**
    * Express configuration.
    */
    const app = express();
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    /**
     * API Routes
     */
    app.use('/api/v1/', api.index());
    return app;
};
