/* ============================================================
   LearnAtYourOwnPace.com — App JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile sidebar toggle ──
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar       = document.querySelector('.app-sidebar');
  const overlay       = document.querySelector('.sidebar-overlay');

  sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });

  // ── Lesson builder (course-builder.html) ──
  let lessonCount = 1;
  const addLessonBtn   = document.getElementById('add-lesson-btn');
  const lessonsContainer = document.getElementById('lessons-container');

  addLessonBtn?.addEventListener('click', () => {
    lessonCount++;
    const lesson = document.createElement('div');
    lesson.className = 'lesson-item';
    lesson.innerHTML = `
      <span class="lesson-handle">⠿</span>
      <span class="lesson-number">${String(lessonCount).padStart(2,'0')}</span>
      <div class="lesson-body" style="flex:1">
        <div class="form-group mb-sm">
          <input type="text" class="form-input lesson-title-input" placeholder="Lesson title" />
        </div>
        <div class="form-group mb-sm">
          <input type="url" class="form-input" placeholder="Video link (YouTube, Vimeo, Loom…)" />
        </div>
        <div class="form-group" style="margin-bottom:0">
          <textarea class="form-input" rows="2" placeholder="Notes / resources (optional)"></textarea>
        </div>
      </div>
      <button class="btn btn-sm" style="color:#dc2626;border-color:#dc2626;margin-left:0.5rem;flex-shrink:0;align-self:flex-start" onclick="this.closest('.lesson-item').remove()">✕</button>
    `;
    lessonsContainer?.appendChild(lesson);
  });

  // ── Quiz builder ──
  let questionCount = 0;
  const addQuestionBtn   = document.getElementById('add-question-btn');
  const quizContainer    = document.getElementById('quiz-container');

  addQuestionBtn?.addEventListener('click', () => {
    questionCount++;
    const qid = `q${questionCount}`;
    const q = document.createElement('div');
    q.className = 'card mb-md';
    q.style.marginBottom = '1rem';
    q.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
        <div class="section-title" style="font-size:1rem;margin-bottom:0">Question ${questionCount}</div>
        <button class="btn btn-sm" style="color:#dc2626;border-color:#dc2626" onclick="this.closest('.card').remove()">Remove</button>
      </div>
      <div class="form-group">
        <input type="text" class="form-input" placeholder="Enter your question…" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:0.75rem">
        ${[1,2,3,4].map(i => `
          <div class="quiz-option">
            <input type="radio" name="${qid}" id="${qid}_opt${i}" value="${i}" />
            <label for="${qid}_opt${i}" style="font-size:0.82rem;color:var(--text-light);min-width:72px">Option ${i}</label>
            <input type="text" class="form-input" style="flex:1" placeholder="Answer option ${i}…" />
          </div>
        `).join('')}
      </div>
      <div class="form-hint">☝️ Select the radio button next to the correct answer.</div>
    `;
    quizContainer?.appendChild(q);
  });

  // ── Save draft / publish ──
  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    // TODO: Supabase — save course with status='draft'
    // const { data, error } = await supabase.from('courses').upsert({ ...courseData, status: 'draft' })
    showToast('Draft saved!', 'success');
  });

  document.getElementById('publish-btn')?.addEventListener('click', () => {
    // TODO: Supabase — save course with status='published'
    // const { data, error } = await supabase.from('courses').upsert({ ...courseData, status: 'published' })
    showToast('Course published! 🎉', 'success');
  });

  // ── Mark complete ──
  document.getElementById('mark-complete-btn')?.addEventListener('click', function() {
    // TODO: Supabase — insert into lesson_completions
    // await supabase.from('lesson_completions').insert({ user_id, lesson_id, completed_at: new Date() })
    this.textContent = '✓ Completed';
    this.classList.add('btn-ghost');
    this.classList.remove('btn-primary');
    this.disabled = true;
    const bar = document.querySelector('.progress-fill');
    if (bar) bar.style.width = Math.min(100, parseInt(bar.style.width || 0) + 10) + '%';
  });

  // ── Toast ──
  function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:1.5rem;right:1.5rem;background:${type==='success'?'#1E3A8A':'#dc2626'};color:white;padding:0.75rem 1.25rem;border-radius:8px;font-size:0.9rem;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);animation:slideIn 0.3s ease`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // Add keyframes
  const style = document.createElement('style');
  style.textContent = `@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`;
  document.head.appendChild(style);

});

// ============================================================
// SUPABASE INTEGRATION STUBS
// ============================================================
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')
//
// ── Auth ──
// async function signIn(email, password) {
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//   if (error) throw error
//   return data
// }
// async function signUp(email, password) {
//   const { data, error } = await supabase.auth.signUp({ email, password })
//   if (error) throw error
//   return data
// }
// async function signOut() {
//   await supabase.auth.signOut()
//   window.location.href = '/app/login.html'
// }
//
// ── Courses ──
// async function fetchMyCourses(userId) {
//   const { data } = await supabase.from('courses').select('*').eq('instructor_id', userId)
//   return data
// }
// async function saveCourse(courseData) {
//   const { data, error } = await supabase.from('courses').upsert(courseData)
//   return { data, error }
// }
//
// ── Progress ──
// async function markLessonComplete(userId, lessonId) {
//   const { data, error } = await supabase.from('lesson_completions')
//     .insert({ user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() })
//   return { data, error }
// }
//
// ── Enrollments ──
// async function fetchEnrolledCourses(userId) {
//   const { data } = await supabase.from('enrollments').select('*, courses(*)').eq('user_id', userId)
//   return data
// }
