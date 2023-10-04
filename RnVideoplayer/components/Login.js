import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [token, setToken] = useState(null)

    const onSubmit = async() => {
        if (username === 'test' && password === '1234') {
            await AsyncStorage.setItem('token', username)
            console.log('sucsees')
            setIsError(false)
            navigation.navigate('Home')
        }else {
            console.log('invalid username or password')  
            setIsError(true) 
        }
    }

    const tokenlogin = async() => {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            navigation.navigate('Home')
            console.log('login', value)
        }
    }

    tokenlogin()

  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
      <TextInput  style={styles.input} onChangeText={(value) => setUsername(value)} placeholder="username" />
      <TextInput  style={styles.input} secureTextEntry onChangeText={(value) => setPassword(value)} placeholder="password" />
      {isError && <Text style={{color: 'tomato'}}>invalid username or password</Text>}
      <Button onPress={onSubmit} title="Login"/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      wrapper: {
        width: '80%',
      },
      input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
      },
      link: {
        color: 'blue',
      },
  
});