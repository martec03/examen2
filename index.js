const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario');
require('dotenv').config();
//importar rutas
const authRutas = require('./routes/authRutas');
const agendasRutas = require('./routes/agendaRutas');
//configuraciones
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;
//configurar express para JSON
app.use(express.json());
//conexion con la db
mongoose.connect(MONGODB_URI)
    .then(() => {
                console.log('conexion con MONGODB exitosa');
                app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });
            })
    .catch( error => console.log("Error de conexion con MongoDB", error));


const autenticar =  async (req, res, next) =>{
        try {
            const token = req.headers.authorization?.split(' ')[1];
            console.log(token);
            if  (!token) {
                res.status(401).json({mensaje: 'No existe el token de autenticacion'});
            }
            const decodificar = jwt.verify(token,'clave_secreta_servidor');
            req.usuario = await Usuario.findById(decodificar.userId);
            next();
        }
        catch (error) {
            res.status(404).json({mensaje: error.message});
        }
    };


app.use('/auth', authRutas);
app.use('/agenda',autenticar,agendasRutas)
