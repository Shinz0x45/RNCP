// Récupération du formulaire
const registerForm = document.getElementById("register-form");


// Vérifie que le formulaire existe sur la page
if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        // Empêche le rechargement de la page
        event.preventDefault();


        // Récupération des valeurs du formulaire
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;


        // Vérification des mots de passe
        if (password !== confirmPassword) {

            alert("Les mots de passe ne correspondent pas.");

            return;
        }


        // Récupération des utilisateurs déjà enregistrés
        let users = JSON.parse(localStorage.getItem("users")) || [];


        // Vérification si l'adresse email existe déjà
        const existingUser = users.find(function (user) {
            return user.email === email;
        });


        if (existingUser) {

            alert("Cette adresse email est déjà utilisée.");

            return;
        }


        // Création du nouvel utilisateur
        const newUser = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password
        };


        // Ajout du nouvel utilisateur au tableau
        users.push(newUser);


        // Enregistrement dans le localStorage
        localStorage.setItem("users", JSON.stringify(users));


        // Message de confirmation
        alert("Votre compte a été créé !");


        // Redirection vers la connexion
        window.location.href = "connexion.html";

    });

}

// =========================
// CONNEXION
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Empêche le rechargement de la page
        event.preventDefault();


        // Récupération des données du formulaire
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        // Récupération des utilisateurs enregistrés
        const users = JSON.parse(localStorage.getItem("users")) || [];


        // Recherche de l'utilisateur
        const user = users.find(function (user) {

            return user.email === email && user.password === password;

        });


        // Vérification
        if (user) {

            alert("Connexion réussie !");

            window.location.href = "../index.html";

        } else {

            alert("Connexion impossible.");

        }

    });

}