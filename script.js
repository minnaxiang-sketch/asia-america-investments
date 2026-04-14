(function () {
    'use strict';

    // ---- Language ----
    let lang = 'en';
    const langBtn = document.getElementById('langToggle');
    const langEn = langBtn.querySelector('.lang-en');
    const langZh = langBtn.querySelector('.lang-zh');

    langBtn.addEventListener('click', () => {
        lang = lang === 'en' ? 'zh' : 'en';
        apply(lang);
    });

    function apply(l) {
        document.body.classList.toggle('zh', l === 'zh');
        document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
        langEn.style.display = l === 'zh' ? 'none' : 'inline';
        langZh.style.display = l === 'zh' ? 'inline' : 'none';

        document.querySelectorAll('[data-' + l + ']').forEach(el => {
            const v = el.getAttribute('data-' + l);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
            if (el.children.length === 0) el.textContent = v;
            else el.innerHTML = v;
        });

        document.querySelectorAll('.field label').forEach(lbl => {
            const v = lbl.getAttribute('data-' + l);
            if (v) lbl.textContent = v;
        });

        document.querySelectorAll('.btn[data-' + l + ']').forEach(b => {
            b.textContent = b.getAttribute('data-' + l);
        });
    }

    // ---- Mobile Menu ----
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(a => {
        a.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Scroll Animations ----
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

    // ---- Counter Animation ----
    const cobs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { countUp(e.target); cobs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => cobs.observe(el));

    function countUp(el) {
        const target = +el.getAttribute('data-count');
        const dur = 1600;
        const start = performance.now();
        (function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(ease * target);
            if (p < 1) requestAnimationFrame(tick);
        })(start);
    }

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ---- Form ----
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const txt = btn.textContent;
        btn.textContent = lang === 'zh' ? '发送中...' : 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '.6';
        setTimeout(() => {
            btn.textContent = lang === 'zh' ? '已发送!' : 'Sent!';
            btn.style.opacity = '1';
            setTimeout(() => { btn.textContent = txt; btn.disabled = false; this.reset(); }, 2000);
        }, 1200);
    });

    // ---- Hero Parallax ----
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (y * 0.25) + 'px)';
            heroContent.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.65));
        }
    }, { passive: true });

    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255,255,255,.92)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255,255,255,.82)';
        }
    }, { passive: true });

})();
