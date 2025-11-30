// Menu Burger amélioré
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.menu-toggle') && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navigation entre les onglets des solutions
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et contenus
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Afficher le contenu correspondant
        const tabId = button.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});

// Chatbot amélioré
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessage = document.getElementById('sendMessage');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        const isVisible = chatbotWindow.style.display === 'flex';
        chatbotWindow.style.display = isVisible ? 'none' : 'flex';
        
        // Focus sur l'input quand le chatbot s'ouvre
        if (!isVisible) {
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);
        }
    });
}

// Fermer le chatbot en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    if (chatbotWindow && chatbotWindow.style.display === 'flex' &&
        !e.target.closest('.chatbot-container') && 
        !e.target.closest('.chatbot-window')) {
        chatbotWindow.style.display = 'none';
    }
});

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
        return "Bonjour ! Je suis l'assistant IA de NexusAI. Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût')) {
        return "Nos prix commencent à 300 000 FCFA pour un site vitrine basique. Souhaitez-vous des détails sur une solution spécifique ?";
    } else if (lowerMessage.includes('site') || lowerMessage.includes('web')) {
        return "Nous créons des sites web modernes et performants avec intégration d'IA. Nous proposons des sites vitrine, e-commerce et corporate.";
    } else if (lowerMessage.includes('application') || lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
        return "Nous développons des applications mobiles natives et hybrides avec des fonctionnalités IA personnalisées.";
    } else if (lowerMessage.includes('ia') || lowerMessage.includes('intelligence artificielle') || lowerMessage.includes('chatbot')) {
        return "Nous intégrons l'IA dans tous nos projets : chatbots intelligents, analyse prédictive, automatisation des processus...";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('email') || lowerMessage.includes('appeler')) {
        return "Vous pouvez nous contacter au +237 620 81 920 ou par email à contact@nexusai.cm. Nous sommes disponibles du lundi au vendredi de 8h à 18h.";
    } else if (lowerMessage.includes('délai') || lowerMessage.includes('temps') || lowerMessage.includes('livraison')) {
        return "Les délais varient selon le projet :\n- Site vitrine : 2-3 semaines\n- E-commerce : 4-6 semaines\n- Application mobile : 6-8 semaines";
    } else if (lowerMessage.includes('merci') || lowerMessage.includes('remercie')) {
        return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else {
        return "Je comprends que vous souhaitez en savoir plus sur : '" + message + "'. Pourriez-vous préciser votre demande ou consulter nos services détaillés sur le site ?";
    }
}

if (sendMessage) {
    sendMessage.addEventListener('click', () => {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Simuler un temps de réponse réaliste
            setTimeout(() => {
                const response = processMessage(message);
                addMessage(response);
            }, 1000);
        }
    });
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
}

// Formulaire de contact avec envoi WhatsApp
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Formatage du message pour WhatsApp
        const whatsappMessage = `Bonjour NexusAI,%0A%0AJe suis intéressé par vos services.%0A%0A*Nom:* ${name}%0A*Email:* ${email}%0A*Téléphone:* ${phone}%0A*Service intéressé:* ${service}%0A*Message:* ${message}%0A%0AMerci de me recontacter pour discuter de mon projet.`;
        
        // Numéro WhatsApp (format international sans +)
        const phoneNumber = "23762081920";
        
        // Ouvrir WhatsApp avec le message pré-rempli
        window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
    });
}

// Animation au défilement améliorée
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.service-card, .solution-card, .plan-card, .section-title').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Gestion des boutons CTA
document.getElementById('devisButton')?.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById('discoverButton')?.addEventListener('click', () => {
    document.getElementById('services')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.padding = '0.8rem 2rem';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.9)';
        header.style.padding = '1rem 2rem';
    }
    
    lastScrollY = window.scrollY;
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Fermer le menu mobile si on passe en desktop
    if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site NexusAI chargé avec succès');
    
    // Ajouter une classe loaded pour les animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
