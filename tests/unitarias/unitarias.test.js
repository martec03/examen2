const express = require('express');
const request = require('supertest');
const agendaRutas = require('../../routes/agendaRutas');
const AgendaModel = require('../../models/Agenda');
const mongoose = require ('mongoose');

const app = express();
//configurar express para JSON
app.use(express.json());
app.use('/agenda', agendaRutas);
// describe(name, fn)
describe('Pruebas unitarias para las rutas de agenda', ()=>{
    beforeEach(async ()  => {
        // conectar antes de hacer pruebas
        await mongoose.connect('mongodb://127.0.0.1:27017/dbagenda');
       // await AgendaModel.deleteMany({});   
    });
    afterAll(() => {
        // despues de terminar las pruebas cerra la db
        return mongoose.connection.close();
    });
   /*  // 1. traer toda agenda
    test('Deberia devolver toda la lista de agenda al hace un GET a /agenda', async () => {
        const res = await request(app).get('/agenda');
        //validar las respuestas 
        expect(res.statusCode).toEqual(200); ///pasoooo
       
    });
    // 2. Agregar tarea
    test('Deberia agregar una nueva agenda', async () => {
        const nuevaAgenda ={
        evento: "ASISTENCIA AL ANIVERSARIO MI LLAJTA",
        lugar: "MINA SAN RAFAEL",
        estado: "CANCELADO",
        distrito: "TAPACARI",
        costo_apostilla: 1000
        }
        const res = await request(app)
            .post('/agenda/agregar')
            .send(nuevaAgenda);
        
        expect(res.statusCode).toEqual(201); ///pasooo
        expect(res.body.evento).toEqual(nuevaAgenda.evento); ///pasoooo
        expect(res.body.lugar).toEqual(nuevaAgenda.lugar); ///pasoooo
        expect(res.body.estado).toEqual(nuevaAgenda.estado); ///pasoooo
        expect(res.body.distrito).toEqual(nuevaAgenda.distrito); ///pasoooo
        expect(res.body.costo_apostilla).toEqual(nuevaAgenda.costo_apostilla); ///pasoooo
    });
  

    
    // 3. Editar tarea
    test('Prueba unitaria para editar Agenda ', async () => {
        const AgendaEncontrada = await AgendaModel.find({ _id: '661e9fe6b391041cd110ebb6' });
         console.log(AgendaEncontrada);
       
            //POSTMAN
        const agendaeditada = { 
            estado: "NO IDENTIFICADO",
            costo_apostilla: 800,
            distrito: "SIN NOMBRE",        
        };
        console.log("agenda editada",agendaeditada);
     
        const res = await request(app)
            .put(`/agenda/editar/661e9fe6b391041cd110ebb6`)
            .send(agendaeditada);
        expect(res.statusCode).toEqual(201); 
        expect(res.body.estado).toEqual(agendaeditada.estado); 
        expect(res.body.distrito).toEqual(agendaeditada.distrito); 
    });

    // 3. Elimnar agenda
    test('Eliminar  Agenda prueba unitaria', async () => {
        
        const res = await request(app)
            .delete(`/agenda/eliminar/661e9c6fb1a8569253a40f58`);
        expect(res.statusCode).toEqual(200); 
        expect(res.body).toEqual({mensaje: 'Registro de Agenda eliminada correctamente'}); 
    });  */

    /*==================================================================================== 
                PRUEBAS UNITARIAS DE LAS CONSULTAS
    /*==================================================================================== */
    
     // 1. consulta por estados
     test('PRUEBA UNITARIA de Consulta por campo estado', async () => {
        
        const res = await request(app)
            .get(`/agenda/por_estados/REGISTRADOS`);
       
    }); 

    // 2. consulta por estado y usuario
    test('PRUEBA UNITARIA de Consulta por campo estado y usuario', async () => {
        
        const res = await request(app)
            .get(`/agenda/estado_usuario/REGISTRADOS/Martha`);
       
    }); 

    // 3. consulta por campo distrito
    test('PRUEBA UNITARIA de Consulta por campo distrito', async () => {
        
        const res = await request(app)
            .get(`/agenda/por_distrito/LEQUE`);
       
    }); 

    // 4. consulta por campo COSTO
    test('PRUEBA UNITARIA de Consulta por COSTOS POSTILLAJES', async () => {
        
        const res = await request(app)
            .get(`/agenda/por_costo/80`);
       
    }); 

    // 5. consultas ordernar usando aggregate y sort
    test('PRUEBA UNITARIA de Consulta Utilizando AGGREGATE y SORT', async () => {
        
        const res = await request(app)
            .get(`/agenda/operaciones/`);
       
    }); 

    // 6. consultas agrupar distrito y totalizar los costos
    test('PRUEBA UNITARIA de Consulta que agrupa por distrito y totalizacion de costo', async () => {
        
        const res = await request(app)
            .get(`/agenda/agrupar/`);
       
    }); 

    

});