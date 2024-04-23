import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PDFDocumentGenerate = async (props) => {
  // console.log(props.data);
  const data = props.data;
  // const generatePDF = async () => {
  try {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw incident data onto the page
    const fontSize = 12;
    const textX = 50;
    let textY = height - 50;

    const drawText = (text) => {
      page.drawText(text, {
        x: textX,
        y: textY,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      textY -= 20; // Move to the next line
    };

    // Draw incident data onto the page

    // drawText(`Renter Name: ${props.data.renterName}`);
    // drawText(`Renter Contact Number: ${props.data.rentersContactNumber}`);
    Object.entries(data).forEach(([key, value]) => {
      drawText(`${key}: ${value}`);
    });
    // Add more incident data as needed

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Convert PDF bytes to a Blob
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "incident_report.pdf";
    link.click();
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
  // };

  // return (
  //   <>
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         <View style={styles.section}>
  //           <Text>Renter Name: {data.renterName}</Text>
  //           <Text>Renter Contact Number: {data.rentersContactNumber}</Text>
  //           {/* Add more data fields here */}
  //         </View>
  //       </Page>
  //     </Document>
  //   </>
  // );
};

export default PDFDocumentGenerate;
