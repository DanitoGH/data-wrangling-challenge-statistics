import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DashboardApp from './pages/DashboardApp';
// material
import { styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 40;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default function Routes() {
  return (
    <Router>
     <RootStyle>
      <MainStyle>
      <Switch>
      <Route path="/">
          <DashboardApp />
       </Route>
     </Switch>
     </MainStyle>
    </RootStyle>
   </Router>
  )
}
