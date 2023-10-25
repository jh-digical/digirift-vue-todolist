<template>
  <div class="main page-contact">
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
            <form @submit.prevent="sendMessage">
              <div
                class="form-field flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <label for="firstlast_name">Name</label>
                <input
                  id="firstlastname"
                  v-model="contact.name"
                  type="text"
                  name="firstlast_name"
                  maxlength="255"
                />
              </div>

              <div
                class="form-field flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="contact.email"
                  type="email"
                  name="email"
                  maxlength="255"
                />
              </div>

              <div
                class="form-field flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <label for="message">Message</label>
                <textarea
                  id="message"
                  v-model="contact.message"
                  name="message"
                />
              </div>

              <div class="form-field send">
                <div class="btn-wrap">
                  <button class="button">Send</button>
                </div>
              </div>
            </form>
          </div>
          <div class="right">
            <h3 class="bigger">{{ page.sidebar_title }}</h3>
            <div class="contact-details">
              <div class="cd-address wysiwyg" v-html="page.address"></div>
              <div class="cd-contacts wysiwyg" v-html="page.comms"></div>
              <div class="cd-sched wysiwyg" v-html="page.schedule"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageService from '@/services/PageService'

export default {
  name: 'ContactPage',
  layout: 'DefaultLayout',

  async asyncData({ error }) {
    try {
      const { data } = await PageService.getContactUs()
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
      contact: {
        name: '',
        email: '',
        message: '',
      },
    }
  },

  methods: {
    async sendMessage() {
      this.$axios.setToken(
        '9|u4NQrrVRO1UJoOcojFNqNvGbGDz9f9aFYzq4Jo9m',
        'Bearer',
        ['post']
      )
      try {
        const { data } = await this.$axios.post(
          'https://bpbapi.ongoing.co.nz/api/sendmail',
          this.contact
        )

        this.resetContactFields()
        return data
      } catch (e) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to send message at this time. Please try again.',
        })
      }
      this.$axios.setToken(false)
    },

    resetContactFields() {
      this.contact = {
        name: '',
        email: '',
        message: '',
      }
    },
  },
}
</script>
