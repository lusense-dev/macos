
document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;


    if (hamburger && mobileMenu) {
  
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'flex';
        }

        
        hamburger.addEventListener('click', function() {
       
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
         
            if (this.classList.contains('active')) {
             
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
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
              
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    body.style.overflow = '';
                    
                    hamburger.children[0].style.transform = 'none';
                    hamburger.children[1].style.opacity = '1';
                    hamburger.children[2].style.transform = 'none';
                }
            });
        });

        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
                
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            }
            
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'flex';
            }
        });
    }
});