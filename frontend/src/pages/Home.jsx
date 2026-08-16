import React from "react";
import Hero from "../components/Hero";
import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />

      {/* Intro Section */}
      <section className="py-5">
        <div className="container text-center">
          <p className="fs-6 text-muted">
            {t("homeIntroText")}
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
              <h2 className="fw-bold text-primary mb-3">{t("aboutTrustTitle")}</h2>
              <p className="text-muted">
                {t("aboutTrustP1")}
              </p>
              <p className="text-muted">
                {t("aboutTrustP2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">{t("whatWeDoTitle")}</h2>
          <div className="row g-4">
            {[
              {
                title: t("eduSupportTitle"),
                text: t("eduSupportText"),
              },
              {
                title: t("faithDisciplineTitle"),
                text: t("faithDisciplineText"),
              },
              {
                title: t("commServiceTitle"),
                text: t("commServiceText"),
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
          <h2 className="fw-bold mb-4">{t("coreValuesTitle")}</h2>
          <p className="fs-5 text-muted">{t("coreValuesSub")}</p>
          <p className="text-muted">
            {t("coreValuesDesc")}
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-5" style={{ backgroundColor: "#f5f5f5ff" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3 text-dark">{t("supportMissionTitle")}</h2>
          <p className="text-muted mb-4">
            {t("supportMissionText")}
          </p>

          <a href="/donate" className="btn btn-dark btn-lg me-3">
            {t("donateNowBtn")}
          </a>
          <a href="/contact" className="btn btn-outline-dark btn-lg">
            {t("contactUsBtn")}
          </a>
        </div>
      </section>

    </>
  );
}

export default Home;
