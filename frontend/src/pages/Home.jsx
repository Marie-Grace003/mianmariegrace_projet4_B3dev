import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Cours from '../components/Cours'
import Pricing from '../components/Pricing'
import Testimonial from '../components/Testimonial'
import WhySection from '../components/WhySection'
import JoinMembership from '../components/JoinMembership'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Home() {
  useScrollReveal()

  return (
    <div className="bg-[#0a0a0a] page-enter">
      <Navbar />
      <Hero />
      <div className="reveal"><Stats /></div>
      <div className="reveal"><HowItWorks /></div>
      <div className="reveal"><Features /></div>
      <div className="reveal"><Cours /></div>
      <div className="reveal"><Pricing /></div>
      <div className="reveal"><Testimonial /></div>
      <div className="reveal"><WhySection /></div>
      <div className="reveal"><JoinMembership /></div>
      <Footer />
    </div>
  )
}

export default Home
