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
  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: '',
      items: [],
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  handleAddItem() {
    if (!this.state.value) return;

    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
      },
    ];

    this.setState({
      items: newItems,
      value: '',
    });
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete,
    }));

    console.table(newItems);

    this.setState({
      items: newItems,
      allComplete: complete,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <Text> Hola </Text>
        </View>
        <Footer />
      </View>
    );
  }
}

export default App;
