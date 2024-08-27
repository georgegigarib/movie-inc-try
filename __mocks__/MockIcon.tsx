import React from 'react';
import { Text, TextStyle } from 'react-native';

interface MockIconProps {
  name: string;
  size?: number;
  color?: string; 
  testID?: string;
}

export default function MockIcon({ name, size, color, testID }: MockIconProps) { 
  const textStyle: TextStyle = {
    fontSize: size,
    color,
  };

  return (
    <Text testID={testID} style={textStyle}>
      {name}
    </Text>
  );
}
