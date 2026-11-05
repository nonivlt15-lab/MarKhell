// Everything the site says about the brand lives here.
// Change a price, a colour or a line once, and every page that uses it follows.

export const brand = {
  name: 'Marc-Hell',
  tagline: 'Hellishly comfortable. Heavenly styled.',
  city: 'Nantes, France',
  founded: 2026,
  url: 'https://marc-hell.netlify.app'
};

export const lines = [
  {
    id: 'sport', name: 'Sport', page: 'sport.html', color: '#FF1E27', ink: '#0B0C10', paper: '#F7E4E1',
    kicker: 'Performance line', heat: '3–6',
    short: 'Sweat-wicking tank tops built for the lift and cut for the rest of your day.',
    title: 'Built for the last rep.',
    intro: 'Tank tops are already the most worn top in the gym. We just made them work harder: sweat-wicking mesh, flat seams that never rub under a barbell and armholes cut for full range of motion. Tested with athletes, worn in every Basic-Fit club in our partner programme.',
    who: 'Athletes, bodybuilders and anyone who trains',
    fabric: 'Recycled polyester mesh, 140 g/m²',
    fit: 'Athletic, room in the shoulders',
    tips: [
      ['Train', 'Racerback for pulling days, classic cut for pressing days. Your shoulders will notice.'],
      ['Layer', 'Over a long-sleeve base layer for outdoor runs from October to March.'],
      ['Recover', 'Wash cold, hang dry, skip the softener: it clogs the mesh.']
    ]
  },
  {
    id: 'marc-riage', name: 'Marc-riage', page: 'marc-riage.html', color: '#DCAE96', ink: '#0B0C10', paper: '#F3E6DE',
    kicker: 'Formal & wedding line', heat: '7–9',
    short: 'Tailored tank tops for weddings and black-tie nights. Elegance, sleeves optional.',
    title: 'Say yes. Lose the sleeves.',
    intro: 'Weddings have dress codes. We read them carefully, then ignored the part about sleeves. Wool-blend fronts, satin backs and real horn buttons: the Marc-riage line brings the tank top to the altar without anyone asking whether you got lost on the way to the gym.',
    who: 'Grooms, best men and guests who want to be remembered',
    fabric: 'Wool-blend front, satin back',
    fit: 'Tailored, adjustable back strap',
    tips: [
      ['Pair', 'Under an open jacket for the ceremony, on its own for the first dance.'],
      ['Match', 'Dusty Rose with navy or charcoal trousers. Obsidian with anything.'],
      ['Survive', 'Dry clean only. It will see champagne. That is the point.']
    ]
  },
  {
    id: 'loungewear', name: 'Loungewear', page: 'loungewear.html', color: '#9AA9B8', ink: '#0B0C10', paper: '#E6EAEE',
    kicker: 'Comfort & sleep line', heat: '1–3',
    short: 'Soft enough to sleep in, sharp enough for a camera-on meeting.',
    title: 'Home, but make it Marc-Hell.',
    intro: 'For remote workers, Sunday experts and professional nappers. Brushed modal and organic cotton rib, cut a little longer and a little looser, so the tank top you wake up in is the one you take your 9 a.m. call in.',
    who: 'Remote workers, homebodies, everyday wearers',
    fabric: 'Organic cotton rib and modal',
    fit: 'Relaxed, slightly longer body',
    tips: [
      ['Work', 'Camera-on from the waist up. Nobody needs to see the rest.'],
      ['Sleep', 'Cloud Modal breathes at night and does not pill after fifty washes.'],
      ['Weekend', 'With wide trousers and a coffee. In that order.']
    ]
  },
  {
    id: 'limited', name: 'Limited', page: 'limited.html', color: '#D4FF3F', ink: '#0B0C10', paper: '#EEF5D2',
    kicker: 'Fun & limited drops', heat: '8–10',
    short: 'Pop-culture drops, sponsored pieces and memes voted by you. Gone when they are gone.',
    title: 'Small runs. Loud references.',
    intro: 'Each drop is printed once, in a numbered run, and never restocked. Some are inside jokes, some are sponsored collaborations, and some come straight from the Meme Lab, where you submit and vote for the next print.',
    who: 'Gen Z and millennials who live on the internet',
    fabric: 'Heavyweight organic cotton, 200 g/m²',
    fit: 'Boxy, dropped armholes',
    tips: [
      ['Collect', 'Every piece carries its drop number on the back neck tape.'],
      ['Vote', 'The next drop is picked in the Meme Lab. Your vote counts double on launch week.'],
      ['Flex', 'Wear it where people will ask about it. That is the whole idea.']
    ]
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const products = [
  // Sport
  {
    slug: 'inferno-performance-tank', name: 'Inferno Performance Tank', line: 'sport', price: 39, cut: 'classic', fabric: 'mesh',
    colors: [['Electric Red', '#FF1E27', '#0B0C10'], ['Obsidian', '#0B0C10', '#FF1E27'], ['Cream', '#F4F1EA', '#FF1E27']],
    mark: true, badge: 'Bestseller', rating: 4.9, reviews: 312, heat: 5,
    desc: 'Our signature gym tank top. Sweat-wicking mesh panels where you heat up most, flat seams that never rub under a barbell, and the H stitched where a medal would go.',
    details: ['Recycled polyester mesh, 140 g/m²', 'Mesh ventilation zones on the back and lower front', 'Flat-lock seams', 'Embroidered H on the chest'],
    fitNote: 'Athletic fit. Take your usual size; size up for a looser look.'
  },
  {
    slug: 'halo-racerback', name: 'Halo Racerback', line: 'sport', price: 35, cut: 'racer', fabric: 'mesh',
    colors: [['Obsidian', '#0B0C10', '#F4F1EA'], ['Electric Red', '#FF1E27', '#F4F1EA']],
    mark: true, badge: 'New', rating: 4.8, reviews: 141, heat: 6,
    desc: 'A racerback that frees your shoulder blades for pulling days. Cut deep, finished clean, designed with the coaches of our partner gyms.',
    details: ['Recycled polyester mesh', 'Racerback cut for full shoulder mobility', 'Reflective H on the chest', 'Quick-dry finish'],
    fitNote: 'Athletic fit with deep armholes.'
  },
  {
    slug: 'deadlift-classic', name: 'Deadlift Classic', line: 'sport', price: 32, cut: 'classic', fabric: 'jersey',
    colors: [['Cream', '#F4F1EA', '#0B0C10'], ['Obsidian', '#0B0C10', '#F4F1EA'], ['Electric Red', '#FF1E27', '#FF1E27']],
    mark: true, rating: 4.7, reviews: 208, heat: 3,
    desc: 'The everyday training tank top. Brushed technical jersey that dries fast and still looks clean when you leave the gym for a coffee.',
    details: ['Technical jersey, 160 g/m²', 'Anti-odour treatment', 'Tonal embroidered H', 'Taped neckline'],
    fitNote: 'Regular fit.'
  },
  // Marc-riage
  {
    slug: 'the-vow-tank', name: 'The Vow', line: 'marc-riage', price: 89, cut: 'vest', fabric: 'satin',
    colors: [['Dusty Rose', '#DCAE96', '#B98C76'], ['Obsidian', '#0B0C10', '#2A2B31'], ['Ivory', '#EFE7D8', '#0B0C10']],
    mark: true, badge: 'Bestseller', rating: 4.9, reviews: 96, heat: 9,
    desc: 'A tailored tank top cut like a waistcoat: four horn buttons, two welt pockets and a satin back with an adjustable strap. Worn at weddings, mistaken for a three-piece suit.',
    details: ['Wool-blend front, satin back', 'Four genuine horn buttons', 'Two welt pockets', 'Adjustable back strap'],
    fitNote: 'Tailored. If you are between sizes, take the larger one.'
  },
  {
    slug: 'best-man-tank', name: 'Best Man', line: 'marc-riage', price: 79, cut: 'classic', fabric: 'satin',
    colors: [['Obsidian', '#0B0C10', '#DCAE96'], ['Dusty Rose', '#DCAE96', '#0B0C10']],
    mark: true, rating: 4.8, reviews: 54, heat: 8,
    desc: 'Satin-finish tank top with contrast binding. For the best man, the witness, or anyone giving a speech they will be quoted on.',
    details: ['Satin-finish viscose blend', 'Contrast bias binding', 'Embroidered H', 'Gift box included'],
    fitNote: 'Slim fit.'
  },
  {
    slug: 'three-piece-tank', name: 'The Three-Piece', line: 'marc-riage', price: 129, cut: 'vest', fabric: 'jersey',
    colors: [['Charcoal', '#3A3B40', '#2A2B31'], ['Navy', '#1E2A44', '#151E33']],
    mark: true, badge: 'Designer pick', rating: 5.0, reviews: 23, heat: 9,
    desc: 'Designed by Marcella Hayes for a family wedding, where nobody noticed the waistcoat was a tank top. Pairs with any suit jacket and matching trousers.',
    details: ['Italian wool-blend suiting', 'Matches standard charcoal and navy suits', 'Horn buttons', 'Hand-finished in Nantes'],
    fitNote: 'Tailored. Free alterations in our Nantes atelier.'
  },
  // Loungewear
  {
    slug: 'sunday-rib-tank', name: 'Sunday Rib', line: 'loungewear', price: 29, cut: 'classic', fabric: 'rib',
    colors: [['Cloud Blue', '#9AA9B8', '#8796A6'], ['Cream', '#F4F1EA', '#DDD6C8'], ['Obsidian', '#0B0C10', '#1C1D22']],
    mark: true, badge: 'Bestseller', rating: 4.8, reviews: 402, heat: 2,
    desc: 'A ribbed organic cotton tank top for doing absolutely nothing, beautifully. Soft from the first wear, and still in shape after the fiftieth.',
    details: ['Organic cotton rib, 2×1', 'Pre-shrunk', 'Tonal embroidered H', 'Slightly longer body'],
    fitNote: 'Relaxed fit.'
  },
  {
    slug: 'cloud-modal-sleep-tank', name: 'Cloud Modal', line: 'loungewear', price: 34, cut: 'classic', fabric: 'modal',
    colors: [['Cream', '#F4F1EA', '#E2DACB'], ['Cloud Blue', '#9AA9B8', '#8796A6']],
    mark: true, rating: 4.9, reviews: 177, heat: 1,
    desc: 'Our sleep tank top. Breathable modal that keeps you cool at night, with a wide neckline that never pulls.',
    details: ['Modal, 170 g/m²', 'Breathable and temperature-regulating', 'Covered seams', 'Embroidered H'],
    fitNote: 'Relaxed fit.'
  },
  {
    slug: 'home-office-tank', name: 'Home Office', line: 'loungewear', price: 27, cut: 'classic', fabric: 'jersey',
    colors: [['Obsidian', '#0B0C10', '#26272D'], ['Cream', '#F4F1EA', '#0B0C10']],
    mark: true, rating: 4.6, reviews: 89, heat: 3,
    desc: 'Camera-ready from the waist up. A clean, structured jersey tank top for remote workers who want to look like they made an effort.',
    details: ['Compact cotton jersey', 'Structured neckline that keeps its shape on video', 'Embroidered H', 'Wrinkle-resistant'],
    fitNote: 'Regular fit.'
  },
  // Limited
  {
    slug: 'drop-01-bully-turned-buyer', name: 'Drop 01: Bully Turned Buyer', line: 'limited', price: 45, cut: 'classic', fabric: 'jersey',
    colors: [['Acid Lime', '#D4FF3F', '#0B0C10'], ['Obsidian', '#0B0C10', '#D4FF3F']], print: ['BULLY', 'TURNED', 'BUYER'],
    mark: true, badge: 'Only 200 made', rating: 5.0, reviews: 64, heat: 10,
    desc: 'The tank top that started it all. In middle school, one kid laughed at our tank tops. Years later, he bought the full performance line. This one is for him.',
    details: ['Heavyweight organic cotton, 200 g/m²', 'Numbered run of 200', 'Screen-printed in Nantes', 'Drop number on the neck tape'],
    fitNote: 'Boxy fit. Take your usual size.'
  },
  {
    slug: 'drop-02-gym-angel', name: 'Drop 02: Gym Angel', line: 'limited', price: 45, cut: 'racer', fabric: 'jersey',
    colors: [['Obsidian', '#0B0C10', '#D4FF3F'], ['Cream', '#F4F1EA', '#0B0C10']], print: ['NO PAIN', 'NO HALO'],
    mark: true, badge: 'Meme Lab winner', rating: 4.9, reviews: 38, heat: 9,
    desc: 'Voted by 4,812 members of the Meme Lab. The first drop designed entirely by our community.',
    details: ['Heavyweight organic cotton', 'Numbered run of 300', 'Puff print', 'Meme Lab edition label'],
    fitNote: 'Boxy fit.'
  },
  {
    slug: 'basic-fit-training-tank', name: 'Basic-Fit × Marc-Hell Training Tank', line: 'limited', price: 42, cut: 'racer', fabric: 'mesh',
    colors: [['Orange', '#F37321', '#0B0C10'], ['Obsidian', '#0B0C10', '#F37321']], print: ['TRAIN', 'LIKE HELL'],
    mark: true, badge: 'Official partner', rating: 4.8, reviews: 127, heat: 7,
    desc: 'The official training tank top of our partnership with Basic-Fit. Worn by club coaches, available to members first.',
    details: ['Recycled polyester mesh', 'Co-branded neck tape', 'Racerback cut', 'Members get early access'],
    fitNote: 'Athletic fit.'
  }
].map(p => ({ ...p, sizes, colors: p.colors.map(([name, hex, trim]) => ({ name, hex, trim })) }));

// The order of the descent, from heaven down to hell.
export const descent = ['marc-riage', 'loungewear', 'limited', 'sport'].map(id => lines.find(l => l.id === id));

export const rooms = {
  'marc-riage': { alt: 7000, place: 'The altar', line: 'Tailored tank tops for people who said yes.', tank: ['the-vow-tank', 2] },
  loungewear: { alt: 3000, place: 'Cloud nine', line: 'Soft enough to sleep in. You will not be getting up.', tank: ['sunday-rib-tank', 1] },
  limited: { alt: 0, place: 'Purgatory', line: 'Numbered drops, voted by the internet. Waiting is the punishment.', tank: ['drop-02-gym-angel', 1] },
  sport: { alt: -333, place: 'The furnace', line: 'Mesh, flat seams, and no sleeves between you and the bar.', tank: ['inferno-performance-tank', 2] }
};

export const lineById = Object.fromEntries(lines.map(l => [l.id, l]));
export const productBySlug = Object.fromEntries(products.map(p => [p.slug, p]));

export const timeline = [
  ['2020', 'The hallway', 'Five friends wear tank tops to middle school. The rest of the school has opinions about it.'],
  ['2021', 'The first sale', 'The loudest of those opinions becomes our first customer. He still buys the performance line.'],
  ['2026', 'Marc-Hell is founded', 'Five tank-top enthusiasts register the company in Nantes with one mission: a tank top for every room.'],
  ['2026', 'Basic-Fit partnership', 'A nationwide partnership makes Marc-Hell the official performance gear of Basic-Fit clubs.'],
  ['2026', 'Paris Fashion Week', 'Our formal tank top walks a showcase in Paris and puts Marc-riage on the international map.'],
  ['2027', 'What comes next', 'Recycled fabrics across every line, and twice as many international retail partners.']
];

export const values = [
  ['Radical inclusivity', 'Clothing designed for every body type, background and lifestyle. Sizes XS to XXL in every line, with the same price for every size.'],
  ['Unapologetic authenticity', 'Breaking corporate dress codes and encouraging people to own their identity, from the squat rack to the boardroom.'],
  ['High-performance quality', 'Premium textile engineering with modern design. If it is not good enough for a wedding and a workout, it does not ship.']
];

export const team = [
  { name: 'Marc Tanker', role: 'CEO & co-founder', text: 'Guides the mission to shatter dress-code stereotypes, leads the executive team and secures our key partnerships.', fact: 'Wears a tank top to every single high-level business meeting, no matter how formal.' },
  { name: 'Marcella Hayes', role: 'Head of Marketing & Design', text: 'Designs revolutionary tank tops for every occasion and builds the campaigns that make them trend worldwide.', fact: 'Wore a three-piece suit with a tailored Marc-Hell tank top as the waistcoat to a cousin\'s wedding. Nobody noticed.' },
  { name: 'Pauline', role: 'Customer Experience Manager', text: 'Listens to customers, sources high-quality and comfortable materials, improves our app and keeps up with trends.', fact: 'Late for work almost every morning: choosing the right tank top takes time.' },
  { name: 'Juliane', role: 'Human Resources Manager', text: 'Recruits, supports and represents our people, and makes sure everyone feels comfortable at work.', fact: null },
  { name: 'Tiago', role: 'Finance & Budget Manager', text: 'Keeps the numbers as clean as our seams, from production budgets to international expansion.', fact: null }
];

export const reviews = [
  { name: 'Jordan, Lyon', product: 'Inferno Performance Tank', stars: 5, text: 'Survived six months of five-day splits and still looks new. The mesh actually works.' },
  { name: 'Camille, Nantes', product: 'The Vow', stars: 5, text: 'Wore it to my brother\'s wedding. Three people asked where the jacket was. I said: optional.' },
  { name: 'Sam, Montréal', product: 'Sunday Rib', stars: 5, text: 'Shipped to Canada in five days. I own four now. This is a cry for help.' }
];

export const memes = [
  { id: 'm1', title: 'No pain, no halo', author: '@liftandpray', votes: 4812, status: 'Winner · Drop 02' },
  { id: 'm2', title: 'Sleeves are a social construct', author: '@armday_only', votes: 3290, status: 'In the running' },
  { id: 'm3', title: 'Dressed for the boardroom (it was leg day)', author: '@corporate.gains', votes: 2954, status: 'In the running' },
  { id: 'm4', title: 'My dress code is a vibe', author: '@nantes.drip', votes: 2141, status: 'In the running' },
  { id: 'm5', title: 'Heaven sent, hell bent', author: '@angelic.pr', votes: 1876, status: 'In the running' },
  { id: 'm6', title: 'Business on top, gym underneath', author: '@hybrid.athlete', votes: 1502, status: 'In the running' }
];

export const shipping = [
  ['France', '2–3 working days', '€4.90', 'Free over €80'],
  ['European Union', '3–6 working days', '€8.90', 'Free over €120'],
  ['North America', '5–8 working days', '€14.90', 'Free over €150']
];

export const sizeGuide = [
  ['XS', '82–88', '68–74'], ['S', '88–94', '74–80'], ['M', '94–102', '80–88'],
  ['L', '102–110', '88–96'], ['XL', '110–118', '96–104'], ['XXL', '118–126', '104–112']
];

export const lineReviews = {
  sport: [
    { name: 'Jordan, Lyon', stars: 5, text: 'Survived six months of five-day splits and still looks new. The mesh actually works.' },
    { name: 'Inès, Bordeaux', stars: 5, text: 'Finally a gym tank top that does not ride up on overhead presses. Ordered a second colour the same week.' }
  ],
  'marc-riage': [
    { name: 'Camille, Nantes', stars: 5, text: 'Wore it to my brother\'s wedding. Three people asked where the jacket was. I said: optional.' },
    { name: 'Hugo, Brussels', stars: 5, text: 'The buttons and the satin back look far more expensive than they are. The photographer loved it.' }
  ],
  loungewear: [
    { name: 'Sam, Montréal', stars: 5, text: 'Shipped to Canada in five days. I own four now. This is a cry for help.' },
    { name: 'Léa, Rennes', stars: 4, text: 'Softest thing I own. I take my morning calls in it and nobody suspects a thing.' }
  ],
  limited: [
    { name: 'Noah, Paris', stars: 5, text: 'Got number 017 of 200. People stop me in the street to ask about the print.' },
    { name: 'Maya, Toronto', stars: 5, text: 'I voted for this one in the Meme Lab, so technically I designed it. Heavy cotton, great fit.' }
  ]
};
