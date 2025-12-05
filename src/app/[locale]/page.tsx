import { Navbar } from "@/components/navbar";
import { LandingWrapper } from "@/components/landing-wrapper";
import { PageContent } from "@/components/page-content";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <LandingWrapper>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageContent>
          <main className="relative z-10 flex-1">
            <Hero />
            <About />
            <Work />
          </main>
        </PageContent>
      </div>
    </LandingWrapper>
  );
}
