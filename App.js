import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAMqDPHKGafvM0X1HVW0XnrvDSRbSonkRg",
    authDomain: "chatapp-61cc6.firebaseapp.com",
    projectId: "chatapp-61cc6",
    storageBucket: "chatapp-61cc6.appspot.com",
    messagingSenderId: "221802851166",
    appId: "1:221802851166:web:33bbc5bdd47e85f8ec7dcf",
    measurementId: "G-5JN8HZCZMX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={props => <Chat db={db} {...props} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
