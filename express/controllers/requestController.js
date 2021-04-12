const requests = require('../models/request_schema')

getById = async (req, res) => {
    await requests.findOne({ _id: req.params.id }, (err, re) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!re) {
            return res
                .status(404)
                .json({ success: false, error: `Service not found` })
        }
        return res.status(200).json({ success: true, data: re })
    }).catch(err => console.log(err))
}

getAllRequests = async (req, res) => {
    await requests.find({}, (err, services) => {
     
        console.log("Get All User Requests");
     
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!requests.length) {
            return res
                .status(404)
                .json({ success: false, error: `Service not found` })
        }
        return res.status(200).json({ success: true, data: services })
    }).lean().catch(err => console.log(err))
}
createRequest = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const request = new Request(body)

    if (!request) {
        return res.status(400).json({ success: false, error: err })
    }

    request
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: request._id,
                message: 'Request created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Request not created!',
            })
        })
}

module.exports = {
  
    getAllRequests,
    getById,
    createRequest
}