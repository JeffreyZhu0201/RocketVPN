/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 18:59:49
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 19:31:46
 * @FilePath: \RocketVPN\RocketVPN\components\OvpnCard\OvpnCard.tsx
 * @Description: File Description Here...
 * 
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved. 
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GlobalContext } from '../../DataUtils/GlobalProvider';


export function OvpnCard({ data, onPress }: { data: OvpnCardProps; onPress: () => void }) {
    const [selectedOvpn, setSelectedOvpn] = React.useState<string | null>(null);
    const {globalState, setGlobalState} = React.useContext(GlobalContext);
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card]}>
            <Text style={styles.description}>{data.name}</Text>
            <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#666',
            marginLeft: 'auto',
            backgroundColor: globalState.selectedOvpn?.id === data.id ? '#666' : 'transparent',
            }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        // marginBottom: 8,
        // marginLeft: 16,
        marginRight:20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});