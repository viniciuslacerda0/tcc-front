import { Box, Typography, List, Stack, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import ListItem from 'components/ListItem';

import { useModal } from 'hooks/useModal';

import styles from './styles';
import EvolutionModal from './EvolutionModal';

interface EvolutionInterface {
  id: number;
  name: string;
  text: string;
  created_at: string;
  pictures: string[];
}

interface EvolutionForm {
  created_at: string;
  name: string;
  text: string;
  id: number;
  pictures: string[];
}

const Evolution = (): JSX.Element => {
  const { state } = useLocation();
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const { isOpen, handleClose, handleOpen } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState<EvolutionInterface[] | undefined>([]);

  const [evolutionFormState, setEvolutionFormState] = useState<
    EvolutionForm | undefined
  >();

  const setGroupFormStateHandler = useCallback(
    (newFormState: EvolutionForm | undefined) => {
      setEvolutionFormState(newFormState);
      handleOpen();
    },
    [handleOpen],
  );

  useEffect(() => {
    axios
      .get('get-evolution', {
        params: {
          pacientId: state.id,
          filter: {
            from: initialDate,
            until: finalDate,
            textFilter: '',
          },
          cursor: '',
        },
      })
      .then(response => {
        setRows(response.data);
      })
      .catch(() =>
        enqueueSnackbar('Ocorreu um erro ao resgatar evolucao', {
          variant: 'error',
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowData = useMemo(
    () =>
      rows && rows.length > 0 ? (
        rows.map(row => (
          <ListItem key={row.id}>
            <Box onClick={(): void => setGroupFormStateHandler(row)}>
              <Typography>{row.name}</Typography>
              <Typography>
                {new Date(row.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </ListItem>
        ))
      ) : (
        <Typography>Nenhum dado encontrado para esse relatorio</Typography>
      ),
    [rows, setGroupFormStateHandler],
  );

  const handleInitialDate = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setInitialDate(event.target.value);
    },
    [],
  );

  const handleFinalDate = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setFinalDate(event.target.value);
    },
    [],
  );

  return (
    <Stack width="90%">
      <Stack flexDirection="row" justifyContent="flex-end" gap={1}>
        <Stack flexDirection="column">
          <Typography>De:</Typography>
          <TextField
            type="date"
            name="initialDate"
            margin="none"
            variant="filled"
            defaultValue={initialDate}
            onChange={handleInitialDate}
          />
        </Stack>
        <Stack flexDirection="column">
          <Typography>Para:</Typography>
          <TextField
            type="date"
            name="finalDate"
            margin="none"
            variant="filled"
            defaultValue={finalDate}
            onChange={handleFinalDate}
          />
        </Stack>
      </Stack>
      <List sx={styles.container}>{rowData}</List>
      <EvolutionModal
        isOpen={isOpen}
        handleClose={handleClose}
        data={evolutionFormState}
      />
    </Stack>
  );
};

export default Evolution;
