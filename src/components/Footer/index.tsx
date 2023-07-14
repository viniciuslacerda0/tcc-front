import { AppBar } from '@mui/material';

const footerSx = {
  bottom: 0,
  top: 'auto',
  position: 'inherit',
};

const Footer = (): JSX.Element => {
  return <AppBar sx={footerSx} enableColorOnDark component="footer" />;
};

export default Footer;
