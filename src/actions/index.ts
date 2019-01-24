import { Dispatch } from 'redux';

import distanceAPI from '../fake-apis/distance';
import locationAPI from '../fake-apis/location';
import placesAPI from '../fake-apis/places';
import weatherAPI from '../fake-apis/weather';

export function getSuggestions(query: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SUGGESTION_LOOKUP', query });

    locationAPI(query, 10)
      .then(response => {
        dispatch({
          type: 'SUGGESTION_RESPONSE',
          ...response,
        });
      })
      .catch(error => {
        dispatch({
          error: error.message,
          type: 'SUGGESTION_RESPONSE_ERROR',
        });
      });
  };
}

export const searchUpdate = (query: string) => ({
  query,
  type: 'SUGGESTION_UPDATE',
});

export function addCity(name: string) {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdate(''));
    dispatch({ type: 'ADD_CITY', name });
    getWeather(name, dispatch);
    getPlaces(name, dispatch);
    getDistance(name, dispatch);
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
  dispatch({ type: 'WEATHER_SEARCH', name: location });

  weatherAPI(location, 500)
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
  dispatch({ type: 'PLACES_SEARCH', name: location });

  placesAPI(location, 900)
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

function getDistance(location: string, dispatch: Dispatch) {
  dispatch({ type: 'DISTANCE_SEARCH', name: location });

  distanceAPI(location, 1200)
    .then(response => {
      dispatch({
        name: location,
        response,
        type: 'DISTANCE_RESPONSE',
      });
    })
    .catch(error => {
      dispatch({
        error: error.message,
        name: location,
        type: 'DISTANCE_ERROR',
      });
    });
}
