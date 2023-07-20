import { Box, Typography, List, Stack, Input, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import ListItem from 'components/ListItem';

import { useModal } from 'hooks/useModal';

import { useUser } from 'hooks/useUser';

import styles from './styles';
import EvolutionModal from './EvolutionModal';

interface EvolutionInterface {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

interface EvolutionForm {
  created_at: string;
  name: string;
  text: string;
  id: number;
}

const mockData: EvolutionInterface[] = [
  {
    id: 1,
    name: 'Evolution 1',
    created_at: '2023-07-01',
    text: '',
  },
  {
    id: 2,
    name: 'Evolution 2',
    created_at: '2023-07-02',
    text: '',
  },
  {
    id: 3,
    name: 'Evolution 3',
    created_at: '2023-07-03',
    text: '',
  },
  {
    id: 4,
    name: 'Evolution 4',
    created_at: '2023-07-04',
    text: '',
  },
  {
    id: 5,
    name: 'Evolution 5',
    created_at: '2023-07-05',
    text: '',
  },
];

const Evolution = (): JSX.Element => {
  const [evolutions, setEvolutions] = useState<
    EvolutionInterface[] | undefined
  >(mockData);
  const { user } = useUser();
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const { isOpen, handleClose, handleOpen } = useModal();

  const [rows, setRows] = useState<EvolutionInterface[] | undefined>(mockData);

  const [evolutionFormState, setEvolutionFormState] = useState<
    EvolutionForm | undefined
  >();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {},
    [],
  );

  const setGroupFormStateHandler = useCallback(
    (newFormState: EvolutionForm | undefined) => {
      setEvolutionFormState(newFormState);
      handleOpen();
    },
    [handleOpen],
  );

  const rowData = useMemo(
    () =>
      rows?.map(row => (
        <ListItem key={row.id}>
          <Box onClick={(): void => setGroupFormStateHandler(row)}>
            <Typography>{row.name}</Typography>
            <Typography>
              {new Date(row.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </ListItem>
      )),
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
