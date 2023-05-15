import { Container } from '@mantine/core';
import StockablyAppShell from '../../components/nav/StockablyAppShell';

const WorkOrders = () => {
  return (
    <Container fluid>
      <h1>Work Orders</h1>
    </Container>
  );
};

const WorkOrdersWrapper = () => {
  return (
    <StockablyAppShell>
      <WorkOrders />
    </StockablyAppShell>
  );
};

export default WorkOrdersWrapper;
