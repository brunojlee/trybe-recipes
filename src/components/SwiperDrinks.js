/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import RecommendationCard from './RecommendationCard';
import 'swiper/css';

function SwiperDrinks({ drinksRecommendations }) {
  return (
    <Swiper
      spaceBetween={ 10 }
      slidesPerView={ 2 }
    >
      <section>
        {
          drinksRecommendations.map((drink, index) => (
            <SwiperSlide key={ index }>
              <RecommendationCard drink={ drink } index={ index } />
            </SwiperSlide>
          ))
        }
      </section>
    </Swiper>
  );
}

SwiperDrinks.propTypes = {
  drinksRecommendations: PropTypes.objectOf.isRequired,
};

export default SwiperDrinks;
