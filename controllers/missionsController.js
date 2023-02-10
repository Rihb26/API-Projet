const Missiondb = require('../models/missionsModel');


/**
 * Création et sauevgarde d'une mission
 */

exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty' })
        return;
    }

    //New mission

    const mission = new Missiondb({
        montant: req.body.montant,
        description: req.body.description,
        titre: req.body.titre,
        statut: req.body.statut,
        metier: req.body.metier,
        competence: req.body.competence
    })

    mission
        .save(mission)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating a create operation'
            })
        })
}

//retrieve and return all mesions / retrive and return a single mession

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Missiondb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: ' Note found mession with id' + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Erro retrieving mission with id' + id })
            })
    } else {
        Missiondb.find()
            .then(mission => {
                res.send(mission)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error Occurred while retriving mission informations' })
            })
    }
}

/**
 *  Update a new idetified mission by mission id
 */

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'Data to update can not be empty' })
    }

    const id = req.params.id;
    Missiondb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update mission with ${id}. Maybe mission not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update mission information" })
        })
}
/**
 * Delete a mission with specified mission id in the request
 */

exports.delete = (req, res) => {
    const id = req.params.id

    Missiondb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: 'Mission was deleted successfully!'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Mission with id=" + id
            })
        })
}