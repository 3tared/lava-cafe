import ContactForm from "@/components/ContactForm/ContactForm";
import ContactIntro from "@/components/ContactIntro/ContactIntro";

import React from "react";

const ContactusPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
      <section className="w-full text-center">
        <ContactIntro />
      </section>
      <section className="w-full text-center mb-10 md:mb-15 lg:mb-20 space-y-10">
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactusPage;
