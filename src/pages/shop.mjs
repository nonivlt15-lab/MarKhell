import { layout, tile, nextRoom, esc } from '../components.mjs';
import { descent, products } from '../data.mjs';

// The shop is the descent laid flat: one band of colour per line.
export function shop() {
  const bands = descent.map((l, i) => {
    const items = products.filter(p => p.line === l.id);
    return `<section class="band ${i % 2 ? 'band-flip' : ''}" id="${l.id}" style="--bg:${l.color};--ink:${l.ink}" data-ink="${l.ink}">
  <h2 class="band-word"><a href="${l.page}">${l.name}</a></h2>
  <div class="band-grid">${items.map((p, k) => tile(p, k === 0 ? 'tile-big' : '')).join('')}</div>
</section>`;
  }).join('\n');

  const body = `<div class="shop-top">
  <h1 class="shop-title">Every tank top</h1>
  <ul class="shop-jump">${descent.map(l => `<li><a href="#${l.id}">${l.name}</a></li>`).join('')}</ul>
</div>
${bands}`;
  return layout({ title: 'Shop', description: 'Every Marc-Hell tank top: Marc-riage, Loungewear, Limited and Sport.', body });
}

// One line: the whole page takes its colour.
export function collection(l) {
  const items = products.filter(p => p.line === l.id);
  const body = `<article class="line" style="--bg:${l.color};--ink:${l.ink}">
  <h1 class="line-word" style="--chars:${l.name.length}">${l.name}</h1>
  <div class="line-intro">
    <p class="line-title">${esc(l.title)}</p>
    <p>${esc(l.intro)}</p>
  </div>
  <div class="line-items">${items.map(p => tile(p)).join('')}</div>
  <div class="line-notes">
    <dl>
      <div><dt>Made for</dt><dd>${esc(l.who)}</dd></div>
      <div><dt>Fabric</dt><dd>${esc(l.fabric)}</dd></div>
      <div><dt>Fit</dt><dd>${esc(l.fit)}</dd></div>
      <div><dt>Heat</dt><dd>${l.heat} out of 10</dd></div>
    </dl>
    <ul>${l.tips.map(([t, d]) => `<li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('')}</ul>
  </div>
</article>
${nextRoom(l)}`;
  return layout({ title: `${l.name} tank tops`, description: `${l.short} The ${l.name} line by Marc-Hell, designed in Nantes.`, body, bg: l.color, ink: l.ink });
}
