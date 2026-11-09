// Everything the site says about Makhanani lives here, so a price, a phone
// number or the business name only ever needs changing in one place.
//
// TODO (owner): the phone number, app store links, area, email, opening
// hours and prices below are placeholders. Replace them with the real ones.

const IMG = "/images/makhanani";

export const BRAND = {
  name: "Makhanani",
  fullName: "Makhanani Shisanyama",
  descriptor: "Shisanyama · Head Meats · Paps",
  tagline: "Head Meats · Paps · Good Vibes",
  promise: "Cooked to perfection.",
  area: "Gauteng", // TODO: add the street / township
  email: "orders@makhanani.co.za", // TODO: real email
  /** International format, used for tel: links. */
  phone: "+27000000000", // TODO: real phone number
  phoneDisplay: "+27 00 000 0000", // TODO: real phone number
  logo: `${IMG}/wordmark.png`,
  emblem: `${IMG}/emblem.jpg`,
  heroImage: `${IMG}/full_plate.jpg`,
} as const;

/** All ordering happens in the Makhanani app. */
export const APP_LINKS = {
  // TODO (owner): replace these store searches with the app's direct store links.
  playStore: "https://play.google.com/store/search?q=Makhanani&c=apps",
  appStore: "https://apps.apple.com/za/search?term=Makhanani",
};

export const PHOTOS = {
  fullPlate: `${IMG}/full_plate.jpg`,
  headAndPap: `${IMG}/head_and_pap.jpg`,
  headPlate: `${IMG}/head_plate.jpg`,
  headCloseup: `${IMG}/head_closeup.jpg`,
  headRedTable: `${IMG}/head_red_table.jpg`,
  feetAndPap: `${IMG}/feet_and_pap.jpg`,
  feetGravy: `${IMG}/feet_gravy.jpg`,
  gravy: `${IMG}/gravy.jpg`,
  pap: `${IMG}/pap.jpg`,
};

export const OPENING_HOURS = [
  { days: "Monday – Friday", hours: "10:00 – 20:00" },
  { days: "Saturday", hours: "09:00 – 21:00" },
  { days: "Sunday & public holidays", hours: "09:00 – 18:00" },
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

// TODO (owner): confirm every price.
export const MENU: MenuGroup[] = [
  {
    id: "heads",
    name: "The Heads",
    description: "Skop the proper way: slow-cooked until it falls off the bone, then spiced and served hot.",
    image: PHOTOS.headPlate,
    items: [
      {
        name: "Half Skop",
        price: 70,
        description: "Half a sheep's head, slow-cooked and dusted with our spice",
        image: PHOTOS.headPlate,
      },
      {
        name: "Full Skop",
        price: 130,
        description: "A whole sheep's head. Bring a friend, or don't",
        image: PHOTOS.headCloseup,
      },
      {
        name: "Cow Head (per portion)",
        price: 80,
        description: "Tender cow head meat, cooked low and slow",
        image: PHOTOS.headRedTable,
      },
      {
        name: "Pig Head (per portion)",
        price: 75,
        description: "Rich, sticky pig head meat with crackling",
        image: PHOTOS.headRedTable,
      },
    ],
  },
  {
    id: "feet",
    name: "Feet & Trotters",
    description: "Cow heels and trotters stewed in a thick, rich gravy. Made for dipping your pap.",
    image: PHOTOS.feetAndPap,
    items: [
      {
        name: "Cow Heels in Gravy",
        price: 75,
        description: "Mazondo stewed until soft and sticky in a rich gravy",
        image: PHOTOS.feetGravy,
      },
      {
        name: "Sheep Trotters",
        price: 60,
        description: "Walkie talkies the way your gogo makes them",
        image: PHOTOS.feetAndPap,
      },
    ],
  },
  {
    id: "plates",
    name: "Plates with Pap",
    description: "Everything comes better with pap. These plates come with a proper serving and gravy on the side.",
    image: PHOTOS.fullPlate,
    items: [
      {
        name: "Half Skop & Pap",
        price: 85,
        description: "Our best seller. Half skop, a ball of pap and gravy",
        image: PHOTOS.headAndPap,
      },
      {
        name: "Feet & Pap",
        price: 90,
        description: "Cow heels in gravy with a ball of pap",
        image: PHOTOS.feetAndPap,
      },
      {
        name: "The Full Plate",
        price: 150,
        description: "Half skop, cow heels, pap and gravy. For the serious appetite",
        image: PHOTOS.fullPlate,
      },
    ],
  },
  {
    id: "sides",
    name: "Pap & Sides",
    description: "Soft, smooth pap made fresh all day, and gravy that's been on the pot since morning.",
    image: PHOTOS.pap,
    items: [
      {
        name: "Pap",
        price: 15,
        description: "A fresh, soft ball of stiff pap",
        image: PHOTOS.pap,
      },
      {
        name: "Gravy",
        price: 15,
        description: "Our rich house gravy, for dipping or pouring",
        image: PHOTOS.gravy,
      },
    ],
  },
];

export const MENU_CATEGORIES = [
  "Half Skop",
  "Full Skop",
  "Cow Head",
  "Pig Head",
  "Cow Heels",
  "Trotters",
  "Pap",
  "Gravy",
];

export const HEADS = [
  {
    title: "Sheep Heads",
    local: "Skop",
    description: "Half or full, spiced and slow-cooked. The one we're known for.",
    image: PHOTOS.headPlate,
  },
  {
    title: "Cow Heads",
    local: "Inhloko",
    description: "Big, tender portions of cow head meat cooked low and slow.",
    image: PHOTOS.headRedTable,
  },
  {
    title: "Pig Heads",
    local: "Pork head",
    description: "Rich and sticky, with the crackling that makes it worth it.",
    image: PHOTOS.headCloseup,
  },
];

export const GALLERY = [
  { src: PHOTOS.fullPlate, alt: "Half skop and cow heels with a ball of pap" },
  { src: PHOTOS.headAndPap, alt: "Spiced half skop with pap" },
  { src: PHOTOS.feetAndPap, alt: "Cow heels in gravy with pap" },
  { src: PHOTOS.headPlate, alt: "Spiced half skop on a plate" },
  { src: PHOTOS.feetGravy, alt: "Cow heels in gravy" },
  { src: PHOTOS.headCloseup, alt: "Close-up of a spiced skop" },
  { src: PHOTOS.pap, alt: "A fresh ball of pap" },
  { src: PHOTOS.gravy, alt: "A bowl of house gravy" },
];

// TODO (owner): change these to your real specials.
export const SPECIALS = [
  {
    deal: "Skop Saturday",
    title: "Half Skop & Pap Special",
    description: "Our best seller at a weekend price. Come early, the pot empties fast.",
    when: "Every Saturday",
  },
  {
    deal: "Family pot",
    title: "Big Orders",
    description: "Feeding a family gathering, a stokvel or a function? Order in bulk and we'll sort you out.",
    when: "Order a day ahead",
  },
  {
    deal: "Sunday plate",
    title: "The Full Plate",
    description: "Skop, cow heels, pap and gravy. The Sunday lunch you deserve.",
    when: "Every Sunday",
  },
];

export const FAQS = [
  {
    q: "Do you sell half skops?",
    a: "Yes. Half skop is our best seller. You can get it on its own or as a plate with pap and gravy.",
  },
  {
    q: "How do I order?",
    a: "Download the Makhanani app from the Google Play Store or the Apple App Store, pick your plate, and place your order right there.",
  },
  {
    q: "Can I order for a big group or event?",
    a: "Yes. For funerals, family gatherings, stokvels and parties, order in the app or give us a call at least a day ahead with how many people you're feeding.",
  },
  {
    q: "Can I eat in?",
    a: "Yes. Pull up a chair and eat it hot, or take it home with you.",
  },
  {
    q: "How can I pay?",
    a: "Cash or card when you collect or eat in.",
  },
];
