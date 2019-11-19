/**
 * Favoritas
 */
module.exports = (sequelize, DataTypes) => {
    var favorita = sequelize.define(
        "favorita",
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
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 5.0
            }
        },
        {
            modelName: favorita,
            timestamps: false
        }
    );

    return favorita;
};
