import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Alert} from 'react-native';
import styled from 'styled-components/native';
import Colors from './assets/Colors/Colors';
//import Clipboard from '@react-native-community/clipboard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Title = styled.Text`
font-size: 30px;
`;

export default function App() {
  const [psw, setPsw] = useState('');
  const [size, setSize] = useState('');
  
  
  function geraPsw() {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = '';
    var n = charset.length;

    if(size < 1 || size > 15){
      Alert.alert(
        'Erro',
        'Tamanho da senha inválido',
        [{text: 'Ok'}]
      );
    }else{
      for(let i = 0; i < size; i++){
        pass += charset.charAt((Math.floor(Math.random() * n)));
      }

      setPsw(pass);
      Clipboard.setString(pass);
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.ContainerImagem}>
        <Image
          source={require('./src/img/iconHome.png')}
          style={styles.Imagem}
          />
      </View>
      <Title>{size} Caracteres</Title>
      <TextInput 
        style={[styles.SizeAllComponent, styles.FontConfig, styles.IOArea]}
        placeholder='Tamanho da senha (1 a 15)'
        keyboardType='numeric'
        value={size}
        onChangeText={size => setSize(size)}
        onSubmitEditing={geraPsw}
      />
      <TouchableOpacity 
        style={
          [styles.SizeAllComponent,
           styles.TouchableArea,
           {width: (windowWidth * 0.6 | 0)}
          ]}
        onPress={geraPsw}
      >
        <Text style={styles.FontConfig}>Gerar senha</Text>
      </TouchableOpacity>
      <View style={[
        styles.SizeAllComponent,
        styles.IOArea,]}>
        <Text style={ styles.FontConfig}>
          {psw}
        </Text>
      </View>
      <View style={styles.Rodape}>
        <Text style={styles.RodapeTexto}>
          Gabriel Pimentel de Castro Costa
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#e9e9e9',
  },
  ContainerImagem: {
    resizeMode: 'center',
    width: (windowWidth*0.4),
    height: (windowWidth*0.4),
    margin: 30,
  },
  Imagem: {
    width: (windowWidth*0.4),
    height: (windowWidth*0.4),
  },
  SizeAllComponent:{
    width: (windowWidth * 0.9) | 0,
    margin: 20,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  FontConfig:{
    textAlign: 'center',
    fontSize: 25,
  },
  IOArea:{
    backgroundColor: '#fff',
  },
  TouchableArea: {
    backgroundColor: Colors.CorA[2],
    paddingTop: 5,
    paddingBottom: 5,
  },
  Rodape: {
    flex: 1,
    flexDirection: 'row',
  },
  RodapeTexto: {
    alignSelf: 'flex-end',
    margin: 10,
  }
});