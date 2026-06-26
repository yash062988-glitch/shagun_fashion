document.addEventListener('DOMContentLoaded', () => {
    // === Typewriter Coordinator (Master Clock) ===
    class TypewriterCoordinator {
        constructor() {
            this.instances = [];
            this.cycleDuration = 5500; // 5.5 seconds total cycle
            
            // Durations of each phase in ms
            this.typingDuration = 1500;   // 1.5s
            this.visibleDuration = 2000;  // 2.0s
            this.deletingDuration = 1000; // 1.0s
            this.hiddenDuration = 1000;   // 1.0s
            
            this.startTime = null;
            this.animationFrameId = null;
            this.tick = this.tick.bind(this);
        }
        
        register(instance) {
            if (!this.instances.includes(instance)) {
                this.instances.push(instance);
            }
            if (this.instances.length > 0 && !this.animationFrameId) {
                this.startTime = performance.now();
                this.animationFrameId = requestAnimationFrame(this.tick);
            }
        }
        
        unregister(instance) {
            const idx = this.instances.indexOf(instance);
            if (idx !== -1) {
                this.instances.splice(idx, 1);
            }
            if (this.instances.length === 0 && this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }
        
        tick(now) {
            if (this.instances.length === 0) {
                this.animationFrameId = null;
                return;
            }
            
            const elapsed = now - this.startTime;
            const cycleProgress = elapsed % this.cycleDuration;
            
            let phase = 'typing';
            let progress = 0;
            
            if (cycleProgress < this.typingDuration) {
                phase = 'typing';
                progress = cycleProgress / this.typingDuration;
            } else if (cycleProgress < this.typingDuration + this.visibleDuration) {
                phase = 'visible';
                progress = (cycleProgress - this.typingDuration) / this.visibleDuration;
            } else if (cycleProgress < this.typingDuration + this.visibleDuration + this.deletingDuration) {
                phase = 'deleting';
                progress = (cycleProgress - this.typingDuration - this.visibleDuration) / this.deletingDuration;
            } else {
                phase = 'hidden';
                progress = (cycleProgress - this.typingDuration - this.visibleDuration - this.deletingDuration) / this.hiddenDuration;
            }
            
            this.instances.forEach(instance => {
                instance.update(phase, progress);
            });
            
            this.animationFrameId = requestAnimationFrame(this.tick);
        }
    }

    const coordinator = new TypewriterCoordinator();

    // === Typewriter Animation Engine ===
    class Typewriter {
        constructor(element) {
            this.element = element;
            this.chars = [];
            this.cursor = null;
            this.init();
        }
        
        init() {
            // Clear any pre-existing cursor or chars to avoid duplication
            this.element.querySelectorAll('.tw-char, .tw-cursor').forEach(el => el.remove());
            
            // Wrap plain text nodes recursively
            this.wrapText(this.element);
            
            // Find all tw-char spans
            this.chars = Array.from(this.element.querySelectorAll('.tw-char'));
            
            // Create cursor
            this.cursor = document.createElement('span');
            this.cursor.className = 'tw-cursor';
            
            // Insert cursor initially at the start
            if (this.chars.length > 0) {
                this.element.insertBefore(this.cursor, this.chars[0]);
            } else {
                this.element.appendChild(this.cursor);
            }
        }
        
        wrapText(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                // Preserve spaces/tabs but discard purely formatting line breaks
                if (text.trim() === '' && text.length > 0 && !text.includes('\n')) {
                    // Node is just spacer whitespace
                } else if (text.trim() === '') {
                    return null;
                }
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const span = document.createElement('span');
                    span.className = 'tw-char';
                    span.textContent = char;
                    span.style.opacity = '0';
                    fragment.appendChild(span);
                }
                return fragment;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList.contains('tw-cursor') || node.classList.contains('tw-char')) {
                    return null;
                }
                const children = Array.from(node.childNodes);
                children.forEach(child => {
                    const result = this.wrapText(child);
                    if (result) {
                        node.replaceChild(result, child);
                    }
                });
                return null;
            }
            return null;
        }

        update(phase, progress) {
            const total = this.chars.length;
            if (total === 0) return;

            let visibleCount = 0;
            if (phase === 'typing') {
                visibleCount = Math.floor(progress * (total + 1));
                if (visibleCount > total) visibleCount = total;
            } else if (phase === 'visible') {
                visibleCount = total;
            } else if (phase === 'deleting') {
                visibleCount = Math.floor((1 - progress) * (total + 1));
                if (visibleCount > total) visibleCount = total;
            } else if (phase === 'hidden') {
                visibleCount = 0;
            }

            // Apply state updates to characters
            for (let i = 0; i < total; i++) {
                this.chars[i].style.opacity = (i < visibleCount) ? '1' : '0';
            }

            // Move cursor
            if (visibleCount > 0) {
                const lastChar = this.chars[visibleCount - 1];
                if (this.cursor.previousSibling !== lastChar) {
                    lastChar.insertAdjacentElement('afterend', this.cursor);
                }
            } else {
                if (this.element.firstChild !== this.cursor) {
                    this.element.insertBefore(this.cursor, this.element.firstChild);
                }
            }
        }
        
        destroy() {
            coordinator.unregister(this);
            this.element.querySelectorAll('.tw-char, .tw-cursor').forEach(el => el.remove());
        }
    }

    // Typewriter Manager
    const activeTypewriters = new Map();

    function startTypewriter(element) {
        if (activeTypewriters.has(element)) {
            activeTypewriters.get(element).destroy();
        }
        const tw = new Typewriter(element);
        activeTypewriters.set(element, tw);
        coordinator.register(tw);
    }

    // Start all typewriter animations simultaneously on load
    const typewriterElements = document.querySelectorAll('.tw-target');
    typewriterElements.forEach(el => {
        startTypewriter(el);
    });

    // === Modal & Form Interactivity ===
    const btnPlaceOrder = document.getElementById('btn-place-order');
    const btnContactUs = document.getElementById('btn-contact-us');
    const modalOrder = document.getElementById('modal-order');
    const modalContact = document.getElementById('modal-contact');
    const closeOrder = document.getElementById('close-order');
    const closeContact = document.getElementById('close-contact');
    const orderForm = document.getElementById('order-form');
    const contactForm = document.getElementById('contact-form');

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (btnPlaceOrder && modalOrder) {
        btnPlaceOrder.addEventListener('click', () => openModal(modalOrder));
    }

    if (btnContactUs && modalContact) {
        btnContactUs.addEventListener('click', () => openModal(modalContact));
    }

    if (closeOrder && modalOrder) {
        closeOrder.addEventListener('click', () => closeModal(modalOrder));
    }

    if (closeContact && modalContact) {
        closeContact.addEventListener('click', () => closeModal(modalContact));
    }

    [modalOrder, modalContact].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOrder && modalOrder.classList.contains('active')) {
                closeModal(modalOrder);
            }
            if (modalContact && modalContact.classList.contains('active')) {
                closeModal(modalContact);
            }
        }
    });

    // Form submission overrides with success alerts
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const schoolName = document.getElementById('order-school').value;
            const emailAddress = document.getElementById('order-email').value;
            
            console.log(`Order Inquiry: School=${schoolName}, Email=${emailAddress}`);
            
            const modalContent = orderForm.closest('.modal-content');
            const originalContent = modalContent.innerHTML;
            
            modalContent.innerHTML = `
                <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';">&times;</button>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 64px; margin-bottom: 20px; color: #5F84FC;">✓</div>
                    <h2 class="modal-title" style="margin-bottom: 12px;">Order Inquiry Received!</h2>
                    <p class="modal-text" style="margin-bottom: 24px;">Thank you for reaching out. We have logged your request for <strong>${schoolName}</strong> and will contact you at <strong>${emailAddress}</strong> within 24 hours.</p>
                    <button class="btn btn-filled" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';" style="width: 100%; height: 48px;">Close</button>
                </div>
            `;

            setTimeout(() => {
                modalContent.innerHTML = originalContent;
                bindFormListeners(modalContent);
            }, 3000);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            
            console.log(`Contact Inquiry: Name=${name}`);
            
            const modalContent = contactForm.closest('.modal-content');
            const originalContent = modalContent.innerHTML;
            
            modalContent.innerHTML = `
                <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';">&times;</button>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 64px; margin-bottom: 20px; color: #5F84FC;">✉</div>
                    <h2 class="modal-title" style="margin-bottom: 12px;">Message Sent!</h2>
                    <p class="modal-text" style="margin-bottom: 24px;">Hi <strong>${name}</strong>, thank you for writing to us. Our school apparel consultants will get back to you shortly.</p>
                    <button class="btn btn-filled" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';" style="width: 100%; height: 48px;">Close</button>
                </div>
            `;

            setTimeout(() => {
                modalContent.innerHTML = originalContent;
                bindFormListeners(modalContent);
            }, 3000);
        });
    }

    // Function to re-bind form handlers and typewriter loops when modals reset
    function bindFormListeners(modalContent) {
        const newOrderForm = document.getElementById('order-form');
        const newContactForm = document.getElementById('contact-form');
        
        if (newOrderForm) {
            newOrderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const schoolName = document.getElementById('order-school').value;
                const emailAddress = document.getElementById('order-email').value;
                console.log(`Order Inquiry: School=${schoolName}, Email=${emailAddress}`);
                modalContent.innerHTML = `
                    <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';">&times;</button>
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 64px; margin-bottom: 20px; color: #5F84FC;">✓</div>
                        <h2 class="modal-title" style="margin-bottom: 12px;">Order Inquiry Received!</h2>
                        <p class="modal-text" style="margin-bottom: 24px;">Thank you for reaching out. We have logged your request for <strong>${schoolName}</strong> and will contact you at <strong>${emailAddress}</strong> within 24 hours.</p>
                        <button class="btn btn-filled" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';" style="width: 100%; height: 48px;">Close</button>
                    </div>
                `;
                setTimeout(() => {
                    modalContent.innerHTML = originalContent;
                    bindFormListeners(modalContent);
                }, 3000);
            });
        }
        if (newContactForm) {
            newContactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('contact-name').value;
                console.log(`Contact Inquiry: Name=${name}`);
                modalContent.innerHTML = `
                    <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';">&times;</button>
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="font-size: 64px; margin-bottom: 20px; color: #5F84FC;">✉</div>
                        <h2 class="modal-title" style="margin-bottom: 12px;">Message Sent!</h2>
                        <p class="modal-text" style="margin-bottom: 24px;">Hi <strong>${name}</strong>, thank you for writing to us. Our school apparel consultants will get back to you shortly.</p>
                        <button class="btn btn-filled" onclick="this.closest('.modal-overlay').classList.remove('active'); document.body.style.overflow = '';" style="width: 100%; height: 48px;">Close</button>
                    </div>
                `;
                setTimeout(() => {
                    modalContent.innerHTML = originalContent;
                    bindFormListeners(modalContent);
                }, 3000);
            });
        }
        
        const newCloseOrder = document.getElementById('close-order');
        const newCloseContact = document.getElementById('close-contact');
        
        if (newCloseOrder && modalOrder) {
            newCloseOrder.addEventListener('click', () => closeModal(modalOrder));
        }
        if (newCloseContact && modalContact) {
            newCloseContact.addEventListener('click', () => closeModal(modalContact));
        }

        // Re-initialize typewriter loop on elements inside this modal
        const restoredTargets = modalContent.querySelectorAll('.tw-target');
        restoredTargets.forEach(el => {
            startTypewriter(el);
        });
    }

    // === Flower Animation Controller ===
    const flower = document.querySelector('.rotating-flower');
    if (flower) {
        let entranceStart = null;
        const entranceDuration = 1400; // 1.4 seconds
        
        // Physics / State variables
        let currentMouseX = 0;
        let currentMouseY = 0;
        let currentTiltX = 0;
        let currentTiltY = 0;
        
        let targetMouseX = 0;
        let targetMouseY = 0;
        let targetTiltX = 0;
        let targetTiltY = 0;
        
        let isHovered = false;
        
        // Track mouse position over the entire app container for premium parallax feel
        const container = document.querySelector('.app-container');
        
        if (container) {
            container.addEventListener('mousemove', (e) => {
                const rect = flower.getBoundingClientRect();
                const flowerCenterX = rect.left + rect.width / 2;
                const flowerCenterY = rect.top + rect.height / 2;
                
                const dx = e.clientX - flowerCenterX;
                const dy = e.clientY - flowerCenterY;
                
                // Maximum radius of influence: 600px
                const maxDist = 600;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const factor = dist > 0 ? Math.min(dist / maxDist, 1.0) : 0;
                
                if (dist > 0) {
                    // Parallax displacement: max 15px
                    targetMouseX = (dx / dist) * factor * 15;
                    targetMouseY = (dy / dist) * factor * 15;
                    
                    // Tilt angle: max 3 degrees
                    targetTiltY = (dx / dist) * factor * 3;
                    targetTiltX = -(dy / dist) * factor * 3;
                } else {
                    targetMouseX = 0;
                    targetMouseY = 0;
                    targetTiltY = 0;
                    targetTiltX = 0;
                }
                
                isHovered = true;
            });
            
            container.addEventListener('mouseleave', () => {
                targetMouseX = 0;
                targetMouseY = 0;
                targetTiltX = 0;
                targetTiltY = 0;
                isHovered = false;
            });
        }
        
        function animateFlower(now) {
            if (!entranceStart) entranceStart = now;
            const elapsed = now - entranceStart;
            
            if (elapsed < entranceDuration) {
                // Phase 1: Entrance Animation (runs once)
                const p = elapsed / entranceDuration;
                // premium ease-out exponential curve (no bounce, no overshoot)
                const ease = 1 - Math.pow(2, -10 * p);
                
                const x = 200 * (1 - ease);
                const scale = 0.6 + 0.4 * ease;
                const opacity = ease;
                
                flower.style.opacity = opacity;
                flower.style.transform = `translate3d(${x}px, 0px, 0) scale(${scale})`;
            } else {
                // Ensure final opacity is set when transition finishes
                if (flower.style.opacity !== '1' && !isHovered && currentMouseX === 0) {
                    flower.style.opacity = '1';
                }
                
                // Phase 2: Idle Animation & Mouse Parallax
                const idleTime = now - entranceStart - entranceDuration;
                
                // 1. Floating & Breathing (7s cycle, synced)
                const theta = (idleTime * 2 * Math.PI) / 7000;
                // Move vertically by 8px total (-4px to +4px)
                const floatY = Math.sin(theta) * 4;
                // Scale from 1 to 1.02, starting exactly at 1.0 at theta = 0
                const breatheScale = 1.01 + Math.sin(theta - Math.PI / 2) * 0.01;
                
                // 2. Glow Pulse (4s cycle, subtle drop-shadow oscillation)
                const glowTheta = (idleTime * 2 * Math.PI) / 4000;
                const glowSpread = 30 + Math.sin(glowTheta) * 5;
                const glowAlpha = 0.3 + Math.sin(glowTheta) * 0.06;
                flower.style.filter = `drop-shadow(0 10px ${glowSpread}px rgba(0, 43, 185, ${glowAlpha}))`;
                
                // 3. Smooth interpolation (spring feel) for mouse tracking
                const lerpFactor = 0.08;
                currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
                currentMouseY += (targetMouseY - currentMouseY) * lerpFactor;
                currentTiltX += (targetTiltX - currentTiltX) * lerpFactor;
                currentTiltY += (targetTiltY - currentTiltY) * lerpFactor;
                
                // Combined GPU-accelerated transform with perspective tilt and 20s rotation
                const totalX = currentMouseX;
                const totalY = floatY + currentMouseY;
                const totalScale = breatheScale;
                const rotationAngle = (idleTime * 360) / 20000;
                
                flower.style.transform = `perspective(1000px) translate3d(${totalX}px, ${totalY}px, 0) scale(${totalScale}) rotate(${rotationAngle}deg) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
            }
            
            requestAnimationFrame(animateFlower);
        }
        
        requestAnimationFrame(animateFlower);
    }

    // === Scroll & Load Animation Observer ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05 // Trigger early so page feels responsive and smooth
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it is the grid container, animate its children in a staggered fashion
                if (entry.target.classList.contains('why-grid')) {
                    const gridItems = entry.target.querySelectorAll('.grid-item');
                    gridItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 100); // 100ms stagger delay
                    });
                } else {
                    // Map animationDelay to transitionDelay dynamically to keep inline styles compatible
                    const delay = entry.target.style.animationDelay;
                    if (delay) {
                        entry.target.style.transitionDelay = delay;
                    }
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Target all fade elements and the grid container
    const animateTargets = document.querySelectorAll('.fade-in-up, .fade-in, .why-grid');
    animateTargets.forEach(target => {
        // Skip fade-in elements inside grid items to prevent double triggering (handled by grid item active state)
        if (target.closest('.grid-item')) {
            return;
        }
        scrollObserver.observe(target);
    });

    // === Cursor Light Trail ===
    const trailCanvas = document.createElement('canvas');
    trailCanvas.className = 'cursor-trail-canvas';
    trailCanvas.style.position = 'fixed';
    trailCanvas.style.top = '0';
    trailCanvas.style.left = '0';
    trailCanvas.style.width = '100vw';
    trailCanvas.style.height = '100vh';
    trailCanvas.style.pointerEvents = 'none';
    trailCanvas.style.zIndex = '9999';
    document.body.appendChild(trailCanvas);

    const trailCtx = trailCanvas.getContext('2d');
    
    function resizeTrailCanvas() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeTrailCanvas);
    resizeTrailCanvas();

    const trailPoints = [];
    const maxTrailPoints = 25;
    const trailSparkles = [];
    
    window.addEventListener('mousemove', (e) => {
        trailPoints.push({ x: e.clientX, y: e.clientY });
        if (trailPoints.length > maxTrailPoints) {
            trailPoints.shift();
        }
        // Spawn small glowing sparkles (more dense and premium)
        const numSparkles = Math.floor(Math.random() * 2) + 1; // 1 to 2 sparkles per mouse movement
        for (let k = 0; k < numSparkles; k++) {
            if (Math.random() < 0.65) {
                trailSparkles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 2.5 + 1, // slightly larger sparkles
                    alpha: 1.0,
                    vx: (Math.random() - 0.5) * 2.0, // faster drift
                    vy: (Math.random() - 0.5) * 2.0,
                    decay: Math.random() * 0.02 + 0.015 // stay visible longer
                });
            }
        }
    });

    function drawCursorTrail() {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        
        if (trailPoints.length > 1) {
            // Draw flowing ribbon of white light
            trailCtx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            
            for (let i = 1; i < trailPoints.length; i++) {
                const p1 = trailPoints[i - 1];
                const p2 = trailPoints[i];
                
                const ratio = i / trailPoints.length;
                const alpha = ratio * 0.4; // Fade out towards the tail
                const width = ratio * 6;   // Taper towards the tail
                
                trailCtx.beginPath();
                trailCtx.moveTo(p1.x, p1.y);
                trailCtx.lineTo(p2.x, p2.y);
                trailCtx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                trailCtx.lineWidth = width;
                trailCtx.lineCap = 'round';
                trailCtx.shadowBlur = width * 1.8;
                trailCtx.stroke();
            }
            
            // Smoothly contract the tail when mouse stops
            if (trailPoints.length > 0) {
                trailPoints.shift();
            }
        }
        
        // Update and draw sparkles
        trailCtx.shadowBlur = 0; // Disable shadow for standard particles to optimize performance
        for (let i = trailSparkles.length - 1; i >= 0; i--) {
            const p = trailSparkles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            
            if (p.alpha <= 0) {
                trailSparkles.splice(i, 1);
                continue;
            }
            
            trailCtx.beginPath();
            trailCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            trailCtx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            trailCtx.fill();
        }
        
        requestAnimationFrame(drawCursorTrail);
    }
    
    requestAnimationFrame(drawCursorTrail);
});
