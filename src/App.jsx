import { useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import profileImage from './mine.jpg'
import FrontPage from './FrontPage'
import './App.css'

function App() {
  const profile = {
    photo: profileImage,
    github: 'https://github.com/AbdulWahith18',
    linkedin: 'https://www.linkedin.com/in/abdul-wahith-m-aa8903373/',
  }

  const skills = [
    'C',
    'C++',
    'Java',
    'Fullstack Development',
    'Data Structures and Algorithms',
    'Database Management System',
    'Oracle SQL',
    'Problem Solving',
    'Analytical Thinking',
    'Leadership',
  ]

  const projects = [
    {
      name: 'KeySprint',
      techStack: ['Web App', 'Firebase', 'Real-Time Sync', 'Leaderboard System'],
      actions: [
        { label: 'View GitHub', href: 'https://github.com/AbdulWahith18', variant: 'primary' },
        { label: 'Read More', href: null, variant: 'secondary' },
      ],
      description:
        'KeySprint is a web-based typing speed application inspired by MonkeyType that helps users improve their typing skills through real-time performance tracking and competitive leaderboards. The platform includes a dynamic typing interface that measures typing speed (WPM), accuracy, and identifies the user\'s weakest letters for focused improvement. It features secure user authentication and profile management using Firebase, where user credentials and detailed typing records are stored and managed efficiently. A competitive leaderboard system ranks users based on their performance, encouraging consistent practice and skill enhancement. The application provides a smooth and interactive user experience while maintaining real-time data synchronization through Firebase.',
    },
    {
      name: 'NotifyMe',
      techStack: ['Web App', 'Chatbot', 'Reminder Scheduling', 'Notification System'],
      actions: [
        { label: 'View GitHub', href: 'https://github.com/AbdulWahith18', variant: 'primary' },
        { label: 'Read More', href: null, variant: 'secondary' },
      ],
      description:
        'The purpose of NotifyMe is to provide and assist users with a personal wellness assistant that helps them manage their daily routines and future tasks. The system combines an interactive chatbot with a reminder scheduling feature so that the users can receive supportive conversations as well as timely notifications for important future activities.',
    },
    {
      name: 'Hostel Outpass Management System',
      techStack: ['Web App', 'Digital Approval Flow', 'Real-Time Verification', 'Centralized Records'],
      actions: [
        { label: 'View GitHub', href: 'https://github.com/AbdulWahith18', variant: 'primary' },
        { label: 'Read More', href: null, variant: 'secondary' },
      ],
      description:
        'The Hostel Outpass Management System is a web-based platform designed to replace the traditional paper-based outpass process in hostels. It allows students to apply for outpasses online, wardens to approve or reject requests digitally, and security staff to verify them in real time at the hostel gate. The system solves issues such as delays, misplaced records, and lack of transparency in manual processes. Key features include online application and approval, real-time status updates, secure verification, and centralized record storage. Overall, it improves efficiency, coordination, and security among students, wardens, administrators, and security staff.',
    },
  ]

  const education = [
    {
      year: '2028',
      title: 'BE Computer Science Engineering',
      institution: 'Anna University, MIT Campus',
      score: 'CGPA: 9.1',
    },
    {
      year: '2024',
      title: 'HSC',
      institution: 'Good Shepherd Matriculation School',
      score: '97.3%',
    },
    {
      year: '2022',
      title: 'SSLC',
      institution: 'Good Shepherd Matriculation School',
      score: '95.2%',
    },
  ]

  const achievements = [
    'HSC School Topper',
    'SSLC school third',
    'Chess Zonal Winner',
    'Football Zonal Runners-up',
  ]

  const activities = ['Chess', 'Following Cricket', 'Watching Movies and listening musics']

  const languages = ['English', 'Tamil', 'Telugu (regional)']

  const sectionLinks = [
    { label: 'Objective', path: '/objective' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Education', path: '/education' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Activities', path: '/activities' },
    { label: 'Languages', path: '/languages' },
  ]

  const SectionHeader = ({ title, description }) => (
    <div className="section-head">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )

  const Layout = ({ children }) => (
    <div className="portfolio">
      <header className="hero">
        <div className="profile-wrap">
          <img src={profile.photo} alt="Abdul Wahith" className="profile-photo" />
        </div>
        <h1>ABDUL WAHITH M</h1>
        <p className="subtitle">Aspiring Software Developer</p>
        <div className="contact-list">
          <a href="mailto:abdulwahith0818@gmail.com" className="contact-item">
            <span aria-hidden="true">✉️</span>
            <span>abdulwahith0818@gmail.com</span>
          </a>
          <a href="tel:+918553132883" className="contact-item">
            <span aria-hidden="true">📞</span>
            <span>+91 85531 32883</span>
          </a>
          <span className="contact-item">
            <span aria-hidden="true">📍</span>
            <span>Pottal Pudhur, Tenkasi - 627423</span>
          </span>
        </div>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer" className="social-btn social-btn-primary">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-btn social-btn-secondary">
            LinkedIn
          </a>
        </div>
      </header>

      <nav className="section-nav">
        {sectionLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main className="page-card">{children}</main>
    </div>
  )

  const HomePage = () => (
    <Layout>
      <SectionHeader
        title="Portfolio Sections"
        description="Open each section below to view details in a dedicated page."
      />
      <div className="route-grid">
        {sectionLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className="route-tile">
            <h3>{link.label}</h3>
            <p>Open {link.label} page</p>
          </NavLink>
        ))}
      </div>
    </Layout>
  )

  const ObjectivePage = () => (
    <Layout>
      <section className="objective-showcase-card">
        <header className="objective-showcase-head">
          <h2>
            <span className="objective-icon" aria-hidden="true">
              🎯
            </span>
            Objective
          </h2>
          <p>Career focus and the kind of software opportunities I am pursuing.</p>
        </header>

        <article className="objective-statement">
          <h3>To obtain a challenging opportunity in the field of software development.</h3>
          <p>
            Where I can apply my knowledge of full-stack development, contribute effectively to
            innovative projects, and continuously enhance my technical and problem-solving skills
            while growing as a professional.
          </p>
        </article>
      </section>
    </Layout>
  )

  const SkillsPage = () => {
    const [query, setQuery] = useState('')
    const filteredSkills = useMemo(
      () => skills.filter((skill) => skill.toLowerCase().includes(query.toLowerCase())),
      [query],
    )

    const softSkills = new Set(['Problem Solving', 'Analytical Thinking', 'Leadership'])
    const technicalIcons = {
      C: '⚙️',
      'C++': '🧩',
      Java: '☕',
      'Fullstack Development': '🖥️',
      'Data Structures and Algorithms': '📐',
      'Database Management System': '🗄️',
      'Oracle SQL': '🛢️',
    }

    return (
      <Layout>
        <section className="skills-feature-card">
          <header className="skills-head">
            <h2>Skills</h2>
            <p>Filter and explore technical strengths and professional capabilities.</p>
          </header>

          <div className="skill-search-wrap">
            <span className="skill-search-icon" aria-hidden="true">
              🔎
            </span>
            <input
              className="skill-search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills..."
            />
          </div>

          <ul className="skills-pill-grid mt-1">
            {filteredSkills.map((skill) => {
              const isSoftSkill = softSkills.has(skill)
              const icon = technicalIcons[skill]

              return (
                <li key={skill}>
                  <button
                    type="button"
                    className={isSoftSkill ? 'skill-pill soft' : 'skill-pill tech'}
                  >
                    {icon && (
                      <span className="skill-pill-icon" aria-hidden="true">
                        {icon}
                      </span>
                    )}
                    <span>{skill}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </Layout>
    )
  }

  const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0])
    const projectParagraphs = selectedProject.description
      .split(/(?<=[.!?])\s+/)
      .map((item) => item.trim())
      .filter(Boolean)

    return (
      <Layout>
        <section className="projects-showcase-card">
          <header className="projects-showcase-head">
            <h2>Projects</h2>
            <p>Select a project to explore implementation details, capabilities, and core outcomes.</p>
          </header>

          <div className="project-tabs-wrap">
          {projects.map((project) => (
            <button
              key={project.name}
              type="button"
              className={selectedProject.name === project.name ? 'project-tab active' : 'project-tab'}
              onClick={() => setSelectedProject(project)}
            >
              {project.name}
            </button>
          ))}
          </div>

          <article className="project-showcase-card mt-1">
            <h3>{selectedProject.name}</h3>

            <div className="project-tech-badges">
              {selectedProject.techStack.map((tech) => (
                <span key={`${selectedProject.name}-${tech}`}>{tech}</span>
              ))}
            </div>

            <div className="project-content-grid">
              <section>
                <h4>Overview</h4>
                <p>{projectParagraphs[0]}</p>
              </section>

              {projectParagraphs.length > 1 && (
                <section>
                  <h4>Highlights</h4>
                  {projectParagraphs.slice(1).map((paragraph) => (
                    <p key={`${selectedProject.name}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                  ))}
                </section>
              )}
            </div>

            <div className="project-action-row">
              {selectedProject.actions.map((action) => (
                action.href ? (
                  <a
                    key={`${selectedProject.name}-${action.label}`}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className={action.variant === 'primary' ? 'project-action-btn primary' : 'project-action-btn secondary'}
                  >
                    {action.label}
                  </a>
                ) : (
                  <button
                    key={`${selectedProject.name}-${action.label}`}
                    type="button"
                    className={action.variant === 'primary' ? 'project-action-btn primary' : 'project-action-btn secondary'}
                  >
                    {action.label}
                  </button>
                )
              ))}
            </div>
          </article>
        </section>
      </Layout>
    )
  }

  const EducationPage = () => (
    <Layout>
      <section className="education-showcase-card">
        <header className="education-showcase-head">
          <h2>Education</h2>
          <p>Academic progression with key milestones and performance highlights.</p>
        </header>

        <div className="education-timeline">
          {education.map((item) => (
            <article key={item.year + item.title} className="education-item-card">
              <span className="education-year-pill">{item.year}</span>
              <h3>{item.title}</h3>
              <p className="education-institution">{item.institution}</p>
              <p className="education-score">{item.score}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )

  const AchievementsPage = () => (
    <Layout>
      <section className="awards-showcase-card">
        <header className="awards-showcase-head">
          <h2>Achievements & Awards</h2>
          <p>Recognition across academics and extracurricular milestones.</p>
        </header>

        <div className="awards-grid">
          {achievements.map((achievement) => {
            const awardMeta =
              {
                'HSC School Topper': { icon: '🏆', type: 'academic' },
                'SSLC school third': { icon: '🥉', type: 'academic' },
                'Chess Zonal Winner': { icon: '♟️', type: 'sports' },
                'Football Zonal Runners-up': { icon: '⚽', type: 'sports' },
              }[achievement] || { icon: '🏅', type: 'academic' }

            return (
              <article
                key={achievement}
                className={awardMeta.type === 'academic' ? 'award-card academic' : 'award-card sports'}
              >
                <span className="award-icon" aria-hidden="true">
                  {awardMeta.icon}
                </span>
                <div className="award-content">
                  <h3>{achievement}</h3>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )

  const ActivitiesPage = () => (
    <Layout>
      <section className="activities-showcase-card">
        <header className="activities-showcase-head">
          <h2>Activities</h2>
          <p>Interests outside academics that keep me active, focused, and creatively inspired.</p>
        </header>

        <div className="activities-grid">
          {activities.map((activity) => {
            const activityMeta =
              {
                Chess: { icon: '♟️', tone: 'chess' },
                'Following Cricket': { icon: '🏏', tone: 'cricket' },
                'Watching Movies and listening musics': { icon: '🎬', tone: 'movies' },
              }[activity] || { icon: '✨', tone: 'neutral' }

            return (
              <article key={activity} className={`activity-card ${activityMeta.tone}`}>
                <span className="activity-icon" aria-hidden="true">
                  {activityMeta.icon}
                </span>
                <h3>{activity}</h3>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )

  const LanguagesPage = () => (
    <Layout>
      <section className="languages-showcase-card">
        <header className="languages-showcase-head">
          <h2>Languages</h2>
          <p>Languages I can comfortably communicate in across personal and professional contexts.</p>
        </header>

        <div className="languages-grid">
          {languages.map((language) => {
            const languageMeta =
              {
                English: { icon: '🇬🇧', proficiency: 92, tone: 'blue', label: 'Professional' },
                Tamil: { icon: '🇮🇳', proficiency: 95, tone: 'violet', label: 'Fluent' },
                'Telugu (regional)': {
                  icon: '🗣️',
                  proficiency: 82,
                  tone: 'teal',
                  label: 'Conversational',
                },
              }[language] || { icon: '🌐', proficiency: 80, tone: 'blue', label: 'Communication Ready' }

            return (
              <article key={language} className={`language-card ${languageMeta.tone}`}>
                <div className="language-top-row">
                  <span className="language-icon" aria-hidden="true">
                    {languageMeta.icon}
                  </span>
                  <h3>{language}</h3>
                </div>

                <div className="language-meta-row">
                  <span className="language-level-tag">{languageMeta.label}</span>
                  <span className="language-ready-tag">Communication ready</span>
                </div>

                <div className="language-progress" aria-hidden="true">
                  <span style={{ '--fill': `${languageMeta.proficiency}%` }} />
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )

  return (
    <Routes>
      <Route path="/" element={<FrontPage profile={profile} projects={projects} skills={skills} />} />
      <Route path="/portfolio" element={<HomePage />} />
      <Route path="/objective" element={<ObjectivePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
