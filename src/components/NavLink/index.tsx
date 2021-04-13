import cn from 'classnames';
import React, { FC } from 'react';
import { Link, Route } from 'react-router-dom';

interface INavLink {
  to: any;
  exact?: boolean;
  strict?: boolean;
  location?: any;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  activeStyle?: any;
  style?: React.CSSProperties;
  isActive?: any;
}

export const NavLink: FC<INavLink> = ({
  to,
  exact,
  strict,
  location,
  activeClassName = '',
  inactiveClassName = '',
  className = '',
  activeStyle,
  style,
  isActive: getIsActive,
  children,
  ...rest
}) => (
  <Route
    path={typeof to === 'object' ? to.pathname : to}
    exact={exact}
    strict={strict}
    location={location}
  >
    {({ location: l, match }) => {
      const isActive = !!(getIsActive ? getIsActive(match, l) : match);
      return (
        <Link
          to={to}
          className={cn(className, {
            [activeClassName]: isActive,
            [inactiveClassName]: !isActive,
          })}
          style={isActive ? { ...style, ...activeStyle } : style}
          {...rest}
          onClick={(e) => e.stopPropagation()}
        >
          {typeof children === 'function' ? children(isActive) : children}
        </Link>
      );
    }}
  </Route>
);
