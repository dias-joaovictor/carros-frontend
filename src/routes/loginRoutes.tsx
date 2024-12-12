import { RouteObject } from 'react-router';
import Login from '../components/Login';


const loginRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Login />,
  },
];

export default loginRoutes;
