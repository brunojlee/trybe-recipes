/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import RecommendationCard from './RecommendationCard';
import 'swiper/css';

function SwiperFoods({ mealsRecommendations }) {
  return (
    <Swiper
      spaceBetween={ 10 }
      slidesPerView={ 2 }
    >
      <section>
        {
          mealsRecommendations.map((meal, index) => (
            <SwiperSlide key={ index }>
              <RecommendationCard meal={ meal } index={ index } />
            </SwiperSlide>
          ))
        }
      </section>
    </Swiper>
  );
}

SwiperFoods.propTypes = {
  mealsRecommendations: PropTypes.objectOf.isRequired,
};

export default SwiperFoods;
