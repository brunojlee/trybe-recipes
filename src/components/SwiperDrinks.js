import PropTypes from 'prop-types';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import RecommendationCard from './RecommendationCard';

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
  drinksRecommendations: PropTypes.func.isRequired,
};

export default SwiperDrinks;
