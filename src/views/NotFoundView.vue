<template>
  <div class="not-found">
    <div class="container">
      <div class="content-wrapper">
        <!-- Animación del 404 -->
        <div class="error-number">
          <span class="four">4</span>
          <span class="zero">0</span>
          <span class="four">4</span>
        </div>
        
        <!-- Mensaje principal -->
        <div class="error-message">
          <h1 class="title is-2 has-text-white">
            ¡Oops! Página no encontrada
          </h1>
          <p class="subtitle is-5 has-text-white-bis">
            La página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        
        <!-- Ilustración -->
        <div class="illustration">
          <div class="house-icon">
            <b-icon 
              icon="home-variant-outline" 
              size="is-large"
              custom-class="floating-icon"
            />
          </div>
        </div>

        <!-- Enlaces útiles -->
        <div class="useful-links">
          <h3 class="title is-5 has-text-white">
            Enlaces útiles:
          </h3>
          <div class="links-grid">
            <router-link to="/" class="useful-link">
              <b-icon icon="home" size="is-small" />
              <span>Inicio</span>
            </router-link>
            
            <router-link to="/insurance" class="useful-link">
              <b-icon icon="shield" size="is-small" />
              <span>Seguros</span>
            </router-link>
            
            <router-link to="/properties" class="useful-link">
              <b-icon icon="home" size="is-small" />
              <span>Propiedades</span>
            </router-link>

          </div>
        </div>
        
        <!-- Información de contacto -->
        <div class="contact-info">
          <p class="has-text-white-bis">
            ¿Necesitas ayuda? Contáctanos:
          </p>
          <div class="contact-methods">
            <a href="tel:+5492346532089" class="contact-method">
              <b-icon icon="phone" size="is-small" />
              <span>(02346) 53-2089</span>
            </a>
            
            <a href="mailto:info@estudiobrigante.com.ar" class="contact-method">
              <b-icon icon="email" size="is-small" />
              <span>info@estudiobrigante.com.ar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Partículas de fondo -->
    <div class="background-particles">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    // Cambiar el título de la página
    document.title = '404 - Página no encontrada | Estudio Brigante';
  },
  beforeDestroy() {
    // Restaurar el título original
    document.title = 'Estudio Brigante';
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    
    goBack() {
      // Si hay historial, volver atrás, sino ir al inicio
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    
    goToInsurance() {
      this.$router.push('/insurance');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.not-found {
  min-height: 100vh;
  background: linear-gradient(135deg, $primary 0%, darken($primary, 20%) 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  .container {
    position: relative;
    z-index: 2;
  }
  
  .content-wrapper {
    text-align: center;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
}

// Número 404 animado
.error-number {
  font-size: 8rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
  margin-bottom: 2rem;
  
  .four, .zero {
    display: inline-block;
    animation: bounce 2s ease-in-out infinite;
  }
  
  .four:first-child {
    animation-delay: 0s;
  }
  
  .zero {
    animation-delay: 0.2s;
  }
  
  .four:last-child {
    animation-delay: 0.4s;
  }
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

// Mensaje de error
.error-message {
  margin-bottom: 3rem;
  
  .title {
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem !important;
    }
  }
  
  .subtitle {
    @media (max-width: 768px) {
      font-size: 1rem !important;
    }
  }
}

// Ilustración
.illustration {
  margin-bottom: 3rem;
  
  .house-icon {
    .floating-icon {
      color: rgba(255, 255, 255, 0.7);
      font-size: 4rem;
      animation: float 3s ease-in-out infinite;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

// Botones de acción
.action-buttons {
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    .button {
      margin: 0 !important;
      margin-bottom: 0.5rem !important;
    }
  }
}

// Enlaces útiles
.useful-links {
  margin-bottom: 3rem;
  
  .title {
    margin-bottom: 1.5rem;
  }
  
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .useful-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    .icon {
      margin-right: 0.5rem;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      color: white;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      padding: 0.75rem 0.5rem;
      font-size: 0.875rem;
    }
  }
}

// Información de contacto
.contact-info {
  text-align: center;
  
  .contact-methods {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  .contact-method {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    
    .icon {
      margin-right: 0.5rem;
    }
    
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
}

// Partículas de fondo
.background-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  
  .particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float-particles 15s infinite linear;
    
    &:nth-child(odd) {
      width: 10px;
      height: 10px;
    }
    
    &:nth-child(even) {
      width: 6px;
      height: 6px;
    }
    
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        left: random(100) + %;
        animation-delay: random(15) + s;
        animation-duration: (10 + random(20)) + s;
      }
    }
  }
}

@keyframes float-particles {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>