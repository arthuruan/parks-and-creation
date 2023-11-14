import styled from "styled-components";
import { Accordion, AccordionSummary, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  max-height: calc(100% - 135px);
`

export const SectionsWrapper = styled.div`
  display: block;
  flex: 1;
`

export const Section = styled(Button)`
  width: 100%;
  border: none;
  height: 40px;
  background-color: ${({ selected }) => selected ? '#1976d2' : '#FFF'} !important;
  color: ${({ selected }) => !selected ? '#1976d2' : '#FFF'} !important;
  border-radius: 0 !important;
`;

export const VacancyContainer = styled.div`
  flex: 5;

  justify-content: center;
  gap: 24px;
  padding: 20px;
  overflow-y: scroll;
`;

export const VacancyData = styled(Accordion)`
  border-radius: 8px;
  max-width: 100%;
  background-color: #FFF;
  padding: 16px;
  min-height: 50px; 
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`

export const VacancyMainInfo = styled(AccordionSummary).attrs({
  expandIcon: <ExpandMore />
})`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Status = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 16px;
  background-color: ${({ active }) => !active ? 'red' : 'green'} !important;
  margin-left: 20px;
`
