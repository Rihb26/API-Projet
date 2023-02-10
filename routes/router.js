const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controllers/missionsController')

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-mission', services.add_mission)


/**
 *  @description for update mission
 *  @method GET /update-mission
 */
route.get('/update-mission', services.update_mission)


// API
//route.post('/api/missions', controller.create);
//route.get('/api/missions', controller.find);
//route.put('/api/missions/:id', controller.update);
//route.delete('/api/missions/:id', controller.delete);


module.exports = route