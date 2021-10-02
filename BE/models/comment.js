module.exports = (sequelize, Sequelize) => {
    const comments = sequelize.define("comments", {

        post: {
            type: Sequelize.STRING
        },
        likes: { type: Sequelize.INTEGER, defaultValue: 0 },


    }
    );

    return comments;
};