import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import ControlledPopup from '../ControlledPopup'
import ThemeContext from '../../ThemeContext'
import {FaAffiliatetheme} from 'react-icons/fa'
import {GoLightBulb} from 'react-icons/go'
class Navbar extends Component {
  logOut = () => {
    return
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme, updateTheme} = value
          const updateThemes = () => {
            updateTheme()
          }

          return (
            <ul className="nav">
              <img
                className="image"
                src={
                  lightTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                }
                alt="website logo"
              />

              <li className="upd">
                <button data-testid="theme">
                  {lightTheme ? (
                    <FaAffiliatetheme
                      className="theme-icon"
                      onClick={updateThemes}
                    />
                  ) : (
                    <GoLightBulb
                      className="theme-icon"
                      onClick={updateThemes}
                    />
                  )}
                </button>

                <img
                  className="image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
                <ControlledPopup />
              </li>
            </ul>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Navbar
