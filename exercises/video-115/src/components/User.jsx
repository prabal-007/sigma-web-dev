import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const param = useParams()
  return (
    <div>
      My name is {param.username}
    </div>
  )
}

export default User
