import React, { useEffect, useRef } from 'react';
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
      text: 'Chart.js Horizontal Bar Chart'
    },
  }
}

function Result({displayData, selectedData}) {

  // const dosha_counter = useRef({
  //   'vaat': 0,
  //   'pitt': 0,
  //   'kuff': 0,
  // });
  
  
  const chartData = {
    labels: ['Vaat','Pitt','Kuff'],
    datasets: [{
      label: 'dosha percentage',
      data: [10, 0, 0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(155, 215, 186)',
      ]
    }]
  };

    Object.entries(selectedData).forEach(([_c, questionArr]) => {
      Object.entries(questionArr).forEach(([_Qn, doshaArr]) => {
        Object.entries(doshaArr).forEach(([dosha, answers]) => {
          // dosha_counter.current[dosha] = dosha_counter.current[dosha] + answers.length;
          if(dosha == 'vaat') {
            chartData.datasets[0]['data'][0] = chartData.datasets[0]['data'][0] + answers.length;
          } else if (dosha == 'pitt') {
            chartData.datasets[0]['data'][1] = chartData.datasets[0]['data'][1] + answers.length;
          } else {
            chartData.datasets[0]['data'][2] = chartData.datasets[0]['data'][2] + answers.length;
          }
        });
      });
    });

    let dosha_sum = chartData.datasets[0]['data'].reduce((sum, ele) => sum + ele)

    chartData.datasets[0]['data'].forEach((ele, index) => {
      chartData.datasets[0]['data'][index] = ele / dosha_sum * 100;
    })

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
      {Object.entries(selectedData).map(([catergory, questionArr]) => (
        <div key={catergory}>
          <header style={{
            textAlign: 'center',
          }}>{catergory}</header>
          {Object.entries(questionArr).map(([questionNo, doshaArr], index) => (
            <div key={index} style={{
              padding: '8px 16px',
              margin: '8px',
              border: '1px solid',
              borderRadius: '12px',
            }}>
              <header style={{
                fontSize: '24px',
                color: '#a66',
              }}>{displayData.options[catergory][parseInt(questionNo)].question}</header>
              {Object.entries(doshaArr).map(([dosha, answers], index2) => (
                <div key={index2} style={{
                  paddingLeft: '10px',
                }}>
                  <header style={{
                    fontSize: '20px',
                    color: '#66b',
                  }}>{dosha}</header>
                  {answers.map((answerNo) => (
                    <div key={answerNo} style={{
                      margin: '4px 10px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#efefef',
                    }}>
                      {displayData.options[catergory][parseInt(questionNo)].options[dosha][answerNo]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Result