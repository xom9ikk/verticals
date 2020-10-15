import React, { FC } from 'react';
import { Route, Link } from 'react-router-dom';

interface INavLink {
  to: any;
  exact?: boolean;
  strict?: boolean;
  location?: any;
  activeClassName?: string;
  className?: string;
  activeStyle?: any;
  inactiveClassName?: string;
  style?: any;
  isActive?: any;
}

export const NavLink: FC<INavLink> = ({
  to,
  exact,
  strict,
  location,
  activeClassName,
  className,
  activeStyle,
  inactiveClassName,
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
      const moddedClassName = `${className || ''} ${isActive
        ? activeClassName
        : inactiveClassName}`;
      return (
        <Link
          to={to}
          className={moddedClassName}
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
