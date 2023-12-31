import type { ReactElement } from 'react';
import { useMemo } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid, IconButton, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';

import { useModal } from 'hooks/useModal';
import Menu from 'components/Drawer/Menu';

import { routesNames } from 'routes/Route';

import Profile from 'components/Drawer/Profile';

import styles from './styles';

const BaseHeader = (): ReactElement => {
  const location = useLocation();
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenProfile,
    handleOpen: handleOpenProfile,
    handleClose: handleCloseProfile,
  } = useModal();
  const routeName = useMemo(
    () => routesNames.find(value => value.path === location.pathname),
    [location.pathname],
  );

  return (
    <AppBar sx={styles.headerContainer} enableColorOnDark>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={4}>
          <Toolbar sx={styles.menuContainer}>
            <IconButton onClick={handleOpen}>
              <MenuIcon sx={styles.icon} />
              <Typography style={{ paddingLeft: '10px' }}>
                {routeName?.name ?? ''}
              </Typography>
            </IconButton>
            <Menu isOpen={isOpen} anchor="left" onClose={handleClose} />
          </Toolbar>
        </Grid>
        <Grid item xs={4}>
          <Toolbar sx={styles.profileContainer}>
            <IconButton onClick={handleOpenProfile}>
              <AccountCircleIcon sx={styles.icon} />
            </IconButton>
            <Profile
              isOpen={isOpenProfile}
              anchor="right"
              onClose={handleCloseProfile}
            />
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default BaseHeader;
