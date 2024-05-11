import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

// {selectedData.map((answerNo, saarIndex) => ).map((answers, saarIndex) => (
// {selectedData.map((ele, index) => ele.length && [index, ele]).filter((ele) => ele).map(([saarIndex, answers]) => (

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Saar Pariksha'
    },
  }
}

function Result({displayData, selectedData}) {

  const chartData = {
    labels: selectedData.flatMap((ele, index) => ele.length ? [displayData.headings[index]] : []),
    datasets: [{
      label: 'saar percentage',
      data: selectedData.flatMap((ele, index) => ele.length ? [ele.length / displayData.options[index].length * 100] : []),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(155, 215, 186)',
        '#F97B22',
        '#F27BBD',
        '#52D3D8',
        '#98ABEE',
      ]
    }]
  };

  // useEffect(() => {
    // console.log(selectedData);
    // console.log(selectedData.map((ele, index) => ele && [index, ele]));
    
  //   console.log();
  // }, [])

  return (
    <div>
     <div style={{
      // width: '100%',
      backgroundColor: '#efefef',
      height: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
     <Pie options={options} data={chartData} />
     </div>
      <div style={{
        padding: '20px',
      }}>
        {selectedData.map((ele, index) => ele.length && [index, ele]).filter((ele) => ele).map(([saarIndex, answers]) => (
        <div key={saarIndex}>
          <header style={{
            fontSize: '28px',
            fontWeight: '600',
            fontFamily: 'Nunito',
            color: '#44b',
          }}>{displayData.headings[saarIndex]}</header>
          <ul style={{
            listStyleType: 'none',
            // listStylePosition: 'inside',
            // listStyleType: 'decimal'
        }}>
            {answers.sort((a, b) => a - b).map((ele, index) => (
              <li key={index} style={{
                margin: '6px 8px',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: '#eeeb',
              }}>{displayData.options[saarIndex][ele]}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
      </div>
    </div>
  )
}

export default Result