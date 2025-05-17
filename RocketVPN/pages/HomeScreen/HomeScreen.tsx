/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:34:04
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 13:34:04
 * @FilePath: \RocketVPN\RocketVPN\pages\HomeScreen\HomeScreen.tsx
 * @Description: File Description Here...
 * 
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved. 
 */

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import { GlobalProvider } from '../../DataUtils/GlobalProvider';


export function HomeScreen({navigation}: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Button
                title="Go Back"
                onPress={() => navigation.navigate(('Login'))} // 返回上一页
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
