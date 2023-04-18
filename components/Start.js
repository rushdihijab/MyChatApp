import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, TextInput, ImageBackground, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('');
//getAuth: This returns the authentication handle of Firebase.
//signInAnonymously: This allows the user to sign in anonymously.
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid, name: name, 
          bgColor: bgColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((err) => {
        Alert.alert("Error", "Unable to signin anonymously");
        console.log(err);
      });
  };

  const handleColorPress = (color) => {
    setBgColor(color);
    //.setParams() is a method provided by React Navigation that allows you to update the parameters for the current screen.
    navigation.setParams({ bgColor: color });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img2.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to ChatApp</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Enter your name'
            placeholderTextColor='#8e8e8e'
            accessibilityLabel="Enter your name"
          />
          <View>
            <Text style={styles.colorSelector} >Choose your Background:</Text>
            <View style={styles.colorWrapper}>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#FFFFFF' }]}
                onPress={() => handleColorPress('#FFFFFF')}
                accessibilityLabel="White background"
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#C1C1C1' }]}
                onPress={() => handleColorPress('#C1C1C1')}
                accessibilityLabel="Gray background"
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#FFC0CB' }]}
                onPress={() => handleColorPress('#FFC0CB')}
                accessibilityLabel="Pink background"
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#87CEFA' }]}
                onPress={() => handleColorPress('#87CEFA')}
                accessibilityLabel="Blue background"
              />
            </View>
          </View>
          <Button
                title='Start Chatting'
                onPress={signInUser}
                accessibilityLabel="Start chatting"
                accessibilityRole="button"
              />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  colorSelector: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  colorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius:15,
  },
});

export default Start;
