import React from 'react';
import AnalysisIcon from '../../assets/icons/analysis.png';

function AnalysisBtn({size, position, navigateLink}) {
  return (
    <button style={{
      position: 'fixed',
      ...position,
      width: size + 'px',
      aspectRatio: 1,
      border: 'none',
      borderRadius: '26px',
      backgroundColor: '#ffffffa2',
    }} onClick={navigateLink}>
      <img
        src={AnalysisIcon}
        width={size * 0.62}
        height={size * 0.62}
      />
    </button>
  )
}

export default AnalysisBtn