import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    color: '#4d4d4d',
  }
});

class Row extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

export default Row;
