import { Document } from "mongoose";

export interface IUserModel extends Document {
    email: string;
    firstName: string;
    lastName: string;
    avata: string,
    createdAt: Date;
    modifiedAt: Date;

}