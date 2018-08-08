import React, { Component } from 'react';
import ConfigManager from '../config/ConfigManager';
import Header from './Header';
import styles from './styles.scss';

export default class App extends Component {
  public render() {
    console.log(ConfigManager.API_URL_BASE);
    return (
      <div className={styles.app}>
        <Header title='Typescript is frustrating' />
      </div>
    );
  }
}
