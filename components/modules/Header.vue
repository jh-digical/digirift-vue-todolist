<template>
  <header
    id="site-header"
    class="content-max-width site-header lg:flex lg:justify-between"
    :class="{ open: isOpen }"
  >
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="logo" @click.native.prevent="closeNav">
        <img src="@/assets/images/logo.png" />
      </NuxtLink>

      <div class="right flex">
        <button class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <nav class="lg:flex lg:items-center">
      <ul class="top">
        <!-- <li v-for="(link, index) of nav" :key="index">
          <a :href="link.url">
            {{ link.title }}
          </a>
        </li> -->
        <li>
          <NuxtLink to="/" @click.native.prevent="closeNav">HOME</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" @click.native.prevent="closeNav"
            >ABOUT US</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/products" @click.native.prevent="closeNav"
            >OUR PRODUCTS</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/finished-work" @click.native.prevent="closeNav"
            >FINISHED WORK</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/contact" @click.native.prevent="closeNav"
            >CONTACT US</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderModule',

  props: {
    menu: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isOpen: false,
      nav: [],
    }
  },

  mounted() {
    this.nav = this.menu
  },

  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      if (this.isOpen) this.$parent.$el.className = 'nav-open'
      else this.$parent.$el.classList.remove('nav-open')
    },

    closeNav() {
      this.isOpen = false
      this.$parent.$el.classList.remove('nav-open')
    },
  },
}
</script>
