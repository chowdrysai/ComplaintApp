const mongoose = require('mongoose')
const dbconnect = require('../db')

//Call the db to connect the mongo db
dbconnect()

// Complaint Schema
const ComplaintSchema = mongoose.Schema({
    uuid: {
        type: String
    },
    flat_no: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    desc: {
        type: String
    },
    userUuid: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    assignedTo: {
        type: String
    }
});

const Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);

module.exports.registerComplaint = function (newComplaint, callback) {
    newComplaint.save(callback);
}

module.exports.getAllComplaints = async () => {
    const result = await Complaint.find();
    return result;
}

module.exports.getUserComplaints = function (userUuid, callback) {
    Complaint.find({ userUuid }, callback);
}

module.exports.updateComplaint = async (uuid, update) => {
    return Complaint.findOneAndUpdate({ uuid }, { $set: update }, { new: true, passRawResult: true });
}

module.exports.getEngineerComplaints = async (complaintUuid) => {
    return Complaint.find({ assignedTo: complaintUuid })
}