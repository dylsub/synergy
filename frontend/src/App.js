import { useState, useEffect } from "react"
import "./global.css"

import CompanyReward from "./components/companyreward";
import Modal from "./components/Modal";

function App() {
  const [posts, setPosts] = useState([])
  const [stores, setStores] = useState([])
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState({})

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

  function handleModalClick() {
    setIsLogin(!isLogin)
  }

  function handleLogin(e) {
    const username = document.getElementById("user").value.toLowerCase()
    const password = document.getElementById("pass").value.toLowerCase()

    let rewards;
    try {
      setUser(posts.filter((post) => post.name.toLowerCase() == username && post.pass.toLowerCase() == password)[0].rewards)

      rewards = posts.filter((post) => post.name.toLowerCase() == username && post.pass.toLowerCase() == password)[0].rewards
    } catch (Exception) {
      return;
    }

    let count = 0
    for (const [key, value] of Object.entries(rewards)) {
      stores[count].pointsReceived = value
      count++
    }

    console.log(stores)

    setIsLogin(!isLogin)
    
  }

  function handleLogoff() {
    setIsLogin(true)
    window.location.reload()
  }

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
                  return <div key={store.id} className="grid-item"> <CompanyReward restaurant={store}></CompanyReward> </div>
                })}
              </div>
            </div>
          </div>
        </div>

        { isLogin && <Modal handleModalClick={handleModalClick}>
          <div className="login">
            <div className="login__title">
              <img src="logo.png"></img>
              <h1>Please enter your login</h1>
            </div>
            <h2>Username</h2>
            <input placeholder="Username" id="user"></input>
            <h2>Password</h2>
            <input placeholder="Enter 12345" id="pass"></input>
            <h3 className="login__submit" onClick={handleLogin}>Submit</h3>
          </div>
        </Modal> }

        <div className="disclaimer__box">
          <h3 className="disclaimer">Spend at the respective venues to earn reward points and activate limited-time savings!</h3>
        </div>

        <div className="mobile__socials">
          <a href="https://www.instagram.com/synchrony/" target="_blank">
              <ion-icon class="instagram social" name="logo-instagram"></ion-icon>
          </a>
          <a href="https://x.com/synchrony?lang=en" target="_blank">
              <ion-icon class="twitter social" name="logo-twitter"></ion-icon>
          </a>
          <a href="https://www.facebook.com/SynchronyFinancial/" target="_blank">
              <ion-icon class="facebook social" name="logo-facebook"></ion-icon>
          </a>
        </div>
        <h3 class="login__submit logoff__submit" onClick={handleLogoff}>Log Out</h3>
      </div>
  )
}


export default App;
