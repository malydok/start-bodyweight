import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import excercises from './data/excercises';
import capitalizeFirstLetter from './util/capitalize-first-letter';

const { SubMenu } = Menu;

const NavMenu = () => (
  <Route
    render={({ location }) => {
      return (
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="play-circle-o" />
              Workout
            </Link>
          </Menu.Item>
          <Menu.Item key="/my-progress">
            <Link to="/my-progress">
              <Icon type="schedule" />
              My progressions
            </Link>
          </Menu.Item>
          <SubMenu
            key="progression"
            title={
              <span>
                <Icon type="line-chart" />
                Progressions
              </span>
            }
          >
            {Object.keys(excercises).map(type => (
              <Menu.Item key={`/progression/${type}`}>
                <Link to={`/progression/${type}`}>
                  {capitalizeFirstLetter(type)}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      );
    }}
  />
);

export default NavMenu;