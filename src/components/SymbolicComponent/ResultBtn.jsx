import React from 'react'
import ResultIcon from '../../assets/icons/result.png'

function ResultBtn({size, position, setShowResult}) {
  return (
    <button style={{
      position: 'fixed',
      ...position,
      width: size + 'px',
      aspectRatio: 1,
      border: 'none',
      borderRadius: '26px',
      backgroundColor: '#ffffffa2',
    }} onClick={() => setShowResult(true)}>
      <img
        style={{marginLeft: '4px'}}
        src={ResultIcon}
        width={size * 0.62}
        height={size * 0.62}
      />
    </button>
  )
}

export default ResultBtn