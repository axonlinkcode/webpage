import Home from './home/Home';
import Services from '../components/services/Services'
import Products from '../components/products/Products';
import Team from '../components/team/Team';

const LandingPage = () => {
  return (
    <div>
      <Home />
      <Services />
      <Products />
      <Team />
    </div>
  )
}

export default LandingPage
