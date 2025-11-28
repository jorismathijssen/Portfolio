export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <header className="mb-12 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold mb-2">Joris Mathijssen</h1>
        <p className="text-xl">Senior .NET Developer</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 uppercase decoration-wavy underline">About Me</h2>
        <p className="mb-4 leading-relaxed">
          Hello! I am Joris, a software developer based in the Netherlands. 
          I specialize in .NET development and modern web technologies.
        </p>
        <p className="leading-relaxed">
          Currently working at 9292, building robust and scalable solutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 uppercase decoration-wavy underline">Skills</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>.NET / C#</li>
          <li>React / Next.js</li>
          <li>Azure</li>
          <li>Docker</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 uppercase decoration-wavy underline">Contact</h2>
        <p>
          You can find me on <a href="https://github.com/jorismathijssen" className="text-blue-700 hover:bg-blue-700 hover:text-white underline">GitHub</a> or <a href="https://www.linkedin.com/in/jorismathijssen" className="text-blue-700 hover:bg-blue-700 hover:text-white underline">LinkedIn</a>.
        </p>
      </section>

      <footer className="text-sm border-t-2 border-black pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Joris Mathijssen. Best viewed in Netscape Navigator.</p>
      </footer>
    </main>
  );
}
