<template>
  <div class="main-layout">
    <top-navbar
      :is-authenticated="isAuthenticated"
      @login="showLogin"
      @signup="showSignup"
      @logout="handleLogout"
    />

    <router-view />

    <WhatsAppButton 
      phone-number="+542346532089"
      message="Hola! Me interesa conocer más sobre los servicios de Estudio Brigante."
    />

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <h4 class="title is-6 has-text-white">Estudio Brigante</h4>
            <p class="has-text-grey-light mb-3">
              Soluciones integrales en seguros, gestoría, inmobiliaria e
              inversiones desde 2009.
            </p>
            <p class="has-text-grey-light is-size-7">
              Estamos para ayudarte con cualquier consulta o inquietud que
              tengas.
            </p>
          </div>

          <div class="column is-3">
            <h4 class="title is-6 has-text-white">Contacto</h4>
            <ul class="footer-contact">
              <li>
                <b-icon icon="phone" size="is-small"></b-icon>
                <span>+54 2346-532089</span>
              </li>
              <li>
                <b-icon icon="envelope" size="is-small"></b-icon>
                <span>info@estudiobrigante.com.ar</span>
              </li>
              <li>
                <b-icon icon="map-marker" size="is-small"></b-icon>
                <span>Av. La Razón 41, Chivilcoy, Bs. As</span>
              </li>
            </ul>
          </div>

          <div class="column is-3">
            <h4 class="title is-6 has-text-white">Horario de Atención</h4>
            <ul class="footer-hours">
              <li>
                <strong>Lunes - Viernes</strong><br />
                <span class="has-text-grey-light">08:30 AM - 19:30 PM</span>
              </li>
              <li class="mt-2">
                <strong>Sábados</strong><br />
                <span class="has-text-grey-light">09:00 AM - 12:00 PM</span>
              </li>
            </ul>
          </div>

          <!-- <div class="column is-2">
            <h4 class="title is-6 has-text-white">Enlaces</h4>
            <ul class="footer-links">
              <li>
                <router-link to="/" @click="scrollToTop">Inicio</router-link>
              </li>
              <li><router-link to="/properties">Propiedades</router-link></li>
              <li>
                <router-link to="/privacy-policy"
                  >Política de Privacidad</router-link
                >
              </li>
            </ul>
          </div> -->
        <div class="column is-2">
            <h4 class="title is-6 has-text-white">Enlaces</h4>
            <ul class="footer-links">
              <li>
                <router-link 
                  to="/" 
                  v-scroll-to="{ el: 'body', offset: 0 }"
                >
                  Inicio
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/properties" 
                  v-scroll-to="{ el: 'body', offset: 0 }"
                >
                  Inmobiliaria
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/privacy-policy"
                  v-scroll-to="{ el: 'body', offset: 0 }"
                >
                  Política de Privacidad
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="has-text-centered">
          <p class="has-text-grey">
            &copy; {{ currentYear() }} Estudio Brigante. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import WhatsAppButton from "@/components/WhatsAppButton.vue";

export default {
  name: "MainLayout",
  components: {
    TopNavbar,
    WhatsAppButton
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    currentYear() {
      return new Date().getFullYear();
    },
    showLogin() {
      this.$router.push("/login");
    },
    showSignup() {
      this.$router.push("/signup");
    },
    handleLogout() {
      this.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
  background-color: $neutral-dark;
  padding: 3rem 1.5rem 2rem;
  color: $text-light;

  hr {
    background-color: rgba(255, 255, 255, 0.1);
    margin: 2rem 0 1rem;
  }

  .footer-contact {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      color: $text-light;
    }
  }

  .footer-hours {
    list-style: none;
    padding: 0;
    color: $text-light;
  }

  .footer-links {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: $text-light;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
