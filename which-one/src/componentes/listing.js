import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// Define the Listing component
export default function Listing() {
  // State to store the fetched post data
  const [postData, setPostData] = useState([]);
  // State to track the number of posts to display
  const [postsToShow, setPostsToShow] = useState(8);

  const [recentPosts, setRecentPosts] = useState([]);
  // Effect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'https://api.example.com/posts' with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/');
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecentPosts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/`);
            const data = await response.json();
            // Assuming data is an array of posts
            const slicedPosts = data.slice(0, 3); // Get the first three posts
            setRecentPosts(slicedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    fetchRecentPosts();
}, []);

  // Function to load more posts
  const loadMorePosts = () => {
    setPostsToShow(postsToShow + 8); // Increase the number of posts to display
  };

  // Render the component
  return (
    <>
      <section className="blog-posts">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                {postData.slice(0, postsToShow).map((post) => (
                  <div className="col-lg-12" key={post.id}>
                    <div className="blog-post">
                      <div className="blog-thumb">
                        <img src={`http://127.0.0.1:8000${post.image}`} alt="" style={{ width: "730px", height: "322px" }}/>
                      </div>
                      <div className="down-content">
                        <span>{post.category_names}</span>
                          <Link className="main-button" to={`/post/${post.id}`}>
                          <h4>{post.title}</h4>
                          </Link>
                        <p>
                          {post.description}{" "}
                        </p>
                        
                      </div>
                    </div>
                  </div>))}

                  <div className="col-lg-12">
                  {postsToShow < postData.length && (
                    <div className="main-button">
                      <a onClick={loadMorePosts}>View All Posts</a>
                    </div>)}
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
                                                        <h5>
                                                            {post.title}
                                                        </h5></Link>
                                                    </li>))}
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
                          <li><Link to="/compare">- Compare</Link></li>
                          <li><Link to={"/how-to"}>- How To</Link></li>
                          <li><Link to={"/deals"}>- Deals</Link></li>
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
