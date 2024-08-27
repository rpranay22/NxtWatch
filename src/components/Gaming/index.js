import {Component} from 'react'
import './index.css'
import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'
import TrendingPosters from '../TrendingPosters'
import LoaderComponent from '../LoaderComponent'
import FailureView from '../FailureView'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import GamingPoster from '../GamingPoster'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../ThemeContext'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}
class Gaming extends Component {
  state = {
    api: apiStatus.initial,
    gamingPoster: [],
  }
  getGamingPosters = async () => {
    this.setState({
      api: apiStatus.inprogress,
    })
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const gamingPoster = await response.json()

      this.setState({
        api: apiStatus.success,
        gamingPoster: gamingPoster.videos,
      })
    } else {
      this.setState({
        api: apiStatus.failed,
      })
    }
  }

  renderPsData = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.success:
        return this.rsPoster()
      case apiStatus.failed:
        return <FailureView />
    }
  }
  rsPoster = () => {
    const {gamingPoster} = this.state

    return (
      <div className="gposter">
        {gamingPoster.map(ele => (
          <GamingPoster key={ele.id} item={ele} />
        ))}
      </div>
    )
  }
  render() {
    const {api} = this.state
    return (
      <ThemeContext.Consumer>
        {val => {
          const {lightTheme} = val
          return (
            <div className={lightTheme ? 'light' : 'dark'} data-testid = "gaming">
              <Navbar />
              <div className="content">
                <Sidebar />
                <div className="filResults">
                  <div className="heading-trend">
                    <div className="Fire">
                      <SiYoutubegaming size={40} color="red" />
                    </div>
                    <h1>Gaming</h1>
                  </div>
                  <div className="posters">
                    {api === apiStatus.inprogress ? (
                      <LoaderComponent />
                    ) : (
                      this.renderPsData()
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  componentDidMount() {
    this.getGamingPosters()
  }
}
export default Gaming
