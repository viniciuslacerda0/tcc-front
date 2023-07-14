import { Box, Stack, Typography } from '@mui/material';

import BackButton from './BackButton';

type Props = {
  title: string;
  hasBackButton?: boolean;
};

const Header = ({ title, hasBackButton }: Props): JSX.Element => (
  <Stack color="aquamarine" direction="row" alignItems="center">
    {hasBackButton && (
      <Box flex={1}>
        <BackButton />
      </Box>
    )}
    <Typography flex={1} variant="h6" color="secondary">
      {title}
    </Typography>
  </Stack>
);

export default Header;
