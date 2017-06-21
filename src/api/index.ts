import {Request, Response, Router, NextFunction} from "express";

/**
 * GET /
 * API Desecription.
 */

export const index = function(){

    let api:Router = Router();    
    api.get('/', (req: Request, res: Response) => {
        res.json({data: {
            description:"Hola, Mondo! Xenia API v1!"
        }})
    });

    return api;    
};