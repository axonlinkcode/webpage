import "./form.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Logo from "../../assets/logo.png";
import countries from "../../data/countries";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Use a ref to track the selected country to avoid stale closures
  const selectedCountryRef = useRef(selectedCountry);
  
  useEffect(() => {
    selectedCountryRef.current = selectedCountry;
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!phoneNumber.trim()) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCountryInputChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, country: value }));

    if (value) {
      const filtered = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(value.toLowerCase()) ||
          country.phoneCode.includes(value)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
    
    // Clear selected country when user types manually
    if (selectedCountryRef.current) {
      setSelectedCountry(null);
    }
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setFormData((prev) => ({
      ...prev,
      country: country.name,
    }));
    setShowCountryDropdown(false);
    
    // Auto-focus on phone input after country selection
    document.querySelector('input[name="phone"]')?.focus();
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and +
    if (/^[0-9+]*$/.test(value)) {
      setPhoneNumber(value);
      
      // Remove country code from the value before saving to formData
      const currentCountry = selectedCountryRef.current;
      const phoneWithoutCode = currentCountry
        ? value.replace(currentCountry.phoneCode, "")
        : value;
        
      setFormData((prev) => ({ ...prev, phone: phoneWithoutCode }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL;

      // Use the ref to get the current selected country
      const currentCountry = selectedCountryRef.current;
      
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        country: formData.country, // This should now be reliable
        phone: currentCountry
          ? currentCountry.phoneCode + formData.phone
          : formData.phone,
      };

      console.log("📦 Sending payload:", dataToSend);

      const response = await axios.post(`${API}/waitinglist`, dataToSend);

      if (response.status === 200 || response.status === 201) {
        setShowModal(true);
        setFormData({
          name: "",
          email: "",
          country: "",
          phone: "",
        });
        setSelectedCountry(null);
        setPhoneNumber("");
        setErrors({});
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Please try again later."}`);
      } else {
        alert("Error joining the waiting list. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waiting-list-container">
      <Link to="/" className="waiting-back-link">
        ← Back Home
      </Link>
      <div className="waiting-list">
        <div className="waiting-header">
          <img src={Logo} alt="axonlink logo" />
          <h3>Join our waiting list</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="waiting-list-fields">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <div className="country-input-container">
                <input
                  type="text"
                  name="country"
                  placeholder="Select Country"
                  value={formData.country}
                  onChange={handleCountryInputChange}
                  onFocus={() => setShowCountryDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowCountryDropdown(false), 200)
                  }
                  required
                  className={errors.country ? "error" : ""}
                />
                {showCountryDropdown && (
                  <div className="country-dropdown">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="country-option"
                        onMouseDown={() => selectCountry(country)} // Use onMouseDown to prevent blur from hiding dropdown too soon
                      >
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{
                            width: "1.2em",
                            height: "1.2em",
                            marginRight: "8px",
                          }}
                        />
                        <span className="country-name">{country.name}</span>
                        <span className="country-code">{country.phoneCode}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="input-group">
              <div className="phone-input-container">
                <div className="phone-prefix">
                  {selectedCountry ? (
                    <>
                      <ReactCountryFlag
                        countryCode={selectedCountry.code}
                        svg
                        style={{
                          width: "1.2em",
                          height: "1rem",
                          marginRight: "10px",
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
                  className={errors.phone ? "error" : ""}
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <button type="submit" className="join-button" disabled={loading}>
            {loading ? (
              <div className="btn-loading">
                <span className="btn-text">Submitting</span>
                <span className="spinner"></span>
              </div>
            ) : (
              "Join Waiting List"
            )}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thank you for joining the waiting list!</h3>
            <p>Would you like to take our survey?</p>
            <div className="modal-buttons">
              {/* Fixed: Changed class to className */}
              <button onClick={() => navigate("/forms")} className="yes-btn">
                Yes, take me to the survey
              </button>
              <button onClick={() => navigate("/")} className="no-btn">
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;