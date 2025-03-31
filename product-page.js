document.addEventListener('DOMContentLoaded', () => {
    initPageTransition();
    initMobileMenu(); // Ensure mobile menu is initialized first
    initProductHeroAnimations();
    initPricingCardAnimations();
    initPaymentButtonEffects();
    shortenLoadingScreen();
    initAnalyticsTracking();
    initScrollEvents();
    fixMobileLayout();
});

function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('.nav-link');
    const backLink = document.querySelector('.back-link a');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 200);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (!target.startsWith('#') && !target.includes('://')) {
                e.preventDefault();
                
                pageTransition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = target;
                }, 300);
            }
        });
    });
    
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            pageTransition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 300);
        });
    }
    
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            setTimeout(() => {
                pageTransition.classList.remove('active');
            }, 200);
        }
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!hamburger || !mobileMenu) return;
    
    // Make sure event handlers are only added once
    hamburger.removeEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
            
            hamburger.children[0].style.transform = 'translateY(8px) rotate(45deg)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            body.style.overflow = '';
            
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    }
    
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    
    mobileLinks.forEach(link => {
        link.removeEventListener('click', closeMobileMenu);
        link.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        if (mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    });
    
    // Ensure hamburger is visible on mobile
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'flex';
    }
}

function initProductHeroAnimations() {
    const heroElements = [
        document.querySelector('.back-link'),
        document.querySelector('.product-icon-large'),
        document.querySelector('.product-hero-content h1'),
        document.querySelector('.product-tagline'),
        document.querySelector('.product-badge-pro'),
        document.querySelector('.product-badge-new')
    ];
    
    heroElements.forEach((el, index) => {
        if (!el) return;
        
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
}

function initPricingCardAnimations() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                if (card.classList.contains('popular') && window.innerWidth > 768) {
                    card.style.transform = 'scale(1.05)';
                } else {
                    card.style.transform = 'translateY(0)';
                }
            }, 50);
        }, 600 + (index * 200));
    });
}

function initPaymentButtonEffects() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            
            if (button.classList.contains('blue-btn')) {
                button.style.boxShadow = '0 8px 20px rgba(33, 150, 243, 0.5)';
            } else if (button.classList.contains('orange-btn')) {
                button.style.boxShadow = '0 8px 20px rgba(255, 152, 0, 0.5)';
            } else if (button.classList.contains('green-btn')) {
                button.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.5)';
            } else {
                button.style.boxShadow = '0 8px 20px rgba(154, 105, 197, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '1px';
            ripple.style.height = '1px';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            to {
                transform: scale(100);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function shortenLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;
    
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 200);
        }
    }, 100);
}

function initAnalyticsTracking() {
    const paymentButtons = document.querySelectorAll('.payment-btn');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = document.querySelector('.product-hero-content h1').textContent;
            const planTitle = this.closest('.pricing-card').querySelector('.plan-title').textContent;
            const planPrice = this.closest('.pricing-card').querySelector('.plan-price').textContent;
            
            console.log(`Purchase clicked: ${productName} - ${planTitle} (${planPrice})`);
        });
    });
}

function initScrollEvents() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const featureItems = document.querySelectorAll('.features-list li, .payment-icons i');
    const guaranteeCards = document.querySelectorAll('.guarantee-card');
    const techFeatures = document.querySelectorAll('.tech-feature');
    
    const animateOnScroll = (elements, delay = 0) => {
        elements.forEach((el, index) => {
            const position = el.getBoundingClientRect();
            
            if (position.top < window.innerHeight * 0.85) {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 50);
                }, delay + (index * 100));
            }
        });
    };
    
    window.addEventListener('scroll', function() {
        animateOnScroll(featureItems);
        animateOnScroll(guaranteeCards, 200);
        if (techFeatures.length) animateOnScroll(techFeatures, 300);
    });
    
    setTimeout(() => {
        animateOnScroll(featureItems);
        animateOnScroll(guaranteeCards, 200);
        if (techFeatures.length) animateOnScroll(techFeatures, 300);
    }, 1000);
}

function fixMobileLayout() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
    
    window.addEventListener('resize', () => {
        const newViewportHeight = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${newViewportHeight * 0.01}px`);
        
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            if (card.classList.contains('popular')) {
                if (window.innerWidth <= 768) {
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.transform = 'scale(1.05)';
                }
            }
        });
        
        // Show/hide hamburger based on screen width
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'flex';
            }
        }
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const newViewportHeight = window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${newViewportHeight * 0.01}px`);
        }, 200);
    });
    
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
    
    const productHero = document.querySelector('.product-hero');
    if (productHero && window.innerWidth < 768) {
        productHero.style.backgroundAttachment = 'scroll';
    }
    
    if (window.innerWidth <= 768) {
        const pricingContainer = document.querySelector('.pricing-container');
        const popularCard = document.querySelector('.pricing-card.popular');
        
        if (popularCard && pricingContainer) {
            pricingContainer.insertBefore(popularCard, pricingContainer.firstChild);
        }
    }
}