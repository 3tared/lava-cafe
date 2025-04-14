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
