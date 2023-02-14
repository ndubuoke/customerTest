import React from 'react'
import Chart from 'react-apexcharts'

type Props = {}

const DonoughtChart = (props: Props) => {
  const options = {
    series: [2, 5, 4],
    labels: ['apple', 'beans', 'banana'],
    title: {
      // text: 'fruits',
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            // showAlways: false,
            total: {
              show: true,
              // fontSize: 20,
              // color: '#f68b1e',
              colors: ['#2E93fA', '#66DA26', '#546E7A'],
            },
          },
          // stroke: {
          //   show: true,
          //   curve: 'smooth',
          //   lineCap: 'butt',
          //   colors: undefined,
          //   width: 6,
          //   dashArray: 0,
          // },
        },
      },
    },
    dataLabels: {
      // enabled: true,
    },
  }

  const series = [2, 5, 4]
  return (
    <div className='absolute bottom-6 m-auto '>
      <Chart type='donut' options={options} series={series} width='100%' height={350} />
    </div>
  )
}

export default DonoughtChart
