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
    accessor: 'name',
    render: (record: DashboardRecord) => {
      return (
        <>
          <div>{record.name}</div>
          <div>ASIN: {record.asin}</div>
          <div>SKU: {record.sku}</div>
          <div>FNSKU: {record.fnsku}</div>
        </>
      );
    },
  },
  {
    accessor: 'amzFulfillable',
    sortable: true,
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
    sortable: true,
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
      minHeight={150}
      height={500}
      striped
      records={records}
      columns={DashboardColumns}
    />
  );
};

export default DashboardDataTable;
