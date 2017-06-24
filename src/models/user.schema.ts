import { Schema } from "mongoose";
import * as paginate  from "mongoose-paginate"
import { IUserModel } from "./user.interface"

export let userSchema = new Schema({
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
    if (this._doc){
        let doc = <IUserModel>this._doc;
        let now = new Date;
        if (!doc.createdAt){
            doc.createdAt = now;
        }
        doc.modifiedAt = now;        
    }
    next();
    return this;
}).plugin(paginate);