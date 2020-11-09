import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
	let closeLabel = ''

  const toggleVisibility = () => {
    setVisible(!visible)
  }

	if (props.closeLabel === undefined){
		closeLabel = 'Close'
	} else {
		closeLabel=props.closeLabel
	}
	
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {props.children}
        <button onClick={toggleVisibility}>{closeLabel}</button>
      </div>
    </div>
  )
}

export default Togglable