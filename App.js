
import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Alert, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission is required to access the contacts.');
      }
    };

    requestPermissions();
  }, []);

  const handleCreateFileAndShare = async () => {
    // Получение всех контактов
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      // Фильтрация контактов с номерами телефонов
      const contactsWithPhones = data.filter(
        contact => contact.phoneNumbers && contact.phoneNumbers.length > 0
      );

      if (contactsWithPhones.length > 0) {
        // Форматирование контактов в текст
        const contactsText = contactsWithPhones.map(contact => {
          const phoneNumbersText = contact.phoneNumbers.map(phone => `Номер телефона: ${phone.number}`).join('\n');
          return `Имя: ${contact.name}\n${phoneNumbersText}`;
        }).join('\n\n');

        // Создание текстового файла
        const fileUri = `${FileSystem.documentDirectory}Friend.cr`;
        await FileSystem.writeAsStringAsync(fileUri, contactsText);

        // Поделиться файлом
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain', // Явно указываем MIME-тип
          dialogTitle: 'Share your contacts',
        });
      } else {
        Alert.alert('Information', 'Contacts with phone numbers were not found.');
      }
    } else {
      Alert.alert('Information', 'No contacts were found.');
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
    bottom: 60,
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
})
