document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1) DATA: seznam obrázků ve slideru
     ========================================================= */
  const images = [
    "spurs-courtside.jpg",
    "all-star.jpg",
    "nba-best-free-throw-shooters-all-time-damian-lillard-milwaukee-bucks.jpeg"
    
  ];

  /* index aktuálního obrázku */
  let i = 0;

  /* =========================================================
     2) ZACHYCENÍ ELEMENTŮ Z HTML
     ========================================================= */
  const img = document.getElementById("img");
  const right = document.querySelector(".arrow.right");
  const left = document.querySelector(".arrow.left");
  const dotsWrap = document.querySelector(".dots");

  /* =========================================================
     3) VYTVOŘENÍ TEČEK PODLE POČTU OBRÁZKŮ
     ========================================================= */
  const dots = images.map((_, index) => {

    /* vytvoří jednu tečku */
    const d = document.createElement("button");
    d.type = "button";
    d.className = "dot";
    d.setAttribute("aria-label", `Snímek ${index + 1}`);


    /* po kliknutí skočí na konkrétní obrázek */
    d.addEventListener("click", () => {
      i = index;
      show();
      resetTimer();
    });

    dotsWrap.appendChild(d);
    return d;
  });

  /* =========================================================
     4) FUNKCE: zobrazí aktuální obrázek + nastaví aktivní tečku
     ========================================================= */
  function show(){
    img.src = images[i];

    /* active class jen na tečce, která odpovídá indexu i */
    dots.forEach((d, idx) =>
      d.classList.toggle("active", idx === i)
    );
  }

  /* další obrázek */
  function next(){
    i = (i + 1) % images.length;
    show();
  }

  /* předchozí obrázek */
  function prev(){
    i = (i - 1 + images.length) % images.length;
    show();
  }

  /* =========================================================
     5) OVLÁDÁNÍ ŠIPKAMA
     ========================================================= */
  if (right) right.onclick = () => { next(); resetTimer(); };
  if (left) left.onclick = () => { prev(); resetTimer(); };

  /* =========================================================
     6) AUTOPLAY (automatické přepínání)
     ========================================================= */
  const INTERVAL = 1900;
  let timer = setInterval(next, INTERVAL);

  /* reset timeru po ruční interakci */
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  /* inicializace slideru */
  show();

  /* =========================================================
     7) SCROLL REVEAL (IntersectionObserver)
     ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
});

    const langBtn = document.getElementById("langToggle");
    let lang = "cs";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  let lang = "cs";

  btn.addEventListener("click", () => {
    lang = lang === "cs" ? "en" : "cs";
    btn.textContent = (lang === "cs") ? "EN" : "CZ"; // když jsi v CZ, tlačítko nabízí EN

    // přepínáme jen prvky co mají data-en (a zároveň mají i data-cs)
    document.querySelectorAll("[data-en]").forEach(el => {
      el.innerHTML = (lang === "en") ? el.dataset.en : el.dataset.cs;
    });

    // přepnutí atributu lang v html (SEO + accessibility)
    document.documentElement.lang = lang;
  });
});

