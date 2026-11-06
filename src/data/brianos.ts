// Everything the site says about Briano's lives here, so a price, a phone
// number or the business name only ever needs changing in one place.
// Menu, hours, line-up and specials mirror the Briano's mobile app.

const IMG = "/images/brianos";

export const BRAND = {
  name: "Briano's",
  descriptor: "Shisanyama · Bar · Lounge",
  tagline: "Food Made with Love, Served with Joy",
  promise: "Shisanyama by day, club by night.",
  area: "Soshanguve, Gauteng",
  email: "hello@brianos.co.za",
  /** International format, no +. Used for every booking and enquiry. */
  whatsapp: "27665655305",
  phoneDisplay: "+27 66 565 5305",
  logoBlack: `${IMG}/logo-black.png`,
  logoWhite: `${IMG}/logo-white.png`,
  heroImage: `${IMG}/hero_feast.jpg`,
} as const;

/** A WhatsApp link that opens a chat with the message already typed. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

export const APP_SCREENS = {
  braai: `${IMG}/app/slide1.jpg`,
  club: `${IMG}/app/slide2.jpg`,
  delivery: `${IMG}/app/slide3.jpg`,
  signIn: `${IMG}/app/login.jpg`,
};

export const OPENING_HOURS = [
  { days: "Monday – Wednesday", hours: "11:00 – 23:00" },
  { days: "Thursday & Sunday", hours: "11:00 – 00:00" },
  { days: "Friday & Saturday", hours: "11:00 – 02:00" },
];

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface MenuGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
}

export const MENU: MenuGroup[] = [
  {
    id: "braai",
    name: "Off the Braai",
    description: "Flame-grilled over the fire and basted the way it should be done.",
    image: `${IMG}/steak_and_lamb_chops.jpg`,
    items: [
      {
        name: "Flame-Grilled Chicken Breast",
        price: 95,
        description: "Basted chicken breast with golden chips and a fresh garden salad",
        image: `${IMG}/grilled_chicken.jpg`,
      },
      {
        name: "Half Chicken & Chips",
        price: 120,
        description: "Half chicken grilled in our signature basting, served with chips",
        image: `${IMG}/grilled_chicken.jpg`,
      },
      {
        name: "Glazed Pork Ribs",
        price: 185,
        description: "Slow-cooked ribs finished with a sweet smoky glaze",
        image: `${IMG}/glazed_ribs.jpg`,
      },
      {
        name: "Steak & Lamb Chops",
        price: 210,
        description: "Juicy rump steak and lamb chops, grilled to order",
        image: `${IMG}/steak_and_lamb_chops.jpg`,
      },
    ],
  },
  {
    id: "wings-burgers",
    name: "Wings & Burgers",
    description: "Sticky, cheesy and impossible to share. Your call.",
    image: `${IMG}/wings_and_sausage.jpg`,
    items: [
      {
        name: "Cheeseburger & Chips",
        price: 89,
        description: "Beef patty, melted cheese and fresh toppings with chips",
        image: `${IMG}/cheeseburger_and_chips.jpg`,
      },
      {
        name: "Wings & Sausage Combo",
        price: 110,
        description: "Sticky grilled wings with boerewors sausage and chips",
        image: `${IMG}/wings_and_sausage.jpg`,
      },
    ],
  },
  {
    id: "platters",
    name: "Platters & Seafood",
    description: "Big plates for the whole squad, from the fire and from the sea.",
    image: `${IMG}/mixed_grill_platter.jpg`,
    items: [
      {
        name: "Seafood Platter",
        price: 280,
        description: "Grilled prawns, calamari and fish with lemon butter",
        image: `${IMG}/seafood_platter.jpg`,
      },
      {
        name: "Mixed Grill Platter",
        price: 320,
        description: "Chicken, ribs, wors and chops with sides, made for sharing",
        image: `${IMG}/mixed_grill_platter.jpg`,
      },
    ],
  },
  {
    id: "bar",
    name: "From the Bar",
    description: "Fresh, fruity and made to go with the music. 18+ only.",
    image: `${IMG}/cocktails.jpg`,
    items: [
      {
        name: "Tropical Cocktails",
        price: 65,
        description: "Fresh fruity cocktails, shaken to order",
        image: `${IMG}/cocktails.jpg`,
      },
    ],
  },
];

export const MENU_CATEGORIES = [
  "Grilled Chicken",
  "Wings & Sausage",
  "Steak & Chops",
  "Glazed Ribs",
  "Platters",
  "Burgers",
  "Seafood",
  "Cocktails",
];

export const GALLERY = [
  { src: `${IMG}/grilled_chicken.jpg`, alt: "Flame-grilled chicken breast with chips and salad" },
  { src: `${IMG}/wings_and_sausage.jpg`, alt: "Grilled wings with boerewors and chips" },
  { src: `${IMG}/steak_and_lamb_chops.jpg`, alt: "Rump steak and lamb chops" },
  { src: `${IMG}/glazed_ribs.jpg`, alt: "Glazed pork ribs" },
  { src: `${IMG}/mixed_grill_platter.jpg`, alt: "Mixed grill platter" },
  { src: `${IMG}/cheeseburger_and_chips.jpg`, alt: "Cheeseburger and chips" },
  { src: `${IMG}/seafood_platter.jpg`, alt: "Seafood platter" },
  { src: `${IMG}/cocktails.jpg`, alt: "Tropical cocktails" },
];

export const WEEKLY_LINEUP = [
  {
    day: "WED",
    title: "Wings & Wheels",
    vibe: "Wing specials · car-wash beats",
    time: "From 16:00",
    image: `${IMG}/wings_and_sausage.jpg`,
  },
  {
    day: "FRI",
    title: "Amapiano Fridays",
    vibe: "Resident DJs · log drum all night",
    time: "20:00 – late",
    image: `${IMG}/cocktails.jpg`,
  },
  {
    day: "SAT",
    title: "Shisa & Groove",
    vibe: "Braai by day · deep house by night",
    time: "14:00 – 02:00",
    image: `${IMG}/mixed_grill_platter.jpg`,
  },
  {
    day: "SUN",
    title: "Sunday Chill Sessions",
    vibe: "Live band · jazz · sundowners",
    time: "13:00 – 22:00",
    image: `${IMG}/hero_feast.jpg`,
  },
];

export const SPECIALS = [
  {
    deal: "50% off drinks",
    title: "Happy Hour",
    description: "Great drinks at unbeatable prices to start your evening right.",
    when: "Monday – Friday, 17:00 – 19:00",
  },
  {
    deal: "Play & win",
    title: "Monday Night Out",
    description: "Quiz nights and bingo games with amazing prizes.",
    when: "Every Monday",
  },
  {
    deal: "20% off platters",
    title: "Market Day Special",
    description: "Pull through on market day and share a platter for less.",
    when: "Every Saturday",
  },
  {
    deal: "Up to 30% off",
    title: "Sunday Feast",
    description: "Live band performances while the family eats well.",
    when: "Every Sunday",
  },
];

export const FAQS = [
  {
    q: "How do I book a table?",
    a: `Tap Book a Table on our menu page, fill in your date, time and party size, and send us the WhatsApp message it prepares. We confirm your table in that chat. For 10 or more people, give us a call.`,
  },
  {
    q: "How long does delivery take?",
    a: "Usually 25–40 minutes, depending on how busy the braai is and how far you are.",
  },
  {
    q: "Where do you deliver to?",
    a: "We deliver within our delivery area around Soshanguve. In the app we use your live location, so there's no address to type.",
  },
  {
    q: "Do you deliver drinks?",
    a: "Cocktails and soft drinks, yes. Alcohol is only delivered to customers 18+ and ID may be checked.",
  },
  {
    q: "How can I pay?",
    a: "By card or cash. Pay cash on delivery, at the table, or when you collect.",
  },
  {
    q: `When is the ${BRAND.name} app available?`,
    a: "It's coming soon to Android. Until then, send us a WhatsApp to book or pre-order your meal.",
  },
];
