import React from "react";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Hero />

      {/* Intro Section */}
      <section className="py-5">
        <div className="container text-center">
          <p className="fs-6 text-muted">
              Inspired by the sacred life and legacy of <strong>Sardar Kartar Singh Jhabbar Khalsa</strong> — 
              the saint-soldier who led the Gurdwara Sudhar Lehar and reclaimed the sanctity of Sikh 
              institutions from Mahants and colonial control — this Trust is founded to keep his 
              spirit of <strong>sewa, maryada,</strong> and faith-based leadership alive for generations to come.
            </p>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4">
              <img
                src="/asset/hero-bg.jpeg"
                alt="Sardar Kartar Singh Jhabbar"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "380px" }}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold text-primary mb-3">About the Trust</h2>
              <p className="text-muted">
                The Trust supports families devoted to religious service by
                promoting education, moral discipline, and community leadership.
              </p>
              <p className="text-muted">
                Our mission is to help students grow into educated, responsible,
                and spiritually grounded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">What We Do</h2>
          <div className="row g-4">
            {[
              {
                title: "Education Support",
                text: "Scholarships and academic support for deserving students.",
              },
              {
                title: "Faith & Discipline",
                text: "Encouraging spiritual growth rooted in Sikh values.",
              },
              {
                title: "Community Service",
                text: "Promoting seva, humility, and leadership.",
              },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Core Values</h2>
          <p className="fs-5 text-muted">Naam • Kirat • Vand Chhakna</p>
          <p className="text-muted">
            True education is the harmony of knowledge, discipline, and faith.
          </p>
        </div>
      </section>

      {/* Call To Action */}
     <section className="py-5" style={{ backgroundColor: "#f5f5f5ff" }}>
  <div className="container text-center">
    <h2 className="fw-bold mb-3 text-dark">Support the Mission</h2>
    <p className="text-muted mb-4"> 
      Your contribution helps build a future grounded in values and education.
    </p>

    <a href="/donate" className="btn btn-dark btn-lg me-3">
      Donate Now
    </a>
    <a href="/contact" className="btn btn-outline-dark btn-lg">
      Contact Us
    </a>
  </div>
</section>

    </>
  );
}

export default Home;
