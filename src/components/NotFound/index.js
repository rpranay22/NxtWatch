import ThemeContext from '../../ThemeContext'
import './index.css'
const NotFound = () => {
  return (
    <ThemeContext.Consumer>
      {val => {
        const {lightTheme} = val
        return (
          <div className={lightTheme ? 'light' : 'dark'}>
            <img
              src={
                lightTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              }
            />
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found.</p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default NotFound
