import { layout, tile, tankFor, defaultColor, esc, euro } from '../components.mjs';
import { products, lineById, shipping, lineReviews } from '../data.mjs';

// One page per product: the tank top on one side, everything you need to buy it on the other.
export default function product(p) {
  const l = lineById[p.line];
  const first = defaultColor(p);
  const swatches = p.colors.map((c, i) => `<label class="sw"><input type="radio" name="color" value="${i}" ${i === first ? 'checked' : ''}><span style="--c:${c.hex}"></span><em>${esc(c.name)}</em></label>`).join('');
  const sizes = p.sizes.map(s => `<label class="sz"><input type="radio" name="size" value="${s}"><span>${s}</span></label>`).join('');
  const related = products.filter(x => x.line === p.line && x.slug !== p.slug).slice(0, 2).concat(products.filter(x => x.line !== p.line && x.price <= p.price + 20).slice(0, 1));
  const data = { slug: p.slug, name: p.name, price: p.price, cut: p.cut, fabric: p.fabric, print: p.print || null, printColor: p.printColor || null, colors: p.colors, lineColor: l.color, first };

  const body = `<div class="pdp">
  <div class="pdp-stage" data-stage style="--bg:${l.color}" data-ink="${l.ink}">
    <div class="pdp-tank" data-tank>${tankFor(p, first)}</div>
    <div class="pdp-views" role="group" aria-label="Views">
      <button type="button" class="is-on" data-view="front">Front</button><button type="button" data-view="back">Back</button><button type="button" data-view="detail">Stitching</button>
    </div>
  </div>
  <div class="pdp-info" data-ink="#0B0C10">
    <p class="pdp-path mono"><a href="${l.page}">${l.name}</a> / Designed in Nantes</p>
    <h1 class="pdp-name">${esc(p.name)}</h1>
    <p class="pdp-price mono">${euro(p.price)}</p>
    <p class="pdp-desc">${esc(p.desc)}</p>
    <form data-buy-form>
      <fieldset><legend>Colour</legend><div class="sw-list">${swatches}</div></fieldset>
      <fieldset><legend>Size <a href="help.html#sizes">Guide</a></legend><div class="sz-list">${sizes}</div><p class="err" data-size-error role="alert"></p></fieldset>
      <input type="hidden" name="qty" value="1">
      <button class="bar-btn" type="submit">Add to bag, ${euro(p.price)}</button>
    </form>
    <dl class="pdp-spec">
      <div><dt>Heat</dt><dd>${p.heat} out of 10</dd></div>
      <div><dt>Fit</dt><dd>${esc(p.fitNote)}</dd></div>
      <div><dt>Made of</dt><dd>${p.details.map(esc).join('. ')}.</dd></div>
      <div><dt>Care</dt><dd>Wash cold, inside out. Hang dry.${p.line === 'marc-riage' ? ' Dry cleaning recommended.' : ''}</dd></div>
      <div><dt>Delivery</dt><dd>${shipping.map(([z, d, pr]) => `${z}: ${d}, ${pr}`).join('<br>')}</dd></div>
      <div><dt>Returns</dt><dd>30 days, free in France.</dd></div>
    </dl>
    <div class="pdp-reviews">
      <p class="mono">${p.rating} out of 5, ${p.reviews} reviews</p>
      ${lineReviews[p.line].map(r => `<blockquote>${esc(r.text)}<cite>${esc(r.name)}</cite></blockquote>`).join('')}
    </div>
  </div>
</div>
<section class="pdp-more"><h2 class="mono">Also worth burning for</h2><div class="pdp-more-grid">${related.map(x => tile(x)).join('')}</div></section>
<script type="application/json" id="product-data">${JSON.stringify(data)}</script>`;

  return layout({ title: p.name, description: `${p.desc} ${euro(p.price)}.`, body, ink: l.ink });
}
