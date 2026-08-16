import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Hero() {
  const { t } = useLanguage();

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
          {t("brandName")}
        </h1>

        <p className="lead text-muted">
          {t("heroTagline")}
        </p>
      </div>
    </section>
  );
}

export default Hero;
