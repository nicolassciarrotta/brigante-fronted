<template>
  <div class="landing-page">
    <section class="hero is-large hero-gradient">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1-desktop is-2-mobile has-text-white">
            Soluciones Integrales para acompañar cada <b>decisión importante</b>
          </h1>
        </div>
      </div>
    </section>

    <section class="section py-6">
      <div class="container">
        <div class="has-text-centered mb-6">
          <h2 class="title is-2">Nuestros Servicios</h2>
        </div>

        <div class="columns is-multiline">
          <div
            v-for="service in services"
            :key="service.id"
            class="column is-3"
          >
            <div class="card service-card">
              <div class="card-content has-text-centered">
                <div class="service-icon mb-4">
                  <b-icon
                    :icon="service.icon"
                    size="is-large"
                    custom-class="has-text-primary"
                  />
                </div>
                <h3 class="title is-4">{{ service.title }}</h3>
                <p class="has-text-grey">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section stats-section">
      <div class="container">
        <div class="columns is-multiline is-justify-content-space-between">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="column is-3 has-text-centered"
          >
            <div class="stat-item">
              <p class="title is-1 has-text-primary">
                {{ stat.suffix }}
                <count-to
                  :start-val="0"
                  :end-val="stat.value"
                  :duration="2000"
                  :decimals="0"
                ></count-to>
              </p>
              <p class="subtitle is-5 has-text-grey">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about-us" class="section about-section">
      <div class="container">
        <div class="has-text-centered mb-6">
          <h2 class="title is-2">Quiénes Somos</h2>
        </div>

        <div class="has-text-centered mb-5">
          <p>
            Somos una empresa fundada en 2009, dedicada a brindar servicios
            integrales en Seguros, Gestoría, Inmobiliaria e Inversiones.
          </p>
          <br />
          <p>
            Trabajamos junto a particulares, PyMEs y grandes empresas,
            ofreciendo una atención personalizada según las necesidades de cada
            cliente.
          </p>
          <br />
          <p>
            Nuestro objetivo es brindar un asesoramiento profesional y completo,
            donde cada persona encuentre soluciones ágiles, claras y eficientes.
            Aspiramos a ser referentes a nivel local, ofreciendo y
            comercializando productos y servicios de alta calidad.
          </p>
          <br />
          <p>
            Sostenemos nuestro trabajo con capacitación constante, para
            garantizar un servicio actualizado, confiable y orientado a
            resultados.
          </p>
        </div>

        <div class="has-text-centered mb-5 mt-6">
          <h3 class="title is-4">Nuestros Valores</h3>
          <div class="title-underline mx-auto"></div>
        </div>

        <div class="columns is-multiline values-grid">
          <div class="column is-3-desktop is-6-tablet">
            <div class="value-card">
              <div class="value-icon-wrapper mb-3">
                <b-icon icon="heart" size="is-large" type="is-primary" />
              </div>
              <h4 class="title is-6 has-text-primary mb-3">Respeto</h4>
              <p class="has-text-grey is-size-7">
                Base fundamental de todas nuestras relaciones. Promovemos un
                ambiente de cordialidad, escucha y seguridad, donde cada persona
                se siente valorada.
              </p>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="value-card">
              <div class="value-icon-wrapper mb-3">
                <b-icon icon="shield" size="is-large" type="is-primary" />
              </div>
              <h4 class="title is-6 has-text-primary mb-3">Responsabilidad</h4>
              <p class="has-text-grey is-size-7">
                Cumplimos nuestras obligaciones, acuerdos y compromisos con
                excelencia, garantizando resultados confiables y sostenidos en
                el tiempo.
              </p>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="value-card">
              <div class="value-icon-wrapper mb-3">
                <b-icon icon="certificate" size="is-large" type="is-primary" />
              </div>
              <h4 class="title is-6 has-text-primary mb-3">Honestidad</h4>
              <p class="has-text-grey is-size-7">
                Actuamos con transparencia, sinceridad y coherencia en cada
                decisión y acción, generando confianza real en nuestro trabajo.
              </p>
            </div>
          </div>

          <div class="column is-3-desktop is-6-tablet">
            <div class="value-card">
              <div class="value-icon-wrapper mb-3">
                <b-icon icon="handshake" size="is-large" type="is-primary" />
              </div>
              <h4 class="title is-6 has-text-primary mb-3">Confianza</h4>
              <p class="has-text-grey is-size-7">
                Nuestra trayectoria respalda la capacidad de responder y
                acompañar, ofreciendo seguridad y compromiso en cada proceso.
              </p>
            </div>
          </div>
        </div>

        <div class="has-text-centered mb-6" v-if="showTeamSection">
          <h3 class="title is-3">Nuestro Equipo</h3>
          <p class="subtitle is-6 has-text-grey">
            Conoce a los profesionales que hacen posible nuestro servicio
          </p>
        </div>

        <div class="columns is-multiline team-members" v-if="showTeamSection">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="column is-3"
          >
            <div class="team-member">
              <div class="member-avatar">
                <figure class="image">
                  <img
                    :src="require(`@/assets/images/team/${member.image}`)"
                    :alt="member.name"
                    loading="lazy"
                  />
                </figure>
              </div>
              <div class="member-info has-text-centered">
                <p class="title is-5">{{ member.name }}</p>
                <p class="subtitle is-6 has-text-primary">
                  {{ member.position }} 
                  <br v-if="member.secondPosition">
                  <span v-if="member.secondPosition">{{ member.secondPosition }}</span>
                </p>
                <p class="subtitle is-6 has-text-primary">
                  {{ member.extra }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="box cta-box">
          <div class="has-text-centered">
            <h2 class="title is-2 has-text-white">Quiero asesoramiento</h2>
            <b-button
              type="is-light"
              size="is-medium"
              @click="sendWhatsAppMessage()"
            >
              Comunicarme con un asesor
            </b-button>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
    <div class="container">
      <div class="has-text-centered mb-6">
        <h2 class="title is-2">Contáctanos</h2>
        <p class="subtitle is-5 has-text-grey">
          Estamos aquí para ayudarte con todas tus consultas
        </p>
      </div>

      <div class="columns is-multiline">
        <div class="column is-12-mobile is-6-desktop">
          <div class="box">
            <b-field 
              label="Nombre"
              :type="errors.name ? 'is-danger' : ''"
              :message="errors.name"
            >
              <b-input 
                v-model="contactForm.name"
                placeholder="Tu nombre"
                :class="{ 'is-danger': errors.name }"
                @blur="validateField('name')"
              />
            </b-field>

            <b-field 
              label="Email"
              :type="errors.email ? 'is-danger' : ''"
              :message="errors.email"
            >
              <b-input 
                v-model="contactForm.email"
                type="email" 
                placeholder="tu@email.com"
                :class="{ 'is-danger': errors.email }"
                @blur="validateField('email')"
              />
            </b-field>

            <b-field 
              label="Teléfono"
              :type="errors.phone ? 'is-danger' : ''"
              :message="errors.phone"
            >
              <b-input 
                v-model="contactForm.phone"
                type="tel" 
                placeholder="(555) 123-4567"
                :class="{ 'is-danger': errors.phone }"
                @blur="validateField('phone')"
              />
            </b-field>

            <b-field 
              label="Mensaje"
              :type="errors.message ? 'is-danger' : ''"
              :message="errors.message"
            >
              <b-input
                v-model="contactForm.message"
                type="textarea"
                rows="5"
                placeholder="¿Cómo podemos ayudarte?"
                :class="{ 'is-danger': errors.message }"
                @blur="validateField('message')"
              />
            </b-field>

            <b-button 
              type="is-primary" 
              expanded 
              size="is-small" 
              @click="sendContactMessage"
              :loading="isSubmitting"
              :disabled="!isFormValid || isSubmitting"
            >
              Enviar Mensaje
            </b-button>
          </div>
        </div>

          <div class="column is-12-mobile is-6-desktop">
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3271.9414824369496!2d-60.03296999999999!3d-34.907918!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bebace18ffffd7%3A0xa2fd77d16318931a!2sAv.%20Diario%20la%20Raz%C3%B3n%2041%2C%20B6620%20Chivilcoy%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sus!4v1764552034195!5m2!1ses!2sus"
                width="100%"
                height="100%"
                style="border: 0; border-radius: 6px"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  name: "LandingPage",
  components: {
    CountTo,
  },
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      isSubmitting: false,
      showTeamSection: true,
      services: [
        {
          id: 1,
          title: "Seguros",
          icon: "shield",
          description:
            "Asesoramos a particulares y empresas en coberturas de seguros y Análisis de Riesgos, con el respaldo de Compañías Líderes del Mercado Asegurador.",
        },
        {
          id: 2,
          title: "Gestoría",
          icon: "newspaper",
          description:
            "Gestionamos trámites ante diversos registros, con atención profesional y procesos ágiles, y acompañamiento claro en cada gestión.",
        },
        {
          id: 3,
          title: "Inmobiliaria",
          icon: "home",
          description:
            "Acompañamos tus decisiones inmobiliarias con análisis profesional, y transparencia en cada operación.",
        },
        {
          id: 4,
          title: "Inversiones",
          icon: "chart-line",
          description:
            "Soluciones profesionales para Empresas en Inversiones, Financiamiento PYME, y acceso al Mercado de Capitales. ",
        },
      ],
      stats: [
        { id: 1, value: 15, suffix: "+", label: "Años de trayectoria" },
        { id: 2, value: 2000, suffix: "+", label: "Clientes satisfechos" },
        { id: 3, value: 20, suffix: "+", label: "Alianzas estratégicas" },
      ],
      teamMembers: [
        {
          id: 1,
          name: "Emmanuel Brigante",
          position: "Asesor de Seguros",
          secondPosition: 'Martillero y Corredor Público',
          image: "brigante.jpeg",
        },
        {
          id: 2,
          name: "Fátima Dorado",
          position: "Asesora de Seguros",
          extra: 'Cobranza - Siniestros',
          image: "dorado.jpeg",
        },
        {
          id: 3,
          name: "Maximiliano Di Nisio",
          position: "Asesor de Seguros",
          extra: 'CABA',
          image: "dinisio.jpeg",
        },
        {
          id: 4,
          name: "María José Viñales",
          position: "Asesora de Seguros",
          extra: 'Alberti, Bs. As.',
          image: "vinales.jpeg",
        },
        {
          id: 5,
          name: "Santiago Astegiano Eismendi",
          position: "Asesor de Seguros",
          extra: "Carmen de Areco, Bs. As.",
          image: "astegiano.jpg",
        },
        {
          id: 6,
          name: "Alejandra Caruso",
          position: "Asesora de Seguros",
          extra: "Chivilcoy, Bs. As.",
          image: "caruso.jpg",
        },
        {
          id: 7,
          name: "Claudia Carona",
          position: "Asesora de Seguros",
          extra: "25 de Mayo, Bs. As.",
          image: "carona.png",
        },
        {
          id: 8,
          name: "Florencia Gómez",
          position: "Asesora de Seguros",
          extra: "San Nicolás, Bs. As.",
          image: "gomez.jpg",
        },
        {
          id: 9,
          name: "Ana Camila Oliva",
          position: "Asesora de Seguros",
          extra: "Chivilcoy, Bs. As.",
          image: "oliva.png",
        }
      ],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.contactForm.name.trim() !== '' &&
        this.contactForm.email.trim() !== '' &&
        this.contactForm.message.trim() !== '' &&
        !Object.values(this.errors).some(error => error !== '')
      );
    }
  },
  methods: {
     validateField(fieldName) {
      this.errors[fieldName] = '';
      
      switch (fieldName) {
        case 'name':
          if (!this.contactForm.name.trim()) {
            this.errors.name = 'El nombre es requerido';
          } else if (this.contactForm.name.trim().length < 2) {
            this.errors.name = 'El nombre debe tener al menos 2 caracteres';
          } else if (this.contactForm.name.trim().length > 255) {
            this.errors.name = 'El nombre no puede exceder 255 caracteres';
          }
          break;
          
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.contactForm.email.trim()) {
            this.errors.email = 'El email es requerido';
          } else if (!emailRegex.test(this.contactForm.email)) {
            this.errors.email = 'Ingrese un email válido';
          } else if (this.contactForm.email.length > 255) {
            this.errors.email = 'El email no puede exceder 255 caracteres';
          }
          break;
          
        case 'phone':
          // Teléfono es opcional, pero si se ingresa debe ser válido
          if (this.contactForm.phone.trim()) {
            const phoneRegex = /^[\+]?[0-9\(\)\-\s]+$/;
            if (!phoneRegex.test(this.contactForm.phone)) {
              this.errors.phone = 'Ingrese un teléfono válido';
            }
          }
          break;
          
        case 'message':
          if (!this.contactForm.message.trim()) {
            this.errors.message = 'El mensaje es requerido';
          } else if (this.contactForm.message.trim().length < 10) {
            this.errors.message = 'El mensaje debe tener al menos 10 caracteres';
          } else if (this.contactForm.message.trim().length > 5000) {
            this.errors.message = 'El mensaje no puede exceder 5000 caracteres';
          }
          break;
      }
    },
    validateForm() {
      this.validateField('name');
      this.validateField('email');
      this.validateField('phone');
      this.validateField('message');
      
      return !Object.values(this.errors).some(error => error !== '');
    },
    sendWhatsAppMessage() {
      const phoneNumber = "5492346532089";
      const message = encodeURIComponent(
        "Hola, me gustaría recibir asesoramiento sobre sus servicios."
      );
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappURL);
    },
    async sendContactMessage() {
      if (!this.validateForm()) {
        this.$buefy.toast.open({
          message: 'Por favor corrija los errores en el formulario',
          type: 'is-warning',
          duration: 4000
        });
        return;
      }
      this.isSubmitting = true;
      await this.$store.dispatch('Message/sendMessage', {
        name: this.contactForm.name,
        email: this.contactForm.email,
        phone: this.contactForm.phone,
        message: this.contactForm.message
      }).then(() => {
        this.$buefy.toast.open({
          message: 'Mensaje enviado con éxito',
          type: 'is-success'
        });
        this.isSubmitting = false;
      }).catch((error) => {
        this.$buefy.toast.open({
          message: 'Error al enviar el mensaje',
          type: 'is-danger'
        });
        this.isSubmitting = false;
      }).finally(() => {
        this.isSubmitting = false;
        this.resetForm();
      });
    },

    resetForm() {
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      this.errors = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "@/assets/styles/_fonts.scss";

.team-members{
  justify-content: center !important;
}

.title.is-1-desktop.is-2-mobile.has-text-white {
  @media (max-width: 768px) {
    margin-top: 25px;
    font-size: 1.2rem !important;
  }
}
.landing-page {
  min-height: 100vh;
}

// Hero Section
.hero-gradient {
  background-image: url("https://images.unsplash.com/photo-1709787627975-9cb37bbeca60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .hero-body {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    background-position: center center;

    .container {
      padding: 1rem;
    }

    .title {
      line-height: 1.2;
      margin-bottom: 1rem !important;
    }

    .subtitle {
      line-height: 1.4;
    }

    .hero-cta-button {
      width: 100%;
      max-width: 280px;
    }
  }
}

// Service Cards
.service-card {
  height: 100%;
  border-radius: 0.75rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .service-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba($primary, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
}

// Stats Section
.stats-section {
  background-color: $neutral-light;

  .stat-item {
    padding: 2rem 0;

    p {
      font-family: $font-primary;
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    .stat-item {
      padding: 1rem 0;
      margin-bottom: 1rem;
    }
  }
}

// About Section
.about-section {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);

  .company-description-box {
    @media (max-width: 768px) {
      margin-bottom: 2rem;
      padding: 1.5rem;
    }
  }

  .team-card {
    height: 100%;
    border-radius: 0.75rem;
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      overflow: hidden;

      img {
        transition: transform 0.3s;
      }
    }

    &:hover .card-image img {
      transform: scale(1.05);
    }

    .social-links {
      a {
        color: $neutral-text;
        transition: color 0.2s;

        &:hover {
          color: $primary;
        }
      }
    }

    @media (max-width: 768px) {
      margin-bottom: 1.5rem;
    }
  }
}

// Title Underline
.title-underline {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, $primary 0%, $primary-light 100%);
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 2px;
}

// Value Cards
.values-grid {
  margin-top: 2rem;

  @media (max-width: 768px) {
    .column {
      margin-bottom: 1rem;
    }
  }
}

.value-card {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 10px;
  height: 100%;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    border-color: $primary;
    box-shadow: 0 8px 25px rgba($primary, 0.15);

    .value-icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }
  }

  .value-icon-wrapper {
    transition: all 0.3s ease;
    display: inline-block;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
}

// CTA Section
.cta-section {
  background-color: $background-light;

  .cta-box {
    background: linear-gradient(
      135deg,
      $primary 0%,
      darken($primary, 15%) 100%
    );
    padding: 4rem 2rem;
    border-radius: 1rem;

    @media (max-width: 768px) {
      padding: 2rem 1rem;

      .title {
        font-size: 1.75rem !important;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      .button {
        width: 100%;
        max-width: 300px;
      }
    }
  }
}

// Contact Section
.map-container {
  height: 100%;
  min-height: 450px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-height: 160px;
    margin-bottom: 2rem;
  }
}

#contact {
  @media (max-width: 768px) {
    .columns {
      margin: 0 !important;
    }

    .column {
      padding: 0.75rem;
    }

    .box {
      margin-bottom: 1rem;
    }
  }
}

// General Mobile Improvements
@media (max-width: 768px) {
  .section {
    padding: 2rem 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }

  .title {
    &.is-2 {
      font-size: 1.75rem;
    }
  }

  .subtitle {
    &.is-5 {
      font-size: 1.1rem;
    }
  }

  .columns {
    margin-left: 0;
    margin-right: 0;

    .column {
      padding: 0.75rem;
    }
  }
}
.team-member {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .member-avatar {
    margin-bottom: 1rem;
    position: relative;
    width: 120px;
    height: 120px;

    // Contenedor para el borde
    &::before {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      width: 126px;
      height: 126px;
      border-radius: 50%;
      background: conic-gradient(
        from 75deg,
        #2760a3 0deg,
        #2760a3 11deg,
        transparent 158deg,
        transparent 377deg
      );
      z-index: 1;
      transition: all 0.3s ease;
    }

    .image {
      width: 120px;
      height: 120px;
      margin: 0;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      z-index: 2;
      background: white;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
    }

    &:hover {
      &::before {
        background: conic-gradient(
          from 75deg,
          darken(#2760a3, 10%) 0deg,
          darken(#2760a3, 10%) 11deg,
          transparent 158deg,
          transparent 377deg
        );
      }

      .image {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

        img {
          transform: scale(1.05);
        }
      }
    }
  }

  .member-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .social-links {
    a {
      color: $neutral-text;
      transition: color 0.2s;

      &:hover {
        color: $primary;
      }
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    .member-avatar {
      width: 100px;
      height: 100px;

      &::before {
        top: -2px;
        left: -2px;
        width: 104px;
        height: 104px;
      }

      .image {
        width: 100px;
        height: 100px;
      }
    }
  }
}

// Loader styles para el botón
.button.is-loading {
  pointer-events: none;
  color: transparent;
  
  &::after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid transparent;
    border-radius: 50%;
    border-right-color: currentColor;
    border-top-color: currentColor;
    content: "";
    display: block;
    height: 1em;
    position: absolute;
    left: calc(50% - (1em / 2));
    top: calc(50% - (1em / 2));
    width: 1em;
    z-index: 1;
  }
  
  &.is-primary::after {
    border-right-color: white;
    border-top-color: white;
  }
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
