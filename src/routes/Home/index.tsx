import {
  Button,
  FormControl,
  Stack,
  TextField,
  Container,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Header from 'components/Header';

import Route from 'routes/Route';

import styles from './styles';

interface LoginState {
  username: string;
  password: string;
}

const INITIAL_STATE: LoginState = {
  username: '',
  password: '',
};

const Home = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setState] = useState<LoginState>(INITIAL_STATE);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e: BaseSyntheticEvent) => {
      e.preventDefault();
      try {
        console.log(`login success`);
        navigate(Route.DASHBOARD);
      } catch (error) {
        enqueueSnackbar('login.loginErrorMessage');
      }
    },
    [enqueueSnackbar, navigate],
  );
  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  return (
    <Container sx={styles.verticalContainer}>
      <Container maxWidth="sm">
        <Stack>
          <Header title="Entrar" />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- handleLogin does have error handing using snackbar */}
          <FormControl component="form" fullWidth onSubmit={handleLogin}>
            <TextField
              type="text"
              name="username"
              label="Email"
              onChange={onChangeTextField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type="password"
              name="password"
              label="Senha"
              onChange={onChangeTextField}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
            <Button
              variant="text"
              color="info"
              size="large"
              component={RouterLink}
              to={Route.SIGNUP}
            >
              Criar Conta
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </Container>
  );
};

export default Home;
