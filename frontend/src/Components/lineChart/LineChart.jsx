import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import './LineChart.css'

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]])

    useEffect(() => {
        let dataCopy = [["Date", "Prices"]]
        if (historicalData.prices) {
            historicalData.prices.forEach((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy)
        }
    }, [historicalData])

    return (
        <div className="chart-container">
            <Chart
                chartType='LineChart'
                data={data}
                width="100%"
                height="100%"
                legendToggle
                options={{
                    backgroundColor: 'transparent',
                    hAxis: { textStyle: { color: '#eaeaea' } },
                    vAxis: { textStyle: { color: '#eaeaea' } },
                    colors: ['#b4aaff'], // lighter hex color for subtle line
                    lineWidth: 2,          // thin line
                    pointSize: 3,           // small points
                    tooltip: { textStyle: { color: '#eaeaea' } },
                    legend: { textStyle: { color: '#eaeaea' } },
                }}
            />
        </div>
    )
}

export default LineChart
