import "./form.css";
import { Link } from "react-router-dom";
import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
  };

const selectCountry = (country) => {
  setFormData((prev) => ({
    ...prev,
    country: country.name,  
    phone: country.phoneCode,
  }));
  setSelectedCountry(country);
  setShowCountryDropdown(false);
  setPhoneNumber("");
};


  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and +
    if (/^[0-9+]*$/.test(value)) {
      setPhoneNumber(value);
      // Remove country code from the value before saving to formData
      const phoneWithoutCode = selectedCountry
        ? value.replace(selectedCountry.phoneCode, "")
        : value;
      setFormData((prev) => ({ ...prev, phone: phoneWithoutCode }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL;

      const dataToSend = {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        phone: selectedCountry
          ? selectedCountry.phoneCode + formData.phone
          : formData.phone,
      };

      const response = await axios.post(`${API}/waitinglist`, dataToSend);

      if (response.status === 200 || response.status === 201) {
        // alert("Successfully joined the waiting list!");
        setShowModal(true);

        setFormData({
          name: "",
          email: "",
          country: "",
          phone: "",
        });
        setSelectedCountry(null);
        setPhoneNumber("");
      }
    } catch (error) {
      alert("Error joining the waiting list. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false); // ✅ stop loading
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
                onBlur={() =>
                  setTimeout(() => setShowCountryDropdown(false), 200)
                }
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
              />
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
              <button onClick={() => navigate("/forms")} className="yes-btn">
                Yes, take me to the survey
              </button>
              <button onClick={() => navigate("/")} className="no-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
