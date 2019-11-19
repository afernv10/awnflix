const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const FavoritaModel = require("../models/Favorita");
const ViendoModel = require("../models/Viendo");
const TerminadaModel = require("../models/Terminada");
const EventoModel = require("../models/Evento");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("awnflix", "awuser", "awpass", {
    // awuser - awpass
    host: "10.30.8.144", // CAMBIAR AQUÍ LA IP DEL SERVIDOR
    dialect: "mysql"
});

const User = UserModel(sequelize, Sequelize);
const Favorita = FavoritaModel(sequelize, Sequelize);
const Viendo = ViendoModel(sequelize, Sequelize);
const Terminada = TerminadaModel(sequelize, Sequelize);
const Evento = EventoModel(sequelize, Sequelize);

// Definimos las relaciones entre tablas
User.hasMany(Favorita);
User.hasMany(Viendo);
User.hasMany(Terminada);
User.hasMany(Evento);

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User;
db.favorita = Favorita;
db.viendo = Viendo;
db.terminada = Terminada;
db.evento = Evento;

// create all the defined tables in the specified database.
sequelize
    .sync()
    .then(() =>
        console.log(
            "tables have been successfully created, if one doesn't exist"
        )
    )
    .catch(error => console.log("This error occured: ", error));

module.exports = db;

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
