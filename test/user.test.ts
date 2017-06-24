import * as mocha from "mocha";
import * as chai from "chai";
import * as superagent from "superagent";
import * as http from "http";
import * as status from "http-status"
import { config } from "dotenv";
import { invoke } from "wagner-core";

import * as server from "../src/server";

config();

const dbUrl = process.env.TEST_DB;
const baseUrl = process.env.BASE_URL;
const recordId = '000000000000000000000001';

const xs = http.createServer(server.server(dbUrl));

const expect = chai.expect;
const assert = chai.assert;

describe('GET api/v1/users', () => {

    before(() => {
        xs.listen(3000);
        // xs.on('error', () => {console.log("So bad! Something went wrong.")});
        // xs.on('listening',  () => {console.log("Cool! we are on 3000 port!")});
       
    });

    after(() => {
        xs.close();
    });

    beforeEach((done) => {
        let users = [
            {
                "_id": '000000000000000000000001',
                "email":"eve.holt@domain.com",
                "first_name": "eve",
                "last_name": "holt",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
            },
            {
                // "_id": '000000000000000000000002',
                "email":"gob.bluth@domain.com",
                "first_name": "gob",
                "last_name": "bluth",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
            },
            {
                // "_id": '000000000000000000000003',
                "email":"tracey.bluth@domain.com",
                "first_name": "tracey",
                "last_name": "bluth",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
            },
            {   
                // "_id":'000000000000000000000004',
                "email":"george.bluth@domain.com",
                "first_name":"george",
                    "last_name":"bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},
            {   
                // "_id":'000000000000000000000005',
                "email":"lucille.bluth@domain.com",
                "first_name":"lucille",
                "last_name":"bluth",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},
            {   
                "_id":'000000000000000000000006',
                "email":"oscar.bluth@domain.com",
                "first_name":"oscar",
                "last_name":"bluth",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
            },
            {   
                // "_id":'000000000000000000000007',
                "email":"michael.bluth@domain.com",
                "first_name":"michael",
                "last_name":"bluth",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
            },
            {
                // "_id":'000000000000000000000008',
                "email":"lindsay.bluth@domain.com",
                "first_name":"lindsay",
                "last_name":"bluth",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
            },
            {
                // "_id":'000000000000000000000009',
                "email":"tobias.funke@domain.com",
                "first_name":"tobias",
                "last_name":"funke",
                "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"}
        ]

        invoke((User: any) => {
            User.create(users, function(error: any) {
                assert.ifError(error);
                done();                
            });
        });
    });

    afterEach((done) => {
        invoke((User: any) => {
            User.remove({}, function(error: any) {
                assert.ifError(error);
                done();                
            });
        });
    });
    it('should find users ', (done) => {
        let url = baseUrl + '/api/v1/users';
        superagent.get(url, (error, res) =>{

            console.dir(res.body);
            console.dir(res.body.data.docs[1]);

            expect(res.status).to.eql(status.OK);
            expect(res.body.data.docs).to.be.a('array');
            expect(res.body.data.docs).to.have.length(9);
            assert.ifError(error);

            done();
        })
    });

    it('should find a user ', (done) => {
        let url = baseUrl + '/api/v1/users/'+recordId;
        superagent.get(url, (error, res) =>{

            let result: any;
            result = JSON.parse(res.text);
            console.log(result);

            assert.ifError(error);            
            expect(res.status).to.eql(status.OK);
            expect(result.data._id).to.eql(recordId);

            done();
        })
    });

    it('should find users and return only first page ', (done) => {
        let url = baseUrl + '/api/v1/users/pages/1';
        superagent.get(url, (error, res) =>{

            console.dir(res.body);
            console.dir(res.body.data.docs[1]);

            expect(res.status).to.eql(status.OK);
            expect(res.body.data.docs).to.be.a('array');
            expect(res.body.data.docs).to.have.length(3);
            assert.ifError(error);

            done();
        })
    });

});