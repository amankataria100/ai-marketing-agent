import axios from 'axios'

const BASE_URL = 'https://ai-marketing-agent-bf25.onrender.com'

export async function analyzeProduct({ file, brandName, productDescription, targetAudience }) {
  const formData = new FormData()
  if (file) formData.append('file', file)
  formData.append('brand_name', brandName)
  formData.append('product_description', productDescription)
  formData.append('target_audience', targetAudience)

  const { data } = await axios.post(`${BASE_URL}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function generateContent({ file, brandName, productDescription, targetAudience, analysis }) {
  const formData = new FormData()
  if (file) formData.append('file', file)
  formData.append('brand_name', brandName)
  formData.append('product_description', productDescription)
  formData.append('target_audience', targetAudience)
  formData.append('analysis', JSON.stringify(analysis))

  const { data } = await axios.post(`${BASE_URL}/generate`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
