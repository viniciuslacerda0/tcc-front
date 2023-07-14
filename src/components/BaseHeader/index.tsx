import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import { Grid } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

import styles from './styles';

const DrawerNames = {
  profile: 'profile',
  routes: 'routes',
} as const;

interface DrawerState {
  [DrawerNames.profile]: boolean;
  [DrawerNames.routes]: boolean;
}
const InitialState: DrawerState = {
  [DrawerNames.profile]: false,
  [DrawerNames.routes]: false,
};

const BaseHeader = (): ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<DrawerState>(InitialState);
  const onClose = useCallback(() => setIsDrawerOpen(InitialState), []);

  const onOpen = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    const key = e.currentTarget.getAttribute('name');
    if (key) {
      setIsDrawerOpen(prevState => ({
        ...prevState,
        [key]: true,
      }));
    }
  }, []);

  return (
    <AppBar sx={styles.headerContainer} enableColorOnDark>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={4}>
          <Toolbar sx={styles.menuContainer}>
            <MenuIcon sx={styles.icon} />
            {/* <IconButton
              name={DrawerNames.routes}
              size="medium"
              color="inherit"
              onClick={onOpen}
              aria-label="common.aria.navigationMenu"
            >
            </IconButton>
            <RoutesDrawer
              onClose={onClose}
              onOpen={onOpen}
              isDrawerOpen={isDrawerOpen.routes}
            /> */}
          </Toolbar>
        </Grid>
        <Grid item sx={styles.profileIconContainer} xs={4}>
          <PersonIcon sx={styles.icon} />
          {/* <IconButton
            onClick={onOpen}
            name={DrawerNames.profile}
            size="medium"
            color="inherit"
            aria-label="common.aria.profileMenu"
          >
          </IconButton>
          <ProfileDrawer
            onClose={onClose}
            onOpen={onOpen}
            isDrawerOpen={isDrawerOpen.profile}
          /> */}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default BaseHeader;
