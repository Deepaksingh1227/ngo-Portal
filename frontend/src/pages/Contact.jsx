import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
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

    // ✅ send using emailjs.send
    emailjs
      .send(
        "service_pbzmicu", // Your EmailJS Service ID
        "template_3rv7u4j", // Your EmailJS Template ID
        formData,
        "N4H-xoVDjgz_NcbDJ" // Your Public Key
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

          <Col md={6}>
            <Card className="contact-card info-card shadow-sm mb-4">
              <Card.Body>
                <h4 className="contact-title">Contact Information</h4>
                <div className="info-item">
                  <FaEnvelope className="icon" />
                  <div>
                    <strong>Email</strong>
                    <p>sardarkartarsinghjhabbartrust@gmail.com</p>
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
            <Card className="contact-card social-card shadow-sm">
              <Card.Body>
                <h4 className="contact-title">Follow Us</h4>
                <p>Connect with us on social media</p>
                <div className="social-icons">

                  <a href="#" className="linkedin">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" className="youtube">
                    <FaYoutube />
                  </a>

                  <a href="#" className="linkedin"><FaLinkedin /></a>
                  <a href="https://www.instagram.com/sksjtrust?igsh=MTYzd2w5M3B3NWd0YQ%3D%3D&utm_source=qr" className="instagram"><FaInstagram /></a>
                  <a href="#" className="youtube"><FaYoutube /></a> 

                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
