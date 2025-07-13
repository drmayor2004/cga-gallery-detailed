export interface ProjectComments {
  id: number
  user_id: number
  first_name: string
  last_name: string
  username: string
  user: string
  comment: string
  created_at: string
  profile_picture: string
  like_button_status: boolean
  children: ProjectComments[]
}