import React from 'react'
const FailureContext = React.createContext({
  retry: false,
  getPosters: () => {},
})
export default FailureContext
