import React from 'react'
const SearchContext = React.createContext({
  url: '',
  changeUrl: () => {},
})
export default SearchContext
