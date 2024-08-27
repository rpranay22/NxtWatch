import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isLoginFailed: false,
    error_msg: '',
  }

  saveUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  savePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }
  togglePassword = () => {
    this.setState(ps => {
      return {
        showPassword: !ps.showPassword,
      }
    })
  }

  renderUsernameField = () => {
    return (
      <div className="inp1">
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={this.saveUsername}
          className="ent"
          placeholder="Username"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {showPassword} = this.state
    return (
      <div className="inp1 inp2">
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          onChange={this.savePassword}
          className="ent"
          placeholder="Password"
        />
      </div>
    )
  }

  renderShowPassword = () => {
    return (
      <div className="inp3">
        <input
          id="showPassword"
          type="checkbox"
          onClick={this.togglePassword}
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>
    )
  }
  submitLoginForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const credentials = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const url = 'https://apis.ccbp.in/login'
    const loginResponse = await fetch(url, options)
    if (loginResponse.ok === true) {
      this.loginSuccess(loginResponse)
    } else {
      this.loginFailure(loginResponse)
    }
  }

  loginSuccess = async loginResponse => {
    const loginData = await loginResponse.json()

    const {history} = this.props
    Cookies.set('jwt_token', loginData.jwt_token, {
      expires: 1,
    })

    history.replace('/')
  }
  loginFailure = async loginResponse => {
    const loginData = await loginResponse.json()
    this.setState({
      error_msg: loginData.error_msg,
      isLoginFailed: true,
    })
  }

  render() {
    console.log('cookie', Cookies.get('jwt_token'))
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect path="/" />
    }
    const {error_msg, isLoginFailed} = this.state
    return (
      <div className="loginContainer">
        <img
          className="log"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <form onSubmit={this.submitLoginForm}>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {this.renderShowPassword()}
          <button type="submit" className="lbtn">
            Login
          </button>
          {isLoginFailed && <p>{error_msg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
