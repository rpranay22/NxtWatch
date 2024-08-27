import {Component} from 'react'
import Cookies from 'js-cookie'
import Poster from '../Poster'
import FailureView from '../FailureView'
import LoaderComponent from '../LoaderComponent'
import SearchContext from '../../SearchContext'
import ThemeContext from '../../ThemeContext'
import FiltSearchData from '../FiltSearchData'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}
class ListOfPosters extends Component {
  state = {
    api: apiStatus.initial,
    postersData: [],
  }

  getPostersData = async () => {
    this.setState({
      api: apiStatus.inprogress,
    })
    const url = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

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
    return (
      <ul className="allPosters">
        {postersData.map(ele => {
          return <Poster key={ele.id} item={ele} />
        })}
      </ul>
    )
  }

  renderLoader = () => {
    return <LoaderComponent />
  }

  render() {
    const {api} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <SearchContext.Consumer>
              {val => {
                let {url} = val

                return url.length === 0 ? (
                  <div className={lightTheme ? 'light' : 'dark'}>
                    {api === apiStatus.inprogress
                      ? this.renderLoader()
                      : this.renderData()}
                  </div>
                ) : (
                  <FiltSearchData />
                )
              }}
            </SearchContext.Consumer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  componentDidMount() {
    this.getPostersData()
  }
}
export default ListOfPosters
