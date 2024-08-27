import {Component} from 'react'
import {formatDistanceStrict} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'
class TrendingPosters extends Component {
  render() {
    const {item} = this.props

    const {channel, published_at, thumbnail_url, title, view_count, id} = item
    const {name} = channel
    return (
      <Link to={`videos/${id}`} className="nv">
        <div className="psimgs">
          <img className="thumbnail-images" src={thumbnail_url} />
          <div className="video-detailss">
            <p className="para">{title}</p>
            <p className="para">{name}</p>
            <div className="views">
              <p className="para">{view_count}</p>
              <p className="para">
                {formatDistanceStrict(new Date(published_at), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
export default TrendingPosters
