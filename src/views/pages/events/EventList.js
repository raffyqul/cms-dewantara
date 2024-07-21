import React, { useEffect, useState } from 'react'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../../services/api'
import {
  CImage,
  CFormTextarea,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput
} from '@coreui/react'

const EventList = () => {
  const [events, setevents] = useState([])
  const [modal, setModal] = useState(false)
  const [currentevent, setCurrentevent] = useState(null)
  const [name, setname] = useState('')
  const [start_date, setstart_date] = useState('')
  const [location, setlocation] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const response = await getEvents()
    const sortedEvents = response.data.data.sort((a, b) => a.id - b.id)
    setevents(sortedEvents)
  }

  const loadevents = async () => {
    const response = await getEvents()
    setevents(response.data.data)
  }

  const handleSave = async () => {
    const eventData = {
      name,
      start_date,
      location,
      file
    }

    try {
      if (currentevent) {
        await updateEvent(currentevent.id, eventData)
      } else {
        await createEvent(eventData)
      }
      setModal(false)
      setCurrentevent(null)
      loadevents()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id)
      loadevents()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const openModal = (event = null) => {
    setCurrentevent(event)
    setname(event ? event.name : '')
    setstart_date(event ? event.start_date : '')
    setlocation(event ? event.location : '')
    setFile(null)
    setModal(true)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
         <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Event</span>
              <CButton color="primary" onClick={() => openModal()}>
                Add event
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Id</CTableHeaderCell>
                  <CTableHeaderCell>Gambar</CTableHeaderCell>
                  <CTableHeaderCell>Nama Event</CTableHeaderCell>
                  <CTableHeaderCell>Tanggal</CTableHeaderCell>
                  <CTableHeaderCell>Lokasi</CTableHeaderCell>
                  <CTableHeaderCell>Aksi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {events.map((event) => (
                  <CTableRow key={event.id}>
                    <CTableDataCell>{event.id}</CTableDataCell>
                    <CTableDataCell>
                    <CImage size="md" width={100} height={100} src={event.imageUrl}/>
                    </CTableDataCell>
                    <CTableDataCell>{event.name}</CTableDataCell>
                    <CTableDataCell>{formatDate(event.startDate)}</CTableDataCell>
                    <CTableDataCell>{event.location}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(event)}>
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(event.id)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader closeButton>{currentevent ? 'Edit event' : 'Add event'}</CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Nama Event"
            name='name'
            value={name}
            onChange={(e) => setname(e.target.value)}
            className='mt-2'
          />
            <CFormInput
            type="date"
            placeholder="Pilih start"
            name='start_date'
            value={start_date}
            onChange={(e) => setstart_date(e.target.value)}
            className='mt-2'
          />
          <CFormInput
            type="text"
            placeholder="Lokasi"
            className='mt-2'
            name='location'
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
          <CFormInput
            type="file"
            name='file'
             className='mt-2'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default EventList
