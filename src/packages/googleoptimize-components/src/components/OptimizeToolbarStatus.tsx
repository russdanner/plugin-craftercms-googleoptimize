import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Typography, Link, Badge, CircularProgress, Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Button from '@mui/material/Button';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import { get } from '@craftercms/studio-ui/utils/ajax';
import { ApiResponse, ApiResponseErrorState } from '@craftercms/studio-ui';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import { changeCurrentUrl, reloadRequest } from '@craftercms/studio-ui/state/actions/preview';

export function OptimizeToolbarStatus(props) {
  const PLUGIN_SERVICE_BASE = '/studio/api/2/plugin/script/plugins/org/rd/plugin/googleoptimize/googleoptimize';

  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);

  const [isFetching, setIsFetching] = React.useState<Boolean>(false);
  const [experimentCount, setExperimentCount] = React.useState<number>(0);
  const [experiments, setExperiments] = useState(Array<{ label: string; url: string }>);

  const loadExperimentData = () => {
    let serviceUrl = `${PLUGIN_SERVICE_BASE}/experiments/list.json?siteId=${siteId}`;

    setIsFetching(true);

    get(serviceUrl).subscribe({
      next: (response) => {
        console.log(response);

        // EXAMPLE:
        // http://localhost:8080/studio/preview#/?page=/&site=t1
        let windowHref = window.location.href;
        let pageUrl = windowHref.substr(windowHref.indexOf('?page=') + 6);
        pageUrl = pageUrl.substring(0, pageUrl.indexOf('&site='));

        let configuredExperiments = response.response.result.experiments;
        let pageExperiments = [];

        Object.values(configuredExperiments).map((exp, idx) => {
          // @ts-ignore
          if (exp.url === pageUrl) {
            pageExperiments.push(exp);
          } else {
            // @ts-ignore
            console.log('pageUrl ' + pageUrl + ' != ' + exp.url);
          }
        });

        setExperiments(pageExperiments);
        setExperimentCount(pageExperiments.length);
        setIsFetching(false);
      },
      error(e) {
        setIsFetching(false);
        console.error(e);
      }
    });
  };

  useEffect(() => {
    loadExperimentData();
  }, []);

  useEffect(() => {
    currentUrlPath && setInternalUrl(currentUrlPath);
    loadExperimentData();
  }, [currentUrlPath]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderVariantMenuItems(experiment) {
    let curUri = window.location.href;
    return (
      <>
        {experiment.variants?.map((variant, idx) => (
          <MenuItem
            onClick={() => {
              dispatch(changeCurrentUrl(internalUrl + "?" + variant.params));
            }}
          >
            <ListItemText inset>{variant.label}</ListItemText>
          </MenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      <Tooltip title={'Google Optimize'}>
        <Badge
          badgeContent={experimentCount > 0 ? experimentCount : null}
          color="primary"
          overlap="circular"
          style={{ position: 'relative' }}
        >
          <IconButton
            size="medium"
            style={{ padding: 4 }}
            id="go-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <ScienceOutlinedIcon />
          </IconButton>
          {isFetching && (
            <CircularProgress
              size={void 0}
              value={100}
              variant={'determinate'}
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            />
          )}
        </Badge>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuList dense sx={{ width: 320 }}>
          {experiments?.map((exp, idx) => (
            <>
              <MenuItem>
                <ListItemText>
                  <Link href="{exp.googleOptimizeUrl}" target="new">
                    <strong>{exp.label}</strong>
                  </Link>
                </ListItemText>
              </MenuItem>

              {renderVariantMenuItems(exp)}
            </>
          ))}

          <Divider />

          <MenuItem>
            <ListItemText>
              <Link href="https://optimize.google.com/optimize/home/" target="new">
                Open Google Optimize
              </Link>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default OptimizeToolbarStatus;
