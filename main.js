// Foundr Tech - Main JavaScript File
// Handles all interactive elements, animations, and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initMobileMenu();
    initProjectFilters();
    initProjectModals();
    initStatsCounters();
    initScrollAnimations();
    initSmoothScrolling();
});

// Typewriter Effect for Hero Section
function initTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Ideas',
            'Dreams', 
            'Concepts',
            'Visions',
            'Innovations'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Project Filter System
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: index * 100,
                        easing: 'easeOutQuart'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        scale: 0.8,
                        translateY: -20,
                        duration: 300,
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Project Modal System
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    
    // Project data
    const projectData = {
        restate: {
            title: 'Restate - Construction Equipment Sharing',
            category: 'Mobile App',
            client: 'Startup',
            description: 'A revolutionary shared-economy platform that connects construction equipment owners with contractors who need temporary access to machinery. The platform eliminates the need for inventory management while providing a seamless rental experience.',
            challenge: 'Traditional equipment rental involves complex logistics, high costs, and limited availability. Contractors often face delays due to equipment unavailability, while equipment owners struggle with utilization rates.',
            solution: 'Developed a peer-to-peer rental platform with real-time availability, GPS tracking, secure payments, and comprehensive insurance coverage. The app includes equipment verification, user ratings, and automated billing.',
            technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Stripe API', 'Google Maps API'],
            results: [
                '200+ equipment listings within 3 months of launch',
                '85% utilization rate improvement for equipment owners',
                '60% cost reduction for contractors',
                '4.8/5 user satisfaction rating'
            ],
            image: 'resources/project-restate.jpg'
        },
        bitebox: {
            title: 'BiteBox - College Food Delivery',
            category: 'Mobile App',
            client: 'Startup',
            description: 'A specialized food delivery platform designed exclusively for college campuses, connecting students with campus canteens and nearby restaurants for quick, reliable delivery.',
            challenge: 'College students need fast, affordable food options with delivery to dorms and campus locations. Traditional delivery apps often don\'t serve campus areas effectively.',
            solution: 'Created a campus-focused delivery app with student-friendly pricing, campus navigation, group ordering features, and integration with campus meal plans.',
            technologies: ['Flutter', 'Firebase', 'Stripe', 'Google Maps API', 'Push Notifications'],
            results: [
                '5,000+ active users within first semester',
                'Average delivery time: 18 minutes',
                '25% lower delivery fees than competitors',
                'Available across 12 college campuses'
            ],
            image: 'resources/project-bitebox.jpg'
        },
        pitchbox: {
            title: 'PitchBox - Sports Field Booking',
            category: 'Mobile App',
            client: 'Startup',
            description: 'A comprehensive booking platform that connects sports field owners with players and teams, providing real-time availability and seamless reservation management.',
            challenge: 'Field owners struggle with manual booking management, while players find it difficult to discover and book available fields for their games.',
            solution: 'Built a dual-sided platform with automated booking systems, real-time availability updates, payment processing, and field management tools for owners.',
            technologies: ['React Native', 'GraphQL', 'AWS', 'Stripe', 'Calendar API'],
            results: [
                '150+ sports facilities onboarded',
                '90% booking completion rate',
                '50% reduction in booking management time',
                'Available in 8 major cities'
            ],
            image: 'resources/project-pitchbox.jpg'
        },
        happyschool: {
            title: 'Happy School - Classroom Management',
            category: 'Mobile App',
            client: 'EdTech',
            description: 'An innovative platform that helps teachers improve classroom management through social features, communication tools, and engagement tracking.',
            challenge: 'Teachers need better tools for classroom communication, student engagement, and parent-teacher interaction in the digital age.',
            solution: 'Developed a comprehensive platform with social feeds, messaging, progress tracking, and interactive classroom management features.',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebSocket', 'Pusher'],
            results: [
                '500+ teachers actively using the platform',
                '30% improvement in student engagement',
                '85% parent satisfaction with communication features',
                'Used across 25 schools'
            ],
            image: 'resources/project-happyschool.jpg'
        },
        carocart: {
            title: 'CaroCart - Military Community Delivery',
            category: 'Mobile App',
            client: 'Delivery Service',
            description: 'A specialized hyperlocal delivery service designed for military personnel and families, providing secure delivery of groceries, food, medicines, and essential documents.',
            challenge: 'Military communities need secure, reliable delivery services that understand their unique requirements and security concerns.',
            solution: 'Created a secure delivery platform with military-grade security features, verified delivery personnel, and specialized handling for sensitive items.',
            technologies: ['Flutter', 'Node.js', 'Redis', 'JWT Authentication', 'AES Encryption'],
            results: [
                'Serves 15 military bases',
                '99.5% delivery success rate',
                'Average delivery time: 25 minutes',
                'Security clearance for all delivery personnel'
            ],
            image: 'resources/project-carocart.jpg'
        },
        happyschooldashboard: {
            title: 'Happy School - Teacher Dashboard',
            category: 'Web Platform',
            client: 'EdTech',
            description: 'A comprehensive web dashboard platform that empowers teachers to manage classrooms, track student progress, facilitate parent communication, and create engaging learning experiences through social features and analytics.',
            challenge: 'Teachers need centralized tools to manage multiple classes, monitor student engagement, communicate with parents, share resources, and track academic progress across various subjects and grade levels efficiently.',
            solution: 'Developed a feature-rich web dashboard with class management, grade tracking, attendance monitoring, assignment creation, parent messaging portal, student progress analytics, and social feed for classroom updates and achievements.',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebSocket', 'Pusher', 'Chart.js'],
            results: [
                '500+ teachers actively using the platform',
                '30% improvement in student engagement tracking',
                '85% parent satisfaction with communication features',
                'Used across 25 schools with 10,000+ students'
            ],
            image: 'resources/project-happyschool.jpg'
        },
        gohighlevel: {
            title: 'GoHighLevel SaaS - Business Automation',
            category: 'SaaS Platform',
            client: 'Automation',
            description: 'A comprehensive business automation platform featuring CRM, WhatsApp bots, AI lead qualification, social media management, and SEO-friendly website builders.',
            challenge: 'Startups need affordable, integrated business automation tools that can scale with their growth without requiring multiple subscriptions.',
            solution: 'Developed an all-in-one SaaS platform that combines multiple business automation tools into a single, cohesive solution.',
            technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'Docker'],
            results: [
                '300+ active startup users',
                '40% reduction in operational costs for users',
                '10,000+ automated conversations daily',
                '50+ integrated tools and services'
            ],
            image: 'resources/project-gohighlevel.jpg'
        },
        gcc: {
            title: 'GCC E-Commerce - Tribal Marketplace',
            category: 'E-commerce',
            client: 'Marketplace',
            description: 'An online marketplace that empowers tribal communities and cooperative societies to sell their traditional products to a global audience.',
            challenge: 'Tribal artisans and cooperative societies lack access to modern e-commerce platforms and digital marketing tools to reach broader markets.',
            solution: 'Created a culturally-sensitive e-commerce platform with easy onboarding, cultural storytelling features, and fair trade practices.',
            technologies: ['Magento', 'PHP', 'Elasticsearch', 'Stripe', 'AWS'],
            results: [
                '500+ tribal artisans onboarded',
                '200% increase in artisan income',
                'Products shipped to 25 countries',
                '98% on-time delivery rate'
            ],
            image: 'resources/project-gcc.jpg'
        }
    };
    
    // Open modal when clicking project card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalBody.innerHTML = `
                    <div class="space-y-6">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg">
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-semibold mb-2">Category</h4>
                                <p class="text-gray-300">${project.category}</p>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-2">Client Type</h4>
                                <p class="text-gray-300">${project.client}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-2">Description</h4>
                            <p class="text-gray-300">${project.description}</p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-2">Challenge</h4>
                            <p class="text-gray-300">${project.challenge}</p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-2">Solution</h4>
                            <p class="text-gray-300">${project.solution}</p>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-2">Technologies Used</h4>
                            <div class="flex flex-wrap gap-2">
                                ${project.technologies.map(tech => `<span class="bg-gray-700 px-3 py-1 rounded-full text-sm">${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-2">Results & Impact</h4>
                            <ul class="text-gray-300 space-y-1">
                                ${project.results.map(result => `<li>• ${result}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="pt-6 border-t border-gray-700">
                            <a href="contact.html" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                                Start Similar Project
                            </a>
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}

// Animated Stats Counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                anime({
                    targets: { count: 0 },
                    count: target,
                    duration: 2000,
                    easing: 'easeOutQuart',
                    update: function(anim) {
                        counter.textContent = Math.floor(anim.animatables[0].target.count);
                    }
                });
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .stats-counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart',
                    delay: Math.random() * 200
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for debouncing
function debounce(func, wait) {
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize any responsive components if needed
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}, 250));

// Add loading animation
window.addEventListener('load', function() {
    // Hide any loading screens if present
    document.body.classList.add('loaded');
    
    // Animate hero elements
    anime.timeline()
        .add({
            targets: '.hero-content h1',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutQuart'
        })
        .add({
            targets: '.hero-content p',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutQuart'
        }, '-=500')
        .add({
            targets: '.hero-content .flex',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            easing: 'easeOutQuart'
        }, '-=400');
});