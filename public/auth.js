// Firebase configuración e inicialización
const firebaseConfig = {
    apiKey: "AIzaSyBdrGcF8pvWfRaR9bIHPbzeceLZx7cg-oA",
    authDomain: "sealcoffee-9e6b5.firebaseapp.com",
    projectId: "sealcoffee-9e6b5",
    storageBucket: "sealcoffee-9e6b5.appspot.com",
    messagingSenderId: "181581822809",
    appId: "1:181581822809:web:ef1823fed0550f1f142a48"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log("Persistencia de sesión configurada.");
    })
    .catch((error) => {
        console.error("Error en la configuración de persistencia:", error.message);
    });

function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

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
                    email.value = "";
                    password.value = ""
                });
        })

        .catch((error) => {

            Swal.fire({
                icon: 'error',
                title: '¡Error al registrarse, vuelva a intentarlo!',
                text: `${error.message}`,
                confirmButtonText: 'Continuar'
            })

            email.value = "";
            password.value = "";

        });

}



function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                icon: 'success',
                title: '¡Login Exitoso!',
                text: `Bienvenido, ${user.email}`,
                confirmButtonText: 'Continuar'
            })
                .then(() => {
                    window.location.href = "index.html"
                })


        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.message);
            alert("No se pudo iniciar sesión: " + error.message);
        });
}


// const user = userCredential.user;

// user ? Swal.fire({
//     icon: 'success',
//     title: '¡Login Exitoso!',
//     text: `Bienvenido, ${user.email}`,
//     confirmButtonText: 'Continuar'
// })
//     .then(() => {
//         window.location.href = "dashboard/index.html"
//     })
//     : Swal.fire({
//         icon: 'error',
//         title: '¡Error al iniciar sesión!',
//         text: `${error.message}`,
//         confirmButtonText: 'Continuar'
//     })


// Verificar el estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    const btnLogin = document.getElementById("btn-login");
    const btnLogout = document.getElementById("btn-logout");

    if (user) {
        // Usuario logueado
        if (btnLogin) btnLogin.style.display = "none";
        if (btnLogout) btnLogout.style.display = "block";
        console.log("Usuario logueado:", user.email);
    } else {
        // Usuario no logueado
        if (btnLogin) btnLogin.style.display = "block";
        if (btnLogout) btnLogout.style.display = "none";
        console.log("Ningún usuario está logueado");
    }
});

// Función para cerrar sesión
function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log("Sesión cerrada correctamente");
            window.location.href = "./login.html"; // Redirigir a la página de login
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
}
function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}