/* =======================================================
   COSMIC-FX.JS — Futuristic Space AI theme effects
   Purely additive / decorative. Does not read or write any
   application data and never touches existing element IDs
   used by script.js, admin-ui-handler.js or admin-auth-system.js.
   ======================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia && window.matchMedia("(pointer:coarse)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function isSpaceTheme() {
    return document.documentElement.getAttribute("data-theme") !== "future";
  }

  ready(function () {
    injectBackgroundLayers();
    initNavbarScrollShrink();
    initButtonRipple();

    if (!reduceMotion) {
      initStarfield();
    }
    if (!reduceMotion && !isCoarsePointer) {
      initCustomCursor();
      initMouseSpotlight();
    }
  });

  /* ---------- background layers (grid + canvas host) ---------- */
  function injectBackgroundLayers() {
    if (document.getElementById("cosmicBg")) return;

    var bg = document.createElement("div");
    bg.id = "cosmicBg";
    bg.setAttribute("aria-hidden", "true");

    var grid = document.createElement("div");
    grid.id = "cosmicGrid";
    grid.setAttribute("aria-hidden", "true");

    var canvas = document.createElement("canvas");
    canvas.id = "cosmicCanvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.insertBefore(canvas, document.body.firstChild);
    document.body.insertBefore(grid, document.body.firstChild);
    document.body.insertBefore(bg, document.body.firstChild);
  }

  /* ---------- navbar shrink + blur on scroll ---------- */
  function initNavbarScrollShrink() {
    var header = document.querySelector(".header");
    if (!header) return;

    var ticking = false;
    function update() {
      if (window.scrollY > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ---------- button ripple on click ---------- */
  function initButtonRipple() {
    document.addEventListener("click", function (e) {
      var target = e.target.closest(".btn, .btn-view, .header-right button, .search-box button, .chip, .adv-chip, .btn-adv-filter");
      if (!target) return;

      target.classList.add("fx-ripple-host");

      var rect = target.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var ripple = document.createElement("span");
      ripple.className = "fx-ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

      target.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  }

  /* ---------- custom cursor (dot + trailing ring) ---------- */
  function initCustomCursor() {
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.id = "cursorDot";

    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.id = "cursorRing";

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var ringX = mouseX;
    var ringY = mouseY;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var interactive = e.target.closest("a, button, input, select, li[data-category], li[data-utility], .tool-card, .chip");
      ring.classList.toggle("is-active", !!interactive);
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
      window.requestAnimationFrame(animateRing);
    }
    window.requestAnimationFrame(animateRing);
  }

  /* ---------- soft mouse spotlight ---------- */
  function initMouseSpotlight() {
    var spot = document.createElement("div");
    spot.id = "mouseSpotlight";
    document.body.appendChild(spot);

    window.addEventListener("mousemove", function (e) {
      spot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px) translate(-50%,-50%)";
    }, { passive: true });
  }

  /* ---------- starfield / nebula particles / shooting stars ---------- */
  function initStarfield() {
    var canvas = document.getElementById("cosmicCanvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    var stars = [];
    var particles = [];
    var shootingStars = [];
    var width, height, dpr;

    var STAR_COUNT_BASE = 140;
    var PARTICLE_COUNT_BASE = 26;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      var area = width * height;
      var starCount = Math.max(60, Math.min(220, Math.round(STAR_COUNT_BASE * area / (1440 * 900))));
      var particleCount = Math.max(10, Math.min(40, Math.round(PARTICLE_COUNT_BASE * area / (1440 * 900))));

      stars = [];
      for (var i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.3,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.015 + 0.004,
          phase: Math.random() * Math.PI * 2
        });
      }

      particles = [];
      for (var j = 0; j < particleCount; j++) {
        particles.push(spawnParticle());
      }
    }

    function spawnParticle() {
      var hueChoices = ["rgba(0,229,255,", "rgba(139,92,246,", "rgba(59,130,246,"];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.12 - 0.02,
        alpha: Math.random() * 0.35 + 0.1,
        color: hueChoices[Math.floor(Math.random() * hueChoices.length)]
      };
    }

    function maybeSpawnShootingStar() {
      if (shootingStars.length > 2) return;
      if (Math.random() < 0.0025) {
        var startX = Math.random() * width * 0.6 + width * 0.2;
        shootingStars.push({
          x: startX,
          y: -10,
          vx: -3.2 - Math.random() * 1.5,
          vy: 2.4 + Math.random() * 1.2,
          life: 0,
          maxLife: 70 + Math.random() * 20
        });
      }
    }

    var t = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // stars
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var tw = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = "rgba(220,240,255," + Math.max(0, Math.min(1, tw)) + ")";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // floating particles (slow drift upward)
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[j] = spawnParticle();
          particles[j].y = height + 10;
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars
      maybeSpawnShootingStar();
      for (var k = shootingStars.length - 1; k >= 0; k--) {
        var st = shootingStars[k];
        st.x += st.vx;
        st.y += st.vy;
        st.life++;

        var progress = st.life / st.maxLife;
        var fade = 1 - progress;
        if (fade <= 0 || st.y > height + 20) {
          shootingStars.splice(k, 1);
          continue;
        }

        var grad = ctx.createLinearGradient(st.x, st.y, st.x - st.vx * 12, st.y - st.vy * 12);
        grad.addColorStop(0, "rgba(0,229,255," + fade + ")");
        grad.addColorStop(1, "rgba(0,229,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * 12, st.y - st.vy * 12);
        ctx.stroke();
      }

      t++;
      loopHandle = window.requestAnimationFrame(tick);
    }

    // Future Lab has no starfield (hologram grid + soft light instead), so
    // the animation loop is paused entirely while that theme is active —
    // this keeps CPU/GPU usage down, especially on mobile. It resumes the
    // instant the person switches back to Space AI.
    var loopHandle = null;
    var loopRunning = false;

    function tick() {
      if (!isSpaceTheme()) {
        loopRunning = false;
        loopHandle = null;
        return;
      }
      draw();
    }

    function startLoop() {
      if (loopRunning) return;
      loopRunning = true;
      loopHandle = window.requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    startLoop();

    window.addEventListener("sitethemechange", function (e) {
      if (e.detail && e.detail.theme === "space") {
        startLoop();
      }
    });
  }
})();
