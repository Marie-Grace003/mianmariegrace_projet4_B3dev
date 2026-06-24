import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Cours from '../components/Cours'
import Pricing from '../components/Pricing'
import Testimonial from '../components/Testimonial'
import WhySection from '../components/WhySection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Cours />
      <Pricing />
      <Testimonial />
      <WhySection />
      <Footer />
    </div>
  )
}

export default Home
