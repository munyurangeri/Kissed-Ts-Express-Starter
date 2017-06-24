import * as _ from "lodash";
import * as mongoose from "mongoose";
// import 
import { factory } from "wagner-core";

import { userSchema } from "./user.schema";
import { IUserModel } from "./user.interface";

export let models = function (dbUrl: string): any {
    
    mongoose.connect(dbUrl);

    let User = mongoose.model<IUserModel>('User', userSchema, 'Users');

    let models = {
        User: User
    };
    _.each(models, (value, key) => {
        factory(key, () => {
            return value;
        });
    });

    return models;
}

