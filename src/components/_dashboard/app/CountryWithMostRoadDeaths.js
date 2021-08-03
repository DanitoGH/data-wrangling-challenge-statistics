import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// fetch json file
import stats_data from '../../../data/eu_road_safety_statistics.json';

// ----------------------------------------------------------------------

export default function CountryWithMostRoadDeaths() {
  const [euCountries, setEuCountries] = useState([]);
  const [mostRoadDeaths, setMostRoadDeaths] = useState([]);

  useEffect(() => {
   const sorted_sliced_data = stats_data.sort(function(a, b) { return a.total_road_deaths < b.total_road_deaths ? 1 : -1; }).slice(0, 10)
   sorted_sliced_data.map((stat, index) =>{
      setEuCountries(prevArray => [...prevArray, stat.country])
      setMostRoadDeaths(prevArray => [...prevArray, stat.total_road_deaths])
   })
  },[])

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (roadDeaths) => fNumber(roadDeaths),
        title: {
          formatter: (roadDeaths) => `Total Road Deaths: `
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: euCountries
    }
  });

  return (
    <Card>
      <CardHeader title="Top 10 EU Countries With The Most Road Deaths" subheader="2018" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: mostRoadDeaths }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
