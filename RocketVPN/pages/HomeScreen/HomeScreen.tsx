/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:34:04
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 16:44:46
 * @FilePath: \RocketVPN\RocketVPN\pages\HomeScreen\HomeScreen.tsx
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalContext } from '../../DataUtils/GlobalProvider';
//import { GlobalProvider } from '../../DataUtils/GlobalProvider';


export function HomeScreen({navigation}: { navigation: any }) {
    const {globalState ,setGlobalState} = useContext(GlobalContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text>{globalState?.isConnected}</Text>
            <View style={styles.connectButton}
                onTouchEnd={() => {navigation.navigate(('Login')); setGlobalState({isConnected:'false'});}}>
                <Text style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    justifyContent: 'center',
                    lineHeight: 144,
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>Connect</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    connectButton:{
        backgroundColor: '#4CAF50',
        borderRadius: 100,
        height: 144,
        width: 144,
    },
});

export default HomeScreen;
