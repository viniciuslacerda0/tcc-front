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

import { useUser } from 'hooks/useUser';

import { UserType } from 'routes/Dashboard';

import type { DrawerProps } from '../types';
import Drawer from '..';

const drawerProfessionalRoutes = [
  { path: Route.DASHBOARD, name: 'Menu Inicial' },
  { path: Route.REPORT, name: 'Cadastrar paciente' },
  { path: Route.PACIENT, name: 'Pacientes' },
];

const drawerPacientRoutes = [
  { path: Route.DASHBOARD, name: 'Menu Inicial' },
  { path: Route.REPORT, name: 'Meus dados' },
  { path: Route.EVOLUTION, name: 'Evolução' },
];

const Menu = ({ onClose, isOpen, anchor }: DrawerProps): JSX.Element => {
  const navigate = useNavigate();
  const { user, wipeUser } = useUser();
  const { wipeToken } = useToken();

  const handleLogout = useCallback(() => {
    wipeToken();
    wipeUser();
    navigate(Route.ROOT);
  }, [navigate, wipeToken, wipeUser]);

  const RoutesList = useMemo(
    () => (
      <List>
        {(user.type === UserType.PROFESSIONAL
          ? drawerProfessionalRoutes
          : drawerPacientRoutes
        ).map(({ path, name }) => (
          <ListItem key={path}>
            <ListItemButton component={Link} to={path} aria-label={path}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    ),
    [user.type],
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
