const axiosUtils = require("axios");

const axios = axiosUtils.create({
  baseURL: "http://10.30.8.144:3000" // CAMBIAR AQUÍ IP DEL SERVIDOR
});

module.exports = axios;
