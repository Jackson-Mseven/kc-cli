import { customGetRoutes } from '@/utils';
import transformRoutesToMenu from '@/utils/layout/transformRoutesToMenu';
import { GithubOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import { ConfigProvider, FloatButton, theme } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'umi';
import logoWithoutText from '../../public/logo-without-text.webp';
import logo from '../../public/logo.webp';
import LangIcon from './components/Icons/LangIcon';
import ThemeIcon from './components/Icons/ThemeIcon';
import LoadingContext from './contexts/LoadingContext';
import { ProLayoutAction } from './types';

export default function GlobalLayout() {
  const navigate = useNavigate();
  const routes = customGetRoutes();
  const actionRef = useRef<ProLayoutAction>(undefined);

  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkTheme, { toggle: toggleIsDarkTheme }] = useBoolean(false);

  const menuData = useMemo(() => transformRoutesToMenu(routes), [routes]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <ProLayout
          actionRef={actionRef}
          title="kc-umi-template"
          logo={collapsed ? logoWithoutText : logo}
          loading={loading}
          menuDataRender={() => menuData}
          menuItemRender={(item, dom) => (
            <NavLink to={item.path || '/'}>{dom}</NavLink>
          )}
          avatarProps={{
            icon: 'K',
            title: 'Kincy',
            size: 'small',
          }}
          actionsRender={() => [
            <LangIcon />,
            <ThemeIcon
              isDarkTheme={isDarkTheme}
              toggleIsDarkTheme={toggleIsDarkTheme}
            />,
          ]}
          onCollapse={(collapsed) => {
            setCollapsed(collapsed);
          }}
          onMenuHeaderClick={() => {
            navigate('/');
          }}
        >
          <Outlet />
          <FloatButton
            icon={<GithubOutlined />}
            onClick={() => {
              window.open('https://github.com/Jackson-Mseven/kc-cli');
            }}
          />
        </ProLayout>
      </LoadingContext.Provider>
    </ConfigProvider>
  );
}
