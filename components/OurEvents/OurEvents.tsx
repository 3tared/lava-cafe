import React from "react";
import { ourEvents } from "@/constants";
import CardComponent from "../CardComponent/CardComponent";

const OurEvents = () => {
  return (
    <div className="bg-lavasecondary-400 bg-opacity-30 rounded-lg shadow-lg w-full">
      <div className="w-full p-4 pt-6 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {ourEvents.map((event, index) => (
            <div key={index} className="w-full" style={{ width: "100%" }}>
              <CardComponent data={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurEvents;
