import "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";

export default function Main() {
  const [randomPosts, setRandomPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        const data = await response.json();

        const randomIndices = Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * data.length)
        );
        const randomPostsData = randomIndices.map((index) => {
          const { id, title, image, category_names } = data[index];
          return { id, title, image, category_names };
        });
        setRandomPosts(randomPostsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random posts:", error);
        setLoading(false);
      }
    };

    fetchRandomPosts();
  }, []);

  return (
    <div className="main-banner header-text">
      <div className="container-fluid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <OwlCarousel className="owl-banner">
            {randomPosts.map((post) => {
              const { id, title, image, category_names } = post;
              return (
                <section className="item" key={id}>
                  <img
                    src={`http://127.0.0.1:8000${image}`}
                    alt={title}
                    style={{ width: "434.33px", height: "375.86px" }}
                  />
                  <div className="item-content">
                    <div className="main-content">
                      <div className="meta-category">
                        <span>{category_names}</span>
                      </div>
                      <a href={`/post/${id}`}>
                        <h4>{title}</h4>
                      </a>
                    </div>
                  </div>
                </section>
              );
            })}
          </OwlCarousel>
        )}
      </div>
    </div>
  );
}