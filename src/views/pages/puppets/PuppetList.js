import React, { useEffect, useState } from 'react'
import { getPuppets, createPuppet, updatePuppet, deletePuppet } from '../../../services/api'
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

const PuppetList = () => {
  const [puppets, setpuppets] = useState([])
  const [modal, setModal] = useState(false)
  const [currentpuppet, setCurrentpuppet] = useState(null)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    loadpuppets()
  }, [])

  const loadpuppets = async () => {
    const response = await getPuppets()
    setpuppets(response.data.data)
  }

  const handleSave = async () => {
    const puppetData = {
      name,
      description,
      file
    }

    try {
      if (currentpuppet) {
        await updatePuppet(currentpuppet.id, puppetData)
      } else {
        await createPuppet(puppetData)
      }
      setModal(false)
      setCurrentpuppet(null)
      loadpuppets()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deletePuppet(id)
      loadpuppets()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const openModal = (puppet = null) => {
    setCurrentpuppet(puppet)
    setname(puppet ? puppet.name : '')
    setdescription(puppet ? puppet.description : '')
    setFile(null)
    setModal(true)
  }

  const truncateContent = (content, wordLimit) => {
    if (!content) {
      return '-';
    }
    const words = content.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : content;
  };

  return (
    <CRow>
      <CCol>
        <CCard>
         <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Wayang</span>
              <CButton color="primary" onClick={() => openModal()}>
                Add Wayang
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Id</CTableHeaderCell>
                  <CTableHeaderCell>Wayang</CTableHeaderCell>
                  <CTableHeaderCell>Nama Wayang</CTableHeaderCell>
                  <CTableHeaderCell>Konten</CTableHeaderCell>
                  <CTableHeaderCell>Aksi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {puppets.map((puppet) => (
                  <CTableRow key={puppet.id}>
                    <CTableDataCell>{puppet.id}</CTableDataCell>
                    <CTableDataCell>
                    <CImage size="md" width={100} height={100} src={puppet.imageUrl}/>
                    </CTableDataCell>
                    <CTableDataCell>{puppet.name}</CTableDataCell>
                    <CTableDataCell>{truncateContent(puppet.description, 5)}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(puppet)}>
                        Edit
                      </CButton>
                      <CButton className='ml-2' color="danger" onClick={() => handleDelete(puppet.id)}>
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
        <CModalHeader closeButton>{currentpuppet ? 'Edit Wayang' : 'Add wayang'}</CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="name"
            name='name'
            value={name}
            onChange={(e) => setname(e.target.value)}
            className='mt-2'
          />
          <CFormTextarea
            type="textarea"
            placeholder="description"
            className='mt-2'
            name='description'
            value={description}
            onChange={(e) => setdescription(e.target.value)}
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

export default PuppetList
