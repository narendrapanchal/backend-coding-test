'use strict';

const express = require('express');
const { queryAsync } = require("../helpers/commonHelpers");
const app = express();
const {logger} =require("../helpers/logger")
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {
    validationError,
    validateCoordinates,
    validateString,
  } = require("../helpers/validation")
module.exports = (db) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post("/rides", jsonParser, async (req, res) => {
        try {
          const startLatitude = Number(req.body.start_lat);
          const startLongitude = Number(req.body.start_long);
          const endLatitude = Number(req.body.end_lat);
          const endLongitude = Number(req.body.end_long);
          const riderName = req.body.rider_name;
          const driverName = req.body.driver_name;
          const driverVehicle = req.body.driver_vehicle;
          if (!validateCoordinates(startLatitude, startLongitude)) {
            return res.send(
              validationError(
                "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
              )
            );
          }
          if (!validateCoordinates(endLatitude, endLongitude)) {
            return res.send(
              validationError(
                "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
              )
            );
          }
    
          if (!validateString(riderName)) {
            return res.send(
              validationError("Rider name must be a non empty string")
            );
          }
    
          if (!validateString(driverName)) {
            return res.send(
              validationError("Driver name must be a non empty string")
            );
          }
    
          if (!validateString(driverVehicle)) {
            return res.send(
              validationError("DriverVehicle name must be a non empty string")
            );
          }
    
          var values = [
            req.body.start_lat,
            req.body.start_long,
            req.body.end_lat,
            req.body.end_long,
            req.body.rider_name,
            req.body.driver_name,
            req.body.driver_vehicle,
          ];
    
    const result = await queryAsync(db,
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
      );

      const rows = await queryAsync(db,
        "SELECT * FROM Rides WHERE rideID = ?",
        [result.lastID]
      );
      logger.log({level:"info",message:'Posted Ride at /rides'});
      
      res.send(rows);
    } catch (err) {
      res.status(500).send( validationError("","SERVER_ERROR"));
      logger.error('Error while posting the ride at /rides', new Error(err));      
    }
      });
      app.get("/rides", async (req, res) => {
        try {
          const page = +req.query.page || 1;
          const limit = +req.query.limit || 10;
          if (page < 1 || limit < 1) {
            return res.status(400).send({
              error_code: "BAD_REQUEST",
              message: "Invalid page or limit value",
            });
          }
          const offset = (page - 1) * limit;
          const query = `SELECT * FROM Rides LIMIT ? OFFSET ?`;
          const rows = await queryAsync(db,query,[limit,offset]);
          if (rows.length === 0) {
            return res.send({
              error_code: "RIDES_NOT_FOUND_ERROR",
              message: "Could not find any rides",
            });
          }
          res.send(rows);
          logger.log({level:"info",message:'Return list of rides at /rides'});
        } catch (err) {
          res.status(500).send( validationError("","SERVER_ERROR"));
          logger.error('Error while sending list of rides at /rides', err);
        }
      });

    app.get('/rides/:id', async(req, res) => {
        try{ 
            const rows = await queryAsync(db,`SELECT * FROM Rides WHERE rideID = ?`,[req.params.id]);
              if (rows.length === 0) {
                return res.send({
                  error_code: "RIDES_NOT_FOUND_ERROR",
                  message: "Could not find any rides",
                });
              }
              res.send(rows);
              logger.log({level:"info",message:'Return list of rides at /rides'});
            }catch(err){
              console.error(err);
              res.status(500).send( validationError("","SERVER_ERROR"));
              logger.error(`Error while sending list of rides at /rides/${req.params.id}`, err);

        
            }
    });

    return app;
};
