import Cookies from 'js-cookie'
import {Route, withRouter} from 'react-router-dom'
const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  const {history} = props
  console.log('his', history)
  if (token === undefined) {
    console.log('executed')
    history.replace('/login')
  }
  return <Route {...props} />
}
export default withRouter(ProtectedRoute)
