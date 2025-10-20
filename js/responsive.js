// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message (replace with actual API call)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        
        // In production, you would send the data to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thanks for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Active navigation link highlight
const sections = document.querySelectorAll('.section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
window.addEventListener('scroll', debounce(() => {
    // Your scroll operations here
}, 10));

// ==================== NEW FEATURES ====================

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        updateCounter();
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.getElementById('testimonialDots');

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');

function updateTestimonials() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

testimonialPrev.addEventListener('click', () => {
    currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
    updateTestimonials();
});

testimonialNext.addEventListener('click', () => {
    currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
    updateTestimonials();
});

// Auto-play testimonials
setInterval(() => {
    currentTestimonial = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
    updateTestimonials();
}, 5000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Live Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatBadge = document.querySelector('.chat-badge');

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    if (chatBox.classList.contains('active')) {
        chatBadge.style.display = 'none';
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
    
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.classList.add('message-content');
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    content.innerHTML = `
        <p>${text}</p>
        <span class="message-time">${time}</span>
    `;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thanks for your message! Our team will get back to you shortly.",
                "That's a great question! Let me help you with that.",
                "I understand. One of our specialists will assist you soon.",
                "Thank you for reaching out! We're here to help."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
        }, 1000);
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Cookie Consent Banner
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

// Check if user has already made a choice
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.classList.remove('show');
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieConsent.classList.remove('show');
});

// Enhanced Scroll Animations for New Sections
const newSections = document.querySelectorAll('.stats, .testimonials, .blog, .faq');
newSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Smooth scroll enhancement for new navigation items
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 70;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

console.log('🚀 iEducate website loaded successfully with all new features!');

// ==================== ENHANCEMENTS: Portfolio Lightbox ====================
(() => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const btnPrev = document.getElementById('lightboxPrev');
    const btnNext = document.getElementById('lightboxNext');
    const btnClose = document.getElementById('lightboxClose');
    const items = Array.from(document.querySelectorAll('.portfolio-item'));
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = items[currentIndex];
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Preview';
        lightboxCaption.textContent = item.getAttribute('data-caption') || img.alt || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function next() {
        currentIndex = (currentIndex + 1) % items.length;
        openLightbox(currentIndex);
    }

    function prev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        openLightbox(currentIndex);
    }

    // Click handlers on portfolio items
    items.forEach((item, idx) => {
        item.addEventListener('click', (e) => {
            // Avoid following any overlay link default
            e.preventDefault();
            openLightbox(idx);
        });
    });

    btnClose && btnClose.addEventListener('click', closeLightbox);
    btnNext && btnNext.addEventListener('click', next);
    btnPrev && btnPrev.addEventListener('click', prev);

    // Close when clicking backdrop outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
})();

// ==================== ENHANCEMENTS: Portfolio Filters ====================
(() => {
    const filterBar = document.querySelector('.portfolio-filters');
    if (!filterBar) return;
    const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));
    const items = Array.from(document.querySelectorAll('.portfolio-item'));

    function applyFilter(category) {
        items.forEach(item => {
            const cat = item.getAttribute('data-category');
            const show = category === 'all' || cat === category;
            item.classList.toggle('hidden', !show);
        });
        localStorage.setItem('portfolioFilter', category);
    }

    // Restore saved filter
    const saved = localStorage.getItem('portfolioFilter') || 'all';
    applyFilter(saved);
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === saved));

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });
})();

// ==================== ENHANCEMENTS: Color Picker ====================
(() => {
    const toggle = document.getElementById('colorPickerToggle');
    const panel = document.getElementById('colorPicker');
    const swatchesEl = document.getElementById('colorSwatches');
    const resetBtn = document.getElementById('resetColors');
    if (!toggle || !panel) return;

    const palettes = [
        { primary: '#007bff', accent: '#28a745' },
        { primary: '#ff4757', accent: '#ffa502' },
        { primary: '#6f42c1', accent: '#20c997' },
        { primary: '#e83e8c', accent: '#00d1b2' },
        { primary: '#1e90ff', accent: '#ff6b6b' },
        { primary: '#0d6efd', accent: '#6610f2' },
        { primary: '#10b981', accent: '#3b82f6' },
        { primary: '#f59e0b', accent: '#ef4444' },
        { primary: '#14b8a6', accent: '#f97316' },
        { primary: '#22c55e', accent: '#06b6d4' },
        { primary: '#a855f7', accent: '#f43f5e' },
        { primary: '#3f83f8', accent: '#f59e0b' },
    ];

    function applyPalette(p) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', p.primary);
        root.style.setProperty('--accent-color', p.accent);
        localStorage.setItem('themePalette', JSON.stringify(p));
    }

    // Render swatches
    palettes.forEach(p => {
        const s = document.createElement('button');
        s.className = 'swatch';
        s.style.background = `linear-gradient(135deg, ${p.primary}, ${p.accent})`;
        s.setAttribute('title', `${p.primary} / ${p.accent}`);
        s.addEventListener('click', () => applyPalette(p));
        swatchesEl.appendChild(s);
    });

    // Restore palette
    const saved = localStorage.getItem('themePalette');
    if (saved) {
        try { applyPalette(JSON.parse(saved)); } catch {}
    }

    // Toggle panel visibility
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('show');
        panel.setAttribute('aria-hidden', String(!panel.classList.contains('show')));
    });

    // Reset colors
    resetBtn && resetBtn.addEventListener('click', () => {
        const defaults = { primary: '#007bff', accent: '#28a745' };
        applyPalette(defaults);
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== toggle) {
            panel.classList.remove('show');
            panel.setAttribute('aria-hidden', 'true');
        }
    });
})();

// ==================== ENHANCEMENTS: Command Palette (Ctrl+K) ====================
(() => {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('cmdInput');
    const list = document.getElementById('cmdList');
    if (!palette || !input || !list) return;

    const commands = [
        { label: 'Go: Home', action: () => document.querySelector('#home').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: About', action: () => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: Services', action: () => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: Portfolio', action: () => document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: Testimonials', action: () => document.querySelector('#testimonials').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: Blog', action: () => document.querySelector('#blog').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: FAQ', action: () => document.querySelector('#faq').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Go: Contact', action: () => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) },
        { label: 'Toggle Dark Mode', action: () => document.getElementById('themeToggle').click() },
        { label: 'Open Color Picker', action: () => document.getElementById('colorPickerToggle').click() },
        { label: 'Filter: All Projects', action: () => document.querySelector('.filter-btn[data-filter="all"]').click() },
        { label: 'Filter: Web Projects', action: () => document.querySelector('.filter-btn[data-filter="web"]').click() },
        { label: 'Filter: Design Projects', action: () => document.querySelector('.filter-btn[data-filter="design"]').click() },
        { label: 'Filter: Mobile Projects', action: () => document.querySelector('.filter-btn[data-filter="mobile"]').click() },
    ];

    let activeIndex = 0;
    let currentList = commands;

    function open() {
        palette.classList.add('open');
        palette.setAttribute('aria-hidden', 'false');
        render(commands);
        currentList = commands;
        activeIndex = 0;
        highlight();
        input.value = '';
        setTimeout(() => input.focus(), 0);
    }

    function close() {
        palette.classList.remove('open');
        palette.setAttribute('aria-hidden', 'true');
    }

    function render(items) {
        list.innerHTML = '';
        items.forEach((cmd, idx) => {
            const li = document.createElement('li');
            li.className = 'cmd-item';
            li.setAttribute('role', 'option');
            li.textContent = cmd.label;
            li.addEventListener('click', () => {
                cmd.action();
                close();
            });
            list.appendChild(li);
        });
    }

    function highlight() {
        const items = list.querySelectorAll('.cmd-item');
        items.forEach((el, idx) => el.classList.toggle('active', idx === activeIndex));
        const activeEl = items[activeIndex];
        if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
    }

    function filterCommands(q) {
        const low = q.toLowerCase();
        const filtered = commands.filter(c => c.label.toLowerCase().includes(low));
        currentList = filtered;
        render(filtered);
        activeIndex = 0;
        highlight();
    }

    // Keyboard shortcut Ctrl+K (or Cmd+K on macOS)
    document.addEventListener('keydown', (e) => {
        const isMac = navigator.platform.toUpperCase().includes('MAC');
        if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (palette.classList.contains('open')) close(); else open();
        }
        if (e.key === 'Escape' && palette.classList.contains('open')) close();
    });

    // Navigate list
    input.addEventListener('keydown', (e) => {
        const items = list.querySelectorAll('.cmd-item');
        if (!items.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = (activeIndex + 1) % items.length; highlight(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = (activeIndex - 1 + items.length) % items.length; highlight(); }
        if (e.key === 'Enter') {
            e.preventDefault();
            (items[activeIndex] || items[0]).click();
        }
    });

    input.addEventListener('input', (e) => {
        filterCommands(e.target.value);
    });

    // Click outside to close
    palette.addEventListener('click', (e) => {
        if (e.target === palette) close();
    });
})();