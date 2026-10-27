import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
import "./Login.css";

function Login() {
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

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/login", {
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("token", res.data.token);

        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        setTimeout(()=>{
          if(res.data.user.role=="admin"){
            navigate("/adminDashboard");
          } else{
            navigate("/dashboard");
          }
        },1500)
      } else {
        setMessage(res.data.message || "Unable to log in.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to log in. Please check your connection and try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-intro">
        <Link to="/" className="brand">
          <span className="brand-icon">R</span>
          <span>Rwakivo Market</span>
        </Link>

        <div className="intro-content">
          <span className="intro-label">WELCOME TO RWAKIVO</span>

          <h1>
            Your next great find
            <span> starts here.</span>
          </h1>

          <p>
            Discover quality products, explore different sellers,
            and find what you need—all in one convenient marketplace.
          </p>

          <div className="intro-features">
            <div>
              <span className="feature-icon">✓</span>
              <span>Discover products from different sellers</span>
            </div>

            <div>
              <span className="feature-icon">✓</span>
              <span>Shop with convenience</span>
            </div>

            <div>
              <span className="feature-icon">✓</span>
              <span>Connect with sellers</span>
            </div>
          </div>
        </div>

        <p className="intro-footer">
          Discover more. Shop smarter.
        </p>
      </section>

      <section className="login-form-section">
        <div className="login-container">
          <div className="form-heading">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
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

            
<div className="form-group">
  <label htmlFor="password">Password</label>

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      autoComplete="current-password"
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-pressed={showPassword}
    >
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
      />
    </button>
  </div>
</div>


            <div className="form-options">
              <span></span>
              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {message && (
              <div
                className={`login-message ${messageType}`}
                role="alert"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="login-links">
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create an account</Link>
            </p>
          </div>

          <p className="form-footer">
            By continuing, you agree to use Rwakivo Market
            responsibly.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
