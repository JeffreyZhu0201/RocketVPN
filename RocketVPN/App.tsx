/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-16 12:54:30
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 13:43:28
 * @FilePath: \RocketVPN\RocketVPN\App.tsx
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 *
*/

import React from 'react';

//import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';
import { GlobalProvider } from './DataUtils/GlobalProvider';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from './pages/HomeScreen/HomeScreen';
import {LoginScreen} from './pages/LoginScreen/LoginScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Rocket VPN' }}/>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        {/* <HomeScreen /> */}
        {/* <LoginScreen /> */}
      </NavigationContainer>
    </GlobalProvider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
