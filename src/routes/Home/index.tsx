import {
  Button,
  FormControl,
  Stack,
  TextField,
  Container,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import type { BaseSyntheticEvent, ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Header from 'components/Header';

import Route from 'routes/Route';

import { useUser } from 'hooks/useUser';
import { useToken } from 'hooks/useToken';

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
  const [data, setState] = useState<LoginState>(INITIAL_STATE);
  const { updateUser } = useUser();
  const { token, updateToken } = useToken();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e: BaseSyntheticEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post('auth/', data);
        updateUser(response);
        updateToken(response.data.token);
        navigate(Route.DASHBOARD);
      } catch (error) {
        enqueueSnackbar('Erro ao realizar o login');
      }
    },
    [data, enqueueSnackbar, navigate, updateToken, updateUser],
  );
  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  useEffect(() => {
    if (token) {
      navigate(Route.DASHBOARD);
    }
  }, [navigate, token]);

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
          </FormControl>
        </Stack>
      </Container>
    </Container>
  );
};

export default Home;
