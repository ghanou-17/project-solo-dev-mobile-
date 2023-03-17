import React, {useContext} from 'react';
import {Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../../context/Context';
import styled from 'styled-components';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setIsConnected} = useContext(Context);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsConnected(false);
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>Profile</Title>

      <TouchableWithoutFeedback onPress={handleLogout}>
        <Btn style={{backgroundColor: '#0095f6'}}>
          <Text style={{color: 'white'}}>log out</Text>
        </Btn>
      </TouchableWithoutFeedback>
    </Container>
  );
};
const Btn = styled.View`
  flex-direction: row;
  font-size: 14px;
  height: 45px;
  width: 90%;
  border-radius: 5px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 30px;
  color: black;
  margin: 20px;
`;

export default ProfileScreen;
