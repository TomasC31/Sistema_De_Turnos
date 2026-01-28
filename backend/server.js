const express = require('express'); //Importo express, sirve para crear el servidor
const app = express(); //Inicializo express, ahora app tiene todas las funcionalidades de express
require('dotenv').config({ path: '../.env' }); //Importo dotenv para manejar variables de entorno
const { Pool } = require('pg'); //Para conectarme a PostgreSQL
const bcrypt = require('bcrypt'); //Importo bcrypt, sirve para hashear contraseñas
const path = require('path'); //Para manejar rutas de archivos

app.use(express.json()); //Middleware, permite que el servidor entienda los datos JSON que le envío
app.use(express.static(path.join(__dirname, '../frontend'))); //Sirve para que el servidor pueda entregar los archivos estáticos (html, css, js) del frontend


//Esto le dice al servidor que si entra una petición a la raíz, le entregue el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


//-------- CONFIGURACIÓN DE LA BASE DE DATOS -----------------------------

const pool = new Pool({
    // Aquí pegaremos el link que nos de Neon.tech
    connectionString:process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false //Obligatorio para que funcione en la nube
    }
});

// --- CONEXIÓN, solo verifico, no inicio el servidor aca ---
pool.connect()
    .then(() => {
        console.log('¡Conexión a PostgreSQL exitosa! 🟢');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos 🔴:', err);
    });

//---------------------------------------------------------------------------------------------------------

//Variables Globales
const reservas = []; //Base de datos provisoria
let contadorDeId = 0;


//Para ver los horarios
app.get('/horarios', async (req, res) => {

    const fechaConsultada = req.query.fecha;
    const horarioConsultado = req.query.horario;

    const validar = await pool.query("SELECT * FROM reservas WHERE fechaReserva = $1 AND horarioElegido = $2 AND deporte = $3", [fechaConsultada, horarioConsultado, req.query.deporte]);

    if (validar.rows.length > 0) {
        return res.status(409).send("Turno ocupado")
    }
    else {
        res.status(200).send("Turno disponible")
    }
})


//Para reservar el turno
app.post('/reservar', async (req, res) => {

    try {

        const { nombre, fecha, horario, deporte } = req.body;

        if (!nombre || !fecha || !horario || !deporte) {
            res.status(400).send('Faltan datos para procesar la reserva');
            return;
        }

        const validarTurno = await pool.query("SELECT * FROM reservas WHERE fechaReserva = $1 AND horarioElegido = $2 AND deporte = $3", [fecha, horario, deporte]);

        if (validarTurno.rows.length > 0) {
            return res.status(409).send("Turno ocupado")
        }
        else {
            await pool.query("INSERT INTO reservas (nombreCliente, fechaReserva, horarioElegido, deporte) VALUES ($1, $2, $3, $4)", [nombre, fecha, horario, deporte]);
            res.send("El turno se guardó correctamente")
        }
    }
    catch (err) {
        if (err.code === '23505'){
            return res.status(409).send("Error al intentar reservar el turno, seguramente intentaste reservar el turno al mismo tiempo que otro usuario");
        }else{
            console.error(err);
            return res.status(500).send("Error al intentar reservar el turno");
        }
    }
});


//Para registrar usuario
app.post("/registrar", async (req, res) => {
        const { email, password, nombre } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).send("Faltan datos para registrarse")
        }

        try {
            //Le pregunto a la BD si ya conoce el email
            const resultadoBusqueda = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

            if (resultadoBusqueda.rows.length > 0) {
                return res.status(409).send("Usuario ya registrado")
            }
            else {
                const passwordEncriptada = await bcrypt.hash(password, 10);

                //Defino el rol antes de los inputs
                let rolAguardar = 'usuario';

                if (email === "uruz@gmail.com") {
                    rolAguardar = 'admin';
                }

                await pool.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)', [nombre, email, passwordEncriptada, rolAguardar]);
                res.send(`Te has registrado correctamente con el email ${email}`)
            }

        } catch (err) {
            console.error(err);
            res.status(500).send("Error al registrar usuario");
        }
    });


    //Para loguear usuario
    app.post("/login", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Faltan datos para iniciar sesión")
        }

        try {
            const validacion = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

            if (validacion.rows.length === 0) {
                return res.status(404).send("Email no encontrado")
            }
            else {
                const usuario = validacion.rows[0] //Obtengo el primer (y único) resultado de la consulta
                const passwordEnBD = usuario.password; //Obtengo la contraseña hasheada que está en la BD

                const coincidenLasContraseñas = await bcrypt.compare(password, passwordEnBD)

                if (coincidenLasContraseñas === true) {
                    res.json({
                        mensaje: "Bienvenido",
                        nombre: usuario.nombre,
                        rol: usuario.rol
                    })
                }
                else {
                    res.status(401).send("Usuario o contraseña incorrecta")
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error del servidor al intentar iniciar sesión");
        }
    })

    app.get('/ver-reservas', async (req, res) => {
        const nombre = req.query.nombre

        try {
            const mostrar = await pool.query("SELECT * FROM reservas WHERE nombreCliente = $1", [nombre]);

            if (mostrar.rows.length > 0) {
                return res.status(200).send(mostrar.rows)
            }
            else {
                res.status(409).send("No hay turnos reservados")
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error del servidor al intentar ver las reservas");
        }
    })

    app.get('/admin-ver-reservas', async (req, res) => {

        try {
            const mostrarReservasAdmin = await pool.query("SELECT * FROM reservas");

            if (mostrarReservasAdmin.rows.length > 0) {
                return res.status(200).send(mostrarReservasAdmin.rows)
            }
            else {
                res.status(409).send("No hay turnos reservados")
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error del servidor al intentar mostrar las reservas");
        }
    })


    //Para dar de baja el turno
    app.delete('/cancelar/:id', async (req, res) => {

        const id = req.params.id

        try {
            await pool.query("DELETE FROM reservas WHERE id = $1", [id]);

            res.status(200).send("Reserva cancelada correctamente")
        }

        catch (err) {
            console.error(err);
            res.status(500).send("Error del servidor al intentar cancelar una reserva")
        }

    })

//ARRANCO EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} 🟢`);
});


//req = request, solicitud
//res = response, respuesta

//Uso req.body para recibir datos en POST
//Uso req.query para recibir datos en GET
//Uso req.params para recibir datos en DELETE