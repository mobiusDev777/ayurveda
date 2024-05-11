import React from 'react'
import { useNavigate } from 'react-router-dom'

function ArrowBack({size, position}) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} style={{
      position: 'fixed',
      ...position,
      width: size,
      aspectRatio: 1,
      border: 'none',
      borderRadius: '26px',
      backgroundColor: '#ffffffa2',
    }}>
      <span className="material-symbols-outlined" style={{color: '#44f'}}>arrow_back</span>
    </button>
  )
}

export default ArrowBack