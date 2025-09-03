document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.review-panel');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideInterval = 3000; // 6 seconds
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all panels
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show selected panel
        panels[index].classList.add('active');
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Next slide function
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= panels.length) newIndex = 0;
        showSlide(newIndex);
        resetAutoSlide();
    }
    
    // Previous slide function
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = panels.length - 1;
        showSlide(newIndex);
        resetAutoSlide();
    }
    
    // Auto slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }
    
    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Add click events to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
            resetAutoSlide();
        });
    });
    
    // Pause auto slide on hover
    const reviewContainer = document.querySelector('.reviews-container');
    reviewContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto slide when not hovering
    reviewContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    function initReviews() {
        showSlide(0);
        startAutoSlide();
    }
    
    initReviews();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});

 document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form submission handler - OPENS EMAIL CLIENT
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create email content
        const emailSubject = `${subject} - Message from ${name}`;
        const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
        `.trim();
        
        // Encode for URL
        const encodedSubject = encodeURIComponent(emailSubject);
        const encodedBody = encodeURIComponent(emailBody);
        
        // Open user's email client
        window.location.href = `mailto:info@midexgold.com?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
        }, 5000);
    });
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '(' + value;
            
            if (value.length > 4) {
                value = value.slice(0, 4) + ') ' + value.slice(4);
            }
            
            if (value.length > 9) {
                value = value.slice(0, 9) + '-' + value.slice(9);
            }
            
            if (value.length > 14) {
                value = value.slice(0, 14);
            }
        }
        
        e.target.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            // Defensive: check if panel exists
            if (panel && panel.style) {
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        });
    }

    // Add smooth scrolling to support button
    const supportBtn = document.querySelector('.support-btn');

    if (supportBtn) {
        supportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add keyboard navigation for accessibility
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.setAttribute('tabindex', '0'); // Make focusable
        accordion.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    const phoneNumber = "+2349063915159";

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (button.closest('.modal')) return;
            
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Create WhatsApp message with Naira price
            const message = `Hello! I'm interested in purchasing the ${productTitle} (${productCategory}) for ${productPrice}. Please provide more details.`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    const detailButtons = document.querySelectorAll('.details-btn');
    const productModalEl = document.getElementById('productModal');
    let productModal = null;
    
    if (productModalEl) {
        productModal = new bootstrap.Modal(productModalEl);
    }

    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.product-card');
            if (!productCard) return;
            
            const productImage = productCard.querySelector('.product-img')?.src || '';
            const productTitle = productCard.querySelector('.product-title')?.textContent || '';
            const productCategory = productCard.querySelector('.product-category')?.textContent || '';
            const productPrice = productCard.querySelector('.product-price')?.textContent || '';
            const productDescription = productCard.querySelector('.product-description')?.textContent || '';

            // Update modal content
            document.getElementById('modalProductImage').src = productImage;
            document.getElementById('modalProductTitle').textContent = productTitle;
            document.getElementById('modalProductCategory').textContent = productCategory;
            document.getElementById('modalProductPrice').textContent = productPrice;
            document.getElementById('modalProductDescription').textContent = productDescription;

            // Update modal WhatsApp button
            const modalWhatsappBtn = productModalEl.querySelector('.whatsapp-btn');
            if (modalWhatsappBtn) {
                modalWhatsappBtn.onclick = function () {
                    const message = `Hello! I'm interested in purchasing the ${productTitle} (${productCategory}) for ${productPrice}. Please provide more details.`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                };
            }

            if (productModal) productModal.show();
        });
    });
});

document.querySelectorAll('.footer-column h5').forEach(header => {
    header.addEventListener('click', function() {
        if (window.innerWidth <= 767.98) {
            const parent = this.parentElement;
            // Close others
            document.querySelectorAll('.footer-column').forEach(col => {
                if (col !== parent) col.classList.remove('active');
            });
            // Toggle current
            parent.classList.toggle('active');
        }
    });
});