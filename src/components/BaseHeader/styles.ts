import sx from 'utils/createSx';

export default sx({
  headerContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    height: theme => theme.spacing(3.75),
    width: theme => theme.spacing(3.75),
  },
});
