import BaseStore from './BaseStore'
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

// data storage
let _session = undefined;
let _userType = undefined;

class SessionStore extends BaseStore {

  init(session, userType) {
    if (!session)
      return false;
    _session = session
    _userType = userType
  }

	getSession() {
		return _session
  }

  getUserType() {
    return _userType
  }

  destroySession() {
    _session = undefined;
    _userType = undefined;
  }
}

const sessionStore = new SessionStore();

Dispatcher.register( (payload) => {
  const action = payload.action;

  switch (action.type) {
  case Constants.ActionTypes.SESSION_DESTROYED:
    // NOTE: if this action needs to wait on another store:
    // Dispatcher.waitFor([OtherStore.dispatchToken]);
    // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
    sessionStore.destroySession();
    sessionStore.emitChange();
    break;
  /*case Constants.ActionTypes.LOG_OUT:

    console.log('ajax call to logout');
    //No emite notificacion al ui
    break;*/

  // add more cases for other actionTypes...

  // no default
  }
})

export default sessionStore;