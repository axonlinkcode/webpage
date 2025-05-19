import './Team.css';
import { assets } from '../../assets/assets';

const Team = () => {
  return (
    <div className='team'>
      <div className='team__image'>
        <img src={assets.wheels} alt="" />
      </div>
      <div className='team__content'>
        <h2>Innovating with purpose</h2>
        <p>We’re a multidisciplinary team united by a mission: to make healthcare smarter and more equitable.
          Our collaborative approach ensures we listen first to providers, researchers,
          and patients before coding a single line. Together, we’re not just developing technology;
          we’re advancing a world where every health decision is informed, every patient is empowered,
          and every innovation serves humanity.</p>
      </div>
    </div>
  );
};

export default Team;