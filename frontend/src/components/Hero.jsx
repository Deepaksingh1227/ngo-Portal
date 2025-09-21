import React from "react";

function Hero() {
  const Gallery = [
    { image: "asset/carousel-2.jpg" },
    { image: "/asset/img2.png" },
    { image: "/asset/img3.png" },
    { image: "/asset/img4.png" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center text-center text-white">
        <img
          src="asset/carousel-2.jpg"
          alt="Background"
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(60%) blur(1px)", zIndex: -1 }}
        />
        <div className="container">
          <h2 className="display-3 fw-bold mb-4">
            Welcome to Sardar Kartar Singh Jhabbar
          </h2>
          <p className="lead mb-5">
            Empowering change by connecting NGOs with passionate volunteers and
            generous donors
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-primary">Gallery</h2>
          <div className="row g-4">
            {Gallery.map((val, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={val.image}
                    alt={`Gallery ${index}`}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
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
    </>
  );
}

export default Hero;
