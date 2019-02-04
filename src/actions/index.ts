import { Dispatch } from 'redux';

import distanceAPI from '../apis/distance';
import locationAPI from '../apis/location';
import placesAPI from '../apis/places';
import weatherAPI from '../apis/weather';
import { State } from '../state';

export function getSuggestions(query: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SUGGESTION_LOOKUP', query });

    locationAPI(query)
      .then(response => {
        dispatch({
          type: 'SUGGESTION_RESPONSE',
          query,
          locations: response,
        });
      })
      .catch(error => {
        dispatch({
          error: error.message,
          query,
          type: 'SUGGESTION_RESPONSE_ERROR',
        });
      });
  };
}

export const searchUpdate = (query: string) => ({
  query,
  type: 'SUGGESTION_UPDATE',
});

export function addCity(destination: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    dispatch(searchUpdate(''));
    dispatch({ type: 'ADD_CITY', name: destination });
    getWeather(destination, dispatch);
    getPlaces(destination, dispatch);
    const { source } = getState();
    getDistance(source, destination, dispatch);
  };
}

export function removeCity(name: string) {
  return { type: 'REMOVE_CITY', name };
}

export function moveCityUp(name: string) {
  return { type: 'MOVE_CITY_UP', name };
}

export function selectLocation(location: string) {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdate(''));
    dispatch({ type: 'LOCATION_SELECT', location });
  };
}

function getWeather(location: string, dispatch: Dispatch) {
  weatherAPI(location)
    .then(response => {
      dispatch({
        name: location,
        response,
        type: 'WEATHER_RESPONSE',
      });
    })
    .catch(error => {
      dispatch({
        error: error.message,
        name: location,
        type: 'WEATHER_ERROR',
      });
    });
}

function getPlaces(location: string, dispatch: Dispatch) {
  placesAPI(location)
    .then(response => {
      dispatch({
        name: location,
        response,
        type: 'PLACES_RESPONSE',
      });
    })
    .catch(error => {
      dispatch({
        error: error.message,
        name: location,
        type: 'PLACES_ERROR',
      });
    });
}

function getDistance(source: string, destination: string, dispatch: Dispatch) {
  dispatch({ type: 'DISTANCE_SEARCH', name: destination });

  distanceAPI(source, destination)
    .then(response => {
      dispatch({
        name: destination,
        response,
        type: 'DISTANCE_RESPONSE',
      });
    })
    .catch(error => {
      dispatch({
        error: error.message,
        name: destination,
        type: 'DISTANCE_ERROR',
      });
    });
}
