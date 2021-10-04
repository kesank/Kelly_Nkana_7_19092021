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
            where: { messageId: req.params.id },
            order: [
                ['updatedAt', 'DESC']
            ],

            include: [
                {
                    model: User,
                },
            ],

        },

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
exports.getSignal = (req, res) => {
    Comment.findAll(
        {
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [
                {
                    model: User,
                    required: true
                }
            ],
            where: {
                likes: 1
            }

        },


    )
        .then(

            comments => {
                res.status(200).json(comments);
            }
        )
        .catch(error => {
            res.status(400).json({ error });
        });
};

exports.signal = (req, res) => {
    console.log(req.params.id);
    Comment.update({ likes: req.body.likes },
        { returning: true, where: { id: req.params.id } }
    )
        .then(
            (comment) => {
                console.log(comment);
                res.status(200).json(comment);
            }
        ).catch(error => res.status(500).json({ error }));

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {
    Comment.destroy({ where: { id: req.params.id } }).then(
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

