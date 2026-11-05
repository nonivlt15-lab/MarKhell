// Reusable pieces of the site. Each function returns a string of HTML.
import { createRequire } from 'node:module';
import { brand, descent, lineById } from './data.mjs';

const require = createRequire(import.meta.url);
export const MHTank = require('../public/assets/tank.js');

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const euro = n => '€' + (Number.isInteger(n) ? n : n.toFixed(2));
export const productUrl = p => `product-${p.slug}.html`;

// A tank top never sits on a background of its own colour.
export function defaultColor(p) {
  const line = lineById[p.line].color.toLowerCase();
  const i = p.colors.findIndex(c => c.hex.toLowerCase() !== line);
  return i < 0 ? 0 : i;
}

export function tankFor(p, colorIndex = defaultColor(p), view = 'front', extra = {}) {
  const c = p.colors[colorIndex];
  return MHTank({
    cut: p.cut, view, fabric: p.fabric, color: c.hex, trim: c.trim, mark: p.mark ? c.trim : null,
    print: p.print, printColor: p.printColor, label: `${p.name} in ${c.name}`, ...extra
  });
}

const closeIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg>';

function header() {
  const lines = descent.map(l => `<li><a class="menu-word" href="${l.page}" data-menu-color="${l.color}">${l.name}</a></li>`).join('');
  const others = [['shop.html', 'Shop everything'], ['atelier.html', 'Atelier'], ['second-life.html', 'Second Life'], ['meme-lab.html', 'Meme Lab'], ['basic-fit.html', 'Basic-Fit'], ['about.html', 'Our story'], ['help.html', 'Help']]
    .map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('');
  return `<header class="bar" id="bar">
  <button class="bar-link" type="button" data-menu-open aria-expanded="false" aria-controls="menu">Menu</button>
  <a class="bar-logo" href="index.html" aria-label="Marc-Hell, home"><span class="h-mark"></span></a>
  <button class="bar-link" type="button" data-open-cart>Bag <span data-cart-count>0</span></button>
</header>
<div class="menu" id="menu" hidden>
  <button class="bar-link menu-close" type="button" data-menu-close>Close</button>
  <nav aria-label="Main"><ul class="menu-words">${lines}</ul><ul class="menu-small">${others}</ul></nav>
</div>`;
}

function footer() {
  return `<footer class="foot" data-ink="#F4F1EA">
  <div class="foot-row">
    <a class="foot-logo" href="index.html"><span class="h-mark"></span><span>Marc-Hell<br>Nantes, France</span></a>
    <ul>${descent.map(l => `<li><a href="${l.page}">${l.name}</a></li>`).join('')}</ul>
    <ul><li><a href="shop.html">Shop</a></li><li><a href="atelier.html">Atelier</a></li><li><a href="second-life.html">Second Life</a></li><li><a href="meme-lab.html">Meme Lab</a></li></ul>
    <ul><li><a href="about.html">Our story</a></li><li><a href="basic-fit.html">Basic-Fit</a></li><li><a href="help.html">Help</a></li><li><a href="legal.html">Legal notice</a></li></ul>
  </div>
  <p class="foot-notice"><strong>Student project.</strong> Marc-Hell is a fictional brand created by students of IAE Nantes for an English oral presentation (2026). Nothing is sold and no payment is taken. The Basic-Fit partnership is part of the scenario: this site is not affiliated with, endorsed or sponsored by Basic-Fit.</p>
</footer>
<div class="scrim" data-close-cart hidden></div>
<aside class="drawer" id="cart-drawer" aria-label="Your bag" aria-hidden="true">
  <div class="drawer-head"><p>Bag <span data-cart-count>0</span></p><button type="button" class="bar-link" data-close-cart aria-label="Close bag">${closeIcon}</button></div>
  <div class="drawer-body" data-cart-items></div>
  <div class="drawer-foot">
    <p class="drawer-ship mono" data-ship-progress></p>
    <p class="drawer-total"><span>Subtotal</span><span class="mono" data-cart-subtotal>€0</span></p>
    <a class="bar-btn" href="checkout.html">Checkout</a>
    <a class="quiet" href="cart.html">View bag</a>
  </div>
</aside>`;
}

export function layout({ title, description, body, ink = '#0B0C10', bg = '#F4F1EA', bodyClass = '' }) {
  const fullTitle = title ? `${title} | Marc-Hell` : `Marc-Hell | ${brand.tagline}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="${bg}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/og-image.png">
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,400&family=DM+Mono:wght@400;500&family=Schibsted+Grotesk:wght@400;500;700&family=Six+Caps&display=swap">
<link rel="stylesheet" href="assets/styles.css">
<script src="assets/tank.js" defer></script>
<script src="assets/app.js" defer></script>
</head>
<body class="${bodyClass}" style="--page-bg:${bg};--page-ink:${ink}">
<a class="skip" href="#main">Skip to content</a>
${header()}
<main id="main" data-ink="${ink}">
${body}
</main>
${footer()}
</body>
</html>
`;
}

// A product with no card around it: the tank top lies directly on the page, and turns around on hover.
export function tile(p, cls = '') {
  const i = defaultColor(p);
  return `<a class="tile ${cls}" href="${productUrl(p)}">
  <span class="tile-img"><span class="tile-front">${tankFor(p, i)}</span><span class="tile-back">${tankFor(p, i, 'back')}</span></span>
  <span class="tile-meta"><span>${esc(p.name)}</span><span class="mono">${euro(p.price)}</span></span>
</a>`;
}

// The link at the bottom of a line page: keep going down, or back up to the top.
export function nextRoom(l) {
  const i = descent.findIndex(x => x.id === l.id);
  const next = descent[i + 1];
  if (!next) {
    return `<a class="next-room" href="shop.html" style="background:#0B0C10;color:#F4F1EA" data-ink="#F4F1EA"><span class="mono">End of the descent</span><span class="next-word">Shop everything</span></a>`;
  }
  return `<a class="next-room" href="${next.page}" style="background:${next.color};color:${next.ink}" data-ink="${next.ink}"><span class="mono">Next floor down</span><span class="next-word">${next.name}</span></a>`;
}
