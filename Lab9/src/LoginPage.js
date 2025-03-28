import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError(""); 

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/validate_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'username':username, 'password':password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/predict"; // Redirect on success
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to the server. Please try again later.");
    }
  };

  // Define styles as JavaScript objects
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
      backgroundColor: "#f9f9f9",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "bold",
      textAlign: "left",
      marginBottom: "0.3rem",
    },
    input: {
      padding: "0.5rem",
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorMessage: {
      color: "red",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
