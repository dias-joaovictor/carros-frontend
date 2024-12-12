import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import Messenger from '../content/applications/Messenger';
import Buttons from '../content/pages/Components/Buttons';
import Modals from '../content/pages/Components/Modals';
import Accordions from '../content/pages/Components/Accordions';
import Tabs from '../content/pages/Components/Tabs';
import Badges from '../content/pages/Components/Badges';
import Tooltips from '../content/pages/Components/Tooltips';
import Avatars from '../content/pages/Components/Avatars';
import Cards from '../content/pages/Components/Cards';
import Forms from '../content/pages/Components/Forms';
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
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
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
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default loggedInRoutes;
