// The home page is one idea: a descent from heaven to hell.
// Each room clips its own fixed tank top, so the garment changes exactly where the room's edge passes.
import { layout, tankFor, MHTank, euro, esc } from '../components.mjs';
import { descent, rooms, products, productBySlug } from '../data.mjs';

const fit = word => `style="--chars:${word.length}"`;

export default function home() {
  const heaven = `<section class="room room-first" style="--bg:#F4F1EA;--ink:#0B0C10" data-ink="#0B0C10" data-alt="9000" data-place="Heaven">
  <div class="room-pin">
    <h1 class="first-title"><span class="first-hell">Hellishly<br>comfortable</span><span class="first-heaven">heavenly styled</span></h1>
    <p class="first-note">Tank tops for every occasion.<br>Founded in Nantes, 2026.</p>
    <p class="first-cue mono">Scroll to descend</p>
  </div>
  <div class="room-tank" aria-hidden="true">${MHTank({ cut: 'classic', color: '#0B0C10', trim: '#0B0C10', mark: '#F4F1EA', headroom: true, crown: 'halo', crownColor: '#0B0C10' })}</div>
</section>`;

  const floors = descent.map(l => {
    const r = rooms[l.id];
    const [slug, colorIndex] = r.tank;
    const p = productBySlug[slug];
    const from = Math.min(...products.filter(x => x.line === l.id).map(x => x.price));
    return `<section class="room" style="--bg:${l.color};--ink:${l.ink}" data-ink="${l.ink}" data-alt="${r.alt}" data-place="${esc(r.place)}">
  <div class="room-pin">
    <h2 class="room-word" ${fit(l.name)}>${l.name}</h2>
    <div class="room-caption">
      <p class="room-line">${esc(r.line)}</p>
      <a class="room-enter" href="${l.page}">Enter ${l.name}, from ${euro(from)}</a>
    </div>
  </div>
  <div class="room-tank" aria-hidden="true">${tankFor(p, colorIndex, 'front', { headroom: true })}</div>
</section>`;
  }).join('\n');

  const hell = `<section class="room room-last" style="--bg:#0B0C10;--ink:#F4F1EA" data-ink="#F4F1EA" data-alt="-666" data-place="Hell">
  <div class="room-pin">
    <h2 class="room-word" ${fit('Hell')}>Hell</h2>
    <div class="room-caption">
      <p class="room-line">You made it. Comfortable, isn't it?</p>
      <a class="room-enter" href="shop.html">Shop every tank top</a>
    </div>
  </div>
  <div class="room-tank" aria-hidden="true">${MHTank({ cut: 'classic', color: '#FF1E27', trim: '#FF1E27', mark: '#0B0C10', fabric: 'mesh', headroom: true, crown: 'horns', crownColor: '#FF1E27' })}</div>
</section>`;

  const also = [
    ['atelier.html', 'Atelier', 'Build yours, stitch by stitch'],
    ['second-life.html', 'Second Life', 'Your old clothes come back as tank tops'],
    ['meme-lab.html', 'Meme Lab', 'Vote for the next print'],
    ['basic-fit.html', 'Basic-Fit', 'The official kit of the gym floor'],
    ['about.html', 'Our story', 'It started with a bully']
  ].map(([h, t, d]) => `<li><a href="${h}"><span class="also-word">${t}</span><span class="also-desc">${d}</span></a></li>`).join('');

  const body = `<div class="altimeter" data-altimeter aria-hidden="true"><span class="mono alt-value" data-alt-value>+9,000 m</span><span class="mono alt-place" data-alt-place>Heaven</span></div>
${heaven}
${floors}
${hell}
<nav class="also" aria-label="More from Marc-Hell" data-ink="#F4F1EA"><ul>${also}</ul></nav>`;

  return layout({
    title: '',
    description: 'Marc-Hell makes tank tops for every occasion: weddings, loungewear, limited drops and sport. Designed in Nantes.',
    body, bodyClass: 'page-home'
  });
}
