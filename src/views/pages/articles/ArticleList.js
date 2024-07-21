import React, { useEffect, useState } from 'react'
import { getArticles, createArticle, updateArticle, deleteArticle } from '../../../services/api'
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

const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const [modal, setModal] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    const response = await getArticles()
    setArticles(response.data.data)
  }

  const handleSave = async () => {
    const articleData = {
      title,
      content,
      file
    }

    try {
      if (currentArticle) {
        await updateArticle(currentArticle.id, articleData)
      } else {
        await createArticle(articleData)
      }
      setModal(false)
      setCurrentArticle(null)
      loadArticles()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id)
      loadArticles()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const openModal = (article = null) => {
    setCurrentArticle(article)
    setTitle(article ? article.title : '')
    setContent(article ? article.content : '')
    setFile(null)
    setModal(true)
  }

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
                    <CImage size="md" width={100} height={100} src={article.imageUrl}/>
                    </CTableDataCell>
                    <CTableDataCell>{article.title}</CTableDataCell>
                    <CTableDataCell>{article.content}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => openModal(article)}>
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDelete(article.id)}>
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
        <CModalHeader closeButton>{currentArticle ? 'Edit Article' : 'Add Article'}</CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            placeholder="Title"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-2'
          />
          <CFormTextarea
            type="textarea"
            placeholder="Content"
            className='mt-2'
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default ArticleList
