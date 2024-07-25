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
  CFormInput,
  CSpinner,
  CAlert
} from '@coreui/react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PuppetList = () => {
  const [puppets, setpuppets] = useState([])
  const [modal, setModal] = useState(false)
  const [currentpuppet, setCurrentpuppet] = useState(null)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [type, settype] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false);
  const [loadingDeletetId, setloadingDeletetId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });


  useEffect(() => {
    loadpuppets()
  }, [])

  const loadpuppets = async () => {
    const response = await getPuppets()
    setpuppets(response.data.data)
  }

  const handleSave = async () => {
    setLoading(true);
    const puppetData = {
      name,
      description,
      type,
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
      setAlert({ show: true, message: 'Wayang saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error:', error)
    }finally{
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    setloadingDeletetId(id);

    try {
      await deletePuppet(id)
      loadpuppets()
      setAlert({ show: true, message: 'Wayang deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error:', error)
    }finally{
      setloadingDeletetId(null)
    }
  }

  const openModal = (puppet = null) => {
    setCurrentpuppet(puppet)
    setname(puppet ? puppet.name : '')
    setdescription(puppet ? puppet.description : '')
    settype(puppet ? puppet.type : '')
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
          {alert.show && (
              <CAlert color={alert.type} onClose={() => setAlert({ show: false, message: '', type: '' })}>
                {alert.message}
              </CAlert>
            )}
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Id</CTableHeaderCell>
                  <CTableHeaderCell>Wayang</CTableHeaderCell>
                  <CTableHeaderCell>Nama Wayang</CTableHeaderCell>
                  <CTableHeaderCell>Tipe Wayang</CTableHeaderCell>
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
                    <CTableDataCell>{puppet.type}</CTableDataCell>
                    <CTableDataCell>
                    <div dangerouslySetInnerHTML={{ __html: truncateContent(puppet.description, 5) }} />

                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(puppet)}>
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDelete(puppet.id)}
                        disabled={loadingDeletetId === puppet.id}
                         >
                        {loadingDeletetId === puppet.id ? <CSpinner size="sm" /> : 'Delete'}
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
          <CFormInput
            type="text"
            placeholder="Tipe"
            name='type'
            value={type}
            onChange={(e) => settype(e.target.value)}
            className='mt-2'
          />

          <ReactQuill
            value={description}
            onChange={setdescription}
            className="mt-2 custom-quill-editor"
          />

          <CFormInput
            type="file"
            name='image'
             className='mt-2'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </CModalBody>
        <CModalFooter>
        <CButton color="primary" onClick={handleSave} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Save'}
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
