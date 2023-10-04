import {View, Text, TouchableOpacity, Touchable, Image, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

export default function Videoplayer({navigation, route}) {

  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fullScreen,setFullScreen]=useState(false)
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

const onEnd = () => {
  ref.current.seek(0);
  setPaused(true);
}
  

  return (
 <View style={{flex: 1}}>
     {!fullScreen && <View style={{
        height: 30,
        width: 80,
        justifyContent: 'center',
        margin: 15,
        padding: 0,
      }}
      >
      <Text 
        style={{
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        }}
        onPress={()=>{
          navigation.navigate('Home');
          console.log(route.params.params)
        }}
        >
          back to list
      </Text>
      </View>}
      <TouchableOpacity
        style={{width: '100%', height:fullScreen?'100%': 200}}
        onPress={() => {
          setClicked(!clicked)
          console.log(clicked)
        }}>
        <Video
          paused={paused}
          source={route.params.params}
          ref={ref}
          onProgress={x => {
            // console.log(x);
            setProgress(x);
          }}
          // Can be a URL or a local file.
          //  ref={(ref) => {
          //    this.player = ref
          //  }}                                      // Store reference
          //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
          //  onError={this.videoError}

          // Callback when video cannot be loaded
          onEnd={onEnd}
          muted
          style={{width: '100%', height: fullScreen?'100%': 200}}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setClicked(!clicked)
              console.log(clicked)
            }}
            >
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) - 10);
                }}>
                <Image
                  source={require('../src/img/backward.png')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}>
                <Image
                  source={
                    paused
                      ? require('../src/img/play-button.png')
                      : require('../src/img/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) + 10);
                }}>
                <Image
                  source={require('../src/img/forward.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems:'center'
              }}>
              <Text style={{color: 'white'}}>
                {format(progress.currentTime)}
              </Text>
              <Slider                
                style={{width: '80%', height: 40}}
                value={progress.currentTime}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#ffffff"
                maximumTrackTintColor="#fff"
                onValueChange={(x)=>{
                  ref.current.seek(x);
                  console.log(progress.currentTime)
                  console.log(x)
                }}
              />
              <Text style={{color: 'white'}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems:'center'
              }}>
            <TouchableOpacity onPress={()=>{
              if(fullScreen){
                Orientation.lockToPortrait();
            } else{
                Orientation.lockToLandscape();
            }
            setFullScreen(!fullScreen)
            }}>
              <Image source={fullScreen?require('../src/img/minimize.png'):require('../src/img/full-size.png')}
               style={{width:24,height: 24,tintColor:'white'}}/>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  )
}