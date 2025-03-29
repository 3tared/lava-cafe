import { slideMenuData } from "@/constants";
import React from "react";
import { Carousel } from "../ui/carousel";

const Curesol = () => {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideMenuData} />
    </div>
  );
};

export default Curesol;
