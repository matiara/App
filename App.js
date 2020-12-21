/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

export default function App () {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      setContacts(res.data)  
    }
    fetchData();
  }, [])

  const showContact = (contact) => {
    setSelectedContact(contact)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Contactos</Text>
        </View>
        <View>
          {
            contacts.map((contact,index) => 
            <TouchableOpacity onPress={() => showContact(contact)} key={index} style={styles.contactContainer}>
              <Text style={styles.contactName}> {contact.name}</Text>
              <Text style={styles.contactAdressCity}> {contact.address.city}</Text>
            </TouchableOpacity>
            )
          }
        </View> 
        {selectedContact && 
          <TouchableOpacity onPress={() => setSelectedContact(null)} style={styles.selectedContactContainer}>
            <View style={styles.selectedContact}>
              <Text style={styles.contactName}> {selectedContact.name}</Text>
              <Text >{selectedContact.username}</Text>
              <Text >{selectedContact.address.city}</Text>
              <Text >{selectedContact.email}</Text>
              <Text >{selectedContact.phone}</Text>
              <Text >{selectedContact.website}</Text>
              <Text >{selectedContact.company.name}</Text>

            </View> 
          </TouchableOpacity>}
            
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 30
  },
  contactContainer: {
    height: 80,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center'
  },
  contactName: {

    fontSize: 20,
    marginBottom: 5

  },
  selectedContact: {
    
    backgroundColor: 'grey',
    height: '50%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedContactContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});


