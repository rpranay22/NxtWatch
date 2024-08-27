import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceStrict} from 'date-fns'
class Poster extends Component {
  render() {
    const {item} = this.props

    const {channel, published_at, thumbnail_url, title, view_count, id} = item
    const {name, profile_image_url} = channel
    return (
      <li to={`/videos/${id}`}>
        <Link to={`/videos/${id}`} className="psimg nv">
          <img
            className="thumbnail-image"
            src={thumbnail_url}
            alt="video thumbnail"
          />
          <div className="video-details">
            <img
              className="profile-image"
              src={profile_image_url}
              alt="channel logo"
            />
            <div>
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
      </li>
    )
  }
}
export default Poster
