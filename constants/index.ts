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

import { TeamSection } from "../types";

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

export const contactInfo2 = {
  companyName: "Lava Café",
  details: [
    {
      type: "location",
      title: "Our Location",
      value: "32 El Central Street, Mokattam, Cairo",
      bgColor: "bg-blue-600",
    },
    {
      type: "phone",
      title: "Phone Number",
      value: "+201148494119",
      bgColor: "bg-green-500",
    },
    {
      type: "email",
      title: "Email Address",
      value: "lavaacafee@gmail.com",
      bgColor: "bg-red-500",
    },
    {
      type: "hours",
      title: "Working Hours",
      value: "Open Daily: 9 AM - 3 AM",
      bgColor: "bg-yellow-500",
    },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.4803989587585!2d31.29835622499086!3d30.011794120117987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145839faa5560081%3A0x36608dad604b7c9f!2sLava%20Cafe!5e1!3m2!1sar!2seg!4v1745263104022!5m2!1sar!2seg",

  // Detailed hours
  hours: [
    { day: "Monday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Tuesday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Wednesday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Thursday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Friday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Saturday", hours: "9:00 AM - 3:00 AM", isClosed: false },
    { day: "Sunday", hours: "9:00 AM - 3:00 AM", isClosed: false },
  ],

  specialNotes:
    "We offer special arrangements for private events and celebrations. Contact us for more details!",

  socialLinks: [
    {
      name: "Facebook",
      url: "https://www.facebook.com/lavacafe.reg",
      iconColor: "text-blue-500",
      hoverBg: "bg-gradient-to-r from-blue-600 to-blue-400",
      hoverColor:
        "hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/lavaa.cafe.restaurant",
      iconColor: "text-pink-600",
      hoverBg: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:bg-gradient-to-r from-purple-500 to-pink-500",
    },
  ],

  // Frequently asked questions
  faq: [
    {
      question: "What are the birthday package prices?",
      answer:
        "We offer 4 packages starting at EGP 40 (includes Pepsi only) up to EGP 80 (includes premium gateaux from Lareine, Pepsi, mini pizza, and mini pâté).",
    },
    {
      question: "Is there a discount for large bookings?",
      answer:
        "Yes! For bookings of 80 guests or more, you get EGP 5 off per person on any package, plus free professional photography.",
    },
    {
      question: "Do you host events other than birthdays?",
      answer:
        "Absolutely! We host engagements, weddings, mini weddings, graduations, baby showers, aqiqahs, and conferences.",
    },
  ],

  // For social proof
  visitorCount: 15780,

  // If you have multiple locations
  branches: [
    {
      name: "Lava Café Mokattam",
      address: "32 El Central Street, Mokattam, Cairo",
      phone: "+201148494119",
      directions: "https://maps.app.goo.gl/oMMuuqHPL2W2iycS9?g_st=aw",
    },
  ],
};

export const announcements = [
  {
    imageUrl:
      "https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUd0FmGpCJM4quD6CvO7aiw3sU1XbAkxI8KGhg",
    title: "We're Hiring!",
    description:
      "Join our team of talented catains , stewards , baristas and more. Apply now for positions available.",
    link: "/careers",
    linkText: "Apply Now",
    badge: "New",
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
      {
        id: "service-8",
        name: "ziad",
        position: "Waiter",
        bio: "ss",
      },
    ],
  },
];

// About section content
export const aboutContent = {
  title: "About Our Café",
  paragraphs: [
    'Welcome to <span class="font-semibold text-lavasecondary-500">Lava Café</span>, established in 2024 with a simple idea — to create a cozy, unique spot for coffee lovers to relax and enjoy exceptional brews in a welcoming atmosphere.',
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
