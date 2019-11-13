import React from 'react';
import PropTypes from 'prop-types';

import ToolBar from '../molecules/ToolBar';
import BackArrowIcon from '../atoms/BackArrowIcon';
import GoBack from '../molecules/GoBack';


const TopBar = (props) => {
  let chooseTitle =
    props.title !== 'Home'
      ? props.title
      : props.withProfile || props.userData !== {}
      ? props.userData.first_name
        ? `Hola, ${props.userData.first_name.split(' ')[0]}`
        : props.title
      : props.title;

  return (
    <ToolBar
      backgroundColor={props.backgroundColor}
      title={chooseTitle}
      onTapTitle={props.onTapTitle}
      continueLayout={props.continueLayout}
      activeIcon={
        props.withBack ? (
          <GoBack onBack={props.onBack}>
            <BackArrowIcon
              size={props.isMobile ? 17 : 20}
              color={props.color}
            />
          </GoBack>
        ) : null
      }
      withShadow={props.withShadow}
    >
			<div> </div>
		</ToolBar>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  withBack: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  continueLayout: PropTypes.bool,
  isMobile: PropTypes.bool,
  userData: PropTypes.object,
  withProfile: PropTypes.bool,
  onClickPhoto: PropTypes.func,
  withShadow: PropTypes.bool,
  withCart: PropTypes.bool,
  onBack: PropTypes.func,
  onTitle: PropTypes.func
};

TopBar.defaultProps = {
  title: '',
  withBack: true,
  userData: {},
  withProfile: false,
  withCart: false
};

export default TopBar;
