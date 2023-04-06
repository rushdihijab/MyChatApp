import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('');

  const handleColorPress = (color) => {
    setBgColor(color);
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
            onPress={() => navigation.navigate('Chat', { name: name, bgColor: bgColor })}
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
