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
// import engagment2 from "@/app/assets/engagment2.jpeg";
// import all from "@/app/assets/alllava.png";
import { ICafePackage } from "./types";

export const ownerPhoneNumber = "+201148494119";
export const managerPhoneNumber = "+201223411732";

export const mainlogo = {
  src: LogoImage,
  alt: "logo",
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
