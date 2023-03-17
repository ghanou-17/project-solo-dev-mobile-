import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CharacterCard from './CharacterCard';

const Harrylist = () => {
  const [characters, setcharacters] = useState([]);

  useEffect(() => {
    fatchdata();
    console.log(characters);
  });

  const fatchdata = async () => {
    try {
      const response = await axios.get(
        'https://hp-api.onrender.com/api/characters',
      );
      console.log('hi', response);
      setcharacters(response.data);
    } catch (err) {
      console.log('djhfkdf', err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <SafeAreaView style={styles.card}>
        <ScrollView style={styles.list}>
          {characters?.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'red',
  },
});

export default Harrylist;
