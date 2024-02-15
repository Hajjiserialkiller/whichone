import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Compareblog() {
  const [categoryPosts, setCategoryPosts] = useState([]);

  const [recentPosts, setRecentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/`);
        const data = await response.json();
        const filteredPosts = data.filter((post) => {
          const includesCompare = post.category_names.includes("compare");
          return includesCompare;
        });

        setCategoryPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsByCategory();
  });

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/`);
        const data = await response.json();
        // Assuming data is an array of posts
        const slicedPosts = data.slice(0, 3); // Get the first three posts
        setRecentPosts(slicedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = categoryPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="heading-page header-text">
        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-content">
                  <h4>Recent Posts</h4>
                  <h2>Our Recent Blog Entries</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="blog-posts grid-system">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  {currentPosts.map((post) => (
                    <div className="col-lg-6" key={post.id}>
                      <div className="blog-post">
                        <div className="blog-thumb">
                          <img
                            src={post.image}
                            alt=""
                            style={{ width: "350px", height: "322px" }}
                          />
                        </div>
                        <div className="down-content">
                          <span>{post.category_names}</span>
                          <Link to={`/post/${post.id}`}>
                            <h4>{post.title}</h4>
                          </Link>
                          <p>
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12">
                    <ul className="page-numbers">
                      {Array.from(
                        {
                          length: Math.ceil(
                            categoryPosts.length / postsPerPage
                          ),
                        },
                        (_, index) => (
                          <li
                            key={index + 1}
                            className={
                              currentPage === index + 1 ? "active" : ""
                            }
                          >
                            <a href="#" onClick={() => paginate(index + 1)}>
                              {index + 1}
                            </a>
                          </li>
                        )
                      )}
                      <li>
                      <a href="#" onClick={() => paginate(currentPage + 1)}>
                      <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sidebar-item search">
                      <form id="search_form" name="gs" method="GET" action="#">
                        <input
                          type="text"
                          name="q"
                          className="searchText"
                          placeholder="type to search..."
                          autoComplete="on"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item recent-posts">
                      <div className="sidebar-heading">
                        <h2>Recent Posts</h2>
                      </div>
                      <div className="content">
                        <ul>
                          {recentPosts.map((post) => (
                            <li key={post.id}>
                              <Link to={`/post/${post.id}`}>
                                <h5>{post.title}</h5>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item categories">
                      <div className="sidebar-heading">
                        <h2>Categories</h2>
                      </div>
                      <div className="content">
                        <ul>
                          <li>
                            <Link to="/compare">- Compare</Link>
                          </li>
                          <li>
                            <Link to={"/how-to"}>- How To</Link>
                          </li>
                          <li>
                            <Link to={"/deals"}>- Deals</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
