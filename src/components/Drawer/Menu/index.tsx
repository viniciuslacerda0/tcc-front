import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { useNavigate, Link } from 'react-router-dom';

import { useCallback, useMemo } from 'react';

import { useToken } from 'hooks/useToken';

import Route from 'routes/Route';

import type { DrawerProps } from '../types';
import Drawer from '..';

const drawerRoutes = [
  { path: Route.DASHBOARD, name: 'Menu Inicial' },
  { path: Route.EVOLUTION, name: 'Evolucao' },
  { path: Route.PACIENTMENU, name: 'Pacientes' },
];

const Menu = ({ onClose, isOpen, anchor }: DrawerProps): JSX.Element => {
  const navigate = useNavigate();
  const { wipeToken } = useToken();

  const handleLogout = useCallback(() => {
    wipeToken();
    navigate(Route.ROOT);
  }, [navigate, wipeToken]);

  const RoutesList = useMemo(
    () => (
      <List>
        {drawerRoutes.map(({ path, name }) => (
          <ListItem key={path}>
            <ListItemButton component={Link} to={path} aria-label={path}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    ),
    [],
  );

  return (
    <Drawer open={isOpen} anchor={anchor} onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        {RoutesList}
        <Divider />
        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Menu;
