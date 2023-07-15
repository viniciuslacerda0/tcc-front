import { Box, Stack, Typography, ListItem, List } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

interface EvolutionInterface {
  id: number;
  name: string;
  created_at: string;
}

interface EvolutionForm {
  created_at: string;
  name: string;
  id: number;
}

const Evolution = (): JSX.Element => {
  const [evolutions, setEvolutions] = useState<
    EvolutionInterface[] | undefined
  >();
  const [rows, setRows] = useState<EvolutionInterface[] | undefined>(undefined);

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
    },
    [],
  );

  const rowData = useMemo(
    () =>
      rows?.map(row => (
        // Add onClick to open Modal
        <ListItem key={row.id} divider>
          <Box>
            <Typography>{row.name}</Typography>
            <Typography>{row.created_at}</Typography>
          </Box>
        </ListItem>
      )),
    [rows],
  );

  return (
    <Stack>
      <Box>
        <List>{rowData}</List>
      </Box>
    </Stack>
  );
};

export default Evolution;
