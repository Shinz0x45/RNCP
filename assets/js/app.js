// =========================
// INSCRIPTION
// =========================

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

            // Enregistrement de la session currentUser
            const currentUser = {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                loginAt: new Date().toLocaleString("fr-FR"),
                logoutAt: null
            };

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            window.location.href = "../index.html";

        } else {

            alert("Connexion impossible.");

        }

    });

}

// =========================
// DECONNEXION
// =========================

const logoutLinks = document.querySelectorAll("a[href*='connexion.html']");

logoutLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        // Récupération du currentUser
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        // Enregistrement de la date de déconnexion
        if (currentUser) {

            currentUser.logoutAt = new Date().toLocaleString("fr-FR");

            // Historique des sessions
            let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
            sessions.push(currentUser);
            localStorage.setItem("sessions", JSON.stringify(sessions));

            // Suppression de la session active
            localStorage.removeItem("currentUser");

        }

        // Redirection vers la page de connexion
        window.location.href = link.href;

    });

});

// =========================
// AFFICHAGE DU PRÉNOM CONNECTÉ
// =========================

const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
const welcomeEl = document.querySelector(".profil p");

if (currentUserData && welcomeEl) {

    welcomeEl.textContent = currentUserData.prenom + " !";

}

// =========================
// CONTACT
// =========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Empêche le rechargement de la page
        event.preventDefault();

        // Récupération des valeurs du formulaire
        const nom = document.getElementById("contact-nom").value;
        const email = document.getElementById("contact-email").value;
        const sujet = document.getElementById("contact-sujet").value;
        const message = document.getElementById("contact-message").value;

        // Création de l'objet message
        const newMessage = {
            nom: nom,
            email: email,
            sujet: sujet,
            message: message,
            date: new Date().toLocaleString("fr-FR")
        };

        // Récupération des messages déjà enregistrés
        let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

        // Ajout du nouveau message
        messages.push(newMessage);

        // Sauvegarde dans le localStorage
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        // Réinitialisation du formulaire
        contactForm.reset();

        // Affichage du message de succès
        const successMsg = document.getElementById("contact-success");
        if (successMsg) {
            successMsg.style.display = "block";
            setTimeout(function () {
                successMsg.style.display = "none";
            }, 4000);
        }

    });

}


// =========================
// PAGE ACCUEIL — MODALS
// =========================

function homeOpenModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('home-modal-open');
    document.body.style.overflow = 'hidden';
}

function homeCloseModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('home-modal-open');
    document.body.style.overflow = '';
}

// Fermer un modal en cliquant sur l'overlay
document.querySelectorAll('.home-modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.remove('home-modal-open');
            document.body.style.overflow = '';
        }
    });
});


// =========================
// PAGE ACCUEIL — SOLDE (toggle masquer/afficher)
// =========================

function homeToggleBalance() {
    const balanceVal = document.getElementById('balanceVal');
    const eyeIcon = document.getElementById('eyeIcon');
    if (!balanceVal || !eyeIcon) return;

    const isVisible = eyeIcon.classList.contains('fa-eye');

    if (isVisible) {
        balanceVal.textContent = '••••••';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        balanceVal.textContent = '3 466,90';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}


// =========================
// PAGE ACCUEIL — INFOS UTILISATEUR (QR & Carte)
// =========================

(function homePopulateUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    const fullName = user.prenom + ' ' + user.nom;

    // Nom dans le QR code
    const qrName = document.getElementById('home-qr-name');
    if (qrName) qrName.textContent = fullName;

    // Nom sur la carte bancaire
    const cardHolder = document.getElementById('home-card-holder-name');
    if (cardHolder) cardHolder.textContent = fullName.toUpperCase();
})();


// =========================
// PAGE ACCUEIL — TRANSACTIONS RÉCENTES
// =========================

(function homeRenderTransactions() {
    const txList = document.getElementById('home-tx-list');
    const txEmpty = document.getElementById('home-tx-empty');
    if (!txList) return;

    // On récupère les transactions depuis le localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    if (transactions.length === 0) {
        // Le message "Aucune transaction" est déjà dans le HTML
        return;
    }

    // On supprime le message vide
    if (txEmpty) txEmpty.remove();

    // Couleurs et icônes selon la catégorie
    const categoryMap = {
        'mobile':       { icon: 'fa-mobile-screen',         bg: '#e3f2fd', color: '#1565c0' },
        'internet':     { icon: 'fa-wifi',                  bg: '#e8f5e9', color: '#2e7d32' },
        'facture':      { icon: 'fa-file-invoice-dollar',   bg: '#fff8e1', color: '#e65100' },
        'électricité':  { icon: 'fa-bolt',                  bg: '#fce4ec', color: '#c62828' },
        'cinéma':       { icon: 'fa-film',                  bg: '#ede9fd', color: '#533dea' },
        'eau':          { icon: 'fa-droplet',               bg: '#e0f7fa', color: '#00695c' },
        'virement':     { icon: 'fa-paper-plane',           bg: '#ede9fd', color: '#533dea' },
        'recharge':     { icon: 'fa-wallet',                bg: '#e8f5e9', color: '#2e7d32' },
        'default':      { icon: 'fa-receipt',               bg: '#f5f5f5', color: '#555'    }
    };

    // On affiche les 5 plus récentes
    const recent = transactions.slice(-5).reverse();

    recent.forEach(function (tx) {
        const key = (tx.categorie || '').toLowerCase();
        const style = categoryMap[key] || categoryMap['default'];
        const isIncome = parseFloat(tx.montant) > 0;
        const amountClass = isIncome ? 'home-tx-in' : 'home-tx-out';
        const sign = isIncome ? '+' : '';

        const item = document.createElement('div');
        item.className = 'home-tx-item';
        item.innerHTML =
            '<div class="home-tx-icon" style="background:' + style.bg + ';color:' + style.color + ';">' +
                '<i class="fa-solid ' + style.icon + '"></i>' +
            '</div>' +
            '<div class="home-tx-info">' +
                '<div class="home-tx-name">' + (tx.libelle || tx.categorie || 'Transaction') + '</div>' +
                '<div class="home-tx-date">' + (tx.date || '') + '</div>' +
            '</div>' +
            '<div class="home-tx-amount ' + amountClass + '">' +
                sign + parseFloat(tx.montant).toFixed(2).replace('.', ',') + ' €' +
            '</div>';

        txList.appendChild(item);
    });
})();


// =========================
// PAGE ACCUEIL — MODAL CONFIDENTIALITÉ au chargement
// =========================

(function homeShowPrivacyOnLoad() {
    if (!document.getElementById('privacyModal')) return;

    // On n'affiche le modal qu'une seule fois par session
    if (!sessionStorage.getItem('privacyAccepted')) {
        setTimeout(function () {
            homeOpenModal('privacyModal');
        }, 600);
    }

    // On marque comme vu quand l'utilisateur accepte (le bouton appelle homeCloseModal)
    const originalClose = window.homeCloseModal;
    window.homeCloseModal = function (id) {
        if (id === 'privacyModal') {
            sessionStorage.setItem('privacyAccepted', '1');
        }
        originalClose(id);
    };
})();


// =========================
// PAGE AJOUT TRANSACTION
// =========================

// ---- Initialise la date du jour par défaut ----
(function ajoutTxInitDate() {
    const dateInput = document.getElementById('tx-date');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
})();


// ---- Bascule Dépense / Revenu ----
function setTxType(type) {
    const btnDepense = document.getElementById('btn-depense');
    const btnRevenu  = document.getElementById('btn-revenu');
    const txType     = document.getElementById('tx-type');
    if (!btnDepense || !btnRevenu || !txType) return;

    txType.value = type;

    if (type === 'depense') {
        btnDepense.classList.add('active');
        btnRevenu.classList.remove('active');
    } else {
        btnRevenu.classList.add('active');
        btnDepense.classList.remove('active');
    }
}


// ---- Soumission du formulaire ----
const ajoutTxForm = document.getElementById('ajout-tx-form');

if (ajoutTxForm) {

    ajoutTxForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const successMsg = document.getElementById('ajout-tx-success');
        const errorMsg   = document.getElementById('ajout-tx-error');

        // Réinitialisation des messages
        successMsg.style.display = 'none';
        errorMsg.style.display   = 'none';

        // Récupération des valeurs
        const type      = document.getElementById('tx-type').value;
        const montantRaw = parseFloat(document.getElementById('tx-montant').value);
        const libelle   = document.getElementById('tx-libelle').value.trim();
        const categorie = document.getElementById('tx-categorie').value;
        const date      = document.getElementById('tx-date').value;
        const note      = document.getElementById('tx-note') ? document.getElementById('tx-note').value.trim() : '';

        // Validation simple
        if (!montantRaw || montantRaw <= 0) {
            errorMsg.textContent = '⚠️ Veuillez saisir un montant valide (supérieur à 0).';
            errorMsg.style.display = 'block';
            return;
        }
        if (!libelle) {
            errorMsg.textContent = '⚠️ Veuillez saisir un libellé.';
            errorMsg.style.display = 'block';
            return;
        }
        if (!categorie) {
            errorMsg.textContent = '⚠️ Veuillez choisir une catégorie.';
            errorMsg.style.display = 'block';
            return;
        }
        if (!date) {
            errorMsg.textContent = '⚠️ Veuillez sélectionner une date.';
            errorMsg.style.display = 'block';
            return;
        }

        // Le montant est négatif si c'est une dépense
        const montant = type === 'depense' ? -Math.abs(montantRaw) : Math.abs(montantRaw);

        // Formatage de la date en français pour l'affichage
        const dateObj    = new Date(date + 'T00:00:00');
        const dateAffich = dateObj.toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'short', year: 'numeric'
        });

        // Construction de l'objet transaction
        const newTx = {
            type:      type,
            montant:   montant,
            libelle:   libelle,
            categorie: categorie,
            date:      dateAffich,
            dateRaw:   date,
            note:      note,
            createdAt: new Date().toLocaleString('fr-FR')
        };

        // Récupération et mise à jour du tableau
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(newTx);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Affichage du message de succès
        successMsg.style.display = 'block';

        // Réinitialisation du formulaire
        ajoutTxForm.reset();
        setTxType('depense');
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tx-date').value = today;

        // Redirection vers l'accueil après 1,5 s
        setTimeout(function () {
            window.location.href = '../index.html';
        }, 1500);

    });

}