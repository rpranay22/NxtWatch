import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import AdvertisementContext from './AdvertisementContext/index'
import SearchContext from './SearchContext/index'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import ThemeContext from './ThemeContext/index'
import SaveContext from './SaveContext'
// Replace your code here
class App extends Component {
  state = {
    addVisible: true,
    savedVideos: [],
    url: '',
    lightTheme: true,
  }
  removeAdd = () => {
    this.setState({
      addVisible: false,
    })
  }
  sve = item => {
    this.setState(ps => {
      return {
        addVisible: ps.addVisible,
        savedVideos: [...ps.savedVideos, item],
      }
    })
  }

  changeUrl = url => {
    this.setState({
      url,
    })
  }
  updateTheme = () => {
    this.setState(ps => {
      return {
        lightTheme: !ps.lightTheme,
      }
    })
  }

  render() {
    const {addVisible, savedVideos, url, lightTheme} = this.state
    console.log('ar123r', savedVideos)
    return (
      <ThemeContext.Provider
        value={{lightTheme, updateTheme: this.updateTheme}}
      >
        <SearchContext.Provider
          value={{
            url,
            changeUrl: this.changeUrl,
          }}
        >
          <AdvertisementContext.Provider
            value={{
              addVisible,
              removeAdd: this.removeAdd,
            }}
          >
            <SaveContext.Provider value={{savedVideos, clickToSave: this.sve}}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/trending" component={Trending} />
                <ProtectedRoute exact path="/gaming" component={Gaming} />
                <ProtectedRoute
                  exact
                  path="/videos/:id"
                  component={VideoItemDetails}
                />
                <ProtectedRoute
                  exact
                  path="/saved-videos"
                  component={SavedVideos}
                />
                <Route component={NotFound} />
              </Switch>
            </SaveContext.Provider>
          </AdvertisementContext.Provider>
        </SearchContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
