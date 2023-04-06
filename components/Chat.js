import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;
  const [messages, setMessages] = useState([]);
// function to handle sending new messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }
// set up initial message and the new system message
useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'This is a system message',
      createdAt: new Date(),
      system: true,
    },
  ]);
}, []);

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
// set up navigation options
  useEffect(() => {
    navigation.setOptions({ title: name,  backgroundColor: bgColor  });
  }, []);

  return (

    <View style={[styles.container, { backgroundColor: bgColor }]}>
        {/* GiftedChat component to display messages */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
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