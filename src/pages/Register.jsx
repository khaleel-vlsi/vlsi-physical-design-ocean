import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import styles from './Auth.module.css';

const countriesList = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Nepal", code: "+977", flag: "🇳🇵" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "China", code: "+86", flag: "🇨🇳" }
];

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Mandatory Regional Fields
  const [country, setCountry] = useState('India');
  const [countrySearch, setCountrySearch] = useState('India');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [showCountryList, setShowCountryList] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modal logic disabled per user request
  const [showFlowModal, setShowFlowModal] = useState(false);

  useEffect(() => {
    const regionParam = searchParams.get('region');
    if (regionParam === 'International') {
      setCountry('United States');
      setCountrySearch('United States');
      setCountryCode('+1');
    } else if (regionParam === 'India') {
      setCountry('India');
      setCountrySearch('India');
      setCountryCode('+91');
    }
  }, [searchParams]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showCountryList && !e.target.closest(`.${styles.countrySelector}`)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showCountryList]);

  const closeFlowModal = () => {
    sessionStorage.setItem('hasSeenFlowModal', 'true');
    setShowFlowModal(false);
  };

  const goToFlow = () => {
    sessionStorage.setItem('hasSeenFlowModal', 'true');
    navigate('/platform-flow');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (!country) {
      setError("Please select a Country");
      return;
    }
    if (!phoneNumber) {
      setError("Please enter a Mobile Number");
      return;
    }
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!/^\d{7,15}$/.test(cleanPhone)) {
      setError("Mobile Number must contain only digits (between 7 and 15 digits)");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            country: country,
            country_code: countryCode,
            phone_number: cleanPhone
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showFlowModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Wait! Before you register...</h3>
            <p>Have you explored our complete VLSI Learning Flow Graph? It outlines the entire step-by-step journey from Basics to Placement!</p>
            <div className={styles.modalActions}>
              <button onClick={goToFlow} className={styles.btnPrimary}>See the Flow Graph</button>
              <button onClick={closeFlowModal} className={styles.btnSecondary}>Continue to Register</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Create an Account</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Country Selection */}
          <div className={styles.formGroup}>
            <label>Country of Residence</label>
            <div className={styles.countrySelector}>
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowCountryList(true);
                }}
                onFocus={() => setShowCountryList(true)}
                placeholder="Search or type country..."
                required
              />
              {showCountryList && (
                <div className={styles.countryDropdown}>
                  {countriesList
                    .filter((c) =>
                      c.name.toLowerCase().includes(countrySearch.toLowerCase())
                    )
                    .map((c) => (
                      <div
                        key={c.name}
                        className={styles.countryItem}
                        onClick={() => {
                          setCountry(c.name);
                          setCountrySearch(c.name);
                          setCountryCode(c.code);
                          setShowCountryList(false);
                        }}
                      >
                        <span>{c.flag} {c.name}</span>
                        <span style={{ opacity: 0.6 }}>{c.code}</span>
                      </div>
                    ))}
                  {countriesList.filter((c) =>
                    c.name.toLowerCase().includes(countrySearch.toLowerCase())
                  ).length === 0 && (
                    <div
                      className={styles.countryItem}
                      onClick={() => {
                        setCountry(countrySearch);
                        setShowCountryList(false);
                      }}
                    >
                      Use custom: "{countrySearch}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Phone Number */}
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <div className={styles.phoneGroup}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countriesList.map((c) => (
                  <option key={c.name} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Mobile number"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <div className={styles.authLinks}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Register;
