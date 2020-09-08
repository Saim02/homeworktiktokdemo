/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBarIOS,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import VideoView from './components/VideoView';
import CommentsModal from 'react-native-modalbox';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import SubmitArrow from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid';
import videosArray from './assets/demoData/videosArray';

const {width, height} = Dimensions.get('screen');

const App = () => {
  const [videoList, setVideoList] = useState(videosArray);

  const [commentModalData, setCommentModalData] = useState([]);
  const [newCommentText, setNewCommentText] = useState([]);

  const commentModal = useRef();
  const commentsList = useRef();

  const onViewRef = React.useRef(({viewableItems}) => {
    const demoVideoList = Object.assign([], videoList);
    demoVideoList.forEach((videoData) => {
      if (viewableItems[0].item.id === videoData.id) {
        videoData.paused = false;
      } else {
        videoData.paused = true;
      }
    });
    setVideoList(demoVideoList);
  });
  const viewConfigRef = React.useRef({
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 100,
  });

  const commentListItem = ({item}) => (
    <View style={[styles.commentListItem]}>
      <Text>{item.comment}</Text>
    </View>
  );

  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <StatusBar hidden />
      <FlatList
        pagingEnabled
        data={videoList}
        renderItem={({item, index}) => (
          <VideoView
            videoData={item}
            showComments={(comments) => {
              setCommentModalData(comments);
              commentModal.current.open();
            }}
            setPaused={(val) => {
              const demoData = Object.assign([], videoList);
              demoData[index].paused = val;
              setVideoList(demoData);
            }}
            setLiked={(val) => {
              const demoData = Object.assign([], videoList);
              if (!demoData[index].liked) {
                demoData[index].totalLikes += 1;
              }
              demoData[index].liked = val;
              setVideoList(demoData);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewRef.current}
        // viewabilityConfig={viewConfigRef.current}
      />
      <CommentsModal
        ref={commentModal}
        coverScreen
        backButtonClose
        swipeToClose={false}
        style={[styles.commentModal]}
        onClosed={() => {
          setCommentModalData([]);
          setNewCommentText('');
        }}
        position="bottom">
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              flex: 9.5,
              paddingHorizontal: 20,
              backgroundColor: '#F7F7F7',
            }}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{flex: 1}}></View>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {/* {commentModalData.comments.length} comments */}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <CloseIcon
                  onPress={() => commentModal.current.close()}
                  name="ios-close-outline"
                  size={20}
                />
              </View>
            </View>
            <FlatList
              ref={commentsList}
              data={commentModalData.comments}
              keyExtractor={(item) => item.id}
              renderItem={commentListItem}
              style={[styles.commentList]}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <TextInput
              style={[styles.commentField]}
              placeholder="Add comment..."
              keyboardType="default"
              keyboardAppearance="dark"
              value={newCommentText}
              onChangeText={(val) => {
                setNewCommentText(val);
              }}
            />
            <SubmitArrow
              style={{opacity: newCommentText ? 1 : 0.5}}
              onPress={() => {
                if (newCommentText) {
                  const demoList = videoList;
                  demoList.forEach((video) => {
                    if (video.id === commentModalData.id) {
                      video.comments.push({
                        id: video.id + video.comments.length,
                        comment: newCommentText,
                      });
                      console.warn(newCommentText);
                    }
                  });
                  setVideoList(demoList);
                  setNewCommentText('');
                  commentsList.current.scrollToEnd() + 20;
                }
              }}
              name="arrow-right"
              color="#58B9CC"
              size={25}
            />
          </View>
        </SafeAreaView>
      </CommentsModal>
      {/* </SafeAreaView> */}
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  commentModal: {
    height: height / 1.3,
  },
  commentList: {
    marginTop: 20,
  },
  commentListItem: {
    height: 50,
  },
  commentField: {
    height: 50,
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
  },
});

export default App;
