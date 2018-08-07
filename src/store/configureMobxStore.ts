import AppStore from './appStore';

export default function configureMobxStore() {

  const appStore = new AppStore();

  const store = {
    appStore,
  };

  // Initialise

  return store;
}
