import { Grid, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

import type { ChangeEvent } from 'react';

import { useCallback, useEffect, useState } from 'react';

import type { ClinicalPhysicalExamState } from 'hooks/useFormData';
import {
  useFormData,
  CLINICAL_PHYSICAL_EXAM_INITIAL_STATE,
} from 'hooks/useFormData';

import type { TabsProps } from '../types';

const PhysicalExam = ({
  id,
  value,
  disableField,
  pacientData,
}: TabsProps): JSX.Element => {
  const { updateData, data: formData } = useFormData();
  const [data, setState] = useState<ClinicalPhysicalExamState>(
    CLINICAL_PHYSICAL_EXAM_INITIAL_STATE,
  );

  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  const onSave = useCallback(() => {
    updateData({ ...formData, clinicalPhysicalExamData: data });
  }, [data, formData, updateData]);

  useEffect(() => {
    if (pacientData?.clinicalPhysicalExamData) {
      setState(pacientData.clinicalPhysicalExamData);
    }
  }, [pacientData]);

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id="tabpanel-reports-2"
      aria-labelledby="tab-reports-2"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="PA"
            name="pa"
            value={data.pa}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="FR"
            name="fr"
            value={data.fr}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="FC"
            name="fc"
            value={data.fc}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Inspeção"
            name="instrospection"
            multiline
            value={data.instrospection}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Palpação"
            name="palpation"
            multiline
            value={data.palpation}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Tipo de marcha"
            name="marchType"
            value={data.marchType}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Amplitude articular"
            name="articulationAmplitude"
            multiline
            value={data.articulationAmplitude}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Goniometria"
            name="goniometry"
            multiline
            value={data.goniometry}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Perimetria"
            name="periometry"
            multiline
            value={data.periometry}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Teste de força muscular"
            name="muscleStrength"
            multiline
            value={data.muscleStrength}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Exames complementares"
            name="complementaryExams"
            multiline
            value={data.complementaryExams}
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
        <Button variant="contained" onClick={onSave}>
          Salvar
        </Button>
      </Box>
    </div>
  );
};

export default PhysicalExam;
