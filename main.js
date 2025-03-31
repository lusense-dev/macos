document.addEventListener('DOMContentLoaded', () => {
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
});

function initPageTransition() {
    const pageTransition = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
}

function initLoadingScreen() {
    document.body.classList.add('no-scroll');
    
    const loadingScreen = document.querySelector('.loading-screen');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                
                if (document.querySelector('.page-transition')) {
                    setTimeout(() => {
                        document.querySelector('.page-transition').classList.remove('active');
                    }, 200);
                }
            }, 500);
        }
    }, 100);
}

function initHeroAnimation() {
    const heroElements = [
        document.querySelector('.trust-badge'),
        document.querySelector('.hero-title'),
        document.querySelector('.hero-description'),
        document.querySelector('.cta-group'),
        document.querySelector('.hero-stats')
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
    
    const featureCards = document.querySelectorAll('.feature-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const animateOnScroll = (elements) => {
        elements.forEach(el => {
            const position = el.getBoundingClientRect();
            
            if (position.top < window.innerHeight * 0.85) {
                el.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', function() {
        animateOnScroll(featureCards);
        animateOnScroll(benefitCards);
    });
    
    setTimeout(() => {
        animateOnScroll(featureCards);
        animateOnScroll(benefitCards);
    }, 1000);
}


function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle span');
        
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            
            if (toggle) {
                if (item.classList.contains('active')) {
                    toggle.style.transform = 'rotate(45deg)';
                } else {
                    toggle.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

function initMenuInteraction() {
    const menuItems = document.querySelectorAll('.menu-item');
    if (!menuItems.length) return;
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            item.classList.add('active');
        });
    });
}

function initCounters() {
    const statCounts = document.querySelectorAll('.stat-count');
    if (!statCounts.length) return;
    
    const isInViewport = element => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    let counted = false;
    
    const startCounting = () => {
        if (counted) return;
        
        let allInView = true;
        statCounts.forEach(counter => {
            if (!isInViewport(counter)) {
                allInView = false;
            }
        });
        
        if (allInView) {
            counted = true;
            
            statCounts.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const increment = Math.ceil(target / (duration / 30));
                
                const interval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target.toLocaleString();
                        clearInterval(interval);
                    } else {
                        counter.textContent = count.toLocaleString();
                    }
                }, 30);
            });
        }
    };
    
    window.addEventListener('scroll', startCounting);
    window.addEventListener('load', startCounting);
}

function initImageUpload() {
    const uploadTrigger = document.getElementById('uploadTrigger');
    const menuImageUpload = document.getElementById('menuImageUpload');
    const menuPreview = document.querySelector('.menu-preview');
    
    if (!uploadTrigger || !menuImageUpload || !menuPreview) return;
    
    uploadTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        menuImageUpload.click();
    });
    
    menuImageUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const existingImage = menuPreview.querySelector('.uploaded-image');
                if (existingImage) {
                    existingImage.remove();
                }
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('uploaded-image');
                
                menuPreview.insertBefore(img, menuPreview.firstChild);
                
                const brandingText = document.querySelector('.branding-text');
                if (brandingText) {
                    brandingText.style.opacity = '0';
                }
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
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
    
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth < 768) {
        heroSection.style.backgroundAttachment = 'scroll';
    }
    
    setTimeout(() => {
        const gradientText = document.querySelector('.hero-gradient-text');
        if (!gradientText) return;
        
        const text = gradientText.textContent;
        gradientText.textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                gradientText.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }, 2000);
}
