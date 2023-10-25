<template>
  <a
    v-if="text && isLinkExternal(link)"
    :href="link"
    class="button external-link"
    :class="customClasses"
    target="_blank"
    >{{ text }}</a
  >
  <NuxtLink
    v-else-if="text && !isLinkExternal(link)"
    :to="link"
    class="button"
    :class="customClasses"
    >{{ text }}</NuxtLink
  >
</template>

<script>
export default {
  props: {
    customClasses: {
      type: Array,
      default: () => [],
    },
    link: {
      type: String,
      default: '/',
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    isLinkExternal(link) {
      return link.includes('http') || link.includes('www.')
    },
  },
}
</script>
