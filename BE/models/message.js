module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {

        msg: {
            type: Sequelize.STRING
        },


        media: {
            type: Sequelize.STRING
        },
        likes: { type: Sequelize.INTEGER, defaultValue: 0 },


    }
    );

    return Message;
};