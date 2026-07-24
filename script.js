// ==================== SMOOTH SCROLLING & NAV ACTIVATION ====================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== COMBO DETAILS TOGGLE ====================
function toggleDetails(button) {
    const card = button.parentElement;
    const details = card.querySelector('.combo-details');
    
    if (details.style.display === 'none') {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
        button.classList.add('active');
    } else {
        details.style.display = 'none';
        button.textContent = 'View Details';
        button.classList.remove('active');
    }
}

// ==================== GUIDE CONTENT TOGGLE ====================
function toggleGuide(button) {
    const guideItem = button.parentElement;
    const content = guideItem.querySelector('.guide-content');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = 'Read Less';
        button.classList.add('active');
    } else {
        content.style.display = 'none';
        button.textContent = 'Read More';
        button.classList.remove('active');
    }
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '⬆️';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e72);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    z-index: 99;
    display: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'translateY(-2px)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// ==================== CTA BUTTON ====================
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#combos').scrollIntoView({ behavior: 'smooth' });
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.combo-card, .strategy-card, .matchup-card, .guide-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
            case 'K':
                e.preventDefault();
                document.querySelector('#combos').scrollIntoView({ behavior: 'smooth' });
                break;
            case 's':
            case 'S':
                e.preventDefault();
                document.querySelector('#strategies').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                document.querySelector('#matchups').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// ==================== PRINT FRIENDLY ====================
window.addEventListener('beforeprint', () => {
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
});

window.addEventListener('afterprint', () => {
    document.querySelector('.navbar').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
});