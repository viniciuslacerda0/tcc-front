import { useCallback, useMemo } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Routes from 'routes/Route';

const BackButton = (): JSX.Element => {
  const navigate = useNavigate();
  const isFirstPage = useMemo(() => window.history.state.idx === 0, []);
  const handleNavigate = useCallback(() => {
    if (isFirstPage) {
      navigate(Routes.ROOT);
      return;
    }
    navigate(-1);
  }, [isFirstPage, navigate]);
  return (
    <IconButton onClick={handleNavigate}>
      <ArrowBack color="secondary" />
    </IconButton>
  );
};

export default BackButton;
