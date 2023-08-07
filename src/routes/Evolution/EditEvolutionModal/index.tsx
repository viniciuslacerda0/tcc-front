import { Dialog, Typography, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

interface EvolutionModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface EvolutionModalState {
  text: string;
  date: string;
  photos: File[];
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
  const [formData, setFormData] = useState<EvolutionModalState>(INITIAL_STATE);

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

  const uploadFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, ...files],
      }));
    }
  }, []);

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
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ marginRight: '1rem' }}
          >
            Adicionar Fotos
            <input type="file" accept=".csv" hidden onChange={uploadFile} />
          </Button>
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
