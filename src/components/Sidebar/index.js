import {Component} from 'react'
import './index.css'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {withRouter, Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'
class Sidebar extends Component {
  navigateHome = () => {
    const {history} = this.props
    history.push('/')
  }

  navigateTrending = () => {
    const {history} = this.props
    history.push('/trending')
  }

  navigateGaming = () => {
    const {history} = this.props
    history.push('/gaming')
  }
  navigateSaved = () => {
    const {history} = this.props
    history.push('/saved')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {val => {
          const {lightTheme} = val
          return (
            <div className={`sBar ${lightTheme ? 'light' : 'dark'}`}>
              <div className="sideBar">
                <Link to="/" className="sdElement">
                  <MdHome size={20} />
                  <p>Home</p>
                </Link>
                <Link className="sdElement" to="/trending">
                  <FaFire size={20} />
                  <p>Trending</p>
                </Link>
                <Link to="/gaming" className="sdElement">
                  <SiYoutubegaming size={20} />
                  <p>Gaming</p>
                </Link>
                <Link to="/saved-videos" className="sdElement">
                  <IoMdAddCircleOutline size={20} />
                  <p>Saved videos</p>
                </Link>
              </div>
              <div className="footer">
                <p>CONTACT US</p>
                <div className="socialMediaLists">
                  <a href="https://www.facebook.com/">
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                  </a>
                  <a href="https://x.com/i/flow/login">
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                  </a>
                  <a href="https://www.linkedin.com/feed/">
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                    />
                  </a>
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Sidebar)
