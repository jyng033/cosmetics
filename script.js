// script.js

// ===== 다국어 번역 사전 =====
const translations = {
  ko: {
    // 히어로 슬라이드 1
    'hero-1-title': '자연 그대로의 아름다움<br><span class="highlight">Be Natural</span>, 비건 뷰티 쇼핑몰',
    'hero-1-desc': '동물실험 없는 순수한 스킨케어, 헤어케어, 바디케어',
    'hero-1-btn': '베스트셀러 보기',
    // 히어로 슬라이드 2
    'hero-2-title': '피부에도 착하고<br><span class="highlight">지구에도 착한</span> 비건 뷰티',
    'hero-2-desc': '식물 유래 원료로 만든 순수한 스킨케어',
    'hero-2-btn': '브랜드 스토리',
    // 히어로 슬라이드 3
    'hero-3-title': '첫 구매 고객<br><span class="highlight">20% 할인</span> 혜택',
    'hero-3-desc': '지금 가입하고 비건 뷰티를 시작하세요',
    'hero-3-btn': '회원가입 하기',
    // 소개 섹션
    'intro-title': '피부에도 착하고, 지구에도 착한<br>비건 뷰티를 시작하세요.',
    'intro-desc': 'Be Natural이 약속하는 세 가지 원칙',
    'step-1': '100% 동물실험 없는 크루얼티프리 인증 제품만 취급합니다',
    'step-2': '식물 유래 원료와 자연 성분으로 피부 자극을 최소화합니다',
    'step-3': '친환경 패키지로 포장부터 배송까지 지구를 생각합니다',
    // 가치 제안
    'vp-title': '화학 성분 대신,<br><span class="highlight">자연의 힘</span>으로 아름다워지세요.',
    // 베스트셀러
    'products-desc': '고객님들이 가장 사랑하는 비건 뷰티 아이템',
    // 강점
    'strength-title': 'Be Natural을 선택해야 하는 이유',
    'str-1-title': '100% 비건 인증',
    'str-1-desc': '한국비건인증원 및 국제 비건 인증을<br>획득한 제품만 판매합니다.',
    'str-2-title': '크루얼티프리',
    'str-2-desc': '어떤 과정에서도 동물실험을 하지 않는<br>윤리적인 뷰티를 지향합니다.',
    'str-3-title': '친환경 패키징',
    'str-3-desc': '재활용 가능한 용기와 생분해 포장재로<br>환경 부담을 최소화합니다.',
    // 카테고리
    'category-title': '카테고리별<br><span class="highlight">비건 뷰티 라인업</span>',
    'cat-1-title': '스킨케어',
    'cat-1-desc': '식물 줄기세포와 자연 유래 성분으로 피부 본연의 건강함을 되찾아줍니다.',
    'cat-2-title': '헤어케어',
    'cat-2-desc': '실리콘·파라벤 프리 포뮬러로 두피부터 모발 끝까지 건강하게 케어합니다.',
    'cat-3-title': '바디케어',
    'cat-3-desc': '시어버터와 식물성 오일로 온몸을 촉촉하고 부드럽게 가꿔줍니다.',
    'cat-4-title': '비건 메이크업',
    'cat-4-desc': '자연 유래 색소와 미네랄 파우더로 피부에 부담 없는 메이크업을 완성합니다.',
    // 프로세스
    'process-title': '간편한 비건 뷰티 쇼핑<br>Be Natural과 함께하세요',
    'proc-1-title': '탐색',
    'proc-1-desc': '피부 타입별<br>제품 찾기',
    'proc-2-title': '선택',
    'proc-2-desc': '비건 인증<br>제품 확인',
    'proc-3-title': '주문',
    'proc-3-desc': '간편 결제 및<br>친환경 포장',
    'proc-4-title': '배송',
    'proc-4-desc': '탄소중립<br>빠른 배송',
    'proc-5-title': '리뷰',
    'proc-5-desc': '사용 후기<br>적립금 혜택',
    // 쇼핑 섹션
    'shop-title': '제품 보기',
    'shop-filter-all': '전체',
    'shop-filter-skin': '스킨케어',
    'shop-filter-hair': '헤어케어',
    'shop-filter-body': '바디케어',
    'shop-cat-skin': '스킨케어',
    'shop-cat-hair': '헤어케어',
    'shop-cat-body': '바디케어',
    'shop-1-name': '비건 히알루론 세럼',
    'shop-2-name': '카밀레 수딩 토너',
    'shop-3-name': '시카 리페어 크림',
    'shop-4-name': '그린티 에센스',
    'shop-5-name': '로즈마리 볼륨 샴푸',
    'shop-6-name': '아르간 헤어 트리트먼트',
    'shop-7-name': '카멜리아 헤어 에센스',
    'shop-8-name': '티트리 두피 스케일러',
    'shop-9-name': '시어버터 바디 로션',
    'shop-10-name': '라벤더 바디 워시',
    'shop-11-name': '유칼립투스 핸드크림',
    'shop-12-name': '코코넛 바디 스크럽',
    // CTA
    'cta-title': '<span class="cta-line1">첫 구매 20% 할인,</span><br><span class="cta-line2">지금 시작하세요</span>',
    'cta-desc': '회원가입만 하면 비건 뷰티 첫 주문 할인 쿠폰을 드립니다',
    'cta-btn': '회원가입 하기',
    // 푸터
    'footer-info': '서울특별시 강남구 테헤란로 123<br>대표: 홍길동 | 사업자등록번호: 123-45-67890<br>TEL: 02-1234-5678 | FAX: 02-1234-5679',
    'footer-link-1': '브랜드 소개',
    'footer-link-2': '전체 제품',
    'footer-link-3': '비건 인증',
    'footer-link-4': '고객센터',
    // 페이지 타이틀
    'page-title': 'Be Natural | 비건 뷰티 쇼핑몰',
  },
  en: {
    // Hero Slide 1
    'hero-1-title': 'Beauty in its Purest Form<br><span class="highlight">Be Natural</span>, Vegan Beauty Shop',
    'hero-1-desc': 'Pure skincare, haircare, and bodycare — cruelty-free',
    'hero-1-btn': 'View Best Sellers',
    // Hero Slide 2
    'hero-2-title': 'Kind to Your Skin,<br><span class="highlight">Kind to the Earth</span> — Vegan Beauty',
    'hero-2-desc': 'Pure skincare made with plant-derived ingredients',
    'hero-2-btn': 'Brand Story',
    // Hero Slide 3
    'hero-3-title': 'First Purchase<br><span class="highlight">20% Off</span> Benefits',
    'hero-3-desc': 'Sign up now and start your vegan beauty journey',
    'hero-3-btn': 'Sign Up',
    // Intro
    'intro-title': 'Kind to your skin, kind to the earth.<br>Start your vegan beauty journey.',
    'intro-desc': 'Three promises from Be Natural',
    'step-1': 'We only carry 100% cruelty-free certified products',
    'step-2': 'We minimize skin irritation with plant-derived and natural ingredients',
    'step-3': 'We care for the earth with eco-friendly packaging from wrapping to delivery',
    // Value Proposition
    'vp-title': 'Instead of chemicals,<br>become beautiful with the <span class="highlight">power of nature</span>.',
    // Best Sellers
    'products-desc': 'The most loved vegan beauty items by our customers',
    // Strengths
    'strength-title': 'Why Choose Be Natural',
    'str-1-title': '100% Vegan Certified',
    'str-1-desc': 'We only sell products certified by<br>Korean and international vegan organizations.',
    'str-2-title': 'Cruelty-Free',
    'str-2-desc': 'We pursue ethical beauty<br>with zero animal testing at every stage.',
    'str-3-title': 'Eco-Friendly Packaging',
    'str-3-desc': 'We minimize environmental impact with<br>recyclable containers and biodegradable packaging.',
    // Categories
    'category-title': 'Explore Our<br><span class="highlight">Vegan Beauty Lineup</span>',
    'cat-1-title': 'Skin Care',
    'cat-1-desc': 'Restore your skin\'s natural health with plant stem cells and naturally-derived ingredients.',
    'cat-2-title': 'Hair Care',
    'cat-2-desc': 'Healthy care from scalp to tips with silicone & paraben-free formulas.',
    'cat-3-title': 'Body Care',
    'cat-3-desc': 'Keep your whole body moisturized and soft with shea butter and plant-based oils.',
    'cat-4-title': 'Vegan Makeup',
    'cat-4-desc': 'Complete your look with gentle makeup using natural pigments and mineral powders.',
    // Process
    'process-title': 'Easy Vegan Beauty Shopping<br>with Be Natural',
    'proc-1-title': 'Browse',
    'proc-1-desc': 'Find products<br>by skin type',
    'proc-2-title': 'Select',
    'proc-2-desc': 'Check vegan<br>certification',
    'proc-3-title': 'Order',
    'proc-3-desc': 'Easy payment &<br>eco packaging',
    'proc-4-title': 'Delivery',
    'proc-4-desc': 'Carbon-neutral<br>fast shipping',
    'proc-5-title': 'Review',
    'proc-5-desc': 'Share reviews<br>earn rewards',
    // Shop
    'shop-title': 'SHOP',
    'shop-filter-all': 'All',
    'shop-filter-skin': 'Skin Care',
    'shop-filter-hair': 'Hair Care',
    'shop-filter-body': 'Body Care',
    'shop-cat-skin': 'Skin Care',
    'shop-cat-hair': 'Hair Care',
    'shop-cat-body': 'Body Care',
    'shop-1-name': 'Vegan Hyaluronic Serum',
    'shop-2-name': 'Chamomile Soothing Toner',
    'shop-3-name': 'Cica Repair Cream',
    'shop-4-name': 'Green Tea Essence',
    'shop-5-name': 'Rosemary Volume Shampoo',
    'shop-6-name': 'Argan Hair Treatment',
    'shop-7-name': 'Camellia Hair Essence',
    'shop-8-name': 'Tea Tree Scalp Scaler',
    'shop-9-name': 'Shea Butter Body Lotion',
    'shop-10-name': 'Lavender Body Wash',
    'shop-11-name': 'Eucalyptus Hand Cream',
    'shop-12-name': 'Coconut Body Scrub',
    // CTA
    'cta-title': '<span class="cta-line1">20% Off Your First Purchase</span><br><span class="cta-line2">Start Now</span>',
    'cta-desc': 'Sign up to receive a discount coupon for your first vegan beauty order',
    'cta-btn': 'Sign Up',
    // Footer
    'footer-info': '123 Teheran-ro, Gangnam-gu, Seoul, South Korea<br>CEO: Hong Gildong | Business Reg. No: 123-45-67890<br>TEL: +82-2-1234-5678 | FAX: +82-2-1234-5679',
    'footer-link-1': 'About Us',
    'footer-link-2': 'All Products',
    'footer-link-3': 'Vegan Cert.',
    'footer-link-4': 'Support',
    // Page title
    'page-title': 'Be Natural | Vegan Beauty Shop',
  }
};

let currentLang = localStorage.getItem('benatural-lang') || 'ko';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('benatural-lang', lang);
  document.documentElement.lang = lang;
  document.title = translations[lang]['page-title'];

  // data-i18n → textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // data-i18n-html → innerHTML
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // data-i18n-placeholder → placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // 언어 버튼 active 상태 업데이트
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ===== 히어로 슬라이더 =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideInterval;
const SLIDE_DURATION = 5000; // 자동 넘김 간격 (5초)

function goToSlide(index) {
  // 현재 슬라이드 비활성화
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');
  
  // 새 슬라이드 활성화
  currentSlide = index;
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');
}

function nextSlide() {
  const next = (currentSlide + 1) % heroSlides.length;
  goToSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  goToSlide(prev);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// 도트 클릭 이벤트
heroDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide);
    if (slideIndex !== currentSlide) {
      goToSlide(slideIndex);
      resetAutoSlide(); // 클릭 후 자동 넘김 타이머 리셋
    }
  });
});

// ===== 마우스 드래그로 슬라이드 넘기기 =====
const heroSection = document.querySelector('.hero');
let isDragging = false;
let startX = 0;
let dragDistance = 0;
const DRAG_THRESHOLD = 50; // 이 거리(px) 이상 드래그해야 슬라이드 전환

heroSection.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  dragDistance = 0;
  heroSection.style.cursor = 'grabbing';
});

heroSection.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  dragDistance = e.clientX - startX;
});

heroSection.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  heroSection.style.cursor = '';

  if (Math.abs(dragDistance) > DRAG_THRESHOLD) {
    if (dragDistance < 0) {
      // 왼쪽으로 드래그 → 다음 슬라이드
      nextSlide();
    } else {
      // 오른쪽으로 드래그 → 이전 슬라이드
      prevSlide();
    }
    resetAutoSlide();
  }
});

heroSection.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    heroSection.style.cursor = '';
  }
});

// 드래그 중 이미지/링크 기본 드래그 방지
heroSection.addEventListener('dragstart', (e) => e.preventDefault());

// ===== 터치 스와이프 지원 (모바일) =====
let touchStartX = 0;
let touchDistance = 0;

heroSection.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchDistance = 0;
}, { passive: true });

heroSection.addEventListener('touchmove', (e) => {
  touchDistance = e.touches[0].clientX - touchStartX;
}, { passive: true });

heroSection.addEventListener('touchend', () => {
  if (Math.abs(touchDistance) > DRAG_THRESHOLD) {
    if (touchDistance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetAutoSlide();
  }
});

// 자동 슬라이드 시작
startAutoSlide();

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);
  
  // 애니메이션 대상 요소들
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // 헤더 스크롤 효과
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.98)';
    } else {
      header.style.background = 'rgba(255,255,255,0.95)';
    }
  });
  
  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // ===== 쇼핑 섹션 필터 =====
  const shopFilterBtns = document.querySelectorAll('.shop-filter-btn');
  const shopItems = document.querySelectorAll('.shop-item');

  shopFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 활성 버튼 변경
      shopFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-shop-filter');

      shopItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-shop-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== 플로팅 스크롤 버튼 =====
  const floatingNav = document.querySelector('.floating-nav');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const scrollBottomBtn = document.getElementById('scrollBottomBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      floatingNav.classList.add('visible');
    } else {
      floatingNav.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollBottomBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // ===== 언어 전환 버튼 =====
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  });

  // 페이지 로드 시 저장된 언어 적용
  applyLanguage(currentLang);

  // ===== 텍스트·이미지 복사 방지 =====
  // 우클릭 방지
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 복사·붙여넣기·잘라내기 방지
  document.addEventListener('copy', (e) => e.preventDefault());
  document.addEventListener('cut', (e) => e.preventDefault());

  // 단축키 차단 (Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+Shift+I, F12)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
    }
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });
  