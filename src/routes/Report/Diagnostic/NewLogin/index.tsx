import { Dialog, Typography } from '@mui/material';
import { Stack } from '@mui/system';

interface NewLoginProps {
  data: {
    email: string;
    password: string;
  };
  isOpen: boolean;
  handleClose: () => void;
}

const NewLogin = ({
  data,
  handleClose,
  isOpen,
}: NewLoginProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack flexDirection="column">
        <Typography variant="h4">Dados para acesso do paciente</Typography>
        <Typography variant="h4">Email: {data.email}</Typography>
        <Typography variant="h4">Senha: {data.password}</Typography>
      </Stack>
    </Dialog>
  );
};

export default NewLogin;
