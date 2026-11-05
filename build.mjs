// Builds the site: turns the pages in src/ into plain HTML files in dist/.
// Run it with:  node build.mjs   (Node 18 or newer, no npm install needed)
import { mkdirSync, rmSync, writeFileSync, readFileSync, cpSync } from 'node:fs';
import { lines, products } from './src/data.mjs';
import { productUrl } from './src/components.mjs';
import home from './src/pages/home.mjs';
import product from './src/pages/product.mjs';
import { shop, collection } from './src/pages/shop.mjs';
import { atelier, secondLife, memeLab, basicFit } from './src/pages/features.mjs';
import { about, help, cart, checkout, legal, notFound } from './src/pages/info.mjs';

const out = 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('public', out, { recursive: true });

// The logo is embedded in the CSS as a mask, so it takes the colour of the text around it.
const mark = readFileSync('public/assets/h-mark.png').toString('base64');
const css = readFileSync('public/assets/styles.css', 'utf8').replaceAll('__H_MARK__', `data:image/png;base64,${mark}`);
writeFileSync(`${out}/assets/styles.css`, css);

const pages = {
  'index.html': home(),
  'shop.html': shop(),
  'atelier.html': atelier(),
  'second-life.html': secondLife(),
  'meme-lab.html': memeLab(),
  'basic-fit.html': basicFit(),
  'about.html': about(),
  'help.html': help(),
  'cart.html': cart(),
  'checkout.html': checkout(),
  'legal.html': legal(),
  '404.html': notFound()
};
for (const l of lines) pages[l.page] = collection(l);
for (const p of products) pages[productUrl(p)] = product(p);

for (const [file, html] of Object.entries(pages)) writeFileSync(`${out}/${file}`, html);
console.log(`Built ${Object.keys(pages).length} pages into ${out}/`);
