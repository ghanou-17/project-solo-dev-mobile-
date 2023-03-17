import React from 'react';
import styled from 'styled-components';

const ReelsScreen = () => (
  <Container>
    <Title>Reels</Title>
  </Container>
);

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

export default ReelsScreen;
