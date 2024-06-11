import { useState, useEffect } from "react"
import "./global.css"

import CompanyReward from "./components/companyreward";

function App() {
  const [posts, setPosts] = useState([])
  const [stores, setStores] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts')
      const resData = await response.json()
      setPosts(resData.posts)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    async function fetchStores() {
      const response = await fetch('http://localhost:8080/stores')
      const resData = await response.json()
      setStores(resData.stores)
    }
    fetchStores()
  }, [])

  return (
      <div className="main">
        <div className="dashboard" id="list">
          <div className="title__content">
            <div className="title__content__header">
              <img src="logo.png"></img>
              <h1>Synchrony Synergy</h1>
            </div>
            <p>View your power-up progress and activate earned rewards.</p>
            <div className="dashboard__content">
              <div className="grid-container">
                {stores.map((store) => {
                  return <div className="grid-item"> <CompanyReward restaurant={store}></CompanyReward> </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


export default App;
