import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  Keyboard,
} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
    }),
  },
  content: {
    flex: 1,
  },
  lists: {
    backgroundColor: '#FFFFFF',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      },
    });

    this.state = {
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.setSource = this.setSource.bind(this);
  }

  setSource(items, itemsDataSource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState,
    });
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

    this.setSource(newItems, newItems, { value: '', });
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete,
    }));

    console.table(newItems);

    this.setSource(newItems, newItems, { allComplete: complete });
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
          <ListView
            style={styles.lists}
            enableEmptyRows
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => {
              return (
                <Row
                  key={key}
                  {...value}
                />
              );
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator}/>;
            }}
          />
        </View>
        <Footer/>
      </View>
    );
  }
}

export default App;
