/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:34:04
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 17:43:13
 * @FilePath: \RocketVPN\RocketVPN\pages\HomeScreen\HomeScreen.tsx
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GlobalContext } from '../../DataUtils/GlobalProvider';
import { ScrollView } from 'react-native-gesture-handler';
//import { GlobalProvider } from '../../DataUtils/GlobalProvider';


export function HomeScreen({ navigation }: { navigation: any }) {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = React.useState(false);
    // const [vpnState, setVpnState] = React.useState('Disconnected');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text>{globalState?.isConnected}</Text>
            <View style={styles.connectButton}
                //onTouchEnd={() => {navigation.navigate(('Login')); setGlobalState({isConnected:'false'});}}
                onTouchEnd={() => { setModalVisible(!modalVisible); }}>
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
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0,0,0,0)',
                            margin: 4,
                        }}
                        activeOpacity={0.7}
                        onPress={() => setModalVisible(false)}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                height: '60%',
                            }}
                        >
                            <View style={{
                                width: 40,
                                height: 4,
                                backgroundColor: '#DDDDDD',
                                borderRadius: 2,
                                alignSelf: 'center',
                                marginBottom: 20,
                            }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select Option</Text>
                            <ScrollView
                                style={{ marginTop: 20 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Option 2</Text>
                                </TouchableOpacity>
                                

                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
    connectButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 100,
        height: 144,
        width: 144,
    },
});

export default HomeScreen;
