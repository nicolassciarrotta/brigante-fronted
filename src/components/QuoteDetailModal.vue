<template>
  <b-modal :active="isActive" :width="800" scroll="keep" @close="$emit('close')">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Detalle de Cotización #{{ quote.id }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-6">
            <h4 class="title is-5">Información del Cliente</h4>
            <div class="field">
              <label class="label">Nombre Completo</label>
              <p>{{ quote.fullname }}</p>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <p>{{ quote.email }}</p>
            </div>
            <div class="field">
              <label class="label">Teléfono</label>
              <p>{{ quote.phone }}</p>
            </div>
            <div class="field">
              <label class="label">Disponibilidad</label>
              <p>{{ quote.availability }}</p>
            </div>
          </div>
          <div class="column is-6">
            <h4 class="title is-5">Información del Seguro</h4>
            <div class="field">
              <label class="label">Tipo de Seguro</label>
              <b-tag :type="getSecureTypeColor(quote.secureType)">
                {{ quote.secureType }}
              </b-tag>
            </div>
            <div class="field" v-if="quote.brand">
              <label class="label">Marca</label>
              <p>{{ quote.brand }}</p>
            </div>
            <div class="field" v-if="quote.model">
              <label class="label">Modelo</label>
              <p>{{ quote.model }}</p>
            </div>
            <div class="field" v-if="quote.year">
              <label class="label">Año</label>
              <p>{{ quote.year }}</p>
            </div>
            <div class="field">
              <label class="label">Fecha de Solicitud</label>
              <p>{{ formatDate(quote.created_at) }}</p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-success" @click="contactClient">
          Contactar por WhatsApp
        </b-button>
        <b-button type="is-info" @click="sendEmail">
          Enviar Email
        </b-button>
        <b-button @click="$emit('close')">Cerrar</b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'QuoteDetailModal',
  props: {
    quote: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    contactClient() {
      // Same logic as in QuotesListing
      const phone = this.quote.phone.replace(/\D/g, '');
      const formattedPhone = phone.startsWith('54') ? phone : `549${phone}`;
      
      const message = encodeURIComponent(
        `Hola ${this.quote.fullname}! 👋\n\n` +
        `Soy de Estudio Brigante y recibimos tu solicitud de cotización para el seguro de ${this.quote.secureType}.\n\n` +
        `📋 *Datos recibidos:*\n` +
        `• Vehículo: ${this.quote.brand} ${this.quote.model} (${this.quote.year})\n` +
        `• Disponibilidad: ${this.quote.availability}\n\n` +
        `Nos pondremos en contacto contigo para brindarte la mejor cotización. ¿Hay algún detalle adicional que te gustaría agregar?\n\n` +
        `¡Gracias por confiar en nosotros! 🤝`
      );
      
      window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
    },

    sendEmail() {
      const subject = encodeURIComponent(`Cotización de ${this.quote.secureType} - Estudio Brigante`);
      const body = encodeURIComponent(
        `Estimado/a ${this.quote.fullname},\n\n` +
        `Gracias por contactarnos para solicitar una cotización de seguro de ${this.quote.secureType}.\n\n` +
        `Hemos recibido la siguiente información:\n` +
        `- Vehículo: ${this.quote.brand} ${this.quote.model} (${this.quote.year})\n` +
        `- Teléfono: ${this.quote.phone}\n` +
        `- Disponibilidad: ${this.quote.availability}\n\n` +
        `En breve nos pondremos en contacto con usted para brindarle la mejor cotización.\n\n` +
        `Saludos cordiales,\n` +
        `Equipo Estudio Brigante`
      );
      
      window.location.href = `mailto:${this.quote.email}?subject=${subject}&body=${body}`;
    },

    getSecureTypeColor(secureType) {
      const colors = {
        'Automotores': 'is-primary',
        'Motovehículos': 'is-info',
        'Hogar': 'is-success',
        'Comercio': 'is-warning',
        'Vida y Retiro': 'is-danger',
      };
      return colors[secureType] || 'is-light';
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>