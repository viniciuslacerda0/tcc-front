import sx from 'utils/createSx';

export default sx({
  headerContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  breadcrumbsWrapper: {
    display: {
      xs: 'none',
      sm: 'block',
    },
  },
  profileIconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme => theme.spacing(4),
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  icon: {
    height: theme => theme.spacing(3.75),
    width: theme => theme.spacing(3.75),
  },
  logo: {
    width: theme => theme.spacing(5),
    height: theme => theme.spacing(5),
    objectFit: 'contain',
  },
});
