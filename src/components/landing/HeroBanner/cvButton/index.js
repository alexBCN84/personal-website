import React from 'react';
import PropTypes from 'prop-types';
import './cvButton.css';
import { CvIcon } from '../cvIcon';

const CvButton = ({ href, children }) => {
  const [color, setColor] = React.useState('#fff');
  return (
    <div className="wrapper">
      <div className="link_wrapper">
        <a
          className="cv_button"
          href={href}
          target="blank"
          onMouseEnter={() => setColor('#000')}
          onMouseLeave={() => setColor('#fff')}
        >
          {children}
        </a>
        <div className="icon">
          <CvIcon color={color} />
        </div>
      </div>
    </div>
  );
};

export default CvButton;

CvButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
