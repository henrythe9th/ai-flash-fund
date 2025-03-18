// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if it's open
        if (document.querySelector('nav').classList.contains('open')) {
            document.querySelector('nav').classList.remove('open');
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('open');
        });
    }
});

// Text animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.underline-text');
    if (textElement) {
        const words = ['AI-Native', 'Seed-Strap', 'Vibe Coder', 'Solo', 'Smart'];
        let currentIndex = 0;
        
        // Store the original content for reference
        const originalSvg = textElement.querySelector('svg').outerHTML;
        
        // Add a special class to enable CSS transitions
        textElement.classList.add('animated-text');
        
        // Trigger animation immediately to draw attention
        // This ensures the animation starts on page load
        textElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Animation function that cycles through the words
        const animateWords = () => {
            // Move to next word index
            currentIndex = (currentIndex + 1) % words.length;
            const word = words[currentIndex];
            
            // Fade out only
            textElement.style.opacity = '0';
            
            // Change text and fade back in after a delay
            setTimeout(() => {
                // Replace text but keep SVG
                textElement.textContent = word;
                textElement.innerHTML += originalSvg;
                
                // Add different highlight color based on word
                const colors = ['#5465FF', '#FF5454', '#48BB78', '#9C27B0', '#ECC94B'];
                const path = textElement.querySelector('svg path');
                if (path) {
                    path.setAttribute('stroke', colors[currentIndex]);
                    
                    // Reset and restart the SVG underline animation
                    path.innerHTML = ''; // Clear any existing animations
                    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                    animate.setAttribute("attributeName", "stroke-dasharray");
                    animate.setAttribute("from", "0,1000");
                    animate.setAttribute("to", "1000,0");
                    animate.setAttribute("dur", "2s");
                    animate.setAttribute("begin", "0s");
                    animate.setAttribute("fill", "freeze");
                    path.appendChild(animate);
                }
                
                // Fade in
                textElement.style.opacity = '1';
                
                // Schedule the next animation
                setTimeout(animateWords, 3000); // Show each word for 3 seconds
            }, 500); // 500ms for the fade out transition
        };
        
        // Start the animation after a short delay
        setTimeout(animateWords, 2000);
        
        // Add console log for debugging
        console.log('Text animation initialized for:', words);
    }
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle clicked item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
