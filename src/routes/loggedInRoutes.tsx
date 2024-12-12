import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import Cars from '../content/applications/Cars';

function UserProfile() {
  return null;
}

function UserSettings() {
  return null;
}

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
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
    ]
  }
];

export default loggedInRoutes;
