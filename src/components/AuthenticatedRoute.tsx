import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AUTHENTICATED_USER } from '../gql/auth';
import routes from '../config/routes';
interface IProps extends RouteProps {
  role: string;
}
interface IProps extends RouteProps {}

const AuthenticatedRoute = (props: IProps) => {
  const history = useHistory();
  const { component, ...rest } = props;

  const { data } = useQuery(AUTHENTICATED_USER);

  if (!data?.AuthenticatedUser?.isLoggedIn) {
    history.push(routes.login);
  }

  return <Route component={component} {...rest} />;
};

export default AuthenticatedRoute;
