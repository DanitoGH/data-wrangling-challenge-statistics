import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';
// fetch json file
import stats_data from '../../../data/eu_road_safety_statistics.json';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  const [euCountries, setEuCountries] = useState([]);
  const [vehicleOwnership, setVehicleOwnership] = useState([]);
  const [roadDeathsPerMillionInhabitants, setRoadDeathsPerMillionInhabitants] = useState([]);
  const [totalRoadDeaths, setTotalRoadDeaths] = useState([]);
  const [populationDensity, setPopulationDensity] = useState([]);

  useEffect(() => {
    stats_data.map((stat, index) =>{
      setEuCountries(prevArray => [...prevArray, stat.country])
      setVehicleOwnership(prevArray => [...prevArray, stat.vehicle_ownership])
      setRoadDeathsPerMillionInhabitants(prevArray => [...prevArray, stat.road_deaths_per_million_inhabitants])
      setTotalRoadDeaths(prevArray => [...prevArray, stat.total_road_deaths])
      setPopulationDensity(prevArray => [...prevArray, stat.population_density])
   })
  },[])

  const CHART_DATA = [
    {
      name: 'Population Density',
      type: 'area',
      data: populationDensity
    },
    {
      name: 'Vehicle Ownership',
      type: 'column',
      data: vehicleOwnership
    },
    {
      name: 'Road Deaths Per Million Inhabitants',
      type: 'area',
      data: roadDeathsPerMillionInhabitants
    },
    {
      name: 'Total Road Deaths',
      type: 'line',
      data: totalRoadDeaths
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: euCountries,
    xaxis: { type: null },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Bar Graph Of Some Selected Key Statistics" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
