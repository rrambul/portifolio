import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
// import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      {/* <Blog /> */}
      <Contact />
      <Footer />
    </main>
  );
}
