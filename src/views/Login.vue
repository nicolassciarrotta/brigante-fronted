<template>
  <div class="login-page">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop">
              <div class="box login-box">
                <div class="has-text-centered mb-5">
                  <b-icon icon="shield-account" size="is-large" custom-class="has-text-primary" />
                  <h1 class="title is-3 mt-3">Iniciar Sesión</h1>
                  <p class="subtitle is-6 has-text-grey">Panel de Administración</p>
                </div>

                <form @submit.prevent="handleLogin">
                  <b-field label="Email">
                    <b-input
                      v-model="form.email"
                      type="email"
                      placeholder="admin@realtyco.com"
                      icon="envelope"
                      required
                    />
                  </b-field>

                  <b-field label="Contraseña">
                    <b-input
                      v-model="form.password"
                      type="password"
                      placeholder="••••••••"
                      icon="lock"
                      password-reveal
                      required
                    />
                  </b-field>

                  <b-button
                    type="is-primary"
                    native-type="submit"
                    expanded
                    size="is-medium"
                    :loading="isLoading"
                    class="mt-4"
                  >
                    Ingresar
                  </b-button>
                </form>

                <div class="has-text-centered mt-4">
                  <a @click="forgotPassword" class="has-text-grey">¿Olvidaste tu contraseña?</a>
                </div>

                <hr>  

                <div class="has-text-centered">
                  <p class="has-text-grey is-size-7">
                    <router-link to="/home" class="has-text-primary">
                      <b-icon icon="arrow-left" size="is-small" />
                      Volver al inicio
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true

      try {
        if (!this.form.email || !this.form.password) {
          this.$buefy.toast.open({
            message: 'Por favor completa todos los campos',
            type: 'is-warning'
          })
          return
        }

        await this.$store.dispatch("Auth/login", {
          email: this.form.email,
          password: this.form.password
        });

        this.$buefy.toast.open({
          message: '¡Bienvenido de vuelta!',
          type: 'is-success'
        });
        this.$router.push('/admin/dashboard');
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Error al iniciar sesión',
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    },
    forgotPassword() {
      this.$buefy.dialog.alert({
        title: 'Recuperar Contraseña',
        message: 'Por favor contacta al administrador del sistema.',
        confirmText: 'Entendido'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, $background-light 0%, lighten($primary, 45%) 100%);
}

.login-box {
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  
  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
}

.hero-body {
  display: flex;
  align-items: center;
}

::v-deep .field {
  margin-bottom: 1.25rem;
  
  .label {
    color: $neutral-dark;
    font-weight: 600;
  }
}

a {
  transition: color 0.2s;
  
  &:hover {
    color: $primary !important;
  }
}
</style>
