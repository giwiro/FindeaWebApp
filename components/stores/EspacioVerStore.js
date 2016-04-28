import BaseStore from './BaseStore'
import Dispatcher from '../Dispatcher'
import Constants from '../Constants'

import request from 'superagent'

let _espacio = undefined;

class EspacioVerStore extends BaseStore {

  init(espacio) {
    _espacio = espacio
    this.emitChange()
  }

	getEspacio() {
		return _espacio
  }

  setEspacio(newEspacio) {
  	_espacio = newEspacio
  }

}

const espacioVerStore = new EspacioVerStore();

Dispatcher.register( (payload) => {
  const action = payload.action;

  switch (action.type) {
  case Constants.ActionTypes.VIEW_PLACE_SEARCHED:

    request
      .post('/buscarEspacio/' + action.id)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err);
        }else{
          console.log('Ajax /buscarEspacio' + action.id ,res.body);
          espacioVerStore.setEspacio(res.body);
        }
        espacioVerStore.emitChange();
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

export default espacioVerStore;