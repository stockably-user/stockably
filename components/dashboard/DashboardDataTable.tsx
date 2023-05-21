import { DataTable, DataTableColumn } from 'mantine-datatable';

export type DashboardRecord = {
  id: number;
  name: string;
  asin: string;
  sku: string;
  fnsku: string;
  amzFulfillable: number;
  amzInboundWorking: number;
  amzInboundShipped: number;
  amzInboundReceiving: number;
  amzTotal: number;
  otherLocationQuantities: any; // Todo: array of other location quantities
};

const DashboardColumns: DataTableColumn<DashboardRecord>[] = [
  {
    accessor: 'id',
  },
  {
    accessor: 'name',
  },
  {
    accessor: 'asin',
  },
  {
    accessor: 'sku',
  },
  {
    accessor: 'fnsku',
  },
  {
    accessor: 'amzFulfillable',
  },
  {
    accessor: 'amzInboundWorking',
  },
  {
    accessor: 'amzInboundShipped',
  },
  {
    accessor: 'amzInboundReceiving',
  },
  {
    accessor: 'amzTotal',
  },
  {
    accessor: 'otherLocationQuantities',
  },
];

export type DashboardDataTableProps = {
  records: DashboardRecord[];
};

const DashboardDataTable = ({ records }: DashboardDataTableProps) => {
  // collect data

  return (
    <DataTable
      withBorder
      borderRadius="sm"
      striped
      records={records}
      columns={DashboardColumns}
    />
  );
};

export default DashboardDataTable;
