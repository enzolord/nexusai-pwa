// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker enregistré avec succès:', registration);
            })
            .catch((error) => {
                console.log("Échec de l'enregistrement du Service Worker:", error);
            });
    });
}

// Vérification de la présence du manifeste
function checkManifest() {
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
        console.warn('Manifeste non trouvé');
        return;
    }
    
    fetch(manifestLink.href)
        .then(response => response.json())
        .then(manifest => {
            console.log('Manifeste chargé:', manifest);
        })
        .catch(error => {
            console.error('Erreur lors du chargement du manifeste:', error);
        });
}

// Gestion de l'installation de la PWA
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const cancelInstall = document.getElementById('cancelInstall');

window.addEventListener('beforeinstallprompt', (e) => {
    // Empêche le navigateur de montrer l'invite automatique
    e.preventDefault();
    // Stocke l'événement pour l'utiliser plus tard
    deferredPrompt = e;
    
    // Vérifie si l'app n'est pas déjà installée
    if (!isAppInstalled()) {
        // Montre l'invite personnalisée après un délai
        setTimeout(() => {
            if (!localStorage.getItem('installPromptDismissed')) {
                installPrompt.style.display = 'block';
            }
        }, 5000);
    }
});

// Vérifie si l'app est déjà installée
function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

if (installButton) {
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Montre l'invite d'installation
        deferredPrompt.prompt();
        
        // Attend que l'utilisateur réponde à l'invite
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('Utilisateur a accepté l installation');
            installPrompt.style.display = 'none';
        } else {
            console.log('Utilisateur a refusé l installation');
        }
        
        // Réinitialise la variable
        deferredPrompt = null;
    });
}

if (cancelInstall) {
    cancelInstall.addEventListener('click', () => {
        installPrompt.style.display = 'none';
        localStorage.setItem('installPromptDismissed', 'true');
    });
}

// Vérifier si l'app est déjà installée au chargement
window.addEventListener('load', () => {
    if (isAppInstalled()) {
        console.log('PWA déjà installée');
    }
});

// Événement lorsque l'app est installée
window.addEventListener('appinstalled', () => {
    console.log('PWA installée avec succès');
    installPrompt.style.display = 'none';
    deferredPrompt = null;
});

// Gestion du mode hors ligne
window.addEventListener('online', () => {
    console.log('Connexion rétablie');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('Mode hors ligne');
    document.body.classList.add('offline');
});

// Vérification initiale du statut de connexion
if (!navigator.onLine) {
    document.body.classList.add('offline');
}

// Fonction utilitaire pour les notifications
function showNotification(title, message) {
    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "granted") {
        new Notification(title, { 
            body: message, 
            icon: 'favicon/web-app-manifest-192x192.png' 
        });
    }
}

// Vérification du manifeste au chargement
document.addEventListener('DOMContentLoaded', () => {
    checkManifest();
});