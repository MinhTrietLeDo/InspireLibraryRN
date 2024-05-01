import firestore from '@react-native-firebase/firestore';

/**
 * Saves metadata for a PDF to Firestore.
 * @param {Object} metadata The metadata for the PDF.
 * @returns {Promise<void>}
 */
const savePdfMetadata = async (metadata) => {
  try {
    await firestore().collection('pdfs').add({
      title: metadata.title,
      author: metadata.author,
      publishDate: metadata.publishDate,
      pdfUrl: metadata.pdfUrl,
      coverImageUrl: metadata.coverImageUrl,
      tags: metadata.tags || [],
    });
    console.log('Document successfully written!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Example usage
savePdfMetadata({
  title: 'Sample PDF',
  author: 'John Doe',
  publishDate: new Date('2021-01-01'),
  pdfUrl: 'https://path.to/pdf',
  coverImageUrl: 'https://path.to/cover/image',
  tags: ['science', 'education']
});
