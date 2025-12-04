<template>
  <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    show() {
      this.isLoading = true;
    },
    hide() {
      this.isLoading = false;
    }
  }
};
</script>
