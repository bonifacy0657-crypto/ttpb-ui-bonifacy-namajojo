import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import backgroundImage from '../assets/background image.jpg'

function HomePage({ onNavigate }) {
  return (
    <div
      className="app-shell"
      style={{ '--homepage-background': `url("${backgroundImage}")` }}
    >
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
