import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSpinner,
} from '@coreui/react'
import { cilExitToApp } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'https://dewantara-api.vercel.app/api/v1/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    setLoading(false)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#" onClick={handleLogout} disabled={loading}>
          <CIcon icon={cilExitToApp} className="me-2" />
          {loading ? <CSpinner size="sm" /> : 'Logout'}
        </CDropdownItem>
      </CDropdownMenu>
      {loading && (
        <div className="overlay">
          <CSpinner />
        </div>
      )}
    </CDropdown>
  )
}

export default AppHeaderDropdown
