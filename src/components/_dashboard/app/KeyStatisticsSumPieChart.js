import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// fetch json file
import stats_data from '../../../data/eu_road_safety_statistics.json';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function KeyStatisticsSumPieChart() {

  const [populationDensityTotal, setPopulationDensityTotal] = useState([]);
  const [totalVehicleOwnership, setTotalVehicleOwnership] = useState([]);
  const [roadDeathsPerMLInhabitantsTotal, setRoadDeathsPerMLInhabitantsTotal] = useState([]);
  const [roadDeathsTotal, setRoadDeathsTotal] = useState([]);

  useEffect(() => {
   stats_data.map((stat, index) =>{
     setPopulationDensityTotal(prevArray => [...prevArray, stat.population_density])
     setTotalVehicleOwnership(prevArray => [...prevArray, stat.vehicle_ownership])
     setRoadDeathsPerMLInhabitantsTotal(prevArray => [...prevArray, stat.road_deaths_per_million_inhabitants])
     setRoadDeathsTotal(prevArray => [...prevArray, stat.total_road_deaths])
   })
  },[])

  // Sum Array Values
  const sumPopulationDensityTotal = populationDensityTotal.reduce((a, b) => a + b, 0);
  const sumTotalVehicleOwnership= totalVehicleOwnership.reduce((a, b) => a + b, 0);
  const sumRoadDeathsPerMLInhabitantsTotal = roadDeathsPerMLInhabitantsTotal.reduce((a, b) => a + b, 0);
  const sumRoadDeathsTotal = roadDeathsTotal.reduce((a, b) => a + b, 0);
  
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['Population Density Total', 'Vehicle Ownership Total', 'Road Deaths Per ML Inhabitants Total', 'Total Road Deaths'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Some Selected Key Statistics" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" 
        series={[
            sumPopulationDensityTotal,
            sumTotalVehicleOwnership,
            sumRoadDeathsPerMLInhabitantsTotal, 
            sumRoadDeathsTotal ]
        } 
         options={chartOptions}
         height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
