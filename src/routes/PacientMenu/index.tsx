import { Stack } from '@mui/system';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import CardButton from 'components/CardButton';
import Route from 'routes/Route';
import { useModal } from 'hooks/useModal';
import { UserType } from 'routes/Dashboard';

import EditEvolutionModal from 'routes/Evolution/EditEvolutionModal';

import styles from './styles';

const PacientMenu = (): JSX.Element => {
  const navigate = useNavigate();
  const { isOpen, handleOpen, handleClose } = useModal();
  const goToEvolution = useCallback(() => {
    navigate(Route.EVOLUTION);
  }, [navigate]);

  return (
    <Stack sx={styles.container}>
      <CardButton icon={<EditNoteIcon />} text="Editar Informacoes" />
      <CardButton
        icon={<TrendingUpIcon />}
        text="Adicionar Evolucao"
        to={handleOpen}
      />
      <CardButton
        icon={<QueryStatsIcon />}
        text="Mostrar Evolucao"
        to={goToEvolution}
      />
      <EditEvolutionModal isOpen={isOpen} handleClose={handleClose} />
    </Stack>
  );
};

export default PacientMenu;
