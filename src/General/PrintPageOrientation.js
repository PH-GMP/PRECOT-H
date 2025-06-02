import { useEffect } from 'react';

export const PrintPageOrientation = ({ orientation, scale}) => {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          size: ${orientation};
        }
        body {
          -webkit-print-color-adjust: exact;
          transform: scale(${scale}); /* Adjust scale based on input */
          transform-origin: top left right bottom;
        }
        html, body {  
          margin: 0 !important;
          padding: 0 !important;
        }
        #section-to-print-san table th,
        #section-to-print-san table td {
          border: 1px solid black;
          text-align: left;
          padding: 2px;
          font-size: 12px !important;
          font-family: "Times New Roman", Times, serif;
        }
      }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);

    // Clean up the effect by removing the style element when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, [orientation, scale]); // Dependencies to rerun if orientation or scale changes
};
