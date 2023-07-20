import { Dialog, Typography, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

interface EvolutionModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const INITIAL_STATE = {
  text: '',
  date: '',
  photos: [],
};

const EditEvolutionModal = ({
  isOpen = false,
  handleClose,
}: EvolutionModalProps): JSX.Element => {
  const [formData, setFormData] = useState<typeof INITIAL_STATE>(INITIAL_STATE);

  const handleForm = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setFormData(prevData => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    },
    [],
  );

  const sendData = useCallback(async (): Promise<void> => {
    try {
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  }, [formData]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack flexDirection="column" padding={3} gap={4} width={1}>
        <Stack flexDirection="row" gap={1}>
          <Typography variant="h4">Data:</Typography>
          <TextField type="date" name="date" onChange={handleForm} />
        </Stack>
        <Stack>
          <Typography variant="h4">Relatorio:</Typography>
          <TextField
            InputProps={{
              sx: { minHeight: '19rem' },
            }}
            multiline
            type="text"
            name="text"
            onChange={handleForm}
          />
        </Stack>
        <Stack>
          <Typography variant="h4">Fotos:</Typography>
          <TextField type="image" name="photos" onChange={handleForm} />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={sendData}
        >
          Enviar
        </Button>
      </Stack>
    </Dialog>
  );
};

export default EditEvolutionModal;
