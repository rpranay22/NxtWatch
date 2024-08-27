import React, {useState} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
//

const ControlledPopup = props => {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <button
        type="button"
        className="button logOutBtn"
        onClick={() => setOpen(o => !o)}
      >
        Logout
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal styl">
          <p>Are you sure, you want to logout</p>
          <div className="buttons">
            <button className="btn1" onClick={() => setOpen(o => !o)}>
              Cancel
            </button>
            <button className="btn2" onClick={logout}>
              Confirm
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
}
export default withRouter(ControlledPopup)
