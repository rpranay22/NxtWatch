import React from 'react'
const SaveContext = React.createContext({
  savedVideos: [],
  clickToSave: () => {},
})
export default SaveContext
