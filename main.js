/* ============================================================
   LearnAtYourOwnPace.com — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
      navCta?.classList.toggle('open');
      const open = navLinks?.classList.contains('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── Course filter (mock) ──
  const filterSelect = document.getElementById('niche-filter');
  const searchInput  = document.getElementById('course-search');
  const courseCards  = document.querySelectorAll('.course-card[data-niche]');

  function filterCourses() {
    const niche  = filterSelect?.value?.toLowerCase() || '';
    const search = searchInput?.value?.toLowerCase() || '';
    courseCards.forEach(card => {
      const cardNiche = card.dataset.niche?.toLowerCase() || '';
      const cardTitle = card.querySelector('.course-card-title')?.textContent.toLowerCase() || '';
      const matchNiche  = !niche  || cardNiche.includes(niche);
      const matchSearch = !search || cardTitle.includes(search) || cardNiche.includes(search);
      card.style.display = (matchNiche && matchSearch) ? '' : 'none';
    });
  }

  filterSelect?.addEventListener('change', filterCourses);
  searchInput?.addEventListener('input', filterCourses);

  // ── Niche filter from niches.html ──
  const nicheCards = document.querySelectorAll('.niche-card[data-niche]');
  nicheCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const niche = card.dataset.niche;
      window.location.href = `courses.html?niche=${encodeURIComponent(niche)}`;
    });
  });

  // ── Pre-fill filter from URL ──
  const urlParams = new URLSearchParams(window.location.search);
  const urlNiche  = urlParams.get('niche');
  if (urlNiche && filterSelect) {
    filterSelect.value = urlNiche;
    filterCourses();
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Animate on scroll (lightweight) ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .course-card, .step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease, border-color 0.2s ease';
    observer.observe(el);
  });

});

// ── Supabase integration stubs (for later) ──
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//
// async function fetchCourses() {
//   const { data, error } = await supabase.from('courses').select('*')
//   return data
// }
//
// async function fetchInstructors() {
//   const { data, error } = await supabase.from('profiles').select('*').eq('role', 'instructor')
//   return data
// }
