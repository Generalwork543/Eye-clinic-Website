/* =============================================================
   Bushra Hameed Eye Clinic - store.js
   Specialized Eyeglasses Store & Prescription Customizer
   Theme: Emerald Ink (#064E3B) & Champagne (#F8E7C9)
   Inspired by Luxury Optical Boutique Design
   Vanilla JavaScript, zero dependencies.
   ============================================================= */

(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* Format PKR currency string */
  const formatPKR = (amount) => {
    return 'Rs. ' + Number(amount).toLocaleString('en-PK');
  };

  /* Clinic WhatsApp Number */
  const CLINIC_WHATSAPP = '923247306886';

  /* ---------- Catalog Data matching store interface.png ---------- */
  const FRAMES = [
    {
      id: 'frame-rayban-aviator',
      name: 'RAY BAN AVIATOR POLARIZED - 58MM',
      basePricePKR: 13500,
      badges: [
        { text: 'Polarized', type: 'blue' },
        { text: 'Premium', type: 'champagne' }
      ],
      fitPill: 'For slim to normal faces',
      category: ['all', 'premium-sunglasses', 'sunglasses', 'men', 'unisex'],
      material: 'Monel Metal & Polarized Crystal Glass',
      dimensions: '58-14-135 mm',
      shape: 'aviator',
      colors: [
        { name: 'Pitch Black Polarized', hex: '#111111' },
        { name: 'Arista Gold / G-15', hex: '#c5a059' },
        { name: 'Gunmetal Slate', hex: '#374151' }
      ],
      desc: 'The iconic teardrop silhouette with double brow bar, crystal polarized glare-blocking lenses, and signature Ray-Ban script.'
    },
    {
      id: 'frame-rayban-wayfarer',
      name: 'RAY BAN WAYFARER - 50MM',
      basePricePKR: 9500,
      badges: [
        { text: 'Hot selling', type: 'navy' },
        { text: 'Premium', type: 'champagne' }
      ],
      fitPill: 'For slim to normal faces',
      category: ['all', 'premium-sunglasses', 'sunglasses', 'men', 'women', 'unisex'],
      material: 'Handcrafted High-Gloss Acetate',
      dimensions: '50-22-150 mm',
      shape: 'wayfarer',
      colors: [
        { name: 'Gloss Jet Black', hex: '#0a0a0a' },
        { name: 'Havana Tortoise', hex: '#582f14' },
        { name: 'Matte Stealth Black', hex: '#262626' }
      ],
      desc: 'The most legendary sunglasses profile in optical history featuring dual horizontal silver temple rivets and G-15 optics.'
    },
    {
      id: 'frame-tomford-tf1044',
      name: 'TOM FORD TF1044',
      basePricePKR: 15000,
      badges: [
        { text: 'Premium', type: 'champagne' }
      ],
      fitPill: 'For bulky faces',
      category: ['all', 'premium-sunglasses', 'sunglasses', 'men', 'unisex'],
      material: 'Milled Acetate & 18K Gold Temple Inlays',
      dimensions: '62-12-145 mm',
      shape: 'shield-aviator',
      colors: [
        { name: 'Piano Black with Gold T', hex: '#0f0f10' },
        { name: 'Dark Havana Gold', hex: '#442813' },
        { name: 'Smoky Grey Translucent', hex: '#2e353f' }
      ],
      desc: 'Commanding aerodynamic flat-top shield mask silhouette featuring Tom Ford’s iconic T-metal hinge inlay.'
    },
    {
      id: 'frame-lv-z1505e',
      name: 'LOUIS VUITTON Z1505E',
      basePricePKR: 15000,
      badges: [
        { text: 'New', type: 'green' },
        { text: 'Premium', type: 'champagne' }
      ],
      fitPill: 'For normal faces',
      category: ['all', 'premium-sunglasses', 'sunglasses', 'men', 'women', 'unisex'],
      material: 'Sculpted Beveled Deep-Black Acetate',
      dimensions: '54-19-145 mm',
      shape: 'square-thick',
      colors: [
        { name: 'Monogram Midnight Black', hex: '#050505' },
        { name: 'Rich Amber Marble', hex: '#6b3e1b' },
        { name: 'Deep Emerald Acetate', hex: '#064e3b' }
      ],
      desc: 'Architectural thick beveled square contours enriched with gold S-lock temple hardware for uncompromised luxury.'
    },
    {
      id: 'frame-acetate-rect',
      name: 'MODEL TOWN CLASSIC RECTANGLE',
      basePricePKR: 1500,
      badges: [
        { text: 'Best Seller', type: 'blue' }
      ],
      fitPill: 'For slim to normal faces',
      category: ['all', 'eyeglasses', 'men', 'unisex'],
      material: 'Hand-Polished Hypoallergenic Acetate',
      dimensions: '53-17-142 mm',
      shape: 'rect',
      colors: [
        { name: 'Onyx Black', hex: '#1c1c1c' },
        { name: 'Tortoiseshell Amber', hex: '#633517' },
        { name: 'Deep Emerald Green', hex: '#064e3b' }
      ],
      desc: 'Doctor-designed lightweight rectangle frame engineered for daily reading and computer eyestrain prevention.'
    },
    {
      id: 'frame-titanium-round',
      name: 'GONDLANWALA TITANIUM ROUND',
      basePricePKR: 2400,
      badges: [
        { text: 'Doctor Choice', type: 'green' }
      ],
      fitPill: 'For normal to slim faces',
      category: ['all', 'metal-glasses', 'unisex'],
      material: 'Memory Beta-Titanium Wire',
      dimensions: '49-20-145 mm',
      shape: 'metal-round',
      colors: [
        { name: 'Antique Gold', hex: '#c5a059' },
        { name: 'Matte Black', hex: '#111111' },
        { name: 'Brushed Silver', hex: '#8c959f' }
      ],
      desc: 'Feather-light 9-gram memory beta-titanium wire frame with hypoallergenic silicone nose pads.'
    },
    {
      id: 'frame-royal-clubmaster',
      name: 'ROYAL BROWLINE CLUBMASTER',
      basePricePKR: 3200,
      badges: [
        { text: 'Premium', type: 'champagne' }
      ],
      fitPill: 'For normal faces',
      category: ['all', 'premium-glasses', 'men', 'women', 'unisex'],
      material: 'Cellulose Acetate & Rose Alloy',
      dimensions: '51-21-145 mm',
      shape: 'clubmaster',
      colors: [
        { name: 'Black & 24K Gold Rim', hex: '#18181b' },
        { name: 'Tortoise & Antique Brass', hex: '#582f14' },
        { name: 'Burgundy Wine & Gold', hex: '#581c2d' }
      ],
      desc: 'Vintage mid-century intellectual silhouette with rich hand-buffed acetate browline and coin-rim lower wire.'
    },
    {
      id: 'frame-urban-wayfarer-opt',
      name: 'SHALIMAR MODERN WAYFARER OPTICAL',
      basePricePKR: 1800,
      badges: [
        { text: 'Popular', type: 'blue' }
      ],
      fitPill: 'For slim to normal faces',
      category: ['all', 'eyeglasses', 'men', 'women', 'unisex'],
      material: 'Matte TR90 Swiss Polymer',
      dimensions: '54-18-145 mm',
      shape: 'wayfarer-opt',
      colors: [
        { name: 'Midnight Pitch Black', hex: '#141414' },
        { name: 'Smoke Translucent', hex: '#3d4450' },
        { name: 'Havana Brown', hex: '#4e2d14' }
      ],
      desc: 'Everyday clear prescription edition of the iconic wayfarer with reinforced multi-barrel stainless hinges.'
    },
    {
      id: 'frame-semi-rimless',
      name: 'AERO-LITE EXECUTIVE HALF-RIM',
      basePricePKR: 1950,
      badges: [
        { text: 'Executive', type: 'champagne' }
      ],
      fitPill: 'For bulky faces',
      category: ['all', 'metal-glasses', 'eyeglasses', 'men', 'unisex'],
      material: 'Magnesium-Aluminium Alloy',
      dimensions: '55-18-142 mm',
      shape: 'halfrim',
      colors: [
        { name: 'Gunmetal Slate', hex: '#374151' },
        { name: 'Dark Bronze', hex: '#443729' },
        { name: 'Stealth Black', hex: '#18181b' }
      ],
      desc: 'Clean semi-rimless silhouette offering an open downward line of sight for seamless reading and office desk comfort.'
    },
    {
      id: 'frame-flexi-sport',
      name: 'FLEXI-ACTIVE TR90 LIGHTWEIGHT',
      basePricePKR: 1500,
      badges: [
        { text: 'Unbreakable', type: 'green' }
      ],
      fitPill: 'For slim to normal faces',
      category: ['all', 'eyeglasses', 'unisex'],
      material: 'Swiss TR90 Flexible Polymer',
      dimensions: '51-17-138 mm',
      shape: 'rect',
      colors: [
        { name: 'Matte Charcoal', hex: '#262626' },
        { name: 'Deep Royal Blue', hex: '#1e3a8a' },
        { name: 'Forest Emerald', hex: '#064e3b' }
      ],
      desc: 'Ultra-resilient bendable frame. Resists accidental drops and sports stress; supreme daily comfort.'
    }
  ];

  /* Category Metadata: Titles and Subtitles matching store interface.png */
  const CATEGORY_META = {
    'premium-sunglasses': {
      title: 'Premium Sunglasses',
      subtitle: 'Acetate Material | Premium Finishing | Life Long Quality'
    },
    'sunglasses': {
      title: 'Sunglasses Collection',
      subtitle: 'UV400 Polarized Protection | Italian Acetate | Timeless Aesthetics'
    },
    'eyeglasses': {
      title: 'Prescription Eyeglasses',
      subtitle: 'Clinical Precision | Single Vision & Progressive Compatible | All-Day Wear'
    },
    'premium-glasses': {
      title: 'Premium Handcrafted Eyewear',
      subtitle: 'Hand-Finished Acetate & Titanium | Doctor Curated Quality'
    },
    'metal-glasses': {
      title: 'Metal & Titanium Glasses',
      subtitle: 'Memory Beta-Titanium | Feather-Light Durability | Hypoallergenic'
    },
    'all': {
      title: 'Complete Eyewear Collection',
      subtitle: 'Doctor-Approved Frames Fitted with Certified Laboratory Prescription Lenses'
    }
  };

  /* ---------- Realistic Vector SVG Frame Generator Engine ---------- */
  function renderFrameSVG(shape, colorHex) {
    // 1. Ray-Ban Aviator Polarized
    if (shape === 'aviator') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <defs>
            <linearGradient id="aviatorLensGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#111827" stop-opacity="0.94"/>
              <stop offset="100%" stop-color="#1f2937" stop-opacity="0.84"/>
            </linearGradient>
            <linearGradient id="aviatorGlare" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
              <stop offset="60%" stop-color="#ffffff" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <!-- Double Bridge (Top Bar + Lower Nose Bridge) -->
          <path d="M 108 34 L 172 34" stroke="${colorHex}" stroke-width="4" stroke-linecap="round"/>
          <path d="M 112 45 Q 140 37 168 45" fill="none" stroke="${colorHex}" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Nose pads -->
          <ellipse cx="114" cy="54" rx="2.5" ry="5.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
          <ellipse cx="166" cy="54" rx="2.5" ry="5.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
          <!-- Left Teardrop Lens & Wire Rim -->
          <path d="M 44 36 C 46 30, 108 30, 112 40 C 116 64, 106 94, 76 94 C 48 94, 40 68, 44 36 Z" 
                fill="url(#aviatorLensGrad)" stroke="${colorHex}" stroke-width="4.5" stroke-linejoin="round"/>
          <path d="M 52 40 C 54 36, 96 36, 104 42 C 90 56, 68 62, 52 40 Z" fill="url(#aviatorGlare)"/>
          <text x="50" y="44" fill="rgba(255,255,255,0.7)" font-size="6.5" font-family="sans-serif" font-weight="700">Ray-Ban P</text>
          <!-- Right Teardrop Lens & Wire Rim -->
          <path d="M 236 36 C 234 30, 172 30, 168 40 C 164 64, 174 94, 204 94 C 232 94, 240 68, 236 36 Z" 
                fill="url(#aviatorLensGrad)" stroke="${colorHex}" stroke-width="4.5" stroke-linejoin="round"/>
          <path d="M 176 40 C 178 36, 220 36, 228 42 C 214 56, 192 62, 176 40 Z" fill="url(#aviatorGlare)"/>
          <!-- Temples -->
          <path d="M 44 36 L 16 38" stroke="${colorHex}" stroke-width="4" stroke-linecap="round"/>
          <path d="M 236 36 L 264 38" stroke="${colorHex}" stroke-width="4" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 2. Ray-Ban Wayfarer
    if (shape === 'wayfarer' || shape === 'wayfarer-opt') {
      const isOptical = shape === 'wayfarer-opt';
      const lensFill = isOptical ? 'rgba(248, 231, 201, 0.25)' : 'url(#wayfarerDarkGrad)';
      const lensStroke = isOptical ? 'rgba(6, 78, 59, 0.3)' : 'none';
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <defs>
            <linearGradient id="wayfarerDarkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0f172a" stop-opacity="0.96"/>
              <stop offset="100%" stop-color="#1e293b" stop-opacity="0.88"/>
            </linearGradient>
          </defs>
          <!-- Bridge Keyhole Structure -->
          <path d="M 104 36 C 110 30, 114 34, 122 32 C 130 32, 134 30, 140 32 C 146 34, 150 30, 156 36" 
                fill="none" stroke="${colorHex}" stroke-width="9" stroke-linecap="round"/>
          <!-- Left Trapezoid Rim & Lens -->
          <path d="M 36 30 C 64 26, 102 28, 116 34 C 114 66, 102 86, 74 86 C 46 86, 36 70, 36 30 Z" 
                fill="${lensFill}" stroke="${colorHex}" stroke-width="9.5" stroke-linejoin="round"/>
          <path d="M 46 36 Q 74 30 102 34" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <!-- Right Trapezoid Rim & Lens -->
          <path d="M 244 30 C 216 26, 178 28, 164 34 C 166 66, 178 86, 206 86 C 234 86, 244 70, 244 30 Z" 
                fill="${lensFill}" stroke="${colorHex}" stroke-width="9.5" stroke-linejoin="round"/>
          <path d="M 178 36 Q 206 30 234 34" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <!-- Signature Silver Horizontal Rivets on Outer Corners -->
          <ellipse cx="32" cy="32" rx="3.2" ry="1.7" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          <ellipse cx="248" cy="32" rx="3.2" ry="1.7" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.8"/>
          <!-- Thick Temples -->
          <path d="M 32 32 L 10 40" stroke="${colorHex}" stroke-width="8.5" stroke-linecap="round"/>
          <path d="M 248 32 L 270 40" stroke="${colorHex}" stroke-width="8.5" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 3. Tom Ford TF1044 (Flat-Top Mask / Shield Navigator with Gold T Inlay)
    if (shape === 'shield-aviator') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <defs>
            <linearGradient id="tfDarkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#050505" stop-opacity="0.98"/>
              <stop offset="100%" stop-color="#18181b" stop-opacity="0.9"/>
            </linearGradient>
          </defs>
          <!-- Continuous Heavy Flat-Top Browline Bar -->
          <path d="M 28 32 L 252 32" stroke="${colorHex}" stroke-width="11" stroke-linecap="round"/>
          <!-- Shield Outer Drops and Lenses -->
          <path d="M 30 32 L 40 76 C 46 92, 102 96, 118 84 L 126 42 C 126 36, 134 36, 140 36 C 146 36, 154 36, 154 42 L 162 84 C 178 96, 234 92, 240 76 L 250 32 Z" 
                fill="url(#tfDarkGrad)" stroke="${colorHex}" stroke-width="8" stroke-linejoin="round"/>
          <path d="M 46 38 L 114 38 L 108 78 C 84 84, 52 78, 46 38 Z" fill="rgba(255,255,255,0.1)"/>
          <path d="M 234 38 L 166 38 L 172 78 C 196 84, 228 78, 234 38 Z" fill="rgba(255,255,255,0.1)"/>
          <!-- Signature Tom Ford 18K Gold 'T' Temple Inlay -->
          <path d="M 24 32 L 40 32 M 34 26 L 34 40" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          <path d="M 256 32 L 240 32 M 246 26 L 246 40" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          <!-- Aerodynamic Temples -->
          <path d="M 26 32 L 8 38" stroke="${colorHex}" stroke-width="9" stroke-linecap="round"/>
          <path d="M 254 32 L 272 38" stroke="${colorHex}" stroke-width="9" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 4. Louis Vuitton Z1505E (Thick Sculpted Beveled Square with S-Lock Gold Accents)
    if (shape === 'square-thick') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <defs>
            <linearGradient id="lvDarkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#000000" stop-opacity="0.99"/>
              <stop offset="100%" stop-color="#111827" stop-opacity="0.92"/>
            </linearGradient>
          </defs>
          <!-- Heavy Bridge -->
          <rect x="110" y="32" width="60" height="14" rx="4" fill="${colorHex}"/>
          <!-- Left Beveled Thick Square Rim -->
          <rect x="30" y="24" width="86" height="66" rx="8" fill="url(#lvDarkGrad)" stroke="${colorHex}" stroke-width="11"/>
          <rect x="36" y="30" width="74" height="54" rx="5" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
          <!-- Right Beveled Thick Square Rim -->
          <rect x="164" y="24" width="86" height="66" rx="8" fill="url(#lvDarkGrad)" stroke="${colorHex}" stroke-width="11"/>
          <rect x="170" y="30" width="74" height="54" rx="5" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
          <!-- Gold LV S-Lock Floral Monogram Temple Accents -->
          <rect x="22" y="28" width="8" height="8" rx="1.5" fill="#f59e0b"/>
          <circle cx="26" cy="32" r="2" fill="#78350f"/>
          <rect x="250" y="28" width="8" height="8" rx="1.5" fill="#f59e0b"/>
          <circle cx="254" cy="32" r="2" fill="#78350f"/>
          <!-- Thick Sculpted Temples -->
          <path d="M 26 32 L 8 38" stroke="${colorHex}" stroke-width="10" stroke-linecap="round"/>
          <path d="M 254 32 L 272 38" stroke="${colorHex}" stroke-width="10" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 5. Clubmaster / Browline
    if (shape === 'clubmaster') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <!-- Gold Coin Rim Lower Bar -->
          <path d="M 112 40 Q 140 32 168 40" fill="none" stroke="#d4af37" stroke-width="4" stroke-linecap="round"/>
          <!-- Left Lower Wire Rim -->
          <path d="M 38 42 C 40 76, 88 88, 114 42" fill="rgba(248, 231, 201, 0.3)" stroke="#d4af37" stroke-width="3.5"/>
          <!-- Right Lower Wire Rim -->
          <path d="M 166 42 C 192 88, 240 76, 242 42" fill="rgba(248, 231, 201, 0.3)" stroke="#d4af37" stroke-width="3.5"/>
          <!-- Heavy Acetate Browlines -->
          <path d="M 32 38 C 50 28, 98 28, 118 42 C 114 45, 96 35, 42 45 Z" fill="${colorHex}" stroke="${colorHex}" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 248 38 C 230 28, 182 28, 162 42 C 166 45, 184 35, 238 45 Z" fill="${colorHex}" stroke="${colorHex}" stroke-width="4" stroke-linejoin="round"/>
          <!-- Corner Studs -->
          <circle cx="36" cy="38" r="2" fill="#d4af37"/>
          <circle cx="244" cy="38" r="2" fill="#d4af37"/>
          <!-- Temples -->
          <path d="M 32 38 L 12 42" stroke="${colorHex}" stroke-width="6" stroke-linecap="round"/>
          <path d="M 248 38 L 268 42" stroke="${colorHex}" stroke-width="6" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 6. Metal Round / Titanium Round
    if (shape === 'metal-round') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <!-- Fine Titanium Bridge -->
          <path d="M 116 48 Q 140 38 164 48" fill="none" stroke="${colorHex}" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Left Round Lens & Wire Rim -->
          <circle cx="76" cy="52" r="38" fill="rgba(248, 231, 201, 0.25)" stroke="${colorHex}" stroke-width="4"/>
          <path d="M 54 32 Q 76 22 98 34" stroke="rgba(255,255,255,0.75)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <!-- Right Round Lens & Wire Rim -->
          <circle cx="204" cy="52" r="38" fill="rgba(248, 231, 201, 0.25)" stroke="${colorHex}" stroke-width="4"/>
          <path d="M 182 32 Q 204 22 226 34" stroke="rgba(255,255,255,0.75)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <!-- Silicone pads -->
          <ellipse cx="118" cy="54" rx="2.5" ry="5.5" fill="#e2e8f0"/>
          <ellipse cx="162" cy="54" rx="2.5" ry="5.5" fill="#e2e8f0"/>
          <!-- Sleek Wire Temples -->
          <path d="M 38 52 L 14 44" stroke="${colorHex}" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M 242 52 L 266 44" stroke="${colorHex}" stroke-width="3.5" stroke-linecap="round"/>
        </svg>
      `;
    }

    // 7. Semi-Rimless / Aero-Lite Half-Rim
    if (shape === 'halfrim') {
      return `
        <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
          <!-- Metal Bridge -->
          <path d="M 112 36 Q 140 28 168 36" fill="none" stroke="${colorHex}" stroke-width="5" stroke-linecap="round"/>
          <!-- Left Lens (Semi-Rimless) -->
          <path d="M 36 34 C 54 30, 98 30, 114 34 C 114 62, 98 76, 76 76 C 48 76, 36 62, 36 34 Z" 
                fill="rgba(248, 231, 201, 0.25)" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
          <path d="M 36 34 C 54 30, 98 30, 114 34" fill="none" stroke="${colorHex}" stroke-width="7" stroke-linecap="round"/>
          <!-- Right Lens (Semi-Rimless) -->
          <path d="M 244 34 C 226 30, 182 30, 166 34 C 166 62, 182 76, 204 76 C 232 76, 244 62, 244 34 Z" 
                fill="rgba(248, 231, 201, 0.25)" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
          <path d="M 244 34 C 226 30, 182 30, 166 34" fill="none" stroke="${colorHex}" stroke-width="7" stroke-linecap="round"/>
          <!-- Temples -->
          <path d="M 36 34 L 14 40" stroke="${colorHex}" stroke-width="5" stroke-linecap="round"/>
          <path d="M 244 34 L 266 40" stroke="${colorHex}" stroke-width="5" stroke-linecap="round"/>
        </svg>
      `;
    }

    // Default: Modern Rectangle (Model Town Classic)
    return `
      <svg viewBox="0 0 280 110" class="frame-svg" width="100%" height="100%" aria-hidden="true">
        <!-- Bridge -->
        <path d="M 112 40 Q 140 32 168 40" fill="none" stroke="${colorHex}" stroke-width="6.5" stroke-linecap="round"/>
        <!-- Left Rectangle Lens -->
        <rect x="36" y="26" width="76" height="52" rx="10" 
              fill="rgba(248, 231, 201, 0.25)" stroke="${colorHex}" stroke-width="6.5"/>
        <path d="M 44 34 Q 72 28 100 34" stroke="rgba(255,255,255,0.75)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Right Rectangle Lens -->
        <rect x="168" y="26" width="76" height="52" rx="10" 
              fill="rgba(248, 231, 201, 0.25)" stroke="${colorHex}" stroke-width="6.5"/>
        <path d="M 176 34 Q 204 28 232 34" stroke="rgba(255,255,255,0.75)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Temples -->
        <path d="M 36 34 L 12 40" stroke="${colorHex}" stroke-width="6" stroke-linecap="round"/>
        <path d="M 244 34 L 268 40" stroke="${colorHex}" stroke-width="6" stroke-linecap="round"/>
      </svg>
    `;
  }

  /* ---------- State Machine ---------- */
  const state = {
    selectedFrame: FRAMES[0],
    selectedColor: FRAMES[0].colors[0],
    activeCategory: 'premium-sunglasses', // Default to matching screenshot
    searchQuery: '',
    cartCount: 0,
    sampleModel: 'boy', // 'boy' or 'girl'
    tryonMode: 'models', // 'models' or 'upload'
    userFaceImage: null,
    tryonScale: 100,
    tryonRotate: 0,
    tryonPosX: 0,
    tryonPosY: 0,
    tryonActiveFrame: FRAMES[0],
    tryonActiveColor: FRAMES[0].colors[0],
    lensType: 'single_vision', // 'single_vision' (0), 'progressives' (+1000), 'bifocal' (+500)
    lensPricePKR: 0,
    lensCoating: 'none', // 'none' (0), 'blue_cut' (500), 'photochromic' (1200)
    coatingPricePKR: 0,
    prescriptionMode: 'matrix', // 'matrix', 'upload', 'zero'
    od: { sph: '0.00', cyl: '0.00', axis: '0', add: '0.00' },
    os: { sph: '0.00', cyl: '0.00', axis: '0', add: '0.00' },
    pd: '63 mm',
    uploadedPrescriptionFile: null,
    uploadedPrescriptionBase64: '',
    paymentMethod: 'cod', // 'cod' or 'bank_transfer'
    uploadedReceiptFile: null,
    uploadedReceiptBase64: '',
    customer: {
      name: '',
      phone: '',
      city: 'Gujranwala',
      area: 'Model Town',
      address: '',
      notes: '',
      trxId: ''
    }
  };

  /* Pricing Lookup Map */
  const LENS_PRICES = {
    single_vision: 0,    // 0 PKR (Free included)
    progressives: 1000,  // +1,000 PKR
    bifocal: 500         // +500 PKR
  };

  const COATING_PRICES = {
    none: 0,
    blue_cut: 500,
    photochromic: 1200
  };

  /* ---------- DOM Population & Render ---------- */

  // 1. Render Catalog Cards
  function renderCatalog() {
    const grid = $('#frames-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const cat = state.activeCategory;
    const query = state.searchQuery.toLowerCase().trim();

    // Filter by Category and Search Query
    let filtered = FRAMES;
    if (cat !== 'all') {
      filtered = filtered.filter(f => f.category.includes(cat));
    }
    if (query) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.material.toLowerCase().includes(query) ||
        f.desc.toLowerCase().includes(query) ||
        f.fitPill.toLowerCase().includes(query)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--champagne-pale); border-radius: var(--radius-md); border: 1.5px dashed var(--champagne-border);">
          <p style="font-size: 1.15rem; font-weight: 700; color: var(--emerald-dark); margin: 0 0 0.5rem;">No frames found matching "${state.searchQuery}"</p>
          <p style="font-size: 0.9rem; color: var(--emerald-mid); margin: 0 0 1.25rem;">Try clearing your search or browsing our other optical categories.</p>
          <button type="button" class="filter-btn is-active" id="btn-reset-filters">View All Frames</button>
        </div>
      `;
      const resetBtn = $('#btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.searchQuery = '';
          const searchInput = $('#store-search-input');
          if (searchInput) searchInput.value = '';
          setCategory('all');
        });
      }
      return;
    }

    filtered.forEach((frame) => {
      const isSelected = frame.id === state.selectedFrame.id;
      const initialColor = frame.colors[0];

      const card = document.createElement('article');
      card.className = `frame-card ${isSelected ? 'is-selected' : ''}`;
      card.id = `card-${frame.id}`;
      card.setAttribute('data-frame-id', frame.id);

      // Badges HTML
      const badgesHtml = frame.badges.map(b => {
        let badgeClass = 'frame-badge--champagne';
        if (b.type === 'blue') badgeClass = 'frame-badge--blue';
        if (b.type === 'navy') badgeClass = 'frame-badge--navy';
        if (b.type === 'green') badgeClass = 'frame-badge--green';
        return `<span class="frame-badge ${badgeClass}">${b.text}</span>`;
      }).join('');

      // Color Swatches HTML
      const colorDotsHtml = frame.colors.map((c, i) => `
        <button type="button" class="color-dot ${i === 0 ? 'is-selected' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}" 
                aria-label="Color ${c.name}"
                data-frame-id="${frame.id}" 
                data-color-hex="${c.hex}" 
                data-color-name="${c.name}">
        </button>
      `).join('');

      // Card structure matching store interface.png
      card.innerHTML = `
        <!-- Top-Right Red [Try on] Capsule -->
        <button type="button" class="frame-card__tryon-btn" data-action="tryon-frame" data-frame-id="${frame.id}" aria-label="Virtual try on ${frame.name}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><path d="M10 12h4"/><path d="M2 12l2-4"/><path d="M22 12l-2-4"/>
          </svg>
          <span>Try on</span>
        </button>

        <!-- Centered Glasses Vector Visual -->
        <div class="frame-card__visual" id="svg-wrap-${frame.id}" data-action="select-frame" data-frame-id="${frame.id}" title="Click to configure prescription">
          ${renderFrameSVG(frame.shape, initialColor.hex)}
        </div>

        <!-- Badges Row -->
        <div class="frame-card__badges-row">
          ${badgesHtml}
        </div>

        <!-- Uppercase Bold Model Title -->
        <h3 class="frame-card__title">${frame.name}</h3>

        <!-- Face Shape Suitability Outline Pill -->
        <div class="frame-card__fit-pill">${frame.fitPill}</div>

        <!-- Price (Matching photo) -->
        <div class="frame-card__price">${formatPKR(frame.basePricePKR)}</div>

        <!-- Color Swatches -->
        <div class="frame-card__colors" role="group" aria-label="Frame color options">
          ${colorDotsHtml}
        </div>

        <!-- Select & Add Lenses CTA Button -->
        <button type="button" class="frame-card__btn" data-action="select-frame" data-frame-id="${frame.id}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${isSelected ? 'Selected &bull; Customize Lenses' : 'Select Frame &amp; Customize'}</span>
        </button>
      `;

      grid.appendChild(card);
    });

    // Color Swatch Listeners
    $$('.color-dot', grid).forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const frameId = dot.dataset.frameId;
        const hex = dot.dataset.colorHex;
        const colorName = dot.dataset.colorName;
        const frame = FRAMES.find(f => f.id === frameId);
        if (!frame) return;

        // Update preview within card
        const svgContainer = $(`#svg-wrap-${frameId}`);
        if (svgContainer) {
          svgContainer.innerHTML = renderFrameSVG(frame.shape, hex);
        }

        // Update active dot in card
        const parentCard = $(`#card-${frameId}`);
        if (parentCard) {
          $$('.color-dot', parentCard).forEach(d => d.classList.remove('is-selected'));
          dot.classList.add('is-selected');
        }

        // If this frame is currently active in customizer, sync state
        if (state.selectedFrame.id === frameId) {
          state.selectedColor = { name: colorName, hex: hex };
          updateCustomizerUI();
        }
      });
    });

    // Select Button & Card Visual Click Listeners
    $$('[data-action="select-frame"]', grid).forEach((btn) => {
      btn.addEventListener('click', () => {
        const frameId = btn.dataset.frameId;
        selectFrame(frameId, true);
      });
    });

    // Try-on Button Listeners
    $$('[data-action="tryon-frame"]', grid).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const frameId = btn.dataset.frameId;
        openTryOnModal(frameId);
      });
    });
  }

  // 2. Select Frame
  function selectFrame(frameId, smoothScroll = false) {
    const frame = FRAMES.find(f => f.id === frameId);
    if (!frame) return;

    state.selectedFrame = frame;
    state.cartCount = 1;
    updateCartBadge();

    // Detect if user had clicked a color dot on that card
    const card = $(`#card-${frameId}`);
    if (card) {
      const activeDot = $('.color-dot.is-selected', card);
      if (activeDot) {
        state.selectedColor = {
          name: activeDot.dataset.colorName,
          hex: activeDot.dataset.colorHex
        };
      } else {
        state.selectedColor = frame.colors[0];
      }
    } else {
      state.selectedColor = frame.colors[0];
    }

    // Highlight card
    $$('.frame-card').forEach(c => {
      const isCurrent = c.dataset.frameId === frameId;
      c.classList.toggle('is-selected', isCurrent);
      const btn = $('[data-action="select-frame"].frame-card__btn', c);
      if (btn) {
        btn.innerHTML = isCurrent 
          ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>Selected &bull; Customize Lenses</span>`
          : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>Select Frame &amp; Customize</span>`;
      }
    });

    updateCustomizerUI();

    if (smoothScroll) {
      const target = $('#customizer');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // 3. Category Switching Handler
  function setCategory(catKey) {
    state.activeCategory = catKey;

    // Update Category Circles active state
    $$('.category-circle-item').forEach(item => {
      const isCat = item.dataset.category === catKey;
      item.classList.toggle('is-active', isCat);
    });

    // Update Filter Pills active state
    $$('.filter-btn').forEach(btn => {
      const isFilter = (btn.dataset.filter === catKey) || (btn.dataset.filter === 'all' && catKey === 'all');
      btn.classList.toggle('is-active', isFilter);
    });

    // Update Category Section Title & Subtitle
    const meta = CATEGORY_META[catKey] || CATEGORY_META['all'];
    const titleEl = $('#featured-title');
    const subtitleEl = $('#featured-subtitle');
    if (titleEl) titleEl.textContent = meta.title;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;

    renderCatalog();
  }

  // 4. Update Cart Badge Count
  function updateCartBadge() {
    const badge = $('#store-cart-badge');
    if (badge) {
      badge.textContent = state.cartCount;
    }
  }

  // 5. Interactive Virtual Try-On Modal with Real Photo Upload & Face Simulator
  function applyTryOnTransform() {
    const overlay = $('#tryon-glasses-overlay');
    if (!overlay) return;
    const scale = state.tryonScale / 100;
    const rot = state.tryonRotate;
    const x = state.tryonPosX;
    const y = state.tryonPosY;
    overlay.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rot}deg)`;
  }

  function updateTryOnOverlay() {
    const overlay = $('#tryon-glasses-overlay');
    if (!overlay || !state.tryonActiveFrame || !state.tryonActiveColor) return;
    overlay.innerHTML = renderFrameSVG(state.tryonActiveFrame.shape, state.tryonActiveColor.hex);
    applyTryOnTransform();
  }

  function renderTryOnColors(frame) {
    const container = $('#tryon-colors-grid');
    const colorNameEl = $('#tryon-active-color-name');
    if (!container || !frame) return;

    container.innerHTML = '';
    frame.colors.forEach((c) => {
      const isSelected = c.name === state.tryonActiveColor.name;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `color-dot ${isSelected ? 'is-selected' : ''}`;
      btn.style.backgroundColor = c.hex;
      btn.title = c.name;
      btn.setAttribute('aria-label', `Color ${c.name}`);
      btn.addEventListener('click', () => {
        state.tryonActiveColor = c;
        state.selectedColor = c;
        $$('.color-dot', container).forEach(d => d.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (colorNameEl) colorNameEl.textContent = c.name;
        updateTryOnOverlay();
      });
      container.appendChild(btn);
    });

    if (colorNameEl) colorNameEl.textContent = state.tryonActiveColor.name;
  }

  function openTryOnModal(frameId) {
    const frame = FRAMES.find(f => f.id === frameId) || state.selectedFrame;
    const modal = $('#tryon-modal');
    if (!modal) return;

    state.tryonActiveFrame = frame;
    state.tryonActiveColor = frame.colors[0];

    const titleEl = $('#tryon-modal-title');
    const specsLens = $('#tryon-spec-lens');
    const specsBridge = $('#tryon-spec-bridge');
    const specsTemple = $('#tryon-spec-temple');
    const selectBtn = $('#tryon-select-btn');

    if (titleEl) titleEl.textContent = `Virtual Try-On • ${frame.name}`;

    // Dimensions specifications
    const dims = frame.dimensions.replace(' mm', '').split('-');
    if (specsLens && dims[0]) specsLens.textContent = `${dims[0]} mm`;
    if (specsBridge && dims[1]) specsBridge.textContent = `${dims[1]} mm`;
    if (specsTemple && dims[2]) specsTemple.textContent = `${dims[2]} mm`;

    // Sync active mode view and model image
    const modelImg = $('#tryon-model-img');
    const userImg = $('#tryon-user-img');
    const uploadBar = $('#tryon-upload-bar');
    const faceTabs = $('#tryon-face-tabs');
    const tabModels = $('#tryon-mode-models');
    const tabUpload = $('#tryon-mode-upload');

    if (state.tryonMode === 'models') {
      if (tabModels) { tabModels.classList.add('is-active'); tabModels.setAttribute('aria-selected', 'true'); }
      if (tabUpload) { tabUpload.classList.remove('is-active'); tabUpload.setAttribute('aria-selected', 'false'); }
      if (faceTabs) faceTabs.style.display = 'flex';
      if (uploadBar) uploadBar.style.display = 'none';
      if (modelImg) {
        modelImg.style.display = 'block';
        modelImg.src = state.sampleModel === 'girl' ? 'girl try on.png' : 'boy try on.png';
        modelImg.alt = state.sampleModel === 'girl' ? 'Female Model Face' : 'Male Model Face';
      }
      if (userImg) userImg.style.display = 'none';
    } else {
      if (tabUpload) { tabUpload.classList.add('is-active'); tabUpload.setAttribute('aria-selected', 'true'); }
      if (tabModels) { tabModels.classList.remove('is-active'); tabModels.setAttribute('aria-selected', 'false'); }
      if (faceTabs) faceTabs.style.display = 'none';
      if (uploadBar) uploadBar.style.display = 'block';
      if (state.userFaceImage && userImg) {
        userImg.style.display = 'block';
        if (modelImg) modelImg.style.display = 'none';
      } else {
        if (userImg) userImg.style.display = 'none';
        if (modelImg) modelImg.style.display = 'block';
      }
    }

    // Render colors and overlay
    renderTryOnColors(frame);
    updateTryOnOverlay();

    // CTA Select Frame & Add Lenses
    if (selectBtn) {
      selectBtn.onclick = () => {
        selectFrame(frame.id, true);
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      };
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // Close button
    const closeBtn = $('#tryon-modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      };
    }
  }

  // 6. Setup Photo Upload for Virtual Try-On
  function setupTryOnPhotoUpload() {
    const fileInput = $('#tryon-file-input');
    const userImg = $('#tryon-user-img');
    const modelImg = $('#tryon-model-img');
    const changeBtn = $('#tryon-change-btn');
    const uploadLabel = $('#tryon-upload-label');
    const uploadBar = $('#tryon-upload-bar');
    const faceTabs = $('#tryon-face-tabs');
    const tabUpload = $('#tryon-mode-upload');
    const tabModels = $('#tryon-mode-models');

    // File input change (user uploads face image or takes selfie)
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          state.userFaceImage = event.target.result;
          if (userImg) {
            userImg.src = event.target.result;
            userImg.style.display = 'block';
          }
          if (modelImg) modelImg.style.display = 'none';
          if (changeBtn) changeBtn.style.display = 'inline-block';
          if (uploadLabel) {
            const span = $('span', uploadLabel);
            if (span) span.textContent = 'Upload Different Photo';
          }

          // Reset glasses position nicely over the eyes
          state.tryonPosX = 0;
          state.tryonPosY = 0;
          state.tryonScale = 100;
          state.tryonRotate = 0;
          applyTryOnTransform();
        };
        reader.readAsDataURL(file);
      });
    }

    // Change photo button
    if (changeBtn && fileInput) {
      changeBtn.addEventListener('click', () => {
        fileInput.click();
      });
    }

    // Mode Switcher: Sample Models Mode vs Upload Photo Mode
    if (tabUpload && tabModels) {
      tabUpload.addEventListener('click', () => {
        tabUpload.classList.add('is-active');
        tabUpload.setAttribute('aria-selected', 'true');
        tabModels.classList.remove('is-active');
        tabModels.setAttribute('aria-selected', 'false');
        state.tryonMode = 'upload';

        if (uploadBar) uploadBar.style.display = 'block';
        if (faceTabs) faceTabs.style.display = 'none';

        if (state.userFaceImage && userImg) {
          userImg.style.display = 'block';
          if (modelImg) modelImg.style.display = 'none';
        } else {
          if (userImg) userImg.style.display = 'none';
          if (modelImg) modelImg.style.display = 'block';
        }
      });

      tabModels.addEventListener('click', () => {
        tabModels.classList.add('is-active');
        tabModels.setAttribute('aria-selected', 'true');
        tabUpload.classList.remove('is-active');
        tabUpload.setAttribute('aria-selected', 'false');
        state.tryonMode = 'models';

        if (uploadBar) uploadBar.style.display = 'none';
        if (faceTabs) faceTabs.style.display = 'flex';
        if (userImg) userImg.style.display = 'none';
        if (modelImg) {
          modelImg.style.display = 'block';
          modelImg.src = state.sampleModel === 'girl' ? 'girl try on.png' : 'boy try on.png';
          modelImg.alt = state.sampleModel === 'girl' ? 'Female Model Face' : 'Male Model Face';
        }
        // Reset position on mode toggle for a natural fit
        state.tryonPosX = 0;
        state.tryonPosY = 0;
        applyTryOnTransform();
      });
    }
  }

  // 7. Interactive Dragging of Glasses Over the Face
  function setupTryOnDragging() {
    const overlay = $('#tryon-glasses-overlay');
    const stage = $('#tryon-stage');
    if (!overlay || !stage) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialPosX = 0;
    let initialPosY = 0;

    const startDrag = (clientX, clientY) => {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      initialPosX = state.tryonPosX;
      initialPosY = state.tryonPosY;
      overlay.classList.add('is-dragging');
    };

    const doDrag = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      state.tryonPosX = initialPosX + dx;
      state.tryonPosY = initialPosY + dy;
      applyTryOnTransform();
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      overlay.classList.remove('is-dragging');
    };

    // Mouse Listeners
    overlay.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
        doDrag(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      endDrag();
    });

    // Touch Listeners (Mobile & Tablet)
    overlay.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        e.preventDefault();
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        e.preventDefault();
        doDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchend', () => {
      endDrag();
    });
  }

  // 8. Adjustment Controls (Scale & Rotate Sliders & Step Buttons)
  function setupTryOnAdjustmentSliders() {
    const scaleSlider = $('#tryon-scale-slider');
    const scaleVal = $('#tryon-scale-val');
    const scaleDown = $('#tryon-scale-down');
    const scaleUp = $('#tryon-scale-up');

    const rotateSlider = $('#tryon-rotate-slider');
    const rotateVal = $('#tryon-rotate-val');
    const rotateLeft = $('#tryon-rotate-left');
    const rotateRight = $('#tryon-rotate-right');

    const resetBtn = $('#tryon-reset-pos-btn');

    if (scaleSlider) {
      scaleSlider.addEventListener('input', (e) => {
        state.tryonScale = Number(e.target.value);
        if (scaleVal) scaleVal.textContent = `${state.tryonScale}%`;
        applyTryOnTransform();
      });
    }

    if (scaleDown) {
      scaleDown.addEventListener('click', () => {
        state.tryonScale = Math.max(50, state.tryonScale - 6);
        if (scaleSlider) scaleSlider.value = state.tryonScale;
        if (scaleVal) scaleVal.textContent = `${state.tryonScale}%`;
        applyTryOnTransform();
      });
    }

    if (scaleUp) {
      scaleUp.addEventListener('click', () => {
        state.tryonScale = Math.min(160, state.tryonScale + 6);
        if (scaleSlider) scaleSlider.value = state.tryonScale;
        if (scaleVal) scaleVal.textContent = `${state.tryonScale}%`;
        applyTryOnTransform();
      });
    }

    if (rotateSlider) {
      rotateSlider.addEventListener('input', (e) => {
        state.tryonRotate = Number(e.target.value);
        if (rotateVal) rotateVal.textContent = `${state.tryonRotate}°`;
        applyTryOnTransform();
      });
    }

    if (rotateLeft) {
      rotateLeft.addEventListener('click', () => {
        state.tryonRotate = Math.max(-20, state.tryonRotate - 2);
        if (rotateSlider) rotateSlider.value = state.tryonRotate;
        if (rotateVal) rotateVal.textContent = `${state.tryonRotate}°`;
        applyTryOnTransform();
      });
    }

    if (rotateRight) {
      rotateRight.addEventListener('click', () => {
        state.tryonRotate = Math.min(20, state.tryonRotate + 2);
        if (rotateSlider) rotateSlider.value = state.tryonRotate;
        if (rotateVal) rotateVal.textContent = `${state.tryonRotate}°`;
        applyTryOnTransform();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.tryonPosX = 0;
        state.tryonPosY = 0;
        state.tryonScale = 100;
        state.tryonRotate = 0;
        if (scaleSlider) scaleSlider.value = 100;
        if (scaleVal) scaleVal.textContent = '100%';
        if (rotateSlider) rotateSlider.value = 0;
        if (rotateVal) rotateVal.textContent = '0°';
        applyTryOnTransform();
      });
    }
  }

  // 9. Setup Sample Model Switcher (Boy vs Girl)
  function setupFaceSimulatorTabs() {
    const tabs = $$('.tryon-face-btn');
    const modelImg = $('#tryon-model-img');

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const model = btn.dataset.model || 'boy';
        state.sampleModel = model;

        if (modelImg) {
          modelImg.src = model === 'girl' ? 'girl try on.png' : 'boy try on.png';
          modelImg.alt = model === 'girl' ? 'Female Model Face' : 'Male Model Face';
        }

        // Reset position offsets when switching model for clean eye-level fit
        state.tryonPosX = 0;
        state.tryonPosY = 0;
        applyTryOnTransform();
      });
    });
  }

  // 7. Populate SPH, CYL, Axis, ADD Dropdowns dynamically
  function populatePrescriptionDropdowns() {
    // SPH values: +6.00 to -10.00 in 0.25 steps
    const sphSelects = $$('.js-sph-select');
    const sphOptions = [];
    sphOptions.push('<option value="0.00" selected>0.00 (Plano / Normal)</option>');

    // Plus powers
    for (let p = 6.00; p >= 0.25; p -= 0.25) {
      const val = '+' + p.toFixed(2);
      sphOptions.push(`<option value="${val}">${val}</option>`);
    }
    // Minus powers
    for (let m = -0.25; m >= -10.00; m -= 0.25) {
      const val = m.toFixed(2);
      sphOptions.push(`<option value="${val}">${val}</option>`);
    }

    sphSelects.forEach(sel => {
      sel.innerHTML = sphOptions.join('');
    });

    // CYL values: +4.00 to -4.00 in 0.25 steps
    const cylSelects = $$('.js-cyl-select');
    const cylOptions = [];
    cylOptions.push('<option value="0.00" selected>0.00 (None / No Astigmatism)</option>');

    for (let p = 4.00; p >= 0.25; p -= 0.25) {
      const val = '+' + p.toFixed(2);
      cylOptions.push(`<option value="${val}">${val}</option>`);
    }
    for (let m = -0.25; m >= -4.00; m -= 0.25) {
      const val = m.toFixed(2);
      cylOptions.push(`<option value="${val}">${val}</option>`);
    }

    cylSelects.forEach(sel => {
      sel.innerHTML = cylOptions.join('');
    });

    // Axis values: 0 to 180 degrees
    const axisSelects = $$('.js-axis-select');
    const axisOptions = ['<option value="0" selected>0&deg; / None</option>'];
    for (let deg = 5; deg <= 180; deg += 5) {
      axisOptions.push(`<option value="${deg}">${deg}&deg;</option>`);
    }
    axisSelects.forEach(sel => {
      sel.innerHTML = axisOptions.join('');
    });

    // ADD values (for reading / progressives)
    const addSelects = $$('.js-add-select');
    const addOptions = ['<option value="0.00" selected>None (0.00)</option>'];
    for (let a = 0.75; a <= 3.50; a += 0.25) {
      const val = '+' + a.toFixed(2);
      addOptions.push(`<option value="${val}">${val}</option>`);
    }
    addSelects.forEach(sel => {
      sel.innerHTML = addOptions.join('');
    });
  }

  // 8. Update Customizer Live Preview & Real-time Pricing Summary
  function updateCustomizerUI() {
    // 1. Frame preview in sidebar
    const previewWrap = $('#summary-preview-svg');
    if (previewWrap && state.selectedFrame && state.selectedColor) {
      previewWrap.innerHTML = renderFrameSVG(state.selectedFrame.shape, state.selectedColor.hex);
    }

    const titleEl = $('#summary-frame-title');
    if (titleEl && state.selectedFrame) {
      titleEl.textContent = state.selectedFrame.name;
    }

    const colorEl = $('#summary-frame-color');
    if (colorEl && state.selectedColor) {
      colorEl.textContent = `Color: ${state.selectedColor.name}`;
    }

    // 2. Pricing calculations
    const baseFramePrice = state.selectedFrame ? state.selectedFrame.basePricePKR : 13500;
    const lensUpgradePrice = LENS_PRICES[state.lensType] || 0;
    const coatingPrice = COATING_PRICES[state.lensCoating] || 0;
    const shippingPrice = 0; // Free in Gujranwala

    state.lensPricePKR = lensUpgradePrice;
    state.coatingPricePKR = coatingPrice;
    const totalPrice = baseFramePrice + lensUpgradePrice + coatingPrice + shippingPrice;

    // Update summary lines
    const lineFrameEl = $('#summary-price-frame');
    if (lineFrameEl) lineFrameEl.textContent = formatPKR(baseFramePrice);

    const lineLensLabel = $('#summary-label-lens');
    const lineLensEl = $('#summary-price-lens');
    if (lineLensEl && lineLensLabel) {
      if (state.lensType === 'progressives') {
        lineLensLabel.textContent = 'Progressives (+1,000 PKR):';
        lineLensEl.textContent = '+ ' + formatPKR(1000);
      } else if (state.lensType === 'bifocal') {
        lineLensLabel.textContent = 'Bifocal Lenses (+500 PKR):';
        lineLensEl.textContent = '+ ' + formatPKR(500);
      } else {
        lineLensLabel.textContent = 'Single Vision (Included):';
        lineLensEl.textContent = '0 PKR';
      }
    }

    const lineCoatingRow = $('#summary-row-coating');
    const lineCoatingEl = $('#summary-price-coating');
    const lineCoatingLabel = $('#summary-label-coating');
    if (lineCoatingRow && lineCoatingEl && lineCoatingLabel) {
      if (coatingPrice > 0) {
        lineCoatingRow.style.display = 'flex';
        lineCoatingLabel.textContent = state.lensCoating === 'blue_cut' 
          ? 'Blue-Cut Screen Filter:' 
          : 'Day/Night Photochromic:';
        lineCoatingEl.textContent = '+ ' + formatPKR(coatingPrice);
      } else {
        lineCoatingRow.style.display = 'none';
      }
    }

    // Grand total
    const totalEl = $('#summary-price-total');
    if (totalEl) {
      totalEl.textContent = formatPKR(totalPrice);
    }

    const orderSubmitTotal = $('#btn-submit-total');
    if (orderSubmitTotal) {
      orderSubmitTotal.textContent = formatPKR(totalPrice);
    }
  }

  // 9. Setup Lens & Coating Options Event Listeners
  function setupLensOptions() {
    const lensRadios = $$('input[name="lens_choice"]');
    lensRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        state.lensType = radio.value;
        $$('.lens-option').forEach(opt => {
          const r = $('input[type="radio"]', opt);
          opt.classList.toggle('is-selected', r && r.checked);
        });

        // If progressives selected, recommend ADD field in matrix
        const addNotice = $('#rx-add-notice');
        if (addNotice) {
          addNotice.style.display = state.lensType === 'progressives' ? 'block' : 'none';
        }

        updateCustomizerUI();
      });
    });

    const coatingRadios = $$('input[name="coating_choice"]');
    coatingRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        state.lensCoating = radio.value;
        $$('.coating-card').forEach(card => {
          const r = $('input[type="radio"]', card);
          card.classList.toggle('is-selected', r && r.checked);
        });
        updateCustomizerUI();
      });
    });
  }

  // 10. Setup Prescription Mode Tabs
  function setupPrescriptionTabs() {
    const tabs = $$('.rx-tab-btn');
    const matrixView = $('#rx-matrix-view');
    const uploadView = $('#rx-upload-view');
    const zeroView = $('#rx-zero-view');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const mode = tab.dataset.mode;
        state.prescriptionMode = mode;

        if (matrixView) matrixView.style.display = mode === 'matrix' ? 'block' : 'none';
        if (uploadView) uploadView.style.display = mode === 'upload' ? 'block' : 'none';
        if (zeroView) zeroView.style.display = mode === 'zero' ? 'block' : 'none';
      });
    });

    // File upload handler for prescription
    const rxFileInput = $('#rx-file-input');
    const rxUploadZone = $('#rx-upload-zone');
    const rxPreviewBox = $('#rx-preview-box');
    const rxPreviewThumb = $('#rx-preview-thumb');
    const rxPreviewName = $('#rx-preview-filename');
    const rxPreviewSize = $('#rx-preview-size');
    const rxRemoveBtn = $('#rx-remove-btn');

    if (rxFileInput) {
      rxFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        state.uploadedPrescriptionFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          state.uploadedPrescriptionBase64 = event.target.result;
          if (rxPreviewThumb) {
            rxPreviewThumb.src = file.type.startsWith('image/') 
              ? event.target.result 
              : 'logo.png';
          }
          if (rxPreviewName) rxPreviewName.textContent = file.name;
          if (rxPreviewSize) rxPreviewSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
          if (rxPreviewBox) rxPreviewBox.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      });
    }

    if (rxRemoveBtn) {
      rxRemoveBtn.addEventListener('click', () => {
        state.uploadedPrescriptionFile = null;
        state.uploadedPrescriptionBase64 = '';
        if (rxFileInput) rxFileInput.value = '';
        if (rxPreviewBox) rxPreviewBox.style.display = 'none';
      });
    }

    // Drag and drop support
    if (rxUploadZone) {
      ['dragenter', 'dragover'].forEach(name => {
        rxUploadZone.addEventListener(name, (e) => {
          e.preventDefault();
          rxUploadZone.classList.add('is-dragover');
        });
      });
      ['dragleave', 'drop'].forEach(name => {
        rxUploadZone.addEventListener(name, (e) => {
          e.preventDefault();
          rxUploadZone.classList.remove('is-dragover');
        });
      });
      rxUploadZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt.files && dt.files[0] && rxFileInput) {
          rxFileInput.files = dt.files;
          rxFileInput.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  // 11. Setup Localized Checkout Method Switcher
  function setupCheckoutOptions() {
    const paymentRadios = $$('input[name="payment_option"]');
    const codBox = $('#cod-details-box');
    const bankBox = $('#bank-details-box');

    paymentRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        state.paymentMethod = radio.value;
        $$('.payment-radio-card').forEach(card => {
          const r = $('input[type="radio"]', card);
          card.classList.toggle('is-selected', r && r.checked);
        });

        if (codBox) codBox.style.display = radio.value === 'cod' ? 'block' : 'none';
        if (bankBox) bankBox.style.display = radio.value === 'bank_transfer' ? 'block' : 'none';
      });
    });

    // Copy Account Buttons
    $$('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copyText;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = '#064e3b';
          btn.style.color = '#f8e7c9';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(() => {
          alert('Account copied: ' + text);
        });
      });
    });

    // Bank transfer receipt screenshot upload handler
    const receiptInput = $('#receipt-file-input');
    const receiptPreviewBox = $('#receipt-preview-box');
    const receiptPreviewThumb = $('#receipt-preview-thumb');
    const receiptPreviewName = $('#receipt-preview-filename');
    const receiptRemoveBtn = $('#receipt-remove-btn');

    if (receiptInput) {
      receiptInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        state.uploadedReceiptFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          state.uploadedReceiptBase64 = event.target.result;
          if (receiptPreviewThumb) {
            receiptPreviewThumb.src = file.type.startsWith('image/') 
              ? event.target.result 
              : 'logo.png';
          }
          if (receiptPreviewName) receiptPreviewName.textContent = file.name;
          if (receiptPreviewBox) receiptPreviewBox.style.display = 'flex';
        };
        reader.readAsDataURL(file);
      });
    }

    if (receiptRemoveBtn) {
      receiptRemoveBtn.addEventListener('click', () => {
        state.uploadedReceiptFile = null;
        state.uploadedReceiptBase64 = '';
        if (receiptInput) receiptInput.value = '';
        if (receiptPreviewBox) receiptPreviewBox.style.display = 'none';
      });
    }
  }

  // 12. Order Submission & WhatsApp Message Generation
  function setupOrderSubmission() {
    const orderForm = $('#order-checkout-form');
    if (!orderForm) return;

    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect customer inputs
      const nameInput = $('#cust-name');
      const phoneInput = $('#cust-phone');
      const cityInput = $('#cust-city');
      const areaInput = $('#cust-area');
      const addressInput = $('#cust-address');
      const notesInput = $('#cust-notes');
      const trxIdInput = $('#bank-trx-id');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const addressVal = addressInput ? addressInput.value.trim() : '';

      // Validation
      if (!nameVal) {
        alert('Please enter the customer / patient full name.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phoneVal || phoneVal.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid Pakistani mobile / WhatsApp number (e.g., 0324 7306886).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!addressVal) {
        alert('Please enter your full delivery address in Gujranwala.');
        if (addressInput) addressInput.focus();
        return;
      }

      // Check if Bank Transfer selected but receipt not uploaded
      if (state.paymentMethod === 'bank_transfer' && !state.uploadedReceiptFile) {
        const confirmSkip = confirm('You selected Bank / Mobile Wallet Transfer. Would you like to proceed and send your transfer receipt directly on WhatsApp instead?');
        if (!confirmSkip) {
          const receiptEl = $('#receipt-file-input');
          if (receiptEl) receiptEl.focus();
          return;
        }
      }

      // Collect Prescription Values if Matrix mode
      if (state.prescriptionMode === 'matrix') {
        state.od = {
          sph: $('#od-sph') ? $('#od-sph').value : '0.00',
          cyl: $('#od-cyl') ? $('#od-cyl').value : '0.00',
          axis: $('#od-axis') ? $('#od-axis').value : '0',
          add: $('#od-add') ? $('#od-add').value : '0.00'
        };
        state.os = {
          sph: $('#os-sph') ? $('#os-sph').value : '0.00',
          cyl: $('#os-cyl') ? $('#os-cyl').value : '0.00',
          axis: $('#os-axis') ? $('#os-axis').value : '0',
          add: $('#os-add') ? $('#os-add').value : '0.00'
        };
        const pdInput = $('#rx-pd-val');
        state.pd = pdInput && pdInput.value.trim() ? pdInput.value.trim() : 'Standard 63 mm';
      }

      state.customer = {
        name: nameVal,
        phone: phoneVal,
        city: cityInput ? cityInput.value : 'Gujranwala',
        area: areaInput ? areaInput.value : 'Model Town',
        address: addressVal,
        notes: notesInput ? notesInput.value.trim() : '',
        trxId: trxIdInput ? trxIdInput.value.trim() : ''
      };

      // Generate unique Order Reference ID
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderId = `BHEC-OPT-${randomSuffix}`;

      const baseFramePKR = state.selectedFrame.basePricePKR;
      const lensPKR = state.lensPricePKR;
      const coatingPKR = state.coatingPricePKR;
      const totalPKR = baseFramePKR + lensPKR + coatingPKR;

      // Packaged Order Object
      const orderPackage = {
        orderId: orderId,
        timestamp: new Date().toISOString(),
        customer: state.customer,
        frame: {
          id: state.selectedFrame.id,
          name: state.selectedFrame.name,
          color: state.selectedColor.name,
          material: state.selectedFrame.material,
          basePricePKR: baseFramePKR
        },
        lens: {
          type: state.lensType === 'progressives' 
            ? 'Progressives (+1,000 PKR)' 
            : (state.lensType === 'bifocal' ? 'Bifocals (+500 PKR)' : 'Single Vision (0 PKR)'),
          pricePKR: lensPKR,
          coating: state.lensCoating === 'blue_cut' 
            ? 'Blue-Cut Screen Filter' 
            : (state.lensCoating === 'photochromic' ? 'Day/Night Photochromic' : 'Standard Clear'),
          coatingPricePKR: coatingPKR
        },
        prescription: {
          mode: state.prescriptionMode,
          od: state.prescriptionMode === 'matrix' ? state.od : null,
          os: state.prescriptionMode === 'matrix' ? state.os : null,
          pd: state.prescriptionMode === 'matrix' ? state.pd : 'Pending Verification',
          paperSlipFileName: state.uploadedPrescriptionFile ? state.uploadedPrescriptionFile.name : null,
          paperSlipProofAttached: Boolean(state.uploadedPrescriptionBase64)
        },
        payment: {
          method: state.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank / Mobile Wallet Transfer',
          status: state.paymentMethod === 'cod' ? 'Pending on Delivery' : 'Transfer Screenshot Provided',
          receiptFileName: state.uploadedReceiptFile ? state.uploadedReceiptFile.name : null,
          transactionId: state.customer.trxId || 'N/A'
        },
        pricing: {
          baseFramePKR: baseFramePKR,
          lensPKR: lensPKR,
          coatingPKR: coatingPKR,
          shippingPKR: 0,
          totalPKR: totalPKR
        }
      };

      console.log('✅ CLEAN PACKAGED ORDER OBJECT CREATED:', orderPackage);

      // Save to client Database (localStorage)
      try {
        const stored = JSON.parse(localStorage.getItem('bhec_eyeglasses_orders') || '[]');
        stored.push(orderPackage);
        localStorage.setItem('bhec_eyeglasses_orders', JSON.stringify(stored));
      } catch (err) {
        console.warn('Could not persist order to local storage', err);
      }

      // Generate WhatsApp Order Text
      const waText = generateWhatsAppOrderText(orderPackage);
      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(waText)}`;

      // Display Modal Confirmation Screen
      showOrderConfirmationModal(orderPackage, waUrl);
    });
  }

  // 13. Generate WhatsApp Order Text
  function generateWhatsAppOrderText(order) {
    const rxDetails = order.prescription.mode === 'matrix'
      ? `OD (Right Eye): SPH ${order.prescription.od.sph} | CYL ${order.prescription.od.cyl} | Axis ${order.prescription.od.axis}° | ADD ${order.prescription.od.add}\nOS (Left Eye): SPH ${order.prescription.os.sph} | CYL ${order.prescription.os.cyl} | Axis ${order.prescription.os.axis}° | ADD ${order.prescription.os.add}\nPD: ${order.prescription.pd}`
      : (order.prescription.mode === 'upload' 
          ? `Paper Prescription Slip Attached (${order.prescription.paperSlipFileName || 'Photo will be sent directly in this chat'})`
          : `Zero Power / Computer Anti-Glare Glasses (No Prescription Needed)`);

    return (
      `*👓 NEW OPTICAL ORDER - BUSHRA HAMEED EYE CLINIC*\n` +
      `*Order ID*: ${order.orderId}\n` +
      `-----------------------------------------\n` +
      `👤 *PATIENT / CUSTOMER*:\n` +
      `• Name: ${order.customer.name}\n` +
      `• Phone: ${order.customer.phone}\n` +
      `• City: ${order.customer.city} (${order.customer.area})\n` +
      `• Address: ${order.customer.address}\n` +
      (order.customer.notes ? `• Notes: ${order.customer.notes}\n` : '') +
      `-----------------------------------------\n` +
      `👓 *FRAME SELECTION*:\n` +
      `• Model: ${order.frame.name}\n` +
      `• Color: ${order.frame.color}\n` +
      `• Base Frame Price: ${formatPKR(order.frame.basePricePKR)}\n` +
      `-----------------------------------------\n` +
      `🔬 *LENS & COATINGS*:\n` +
      `• Lens Type: ${order.lens.type}\n` +
      `• Coating: ${order.lens.coating} (${formatPKR(order.lens.coatingPricePKR)})\n` +
      `-----------------------------------------\n` +
      `📋 *PRESCRIPTION VALUES*:\n` +
      `${rxDetails}\n` +
      `-----------------------------------------\n` +
      `💳 *PAYMENT & BILLING*:\n` +
      `• Method: ${order.payment.method}\n` +
      (order.payment.transactionId && order.payment.transactionId !== 'N/A' ? `• Trx ID / TID: ${order.payment.transactionId}\n` : '') +
      `• Delivery in Gujranwala: FREE\n` +
      `*💰 TOTAL BILL: ${formatPKR(order.pricing.totalPKR)}*\n` +
      `-----------------------------------------\n` +
      `_Please confirm my optical prescription order for workshop glazing. Thank you!_`
    );
  }

  // 14. Show Order Confirmation Modal
  function showOrderConfirmationModal(order, waUrl) {
    const modal = $('#order-modal');
    if (!modal) return;

    const idEl = $('#modal-order-id');
    const frameEl = $('#modal-order-frame');
    const lensEl = $('#modal-order-lens');
    const rxEl = $('#modal-order-rx');
    const paymentEl = $('#modal-order-payment');
    const totalEl = $('#modal-order-total');
    const waBtn = $('#modal-whatsapp-btn');

    if (idEl) idEl.textContent = order.orderId;
    if (frameEl) frameEl.textContent = `${order.frame.name} (${order.frame.color})`;
    if (lensEl) lensEl.textContent = `${order.lens.type} + ${order.lens.coating}`;

    if (rxEl) {
      if (order.prescription.mode === 'matrix') {
        rxEl.textContent = `OD: ${order.prescription.od.sph} / OS: ${order.prescription.os.sph} (PD: ${order.prescription.pd})`;
      } else if (order.prescription.mode === 'upload') {
        rxEl.textContent = `Paper slip (${order.prescription.paperSlipFileName || 'To send on WhatsApp'})`;
      } else {
        rxEl.textContent = 'Zero Power / Computer Protection';
      }
    }

    if (paymentEl) paymentEl.textContent = order.payment.method;
    if (totalEl) totalEl.textContent = formatPKR(order.pricing.totalPKR);

    if (waBtn) {
      waBtn.href = waUrl;
      waBtn.target = '_blank';
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // Close Modal Button
    const closeBtn = $('#modal-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      };
    }

    // Auto-open WhatsApp in new tab for seamless Pakistani e-commerce experience
    window.open(waUrl, '_blank');
  }

  // 15. Setup Category Circles & Filter Pills Handlers
  function setupCategoryHandlers() {
    // 5 Category Circles in Champagne Banner
    $$('.category-circle-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = item.dataset.category || 'all';
        setCategory(cat);

        // Smooth scroll down to featured section
        const target = $('#featured-showcase');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Category Filter Pills
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter || 'all';
        setCategory(cat);
      });
    });

    // Header Category Nav Links
    $$('.store-nav-cat-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const cat = link.dataset.category;
        if (cat) {
          e.preventDefault();
          setCategory(cat);
          const target = $('#featured-showcase');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // 16. Setup Instant Real-Time Search Input
  function setupSearch() {
    const searchInput = $('#store-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  /* ---------- Initialization ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Default active frame
    state.selectedFrame = FRAMES[0];
    state.selectedColor = FRAMES[0].colors[0];

    // Populate UI
    renderCatalog();
    populatePrescriptionDropdowns();
    setupLensOptions();
    setupPrescriptionTabs();
    setupCheckoutOptions();
    setupOrderSubmission();
    setupCategoryHandlers();
    setupSearch();
    setupFaceSimulatorTabs();
    setupTryOnPhotoUpload();
    setupTryOnDragging();
    setupTryOnAdjustmentSliders();
    updateCustomizerUI();
    updateCartBadge();

    // Check for pre-selected frame in URL hash (e.g. #frame-rayban-aviator)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#frame-')) {
      const frameId = hash.replace('#', '');
      selectFrame(frameId, false);
    }
  });

})();
