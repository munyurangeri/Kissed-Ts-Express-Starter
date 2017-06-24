"use strict";
/**
 * Module dependencies
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as bodyParser from "body-parser";
const logger = require("morgan");
const index_1 = require("./models/index");
const index = require("./api/index");
const user = require("./api/user");
/**
 * Bootstraping Express server.
 */
exports.server = function (dbUrl) {
    /**
     * Bootstrap Database
     */
    index_1.models(dbUrl);
    /**
    * Express configuration.
    */
    const app = express();
    app.use(logger("dev"));
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true })); 
    /**
     * API Routes
     */
    app.use('/api/v1/', index.index());
    let userRoutes = user.user();
    app.use('/api/v1/users', user.user());
    return app;
};
