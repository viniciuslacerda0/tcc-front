import { Stack } from '@mui/system';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

import { useUser } from 'hooks/useUser';

import CardButton from 'components/CardButton';

import styles from './styles';

enum UserType {
  PROFESSIONAL = 'professional',
  PACIENT = 'pacient',
}

const icons = {
  [UserType.PROFESSIONAL]: {
    icon1: <PersonAddIcon />,
    icon2: <SwitchAccountIcon />,
  },
  [UserType.PACIENT]: {
    icon1: <PersonIcon />,
    icon2: <ShowChartIcon />,
  },
};

const text = {
  [UserType.PROFESSIONAL]: {
    text1: 'Novo Paciente',
    text2: 'Lista de Pacientes',
  },
  [UserType.PACIENT]: {
    text1: 'Meus dados',
    text2: 'Visualizar Evolução',
  },
};

const Dashboard = (): JSX.Element => {
  const { user } = useUser();
  const dashboardIcons = icons[user.type as UserType];
  const dashboardText = text[user.type as UserType];

  return (
    <Stack sx={styles.container}>
      <CardButton icon={dashboardIcons.icon1} text={dashboardText.text1} />
      <CardButton icon={dashboardIcons.icon2} text={dashboardText.text2} />
    </Stack>
  );
};

export default Dashboard;
