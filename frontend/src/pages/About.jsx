import React from "react";

function About() {
  return (
        <section id="about" className="py-5 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    {/* Image */}
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                    <img
                        src="/asset/hero-bg.jpeg"
                        alt="About NGOConnect"
                        className="img-fluid rounded shadow"
                        style={{ maxWidth: "400px" }}
                    />
                    </div>

                    {/* Text */}
                    <div className="col-md-6">
                    <h2 className="fw-bold text-primary mb-4">About Us</h2>
                    <p className="fs-5 text-muted">
                        <strong>Sardar Kartar Singh Jhabbar</strong> is dedicated to
                        bridging the gap between NGOs and individuals who want to make a
                        difference.
                    </p>
                    <p className="fs-5 text-muted">
                        Our platform enables seamless connections between volunteers and
                        nonprofits in need, while helping donors support meaningful
                        causes with transparency and impact.
                    </p>
                    <p className="fs-5 text-muted">
                        Whether you're looking to donate, volunteer, or simply learn
                        about initiatives in your community, Sardar Kartar Singh Jhabbar
                        empowers you to take action where it matters most.
                    </p>
                    </div>
                </div>
            </div>
    
        </section>
    );
}
        

export default About;
