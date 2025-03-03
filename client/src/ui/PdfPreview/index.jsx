const PdfPreview = ({ fileUrl }) => {
  return (
    <iframe
      src={fileUrl}
      width="100%"
      style={{ border: "none" }}
    ></iframe>
  );
};
export default PdfPreview;
