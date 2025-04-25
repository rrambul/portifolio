import { Blog } from "@/components/sections/Blog";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function BlogPage() {
  return (
    <main>
      <Navigation />
      <Blog />
      <Footer />
    </main>
  );
}
