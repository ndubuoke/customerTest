import React from 'react'
import { PieChart, Pie } from 'recharts'

const DonoughtChart = () => {
  // Sample data
  const data = [
    { name: 'Geeksforgeeks', students: 400 },
    { name: 'Technical scripter', students: 700 },
    { name: 'Geek-i-knack', students: 200 },
    { name: 'Geek-o-mania', students: 1000 },
  ]

  return (
    <PieChart
      width={500}
      height={500}
      style={{
        zIndex: 50,
      }}
    >
      <Pie
        data={data}
        dataKey='students'
        outerRadius={100}
        innerRadius={100}
        fill='green'
        style={{
          zIndex: 50,
        }}
      />
    </PieChart>
  )
}

export default DonoughtChart
