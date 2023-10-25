<template>
  <div
    class="app__accordion w-full"
    :class="{
      'acc-outer': isOuter,
      'acc-inner': isInner,
      open: isOpen,
      close: !isOpen,
    }"
  >
    <button
      class="flex items-center justify-between w-full"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
      @click="toggleAccordion()"
    >
      <slot name="title" />
      <span
        class="toggle-ico"
        :class="{
          outer: isOuter,
          inner: isInner,
          open: isOpen,
          close: !isOpen,
        }"
      ></span>
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOuter: {
      type: Boolean,
      default: false,
    },
    isInner: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable selector-class-pattern */
.app__accordion {
  /* stylelint-enable selector-class-pattern */
  button {
    span.toggle-ico {
      display: block;
      min-width: 18px;
      width: 18px;
      height: 18px;
      margin-left: 20px;

      &.outer {
        margin-top: -15px;

        // background: url('@/assets/images/nav-caret-down.svg') no-repeat center
        //   center;
      }

      &.outer.close {
        transform: rotate(0deg);
      }

      &.outer.open {
        transform: rotate(180deg);
      }

      &.inner,
      &.inner.close {
        // background: url('/images/drawer-plus.svg') no-repeat center center;
      }

      &.inner.open {
        // background: url('/images/drawer-minus.svg') no-repeat center center;
      }
    }
  }
}
</style>
