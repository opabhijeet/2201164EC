import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

// Top Users Component
function TopUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Top Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.userId} className="mb-2 p-4 bg-white shadow rounded-lg">
            {user.userName} - {user.postCount} Posts
          </li>
        ))}
      </ul>
    </div>
  );
}

// Trending Posts Component
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

// Feed Component
function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('http://localhost:3000/posts?type=latest')
      .then(response => setPosts(response.data.latestPosts))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Feed</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2 p-4 bg-white shadow rounded-lg">
            {post.content} - {new Date(post.createdAt).toLocaleString()} ({post.commentCount} Comments)
          </li>
        ))}
      </ul>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <div className="flex justify-around">
            <Link to="/" className="text-white font-semibold">Top Users</Link>
            <Link to="/trending" className="text-white font-semibold">Trending Posts</Link>
            <Link to="/feed" className="text-white font-semibold">Feed</Link>
          </div>
        </nav>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
