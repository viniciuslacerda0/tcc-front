import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Footer from 'components/Footer';

import BaseHeader from 'components/BaseHeader';

import { routesInfo } from 'routes/Route';

import { useToken } from 'hooks/useToken';

import styles from './styles';

interface Props {
  children: JSX.Element;
}

const BaseStructure = ({ children }: PropsWithChildren<Props>): JSX.Element => {
  const location = useLocation();
  const { token } = useToken();
  const isLoggedPage = useMemo(
    () =>
      routesInfo.filter(
        value => value.path === location.pathname && value.isPrivate,
      ),
    [location],
  );

  return (
    <Box sx={styles.mainWrapper}>
      {isLoggedPage && token && <BaseHeader />}
      <Box sx={styles.mainPart} component="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default BaseStructure;
