import { AppBar, Typography, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Route from 'routes/Route';

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(Route.ROOT);
  }, [navigate]);

  return (
    <>
      <AppBar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={4}>
            <ArrowBackIcon onClick={goBack} />
          </Grid>
        </Grid>
      </AppBar>
      <Stack alignItems="center" justifyItems="center">
        <Typography variant="h1">Pagina nao encontrada</Typography>
      </Stack>
    </>
  );
};

export default NotFound;
