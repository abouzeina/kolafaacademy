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

    panel.innerHTML = `
      <div class="mobileNavHeader">
        <a href="${logo.getAttribute('href')}" class="logo">
          ${logo.innerHTML}
        </a>
        <button class="mobileNavClose" type="button" aria-label="إغلاق القائمة">✕</button>
      </div>
      <div class="mobileNavLinks">${topLinksMarkup}</div>
      <div class="mobileNavSectionTitle">برامجنا التعليمية</div>
      <div class="mobileNavPrograms">${programLinksMarkup}</div>
      <div class="mobileNavActions">
        <a href="${facebookLink}" target="_blank" rel="noopener noreferrer" class="mobileNavSocial">فيسبوك</a>
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-global full-width">تواصل عبر واتساب</a>
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
      
      obj.innerHTML = (hasPlusPrefix ? '+' : '') + currentValue.toLocaleString('ar-EG') + (hasPlusSuffix ? '+' : '');
      
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
      // In RTL, translateX(100%) moves it left-wards if dir="rtl" is handled by browser correctly.
      // Usually, with LTR indices in an RTL container, positive translateX moves it right.
      // We want to move it to the right for the next item (index 1 should show item 2).
      track.style.transform = `translateX(${currentIndex * 100}%)`;
      
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

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

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
});
