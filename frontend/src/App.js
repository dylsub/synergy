import { useState, useEffect } from "react"
import "./global.css"

import CompanyReward from "./components/companyreward";


const pointsReceived = 500;
const totalPoints = 500;
const restaurant = {
  name: "Chipotle",
  logo: "/sams.png", // Absolute path to the image in the public folder
  pointsReceived,
  totalPoints,
  pointsLeft: totalPoints - pointsReceived,
};



function App() {
  const [posts, setPosts] = useState([])

  const companies = [<CompanyReward restaurant={restaurant} />, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts')
      const resData = await response.json()
      setPosts(resData.posts)
    }
    fetchPosts()
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
              <div class="grid-container">
                {companies.map((company) => {
                  return <div class="grid-item">{company}</div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


export default App;
