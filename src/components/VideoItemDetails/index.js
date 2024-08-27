import {Component} from 'react'
import Cookies from 'js-cookie'
import Poster from '../Poster'
import {FaFire} from 'react-icons/fa'
import FailureView from '../FailureView'
import LoaderComponent from '../LoaderComponent'
import {BiLike} from 'react-icons/bi'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {BiDislike} from 'react-icons/bi'
import {formatDistanceStrict} from 'date-fns'
import './index.css'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import SaveContext from '../../SaveContext'
import ReactPlayer from 'react-player'
import './index.css'
const apiStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}
class VideoItemDetails extends Component {
  state = {
    api: apiStatus.initial,
    videoData: {},
    isLiked: false,
    isDisliked: false,
  }

  getVideoData = async () => {
    this.setState({
      api: apiStatus.inprogress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const videoData = await response.json()

      this.setState({
        api: apiStatus.success,
        videoData,
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
    const {videoData} = this.state

    const {video_details} = videoData
    const {view_count, published_at, description} = video_details

    const {title, video_url, channel} = video_details

    const {name, profile_image_url, subscriber_count} = channel
    return (
      <SaveContext.Consumer>
        {value => {
          const {savedVideos, clickToSave} = value
          const saved = () => {
            clickToSave(video_details)
          }

          const likes = () => {
            this.setState(ps => {
              return {
                isLiked: !ps.isLiked,
                isDisliked: false,
              }
            })
          }

          const dislikes = () => {
            this.setState(ps => {
              return {
                isLiked: false,
                isDisliked: !ps.isDisliked,
              }
            })
          }
          const {isLiked, isDisliked} = this.state
          return (
            <div>
              <Navbar />
              <div className='content'>
                <Sidebar />
                <div className='filResults'>
                  <div className='heading-trend'>
                    <ReactPlayer url={video_url} controls />
                  </div>
                  <div className='allPosters'>
                    <h1>{title}</h1>
                    <div className='cnt'>
                      <div className='sm'>
                        <p>{view_count}</p>
                        <p>
                          {formatDistanceStrict(
                            new Date(),
                            new Date(published_at),
                          )}
                        </p>
                      </div>
                      <div className='lk'>
                        <div
                          className={`like sm ${isLiked && 'blue'}`}
                          onClick={likes}
                        >
                          <BiLike />
                          <button>Like</button>
                        </div>
                        <div
                          className={`dislike sm ${isDisliked && 'blue'}`}
                          onClick={dislikes}
                        >
                          <BiDislike />
                          <button>Dislike</button>
                        </div>
                        <div className='save sm'>
                          <IoMdAddCircleOutline size={20} />
                          <button onClick={saved}>Save</button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className='details'>
                      <img
                        className='pimg'
                        src={profile_image_url}
                        alt='channel logo'
                      />
                      <div className='dt'>
                        <p>{name}</p>
                        <p>{subscriber_count} subscribers</p>
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </SaveContext.Consumer>
    )
  }

  renderLoader = () => {
    return <LoaderComponent />
  }

  render() {
    const {api} = this.state
    return (
      <div>
        {api === apiStatus.inprogress ? this.renderLoader() : this.renderData()}
      </div>
    )
  }

  componentDidMount() {
    this.getVideoData()
  }
}
export default VideoItemDetails
