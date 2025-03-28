import { useState } from "react";

function HousePricePredictor() {
  const [formData, setFormData] = useState({
    city: "",
    province: "",
    latitude: "",
    longitude: "",
    lease_term: "",
    type: "",
    beds: "",
    baths: "",
    sq_feet: "",
    furnishing: "Unfurnished",
    smoking: "No",
    pets: false,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    if (Object.values(formData).some((value) => value === "")) {
      setError("All fields are required except pets.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict_house_price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(`Predicted Rental Price: $${data.predicted_price}`);
      } else {
        setError(data.message || "Error predicting house price.");
      }
    } catch (err) {
      setError("Error connecting to the server. Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "24px",
      border: "1px solid lightgray",
      borderRadius: "8px",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    label: {
      fontWeight: "bold",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid lightgray",
      borderRadius: "4px",
    },
    dropdown: {
      width: "100%",
      padding: "8px",
      border: "1px solid lightgray",
      borderRadius: "4px",
    },
    checkboxContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px 24px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    predictionBox: {
      marginTop: "16px",
      backgroundColor: "#DFF0D8",
      border: "1px solid #3C763D",
      padding: "12px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>House Price Predictor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Province:</label>
        <input type="text" name="province" value={formData.province} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Latitude:</label>
        <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Longitude:</label>
        <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Lease Term:</label>
        <input type="text" name="lease_term" value={formData.lease_term} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Beds:</label>
        <input type="number" name="beds" value={formData.beds} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Baths:</label>
        <input type="number" name="baths" value={formData.baths} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Square Feet:</label>
        <input type="number" name="sq_feet" value={formData.sq_feet} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>Furnishing:</label>
        <select name="furnishing" value={formData.furnishing} onChange={handleChange} style={styles.dropdown} required>
          <option value="Unfurnished">Unfurnished</option>
          <option value="Partially Furnished">Partially Furnished</option>
          <option value="Fully Furnished">Fully Furnished</option>
        </select>

        <label style={styles.label}>Smoking:</label>
        <input type="text" name="smoking" value={formData.smoking} onChange={handleChange} style={styles.input} required />

        <label style={styles.label}>I have a pet</label>
        <div style={styles.checkboxContainer}>
          <input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Predict
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}
        {prediction && <div style={styles.predictionBox}>{prediction}</div>}
      </form>
    </div>
  );
}

export default HousePricePredictor;
