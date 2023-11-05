import React, { useState } from "react";
import { Typography, AccordionDetails } from "@mui/material";
import { Container, Section, SectionsWrapper, VacancyContainer, VacancyData, Status, VacancyMainInfo } from "./styles";

const sectors = ['Setor 1', 'Setor 2', 'Setor 3'];
const vacancies = [
  {
    label: 'Vaga 1',
    location: {
      x: 102,
      y: 200
    },
    occupied: false
  },
  {
    label: 'Vaga 2',
    location: {
      x: 102,
      y: 200
    },
    occupied: true
  },
  {
    label: 'Vaga 3',
    location: {
      x: 102,
      y: 200
    },
    occupied: true
  },
  {
    label: 'Vaga 4',
    location: {
      x: 102,
      y: 200
    },
    occupied: false
  },
  {
    label: 'Vaga 5',
    location: {
      x: 102,
      y: 200
    },
    occupied: false
  },
  {
    label: 'Vaga 6',
    location: {
      x: 102,
      y: 200
    },
    occupied: true
  },
  {
    label: 'Vaga 7',
    location: {
      x: 102,
      y: 200
    },
    occupied: false
  }
];

function Vacancies() {
  const [currentSector, setCurrentSector] = useState(0);

  function handleChangeSector(e) {
    setCurrentSector(parseInt(e.target.value));
  }

  return (
    <Container>
      <SectionsWrapper>
        {sectors.map((sector, index) =>
          <Section value={index} onClick={handleChangeSector} selected={Boolean(currentSector === index)}>{sector}</Section>
        )}
      </SectionsWrapper>
      <VacancyContainer>
        {vacancies.map(vacancy =>
          <VacancyData>
            <VacancyMainInfo>
              <Typography>{vacancy.label}</Typography>
              <Status active={!vacancy.occupied} />
            </VacancyMainInfo>
            <AccordionDetails>
              <Typography>
                Coordenadas
                <br />
                X: {vacancy.location.x}
                <br />
                Y: {vacancy.location.y}
              </Typography>
            </AccordionDetails>
          </VacancyData>
        )}
      </VacancyContainer>
    </Container>
  );
}

export default Vacancies;