import {Component} from 'react'
import {FaFire} from 'react-icons/fa'
import Cookies from 'js-cookie'
import TrendingPosters from '../TrendingPosters'
import LoaderComponent from '../LoaderComponent'
import FailureView from '../FailureView'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import ThemeContext from '../../ThemeContext'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}
class Trending extends Component {
  state = {
    api: apiStatus.initial,
    trendingPoster: [],
  }
  getTrendingPosters = async () => {
    this.setState({
      api: apiStatus.inprogress,
    })
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const trendingPoster = await response.json()

      this.setState({
        api: apiStatus.success,
        trendingPoster: trendingPoster.videos,
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
    const {trendingPoster} = this.state

    return trendingPoster.map(ele => (
      <TrendingPosters key={ele.id} item={ele} />
    ))
  }
  render() {
    const {api} = this.state
    return (
      <ThemeContext.Consumer>
        {val => {
          const {lightTheme} = val
          return (
            <div className={lightTheme ? 'light' : 'dark'}>
              <Navbar />
              <div className="content">
                <Sidebar />
                <div className="filResults">
                  <div className="heading-trend">
                    <div className="Fire">
                      <FaFire size={40} color="red" />
                    </div>
                    <h1>Trending</h1>
                  </div>
                  <ul className="posters">
                    {api === apiStatus.inprogress ? (
                      <LoaderComponent />
                    ) : (
                      this.renderPsData()
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  componentDidMount() {
    this.getTrendingPosters()
  }
}
export default Trending
