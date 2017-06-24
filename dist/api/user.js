"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const status = require("http-status");
const wagner_core_1 = require("wagner-core");
// import  models from "../models/index"
/**
 * GET /
 * Users.
 */
exports.user = function () {
    let api = express_1.Router();
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));
    api.get('', wagner_core_1.invoke((User) => {
        return (req, res) => {
            User.
                paginate({}, {}, (error, data) => {
                if (error) {
                    return res.
                        status(status.INTERNAL_SERVER_ERROR).
                        json({ error: error });
                }
                if (!data) {
                    return res.
                        status(status.NOT_FOUND).
                        json({ error: "Not found" });
                }
                res.json({ data: data });
            });
        };
    }));
    api.get('/:id', wagner_core_1.invoke((User) => {
        return (req, res) => {
            User.
                findOne({ _id: req.params.id }).
                exec((error, data) => {
                if (error) {
                    return res.
                        status(status.INTERNAL_SERVER_ERROR).
                        json({ error: error.toString() });
                }
                if (!data) {
                    return res.
                        status(status.NOT_FOUND).
                        json({ error: "Not found" });
                }
                res.json({ data: data });
            });
        };
    }));
    api.get('/pages/:page', wagner_core_1.invoke((User) => {
        return (req, res) => {
            User.
                paginate({}, { page: req.params.page, limit: 3 }, (error, data) => {
                if (error) {
                    return res.
                        status(status.INTERNAL_SERVER_ERROR).
                        json({ error: error });
                }
                if (!data) {
                    return res.
                        status(status.NOT_FOUND).
                        json({ error: "Not found" });
                }
                res.json({ data: data });
            });
        };
    }));
    return api;
};
/**
 * Sample response
 */
// {
//     "page": "2",
//     "per_page": 3,
//     "total": 12,
//     "total_pages": 4,
//     "data": [
//         {
//             "id": 4,
//             "first_name": "eve",
//             "last_name": "holt",
//             "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
//         },
//         {
//             "id": 5,
//             "first_name": "gob",
//             "last_name": "bluth",
//             "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
//         },
//         {
//             "id": 6,
//             "first_name": "tracey",
//             "last_name": "bluth",
//             "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
//         }
//     ]
// }
