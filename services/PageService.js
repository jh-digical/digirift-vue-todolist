import api from '@/services/api'

export default {
  fileURL: api.fileURL,

  getHomePage() {
    return api.apiClient.get('/homepage')
  },

  getAboutUs() {
    return api.apiClient.get('/about_us')
  },

  getProductsPage() {
    return api.apiClient.get('/productpage')
  },

  getProducts() {
    return api.apiClient.get('/products')
  },

  getFinishedWork() {
    return api.apiClient.get('/finished_work')
  },

  getWorksFinished() {
    return api.apiClient.get('/works_finished?fields=*,gallery.*')
  },

  getContactUs() {
    return api.apiClient.get('/contact_us')
  },
}
