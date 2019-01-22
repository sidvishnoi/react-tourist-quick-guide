import { State } from '.';
import { AnyAction } from 'redux';

const initialState: State['cities'] = {
  allIds: [],
  byId: {},
};

initialState.byId = {
  'city-one': {
    name: 'City One',
    distance: 25,
    places: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
    weather: {
      temperature: 40,
      unit: 'C',
      icon: 'sun',
      summary: 'sunny',
      forecast: [
        {
          temperature: 38,
          icon: 'sun',
          summary: 'sunny',
        },
        {
          temperature: 34,
          icon: 'rain',
          summary: 'shower',
        },
        {
          temperature: 39,
          icon: 'sun',
          summary: 'sunny',
        },
      ],
    },
  },
  'city-two': {
    name: 'City Long name',
    distance: 45,
    weather: {
      temperature: 36,
      unit: 'C',
      icon: 'sun',
      summary: 'sunny',
      forecast: [
        {
          temperature: 31,
          icon: 'rain',
          summary: 'rain',
        },
        {
          temperature: 29,
          icon: 'rain',
          summary: 'shower',
        },
        {
          temperature: 35,
          icon: 'sun',
          summary: 'sunny',
        },
      ],
    },
    places: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
  },
  'city-three': {
    name: 'Third City',
    distance: 400,
    weather: {
      temperature: 30,
      unit: 'C',
      icon: 'sun',
      summary: 'sunny',
      forecast: [
        {
          temperature: 38,
          icon: 'sun',
          summary: 'sunny',
        },
        {
          temperature: 34,
          icon: 'rain',
          summary: 'shower',
        },
        {
          temperature: 39,
          icon: 'sun',
          summary: 'sunny',
        },
      ],
    },
    places: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
  },
};

initialState.allIds = Object.keys(initialState.byId);

export default function cities(
  state: State['cities'] = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case 'REMOVE_CITY': {
      const { id } = action;
      const idx = state.allIds.indexOf(id);
      if (idx === -1) return state;
      const allIds = [
        ...state.allIds.slice(0, idx),
        ...state.allIds.slice(idx + 1),
      ];
      const byId = { ...state.byId };
      delete byId[id];
      return { allIds, byId };
    }
    default:
      return state;
  }
}
