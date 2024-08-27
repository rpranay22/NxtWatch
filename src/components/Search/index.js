import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import './index.css'
import Cookies from 'js-cookie'
import SearchContext from '../../SearchContext'
class Search extends Component {
  state = {
    inpText: '',
  }

  getInput = e => {
    this.setState({
      inpText: e.target.value,
    })
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const searchPosters = () => {
            const {inpText} = this.state
            const {changeUrl} = value
            const url = `https://apis.ccbp.in/videos/all?search=${inpText}`
            changeUrl(url)
          }

          return (
            <div className="srch">
              <input
                type="search"
                placeholder="Search"
                className="src"
                onChange={this.getInput}
              />
              <button data-testid="searchButton">
                <IoIosSearch
                  className="se-icon"
                  size={40}
                  onClick={searchPosters}
                />
              </button>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default Search
