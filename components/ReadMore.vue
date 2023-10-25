<template>
  <component :is="tag" class="exp-wrap">
    <div v-if="expandable" class="legend-content" :class="{ hidden: expanded }">
      <slot name="legend" />
    </div>
    <div
      ref="expandable"
      class="expandable"
      :class="{ active: expanded, 'can-expand': expandable }"
    >
      <slot name="content" v-bind="{ newHeight }" />
    </div>
    <slot v-if="expandable" name="toggle" v-bind="{ toggle, expanded }" />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'article',
    },
    maxHeight: {
      type: Number,
      default: 20,
    },
  },

  data() {
    return {
      expanded: false,
      expandable: false,
      normalHeight: 10000,
    }
  },

  computed: {
    newHeight() {
      return this.expanded ? this.normalHeight : this.maxHeight
    },
  },

  mounted() {
    const normalHeight = this.$refs.expandable.scrollHeight
    this.expandable = normalHeight > this.maxHeight

    if (this.normalHeight <= this.maxHeight) {
      this.normalHeight = normalHeight
      this.expandable = false
    }
  },

  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
  },
}
</script>

<style scoped lang="scss">
.exp-wrap {
  margin-top: 20px;

  @media (min-width: 640px) {
    margin-top: 0;
  }

  .legend-content {
    max-width: 600px;
    margin: 0 auto;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;

    & > * {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 20px;

      color: #fff;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &.hidden {
      display: none;
    }
  }
}

.expandable {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
  transition: max-height 0.25s linear;

  & + .read-more {
    display: block;
    width: fit-content;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;

    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.1px;
    text-transform: uppercase;

    color: #ffba01;
  }

  &.can-expand {
    &:not(.active) {
      visibility: hidden;
      position: absolute;
      z-index: -1;
    }
  }

  .card-content {
    & > * {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      line-height: 20px;

      color: #fff;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
