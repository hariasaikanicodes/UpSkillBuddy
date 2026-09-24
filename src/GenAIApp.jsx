import { useEffect, useMemo, useState } from 'react'

const lessons = [
  {
    day: 1,
    phase: 'Foundations',
    title: 'What GenAI and agents actually are',
    concepts: 'AI vs ML vs deep learning vs GenAI, tokens, context windows, inference, hallucinations, and the difference between a chatbot and an agent.',
    practice: 'Create a one-page concept map. Ask an LLM to explain one concept three ways and annotate what changed.',
    outcome: 'You can explain the GenAI and agent vocabulary in plain language.',
    sources: [
      ['Video · Generative AI explained', 'https://www.youtube.com/watch?v=ad79nYk2keg'],
      ['Article · What are large language models?', 'https://www.ibm.com/think/topics/large-language-models'],
      ['Glossary · OpenAI model basics', 'https://platform.openai.com/docs/concepts'],
    ],
  },
  {
    day: 2,
    phase: 'Foundations',
    title: 'Prompting for reliable results',
    concepts: 'Roles, clear instructions, context, examples, constraints, output formats, and evaluation rubrics.',
    practice: 'Turn messy notes into a structured study plan. Test three prompts and score accuracy, completeness, and tone.',
    outcome: 'You can design a prompt deliberately instead of guessing at wording.',
    sources: [
      ['Article · OpenAI prompt engineering guide', 'https://platform.openai.com/docs/guides/prompt-engineering'],
      ['Article · Anthropic prompting overview', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'],
      ['Interactive · Google prompt design guide', 'https://www.cloudskillsboost.google/course_templates/976'],
    ],
  },
  {
    day: 3,
    phase: 'LLM Building Blocks',
    title: 'APIs, structured output, and tool calls',
    concepts: 'Model APIs, messages, temperature, JSON output, schemas, function calling, and why structured results make apps safer.',
    practice: 'Design a JSON schema for a study assistant that returns a topic, difficulty, resources, and practice task.',
    outcome: 'You understand the basic request-response shape of an LLM application.',
    sources: [
      ['Quickstart · OpenAI API', 'https://platform.openai.com/docs/quickstart'],
      ['Guide · OpenAI function calling', 'https://platform.openai.com/docs/guides/function-calling'],
      ['Guide · OpenAI structured outputs', 'https://platform.openai.com/docs/guides/structured-outputs'],
    ],
  },
  {
    day: 4,
    phase: 'LLM Building Blocks',
    title: 'Embeddings and retrieval-augmented generation',
    concepts: 'Embeddings, semantic similarity, chunking, retrieval, grounding, and the RAG pipeline.',
    practice: 'Use five short documents, retrieve the two most relevant passages for a question, and explain the match.',
    outcome: 'You can describe why RAG helps a model answer from your own information.',
    sources: [
      ['Guide · OpenAI embeddings', 'https://platform.openai.com/docs/guides/embeddings'],
      ['Tutorial · LangChain RAG', 'https://python.langchain.com/docs/tutorials/rag/'],
      ['Guide · Pinecone RAG', 'https://www.pinecone.io/learn/retrieval-augmented-generation/'],
    ],
  },
  {
    day: 5,
    phase: 'Agentic AI',
    title: 'How agents plan and use tools',
    concepts: 'The agent loop: observe, decide, act, inspect, and repeat. Tools, memory, planning, guardrails, and human approval.',
    practice: 'Draw a research assistant flow with search, calculator, and note-taking tools. Identify three failure cases.',
    outcome: 'You can distinguish a simple LLM workflow from an agentic system.',
    sources: [
      ['Article · Anthropic: Building effective agents', 'https://www.anthropic.com/research/building-effective-agents'],
      ['Tutorial · LangChain agents', 'https://python.langchain.com/docs/tutorials/agents/'],
      ['Paper · ReAct: reasoning and acting', 'https://arxiv.org/abs/2210.03629'],
    ],
  },
  {
    day: 6,
    phase: 'Agentic AI',
    title: 'Build a beginner agent',
    concepts: 'Connect an LLM to bounded tools and make it return an observable result instead of an open-ended answer.',
    practice: 'Build a study-planner agent that reads local notes, creates a two-step plan, and asks for approval before saving it.',
    outcome: 'You have a small, bounded agent workflow you can explain and extend.',
    sources: [
      ['Quickstart · LangGraph', 'https://langchain-ai.github.io/langgraph/tutorials/introduction/'],
      ['Guide · OpenAI tools', 'https://platform.openai.com/docs/guides/function-calling'],
      ['Lab · Google Colab fundamentals', 'https://colab.research.google.com/'],
    ],
  },
  {
    day: 7,
    phase: 'Capstone and Safety',
    title: 'Ship and evaluate a study assistant',
    concepts: 'Quality, citations, tool accuracy, latency, cost, prompt injection, privacy, and when an agent should stop.',
    practice: 'Finish a mini study assistant. Test it with ten questions, record failures, add a README, and write three next improvements.',
    outcome: 'You finish with a small portfolio artifact and a clear next-step roadmap.',
    sources: [
      ['Guide · OWASP Top 10 for LLM applications', 'https://owasp.org/www-project-top-10-for-large-language-model-applications/'],
      ['Guide · OpenAI evaluations', 'https://platform.openai.com/docs/guides/evals'],
      ['Tutorial · Streamlit app', 'https://docs.streamlit.io/get-started/tutorials/create-an-app'],
    ],
  },
]

const phaseOrder = ['All', 'Foundations', 'LLM Building Blocks', 'Agentic AI', 'Capstone and Safety']

function GenAIApp() {
  const [theme, setTheme] = useState(() => localStorage.getItem('genai-theme') || 'light')
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState('All')
  const [days, setDays] = useState(() => JSON.parse(localStorage.getItem('genai-days') || '{}'))
  const [sources, setSources] = useState(() => JSON.parse(localStorage.getItem('genai-sources') || '{}'))

  useEffect(() => {
    document.documentElement.dataset.genaiTheme = theme
    localStorage.setItem('genai-theme', theme)
  }, [theme])

  useEffect(() => localStorage.setItem('genai-days', JSON.stringify(days)), [days])
  useEffect(() => localStorage.setItem('genai-sources', JSON.stringify(sources)), [sources])

  const filteredLessons = useMemo(() => lessons.filter((lesson) => {
    const text = `${lesson.title} ${lesson.concepts} ${lesson.phase}`.toLowerCase()
    return (phase === 'All' || lesson.phase === phase) && text.includes(query.toLowerCase())
  }), [phase, query])

  const completedDays = Object.values(days).filter(Boolean).length
  const completedSources = Object.values(sources).filter(Boolean).length

  const toggleDay = (day) => setDays((current) => ({ ...current, [day]: !current[day] }))
  const toggleSource = (key) => setSources((current) => ({ ...current, [key]: !current[key] }))
  const reset = () => {
    setDays({})
    setSources({})
  }

  return (
    <div className="genai-page">
      <header className="genai-nav">
        <span>Learning studio / GenAI</span>
        <div className="genai-actions">
          <a className="genai-home-link" href={import.meta.env.BASE_URL}>Home</a>
          <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <button type="button" onClick={reset}>Reset progress</button>
        </div>
      </header>

      <main>
        <section className="genai-hero">
          <p className="kicker">A one-hour-a-day crash course</p>
          <h1>7 Days of<br /><em>GenAI & Agentic AI</em></h1>
          <p className="hero-intro">A calm, practical introduction to the ideas behind modern AI applications, ending with your first bounded agent.</p>
          <div className="progress-line">
            <span>{completedDays}/7 days complete</span>
            <span>{completedSources}/{lessons.length * 3} sources studied</span>
          </div>
        </section>

        <section className="course-notes">
          <div><strong>Daily rhythm</strong><span>15 min learn · 35 min practice · 10 min notes</span></div>
          <div><strong>Final artifact</strong><span>A study assistant with tools, approval, and evaluation</span></div>
          <div><strong>Prerequisite</strong><span>Curiosity and access to an AI chat tool</span></div>
        </section>

        <section className="schedule">
          <div className="section-heading">
            <div><p className="kicker">The curriculum</p><h2>Your seven-day path</h2></div>
            <span>{filteredLessons.length} of 7 days</span>
          </div>

          <div className="filters">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts or days" aria-label="Search the curriculum" />
            <select value={phase} onChange={(event) => setPhase(event.target.value)} aria-label="Filter by phase">
              {phaseOrder.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          {filteredLessons.map((lesson) => (
            <article className={`lesson ${days[lesson.day] ? 'is-done' : ''}`} key={lesson.day}>
              <div className="lesson-index">DAY<br /><strong>{String(lesson.day).padStart(2, '0')}</strong></div>
              <div className="lesson-body">
                <div className="lesson-title-row">
                  <div><span className="phase-label">{lesson.phase}</span><h3>{lesson.title}</h3></div>
                  <label className="day-toggle">
                    <input type="checkbox" checked={Boolean(days[lesson.day])} onChange={() => toggleDay(lesson.day)} />
                    <span aria-hidden="true">{days[lesson.day] ? '✓' : ''}</span>
                    <b>Day done</b>
                  </label>
                </div>
                <div className="lesson-details">
                  <div><small>CONCEPTS</small><p>{lesson.concepts}</p></div>
                  <div><small>WHERE TO LEARN</small><div className="source-links">
                    {lesson.sources.map(([label, url], index) => {
                      const key = `${lesson.day}-${index}`
                      return <label className="source-link" key={url}><input type="checkbox" checked={Boolean(sources[key])} onChange={() => toggleSource(key)} /><span>{sources[key] ? '✓' : ''}</span><a href={url} target="_blank" rel="noreferrer">{label}</a></label>
                    })}
                  </div></div>
                  <div><small>PRACTICE · OUTCOME</small><p>{lesson.practice} <strong>Outcome:</strong> {lesson.outcome}</p></div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer>Learn slowly. Build something small. Keep going.</footer>
    </div>
  )
}

export default GenAIApp
