// components/Copyright.js

const Copyright = ({ startYear, companyName }) => {
  const currentYear = new Date().getFullYear();

  // Conditionally render the year range
  // If startYear is the same as currentYear, just show the currentYear.
  const yearText = startYear === currentYear 
    ? currentYear 
    : `${startYear} - ${currentYear}`;

  return (
    <p className="copyright">
      © {yearText} {companyName}
    </p>
  );
};

export default Copyright;