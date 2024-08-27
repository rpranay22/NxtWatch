import {Component} from 'react'
import './index.css'
import ThemeContext from '../../ThemeContext'
class FailureView extends Component {
  retryRendering = () => {
    const {getPostersData} = this.props
    getPostersData()
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <div className={`failed-content ${lightTheme ? 'light' : 'dark'}`}>
              <img
                className="failed-image"
                src={
                  lightTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                }
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>
                We are having some trouble to complete your request. Please try
                again.
              </p>

              <button className="retryBtn" onClick={this.retryRendering}>
                Retry
              </button>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default FailureView
