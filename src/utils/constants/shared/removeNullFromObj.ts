const removeNullFromObj = (obj: Record<string, any>) => {
  const result: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      result[key] = value
    }
  }
  
  return result
}

export default removeNullFromObj