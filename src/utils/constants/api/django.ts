const djangoAPI = (endpoint: string) => {
  const baseURL = 'https://api.cgafrica.com' // Mock API base URL
  return `${baseURL}${endpoint}`
}

export default djangoAPI