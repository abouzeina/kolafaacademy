document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL EFFECT
  const header = document.getElementById('mainHeader');
  
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
        header.classList.remove('unscrolled');
      } else {
        header.classList.add('unscrolled');
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
  }

  // 1.1 SET ACTIVE NAV LINK
  const setActiveNavLink = () => {
    const activeHref = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navLink, .dropdown-link');
    
    navLinks.forEach(link => link.classList.remove('activeLink'));

    let found = false;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === activeHref) {
        link.classList.add('activeLink');
        found = true;
        
        const parentDropdown = link.closest('.has-dropdown');
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector('.navLink');
          if (parentLink) parentLink.classList.add('activeLink');
        }
      }
    });

    if (!found) {
      const homeLink = document.querySelector('.navLink[href="index.html"]');
      if (homeLink) homeLink.classList.add('activeLink');
    }
  };
  setActiveNavLink();

  // 1.2 HERO PARTICLES
  const initParticles = () => {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 320;
    // Mostly white, with elegant hints of gold and light green
    const colors = ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)', 'rgba(200, 166, 0, 0.6)', 'rgba(120, 190, 32, 0.4)'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random properties
      const size = Math.random() * 5 + 3; // 3px to 8px
      const left = Math.random() * 100; // 0% to 100% width
      const duration = Math.random() * 15 + 10; // 10s to 25s
      const delay = Math.random() * 20; // Start offset
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.backgroundColor = color;
      particle.style.color = color; // Used for box-shadow glow
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `-${delay}s`; // Negative delay to start immediately mid-air

      container.appendChild(particle);
    }
  };
  initParticles();

  // 1.5 MOBILE MENU
  const initMobileMenu = () => {
    const menuButton = document.querySelector('.mobileMenuBtn');
    const nav = document.querySelector('.nav');
    const desktopActions = document.querySelector('.desktopActions');
    const logo = document.querySelector('.logo');

    if (!menuButton || !nav || !desktopActions || !logo) return;

    const activeHref = window.location.pathname.split('/').pop() || 'index.html';
    const programLinks = nav.querySelectorAll('.dropdown-menu .dropdown-link');
    const topLevelLinks = Array.from(nav.children)
      .map((item) => item.querySelector?.('.navLink') || item)
      .filter((item) => item && item.classList?.contains('navLink'));

    const overlay = document.createElement('div');
    overlay.className = 'mobileNavOverlay';
    overlay.setAttribute('aria-hidden', 'true');

    const panel = document.createElement('div');
    panel.className = 'mobileNavPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'القائمة الرئيسية');

    const topLinksMarkup = topLevelLinks
      .map((link) => {
        const href = link.getAttribute('href') || '#';
        const isActive = href === activeHref ? ' is-active' : '';
        return `<a href="${href}" class="mobileNavLink${isActive}">${link.textContent.trim()}</a>`;
      })
      .join('');

    const programLinksMarkup = Array.from(programLinks)
      .map((link) => {
        const href = link.getAttribute('href') || '#';
        const isActive = href === activeHref ? ' is-active' : '';
        return `<a href="${href}" class="${isActive.trim()}">${link.textContent.trim()}</a>`;
      })
      .join('');

    const facebookLink = desktopActions.querySelector('.fbNavBtn')?.getAttribute('href') || '#';
    const whatsappLink = desktopActions.querySelector('.header-wa-btn')?.getAttribute('href') || '#';

    // Detect language switch info
    const langSwitchEl = desktopActions.querySelector('.lang-switch-btn');
    const langSwitchHref = langSwitchEl?.getAttribute('href') || '#';
    const langSwitchText = langSwitchEl?.textContent?.trim() || 'English';
    const isEnglish = document.documentElement.dir === 'ltr';
    const langLabel = isEnglish ? '🇸🇦 عربي' : '🇬🇧 English';

    panel.innerHTML = `
      <div class="mobileNavHeader">
        <a href="${logo.getAttribute('href')}" class="logo">
          ${logo.innerHTML}
        </a>
        <button class="mobileNavClose" type="button" aria-label="إغلاق القائمة">✕</button>
      </div>
      <div class="mobileNavLinks">${topLinksMarkup}</div>
      <div class="mobileNavSectionTitle">${isEnglish ? 'Our Programs' : 'برامجنا التعليمية'}</div>
      <div class="mobileNavPrograms">${programLinksMarkup}</div>
      <div class="mobileNavActions">
        <a href="${langSwitchHref}" class="mobile-lang-btn">${langLabel}</a>
        <a href="${facebookLink}" target="_blank" rel="noopener noreferrer" class="mobileNavSocial">${isEnglish ? 'Facebook' : 'فيسبوك'}</a>
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-global full-width">${isEnglish ? 'Contact via WhatsApp' : 'تواصل عبر واتساب'}</a>
      </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const closeButton = panel.querySelector('.mobileNavClose');

    const closeMenu = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('mobile-menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('mobile-menu-open');
      menuButton.setAttribute('aria-expanded', 'true');
    };

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'mobile-nav');
    panel.id = 'mobile-nav';

    menuButton.addEventListener('click', () => {
      if (overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeMenu();
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) closeMenu();
    });
  };

  initMobileMenu();

  // 2. SCROLL ANIMATIONS & LUXURY STAGGER
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Triggers slightly before element enters
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Handle main animated element
        entry.target.classList.add('is-visible');
        
        // Handle staggered children (if any)
        const staggerChildren = entry.target.querySelectorAll('.fade-up-luxury');
        staggerChildren.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('is-visible');
          }, index * 100); // 100ms stagger between children
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll, .home-program-card, .gateway, .teacherCard, .videoCard');
  animatedElements.forEach(el => {
    // Add default hidden state classes via CSS to these if needed, 
    // but the observer will just drop the '.is-visible' class gracefully.
    el.classList.add('fade-up-luxury'); // Ensures all tracked items have a base luxury fade
    observer.observe(el);
  });

  // 2.5 NUMBER COUNTERS (Luxury Count-up)
  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOutProg = 1 - Math.pow(1 - progress, 3);
      
      let currentValue = Math.floor(easeOutProg * (end - start) + start);
      
      // Preserve the '+' if it existed in the text
      const hasPlusPrefix = obj.dataset.originalText.startsWith('+');
      const hasPlusSuffix = obj.dataset.originalText.endsWith('+');
      
      const locale = document.documentElement.dir === 'ltr' ? 'en-US' : 'ar-EG';
      obj.innerHTML = (hasPlusPrefix ? '+' : '') + currentValue.toLocaleString(locale) + (hasPlusSuffix ? '+' : '');
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = obj.dataset.originalText; // Ensure exact final value
      }
    };
    window.requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        el.dataset.originalText = text;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (!isNaN(number)) {
          animateValue(el, 0, number, 2000); // 2 second count up
        }
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.sealNumber, .statBlockTitle, .trustValue').forEach(el => {
    counterObserver.observe(el);
  });

  // 3. ACCORDION LOGIC (Pricing Page Folios)
  const folioButtons = document.querySelectorAll('.folioHeaderButton');
  folioButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const contentWrapper = document.getElementById(targetId);
      
      const isOpen = contentWrapper.classList.contains('open');

      // Close all first to match Next.js single-open state
      document.querySelectorAll('.folioContentWrapper').forEach(wrapper => {
        wrapper.style.height = '0';
        wrapper.classList.remove('open');
      });
      folioButtons.forEach(btn => btn.classList.remove('active'));

      if (!isOpen) {
        // Open
        const content = contentWrapper.querySelector('.folioContent');
        contentWrapper.style.height = content.scrollHeight + 'px';
        contentWrapper.classList.add('open');
        button.classList.add('active');
      } else {
        // Close
        contentWrapper.style.height = '0';
        contentWrapper.classList.remove('open');
        button.classList.remove('active');
      }
    });
  });

  // 4. PLAYABLE VIDEO LOGIC (Legacy Page)
  const extractVideoInfo = (urlOrId) => {
    if (!urlOrId || urlOrId.includes('ضع_رابط')) return null;
    
    let videoId = urlOrId;
    let provider = 'youtube';
    let embedUrl = '';

    // Facebook Logic
    if (videoId.includes('facebook.com') || videoId.includes('fb.watch')) {
      provider = 'facebook';
      // Create fb embed URL
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoId)}&show_text=false&autoplay=1`;
      return { id: videoId, provider, embedUrl };
    }

    // YouTube Logic
    if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
      try {
        const url = new URL(videoId);
        if (url.hostname.includes('youtube.com')) {
          videoId = url.searchParams.get('v') || videoId;
        } else if (url.hostname.includes('youtu.be')) {
          videoId = url.pathname.slice(1) || videoId;
        }
      } catch (e) {
        console.error("Invalid URL format");
      }
    }
    
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    return { id: videoId, provider, embedUrl };
  };

  const playableVideos = document.querySelectorAll('.playable-video');
  
  playableVideos.forEach(videoEl => {
    const rawId = videoEl.getAttribute('data-video-id');
    const videoInfo = extractVideoInfo(rawId);
    
    // Pre-load YouTube thumbnail if a valid ID/URL exists
    if (videoInfo && videoInfo.provider === 'youtube') {
      const thumbEl = videoEl.querySelector('.thumbnailImage, .cardThumbnail');
      if (thumbEl) {
        thumbEl.style.backgroundImage = `url('https://img.youtube.com/vi/${videoInfo.id}/hqdefault.jpg')`;
        thumbEl.style.backgroundSize = 'cover';
        thumbEl.style.backgroundPosition = 'center';
      }
    }
    // Note: Facebook does not provide unauthenticated image endpoints for thumbnails, 
    // so facebook thumbnails will require manual CSS background setting if needed.

    videoEl.addEventListener('click', () => {
      if (!videoInfo) return;

      const title = videoEl.getAttribute('data-title') || 'Video';
      
      const iframeContainer = document.createElement('div');
      iframeContainer.className = 'iframeContainer';
      
      const iframe = document.createElement('iframe');
      iframe.className = 'iframe';
      iframe.src = videoInfo.embedUrl;
      iframe.title = title;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      
      iframeContainer.appendChild(iframe);
      
      videoEl.innerHTML = '';
      videoEl.appendChild(iframeContainer);
      videoEl.style.cursor = 'default';
    });
  });

  // 5. TEACHERS FILTER LOGIC
  const filterButtons = document.querySelectorAll('#teacherFilters .filterBtn');
  const teacherCards = document.querySelectorAll('#teachersGrid .teacherCard');

  if (filterButtons.length > 0 && teacherCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterButtons.forEach(b => b.classList.remove('filterBtnActive'));
        // Add to clicked
        btn.classList.add('filterBtnActive');

        const filterValue = btn.getAttribute('data-filter');

        teacherCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'flex';
          } else {
            const gender = card.getAttribute('data-gender') || '';
            const subjects = card.getAttribute('data-subjects') || '';
            const audiences = card.getAttribute('data-audiences') || '';

            // Check if filter matches any of the card's attributes
            if (
              gender === filterValue || 
              subjects.includes(filterValue) || 
              audiences.includes(filterValue)
            ) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // 6. PRICING TOGGLE LOGIC
  const pricingData = {
    '30': {
      '2days': { usd: 36, gbp: 30, cad: 50, aud: 55, sessions: 8, name: 'يومان أسبوعيًا' },
      '3days': { usd: 50, gbp: 40, cad: 65, aud: 70, sessions: 12, name: '3 أيام أسبوعيًا' },
      '4days': { usd: 65, gbp: 50, cad: 85, aud: 90, sessions: 16, name: '4 أيام أسبوعيًا' },
      '5days': { usd: 75, gbp: 60, cad: 100, aud: 105, sessions: 20, name: '5 أيام أسبوعيًا' }
    },
    '45': {
      '2days': { usd: 54, gbp: 45, cad: 75, aud: 80, sessions: 8, name: 'يومان أسبوعيًا' },
      '3days': { usd: 75, gbp: 60, cad: 96, aud: 100, sessions: 12, name: '3 أيام أسبوعيًا' },
      '4days': { usd: 96, gbp: 75, cad: 130, aud: 135, sessions: 16, name: '4 أيام أسبوعيًا' },
      '5days': { usd: 113, gbp: 90, cad: 150, aud: 160, sessions: 20, name: '5 أيام أسبوعيًا' }
    },
    '60': {
      '2days': { usd: 72, gbp: 60, cad: 96, aud: 100, sessions: 8, name: 'يومان أسبوعيًا' },
      '3days': { usd: 100, gbp: 80, cad: 130, aud: 135, sessions: 12, name: '3 أيام أسبوعيًا' },
      '4days': { usd: 130, gbp: 100, cad: 170, aud: 180, sessions: 16, name: '4 أيام أسبوعيًا' },
      '5days': { usd: 150, gbp: 120, cad: 200, aud: 210, sessions: 20, name: '5 أيام أسبوعيًا' }
    }
  };

  const toggleButtons = document.querySelectorAll('.duration-toggle .toggle-btn');
  const phoneNumber = "201556509755";

  if (toggleButtons.length > 0) {
    const updatePricing = (duration) => {
      const data = pricingData[duration];
      
      // Update each plan card instantly
      Object.keys(data).forEach(planId => {
        const plan = data[planId];
        
        // Update prices
        const usdEl = document.getElementById(`price-${planId}-usd`);
        const gbpEl = document.getElementById(`price-${planId}-gbp`);
        const cadEl = document.getElementById(`price-${planId}-cad`);
        const audEl = document.getElementById(`price-${planId}-aud`);
        
        if (usdEl) usdEl.textContent = plan.usd;
        if (gbpEl) gbpEl.textContent = plan.gbp;
        if (cadEl) cadEl.textContent = plan.cad;
        if (audEl) audEl.textContent = plan.aud;

        // Update WhatsApp link
        const waBtn = document.getElementById(`wa-${planId}`);
        if (waBtn) {
          const message = encodeURIComponent(`السلام عليكم، أود الاشتراك في باقة "${plan.name}" لمدة ${duration} دقيقة (بإجمالي ${plan.sessions} حصة شهرياً).`);
          waBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
        }
      });

      // Update dynamic duration text in features
      document.querySelectorAll('.dynamic-duration').forEach(el => {
        el.textContent = duration;
      });
    };

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Switch active class
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update content
        const duration = btn.getAttribute('data-duration');
        updatePricing(duration);
      });
    });

    // Initialize with default (30 mins)
    updatePricing('30');
  }

  // 7. PROGRAM TABS LOGIC
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to current
        btn.classList.add('active');
        const targetPane = document.getElementById(`tab-${targetTab}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // 8. TESTIMONIALS SLIDER LOGIC
  const initTestimonialSlider = () => {
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.querySelector('.sliderArrow.prev');
    const nextBtn = document.querySelector('.sliderArrow.next');
    const items = document.querySelectorAll('.testimonialItem');
    
    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const itemsCount = items.length;

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < itemsCount; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    const updateSlider = () => {
      const isEn = document.documentElement.lang === 'en';
      const directionMultiplier = isEn ? -1 : 1;
      track.style.transform = `translateX(${currentIndex * 100 * directionMultiplier}%)`;
      
      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % itemsCount;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + itemsCount) % itemsCount;
      updateSlider();
    };

    if (nextBtn) nextBtn.addEventListener('click', prevSlide);
    if (prevBtn) prevBtn.addEventListener('click', nextSlide);

    // Auto rotate every 8s
    let autoSlideInterval = setInterval(nextSlide, 8000);

    const resetInterval = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 8000);
    };

    [prevBtn, nextBtn].forEach(btn => {
      if (btn) btn.addEventListener('click', resetInterval);
    });
    dots.forEach(dot => dot.addEventListener('click', resetInterval));
  };

  initTestimonialSlider();

  // 9. CONTACT FORM TO WHATSAPP
  const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const whatsappPhone = '201556509755';

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const fullName = (formData.get('fullName') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const country = (formData.get('country') || '').toString().trim();
      const interest = (formData.get('interest') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const isEn = document.documentElement.lang === 'en';
      let whatsappMessage = '';

      if (isEn) {
        whatsappMessage = [
          'Hello, I would like to contact Kholafa Academy.',
          '',
          `Name: ${fullName}`,
          `Phone: ${phone}`,
          `Country: ${country}`,
          `Interest: ${interest}`,
          `Message: ${message || 'None'}`
        ].join('\n');
      } else {
        whatsappMessage = [
          'السلام عليكم، أود التواصل مع إدارة الأكاديمية.',
          '',
          `الاسم: ${fullName}`,
          `رقم الهاتف: ${phone}`,
          `الدولة: ${country}`,
          `نوع الطلب: ${interest}`,
          `تفاصيل إضافية: ${message || 'لا يوجد'}`
        ].join('\n');
      }

      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  };

  // 10. FREE TRIAL MODAL (INJECTED)
  const initFreeTrialModal = () => {
    const isEn = document.documentElement.lang === 'en';
    
    const arHtml = `
      <button class="btn-free-trial-float" id="btnFreeTrialFloat" aria-label="احجز حصتك المجانية الان">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        حجز الحصة المجانية الان
      </button>

      <div class="free-trial-modal-overlay" id="freeTrialModalOverlay">
        <div class="free-trial-modal">
          <button class="ft-close-btn" id="ftCloseBtn" aria-label="إغلاق">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="ft-form-side">
            <h3 class="ft-title">احجز حصتك المجانية</h3>
            <p class="ft-desc">املأ النموذج وسيتم التواصل معك لتحديد موعد حصتك التجريبية مع أفضل معلمينا المعتمدين.</p>
            
            <form id="freeTrialForm">
              <div class="ft-form-group">
                <input type="text" name="ftName" class="ft-input" placeholder="الاسم بالكامل (مثال: أحمد محمد)" required>
              </div>
              <div class="ft-form-group">
                <input type="email" name="ftEmail" class="ft-input" placeholder="البريد الإلكتروني (مثال: ahmed@gmail.com)" required>
              </div>
              <div class="ft-form-group">
                <input type="tel" name="ftPhone" class="ft-input" placeholder="رقم الهاتف أو الواتساب (مطلوب)" required>
              </div>
              <div class="ft-form-group">
                <select name="ftCourse" class="ft-input ft-select" required>
                  <option value="" disabled selected>اختر البرنامج التدريبي</option>
                  <option value="أساسيات القراءة">أساسيات القراءة</option>
                  <option value="أحكام التجويد">أحكام التجويد</option>
                  <option value="حفظ ومراجعة القرآن">حفظ ومراجعة القرآن</option>
                  <option value="الإجازة والسند">الإجازة والسند</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                  <option value="الدراسات الإسلامية">الدراسات الإسلامية</option>
                </select>
              </div>
              <div class="ft-form-group">
                <select name="ftPackage" class="ft-input ft-select">
                  <option value="" disabled selected>اختر الباقة السعرية (اختياري)</option>
                  <optgroup label="باقات 30 دقيقة للحصة">
                    <option value="يومان أسبوعيًا - 30 دقيقة ($36 شهرياً)">يومان أسبوعيًا ($36 شهرياً)</option>
                    <option value="3 أيام أسبوعيًا - 30 دقيقة ($50 شهرياً)">3 أيام أسبوعيًا ($50 شهرياً)</option>
                    <option value="4 أيام أسبوعيًا - 30 دقيقة ($65 شهرياً)">4 أيام أسبوعيًا ($65 شهرياً)</option>
                    <option value="5 أيام أسبوعيًا - 30 دقيقة ($75 شهرياً)">5 أيام أسبوعيًا ($75 شهرياً)</option>
                  </optgroup>
                  <optgroup label="باقات 45 دقيقة للحصة">
                    <option value="يومان أسبوعيًا - 45 دقيقة ($54 شهرياً)">يومان أسبوعيًا ($54 شهرياً)</option>
                    <option value="3 أيام أسبوعيًا - 45 دقيقة ($75 شهرياً)">3 أيام أسبوعيًا ($75 شهرياً)</option>
                    <option value="4 أيام أسبوعيًا - 45 دقيقة ($96 شهرياً)">4 أيام أسبوعيًا ($96 شهرياً)</option>
                    <option value="5 أيام أسبوعيًا - 45 دقيقة ($113 شهرياً)">5 أيام أسبوعيًا ($113 شهرياً)</option>
                  </optgroup>
                  <optgroup label="باقات 60 دقيقة للحصة">
                    <option value="يومان أسبوعيًا - 60 دقيقة ($72 شهرياً)">يومان أسبوعيًا ($72 شهرياً)</option>
                    <option value="3 أيام أسبوعيًا - 60 دقيقة ($100 شهرياً)">3 أيام أسبوعيًا ($100 شهرياً)</option>
                    <option value="4 أيام أسبوعيًا - 60 دقيقة ($130 شهرياً)">4 أيام أسبوعيًا ($130 شهرياً)</option>
                    <option value="5 أيام أسبوعيًا - 60 دقيقة ($150 شهرياً)">5 أيام أسبوعيًا ($150 شهرياً)</option>
                  </optgroup>
                  <option value="غير محدد / أحتاج مساعدة">غير محدد / أحتاج مساعدة</option>
                </select>
              </div>
              <div class="ft-form-group">
                <textarea name="ftNotes" class="ft-input" placeholder="ملاحظات إضافية (اختياري)"></textarea>
              </div>
              <button type="submit" class="ft-submit-btn">
                تقديم الطلب الآن
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
          
          <div class="ft-image-side">
            <img src="${isEn ? '../assets/free-trial-img.webp' : 'assets/free-trial-img.webp'}" alt="الحصة المجانية - أكاديمية الخلفاء الراشدين">
          </div>
        </div>
      </div>
    `;

    const enHtml = `
      <button class="btn-free-trial-float" id="btnFreeTrialFloat" aria-label="Book Free Trial Now">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        Book Free Trial
      </button>

      <div class="free-trial-modal-overlay" id="freeTrialModalOverlay">
        <div class="free-trial-modal">
          <button class="ft-close-btn" id="ftCloseBtn" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="ft-form-side">
            <h3 class="ft-title">Book Your Free Trial</h3>
            <p class="ft-desc">Fill out the form and we will contact you to schedule your free trial lesson with our certified tutors.</p>
            
            <form id="freeTrialForm">
              <div class="ft-form-group">
                <input type="text" name="ftName" class="ft-input" placeholder="Full Name (e.g. Ahmed Ali)" required>
              </div>
              <div class="ft-form-group">
                <input type="email" name="ftEmail" class="ft-input" placeholder="Email Address (e.g. ahmed@gmail.com)" required>
              </div>
              <div class="ft-form-group">
                <input type="tel" name="ftPhone" class="ft-input" placeholder="Phone/WhatsApp Number (required)" required>
              </div>
              <div class="ft-form-group">
                <select name="ftCourse" class="ft-input ft-select" required>
                  <option value="" disabled selected>Select Program</option>
                  <option value="Reading Basics">Reading Basics</option>
                  <option value="Tajweed Rules">Tajweed Rules</option>
                  <option value="Quran Memorization">Quran Memorization</option>
                  <option value="Ijazah & Sanad">Ijazah & Sanad</option>
                  <option value="Arabic Language">Arabic Language</option>
                  <option value="Islamic Studies">Islamic Studies</option>
                </select>
              </div>
              <div class="ft-form-group">
                <select name="ftPackage" class="ft-input ft-select">
                  <option value="" disabled selected>Select Pricing Package (Optional)</option>
                  <optgroup label="30 Minutes/Session">
                    <option value="2 days/week - 30 mins ($36/mo)">2 days/week ($36/mo)</option>
                    <option value="3 days/week - 30 mins ($50/mo)">3 days/week ($50/mo)</option>
                    <option value="4 days/week - 30 mins ($65/mo)">4 days/week ($65/mo)</option>
                    <option value="5 days/week - 30 mins ($75/mo)">5 days/week ($75/mo)</option>
                  </optgroup>
                  <optgroup label="45 Minutes/Session">
                    <option value="2 days/week - 45 mins ($54/mo)">2 days/week ($54/mo)</option>
                    <option value="3 days/week - 45 mins ($75/mo)">3 days/week ($75/mo)</option>
                    <option value="4 days/week - 45 mins ($96/mo)">4 days/week ($96/mo)</option>
                    <option value="5 days/week - 45 mins ($113/mo)">5 days/week ($113/mo)</option>
                  </optgroup>
                  <optgroup label="60 Minutes/Session">
                    <option value="2 days/week - 60 mins ($72/mo)">2 days/week ($72/mo)</option>
                    <option value="3 days/week - 60 mins ($100/mo)">3 days/week ($100/mo)</option>
                    <option value="4 days/week - 60 mins ($130/mo)">4 days/week ($130/mo)</option>
                    <option value="5 days/week - 60 mins ($150/mo)">5 days/week ($150/mo)</option>
                  </optgroup>
                  <option value="Not decided / Need help">Not decided / Need help</option>
                </select>
              </div>
              <div class="ft-form-group">
                <textarea name="ftNotes" class="ft-input" placeholder="Additional Notes (Optional)"></textarea>
              </div>
              <button type="submit" class="ft-submit-btn">
                Submit Request
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
          
          <div class="ft-image-side">
            <img src="${isEn ? '../assets/free-trial-img.webp' : 'assets/free-trial-img.webp'}" alt="Free Trial - Kholafa Academy">
          </div>
        </div>
      </div>
    `;

    // Append to body
    document.body.insertAdjacentHTML('beforeend', isEn ? enHtml : arHtml);

    // Elements
    const openBtn = document.getElementById('btnFreeTrialFloat');
    const closeBtn = document.getElementById('ftCloseBtn');
    const overlay = document.getElementById('freeTrialModalOverlay');
    const form = document.getElementById('freeTrialForm');

    // Logic
    const openModal = () => overlay.classList.add('active');
    const closeModal = () => overlay.classList.remove('active');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Form Submit (WhatsApp)
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('ftName');
      const email = formData.get('ftEmail');
      const phone = formData.get('ftPhone');
      const course = formData.get('ftCourse');
      const packageOpt = formData.get('ftPackage') || (isEn ? 'Not specified' : 'لم يُحدد');
      const notes = formData.get('ftNotes') || (isEn ? 'None' : 'لا يوجد');

      const whatsappPhone = '201556509755';
      let msg = '';
      if (isEn) {
        msg = [
          'Hello, I would like to book a free trial lesson.',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Program: ${course}`,
          `Preferred Package: ${packageOpt}`,
          `Notes: ${notes}`
        ].join('\n');
      } else {
        msg = [
          'السلام عليكم، أود حجز حصة تجريبية مجانية.',
          '',
          `الاسم: ${name}`,
          `البريد: ${email}`,
          `رقم الهاتف: ${phone}`,
          `البرنامج: ${course}`,
          `الباقة المفضلة: ${packageOpt}`,
          `ملاحظات: ${notes}`
        ].join('\n');
      }

      window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(msg)}`, '_blank');
      closeModal();
      form.reset();
    });
  };

  initFreeTrialModal();

  initContactForm();

  // 11. AI CHATBOT WIDGET
  const initChatbot = () => {
    const isEn = document.documentElement.lang === 'en';
    
    // UI Text
    const texts = {
      title: isEn ? 'Kholafa Assistant' : 'مساعد الخلفاء',
      status: isEn ? 'Online' : 'متصل الآن',
      inputPlaceholder: isEn ? 'Type your message...' : 'اكتب رسالتك هنا...',
      welcomeMsg: isEn 
        ? 'Hello! I am the Kholafa Academy Assistant. How can I help you today?' 
        : 'أهلاً بك! أنا المساعد الآلي لأكاديمية الخلفاء. كيف يمكنني مساعدتك اليوم؟',
      fallbackMsg: isEn
        ? 'Please contact our customer service directly via WhatsApp for more details.'
        : 'يرجى التواصل مع خدمة العملاء مباشرة عبر واتساب لمزيد من التفاصيل الدقيقة.',
      replies: isEn
        ? [
            { text: 'Programs', query: 'programs' },
            { text: 'Pricing', query: 'pricing' },
            { text: 'Contact Human', query: 'whatsapp' }
          ]
        : [
            { text: 'البرامج المتاحة', query: 'البرامج' },
            { text: 'الأسعار والباقات', query: 'الأسعار' },
            { text: 'تحدث مع موظف', query: 'واتساب' }
          ]
    };

    const chatbotHtml = `
      <div class="chatbot-widget" id="chatbotWidget">
        <div class="chatbot-panel" id="chatbotPanel">
          <div class="chatbot-header">
            <div class="bot-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
            </div>
            <div class="bot-info">
              <h4>${texts.title}</h4>
              <p><span class="status-dot"></span> ${texts.status}</p>
            </div>
          </div>
          <div class="chatbot-messages" id="chatbotMessages">
            <div class="chat-msg bot">${texts.welcomeMsg}</div>
            <div class="chat-quick-replies">
              ${texts.replies.map(r => `<button class="quick-reply-btn" data-query="${r.query}">${r.text}</button>`).join('')}
            </div>
          </div>
          <div class="chatbot-input-area">
            <input type="text" class="chatbot-input" id="chatbotInput" placeholder="${texts.inputPlaceholder}" />
            <button class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
        <button class="chatbot-btn" id="chatbotToggleBtn" aria-label="Toggle Chat">
          <svg class="chat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <svg class="close-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHtml);

    const toggleBtn = document.getElementById('chatbotToggleBtn');
    const panel = document.getElementById('chatbotPanel');
    const messagesContainer = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('active');
      toggleBtn.classList.toggle('open');
      if(panel.classList.contains('active')) {
        input.focus();
      }
    });

    const addMessage = (text, isUser = false) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
      // Allow HTML in bot messages for links
      if(isUser) {
        msgDiv.textContent = text;
      } else {
        msgDiv.innerHTML = text;
      }
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const handleBotResponse = (query) => {
      const q = query.toLowerCase();
      let response = texts.fallbackMsg;

      if(q.includes('سعر') || q.includes('اسعار') || q.includes('باقات') || q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('بكم')) {
        response = isEn 
          ? 'Our plans start from $36/month. You can view all our packages on the <a href="pricing.html" style="color:var(--color-primary-dark); font-weight:bold;">Pricing Page</a>.'
          : 'تبدأ باقاتنا من 36 دولار شهرياً. يمكنك الاطلاع على كافة الأسعار عبر <a href="pricing.html" style="color:var(--color-primary-dark); font-weight:bold;">صفحة الأسعار</a>.';
      } else if (q.includes('برامج') || q.includes('تحفيظ') || q.includes('تجويد') || q.includes('program') || q.includes('courses')) {
        response = isEn
          ? 'We offer various programs including Quran Reading, Tajweed, Memorization, Ijazah, and Arabic Language. Check our <a href="programs.html" style="color:var(--color-primary-dark); font-weight:bold;">Programs Page</a>.'
          : 'نقدم برامج متنوعة مثل: أساسيات القراءة، التجويد، الحفظ، الإجازة، واللغة العربية. شاهد التفاصيل في <a href="programs.html" style="color:var(--color-primary-dark); font-weight:bold;">صفحة البرامج</a>.';
      } else if (q.includes('واتس') || q.includes('تواصل') || q.includes('whatsapp') || q.includes('human') || q.includes('contact') || q.includes('موظف')) {
        response = isEn
          ? 'You can chat with our team directly on WhatsApp here: <a href="https://wa.me/201556509755" target="_blank" style="color:#25D366; font-weight:bold;">Click here to open WhatsApp</a>.'
          : 'يمكنك التحدث مع فريقنا مباشرة عبر واتساب من هنا: <a href="https://wa.me/201556509755" target="_blank" style="color:#25D366; font-weight:bold;">اضغط هنا لفتح الواتساب</a>.';
      }

      setTimeout(() => {
        addMessage(response, false);
      }, 500);
    };

    const handleSend = () => {
      const text = input.value.trim();
      if(!text) return;
      
      addMessage(text, true);
      input.value = '';
      
      // Hide quick replies if they exist
      const qrDiv = messagesContainer.querySelector('.chat-quick-replies');
      if (qrDiv) qrDiv.style.display = 'none';

      handleBotResponse(text);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') handleSend();
    });

    // Delegate quick replies
    document.addEventListener('click', (e) => {
      if(e.target && e.target.classList.contains('quick-reply-btn')) {
        const query = e.target.getAttribute('data-query');
        const text = e.target.textContent;
        addMessage(text, true);
        e.target.parentElement.style.display = 'none';
        handleBotResponse(query);
      }
    });
  };

  initChatbot();
});
