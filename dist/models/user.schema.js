"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paginate = require("mongoose-paginate");
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        match: /.+@.+\..+/,
        lowercase: true,
        trim: true,
        unique: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    middleName: {
        type: String,
        default: '',
        trim: true
    },
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
}).pre('save', (next) => {
    if (this._doc) {
        let doc = this._doc;
        let now = new Date;
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
}).plugin(paginate);
