import { useState, useEffect } from "react"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts')
      const resData = await response.json()
      setPosts(resData.posts)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <h1>Hello!{console.log(posts)}</h1>
    </div>
  );
}

export default App;
