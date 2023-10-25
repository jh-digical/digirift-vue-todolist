import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://trellis.ongoing.co.nz/cms/items`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = 'mhXDAifigkPU9QYOnWoNM3we1V22hZ6Z'
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

apiClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return error
  }
)

export default {
  apiClient,
  fileURL: 'http://trellis.ongoing.co.nz/cms/assets/',
}
