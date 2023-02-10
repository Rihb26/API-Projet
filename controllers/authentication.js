/*const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        res.send({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(400).send({ error: 'Impossible de créer un utilisateur' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Utilisateur non trouvé' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Mot de passe incorrect' });
        }
        res.send({ message: 'Utilisateur connecté avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur de connexion' });
    }
});

module.exports = router;*/
/*const User = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).send("Utilisateur introuvable");
    user.comparePassword(password).then((isMatch) => {
      if (!isMatch) return res.status(400).send("Mot de passe incorrect");
      // Connecter l'utilisateur et envoyer une réponse
    });
  });
};*/

const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'Email ou mot de passe incorrect');
            return res.redirect('/login');
        }
        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            req.flash('error', 'Email ou mot de passe incorrect');
            return res.redirect('/login');
        }
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

module.exports = router;

