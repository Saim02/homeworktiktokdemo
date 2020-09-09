import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';

export default function VideoView(props) {
  const {videoData, showComments, setPaused, setLiked} = props;
  return (
    <View style={[styles.videoScreen]}>
      <TouchableWithoutFeedback onPress={() => setPaused(!videoData.paused)}>
        <Video
          paused={videoData.paused}
          repeat
          style={[styles.videoPlayer]}
          resizeMode="cover"
          onBuffer={() => console.warn('buffering')}
          onError={() => alert('Cant Load')}
          source={videoData.video}></Video>
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          width: '15%',
          height: '20%',
          backgroundColor: 'transparent',
          bottom: '20%',
          right: 0,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => setLiked(true)}
          activeOpacity={0.1}
          style={{alignItems: 'center'}}>
          <Icon
            name="heart"
            color={videoData.liked ? '#d20117' : 'white'}
            size={35}
          />
          <Text style={{color: 'white', marginTop: 5, fontWeight: '600'}}>
            {videoData.totalLikes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showComments(videoData)}
          activeOpacity={0.1}
          style={{alignItems: 'center'}}>
          <Icon name="wechat" color="white" size={35} />
          <Text style={{color: 'white', marginTop: 5, fontWeight: '600'}}>
            {videoData.comments.length}
          </Text>
        </TouchableOpacity>
      </View>
      {videoData.paused && (
        <Icon
          style={{position: 'absolute', top: '50%', left: '45%'}}
          name="play"
          color="rgba(255,255,255,0.2)"
          size={50}></Icon>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  videoScreen: {
    width: width,
    height: height,
    backgroundColor: 'black',
  },
  videoPlayer: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
});
