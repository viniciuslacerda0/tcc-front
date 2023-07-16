import type { CSSObject, DrawerProps as MUIDrawerProps } from '@mui/material';
import { Button, Drawer as MUIDrawer, Stack as MUIStack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { PropsWithChildren } from 'react';

type DrawerProps = MUIDrawerProps & {
  minWidth?: CSSObject['width'];
  onClose: (arg: React.KeyboardEvent | React.MouseEvent) => void;
  justifyContent?: CSSObject['justifyContent'];
};

const Drawer = ({
  minWidth = 250,
  onClose,
  children,
  justifyContent = 'space-between',
  ...props
}: PropsWithChildren<DrawerProps>): JSX.Element => {
  return (
    <MUIDrawer {...props} onClose={onClose}>
      <MUIStack height="100%" minWidth={minWidth}>
        <MUIStack direction="row" justifyContent="flex-end">
          <Button onClick={onClose} size="small" aria-label="fechar">
            <CloseIcon />
          </Button>
        </MUIStack>
        <MUIStack height="100%" justifyContent={justifyContent}>
          {children}
        </MUIStack>
      </MUIStack>
    </MUIDrawer>
  );
};

export default Drawer;
