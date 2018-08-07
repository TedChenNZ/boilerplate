import React, { Component } from 'react';
import Header from './Header';
import styles from './styles.scss';

export default class App extends Component {
  public render() {
    console.log('Hello world!');
    return (
      <div className={styles.app}>
        <Header title='Typescript is frustrating' />
      </div>
    );
  }
}
