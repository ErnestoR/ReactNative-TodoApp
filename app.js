import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Header from './header';
import Footer from './footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BADA55',
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
    }),
  },
  content: {
    flex: 1,
  },
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text> Hola </Text>
        </View>
        <Footer />
      </View>
    );
  }
}

export default App;
