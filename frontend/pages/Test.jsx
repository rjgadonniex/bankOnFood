import { useEffect, useState } from "react";

export default function Test() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#005b96" }}>bankOnfood</h1>
      <p style={{ color: "#4CAF50" }}>add stuff</p>

      {posts.length === 0 ? (
        <p>None</p>
      ) : (
        posts.map((p) => (
          <div key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
