import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import prev from '../src/img/prev.png';
import videoexample1 from '../src/video/1.mp4';
import videoexample2 from '../src/video/2.mp4';
import videoexample3 from '../src/video/3.mp4';
import videoexample4 from '../src/video/4.mp4';
import videoexample5 from '../src/video/5.mp4';

export default function Home({navigation}) {
  const videos = [
    {
      id: 1,
      name: 'example video 1',
      source: videoexample1,
    },
    {
      id: 2,
      name: 'example video 2',
      source: videoexample2,
    },
    {
      id: 3,
      name: 'example video 3',
      source: videoexample3,
    },
    {
      id: 4,
      name: 'example video 4',
      source: videoexample4,
    },
    {
      id: 5,
      name: 'example video 5',
      source: videoexample5,
    },
  ];

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Button title="Logout" color="dodgerblue" onPress={logout} />
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        data={videos}
        renderItem={({item, index, separators}) => (
          <TouchableHighlight
            key={item.key}
            onPress={() =>
               navigation.navigate('Videoplayer', {params: item.source}) 
            }
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>

           <View
              style={styles.imageStyle}>
              <Image style={styles.imageStyleInner} source={prev} />
              <Text>{item.name}</Text>
            </View>
          
          </TouchableHighlight> 
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },

  imageStyle:{
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    width: 400,
    height: 100,
    margin: 5,
    alignItems: 'center',
    padding: 5,
  },

  imageStyleInner: {
    width: '40%',
    height: '100%',
    marginRight: 10,
    zIndex: 100,
  },
});
