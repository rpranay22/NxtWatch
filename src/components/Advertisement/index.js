import {Component} from 'react'
import {AiOutlineScissor} from 'react-icons/ai'
import AdvertisementContext from '../../AdvertisementContext/index'
import './index.css'
class Advertisement extends Component {
  render() {
    return (
      <AdvertisementContext.Consumer>
        {value => {
          const {addVisible, removeAdd} = value
          const removeAdds = () => {
            removeAdd()
          }
          return (
            <div className="adv" data-testid="banner">
              <div className="conten">
                <img
                  className="image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                />
                <p>Buy Nxt Watch Premium</p>
                <button className="getItBtn">GET IT NOW</button>
              </div>
              <button data-testid="close">
                <AiOutlineScissor onClick={removeAdds} />
              </button>
            </div>
          )
        }}
      </AdvertisementContext.Consumer>
    )
  }
}
export default Advertisement
