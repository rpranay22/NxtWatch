import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
class GamingPoster extends Component {
  render() {
    const {item} = this.props
    const {title, thumbnail_url, view_count, id} = item
    return (
      <Link to={`videos/${id}`} className="nv">
        <div className="smPos">
          <img className="gamingThumbnail" src={thumbnail_url} />
          <p>{title}</p>
          <p>{view_count}</p>
        </div>
      </Link>
    )
  }
}
export default GamingPoster
