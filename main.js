// RepairPro - Main JavaScript File
// SaaS Repair Shop Management System

// Global Application State
const RepairShopApp = {
    currentUser: null,
    notifications: [],
    audioEnabled: true,
    
    init() {
        this.initializeAnimations();
        this.setupEventListeners();
        this.initializeParticles();
        this.setupScrollAnimations();
        this.initializeTypedText();
        this.startCounterAnimations();
        this.loadNotificationSound();
    },
    
    // Initialize core animations
    initializeAnimations() {
        // Fade in elements on page load
        anime({
            targets: '.fade-in',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutQuart'
        });
        
        // Feature cards hover animations
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        });
        
        // Pricing cards hover animations
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        });
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Form submissions
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', this.handleRegistration.bind(this));
        }
        
        // Subdomain validation
        const subdomainInput = document.getElementById('subdomain');
        if (subdomainInput) {
            subdomainInput.addEventListener('input', this.validateSubdomain.bind(this));
        }
        
        // Modal close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeRegistrationModal();
            }
        });
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    },
    
    // Initialize particle system
    initializeParticles() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;
        
        try {
            // Create PIXI application
            const app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: 0x000000,
                backgroundAlpha: 0,
                antialias: true
            });
            
            particleContainer.appendChild(app.view);
            
            // Create particle container
            const particles = new PIXI.Container();
            app.stage.addChild(particles);
            
            // Particle properties
            const particleCount = 50;
            const particleArray = [];
            
            // Create particles
            for (let i = 0; i < particleCount; i++) {
                const particle = new PIXI.Graphics();
                particle.beginFill(0xFFFFFF, 0.3);
                particle.drawCircle(0, 0, Math.random() * 3 + 1);
                particle.endFill();
                
                particle.x = Math.random() * app.screen.width;
                particle.y = Math.random() * app.screen.height;
                particle.vx = (Math.random() - 0.5) * 0.5;
                particle.vy = (Math.random() - 0.5) * 0.5;
                
                particles.addChild(particle);
                particleArray.push(particle);
            }
            
            // Animate particles
            app.ticker.add(() => {
                particleArray.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around screen
                    if (particle.x > app.screen.width) particle.x = 0;
                    if (particle.x < 0) particle.x = app.screen.width;
                    if (particle.y > app.screen.height) particle.y = 0;
                    if (particle.y < 0) particle.y = app.screen.height;
                    
                    // Fade effect
                    particle.alpha = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
                });
            });
            
            this.particleApp = app;
        } catch (error) {
            console.log('Particle system not available');
        }
    },
    
    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Initialize typed text animation
    initializeTypedText() {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: [
                    'Kelola Bengkel Anda dengan Efisiensi Maksimal',
                    'Tingkatkan Produktivitas dengan Teknologi Modern',
                    'Kembangkan Bisnis dengan Sistem Terintegrasi'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    },
    
    // Start counter animations
    startCounterAnimations() {
        const counters = document.querySelectorAll('.stats-counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    },
    
    // Load notification sound
    loadNotificationSound() {
        this.notificationSound = new Audio('./resources/notification-sound.mp3');
        this.notificationSound.volume = 0.5;
    },
    
    // Play notification sound
    playNotificationSound() {
        if (this.audioEnabled && this.notificationSound) {
            this.notificationSound.play().catch(e => console.log('Audio play failed'));
        }
    },
    
    // Handle window resize
    handleResize() {
        if (this.particleApp) {
            this.particleApp.renderer.resize(window.innerWidth, window.innerHeight);
        }
    },
    
    // Registration modal functions
    openRegistrationModal() {
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            this.playNotificationSound();
        }
    },
    
    closeRegistrationModal() {
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },
    
    // Handle registration form submission
    handleRegistration(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            shopName: document.getElementById('shopName').value,
            ownerName: document.getElementById('ownerName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subdomain: document.getElementById('subdomain').value,
            shopType: document.getElementById('shopType').value
        };
        
        // Validate form
        if (!this.validateRegistrationForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Mendaftar...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            this.closeRegistrationModal();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    },
    
    // Validate registration form
    validateRegistrationForm(data) {
        const errors = [];
        
        if (!data.shopName || data.shopName.length < 3) {
            errors.push('Nama bengkel minimal 3 karakter');
        }
        
        if (!data.ownerName || data.ownerName.length < 3) {
            errors.push('Nama pemilik minimal 3 karakter');
        }
        
        if (!this.isValidEmail(data.email)) {
            errors.push('Email tidak valid');
        }
        
        if (!this.isValidPhone(data.phone)) {
            errors.push('Nomor telepon tidak valid');
        }
        
        if (!data.subdomain || data.subdomain.length < 3) {
            errors.push('Subdomain minimal 3 karakter');
        }
        
        if (!data.shopType) {
            errors.push('Pilih jenis bengkel');
        }
        
        if (errors.length > 0) {
            this.showErrorMessage(errors[0]);
            return false;
        }
        
        return true;
    },
    
    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate phone format
    isValidPhone(phone) {
        const phoneRegex = /^[0-9\-\+\s()]+$/;
        return phoneRegex.test(phone) && phone.length >= 10;
    },
    
    // Validate subdomain
    validateSubdomain(e) {
        const subdomain = e.target.value;
        const statusElement = document.getElementById('subdomainStatus');
        
        if (!statusElement) return;
        
        if (subdomain.length < 3) {
            statusElement.innerHTML = '<span class="text-red-500">Subdomain minimal 3 karakter</span>';
            return;
        }
        
        if (!/^[a-z0-9-]+$/.test(subdomain)) {
            statusElement.innerHTML = '<span class="text-red-500">Hanya huruf kecil, angka, dan strip</span>';
            return;
        }
        
        // Simulate subdomain availability check
        statusElement.innerHTML = '<span class="text-blue-500">Memeriksa ketersediaan...</span>';
        
        setTimeout(() => {
            const available = Math.random() > 0.3; // 70% chance available
            if (available) {
                statusElement.innerHTML = '<span class="text-green-500">✓ Subdomain tersedia</span>';
            } else {
                statusElement.innerHTML = '<span class="text-red-500">✗ Subdomain tidak tersedia</span>';
            }
        }, 1000);
    },
    
    // Show success message
    showSuccessMessage() {
        this.showNotification('Pendaftaran berhasil! Silakan cek email untuk instruksi selanjutnya.', 'success');
        this.playNotificationSound();
    },
    
    // Show error message
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        // Remove after 5 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 5000);
    },
    
    // Plan selection
    selectPlan(planType) {
        this.selectedPlan = planType;
        this.openRegistrationModal();
        
        // Pre-fill form based on plan
        const shopTypeSelect = document.getElementById('shopType');
        if (shopTypeSelect) {
            const planTypes = {
                'starter': 'phone',
                'professional': 'laptop',
                'enterprise': 'automotive'
            };
            shopTypeSelect.value = planTypes[planType] || '';
        }
    }
};

// Utility functions
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date));
    },
    
    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },
    
    // Local storage helpers
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Storage save failed:', error);
        }
    },
    
    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage load failed:', error);
            return null;
        }
    }
};

// Mock data for demonstrations
const MockData = {
    customers: [
        {
            id: 'cust_001',
            name: 'Budi Santoso',
            email: 'budi.santoso@email.com',
            phone: '0812-3456-7890',
            status: 'Regular',
            totalSpent: 2500000,
            lastService: '2025-11-15',
            avatar: './resources/customer-avatar-1.jpg'
        },
        {
            id: 'cust_002',
            name: 'Siti Nurhaliza',
            email: 'siti.nurhaliza@email.com',
            phone: '0813-4567-8901',
            status: 'Premium',
            totalSpent: 5200000,
            lastService: '2025-11-20',
            avatar: './resources/customer-avatar-2.jpg'
        },
        {
            id: 'cust_003',
            name: 'Ahmad Rahman',
            email: 'ahmad.rahman@email.com',
            phone: '0814-5678-9012',
            status: 'VIP',
            totalSpent: 8900000,
            lastService: '2025-11-25',
            avatar: './resources/customer-avatar-3.jpg'
        }
    ],
    
    staff: [
        {
            id: 'staff_001',
            name: 'Andi Wijaya',
            role: 'Manager',
            email: 'andi.wijaya@bengkel.com',
            phone: '0815-6789-0123',
            status: 'online',
            avatar: './resources/staff-avatar-1.jpg',
            performance: 95
        },
        {
            id: 'staff_002',
            name: 'Rizky Pratama',
            role: 'Technician',
            email: 'rizky.pratama@bengkel.com',
            phone: '0816-7890-1234',
            status: 'online',
            avatar: './resources/staff-avatar-2.jpg',
            performance: 88
        },
        {
            id: 'staff_003',
            name: 'Dewi Lestari',
            role: 'Admin',
            email: 'dewi.lestari@bengkel.com',
            phone: '0817-8901-2345',
            status: 'offline',
            avatar: './resources/staff-avatar-3.jpg',
            performance: 92
        }
    ],
    
    jobs: [
        {
            id: 'job_001',
            customerName: 'Budi Santoso',
            device: 'iPhone 13 Pro',
            problem: 'Screen replacement',
            status: 'pending',
            priority: 'high',
            technician: 'Rizky Pratama',
            estimatedCost: 2500000,
            estimatedTime: '2 hours'
        },
        {
            id: 'job_002',
            customerName: 'Siti Nurhaliza',
            device: 'MacBook Pro 2020',
            problem: 'Battery replacement',
            status: 'in-progress',
            priority: 'medium',
            technician: 'Rizky Pratama',
            estimatedCost: 1800000,
            estimatedTime: '1.5 hours'
        },
        {
            id: 'job_003',
            customerName: 'Ahmad Rahman',
            device: 'Samsung Galaxy S22',
            problem: 'Charging port repair',
            status: 'completed',
            priority: 'low',
            technician: 'Andi Wijaya',
            estimatedCost: 1200000,
            estimatedTime: '1 hour'
        }
    ],
    
    inventory: [
        {
            id: 'inv_001',
            name: 'iPhone 13 Pro Screen',
            category: 'Phone Parts',
            stock: 15,
            minStock: 5,
            price: 1800000,
            supplier: 'Apple Supplier'
        },
        {
            id: 'inv_002',
            name: 'MacBook Pro Battery',
            category: 'Laptop Parts',
            stock: 8,
            minStock: 3,
            price: 1200000,
            supplier: 'Tech Supplier'
        },
        {
            id: 'inv_003',
            name: 'Samsung Charging Port',
            category: 'Phone Parts',
            stock: 25,
            minStock: 10,
            price: 300000,
            supplier: 'Samsung Dealer'
        }
    ]
};

// Global functions for HTML onclick handlers
function openRegistrationModal() {
    RepairShopApp.openRegistrationModal();
}

function closeRegistrationModal() {
    RepairShopApp.closeRegistrationModal();
}

function selectPlan(planType) {
    RepairShopApp.selectPlan(planType);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    RepairShopApp.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RepairShopApp, Utils, MockData };
}