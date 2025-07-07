import './form.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';

// Country data with ISO codes and phone prefixes
const africanCountries = [
  { name: 'Algeria', code: 'DZ', phoneCode: '+213' },
  { name: 'Angola', code: 'AO', phoneCode: '+244' },
  { name: 'Benin', code: 'BJ', phoneCode: '+229' },
  { name: 'Botswana', code: 'BW', phoneCode: '+267' },
  { name: 'Burkina Faso', code: 'BF', phoneCode: '+226' },
  { name: 'Burundi', code: 'BI', phoneCode: '+257' },
  { name: 'Cabo Verde', code: 'CV', phoneCode: '+238' },
  { name: 'Cameroon', code: 'CM', phoneCode: '+237' },
  { name: 'Central African Republic', code: 'CF', phoneCode: '+236' },
  { name: 'Chad', code: 'TD', phoneCode: '+235' },
  { name: 'Comoros', code: 'KM', phoneCode: '+269' },
  { name: 'Congo (Congo-Brazzaville)', code: 'CG', phoneCode: '+242' },
  { name: 'Democratic Republic of the Congo', code: 'CD', phoneCode: '+243' },
  { name: 'Djibouti', code: 'DJ', phoneCode: '+253' },
  { name: 'Egypt', code: 'EG', phoneCode: '+20' },
  { name: 'Equatorial Guinea', code: 'GQ', phoneCode: '+240' },
  { name: 'Eritrea', code: 'ER', phoneCode: '+291' },
  { name: 'Eswatini', code: 'SZ', phoneCode: '+268' },
  { name: 'Ethiopia', code: 'ET', phoneCode: '+251' },
  { name: 'Gabon', code: 'GA', phoneCode: '+241' },
  { name: 'Gambia', code: 'GM', phoneCode: '+220' },
  { name: 'Ghana', code: 'GH', phoneCode: '+233' },
  { name: 'Guinea', code: 'GN', phoneCode: '+224' },
  { name: 'Guinea-Bissau', code: 'GW', phoneCode: '+245' },
  { name: 'Ivory Coast (Côte d\'Ivoire)', code: 'CI', phoneCode: '+225' },
  { name: 'Kenya', code: 'KE', phoneCode: '+254' },
  { name: 'Lesotho', code: 'LS', phoneCode: '+266' },
  { name: 'Liberia', code: 'LR', phoneCode: '+231' },
  { name: 'Libya', code: 'LY', phoneCode: '+218' },
  { name: 'Madagascar', code: 'MG', phoneCode: '+261' },
  { name: 'Malawi', code: 'MW', phoneCode: '+265' },
  { name: 'Mali', code: 'ML', phoneCode: '+223' },
  { name: 'Mauritania', code: 'MR', phoneCode: '+222' },
  { name: 'Mauritius', code: 'MU', phoneCode: '+230' },
  { name: 'Morocco', code: 'MA', phoneCode: '+212' },
  { name: 'Mozambique', code: 'MZ', phoneCode: '+258' },
  { name: 'Namibia', code: 'NA', phoneCode: '+264' },
  { name: 'Niger', code: 'NE', phoneCode: '+227' },
  { name: 'Nigeria', code: 'NG', phoneCode: '+234' },
  { name: 'Rwanda', code: 'RW', phoneCode: '+250' },
  { name: 'Sao Tome and Principe', code: 'ST', phoneCode: '+239' },
  { name: 'Senegal', code: 'SN', phoneCode: '+221' },
  { name: 'Seychelles', code: 'SC', phoneCode: '+248' },
  { name: 'Sierra Leone', code: 'SL', phoneCode: '+232' },
  { name: 'Somalia', code: 'SO', phoneCode: '+252' },
  { name: 'South Africa', code: 'ZA', phoneCode: '+27' },
  { name: 'South Sudan', code: 'SS', phoneCode: '+211' },
  { name: 'Sudan', code: 'SD', phoneCode: '+249' },
  { name: 'Tanzania', code: 'TZ', phoneCode: '+255' },
  { name: 'Togo', code: 'TG', phoneCode: '+228' },
  { name: 'Tunisia', code: 'TN', phoneCode: '+216' },
  { name: 'Uganda', code: 'UG', phoneCode: '+256' },
  { name: 'Zambia', code: 'ZM', phoneCode: '+260' },
  { name: 'Zimbabwe', code: 'ZW', phoneCode: '+263' }
];

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(africanCountries);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleCountryInputChange = (e) => {
  const value = e.target.value;
  setFormData(prev => ({ ...prev, country: value }));

  if (value) {
    const filtered = africanCountries.filter(country => 
      country.name.toLowerCase().includes(value.toLowerCase()) ||
      country.phoneCode.includes(value)
    );
    setFilteredCountries(filtered);
  } else {
    setFilteredCountries(africanCountries);
  }
};


  const selectCountry = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      country: country.name,
      phone: country.phoneCode // Set phone code in form data
    }));
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setPhoneNumber(''); // Initialize phone input with country code
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and +
    if (/^[0-9+]*$/.test(value)) {
      setPhoneNumber(value);
      // Remove country code from the value before saving to formData
      const phoneWithoutCode = selectedCountry 
        ? value.replace(selectedCountry.phoneCode, '')
        : value;
      setFormData(prev => ({ ...prev, phone: phoneWithoutCode }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const dataToSend = {
        ...formData,
        // Include full phone number with country code in submission
        phone: selectedCountry ? selectedCountry.phoneCode + formData.phone : formData.phone
      };
      const response = await axios.post(`${API}/waitinglist`, dataToSend);
      if (response.status === 200 || response.status === 201) {
        alert('Successfully joined the waiting list!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          country: '',
          phone: '',
        });
        setSelectedCountry(null);
        setPhoneNumber('');
      }
    } catch (error) {
      alert('Error joining the waiting list. Please try again later.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="waiting-list-container">
      <div className="waiting-list">
        <div className="waiting-header">
          <Link to='/' className="back-link">← Back Home</Link>
          <h3>Join our waiting list</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="waiting-list-fields">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange} 
              required
            />
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange} 
              required
            />
            
            <div className="country-input-container">
              <input
                type="text"
                name="country"
                placeholder="Select Country"
                value={formData.country}
                onChange={handleCountryInputChange}
                onFocus={() => setShowCountryDropdown(true)}
                onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                required
              />
              {showCountryDropdown && (
                <div className="country-dropdown">
                  {filteredCountries.map((country) => (
                    <div 
                      key={country.code}
                      className="country-option"
                      onClick={() => selectCountry(country)}
                    >
                      <ReactCountryFlag 
                        countryCode={country.code} 
                        svg 
                        style={{
                          width: '1.2em',
                          height: '1.2em',
                          marginRight: '8px'
                        }}
                      />
                      <span className="country-name">{country.name}</span>
                      <span className="country-code">{country.phoneCode}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="phone-input-container">
              <div className="phone-prefix">
                {selectedCountry ? (
                  <>
                    <ReactCountryFlag 
                      countryCode={selectedCountry.code} 
                      svg 
                      style={{
                        width: '1.2em',
                        height: '1.2em',
                        marginRight: '6px'
                      }}
                    />
                    <span>{selectedCountry.phoneCode}</span>
                  </>
                ) : (
                  <span>+</span>
                )}
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="join-button">
            Join Waiting List
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;