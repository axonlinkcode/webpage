import './service.css'
import { assets } from '../../assets/assets.js'

const Services = () => {
  const service = [
    {
      dot: "#a5d8ff",
      img: assets.Frame,
      header: 'Digital Transformation',
      description: 'Modernize clinical research and healthcare operations with scalable platforms that streamline workflows, reduce costs, and ensure compliance.'
    },
    {
      dot: "#91c499",
      img: assets.Frame1,
      header: 'Healthcare Analytics',
      description: 'Unlock actionable insights from complex datasets to empower providers, researchers, and policymakers with predictive models and real-time decision support.'
    },
    {
      dot: "#f18f01",
      img: assets.Frame2,
      header: 'Software Development',
      description: 'Tailored tools for care delivery, patient engagement, and trial management designed to enhance care coordination, trial recruitment, and health literacy.Whether automating site monitoring for trials or connecting patients to specialists via AI-driven platforms, we turn challenges into opportunities.'
    },
  ]

  return (
    <div className="services" id='services'>
      <div className="services__top">
        <div className='services__top-img'>
          <img src={assets.consult} alt="consult" />
        </div>
        <div className='services__top-content'>
          <div>
            <h2>Digital Solutions for Smarter Healthcare</h2>
          </div>
          <p>Our services span custom software development, healthcare analytics,
            and digital transformation strategy designed
            specifically for clinical research teams, healthcare providers,
            and patient-facing programs.
            From workflow automation to Electronic Health Record integration and AI-driven
            trial matching, we build scalable tools that improve efficiency, accuracy,
            and access.</p>
          <a href="#">Get in touch</a>
        </div>
      </div>
      <div className="services__bottom">
        <ul className='services__bottom--list'>
          {
            service.map((item, index) => (
              <li key={index} className={`services__bottom--list-item ${index === 2 ? 'long-description' : ''}`}>
                <div className='div__dot'>
                  <div
                    className='dot'
                    style={{
                      backgroundColor: item.dot,

                    }}
                  ></div>
                </div>
                  <div className='div__content'>
                    <img src={item.img} alt="" />
                    <h3>{item.header}</h3>
                    <p>{item.description}</p>
                  </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Services;