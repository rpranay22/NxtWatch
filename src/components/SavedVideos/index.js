import {Component} from 'react'
import SaveContext from '../../SaveContext'
import TrendingPosters from '../TrendingPosters'
import {FaFire} from 'react-icons/fa'
import {formatDistanceStrict} from 'date-fns'
import Navbar from '../Navbar'
import './index.css'
import Sidebar from '../Sidebar'
import ThemeContext from '../../ThemeContext'
class SavedVideos extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {val => {
          const {lightTheme} = val
          return (
            <SaveContext.Consumer>
              {value => {
                const {savedVideos} = value
                const renderNoVideos = () => {
                  return (
                    <div className={`nivid ${lightTheme ? 'light' : 'dark'}`}>
                      <img
                        className="novid"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <h1>No saved videos found</h1>
                      <p>Save your videos by clicking a button</p>
                      <p>You can savr your videos while watching them</p>
                    </div>
                  )
                }
                const renderSavedVideos = () => {
                  return (
                    <ul className={lightTheme ? 'light' : 'dark'}>
                      {savedVideos.map(ele => (
                        <TrendingPosters key={ele.id} item={ele} />
                      ))}
                    </ul>
                  )
                }

                return (
                  <div
                    className={lightTheme ? 'light' : 'dark'}
                    data-testid="savedVideos"
                  >
                    <Navbar />
                    <div className="content">
                      <Sidebar />
                      <div className="filResults">
                        <div className="heading-trend">
                          <div className="Fire">
                            <FaFire size={40} color="red" />
                          </div>
                          <h1>Saved Videos</h1>
                        </div>
                        {savedVideos.length === 0
                          ? renderNoVideos()
                          : renderSavedVideos()}
                      </div>
                    </div>
                  </div>
                )
              }}
            </SaveContext.Consumer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
