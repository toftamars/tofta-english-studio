/* ====================================================================
   Tofta English Studio — Uygulama Mantığı
   Profil seçimi, ders gösterimi, dinleme (TTS), konuşma tanıma,
   quiz ve ilerleme takibi (localStorage).
   ==================================================================== */

(function () {
  "use strict";

  const STORE_KEY = "tofta-english-v1";
  const SECTIONS = [
    { id: "vocab", label: "Kelime" },
    { id: "grammar", label: "Dilbilgisi" },
    { id: "listening", label: "Dinleme" },
    { id: "speaking", label: "Konuşma" },
    { id: "writing", label: "Yazma" },
    { id: "quiz", label: "Quiz" },
  ];

  let state = {
    profile: null,
    unitIndex: 0,
    section: "vocab",
  };

  /* -------------------- Kayıt (localStorage) -------------------- */
  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveStore(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }
  function getProfileData(profile) {
    const store = loadStore();
    if (!store[profile]) {
      store[profile] = { completed: [], lastDay: null, streak: 0 };
      saveStore(store);
    }
    return store[profile];
  }
  function markComplete(profile, unitId) {
    const store = loadStore();
    const pd = store[profile] || { completed: [], lastDay: null, streak: 0 };
    if (!pd.completed.includes(unitId)) pd.completed.push(unitId);
    updateStreak(pd);
    store[profile] = pd;
    saveStore(store);
  }
  function updateStreak(pd) {
    const today = new Date().toDateString();
    if (pd.lastDay === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    pd.streak = pd.lastDay === yesterday ? (pd.streak || 0) + 1 : 1;
    pd.lastDay = today;
  }

  /* -------------------- Ses: TTS (dinleme) -------------------- */
  function speak(text, rate) {
    if (!("speechSynthesis" in window)) {
      toast("Bu tarayıcı sesli okumayı desteklemiyor.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate || 0.9;
    const voices = window.speechSynthesis.getVoices();
    const en = voices.find((v) => /en-US|en_US|English/i.test(v.lang + v.name));
    if (en) u.voice = en;
    window.speechSynthesis.speak(u);
  }

  /* -------------------- Ses: Konuşma tanıma -------------------- */
  function getRecognizer() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    return rec;
  }
  function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  }
  function similarity(a, b) {
    const wa = normalize(a).split(" ");
    const wb = new Set(normalize(b).split(" "));
    if (!wa.length) return 0;
    const hit = wa.filter((w) => wb.has(w)).length;
    return Math.round((hit / wa.length) * 100);
  }

  /* -------------------- Toast -------------------- */
  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* -------------------- Profil ekranı -------------------- */
  function initProfileScreen() {
    document.querySelectorAll(".profile-card").forEach((card) => {
      card.addEventListener("click", () => openProfile(card.dataset.profile));
    });
  }

  function openProfile(profile) {
    state.profile = profile;
    state.unitIndex = 0;
    state.section = "vocab";

    const p = PROFILES[profile];
    document.body.classList.toggle("theme-hulya", profile === "hulya");

    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");

    document.getElementById("side-initial").textContent = p.name[0];
    document.getElementById("side-name").textContent = p.name;
    document.getElementById("side-role").textContent = p.role;

    renderNav();
    renderProgress();
    renderLesson();
    window.scrollTo(0, 0);
  }

  /* -------------------- Sidebar nav -------------------- */
  function renderNav() {
    const nav = document.getElementById("unit-nav");
    const pd = getProfileData(state.profile);
    nav.innerHTML = "";
    CURRICULUM.forEach((unit, i) => {
      const done = pd.completed.includes(unit.id);
      const btn = document.createElement("button");
      btn.className = "unit-link" + (i === state.unitIndex ? " active" : "") + (done ? " done" : "");
      btn.innerHTML =
        '<span class="unit-num">' + (done ? "✓" : unit.id) + "</span>" +
        '<span class="unit-label">' + unit.titleTr + "</span>";
      btn.addEventListener("click", () => {
        state.unitIndex = i;
        state.section = "vocab";
        renderNav();
        renderLesson();
        window.scrollTo(0, 0);
      });
      nav.appendChild(btn);
    });
  }

  function renderProgress() {
    const pd = getProfileData(state.profile);
    const pct = Math.round((pd.completed.length / CURRICULUM.length) * 100);
    document.getElementById("progress-percent").textContent = pct + "%";
    const ring = document.getElementById("ring-fill");
    const circ = 2 * Math.PI * 52;
    ring.style.strokeDashoffset = circ - (circ * pct) / 100;
    document.getElementById("streak-count").textContent = pd.streak || 0;
  }

  /* -------------------- Ders gösterimi -------------------- */
  function renderLesson() {
    const unit = CURRICULUM[state.unitIndex];
    const view = document.getElementById("lesson-view");
    const pd = getProfileData(state.profile);
    const done = pd.completed.includes(unit.id);

    let html = "";
    html += '<div class="lesson-header">';
    html += '<p class="lesson-eyebrow">Ünite ' + unit.id + " / " + CURRICULUM.length + "</p>";
    html += '<h1 class="lesson-title">' + unit.title + "</h1>";
    html += '<p class="lesson-title-tr">' + unit.titleTr + "</p>";
    html += '<p class="lesson-goal">🎯 ' + unit.goal + "</p>";
    html += "</div>";

    // tabs
    html += '<div class="tabs">';
    SECTIONS.forEach((s) => {
      html += '<button class="tab' + (s.id === state.section ? " active" : "") +
        '" data-section="' + s.id + '">' + s.label + "</button>";
    });
    html += "</div>";

    html += '<div id="section-body"></div>';

    // foot
    html += '<div class="lesson-foot">';
    if (state.unitIndex > 0) {
      html += '<button class="btn btn-ghost" id="prev-unit">← Önceki ünite</button>';
    } else {
      html += "<span></span>";
    }
    if (done) {
      html += '<span class="complete-tag">✓ Bu ünite tamamlandı</span>';
    } else {
      html += '<button class="btn btn-primary" id="complete-unit">Bu üniteyi tamamla ✓</button>';
    }
    if (state.unitIndex < CURRICULUM.length - 1) {
      html += '<button class="btn btn-ghost" id="next-unit">Sonraki ünite →</button>';
    } else {
      html += "<span></span>";
    }
    html += "</div>";

    view.innerHTML = html;

    view.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => {
        state.section = t.dataset.section;
        renderLesson();
      });
    });
    const prev = document.getElementById("prev-unit");
    const next = document.getElementById("next-unit");
    const comp = document.getElementById("complete-unit");
    if (prev) prev.addEventListener("click", () => { state.unitIndex--; state.section = "vocab"; renderNav(); renderLesson(); window.scrollTo(0,0); });
    if (next) next.addEventListener("click", () => { state.unitIndex++; state.section = "vocab"; renderNav(); renderLesson(); window.scrollTo(0,0); });
    if (comp) comp.addEventListener("click", () => {
      markComplete(state.profile, unit.id);
      toast("Tebrikler! Ünite tamamlandı 🎉");
      renderNav();
      renderProgress();
      renderLesson();
    });

    renderSection(unit);
  }

  function renderSection(unit) {
    const body = document.getElementById("section-body");
    const renderers = {
      vocab: renderVocab,
      grammar: renderGrammar,
      listening: renderListening,
      speaking: renderSpeaking,
      writing: renderWriting,
      quiz: renderQuiz,
    };
    body.innerHTML = "";
    renderers[state.section](unit, body);
  }

  /* ---- Kelime (flashcards) ---- */
  function renderVocab(unit, body) {
    const profile = state.profile;
    const groups = [
      { key: "common", title: "Genel Kelimeler" },
      { key: profile, title: profile === "alper" ? "Sana Özel · Müzik & Mağaza" : "Sana Özel · Luxury Retail" },
    ];
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = "<h3>Kelime Kartları</h3><p class='sub'>Karta tıkla, Türkçesini gör. 🔊 ile telaffuzu dinle.</p>";

    groups.forEach((g) => {
      const list = unit.vocab[g.key] || [];
      if (!list.length) return;
      const title = document.createElement("p");
      title.className = "vocab-group-title";
      title.textContent = g.title;
      card.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "flashcards";
      list.forEach((w) => {
        const fc = document.createElement("div");
        fc.className = "flashcard";
        fc.innerHTML =
          '<div class="flashcard-inner">' +
            '<div class="flashcard-face flashcard-front">' +
              '<span class="fc-en">' + w.en + "</span>" +
              '<button class="fc-play">🔊 Dinle</button>' +
              '<span class="fc-hint">çevirmek için tıkla</span>' +
            "</div>" +
            '<div class="flashcard-face flashcard-back">' +
              '<span class="fc-tr">' + w.tr + "</span>" +
              '<span class="fc-ex">"' + w.ex + '"</span>' +
            "</div>" +
          "</div>";
        fc.addEventListener("click", () => fc.classList.toggle("flipped"));
        fc.querySelector(".fc-play").addEventListener("click", (e) => {
          e.stopPropagation();
          speak(w.en);
        });
        grid.appendChild(fc);
      });
      card.appendChild(grid);
    });
    body.appendChild(card);
  }

  /* ---- Dilbilgisi ---- */
  function renderGrammar(unit, body) {
    const g = unit.grammar;
    const card = document.createElement("div");
    card.className = "section-card";
    let html = "<h3>" + g.title + "</h3><p class='sub'>" + g.titleTr + "</p>";
    html += '<div class="grammar-explain">' + g.explanation + "</div>";
    g.examples.forEach((ex) => {
      html +=
        '<div class="example-row">' +
          '<span class="example-en">' + ex.en +
            ' <button class="play-btn" style="width:30px;height:30px;font-size:.8rem" data-say="' + escapeAttr(ex.en) + '">🔊</button>' +
          "</span>" +
          '<span class="example-tr">' + ex.tr + "</span>" +
        "</div>";
    });
    card.innerHTML = html;
    card.querySelectorAll("[data-say]").forEach((b) => {
      b.addEventListener("click", () => speak(b.dataset.say));
    });
    body.appendChild(card);
  }

  /* ---- Dinleme ---- */
  function renderListening(unit, body) {
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = "<h3>Dinleme Alıştırması</h3><p class='sub'>Her cümleyi dinle ve sesli tekrar et.</p>";
    unit.listening.forEach((line) => {
      const row = document.createElement("div");
      row.className = "listen-line";
      row.innerHTML = '<button class="play-btn">🔊</button><span class="ll-text">' + line + "</span>";
      row.querySelector(".play-btn").addEventListener("click", () => speak(line));
      card.appendChild(row);
    });
    const rowBtns = document.createElement("div");
    rowBtns.className = "btn-row";
    rowBtns.innerHTML =
      '<button class="btn btn-ghost" id="play-all">▶ Hepsini sırayla dinle</button>' +
      '<button class="btn btn-ghost" id="play-slow">🐢 Yavaş dinle</button>';
    card.appendChild(rowBtns);
    body.appendChild(card);

    document.getElementById("play-all").addEventListener("click", () => playSequence(unit.listening, 0.92));
    document.getElementById("play-slow").addEventListener("click", () => playSequence(unit.listening, 0.65));
  }

  function playSequence(lines, rate) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    lines.forEach((line) => {
      const u = new SpeechSynthesisUtterance(line);
      u.lang = "en-US";
      u.rate = rate;
      window.speechSynthesis.speak(u);
    });
  }

  /* ---- Konuşma ---- */
  function renderSpeaking(unit, body) {
    const s = unit.speaking;
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = "<h3>Konuşma Pratiği</h3><p class='sub'>" + s.promptTr + "</p>";

    const hasRec = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!hasRec) {
      const note = document.createElement("p");
      note.className = "sub";
      note.innerHTML = "ℹ️ Mikrofon değerlendirmesi için <strong>Google Chrome</strong> önerilir. Yine de 🔊 ile dinleyip yüksek sesle tekrar edebilirsin.";
      card.appendChild(note);
    }

    s.phrases.forEach((phrase) => {
      const row = document.createElement("div");
      row.className = "speak-phrase";
      row.innerHTML =
        '<span class="sp-text">' + phrase + "</span>" +
        '<button class="play-btn" title="Dinle">🔊</button>' +
        (hasRec ? '<button class="mic-btn">🎤 Söyle</button>' : "") +
        '<span class="sp-result"></span>';
      row.querySelector(".play-btn").addEventListener("click", () => speak(phrase));
      const mic = row.querySelector(".mic-btn");
      if (mic) {
        mic.addEventListener("click", () => startSpeaking(phrase, mic, row.querySelector(".sp-result")));
      }
      card.appendChild(row);
    });
    body.appendChild(card);
  }

  function startSpeaking(target, btn, resultEl) {
    const rec = getRecognizer();
    if (!rec) return;
    btn.classList.add("listening");
    btn.textContent = "🎤 Dinliyorum...";
    resultEl.textContent = "";
    resultEl.className = "sp-result";

    rec.start();
    rec.onresult = (e) => {
      const heard = e.results[0][0].transcript;
      const score = similarity(target, heard);
      if (score >= 70) {
        resultEl.className = "sp-result good";
        resultEl.textContent = "✓ Harika! (%" + score + " doğru) — duyduğum: \"" + heard + "\"";
      } else {
        resultEl.className = "sp-result bad";
        resultEl.textContent = "Tekrar dene (%" + score + ") — duyduğum: \"" + heard + "\"";
      }
    };
    rec.onerror = () => {
      resultEl.className = "sp-result bad";
      resultEl.textContent = "Mikrofona erişilemedi. İzin verdiğinden emin ol.";
    };
    rec.onend = () => {
      btn.classList.remove("listening");
      btn.textContent = "🎤 Söyle";
    };
  }

  /* ---- Yazma ---- */
  function renderWriting(unit, body) {
    const w = unit.writing;
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML =
      "<h3>Yazma Alıştırması</h3>" +
      '<div class="writing-task">✍️ ' + w.taskTr + "</div>" +
      '<textarea class="writing-area" placeholder="Cevabını buraya İngilizce yaz..."></textarea>' +
      '<div class="btn-row"><button class="btn btn-primary" id="show-sample">Örnek cevabı göster</button>' +
      '<button class="btn btn-ghost" id="read-mine">🔊 Yazdığımı oku</button></div>' +
      '<div class="sample-box hidden"><strong>Örnek cevap</strong>' + w.sample +
      ' <button class="play-btn" style="width:30px;height:30px;font-size:.8rem" data-say="' + escapeAttr(w.sample) + '">🔊</button></div>';
    body.appendChild(card);

    const sampleBox = card.querySelector(".sample-box");
    document.getElementById("show-sample").addEventListener("click", () => sampleBox.classList.toggle("hidden"));
    document.getElementById("read-mine").addEventListener("click", () => {
      const txt = card.querySelector(".writing-area").value.trim();
      if (txt) speak(txt); else toast("Önce bir şeyler yaz ✍️");
    });
    card.querySelector("[data-say]").addEventListener("click", (e) => speak(e.target.dataset.say));
  }

  /* ---- Quiz ---- */
  function renderQuiz(unit, body) {
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = "<h3>Mini Quiz</h3><p class='sub'>Öğrendiklerini test et. Doğru cevabı seç.</p>";
    let answered = 0, correct = 0;

    unit.quiz.forEach((q, qi) => {
      const block = document.createElement("div");
      block.className = "quiz-q";
      let html = '<p class="quiz-q-text">' + (qi + 1) + ". " + q.q + '</p><div class="quiz-options">';
      q.options.forEach((opt, oi) => {
        html += '<button class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' + opt + "</button>";
      });
      html += '</div><p class="quiz-explain hidden">' + q.explainTr + "</p>";
      block.innerHTML = html;

      block.querySelectorAll(".quiz-opt").forEach((optBtn) => {
        optBtn.addEventListener("click", () => {
          const opts = block.querySelectorAll(".quiz-opt");
          if ([...opts].some((o) => o.disabled)) return;
          const chosen = +optBtn.dataset.o;
          opts.forEach((o, i) => {
            o.disabled = true;
            if (i === q.answer) o.classList.add("correct");
            if (i === chosen && chosen !== q.answer) o.classList.add("wrong");
          });
          block.querySelector(".quiz-explain").classList.remove("hidden");
          answered++;
          if (chosen === q.answer) correct++;
          if (answered === unit.quiz.length) {
            toast("Quiz bitti: " + correct + "/" + unit.quiz.length + " doğru 🎯");
          }
        });
      });
      card.appendChild(block);
    });
    body.appendChild(card);
  }

  /* -------------------- Yardımcılar -------------------- */
  function escapeAttr(s) {
    return s.replace(/"/g, "&quot;");
  }

  /* -------------------- Başlat -------------------- */
  function init() {
    initProfileScreen();
    document.getElementById("back-to-profiles").addEventListener("click", () => {
      window.speechSynthesis && window.speechSynthesis.cancel();
      document.getElementById("app-screen").classList.add("hidden");
      document.getElementById("profile-screen").classList.remove("hidden");
    });
    // sesleri önceden yükle
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
