<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" @click="handleNavigation('/home')">
        <img src="@/assets/images/logo-brigante.png" alt="Estudio Brigante" class="navbar-logo">
      </a>
      
      <a 
        role="button" 
        class="navbar-burger" 
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="menu" 
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
      <div class="navbar-start">
        <a 
          class="navbar-item"
          @click="handleNavigation('/')"
        >
          Inicio
        </a>
        <a 
          class="navbar-item"
          @click="handleNavigation('/properties')"
        >
          Inmobiliaria
        </a>
        <a 
          class="navbar-item"
          @click="handleNavigation('/insurance')"
        >
          Seguros
        </a>
        <a 
          class="navbar-item"
          @click="scrollToSection('about-us')"
        >
          Quiénes Somos
        </a>
        <a 
          class="navbar-item"
          @click="scrollToSection('contact')"
        >
          Contacto
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopNavbar',
  props: {
    title: {
      type: String,
      default: 'RealtyWeb'
    },
    menuItems: {
      type: Array,
      default: () => []
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleNavigation(path) {
      this.isMenuOpen = false
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    },
    scrollToSection(sectionId) {
      this.isMenuOpen = false
      
      // Si no estamos en la landing page, navegar primero
      if (this.$route.path !== '/' && this.$route.path !== '/home') {
        this.$router.push('/home').then(() => {
          this.$nextTick(() => {
            this.$scrollTo(`#${sectionId}`)
          })
        })
      } else {
        this.$scrollTo(`#${sectionId}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.navbar {
  background-color: white;
  border-bottom: 1px solid $neutral-light;
  
  .navbar-item {
    &.has-text-primary {
      color: $primary;
    }
  }
  
  .has-text-primary {
    color: $primary !important;
  }

  .navbar-logo {
    max-height: 50px;
    height: 50px;
    max-width: 100%;
    object-fit: contain;
  }
}
</style>
