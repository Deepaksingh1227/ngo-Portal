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
              alt="Sardar Kartar Singh Jhabbar Trust"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "400px" }}
            />
          </div>

          {/* Text */}
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-3">
              Mission Statement
            </h2>
            <h5 className="fst-italic mb-4">
              “Educating the Devout, Empowering the Dedicated — In Spirit, Faith, and Service.”
            </h5>

            <p className="fs-6 text-muted">
              Inspired by the sacred life and legacy of <strong>Sardar Kartar Singh Jhabbar Ji</strong> — 
              the saint-soldier who led the Gurdwara Sudhar Lehar and reclaimed the sanctity of Sikh 
              institutions from Mahants and colonial control — this Trust is founded to keep his 
              spirit of <strong>sewa, maryada,</strong> and faith-based leadership alive for generations to come.
            </p>

            <p className="fs-6 text-muted">
              Our mission is to honour those who serve the path of righteousness — the 
              <strong> Granthis, Paathis, Raagis, Sewadars, Pujaris, Maulvis</strong> and all who live lives 
              of humble devotion. Their children, often limited by economic means, deserve the fullest 
              access to education, science, technology, civil services, and sports, so that the flame 
              of <strong>Guru da Gyaan</strong> may shine through them in every field of excellence.
            </p>

            <p className="fs-6 text-muted">
              The core principle of this Trust, in true accordance with the vision of 
              <strong> Sardar Kartar Singh Jhabbar Ji</strong>, is that every beneficiary must live as a 
              devout Sikh throughout life — steadfast in <strong>Rehat Maryada</strong>, committed to the 
              teachings of the Ten Gurus, and guided by the eternal light of 
              <strong> Sri Guru Granth Sahib Ji</strong>, the Everliving Guru.
            </p>

            <p className="fs-6 text-muted">
              We believe that education without faith is incomplete, and worldly success without 
              discipline is hollow. Our mission is not merely to fund education, but to nurture souls 
              anchored in Sikhi, hearts devoted to truth, and lives committed to 
              <strong> Naam, Kirat, and Vand Chhakna</strong>.
            </p>

            <p className="fs-6 text-muted">
              Through this Trust, we continue what <strong>Sardar Kartar Singh Jhabbar Ji</strong> began — 
              the creation of a selfless community of learned, upright, and devoted Sikhs who serve 
              humanity with knowledge, humility, and courage until their last breath.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
