import store from 'store';
import {
  LAST_LOCATION,
} from './constants';

export const saveLastLocation = lastLocation => {
  store.set(LAST_LOCATION, lastLocation);
  return lastLocation;
};

export const getLastLocation = () => {
  return store.get(LAST_LOCATION);
};

export const getPathnameOfLastLocation = () => {
  const lastLocation = store.get(LAST_LOCATION);

  if (typeof lastLocation === 'string') {
    return lastLocation;
  }

	if (typeof lastLocation === 'object') {
    return lastLocation.state.pathname;
  }

	return '/';
};

export const existLastLocation = () => {
  const lastLocation = store.get(LAST_LOCATION);

  if (lastLocation === '') {
    return false;
  }

	if (!lastLocation.startsWith('/')) {
    return false;
  }

	if (!lastLocation.state) {
    return false;
  }
};


