import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import resumePdf from './assets/Resume.pdf'
import './FrontPage.css'

function FrontPage({ profile }) {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyOverscroll = document.body.style.overscrollBehavior
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.body.style.overscrollBehavior = previousBodyOverscroll
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [])

  const handleEnterPortfolio = () => {
    setIsExiting(true)

    window.setTimeout(() => {
      navigate('/portfolio')
    }, 260)
  }

  return (
    <div className={isExiting ? 'frontpage fp-exit' : 'frontpage'}>
      <div className="fp-blob fp-blob-one" aria-hidden="true" />
      <div className="fp-blob fp-blob-two" aria-hidden="true" />
      <div className="fp-blob fp-blob-three" aria-hidden="true" />
      <div className="fp-particles" aria-hidden="true" />

      <section className="fp-hero fp-reveal">
        <div className="fp-profile-wrap fp-seq fp-seq-profile">
          <div className="fp-profile-ring">
            <img src={profile.photo} alt="Abdul Wahith" className="fp-profile-image" />
          </div>
        </div>

        <h1 className="fp-seq fp-seq-name">ABDUL WAHITH M</h1>
        <p className="fp-role fp-seq fp-seq-role">Building Modern Web Experiences</p>

        <div className="fp-cta-row fp-seq fp-seq-cta">
          <button type="button" className="fp-btn fp-btn-primary" onClick={handleEnterPortfolio}>
            Enter Portfolio <span aria-hidden="true">→</span>
          </button>
          <a href={resumePdf} target="_blank" rel="noreferrer" className="fp-btn fp-btn-secondary">
            View Resume
          </a>
        </div>
      </section>
    </div>
  )
}

export default FrontPage
