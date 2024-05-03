import { Document, Image, Page, StyleSheet, Text } from "@react-pdf/renderer";

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
const PdfStoryBookDocument = ({ storyData }) => (
  <Document>
    {storyData.map((story, index) => {
      // Calculate chapter key based on the index to fetch image and text dynamically
      const chapterKey = `Chapter ${index + 1}`;
      const chapterImage = story.output && story.output[`${chapterKey} Image`];
      const chapterText = story.output && story.output[chapterKey];

      // Only render a page if the image and text are available
      if (!chapterImage || !chapterText) {
        console.error(`Missing image or text for ${chapterKey}`);
        return null; // Skip rendering this page if data is missing
      }
      return (
        <Page size="A4" style={styles.page} key={chapterKey}>
          <Image style={styles.image} src={chapterImage} />
          <Text style={styles.text}>{chapterText}</Text>
        </Page>
      );
    })}
  </Document>
);
export default PdfStoryBookDocument;
