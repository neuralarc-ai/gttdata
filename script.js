// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all Lucide icons
    lucide.createIcons();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
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
    
    // Observe all cards and timeline items
    document.querySelectorAll('.pricing-card, .value-card, .timeline-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const action = this.textContent.trim();
            console.log('Button clicked:', action);
            // Add analytics tracking here if needed
        });
    });
    
    // Pricing card interactions
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Timeline item interactions
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
    });
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Handle responsive navigation (if needed in future)
    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Print functionality
    const printBtn = document.querySelector('.btn-secondary[href="#"]');
    if (printBtn) {
        printBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }
    
    // Add subtle parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / 500);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add copy to clipboard functionality for contact info
    const addCopyFunctionality = (selector, text) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy';
            
            el.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    
                    // Show feedback
                    const originalText = el.textContent;
                    el.textContent = 'Copied!';
                    el.style.color = 'var(--color-success)';
                    
                    setTimeout(() => {
                        el.textContent = originalText;
                        el.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    };
    
    // Initialize copy functionality for email and phone
    const emailElement = document.querySelector('.recipient-card .value');
    if (emailElement && emailElement.textContent.includes('@')) {
        addCopyFunctionality('.recipient-card .value', emailElement.textContent);
    }
    
    console.log('Pricing proposal page initialized successfully');
});
