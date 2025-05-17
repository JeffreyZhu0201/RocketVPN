/*
 * @Author: Jeffrey Zhu 1624410543@qq.com
 * @Date: 2025-05-17 23:40:40
 * @LastEditors: Jeffrey Zhu 1624410543@qq.com
 * @LastEditTime: 2025-05-17 23:58:43
 * @FilePath: \RocketVPN\RocketVPN\components\User\User.tsx
 * @Description: File Description Here...
 * 
 * Copyright (c) 2025 by JeffreyZhu, All Rights Reserved. 
 * */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';


interface UserProps {
    membershipDays: number;
    trafficUsed: number;
    trafficTotal: number;
}

export const User: React.FC<UserProps> = ({
    membershipDays,
    trafficUsed,
    trafficTotal,
}) => {
    const trafficProgress = trafficUsed / trafficTotal;

    return (
        <View style={styles.container}>
            <View style={styles.membershipInfo}>
                <Text style={styles.label}>会员剩余时间</Text>
                <Text style={styles.value}>{membershipDays} 天</Text>
            </View>
            
            <View style={styles.trafficInfo}>
                <Text style={styles.label}>流量使用情况</Text>
                <ProgressBar 
                    progress={trafficProgress} 
                    color="#2196F3"
                    style={styles.progressBar}
                />
                <Text style={styles.trafficText}>
                    {trafficUsed}GB / {trafficTotal}GB
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
    },
    membershipInfo: {
        marginBottom: 16,
    },
    trafficInfo: {
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    trafficText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'right',
    },
});
