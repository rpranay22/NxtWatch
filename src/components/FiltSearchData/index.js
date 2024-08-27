import {Component} from 'react'
import Cookies from 'js-cookie'
import Poster from '../Poster'
import FailureView from '../FailureView'
import LoaderComponent from '../LoaderComponent'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}
class FiltSearchData extends Component {
  state = {
    api: apiStatus.initial,
    postersData: [],
  }

  getPostersData = async () => {
    this.setState({
      api: apiStatus.inprogress,
    })
    const {url} = this.props
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log('srcresponse', response)
    if (response.ok === true) {
      const postersData = await response.json()

      this.setState({
        api: apiStatus.success,
        postersData: postersData.videos,
      })
    } else {
      this.setState({
        api: apiStatus.failed,
      })
    }
  }

  renderData = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.success:
        return this.renderPosters()
      case apiStatus.failed:
        return this.renderFailure()
    }
  }

  renderFailure = () => {
    return <FailureView getPostersData={this.getPostersData} />
  }

  renderPosters = () => {
    const {postersData} = this.state

    return postersData.length !== 0 ? (
      <div className="allPosters">
        {postersData.map(ele => {
          return <Poster key={ele.id} item={ele} />
        })}
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
      </div>
    )
  }

  renderLoader = () => {
    return <LoaderComponent />
  }
  render() {
    const {api} = this.state

    return (
      <div>
        {api === apiStatus.inprogress ? this.renderLoader() : this.renderData()}
      </div>
    )
  }
  componentDidMount() {
    this.getPostersData()
  }
  componentWillUnmount() {
    this.getPostersData()
  }
}
export default FiltSearchData
