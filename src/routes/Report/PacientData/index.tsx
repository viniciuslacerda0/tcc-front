import { Box, Button, Grid, TextField } from '@mui/material';

import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { PacientDataState } from 'hooks/useFormData';
import { useFormData, PACIENT_DATA_INITIAL_STATE } from 'hooks/useFormData';

import type { TabsProps } from '../types';

const PacientData = ({
  id,
  value,
  disableField,
  pacientData,
}: TabsProps): JSX.Element => {
  const { updateData, data: formData } = useFormData();
  const [data, setState] = useState<PacientDataState>(
    PACIENT_DATA_INITIAL_STATE,
  );

  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string | number; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  useEffect(() => {
    if (pacientData?.pacientData) {
      setState(pacientData.pacientData);
    }
  }, [pacientData]);

  const onSave = useCallback(() => {
    updateData({ ...formData, pacientData: data });
  }, [data, formData, updateData]);

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id="tabpanel-reports-0"
      aria-labelledby="tab-reports-0"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Nome"
            name="name"
            value={data.name}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Idade"
            name="age"
            value={data.age}
            type="number"
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Sexo"
            name="sex"
            value={data.sex}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Cor"
            name="color"
            value={data.color}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Estado civil"
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Peso"
            name="weight"
            value={data.weight}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Altura"
            name="height"
            value={data.height}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Grau de Instrução"
            name="educationDegree"
            value={data.educationDegree}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Ocupação"
            name="profession"
            value={data.profession}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Endereço"
            name="address"
            value={data.address}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Telefone"
            name="cellphone"
            value={data.cellphone}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Data de Atendimento"
            name="consultationDate"
            value={
              pacientData
                ? new Date(data.consultationDate).toLocaleDateString()
                : data.consultationDate
            }
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Examinadora"
            name="consultatedBy"
            value={data.consultatedBy}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Encaminhado por"
            name="followUp"
            value={data.followUp}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Diagnostico de Origem"
            name="reasonForConsultation"
            value={data.reasonForConsultation}
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

export default PacientData;
