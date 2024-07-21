import React, { useEffect, useState } from 'react';
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
  CFormSelect,
} from '@coreui/react';
import { getMuseums, createMuseum, updateMuseum } from '../../../services/api';

const MuseumList = () => {
  const [museums, setMuseums] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentMuseum, setCurrentMuseum] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [operatingHours, setOperatingHours] = useState('');
  const [tickets, setTickets] = useState([{ type: '', price: '' }]);
  const [collections, setCollections] = useState([{ name: '', description: '' }]);

  useEffect(() => {
    loadMuseums();
  }, []);

  const loadMuseums = async () => {
    const response = await getMuseums();
    setMuseums(response.data.data);
  };

  const handleSave = async () => {
    const museumData = { name, description, file };

    try {
      if (currentMuseum) {
        await updateMuseum(currentMuseum.id, museumData, operatingHours, tickets, collections);
      } else {
        await createMuseum(museumData, operatingHours, tickets, collections);
      }
      setModal(false);
      setCurrentMuseum(null);
      loadMuseums();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMuseum(id);
      loadMuseums();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (museum = null) => {
    setCurrentMuseum(museum);
    setName(museum ? museum.name : '');
    setDescription(museum ? museum.description : '');
    setFile(null);
    setOperatingHours(museum ? museum.operatingHours : '');
    setTickets(museum ? museum.tickets : [{ type: '', price: '' }]);
    setCollections(museum ? museum.collections : [{ name: '', description: '' }]);
    setModal(true);
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { type: '', price: '' }]);
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };

  const handleAddCollection = () => {
    setCollections([...collections, { name: '', description: '' }]);
  };

  const handleCollectionChange = (index, field, value) => {
    const newCollections = [...collections];
    newCollections[index][field] = value;
    setCollections(newCollections);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Museums</span>
              <CButton color="primary" onClick={() => openModal()}>
                Add Museum
              </CButton>
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Id</CTableHeaderCell>
                  <CTableHeaderCell>Gambar</CTableHeaderCell>
                  <CTableHeaderCell>Nama</CTableHeaderCell>
                  <CTableHeaderCell>Aksi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {museums.map((museum) => (
                  <CTableRow key={museum.id}>
                    <CTableDataCell>{museum.id}</CTableDataCell>
                    <CTableDataCell>
                      <CImage size="md" width={100} height={100} src={museum.imageUrl} />
                    </CTableDataCell>
                    <CTableDataCell>{museum.name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(museum)}>
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(museum.id)}>
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
        <CModalHeader closeButton>{currentMuseum ? 'Edit Museum' : 'Add Museum'}</CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
          />
          <CFormTextarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2"
          />
          <CFormInput
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2"
          />
          <CFormInput
            type="text"
            placeholder="Operating Hours"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            className="mt-2"
          />
          <h5>Tickets</h5>
          {tickets.map((ticket, index) => (
            <div key={index} className="mt-2">
              <CFormInput
                type="text"
                placeholder="Type"
                value={ticket.type}
                onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
              />
              <CFormInput
                type="text"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                className="mt-2"
              />
            </div>
          ))}
          <CButton color="secondary" onClick={handleAddTicket} className="mt-2">
            Add Ticket
          </CButton>
          <h5>Collections</h5>
          {collections.map((collection, index) => (
            <div key={index} className="mt-2">
              <CFormInput
                type="text"
                placeholder="Name"
                value={collection.name}
                onChange={(e) => handleCollectionChange(index, 'name', e.target.value)}
              />
              <CFormTextarea
                placeholder="Description"
                value={collection.description}
                onChange={(e) => handleCollectionChange(index, 'description', e.target.value)}
                className="mt-2"
              />
            </div>
          ))}
          <CButton color="secondary" onClick={handleAddCollection} className="mt-2">
            Add Collection
          </CButton>
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
  );
};

export default MuseumList;
