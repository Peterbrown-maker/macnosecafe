// Everything the site says about MacNose Cafe lives here, so a price, the
// address or the opening hours only ever need changing in one place.
//
// Menu, prices, hours, address and photos come from macnosecafeshortleft.co.za.
// TODO (owner): add a phone number / email if you want them shown on the site.

const IMG = "/images/macnose";

export const BRAND = {
  name: "MacNose",
  fullName: "MacNose Cafe",
  descriptor: "Pub & Restaurant · Short Left, Soshanguve",
  slogan: "Take a Short Left",
  tagline: "Good food takes time to prepare. Good memories are made here!",
  established: 2007,
  address: {
    street: "43 Aubrey Matlakala St",
    area: "Short Left, Soshanguve",
    city: "Soshanguve, Gauteng, 0164",
  },
  /** Used for the map embed and the "Get Directions" links. */
  geo: { lat: -25.5238705, lng: 28.0804518 },
  logo: `${IMG}/logo.jpg`,
  heroImage: `${IMG}/interior2.jpg`,
} as const;

export const ADDRESS_LINE = `${BRAND.address.street}, ${BRAND.address.city}`;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BRAND.geo.lat},${BRAND.geo.lng}`;
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${BRAND.geo.lat},${BRAND.geo.lng}&z=16&output=embed`;

export const SOCIALS = {
  facebook: "https://www.facebook.com/p/Macnose-Cafe-Short-Left-100064692908943/",
  instagram: "https://www.instagram.com/shortleft_soshanguve/",
};

export const PHOTOS = {
  interior: `${IMG}/interior.jpg`,
  interior2: `${IMG}/interior2.jpg`,
  food: `${IMG}/food.jpg`,
  foodDrink: `${IMG}/food_drink.jpg`,
  meal: `${IMG}/meal.jpg`,
  traditional: `${IMG}/traditional_food.png`,
  oysters: `${IMG}/champagne_oysters.jpg`,
};

export const OPENING_HOURS = [
  { days: "Monday – Thursday", hours: "10:00 – 22:00" },
  { days: "Friday – Saturday", hours: "10:00 – 02:00" },
  { days: "Sunday", hours: "10:00 – 23:00" },
];

export interface MenuItem {
  name: string;
  /** Rand amount, or a pre-formatted price like "R35 each / R180". */
  price: number | string;
  description?: string;
}

export interface MenuGroup {
  name?: string;
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  name: string;
  kind: "food" | "drinks";
  tagline?: string;
  note?: string;
  image?: string;
  groups: MenuGroup[];
}

export const formatPrice = (price: MenuItem["price"]) => (typeof price === "number" ? `R${price}` : price);

export const MENU: MenuSection[] = [
  {
    id: "traditional",
    name: "Traditional Monday Meals",
    kind: "food",
    tagline: "Available on Mondays",
    note: "Ask your waitron for today's selection.",
    image: PHOTOS.traditional,
    groups: [
      {
        items: [
          { name: "Buffet", price: 100, description: "4 Proteins, starch of your choice and 2 Veggies" },
          { name: "Ox Tripe (Mogodu)", price: 90, description: "Served with pap / rice / ting / samp or dumpling & 2 veggies" },
          { name: "Nama Ya Tlhogo", price: 90, description: "Served with pap / rice / ting / samp or dumpling & 2 veggies" },
          { name: "Tlhakwana", price: 80, description: "Served with pap / rice / ting / samp or dumpling & 2 veggies" },
          { name: "Chicken Feet", price: 70, description: "Served with pap / rice / ting / samp or dumpling & 2 veggies" },
          { name: "Masonja", price: 70, description: "Served with atchaar" },
          { name: "Half Skop Meal", price: 95, description: "Served with atchaar" },
          { name: "Marapo", price: 70, description: "Served with pap / rice / ting / samp or dumpling & 2 veggies" },
        ],
      },
    ],
  },
  {
    id: "grills",
    name: "From The Grill",
    kind: "food",
    tagline: "Available daily",
    note: "Ask your waitron for sauce options.",
    image: PHOTOS.meal,
    groups: [
      {
        items: [
          { name: "Chicken Wings", price: 85, description: "3 flame grilled chicken wings served with fries and greek salad, a sauce of your choice (hot or mild)" },
          { name: "Chicken Wings (6)", price: 150, description: "6 flame grilled chicken wings served with fries and greek salad, a sauce of your choice (hot or mild)" },
          { name: "Buffalo Wings / Texas Fried", price: 120, description: "12 flame grilled chicken winglets served with fries" },
          { name: "Smoked Ribs & Wings", price: 130, description: "Succulent pork ribs marinated in our traditional sauce, wings (bbq / peri) served with fries and greek salad" },
          { name: "Whole Mozambican Fish", price: 120, description: "Grilled whole fish served with fries or rice" },
          { name: "Grilled / Fried Hake Fillet", price: 95, description: "Grilled hake served with fries and greek salad" },
          { name: "Braai Espetada", price: 180, description: "Wings, Short Ribs, Chillie wors, Lamb Chops, served with fries & side salad" },
          { name: "Mixed Grill (Steak & Wors)", price: 110 },
          { name: "Lamb Chops", price: 120 },
          { name: "Pork Chops", price: 80 },
          { name: "Club Steak", price: 90 },
          { name: "Wors", price: 80 },
          { name: "Grilled Chicken", price: 85 },
          { name: "Full Chicken", price: 180, description: "Grilled (Hot / Mild)" },
        ],
      },
    ],
  },
  {
    id: "cooked",
    name: "Cooked MacNose Meals",
    kind: "food",
    tagline: "Available daily \u00b7 Ask your waitron",
    note: "Ask your waitron for daily availability.",
    image: PHOTOS.food,
    groups: [
      {
        items: [
          { name: "Beef Stew", price: 95, description: "Served with pap / rice / ting / samp or dumplings and 2 veggies" },
          { name: "Oxtail", price: 120, description: "Succulent pieces of slow cooked oxtail in an aromatic sauce served with pap / rice / samp / ting or dumpling and 2 veggies" },
          { name: "Goat Stew / Chevon", price: 120, description: "Traditionally cooked goat stew served with pap / rice / samp / ting or dumpling and 2 veggies" },
          { name: "Lamb Curry", price: 120, description: "Rich heartiness lamb stew cooked in red wine served with pap / rice / samp / ting or dumpling and 2 veggies" },
          { name: "Hardbody Chicken", price: 90, description: "Traditionally cooked hardbody chicken served with pap / rice / samp / ting or dumpling and 2 veggies" },
          { name: "Beef Shin", price: 90, description: "Traditionally cooked beef shin served with pap / rice / samp / ting or dumpling and 2 veggies" },
        ],
      },
      {
        name: "Extras",
        items: [
          { name: "Beef Stew Only", price: 95 },
          { name: "Oxtail Only", price: 120 },
          { name: "Goat Stew Only", price: 120 },
          { name: "Lamb Stew Only", price: 120 },
        ],
      },
    ],
  },
  {
    id: "starch",
    name: "Starch & Extras",
    kind: "food",
    tagline: "Available daily \u00b7 Ask your waitron",
    note: "Ask your waitron for daily availability.",
    groups: [
      {
        name: "Starch Options",
        items: [
          { name: "Pap Only", price: 15 },
          { name: "Samp Only", price: 15 },
          { name: "Rice Only", price: 15 },
          { name: "Dumpling", price: 20 },
          { name: "Bogobe Ba Mabele (Ting)", price: 15 },
          { name: "Fries Only (Large)", price: 30 },
        ],
      },
      {
        name: "Meat (Proteins) & Extras",
        items: [
          { name: "Ox Tripe (Mogodu) Only", price: 90 },
          { name: "Tlhakwana Only", price: 80 },
          { name: "Tlhogo Only", price: 80 },
          { name: "Half Skop Only", price: 95 },
          { name: "Mogodu + Tlhogo (Mix)", price: 80 },
          { name: "Mogodu + Tlhakwana (Mix)", price: 80 },
          { name: "Tlhakwana + Tlhogo (Mix)", price: 80 },
        ],
      },
    ],
  },
  {
    id: "platters",
    name: "Sharing Platters",
    kind: "food",
    tagline: "Available daily \u00b7 Ask your waitron",
    note: "Ask your waitron for availability.",
    image: PHOTOS.foodDrink,
    groups: [
      {
        items: [
          { name: "MacNose Shisanyama Platter", price: 590, description: "4 short ribs, 4 wings, 2 pork chops, served with 4 pap, salsa & gravy" },
          { name: "Seafood Platter for One", price: 180, description: "Hake, Calamari, Prawns, Mussels, Squid heads and fries" },
          { name: "Platter for One", price: 180, description: "3 Wings, Cocktail sausages, ribs served with fries" },
          { name: "Sharing Platter", price: 450, description: "Cocktail sausages, Ribs, hake fillet, crumbled wings / grilled wings, calamari and fries" },
          { name: "MacNose Meaty Platter", price: 460, description: "Lamb chops, Short rib, Cocktail wors, chicken wings & Fries" },
        ],
      },
    ],
  },
  {
    id: "light",
    name: "Light Meals & Dessert",
    kind: "food",
    tagline: "Available daily \u00b7 Ask your waitron",
    note: "Ask your waitron for daily availability.",
    image: PHOTOS.oysters,
    groups: [
      {
        name: "Light Meals",
        items: [
          { name: "Chicken Salad", price: 90 },
          { name: "Chorizo & Olives", price: 78 },
          { name: "MacNose Wings and Calamari", price: 105 },
          { name: "Large Oysters", price: 40 },
          { name: "MacNose Champagne Oysters", price: "R35 each / R180", description: "Combo of 6x Oysters, served fresh with champagne mignonette" },
          { name: "MacNose Prawn Tempura", price: 85, description: "Deep fried prawns served with creamy dip sauce" },
        ],
      },
      {
        name: "Dessert",
        items: [
          { name: "MacNose Sweet Treat", price: 70, description: "Ice cream or Cake of the day (with a drizzle of Custard)" },
          { name: "Snack Bowl", price: 80, description: "Biltong, Peanuts (Light snack)" },
        ],
      },
    ],
  },
  {
    id: "soft-drinks",
    name: "Cold Drinks",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Coke / Fanta / Sprite", price: 20 },
          { name: "Coke Zero / Fanta Zero", price: 20 },
          { name: "Stoney Ginger Beer", price: 20 },
          { name: "Appletiser / Grapetiser", price: 30 },
          { name: "Sparkling Water 500ml", price: 20 },
          { name: "Still Water 500ml", price: 20 },
          { name: "Red Bull", price: 30 },
          { name: "Liqui-Fruit Orange", price: 25 },
          { name: "Pure Valley Juice", price: 25 },
          { name: "Cappy Apple Juice", price: 25 },
          { name: "Cappy Juice (Orange Mango / Tropical)", price: 20 },
          { name: "Cranberry Can", price: 25 },
          { name: "Fitch & Leedes Pink Tonic", price: 20 },
          { name: "Fitch & Leedes Ginger Ale", price: 20 },
          { name: "Fitch & Leedes Lemonade", price: 20 },
          { name: "Fitch & Leedes Soda / Tonic", price: 20 },
          { name: "Tonic Water 1L", price: 30 },
        ],
      },
    ],
  },
  {
    id: "ciders",
    name: "Ciders",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Savanna", price: 30 },
          { name: "Brutal Fruit", price: 30 },
          { name: "Bernini", price: 30 },
          { name: "Belgravia", price: 30 },
          { name: "Hunters", price: 30 },
          { name: "Strongbow", price: 30 },
          { name: "Smirnoff Spin", price: 30 },
          { name: "Black Crown", price: 30 },
          { name: "Rekorderlig", price: 45 },
          { name: "Tutti", price: 80 },
          { name: "Ice Tropez", price: 110 },
          { name: "Ice Tropez Zero", price: 95 },
        ],
      },
    ],
  },
  {
    id: "pre-mix",
    name: "Pre-Mix",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Klipdrift & Cola", price: 30 },
          { name: "BuzzBallz", price: 65 },
        ],
      },
    ],
  },
  {
    id: "beers",
    name: "Beers",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Heineken / Heineken Lite / Heineken 0.0", price: 30 },
          { name: "Corona", price: 35 },
          { name: "Castle Lite", price: 30 },
          { name: "Castle Lager", price: 30 },
          { name: "Miller Genuine Draft", price: 25 },
          { name: "Stella Artois", price: 30 },
          { name: "Windhoek Lager / Windhoek Draught", price: 30 },
        ],
      },
    ],
  },
  {
    id: "wines",
    name: "Wines",
    kind: "drinks",
    groups: [
      {
        name: "Sparkling Wines",
        items: [
          { name: "Krone", price: 350 },
          { name: "Pongrácz Brut", price: 300 },
          { name: "Pongrácz Noble Nectar", price: 350 },
          { name: "Steenberg", price: 350 },
          { name: "Simonsig", price: 350 },
          { name: "MCC", price: 650 },
          { name: "Mimosa", price: 150 },
          { name: "Sparkling Wine / Champagne (Glass)", price: 55 },
        ],
      },
      {
        name: "Dry Reds",
        items: [
          { name: "R&R", price: 380 },
          { name: "Warwick First Lady", price: 180 },
          { name: "Warwick Professor Black", price: 480 },
          { name: "Kanonkop", price: 250 },
          { name: "Chocolate Block", price: 470 },
          { name: "Vilafonté Series M", price: 1500 },
          { name: "Fat Bastard", price: 250 },
          { name: "La Motte", price: 150 },
        ],
      },
      {
        name: "Dry Whites",
        items: [
          { name: "R&R", price: 380 },
          { name: "Warwick First Lady", price: 200 },
          { name: "Durbanville Hills Chardonnay", price: 150 },
        ],
      },
    ],
  },
  {
    id: "spirits",
    name: "Spirits",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Rum", price: 30 },
          { name: "Jägermeister", price: 30 },
        ],
      },
      {
        name: "Whiskey",
        items: [
          { name: "Jameson", price: 750 },
          { name: "Jameson Select Reserve", price: 1100 },
          { name: "Jameson 18 Year Old", price: 3800 },
          { name: "Johnnie Walker Black Label", price: 750 },
          { name: "Johnnie Walker Double Black", price: 900 },
          { name: "Johnnie Walker Green Label", price: 1800 },
          { name: "Johnnie Walker Blue Label", price: 6000 },
          { name: "Johnnie Walker Gold Label", price: 1400 },
          { name: "Johnnie Walker 18 Year Old", price: 4800 },
          { name: "Glenfiddich 12 Year Old", price: 1200 },
          { name: "Glenfiddich 15 Year Old", price: 1800 },
          { name: "Glenfiddich 18 Year Old", price: 3200 },
          { name: "Glenfiddich 21 Year Old", price: 4600 },
          { name: "Glenlivet 12 Year Old", price: 1200 },
          { name: "Glenlivet 15 Year Old", price: 1800 },
          { name: "Glenlivet 18 Year Old", price: 3800 },
        ],
      },
      {
        name: "Cognac",
        items: [
          { name: "Hennessy VS", price: 1100 },
          { name: "Hennessy VSOP", price: 1700 },
          { name: "Hennessy XO", price: 5500 },
          { name: "Rémy Martin VS", price: 1000 },
          { name: "Rémy Martin VSOP", price: 1800 },
          { name: "Rémy Martin XO", price: 4900 },
          { name: "Rémy Martin 1738", price: 2600 },
          { name: "Martell VS", price: 980 },
          { name: "Martell VSOP", price: 1400 },
          { name: "Honor VS", price: 900 },
          { name: "Courvoisier VS", price: 950 },
          { name: "Courvoisier VSOP", price: 1600 },
          { name: "D'Ussé", price: 1600 },
        ],
      },
      {
        name: "Tequila",
        items: [
          { name: "Olmeca", price: 600 },
          { name: "Don Julio", price: 2100 },
          { name: "Don Julio 1942", price: 8500 },
          { name: "Clase Azul", price: 6000 },
          { name: "Casamigos", price: 2000 },
        ],
      },
      {
        name: "Vodka",
        items: [
          { name: "Cruz Vodka", price: 500 },
          { name: "Cîroc", price: 950 },
          { name: "Smirnoff 1818", price: 300 },
        ],
      },
      {
        name: "Liqueurs",
        items: [
          { name: "Amarula", price: 280 },
          { name: "Jägermeister", price: 650 },
        ],
      },
      {
        name: "Gin",
        items: [
          { name: "Tanqueray", price: 620 },
          { name: "Tanqueray No. Ten", price: 950 },
          { name: "Tanqueray Royale", price: 500 },
          { name: "Hendrick's", price: 980 },
          { name: "Inverroche", price: 850 },
          { name: "Amarula Gin", price: 400 },
        ],
      },
    ],
  },
  {
    id: "cocktails",
    name: "Cocktails",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Paloma", price: 88 },
          { name: "Ginbull", price: 110 },
          { name: "Peach Reader", price: 105 },
          { name: "Screaming Orgasm", price: 75 },
          { name: "Pan Galactic", price: 90 },
          { name: "Long Island Iced Tea", price: 95 },
          { name: "Sex on the Beach", price: 68 },
          { name: "Strawberry Daiquiri", price: 85 },
          { name: "Gin & Cranberry Twist", price: 88 },
          { name: "Love Potion", price: 100 },
          { name: "Classic Margarita", price: 68 },
          { name: "Steel Works", price: 65 },
          { name: "Whiskey Sour", price: 85 },
          { name: "Rock Shandy", price: 65 },
          { name: "Mojito", price: 78 },
          { name: "Aperol Spritz", price: 65 },
          { name: "Mimosa", price: 65 },
        ],
      },
    ],
  },
  {
    id: "shooters",
    name: "Shooters",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Don Julio 1942", price: 300 },
          { name: "Olmeca (Gold & Silver)", price: 30 },
          { name: "Don Julio (Blanco & Reposado)", price: 70 },
          { name: "Jägermeister", price: 30 },
          { name: "Blow Job", price: 30 },
          { name: "Springbok", price: 30 },
          { name: "Abortion", price: 30 },
          { name: "Bubblegum", price: 30 },
        ],
      },
    ],
  },
  {
    id: "champagne",
    name: "Champagne",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "Veuve Clicquot Rich", price: 1800 },
          { name: "Veuve Clicquot Brut", price: 1600 },
          { name: "Moët Nectar Impérial", price: 1600 },
          { name: "Moët Brut Impérial", price: 1300 },
          { name: "Armand de Brignac (Ace of Spades)", price: 9000 },
          { name: "Dom Pérignon", price: 6500 },
          { name: "G.H. Mumm", price: 1600 },
        ],
      },
    ],
  },
  {
    id: "hot-drinks",
    name: "Hot Beverages",
    kind: "drinks",
    groups: [
      {
        items: [
          { name: "MacNose Coffee", price: 50 },
          { name: "Rooibos Tea", price: 30 },
          { name: "Hot Chocolate", price: 58 },
          { name: "Coffee & Cake Slice", price: 80 },
        ],
      },
    ],
  },
];

export const MENU_ITEM_COUNT = MENU.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0);

/** Weekend specials and promos, as posted by MacNose. */
export const SPECIALS = [
  { src: `${IMG}/buffet_for_4.jpeg`, alt: "MacNose buffet for 4 weekend special" },
  { src: `${IMG}/full_chicken_coke.jpg`, alt: "Full chicken and Coke meal special" },
  { src: `${IMG}/hennessy_tonic.jpeg`, alt: "Hennessy and tonic special" },
  { src: `${IMG}/pizza.jpg`, alt: "Pizza weekend special" },
  { src: `${IMG}/warm_treats.jpeg`, alt: "Warm treats dessert special" },
  { src: `${IMG}/heineken_daily.jpeg`, alt: "Heineken daily special" },
  { src: `${IMG}/weekends_and_specials.jpeg`, alt: "Weekends and specials" },
  { src: `${IMG}/weekends_and_specials_bottles.jpeg`, alt: "Weekend bottle specials" },
  { src: `${IMG}/wine_and_dine_fish.jpeg`, alt: "Wine and dine fish special" },
  { src: `${IMG}/wine_and_dine_steak.jpeg`, alt: "Wine and dine steak special" },
];

export const GALLERY = [
  { src: PHOTOS.interior2, alt: "The MacNose Cafe terrace with lanterns and hanging plants" },
  { src: PHOTOS.food, alt: "A table of MacNose dishes: grills, stews and sides" },
  { src: PHOTOS.traditional, alt: "Traditional South African meal" },
  { src: PHOTOS.meal, alt: "A grilled meal from MacNose" },
  { src: PHOTOS.oysters, alt: "MacNose Champagne Oysters" },
  { src: PHOTOS.foodDrink, alt: "Food and drinks at MacNose Cafe" },
  { src: PHOTOS.interior, alt: "Inside MacNose Cafe" },
  { src: `${IMG}/wine_and_dine_steak.jpeg`, alt: "Steak with wine" },
];

export const FAQS = [
  {
    q: "When can I get the traditional meals?",
    a: "Mogodu, tlhogo, tlhakwana, chicken feet, masonja, skop, marapo and the buffet are served on Mondays. Ask your waitron for the day's selection.",
  },
  {
    q: "How late are you open?",
    a: "Monday to Thursday until 22:00, Friday and Saturday until 02:00, and Sunday until 23:00. We open at 10:00 every day.",
  },
  {
    q: "Why does my food take a while?",
    a: "Good food takes time to prepare. Everything is freshly made to order, so if you're in a hurry, let your waitron know and we'll do our best to help.",
  },
  {
    q: "Can you cater for allergies?",
    a: "Please tell your waitron about any allergies or dietary needs before you order and we'll do our utmost to accommodate you where possible.",
  },
  {
    q: "Where are you?",
    a: `${BRAND.address.street}, Short Left, Soshanguve. Tap "Get Directions" anywhere on the site to open it in Google Maps.`,
  },
];
