/**
 * Module dependencies
 */

import * as express from "express"
import * as debug from 'debug';  //?? how do we use debug??
import * as bodyParser from "body-parser";
import * as logger from "morgan";

/**
 * 
 */
import * as api from "./api/index";

/**
 * Bootstraping Express server.
 */

export let server = function () {

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
}








