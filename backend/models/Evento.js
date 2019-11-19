/**
 * Eventos
 */
module.exports = (sequelize, DataTypes) => {
    var evento = sequelize.define(
        "evento",
        {
            description: DataTypes.STRING(500)
        },
        {
            modelName: evento,
            timestamps: false
        }
    );

    return evento;
};
