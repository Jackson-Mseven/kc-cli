import { IRoute } from 'umi';

export interface IRoutesById {
  [id: string]: IRoute;
}

interface ConfigRoute {
  name?: string;
  component?: string;
  layout?: false;
  path?: string;
  redirect?: String;
  routes?: ConfigRoutes;
  wrappers?: Array<string>;
  hideInMenu?: boolean;
  icon?: string;
}

export type ConfigRoutes = Array<ConfigRoute>;
