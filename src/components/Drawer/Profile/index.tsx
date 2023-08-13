import { Box, Typography, Avatar } from '@mui/material';

import { useUser } from 'hooks/useUser';

import type { DrawerProps } from '../types';
import Drawer from '..';

const Profile = ({ onClose, isOpen, anchor }: DrawerProps): JSX.Element => {
  const { user } = useUser();

  return (
    <Drawer open={isOpen} anchor={anchor} onClose={onClose}>
      <Box
        role="presentation"
        onClick={onClose}
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Avatar alt="Aavatar" sx={{ width: 100, height: 100 }}>
          {user.name[0]}
        </Avatar>
        <Typography variant="h4">{user.name}</Typography>
      </Box>
    </Drawer>
  );
};

export default Profile;
