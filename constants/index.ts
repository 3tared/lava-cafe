import LogoImage from "@/app/assets/logolava.svg";
import facebook from "@/app/assets/facebook.svg";
import insta from "@/app/assets/insta.svg";
import tiktok from "@/app/assets/tiktok.svg";
import heroImage from "@/app/assets/heromain.jpeg";
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
