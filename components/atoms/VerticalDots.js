import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon.js'

const VerticalDots = props => {
  const { color, size, style, viewBox } = props
  return (
    <Icon color={color} size={size} style={style} viewBox={viewBox} >
      <circle id='Ellipse_11' data-name='Ellipse 11' class='cls-1' cx='3' cy='3' r='3' transform='translate(385 379)' />
      <circle id='Ellipse_12' data-name='Ellipse 12' class='cls-1' cx='3' cy='3' r='3' transform='translate(385 389)' />
      <circle id='Ellipse_13' data-name='Ellipse 13' class='cls-1' cx='3' cy='3' r='3' transform='translate(385 399)' />
    </Icon>
  )
}

VerticalDots.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
  viewBox: PropTypes.string
}

export default VerticalDots
