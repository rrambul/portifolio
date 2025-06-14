import { Blog } from "@/components/sections/Blog";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-purple-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100/40 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-100/40 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        <Blog />
        <Footer />
      </div>
    </main>
  );
}
