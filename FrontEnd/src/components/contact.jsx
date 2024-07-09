import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const initialState = {
  name: "",
  email: "",
  message: "",
  showMessage: false,
  successMessage: "",
  errorMessage: "",
};

export const Contact = (props) => {
  const [{ name, email, message, showMessage, successMessage, errorMessage }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm(
        "service_tvw07mf",
        "template_ifr0vts",
        e.target,
        "l6zMv7F2dqDK9pHRQ"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setState({
            ...initialState,
            showMessage: true,
            successMessage: "Your message sent successfully",
          });
          setTimeout(() => {
            setState((prevState) => ({ ...prevState, showMessage: false }));
          }, 3000); // Hide message after 3 seconds
        },
        (error) => {
          console.error("Error sending email:", error.text);
          setState({
            ...initialState,
            showMessage: true,
            errorMessage: "Error sending email. Please try again later.",
          });
          setTimeout(() => {
            setState((prevState) => ({ ...prevState, showMessage: false }));
          }, 3000); // Hide message after 3 seconds
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contact Us</h2>
                <p>Feel free to contact us with any questions or inquiries!</p>
              </div>
              {showMessage && (
                <div className={`alert ${successMessage ? 'alert-success' : 'alert-danger'}`}>
                  {successMessage || errorMessage}
                </div>
              )}
              <form name="contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    value={message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-container">
            <h2>In Social Medias</h2>
            <div className="social-links">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram-square"></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
