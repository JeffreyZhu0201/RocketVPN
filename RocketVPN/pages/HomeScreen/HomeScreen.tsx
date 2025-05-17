/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 13:34:04
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 23:37:20
 * @FilePath: \RocketVPN\RocketVPN\pages\HomeScreen\HomeScreen.tsx
 * @Description: File Description Here...
 *
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved.
 */

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { GlobalContext } from '../../DataUtils/GlobalProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { OvpnCard } from '../../components/OvpnCard/OvpnCard';
import { User } from '../../components/User/User';
//import { GlobalProvider } from '../../DataUtils/GlobalProvider';


export function HomeScreen({ navigation }: { navigation: any }) {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = React.useState(false);
    // const [vpnState, setVpnState] = React.useState('Disconnected');
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo.png')}
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 20,
                    borderRadius: 50,
                }}
                resizeMode="contain"
            />
            <User membershipDays={123} trafficUsed={123} trafficTotal={123}/>
            {/* <Text style={styles.title}>Home Screen</Text>
            <Text>{globalState?.isConnected}</Text>
            <Text>{globalState?.selectedOvpn?.name}</Text>
            <Text>{globalState?.selectedOvpn?.id}</Text> */}
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
                                height: '50%',
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
                                {/* {
                                    ovpnList.map((item, index) => (
                                        <OvpnCard 
                                            key={index}
                                            data={item}
                                            onPress={() => {
                                                setGlobalState({ ...globalState, selectedOvpn: item });
                                                setModalVisible(false);
                                                // navigation.navigate('Login');
                                            }}
                                    ))
                                } */}
                                <OvpnCard
                                    data={{ id:'1',name: 'VPN 1' }}
                                    onPress={() => {
                                        setGlobalState({ ...globalState, selectedOvpn: { id:'1',name: 'VPN 1' }});
                                        // setModalVisible(false);
                                        // navigation.navigate('Login');
                                    }}/>
                                <OvpnCard
                                    data={{ id:'2',name: 'VPN 2' }}
                                    onPress={() => {
                                        setGlobalState({ ...globalState, selectedOvpn: { id:'2',name: 'VPN 2' } });
                                        // setModalVisible(false);
                                        // navigation.navigate('Login');
                                    }}/>
                                <OvpnCard
                                    data={{ id:'3',name: 'VPN 3' }}
                                    onPress={() => {
                                        setGlobalState({ ...globalState, selectedOvpn: { id:'3',name: 'VPN 3' } });
                                        // setModalVisible(false);
                                        // navigation.navigate('Login');
                                    }}/>
                            </ScrollView>
                            <View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            borderRadius: 100,
                                            height: 48,
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 20,
                                        }}
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 18 }}>确认</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
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
