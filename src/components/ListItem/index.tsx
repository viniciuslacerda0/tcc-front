import { ListItem as MUIListItem } from '@mui/material';
import type { PropsWithChildren } from 'react';

import styles from './styles';

interface Props {
  children: JSX.Element;
}

const ListItem = ({ children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <MUIListItem sx={styles.item} divider>
      {children}
    </MUIListItem>
  );
};

export default ListItem;
