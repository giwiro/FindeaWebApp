import BaseStore from './BaseStore'
import Dispatcher from '../Dispatcher'
import Constants from '../Constants'

import request from 'superagent'

let _espacios = undefined;
let _isLoading = false;

class EspaciosBusquedaStore extends BaseStore {

	init(espacios) {
    if (!espacios)
      return false;
    _espacios = espacios
  }

  getEspacios() {
  	return _espacios
  }

  isLoading() {
    return _isLoading
  }

  setEspacios(espacios) {
    _espacios = espacios
  }

  beginLoad() {
    _isLoading = true
  }

  finishLoad() {
    _isLoading = false
  }

}

const espaciosBusquedaStore = new EspaciosBusquedaStore();

Dispatcher.register( (payload) => {
  const action = payload.action;

  switch (action.type) {
  case Constants.ActionTypes.PLACES_SEARCHED:
    console.log('PLACES_SEARCHED');
    // NOTE: if this action needs to wait on another store:
    // Dispatcher.waitFor([OtherStore.dispatchToken]);
    // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
    /*sessionStore.destroySession();
    sessionStore.emitChange();*/
    espaciosBusquedaStore.beginLoad();
    espaciosBusquedaStore.emitChange();

    setTimeout(() => {
      espaciosBusquedaStore.finishLoad();
      espaciosBusquedaStore.setEspacios(undefined);
      espaciosBusquedaStore.emitChange();
    }, 2000);

    break;
  /*case Constants.ActionTypes.LOG_OUT:

    console.log('ajax call to logout');
    //No emite notificacion al ui
    break;*/

  // add more cases for other actionTypes...

  // no default
  }
})

export default espaciosBusquedaStore;