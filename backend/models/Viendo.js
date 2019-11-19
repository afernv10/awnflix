/**
 * Viendo
 */
module.exports = (sequelize, DataTypes) => {
    var viendo = sequelize.define(
        "viendo",
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            titulo: {
                allowNull: false,
                type: DataTypes.STRING
            },
            tipo: DataTypes.STRING(100),
            year: DataTypes.STRING(10),
            poster: DataTypes.STRING(300),
            rating: DataTypes.FLOAT
        },
        {
            modelName: viendo,
            timestamps: false
        }
    );

    return viendo;
};
