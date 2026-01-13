import React from "react";

function Hero() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <img
          src="logo.jpeg"
          alt="Trust Logo"
          style={{ maxWidth: "180px" }}
          className="mb-4"
        />

        <h1 className="fw-bold mb-3">
          Sardar Kartar Singh Jhabbar Trust
        </h1>

        <p className="lead text-muted">
          Educating the Devout, Empowering the Dedicated — In Spirit, Faith, and Service
        </p>
      </div>
    </section>
  );
}

export default Hero;
