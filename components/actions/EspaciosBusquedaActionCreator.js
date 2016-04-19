import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {

  searchPlaces(someData) {
  	console.log('searchPlaces, executing with thie data:', someData);
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.PLACES_SEARCHED
    });
    /*Dispatcher.handleServerAction({
      type: Constants.ActionTypes.LOG_OUT
    })*/
  }
}