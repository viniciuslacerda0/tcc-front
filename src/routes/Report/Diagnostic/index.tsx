import type { ChangeEvent } from 'react';

import { useState, useCallback } from 'react';

import { Grid, TextField, Button } from '@mui/material';

import { Box } from '@mui/system';

import { useSnackbar } from 'notistack';

import type { TreatmentDataState } from 'hooks/useFormData';
import { TREATMENT_DATA_INITIAL_STATE, useFormData } from 'hooks/useFormData';

import type { TabsProps } from '../types';

const Diagnostic = ({
  id,
  value,
  disableField,
  pacientData,
}: TabsProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const { wipeData, data: formData } = useFormData();
  const [data, setState] = useState<TreatmentDataState>(
    pacientData ?? TREATMENT_DATA_INITIAL_STATE,
  );

  const onSave = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fullData = { ...formData, ...data };
      wipeData();
      enqueueSnackbar('Relatorio salvo com sucesso');
    } catch (error) {
      enqueueSnackbar('Erro ao salvar dados');
    }
  }, [data, enqueueSnackbar, formData, wipeData]);

  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id="tabpanel-reports-4"
      aria-labelledby="tab-reports-4"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Diagnóstico fisioterapêutico"
            name="fisioterapeuticDiagnosis"
            multiline
            value={data.fisioterapeuticDiagnosis}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Observações"
            name="observations"
            multiline
            value={data.observations}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Proposta de tratamento"
            name="fisioterapeuticTreatment"
            multiline
            value={data.fisioterapeuticTreatment}
            onChange={onChangeTextField}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: 2,
          display: disableField ? 'none' : 'flex',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button variant="contained" onClick={onSave}>
          Salvar
        </Button>
      </Box>
    </div>
  );
};
export default Diagnostic;
