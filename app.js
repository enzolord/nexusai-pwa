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

// Gestion de l'installation de la PWA
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const cancelInstall = document.getElementById('cancelInstall');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('✅ beforeinstallprompt déclenché');
    e.preventDefault();
    deferredPrompt = e;
    
    // Afficher l'invite après un délai
    setTimeout(() => {
        if (!localStorage.getItem('installPromptDismissed') && !isAppInstalled()) {
            installPrompt.style.display = 'block';
        }
    }, 5000);
});

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

if (installButton) {
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        installPrompt.style.display = 'none';
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('✅ PWA installée');
        }
        
        deferredPrompt = null;
    });
}

if (cancelInstall) {
    cancelInstall.addEventListener('click', () => {
        installPrompt.style.display = 'none';
        localStorage.setItem('installPromptDismissed', 'true');
    });
}

window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA installée avec succès!');
    installPrompt.style.display = 'none';
    deferredPrompt = null;
});
