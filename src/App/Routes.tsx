import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import routes from '../config/routes';
import constants from '../config/constants';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { authenticatedUserVar } from '../reactiveVariables';

interface IProps {}

const Routes = (props: IProps) => {
  const authenticatedUser = authenticatedUserVar();
  const user = authenticatedUser?.user;
  const role: string = user.role as string;

  return (
    <Router>
      <Switch>
        <Route path={routes.login} component={Login} />

        <AuthenticatedRoute path={routes.dashboard} component={Dashboard} role={role} exact />

        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  );
};

export default Routes;
