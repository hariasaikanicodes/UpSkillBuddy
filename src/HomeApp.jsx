import './home.css'

const curricula = [
  {
    href: `${import.meta.env.BASE_URL}ai-roadmap.html`,
    eyebrow: '100 days · 2 hours a day',
    title: 'AI Mastery Roadmap',
    description: 'A complete beginner-to-GenAI journey through Python, data, machine learning, deep learning, deployment, and portfolio projects.',
    meta: '100 lessons · 5 phases',
    accent: 'long',
  },
  {
    href: `${import.meta.env.BASE_URL}genai.html`,
    eyebrow: '7 days · 1 hour a day',
    title: 'GenAI & Agentic AI Crash Course',
    description: 'A focused introduction to LLMs, prompting, RAG, tools, agents, evaluation, and a small study-assistant project.',
    meta: '7 lessons · 1 capstone',
    accent: 'short',
  },
]

function HomeApp() {
  return (
    <div className="home-page">
      <header className="home-nav">
        <span className="home-mark">AI Skill Buddy</span>
        <span className="home-nav-note">Learning paths for curious builders</span>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <p className="home-kicker">Choose your next path</p>
          <h1>Start Learning,<br /><em>Keep Becoming</em></h1>
          <p className="hero-tagline">one day at a time</p>
          <p className="home-intro">Practical, source-linked learning plans that turn big technical ideas into small daily steps.</p>
        </section>

        <section className="path-section" aria-labelledby="path-heading">
          <div className="path-heading-row">
            <h2 id="path-heading">Your learning paths</h2>
            <span>{curricula.length} paths available</span>
          </div>

          <div className="path-list">
            {curricula.map((curriculum, index) => (
              <a className={`path-tile ${curriculum.accent}`} href={curriculum.href} key={curriculum.href}>
                <span className="path-number">0{index + 1}</span>
                <div className="path-copy">
                  <p className="path-eyebrow">{curriculum.eyebrow}</p>
                  <h3>{curriculum.title}</h3>
                  <p>{curriculum.description}</p>
                  <span className="path-meta">{curriculum.meta}</span>
                </div>
                <span className="path-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">Start small. Stay consistent. Build something real.</footer>
    </div>
  )
}

export default HomeApp
