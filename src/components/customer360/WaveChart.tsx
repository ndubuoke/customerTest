import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

import { Chart as chartjs, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'

chartjs.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler)

const WaveChart = () => {
  const [data, setData] = useState({
    labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'First Dataset',
        data: [10, 5.5, 35, 90.2, 74.8, 60, 45, 15.3, 48, 89, 105, 120],
        backgroundColor: 'yellow',
        borderColor: 'green',
        borderWidth: 1,
        tension: 0.4,
        fill: true,
        poinStyle: 'rect',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#fff',
        showLine: false,
      },
    ],
  })
  return (
    <div style={{ width: '100%', height: '14.4256rem', margin: 'auto' }}>
      <Line
        data={data}
        width={600}
        height={400}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default WaveChart
