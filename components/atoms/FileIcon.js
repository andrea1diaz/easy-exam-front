import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

const FileIcon = props => {
  const { color, size, style } = props
  return (
    <Icon color={color} size={size} style={style} viewBox={viewBox}>
      <path d='M10.765,27.4H1.692A1.7,1.7,0,0,1,0,25.693V1.707A1.7,1.7,0,0,1,1.692,0h9.073s7.372.011,9.069,0a1.658,1.658,0,0,1,1.692,1.707c-.072,1.755-.048,1.794,0,1.791v22.2A1.7,1.7,0,0,1,19.834,27.4H10.765Zm-.342-5.8h5.915a.807.807,0,0,0,0-1.613H10.419a.807.807,0,0,0,0,1.613ZM4.5,17.481H16.338a.807.807,0,0,0,0-1.613H4.5a.807.807,0,0,0,0,1.613ZM16.338,11.5H4.5a.807.807,0,0,0,0,1.613H16.338a.807.807,0,0,0,0-1.613Z' />
    </Icon>
  )
}

FileIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
  viewBox: PropTypes.string
}

export default FileIcon
