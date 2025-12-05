<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "App",
  components: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {
    Vue.prototype.$showToast = (...args) => {
      this.showToast(...args);
    };
  },
  methods: {
    showToast(text, isError, duration = 2500) {
      this.$buefy.toast.open({
        duration: duration,
        message: text,
        position: "is-top",
        queue: false,
        type: isError ? "is-danger" : "is-success",
      });
    },
  },
};
</script>

<style lang="scss">
.tag {
  &.is-primary {
    background-color: $primary !important;
    color: $white-cloud !important;
  }

  &.is-info {
    background-color: $primary-lightest !important;
    color: $white-cloud !important;
  }
}
.breadcrumb {
  a {
    color: $primary !important;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem !important;
    margin-left: 5px !important;
  }
}
a.navbar-item:hover {
  color: $primary !important;
}
.icon-text{
  display: flex !important;
}

.icon {
  &.is-left {
    margin-left: 15px !important;
  }
}
.menu{
  .menu-list{
    li a{
      padding: 30px;
    }
  }
  .icon{
    &.is-small {
      height: 1.5rem !important;
      width: 1.5rem !important;
    }

    &.is-left {
      margin-left: 15px !important;
    }
  }
}
button {
  border-radius: 5px !important;
  
  -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02) !important;
  -moz-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02) !important;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02) !important;
  @media (max-width: 768px) {
    padding: 0;
    height: 1.5em;
  }

  &.is-primary{
    background-color: $primary !important;
    border-color: $primary !important;

    &:hover{
      background-color: darken($primary, 10%) !important;
      border-color: darken($primary, 10%) !important;
      cursor: pointer;
    }
  }
}

.pagination-link.is-current{
  background-color: $primary !important;
  border-color: $primary !important;
  color: $white-cloud !important;
}

.panel{
  .panel-heading{
    background-color: $primary !important;
    color: $white-cloud !important;
    strong{
      color: $white-cloud !important;
    }
  }

  .panel-block{
    .b-table, .columns{
      width: 100% !important;
    }
  }
}
.modal-card-head, .modal-card-foot{
  background-color: hsl(0, 0%, 100%) !important;
  border-top: none !important;
  border-bottom: none !important;
  font-weight: 600;

}
.modal-background{
  backdrop-filter: blur(10px) !important;
}

@media (max-width: 768px) {
  .modal{
    .modal-close{
      display: none !important;
    }
  }
}

body {
  --sb-size: 7px;
}

::-webkit-scrollbar {
  width: var(--sb-size) !important;
}

::-webkit-scrollbar-track {
  background: $primary !important;
}

::-webkit-scrollbar-thumb {
  background: $neutral-text !important;
  border-radius: 1px !important;
  
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: $primary
                     $primary !important;
  }
}

.toast{
  border-radius: 10px !important;

  &.is-success{
    background-color: #16a085 !important;
  }
}

.field{
  .icon{
    width: 1em !important;
    margin-right: 10px !important;
  }
}

.input:focus{
  border-color: $primary !important;
}

.has-text-primary{
  color: $primary !important;
  svg{
    fill: $primary !important;
  }
}

</style>