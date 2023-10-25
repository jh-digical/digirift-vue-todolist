<template>
  <div :class="customClassWrap">
    <VueSlickCarousel
      ref="gallery"
      class="gallery-slideshow"
      v-bind="settings"
      @beforeChange="showSlideIndex"
    >
      <template v-if="customArrows" #prevArrow="arrowOption">
        <slot name="prev-arrow" :prev-option="arrowOption"></slot>
      </template>
      <template v-if="customArrows" #nextArrow="arrowOption">
        <slot name="next-arrow" :next-option="arrowOption"></slot>
      </template>
      <slot name="slide-contents"></slot>
      <template v-if="customDots" #customPaging="page">
        <slot name="custom-dots" :dots-page="page"></slot>
      </template>
    </VueSlickCarousel>
    <slot
      name="slide-counter"
      v-bind="{ oldSlideIndex, newSlideIndex, maxSlides }"
    ></slot>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  name: 'CarouselPlugin',
  components: { VueSlickCarousel },

  props: {
    customClassWrap: {
      type: String,
      default: 'carousel-wrap',
    },
    settings: {
      type: Object,
      default() {
        return {
          arrows: true,
          dots: true,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    },
    customArrows: {
      type: Boolean,
      default: false,
    },
    customDots: {
      type: Boolean,
      default: false,
    },
    maxSlides: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      oldSlideIndex: null,
      newSlideIndex: null,
    }
  },

  methods: {
    showSlideIndex(oldSlideIndex, newSlideIndex) {
      this.oldSlideIndex = oldSlideIndex
      this.newSlideIndex = newSlideIndex
    },
  },
}
</script>
