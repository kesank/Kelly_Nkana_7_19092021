const db = require("../models");
const Comment = db.comments;
const Message = db.message;
const User = db.user;

exports.create = (req, res) => {
    console.log(req.body);
    Comment.create({
        messageId: req.body.id_message,
        userId: req.body.id_user,
        post: req.body.post,
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
    Comment.findAll(
        {
            where: { messageId: req.params.id }
        }
    )
        .then(

            comments => {
                console.log("#########", comments);
                res.status(200).json(comments);
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

