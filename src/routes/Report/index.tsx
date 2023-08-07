import { Box, Stack, Tab, Tabs } from '@mui/material';

import { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import axios from 'axios';

import { useUser } from 'hooks/useUser';

import { UserType } from 'routes/Dashboard';

import type { FormData } from 'hooks/useFormData';

import PacientData from './PacientData';
import styles from './styles';
import ClinicHistory from './ClinicHistory';
import PhysicalExam from './PhysicalExam';
import Avaliation from './Avaliation';
import Diagnostic from './Diagnostic';

const Report = (): JSX.Element => {
  const { user } = useUser();
  const [value, setValue] = useState(0);
  const [pacientData, setPacientData] = useState<FormData>();
  const { state } = useLocation();

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    [],
  );

  const fetchData = useCallback(async () => {
    const response = await axios.get(`/pacient/${state.id}`);
    setPacientData(response.data);
  }, [state]);

  useEffect(() => {
    if (state?.id) {
      fetchData().catch(err => console.log(err));
    }
  }, [fetchData, state]);

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Ficha de atendimento"
            id="tab-reports-0"
            aria-controls="tabpanel-reports-0"
          />
          <Tab
            label="História clínica"
            id="tab-reports-1"
            aria-controls="tabpanel-reports-1"
          />
          <Tab
            label="Exames físicos"
            id="tab-reports-2"
            aria-controls="tabpanel-reports-2"
          />
          <Tab
            label="Avaliação"
            id="tab-reports-3"
            aria-controls="tabpanel-reports-3"
          />
          <Tab
            label="Diagnóstico e proposta de tratamento"
            id="tab-reports-4"
            aria-controls="tabpanel-reports-4"
          />
        </Tabs>
      </Box>
      <PacientData
        value={value}
        id={0}
        disableField={user.type === UserType.PACIENT}
        pacientData={pacientData}
      />
      <ClinicHistory
        value={value}
        id={1}
        disableField={user.type === UserType.PACIENT}
        pacientData={pacientData}
      />
      <PhysicalExam
        value={value}
        id={2}
        disableField={user.type === UserType.PACIENT}
        pacientData={pacientData}
      />
      <Avaliation
        value={value}
        id={3}
        disableField={user.type === UserType.PACIENT}
        pacientData={pacientData}
      />
      <Diagnostic
        value={value}
        id={4}
        disableField={user.type === UserType.PACIENT}
        pacientData={pacientData}
      />
    </Stack>
  );
};

export default Report;
