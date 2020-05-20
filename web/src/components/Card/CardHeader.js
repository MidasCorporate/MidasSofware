/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import styles from '~/assets/jss/material-dashboard-react/components/cardStyle';

const useStyles = makeStyles(styles);

export default function CardHeader(props) {
  const classes = useStyles();
  const { className, children, color, plain, stats, icon, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.prototype = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'sucess',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  plain: PropTypes.bool,
  status: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node,
};
