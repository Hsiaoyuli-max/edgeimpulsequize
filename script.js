// ===== Quiz Content (English) =====
const QUIZ = {
  title: "Edge AI Readiness",
  questions: [
    { // 1
      type: "single",
      text: "Have you ever used Edge AI models in your projects?",
      options: [
        { label: "No, but I’m interested", score: 1 },
        { label: "Tried some demos", score: 2 },
        { label: "Currently integrating into a product", score: 4 }
      ]
    },
    { // 2
      type: "single",
      text: "What is your biggest challenge when building Edge AI models?",
      options: [
        { label: "Collecting and labeling data", score: 2 },
        { label: "Lack of coding skills", score: 1 },
        { label: "Deploying models to hardware", score: 3 },
        { label: "Unsure which platform/framework to choose", score: 2 }
      ]
    },
    { // 3
      type: "single+other",
      text: "If you had a no-code, drag-and-drop training tool, which application would you build first?",
      options: [
        { label: "Visual defect detection", score: 3 },
        { label: "Audio anomaly detection", score: 3 },
        { label: "Healthcare / vital signs monitoring", score: 4 },
        { label: "Smart retail / people counting", score: 3 },
        { label: "Other (please specify)", score: 2, other: true }
      ]
    },
    { // 4
      type: "single+other",
      text: "Which hardware platform do you mostly use for development?",
      options: [
        { label: "Qualcomm", score: 4 },
        { label: "NVIDIA Jetson", score: 3 },
        { label: "STM32 / Arduino", score: 2 },
        { label: "Other (please specify)", score: 2, other: true }
      ]
    },
    { // 5
      type: "single",
      text: "How fast would you like to go from PoC to deployment?",
      options: [
        { label: "Within 1 week", score: 4 },
        { label: "1–2 months", score: 3 },
        { label: "3+ months", score: 1 }
      ]
    },
    { // 6
      type: "single",
      text: "If there’s a 30-minute live demo of Edge Impulse, what would you like to learn?",
      options: [
        { label: "How to quickly train a model", score: 3 },
        { label: "How to deploy to hardware", score: 4 },
        { label: "How to collect / clean datasets", score: 3 },
        { label: "Real project demo showcase", score: 3 }
      ]
    },
    { // 7
      type: "single",
      text: "What kind of activity would you be most interested in joining?",
      options: [
        { label: "Lightweight live tutorial", score: 3 },
        { label: "On-demand video", score: 2 },
        { label: "Hackathon / challenge", score: 4 }
      ]
    },
    { // 8
      type: "single",
      text: "Would you like to leave your Email / LinkedIn to receive updates and free resources?",
      options: [
        { label: "Yes", score: 2 },
        { label: "No", score: 0 }
      ]
    }
  ]
};

const OUTCOMES = [
  { min: 0, max: 8, text: "Explorer — You’re just getting started. We’ll share no-code examples and fast wins." },
  { min: 9, max: 16, text: "Builder — You’re on your way. We recommend best practices for data + deployment." },
  { min: 17, max: 24, text: "Integrator — You’re close to production. Let’s review hardware targets and scaling." },
  { min: 25, max: 30, text: "Pro — You’re leading the pack. Consider advanced workflows and multi-device rollouts." }
];

// ===== State =====
let current = 0;
const state = { answers: Array(QUIZ.questions.length).fill(null), otherTexts: {} };

// ===== DOM =====
const hero = document.getElementById("hero");
const questionContainer = document.getElementById("questionContainer");
const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const leadSection = document.getElementById("lead");
const resultSection = document.getElementById("result");
const resultText = document.getElementById("resultText");
const leadForm = document.getElementById("leadForm");
const quizSection = document.getElementById("quiz");
const restartBtn = document.getElementById("restartBtn");

function enterQuiz(){
  hero.classList.add("hidden");
  resultSection.classList.add("hidden");
  leadSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showLead(){
  quizSection.classList.add("hidden");
  leadSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showResult(){
  leadSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("startBtn").addEventListener("click", (e)=>{ e.preventDefault(); enterQuiz(); });
document.getElementById("startBtn2").addEventListener("click", (e)=>{ e.preventDefault(); enterQuiz(); });

function renderQuestion(){
  const q = QUIZ.questions[current];
  stepLabel.textContent = `Question ${current + 1} / ${QUIZ.questions.length}`;
  progressBar.style.width = `${(current / QUIZ.questions.length) * 100}%`;

  let html = `<h3>${q.text}</h3><div class="options">`;
  q.options.forEach((opt, idx) => {
    const name = `q${current}`;
    const checked = state.answers[current] === idx ? "checked" : "";
    const isOther = !!opt.other;
    const otherVal = state.otherTexts[current] || "";
    html += `
      <label class="option">
        <input type="radio" name="${name}" value="${idx}" ${checked}/>
        <span>${opt.label}</span>
      </label>`;
    if(isOther){
      html += `<div class="option other-input" data-for="${idx}" style="display:${state.answers[current]===idx?'block':'none'}">
        <input type="text" placeholder="Please specify" value="${otherVal}"/>
      </div>`;
    }
  });
  html += `</div>`;
  questionContainer.innerHTML = html;

  document.querySelectorAll(`input[name="q${current}"]`).forEach((el) => {
    el.addEventListener("change", (e) => {
      const idx = Number(e.target.value);
      state.answers[current] = idx;
      nextBtn.disabled = false;
      document.querySelectorAll(".other-input").forEach(div=>{
        if(Number(div.getAttribute("data-for"))===idx){ div.style.display="block"; }
        else{ div.style.display="none"; }
      });
    });
  });

  document.querySelectorAll(".other-input input").forEach(inp=>{
    inp.addEventListener("input", e=>{ state.otherTexts[current] = e.target.value; });
  });

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === QUIZ.questions.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = state.answers[current] === null;
}

prevBtn.addEventListener("click", () => { if(current>0){ current--; renderQuestion(); } });
nextBtn.addEventListener("click", () => {
  if(state.answers[current]===null) return;
  if(current < QUIZ.questions.length - 1){ current++; renderQuestion(); }
  else {
    progressBar.style.width = "100%";
    stepLabel.textContent = "Completed";
    showLead();
  }
});

restartBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  current = 0;
  state.answers = Array(QUIZ.questions.length).fill(null);
  state.otherTexts = {};
  renderQuestion();
  enterQuiz();
});

leadForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  
  // 收集表單資料
  const formData = new FormData(leadForm);
  const score = calcScore();
  const band = pickBand(score);
  const finalScore = toHighScore(score);
  
  // 準備傳送到 Google Sheets 的資料
  const sheetData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    country: formData.get('country'),
    email: formData.get('email'),
    company: formData.get('company'),
    title: formData.get('title'),
    question_1: state.answers[0] !== null ? QUIZ.questions[0].options[state.answers[0]].label : '',
    question_2: state.answers[1] !== null ? QUIZ.questions[1].options[state.answers[1]].label : '',
    question_3: state.answers[2] !== null ? QUIZ.questions[2].options[state.answers[2]].label : '',
    question_3_other: state.otherTexts[2] || '',
    question_4: state.answers[3] !== null ? QUIZ.questions[3].options[state.answers[3]].label : '',
    question_4_other: state.otherTexts[3] || '',
    question_5: state.answers[4] !== null ? QUIZ.questions[4].options[state.answers[4]].label : '',
    question_6: state.answers[5] !== null ? QUIZ.questions[5].options[state.answers[5]].label : '',
    question_7: state.answers[6] !== null ? QUIZ.questions[6].options[state.answers[6]].label : '',
    question_8: state.answers[7] !== null ? QUIZ.questions[7].options[state.answers[7]].label : '',
    raw_score: score,
    final_score: finalScore,
    result_band: band.text
  };
  
  // Google Apps Script Web App URL
  const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
  
  // 傳送資料到 Google Sheets
  try {
    if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      console.log('正在傳送資料到 Google Sheets...');
      console.log('資料內容:', sheetData);
      
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // 注意：使用 no-cors 模式時無法讀取回應內容
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      });
      
      // 因為使用 no-cors，無法讀取回應狀態
      // 302 重定向是 Google Apps Script 的正常行為
      console.log('資料已送出到 Google Sheets');
      console.log('提示：請到 Google Sheets 確認資料是否成功寫入');
      console.log('如果看到 302 狀態碼，這是正常的（Google Apps Script 的重定向機制）');
    } else {
      console.warn('請先設定 Google Apps Script URL');
    }
  } catch (error) {
    console.error('傳送資料時發生錯誤:', error);
    // 即使傳送失敗，仍然顯示結果給使用者
  }
  
  // 顯示結果
  resultText.textContent = `Your score: ${finalScore}/100. ${band.text}`;
  showResult();
});

function calcScore(){
  return state.answers.reduce((sum, idx, i)=>{
    const q = QUIZ.questions[i];
    const sc = q.options[idx]?.score || 0;
    return sum + sc;
  }, 0);
}
function maxRawScore(){
  return QUIZ.questions.reduce((sum, q)=>{
    const m = Math.max(...q.options.map(o => o.score || 0));
    return sum + m;
  }, 0);
}
function toHighScore(raw){
  const max = maxRawScore();
  const scaled = Math.round(90 + (raw / max) * 10);
  return Math.min(100, Math.max(90, scaled));
}
function pickBand(score){
  return OUTCOMES.find(o=> score >= o.min && score <= o.max) || OUTCOMES.at(-1);
}

renderQuestion();
