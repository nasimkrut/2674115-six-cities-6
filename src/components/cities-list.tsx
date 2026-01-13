import React from 'react';
import classNames from 'classnames';

import { type City } from '../types/city';

type CitiesListProps = {
  cities: City[];
  currentCity: City;
  onCityChange: (city: City) => void;
};

function CitiesList({ cities, currentCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={classNames('locations__item-link tabs__item',
                  {
                    'tabs__item--active': city.name === currentCity.name
                  }
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const MemoizedCitiesList = React.memo(CitiesList);
MemoizedCitiesList.displayName = 'CitiesList';

export default MemoizedCitiesList;
