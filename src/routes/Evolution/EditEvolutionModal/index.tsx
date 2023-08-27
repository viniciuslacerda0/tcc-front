import {
  Dialog,
  Typography,
  Button,
  TextField,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

interface EvolutionModalProps {
  isOpen: boolean;
  handleClose: () => void;
  pacientData: {
    id: number;
    name: string;
  };
}

interface EvolutionModalState {
  text: string;
  created_at: string;
  pictures: File[];
}

const INITIAL_STATE = {
  text: '',
  created_at: '',
  pictures: [],
};

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const EditEvolutionModal = ({
  isOpen = false,
  handleClose,
  pacientData,
}: EvolutionModalProps): JSX.Element => {
  const [formData, setFormData] = useState<EvolutionModalState>(INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const handleForm = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setFormData(prevData => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    },
    [],
  );

  const uploadToCloudinary = useCallback(
    async (file: File): Promise<string> => {
      const formsData = new FormData();
      formsData.append('file', file);
      formsData.append('upload_preset', 'ml_default');

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formsData,
      });
      const data = await response.json();
      return data.secure_url;
    },
    [],
  );

  const sendData = useCallback(async (): Promise<void> => {
    try {
      const imageUrls = await Promise.all(
        formData.pictures.map(uploadToCloudinary),
      );

      await axios.post('create-evolution', {
        name: pacientData.name,
        text: formData.text,
        created_at: formData.created_at,
        pacientId: pacientData.id,
        pictures: imageUrls,
      });
      enqueueSnackbar('Enviado com sucesso');
    } catch (error) {
      enqueueSnackbar('Erro ao enviar os dados');
    }
  }, [enqueueSnackbar, formData, pacientData, uploadToCloudinary]);

  const uploadFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    // TODO: send photos to cloudinary and save link to pictures
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        pictures: [...prevData.pictures, ...files],
      }));
    }
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack flexDirection="column" padding={3} gap={4} width={1}>
        <Stack flexDirection="row" gap={1}>
          <Typography variant="h4">Data:</Typography>
          <TextField type="date" name="created_at" onChange={handleForm} />
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
            <input
              type="file"
              accept="image/jpeg, image/png"
              hidden
              onChange={uploadFile}
            />
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          size="large"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={sendData}
        >
          Enviar
        </Button>

        <Box>
          <ImageList cols={3} gap={4}>
            {formData.pictures.map((picture, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ImageListItem key={`pic-${index}`}>
                <img
                  src={URL.createObjectURL(picture)}
                  alt={`${index}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    objectFit: 'cover',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default EditEvolutionModal;
