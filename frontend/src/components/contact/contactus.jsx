import { useState } from "react";
import "./contactus.css";
import { toast } from "react-toastify";

export default function ContactUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();
    toast.info("Message sent successfully")

    setFormData({
      name: "",
      email: "",
      message: "",
    });

  };

  return (

    <div className="contact-page">

      <div className="contact-container">

        <div className="contact-info">

          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you. Reach out for support,
            partnerships, or enquiries.
          </p>

          <div className="info-item">
            <strong>Email:</strong>
            <span>support@refereehub.com</span>
          </div>

          <div className="info-item">
            <strong>Phone:</strong>
            <span>+234 800 000 0000</span>
          </div>

          <div className="info-item">
            <strong>Location:</strong>
            <span>Abuja, Nigeria</span>
          </div>

        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>

  );

}