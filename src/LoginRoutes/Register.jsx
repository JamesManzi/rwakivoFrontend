import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!username.trim() || !email.trim() || !password) {
      setMessage("Please complete all fields.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/register", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        setMessage("Account created successfully! Redirecting to login...");
        setMessageType("success");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(res.data.message || "Unable to create your account.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-intro">
        <Link to="#" className="register-brand">
          <span className="register-brand-icon">R</span>
          <span>Rwakivo Market</span>
        </Link>

        <div className="register-intro-content">
          <span className="register-eyebrow">
            JOIN OUR COMMUNITY
          </span>

          <h1>
            Discover more.
            <span> Connect better.</span>
          </h1>

          <p>
            Create your account and discover a convenient way
            to explore products, connect with sellers, and find
            what you need in one marketplace.
          </p>

          <div className="register-benefits">
            <div>
              <span className="register-check">✓</span>
              <span>Create your personal account</span>
            </div>

            <div>
              <span className="register-check">✓</span>
              <span>Explore products from different sellers</span>
            </div>

            <div>
              <span className="register-check">✓</span>
              <span>Get started in just a few steps</span>
            </div>
          </div>
        </div>

        <p className="register-intro-footer">
          Your marketplace journey starts here.
        </p>
      </section>

      <section className="register-form-section">
        <div className="register-container">
          <div className="register-heading">
            <h2>Create your account</h2>
            <p>
              Enter your details below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="register-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                autoComplete="username"
                maxLength={50}
                required
              />
            </div>

            <div className="register-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            
<div className="register-group">
  <label htmlFor="password">Password</label>

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Create a password"
      autoComplete="new-password"
      minLength={8}
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-pressed={showPassword}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>

  <span className="register-hint">
    Use at least 8 characters.
  </span>
</div>


            {message && (
              <div
                className={`register-message ${messageType}`}
                role="alert"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="registerBtn"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="register-links">
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>

          <p className="register-terms">
            By creating an account, you agree to use
            Rwakivo Market responsibly.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
