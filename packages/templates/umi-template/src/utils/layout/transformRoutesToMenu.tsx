import MenuIcon, { MenuIconProps } from '@/layouts/components/MenuIcon';
import { ConfigRoutes } from '@/types/umi';
import { MenuDataItem } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const transformRoutesToMenu = (routes: ConfigRoutes): MenuDataItem[] => {
  const intl = useIntl();

  return routes.map((route) => ({
    ...route,
    name: route.name
      ? intl.formatMessage({
          id: route.name,
        })
      : undefined,
    icon: <MenuIcon type={route.icon as MenuIconProps['type']} />,
    children: route.routes ? transformRoutesToMenu(route.routes) : undefined,
  })) as MenuDataItem[];
};

export default transformRoutesToMenu;
