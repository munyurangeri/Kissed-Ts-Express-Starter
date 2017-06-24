"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const mongoose = require("mongoose");
// import 
const wagner_core_1 = require("wagner-core");
const user_schema_1 = require("./user.schema");
exports.models = function (dbUrl) {
    mongoose.connect(dbUrl);
    let User = mongoose.model('User', user_schema_1.userSchema, 'Users');
    let models = {
        User: User
    };
    _.each(models, (value, key) => {
        wagner_core_1.factory(key, () => {
            return value;
        });
    });
    return models;
};
