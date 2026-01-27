
let nombreUsuarioActual = ""; //Guardo el nombre del usuario que inició sesión
let fechaPendiente = ""; //Guardo la fecha seleccionada para reservar
let horarioPendiente = ""; //Guardo el horario seleccionado para reservar
let botonHorarioPendiente = null; //Guardo el botón del horario seleccionado para reservar
let deporteElegido = ""; //Guardo el deporte elegido por el usuario

const pantallaInicio = document.getElementById("pantalla-inicio");
const seccionLogin = document.getElementById("seccion-login");
const seccionRegistro = document.getElementById("seccion-registro");
const seccionAdmin = document.getElementById("seccion-admin");
const encabezadoPrincipal = document.getElementById("encabezado-principal");
const seccionElegirDeporte = document.getElementById("seccion-elegir-deporte");

const btnMostrarLogin = document.getElementById("btn-mostrar-login");
const btnMostrarRegistro = document.getElementById("btn-mostrar-registro");
const btnVolverDeLoginAInicio = document.getElementById("btn-volver-de-login-a-inicio");
const btnVolverDeRegistroAInicio = document.getElementById("btn-volver-de-registro-a-inicio");
const btnReservar = document.getElementById("btn-reservar");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
const btnVerPasswordLogin = document.getElementById("btn-ver-password-login");
const btnVerPasswordRegistro = document.getElementById("btn-ver-password-registro");
const inputPasswordLogin = document.getElementById("login-password");
const inputPasswordRegistro = document.getElementById("registro-password");
const btnAdminVerReservas = document.getElementById("btn-admin-ver-reservas");
const btnVolverDeAdminAReservas = document.getElementById("btn-volver-a-reservas");
const btnFutbol5 = document.getElementById("btn-futbol5");
const btnPadel = document.getElementById("btn-padel");
const btnVolverDeporteAInicio = document.getElementById("btn-volver-deporte-a-inicio");
const btnVolverDeReservasADeporte = document.getElementById("btn-volver-a-elegir-deporte");


const iconoOjoAbierto = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>`;

const iconoOjoTachado = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg>`;

const seccionReservas = document.getElementById("seccion-reservas");
const contenedorDias = document.getElementById("contenedor-dias");
const pasoHorarios = document.getElementById("paso-horarios");
const contenedorHorarios = document.getElementById("contenedor-horarios");
const tituloBienvenida = document.getElementById("titulo-bienvenida");
const mensajeErrorLogin = document.getElementById("mensaje-error-login");
const mensajeErrorRegistro = document.getElementById("mensaje-error-registro");
const mensajeReservaExitosa = document.getElementById("mensaje-reserva-exitosa")


btnMostrarLogin.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto')
    seccionRegistro.classList.add('oculto')
    seccionLogin.classList.remove('oculto')
    encabezadoPrincipal.classList.add('oculto');
})

btnMostrarRegistro.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto')
    seccionLogin.classList.add('oculto')
    seccionRegistro.classList.remove('oculto')
    encabezadoPrincipal.classList.add('oculto');
})

btnVolverDeLoginAInicio.addEventListener('click', () => {
    seccionRegistro.classList.add('oculto')
    seccionLogin.classList.add('oculto')
    seccionElegirDeporte.classList.remove('oculto')
    encabezadoPrincipal.classList.remove('oculto');


    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("mensaje-error-login").textContent = "";
})

btnVolverDeRegistroAInicio.addEventListener('click', () => {
    seccionLogin.classList.add('oculto')
    seccionRegistro.classList.add('oculto')
    pantallaInicio.classList.remove('oculto')
    encabezadoPrincipal.classList.remove('oculto');

    document.getElementById("registro-email").value = "";
    document.getElementById("registro-password").value = "";
    document.getElementById("registro-nombre").value = "";
    document.getElementById("mensaje-error-registro").textContent = "";
})

btnVerPasswordLogin.innerHTML = iconoOjoAbierto;

btnVerPasswordLogin.addEventListener('click', () => {
    if (inputPasswordLogin.type === "password") {
        inputPasswordLogin.type = "text";
        btnVerPasswordLogin.innerHTML = iconoOjoTachado;
    } else {
        inputPasswordLogin.type = "password";
        btnVerPasswordLogin.innerHTML = iconoOjoAbierto;
    }
});

btnVerPasswordRegistro.innerHTML = iconoOjoAbierto;

btnVerPasswordRegistro.addEventListener('click', () => {
    if (inputPasswordRegistro.type === "password") {
        inputPasswordRegistro.type = "text";
        btnVerPasswordRegistro.innerHTML = iconoOjoTachado
    } else {
        inputPasswordRegistro.type = "password"
        btnVerPasswordRegistro.innerHTML = iconoOjoAbierto
    }
})

btnAdminVerReservas.addEventListener("click", () => {
    seccionReservas.classList.add("oculto")
    seccionAdmin.classList.remove("oculto")
    traerTodasLasReservas()
})

btnVolverDeAdminAReservas.addEventListener("click", () => {
    seccionAdmin.classList.add("oculto")
    seccionReservas.classList.remove("oculto")
})




const formLogin = document.getElementById("form-login")

//Sirve para evitar que el formulario recargue la página al enviarse
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value //Obtengo el valor del campo email
    const password = document.getElementById("login-password").value //Obtengo el valor del campo password

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            // Si la respuesta es exitosa (status 200-299), la tratamos como JSON
            if (response.ok) {
                return response.json();
            } else {
                // Si hay error (401, 404, etc.), la tratamos como texto
                return response.text();
            }
        })
        .then(datos => {

            console.log("Datos recibidos del servidor:", datos); //Para ver si me pone el rol correcto

            // Verificamos si es el objeto de éxito
            if (datos.mensaje === "Bienvenido") {
                if (datos.rol === "admin") {
                    btnAdminVerReservas.classList.remove("oculto");
                } else {
                    btnAdminVerReservas.classList.add("oculto");
                    seccionAdmin.classList.add("oculto");
                }
                //Ocultamos login y mostramos inicio
                seccionLogin.classList.add('oculto');
                pantallaInicio.classList.add('oculto');
                seccionReservas.classList.add('oculto');
                seccionElegirDeporte.classList.remove('oculto');
                encabezadoPrincipal.classList.add('oculto');
                mensajeErrorLogin.textContent = "";

                tituloBienvenida.textContent = "Bienvenido, " + datos.nombre;

                nombreUsuarioActual = datos.nombre; //Guardo el nombre del usuario que inició sesión

                //Limpiar los campos del formulario
                document.getElementById("login-email").value = "";
                document.getElementById("login-password").value = "";
            } else {
                // Si no, es un mensaje de error (ej: "Contraseña incorrecta")
                mensajeErrorLogin.textContent = datos
            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            mensajeErrorLogin.textContent = "Hubo un problema de  conexión";
        });
});

//Cerrar sesión
btnCerrarSesion.addEventListener("click", () => {
    seccionReservas.classList.add("oculto");
    pantallaInicio.classList.remove("oculto");
    encabezadoPrincipal.classList.remove("oculto");
    mensajeReservaExitosa.textContent = "";
    clearInterval(intervaloRecargaReservas) //Si vuelvo a inicio, no se actualizan las reservas
});



const formRegister = document.getElementById("form-registro")

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registro-nombre").value
    const email = document.getElementById("registro-email").value
    const password = document.getElementById("registro-password").value

    if (nombre === "" || email === "" || password === "") {
        mensajeErrorRegistro.textContent = "Por favor, completa todos los campos.";
        mensajeErrorRegistro.style.color = "red";
        return;
    }

    if (!emailValido(email)) {
        mensajeErrorRegistro.textContent = "El correo no es válido, el formato debe ser: usuario@dominio.com";
        mensajeErrorRegistro.style.color = "red";
        return;
    }


    //Envio los datos del registro al servidor
    fetch('/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })
    })

        .then(response => {
            if (response.ok) {

                document.getElementById("registro-email").value = "";
                document.getElementById("registro-password").value = "";
                document.getElementById("registro-nombre").value = "";

                pantallaInicio.classList.add("oculto")
                seccionRegistro.classList.add("oculto")
                seccionLogin.classList.remove("oculto")
            }
            else {
                response.text().then(mensaje => { mensajeErrorRegistro.textContent = mensaje });
            }
        });
})

function generarDias() {
    contenedorDias.innerHTML = ""; // Limpia los días anteriores
    const hoy = new Date();
    for (let i = 0; i < 4; i++) {
        let fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + i);

        const textoBoton = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');

        const fechaParaSQL = `${year}-${month}-${day}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-dia");
        boton.textContent = textoBoton;

        //Cuando hacen click en un dia:
        boton.addEventListener("click", () => {
            mensajeReservaExitosa.textContent = ""; //Borro el texto
            mensajeReservaExitosa.classList.remove("mensaje-exito-reserva"); //Saco el color verde
            mensajeReservaExitosa.classList.remove("mensaje-error"); //Saco el color rojo por las dudas

            //Resalto el día seleccionado
            const diaAnterior = document.querySelector(".btn-dia.seleccionado");
            if (diaAnterior) {
                diaAnterior.classList.remove("seleccionado");
            }
            boton.classList.add("seleccionado");


            pasoHorarios.classList.remove("oculto");
            generarHorarios(fechaParaSQL);
        });
        contenedorDias.appendChild(boton);
    }
}


function generarHorarios(fechaSeleccionada) {

    fechaPendiente = "";
    horaPendiente = "";
    botonHorarioPendiente = null;

    btnReservar.disabled = true;

    contenedorHorarios.innerHTML = ""; //Limpia los horarios anteriores
    const listaHorarios = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    listaHorarios.forEach(hora => {
        const botonHora = document.createElement("button");
        botonHora.classList.add("btn-horario");
        botonHora.textContent = hora;

        fetch(`/horarios?fecha=${fechaSeleccionada}&horario=${hora}`)
            .then(response => {
                if (!response.ok) {
                    botonHora.disabled = true; //Deshabilito el botón si el turno está ocupado
                    botonHora.style.backgroundColor = "gray"; //Color gris para ocupado
                }
            })
            .catch((error => console.error("Error al verificar horario:", error)));

        botonHora.addEventListener("click", () => {
            const horarioAnterior = document.querySelector(".btn-horario.seleccionado");
            if (horarioAnterior) {
                horarioAnterior.classList.remove("seleccionado");
            }

            //Marco el nuevo botón visualmente
            botonHora.classList.add("seleccionado");

            //Guardo los datos en las variables temporales
            fechaPendiente = fechaSeleccionada;
            horaPendiente = hora;
            botonHorarioPendiente = botonHora; //Guardo el botón para modificarlo despues

            //Habilito el botón de confirmar
            btnReservar.disabled = false;
        })
        contenedorHorarios.appendChild(botonHora) //Sirve para agregar el botón al contenedor de horarios
    })
}

function reservarCancha(fecha, hora, botonHora) {
    fetch("/reservar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombreUsuarioActual, fecha, horario: hora })
    })

        .then(response => {
            // Si la respuesta es exitosa (status 200-299), la tratamos como JSON
            if (response.ok) {
                cargarMisReservas(); //Recargo las reservas del usuario
                return response.text();
            } else {
                // Si hay error (401, 404, etc.), la tratamos como texto
                return response.text();
            }
        })
        .then(datos => {
            // Verificamos si es el objeto de éxito
            if (datos === "El turno se guardó correctamente") {

                mensajeReservaExitosa.classList.remove("mensaje-error");
                mensajeReservaExitosa.classList.add("mensaje-exito-reserva")
                mensajeReservaExitosa.textContent = "¡Reserva exitosa para el " + pasarFechaANombreDiaYNumero(fecha) + " a las " + hora + "!";
                botonHora.disabled = true; //Deshabilito el botón del horario reservado
                botonHora.style.backgroundColor = "gray"; //Cambio el color del botón reservado

            } else {
                mensajeReservaExitosa.textContent = datos;
                mensajeReservaExitosa.classList.remove("mensaje-exito-reserva")
                mensajeReservaExitosa.classList.add("mensaje-error");

            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            alert("Hubo un problema de conexión.");
        });
}



function cargarMisReservas() {
    const contenedorReservas = document.getElementById("panel-izquierda")
    const nombreCodificado = encodeURIComponent(nombreUsuarioActual); // Esto es para que funcione si el nombre tiene espacios

    contenedorReservas.innerHTML = `
    <h3>Mis Reservas</h3>
    <button id="btn-actualizar-reservas" class="btn-inicio btn-actualizar">Actualizar reservas</button>`;

    const btnActualizarReservas = document.getElementById("btn-actualizar-reservas");

    btnActualizarReservas.addEventListener("click", () => {
        cargarMisReservas();
    })

    fetch(`/ver-reservas?nombre=${nombreCodificado}`)
        .then(response => {
            if (response.ok) {
                return response.json(); //Si sale bien, muestro el JSON
            } else {
                contenedorReservas.innerHTML += "<p>No tienes reservas aún.</p>";
                throw new Error("Sin reservas");
            }
        })
        .then(listaReservas => {

            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0); //Pongo la hora a 00:00 para comparar solo fechas y que en el if no falle

            //Ordeno las reservas de la más reciente a la más antigua mirando las fechas y horarios
            listaReservas.sort((a, b) => {
                const fechaA = new Date(a.fechareserva);
                const fechaB = new Date(b.fechareserva);

                if (fechaA.getTime() !== fechaB.getTime()) {
                    return fechaA - fechaB
                }
                //Si es el mismo dia, comparo la hora
                return a.horarioelegido.localeCompare(b.horarioelegido)
            });

            listaReservas.forEach(elementoDeLista => {

                let fechaTexto = elementoDeLista.fechareserva;

                if (typeof fechaTexto === 'string' && fechaTexto.includes('T')) {
                    fechaTexto = fechaTexto.split("T")[0];
                }

                const partesFecha = fechaTexto.split("-");
                const fechaACompararConLaDeHoy = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);


                if (fechaACompararConLaDeHoy >= hoy) {

                    const hora = elementoDeLista.horarioelegido;

                    const tarjeta = document.createElement("div")

                    tarjeta.classList.add("reserva-card"); //Creo una tarjeta para cada reserva

                    tarjeta.innerHTML = `<p>Fecha: ${pasarFechaANombreDiaYNumero(fechaTexto)} - Hora: ${hora}</p> <button onclick="cancelarReserva(${elementoDeLista.id})">Cancelar</button>`; //Creo el contenido de la tarjeta con la información de la reserva y el botón de cancelar

                    contenedorReservas.appendChild(tarjeta);

                }
            })

        })

        .catch(error => console.error("Error al cargar reservas:", error));
}


function cancelarReserva(idReserva) {

    fetch(`/cancelar/${idReserva}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {

                if (seccionAdmin.classList.contains("oculto")) {
                    cargarMisReservas();
                } else {
                    traerTodasLasReservas();
                    cargarMisReservas();
                }

                if (fechaPendiente) {
                    generarHorarios(fechaPendiente); //Recargo los horarios si hay una fecha pendiente seleccionada
                }

            }

        })
        .catch((error) => {
            console.error("Error en la petición:", error);
        });
}



btnReservar.addEventListener("click", () => {
    // Verificamos que tengamos datos pendientes
    if (fechaPendiente && horaPendiente) {
        reservarCancha(fechaPendiente, horaPendiente, botonHorarioPendiente);
    }
});



function emailValido(texto) {
    if (texto.includes("@") && texto.includes(".")) {
        return true;
    } else {
        return false;
    }
}


//Paso la fecha de formato YYYY-MM-DD a "lunes 5"
function pasarFechaANombreDiaYNumero(fechaString) {
    const fechaLimpia = fechaString.split("T")[0];
    const partes = fechaLimpia.split("-")
    const fechaObj = new Date(partes[0], partes[1] - 1, partes[2]);
    return fechaObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
}


function traerTodasLasReservas() {
    const contenedorReservasAdmin = document.getElementById("lista-reservas-admin");

    contenedorReservasAdmin.innerHTML = ""; //Limpio las reservas anteriores

    fetch('/admin-ver-reservas',
        { method: 'GET', })

        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.error("Error al buscar las reservas");
            }
        })
        .then((datos) => {
            console.log("Reservas encontradas:", datos);
            //Mismo metodo que en cargarMisReservas, me muestra las reservas de hoy en adelante, ordenadas de la más reciente a la más antigua
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0);

            datos.sort((a, b) => {
                const fechaA = new Date(a.fechareserva);
                const fechaB = new Date(b.fechareserva);

                if (fechaA.getTime() !== fechaB.getTime()) {
                    return fechaA - fechaB
                }

                return a.horarioelegido.localeCompare(b.horarioelegido)
            });

            datos.forEach(elementoDeLista => {
                let fechaTexto = elementoDeLista.fechareserva;
                if (typeof fechaTexto === 'string' && fechaTexto.includes('T')) {
                    fechaTexto = fechaTexto.split("T")[0];
                }

                const partesFecha = fechaTexto.split("-");
                const fechaACompararConLaDeHoy = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);

                if (fechaACompararConLaDeHoy >= hoy) {
                    const hora = elementoDeLista.horarioelegido;

                    const tarjeta = document.createElement("div")
                    tarjeta.classList.add("reserva-card");

                    tarjeta.innerHTML = `<p>Nombre: ${elementoDeLista.nombrecliente} - Fecha: ${pasarFechaANombreDiaYNumero(fechaTexto)} - Hora: ${hora}</p> <button onclick="cancelarReserva(${elementoDeLista.id})">Cancelar</button>`;

                    contenedorReservasAdmin.appendChild(tarjeta);
                }
            })
        })
        .catch((error) => {
            console.error("Error en la petición:", error);
        })
}


//Aca va a estar todo lo de la interfaz que pregunta que deporte quiere reservar el usuario
btnFutbol5.addEventListener("click", () => {
    deporteElegido = "futbol5";
    pantallaInicio.classList.add("oculto");
    seccionElegirDeporte.classList.add("oculto");
    seccionReservas.classList.remove("oculto");
    encabezadoPrincipal.classList.add("oculto");
    generarDias(); //LLamo a la función para generar los días disponibles
    cargarMisReservas(); //Cargo las reservas del usuario que inició sesión
});

btnPadel.addEventListener("click", () => {
    deporteElegido = "padel";
    alert("La sección de pádel estará disponible próximamente. ¡Gracias por tu paciencia!");
});

btnVolverDeporteAInicio.addEventListener("click", () => {
    seccionElegirDeporte.classList.add("oculto");
    seccionReservas.classList.add("oculto");
    pantallaInicio.classList.remove("oculto");
    encabezadoPrincipal.classList.remove("oculto");
});

btnVolverDeReservasADeporte.addEventListener("click", () => {
    seccionReservas.classList.add("oculto");
    seccionLogin.classList.add("oculto");
    seccionRegistro.classList.add("oculto");
    encabezadoPrincipal.classList.add("oculto");
    seccionElegirDeporte.classList.remove("oculto");
    mensajeReservaExitosa.textContent = "";
});
