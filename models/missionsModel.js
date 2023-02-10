const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date_debut: {
        type: Date,
        required: false
    },
    date_fin: {
        typse: Date,
        required: false
    },
    montant: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    titre: {
        type: String,
        required: false
    },
    statut: {
        type: String,
        required: false
    },
    metier: {
        type: String,
        required: false
    },
    competence: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Missiondb = mongoose.model('missiondb', schema);

module.exports = Missiondb;