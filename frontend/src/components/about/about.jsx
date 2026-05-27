import "./about.css";

export default function About() {

  return (

    <div className="about-page">

      <section className="about-hero">

        <div className="about-overlay">

          <h1>About Us</h1>

          <p>
            Empowering referees through technology, transparency,
            and professional development.
          </p>

        </div>

      </section>

      <section className="about-content">

        <div className="about-card">

          <h2>Who We Are</h2>

          <p>
            We are a modern football referee management platform
            designed to help referees manage appointments,
            submit reports, track officiating records, and stay
            connected with football governing bodies.
          </p>

          <p>
            Our goal is to create a digital ecosystem that improves
            efficiency, accountability, and professionalism within
            football officiating.
          </p>

        </div>

        <div className="mission-grid">

          <div className="mission-card">

            <h3>Our Mission</h3>

            <p>
              To simplify referee administration and create
              opportunities for referees to grow professionally.
            </p>

          </div>

          <div className="mission-card">

            <h3>Our Vision</h3>

            <p>
              To become the leading referee management platform
              across Africa and beyond.
            </p>

          </div>

          <div className="mission-card">

            <h3>Core Values</h3>

            <p>
              Integrity, professionalism, fairness, transparency,
              and innovation.
            </p>

          </div>

        </div>

      </section>

    </div>

  );

}