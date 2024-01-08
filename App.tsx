import {  View ,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
 <NavigationContainer>
      <AuthProvider>
      <StatusBar backgroundColor="#000000"  barStyle="dark-content" translucent={false}/>
      <Routes />
      </AuthProvider>
     
    </NavigationContainer>
    </SafeAreaProvider>
   
  );
}


