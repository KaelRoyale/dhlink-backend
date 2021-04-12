const services = require('../models/service_schema')

getById = async (req, res) => {
    await services.findOne({ _id: req.params.id }, (err, serv) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!serv) {
            return res
                .status(404)
                .json({ success: false, error: `Service not found` })
        }
        return res.status(200).json({ success: true, data: serv })
    }).catch(err => console.log(err))
}

getAll = async (req, res) => {
    await services.find({}, (err, services) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!services.length) {
            return res
                .status(404)
                .json({ success: false, error: `Service not found` })
        }
        return res.status(200).json({ success: true, data: services })
    }).lean().catch(err => console.log(err))
}

createService = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const service = new Service(body)

    if (!service) {
        return res.status(400).json({ success: false, error: err })
    }

    service
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: service._id,
                message: 'Service created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Service not created!',
            })
        })
}

module.exports = {
  
    getAll,
    getById,
    createService
}