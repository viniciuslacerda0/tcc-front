import { Button, Stack } from '@mui/material';
import { useCallback } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  onChange: (value: number) => void;
}

const Pagination = ({
  total,
  onChange,
  page,
}: PaginationProps): JSX.Element => {
  const onClickPrv = useCallback(() => {
    onChange(page - 1);
  }, [onChange, page]);

  const onClickNext = useCallback(() => {
    onChange(page + 1);
  }, [onChange, page]);

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Button
        variant="contained"
        color="primary"
        disabled={page === 1}
        onClick={onClickPrv}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={page === total}
        onClick={onClickNext}
      >
        Próximo
      </Button>
    </Stack>
  );
};

export default Pagination;
