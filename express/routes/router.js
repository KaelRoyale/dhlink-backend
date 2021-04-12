
const express = require('express')

const ServiceController = require('../controllers/serviceController')
const RequestController = require('../controllers/requestController')
const router = express.Router()


router.get('/service/:id', ServiceController.getById)
router.get('/services', ServiceController.getAll)
router.get('/requests', RequestController.getAllRequests)
module.exports = router