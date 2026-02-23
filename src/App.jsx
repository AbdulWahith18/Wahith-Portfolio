import { useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import profileImage from './mine.jpg'
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
      description:
        'KeySprint is a web-based typing speed application inspired by MonkeyType that helps users improve their typing skills through real-time performance tracking and competitive leaderboards. The platform includes a dynamic typing interface that measures typing speed (WPM), accuracy, and identifies the user\'s weakest letters for focused improvement. It features secure user authentication and profile management using Firebase, where user credentials and detailed typing records are stored and managed efficiently. A competitive leaderboard system ranks users based on their performance, encouraging consistent practice and skill enhancement. The application provides a smooth and interactive user experience while maintaining real-time data synchronization through Firebase.',
    },
    {
      name: 'NotifyMe',
      description:
        'The purpose of NotifyMe is to provide and assist users with a personal wellness assistant that helps them manage their daily routines and future tasks. The system combines an interactive chatbot with a reminder scheduling feature so that the users can receive supportive conversations as well as timely notifications for important future activities.',
    },
    {
      name: 'Hostel Outpass Management System',
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
          <a href="mailto:abdulwahith0818@gmail.com">abdulwahith0818@gmail.com</a>
          <a href="tel:+918553132883">+91 85531 32883</a>
          <span>Pottal Pudhur, Tenkasi - 627423</span>
        </div>
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
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
      <SectionHeader
        title="Objective"
        description="Career focus and the kind of software opportunities I am pursuing."
      />
      <p>
        To obtain a challenging opportunity in the field of software development where I can apply
        my knowledge of full-stack development, contribute effectively to innovative projects, and
        continuously enhance my technical and problem-solving skills while growing as a
        professional.
      </p>
    </Layout>
  )

  const SkillsPage = () => {
    const [query, setQuery] = useState('')
    const filteredSkills = useMemo(
      () => skills.filter((skill) => skill.toLowerCase().includes(query.toLowerCase())),
      [query],
    )

    return (
      <Layout>
        <SectionHeader
          title="Skills"
          description="Filter and explore technical and professional strengths."
        />
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search skills..."
        />
        <ul className="pill-list mt-1">
          {filteredSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Layout>
    )
  }

  const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(projects[0])

    return (
      <Layout>
        <SectionHeader
          title="Projects"
          description="Select any project card to view its full details."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <button
              key={project.name}
              type="button"
              className={selectedProject.name === project.name ? 'project-btn active' : 'project-btn'}
              onClick={() => setSelectedProject(project)}
            >
              {project.name}
            </button>
          ))}
        </div>
        <article className="card mt-1">
          <h3>{selectedProject.name}</h3>
          <p>{selectedProject.description}</p>
        </article>
      </Layout>
    )
  }

  const EducationPage = () => (
    <Layout>
      <SectionHeader
        title="Education"
        description="Academic timeline and performance highlights."
      />
      <div className="timeline">
        {education.map((item) => (
          <article key={item.year + item.title} className="card">
            <p className="year">{item.year}</p>
            <h3>{item.title}</h3>
            <p>{item.institution}</p>
            <p className="score">{item.score}</p>
          </article>
        ))}
      </div>
    </Layout>
  )

  const AchievementsPage = () => (
    <Layout>
      <SectionHeader
        title="Achievements & Awards"
        description="Recognition earned through academics and extracurricular activities."
      />
      <div className="list-grid">
        {achievements.map((achievement) => (
          <article key={achievement} className="card hover-rise">
            <p>{achievement}</p>
          </article>
        ))}
      </div>
    </Layout>
  )

  const ActivitiesPage = () => (
    <Layout>
      <SectionHeader
        title="Activities"
        description="Interests outside academics that keep me active and engaged."
      />
      <div className="list-grid">
        {activities.map((activity) => (
          <article key={activity} className="card hover-rise">
            <p>{activity}</p>
          </article>
        ))}
      </div>
    </Layout>
  )

  const LanguagesPage = () => (
    <Layout>
      <SectionHeader
        title="Languages"
        description="Languages I can comfortably communicate in."
      />
      <div className="list-grid">
        {languages.map((language) => (
          <article key={language} className="card hover-rise">
            <h3>{language}</h3>
            <p>Communication ready</p>
          </article>
        ))}
      </div>
    </Layout>
  )

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
