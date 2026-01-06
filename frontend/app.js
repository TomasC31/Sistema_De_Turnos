
let nombreUsuarioActual = ""; //Guardo el nombre del usuario que inició sesión

const pantallaInicio = document.getElementById("pantalla-inicio");
const seccionLogin = document.getElementById("seccion-login");
const seccionRegistro = document.getElementById("seccion-registro");

const btnMostrarLogin = document.getElementById("btn-mostrar-login");
const btnMostrarRegistro = document.getElementById("btn-mostrar-registro");
const btnVolverDeLoginAInicio = document.getElementById("btn-volver-de-login-a-inicio");
const btnVolverDeRegistroAInicio = document.getElementById("btn-volver-de-registro-a-inicio");

const seccionReservas = document.getElementById("seccion-reservas");
const contenedorDias = document.getElementById("contenedor-dias");
const pasoHorarios = document.getElementById("paso-horarios");
const contenedorHorarios = document.getElementById("contenedor-horarios");
const tituloBienvenida = document.getElementById("titulo-bienvenida");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

btnMostrarLogin.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto')
    seccionRegistro.classList.add('oculto')
    seccionLogin.classList.remove('oculto')
})

btnMostrarRegistro.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto')
    seccionLogin.classList.add('oculto')
    seccionRegistro.classList.remove('oculto')
})

btnVolverDeLoginAInicio.addEventListener('click', () => {
    seccionRegistro.classList.add('oculto')
    seccionLogin.classList.add('oculto')
    pantallaInicio.classList.remove('oculto')

    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
})

btnVolverDeRegistroAInicio.addEventListener('click', () => {
    seccionLogin.classList.add('oculto')
    seccionRegistro.classList.add('oculto')
    pantallaInicio.classList.remove('oculto')

    document.getElementById("registro-email").value = "";
    document.getElementById("registro-password").value = "";
    document.getElementById("registro-nombre").value = "";
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
        // Verificamos si es el objeto de éxito
        if (datos.mensaje === "Bienvenido") {
            alert("¡Hola " + datos.nombre + "! Has iniciado sesión.");
            
            //Ocultamos login y mostramos inicio
            seccionLogin.classList.add('oculto');
            pantallaInicio.classList.add('oculto');
            seccionReservas.classList.remove('oculto');

            tituloBienvenida.textContent = "Bienvenido, " + datos.nombre;

            nombreUsuarioActual = datos.nombre; //Guardo el nombre del usuario que inició sesión

            generarDias(); //LLamo a la función para generar los días disponibles

            //Limpiar los campos del formulario
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";
        } else {
            // Si no, es un mensaje de error (ej: "Contraseña incorrecta")
            alert(datos);
        }
    })
    .catch(error => {
        console.error("Error en la petición:", error);
        alert("Hubo un problema de conexión.");
    });
});

//Cerrar sesión
btnCerrarSesion.addEventListener("click", () => {
    seccionReservas.classList.add("oculto");
    pantallaInicio.classList.remove("oculto");});




const formRegister = document.getElementById("form-registro")

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registro-nombre").value
    const email = document.getElementById("registro-email").value
    const password = document.getElementById("registro-password").value

        //Envio los datos del registro al servidor
    fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, email, password})
        })

        .then(response => {
            if(response.ok){
                response.text().then(mensaje => { alert(mensaje)})
                
                document.getElementById("registro-email").value = "";
                document.getElementById("registro-password").value = "";
                document.getElementById("registro-nombre").value = "";

                pantallaInicio.classList.add("oculto")
                seccionRegistro.classList.add("oculto")
                seccionLogin.classList.remove("oculto")
            }
            else{
                response.text().then(mensaje => {alert(mensaje)})
            }
    });
})

function generarDias(){
    contenedorDias.innerHTML = ""; // Limpia los días anteriores
    const hoy = new Date();
    for(let i = 0; i < 4; i++){
        let fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + i);

        const textoBoton = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric'});
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() +1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');

        const fechaParaSQL = `${year}-${month}-${day}`;

        const boton = document.createElement("button");
        boton.classList.add("btn-grande");
        boton.textContent = textoBoton;

        //Cuando hacen click en un dia:
        boton.addEventListener("click", () => {
            alert("Elegiste: " + textoBoton);
            pasoHorarios.classList.remove("oculto");
            generarHorarios(fechaParaSQL);
        });
        contenedorDias.appendChild(boton);
    }   
}


function generarHorarios(fechaSeleccionada){
    contenedorHorarios.innerHTML = ""; //Limpia los horarios anteriores
    const listaHorarios = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]

    listaHorarios.forEach(hora => { 
        const botonHora = document.createElement("button");
        botonHora.classList.add("btn-grande"); 
        botonHora.textContent = hora;

        fetch(`/horarios?fecha=${fechaSeleccionada}&horario=${hora}`)
        .then(response => {
            if(!response.ok){
                botonHora.disabled = true; //Deshabilito el botón si el turno está ocupado
                botonHora.style.backgroundColor = "gray"; //Color gris para ocupado
            }
        })
        .catch((error => console.error("Error al verificar horario:", error)));

        botonHora.addEventListener("click", () =>{
            if(confirm(`¿Confirmar reserva para el ${fechaSeleccionada} a las ${hora}`))
                reservarCancha(fechaSeleccionada, hora, botonHora)
        })
        contenedorHorarios.appendChild(botonHora) //Sirve para agregar el botón al contenedor de horarios
    })
}

function reservarCancha(fecha, hora, botonHora){
    fetch("/reservar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre: nombreUsuarioActual, fecha, horario: hora})
    })


    .then(response => {
            // Si la respuesta es exitosa (status 200-299), la tratamos como JSON
            if (response.ok) {
                return response.text();
            } else {
                // Si hay error (401, 404, etc.), la tratamos como texto
                return response.text();
            }
        })
        .then(datos => {
            // Verificamos si es el objeto de éxito
            if (datos === "El turno se guardó correctamente") {
                alert("¡Reserva exitosa para el " + fecha + " a las " + hora + "!");
                botonHora.disabled = true; //Deshabilito el botón del horario reservado
                botonHora.style.backgroundColor = "gray"; //Cambio el color del botón reservado
            } else {
                alert(datos);
            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            alert("Hubo un problema de conexión.");
        });
}
