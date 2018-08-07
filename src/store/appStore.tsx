import { action, configure, observable, runInAction } from 'mobx';
configure({ enforceActions: true });

export default class AppStore {
  @observable loading = true;

  @action
  setLoading = (loading) => {
    this.loading = loading;
  }

}
