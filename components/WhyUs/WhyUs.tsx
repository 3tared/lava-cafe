import { whyUs } from "@/constants";
import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";

const WhyUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={whyUs} />
    </div>
  );
};

export default WhyUs;
