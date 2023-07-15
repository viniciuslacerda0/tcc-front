import { Stack } from '@mui/system';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import CardButton from 'components/CardButton';

import styles from './styles';

const PacientMenu = (): JSX.Element => {
  return (
    <Stack sx={styles.container}>
      <CardButton icon={<EditNoteIcon />} text="Editar Informacoes" />
      <CardButton icon={<TrendingUpIcon />} text="Adicionar Evolucao" />
      <CardButton icon={<QueryStatsIcon />} text="Mostrar Evolucao" />
    </Stack>
  );
};

export default PacientMenu;
