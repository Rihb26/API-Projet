const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/missions
    axios.get('http://localhost:3000/api/missions')
        .then(function (response) {
            res.render('index', { missions: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_mission = (req, res) => {
    res.render('add_mission');
}

exports.update_mission = (req, res) => {
    axios.get('http://localhost:3000/api/missions', { params: { id: req.query.id } })
        .then(function (missiondata) {
            res.render("update_mission", { mission: missiondata.data })
        })
        .catch(err => {
            res.send(err);
        })
}