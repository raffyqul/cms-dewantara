import React, { useEffect, useState } from 'react';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../../../services/api';
import {
  CImage,
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
} from '@coreui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loadingDeletetId, setloadingDeletetId] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const response = await getArticles();
    setArticles(response.data.data);
  };

  const handleSave = async () => {
    setLoading(true);
    const articleData = {
      title,
      content,
      file
    };

    try {
      if (currentArticle) {
        await updateArticle(currentArticle.id, articleData);
      } else {
        await createArticle(articleData);
      }
      setModal(false);
      setCurrentArticle(null);
      loadArticles();
      setAlert({ show: true, message: 'Article saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setAlert({ show: true, message: 'Error saving article!', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setloadingDeletetId(id);
    try {
      await deleteArticle(id);
      loadArticles();
      setAlert({ show: true, message: 'Article deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setAlert({ show: true, message: 'Error deleting article!', type: 'danger' });
    } finally {
      setloadingDeletetId(null);

    }
  };

  const openModal = (article = null) => {
    setCurrentArticle(article);
    setTitle(article ? article.title : '');
    setContent(article ? article.content : '');
    setFile(null);
    setModal(true);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Articles</span>
              <CButton color="primary" onClick={() => openModal()}>
                Add Article
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
                  <CTableHeaderCell>Gambar</CTableHeaderCell>
                  <CTableHeaderCell>Judul</CTableHeaderCell>
                  <CTableHeaderCell>Konten</CTableHeaderCell>
                  <CTableHeaderCell>Aksi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {articles.map((article) => (
                  <CTableRow key={article.id}>
                    <CTableDataCell>{article.id}</CTableDataCell>
                    <CTableDataCell>
                      <CImage size="md" width={100} height={100} src={article.imageUrl} />
                    </CTableDataCell>
                    <CTableDataCell>{article.title}</CTableDataCell>
                    <CTableDataCell>
                      <div dangerouslySetInnerHTML={{ __html: truncateText(article.content, 10) }} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(article)}>
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDelete(article.id)}
                        disabled={loadingDeletetId === article.id}
                         >
                        {loadingDeletetId === article.id ? <CSpinner size="sm" /> : 'Delete'}
                      </CButton>

                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modal} onClose={() => setModal(false)} className="custom-modal">
        <CModalHeader closeButton>{currentArticle ? 'Edit Article' : 'Add Article'}</CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2"
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            className="mt-2 custom-quill-editor"
          />
          <CFormInput
            type="file"
            name="file"
            className="mt-2"
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
  );
};

export default ArticleList;
