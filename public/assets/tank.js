/*
 * MHTank: draws a Marc-Hell tank top as a flat paper cut-out (SVG string).
 * Shared by the build and the browser, so a product looks the same everywhere.
 *
 * MHTank({ cut, view, color, trim, mark, fabric, print, printColor, crown, headroom })
 *   cut      'classic' | 'racer' | 'vest'
 *   view     'front' | 'back' | 'detail'
 *   fabric   'jersey' | 'rib' | 'mesh' | 'satin' | 'modal'
 *   print    short lines printed on the chest, or null
 *   crown    'halo' | 'horns': the two halves of the logo, worn by the tank top
 *   headroom keeps space above the straps, so every tank top on the home page lines up
 */
(function (root) {
  var uid = 0;

  var CUTS = {
    classic: {
      front: {
        body: 'M92 30 L128 30 C130 70 140 92 150 92 C160 92 170 70 172 30 L208 30 C206 90 214 136 240 150 L246 352 Q150 364 54 352 L60 150 C86 136 94 90 92 30 Z',
        trims: 'M128 30 C130 70 140 92 150 92 C160 92 170 70 172 30 M208 30 C206 90 214 136 240 150 M60 150 C86 136 94 90 92 30'
      },
      back: {
        body: 'M92 30 L128 30 C132 48 140 56 150 56 C160 56 168 48 172 30 L208 30 C206 90 214 136 240 150 L246 352 Q150 364 54 352 L60 150 C86 136 94 90 92 30 Z',
        trims: 'M128 30 C132 48 140 56 150 56 C160 56 168 48 172 30 M208 30 C206 90 214 136 240 150 M60 150 C86 136 94 90 92 30'
      },
      mark: [186, 126], hem: 'M58 338 Q150 350 242 338'
    },
    racer: {
      front: {
        body: 'M104 30 L130 30 C132 68 140 88 150 88 C160 88 168 68 170 30 L196 30 C192 100 210 150 242 166 L246 352 Q150 364 54 352 L58 166 C90 150 108 100 104 30 Z',
        trims: 'M130 30 C132 68 140 88 150 88 C160 88 168 68 170 30 M196 30 C192 100 210 150 242 166 M58 166 C90 150 108 100 104 30'
      },
      back: {
        body: 'M126 30 C140 40 160 40 174 30 C172 70 176 110 196 140 C214 156 230 164 242 168 L246 352 Q150 364 54 352 L58 168 C70 164 86 156 104 140 C124 110 128 70 126 30 Z',
        trims: 'M126 30 C140 40 160 40 174 30 M174 30 C172 70 176 110 196 140 C214 156 230 164 242 168 M58 168 C70 164 86 156 104 140 C124 110 128 70 126 30'
      },
      mark: [186, 132], hem: 'M58 338 Q150 350 242 338'
    },
    vest: {
      front: {
        body: 'M90 30 L124 30 L150 168 L176 30 L210 30 C208 92 216 136 240 150 L244 340 L196 360 L150 346 L104 360 L56 340 L60 150 C84 136 92 92 90 30 Z',
        trims: 'M124 30 L150 168 L176 30 M210 30 C208 92 216 136 240 150 M60 150 C84 136 92 92 90 30',
        extra: function (ink) {
          var b = '';
          [198, 232, 266, 300].forEach(function (y) { b += '<circle cx="150" cy="' + y + '" r="4.2" fill="' + ink + '"/>'; });
          return '<path d="M150 168 L150 346" stroke="' + ink + '" stroke-width="1" fill="none"/>' +
            '<path d="M78 246 L116 242 M184 242 L222 246" stroke="' + ink + '" stroke-width="2.4" fill="none"/>' + b;
        }
      },
      back: {
        body: 'M90 30 L124 30 C130 46 140 52 150 52 C160 52 170 46 176 30 L210 30 C208 92 216 136 240 150 L244 352 Q150 362 56 352 L60 150 C84 136 92 92 90 30 Z',
        trims: 'M124 30 C130 46 140 52 150 52 C160 52 170 46 176 30 M210 30 C208 92 216 136 240 150 M60 150 C84 136 92 92 90 30',
        extra: function (ink) {
          return '<path d="M112 266 L188 266" stroke="' + ink + '" stroke-width="5" fill="none"/>' +
            '<rect x="142" y="259" width="16" height="14" fill="none" stroke="' + ink + '" stroke-width="2"/>';
        }
      },
      mark: [194, 118], hem: null
    }
  };

  function hexToRgb(h) {
    h = h.replace('#', '');
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function luminance(hex) {
    var c = hexToRgb(hex);
    return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
  }
  function mix(hex, target, amt) {
    var a = hexToRgb(hex), b = target === 'white' ? [255, 255, 255] : [0, 0, 0];
    return '#' + a.map(function (v, i) { return ('0' + Math.round(v + (b[i] - v) * amt).toString(16)).slice(-2); }).join('');
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  function MHTank(o) {
    o = o || {};
    var cut = CUTS[o.cut] || CUTS.classic;
    var view = o.view || 'front';
    var shape = cut[view === 'back' ? 'back' : 'front'];
    var color = o.color || '#0B0C10';
    var dark = luminance(color) < 0.35;
    var contrast = dark ? '#F4F1EA' : '#0B0C10';
    var trim = o.trim || contrast;
    var ink = dark ? mix(color, 'white', 0.32) : mix(color, 'black', 0.4);
    // The H stays readable: if it is too close to the fabric, it takes the contrast colour.
    var markColor = o.mark ? (Math.abs(luminance(o.mark) - luminance(color)) < 0.25 ? contrast : o.mark) : null;
    var id = 'mh' + (++uid) + Math.random().toString(36).slice(2, 6);
    var assets = o.assets || 'assets/';

    var vb = o.headroom ? '-20 -70 340 450' : '20 10 260 360';
    if (view === 'detail') vb = (cut.mark[0] - 52) + ' ' + (cut.mark[1] - 58) + ' 104 116';

    var defs = '<clipPath id="' + id + 'c"><path d="' + shape.body + '"/></clipPath>';
    var texture = '';
    if (o.fabric === 'rib') {
      defs += '<pattern id="' + id + 'p" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="1.4" height="6" fill="' + ink + '"/></pattern>';
      texture = '<rect x="0" y="0" width="300" height="380" fill="url(#' + id + 'p)" opacity=".55"/>';
    } else if (o.fabric === 'mesh') {
      defs += '<pattern id="' + id + 'p" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.3" fill="' + ink + '"/></pattern>';
      texture = '<rect x="50" y="210" width="200" height="160" fill="url(#' + id + 'p)"/>';
    }

    var mark = '';
    if (markColor && view !== 'back') {
      var mw = 21, mh = mw * 249 / 233;
      defs += '<filter id="' + id + 'm"><feFlood flood-color="' + markColor + '"/><feComposite in2="SourceAlpha" operator="in"/></filter>';
      mark = '<image href="' + assets + 'h-mark.png" x="' + (cut.mark[0] - mw / 2) + '" y="' + (cut.mark[1] - mh / 2) + '" width="' + mw + '" height="' + mh + '" filter="url(#' + id + 'm)"/>';
    }
    if (markColor && view === 'back') {
      mark = '<text x="150" y="' + (o.cut === 'racer' ? 196 : 82) + '" text-anchor="middle" font-family="\'Six Caps\', Impact, sans-serif" font-size="15" letter-spacing="2" fill="' + markColor + '">MARC-HELL NANTES</text>';
    }

    var print = '';
    if (o.print && o.print.length && view === 'front') {
      var pc = o.printColor || contrast;
      var y0 = (o.cut === 'vest' ? 206 : 192) + (3 - o.print.length) * 18;
      o.print.forEach(function (line, i) {
        print += '<text x="150" y="' + (y0 + i * 44) + '" text-anchor="middle" font-family="\'Six Caps\', Impact, sans-serif" font-size="50" letter-spacing="1.5" fill="' + pc + '">' + esc(line) + '</text>';
      });
    }

    var crown = '';
    var crownColor = o.crownColor || contrast;
    if (o.crown === 'halo') {
      crown = '<ellipse cx="150" cy="-22" rx="58" ry="13" fill="none" stroke="' + crownColor + '" stroke-width="7"/>';
    } else if (o.crown === 'horns') {
      crown = '<path d="M92 34 C62 22 50 -8 58 -46 C70 -18 86 2 112 12 Z M208 34 C238 22 250 -8 242 -46 C230 -18 214 2 188 12 Z" fill="' + crownColor + '"/>';
    }

    var hem = cut.hem ? '<path d="' + cut.hem + '" fill="none" stroke="' + ink + '" stroke-width="1.2" stroke-dasharray="4 4"/>' : '';
    var extra = shape.extra ? shape.extra(ink) : '';

    return '<svg class="tank" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(o.label || 'Marc-Hell tank top') + '">' +
      '<defs>' + defs + '</defs>' + crown +
      '<path d="' + shape.body + '" fill="' + color + '"/>' +
      '<g clip-path="url(#' + id + 'c)">' + texture + hem + extra + print + mark + '</g>' +
      '<path d="' + shape.trims + '" fill="none" stroke="' + trim + '" stroke-width="5" stroke-linejoin="round"/>' +
      '</svg>';
  }

  MHTank.luminance = luminance;
  if (typeof module !== 'undefined' && module.exports) module.exports = MHTank;
  else root.MHTank = MHTank;
})(this);
