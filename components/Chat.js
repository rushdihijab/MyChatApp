import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import { Bubble, GiftedChat , InputToolbar} from "react-native-gifted-chat";
import { collection, query, orderBy, addDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {

  const { name, bgColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;
 
 
  


  // function to handle sending new messages
  const onSend = (newMessages) => {
   addDoc(collection(db, 'messages'), newMessages[0]);
  }


  // set up initial message and the new system message
  useEffect(() => {
    if(isConnected) {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      cacheMessages(newMessages);
      setMessages(newMessages);
    })
  } else {
    loadCachedMessages();
  }
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);


  const cacheMessages = async (messagesToCache) => {
    try {
        console.log('Caching messages:', messagesToCache);
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
        console.log('Error caching messages:', error.message);
    };
  }

  const loadCachedMessages = async () => {
  try {
    const cachedMessages = await AsyncStorage.getItem('messages');
    if (cachedMessages) {
      const parsedMessages = JSON.parse(cachedMessages);
      setMessages(parsedMessages);
      console.log('Cached messages loaded successfully:', parsedMessages);
    }
  } catch (error) {
    console.log('Error loading cached messages:', error.message);
  }
}
  
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }
  
  //changing the speech bubble color 
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };


  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* GiftedChat component to display messages */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name
        }}
        placeholder='Type a message...'
        alwaysShowSend={true}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
      />
       {/* KeyboardAvoidingView component to handle keyboard on Android */}
       { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    
      {/* Title text - currently commented out */}
      {/* <Text style={styles.title}>Welcome to ChatApp, {name}!</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

export default Chat;