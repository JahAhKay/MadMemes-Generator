// Mad Scientist Meme templates configuration
const memeTemplates = {
    'mad-scientist-basic': {
        name: 'Classic Mad Scientist',
        image: 'templates/mad-scientist-basic.png',
        description: 'We play chess while you all are playing checkers'
    },
    'coffee-scientist': {
        name: 'Coffee Loving Scientist',
        image: 'templates/coffee-scientist.png',
        description: 'Im somewhat of a scientist myself.'
    },
    'lab-scientist': {
        name: 'A partying scientist',
        image: 'templates/lab-scientist.png',
        description: 'Cheers to science!'
    },
    'happy-scientist': {
        name: 'Happy Scientist',
        image: 'templates/happy-scientist.png',
        description: 'A jolly memey scientist'
    },
    'toxic-scientist': {
        name: 'Pointing Scientist',
        image: 'templates/toxic-scientist.png',
        description: 'The scientist sees something special'
    },
    'beaker-scientist': {
        name: 'Scientist in a lab',
        image: 'templates/beaker-scientist.png',
        description: 'EXXPURRRRIIMMENNNTTT'
    },
    'all-hail-science': {
        name: 'All Hail Science',
        image: 'templates/all-hail-science.png',
        description: 'Praising the power of science'
    },
    'science-equals-science': {
        name: 'Science = Science',
        image: 'templates/science-equals-science.png',
        description: 'The fundamental equation of science'
    },
    'we-are-cooking': {
        name: 'We Are Cooking',
        image: 'templates/we-are-cooking.png',
        description: 'Scientists cooking up something amazing'
    },
    'beaker-boyz': {
        name: 'Beaker Boyz',
        image: 'templates/beaker-boyz.png',
        description: 'The ultimate beaker squad'
    }
};

// Function to select a template and navigate to editor
function selectTemplate(templateId) {
    if (memeTemplates[templateId]) {
        // Store selected template in localStorage
        localStorage.setItem('selectedTemplate', templateId);
        
        // Navigate to editor page
        window.location.href = 'editor.html';
    } else {
        console.error('Template not found:', templateId);
        alert('Template not found. Please try another one.');
    }
}

// Add smooth scroll behavior and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation for template cards
    const templateCards = document.querySelectorAll('.template-card');
    
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Initially hide cards and observe them
    templateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover sound effect (optional - can be removed if not desired)
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect
    templateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .template-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 128, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 