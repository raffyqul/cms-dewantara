import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilCalendar,
  cilHouse
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Artikel',
    to: '/articles',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Wayang',
    to: '/puppets',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Event',
    to: '/events',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Museum',
    to: '/Museums',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,

  },

]

export default _nav
