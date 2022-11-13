import { PluginDescriptor } from '@craftercms/studio-ui';
import OptimizeToolbarStatus from './components/OptimizeToolbarStatus';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.googleoptimize',
  widgets: {
    'org.rd.plugin.googleoptimize.optimizeToolbarStatus': OptimizeToolbarStatus
  }
};

export { OptimizeToolbarStatus };

export default plugin;
