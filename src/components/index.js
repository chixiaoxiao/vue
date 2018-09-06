import './index.less';
import Icon from './icon';

const components = [
    Icon
];

const install = function (Vue, opts = {}) {
    if (install.installed) return;
    components.map(component => {
        Vue.component(component.name, component);
    });
};

export default {
    install,
    ...components
};
