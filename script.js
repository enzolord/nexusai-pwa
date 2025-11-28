// Menu Burger
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
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

// Chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendMessage = document.getElementById('sendMessage');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });
}

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
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
        return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerMessage.includes('prix') || lowerMessage.includes('tarif')) {
        return "Nos prix commencent à 300 000 FCFA pour un site vitrine basique. Voulez-vous plus de détails sur une solution spécifique ?";
    } else if (lowerMessage.includes('site') || lowerMessage.includes('web')) {
        return "Nous créons des sites web modernes et performants avec intégration d'IA. Souhaitez-vous un site vitrine, e-commerce ou corporate ?";
    } else if (lowerMessage.includes('application') || lowerMessage.includes('mobile')) {
        return "Nous développons des applications mobiles natives et hybrides. Nos prix commencent à 1 200 000 FCFA.";
    } else if (lowerMessage.includes('ia') || lowerMessage.includes('intelligence artificielle')) {
        return "Nous intégrons l'IA dans tous nos projets : chatbots, analyse prédictive, automatisation... Quel est votre besoin spécifique ?";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('email')) {
        return "Vous pouvez nous contacter au +237 620 81 920 ou par email à contact@nexusai.cm. Nous sommes situés à Douala, Cameroun.";
    } else {
        return "Je comprends que vous dites : '" + message + "'. Pourriez-vous reformuler votre question ou consulter nos services sur le site ?";
    }
}

if (sendMessage) {
    sendMessage.addEventListener('click', () => {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Simuler un temps de réponse
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

// Animation au défilement
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

document.querySelectorAll('.service-card, .solution-card, .plan-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Gestion des boutons CTA
document.getElementById('devisButton')?.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('discoverButton')?.addEventListener('click', () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
});