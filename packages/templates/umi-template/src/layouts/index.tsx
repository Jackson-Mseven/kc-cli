import { GITHUB_URL } from '@/constants';
import useUserInfo from '@/hooks/useUserInfo';
import { customGetRoutes, getFirstCharOfString } from '@/utils';
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
import {
  GlobalLoadingContextProvider,
  useGlobalLoading,
} from './contexts/LoadingContext';
import { ProLayoutAction } from './types';

export default function GlobalLayout() {
  const navigate = useNavigate();
  const routes = customGetRoutes();
  const actionRef = useRef<ProLayoutAction>(undefined);

  const { globalLoading } = useGlobalLoading();
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkTheme, { toggle: toggleIsDarkTheme }] = useBoolean(false);

  const menuData = useMemo(() => transformRoutesToMenu(routes), [routes]);

  const userInfo = useUserInfo();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <GlobalLoadingContextProvider>
        <ProLayout
          actionRef={actionRef}
          title="kc-umi-template"
          logo={collapsed ? logoWithoutText : logo}
          loading={globalLoading}
          menuDataRender={() => menuData}
          menuItemRender={(item, dom) => (
            <NavLink to={item.path || '/'}>{dom}</NavLink>
          )}
          avatarProps={{
            src: userInfo?.avatar,
            icon: getFirstCharOfString(userInfo?.name),
            title: userInfo?.name,
            size: 'small',
          }}
          actionsRender={() => [
            <LangIcon key="lang" />,
            <ThemeIcon
              key="theme"
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
              window.open(GITHUB_URL);
            }}
          />
        </ProLayout>
      </GlobalLoadingContextProvider>
    </ConfigProvider>
  );
}
