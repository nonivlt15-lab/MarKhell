// Story, help, bag, checkout, legal notice and 404. Calm pages: text and tables, nothing else.
import { layout, tile, esc } from '../components.mjs';
import { timeline, values, team, shipping, sizeGuide, products } from '../data.mjs';

export function about() {
  const tl = timeline.map(([y, t, d]) => `<li><span class="year">${y}</span><div><h2>${t}</h2><p>${d}</p></div></li>`).join('');
  const people = team.map(m => `<tr><th scope="row">${esc(m.name)}</th><td>${esc(m.role)}</td><td>${esc(m.fact || m.text)}</td></tr>`).join('');
  const body = `<article class="story" data-ink="#F4F1EA">
  <h1 class="story-title">It started with a bully</h1>
  <p class="story-lead">Marc-Hell was founded in Nantes by five friends who were mocked for wearing tank tops. We want the tank top to be a symbol of confidence, in every room.</p>
  <ol class="story-years">${tl}</ol>
</article>
<section class="plain" data-ink="#0B0C10">
  <h2 class="plain-title">What we stand for</h2>
  <div class="plain-cols">${values.map(([t, d]) => `<p><strong>${t}.</strong> ${d}</p>`).join('')}</div>
  <h2 class="plain-title">Who does what</h2>
  <div class="table-wrap"><table class="people"><tbody>${people}</tbody></table></div>
  <h2 class="plain-title">Where we are</h2>
  <p class="plain-text">Based in Nantes. Shipping across Europe and North America. Next: the Sport line in partner gyms abroad, Marc-riage pop-up stores in fashion capitals, recycled fabrics in every line and twice as many international retail partners by 2027.</p>
</section>`;
  return layout({ title: 'Our story', description: 'How five friends mocked for wearing tank tops founded Marc-Hell in Nantes.', body, ink: '#F4F1EA', bg: '#0B0C10' });
}

export function help() {
  const ship = shipping.map(([z, d, p, f]) => `<tr><th scope="row">${z}</th><td>${d}</td><td>${p}</td><td>${f}</td></tr>`).join('');
  const sizes = sizeGuide.map(([s, c, w]) => `<tr><th scope="row">${s}</th><td>${c}</td><td>${w}</td></tr>`).join('');
  const faq = [
    ['Can I really wear a tank top to a wedding?', 'Yes. Marc-riage is tailored like a waistcoat. Under an open jacket for the ceremony, on its own for the party.'],
    ['Do you restock Limited drops?', 'Never. Each drop is a numbered run.'],
    ['How does Second Life credit work?', '€10 per garment you give us, valid for 12 months on everything.'],
    ['How do I track my order?', 'You get a tracking link by email when your parcel leaves Nantes.']
  ].map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join('');
  const body = `<section class="plain plain-top" data-ink="#0B0C10">
  <h1 class="plain-word">Help</h1>
  <h2 class="plain-title" id="shipping">Shipping</h2>
  <div class="table-wrap"><table><thead><tr><th scope="col">To</th><th scope="col">Delivery</th><th scope="col">Price</th><th scope="col">Free</th></tr></thead><tbody>${ship}</tbody></table></div>
  <h2 class="plain-title" id="returns">Returns</h2>
  <p class="plain-text">30 days for any unworn item, free in France. Atelier pieces and Limited drops can be exchanged, not refunded.</p>
  <h2 class="plain-title" id="sizes">Sizes, in centimetres</h2>
  <div class="table-wrap"><table><thead><tr><th scope="col">Size</th><th scope="col">Chest</th><th scope="col">Waist</th></tr></thead><tbody>${sizes}</tbody></table></div>
  <h2 class="plain-title" id="faq">Questions</h2>
  <div class="plain-text">${faq}</div>
  <h2 class="plain-title" id="contact">Contact</h2>
  <form class="line-form" data-demo-form="Sent. We reply within 24 hours.">
    <label>Name<input class="line-input" required autocomplete="name"></label>
    <label>Email<input class="line-input" type="email" required autocomplete="email"></label>
    <label>Message<textarea class="line-input" rows="4" required></textarea></label>
    <button class="bar-btn" type="submit">Send</button>
    <p class="form-msg" role="status"></p>
  </form>
</section>`;
  return layout({ title: 'Help', description: 'Shipping, returns, sizes and contact for Marc-Hell.', body });
}

export function cart() {
  const body = `<section class="plain plain-top" data-ink="#0B0C10">
  <h1 class="plain-word">Bag</h1>
  <div class="cart-layout"><div data-cart-page></div><aside data-summary></aside></div>
</section>`;
  return layout({ title: 'Your bag', description: 'Your Marc-Hell bag.', body });
}

export function checkout() {
  const ship = shipping.map(([z, d, p], i) => `<label class="ship-opt"><input type="radio" name="zone" value="${i}" ${i === 0 ? 'checked' : ''}><span>${z}<em>${d}</em></span><span class="mono">${p}</span></label>`).join('');
  const body = `<section class="plain plain-top" data-checkout data-ink="#0B0C10">
  <h1 class="plain-word">Checkout</h1>
  <p class="mono demo-line">Demo store. No payment is taken and nothing leaves your browser.</p>
  <div class="cart-layout">
    <form class="line-form wide" data-checkout-form novalidate>
      <label>Email<input class="line-input" id="co-mail" type="email" required autocomplete="email"></label>
      <div class="two"><label>First name<input class="line-input" id="co-first" required autocomplete="given-name"></label><label>Last name<input class="line-input" id="co-last" required autocomplete="family-name"></label></div>
      <label>Address<input class="line-input" id="co-addr" required autocomplete="street-address"></label>
      <div class="two"><label>Postcode<input class="line-input" id="co-zip" required autocomplete="postal-code"></label><label>City<input class="line-input" id="co-city" required autocomplete="address-level2"></label></div>
      <fieldset><legend>Shipping</legend>${ship}</fieldset>
      <p class="err" data-checkout-error role="alert"></p>
      <button class="bar-btn" type="submit">Place demo order</button>
    </form>
    <aside data-summary data-summary-checkout></aside>
  </div>
</section>
<section class="confirm" data-confirm data-ink="#F4F1EA" hidden>
  <p class="mono" data-order-no></p>
  <h1 class="confirm-word">Sold your soul</h1>
  <p>Demo order: nothing was charged and nothing will ship.</p>
  <a class="room-enter" href="index.html">Back to heaven</a>
</section>`;
  return layout({ title: 'Checkout', description: 'Marc-Hell demo checkout.', body });
}

export function legal() {
  const body = `<section class="plain plain-top" data-ink="#0B0C10">
  <h1 class="plain-word">Legal</h1>
  <div class="plain-text">
    <h3>Student project</h3><p>Marc-Hell is a fictional company created by students of the international track of the Licence Économie et Gestion at IAE Nantes, for an English oral presentation in 2026. It is not a registered company. No product is sold, no order is processed and no payment is collected.</p>
    <h3>Basic-Fit</h3><p>The partnership with Basic-Fit described on this site is part of the fictional scenario of the presentation. This site is not affiliated with, endorsed or sponsored by Basic-Fit. The Basic-Fit name and logo belong to their owner and are used here for educational purposes only.</p>
    <h3>Data</h3><p>This site uses no cookies and no trackers. Your bag, votes and form entries stay in your own browser.</p>
    <h3>Hosting</h3><p>Static site, online for the duration of the presentation only.</p>
  </div>
</section>`;
  return layout({ title: 'Legal notice', description: 'Legal notice of the Marc-Hell student project.', body });
}

export function notFound() {
  const body = `<section class="lost" data-ink="#F4F1EA">
  <p class="lost-alt">-404 m</p>
  <p>You went deeper than hell. There is nothing down here.</p>
  <a class="room-enter" href="index.html">Back to heaven</a>
</section>`;
  return layout({ title: 'Page not found', description: 'Page not found.', body, ink: '#F4F1EA', bg: '#0B0C10' });
}
