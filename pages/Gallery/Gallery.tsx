import GalleryLava from "@/components/GalleryLava/GalleryLava";
import GradientHeading from "@/components/ui/GradientHeading";

const GalleryPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center mt-7 md:mt-12 lg:mt-15 xl:mt-20 min-h-screen px-4">
      <section className="w-full text-center my-5 sm:my-5 md:my-7 lg:mb-10 space-y-10">
        <GradientHeading>See More About Our Gallery</GradientHeading>
        <GalleryLava />
      </section>
    </main>
  );
};

export default GalleryPage;
