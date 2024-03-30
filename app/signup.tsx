import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';

export default function Page() {
    // TODO: Implement the sign up page
    // Allow users to input name, email
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');

    return (
        <View className="flex-1 items-center padding-24">
        <View className="flex-1 justify-center max-w-4xl mx-auto">
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TouchableOpacity>
                <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
    },
    button: {
        height: 40,
        margin: 12,
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'gray',
        color: 'white',
    }
})