<template>
  <div class="main page-products">
    <section class="title-module">
      <div class="content-max-width">
        <div class="inner-wrap flex flex-col justify-end">
          <h1>{{ page.title }}</h1>
        </div>
      </div>
    </section>

    <section class="body-section">
      <div class="content-max-width">
        <div class="inner-wrap flex flex-col lg:flex-row justify-between">
          <div class="left">
            <h3>{{ page.subtitle }}</h3>
            <div class="products-list">
              <article
                v-for="(product, index) in products"
                :key="index"
                class="flex flex-col md:flex-row"
              >
                <img :src="fileUrl + product.image" alt="img" />
                <div class="details grow">
                  <div class="detail-row">
                    <p class="keyword">Style:</p>
                    <p class="value">{{ product.style }}</p>
                  </div>
                  <div class="detail-row">
                    <p class="keyword">Gap:</p>
                    <p class="value">{{ product.gap }}</p>
                  </div>
                  <div class="detail-row">
                    <p class="keyword">Frame:</p>
                    <p class="value">{{ product.frame }}</p>
                  </div>
                  <div class="detail-row">
                    <p class="keyword">Options:</p>
                    <p class="value">{{ product.options }}</p>
                  </div>
                </div>
              </article>
            </div>
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
  name: 'ProductsPage',
  layout: 'DefaultLayout',

  async asyncData({ error }) {
    try {
      const { data: page } = await PageService.getProductsPage()
      const { data: products } = await PageService.getProducts()

      return {
        page,
        products,
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
