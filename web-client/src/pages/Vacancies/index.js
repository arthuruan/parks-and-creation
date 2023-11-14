import React, { useMemo, useState } from "react";
import { Typography, AccordionDetails } from "@mui/material";
import { Container, Section, SectionsWrapper, VacancyContainer, VacancyData, Status, VacancyMainInfo } from "./styles";

function Vacancies(props) {
  const { vacancies, sectors } = props;
  
  const [currentSector, setCurrentSector] = useState(sectors ? sectors[0].id : 1);
  function handleChangeSector(e) {
    setCurrentSector(parseInt(e.target.value));
  }

  const visibleVacancies = useMemo(() => {
    return vacancies.filter(vacancy => vacancy.sector_id === currentSector);
  }, [currentSector, vacancies])

  return (
    <Container>
      <SectionsWrapper>
        {sectors?.map((sector, index) =>
          <Section value={sector.id} onClick={handleChangeSector} selected={Boolean(currentSector === sector.id)}>{sector.name}</Section>
        )}
      </SectionsWrapper>
      <VacancyContainer>
        {visibleVacancies?.map((vacancy, index) =>
          <VacancyData>
            <VacancyMainInfo>
              <Typography>Vaga {index + 1}</Typography>
              <Status active={vacancy.status === 'occupied'} />
            </VacancyMainInfo>
            <AccordionDetails>
              <Typography>
                Coordenadas
                <br />
                {vacancy.coordinates}
              </Typography>
            </AccordionDetails>
          </VacancyData>
        )}
      </VacancyContainer>
    </Container>
  );
}

export default Vacancies;