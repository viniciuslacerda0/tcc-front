import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

import type { ReactNode } from 'react';

import styles from './styles';

interface CardButtonProps {
  icon: ReactNode;
  text: string;
}

const CardButton = ({ text, icon }: CardButtonProps): JSX.Element => {
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <CardContent>
          {icon}
          <Typography>{text}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardButton;
