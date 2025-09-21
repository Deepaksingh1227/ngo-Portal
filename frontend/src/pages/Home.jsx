import React from "react";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Hero />
      <div className="container text-center mt-5">
        <h2>Welcome to Our NGO Portal</h2>
        <p className="lead">
          Helping students achieve their dreams with the support of donors like you.
        </p>
      </div>
    </>
  );
}

export default Home;
