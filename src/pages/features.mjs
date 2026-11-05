// Four pages, four different compositions: a workbench, a sentence, a leaderboard and a poster.
import { layout, tile, MHTank, esc } from '../components.mjs';
import { memes, products, productBySlug } from '../data.mjs';

export function atelier() {
  const opt = (name, items, checked = 0) => items.map(([v, label], i) => `<label class="pick"><input type="radio" name="${name}" value="${v}" ${i === checked ? 'checked' : ''}><span>${label}</span></label>`).join('');
  const sw = (name, items, checked = 0) => items.map(([v, label], i) => `<label class="sw"><input type="radio" name="${name}" value="${v}" ${i === checked ? 'checked' : ''}><span style="--c:${v}"></span><em>${label}</em></label>`).join('');
  const fabricColors = [['#0B0C10', 'Obsidian'], ['#F4F1EA', 'Cream'], ['#FF1E27', 'Electric Red'], ['#DCAE96', 'Dusty Rose'], ['#9AA9B8', 'Cloud Blue'], ['#D4FF3F', 'Acid Lime'], ['#1E2A44', 'Navy'], ['#3A3B40', 'Charcoal']];
  const accent = [['#FF1E27', 'Electric Red'], ['#0B0C10', 'Obsidian'], ['#F4F1EA', 'Cream'], ['#DCAE96', 'Dusty Rose'], ['#D4FF3F', 'Acid Lime'], ['#C9A227', 'Gold']];

  const body = `<div class="bench" data-configurator>
  <div class="bench-stage" data-stage data-ink="#0B0C10">
    <div class="bench-tank" data-config-preview>${MHTank({ cut: 'classic', color: '#0B0C10', trim: '#FF1E27', mark: '#FF1E27' })}</div>
    <div class="pdp-views" role="group" aria-label="Views"><button type="button" class="is-on" data-config-view="front">Front</button><button type="button" data-config-view="back">Back</button><button type="button" data-config-view="detail">Stitching</button></div>
  </div>
  <form class="bench-panel" data-config-form data-ink="#0B0C10">
    <h1 class="bench-title">Atelier</h1>
    <p class="bench-lede">Sewn to order in Nantes, shipped in ten working days.</p>
    <fieldset><legend>Cut</legend><div class="pick-list">${opt('cut', [['classic', 'Classic'], ['racer', 'Racerback'], ['vest', 'Tailored vest']])}</div></fieldset>
    <fieldset><legend>Fabric</legend><div class="pick-list">${opt('fabric', [['jersey', 'Jersey'], ['mesh', 'Mesh'], ['rib', 'Rib'], ['satin', 'Satin']])}</div></fieldset>
    <fieldset><legend>Colour</legend><div class="sw-list">${sw('color', fabricColors)}</div></fieldset>
    <fieldset><legend>Binding</legend><div class="sw-list">${sw('trim', accent)}</div></fieldset>
    <fieldset><legend>Embroidered H</legend><div class="sw-list">${sw('mark', accent)}</div></fieldset>
    <fieldset><legend>Chest print</legend><input class="line-input upper" type="text" name="print" maxlength="10" placeholder="Up to 10 letters" autocomplete="off" aria-label="Chest print"></fieldset>
    <fieldset><legend>Size</legend><div class="sz-list">${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => `<label class="sz"><input type="radio" name="size" value="${s}" ${s === 'M' ? 'checked' : ''}><span>${s}</span></label>`).join('')}</div></fieldset>
    <p class="bench-sum mono" data-config-summary></p>
    <button class="bar-btn" type="submit">Add to bag, <span data-config-price>€49</span></button>
    <p class="mono tiny">From €49. Vest +€30, satin +€10, print +€8.</p>
  </form>
</div>`;
  return layout({ title: 'Atelier', description: 'Design a made-to-order Marc-Hell tank top, sewn in Nantes.', body });
}

export function secondLife() {
  const body = `<article class="reborn" data-ink="#0B0C10">
  <h1 class="reborn-word" style="--chars:13">Reincarnation</h1>
  <p class="reborn-sentence">Bring us an old shirt<sup>1</sup>. We take it apart<sup>2</sup>. It comes back as a tank top<sup>3</sup>, and you leave with €10<sup>4</sup>.</p>
  <ol class="reborn-notes">
    <li>Any garment, in any state, at our Nantes store or a partner Basic-Fit club in France. Or slip it in your next return parcel for free.</li>
    <li>Sorted by hand. What can be rebuilt goes to the atelier. The rest becomes recycled yarn.</li>
    <li>Cut and sewn in Nantes, so no two Second Life pieces are the same.</li>
    <li>Credit per garment, valid for 12 months on everything.</li>
  </ol>
  <div class="reborn-calc" data-estimator>
    <label for="garments" class="mono">Garments in the back of your wardrobe</label>
    <input id="garments" type="range" min="1" max="30" value="5">
    <p class="calc-line"><strong data-est-n>5</strong> garments <span>=</span> <strong data-est-credit>€50</strong> credit <span>=</span> <strong data-est-tanks>2</strong> tank tops <span>=</span> <strong data-est-water>13,500 L</strong> of water saved</p>
    <p class="mono tiny">Water: based on the commonly cited 2,700 litres for the cotton of one T-shirt. Illustrative.</p>
  </div>
  <form class="line-form" data-demo-form="Booked. Bring the bag, we bring the coffee.">
    <h2 class="form-word">Book a drop-off</h2>
    <label>Name<input class="line-input" required autocomplete="name"></label>
    <label>Email<input class="line-input" type="email" required autocomplete="email"></label>
    <label>Day<input class="line-input" type="date" required></label>
    <button class="bar-btn" type="submit">Book it</button>
    <p class="form-msg" role="status"></p>
  </form>
</article>`;
  return layout({ title: 'Second Life', description: 'Bring your old clothes, get €10 credit per garment, and they come back as Marc-Hell tank tops.', body });
}

export function memeLab() {
  const top = memes[0].votes;
  const rows = memes.map((m, i) => `<li class="meme" data-meme="${m.id}" style="--size:${(0.38 + 0.62 * m.votes / top).toFixed(3)}">
    <p class="meme-text">${esc(m.title)}</p>
    <p class="meme-meta mono"><span>${esc(m.author)}</span> <span class="vote-count" data-votes="${m.votes}">${m.votes.toLocaleString('en-US')}</span>
    ${i === 0 ? '<span>Winner, printed as Drop 02</span>' : '<button type="button" data-vote>Vote</button>'}</p>
  </li>`).join('');
  const drop = productBySlug['drop-02-gym-angel'];

  const body = `<article class="lab" data-ink="#0B0C10">
  <h1 class="lab-title mono">Meme Lab. The biggest line becomes the next print.</h1>
  <p class="lab-clock mono" data-countdown="2026-11-30T23:59:00">Voting closes in <strong data-cd="d">00</strong> days <strong data-cd="h">00</strong> h <strong data-cd="m">00</strong> min</p>
  <ol class="memes">${rows}</ol>
  <div class="lab-foot">
    <form class="line-form" data-demo-form="Received. If people like it, it joins the board within 48 hours.">
      <h2 class="form-word">Submit yours</h2>
      <label>Your meme, in one line<input class="line-input" required maxlength="60"></label>
      <label>Your handle<input class="line-input" required placeholder="@"></label>
      <button class="bar-btn" type="submit">Submit</button>
      <p class="form-msg" role="status"></p>
    </form>
    <div class="lab-winner">${tile(drop)}</div>
  </div>
</article>`;
  return layout({ title: 'Meme Lab', description: 'Submit and vote for memes. The winner becomes the next numbered Marc-Hell drop.', body, bg: '#D4FF3F' });
}

export function basicFit() {
  const items = ['basic-fit-training-tank', 'inferno-performance-tank', 'halo-racerback'].map(s => productBySlug[s]);
  const body = `<article class="bf" data-ink="#0B0C10">
  <div class="bf-poster">
    <h1 class="bf-word">Train like hell</h1>
    <div class="bf-logos"><span class="h-mark"></span><span class="bf-x">×</span><img src="assets/basic-fit.jpg" alt="Basic-Fit" width="900" height="273"></div>
  </div>
  <div class="bf-text">
    <p class="bf-lead">Marc-Hell is the official performance gear of Basic-Fit clubs. Our coaches test every Sport piece on the gym floor for a month before it goes on sale.</p>
    <p>Members get 48 hours of early access and 15% off every Sport drop. And there is a Second Life box in partner clubs in France: drop your old training clothes, take €10 per piece.</p>
    <form class="line-form" data-member-form>
      <label>Member number<input class="line-input" required inputmode="numeric" pattern="[0-9]{6,10}" placeholder="6 to 10 digits"></label>
      <button class="bar-btn" type="submit">See my benefits</button>
      <p class="form-msg" role="status"></p>
    </form>
  </div>
  <div class="bf-items">${items.map(p => tile(p)).join('')}</div>
</article>`;
  return layout({ title: 'Basic-Fit partnership', description: 'Marc-Hell, official performance gear of Basic-Fit clubs (fictional student project scenario).', body });
}
