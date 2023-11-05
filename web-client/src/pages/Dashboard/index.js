import React from "react";
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

const labels = ['Setor 1', 'Setor 2', 'Setor 3'];

function Dashboard() {
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
            labels: ['Vagas', 'Vagas Disponíveis'],
            datasets: [
              {
                label: 'Nº de Vagas',
                data: [12, 10],
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
        <Bar options={{
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
        }} data={{
          labels,
          datasets: [
            {
              label: 'Disponíveis',
              data: [5, 2, 3],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Ocupadas',
              data: [2, 7, 1],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }} />
      </div>
    </Content>
  );
}

export default Dashboard;