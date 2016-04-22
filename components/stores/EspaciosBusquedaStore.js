import BaseStore from './BaseStore'
import Dispatcher from '../Dispatcher'
import Constants from '../Constants'

import request from 'superagent'

let initialized = false;
let _espacios = [];
let _isLoading = false;
let _center = {
  lat: -9.189966999999998, 
  lng: -75.015152
}
let _viewport = undefined;

class EspaciosBusquedaStore extends BaseStore {

	init(espacios) {
    if (!espacios || initialized)
      return false;
    _espacios = espacios
    initialized = true
  }

  getViewport() {
    return _viewport
  }

  getCenter() {
    return _center
  }

  getEspacios() {
  	return _espacios
  }

  isLoading() {
    return _isLoading
  }

  setViewport(newViewport) {
    _viewport = newViewport
  }

  setCenter(newCenter) {
    _center = newCenter
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
    console.log('PLACES_SEARCHED', payload);
    // NOTE: if this action needs to wait on another store:
    // Dispatcher.waitFor([OtherStore.dispatchToken]);
    // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
    /*sessionStore.destroySession();
    sessionStore.emitChange();*/
    espaciosBusquedaStore.beginLoad();
    espaciosBusquedaStore.emitChange();

    request
      .post('/buscar')
      .send(action.data)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err);
        }else{
          console.log('Ajax /buscar',res.body);

          espaciosBusquedaStore.setEspacios(res.body.espacios);

          //if (res.body.viewport)
            espaciosBusquedaStore.setViewport(res.body.viewport);

          if (res.body.center)
            espaciosBusquedaStore.setCenter(res.body.center);
        }

        espaciosBusquedaStore.finishLoad();
        espaciosBusquedaStore.emitChange();
      });

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