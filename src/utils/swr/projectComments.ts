import { useState, useEffect } from 'react'

// Mock comments data
const mockComments = {
  comments: [
    {
      id: 1,
      user_id: 2,
      first_name: "Sarah",
      last_name: "Johnson",
      username: "sarah_j",
      user: "sarah_j",
      comment: "Amazing work! The lighting effects are incredible 🔥",
      created_at: "2024-01-16T09:15:00Z",
      profile_picture: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400",
      like_button_status: false,
      children: [
        {
          id: 3,
          user_id: 1,
          first_name: "Alex",
          last_name: "Chen",
          username: "artist_demo",
          user: "artist_demo",
          comment: "Thank you so much! It took weeks to get the lighting just right.",
          created_at: "2024-01-16T10:30:00Z",
          profile_picture: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
          like_button_status: false,
          children: []
        }
      ]
    },
    {
      id: 2,
      user_id: 3,
      first_name: "Mike",
      last_name: "Rodriguez",
      username: "mike_3d",
      user: "mike_3d",
      comment: "The detail in the architecture is stunning. What software did you use for the modeling?",
      created_at: "2024-01-17T14:22:00Z",
      profile_picture: "https://images.pexels.com/photos/1239287/pexels-photo-1239287.jpeg?auto=compress&cs=tinysrgb&w=400",
      like_button_status: false,
      children: []
    }
  ]
}

const getProjectComments = (projectId: number, token: string, competition = false) => {
  const [projectComments, setProjectComments] = useState(mockComments)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [projectId])

  return { projectComments, isLoading, isError }
}

export default getProjectComments</biltAction>