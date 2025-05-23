import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

const ICON_MAP = {
  HomeOutlined: <HomeOutlined />,
  SettingOutlined: <SettingOutlined />,
  UserOutlined: <UserOutlined />,
};

export interface MenuIconProps {
  type: keyof typeof ICON_MAP;
}

const MenuIcon: React.FC<MenuIconProps> = ({ type }) => {
  return type === undefined ? '' : ICON_MAP[type];
};

export default MenuIcon;
