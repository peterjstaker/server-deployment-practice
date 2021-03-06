'use strict';

const supertest = require('supertest');
const server = require('../server.js');
const request = supertest(server.app); // supertest takes in our server application, which includes our routes, middleware and error handling

// test suite
describe('SERVER TESTS:', () => {

    // "it" is an individual test
    // it('should handle not found routes - 404', async () => {
        //expect -> this is an assertion, as part of a test
        // var response = await request.get('/not-there');
        // expect(response.status).toEqual(404);
        
        // test output of routes
        // test shape of data
        // test status code of response
    // });
    // or test('')

    // and another test
    // it('should send a proper response', async () => {
    //     var response = await request.get('/data');
    //     expect(response.status).toEqual(200);
    //     expect(response.body.time).toBeDefined();
    // });


    it('handles invalid requests', async () => {
        const response = await request.get('/foo');
        expect(response.status).toEqual(404);
      })
    
      it('handles errors', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(500);
        expect(response.body.route).toEqual('/bad');
      })
    
      it('/ works', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello World');
      })
    
      it('/data works', async () => {
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
      })
    
      it('stamper middleware works', async () => {
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(response.body.time).toBeDefined();
      })
      
});