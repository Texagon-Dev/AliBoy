import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%",
    padding: 10,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
  },
});
const PdfStoryBookDocument = ({ storyData }) => {
  if (
    !storyData ||
    !Array.isArray(storyData) ||
    storyData.length === 0 ||
    !storyData[0].output
  ) {
    console.log("Invalid storyData:", storyData);
    return null;
  }

  const chapters = storyData[0].output; // Assuming the first item contains the chapters

  return (
    <Document>
      {chapters.map((chapterData, index) => (
        <Page size="A4" style={styles.page} key={index}>
          <Text style={styles.text}>{`Chapter ${chapterData.id}`}</Text>
          <Text style={styles.text}>{chapterData.chapter}</Text>
          <Image style={styles.image} src={chapterData.image} />
        </Page>
      ))}
    </Document>
  );
};

export default PdfStoryBookDocument;