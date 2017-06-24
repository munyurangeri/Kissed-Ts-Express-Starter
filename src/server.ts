/**
 * Module dependencies
 */

import * as express from "express"
import * as debug from 'debug';  //?? how do we use debug??
// import * as bodyParser from "body-parser";
import * as logger from "morgan";



import { models } from "./models/index";
import * as index from "./api/index";
import * as user from "./api/user";

/**
 * Bootstraping Express server.
 */

export let server = function (dbUrl: string) {

    /**
     * Bootstrap Database
     */

    models(dbUrl)

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
}








