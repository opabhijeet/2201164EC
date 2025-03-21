function TrendingPosts() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/posts?type=popular')
        .then(response => setPosts(response.data.popularPosts))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.postId} className="mb-2 p-4 bg-white shadow rounded-lg">
              Post ID: {post.postId} - {post.commentCount} Comments
            </li>
          ))}
        </ul>
      </div>
    );
  }
  