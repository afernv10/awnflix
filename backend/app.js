const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/config.js");

const app = express();

var sequelize = connection.sequelize;
var Sequelize = connection.Sequelize;
var User = connection.user;
var Terminada = connection.terminada;
var Favorita = connection.favorita;
var Viendo = connection.viendo;
var Evento = connection.evento;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Petición localhost:port/
 */
app.get("/", function(req, res) {
    res.send("hello World - Práctica final - raíz");
});

/**
 * Petición para registro de usuario
 */
app.post("/signup", function(req, res) {
    console.log("Petición para registro: " + req.body);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            let jsonUserData = {
                success: true,
                userData: JSON.stringify(user)
            };
            res.send(jsonUserData);
        })
        .catch(error => {
            let jsonErrorCatch = {
                success: false,
                msg: "No se ha realizado el registro",
                error: JSON.stringify(error)
            };
            res.send(jsonErrorCatch);
        });
});

/**
 * Petición de login usuario
 */
app.get("/login", function(req, res) {
    console.log(
        "Petición para login: " + req.query.username + ", " + req.query.password
    );
    // obtenemos los valores de los params de axios
    var username = req.query.username,
        password = req.query.password;
    var msg = "El usuario/contraseña introducido no es correcto.";

    User.findOne({ where: { username: username } })
        .then(function(user) {
            // comprobamos si la contraseña del usuario buscado en db == a introducida
            if (user.password == password) {
                let jsonUser = {
                    success: true,
                    username: username
                };
                res.send(jsonUser);
            } else {
                let jsonError = {
                    success: false,
                    msg: msg
                };
                res.send(jsonError);
            }
        })
        .catch(error => {
            console.log("error");
            let jsonErrorCatch = {
                msg: msg,
                error: JSON.stringify(error)
            };
            res.send(jsonErrorCatch);
        });
});

/**
 * Obtiene la lista de la bbdd según el tipo y usuario
 */
app.get("/listas", function(req, res) {
    // obtenemos los valores de los params de axios
    var username = req.query.username;
    var tipoLista = req.query.tipoLista;
    console.log("Petición para lista: " + username + ", " + tipoLista);

    if (tipoLista == "favoritas") {
        Favorita.findAll({ where: { userUsername: username } })
            .then(function(favoritas) {
                console.log("Get Favo: " + favoritas);
                let json = {
                    empty: false,
                    media: favoritas
                };
                if (favoritas.length == 0) {
                    json.empty = true;
                }
                res.send(json);
            })
            .catch(error => {
                console.log("Error");
                res.send(error);
            });
    } else if (tipoLista == "terminadas") {
        Terminada.findAll({ where: { userUsername: username } })
            .then(function(terminadas) {
                console.log("Get Terminadas: " + terminadas);
                let json = {
                    empty: false,
                    media: terminadas
                };
                if (terminadas.length == 0) {
                    json.empty = true;
                }
                res.send(json);
            })
            .catch(error => {
                console.log("Error");
                res.send(error);
            });
    } else if (tipoLista == "viendo") {
        Viendo.findAll({ where: { userUsername: username } })
            .then(function(viendo) {
                console.log("Get viendo: " + viendo);
                let json = {
                    empty: false,
                    media: viendo
                };
                if (viendo.length == 0) {
                    json.empty = true;
                }
                res.send(json);
            })
            .catch(error => {
                console.log("Error");
                res.send(error);
            });
    }
});

/**
 * Petición de borrado de una entrada de lista
 */
app.delete("/delete", function(req, res) {
    var tipoLista = req.query.tipoLista;
    const numFilas = req.query.data.length;

    var dataStringArray = req.query.data;
    // conseguimos los ids de las filas a borrar
    var arrayIds = [];
    for (let i = 0; i < numFilas; i++) {
        var id = JSON.parse(dataStringArray[i]).id; //  turns a string of JSON text into a JavaScript object
        arrayIds.push(id);
    }

    if (tipoLista == "terminadas") {
        Terminada.destroy({
            where: {
                id: arrayIds
            }
        })
            .then(function() {
                console.log("terminada deleted!");
                var json = {
                    success: true
                };
                res.send(json);
            })
            .catch(function(error) {
                res.send({ success: false, content: error });
            });
    } else if (tipoLista == "viendo") {
        Viendo.destroy({
            where: {
                id: arrayIds
            }
        })
            .then(function() {
                console.log("viendo deleted!");
                var json = {
                    success: true
                };
                res.send(json);
            })
            .catch(function(error) {
                res.send({ success: false, content: error });
            });
    } else {
        Favorita.destroy({
            where: {
                id: arrayIds
            }
        })
            .then(function() {
                console.log("favorita deleted!");
                var json = {
                    success: true
                };
                res.send(json);
            })
            .catch(function(error) {
                res.send({ success: false, content: error });
            });
    }
});

/**
 * Petición para buscar si existe una entrada en una lista
 */
app.get("/existeEntrada", function(req, res) {
    var tipoLista = req.query.tipoLista;
    var username = req.query.username;
    var titulo = req.query.titulo;

    if (tipoLista == "favoritas") {
        Favorita.findOne({
            where: {
                userUsername: username,
                titulo: titulo
            }
        })
            .then(function(favorita) {
                let json = {
                    existe: true
                };

                if (favorita == null) {
                    //si retorna null es que en la base de datos la tabla correspondiente esta vacia y por ello hay que controlarlo
                    json.existe = false;
                }
                res.send(json);
            })
            .catch(function() {
                let json = {
                    existe: false
                };
                res.send(json);
            });
    } else if (tipoLista == "terminadas") {
        Terminada.findOne({
            where: {
                userUsername: username,
                titulo: titulo
            }
        })
            .then(function(terminada) {
                let json = {
                    existe: true,
                    listaCheck: "viendo" // Para tratar en Promise
                };

                if (terminada == null) {
                    //si retorna null es que en la base de datos la tabla correspondiente esta vacia y por ello hay que controlarlo
                    json.existe = false;
                }
                res.send(json);
            })
            .catch(function() {
                let json = {
                    existe: false
                };
                res.send(json);
            });
    } else if (tipoLista == "viendo") {
        Viendo.findOne({
            where: {
                userUsername: username,
                titulo: titulo
            }
        })
            .then(function(viendo) {
                let json = {
                    existe: true,
                    listaCheck: "terminadas" // Para tratar en Promise
                };

                if (viendo == null) {
                    //si retorna null es que en la base de datos la tabla correspondiente esta vacia y por ello hay que controlarlo
                    json.existe = false;
                }
                res.send(json);
            })
            .catch(function() {
                let json = {
                    existe: false
                };
                res.send(json);
            });
    }
});

/**
 * Añadir a listas
 */
app.post("/listas", function(req, res) {
    console.log("Petición POST a '/listas'");

    if (req.body.tipoLista == "favoritas") {
        Favorita.create({
            titulo: req.body.titulo,
            tipo: req.body.tipo,
            year: req.body.year,
            poster: req.body.poster,
            userUsername: req.body.username
        })
            .then(function(favoritas) {
                console.log("Favorita insertada.");
                let json = {
                    success: true,
                    media: favoritas
                };
                res.send(json);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    } else if (req.body.tipoLista == "terminadas") {
        Terminada.create({
            titulo: req.body.titulo,
            tipo: req.body.tipo,
            year: req.body.year,
            poster: req.body.poster,
            userUsername: req.body.username
        })
            .then(function(terminada) {
                console.log("Terminada insertada.");
                let json = {
                    success: true,
                    media: terminada
                };
                res.send(json);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    } else {
        Viendo.create({
            titulo: req.body.titulo,
            tipo: req.body.tipo,
            year: req.body.year,
            poster: req.body.poster,
            userUsername: req.body.username
        })
            .then(function(viendo) {
                console.log("Viendo insertada.");
                let json = {
                    success: true,
                    media: viendo
                };
                //console.log(viendo);
                res.send(json);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    }
});

/**
 * Actualiza el valor de Rating en Terminadas
 */
app.post("/updateRating", function(req, res) {
    var username = req.body.username;
    var titleUpdate = req.body.titulo;
    var newRating = req.body.newRating;

    Terminada.update(
        { rating: newRating },
        { where: { userUsername: username, titulo: titleUpdate } }
    )
        .then(function([rowsUpdate, [updatedItem]]) {
            console.log(updatedItem);
            res.send(JSON.stringify(updatedItem));
        })
        .catch(function(error) {
            res.send(error);
        });
});

/**
 * Petición para obtener los eventos/notas almacenados en bbdd
 */
app.get("/getEventos", function(req, res) {
    var username = req.query.username;
    Evento.findAll({
        where: {
            userUsername: username
        }
    })
        .then(function(eventos) {
            console.log("eventos --> ", eventos);
            let json = {
                existe: true,
                eventos: eventos
            };
            if (eventos == null) {
                json.existe = false;
            }
            res.send(json);
        })
        .catch(function() {
            let json = {
                existe: false
            };
            res.send(json);
        });
});

/**
 * Petición POST para agregar evento en bbdd
 */
app.post("/postEvento", function(req, res) {
    var description = req.body.description;
    var username = req.body.username;

    Evento.create({
        description: description,
        userUsername: username
    })
        .then(function(desc) {
            console.log("Descripcion insertada: " + desc);
            let json = {
                success: true
            };
            res.send(json);
        })
        .catch(function(error) {
            console.log(error);
            res.send(error);
        });
});

app.listen(3000, function() {
    console.log("PracticaFinal app listening on port 3000!");
});
