const db = require("../models");
const Message = db.message;
const User = db.user;

exports.create = (req, res) => {
    console.log(req);
    Message.create({
        userId: req.body.id_user,
        msg: req.body.msg,
        /*         media: req.body.media,
         */
    })
        .then(succes => {
            console.log(succes);
            res.status(200).send({ succes: 'insertion' });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
            res.status(501).send({ error: 'erreur' });
        });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Message.findAll(
        {
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [
                {
                    model: User,
                    required: true
                }
            ]
        }
    )
        .then(

            messages => {
                console.log("#########", messages);
                res.status(200).json(messages);
            }
        )
        .catch(error => {
            console.log("@@@", error);
            res.status(400).json({ error });
        });
};

exports.findOne = (req, res) => {
    Message.findOne({ where: { id: req.params.id } })
        .then(
            (message) => {
                console.log(message);
                res.status(200).json(message);
            }
        ).catch(error => res.status(500).json({ error }));

};

exports.update = (req, res) => {

};
exports.signal = (req, res) => {
    console.log(req.params.id);
    Message.update({ likes: req.body.likes },
        { returning: true, where: { id: req.params.id } }
    )
        .then(
            (message) => {
                console.log(message);
                res.status(200).json(message);
            }
        ).catch(error => res.status(500).json({ error }));

};

exports.findPseudo = (req, res) => {
    User.findOne({ where: { id: req.body.id } })
        .then(
            (message) => {
                console.log(message.pseudo);
                res.status(200).json(message.pseudo);
            }
        ).catch(error => res.status(500).json({ error }));

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Message.destroy({ where: { id: req.params.id } }).then(
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

