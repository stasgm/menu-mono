// 'use client';
import { CircularLoader } from './circular-loader';

export interface StyledGridColumn {
  headerName?: string;
  fieldName: string;
  width?: number;
  type?: 'string' | 'number' | 'actions';
  renderCell?: (value: any, row: any) => React.JSX.Element;
}

export type StyledGridColumns = StyledGridColumn[];

interface StyledGridRow {
  id: string;
  [key: string]: any;
}

interface StyledGridProps {
  readonly rows: StyledGridRow[];
  columns: StyledGridColumns;
  fetching?: boolean;
  className?: string;
}

export const StyledGrid = (props: StyledGridProps) => {
  const { rows: source, columns, fetching = false, className = '' } = props;

  const rows = fetching ? [...source].splice(0, 3) : [...source];

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
        rows.length === 0 ? 'h-40' : ''
      } ${className} `}
    >
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 sm:rounded-lg">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={fetching ? 'opacity-20' : ''}>
          {rows.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b ${
                idx % 2 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
              } dark:border-gray-700 `}
            >
              {columns.map((column) => (
                <td key={row.id + column.headerName} className="px-6 py-4">
                  {column.renderCell
                    ? column.renderCell(row[column.fieldName], row)
                    : row[column.fieldName] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`absolute top-0 grid h-full w-full content-center ${fetching ? '' : 'hidden'}`}
      >
        <CircularLoader size={'xl'} />
      </div>
    </div>
  );
};
