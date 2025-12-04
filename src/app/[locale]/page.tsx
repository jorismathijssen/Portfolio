import { Navbar } from '@/components/navbar';
import { LandingWrapper } from '@/components/landing-wrapper';
import { PageContent } from '@/components/page-content';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Work } from '@/components/sections/work';

export default function HomePage() {
  return (
    <LandingWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <PageContent>
          <main className="flex-1">
            <Hero />
            <About />
            <Work />
          </main>
          <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-muted/20">
            <div className="container mx-auto px-4">
              <p>© 2025 Joris Mathijssen. Built with Next.js & Tailwind.</p>
            </div>
          </footer>
        </PageContent>
      </div>
    </LandingWrapper>
  );
}
