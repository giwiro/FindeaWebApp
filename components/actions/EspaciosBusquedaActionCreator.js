import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {

  searchPlaces(data) {
  	console.log('searchPlaces, executing with thie data:', data);
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.PLACES_SEARCHED,
      data: data
    });
    /*Dispatcher.handleServerAction({
      type: Constants.ActionTypes.LOG_OUT
    })*/
  }
}