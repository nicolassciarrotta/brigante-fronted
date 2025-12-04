<template>
  <div class="maintenance-container">
    <div class="maintenance-content">
      <div class="maintenance-card">
        <b-icon 
          icon="tools" 
          size="is-large" 
          class="maintenance-icon has-text-light"
        ></b-icon>
        
        <h1 class="title is-2 has-text-white mb-4">
          Sitio en Mantenimiento
        </h1>
        
        <p class="subtitle is-4 has-text-white-bis mb-5">
          Estamos trabajando para mejorar tu experiencia.
        </p>
        
        <div class="notification is-info is-light">
          <b-icon icon="clock" class="mr-2"></b-icon>
          <span>Volveremos pronto</span>
        </div>

      </div>
    </div>

    <div class="particles">
      <div class="particle" v-for="n in 84" :key="n"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceView',
  methods: {
    goHome() {
      this.$router.push('/');
    },
    contactSupport() {
      this.$buefy.toast.open({
        message: 'Función de contacto disponible próximamente',
        type: 'is-info'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/global';

.maintenance-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.maintenance-content {
  max-width: 700px;
  width: 100%;
  z-index: 2;
  position: relative;
}

.maintenance-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.maintenance-icon {
  font-size: 4rem !important;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1;
  }
  50% { 
    transform: scale(1.1); 
    opacity: 0.8;
  }
}

.notification {
  border-radius: 12px;
  border: none;
  font-weight: 500;
}

.maintenance-progress {
  .progress {
    border-radius: 10px;
    height: 12px;
  }
}

.maintenance-actions {
  .button {
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  }
}

// Floating particles animation
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  
  // Generar posiciones para 12 partículas automáticamente
  @for $i from 1 through 84 {
    &:nth-child(#{$i}) {
      top: random(80) + 10 + %;
      left: random(80) + 10 + %;
      animation-delay: ($i - 1) * 0.5s;
      
      // Algunas partículas usan 'right' en lugar de 'left' para mejor distribución
      @if $i % 3 == 0 {
        left: auto;
        right: random(30) + 10 + %;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

// Responsive design
@media (max-width: 768px) {
  .maintenance-card {
    padding: 2rem 1.5rem;
  }
  
  .maintenance-actions .button {
    margin: 0.5rem 0;
    width: 100%;
    
    &.ml-3 {
      margin-left: 0 !important;
    }
  }
  
  .title {
    font-size: 2rem !important;
  }
}
</style>