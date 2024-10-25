import { View, Text } from 'react-native';
import React from 'react';

export default function TextGreen({ text }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: 'green',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
