import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"

const Footer = () => {
  return (
    <>
      

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo3.png' alt='' />
              <h2>Smart India Hackathon'24</h2>
              <h2>Trust is what matters</h2>
              <p>Blochain will assist us in that</p>
              
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span className="col">© 2024 Blockchain. Made by Sagara BG.</span>
      </div>
    </>
  )
}

export default Footer
