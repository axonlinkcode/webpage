import './teams.css';
import { assets } from '../../assets/assets';
import BouncingCircles from '../BouncingCircles'

const teamMembers = [
  {
    name: 'Olusola Solanke',
    role: 'Co-founder',
    position: 'Chief Executive Officer',
    image: assets.sola,
    dot: 'a5d8ff'
  },
  {
    name: 'Anavami Sadiq',
    role: 'Co-founder',
    position: 'Chief Operations Officer',
    image: assets.ami,
    dot: '91c499'
  },
  {
    name: 'Ozi Sadiq-Kasai',
    role: 'Frontend & Education Lead',
    position: 'Solutions Architect',
    image: assets.ozi,
    dot: 'f18f01'
  },
];

const Team = () => {
  return (
    <div className='team__container' id='team'>
      <div className='team'>
        <div className='team__image'>
          <img src={assets.wheels} alt="" />
          <BouncingCircles className='team__bounce' />
        </div>
        <div className='team__content'>
          <h2>Innovating with purpose</h2>
          <p>We’re a multidisciplinary team united by a mission: to make healthcare smarter and more equitable.</p>
          <p>
            Our collaborative approach ensures we listen first to providers, researchers,
            and patients before coding a single line. Together, we’re not just developing technology;
            we’re advancing a world where every health decision is informed, every patient is empowered,
            and every innovation serves humanity.</p>
        </div>
      </div>
      <ul className='team__members'>
        {
          teamMembers.map((member, index) => (
            <li key={index} className='team__member'>
              <img src={member.image} alt={member.name} />
              <div className='team__member-info'>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className='team__member-details'>
                  <p>{member.position}</p>
                  <span className='team__dot' style={{ backgroundColor: `#${member.dot}` }}></span>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    <div className="team__contact">
        <p>
        With deep industry insight and a collaborative spirit, we’re building the future of health—one solution at a time.
        <br/><a href="#">Join Us</a>
      </p>
    </div>
    </div>
  );
};

export default Team;