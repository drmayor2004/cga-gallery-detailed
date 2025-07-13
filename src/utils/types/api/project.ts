export interface Project {
  results: Array<{
    id: number
    project_title: string
    project_description: string
    project_slug: string
    created_at: string
    updated_at: string
    username: string
    softwares: Array<{
      id: number
      software_name: string
      software_logo: string
    }>
    categories: Array<{
      id: number
      category_name: string
      category_image: string
    }>
    tags: Array<{
      id: number
      tag_name: string
    }>
  }>
}