import { useMemo } from 'react';

// Custom hook to provide consistent table cell styles
export const TableStyle = () => {
  return useMemo(() => ({
    textAlign: 'center',
    padding: '3px',
  }), []);
};

// Component for table data cells
export const Td = ({ colSpan = 1, rowSpan = 1, children }) => {
  const centeredStyle = TableStyle(); 
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} style={centeredStyle}>
      {children}
    </td>
  );
};

// Component for table header cells
export const Th = ({ colSpan = 1, children }) => {
  const centeredStyle = TableStyle(); 
  return (
    <th colSpan={colSpan} style={centeredStyle}>
      {children}
    </th>
  );
};
