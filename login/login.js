/**
 * Referencias a los inputs en login HTML, por el id.
 */

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");

/**
 * Claves de acceso para proyeto firebase.
 */

const firebaseConfig = {

    apiKey: "AIzaSyBdrGcF8pvWfRaR9bIHPbzeceLZx7cg-oA",
    authDomain: "sealcoffee-9e6b5.firebaseapp.com",
    projectId: "sealcoffee-9e6b5",
    storageBucket: "sealcoffee-9e6b5.appspot.com",
    messagingSenderId: "181581822809",
    appId: "1:181581822809:web:ef1823fed0550f1f142a48"

}

firebase.initializeApp(firebaseConfig);

/**
 * Funcion para registrar usuario nuevo y redirigirlo a la sección de login.
 */

function register() {
    const email = registerEmail.value;
    const password = registerPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            Swal.fire({
                icon: 'success',
                title: '¡Registro Existoso!',
                text: `Bienvenido, ${email}`,
                confirmButtonText: 'Continuar'
            })

                .then(() => {
                    window.location.href = "login.html"
                    registerEmail.value = "";
                    registerPassword.value = ""
                });
        })

        .catch((error) => {

            Swal.fire({
                icon: 'error',
                title: '¡Error al registrarse, vuelva a intentarlo!',
                text: `${error.message}`,
                confirmButtonText: 'Continuar'
            })

            registerEmail.value = "";
            registerPassword.value = "";

        });

}



/**
 * Funcion para iniciar sesión, después de registrar las credenciales y redirigir a la página principal.
 */


function login() {
    const email = loginEmail.value;
    const password = loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            if (user) {
                $btnLogin.style.display = "none";
                $btnLogout.style.display = "block";
            } else {
                $btnLogout.style.display = "none";
                $btnLogin.style.display = "block";
            }
            Swal.fire({
                icon: 'success',
                title: '¡Login Existoso!',
                text: `Bienvenido, ${user.email}`,
                confirmButtonText: 'Continuar'
            })
                .then(() => {
                    window.location.href = "../página Uno/index.html"
                    loginEmail.value = "";
                    loginPassword.value = "";

                });
        })

        .catch((error) => {

            var errorCode = error.code; //manejo errores
            var errorMessage = error.message;

            Swal.fire({
                icon: 'error',
                title: '¡Error!, usuario incorrecto o no existe. Puede registrarse.',
                text: `No se pudo iniciar sesión: ${errorMessage}`,
                confirmButtonText: 'Continuar'
            })

            loginEmail.value = "";
            loginPassword.value = "";

        });

}

/**
 * Función para cerrar sesión.
 */

function logout() {
    firebase.auth().signOut().then(() => {
        alert("Sesión cerrada");
        window.location.href = "../página Uno/index.html";
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}

/**
 * Verificación del estado de autenticación.
 */

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuario logueado: ", user.email);
    } else {
        console.log("Ningún usuario está logueado");
    }
});

/**
 * Funcion para alternar entre formularios, esta se encarga de esconder el formulario de inicio de sesion,
 * al mismo tiempo que deja visible el formulario de registro.
 */

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

/**
 * Esta funcion básicamente hace lo opuesto a la anterior.
 */

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

/**
 * Mensaje cómico de error de contraseña.
 */

document.getElementById('nopassword').addEventListener('click', function (e) {
    e.preventDefault();
    //alert("Buen día, lo invitamos a recordarla!");
    Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: "Si olvido su contraseña, lo invitamos a recordarla!",
        confirmButtonText: 'Continuar'
    })

});


const $btnLogin = document.getElementById("btn-login");
const $btnLogout = document.getElementById("btn-logout");

firebase.auth().onAuthStateChanged((user) => {
    const btnLogin = document.getElementById("btn-login");
    const btnLogout = document.getElementById("btn-logout");

    if (user) {
        // Usuario logueado
        btnLogin.style.display = "none";
        btnLogout.style.display = "block";
        console.log("Usuario logueado: ", user.email);
    } else {
        // No hay usuario logueado
        btnLogin.style.display = "block";
        btnLogout.style.display = "none";
        console.log("Ningún usuario está logueado");
    }
});