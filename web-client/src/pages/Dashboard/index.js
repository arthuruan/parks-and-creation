import React, { useMemo } from "react";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Content } from "./styles";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard(props) {
  const { vacancies, sectors } = props;

  const graphData = useMemo(() => {
    let available = 0, occupied = 0;
    let map = {};

    vacancies.forEach(vacancy => {
      const key = vacancy.sector_id;

      const getMapObject = (object) => {
        if (vacancy.status === 'occupied') {
          object.occupied++;
          occupied++;
        }
        else {
          object.available++;
          available++;
        }

        return object;
      }

      if (key in map) getMapObject(map[key]);
      else map[key] = getMapObject({ available: 0, occupied: 0, label: sectors.find(sector => sector.id === key)?.name || '' });
    });

    return {
      pie: [occupied, available],
      bars: map
    };
  }, [vacancies, sectors])

  return (
    <Content>
      <div>
        <Pie
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'top',
                align: 'center'
              },
              title: {
                display: true,
                text: 'Total de Vagas',
                font: {
                  size: 16
                }
              },
            },          
            borderColor: 'transparent'
          }}

          style={{ maxHeight: 650, maxWidth: 650, alignSelf: 'center' }}
          data={{
            labels: ['Vagas Ocupadas', 'Vagas Disponíveis'],
            datasets: [
              {
                label: 'Nº de Vagas',
                data: graphData.pie,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      <div>
        <Bar 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Vagas por setor',
                font: {
                  size: 16
                }
              },
            },
          }} 
          data={{
            labels: Object.keys(graphData.bars).map(key => graphData.bars[key].label),
            datasets: [
              {
                label: 'Ocupadas',
                data: Object.keys(graphData.bars).map(key => graphData.bars[key].occupied),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Disponíveis',
                data: Object.keys(graphData.bars).map(key => graphData.bars[key].available),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }} 
        />
      </div>
    </Content>
  );
}

export default Dashboard;