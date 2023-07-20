import { Dialog, Typography } from '@mui/material';
import { Stack } from '@mui/system';

interface EvolutionForm {
  created_at: string;
  text: string;
  id: number;
}

interface EvolutionModalProps {
  data?: EvolutionForm;
  isOpen: boolean;
  handleClose: () => void;
}

const EvolutionModal = ({
  isOpen = false,
  handleClose,
  data,
}: EvolutionModalProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack flexDirection="column" padding={3} gap={4}>
        {data ? (
          <>
            <Stack flexDirection="row" gap={1}>
              <Typography variant="h4">Data:</Typography>
              <Typography variant="h4" fontWeight="bold">
                {new Date(data.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h4">Relatorio:</Typography>
              <Typography variant="body1">{data.text}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h4">Fotos:</Typography>
            </Stack>
          </>
        ) : (
          <Typography>Nenhum dado encontrado para esse relatorio</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default EvolutionModal;
