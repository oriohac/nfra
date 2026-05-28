import { useNavigate, Link } from "react-router-dom";
import introimage from '../../assets/hanger.png'
import './home.css'
import { useEffect, useState } from "react";
import api from "../../api/api";
const user = {
  userName: "Chikezirim Orioha",
  image: "https://react.dev/images/docs/scientists/yXOvdOSs.jpg",
  imageSize: 80
}

function Posts({ image, title, news, date }) {
  return (
    <div className="post-card">

      <img src={image} alt="" className="post-image" />

      <div className="post-content">

        <p className="post-date">{date}</p>

        <h3 className="post-title">
          {title}
        </h3>

        <p className="post-news">
          {news}
        </p>

      </div>

    </div>
  );
}



export default function Home() {
  const navigate = useNavigate();
  function gotoLogin() {
    navigate('/login')
  }
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      try {


        const response =
          await api.get("/posts/latest");
        setPosts(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchPosts();

  }, []);
  return (
    <div className="page-container">
      <main className="main-content">


        <section className="introsection">

          <div className="introsectiontext">
            <h1>Welcome to the NFRA e-Platform</h1>

            <p>
              Stay updated with the latest news, achievements, programmes,
              improvements, and future plans of the Nigeria Football Referees
              Association.
            </p>

            <button className="learnmorebtn" onClick={() => { navigate("/about") }}>
              Learn More
            </button>
          </div>

          <div className="introsectionimage">
            <img src={introimage} alt="NFRA" />
          </div>

        </section>

        <section className="posts-section">
          <div className="latest-posts"
          >

            <div className="posts-header">

              <h2>Latest News</h2>

              <span
                className="view-all"
                onClick={() => navigate("/posts")}
              >
                View All
              </span>

            </div>

            <div className="posts-grid">

              {posts.map((post) => (

                <div
                  key={post._id}
                  className="post-card"
                  onClick={() =>
                    navigate(`/posts/${post._id}`)
                  }
                >

                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt={post.title}
                  />

                  <div className="post-content">

                    <small>
                      {new Date(
                        post.createdAt
                      ).toDateString()}
                    </small>

                    <h3>{post.title}</h3>

                    <p>{post.content}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        </section>

        <section className="cta-section">

          <div className="cta-card">

            <h2>
              Join The NFRA Community
            </h2>

            <p>
              Become part of the official Nigeria Football Referees
              Association platform and stay connected with updates,
              training programmes, referee development initiatives,
              and important announcements.
            </p>

            <button className="registerbtn" onClick={gotoLogin}>
              Register Now
            </button>

          </div>

        </section>
      </main>

      <footer>
        <div className="footertexts">

          <div className="footerSocials">
            <p>Check our social pages</p>
            <a href="">Facebook</a>
            <br />
            <a href="">X(Former Twitter)</a>
            <br />
            <a href="">Instagram</a>
            <br />
            <a href="mailto:">Email</a>
            <br />
          </div>

          <div className="footerimportantlinks">
            <p>Important Links</p>
            <a href="">The IFAB Laws of the game</a>
            <br />
            <a href="">FIFA</a>
            <br />
          </div>

          <div className="rights">
            <p>All rights reserved NFRA ® 2026</p>
            <br />
          </div>

        </div>
      </footer>

    </div>
  )
}

