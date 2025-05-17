/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:36:14
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 16:34:40
 * @FilePath: \RocketVPN\RocketVPN\pages\LoginScreen\LoginScreen.tsx
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
*/

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GlobalContext } from '../../DataUtils/GlobalProvider';
//import { GlobalProvider } from '../../DataUtils/GlobalProvider';


export function LoginScreen({ navigation }: { navigation: any }) {
    const {globalState} = useContext(GlobalContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
            <Text>{globalState?.isConnected}</Text>
            <Button
                title="Go Back"
                onPress={() => navigation.goBack()} // 返回上一页
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
