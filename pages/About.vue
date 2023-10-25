<template>
  <div class="main page-about">
    <section class="title-module">
      <div class="content-max-width">
        <div class="inner-wrap flex flex-col justify-end">
          <h1>{{ page.title }}</h1>
        </div>
      </div>
    </section>

    <section class="body-section">
      <div class="content-max-width">
        <div class="inner-wrap flex flex-col md:flex-row justify-between">
          <div class="left">
            <h3>{{ page.subtitle }}</h3>
            <div class="wysiwyg" v-html="page.content"></div>
          </div>
          <div class="right">
            <h3 class="bigger">{{ page.sidebar_title }}</h3>
            <img :src="fileUrl + page.sidebar_image" alt="recent-finished" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageService from '@/services/PageService'

export default {
  name: 'AboutPage',
  layout: 'DefaultLayout',

  async asyncData({ error }) {
    try {
      const { data } = await PageService.getAboutUs()
      return {
        page: data,
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
    }
  },
}
</script>
