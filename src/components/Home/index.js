import {Component} from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Advertisement from '../Advertisement'
import ListOfPosters from '../ListOfPosters'
import Search from '../Search'
import AdvertisementContext from '../../AdvertisementContext/index'
import ThemeContext from '../../ThemeContext'
import './index.css'
class Home extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <AdvertisementContext.Consumer>
              {value => {
                const {addVisible} = value
                return (
                  <div className={lightTheme ? 'light' : 'dark'} data-testid = "home">
                    <Navbar />
                    <div className="content">
                      <Sidebar />
                      <div className="filResults">
                        {addVisible && <Advertisement />}
                        <div
                          className={`srcres ${lightTheme ? 'light' : 'dark'}`}
                        >
                          <Search />
                          <ListOfPosters />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }}
            </AdvertisementContext.Consumer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
