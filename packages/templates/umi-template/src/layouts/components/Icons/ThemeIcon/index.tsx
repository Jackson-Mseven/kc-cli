import { MoonOutlined, SunOutlined } from '@ant-design/icons';

interface ThemeIconProps {
  isDarkTheme: boolean;
  toggleIsDarkTheme: () => void;
}

const ThemeIcon: React.FC<ThemeIconProps> = ({
  isDarkTheme,
  toggleIsDarkTheme,
}) => {
  return isDarkTheme ? (
    <SunOutlined key="SunOutlined" onClick={toggleIsDarkTheme} />
  ) : (
    <MoonOutlined key="MoonOutlined" onClick={toggleIsDarkTheme} />
  );
};

export default ThemeIcon;
