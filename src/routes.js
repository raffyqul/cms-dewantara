import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ArticleList = React.lazy(() => import('./views/pages/articles/ArticleList'))
const PuppetList = React.lazy(() => import('./views/pages/puppets/PuppetList'))
const EventList = React.lazy(() => import('./views/pages/events/EventList'))
const MuseumList = React.lazy(() => import('./views/pages/museums/MuseumList'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/articles', name: 'Articles', element: ArticleList },
  { path: '/puppets', name: 'Wayang', element: PuppetList },
  { path: '/events', name: 'Event', element: EventList },
  { path: '/museums', name: 'Museum', element: MuseumList },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
