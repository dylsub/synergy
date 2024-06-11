import { useState, useEffect } from "react"
import "./global.css"

import CompanyReward from "./components/companyreward";
import Modal from "./components/Modal";

function App() {
  const [posts, setPosts] = useState([])
  const [stores, setStores] = useState([])
  const [isLogin, setIsLogin] = useState(true)

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
            <input placeholder="Username"></input>
            <h2>Password</h2>
            <input placeholder="Password"></input>
            <h3 className="login__submit">Submit</h3>
          </div>
        </Modal> }
      </div>
  )
}


export default App;
