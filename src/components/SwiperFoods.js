import PropTypes from 'prop-types';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import RecommendationCard from './RecommendationCard';

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
