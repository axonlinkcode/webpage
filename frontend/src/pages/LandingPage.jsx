import Home from './home/Home';
import Services from '../components/services/Services';
import Products from '../components/products/Products';
import Team from '../components/team/Team';
import FadeInOnScroll from '../components/FadeInOnScroll';

const LandingPage = () => {
  return (
    <>
      <FadeInOnScroll>
        <Home />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <Services />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.15}>
        <Products />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.19}>
        <Team />
      </FadeInOnScroll>
    </>
  );
};

export default LandingPage;
