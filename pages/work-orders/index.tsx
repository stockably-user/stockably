import { Button, Container, SimpleGrid } from '@mantine/core';
import StockablyAppShell from '../../components/nav/StockablyAppShell';
import { useCallback, useState } from 'react';
import CreateWorkOrderForm from '../../components/work-orders/CreateWorkOrderForm';

const WorkOrders = () => {
  const [showCreateWorkOrderForm, setShowCreateWorkOrderForm] =
    useState<boolean>(false);
  const handleOpenCreateWorkOrder = useCallback(() => {
    setShowCreateWorkOrderForm(!showCreateWorkOrderForm);
  }, [showCreateWorkOrderForm]);
  return (
    <Container fluid>
      <h1>Work Orders</h1>
      <SimpleGrid cols={3} sx={{ marginBottom: 16 }}>
        <Button>Get Work Orders</Button>
        <Button onClick={handleOpenCreateWorkOrder}>
          Open Create Work Order Form
        </Button>
      </SimpleGrid>
      {showCreateWorkOrderForm && <CreateWorkOrderForm />}
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
