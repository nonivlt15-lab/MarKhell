/*
 * Marc-Hell front-end: top bar, altimeter, menu, bag, product page, Atelier, Second Life, Meme Lab, checkout.
 * Everything is stored in the visitor's browser (localStorage). Nothing is sent anywhere.
 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var euro = function (n) { return '€' + (Math.round(n * 100) % 100 ? n.toFixed(2) : n); };
  var FREE_SHIPPING = 80;

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };

  // ---------- top bar + altimeter: they read whatever section is behind them ----------
  var inked = $$('[data-ink]');
  var rooms = $$('.room');
  var altBox = $('[data-altimeter]');
  var altValue = $('[data-alt-value]');
  var altPlace = $('[data-alt-place]');
  var altNow = null;

  function inkAt(y) {
    var ink = null;
    inked.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom > y && r.width && el.offsetParent !== null) ink = el.getAttribute('data-ink');
    });
    return ink;
  }
  function formatAlt(m) {
    var a = Math.round(m / 10) * 10;
    if (m <= -666) a = -666;
    return (a > 0 ? '+' : a < 0 ? '-' : '') + Math.abs(a).toLocaleString('en-US') + ' m';
  }
  function onScroll() {
    var ink = inkAt(28);
    if (ink) document.documentElement.style.setProperty('--bar-ink', ink);
    if (!rooms.length) return;

    // The altitude falls continuously between one room and the next.
    var i, r, alt = null, place = '';
    for (i = 0; i < rooms.length; i++) {
      r = rooms[i].getBoundingClientRect();
      if (r.top <= 0 && r.bottom > 0) {
        var from = +rooms[i].getAttribute('data-alt');
        var next = rooms[i + 1] ? +rooms[i + 1].getAttribute('data-alt') : from;
        var travelled = Math.min(1, -r.top / r.height);
        alt = from + (next - from) * travelled;
        place = rooms[i].getAttribute('data-place');
      }
    }
    if (altBox) {
      var ended = rooms[rooms.length - 1].getBoundingClientRect().bottom < 60;
      altBox.classList.toggle('is-off', ended);
      if (alt !== null && alt !== altNow) {
        altNow = alt;
        altValue.textContent = formatAlt(alt);
        altPlace.textContent = place;
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // ---------- menu ----------
  var menu = $('#menu'), menuOpen = $('[data-menu-open]');
  function setMenu(open) {
    menu.hidden = !open;
    menuOpen.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    (open ? $('[data-menu-close]') : menuOpen).focus();
  }
  menuOpen.addEventListener('click', function () { setMenu(true); });
  $('[data-menu-close]').addEventListener('click', function () { setMenu(false); });
  $$('[data-menu-color]').forEach(function (a) {
    function on() { menu.style.setProperty('--menu-bg', a.getAttribute('data-menu-color')); menu.style.setProperty('--menu-ink', '#0B0C10'); }
    function off() { menu.style.removeProperty('--menu-bg'); menu.style.removeProperty('--menu-ink'); }
    a.addEventListener('mouseenter', on); a.addEventListener('focus', on);
    a.addEventListener('mouseleave', off); a.addEventListener('blur', off);
  });

  // ---------- bag ----------
  var cart = store.get('mh-cart', []);
  function saveCart() { store.set('mh-cart', cart); renderCart(); }
  function count() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }
  function subtotal() { return cart.reduce(function (s, i) { return s + i.qty * i.price; }, 0); }
  function thumb(i) {
    return window.MHTank ? MHTank({ cut: i.cut, color: i.colorHex, trim: i.trim, mark: i.mark, fabric: i.fabric, print: i.print, printColor: i.printColor }) : '';
  }
  function addToCart(item) {
    var existing = cart.filter(function (i) { return i.key === item.key; })[0];
    if (existing) existing.qty = Math.min(9, existing.qty + item.qty); else cart.push(item);
    saveCart();
    openCart();
  }
  function itemHtml(i, idx) {
    return '<div class="item"><a class="item-img" href="' + (i.url || '#') + '" aria-label="' + i.name + '">' + thumb(i) + '</a>' +
      '<div><p class="item-name">' + i.name + '</p><p class="item-meta">' + i.colorName + ', ' + i.size + (i.extra ? ', ' + i.extra : '') + '</p>' +
      '<div class="item-qty"><button type="button" data-li="' + idx + '" data-d="-1" aria-label="Decrease">-</button><span>' + i.qty + '</span><button type="button" data-li="' + idx + '" data-d="1" aria-label="Increase">+</button></div></div>' +
      '<div class="item-right"><span>' + euro(i.price * i.qty) + '</span><button type="button" class="item-remove" data-remove="' + idx + '">Remove</button></div></div>';
  }
  var emptyHtml = '<div class="empty"><p>Nothing yet. Even hell has more in it.</p><a href="shop.html">Shop tank tops</a></div>';

  function summaryHtml(ship) {
    var sub = subtotal();
    return '<div class="sum"><div class="sum-row"><span>Subtotal</span><span class="mono">' + euro(sub) + '</span></div>' +
      '<div class="sum-row"><span>Shipping</span><span class="mono">' + (ship ? euro(ship) : 'Free') + '</span></div>' +
      '<div class="sum-row sum-total"><span>Total</span><span>' + euro(sub + ship) + '</span></div></div>';
  }
  function renderCart() {
    $$('[data-cart-count]').forEach(function (el) { el.textContent = count(); });
    var items = $('[data-cart-items]');
    if (items) items.innerHTML = cart.length ? cart.map(itemHtml).join('') : emptyHtml;
    var sub = $('[data-cart-subtotal]'); if (sub) sub.textContent = euro(subtotal());
    var sp = $('[data-ship-progress]');
    if (sp) { var left = FREE_SHIPPING - subtotal(); sp.textContent = left > 0 ? euro(left) + ' away from free shipping in France' : 'Free shipping in France'; }
    var page = $('[data-cart-page]');
    if (page) {
      page.innerHTML = cart.length ? cart.map(itemHtml).join('') : emptyHtml;
      var s = $('[data-summary]');
      var ship = subtotal() >= FREE_SHIPPING || !cart.length ? 0 : 4.9;
      if (s) s.innerHTML = cart.length ? summaryHtml(ship) + '<a class="bar-btn" href="checkout.html" style="margin-top:18px">Checkout</a>' : '';
    }
    if ($('[data-summary-checkout]')) updateCheckoutSummary();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-li]');
    if (t) {
      var i = cart[+t.getAttribute('data-li')];
      i.qty = Math.max(1, Math.min(9, i.qty + +t.getAttribute('data-d')));
      saveCart(); return;
    }
    var r = e.target.closest('[data-remove]');
    if (r) { cart.splice(+r.getAttribute('data-remove'), 1); saveCart(); }
  });

  var drawer = $('#cart-drawer'), scrim = $('.scrim'), lastFocus;
  function openCart() {
    lastFocus = document.activeElement;
    scrim.hidden = false; drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { drawer.querySelector('button').focus(); }, 50);
  }
  function closeCart() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); scrim.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeCart(); if (!menu.hidden) setMenu(false);
  });

  // ---------- product page ----------
  var pdata = $('#product-data');
  if (pdata) {
    var P = JSON.parse(pdata.textContent);
    var form = $('[data-buy-form]'), stage = $('[data-stage]'), tankBox = $('[data-tank]');
    var colorIdx = P.first, view = 'front';
    var drawProduct = function () {
      var c = P.colors[colorIdx];
      tankBox.innerHTML = MHTank({ cut: P.cut, view: view, fabric: P.fabric, color: c.hex, trim: c.trim, mark: c.trim, print: P.print, printColor: P.printColor, label: P.name + ' in ' + c.name });
      // A tank top never sits on a background of its own colour.
      var same = c.hex.toLowerCase() === P.lineColor.toLowerCase();
      stage.style.setProperty('--bg', same ? '#F4F1EA' : P.lineColor);
    };
    $$('[data-view]').forEach(function (b) {
      b.addEventListener('click', function () {
        view = b.getAttribute('data-view');
        $$('[data-view]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        drawProduct();
      });
    });
    $$('input[name=color]', form).forEach(function (r) {
      r.addEventListener('change', function () { colorIdx = +r.value; drawProduct(); });
    });
    var err = $('[data-size-error]');
    $$('input[name=size]', form).forEach(function (r) { r.addEventListener('change', function () { err.textContent = ''; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var size = (form.querySelector('input[name=size]:checked') || {}).value;
      if (!size) { err.textContent = 'Choose a size first.'; form.querySelector('input[name=size]').focus(); return; }
      var c = P.colors[colorIdx];
      addToCart({
        key: P.slug + '|' + c.name + '|' + size, slug: P.slug, url: 'product-' + P.slug + '.html', name: P.name, price: P.price,
        colorName: c.name, colorHex: c.hex, trim: c.trim, mark: c.trim, cut: P.cut, fabric: P.fabric, print: P.print, printColor: P.printColor,
        size: size, qty: 1
      });
    });
    drawProduct();
  }

  // ---------- Atelier ----------
  var cfg = $('[data-config-form]');
  if (cfg) {
    var cview = 'front', names = {};
    $$('.sw input', cfg).forEach(function (i) { names[i.name + i.value] = i.parentNode.querySelector('em').textContent; });
    var state = function () {
      var v = function (n) { var el = cfg.querySelector('input[name=' + n + ']:checked'); return el ? el.value : ''; };
      return { cut: v('cut'), fabric: v('fabric'), color: v('color'), trim: v('trim'), mark: v('mark'), size: v('size'), print: cfg.print.value.trim().toUpperCase() };
    };
    var price = function (s) { return 49 + (s.cut === 'vest' ? 30 : 0) + (s.fabric === 'satin' ? 10 : 0) + (s.print ? 8 : 0); };
    var draw = function () {
      var s = state();
      $('[data-config-preview]').innerHTML = MHTank({ cut: s.cut, view: cview, color: s.color, trim: s.trim, mark: s.mark, fabric: s.fabric, print: s.print ? [s.print] : null, printColor: s.mark });
      var darkTank = MHTank.luminance(s.color) < 0.35;
      var bench = $('[data-stage]');
      bench.style.setProperty('--stage', darkTank ? '#F4F1EA' : '#0B0C10');
      bench.style.setProperty('--stage-ink', darkTank ? '#0B0C10' : '#F4F1EA');
      bench.setAttribute('data-ink', darkTank ? '#0B0C10' : '#F4F1EA');
      onScroll();
      $('[data-config-price]').textContent = euro(price(s));
      $('[data-config-summary]').textContent = names['color' + s.color] + ', ' + { classic: 'classic', racer: 'racerback', vest: 'tailored vest' }[s.cut] + ', ' + s.fabric + ', ' + s.size;
    };
    cfg.addEventListener('input', draw);
    $$('[data-config-view]').forEach(function (b) {
      b.addEventListener('click', function () {
        cview = b.getAttribute('data-config-view');
        $$('[data-config-view]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        draw();
      });
    });
    cfg.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = state();
      addToCart({
        key: 'custom|' + JSON.stringify(s), url: 'atelier.html', name: 'Atelier tank top', price: price(s),
        colorName: names['color' + s.color], colorHex: s.color, trim: s.trim, mark: s.mark, cut: s.cut, fabric: s.fabric,
        print: s.print ? [s.print] : null, printColor: s.mark, size: s.size, qty: 1, extra: s.print || 'made to order'
      });
    });
    draw();
  }

  // ---------- Second Life calculator ----------
  var est = $('[data-estimator]');
  if (est) {
    var range = $('input[type=range]', est);
    var calc = function () {
      var n = +range.value;
      $('[data-est-n]').textContent = n;
      $('[data-est-credit]').textContent = euro(n * 10);
      $('[data-est-tanks]').textContent = Math.max(1, Math.floor(n / 2.5));
      $('[data-est-water]').textContent = (n * 2700).toLocaleString('en-US') + ' L';
    };
    range.addEventListener('input', calc); calc();
  }

  // ---------- Meme Lab ----------
  var voted = store.get('mh-votes', {});
  $$('.meme').forEach(function (row) {
    var btn = $('[data-vote]', row);
    if (!btn) return;
    var id = row.getAttribute('data-meme'), cnt = $('.vote-count', row);
    var paint = function () {
      cnt.textContent = (+cnt.getAttribute('data-votes') + (voted[id] ? 1 : 0)).toLocaleString('en-US');
      btn.textContent = voted[id] ? 'Voted' : 'Vote';
      btn.classList.toggle('voted', !!voted[id]);
    };
    btn.addEventListener('click', function () { voted[id] = !voted[id]; store.set('mh-votes', voted); paint(); });
    paint();
  });
  var cd = $('[data-countdown]');
  if (cd) {
    var end = new Date(cd.getAttribute('data-countdown')).getTime();
    var tick = function () {
      var d = Math.max(0, end - Date.now());
      $('[data-cd=d]', cd).textContent = String(Math.floor(d / 864e5)).padStart(2, '0');
      $('[data-cd=h]', cd).textContent = String(Math.floor(d / 36e5) % 24).padStart(2, '0');
      $('[data-cd=m]', cd).textContent = String(Math.floor(d / 6e4) % 60).padStart(2, '0');
    };
    tick(); setInterval(tick, 30000);
  }

  // ---------- demo forms ----------
  $$('[data-demo-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      $('.form-msg', f).textContent = f.getAttribute('data-demo-form');
      f.reset();
    });
  });
  var member = $('[data-member-form]');
  if (member) member.addEventListener('submit', function (e) {
    e.preventDefault();
    $('.form-msg', member).textContent = 'Welcome back: 48 h early access and 15% off every Sport drop.';
  });

  // ---------- checkout ----------
  var co = $('[data-checkout-form]');
  var zones = [4.9, 8.9, 14.9], freeFrom = [80, 120, 150];
  function zoneShipping() {
    var z = co ? +(co.querySelector('input[name=zone]:checked') || { value: 0 }).value : 0;
    return subtotal() >= freeFrom[z] ? 0 : zones[z];
  }
  function updateCheckoutSummary() {
    var s = $('[data-summary-checkout]');
    if (s) s.innerHTML = cart.length ? cart.map(itemHtml).join('') + summaryHtml(zoneShipping()) : emptyHtml;
  }
  if (co) {
    co.addEventListener('change', updateCheckoutSummary);
    co.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = $('[data-checkout-error]');
      if (!cart.length) { err.textContent = 'Your bag is empty.'; return; }
      var bad = $$('input[required]', co).filter(function (i) { return !i.checkValidity(); });
      if (bad.length) { err.textContent = 'Please fill in every field.'; bad[0].focus(); return; }
      err.textContent = '';
      cart = []; saveCart();
      $('[data-checkout]').hidden = true;
      $('[data-confirm]').hidden = false;
      $('[data-order-no]').textContent = 'Order MH-' + Math.floor(100000 + Math.random() * 900000);
      inked = $$('[data-ink]');
      window.scrollTo(0, 0);
      onScroll();
    });
  }

  renderCart();
})();
