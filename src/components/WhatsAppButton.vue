<template>
  <div class="whatsapp-button" @click="openWhatsApp">
    <b-icon 
      icon="whatsapp" 
      pack="fab" 
      size="is-medium"
      class="whatsapp-icon"
    />
  </div>
</template>

<script>
export default {
  name: 'WhatsAppButton',
  props: {
    phoneNumber: {
      type: String,
      default: '+542346532089'
    },
    message: {
      type: String,
      default: 'Hola! Me interesa conocer más sobre sus servicios.'
    }
  },
  methods: {
    openWhatsApp() {
      const encodedMessage = encodeURIComponent(this.message);
      const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.whatsapp-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #25D366;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
  }
  
  .whatsapp-icon {
    color: white !important;
    font-size: 1.8rem !important;
  }
  
  // Animación de pulso
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid #25D366;
    border-radius: 50%;
    animation: pulse 2s infinite;
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    
    .whatsapp-icon {
      font-size: 1.5rem !important;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
</style>