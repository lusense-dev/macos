document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization functions
    initPageTransition();
    initMobileMenu();
    initLoadingScreen();
    initHeroAnimation();
    initParticles();
    initScrollEvents();
    initFaqAccordion();
    initMenuInteraction();
    initCounters();
    initImageUpload();
    fixMobileLayout();
    
    // Add new mobile optimization function
    optimizeMobileExperience();
});

document.addEventListener('DOMContentLoaded', function() {
    // Force all product cards to be visible on desktop
    if (window.innerWidth > 768) {
        // Select all product cards
        const productCards = document.querySelectorAll('.product-card');
        
        // Make each product card visible immediately
        productCards.forEach(function(card) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
            card.style.display = 'block';
            
            // Add the animated class if your CSS uses it
            card.classList.add('animated');
            
            // Make sure the inner content is visible too
            const inner = card.querySelector('.product-card-inner');
            if (inner) {
                inner.style.opacity = '1';
                inner.style.visibility = 'visible';
                inner.style.display = 'flex';
                inner.style.flexDirection = 'column';
            }
            
            // Make sure product info is visible
            const info = card.querySelector('.product-info');
            if (info) {
                info.style.opacity = '1';
                info.style.visibility = 'visible';
                info.style.display = 'block';
            }
        });
    }
    
    // Fix any animation issues that might be preventing visibility
    const animateOnScroll = function(elements) {
        elements.forEach(function(element) {
            element.classList.add('animated');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.visibility = 'visible';
        });
    };
    
    // Run animation function immediately for desktop
    if (window.innerWidth > 768) {
        animateOnScroll(document.querySelectorAll('.product-card'));
        animateOnScroll(document.querySelectorAll('.benefit-card'));
    }
    
    // Also handle window resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            animateOnScroll(document.querySelectorAll('.product-card'));
            animateOnScroll(document.querySelectorAll('.benefit-card'));
        }
    });
    
    // Force products to be visible after a small delay (backup method)
    setTimeout(function() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.product-card').forEach(function(card) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.visibility = 'visible';
                card.classList.add('animated');
            });
        }
    }, 500);
});

// Override the initAnimations function if it exists to make cards immediately visible
if (typeof initAnimations === 'function') {
    const originalInitAnimations = initAnimations;
    
    initAnimations = function() {
        originalInitAnimations();
        
        if (window.innerWidth > 768) {
            document.querySelectorAll('.product-card').forEach(function(card) {
                card.classList.add('animated');
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            });
        }
    };
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!hamburger || !mobileMenu) return;
    
    // Make sure hamburger is visible on mobile
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'flex';
    } else {
        hamburger.style.display = 'none';
    }
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
            
            this.children[0].style.transform = 'translateY(8px) rotate(45deg)';
            this.children[1].style.opacity = '0';
            this.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            body.style.overflow = '';
            
            this.children[0].style.transform = 'none';
            this.children[1].style.opacity = '1';
            this.children[2].style.transform = 'none';
        }
    });
    
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            }
        });
    });
    
    // Always update visibility on resize
    window.addEventListener('resize', function() {
        // Show hamburger only on mobile
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'flex';
        } else {
            hamburger.style.display = 'none';
        }
        
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    });
}


function optimizeMobileExperience() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Faster animations on mobile
        const heroElements = [
            document.querySelector('.trust-badge'),
            document.querySelector('.hero-title'),
            document.querySelector('.hero-description'),
            document.querySelector('.cta-group'),
            document.querySelector('.hero-stats')
        ];
        
        // Make elements visible faster on mobile
        heroElements.forEach((el, index) => {
            if (!el) return;
            
            // Much faster animations on mobile
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100); // Reduced delay between elements
        });
        
        // Make sure hamburger menu is visible
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.style.display = 'flex';
        }
        
        // Ensure interface is visible without needing to scroll
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.marginTop = '20px';
        }
        
        // Force scroll to top to ensure content is visible
        window.scrollTo(0, 0);
    }
}

function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('.nav-link');
    const purchaseButtons = document.querySelectorAll('.purchase-button');
    
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
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
    
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            setTimeout(() => {
                pageTransition.classList.remove('active');
            }, 200);
        }
    });
}

function initAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const animateOnScroll = (elements) => {
        // On mobile, make all elements visible immediately
        if (window.innerWidth <= 768) {
            elements.forEach(element => {
                element.classList.add('animated');
            });
            return;
        }
        
        // On desktop, use the regular scroll animation
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            const delay = element.getAttribute('data-delay') || 0;
            
            if (position.top < window.innerHeight * 0.9) {
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
    };
    
    // Run immediately to make elements visible
    animateOnScroll(productCards);
    animateOnScroll(benefitCards);
    
    window.addEventListener('scroll', () => {
        animateOnScroll(productCards);
        animateOnScroll(benefitCards);
    });
    
    // Keep hover interactions
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const productImage = card.querySelector('.product-image img');
            if (productImage) {
                productImage.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const productImage = card.querySelector('.product-image img');
            if (productImage) {
                productImage.style.transform = 'scale(1)';
            }
        });
    });
}

function optimizeProductsForMobile() {
    if (window.innerWidth <= 768) {
        // Make sure products are immediately visible
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        // Make popular product first on mobile
        const popularProduct = document.querySelector('.product-card .product-badge.popular');
        if (popularProduct) {
            const popularCard = popularProduct.closest('.product-card');
            const productGrid = document.querySelector('.products-grid');
            if (popularCard && productGrid) {
                productGrid.insertBefore(popularCard, productGrid.firstChild);
            }
        }
    }
}

function initParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = heroParticles.offsetWidth;
    canvas.height = heroParticles.offsetHeight;
    heroParticles.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: i % 3 === 0 ? '#3498ff' : (i % 3 === 1 ? '#ff3a8c' : '#ffffff'),
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            if (Math.random() < 0.01) {
                p.speedX = Math.random() * 0.5 - 0.25;
                p.speedY = Math.random() * 0.5 - 0.25;
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = heroParticles.offsetWidth;
        canvas.height = heroParticles.offsetHeight;
    });
}

function shortenLoadingScreen() {
    document.body.classList.add('no-scroll');
    
    const loadingScreen = document.querySelector('.loading-screen');
    let progress = 0;
    
    // Use faster progress on mobile
    const isMobile = window.innerWidth <= 768;
    const increment = isMobile ? 25 : 15;
    const interval = setInterval(() => {
        progress += Math.random() * increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Shorter timeout on mobile
            const timeout = isMobile ? 300 : 500;
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                
                if (document.querySelector('.page-transition')) {
                    setTimeout(() => {
                        document.querySelector('.page-transition').classList.remove('active');
                    }, 200);
                }
            }, timeout);
        }
    }, isMobile ? 75 : 100); // Faster interval on mobile
}

function initProductCardLinks() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productLink = card.getAttribute('data-product-link');
        
        if (productLink) {
            const overlay = card.querySelector('.product-link-overlay');
            
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const productName = card.querySelector('.product-name').textContent;
                    const productPrice = card.querySelector('.price-amount').textContent;
                    
                    console.log(`Product card clicked: ${productName} at ${productPrice}`);
                    
                    const pageTransition = document.querySelector('.page-transition');
                    if (pageTransition) {
                        pageTransition.classList.add('active');
                    }
                    
                    setTimeout(() => {
                        window.location.href = productLink;
                    }, 300);
                });
            }
        }
        
        const purchaseButton = card.querySelector('.purchase-button');
        if (purchaseButton) {
            purchaseButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const productName = card.querySelector('.product-name').textContent;
                const productPrice = card.querySelector('.price-amount').textContent;
                
                console.log(`Purchase button clicked: ${productName} at ${productPrice}`);
            });
        }
    });
}

function initMobileProductOrdering() {
    if (window.innerWidth <= 768) {
        const productGrid = document.querySelector('.products-grid');
        if (!productGrid) return;
        
        const popularProduct = document.querySelector('.product-card .product-badge.popular');
        if (popularProduct) {
            const popularCard = popularProduct.closest('.product-card');
            if (popularCard && popularCard.parentNode === productGrid) {
                productGrid.insertBefore(popularCard, productGrid.firstChild);
            }
        }
    }
}

function fixMobileLayout() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
    
    window.addEventListener('resize', () => {
        const newViewportHeight = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${newViewportHeight * 0.01}px`);
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
    
    // Better handling of background attachment on mobile
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth < 768) {
        heroSection.style.backgroundAttachment = 'scroll';
    }
    
    // Better loading screen behavior on mobile
    shortenLoadingScreen();
}