'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });
    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
    describe('GET /rides', () => {
        it('should return RIDES_NOT_FOUND_ERROR when no rides are found', (done) => {
            request(app)
              .get('/rides?page=999&limit=10')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                if (!res.body || !res.body.error_code || !res.body.message) {
                  return done(new Error('Invalid error response structure'));
                }
                if (res.body.error_code !== 'RIDES_NOT_FOUND_ERROR' || res.body.message !== 'Could not find any rides') {
                  return done(new Error('Unexpected error response'));
                }
                done();
              });
          });
      });
      describe('POST /rides', () => {
        it('should create a new ride and return the details', (done) => {
          const rideData = {
            start_lat: 37.7749,
            start_long: -122.4194,
            end_lat: 37.7749,
            end_long: -122.4194,
            rider_name: 'Narendra KP',
            driver_name: 'GTA City',
            driver_vehicle: 'Car',
          };
      
          request(app)
            .post('/rides')
            .send(rideData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
      
              if (!Array.isArray(res.body) || res.body.length === 0) {
                return done(new Error('Invalid response structure'));
              }      
              done();
            });
        });
      });
      describe('GET /rides', () => {
        it('should return RIDES_NOT_FOUND_ERROR when no rides are found', (done) => {
            request(app)
              .get('/rides?page=1&limit=10')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                if (!res.body || !res.body.length>0) {
                  return done(new Error('Invalid error response structure'));
                }
                done();
              });
          });
      });
      describe('GET /rides/:id', () => {
        it('should return ride details for a valid ride ID', (done) => {
          const validRideID = 1;       
          request(app)
            .get(`/rides/${validRideID}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
      
              if (!Array.isArray(res.body) || res.body.length === 0) {
                return done(new Error('Invalid response structure'));
              }
      
              done();
            });
        });
    });
});
