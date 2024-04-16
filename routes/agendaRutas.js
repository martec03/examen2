const express = require('express');
const rutas = express.Router();
const AgendaModel = require('../models/Agenda');

rutas.get('/', async (req, res) =>{
    try {
        const agendas = await AgendaModel.find();
        // console.log(tareas);
        res.json(agendas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaAgenda = new AgendaModel({
        fecha: req.body.fecha,
        evento: req.body.evento,
        lugar: req.body.lugar,
        hora:req.body.hora,
        personal_contacto: req.body.personal_contacto,
        telefono_contacto: req.body.telefono_contacto,
        estado: req.body.estado,
        usuario:req.body.usuario,
        costo_apostilla:req.body.costo_apostilla,
        distrito:req.body.distrito

    });
    try {
        const guardarAgenda = await nuevaAgenda.save();
        res.status(201).json(guardarAgenda);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarAgenda = await AgendaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarAgenda);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarAgenda = await AgendaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Registro de Agenda eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------------------
// - Listar agenda sengun el estado
rutas.get('/por_estados/:es', async (req, res) =>{
    try {
        console.log(req.params.es);
        const porestados = await AgendaModel.find({ estado: req.params.es});
        res.json(porestados);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// consulta estado y usuario
rutas.get('/estado_usuario/:est/:usu', async (req, res) =>{
    try {
       const est = req.params.est;
       const user = req.params.usu
        const findOne = await AgendaModel.find({estado:est, usuario:user},{evento:1,estado:1,usuario:1,_id:0});
        res.json(findOne);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


// - Consultar agenda de por distrito 
rutas.get('/por_distrito/:dis', async (req, res) =>{
    try {
       
        const pordistrito = await AgendaModel.find({ distrito:req.params.dis});
        res.json(pordistrito);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// consultas a traves d costo

rutas.get('/por_costo/:costo', async (req, res) =>{
    try {
        
        const pordistrito = await AgendaModel.find({costo_apostilla:{$gt:req.params.costo}});
        res.json(pordistrito);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// consultas ordernar usando aggregate y sort

rutas.get('/operaciones/', async (req, res) =>{
    try {
        
        const operacion = await AgendaModel.aggregate([{$sort:{costo_apostilla:1}}]);
        res.json(operacion);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


// consultas agrupar y sumar

rutas.get('/agrupar/', async (req, res) =>{
    try {
        
        const operacion = await AgendaModel.aggregate([{$group:{_id:"$distrito", Costo_total:{$sum:"$costo_apostilla"}}}]);
        res.json(operacion);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


// contar por distrito 
rutas.get('/contar_distrito/:dis', async (req, res) =>{
    try {
       
        const contar = await AgendaModel.count();
        res.json(contar);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});





// - Ordenar la agenda segun la fecha
rutas.get('/ordenar', async (req, res) =>{
    try {
        const AgendaAscendente = await AgendaModel.find().sort({evento:1});
        //db.getCollection('collection1').find({}).sort({name:1})
        res.json(AgendaAscendente);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

module.exports = rutas;
