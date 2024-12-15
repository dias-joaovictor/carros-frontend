import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import Cars from '../content/applications/Cars';

const loggedInRoutes: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: 'cars',
        element: <Cars />
      },
      {
        path: '',
        element: <Navigate to="cars" replace />
      },
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: 'cars',
        element: <Cars />
      },
      {
        path: '',
        element: <Navigate to="cars" replace />
      }
    ]
  }
];

export default loggedInRoutes;
