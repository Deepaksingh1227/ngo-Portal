import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaInstagram,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_pbzmicu",
        "template_3rv7u4j",
        formData,
        "N4H-xoVDjgz_NcbDJ"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
          setFormData({ from_name: "", from_email: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Message sending failed. Please try again.");
        }
      );
  };

  return (
    <div className="contact-section py-5">
      <Container>
        <h2 className="text-center section-title mt-5">Get In Touch</h2>
        <p className="text-center section-subtitle mb-5">
          Ready to start your learning journey? Contact us today and transform
          your career with expert guidance.
        </p>
        <Row className="gy-4">
          {/* Form Section */}
          <Col md={6}>
            <Card className="contact-card form-card shadow-sm">
              <Card.Body>
                <h4 className="contact-title">Send us a Message</h4>
                <p className="contact-subtitle">
                  We'll get back to you within 24 hours
                </p>
                <Form onSubmit={sendEmail}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="your.email@example.com"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Tell us about your learning goals..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button className="send-btn w-100" type="submit">
                    <FaPaperPlane className="me-2" /> Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Info Section */}
          <Col md={6}>
            <Card className="contact-card info-card shadow-sm mb-4">
              <Card.Body>
                <h4 className="contact-title">Contact Information</h4>
                <div className="info-item">
                  <FaEnvelope className="icon" />
                  <div>
                    <strong>Email</strong>
                    <p className="break-text">
                      sardarkartarsinghjhabbartrust@gmail.com
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhoneAlt className="icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>+91 9872999283</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="icon" />
                  <div>
                    <strong>Visit Us</strong>
                    <p>Delhi, India</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card className="contact-card social-card shadow-sm">
              <Card.Body>
                <h4 className="contact-title">Follow Us</h4>
                <p>Connect with us on social media</p>
                <div className="social-icons">
                  <a
                    href="https://www.instagram.com/sksjtrust"
                    className="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Embedded CSS */}
      <style jsx="true">{`
        .contact-section {
          background: #f5f7fa;
          min-height: 100vh;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #004b8d;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #555;
        }

        .contact-card {
          border-radius: 15px;
          padding: 20px;
          background-color: #ffffff;
          transition: all 0.3s ease-in-out;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .form-card .contact-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #004b8d;
        }

        .form-card .contact-subtitle {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 20px;
        }

        .send-btn {
          background: #004b8d;
          border: none;
          font-weight: 600;
          padding: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .send-btn:hover {
          background: #0066cc;
          transform: translateY(-2px);
        }

        .info-card .contact-title,
        .social-card .contact-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #004b8d;
          margin-bottom: 15px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .info-item .icon {
          font-size: 1.5rem;
          color: #004b8d;
          margin-right: 15px;
          flex-shrink: 0;
        }

        .info-item p {
          margin: 0;
          color: #555;
          font-size: 0.95rem;
        }

        .break-text {
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
        }

        .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          margin-right: 10px;
          background-color: #004b8d;
          color: #fff;
          border-radius: 50%;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-icons a:hover {
          background-color: #0066cc;
          transform: scale(1.1);
        }

        @media (max-width: 767px) {
          .contact-section {
            padding: 40px 10px;
          }
          .section-title {
            font-size: 2rem;
          }
          .section-subtitle {
            font-size: 1rem;
          }
          .contact-card {
            padding: 15px;
          }
          .send-btn {
            font-size: 0.95rem;
          }
          .social-icons a {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
          .break-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
