import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {

  buscarEspacio(id) {
  	console.log('buscarEspacio, id:', id);
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.VIEW_PLACE_SEARCHED,
      id: id
    });
    /*Dispatcher.handleServerAction({
      type: Constants.ActionTypes.LOG_OUT
    })*/
  }
}