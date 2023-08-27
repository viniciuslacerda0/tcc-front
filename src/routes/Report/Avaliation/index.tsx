import type { SelectChangeEvent } from '@mui/material';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';

import type { ChangeEvent } from 'react';

import { useCallback, useEffect, useState } from 'react';

import type { AvaliationDataState, BreathingPattern } from 'hooks/useFormData';
import { useFormData, AVALIATION_DATA_INITIAL_STATE } from 'hooks/useFormData';

import type { TabsProps } from '../types';

// TODO: Add Avaliation Table to this component
const Avaliation = ({
  id,
  value,
  disableField,
  pacientData,
}: TabsProps): JSX.Element => {
  const { updateData, data: formData } = useFormData();
  const [data, setState] = useState<AvaliationDataState>(
    AVALIATION_DATA_INITIAL_STATE,
  );
  console.log('🚀 ~ file: index.tsx:40 ~ data:', data);

  const onChangeTextField = useCallback(
    (event: ChangeEvent<{ value: string | boolean; name: string }>): void =>
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
      })),
    [setState],
  );

  const onChangeRadio = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setState(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value === 'true',
      }));
    },
    [setState],
  );

  const onChangeSelect = useCallback(
    (event: SelectChangeEvent<BreathingPattern>): void =>
      setState(prevState => ({
        ...prevState,
        breathingPattern: event.target.value as BreathingPattern,
      })),
    [setState],
  );

  const onChangeCheckbox = useCallback(
    (
      event: ChangeEvent<{ value: string; name: string }>,
      checked: boolean,
    ): void =>
      setState(prevState => ({
        ...prevState,
        [event.currentTarget.name]: checked,
      })),
    [setState],
  );
  const onSave = useCallback(() => {
    updateData({ ...formData, avaliationData: data });
  }, [data, formData, updateData]);

  useEffect(() => {
    if (pacientData?.avaliationData) {
      setState(pacientData.avaliationData);
    }
  }, [pacientData]);

  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id="tabpanel-reports-3"
      aria-labelledby="tab-reports-3"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="painHappens">Ocorrência de dor</FormLabel>
            <RadioGroup
              aria-labelledby="painHappens"
              row
              value={data.painHappens}
              name="painHappens"
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
          <TextField
            disabled={disableField}
            fullWidth
            label="Local"
            name="painLocation"
            value={data.painLocation}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Intensidade (EVA)"
            name="painIntensity"
            value={data.painIntensity}
            helperText="Escala visual analógica (1 a 10)"
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Característica"
            name="painCharacteristics"
            value={data.painCharacteristics}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Tempo de dor"
            name="painDuration"
            value={data.painDuration}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Outras observações"
            name="otherObservations"
            value={data.otherObservations}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Limitação funcional / Amplitudes globais"
            name="limitation"
            value={data.limitation}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            disabled={disableField}
            fullWidth
            label="Características"
            name="characteristics"
            value={data.characteristics}
            onChange={onChangeTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <InputLabel id="breathingPattern">Padrão Respiratorio</InputLabel>
            <Select
              labelId="breathingPattern"
              value={data.breathingType}
              label="Padrão Respiratorio"
              disabled={disableField}
              onChange={onChangeSelect}
              fullWidth
            >
              <MenuItem value="DIAFRAGMATICO">Diafragmático</MenuItem>
              <MenuItem value="COSTAL">Costal</MenuItem>
              <MenuItem value="MISTO">Misto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="spasm">Espasmo Muscular</FormLabel>
            <RadioGroup
              aria-labelledby="spasm"
              row
              value={data.spasm}
              name="spasm"
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
            <TextField
              disabled={disableField}
              fullWidth
              label="Local"
              name="spasmLocation"
              value={data.spasmLocation}
              onChange={onChangeTextField}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl>
            <FormLabel id="fracture">Fratura</FormLabel>
            <RadioGroup
              aria-labelledby="fracture"
              row
              value={data.fracture}
              name="fracture"
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
            <TextField
              disabled={disableField}
              fullWidth
              label="Local"
              name="fractureLocation"
              value={data.fractureLocation}
              onChange={onChangeTextField}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormGroup>
            <FormControlLabel
              disabled={disableField}
              control={
                <Checkbox
                  value={data.cognitiveDeficit}
                  name="cognitiveDeficit"
                  onChange={onChangeCheckbox}
                />
              }
              label="Deficit cognitivo"
            />
            <FormControlLabel
              disabled={disableField}
              control={
                <Checkbox
                  value={data.auditoryDeficit}
                  name="auditoryDeficit"
                  onChange={onChangeCheckbox}
                />
              }
              label="Deficit auditivo"
            />
            <FormControlLabel
              disabled={disableField}
              control={
                <Checkbox
                  value={data.visualDeficit}
                  name="visualDeficit"
                  onChange={onChangeCheckbox}
                />
              }
              label="Deficit visual"
            />
          </FormGroup>
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

export default Avaliation;
