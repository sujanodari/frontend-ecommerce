import { Route, RouteProps, useHistory } from 'react-router-dom';

import routes from '../config/routes';

interface IProps extends RouteProps {
  role: string;
}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const { component, ...rest } = props;

  // TODO: Check authentication
  const isLoggedIn: boolean = true;
  if (!isLoggedIn) {
    history.push(routes.login);
  }
  return <Route component={component} {...rest} />;
};

export default AuthenticatedRoute;
