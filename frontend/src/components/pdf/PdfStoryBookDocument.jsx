import { Document, Image, Page, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: "20px",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  text: {
    marginBottom: "20px",
    paddingBottom: "20px",
    fontSize: 14,
    textAlign: "center",
  },
  pageNumbers: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
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

  const chapters = storyData[0].output;
 

  return (
    <Document>
      {chapters.map((chapterData, index) => (
        <Page size="A4" style={styles.page} key={index}>
          <Text style={styles.text}>
            {" "}
            Chapter {chapterData.id} - {chapterData["chapter name"]}
          </Text>
          <Text style={styles.text}>{chapterData.story}</Text>
          <Text style={styles.text}>{chapterData.image}</Text>
          
          <Text
            style={styles.pageNumbers}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  );
};

export default PdfStoryBookDocument;
