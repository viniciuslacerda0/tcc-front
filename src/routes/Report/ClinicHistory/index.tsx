import {
  Grid,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Box } from '@mui/system';

import type { ChangeEvent } from 'react';

import { useCallback, useEffect, useState } from 'react';

import type { ClinicalDataState } from 'hooks/useFormData';
import { useFormData, CLINICAL_DATA_INITIAL_STATE } from 'hooks/useFormData';

import type { TabsProps } from '../types';

const ClinicHistory = ({
  id,
  value,
  disableField,
  pacientData,
}: TabsProps): JSX.Element => {
  const { updateData, data: formData } = useFormData();
  const [data, setState] = useState<ClinicalDataState>(
    CLINICAL_DATA_INITIAL_STATE,
  );

  const onChangeRadio = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value === 'true',
      })),
    [setState],
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
    updateData({ ...formData, clinicalData: data });
  }, [data, formData, updateData]);

  useEffect(() => {
    if (pacientData?.clinicalData) {
      setState(pacientData.clinicalData);
    }
  }, [pacientData]);

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id="tabpanel-reports-1"
      aria-labelledby="tab-reports-1"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Q.P."
            name="qp"
            value={data.qp}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="H.D.A."
            name="hda"
            value={data.hda}
            multiline
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="H.P.P."
            name="hpp"
            value={data.hpp}
            multiline
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="História familiar"
            name="familyHistory"
            value={data.familyHistory}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Tipo de dor"
            name="painType"
            value={data.painType}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Medicação"
            name="medication"
            multiline
            value={data.medication}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="has">Has</FormLabel>
            <RadioGroup
              aria-labelledby="has"
              row
              value={data.hasHas}
              name="hasHas"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="smoker">Tabagismo</FormLabel>
            <RadioGroup
              aria-labelledby="smoker"
              row
              value={data.isSmoker}
              name="isSmoker"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="allergy">Alergia</FormLabel>
            <RadioGroup
              aria-labelledby="allergy"
              row
              value={data.hasAllergy}
              name="hasAllergy"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="diabetes">Diabetes</FormLabel>
            <RadioGroup
              aria-labelledby="diabetes"
              row
              value={data.hasDiabetes}
              name="hasDiabetes"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="obese">Obesidade</FormLabel>
            <RadioGroup
              aria-labelledby="obese"
              row
              value={data.isObese}
              name="isObese"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="pneumonia">Pneumopatia</FormLabel>
            <RadioGroup
              aria-labelledby="pneumonia"
              row
              value={data.hasPneumonia}
              name="hasPneumonia"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="cardiopath">Cardiopatia</FormLabel>
            <RadioGroup
              aria-labelledby="cardiopath"
              row
              value={data.isCardiopath}
              name="isCardiopath"
              onChange={onChangeRadio}
            >
              <FormControlLabel
                value
                control={<Radio disabled={disableField} />}
                label="Sim"
              />
              <FormControlLabel
                value={false}
                control={<Radio disabled={disableField} />}
                label="Não"
              />
            </RadioGroup>
          </FormControl>
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

export default ClinicHistory;
