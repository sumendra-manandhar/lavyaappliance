
import { Category, Product, PageContent } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'TV & Audio', slug: 'tv-audio', icon: '📺', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', clicks: 1250 },
  { id: '2', name: 'Laundry', slug: 'laundry', icon: '🧺', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80', clicks: 890 },
  { id: '3', name: 'Kitchen Burners', slug: 'kitchen-burners', icon: '🔥', image: 'https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=800&q=80', clicks: 450 },
  { id: '4', name: 'Refrigerators', slug: 'refrigerators', icon: '❄️', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', clicks: 1100 },
  { id: '5', name: 'Air Conditioners', slug: 'ac', icon: '🌬️', image: 'https://images.unsplash.com/photo-1631545729918-46c975c6713a?auto=format&fit=crop&w=800&q=80', clicks: 2300 },
  { id: '6', name: 'Small Appliances', slug: 'small-appliances', icon: '🔌', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80', clicks: 670 },
  { id: '7', name: 'Vacuum Cleaners', slug: 'vacuum', icon: '🧹', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', clicks: 340 },
  { id: '8', name: 'Personal Care', slug: 'personal-care', icon: '🪒', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80', clicks: 520 },
  { id: '9', name: 'Dishwashers', slug: 'dishwashers', icon: '🍽️', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=800&q=80', clicks: 210 },
  { id: '10', name: 'Ovens & Microwaves', slug: 'ovens', icon: '⏲️', image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80', clicks: 430 }
];

export const PRODUCTS: Product[] = [
  // --- TV & Audio (Cat 1) ---
  {
    id: 'tv-samsung-neo-8k',
    name: 'Samsung Neo QLED 8K Smart TV',
    slug: 'neo-qled-8k',
    brand: 'Samsung',
    description: 'Unparalleled detail with Quantum Matrix Pro. Experience the future of television with our most advanced AI-powered processor that optimizes picture and sound scene-by-scene.',
    categoryId: '1',
    categoryName: 'TV & Audio',
    featured: true,
    clicks: 452,
    variants: [
      {
        id: 'v-tv-sam-65',
        variantName: '65-inch',
        price: 245000,
        sku: 'QN65-001',
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Resolution', value: '8K' }, { label: 'Refresh Rate', value: '120Hz' }, { label: 'Panel', value: 'Neo QLED' }],
        stock: 12,
        color: '#000000',
        finishName: 'Titan Black'
      },
      {
        id: 'v-tv-sam-75',
        variantName: '75-inch',
        price: 385000,
        sku: 'QN75-002',
        images: ['https://images.unsplash.com/photo-1461151304267-38535e770f70?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Resolution', value: '8K' }, { label: 'Refresh Rate', value: '144Hz' }, { label: 'Panel', value: 'Neo QLED' }],
        stock: 5,
        color: '#C0C0C0',
        finishName: 'Eclipse Silver'
      }
    ]
  },
  {
    id: 'tv-sony-bravia-xr',
    name: 'Sony Bravia XR Master Series',
    slug: 'bravia-xr-8k',
    brand: 'Sony',
    description: 'Cognitive Processor XR brings reality to your screen. The world’s first TV with cognitive intelligence that understands how humans see and hear.',
    categoryId: '1',
    categoryName: 'TV & Audio',
    featured: true,
    clicks: 340,
    variants: [
      {
        id: 'v-tv-sony-65',
        variantName: '65-inch OLED',
        price: 285000,
        sku: 'XR-65-M',
        images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Resolution', value: '4K' }, { label: 'Refresh Rate', value: '120Hz' }, { label: 'Panel', value: 'OLED' }],
        stock: 4,
        color: '#1a1a1a',
        finishName: 'Dark Obsidian'
      }
    ]
  },
  {
    id: 'tv-lg-oled-c3',
    name: 'LG OLED evo C3 Series',
    slug: 'lg-oled-c3',
    brand: 'LG',
    description: 'Advanced OLED evo panel for brighter, punchier images. The ultimate gaming TV with NVIDIA G-Sync and AMD FreeSync Premium support.',
    categoryId: '1',
    categoryName: 'TV & Audio',
    featured: false,
    clicks: 210,
    variants: [
      {
        id: 'v-tv-lg-55',
        variantName: '55-inch',
        price: 185000,
        sku: 'LG-C3-55',
        images: ['https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Resolution', value: '4K' }, { label: 'Refresh Rate', value: '120Hz' }, { label: 'HDMI 2.1', value: '4 Ports' }],
        stock: 15,
        color: '#2b2b2b',
        finishName: 'Graphite Grey'
      }
    ]
  },
  {
    id: 'audio-sony-soundbar',
    name: 'Sony HT-A7000 Soundbar',
    slug: 'sony-ht-a7000',
    brand: 'Sony',
    description: '7.1.2 channel surround sound with Dolby Atmos and DTS:X. Vertical Surround Engine immerses you in the action.',
    categoryId: '1',
    categoryName: 'TV & Audio',
    featured: false,
    clicks: 150,
    variants: [
      {
        id: 'v-aud-sony-1',
        variantName: 'Standard',
        price: 145000,
        sku: 'HT-A7000',
        images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Channels', value: '7.1.2' }, { label: 'Power', value: '500W' }],
        stock: 8,
        color: '#000000',
        finishName: 'Matte Black'
      }
    ]
  },
  {
    id: 'tv-samsung-frame',
    name: 'Samsung The Frame',
    slug: 'samsung-the-frame',
    brand: 'Samsung',
    description: 'TV when it’s on, Art when it’s off. Customizable bezels to match your home decor.',
    categoryId: '1',
    categoryName: 'TV & Audio',
    featured: false,
    clicks: 290,
    variants: [
      {
        id: 'v-tv-frame-55',
        variantName: '55-inch',
        price: 165000,
        sku: 'LS03B',
        images: ['https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Art Mode', value: 'Yes' }, { label: 'Matte Display', value: 'Yes' }],
        stock: 10,
        color: '#ffffff',
        finishName: 'Customizable'
      }
    ]
  },

  // --- Laundry (Cat 2) ---
  {
    id: 'w-lg-ai-pro',
    name: 'LG Front Load AI Washer',
    slug: 'ai-washer-pro',
    brand: 'LG',
    description: 'AI-powered washing machine with fabric sensing. Detects the weight and softness of the fabric to choose the optimal motions.',
    categoryId: '2',
    categoryName: 'Laundry',
    featured: true,
    clicks: 310,
    variants: [
      {
        id: 'v-w-lg-8',
        variantName: '8kg',
        price: 78000,
        sku: 'WM-AI-8K',
        images: ['https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '8 kg' }, { label: 'Steam', value: 'Yes' }],
        stock: 8,
        color: '#FFFFFF',
        finishName: 'Ceramic White'
      }
    ]
  },
  {
    id: 'w-sam-ecobubble',
    name: 'Samsung EcoBubble Smart Drive',
    slug: 'ecobubble-washer',
    brand: 'Samsung',
    description: 'Energy efficient cleaning with air bubbles. Turn detergent into bubbles, so it quickly penetrates fabric and removes dirt easily.',
    categoryId: '2',
    categoryName: 'Laundry',
    featured: false,
    clicks: 180,
    variants: [
      {
        id: 'v-w-sam-9',
        variantName: '9kg',
        price: 82000,
        sku: 'EB-9K-S',
        images: ['https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '9 kg' }, { label: 'Steam', value: 'No' }],
        stock: 10,
        color: '#808080',
        finishName: 'Platinum Silver'
      }
    ]
  },
  {
    id: 'w-bosch-series8',
    name: 'Bosch Series 8 Washing Machine',
    slug: 'bosch-series-8',
    brand: 'Bosch',
    description: 'German engineering with EcoSilence Drive. Extremely quiet and durable with ActiveWater Plus technology.',
    categoryId: '2',
    categoryName: 'Laundry',
    featured: true,
    clicks: 275,
    variants: [
      {
        id: 'v-w-bosch-9',
        variantName: '9kg Front Load',
        price: 95000,
        sku: 'WAW28460',
        images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'RPM', value: '1400' }, { label: 'Noise', value: '47dB' }],
        stock: 6,
        color: '#FFFFFF',
        finishName: 'Classic White'
      }
    ]
  },
  {
    id: 'w-whirlpool-bloomwash',
    name: 'Whirlpool Bloomwash Pro',
    slug: 'whirlpool-bloomwash',
    brand: 'Whirlpool',
    description: 'Top load washer with built-in heater. Removes 99.9% germs and allergens.',
    categoryId: '2',
    categoryName: 'Laundry',
    featured: false,
    clicks: 120,
    variants: [
      {
        id: 'v-w-whirl-7.5',
        variantName: '7.5kg Top Load',
        price: 45000,
        sku: 'BM-75H',
        images: ['https://images.unsplash.com/photo-1545173168-9f1947eebb8f?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Heater', value: 'Yes' }, { label: 'Wash Modes', value: '12' }],
        stock: 12,
        color: '#2F4F4F',
        finishName: 'Graphite'
      }
    ]
  },

  // --- Kitchen Burners (Cat 3) ---
  {
    id: 'kb-faber-glass',
    name: 'Faber 3 Burner Glass Cooktop',
    slug: 'faber-glass-3',
    brand: 'Faber',
    description: 'Premium toughened glass top with brass burners. Heavy duty pan supports for stability.',
    categoryId: '3',
    categoryName: 'Kitchen Burners',
    featured: false,
    clicks: 95,
    variants: [
      {
        id: 'v-kb-fab-3',
        variantName: '3 Burner',
        price: 18500,
        sku: 'FB-3B-GL',
        images: ['https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Material', value: 'Tempered Glass' }, { label: 'Ignition', value: 'Auto' }],
        stock: 20,
        color: '#000000',
        finishName: 'Black Glass'
      }
    ]
  },
  {
    id: 'kb-elica-hob',
    name: 'Elica 4 Burner Hob',
    slug: 'elica-hob-4',
    brand: 'Elica',
    description: 'Seamless integration into your kitchen counter. Multi-flame control for precise cooking.',
    categoryId: '3',
    categoryName: 'Kitchen Burners',
    featured: false,
    clicks: 140,
    variants: [
      {
        id: 'v-kb-elica-4',
        variantName: '4 Burner',
        price: 32000,
        sku: 'EL-4B-HOB',
        images: ['https://images.unsplash.com/photo-1626421375131-01648a8607a0?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Finish', value: 'Glass' }, { label: 'Width', value: '60cm' }],
        stock: 8,
        color: '#000000',
        finishName: 'Midnight Black'
      }
    ]
  },

  // --- Refrigerators (Cat 4) ---
  {
    id: 'f-sam-bespoke',
    name: 'Samsung Bespoke AI Refrigerator',
    slug: 'bespoke-fridge',
    brand: 'Samsung',
    description: 'Customizable colors with AI Energy mode. Create a beautifully stylish and unique kitchen space.',
    categoryId: '4',
    categoryName: 'Refrigerators',
    featured: true,
    clicks: 560,
    variants: [
      {
        id: 'v-f-bes-navy',
        variantName: '600L Navy',
        price: 210000,
        sku: 'RF-BES-N',
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '600L' }, { label: 'Style', value: 'French Door' }],
        stock: 2,
        color: '#000080',
        finishName: 'Glam Navy'
      },
      {
        id: 'v-f-bes-pink',
        variantName: '600L Pink',
        price: 210000,
        sku: 'RF-BES-P',
        images: ['https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '600L' }, { label: 'Style', value: 'French Door' }],
        stock: 3,
        color: '#FFC0CB',
        finishName: 'Glam Pink'
      }
    ]
  },
  {
    id: 'f-lg-instaview',
    name: 'LG InstaView Door-in-Door',
    slug: 'lg-instaview',
    brand: 'LG',
    description: 'Knock twice to see inside without opening the door. Saves cold air and keeps food fresh longer.',
    categoryId: '4',
    categoryName: 'Refrigerators',
    featured: true,
    clicks: 480,
    variants: [
      {
        id: 'v-f-lg-650',
        variantName: '650L Side-by-Side',
        price: 245000,
        sku: 'LG-IV-650',
        images: ['https://images.unsplash.com/photo-1536353284924-9220c464e262?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '650L' }, { label: 'Compressor', value: 'Inverter Linear' }],
        stock: 4,
        color: '#4a4a4a',
        finishName: 'Matte Steel'
      }
    ]
  },
  {
    id: 'f-haier-bottom',
    name: 'Haier Bottom Mount Refrigerator',
    slug: 'haier-bottom-mount',
    brand: 'Haier',
    description: 'Innovative bottom mounted freezer design reduces bending by 90%.',
    categoryId: '4',
    categoryName: 'Refrigerators',
    featured: false,
    clicks: 150,
    variants: [
      {
        id: 'v-f-haier-320',
        variantName: '320L',
        price: 65000,
        sku: 'HRB-320',
        images: ['https://images.unsplash.com/photo-1585676767512-19e342795c73?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Frost Free', value: 'Yes' }, { label: 'Convertible', value: '8-in-1' }],
        stock: 10,
        color: '#C0C0C0',
        finishName: 'Brushline Silver'
      }
    ]
  },
  {
    id: 'f-whirlpool-multi',
    name: 'Whirlpool Proton World Series',
    slug: 'whirlpool-proton',
    brand: 'Whirlpool',
    description: 'Three door advantage for better cooling retention and odor mixing prevention.',
    categoryId: '4',
    categoryName: 'Refrigerators',
    featured: false,
    clicks: 130,
    variants: [
      {
        id: 'v-f-whirl-300',
        variantName: '300L Triple Door',
        price: 52000,
        sku: 'FP-300',
        images: ['https://images.unsplash.com/photo-1584269600464-37049615b18f?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Doors', value: '3' }, { label: 'Tech', value: '6th Sense' }],
        stock: 15,
        color: '#8B4513',
        finishName: 'Alpha Steel'
      }
    ]
  },

  // --- AC (Cat 5) ---
  {
    id: 'ac-daikin-split',
    name: 'Daikin 1.5 Ton Inverter Split AC',
    slug: 'daikin-1.5-split',
    brand: 'Daikin',
    description: 'Streamer Discharge technology for air purification. Best in class cooling performance even at 54°C.',
    categoryId: '5',
    categoryName: 'Air Conditioners',
    featured: false,
    clicks: 340,
    variants: [
      {
        id: 'v-ac-dai-1.5',
        variantName: '1.5 Ton',
        price: 88000,
        sku: 'FTKF50',
        images: ['https://images.unsplash.com/photo-1631545729918-46c975c6713a?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Rating', value: '5 Star' }, { label: 'Refrigerant', value: 'R32' }],
        stock: 15,
        color: '#FFFFFF',
        finishName: 'White'
      }
    ]
  },
  {
    id: 'ac-mitsu-heavy',
    name: 'Mitsubishi Heavy Industries 2 Ton',
    slug: 'mitsu-heavy-2',
    brand: 'Mitsubishi',
    description: 'Heavy duty cooling for large rooms. Jet Air Technology delivers long distance airflow.',
    categoryId: '5',
    categoryName: 'Air Conditioners',
    featured: false,
    clicks: 220,
    variants: [
      {
        id: 'v-ac-mit-2',
        variantName: '2 Ton',
        price: 115000,
        sku: 'SRK24YVS',
        images: ['https://images.unsplash.com/photo-1614631336442-70b1359c3cb6?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Throw', value: '15m' }, { label: 'Type', value: 'Split' }],
        stock: 8,
        color: '#FFFFFF',
        finishName: 'White'
      }
    ]
  },
  {
    id: 'ac-lg-dual',
    name: 'LG Dual Inverter Split AC',
    slug: 'lg-dual-inverter',
    brand: 'LG',
    description: 'Dual Inverter Compressor with varied speed dual rotary motor has a wider rotational frequency.',
    categoryId: '5',
    categoryName: 'Air Conditioners',
    featured: true,
    clicks: 390,
    variants: [
      {
        id: 'v-ac-lg-1.5',
        variantName: '1.5 Ton AI+',
        price: 92000,
        sku: 'LG-AI-15',
        images: ['https://images.unsplash.com/photo-1545620862-58dd8ee69527?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Convertible', value: '6-in-1' }, { label: 'Protection', value: 'Ocean Black' }],
        stock: 10,
        color: '#FFFFFF',
        finishName: 'White'
      }
    ]
  },
  {
    id: 'ac-voltas-window',
    name: 'Voltas Window AC 1.5 Ton',
    slug: 'voltas-window-1.5',
    brand: 'Voltas',
    description: 'Economical cooling solution with high ambient cooling capability.',
    categoryId: '5',
    categoryName: 'Air Conditioners',
    featured: false,
    clicks: 90,
    variants: [
      {
        id: 'v-ac-volt-win',
        variantName: '1.5 Ton Fixed',
        price: 48000,
        sku: '185-LZH',
        images: ['https://images.unsplash.com/photo-1603565022837-97992781cc3f?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Type', value: 'Window' }, { label: 'Coil', value: 'Copper' }],
        stock: 20,
        color: '#F5F5F5',
        finishName: 'Off White'
      }
    ]
  },

  // --- Small Appliances (Cat 6) ---
  {
    id: 'sa-philips-airfryer',
    name: 'Philips Air Fryer XXL',
    slug: 'philips-airfryer-xxl',
    brand: 'Philips',
    description: 'Fat Removal Technology for healthier frying. Cooks 1.4kg of fries or a whole chicken.',
    categoryId: '6',
    categoryName: 'Small Appliances',
    featured: true,
    clicks: 650,
    variants: [
      {
        id: 'v-sa-phil-xxl',
        variantName: 'XXL Digital',
        price: 35000,
        sku: 'HD9650',
        images: ['https://images.unsplash.com/photo-1626139576127-450a8a649635?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '1.4kg' }, { label: 'Power', value: '2225W' }],
        stock: 25,
        color: '#000000',
        finishName: 'Black'
      }
    ]
  },
  {
    id: 'sa-breville-barista',
    name: 'Breville Barista Express',
    slug: 'breville-barista',
    brand: 'Breville',
    description: 'Create third wave specialty coffee at home from bean to espresso in less than a minute.',
    categoryId: '6',
    categoryName: 'Small Appliances',
    featured: true,
    clicks: 420,
    variants: [
      {
        id: 'v-sa-brev-1',
        variantName: 'Stainless Steel',
        price: 105000,
        sku: 'BES870',
        images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Pressure', value: '15 Bar' }, { label: 'Grinder', value: 'Built-in' }],
        stock: 5,
        color: '#C0C0C0',
        finishName: 'Brushed Stainless'
      }
    ]
  },
  {
    id: 'sa-kitchenaid-mixer',
    name: 'KitchenAid Artisan Stand Mixer',
    slug: 'kitchenaid-artisan',
    brand: 'KitchenAid',
    description: 'The iconic stand mixer for baking enthusiasts. Robust, stable and durable.',
    categoryId: '6',
    categoryName: 'Small Appliances',
    featured: false,
    clicks: 380,
    variants: [
      {
        id: 'v-sa-ka-red',
        variantName: '5 Quart',
        price: 65000,
        sku: 'KSM150',
        images: ['https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Bowl', value: '4.8L' }, { label: 'Speeds', value: '10' }],
        stock: 10,
        color: '#FF0000',
        finishName: 'Empire Red'
      }
    ]
  },
  {
    id: 'sa-nutribullet-pro',
    name: 'NutriBullet Pro 900',
    slug: 'nutribullet-pro',
    brand: 'NutriBullet',
    description: 'Compact and powerful blender. Breaks down tough ingredients like seeds, kale and nuts.',
    categoryId: '6',
    categoryName: 'Small Appliances',
    featured: false,
    clicks: 210,
    variants: [
      {
        id: 'v-sa-nutri-900',
        variantName: '900W Series',
        price: 18000,
        sku: 'NB-900',
        images: ['https://images.unsplash.com/photo-1570222094114-28a9d88a2b64?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Power', value: '900W' }, { label: 'Cups', value: '2' }],
        stock: 30,
        color: '#CD7F32',
        finishName: 'Champagne'
      }
    ]
  },

  // --- Vacuum (Cat 7) ---
  {
    id: 'vc-dyson-v15',
    name: 'Dyson V15 Detect',
    slug: 'dyson-v15',
    brand: 'Dyson',
    description: 'Laser reveals microscopic dust. Powerful cordless cleaning with LCD screen.',
    categoryId: '7',
    categoryName: 'Vacuum Cleaners',
    featured: true,
    clicks: 290,
    variants: [
      {
        id: 'v-vc-dy-v15',
        variantName: 'V15 Absolute',
        price: 110000,
        sku: 'DY-V15',
        images: ['https://images.unsplash.com/photo-1558317374-a354d5f6d4da?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Suction', value: '240 AW' }, { label: 'Runtime', value: '60 min' }],
        stock: 12,
        color: '#FFD700',
        finishName: 'Yellow/Nickel'
      }
    ]
  },
  {
    id: 'vc-xiaomi-robot',
    name: 'Xiaomi Robot Vacuum X10',
    slug: 'xiaomi-x10',
    brand: 'Xiaomi',
    description: 'Automated cleaning with auto-empty station. LDS Laser Navigation for precise mapping.',
    categoryId: '7',
    categoryName: 'Vacuum Cleaners',
    featured: false,
    clicks: 180,
    variants: [
      {
        id: 'v-vc-mi-x10',
        variantName: 'X10+',
        price: 55000,
        sku: 'MI-ROBOT-X10',
        images: ['https://images.unsplash.com/photo-1596238612882-9571e4cb9916?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Suction', value: '4000Pa' }, { label: 'Mopping', value: 'Yes' }],
        stock: 18,
        color: '#FFFFFF',
        finishName: 'White'
      }
    ]
  },
  {
    id: 'vc-karcher-wd3',
    name: 'Karcher WD3 Wet & Dry',
    slug: 'karcher-wd3',
    brand: 'Karcher',
    description: 'Robust impact resistant container. For wet and dry vacuuming without filter replacement.',
    categoryId: '7',
    categoryName: 'Vacuum Cleaners',
    featured: false,
    clicks: 110,
    variants: [
      {
        id: 'v-vc-kar-wd3',
        variantName: 'WD3 Premium',
        price: 16500,
        sku: 'WD3-P',
        images: ['https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Power', value: '1000W' }, { label: 'Tank', value: '17L' }],
        stock: 25,
        color: '#FFD700',
        finishName: 'Yellow/Black'
      }
    ]
  },

  // --- Personal Care (Cat 8) ---
  {
    id: 'pc-dyson-supersonic',
    name: 'Dyson Supersonic Hair Dryer',
    slug: 'dyson-supersonic',
    brand: 'Dyson',
    description: 'Fast drying. No extreme heat. Engineered for different hair types.',
    categoryId: '8',
    categoryName: 'Personal Care',
    featured: false,
    clicks: 340,
    variants: [
      {
        id: 'v-pc-dy-hair',
        variantName: 'Vinca Blue',
        price: 65000,
        sku: 'DY-SUPER-VB',
        images: ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Power', value: '1600W' }, { label: 'Attachments', value: '5' }],
        stock: 20,
        color: '#000080',
        finishName: 'Vinca Blue'
      }
    ]
  },
  {
    id: 'pc-philips-shaver',
    name: 'Philips Norelco Shaver 9000',
    slug: 'philips-shaver-9000',
    brand: 'Philips',
    description: 'World’s most intelligent AI-powered shaver. SkinIQ technology adjusts to your beard density.',
    categoryId: '8',
    categoryName: 'Personal Care',
    featured: false,
    clicks: 160,
    variants: [
      {
        id: 'v-pc-phil-9000',
        variantName: 'Prestige',
        price: 45000,
        sku: 'S9000',
        images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Blades', value: 'Dual Steel' }, { label: 'Wet/Dry', value: 'Yes' }],
        stock: 8,
        color: '#C0C0C0',
        finishName: 'Chrome'
      }
    ]
  },
  {
    id: 'pc-oralb-io',
    name: 'Oral-B iO Series 9',
    slug: 'oralb-io-9',
    brand: 'Oral-B',
    description: 'Magnetic technology for a professional clean feeling and gentle brushing.',
    categoryId: '8',
    categoryName: 'Personal Care',
    featured: false,
    clicks: 190,
    variants: [
      {
        id: 'v-pc-oral-9',
        variantName: 'Series 9',
        price: 32000,
        sku: 'IO-9-BLK',
        images: ['https://images.unsplash.com/photo-1559599189-fe84fea4eb8b?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Modes', value: '7' }, { label: 'AI Tracking', value: '3D' }],
        stock: 12,
        color: '#000000',
        finishName: 'Onyx Black'
      }
    ]
  },

  // --- Dishwashers (Cat 9) ---
  {
    id: 'dw-bosch-series6',
    name: 'Bosch Series 6 Dishwasher',
    slug: 'bosch-dishwasher-6',
    brand: 'Bosch',
    description: 'PerfectDry based on Zeolith technology: perfect drying results with 3D Airflow.',
    categoryId: '9',
    categoryName: 'Dishwashers',
    featured: true,
    clicks: 220,
    variants: [
      {
        id: 'v-dw-bosch-6',
        variantName: '13 Place',
        price: 85000,
        sku: 'SMS66GI01I',
        images: ['https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Place Settings', value: '13' }, { label: 'Programs', value: '6' }],
        stock: 5,
        color: '#C0C0C0',
        finishName: 'Silver Inox'
      }
    ]
  },
  {
    id: 'dw-lg-quadwash',
    name: 'LG QuadWash Steam',
    slug: 'lg-quadwash',
    brand: 'LG',
    description: 'TrueSteam technology leaves dishes sparkling clean while reducing water spots.',
    categoryId: '9',
    categoryName: 'Dishwashers',
    featured: false,
    clicks: 140,
    variants: [
      {
        id: 'v-dw-lg-quad',
        variantName: '14 Place',
        price: 98000,
        sku: 'DFB424FW',
        images: ['https://images.unsplash.com/photo-1583345237731-ef06e4a27d6b?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Arms', value: 'Quad' }, { label: 'Motor', value: 'Inverter Direct' }],
        stock: 4,
        color: '#FFFFFF',
        finishName: 'White'
      }
    ]
  },

  // --- Ovens (Cat 10) ---
  {
    id: 'ov-sam-convection',
    name: 'Samsung Convection Microwave',
    slug: 'samsung-convection-32l',
    brand: 'Samsung',
    description: 'HotBlast technology reduces cooking time significantly. Slim Fry technology for healthier cooking.',
    categoryId: '10',
    categoryName: 'Ovens & Microwaves',
    featured: false,
    clicks: 180,
    variants: [
      {
        id: 'v-ov-sam-32',
        variantName: '32L',
        price: 32000,
        sku: 'MC32K7055',
        images: ['https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Capacity', value: '32L' }, { label: 'Type', value: 'Convection' }],
        stock: 15,
        color: '#000000',
        finishName: 'Black'
      }
    ]
  },
  {
    id: 'ov-lg-charcoal',
    name: 'LG Charcoal Lighting Heater',
    slug: 'lg-charcoal-32',
    brand: 'LG',
    description: 'Charcoal Lighting Heater maintains natural flavors and keeps food crunchy outside and juicy inside.',
    categoryId: '10',
    categoryName: 'Ovens & Microwaves',
    featured: true,
    clicks: 260,
    variants: [
      {
        id: 'v-ov-lg-32',
        variantName: '32L Charcoal',
        price: 38000,
        sku: 'MJ3286BR',
        images: ['https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Menu', value: 'Auto Cook' }, { label: 'Cavity', value: 'Stainless Steel' }],
        stock: 10,
        color: '#000000',
        finishName: 'Floral Black'
      }
    ]
  }
];

export const STATIC_PAGES: Record<string, PageContent> = {
  about: {
    title: "About Our Firm",
    subtitle: "Pioneering Premium Electronics in Nepal since 2024",
    content: "lavyaappliance is more than just a retailer; we are a curator of the finest lifestyle technologies. Founded with a vision to bridge the gap between global innovation and local homes, we have established ourselves as the premier destination for high-end electronics. <br/><br/> Our showrooms are designed to be experiential hubs where customers can interact with the latest in AI-powered appliances, 8K visual entertainment, and smart home ecosystems. We partner directly with global giants like Samsung, Sony, LG, and Bosch to ensure authenticity and warranty protection."
  },
  warranty: {
    title: "Warranty Policy",
    subtitle: "Comprehensive Protection for Your Investment",
    content: "All products purchased from lavyaappliance come with a standard manufacturer's warranty ranging from 1 to 10 years depending on the component (e.g., Compressor/Motor). <br/><br/> <strong>Standard Terms:</strong> <br/> - Labor free for 1 year. <br/> - Parts replacement subject to depreciation after 3 years. <br/> - Physical damage and power surge issues are not covered under standard warranty. <br/><br/> We also offer 'ElectroShield', our extended warranty program that adds 2 extra years of full coverage."
  },
  contact: {
    title: "Contact Us",
    subtitle: "We're here to help",
    content: "<strong>Head Office:</strong><br/>lavyaappliance Tower, Durbar Marg, Kathmandu<br/><br/><strong>Phone:</strong><br/>+977-1-4XXXXXX<br/><br/><strong>Email:</strong><br/>support@lavyaappliance.com.np<br/><br/><strong>Opening Hours:</strong><br/>Sun-Fri: 10:00 AM - 7:00 PM"
  },
  corporate: {
    title: "Corporate Sales",
    subtitle: "B2B Solutions",
    content: "Equip your hotel, office, or housing project with the best prices. Our corporate division offers bulk discounts, installation support, and dedicated account managers."
  },
  service: {
    title: "Service Center",
    subtitle: "Expert Care",
    content: "Our ISO certified service centers use only genuine parts. Book a service appointment online or visit our collection points."
  },
  faq: {
    title: "Frequently Asked Questions",
    content: "<strong>Q: Do you deliver outside Kathmandu?</strong><br/>A: Yes, we deliver to all major cities across Nepal.<br/><br/><strong>Q: Can I pay on delivery?</strong><br/>A: Cash on Delivery is available for orders up to NPR 50,000."
  },
  privacy: {
    title: "Privacy Policy",
    content: "We respect your data. We do not sell your personal information to third parties. All payment data is encrypted."
  },
  terms: {
    title: "Terms & Conditions",
    content: "By using this website, you agree to our terms of service regarding order cancellation, return policies, and usage rights."
  }
};
