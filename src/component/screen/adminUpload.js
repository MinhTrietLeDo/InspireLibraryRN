// TestUpload.js
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TestUpload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');

  // Function to upload metadata to Firestore
  const uploadMetadata = async () => {
    // Validate that all required fields are provided
    if (
      !title ||
      !author ||
      !publishDate ||
      !pdfUrl ||
      !coverImageUrl ||
      !category ||
      !summary
    ) {
      alert('Please fill all fields');
      return;
    }

    try {
      await firestore().collection('pdfs').add({
        title,
        author,
        publishDate,
        pdfUrl,
        coverImageUrl,
        category,
        summary,
        uploadDatetime: firestore.FieldValue.serverTimestamp(),
      });
      alert('Metadata uploaded successfully!');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to upload metadata');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
        style={styles.input}
      />
      <TextInput
        placeholder="Author"
        onChangeText={setAuthor}
        value={author}
        style={styles.input}
      />
      <TextInput
        placeholder="Publish Date"
        onChangeText={setPublishDate}
        value={publishDate}
        style={styles.input}
      />
      <TextInput
        placeholder="PDF URL"
        onChangeText={setPdfUrl}
        value={pdfUrl}
        style={styles.input}
      />
      <TextInput
        placeholder="Cover Image URL"
        onChangeText={setCoverImageUrl}
        value={coverImageUrl}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        onChangeText={setCategory}
        value={category}
        style={styles.input}
      />
      <TextInput
        placeholder="Summary"
        onChangeText={setSummary}
        value={summary}
        style={styles.input}
      />
      <Button
        title="Upload Metadata"
        onPress={() =>
          uploadMetadata(
            title,
            author,
            publishDate,
            pdfUrl,
            coverImageUrl,
            category,
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TestUpload;
