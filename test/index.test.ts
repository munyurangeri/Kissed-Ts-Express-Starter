import * as mocha from 'mocha';
import * as chai from 'chai';
import * as superagent from "superagent";
import * as http from 'http';
import { config } from "dotenv";

import * as server from "../src/server";

config();

const dbUrl = process.env.TEST_DB;

const xs = http.createServer(server.server(dbUrl));

const expect = chai.expect;

describe('baseRoute', () => {

    before(() => {
        xs.listen(3000);
        // xs.on('error', () => {console.log("So bad! Something went wrong.")});
        // xs.on('listening',  () => {console.log("Cool! we are on 3000 port!")});
       
    });

    after(() => {

        xs.close();
    });

    it('should have a message prop', (done) => {
        superagent.get('http://localhost:3000/api/v1/', (error, res) =>{
            
            expect(res.status).to.eql(200);
            
            let result: any;
            result = JSON.parse(res.text);

            expect(result.data.description).to.eql('Hola, Mondo! Xenia API v1!');

            done();
        })
    });

});