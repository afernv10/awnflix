/**
 * Terminadas
 */
module.exports = (sequelize, DataTypes) => {
    var terminada = sequelize.define(
        "terminada",
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
                defaultValue: 0.0
            }
        },
        {
            modelName: terminada,
            timestamps: false
        }
    );

    return terminada;
};
