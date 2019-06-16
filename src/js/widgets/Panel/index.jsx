import React from 'react';
import PropTypes from 'prop-types';

import styles from './Panel.module.scss';

export const Panel = ({ className, style, children }) => (
  <div className={`${styles.panel} ${className || ''}`} style={style || {}}>
    { children }
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

export const PanelHeader = ({ className, style, children }) => (
  <div className={`${styles.panelHeader} ${className || ''}`} style={style || {}}>
    { children }
  </div>
);

PanelHeader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

export const PanelTitle = ({ className, style, children }) => (
  <h3 className={`${styles.panelTitle} ${className || ''}`} style={style || {}}>
    { children }
  </h3>
);

PanelTitle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

export const PanelBody = ({ className, style, children }) => (
  <div className={`${styles.panelBody} ${className || ''}`} style={style || {}}>
    { children }
  </div>
);

PanelBody.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

export const PanelFooter = ({ className, style, children }) => (
  <div className={`${styles.panelFooter} ${className || ''}`} style={style || {}}>
    { children }
  </div>
);

PanelFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
