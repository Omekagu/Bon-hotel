import { View, Text } from 'react-native';
import React from 'react';

export default function TextCaps({ text }) {
  return (
    <View>
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 16,
          color: '#545351',
          textAlign: 'justify',
        }}
      >
        {text}
      </Text>
    </View>
  );
}