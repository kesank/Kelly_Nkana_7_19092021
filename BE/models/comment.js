module.exports = (sequelize, Sequelize) => {
    const comments = sequelize.define("comments", {

        post: {
            type: Sequelize.STRING
        },


    }
    );

    return comments;
};