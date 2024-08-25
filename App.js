import React from 'react';
import { TouchableOpacity, View, Text, Alert, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  const handleCreateFileAndShare = async () => {
    // Request access to contacts
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission is required to access contacts');
      return;
    }

    // Get all contacts
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      // Filter contacts with phone numbers
      const contactsWithPhones = data.filter(
        contact => contact.phoneNumbers && contact.phoneNumbers.length > 0
      );

      if (contactsWithPhones.length > 0) {
        // Format contacts into text in the required format
        const contactsText = contactsWithPhones.map(contact => {
          const phoneNumbersText = contact.phoneNumbers.map(phone => `Номер Телефона - ${phone.number}`).join('\n');
          return `Имя - ${contact.name}\n${phoneNumbersText}`;
        }).join('\n\n');

        // Create a text file
        const fileUri = `${FileSystem.documentDirectory}Friend.cr`;
        await FileSystem.writeAsStringAsync(fileUri, contactsText);

        // Share the file
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Information', 'Contacts with phone numbers were not found');
      }
    } else {
      Alert.alert('Information', 'No contacts found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Never lose your friends again. Back up and share your contacts with your friends so they can be saved on multiple devices.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateFileAndShare}>
          <Text style={styles.buttonText}>Backup & Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#A8DADC',
    borderColor: '#457B9D',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#1D3557',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
