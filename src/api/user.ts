import {Request, Response, Router, NextFunction} from "express";
import * as bodyParser from "body-parser"; 
import { Document, Error} from "mongoose";
import * as status from "http-status";
import { invoke } from "wagner-core";
import { IUserModel } from "../models/user.interface" 

// import  models from "../models/index"



/**
 * GET /
 * Users.
 */

export const user = function(){

    let api:Router = Router(); 
     
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));

    api.get('', invoke((User: any) => {
        return (req: Request, res: Response) => {
            User.
                paginate({}, {}, (error: Error, data: Document) => {
                    if (error){
                        return res.
                            status(status.INTERNAL_SERVER_ERROR).
                            json({error: error});
                    }

                    if (!data){
                        return res.
                            status(status.NOT_FOUND).
                            json({error: "Not found"});
                    }

                    res.json({data: data});
                })
        }        
    }));

    api.get('/:id', invoke((User: any) => {
        return (req: Request, res: Response) => {
            User.
                findOne({_id: req.params.id}).
                exec((error: Error, data: Document) =>{
                    if (error){
                        return res.
                            status(status.INTERNAL_SERVER_ERROR).
                            json({error: error.toString()});
                    }

                    if (!data){
                        return res.
                            status(status.NOT_FOUND).
                            json({error: "Not found"});
                    }

                    res.json({data: data});

                })
        }        
    }));

    api.get('/pages/:page', invoke((User: any) => {
        return (req: Request, res: Response) => {
            User.
                paginate({}, {page: req.params.page, limit:3}, (error: Error, data: Document) => {
                    if (error){
                        return res.
                            status(status.INTERNAL_SERVER_ERROR).
                            json({error: error});
                    }

                    if (!data){
                        return res.
                            status(status.NOT_FOUND).
                            json({error: "Not found"});
                    }

                    res.json({data: data});
                })
        }        
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


