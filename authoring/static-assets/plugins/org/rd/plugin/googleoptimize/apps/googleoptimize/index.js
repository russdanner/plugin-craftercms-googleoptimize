const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, Badge, CircularProgress, Link } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const ScienceOutlinedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ScienceOutlined') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ScienceOutlined'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ScienceOutlined')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ScienceOutlined');
const Divider = craftercms.libs.MaterialUI.Divider && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Divider, 'default') ? craftercms.libs.MaterialUI.Divider['default'] : craftercms.libs.MaterialUI.Divider;
const MenuList = craftercms.libs.MaterialUI.MenuList && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuList, 'default') ? craftercms.libs.MaterialUI.MenuList['default'] : craftercms.libs.MaterialUI.MenuList;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const ListItemIcon = craftercms.libs.MaterialUI.ListItemIcon && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItemIcon, 'default') ? craftercms.libs.MaterialUI.ListItemIcon['default'] : craftercms.libs.MaterialUI.ListItemIcon;
const ListItemText = craftercms.libs.MaterialUI.ListItemText && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.ListItemText, 'default') ? craftercms.libs.MaterialUI.ListItemText['default'] : craftercms.libs.MaterialUI.ListItemText;
const CheckRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CheckRounded');
const { get } = craftercms.utils.ajax;
const { createAction } = craftercms.libs.ReduxToolkit;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function usePreviewNavigation() {
  return useSelector((state) => state.previewNavigation);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const contentTypeDropTargetsResponse = /*#__PURE__*/ createAction('CONTENT_TYPE_DROP_TARGETS_RESPONSE');
const CHANGE_CURRENT_URL = 'CHANGE_CURRENT_URL';
const changeCurrentUrl = /*#__PURE__*/ createAction(CHANGE_CURRENT_URL);
/*#__PURE__*/ createAction(contentTypeDropTargetsResponse.type);
// endregion

function OptimizeToolbarStatus(props) {
    var PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/googleoptimize/googleoptimize';
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath), internalUrl = _c[0], setInternalUrl = _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(0), experimentCount = _e[0], setExperimentCount = _e[1];
    var _f = useState(), experiments = _f[0], setExperiments = _f[1];
    var loadExperimentData = function () {
        var serviceUrl = "".concat(PLUGIN_SERVICE_BASE, "/experiments/list.json?siteId=").concat(siteId);
        setIsFetching(true);
        get(serviceUrl).subscribe({
            next: function (response) {
                console.log(response);
                // EXAMPLE:
                // http://localhost:8080/studio/preview#/?page=/&site=t1
                var windowHref = window.location.href;
                var pageUrl = windowHref.substr(windowHref.indexOf('?page=') + 6);
                pageUrl = pageUrl.substring(0, pageUrl.indexOf('&site='));
                var configuredExperiments = response.response.result.experiments;
                var pageExperiments = [];
                Object.values(configuredExperiments).map(function (exp, idx) {
                    // @ts-ignore
                    if (exp.url === pageUrl.split('?')[0]) {
                        pageExperiments.push(exp);
                    }
                    else {
                        // @ts-ignore
                        console.log('pageUrl ' + pageUrl.split('?')[0] + ' != ' + exp.url);
                    }
                });
                setExperiments(pageExperiments);
                setExperimentCount(pageExperiments.length);
                setIsFetching(false);
            },
            error: function (e) {
                setIsFetching(false);
                console.error(e);
            }
        });
    };
    useEffect(function () {
        loadExperimentData();
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        loadExperimentData();
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var curUri = window.location.href;
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Google Optimize' },
            React.createElement(Badge, { badgeContent: experimentCount > 0 ? experimentCount : null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(ScienceOutlinedIcon, null)),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } })))),
        React.createElement(Menu, { id: "demo-positioned-menu", "aria-labelledby": "demo-positioned-button", anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            } },
            React.createElement(MenuList, { dense: true, sx: { width: 320 } }, experiments === null || experiments === void 0 ? void 0 :
                experiments.map(function (exp, idx) {
                    var _a;
                    return (React.createElement(React.Fragment, null,
                        React.createElement(MenuItem, null,
                            React.createElement(ListItemText, null,
                                React.createElement(Link, { href: exp.googleOptimizeUrl, target: "new" },
                                    React.createElement("strong", null, exp.label)))), (_a = exp.variants) === null || _a === void 0 ? void 0 :
                        _a.map(function (variant, idx) { return (React.createElement(MenuItem, { onClick: function () {
                                dispatch(changeCurrentUrl(internalUrl.split('?')[0] + '?' + variant.params));
                            } },
                            React.createElement(ListItemIcon, null,
                                React.createElement(CheckRoundedIcon, { sx: { visibility: curUri.includes(variant.params) ? '' : 'hidden' } })),
                            React.createElement(ListItemText, null, variant.label))); })));
                }),
                React.createElement(Divider, null),
                React.createElement(MenuItem, null,
                    React.createElement(ListItemText, null,
                        React.createElement(Link, { href: "https://optimize.google.com/optimize/home/", target: "new" }, "Open Google Optimize")))))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.googleoptimize',
    widgets: {
        'org.rd.plugin.googleoptimize.optimizeToolbarStatus': OptimizeToolbarStatus
    }
};

export { OptimizeToolbarStatus, plugin as default };
