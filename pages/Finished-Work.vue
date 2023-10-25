<template>
  <div class="main page-finished-work">
    <section class="title-module">
      <div class="content-max-width">
        <div class="inner-wrap flex flex-col justify-end">
          <h1>{{ page.title }}</h1>
        </div>
      </div>
    </section>

    <section class="body-section">
      <div class="content-max-width">
        <div class="inner-wrap flex justify-between">
          <div class="work-list">
            <article
              v-for="(work, index) in works"
              :key="index"
              @click="loadGallery(work.name, work.gallery)"
            >
              <img :src="fileUrl + work.image" alt="work-img" />
              <div class="work-name">
                <p>{{ work.name }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <div v-if="popupOpen" class="popup-module">
      <span class="background" @click="togglePopup"></span>

      <div class="popup-modal">
        <div class="popup-content">
          <Carousel
            v-if="gallery.images.length"
            :custom-arrows="true"
            :settings="{
              arrows: true,
              dots: false,
              infinite: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            }"
          >
            <template #prev-arrow>
              <div class="prev custom-arrow">
                <span class="material-symbols-outlined">&#xe5e0;</span>
              </div>
            </template>
            <template #next-arrow>
              <div class="next custom-arrow">
                <span class="material-symbols-outlined">&#xe5e1;</span>
              </div>
            </template>
            <template #slide-contents>
              <div
                v-for="(gal, index) in gallery.images"
                :key="index"
                class="img-wrap"
              >
                <img :src="fileUrl + gal.image" alt="gallery-img" />
              </div>
              <!-- <div class="img-wrap">
                <img src="@/assets/images/gallery-1.png" alt="gallery-1" />
              </div>
              <div class="img-wrap">
                <img src="@/assets/images/gallery-1.png" alt="gallery-1" />
              </div> -->
            </template>
          </Carousel>
          <div v-else class="flex items-center justify-center p-8">
            <p class="m-0">No available images.</p>
          </div>
          <div class="title-bar">
            <h3>{{ gallery.name }}</h3>
            <button class="exit" @click.prevent="togglePopup">
              <span class="material-symbols-outlined">&#xe5cd;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageService from '@/services/PageService'

export default {
  name: 'FinishedWork',
  layout: 'DefaultLayout',

  async asyncData({ error }) {
    try {
      const { data: page } = await PageService.getFinishedWork()
      const { data: works } = await PageService.getWorksFinished()

      return {
        page,
        works,
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch data at this time. Please try again.',
      })
    }
  },

  data() {
    return {
      fileUrl: PageService.fileURL,
      popupOpen: false,
      gallery: {
        name: '',
        images: [],
      },
    }
  },

  methods: {
    loadGallery(name, gallery) {
      this.gallery.name = name
      this.gallery.images = gallery

      this.popupOpen = !this.popupOpen
    },

    togglePopup() {
      this.popupOpen = !this.popupOpen
    },
  },
}
</script>
