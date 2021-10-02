const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;
const Message = db.message;
const Comment = db.comments;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    /* console.log(req); */
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                pseudo: req.body.pseudo,
                role: req.body.role,
                password: hash,

            })
                .then(succes => {
                    /* console.log(succes); */
                    res.status(200).send({ succes: 'insertion' });
                })
                .catch((err) => {
                    if (err) {
                        /*  console.log(err); */
                    }
                    res.status(501).send({ error: 'erreur' });
                });
        })
        .catch(error => res.status(500).json({ error }));



};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    User.findAll()
        .then(

            users => {
                /* console.log(users); */
                res.status(200).json(users);

            }
        )
        .catch(error => res.status(400).json({ error }));
};

// Find a single Tutorial with an id
exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                console.log(1);
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log(valid);
                    if (!valid) {
                        console.log(2);
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const id_token = {
                        userId: user.id,
                        role: user.role,
                        token: jwt.sign(
                            { userId: user.id },
                            'azerty24587',/* Fichier env à créer */
                            { expiresIn: '24h' }
                        )

                    };

                    console.log(3);
                    res.status(200).json(id_token);
                })
                .catch(error => {
                    console.log(4);
                    res.status(500).json({ error });
                });
        })
        .catch(error => {
            console.log(5);
            res.status(500).json({ error });
        });
};

exports.findOne = (req, res) => {
    User.findOne({ where: { id: req.params.id } })
        .then(
            (user) => {
                console.log(user);
                res.status(200).json(user);
            }
        ).catch(error => res.status(500).json({ error }));

};

exports.update = (req, res) => {
    User.update({
        pseudo: req.body.pseudo,
        email: req.body.email
    },
        { returning: true, where: { id: req.body.id } }
    )
        .then(
            (message) => {
                console.log(message);
                res.status(200).json(message);
            }
        ).catch(error => res.status(500).json({ error }));
};
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(
        () => {

            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

