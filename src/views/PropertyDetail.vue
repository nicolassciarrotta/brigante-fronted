<template>
  <div class="property-detail">
    <loading ref="loading" />
    <div class="main-container">
      <div class="container">
        <b-breadcrumb class="mb-5 mt-3">
          <b-breadcrumb-item tag="router-link" to="/">Inicio</b-breadcrumb-item>
          <b-breadcrumb-item tag="router-link" to="/properties">Propiedades</b-breadcrumb-item>
          <b-breadcrumb-item active>{{ property.title || 'Cargando...' }}</b-breadcrumb-item>
        </b-breadcrumb>

        <div class="columns">
          <div class="column is-8">
            <div class="image-gallery">
              <figure class="image is-16by9 main-image mb-4">
                <img :src="mainImage" :alt="property.title || 'Property'" loading="lazy">
              </figure>
              
              <div class="thumbnail-gallery" v-if="propertyImages.length > 1">
                <div class="columns is-mobile is-multiline">
                  <div 
                    v-for="(image, index) in propertyImages" 
                    :key="index"
                    class="column is-one-fifth-desktop is-one-third-mobile"
                  >
                    <figure 
                      class="image is-4by3 thumbnail"
                      :class="{ 'is-active': mainImage === getImageUrl(image) }"
                      @click="mainImage = getImageUrl(image)"
                    >
                      <img :src="getImageUrl(image)" :alt="`${property.title} - Image ${index + 1}`" loading="lazy">
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            <div class="box mt-5" v-if="property.description">
              <h2 class="title is-4">Descripción</h2>
              <div class="content">
                <p>{{ property.description }}</p>
              </div>
            </div>

            <div class="box" v-if="amenitiesList.length > 0 || hasMainFeatures">
              <h2 class="title is-4">Características</h2>
              <div class="columns is-multiline">
                <div class="column is-6" v-if="property.has_pool">
                  <div class="feature-item">
                    <b-icon icon="person-swimming" type="is-success" size="is-small" />
                    <span class="ml-2">Piscina</span>
                  </div>
                </div>
                <div class="column is-6" v-if="property.has_garden">
                  <div class="feature-item">
                    <b-icon icon="tree" type="is-success" size="is-small" />
                    <span class="ml-2">Jardín</span>
                  </div>
                </div>
                <div class="column is-6" v-if="property.has_garage">
                  <div class="feature-item">
                    <b-icon icon="warehouse" type="is-success" size="is-small" />
                    <span class="ml-2">Garage</span>
                  </div>
                </div>
                <div class="column is-6" v-if="property.has_security">
                  <div class="feature-item">
                    <b-icon icon="shield" type="is-success" size="is-small" />
                    <span class="ml-2">Seguridad</span>
                  </div>
                </div>
                <div class="column is-6" v-if="property.furnished">
                  <div class="feature-item">
                    <b-icon icon="couch" type="is-success" size="is-small" />
                    <span class="ml-2">Amueblado</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="box">
              <h2 class="title is-4">Comodidades</h2>
              <div class="columns is-multiline">
                <div 
                  v-for="(amenity, index) in amenitiesList" 
                  :key="index"
                  class="column is-6"
                >
                  <div class="feature-item">
                    <b-icon icon="check-circle" type="is-success" size="is-small" />
                    <span class="ml-2">{{ amenity }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="box">
              <h2 class="title is-4">Ubicación</h2>
              <p class="mb-3 has-text-weight-semibold">
                <b-icon icon="map-marker" size="is-small" />
                {{ property.address }}, {{ property.city }}, {{ property.state }}
              </p>
              <div class="map-container" v-if="mapEmbedUrl">
                <iframe
                  :src="mapEmbedUrl"
                  width="100%"
                  height="400"
                  style="border:0; border-radius: 0.5rem;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div class="map-placeholder" v-else>
                <p class="has-text-centered has-text-grey">
                  <b-icon icon="map-marker" size="is-large" />
                  <br>
                  Ubicación no disponible
                </p>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <div class="box property-info sticky-sidebar">
              <h1 class="title is-3">{{ property.title }}</h1>
              <p class="subtitle is-5 has-text-grey">
                <b-icon icon="map-marker" size="is-small" />
                {{ property.city }}, {{ property.state }}
              </p>
              
              <p class="price-tag has-text-primary has-text-weight-bold is-size-2 mb-5">
                {{ property.currency }} ${{ formatPrice(property.price) }}
              </p>
              
              <b-tag 
                :type="getStatusColor(property.status)" 
                size="is-medium"
                class="mb-4"
              >
                {{ getStatusLabel(property.status) }}
              </b-tag>

              <div class="property-stats mb-5">
                <div class="level is-mobile">
                  <div class="level-item has-text-centered" v-if="property.bedrooms">
                    <div>
                      <p class="heading">Dormitorios</p>
                      <p class="title is-4">{{ property.bedrooms }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered" v-if="property.bathrooms">
                    <div>
                      <p class="heading">Baños</p>
                      <p class="title is-4">{{ property.bathrooms }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered" v-if="property.total_area">
                    <div>
                      <p class="heading">m²</p>
                      <p class="title is-4">{{ property.total_area }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr>

              <div class="property-details mb-5">
                <div class="detail-row">
                  <span class="has-text-grey">Tipo de Propiedad:</span>
                  <span class="has-text-weight-bold">{{ getPropertyTypeLabel(property.type) }}</span>
                </div>
                <div class="detail-row">
                  <span class="has-text-grey">Operación:</span>
                  <span class="has-text-weight-bold">{{ getOperationLabel(property.operation) }}</span>
                </div>
                <div class="detail-row" v-if="property.year_built">
                  <span class="has-text-grey">Año de Construcción:</span>
                  <span class="has-text-weight-bold">{{ property.year_built }}</span>
                </div>
                <div class="detail-row" v-if="property.parking_spaces">
                  <span class="has-text-grey">Estacionamiento:</span>
                  <span class="has-text-weight-bold">{{ property.parking_spaces }} espacios</span>
                </div>
                <div class="detail-row" v-if="property.floors">
                  <span class="has-text-grey">Pisos:</span>
                  <span class="has-text-weight-bold">{{ property.floors }}</span>
                </div>
                <div class="detail-row" v-if="property.built_area">
                  <span class="has-text-grey">Área Construida:</span>
                  <span class="has-text-weight-bold">{{ property.built_area }}m²</span>
                </div>
              </div>

              <hr>

              <!-- Agent Info -->
              <!-- <div class="agent-info mb-5">
                <h3 class="title is-6">Publicado por</h3>
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img class="is-rounded" src="@/assets/images/eb.png" alt="Agente">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="has-text-weight-bold">Estudio Brigante</p>
                    <p class="has-text-grey is-size-7">Inmobiliaria</p>
                  </div>
                </div>
              </div> -->

              <b-button 
                type="is-success" 
                size="is-medium"
                expanded
                @click="openWhatsApp"
                class="whatsapp-button"
              >
                <span class="button-content">
                  <span class="icon">
                    <vue-fontawesome :icon="['fab', 'whatsapp']" />
                  </span>
                  <span>Consultar por WhatsApp</span>
                </span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="isContactModalActive" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Contactar Agente</p>
          <button type="button" class="trash" @click="isContactModalActive = false" />
        </header>
        <section class="modal-card-body">
          <b-field label="Tu Nombre">
            <b-input v-model="contactForm.name" required />
          </b-field>
          <b-field label="Email">
            <b-input v-model="contactForm.email" type="email" required />
          </b-field>
          <b-field label="Teléfono">
            <b-input v-model="contactForm.phone" type="tel" />
          </b-field>
          <b-field label="Mensaje">
            <b-input 
              v-model="contactForm.message" 
              type="textarea" 
              rows="5"
              placeholder="Estoy interesado en esta propiedad..."
            />
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="isContactModalActive = false">Cancelar</b-button>
          <b-button type="is-primary" @click="sendMessage">Enviar Mensaje</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Loading from '@/components/LoadingComponent.vue'

export default {
  name: 'PropertyDetail',
  components: {
    Loading
  },
  data() {
    return {
      mainImage: '',
      isContactModalActive: false,
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      defaultImage: 'https://www.argentina.gob.ar/sites/default/files/0l3a8806_1.jpg'
    }
  },
  computed: {
    property() {
      return this.$store.getters['Properties/property'] || {};
    },
    propertyImages() {
      // Las imágenes vienen dentro de property.images
      return this.property.images || [];
    },
    amenitiesList() {
      if (!this.property.amenities) return [];
      try {
        return typeof this.property.amenities === 'string' 
          ? JSON.parse(this.property.amenities) 
          : this.property.amenities;
      } catch (e) {
        return [];
      }
    },
    hasMainFeatures() {
      return this.property.has_pool || this.property.has_garden || 
             this.property.has_garage || this.property.has_security || 
             this.property.furnished;
    },
    mapEmbedUrl() {
      if (!this.property.address || !this.property.city) return null;
      
      const query = encodeURIComponent(`${this.property.address}, ${this.property.city}, ${this.property.state}, Argentina`);
      return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
  },
  async mounted() {
    await this.fetchPropertyData();
  },
  methods: {
    openWhatsApp() {
      const phone = '5492346532089';
      const message = encodeURIComponent(
        `Hola, estoy interesado en la propiedad: ${this.property.title}\n` +
        `Precio: ${this.property.currency} ${this.formatPrice(this.property.price)}\n` +
        `Link: ${window.location.href}`
      );
      window.open(`https://wa.me/${phone}?text=${message}`);
    },
    async fetchPropertyData() {
      try {
        this.$refs.loading.show();
        const propertyId = this.$route.params.id;

        await this.$store.dispatch('Properties/fetchProperty', { id: propertyId });

        if (this.propertyImages.length > 0) {
          const mainImage = this.propertyImages.find(img => img.is_main);
          this.mainImage = mainImage 
            ? this.getImageUrl(mainImage) 
            : this.getImageUrl(this.propertyImages[0]);
        } else {
          this.mainImage = this.defaultImage;
        }
        
        this.$refs.loading.hide();
      } catch (err) {
        console.error('Error fetching property data:', err);
        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: 'Error al cargar la propiedad',
          type: 'is-danger'
        });
      }
    },
    getImageUrl(image) {
      if (!image) return this.defaultImage;
      if (typeof image === 'string') return image;

      if (image.path) {
        const url = process.env.VUE_APP_HOST_API;
        return `${url}storage/${image.path}`;
      }
      
      return image.image_url || image.url || this.defaultImage;
    },
    getStatusColor(status) {
      const colors = {
        'available': 'is-success',
        'pending': 'is-warning',
        'sold': 'is-danger',
        'rented': 'is-info'
      };
      return colors[status] || 'is-light';
    },
    getStatusLabel(status) {
      const labels = {
        'available': 'Disponible',
        'pending': 'Pendiente',
        'sold': 'Vendida',
        'rented': 'Alquilada'
      };
      return labels[status] || status;
    },
    getPropertyTypeLabel(type) {
      const labels = {
        'apartament': 'Departamento',
        'home': 'Casa',
        'land': 'Terreno',
        'local': 'Local',
        'office': 'Oficina'
      };
      return labels[type] || type;
    },
    getOperationLabel(operation) {
      const labels = {
        'sale': 'Venta',
        'rent': 'Alquiler'
      };
      return labels[operation] || operation;
    },
    formatPrice(price) {
      if (!price) return '0';
      return Number(price).toLocaleString();
    },
    showContactModal() {
      this.isContactModalActive = true;
    },
    showScheduleModal() {
      this.$buefy.toast.open({
        message: 'Funcionalidad de agendar visita próximamente',
        type: 'is-info'
      });
    },
    sendMessage() {
      this.$buefy.toast.open({
        message: 'Mensaje enviado exitosamente',
        type: 'is-success'
      });
      this.isContactModalActive = false;
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.property-detail {
  min-height: 100vh;
  background-color: $background-light;
}

.main-container {
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.main-image {
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
}

.thumbnail-gallery {
  .thumbnail {
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s;
    
    &:hover {
      border-color: $primary;
    }
    
    &.is-active {
      border-color: $primary;
    }
  }
}

.property-info {
  border-radius: 0.75rem;
  
  .price-tag {
    color: $primary;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
}

.sticky-sidebar {
  position: sticky;
  top: 5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.map-placeholder {
  height: 300px;
  background-color: $neutral-light;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whatsapp-button {
  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
  }
}
</style>
