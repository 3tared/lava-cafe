import LogoImage from "@/app/assets/logolava.svg";
import facebook from "@/app/assets/facebook.svg";
import insta from "@/app/assets/insta.svg";
import tiktok from "@/app/assets/tiktok.svg";
import heroImage from "@/app/assets/heromain.jpeg";
import pizza from "@/app/assets/pizza.jpg";
import dezzert from "@/app/assets/dezzert.jpg";
import juices from "@/app/assets/juices.jpg";
import coffe from "@/app/assets/coffe.jpeg";
import birth from "@/app/assets/birth.jpg";
import engage from "@/app/assets/engagment.jpeg";
import wedding from "@/app/assets/wedding.jpeg";
import slider1 from "@/app/assets/slider (1).jpeg";
import slider2 from "@/app/assets/slider (2).jpeg";
import slider3 from "@/app/assets/slider (3).jpeg";
import slider4 from "@/app/assets/slider (4).jpeg";
import slider5 from "@/app/assets/slider (5).jpeg";
import birth2 from "@/app/assets/birth2.jpeg";
import engagment from "@/app/assets/engagment.jpeg";

import indoor1 from "@/app/assets/place/indoor1.jpeg";
import indoor2 from "@/app/assets/place/indoor2.jpeg";
import indoor3 from "@/app/assets/place/indoor3.jpeg";
import indoor4 from "@/app/assets/place/indoor4.jpeg";
import indoor5 from "@/app/assets/place/indoor5.jpeg";
import indoor6 from "@/app/assets/place/indoor6.jpeg";
import indoor7 from "@/app/assets/place/indoor7.jpeg";
import indoor8 from "@/app/assets/place/indoor8.jpeg";
import indoor9 from "@/app/assets/place/indoor9.jpeg";
import indoor10 from "@/app/assets/place/indoor10.jpeg";

import outdoor1 from "@/app/assets/place/outdoor1.jpeg";
import outdoor2 from "@/app/assets/place/outdoor2.jpeg";
import outdoor3 from "@/app/assets/place/outdoor3.jpeg";
import outdoor4 from "@/app/assets/place/outdoor4.jpeg";
import outdoor5 from "@/app/assets/place/outdoor5.jpeg";
import outdoor6 from "@/app/assets/place/outdoor6.jpeg";
import outdoor7 from "@/app/assets/place/outdoor7.jpeg";
import outdoor8 from "@/app/assets/place/outdoor8.jpeg";
import outdoor9 from "@/app/assets/place/outdoor9.jpeg";
import outdoor10 from "@/app/assets/place/outdoor10.jpeg";

import food1 from "@/app/assets/place/food1.jpeg";
import food2 from "@/app/assets/place/food2.jpeg";
import food3 from "@/app/assets/place/food3.jpeg";
import food4 from "@/app/assets/place/food4.jpeg";
import food5 from "@/app/assets/place/food5.jpeg";
import food6 from "@/app/assets/place/food6.jpeg";
import food7 from "@/app/assets/place/food7.jpeg";

import event1 from "@/app/assets/place/event1.jpg";
import event2 from "@/app/assets/place/event2.jpeg";
import event3 from "@/app/assets/place/event3.jpeg";
import event4 from "@/app/assets/place/event4.jpeg";
import event5 from "@/app/assets/place/event5.jpeg";
import event6 from "@/app/assets/place/event6.jpeg";
import event7 from "@/app/assets/place/event7.jpeg";
import event8 from "@/app/assets/place/event8.jpeg";

import { GalleryImage, ICafePackage, MenuItem, TeamSection } from "../types";

export const ownerPhoneNumber = "+201148494119";
export const managerPhoneNumber = "+201223411732";

export const mainlogo = {
  src: LogoImage,
  alt: "logo",
};

// Features section data
export const cafeFeatures = [
  {
    icon: "Coffee",
    title: "Specialty Coffee",
    description: "Expertly sourced and crafted signature blends",
  },
  {
    icon: "Clock",
    title: "Open Daily",
    description: "9:00 AM - 3:00 AM",
  },
  {
    icon: "Award",
    title: "Award Winning",
    description: "Best New Café 2025",
  },
];

export const teamData: TeamSection[] = [
  {
    id: "leadership",
    title: "Owners & Founders",
    description:
      "Meet the visionaries who brought our coffee experience to life.",
    members: [
      {
        id: "owner-1",
        name: "Yehia Mostafa",
        position: "Founder & Owner",
        bio: "With over 15 years in the coffee industry, Jane's passion for quality coffee and community spaces led to the creation of our café.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUb0nknyNvW1tDmR2VHhknY037XN48IAvCuLKb",
        funFact: "Jane has visited coffee farms in over 12 countries.",
      },
      {
        id: "owner-2",
        name: "Galal Elsakr",
        position: "Ceo-Owner & Partner",
        bio: "Michael brings his financial expertise and business acumen to ensure our café thrives while maintaining our core values.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGP5iLc1DFLq6ZIUY0BRpig5aPfV3HN7KECSt",
        funFact: "Makes the best latte art in the entire company.",
      },
    ],
  },
  {
    id: "management",
    title: "Management Team",
    description:
      "Our experienced managers ensure everything runs smoothly day to day.",
    members: [
      {
        id: "manager-1",
        name: "Mohamed Tarek",
        position: "General Manager",
        bio: "Mohamed oversees daily operations and has been instrumental in developing our customer service philosophy.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUM1O8eYZBwCQDbIAOWTfX61LkHepK2u5lciGS",
      },
    ],
  },
  {
    id: "baristas",
    title: "Barista Team",
    description: "Our skilled baristas are the heart of our coffee service.",
    members: [
      {
        id: "barista-1",
        name: "Youssef Elshikh",
        position: "Barista",
        bio: "A certified coffee expert who has competed in national barista championships.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU6efWENo2d67hLNOqCoZRvUl9bTVEgQ4aYerP",
      },
    ],
  },
  {
    id: "service",
    title: "Service Staff",
    description:
      "Our friendly team dedicated to making your visit exceptional.",
    members: [
      {
        id: "service-6",
        name: "Ramy Nasr",
        position: "Kitchen chief",
        bio: "Chef Ramy creates our seasonal menu and ensures the highest quality in every dish that leaves our kitchen.",
        // No image provided
      },
      {
        id: "service-1",
        name: "Abdelrahman Celia",
        position: "Captain",
        bio: "Abdelrahman leads our front-of-house team with a warm, welcoming approach to service.",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUD8o8ya8kblqoPpiQXIkLS5TeJgH8YhCayv6E",
      },
      {
        id: "service-2",
        name: "Mariam",
        position: "Captain",
        bio: "Known for remembering regular customers' orders and making everyone feel at home.",
      },
      {
        id: "service-3",
        name: "Kareem Ashraf",
        position: "Steward",
        bio: "ss",
      },
      {
        id: "service-7",
        name: "Menna",
        position: "Steward",
        bio: "ss",
      },
      {
        id: "service-4",
        name: "Mohamed ElHosseny",
        position: "Hookah Specialist",
        bio: "ss",
        imageUrl:
          "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUn79SXBD0z8AHYoTZLh2UMC4xQqRejJpyVtIr",
      },
      {
        id: "service-5",
        name: "Basmala Saad",
        position: "Host",
        bio: "ss",
      },
    ],
  },
];

// About section content
export const aboutContent = {
  title: "About Our Café",
  paragraphs: [
    'Welcome to <span class="font-semibold text-lavasecondary-500">Lava Café</span>, established in 2025 with a simple idea — to create a cozy, unique spot for coffee lovers to relax and enjoy exceptional brews in a welcoming atmosphere.',
    "We chose the name Lava because it represents warmth, flow, and energy — just like a great cup of coffee bursting with flavor and comfort. Our passion for quality coffee and community building drives everything we do.",
  ],
};

// Contact information
export const contactInfo = {
  address: "32 El Central Street, Mokattam, off Street 9",
  phone: "+201148494119",
  email: "lavaacafee@gmail.com",
  socialLinks: [
    {
      platform: "Instagram",
      icon: "Instagram",
      url: "https://www.instagram.com/lavaa.cafe.restaurant",
    },
    {
      platform: "Facebook",
      icon: "Facebook",
      url: "https://www.facebook.com/lavacafe.reg",
    },
  ],
};

// Working hours
export const workingHours = [
  {
    days: "Monday - Thursday",
    hours: "9:00 AM - 2:00 AM",
  },
  {
    days: "Friday - Sunday",
    hours: "9:00 AM - 3:00 AM",
  },
];

// Google Maps embed URL
export const googleMapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.4803989587585!2d31.29835622499086!3d30.011794120117987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145839faa5560081%3A0x36608dad604b7c9f!2sLava%20Cafe!5e1!3m2!1sar!2seg!4v1745263104022!5m2!1sar!2seg";
export const googleMapsDirectUrl =
  "https://maps.app.goo.gl/oMMuuqHPL2W2iycS9?g_st=aw";

// CTA Banner content
// Updated CTA Banner content
export const ctaBanner = {
  heading: "Ready for a unique coffee experience?",
  subtext: "Visit us today or order online for pickup!",
  buttons: [
    {
      text: "Order From Talabat",
      link: "https://www.talabat.com/ar/egypt/restaurant/750261/لافا?aid=7429",
      isPrimary: false,
      isExternal: true,
    },
    {
      text: "View Menu",
      link: "/menu",
      isPrimary: true,
      isExternal: false,
    },
  ],
};

// Hero section content
export const heroContent = {
  title: "Lava Café",
  subtitle: "Where every sip tells a story",
};

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Menu", href: "/menu" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

export const socialItems = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/lavacafe.reg",
    Icon: facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/lavaa.cafe.restaurant",
    Icon: insta,
  },
  {
    name: "Twitter",
    href: "https://www.tiktok.com/@lava_cafe0",
    Icon: tiktok,
  },
];
export const HeroMainImage = { name: "HeroMainImage", src: heroImage };

export const whyUs = [
  {
    title: "☕ Premium Coffee Quality",
    description:
      "We serve the finest roasted coffee beans to ensure an irresistible flavor in every cup.",
  },
  {
    title: "🏡 Cozy & Relaxing Atmosphere",
    description:
      "Our café offers a comfortable interior with soothing music, making it the perfect spot to unwind or work.",
  },
  {
    title: "💰 Exclusive Deals & Discounts",
    description:
      "Enjoy daily offers and special discounts for our valued customers.",
  },
  {
    title: "🍰 Wide Variety of Drinks & Desserts",
    description:
      "We have an extensive menu featuring hot and cold beverages along with freshly made desserts.",
  },
  {
    title: "🚀 Fast & Professional Service",
    description:
      "Our well-trained staff ensures the best service with maximum efficiency to guarantee your satisfaction.",
  },
  {
    title: "📍 Prime Location & Easy Access",
    description:
      "Located in the heart of the city, our café is the perfect place to meet friends or get work done.",
  },
];

export const slideMenuData = [
  {
    title: "Hot Drinks",
    src: coffe,
  },
  {
    title: "Juices",
    src: juices,
  },
  {
    title: "Desserts",

    src: dezzert,
  },
  {
    title: "Pizza",
    src: pizza,
  },
];

export const ourEvents = [
  {
    title: "Birthday Party",
    href: "birthday",
    description: "Celebrate your special day with us in a memorable way.",
    image: birth,
    buttonText: "Discover",

    icon: LogoImage,
  },
  {
    title: "Engagement Ceremony",
    href: "engagement",
    description:
      "Make your engagement unforgettable with our premium services.",
    image: engage,
    buttonText: "Discover",

    icon: LogoImage,
  },
  {
    title: "Wedding Celebration",
    href: "wedding",
    description: "Let us create the perfect wedding experience for you.",
    image: wedding,
    buttonText: "Discover",
    icon: LogoImage,
  },
];

export const imagesSlider = [
  slider1.src,
  slider2.src,
  slider3.src,
  slider4.src,
  slider5.src,
];

export const cafePackages: ICafePackage[] = [
  {
    name: "Standard Package",
    originalPrice: "EGP 50",
    price: "EGP 40",
    per: "per person",
    description: "Includes only Pepsi for each person.",
    items: ["Pepsi"],
    emoji: "🥤",
    popular: false,
    tag: "Basic",
    discount: "20% OFF",
  },
  {
    name: "Classic Package",
    originalPrice: "EGP 60",
    price: "EGP 45",
    per: "per person",
    description: "Includes Pepsi and water for each person.",
    items: ["Pepsi", "Water"],
    emoji: "💧🥤",
    popular: false,
    tag: "Value",
    discount: "25% OFF",
  },
  {
    name: "High Tea (1)",
    originalPrice: "EGP 90",
    price: "EGP 70",
    per: "per person",
    description: "Includes premium gateau from Laren + Pepsi per person.",
    items: ["Premium gateau from Laren", "Pepsi", "Water"],
    emoji: "🍰🥤",
    popular: true,
    tag: "Most Popular",
    discount: "22% OFF",
  },
  {
    name: "High Tea (2)",
    originalPrice: "EGP 110",
    price: "EGP 80",
    per: "per person",
    description:
      "Includes premium gateau from Laren + Pepsi + mini pizza + mini paté per person.",
    items: [
      "Premium gateau from Laren",
      "Pepsi",
      "Water",
      "Mini pizza",
      "Mini paté",
    ],
    emoji: "🍕🥐🥤",
    popular: false,
    tag: "Premium",
    discount: "27% OFF",
  },
];

export const events = [
  {
    title: "Mohamed Mosaad's Birthday Party 🎉",
    date: "2025-04-17T20:00:00",
    image: birth2.src,
    type: "birthday",
    location: "Lava Cafe, Cairo",
    time: "8:00 PM",
  },
  {
    title: "Manar's Engagement Ceremony 💍",
    date: "2025-04-20T19:00:00",
    image: engagment.src,
    type: "engagement",
    location: "Lava Cafe, Cairo",
    time: "7:00 PM",
  },
  {
    title: "Amira's Birthday Party 🎉",
    date: "2025-04-24T17:00:00",
    image: birth2.src,
    type: "birthday",
    location: "Lava Cafe, Cairo",
    time: "5:00 PM",
  },
  {
    title: "Mohamed Mosaad's Birthday Party 🎉",
    date: "2025-04-25T20:00:00",
    image: birth2.src,
    type: "birthday",
    location: "Lava Cafe, Cairo",
    time: "8:00 PM",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Lighting Decor",
    description:
      "Chandeliers and ceiling lights illuminating the indoor space beautifully.",
    imageUrl: indoor1.src,
    category: "indoor",
  },
  {
    id: 2,
    title: "Elegant Interior Design",
    description:
      "An overview of the venue's luxurious interior with intricate details.",
    imageUrl: indoor2.src,
    category: "indoor",
  },
  {
    id: 3,
    title: "Elegant Interior Design",
    description:
      "An overview of the venue's luxurious interior with intricate details.",
    imageUrl: indoor3.src,
    category: "indoor",
  },
  {
    id: 4,
    title: "Conference Room Setup",
    description:
      "A fully equipped conference room prepared for a corporate meeting.",
    imageUrl: indoor4.src,
    category: "indoor",
  },
  {
    id: 5,
    title: "Conference Room Setup",
    description:
      "A fully equipped conference room prepared for a corporate meeting.",
    imageUrl: indoor5.src,
    category: "indoor",
  },
  {
    id: 6,
    title: "Cozy Lounge Area",
    description:
      "A stylish lounge space with warm lighting and modern furniture.",
    imageUrl: indoor6.src,
    category: "indoor",
  },
  {
    id: 7,
    title: "VIP Lounge",
    description: "A private area designed for VIP guests with extra comfort.",
    imageUrl: indoor7.src,
    category: "indoor",
  },
  {
    id: 8,
    title: "Reception Area",
    description: "The front desk area ready to welcome guests warmly.",
    imageUrl: indoor8.src,
    category: "indoor",
  },
  {
    id: 9,
    title: "Stage and Seating",
    description:
      "View of the main stage surrounded by comfortable seating arrangements.",
    imageUrl: indoor9.src,
    category: "indoor",
  },
  {
    id: 10,
    title: "Stage and Seating",
    description:
      "View of the main stage surrounded by comfortable seating arrangements.",
    imageUrl: indoor10.src,
    category: "indoor",
  },
  {
    id: 11,
    title: "Main Entrance",
    description: "The main entrance of the venue lit up at night.",
    imageUrl: outdoor1.src,
    category: "outdoor",
  },
  {
    id: 12,
    title: "Garden View",
    description:
      "A wide shot of the outdoor garden with beautiful landscaping.",
    imageUrl: outdoor2.src,
    category: "outdoor",
  },
  {
    id: 13,
    title: "Outdoor Seating",
    description: "Comfortable seating arrangements under the open sky.",
    imageUrl: outdoor3.src,
    category: "outdoor",
  },
  {
    id: 14,
    title: "Venue Facade",
    description: "The architectural design of the venue from the outside.",
    imageUrl: outdoor4.src,
    category: "outdoor",
  },
  {
    id: 15,
    title: "Sunset Ambience",
    description: "A stunning view of the venue during sunset hours.",
    imageUrl: outdoor5.src,
    category: "outdoor",
  },
  {
    id: 16,
    title: "Outdoor Pathway",
    description: "Stone pathways guiding guests through the outdoor area.",
    imageUrl: outdoor6.src,
    category: "outdoor",
  },
  {
    id: 17,
    title: "Parking Space",
    description: "The spacious parking area available for visitors.",
    imageUrl: outdoor7.src,
    category: "outdoor",
  },
  {
    id: 18,
    title: "Event Tent Setup",
    description: "An outdoor tent setup prepared for a special event.",
    imageUrl: outdoor8.src,
    category: "outdoor",
  },
  {
    id: 19,
    title: "Garden Lights",
    description: "Decorative lights enhancing the garden’s beauty at night.",
    imageUrl: outdoor9.src,
    category: "outdoor",
  },
  {
    id: 20,
    title: "Outdoor Signage",
    description: "The venue’s name and logo displayed clearly outside.",
    imageUrl: outdoor10.src,
    category: "outdoor",
  },
  {
    id: 21,
    title: "Appetizer Platter",
    description: "A colorful selection of appetizers ready to serve.",
    imageUrl: food1.src,
    category: "Food",
  },
  {
    id: 22,
    title: "Grilled Main Course",
    description: "A perfectly grilled main dish presented with sides.",
    imageUrl: food2.src,
    category: "Food",
  },
  {
    id: 23,
    title: "Dessert Table",
    description:
      "A variety of sweet treats displayed beautifully on the table.",
    imageUrl: food3.src,
    category: "Food",
  },
  {
    id: 24,
    title: "Buffet Arrangement",
    description: "A full buffet setup featuring both hot and cold dishes.",
    imageUrl: food4.src,
    category: "Food",
  },
  {
    id: 25,
    title: "Signature Cocktail",
    description: "A refreshing signature cocktail served with garnish.",
    imageUrl: food5.src,
    category: "Food",
  },
  {
    id: 26,
    title: "Fruit Carving Display",
    description: "Creative fruit arrangements adding color to the food area.",
    imageUrl: food6.src,
    category: "Food",
  },
  {
    id: 27,
    title: "Seafood Platter",
    description: "A luxurious seafood selection served chilled on ice.",
    imageUrl: food7.src,
    category: "Food",
  },
  {
    id: 28,
    title: "Birthday Party",
    description: "A vibrant birthday setup with balloons and cake.",
    imageUrl: event1.src,
    category: "events",
  },
  {
    id: 29,
    title: "Engagement Ceremony",
    description: "A beautifully decorated setup for a traditional engagement.",
    imageUrl: event2.src,
    category: "events",
  },
  {
    id: 30,
    title: "Wedding Stage",
    description: "An elegant stage decorated for a wedding celebration.",
    imageUrl: event3.src,
    category: "events",
  },
  {
    id: 31,
    title: "First Dance",
    description: "A couple sharing their first dance under romantic lights.",
    imageUrl: event4.src,
    category: "events",
  },
  {
    id: 32,
    title: "Cake Cutting",
    description: "A special moment captured during the cake cutting ceremony.",
    imageUrl: event5.src,
    category: "events",
  },
  {
    id: 33,
    title: "Fireworks Display",
    description: "Colorful fireworks marking the celebration night.",
    imageUrl: event6.src,
    category: "events",
  },
  {
    id: 34,
    title: "Guest Area",
    description: "Well-arranged seating for guests during the event.",
    imageUrl: event7.src,
    category: "events",
  },
  {
    id: 35,
    title: "Dance Floor",
    description: "A lively dance floor with lights and music.",
    imageUrl: event8.src,
    category: "events",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Hot Drinks
  {
    id: "1",
    name: "Turkish Coffee",
    description:
      "Traditional Turkish coffee with a rich, bold flavor and a fine layer of foam on top",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUW28ECE3GdsUmP3yIEkpu8zgqFe19N5hMwCRW",
    category: "Hot Drinks",
    ingredients: ["Finely ground Arabica coffee", "Water", "Optional sugar"],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isPopular: true,
    isVegan: true,
    isGlutenFree: true,
    reviews: [
      {
        rating: 5,
        comment: "Authentic taste, just like in Istanbul!",
        author: "Coffee Enthusiast",
      },
      {
        rating: 4,
        comment: "Loved the foam and the strong flavor",
        author: "Traditional Taste Seeker",
      },
    ],
  },
  {
    id: "2",
    name: "French Coffee",
    description:
      "Smooth and elegant French-style coffee, typically served with milk or cream for a rich and balanced flavor",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUDppdWnkblqoPpiQXIkLS5TeJgH8YhCayv6Ec",
    category: "Hot Drinks",
    ingredients: ["Brewed coffee", "Milk or cream", "Optional sugar"],
    nutritionalInfo: {
      calories: 50,
      protein: 1,
      carbs: 4,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    reviews: [
      {
        rating: 5,
        comment: "Creamy and smooth – perfect for a relaxing morning.",
        author: "Paris Lover",
      },
      {
        rating: 4,
        comment: "Tastes just like the cafés in France!",
        author: "Francophile",
      },
    ],
  },
  {
    id: "3",
    name: "Hazelnut Coffee",
    description:
      "A flavorful blend of rich coffee infused with the sweet, nutty aroma of hazelnut – a cozy and aromatic treat.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgKUeiIx0kSM21Z9c8XTvAwBFKOqQn7NuzdGL",
    category: "Hot Drinks",
    ingredients: [
      "Brewed coffee",
      "Hazelnut syrup",
      "Milk or cream",
      "Optional sugar",
    ],
    nutritionalInfo: {
      calories: 80,
      protein: 1,
      carbs: 6,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The hazelnut flavor is amazing! My favorite.",
        author: "Nutty for Coffee",
      },
      {
        rating: 4,
        comment: "Great balance of sweetness and coffee richness.",
        author: "Caffeine Addict",
      },
    ],
  },
  {
    id: "4",
    name: "Nutella Coffee",
    description:
      "A decadent coffee drink blended with creamy Nutella, offering a rich combination of chocolate and hazelnut flavors.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU1okVdFSsnZvxSyRQgYElJa0D9LhBq7V2f8Wj",
    category: "Hot Drinks",
    ingredients: [
      "Espresso or brewed coffee",
      "Nutella",
      "Milk",
      "Whipped cream (optional)",
    ],
    nutritionalInfo: {
      calories: 150,
      protein: 3,
      carbs: 12,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Nutella and coffee? Heaven in a cup!",
        author: "Sweet Tooth",
      },
      {
        rating: 4,
        comment: "Rich and chocolatey, perfect for cold days.",
        author: "Winter Lover",
      },
    ],
  },
  {
    id: "5",
    name: "Espresso",
    description:
      "A concentrated shot of rich, full-bodied coffee with a layer of golden crema on top – bold and energizing.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU6gNRLC2d67hLNOqCoZRvUl9bTVEgQ4aYerP2",
    category: "Hot Drinks",
    ingredients: ["Freshly ground coffee beans", "Water"],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The perfect morning pick-me-up!",
        author: "Busy Bee",
      },
      {
        rating: 4,
        comment: "Strong and smooth, exactly how I like it.",
        author: "Coffee Snob",
      },
    ],
  },
  {
    id: "6",
    name: "Americano",
    description:
      "A smooth and mild coffee made by diluting a rich espresso shot with hot water – perfect for a longer, lighter coffee experience.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUfEdHIteTBDn8diQcwlzItegp5NjWhSUOH9sv",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Hot water"],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Smooth and balanced – my go-to every morning.",
        author: "Minimalist Drinker",
      },
      {
        rating: 4,
        comment: "Not too strong, not too light. Just right.",
        author: "Balanced Taste",
      },
    ],
  },
  {
    id: "7",
    name: "Nescafé",
    description:
      "Instant coffee that delivers a quick and satisfying caffeine boost with a familiar, smooth flavor – a classic favorite.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUNo3tTywptjPTHhRQcvqSJyrf4xaIMVXOul72",
    category: "Hot Drinks",
    ingredients: [
      "Instant coffee",
      "Hot water",
      "Optional sugar",
      "Optional milk",
    ],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 1,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Simple and hits the spot every time.",
        author: "Quick Fix",
      },
      {
        rating: 4,
        comment: "Great taste and super convenient.",
        author: "Busy Morning",
      },
    ],
  },
  {
    id: "8",
    name: "Macchiato",
    description:
      "A bold shot of espresso marked with a small amount of steamed milk or milk foam – a perfect balance between strong and smooth.",
    price: 30,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUWjXr9I3GdsUmP3yIEkpu8zgqFe19N5hMwCRW",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Steamed milk or milk foam"],
    nutritionalInfo: {
      calories: 15,
      protein: 1,
      carbs: 1,
      fat: 0.5,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Strong espresso kick with just the right touch of milk.",
        author: "Macchiato Lover",
      },
      {
        rating: 4,
        comment: "Exactly what I need when I want something in-between.",
        author: "Halfway Espresso",
      },
    ],
  },
  {
    id: "9",
    name: "Caramel Macchiato",
    description:
      "A deliciously sweet and creamy espresso-based drink with steamed milk, a hint of vanilla syrup, and a drizzle of caramel sauce on top.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU9wsLU0VmBWjnU27z8Y4AmRsMFu6Ii9t1yphL",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Steamed milk", "Vanilla syrup", "Caramel sauce"],
    nutritionalInfo: {
      calories: 120,
      protein: 2,
      carbs: 24,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Sweet and smooth with the perfect caramel touch!",
        author: "Caramel Enthusiast",
      },
      {
        rating: 4,
        comment: "A perfect balance of sweetness and espresso flavor.",
        author: "Sweet Tooth",
      },
    ],
  },
  {
    id: "10",
    name: "Cappuccino",
    description:
      "A classic espresso-based drink with equal parts of espresso, steamed milk, and foam – rich, creamy, and frothy perfection.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUCsWwNugcEPXrwmfR0I3Vvz4oyQTHxeOiUM5h",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Steamed milk", "Milk foam"],
    nutritionalInfo: {
      calories: 60,
      protein: 3,
      carbs: 5,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Just the right amount of froth – perfect every time.",
        author: "Cappuccino Fan",
      },
      {
        rating: 4,
        comment: "Smooth and creamy, just how I like it.",
        author: "Daily Drinker",
      },
    ],
  },
  {
    id: "11",
    name: "Flavored Cappuccino",
    description:
      "A delicious twist on the classic cappuccino, infused with your choice of flavors such as vanilla, hazelnut, or caramel, topped with a frothy milk foam.",
    price: 48,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUCsWwNugcEPXrwmfR0I3Vvz4oyQTHxeOiUM5h",
    category: "Hot Drinks",
    ingredients: [
      "Espresso",
      "Steamed milk",
      "Milk foam",
      "Flavored syrup (Vanilla, Hazelnut, or Caramel)",
    ],
    nutritionalInfo: {
      calories: 80,
      protein: 3,
      carbs: 10,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The vanilla flavor adds a perfect sweetness!",
        author: "Flavored Coffee Fan",
      },
      {
        rating: 4,
        comment: "Deliciously creamy with just the right amount of flavor.",
        author: "Flavored Cappuccino Lover",
      },
    ],
  },
  {
    id: "12",
    name: "Flat White",
    description:
      "A smooth and velvety espresso-based drink with steamed milk, creating a creamy texture with a higher coffee-to-milk ratio than a latte.",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiHCcQVBV19P3GK6yctjUvlDHk2ozxqFhbwsB",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Steamed milk"],
    nutritionalInfo: {
      calories: 70,
      protein: 3,
      carbs: 6,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Creamy and perfectly balanced – just the right strength.",
        author: "Flat White Aficionado",
      },
      {
        rating: 4,
        comment: "Love the smooth texture, not too strong.",
        author: "Coffee Connoisseur",
      },
    ],
  },
  {
    id: "13",
    name: "Hummus El-Sham",
    description:
      "A delicious and nutritious hot drink made with boiled chickpeas, lemon, cumin, and some spices for a fantastic flavor.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU4osJZFVidkygGC9cqts5Zo1luFPWfDXYhbVn",
    category: "Hot Drinks",
    ingredients: ["Boiled chickpeas", "Lemon", "Cumin", "Spices"],
    nutritionalInfo: {
      calories: 150,
      protein: 8,
      carbs: 20,
      fat: 5,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The best Hummus El-Sham I've ever tasted!",
        author: "Middle Eastern Cuisine Lover",
      },
      {
        rating: 4,
        comment: "Great flavor, but could use a bit more cumin.",
        author: "Healthy Food Enthusiast",
      },
    ],
  },
  {
    id: "14",
    name: "Latte",
    description:
      "A creamy and smooth espresso-based drink with steamed milk and a light layer of foam on top – perfect for a mild coffee experience.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUUONawV6thWlZFBgGk78CoMVrX10nSzdPq6Qx",
    category: "Hot Drinks",
    ingredients: ["Espresso", "Steamed milk", "Milk foam"],
    nutritionalInfo: {
      calories: 120,
      protein: 6,
      carbs: 12,
      fat: 7,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Smooth, creamy, and just the right amount of coffee.",
        author: "Latte Lover",
      },
      {
        rating: 4,
        comment: "Perfect for those who prefer a lighter coffee flavor.",
        author: "Morning Coffee Enthusiast",
      },
    ],
  },
  {
    id: "15",
    name: "Flavored Latte",
    description:
      "A delicious variation of the classic latte, infused with your choice of flavor such as vanilla, caramel, or hazelnut, topped with smooth milk foam.",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUUONawV6thWlZFBgGk78CoMVrX10nSzdPq6Qx",
    category: "Hot Drinks",
    ingredients: [
      "Espresso",
      "Steamed milk",
      "Milk foam",
      "Flavored syrup (Vanilla, Caramel, Hazelnut)",
    ],
    nutritionalInfo: {
      calories: 140,
      protein: 6,
      carbs: 20,
      fat: 7,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The caramel flavor makes it the perfect treat!",
        author: "Flavored Coffee Fan",
      },
      {
        rating: 4,
        comment: "Nice and creamy with the right amount of sweetness.",
        author: "Coffee Connoisseur",
      },
    ],
  },
  {
    id: "16",
    name: "Dark Mocha",
    description:
      "A rich and indulgent espresso-based drink with dark chocolate syrup, steamed milk, and a creamy topping, offering a perfect balance of bitterness and sweetness.",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUtZ5prkc1rzHLObqmAvkCUQlgapjDFS9cRX6V",
    category: "Hot Drinks",
    ingredients: [
      "Espresso",
      "Dark chocolate syrup",
      "Steamed milk",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 180,
      protein: 5,
      carbs: 25,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The dark chocolate makes it rich and flavorful!",
        author: "Chocolate Lover",
      },
      {
        rating: 4,
        comment:
          "A perfect balance of bitter and sweet – absolutely delicious.",
        author: "Mocha Enthusiast",
      },
    ],
  },
  {
    id: "17",
    name: "White Mocha",
    description:
      "A sweet and creamy espresso-based drink with white chocolate syrup, steamed milk, and a fluffy whipped cream topping, offering a smooth and indulgent taste.",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUINuTn1ifvbzS4NlhYcJ8VeOg7U1rpPD630Xo",
    category: "Hot Drinks",
    ingredients: [
      "Espresso",
      "White chocolate syrup",
      "Steamed milk",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 200,
      protein: 6,
      carbs: 30,
      fat: 9,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So smooth and sweet, the white chocolate is a perfect touch!",
        author: "Sweet Tooth",
      },
      {
        rating: 4,
        comment: "Creamy and delicious, just the right amount of sweetness.",
        author: "Latte Enthusiast",
      },
    ],
  },
  {
    id: "18",
    name: "Hot Chocolate",
    description:
      "A rich and creamy drink made with melted chocolate, steamed milk, and topped with whipped cream, perfect for chocolate lovers.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUQrL3wGdxTayZCJzi35O8bqeWBMjIN6sQDr2w",
    category: "Hot Drinks",
    ingredients: ["Chocolate", "Steamed milk", "Whipped cream"],
    nutritionalInfo: {
      calories: 220,
      protein: 6,
      carbs: 30,
      fat: 10,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "A chocolate lover's dream – so rich and comforting!",
        author: "Chocoholic",
      },
      {
        rating: 4,
        comment: "Deliciously creamy, perfect for cold days.",
        author: "Winter Warmer",
      },
    ],
  },
  {
    id: "19",
    name: "Hot Chocolate Nutella",
    description:
      "A decadent twist on classic hot chocolate, made with Nutella spread, melted chocolate, steamed milk, and topped with whipped cream for an extra indulgent treat.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUQrL3wGdxTayZCJzi35O8bqeWBMjIN6sQDr2w",
    category: "Hot Drinks",
    ingredients: ["Nutella", "Chocolate", "Steamed milk", "Whipped cream"],
    nutritionalInfo: {
      calories: 280,
      protein: 7,
      carbs: 40,
      fat: 12,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment:
          "The Nutella adds such a delicious richness – absolutely amazing!",
        author: "Nutella Lover",
      },
      {
        rating: 4,
        comment:
          "A perfect blend of chocolate and Nutella – creamy and comforting.",
        author: "Sweet Indulgence Seeker",
      },
    ],
  },
  {
    id: "20",
    name: "Tea",
    description:
      "A soothing and aromatic hot beverage made from tea leaves, perfect for relaxation and warming up on chilly days.",
    price: 20,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU7ZvIiitIx4fvjTtUCV3sznKuARkar1NYEeLb",
    category: "Hot Drinks",
    ingredients: ["Tea leaves", "Water", "Optional sugar", "Optional milk"],
    nutritionalInfo: {
      calories: 2,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The perfect cup of tea, so calming and comforting.",
        author: "Tea Enthusiast",
      },
      {
        rating: 4,
        comment: "Simple and relaxing – a great choice for a quiet moment.",
        author: "Tea Lover",
      },
    ],
  },
  {
    id: "21",
    name: "Flavored Tea",
    description:
      "A refreshing twist on classic tea, infused with various natural flavors such as mint, lemon, or berry, offering a delightful and aromatic experience.",
    price: 22,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUeHu9rETAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Hot Drinks",
    ingredients: [
      "Tea leaves",
      "Flavoring (Mint, Lemon, Berry, etc.)",
      "Water",
      "Optional sugar",
    ],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Love the minty flavor – so refreshing!",
        author: "Flavored Tea Aficionado",
      },
      {
        rating: 4,
        comment: "Great taste, I enjoy the variety of flavors!",
        author: "Herbal Tea Lover",
      },
    ],
  },
  {
    id: "22",
    name: "Teapot Tea",
    description:
      "A traditional tea served in a teapot, offering a rich and full-bodied experience with your choice of black, green, or herbal tea leaves, perfect for sharing and enjoying with friends.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUTuUKQPX8mUNEGVJtgIlKFRzDcuhpBOHroL61",
    category: "Hot Drinks",
    ingredients: ["Tea leaves", "Water", "Optional sugar", "Optional milk"],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 2,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment:
          "Perfect for sharing with friends, the flavor is so comforting.",
        author: "Tea Lover",
      },
      {
        rating: 4,
        comment: "A lovely and traditional way to enjoy tea.",
        author: "Teapot Enthusiast",
      },
    ],
  },
  {
    id: "23",
    name: "Tea with Milk",
    description:
      "A classic tea blend served with steamed milk, creating a creamy and comforting beverage perfect for any time of the day.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBkAPPtwGYWwk3mqd10pZ4yn9obO5CR7S8jJa",
    category: "Hot Drinks",
    ingredients: ["Tea leaves", "Steamed milk", "Optional sugar"],
    nutritionalInfo: {
      calories: 50,
      protein: 3,
      carbs: 5,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "A perfect balance of tea and milk, so smooth and satisfying.",
        author: "Tea Fanatic",
      },
      {
        rating: 4,
        comment: "Great taste, love the creaminess from the milk.",
        author: "Milk Tea Lover",
      },
    ],
  },
  {
    id: "24",
    name: "Green Tea",
    description:
      "A refreshing and healthy hot beverage made from green tea leaves, known for its light, earthy flavor and numerous health benefits.",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZ4KM2KfzYzGX7mJRuxDMkPpLtdw3VqrfSAUb",
    category: "Hot Drinks",
    ingredients: ["Green tea leaves", "Water"],
    nutritionalInfo: {
      calories: 2,
      protein: 0,
      carbs: 1,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Perfect for a detox, so refreshing and light!",
        author: "Health Enthusiast",
      },
      {
        rating: 4,
        comment: "Great flavor, perfect for calming the mind.",
        author: "Green Tea Lover",
      },
    ],
  },
  {
    id: "25",
    name: "Herbal Infusion",
    description:
      "A refreshing and soothing infusion made with various herbs like aniseed (Yansoon), mint, or a custom blend of herbs, perfect for relaxation and digestion.",
    price: 22,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUAS6qAN9dpW3slYjcVM8ZSAamEkQGIbviyfLC",
    category: "Hot Drinks",
    ingredients: ["Aniseed", "Mint", "Herbal blend", "Water"],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So refreshing and great for digestion!",
        author: "Herbal Infusion Lover",
      },
      {
        rating: 4,
        comment: "Loved the minty touch, very calming and soothing.",
        author: "Relaxation Seeker",
      },
    ],
  },
  {
    id: "26",
    name: "Hot Cider",
    description:
      "A warm, spiced apple cider made with fresh apple juice, cinnamon, cloves, and nutmeg, perfect for cozying up on chilly days.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUKav2p743fSUwGsq7TmoICnF5kv9tr0Hcp2O1",
    category: "Hot Drinks",
    ingredients: ["Apple juice", "Cinnamon", "Cloves", "Nutmeg", "Sugar"],
    nutritionalInfo: {
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Perfectly spiced and so warming – the ultimate winter drink!",
        author: "Cider Enthusiast",
      },
      {
        rating: 4,
        comment: "A great fall favorite, so comforting and flavorful.",
        author: "Warm Drink Lover",
      },
    ],
  },
  {
    id: "27",
    name: "Hot and Flow",
    description:
      "A soothing and aromatic hot beverage made with a blend of natural herbs and spices, designed to enhance relaxation and promote a sense of calm and flow.",
    price: 30,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgcgozHx0kSM21Z9c8XTvAwBFKOqQn7NuzdGL",
    category: "Hot Drinks",
    ingredients: ["Herbal blend", "Cinnamon", "Lemon zest", "Honey"],
    nutritionalInfo: {
      calories: 45,
      protein: 0,
      carbs: 12,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So calming and perfect for unwinding after a busy day!",
        author: "Flow Seeker",
      },
      {
        rating: 4,
        comment: "Great flavor, really helps me relax.",
        author: "Herbal Drink Lover",
      },
    ],
  },
  {
    id: "28",
    name: "Sahlab",
    description:
      "A traditional warm and creamy drink made from ground orchid tuber, flavored with a touch of vanilla and garnished with cinnamon, perfect for cozying up on cold days.",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUku1MecKPQhZNPCwA0XdsTzJYogfuFSERtv6U",
    category: "Hot Drinks",
    ingredients: [
      "Ground orchid tuber",
      "Milk",
      "Sugar",
      "Vanilla",
      "Cinnamon",
    ],
    nutritionalInfo: {
      calories: 150,
      protein: 3,
      carbs: 30,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "A deliciously creamy drink, perfect for the winter!",
        author: "Sahlab Fan",
      },
      {
        rating: 4,
        comment: "The flavor is comforting and rich, love it!",
        author: "Traditional Drink Enthusiast",
      },
    ],
  },
  {
    id: "29",
    name: "Sahlab with Nuts",
    description:
      "A rich and creamy sahlab topped with a generous serving of mixed nuts, creating a perfect balance of smoothness and crunch, ideal for chilly days.",
    price: 38,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUku1MecKPQhZNPCwA0XdsTzJYogfuFSERtv6U",
    category: "Hot Drinks",
    ingredients: [
      "Ground orchid tuber",
      "Milk",
      "Sugar",
      "Vanilla",
      "Cinnamon",
      "Mixed nuts (pistachios, almonds, walnuts)",
    ],
    nutritionalInfo: {
      calories: 180,
      protein: 5,
      carbs: 32,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment:
          "A delightful twist on classic sahlab with the added crunch of nuts.",
        author: "Nut Lover",
      },
      {
        rating: 4,
        comment:
          "Love the creamy texture and the crunch of the nuts. Perfect for winter.",
        author: "Sahlab Enthusiast",
      },
    ],
  },
  {
    id: "30",
    name: "Sahlab with Fruits",
    description:
      "A creamy sahlab drink topped with a mix of fresh fruits like bananas, strawberries, and pomegranate, offering a refreshing and healthy twist to the traditional sahlab.",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUG5AgVEDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Hot Drinks",
    ingredients: [
      "Ground orchid tuber",
      "Milk",
      "Sugar",
      "Vanilla",
      "Cinnamon",
      "Fresh fruits (bananas, strawberries, pomegranate)",
    ],
    nutritionalInfo: {
      calories: 160,
      protein: 4,
      carbs: 35,
      fat: 5,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment:
          "A delicious fusion of creamy sahlab and refreshing fruits. Perfect for any season!",
        author: "Fruit Lover",
      },
      {
        rating: 4,
        comment:
          "The fruits add a nice sweetness to the sahlab, a perfect balance of flavors.",
        author: "Sahlab Enthusiast",
      },
    ],
  },
  // Iced Coffee
  {
    id: "31",
    name: "Ice Chocolate",
    description:
      "Chilled rich chocolate drink served with ice and topped with cream",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU3WPaSaUREXU7lyI6kGquQzD3atp9c1emhj84",
    category: "Iced Coffee",
    ingredients: ["Milk", "Chocolate syrup", "Ice", "Whipped cream"],
    nutritionalInfo: {
      calories: 180,
      protein: 4,
      carbs: 25,
      fat: 7,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Super refreshing and chocolaty!",
        author: "Lina",
      },
      {
        rating: 4,
        comment: "Perfect for summer days!",
        author: "Youssef",
      },
    ],
  },
  {
    id: "32",
    name: "Ice Coffee",
    description: "Classic iced coffee brewed fresh and served cold over ice",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0Ab2Mlo4U2YJovA1HwaP8C7qNF3Qx6VXcdZm",
    category: "Iced Coffee",
    ingredients: [
      "Brewed coffee",
      "Ice",
      "Milk or cream (optional)",
      "Sugar (optional)",
    ],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 2,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Exactly what I need on a hot day!",
        author: "Omar",
      },
      {
        rating: 4,
        comment: "Strong and smooth iced coffee",
        author: "Nadine",
      },
    ],
  },
  {
    id: "33",
    name: "Ice Latte",
    description:
      "Smooth espresso mixed with chilled milk and ice for a refreshing latte experience",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZ4USsRxzYzGX7mJRuxDMkPpLtdw3VqrfSAUb",
    category: "Iced Coffee",
    ingredients: ["Espresso", "Cold milk", "Ice"],
    nutritionalInfo: {
      calories: 90,
      protein: 3,
      carbs: 6,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So smooth and refreshing!",
        author: "Mariam",
      },
      {
        rating: 4,
        comment: "My daily go-to drink",
        author: "Hassan",
      },
    ],
  },
  {
    id: "34",
    name: "Ice Mocha (Dark)",
    description:
      "Bold espresso blended with dark chocolate and chilled milk over ice",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU5VEPaD1Ow8IRS0d4mGPuqWV6pz1H9NlQkjT2",
    category: "Iced Coffee",
    ingredients: ["Espresso", "Dark chocolate syrup", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 150,
      protein: 4,
      carbs: 18,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Rich and chocolatey! Loved it.",
        author: "Dina",
      },
      {
        rating: 4,
        comment: "Great mix of coffee and dark cocoa",
        author: "Ali",
      },
    ],
  },
  {
    id: "35",
    name: "Ice Mocha (White)",
    description:
      "Creamy iced coffee with white chocolate syrup and chilled milk",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUWauC4W3GdsUmP3yIEkpu8zgqFe19N5hMwCRW",
    category: "Iced Coffee",
    ingredients: ["Espresso", "White chocolate syrup", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 160,
      protein: 4,
      carbs: 20,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Sweet and smooth, white mocha heaven!",
        author: "Riham",
      },
      {
        rating: 4,
        comment: "Loved the creamy twist",
        author: "Mostafa",
      },
    ],
  },
  {
    id: "36",
    name: "Ice Lava",
    description:
      "A layered iced coffee experience with espresso, milk, and creamy lava-style foam",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBgcXFlGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Iced Coffee",
    ingredients: ["Espresso", "Milk", "Ice", "Foamed milk or cream"],
    nutritionalInfo: {
      calories: 140,
      protein: 4,
      carbs: 12,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Visually stunning and tastes amazing!",
        author: "Jana",
      },
      {
        rating: 4,
        comment: "The layers are beautiful and delicious",
        author: "Ziad",
      },
    ],
  },
  {
    id: "37",
    name: "Ice Cappuccino",
    description:
      "Chilled version of the classic cappuccino with a balanced mix of espresso, milk, and foam over ice",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPKgSAM8Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Iced Coffee",
    ingredients: ["Espresso", "Cold milk", "Ice", "Foam"],
    nutritionalInfo: {
      calories: 100,
      protein: 4,
      carbs: 8,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Cool and creamy – just right!",
        author: "Farah",
      },
      {
        rating: 4,
        comment: "Not too strong, not too sweet",
        author: "Khaled",
      },
    ],
  },
  // Frappe
  {
    id: "38",
    name: "Frappuccino",
    description: "A creamy blended iced coffee drink topped with whipped cream",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUJFasClOMgCnOzaKf8XimNZuSq0wGLjv1rope",
    category: "Frappe",
    ingredients: ["Espresso", "Milk", "Ice", "Sugar", "Whipped cream"],
    nutritionalInfo: {
      calories: 210,
      protein: 4,
      carbs: 28,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So creamy and cold, I love it!",
        author: "Mina",
      },
      {
        rating: 4,
        comment: "Perfectly blended and sweet",
        author: "Noura",
      },
    ],
  },
  {
    id: "39",
    name: "Chocolate Frappe",
    description:
      "Icy blended chocolate drink with a rich cocoa flavor and creamy topping",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUpH3GY5ZJOWmQ8L4utAT6C1ByhadlGfnjEzKX",
    category: "Frappe",
    ingredients: ["Milk", "Chocolate syrup", "Ice", "Whipped cream"],
    nutritionalInfo: {
      calories: 220,
      protein: 5,
      carbs: 30,
      fat: 9,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Chocolatey goodness in every sip!",
        author: "Salma",
      },
      {
        rating: 4,
        comment: "Cool, rich, and satisfying",
        author: "Yassin",
      },
    ],
  },
  {
    id: "40",
    name: "Caramel Frappe",
    description:
      "Sweet and creamy frappe blended with caramel syrup and topped with whipped cream",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVUXfDiZWxs9h8fnkU6DvKEwaBiXM0YNHJbcy",
    category: "Frappe",
    ingredients: ["Milk", "Caramel syrup", "Ice", "Whipped cream"],
    nutritionalInfo: {
      calories: 230,
      protein: 4,
      carbs: 32,
      fat: 9,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Caramel lovers’ dream!",
        author: "Dalia",
      },
      {
        rating: 4,
        comment: "Super sweet and smooth",
        author: "Mostafa",
      },
    ],
  },
  {
    id: "41",
    name: "Oreo Frappe",
    description:
      "Blended frappe with Oreo cookies, milk, and chocolate, topped with cream",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSURD58s9QaYOMP6IEhkl1Qr0mtzUFLcAWKBDey",
    category: "Frappe",
    ingredients: [
      "Milk",
      "Oreo cookies",
      "Chocolate syrup",
      "Ice",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 250,
      protein: 5,
      carbs: 34,
      fat: 10,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Oreo + Frappe = Perfection!",
        author: "Laila",
      },
      {
        rating: 4,
        comment: "Crunchy and creamy together",
        author: "Tamer",
      },
    ],
  },
  {
    id: "42",
    name: "Banana Caramel Frappe",
    description:
      "Smooth banana blended with caramel syrup and ice, topped with cream",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvvdJUenjY14g7hFoJUpd9SsOzCqRcZG6QLPN",
    category: "Frappe",
    ingredients: ["Banana", "Milk", "Caramel syrup", "Ice", "Whipped cream"],
    nutritionalInfo: {
      calories: 240,
      protein: 4,
      carbs: 35,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Banana and caramel is a golden combo!",
        author: "Ola",
      },
      {
        rating: 4,
        comment: "Sweet, creamy, and fruity",
        author: "Mahmoud",
      },
    ],
  },
  // Fresh Juices
  {
    id: "43",
    name: "Mango Juice",
    description: "Freshly blended mango juice, naturally sweet and tropical",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGf0MSJDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Fresh Juices",
    ingredients: ["Fresh mango", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 130,
      protein: 1,
      carbs: 30,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Tastes like summer in a cup!",
        author: "Selim",
      },
      {
        rating: 4,
        comment: "Smooth and fruity, loved it",
        author: "Noura",
      },
    ],
  },
  {
    id: "44",
    name: "Strawberry Juice",
    description:
      "Fresh and sweet strawberry juice, served chilled for maximum refreshment",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUku7pNVaPQhZNPCwA0XdsTzJYogfuFSERtv6U",
    category: "Fresh Juices",
    ingredients: ["Fresh strawberries", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 110,
      protein: 1,
      carbs: 25,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So fresh and naturally sweet!",
        author: "Marwan",
      },
      {
        rating: 4,
        comment: "Loved the real strawberry bits",
        author: "Farida",
      },
    ],
  },
  {
    id: "45",
    name: "Guava Juice",
    description:
      "Thick and refreshing guava juice with a naturally tropical flavor",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUbT8Ys9vW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Fresh Juices",
    ingredients: ["Fresh guava", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 120,
      protein: 1,
      carbs: 27,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Thick and creamy, just how guava should be!",
        author: "Aya",
      },
      {
        rating: 4,
        comment: "Great taste and texture",
        author: "Yassin",
      },
    ],
  },
  {
    id: "46",
    name: "Orange Juice",
    description:
      "Freshly squeezed orange juice, rich in vitamin C and citrusy goodness",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0typkkto4U2YJovA1HwaP8C7qNF3Qx6VXcdZ",
    category: "Fresh Juices",
    ingredients: ["Fresh oranges", "Ice", "Sugar (optional)"],
    nutritionalInfo: {
      calories: 100,
      protein: 1,
      carbs: 22,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So refreshing and tangy!",
        author: "Yara",
      },
      {
        rating: 4,
        comment: "Loved the natural citrus flavor",
        author: "Karim",
      },
    ],
  },
  {
    id: "47",
    name: "Cantaloupe Juice",
    description:
      "Light and refreshing cantaloupe juice with a naturally sweet flavor",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnLKClh0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Fresh Juices",
    ingredients: ["Fresh cantaloupe", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 95,
      protein: 1,
      carbs: 22,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Light, sweet, and super refreshing",
        author: "Nourhan",
      },
      {
        rating: 4,
        comment: "Loved it after a hot day!",
        author: "Ahmed",
      },
    ],
  },
  {
    id: "48",
    name: "Peach Juice",
    description: "Sweet and juicy peach juice with a smooth, refreshing taste",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUMgS6O2ZBwCQDbIAOWTfX61LkHepK2u5lciGS",
    category: "Fresh Juices",
    ingredients: ["Fresh peaches", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 60,
      protein: 1,
      carbs: 15,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Perfectly sweet and refreshing",
        author: "Mona",
      },
      {
        rating: 4,
        comment: "A great summer drink",
        author: "Sarah",
      },
    ],
  },
  {
    id: "49",
    name: "Banana Milkshake",
    description:
      "Creamy banana milkshake with a touch of vanilla for extra sweetness",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUb09rGpyvW1tDmR2VHhknY037XN48IAvCuLKb",
    category: "Fresh Juices",
    ingredients: ["Bananas", "Milk", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 3,
      carbs: 35,
      fat: 4,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Deliciously creamy and thick",
        author: "Tarek",
      },
      {
        rating: 4,
        comment: "Very smooth and satisfying",
        author: "Hana",
      },
    ],
  },
  {
    id: "50",
    name: "Avocado Juice",
    description: "Rich and creamy avocado juice with a hint of lime",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUViArUEWxs9h8fnkU6DvKEwaBiXM0YNHJbcy5",
    category: "Fresh Juices",
    ingredients: ["Fresh avocados", "Milk", "Lime juice", "Ice"],
    nutritionalInfo: {
      calories: 220,
      protein: 3,
      carbs: 12,
      fat: 15,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So creamy and flavorful, a must-try!",
        author: "Ramy",
      },
      {
        rating: 4,
        comment: "Loved the texture, very unique",
        author: "Laila",
      },
    ],
  },
  {
    id: "51",
    name: "Kiwi Juice",
    description: "Tart and sweet kiwi juice with a vibrant green color",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUkF2aS2PQhZNPCwA0XdsTzJYogfuFSERtv6UH",
    category: "Fresh Juices",
    ingredients: ["Fresh kiwis", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 60,
      protein: 2,
      carbs: 14,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Tangy and refreshing, perfect for hot days",
        author: "Mona",
      },
      {
        rating: 4,
        comment: "Great flavor, but a bit too tangy for me",
        author: "Ali",
      },
    ],
  },
  {
    id: "52",
    name: "Watermelon Juice",
    description:
      "Light and hydrating watermelon juice with a natural sweetness",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUwDXPU2LsaTWnwqK9G5iPL8jDkXhdIo12ev7z",
    category: "Fresh Juices",
    ingredients: ["Fresh watermelon", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 50,
      protein: 1,
      carbs: 12,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Super refreshing and perfect for summer",
        author: "Yara",
      },
      {
        rating: 4,
        comment: "Sweet and very hydrating",
        author: "Hassan",
      },
    ],
  },
  {
    id: "53",
    name: "Pineapple Juice",
    description:
      "Tropical pineapple juice with a perfect balance of sweet and tangy flavors",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUNyYE6oEwptjPTHhRQcvqSJyrf4xaIMVXOul7",
    category: "Fresh Juices",
    ingredients: ["Fresh pineapples", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 80,
      protein: 1,
      carbs: 21,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Tastes like a tropical vacation in a glass!",
        author: "Ahmed",
      },
      {
        rating: 4,
        comment: "Great balance of flavors, but a bit too sweet for me",
        author: "Farida",
      },
    ],
  },
  {
    id: "54",
    name: "Lemon Juice",
    description: "Fresh and tangy lemon juice with a refreshing citrusy taste",
    price: 30,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU19L3LHdSsnZvxSyRQgYElJa0D9LhBq7V2f8W",
    category: "Fresh Juices",
    ingredients: ["Fresh lemons", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 25,
      protein: 1,
      carbs: 8,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Perfectly tart and refreshing",
        author: "Nour",
      },
      {
        rating: 4,
        comment: "A great pick-me-up drink",
        author: "Omar",
      },
    ],
  },
  {
    id: "55",
    name: "Lemon Mint Juice",
    description:
      "A blend of fresh lemon and mint for a cool, tangy, and refreshing drink",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUKU3sCu43fSUwGsq7TmoICnF5kv9tr0Hcp2O1",
    category: "Fresh Juices",
    ingredients: [
      "Fresh lemons",
      "Fresh mint",
      "Water",
      "Sugar (optional)",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 30,
      protein: 1,
      carbs: 9,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Such a refreshing combo, love the minty touch",
        author: "Layla",
      },
      {
        rating: 4,
        comment: "Mint and lemon are a great pair, super refreshing",
        author: "Samy",
      },
    ],
  },
  {
    id: "56",
    name: "Grape Juice",
    description:
      "Sweet and juicy grape juice with a rich flavor and a natural sweetness",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUuNCt8tbpD3RMswYi0dfrkOzgHWSFlo45b71J",
    category: "Fresh Juices",
    ingredients: ["Fresh grapes", "Water", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 100,
      protein: 1,
      carbs: 25,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "The sweetness of grapes is perfectly captured",
        author: "Mohamed",
      },
      {
        rating: 4,
        comment: "Very refreshing, but a bit sweet for my taste",
        author: "Reem",
      },
    ],
  },
  {
    id: "57",
    name: "Carrot Orange Juice",
    description:
      "A healthy mix of fresh carrots and oranges with a naturally sweet flavor",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0typkkto4U2YJovA1HwaP8C7qNF3Qx6VXcdZ",
    category: "Fresh Juices",
    ingredients: [
      "Fresh carrots",
      "Fresh oranges",
      "Water",
      "Sugar (optional)",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 70,
      protein: 1,
      carbs: 18,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So delicious and full of nutrients",
        author: "Dalia",
      },
      {
        rating: 4,
        comment: "Perfect balance of sweet and tangy",
        author: "Fady",
      },
    ],
  },
  {
    id: "58",
    name: "Guava Mint Juice",
    description:
      "Refreshing guava juice with a minty twist for an extra cool kick",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUbT8Ys9vW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Fresh Juices",
    ingredients: [
      "Fresh guavas",
      "Fresh mint",
      "Water",
      "Sugar (optional)",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 90,
      protein: 2,
      carbs: 22,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Delicious and unique flavor, perfect for summer",
        author: "Rania",
      },
      {
        rating: 4,
        comment: "Very refreshing and unique, love the minty aftertaste",
        author: "Tamer",
      },
    ],
  },
  {
    id: "59",
    name: "Dates with Milk Juice",
    description:
      "A creamy and sweet juice made from dates and milk, perfect for a nutritious snack",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGPopQIpDFLq6ZIUY0BRpig5aPfV3HN7KECSt",
    category: "Fresh Juices",
    ingredients: ["Dates", "Milk", "Sugar (optional)", "Ice"],
    nutritionalInfo: {
      calories: 150,
      protein: 3,
      carbs: 35,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Super creamy and sweet, perfect for dessert",
        author: "Zainab",
      },
      {
        rating: 4,
        comment: "Great blend of flavors, very filling",
        author: "Mahmoud",
      },
    ],
  },
  // Cocktails
  {
    id: "60",
    name: "Tropical Cocktail",
    description:
      "A rich tropical blend of mango, strawberry, banana, and vanilla ice cream for a creamy and fruity treat",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUB98gO1GYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Cocktail",
    ingredients: [
      "Fresh mango",
      "Fresh strawberries",
      "Banana",
      "Vanilla ice cream",
      "Milk",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 220,
      protein: 4,
      carbs: 35,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Creamy, fruity, and absolutely delicious!",
        author: "Salma",
      },
      {
        rating: 4,
        comment: "A perfect summer drink, loved the mix of flavors",
        author: "Karim",
      },
    ],
  },
  {
    id: "61",
    name: "Florida Cocktail",
    description:
      "A fruity fusion of mango, strawberry, and guava for a bold, tropical experience",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUwNZ0T9LsaTWnwqK9G5iPL8jDkXhdIo12ev7z",
    category: "Cocktail",
    ingredients: ["Fresh mango", "Fresh strawberries", "Guava juice", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 32,
      fat: 1,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Tastes like summer in a glass!",
        author: "Mona",
      },
      {
        rating: 4,
        comment: "Great mix of fruits, loved the guava",
        author: "Youssef",
      },
    ],
  },
  {
    id: "62",
    name: "Pina Colada",
    description:
      "A tropical classic cocktail with creamy coconut and tangy pineapple",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBCubbiGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Cocktail",
    ingredients: ["Coconut cream", "Pineapple juice", "Ice"],
    nutritionalInfo: {
      calories: 210,
      protein: 1,
      carbs: 30,
      fat: 7,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Smooth and tropical—just perfect",
        author: "Hana",
      },
      {
        rating: 4,
        comment: "Very refreshing and creamy",
        author: "Khaled",
      },
    ],
  },
  {
    id: "63",
    name: "Mango Kiwi Cocktail",
    description:
      "A vibrant and tangy mix of mango and kiwi for a sweet yet zesty taste",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVTY7fGWxs9h8fnkU6DvKEwaBiXM0YNHJbcy5",
    category: "Cocktail",
    ingredients: ["Fresh mango", "Fresh kiwi", "Ice"],
    nutritionalInfo: {
      calories: 170,
      protein: 2,
      carbs: 30,
      fat: 1,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Loved the balance between sweet and tangy!",
        author: "Dina",
      },
      {
        rating: 4,
        comment: "Great mix, kiwi gives it a nice twist",
        author: "Omar",
      },
    ],
  },
  {
    id: "64",
    name: "Mango Peach Cocktail",
    description:
      "Sweet mango blended with juicy peaches for a soft and creamy flavor",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU4vq2frVidkygGC9cqts5Zo1luFPWfDXYhbVn",
    category: "Cocktail",
    ingredients: ["Fresh mango", "Fresh peach", "Ice"],
    nutritionalInfo: {
      calories: 165,
      protein: 1,
      carbs: 28,
      fat: 1,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So soft and sweet, loved the peachy notes",
        author: "Laila",
      },
      {
        rating: 4,
        comment: "Mango and peach make a great pair",
        author: "Ziad",
      },
    ],
  },
  {
    id: "65",
    name: "Blue Hawaii",
    description:
      "A fizzy and citrusy tropical drink with blue curaçao vibes and lemon soda twist",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0tA4vGwo4U2YJovA1HwaP8C7qNF3Qx6VXcdZ",
    category: "Cocktail",
    ingredients: ["Blue syrup", "Lemon", "Soda", "Ice"],
    nutritionalInfo: {
      calories: 130,
      protein: 0,
      carbs: 27,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Coolest color and most refreshing taste!",
        author: "Tamer",
      },
      {
        rating: 4,
        comment: "Loved the lemon fizz effect",
        author: "Farah",
      },
    ],
  },
  {
    id: "66",
    name: "Cherry Cola",
    description:
      "Classic cola with a delicious cherry twist for a nostalgic, fizzy flavor",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSULfV0TmyYvXMsxgpZynhWc3CeFGdS5z4iDIBq",
    category: "Cocktail",
    ingredients: ["Cola", "Cherry syrup", "Ice"],
    nutritionalInfo: {
      calories: 140,
      protein: 0,
      carbs: 35,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Cola with a fun twist—amazing!",
        author: "Yara",
      },
      {
        rating: 4,
        comment: "Very nostalgic and sweet",
        author: "Hassan",
      },
    ],
  },
  {
    id: "67",
    name: "Lava Cocktail",
    description:
      "A smooth cocktail with mango, vanilla ice cream, and a hint of coconut",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0DJD7Ko4U2YJovA1HwaP8C7qNF3Qx6VXcdZm",
    category: "Cocktail",
    ingredients: ["Fresh mango", "Vanilla ice cream", "Coconut milk", "Ice"],
    nutritionalInfo: {
      calories: 230,
      protein: 3,
      carbs: 36,
      fat: 7,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Creamy and tropical—totally addictive",
        author: "Malak",
      },
      {
        rating: 4,
        comment: "Perfect summer cocktail",
        author: "Sherif",
      },
    ],
  },
  {
    id: "68",
    name: "Lava Mix Cocktail",
    description:
      "A rich mix of avocado, mango, dates, nuts, and honey for an energy-packed drink",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUt1LuDqWc1rzHLObqmAvkCUQlgapjDFS9cRX6",
    category: "Cocktail",
    ingredients: [
      "Avocado",
      "Fresh mango",
      "Dates",
      "Mixed nuts",
      "Honey",
      "Milk",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 290,
      protein: 5,
      carbs: 38,
      fat: 10,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Super creamy and packed with flavor",
        author: "Abdelrahman",
      },
      {
        rating: 4,
        comment: "Tastes healthy and indulgent at the same time",
        author: "Rana",
      },
    ],
  },
  {
    id: "69",
    name: "Green Lava",
    description:
      "A powerful blend of arugula, vanilla ice cream, nuts, and honey for a unique and energizing cocktail",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0ZiK6yo4U2YJovA1HwaP8C7qNF3Qx6VXcdZm",
    category: "Cocktail",
    ingredients: [
      "Arugula (gergir)",
      "Vanilla ice cream",
      "Mixed nuts",
      "Honey",
      "Milk",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 260,
      protein: 4,
      carbs: 30,
      fat: 9,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Unusual but incredibly good!",
        author: "Samar",
      },
      {
        rating: 4,
        comment: "Great for a healthy energy boost",
        author: "Mostafa",
      },
    ],
  },
  // Smoothies
  {
    id: "70",
    name: "Mango Smoothie",
    description:
      "A refreshing mango smoothie for a tropical and creamy experience",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUdn5491CJM4quD6CvO7aiw3sU1XbAkxI8KGhg",
    category: "Smoothies",
    ingredients: ["Fresh mango", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 190,
      protein: 2,
      carbs: 35,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Deliciously creamy and sweet!",
        author: "Amira",
      },
      {
        rating: 4,
        comment: "Nice and refreshing",
        author: "Ali",
      },
    ],
  },
  {
    id: "71",
    name: "Strawberry Smoothie",
    description: "A sweet and tangy strawberry smoothie for a refreshing taste",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUHg67XulKFudvb3S7yiE0DVBLton5RxOYm4jc",
    category: "Smoothies",
    ingredients: ["Fresh strawberries", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 34,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Tastes just like fresh strawberries",
        author: "Mona",
      },
      {
        rating: 4,
        comment: "Perfectly sweet and refreshing",
        author: "Rami",
      },
    ],
  },
  {
    id: "72",
    name: "Kiwi Smoothie",
    description: "A tangy kiwi smoothie with a refreshing flavor",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU3iV0uYUREXU7lyI6kGquQzD3atp9c1emhj84",
    category: "Smoothies",
    ingredients: ["Fresh kiwi", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 170,
      protein: 2,
      carbs: 32,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Love the tanginess of kiwi!",
        author: "Karim",
      },
      {
        rating: 4,
        comment: "Really refreshing and tangy",
        author: "Sami",
      },
    ],
  },
  {
    id: "73",
    name: "Kiwi Pineapple Smoothie",
    description: "A tropical blend of kiwi and pineapple for a zesty smoothie",
    price: 54,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUIGBMQV7ifvbzS4NlhYcJ8VeOg7U1rpPD630X",
    category: "Smoothies",
    ingredients: ["Fresh kiwi", "Pineapple", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 160,
      protein: 2,
      carbs: 34,
      fat: 1,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "A perfect balance of sweet and tangy!",
        author: "Nadia",
      },
      {
        rating: 4,
        comment: "Super tropical and refreshing",
        author: "Ahmed",
      },
    ],
  },
  {
    id: "74",
    name: "Blueberry Smoothie",
    description:
      "A creamy smoothie made with fresh blueberries for a burst of flavor",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPFnfH98Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Smoothies",
    ingredients: ["Fresh blueberries", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 190,
      protein: 3,
      carbs: 32,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Blueberries give it a rich, sweet taste",
        author: "Sarah",
      },
      {
        rating: 4,
        comment: "Delicious and refreshing",
        author: "Fadi",
      },
    ],
  },
  {
    id: "75",
    name: "Mixed Berry Smoothie",
    description: "A mix of berries blended into a smooth and creamy smoothie",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUcHCeQ95ZeGmATNYO45FCkWlKu8JzHoPIqfb9",
    category: "Smoothies",
    ingredients: [
      "Fresh strawberries",
      "Blueberries",
      "Raspberries",
      "Milk",
      "Ice",
    ],
    nutritionalInfo: {
      calories: 180,
      protein: 3,
      carbs: 35,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Berries galore! Loved it",
        author: "Laila",
      },
      {
        rating: 4,
        comment: "Great flavor, perfect for berry lovers",
        author: "Ziad",
      },
    ],
  },
  {
    id: "76",
    name: "Green Apple Smoothie",
    description: "A fresh and tart smoothie made with green apples",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUeV5BI9TAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Smoothies",
    ingredients: ["Fresh green apples", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 140,
      protein: 2,
      carbs: 30,
      fat: 1,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Nice balance of tart and sweet",
        author: "Mira",
      },
      {
        rating: 4,
        comment: "Really refreshing and light",
        author: "Tamer",
      },
    ],
  },
  {
    id: "77",
    name: "Lemon Smoothie",
    description: "A citrusy and refreshing lemon smoothie",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUK9OKXY43fSUwGsq7TmoICnF5kv9tr0Hcp2O1",
    category: "Smoothies",
    ingredients: ["Fresh lemon", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 120,
      protein: 1,
      carbs: 28,
      fat: 1,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Perfect for a citrus burst",
        author: "Sara",
      },
      {
        rating: 4,
        comment: "Love the refreshing tang of lemon",
        author: "Mahmoud",
      },
    ],
  },
  {
    id: "78",
    name: "Mint Lemon Smoothie",
    description: "A refreshing blend of lemon and mint for a cooling smoothie",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU6gaplD2d67hLNOqCoZRvUl9bTVEgQ4aYerP2",
    category: "Smoothies",
    ingredients: ["Fresh lemon", "Mint leaves", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 130,
      protein: 2,
      carbs: 32,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "The mint and lemon combo is perfect!",
        author: "Layla",
      },
      {
        rating: 4,
        comment: "Very refreshing and cool",
        author: "Rania",
      },
    ],
  },
  {
    id: "79",
    name: "Passion Fruit Smoothie",
    description: "A tangy and tropical passion fruit smoothie",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZOKC7WzYzGX7mJRuxDMkPpLtdw3VqrfSAUb4",
    category: "Smoothies",
    ingredients: ["Passion fruit", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 160,
      protein: 2,
      carbs: 34,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "So tangy and refreshing",
        author: "Samia",
      },
      {
        rating: 4,
        comment: "Nice tropical taste",
        author: "Ahmed",
      },
    ],
  },
  {
    id: "80",
    name: "Mango Kiwi Smoothie",
    description:
      "A delicious blend of mango and kiwi for a sweet and tangy smoothie",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGSo5U0DFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Smoothies",
    ingredients: ["Fresh mango", "Fresh kiwi", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 34,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Perfect combo of sweet and tart",
        author: "Fatma",
      },
      {
        rating: 4,
        comment: "Really refreshing, loved the kiwi",
        author: "Karim",
      },
    ],
  },
  {
    id: "81",
    name: "Mango Peach Smoothie",
    description:
      "A smooth blend of mango and peach for a sweet, tropical experience",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUbi1Pm2vW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Smoothies",
    ingredients: ["Fresh mango", "Fresh peach", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 35,
      fat: 3,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "A lovely fruity smoothie, very tropical!",
        author: "Yasmine",
      },
      {
        rating: 4,
        comment: "Tastes really refreshing",
        author: "Tarek",
      },
    ],
  },
  {
    id: "82",
    name: "Mango Coconut Smoothie",
    description: "A tropical smoothie with mango and coconut flavors",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiSClQZBV19P3GK6yctjUvlDHk2ozxqFhbwsB",
    category: "Smoothies",
    ingredients: ["Fresh mango", "Coconut milk", "Ice"],
    nutritionalInfo: {
      calories: 210,
      protein: 3,
      carbs: 40,
      fat: 6,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Super creamy and tropical!",
        author: "Rania",
      },
      {
        rating: 4,
        comment: "Perfect combination of mango and coconut",
        author: "Omar",
      },
    ],
  },
  {
    id: "83",
    name: "Pineapple Smoothie",
    description: "A fresh and tangy pineapple smoothie",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgJ3KgzTx0kSM21Z9c8XTvAwBFKOqQn7NuzdG",
    category: "Smoothies",
    ingredients: ["Fresh pineapple", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 150,
      protein: 2,
      carbs: 34,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "So tangy and refreshing",
        author: "Hassan",
      },
      {
        rating: 4,
        comment: "Love the pineapple flavor",
        author: "Nabil",
      },
    ],
  },
  {
    id: "84",
    name: "Cantaloupe Smoothie",
    description:
      "A refreshing cantaloupe smoothie with a naturally sweet flavor",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiD8YV4IBV19P3GK6yctjUvlDHk2ozxqFhbws",
    category: "Smoothies",
    ingredients: ["Fresh cantaloupe", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 32,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Super refreshing, especially in the heat!",
        author: "Zahra",
      },
      {
        rating: 4,
        comment: "Very sweet and creamy",
        author: "Mohamed",
      },
    ],
  },
  {
    id: "85",
    name: "Peach Smoothie",
    description: "A creamy and sweet peach smoothie for a tropical treat",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUx16MkMpMsU09ibeulO34k6a1NcS8YC7DTnjB",
    category: "Smoothies",
    ingredients: ["Fresh peach", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 170,
      protein: 2,
      carbs: 34,
      fat: 2,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Peachy goodness in every sip!",
        author: "Dalia",
      },
      {
        rating: 4,
        comment: "Perfectly creamy and sweet",
        author: "Sayed",
      },
    ],
  },
  {
    id: "86",
    name: "Watermelon Smoothie",
    description:
      "A light and hydrating watermelon smoothie perfect for hot days",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUxUWeycpMsU09ibeulO34k6a1NcS8YC7DTnjB",
    category: "Smoothies",
    ingredients: ["Fresh watermelon", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 120,
      protein: 2,
      carbs: 30,
      fat: 1,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So refreshing and hydrating!",
        author: "Lina",
      },
      {
        rating: 4,
        comment: "Great smoothie for summer",
        author: "Mohamed",
      },
    ],
  },
  {
    id: "87",
    name: "Watermelon Mint Smoothie",
    description:
      "A cooling watermelon and mint smoothie, perfect for the summer",
    price: 54,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSULhOzZ3XyYvXMsxgpZynhWc3CeFGdS5z4iDIB",
    category: "Smoothies",
    ingredients: ["Fresh watermelon", "Mint leaves", "Milk", "Ice"],
    nutritionalInfo: {
      calories: 130,
      protein: 2,
      carbs: 32,
      fat: 1,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Minty freshness with watermelon, loved it",
        author: "Aya",
      },
      {
        rating: 4,
        comment: "Nice balance of flavors, refreshing",
        author: "Karim",
      },
    ],
  },
  // Mojitos
  {
    id: "88",
    name: "Red Bull Mojito",
    description:
      "A zesty mojito with a Red Bull twist for extra energy and refreshment",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgJZ7Ju3x0kSM21Z9c8XTvAwBFKOqQn7NuzdG",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Red Bull", "Ice", "Soda water"],
    nutritionalInfo: {
      calories: 110,
      protein: 0,
      carbs: 27,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "مليان طاقة ومنعش جدًا!",
        author: "Youssef",
      },
    ],
  },
  {
    id: "89",
    name: "Blueberry Mojito",
    description: "A fruity twist on the classic mojito with blueberries",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU328ql0vUREXU7lyI6kGquQzD3atp9c1emhj8",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Blueberries", "Soda water", "Ice"],
    nutritionalInfo: {
      calories: 95,
      protein: 0,
      carbs: 22,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "حلو أوي وطعمه فريش",
        author: "Laila",
      },
    ],
  },
  {
    id: "90",
    name: "Passion Fruit Mojito",
    description: "Exotic and refreshing mojito with passion fruit flavors",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUQgzMbuidxTayZCJzi35O8bqeWBMjIN6sQDr2",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Passion fruit", "Soda water", "Ice"],
    nutritionalInfo: {
      calories: 100,
      protein: 0,
      carbs: 25,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "باشون فروت رهيب جدًا!",
        author: "Omar",
      },
    ],
  },
  {
    id: "91",
    name: "Strawberry Mojito",
    description: "Classic mojito infused with fresh strawberries",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUcD11cI5ZeGmATNYO45FCkWlKu8JzHoPIqfb9",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Strawberries", "Soda water", "Ice"],
    nutritionalInfo: {
      calories: 90,
      protein: 0,
      carbs: 20,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "فراولة ونعناع؟ كومبو جامد!",
        author: "Sarah",
      },
    ],
  },
  {
    id: "92",
    name: "Cherry Cola Mojito",
    description:
      "Unique mix of cherry, cola, mint, and lime for a bold mojito flavor",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUHOw6aZlKFudvb3S7yiE0DVBLton5RxOYm4jc",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Cherry syrup", "Cola", "Ice"],
    nutritionalInfo: {
      calories: 105,
      protein: 0,
      carbs: 26,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "غريبة شوية بس طعمها عجبني",
        author: "Hany",
      },
    ],
  },
  {
    id: "93",
    name: "Classic Mojito",
    description: "The timeless mojito with mint, lime, and soda water",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUfECoPWeTBDn8diQcwlzItegp5NjWhSUOH9sv",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Soda water", "Ice"],
    nutritionalInfo: {
      calories: 70,
      protein: 0,
      carbs: 16,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "الموهيتو الأصلي مايتعوضش",
        author: "Mona",
      },
    ],
  },
  {
    id: "94",
    name: "Pomegranate Mojito",
    description: "A tangy mojito with refreshing pomegranate flavor",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU4nYmIuVidkygGC9cqts5Zo1luFPWfDXYhbVn",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Pomegranate juice", "Soda water", "Ice"],
    nutritionalInfo: {
      calories: 85,
      protein: 0,
      carbs: 21,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "رمان وموهيتو؟ تجربة مختلفة!",
        author: "Sherif",
      },
    ],
  },
  {
    id: "95",
    name: "Sun Shine Mojito",
    description: "A light and citrusy mojito blend with a mellow twist",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUfIwSm4eTBDn8diQcwlzItegp5NjWhSUOH9sv",
    category: "Mojito",
    ingredients: ["Mint", "Lime", "Soda water", "Ice", "Lemon zest"],
    nutritionalInfo: {
      calories: 75,
      protein: 0,
      carbs: 18,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "خفيف ومنعش وبيفتح النفس",
        author: "Nada",
      },
    ],
  },
  // Lava Shots
  {
    id: "96",
    name: "Mango Shot",
    description:
      "Fresh mango chunks with vanilla ice cream, butter biscuits, and whipped cream",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU1kTM9ASsnZvxSyRQgYElJa0D9LhBq7V2f8Wj",
    category: "Lava Shots",
    ingredients: [
      "Fresh mango",
      "Vanilla ice cream",
      "Butter biscuits",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 28,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "So fresh and delicious!",
        author: "Nour",
      },
    ],
  },
  {
    id: "97",
    name: "Kiwi Shot",
    description:
      "Fresh kiwi chunks with vanilla ice cream, butter biscuits, and whipped cream",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUSJeXyYAMIoExBwGjFmK6NWJ8yHdCiOq4TDRX",
    category: "Lava Shots",
    ingredients: [
      "Fresh kiwi",
      "Vanilla ice cream",
      "Butter biscuits",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 175,
      protein: 2,
      carbs: 27,
      fat: 7,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Very refreshing kiwi flavor!",
        author: "Maged",
      },
    ],
  },
  {
    id: "98",
    name: "Strawberry Shot",
    description:
      "Fresh strawberry chunks with vanilla ice cream, butter biscuits, and whipped cream",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUd44JSSCJM4quD6CvO7aiw3sU1XbAkxI8KGhg",
    category: "Lava Shots",
    ingredients: [
      "Fresh strawberries",
      "Vanilla ice cream",
      "Butter biscuits",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 185,
      protein: 2,
      carbs: 30,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Strawberries and ice cream are always a hit!",
        author: "Dina",
      },
    ],
  },
  {
    id: "99",
    name: "Banana Shot",
    description:
      "Fresh banana chunks with vanilla ice cream, butter biscuits, and whipped cream",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgeOm7yx0kSM21Z9c8XTvAwBFKOqQn7NuzdGL",
    category: "Lava Shots",
    ingredients: [
      "Fresh banana",
      "Vanilla ice cream",
      "Butter biscuits",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 190,
      protein: 2,
      carbs: 31,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Smooth and sweet banana flavor",
        author: "Kareem",
      },
    ],
  },
  // MilkShakes
  {
    id: "100",
    name: "Chocolate Milkshake",
    description: "Classic creamy chocolate milkshake with rich cocoa flavor",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUdNy8DJCJM4quD6CvO7aiw3sU1XbAkxI8KGhg",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Chocolate syrup",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 6,
      carbs: 40,
      fat: 14,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "101",
    name: "Vanilla Milkshake",
    description:
      "Smooth and creamy vanilla milkshake made with real vanilla ice cream",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU2TqkA6YfbhRQCGPIwVYEUuO7fZW5oJirpmgx",
    category: "Milk Shake",
    ingredients: ["Milk", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 290,
      protein: 6,
      carbs: 36,
      fat: 12,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "102",
    name: "Strawberry Milkshake",
    description: "Fresh and fruity strawberry milkshake blended with ice cream",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGOyW5rDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Fresh strawberries",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 310,
      protein: 5,
      carbs: 38,
      fat: 13,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "103",
    name: "Mango Milkshake",
    description: "Sweet and tropical mango milkshake with vanilla ice cream",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU5ORSNo1Ow8IRS0d4mGPuqWV6pz1H9NlQkjT2",
    category: "Milk Shake",
    ingredients: ["Milk", "Fresh mango", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 315,
      protein: 5,
      carbs: 39,
      fat: 13,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "104",
    name: "Blueberry Milkshake",
    description: "Creamy blueberry milkshake with a fruity twist",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0PvSrKo4U2YJovA1HwaP8C7qNF3Qx6VXcdZm",
    category: "Milk Shake",
    ingredients: ["Milk", "Blueberries", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 310,
      protein: 5,
      carbs: 37,
      fat: 13,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "105",
    name: "Oreo Milkshake",
    description: "Crunchy Oreo cookies blended into a creamy milkshake",
    price: 52,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU4IHr2ZVidkygGC9cqts5Zo1luFPWfDXYhbVn",
    category: "Milk Shake",
    ingredients: ["Milk", "Oreo cookies", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 370,
      protein: 5,
      carbs: 45,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "106",
    name: "Caramel Milkshake",
    description: "Smooth caramel milkshake with sweet and buttery flavor",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUn9qxEE0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Caramel syrup",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 330,
      protein: 5,
      carbs: 42,
      fat: 14,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "107",
    name: "Pistachio Milkshake",
    description: "Rich pistachio milkshake with a nutty and creamy flavor",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSULhlE6XuyYvXMsxgpZynhWc3CeFGdS5z4iDIB",
    category: "Milk Shake",
    ingredients: ["Milk", "Pistachios", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 350,
      protein: 6,
      carbs: 38,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "108",
    name: "Hazelnut Milkshake",
    description: "Delicious hazelnut milkshake with rich, nutty flavor",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUn1DNVP0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Milk Shake",
    ingredients: ["Milk", "Hazelnuts", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 355,
      protein: 6,
      carbs: 38,
      fat: 17,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "109",
    name: "Cashew Milkshake",
    description: "Smooth cashew milkshake with a naturally sweet nutty taste",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUby7RZmvW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Milk Shake",
    ingredients: ["Milk", "Cashews", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 360,
      protein: 6,
      carbs: 39,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "110",
    name: "Lotus Milkshake",
    description: "Sweet Lotus biscuit milkshake with creamy vanilla ice cream",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUpZcxu4JOWmQ8L4utAT6C1ByhadlGfnjEzKXv",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Lotus biscuits",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 380,
      protein: 5,
      carbs: 44,
      fat: 17,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "111",
    name: "Cheesecake Milkshake",
    description: "Creamy cheesecake blended into a smooth and sweet milkshake",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUAGmYwO9dpW3slYjcVM8ZSAamEkQGIbviyfLC",
    category: "Milk Shake",
    ingredients: ["Milk", "Cheesecake", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 410,
      protein: 7,
      carbs: 43,
      fat: 19,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "112",
    name: "Brownies Milkshake",
    description: "Delicious chocolate brownie chunks blended into a rich shake",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUazfsusXMR26IyUN1SzajcmwTO54VLvfgB9Xh",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Brownies",
      "Chocolate syrup",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 46,
      fat: 20,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "113",
    name: "KitKat Milkshake",
    description: "Crunchy KitKat blended into a smooth chocolate milkshake",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUMjmtkkZBwCQDbIAOWTfX61LkHepK2u5lciGS",
    category: "Milk Shake",
    ingredients: ["Milk", "KitKat", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 400,
      protein: 5,
      carbs: 45,
      fat: 18,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "114",
    name: "Snickers Milkshake",
    description:
      "Rich Snickers blended with milk and ice cream for a nutty delight",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU5AdFv9L1Ow8IRS0d4mGPuqWV6pz1H9NlQkjT",
    category: "Milk Shake",
    ingredients: ["Milk", "Snickers", "Vanilla ice cream", "Whipped cream"],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 44,
      fat: 20,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "115",
    name: "Maltesers Milkshake",
    description: "Crispy Maltesers blended into a creamy and chocolatey shake",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU8tN6UrutPHwZYf1O0bULcEdyVeFlBJSAna64",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Maltesers",
      "Chocolate syrup",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 410,
      protein: 5,
      carbs: 43,
      fat: 19,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "116",
    name: "Popcorn Milkshake",
    description: "Sweet and salty popcorn milkshake for a fun twist",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUDO7uqNkblqoPpiQXIkLS5TeJgH8YhCayv6Ec",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Popcorn",
      "Vanilla ice cream",
      "Caramel",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 390,
      protein: 5,
      carbs: 42,
      fat: 18,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "117",
    name: "Bubblegum Milkshake",
    description: "Colorful and nostalgic bubblegum flavored milkshake",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUHbecTClKFudvb3S7yiE0DVBLton5RxOYm4jc",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Bubblegum syrup",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 370,
      protein: 5,
      carbs: 43,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "118",
    name: "Cerelac Milkshake",
    description: "Creamy Cerelac milkshake with a nostalgic baby food twist",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU5AdFv9L1Ow8IRS0d4mGPuqWV6pz1H9NlQkjT",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Cerelac powder",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 390,
      protein: 6,
      carbs: 45,
      fat: 17,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "119",
    name: "Red Velvet Milkshake",
    description: "Decadent red velvet milkshake with creamy richness",
    price: 90,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGaIQcMDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Milk Shake",
    ingredients: [
      "Milk",
      "Red velvet cake",
      "Vanilla ice cream",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 46,
      fat: 20,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Desserts
  {
    id: "120",
    name: "Molten Cake",
    description:
      "Warm chocolate cake with a gooey center, served with vanilla ice cream",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUHM2crzAlKFudvb3S7yiE0DVBLton5RxOYm4j",
    category: "Desserts",
    ingredients: ["Chocolate cake", "Molten center", "Vanilla ice cream"],
    nutritionalInfo: {
      calories: 420,
      protein: 5,
      carbs: 55,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So rich and delicious!",
        author: "Laila",
      },
    ],
  },
  {
    id: "121",
    name: "Cheesecake",
    description: "Creamy cheesecake with a buttery biscuit base",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPzhAmp8Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Desserts",
    ingredients: ["Cream cheese", "Butter biscuits", "Sugar", "Eggs"],
    nutritionalInfo: {
      calories: 390,
      protein: 6,
      carbs: 40,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Light and smooth!",
        author: "Youssef",
      },
    ],
  },
  {
    id: "122",
    name: "Red Velvet",
    description: "Soft red velvet cake layered with cream cheese frosting",
    price: 85,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU7XMUcKtIx4fvjTtUCV3sznKuARkar1NYEeLb",
    category: "Desserts",
    ingredients: ["Red velvet cake", "Cream cheese", "Butter", "Sugar"],
    nutritionalInfo: {
      calories: 410,
      protein: 4,
      carbs: 48,
      fat: 21,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Beautiful texture and flavor",
        author: "Salma",
      },
    ],
  },
  {
    id: "123",
    name: "Brownies",
    description: "Rich and fudgy chocolate brownies served warm",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUD81NnHYkblqoPpiQXIkLS5TeJgH8YhCayv6E",
    category: "Desserts",
    ingredients: ["Dark chocolate", "Butter", "Flour", "Sugar", "Eggs"],
    nutritionalInfo: {
      calories: 450,
      protein: 5,
      carbs: 50,
      fat: 25,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Perfectly gooey!",
        author: "Omar",
      },
    ],
  },
  {
    id: "124",
    name: "Oreo Madness",
    description: "Crushed Oreos with vanilla ice cream and chocolate drizzle",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVhf9DrWxs9h8fnkU6DvKEwaBiXM0YNHJbcy5",
    category: "Desserts",
    ingredients: ["Oreo cookies", "Vanilla ice cream", "Chocolate sauce"],
    nutritionalInfo: {
      calories: 480,
      protein: 6,
      carbs: 54,
      fat: 26,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "A dream for Oreo lovers!",
        author: "Nadine",
      },
    ],
  },
  {
    id: "125",
    name: "Cheese Madness",
    description:
      "Creamy cheesecake blend with layers of crushed biscuits and ice cream",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUg3KQBtx0kSM21Z9c8XTvAwBFKOqQn7NuzdGL",
    category: "Desserts",
    ingredients: [
      "Cheesecake",
      "Biscuits",
      "Vanilla ice cream",
      "Strawberry sauce",
    ],
    nutritionalInfo: {
      calories: 520,
      protein: 7,
      carbs: 58,
      fat: 29,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Really filling and creamy",
        author: "Tamer",
      },
    ],
  },
  {
    id: "126",
    name: "Ice Cream (3 Scoops)",
    description: "Three scoops of your choice of ice cream flavors",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUe3SXZvTAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Desserts",
    ingredients: ["Ice cream (3 flavors of choice)"],
    nutritionalInfo: {
      calories: 300,
      protein: 3,
      carbs: 36,
      fat: 15,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "So many flavor options!",
        author: "Aya",
      },
    ],
  },
  {
    id: "127",
    name: "Nutella Waffle",
    description: "Warm waffle topped with Nutella and a scoop of ice cream",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUakDtvrMR26IyUN1SzajcmwTO54VLvfgB9XhJ",
    category: "Desserts",
    ingredients: ["Waffle", "Nutella", "Vanilla ice cream"],
    nutritionalInfo: {
      calories: 540,
      protein: 6,
      carbs: 60,
      fat: 28,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Nutella heaven 😍",
        author: "Sarah",
      },
    ],
  },
  {
    id: "128",
    name: "Fruit Waffle",
    description: "Waffle topped with assorted fresh fruits and whipped cream",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnSAl5R0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Desserts",
    ingredients: ["Waffle", "Fresh fruits", "Whipped cream"],
    nutritionalInfo: {
      calories: 510,
      protein: 5,
      carbs: 62,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Fresh and sweet",
        author: "Mostafa",
      },
    ],
  },
  {
    id: "129",
    name: "Mixed Waffle",
    description: "Waffle with both Nutella and fruit toppings",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU8fEY5CutPHwZYf1O0bULcEdyVeFlBJSAna64",
    category: "Desserts",
    ingredients: ["Waffle", "Nutella", "Fruits", "Ice cream"],
    nutritionalInfo: {
      calories: 580,
      protein: 6,
      carbs: 66,
      fat: 30,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Best of both worlds!",
        author: "Lina",
      },
    ],
  },
  {
    id: "130",
    name: "Fruit Salad",
    description: "Fresh seasonal fruit mix served chilled",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvotRhdqnjY14g7hFoJUpd9SsOzCqRcZG6QLP",
    category: "Desserts",
    ingredients: ["Mixed fruits", "Honey (optional)"],
    nutritionalInfo: {
      calories: 150,
      protein: 2,
      carbs: 30,
      fat: 1,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Light and healthy",
        author: "Mona",
      },
    ],
  },
  {
    id: "131",
    name: "Banana Split",
    description: "Classic banana split with 3 scoops of ice cream and toppings",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUOFI2k2HPCQOIfmeoKUD4nzLVd51GNHSXwABi",
    category: "Desserts",
    ingredients: ["Banana", "Ice cream", "Whipped cream", "Chocolate syrup"],
    nutritionalInfo: {
      calories: 430,
      protein: 5,
      carbs: 52,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Classic and satisfying",
        author: "Aly",
      },
    ],
  },
  {
    id: "132",
    name: "Molten Tagine",
    description: "Molten chocolate cake served in a traditional clay pot",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUkxzNJNPQhZNPCwA0XdsTzJYogfuFSERtv6UH",
    category: "Desserts",
    ingredients: ["Chocolate cake", "Molten center", "Clay pot", "Ice cream"],
    nutritionalInfo: {
      calories: 500,
      protein: 6,
      carbs: 58,
      fat: 27,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Amazing presentation and taste!",
        author: "Habiba",
      },
    ],
  },
  {
    id: "133",
    name: "Om Ali Tagine",
    description: "Traditional Egyptian Om Ali dessert baked in a clay pot",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnpLxNd0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Desserts",
    ingredients: ["Puff pastry", "Milk", "Nuts", "Sugar", "Raisins"],
    nutritionalInfo: {
      calories: 460,
      protein: 7,
      carbs: 48,
      fat: 25,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Classic and creamy",
        author: "Amr",
      },
    ],
  },
  {
    id: "134",
    name: "Boom Lava Tagine",
    description:
      "Layers of mille-feuille, chocolate, hohos, ice cream, Oreo, whipped cream in a clay pot",
    price: 95,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUW9MPgi3GdsUmP3yIEkpu8zgqFe19N5hMwCRW",
    category: "Desserts",
    ingredients: [
      "Mille-feuille",
      "Hohos",
      "Chocolate sauce",
      "Ice cream",
      "Oreo",
      "Whipped cream",
    ],
    nutritionalInfo: {
      calories: 620,
      protein: 7,
      carbs: 70,
      fat: 35,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Explosion of flavors!",
        author: "Reem",
      },
    ],
  },
  // Yogurt
  {
    id: "135",
    name: "Yogurt with Honey",
    description:
      "Fresh yogurt with pure natural honey for a healthy and delicious treat",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU8vwyKvSutPHwZYf1O0bULcEdyVeFlBJSAna6",
    category: "Yogurt",
    ingredients: ["Yogurt", "Natural honey"],
    nutritionalInfo: {
      calories: 180,
      protein: 6,
      carbs: 22,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Light and very nutritious",
        author: "Sarah",
      },
    ],
  },
  {
    id: "136",
    name: "Mango Yogurt",
    description: "Fresh yogurt blended with refreshing natural mango sauce",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUQgMZKxTdxTayZCJzi35O8bqeWBMjIN6sQDr2",
    category: "Yogurt",
    ingredients: ["Yogurt", "Mango sauce"],
    nutritionalInfo: {
      calories: 200,
      protein: 6,
      carbs: 26,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Delicious mango flavor!",
        author: "Aly",
      },
    ],
  },
  {
    id: "137",
    name: "Strawberry Yogurt",
    description: "Creamy yogurt mixed with fresh strawberry sauce",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiaYKIHBV19P3GK6yctjUvlDHk2ozxqFhbwsB",
    category: "Yogurt",
    ingredients: ["Yogurt", "Strawberry sauce"],
    nutritionalInfo: {
      calories: 195,
      protein: 6,
      carbs: 25,
      fat: 5,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Great for kids too",
        author: "Lina",
      },
    ],
  },
  {
    id: "138",
    name: "Blueberry Yogurt",
    description: "Creamy yogurt with delicious blueberry sauce",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUwwmfI9LsaTWnwqK9G5iPL8jDkXhdIo12ev7z",
    category: "Yogurt",
    ingredients: ["Yogurt", "Blueberry sauce"],
    nutritionalInfo: {
      calories: 210,
      protein: 7,
      carbs: 27,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Very refreshing and unique taste",
        author: "Nour",
      },
    ],
  },
  {
    id: "139",
    name: "Passion Fruit Yogurt",
    description: "Smooth yogurt with exotic natural passion fruit sauce",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiDDPQTGBV19P3GK6yctjUvlDHk2ozxqFhbws",
    category: "Yogurt",
    ingredients: ["Yogurt", "Passion fruit sauce"],
    nutritionalInfo: {
      calories: 205,
      protein: 6,
      carbs: 26,
      fat: 6,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Exotic and tropical taste",
        author: "Karim",
      },
    ],
  },
  // Soda Drinks
  {
    id: "140",
    name: "Pepsi",
    description: "Classic Pepsi soda drink",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUUfGfGLg6thWlZFBgGk78CoMVrX10nSzdPq6Q",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Caffeine", "Flavorings"],
    nutritionalInfo: {
      calories: 150,
      protein: 0,
      carbs: 41,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "141",
    name: "Pepsi Diet",
    description: "Sugar-free Pepsi soda",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUuS2TSAbpD3RMswYi0dfrkOzgHWSFlo45b71J",
    category: "Soda Drinks",
    ingredients: [
      "Carbonated water",
      "Artificial sweeteners",
      "Caffeine",
      "Flavorings",
    ],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "142",
    name: "Mirinda Orange",
    description: "Fizzy orange soda drink",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUS3CbwZAMIoExBwGjFmK6NWJ8yHdCiOq4TDRX",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Orange flavoring", "Coloring"],
    nutritionalInfo: {
      calories: 160,
      protein: 0,
      carbs: 43,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "143",
    name: "7 Up",
    description: "Refreshing lemon-lime soda",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGcApTGDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Citrus flavoring"],
    nutritionalInfo: {
      calories: 150,
      protein: 0,
      carbs: 39,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "144",
    name: "7 Up Diet",
    description: "Sugar-free lemon-lime soda",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvoNcxKNnjY14g7hFoJUpd9SsOzCqRcZG6QLP",
    category: "Soda Drinks",
    ingredients: [
      "Carbonated water",
      "Artificial sweeteners",
      "Citrus flavoring",
    ],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "145",
    name: "Schweppes Pineapple",
    description: "Pineapple-flavored sparkling soda",
    price: 33,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUDrTeQdkblqoPpiQXIkLS5TeJgH8YhCayv6Ec",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Pineapple flavoring"],
    nutritionalInfo: {
      calories: 155,
      protein: 0,
      carbs: 42,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "146",
    name: "Schweppes Pomegranate",
    description: "Pomegranate-flavored sparkling soda",
    price: 33,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVGiqoBWxs9h8fnkU6DvKEwaBiXM0YNHJbcy5",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Pomegranate flavoring"],
    nutritionalInfo: {
      calories: 160,
      protein: 0,
      carbs: 44,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "147",
    name: "Birell",
    description: "Non-alcoholic malt beverage",
    price: 33,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUwIb8UuLsaTWnwqK9G5iPL8jDkXhdIo12ev7z",
    category: "Soda Drinks",
    ingredients: [
      "Water",
      "Barley malt",
      "Sugar",
      "Carbon dioxide",
      "Flavorings",
    ],
    nutritionalInfo: {
      calories: 130,
      protein: 0,
      carbs: 32,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "148",
    name: "Fayrouz Pineapple",
    description: "Pineapple-flavored malt beverage",
    price: 33,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGPk19M5DFLq6ZIUY0BRpig5aPfV3HN7KECSt",
    category: "Soda Drinks",
    ingredients: ["Water", "Barley malt", "Sugar", "Pineapple flavoring"],
    nutritionalInfo: {
      calories: 135,
      protein: 0,
      carbs: 33,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "149",
    name: "Red Bull",
    description: "Energy drink with caffeine and taurine",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUogDTQr7ehY1VOfQypLjdctRCKEA6l5NzwrqT",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Caffeine", "Taurine"],
    nutritionalInfo: {
      calories: 110,
      protein: 0,
      carbs: 28,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "150",
    name: "Twist Classic",
    description: "Classic fruity soda with refreshing taste",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUiqhtVHBV19P3GK6yctjUvlDHk2ozxqFhbwsB",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Flavorings"],
    nutritionalInfo: {
      calories: 145,
      protein: 0,
      carbs: 38,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "151",
    name: "Twist Berry",
    description: "Berry-flavored soda drink",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUCih45MgcEPXrwmfR0I3Vvz4oyQTHxeOiUM5h",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Berry flavoring"],
    nutritionalInfo: {
      calories: 150,
      protein: 0,
      carbs: 40,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "152",
    name: "Small Water Bottle",
    description: "Small bottled mineral water",
    price: 10,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUUys8GA6thWlZFBgGk78CoMVrX10nSzdPq6Qx",
    category: "Soda Drinks",
    ingredients: ["Mineral water"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "153",
    name: "V Cola",
    description: "Local cola-flavored soft drink",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUazJpYUMR26IyUN1SzajcmwTO54VLvfgB9XhJ",
    category: "Soda Drinks",
    ingredients: ["Carbonated water", "Sugar", "Cola flavoring"],
    nutritionalInfo: {
      calories: 140,
      protein: 0,
      carbs: 37,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  // Brakfast
  {
    id: "154",
    name: "Oriental Breakfast",
    description: "Includes foul, tomato cheese, fries, salad, and baladi bread",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBn5zlFGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Breakfast",
    ingredients: ["Foul", "Tomato cheese", "Fries", "Salad", "Baladi bread"],
    nutritionalInfo: {
      calories: 550,
      protein: 20,
      carbs: 65,
      fat: 25,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "155",
    name: "Tomato Cheese Plate",
    description: "Fresh cheese mixed with diced tomatoes and herbs",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBijMdzGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Breakfast",
    ingredients: ["Cheese", "Tomatoes", "Olive oil", "Herbs"],
    nutritionalInfo: {
      calories: 200,
      protein: 10,
      carbs: 5,
      fat: 15,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "156",
    name: "Foul Plate",
    description: "Classic Egyptian foul with olive oil and cumin",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUW6DtsOC3GdsUmP3yIEkpu8zgqFe19N5hMwCR",
    category: "Breakfast",
    ingredients: ["Fava beans", "Olive oil", "Cumin", "Salt"],
    nutritionalInfo: {
      calories: 250,
      protein: 12,
      carbs: 30,
      fat: 10,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "157",
    name: "Omelette Plate",
    description: "Classic omelette with a pinch of salt and pepper",
    price: 30,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPhFYnr8Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Breakfast",
    ingredients: ["Eggs", "Butter", "Salt", "Pepper"],
    nutritionalInfo: {
      calories: 280,
      protein: 14,
      carbs: 2,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "158",
    name: "Spanish Omelette",
    description: "Omelette with potatoes, onions, and herbs",
    price: 35,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUcSNYhCD5ZeGmATNYO45FCkWlKu8JzHoPIqfb",
    category: "Breakfast",
    ingredients: ["Eggs", "Potatoes", "Onions", "Herbs"],
    nutritionalInfo: {
      calories: 320,
      protein: 13,
      carbs: 20,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "159",
    name: "Mix Cheese Omelette",
    description: "Omelette with a blend of mozzarella and cheddar cheese",
    price: 45,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnb1lkh0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Breakfast",
    ingredients: ["Eggs", "Cheddar cheese", "Mozzarella cheese", "Butter"],
    nutritionalInfo: {
      calories: 350,
      protein: 18,
      carbs: 2,
      fat: 30,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "160",
    name: "Roumi Cheese Omelette",
    description: "Omelette with Egyptian roumi cheese",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU6pg5Ww2d67hLNOqCoZRvUl9bTVEgQ4aYerP2",
    category: "Breakfast",
    ingredients: ["Eggs", "Roumi cheese", "Butter"],
    nutritionalInfo: {
      calories: 340,
      protein: 17,
      carbs: 2,
      fat: 28,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "161",
    name: "Salami Omelette",
    description: "Omelette with sliced salami",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUaFZrnRMR26IyUN1SzajcmwTO54VLvfgB9XhJ",
    category: "Breakfast",
    ingredients: ["Eggs", "Salami", "Butter"],
    nutritionalInfo: {
      calories: 360,
      protein: 19,
      carbs: 2,
      fat: 32,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "162",
    name: "Basterma Omelette",
    description: "Omelette with basterma slices",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUTgmbCWX8mUNEGVJtgIlKFRzDcuhpBOHroL61",
    category: "Breakfast",
    ingredients: ["Eggs", "Basterma", "Butter"],
    nutritionalInfo: {
      calories: 370,
      protein: 20,
      carbs: 2,
      fat: 32,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "163",
    name: "Egyptian Breakfast",
    description: "Traditional breakfast with feteer, cheese, and honey",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUzvLq3jKXskdro25GJKNlDUuv40RHIwq8bCTY",
    category: "Breakfast",
    ingredients: ["Feteer", "Cheese", "Honey"],
    nutritionalInfo: {
      calories: 600,
      protein: 15,
      carbs: 70,
      fat: 30,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Soups
  {
    id: "164",
    name: "Chicken Cream Soup",
    description: "Rich and creamy chicken soup with herbs and a smooth texture",
    price: 65,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUkVNMkTPQhZNPCwA0XdsTzJYogfuFSERtv6UH",
    category: "Soups",
    ingredients: ["Chicken", "Cream", "Butter", "Herbs"],
    nutritionalInfo: {
      calories: 210,
      protein: 12,
      carbs: 8,
      fat: 15,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "165",
    name: "Mushroom Cream Soup",
    description: "Velvety mushroom soup cooked with cream and garlic",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGPvlMjiDFLq6ZIUY0BRpig5aPfV3HN7KECSt",
    category: "Soups",
    ingredients: ["Mushrooms", "Cream", "Garlic", "Butter"],
    nutritionalInfo: {
      calories: 200,
      protein: 6,
      carbs: 9,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "166",
    name: "Vegetable Soup",
    description:
      "A light and healthy mix of seasonal vegetables in clear broth",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUb0AmsUVvW1tDmR2VHhknY037XN48IAvCuLKb",
    category: "Soups",
    ingredients: ["Carrots", "Potatoes", "Peas", "Broth", "Onions"],
    nutritionalInfo: {
      calories: 120,
      protein: 3,
      carbs: 18,
      fat: 4,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "167",
    name: "Orzo Soup",
    description:
      "Classic Egyptian orzo soup made with golden vermicelli and broth",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0ayqsto4U2YJovA1HwaP8C7qNF3Qx6VXcdZm",
    category: "Soups",
    ingredients: ["Orzo pasta", "Butter", "Broth", "Salt"],
    nutritionalInfo: {
      calories: 180,
      protein: 4,
      carbs: 25,
      fat: 8,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "168",
    name: "Chicken Mushroom Soup",
    description: "Creamy soup with tender chicken pieces and fresh mushrooms",
    price: 75,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUeiWkc6TAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Soups",
    ingredients: ["Chicken", "Mushrooms", "Cream", "Butter", "Garlic"],
    nutritionalInfo: {
      calories: 230,
      protein: 14,
      carbs: 7,
      fat: 17,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Appetizers
  {
    id: "169",
    name: "Mozzarella Sticks",
    description:
      "Crispy golden-fried mozzarella sticks served with marinara sauce",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUv13lhpnjY14g7hFoJUpd9SsOzCqRcZG6QLPN",
    category: "Appetizers",
    ingredients: ["Mozzarella cheese", "Breadcrumbs", "Eggs", "Marinara sauce"],
    nutritionalInfo: {
      calories: 320,
      protein: 10,
      carbs: 24,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "170",
    name: "Chicken Strips",
    description: "Tender crispy chicken strips served with honey mustard dip",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvux61onjY14g7hFoJUpd9SsOzCqRcZG6QLPN",
    category: "Appetizers",
    ingredients: ["Chicken breast", "Breadcrumbs", "Spices", "Dip"],
    nutritionalInfo: {
      calories: 350,
      protein: 22,
      carbs: 15,
      fat: 20,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "171",
    name: "Onion Rings",
    description: "Crispy battered onion rings served with a side of sauce",
    price: 40,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0twwt7io4U2YJovA1HwaP8C7qNF3Qx6VXcdZ",
    category: "Appetizers",
    ingredients: ["Onions", "Batter", "Breadcrumbs", "Spices"],
    nutritionalInfo: {
      calories: 280,
      protein: 4,
      carbs: 30,
      fat: 16,
    },
    isVegan: true,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "172",
    name: "Cheese Sambousak",
    description: "Crispy pastry stuffed with a mix of melted cheeses",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUUfTEABv6thWlZFBgGk78CoMVrX10nSzdPq6Q",
    category: "Appetizers",
    ingredients: ["Pastry", "Mixed cheese", "Spices"],
    nutritionalInfo: {
      calories: 200,
      protein: 6,
      carbs: 18,
      fat: 12,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "173",
    name: "Meat Sambousak",
    description: "Golden pastry filled with seasoned minced meat",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZoQxpNzYzGX7mJRuxDMkPpLtdw3VqrfSAUb4",
    category: "Appetizers",
    ingredients: ["Pastry", "Minced beef", "Onions", "Spices"],
    nutritionalInfo: {
      calories: 230,
      protein: 8,
      carbs: 17,
      fat: 15,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "174",
    name: "Cheesy Jalapeño Fries",
    description: "Fries topped with melted cheese and spicy jalapeño slices",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUku05DssPQhZNPCwA0XdsTzJYogfuFSERtv6U",
    category: "Appetizers",
    ingredients: ["Fries", "Cheese", "Jalapeños"],
    nutritionalInfo: {
      calories: 340,
      protein: 6,
      carbs: 30,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "175",
    name: "Buffalo Chicken",
    description: "Spicy buffalo-style chicken pieces served with ranch dip",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZCxganzYzGX7mJRuxDMkPpLtdw3VqrfSAUb4",
    category: "Appetizers",
    ingredients: ["Chicken", "Buffalo sauce", "Spices", "Dip"],
    nutritionalInfo: {
      calories: 310,
      protein: 20,
      carbs: 10,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "176",
    name: "Mombar",
    description: "Traditional Egyptian beef sausage stuffed with spiced rice",
    price: 70,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGhzKp2DFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Appetizers",
    ingredients: ["Beef sausage", "Rice", "Tomatoes", "Spices"],
    nutritionalInfo: {
      calories: 390,
      protein: 10,
      carbs: 35,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Salads
  {
    id: "177",
    name: "Chicken Caesar Salad",
    description:
      "Grilled chicken breast on a bed of fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
    price: 90,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUuIaJl8bpD3RMswYi0dfrkOzgHWSFlo45b71J",
    category: "Salads",
    ingredients: [
      "Grilled chicken breast",
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing",
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 25,
      carbs: 12,
      fat: 18,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "178",
    name: "Greek Salad",
    description:
      "A refreshing mix of cucumbers, tomatoes, olives, red onions, feta cheese, and olive oil",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUGwrk9CDFLq6ZIUY0BRpig5aPfV3HN7KECStk",
    category: "Salads",
    ingredients: [
      "Cucumbers",
      "Tomatoes",
      "Olives",
      "Red onions",
      "Feta cheese",
      "Olive oil",
    ],
    nutritionalInfo: {
      calories: 220,
      protein: 5,
      carbs: 10,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "179",
    name: "Green Salad",
    description:
      "A simple mix of fresh greens, cucumbers, and tomatoes with light vinaigrette",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUeCmZgQTAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Salads",
    ingredients: ["Mixed greens", "Cucumbers", "Tomatoes", "Vinaigrette"],
    nutritionalInfo: {
      calories: 120,
      protein: 2,
      carbs: 8,
      fat: 8,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "180",
    name: "Tuna Salad",
    description:
      "Light and healthy tuna mixed with fresh greens, corn, cucumbers, and olives",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvoozaNVnjY14g7hFoJUpd9SsOzCqRcZG6QLP",
    category: "Salads",
    ingredients: ["Tuna", "Mixed greens", "Corn", "Cucumbers", "Olives"],
    nutritionalInfo: {
      calories: 280,
      protein: 22,
      carbs: 10,
      fat: 16,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  // Main Dishes
  {
    id: "181",
    name: "Grilled Chicken",
    description:
      "Grilled chicken breast served with your choice of sauce: mushroom, pepper, or roquefort cheese",
    price: 200,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUIq51ZBifvbzS4NlhYcJ8VeOg7U1rpPD630Xo",
    category: "Main Dishes",
    ingredients: [
      "Grilled chicken breast",
      "Mushroom sauce",
      "Pepper sauce",
      "Roquefort cheese sauce",
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 38,
      carbs: 10,
      fat: 25,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "182",
    name: "Cordon Bleu",
    description:
      "Stuffed chicken breast with turkey, salami, and cheese, breaded and fried",
    price: 230,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPbvvxKs8Q8ErJP7q4lpH9RO3CTjtBgnaSmUK",
    category: "Main Dishes",
    ingredients: [
      "Chicken breast",
      "Turkey",
      "Salami",
      "Cheese",
      "Breadcrumbs",
    ],
    nutritionalInfo: {
      calories: 540,
      protein: 34,
      carbs: 22,
      fat: 32,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "183",
    name: "Chicken Curry",
    description: "Chicken breast cooked in a rich and creamy curry sauce",
    price: 200,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPXEVKf8Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Main Dishes",
    ingredients: ["Chicken breast", "Curry sauce", "Spices", "Cream"],
    nutritionalInfo: {
      calories: 410,
      protein: 30,
      carbs: 14,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "184",
    name: "Chicken Lemon",
    description: "Chicken breast cooked in a fresh lemon sauce",
    price: 200,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUM3t5jrZBwCQDbIAOWTfX61LkHepK2u5lciGS",
    category: "Main Dishes",
    ingredients: ["Chicken breast", "Lemon juice", "Garlic", "Butter", "Herbs"],
    nutritionalInfo: {
      calories: 390,
      protein: 28,
      carbs: 8,
      fat: 22,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "185",
    name: "Chicken Fajita",
    description:
      "Sizzling chicken strips served with sautéed bell peppers and onions",
    price: 200,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSURIZYS9QaYOMP6IEhkl1Qr0mtzUFLcAWKBDey",
    category: "Main Dishes",
    ingredients: ["Chicken strips", "Bell peppers", "Onions", "Spices"],
    nutritionalInfo: {
      calories: 430,
      protein: 32,
      carbs: 16,
      fat: 24,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "186",
    name: "Chicken Strips",
    description: "Crispy chicken strips served with dipping sauce",
    price: 210,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUPCWZzR8Q8ErJP7q4lpH9RO3CTjtBgnaSmUKA",
    category: "Main Dishes",
    ingredients: ["Chicken breast", "Breadcrumbs", "Spices", "Dipping sauce"],
    nutritionalInfo: {
      calories: 380,
      protein: 26,
      carbs: 18,
      fat: 20,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "187",
    name: "Chicken Demi-glace",
    description: "Tender chicken served with rich demi-glace sauce",
    price: 225,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnXVO5j0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Main Dishes",
    ingredients: [
      "Chicken breast",
      "Demi-glace sauce",
      "Butter",
      "Onions",
      "Carrots",
    ],
    nutritionalInfo: {
      calories: 440,
      protein: 33,
      carbs: 12,
      fat: 26,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "188",
    name: "Chicken Country",
    description: "Crispy fried chicken breast with special Lava sauce",
    price: 230,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU1yqxzQSsnZvxSyRQgYElJa0D9LhBq7V2f8Wj",
    category: "Main Dishes",
    ingredients: ["Crispy chicken breast", "Lava signature sauce"],
    nutritionalInfo: {
      calories: 460,
      protein: 30,
      carbs: 20,
      fat: 28,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "189",
    name: "Lava Mix",
    description: "Mixed grill plate with shish tawook, kofta, and sausages",
    price: 250,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUcKs62Y5ZeGmATNYO45FCkWlKu8JzHoPIqfb9",
    category: "Main Dishes",
    ingredients: ["Shish tawook", "Kofta", "Sausages", "Grilled vegetables"],
    nutritionalInfo: {
      calories: 620,
      protein: 40,
      carbs: 18,
      fat: 38,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Pizzas
  {
    id: "190",
    name: "Margherita",
    description: "Classic pizza with tomato sauce and mozzarella cheese",
    price: 85,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUbWFwjPvW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Pizza",
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Basil"],
    nutritionalInfo: {
      calories: 780,
      protein: 22,
      carbs: 95,
      fat: 30,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Simple and delicious!",
        author: "Youssef",
      },
    ],
  },
  {
    id: "191",
    name: "Chicken BBQ",
    description: "Pizza topped with BBQ chicken, mozzarella, and onions",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUHshAtklKFudvb3S7yiE0DVBLton5RxOYm4jc",
    category: "Pizza",
    ingredients: ["BBQ sauce", "Chicken", "Mozzarella", "Onions"],
    nutritionalInfo: {
      calories: 880,
      protein: 30,
      carbs: 100,
      fat: 35,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Loved the BBQ flavor!",
        author: "Nada",
      },
    ],
  },
  {
    id: "192",
    name: "Chicken Ranch",
    description: "Ranch base pizza topped with grilled chicken and mozzarella",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBNt30aGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Pizza",
    ingredients: ["Ranch sauce", "Grilled chicken", "Mozzarella"],
    nutritionalInfo: {
      calories: 850,
      protein: 28,
      carbs: 95,
      fat: 33,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Creamy and tasty",
        author: "Omar",
      },
    ],
  },
  {
    id: "193",
    name: "Chicken Pesto",
    description: "Pizza with basil pesto, grilled chicken, and mozzarella",
    price: 120,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU19du8dfSsnZvxSyRQgYElJa0D9LhBq7V2f8W",
    category: "Pizza",
    ingredients: ["Basil pesto", "Grilled chicken", "Mozzarella"],
    nutritionalInfo: {
      calories: 870,
      protein: 27,
      carbs: 93,
      fat: 34,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Very fresh and aromatic",
        author: "Mariam",
      },
    ],
  },
  {
    id: "194",
    name: "Quattro Formaggi",
    description:
      "Four cheese pizza with mozzarella, cheddar, parmesan, and blue cheese",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUZk65t4zYzGX7mJRuxDMkPpLtdw3VqrfSAUb4",
    category: "Pizza",
    ingredients: ["Mozzarella", "Cheddar", "Parmesan", "Blue cheese"],
    nutritionalInfo: {
      calories: 950,
      protein: 30,
      carbs: 90,
      fat: 45,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Cheese heaven!",
        author: "Sarah",
      },
    ],
  },
  {
    id: "195",
    name: "Sujuk",
    description: "Pizza with spicy sujuk sausage, mozzarella, and tomato sauce",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU2Mwz82fbhRQCGPIwVYEUuO7fZW5oJirpmgxt",
    category: "Pizza",
    ingredients: ["Sujuk", "Mozzarella", "Tomato sauce"],
    nutritionalInfo: {
      calories: 900,
      protein: 29,
      carbs: 92,
      fat: 37,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Spicy and flavorful",
        author: "Ahmed",
      },
    ],
  },
  {
    id: "196",
    name: "Tuna",
    description: "Pizza with tuna, mozzarella, and olives",
    price: 140,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUg1eohHx0kSM21Z9c8XTvAwBFKOqQn7NuzdGL",
    category: "Pizza",
    ingredients: ["Tuna", "Mozzarella", "Olives"],
    nutritionalInfo: {
      calories: 850,
      protein: 28,
      carbs: 88,
      fat: 33,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 3,
        comment: "Good but a bit salty",
        author: "Ramy",
      },
    ],
  },
  {
    id: "197",
    name: "Salami",
    description:
      "Pizza topped with salami slices, mozzarella, and tomato sauce",
    price: 140,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUxT1tVapMsU09ibeulO34k6a1NcS8YC7DTnjB",
    category: "Pizza",
    ingredients: ["Salami", "Mozzarella", "Tomato sauce"],
    nutritionalInfo: {
      calories: 920,
      protein: 30,
      carbs: 90,
      fat: 40,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Tastes like Italy!",
        author: "Fady",
      },
    ],
  },
  {
    id: "198",
    name: "Hot Dog",
    description:
      "Pizza with sliced hot dogs, mozzarella, and ketchup-mustard mix",
    price: 120,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUDHuqhXkblqoPpiQXIkLS5TeJgH8YhCayv6Ec",
    category: "Pizza",
    ingredients: ["Hot dog", "Mozzarella", "Ketchup", "Mustard"],
    nutritionalInfo: {
      calories: 870,
      protein: 26,
      carbs: 92,
      fat: 35,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Fun and different!",
        author: "Zeinab",
      },
    ],
  },
  {
    id: "199",
    name: "Super Supreme",
    description: "Pizza with pepperoni, veggies, olives, and mozzarella",
    price: 140,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU2TrzPOvfbhRQCGPIwVYEUuO7fZW5oJirpmgx",
    category: "Pizza",
    ingredients: ["Pepperoni", "Bell peppers", "Olives", "Mozzarella"],
    nutritionalInfo: {
      calories: 940,
      protein: 31,
      carbs: 97,
      fat: 38,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Full of flavor!",
        author: "Salma",
      },
    ],
  },
  {
    id: "200",
    name: "Vegetarian",
    description: "Pizza with assorted vegetables and mozzarella cheese",
    price: 95,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUNyO6k2bwptjPTHhRQcvqSJyrf4xaIMVXOul7",
    category: "Pizza",
    ingredients: [
      "Tomato sauce",
      "Mozzarella",
      "Mushrooms",
      "Olives",
      "Peppers",
    ],
    nutritionalInfo: {
      calories: 800,
      protein: 20,
      carbs: 85,
      fat: 28,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "Great veggie option",
        author: "Ali",
      },
    ],
  },
  {
    id: "201",
    name: "Lava Pizza",
    description:
      "Our signature pizza with a mix of meats, veggies, and secret lava sauce",
    price: 150,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUc9vcz85ZeGmATNYO45FCkWlKu8JzHoPIqfb9",
    category: "Pizza",
    ingredients: ["Mozzarella", "Mixed meats", "Veggies", "Lava sauce"],
    nutritionalInfo: {
      calories: 1000,
      protein: 34,
      carbs: 100,
      fat: 42,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "This one is a beast! Loved it",
        author: "Nour",
      },
    ],
  },
  // Bowls
  {
    id: "202",
    name: "Cheese Fries Bowl",
    description: "Fries topped with melted cheese and special spices",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUuIzjoHbpD3RMswYi0dfrkOzgHWSFlo45b71J",
    category: "Bowls",
    ingredients: ["Fries", "Cheddar cheese", "Spices"],
    nutritionalInfo: {
      calories: 780,
      protein: 12,
      carbs: 72,
      fat: 44,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "سخنة ومليانة جبنة ❤️",
        author: "Youssef",
      },
    ],
  },
  {
    id: "203",
    name: "Chicken Strips Bowl",
    description: "Crispy chicken strips served over fries with special sauces",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUDxyLetkblqoPpiQXIkLS5TeJgH8YhCayv6Ec",
    category: "Bowls",
    ingredients: ["Chicken strips", "Fries", "Sauces"],
    nutritionalInfo: {
      calories: 890,
      protein: 28,
      carbs: 66,
      fat: 46,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "مقرمش ولذيذ جدًا",
        author: "Omar",
      },
    ],
  },
  {
    id: "204",
    name: "Sujuk Bowl",
    description: "Spicy sujuk slices over fries with melted cheese and sauces",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUJZ47cyOMgCnOzaKf8XimNZuSq0wGLjv1rope",
    category: "Bowls",
    ingredients: ["Sujuk", "Fries", "Cheese", "Sauces"],
    nutritionalInfo: {
      calories: 950,
      protein: 25,
      carbs: 75,
      fat: 52,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "حراق ومليان نكهة🔥",
        author: "Kareem",
      },
    ],
  },
  {
    id: "205",
    name: "Lava Bowl",
    description:
      "Fries topped with fajita mix, cheese blend, and Lava’s special sauce",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUcU7rbN5ZeGmATNYO45FCkWlKu8JzHoPIqfb9",
    category: "Bowls",
    ingredients: ["Fries", "Chicken fajita", "Cheese mix", "Lava sauce"],
    nutritionalInfo: {
      calories: 1050,
      protein: 32,
      carbs: 78,
      fat: 58,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "أقوى طاسة ممكن تجربها! 🔥",
        author: "Hossam",
      },
    ],
  },
  // Pasta
  {
    id: "206",
    name: "Lava Pasta",
    description:
      "Pasta mixed with cheddar cheese sauce and your choice of chicken (grilled or crispy)",
    price: 140,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUzV6OPrBKXskdro25GJKNlDUuv40RHIwq8bCT",
    category: "Pasta",
    ingredients: ["Pasta", "Cheddar sauce", "Grilled or Crispy Chicken"],
    nutritionalInfo: {
      calories: 980,
      protein: 34,
      carbs: 84,
      fat: 48,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "صوص الشيدر خرافي مع الفراخ!",
        author: "Salma",
      },
    ],
  },
  {
    id: "207",
    name: "Negresco",
    description:
      "Creamy pasta baked with chicken, mushrooms, and mozzarella cheese",
    price: 125,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU8vmjtyvutPHwZYf1O0bULcEdyVeFlBJSAna6",
    category: "Pasta",
    ingredients: ["Pasta", "Chicken", "Mushrooms", "Cream sauce", "Mozzarella"],
    nutritionalInfo: {
      calories: 1030,
      protein: 36,
      carbs: 90,
      fat: 50,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "تقيلة بس طعمها حكاية 🔥",
        author: "Nour",
      },
    ],
  },
  {
    id: "208",
    name: "Alfredo Pasta",
    description: "Classic creamy Alfredo sauce with chicken and mushrooms",
    price: 115,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUlZMTtECaCvAHwEL3o6J5qcOeP2iKaN0jQp1F",
    category: "Pasta",
    ingredients: ["Pasta", "Chicken", "Mushrooms", "Alfredo sauce"],
    nutritionalInfo: {
      calories: 950,
      protein: 32,
      carbs: 85,
      fat: 46,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "ألفريدو مظبوطة جداً 💯",
        author: "Ola",
      },
    ],
  },
  {
    id: "209",
    name: "Sujuk Pasta",
    description: "Spicy sujuk with penne pasta in tomato sauce",
    price: 115,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU2doli3fbhRQCGPIwVYEUuO7fZW5oJirpmgxt",
    category: "Pasta",
    ingredients: ["Pasta", "Sujuk", "Tomato sauce", "Spices"],
    nutritionalInfo: {
      calories: 870,
      protein: 28,
      carbs: 82,
      fat: 40,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [
      {
        rating: 4,
        comment: "حراق ومليان نكهة 🔥",
        author: "Tamer",
      },
    ],
  },
  {
    id: "210",
    name: "Arrabiata",
    description: "Spicy tomato sauce with garlic and herbs on penne pasta",
    price: 80,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnOPIAK0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Pasta",
    ingredients: ["Penne pasta", "Tomato sauce", "Garlic", "Chili", "Herbs"],
    nutritionalInfo: {
      calories: 730,
      protein: 14,
      carbs: 92,
      fat: 28,
    },
    isVegan: true,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 3,
        comment: "حلوة بس سبايسي زيادة شوية 🌶️",
        author: "Hagar",
      },
    ],
  },
  {
    id: "211",
    name: "Spaghetti Bolognese",
    description: "Traditional spaghetti with rich meat Bolognese sauce",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUbcnhBMvW1tDmR2VHhknY037XN48IAvCuLKbl",
    category: "Pasta",
    ingredients: [
      "Spaghetti",
      "Ground beef",
      "Tomato sauce",
      "Onion",
      "Garlic",
    ],
    nutritionalInfo: {
      calories: 880,
      protein: 30,
      carbs: 86,
      fat: 38,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "كلاسيك بس لذيذ جداً 🍝",
        author: "Yassin",
      },
    ],
  },
  {
    id: "212",
    name: "Chicken Pesto Pasta",
    description: "Penne pasta with pesto sauce and grilled chicken",
    price: 120,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUBHsRfxGYWwk3mqd10pZ4yn9obO5CR7S8jJac",
    category: "Pasta",
    ingredients: ["Pasta", "Pesto sauce", "Grilled chicken", "Parmesan"],
    nutritionalInfo: {
      calories: 940,
      protein: 34,
      carbs: 80,
      fat: 44,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "البيستو ناعم وطازة جدًا! 🌿",
        author: "Dina",
      },
    ],
  },
  // Sandwiches
  {
    id: "213",
    name: "Chicken Ranch Sandwich",
    description: "Grilled chicken breast with ranch sauce and fresh toppings",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUCp4BZuhgcEPXrwmfR0I3Vvz4oyQTHxeOiUM5",
    category: "Sandwiches",
    ingredients: ["Grilled chicken", "Ranch sauce", "Lettuce", "Tomato"],
    nutritionalInfo: {
      calories: 750,
      protein: 30,
      carbs: 60,
      fat: 38,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "214",
    name: "Chicken Country Sandwich",
    description: "Crispy chicken breast with signature Lava sauce",
    price: 85,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUemc9nJTAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Sandwiches",
    ingredients: ["Crispy chicken", "Lava sauce", "Pickles", "Lettuce"],
    nutritionalInfo: {
      calories: 830,
      protein: 28,
      carbs: 64,
      fat: 44,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "215",
    name: "Grilled Chicken Sandwich",
    description: "Juicy grilled chicken with light dressing and greens",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUmhXvpKNwRdhZKxLQsW2V9YPty8erXkfv0MJn",
    category: "Sandwiches",
    ingredients: ["Grilled chicken", "Lettuce", "Tomato", "Sauce"],
    nutritionalInfo: {
      calories: 720,
      protein: 32,
      carbs: 55,
      fat: 36,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "216",
    name: "Chicken Fajita Sandwich",
    description: "Marinated chicken with sautéed peppers and onions",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUL0UJGVyYvXMsxgpZynhWc3CeFGdS5z4iDIBq",
    category: "Sandwiches",
    ingredients: ["Chicken", "Bell peppers", "Onions", "Spices"],
    nutritionalInfo: {
      calories: 760,
      protein: 29,
      carbs: 58,
      fat: 40,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "217",
    name: "Cordon Bleu Sandwich",
    description: "Chicken breast stuffed with turkey, salami, and cheese",
    price: 115,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUeh3x4sTAq0shzXm9W7xvIwbgGrBV6RQnJyfK",
    category: "Sandwiches",
    ingredients: ["Chicken", "Turkey", "Salami", "Cheese"],
    nutritionalInfo: {
      calories: 890,
      protein: 35,
      carbs: 66,
      fat: 50,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "218",
    name: "Shish Tawook Sandwich",
    description: "Grilled shish tawook with garlic sauce and pickles",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUJlzoLlPOMgCnOzaKf8XimNZuSq0wGLjv1rop",
    category: "Sandwiches",
    ingredients: ["Shish tawook", "Garlic sauce", "Pickles"],
    nutritionalInfo: {
      calories: 740,
      protein: 30,
      carbs: 60,
      fat: 36,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "219",
    name: "Chicken Lava Sandwich",
    description: "Chicken breast with turkey, salami, and Lava’s special sauce",
    price: 120,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVUUuDLhWxs9h8fnkU6DvKEwaBiXM0YNHJbcy",
    category: "Sandwiches",
    ingredients: ["Chicken", "Turkey", "Salami", "Lava sauce"],
    nutritionalInfo: {
      calories: 880,
      protein: 33,
      carbs: 65,
      fat: 46,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "220",
    name: "Liver Sandwich",
    description: "Spiced Alexandrian liver with tahini and pickles",
    price: 50,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUnhncCX0z8AHYoTZLh2UMC4xQqRejJpyVtIrW",
    category: "Sandwiches",
    ingredients: ["Beef liver", "Tahini", "Pickles", "Spices"],
    nutritionalInfo: {
      calories: 750,
      protein: 28,
      carbs: 50,
      fat: 42,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "221",
    name: "Sujuk Sandwich",
    description: "Spicy sujuk sausage sandwich with tomato and cheese",
    price: 60,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUIumqrifvbzS4NlhYcJ8VeOg7U1rpPD630Xod",
    category: "Sandwiches",
    ingredients: ["Sujuk", "Cheese", "Tomato", "Spices"],
    nutritionalInfo: {
      calories: 780,
      protein: 26,
      carbs: 52,
      fat: 48,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "222",
    name: "Mexicano Hotdog",
    description: "Hotdog with spicy Mexican toppings",
    price: 55,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUTPHohyX8mUNEGVJtgIlKFRzDcuhpBOHroL61",
    category: "Sandwiches",
    ingredients: ["Hotdog", "Spices", "Onions", "Jalapeños"],
    nutritionalInfo: {
      calories: 740,
      protein: 22,
      carbs: 50,
      fat: 42,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: false,
    reviews: [],
  },
  {
    id: "223",
    name: "Classic Burger",
    description: "Classic beef burger with lettuce, tomato, and sauce",
    price: 90,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU326LFZxUREXU7lyI6kGquQzD3atp9c1emhj8",
    category: "Sandwiches",
    ingredients: ["Beef patty", "Lettuce", "Tomato", "Burger sauce"],
    nutritionalInfo: {
      calories: 850,
      protein: 30,
      carbs: 58,
      fat: 48,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "224",
    name: "Cheese Burger",
    description: "Beef burger with melted cheese and classic toppings",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUlU6g6faCvAHwEL3o6J5qcOeP2iKaN0jQp1Ft",
    category: "Sandwiches",
    ingredients: ["Beef patty", "Cheddar cheese", "Lettuce", "Tomato"],
    nutritionalInfo: {
      calories: 880,
      protein: 32,
      carbs: 60,
      fat: 50,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: false,
    reviews: [],
  },
  {
    id: "225",
    name: "Mushroom Burger",
    description: "Beef burger with sautéed mushrooms and cheese",
    price: 100,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUSso6rJAMIoExBwGjFmK6NWJ8yHdCiOq4TDRX",
    category: "Sandwiches",
    ingredients: ["Beef patty", "Mushrooms", "Cheese", "Sauce"],
    nutritionalInfo: {
      calories: 900,
      protein: 33,
      carbs: 62,
      fat: 52,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: false,
    isNew: true,
    reviews: [],
  },
  {
    id: "226",
    name: "Lava Burger",
    description: "Burger patty with turkey and salami, Lava's signature twist",
    price: 130,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUVkyEdMWxs9h8fnkU6DvKEwaBiXM0YNHJbcy5",
    category: "Sandwiches",
    ingredients: ["Beef patty", "Turkey", "Salami", "Lava sauce"],
    nutritionalInfo: {
      calories: 950,
      protein: 34,
      carbs: 60,
      fat: 56,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "227",
    name: "Boom Cheese Lava Burger",
    description: "Beef patty with crispy cheese, turkey, salami and Lava sauce",
    price: 170,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUvuF7Q7njY14g7hFoJUpd9SsOzCqRcZG6QLPN",
    category: "Sandwiches",
    ingredients: [
      "Beef patty",
      "Crispy cheese",
      "Turkey",
      "Salami",
      "Lava sauce",
    ],
    nutritionalInfo: {
      calories: 1050,
      protein: 36,
      carbs: 62,
      fat: 64,
    },
    isVegan: false,
    isGlutenFree: false,
    isPopular: true,
    isNew: true,
    reviews: [],
  },
  // Hookah
  {
    id: "228",
    name: "Regular Hookah",
    description: "Classic molasses shisha with your favorite flavor",
    price: 25,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUa40P8YMR26IyUN1SzajcmwTO54VLvfgB9XhJ",
    category: "Hookah",
    ingredients: ["Molasses", "Coal", "Hookah base"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Smooth smoke and great flavor",
        author: "Omar",
      },
    ],
  },
  {
    id: "229",
    name: "Special Hookah",
    description: "Premium shisha with enhanced flavors and smooth draw",
    price: 90,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUgJV1YZdx0kSM21Z9c8XTvAwBFKOqQn7NuzdG",
    category: "Hookah",
    ingredients: ["Premium molasses", "Ice filter", "Fruit head"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: false,
    reviews: [
      {
        rating: 5,
        comment: "Absolutely worth it!",
        author: "Marwan",
      },
    ],
  },
  {
    id: "230",
    name: "Lava Mix Hookah",
    description: "A signature mix of exotic flavors only at Lava",
    price: 110,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUIjkA3wifvbzS4NlhYcJ8VeOg7U1rpPD630Xo",
    category: "Hookah",
    ingredients: ["Secret flavor mix", "Fruit head", "Ice chamber"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Unique and refreshing",
        author: "Youssef",
      },
    ],
  },
  {
    id: "231",
    name: "Lava Volcano Hookah",
    description: "A wild burst of flavors with extra cool smoke effect",
    price: 125,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUaeRPlcMR26IyUN1SzajcmwTO54VLvfgB9XhJ",
    category: "Hookah",
    ingredients: ["Frozen fruit", "Molasses mix", "Dry ice"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: false,
    isGlutenFree: true,
    isPopular: true,
    isNew: true,
    reviews: [
      {
        rating: 5,
        comment: "Mind-blowing presentation and flavor!",
        author: "Laila",
      },
    ],
  },
  {
    id: "232",
    name: "Glass Medical Hose",
    description: "Premium glass hookah hose for a smooth draw",
    price: 15,
    image:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUJlVKYPTOMgCnOzaKf8XimNZuSq0wGLjv1rop",
    category: "Hookah",
    ingredients: ["Glass", "Silicone"],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    isVegan: true,
    isGlutenFree: true,
    isPopular: false,
    isNew: false,
    reviews: [
      {
        rating: 4,
        comment: "Smooth and clean hits",
        author: "Ahmed",
      },
    ],
  },
];
export const CATEGORIES = [...new Set(MENU_ITEMS.map((item) => item.category))];
