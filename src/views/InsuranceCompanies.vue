<template>
  <div class="insurance-companies">
    <top-navbar
      :is-authenticated="isAuthenticated"
      @login="showLogin"
      @logout="handleLogout"
    />

    <div class="main-container">
      <div class="container is-fluid">
        <div class="hero-section mb-6 mt-2">
          <h1 class="title is-2 has-text-centered">Seguros</h1>
          <div class="has-text-centered">
            <p>
              Brindamos coberturas a medida, con una amplia oferta de productos
              y el respaldo de las mejores compañías del mercado.
            </p>
          </div>
        </div>

        <div class="columns is-multiline">
          <div
            v-for="insurance in filteredInsurances"
            :key="insurance.id"
            class="column is-3"
          >
            <div
              class="card insurance-card"
              @click="showInsuranceDetail(insurance)"
            >
              <div class="card-image">
                <figure class="image is-16by9">
                  <img
                    :src="insurance.image"
                    :alt="insurance.name"
                    loading="lazy"
                  />
                </figure>
                <div class="insurance-overlay">
                  <h3 class="title is-4 has-text-white has-text-centered">
                    {{ insurance.name }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredInsurances.length === 0"
          class="has-text-centered py-6"
        >
          <b-icon icon="shield-alert" class="has-text-grey-light mb-3" />
          <p class="title is-5 has-text-grey">No se encontraron seguros</p>
          <p class="subtitle is-6 has-text-grey-light">
            Intenta con otra búsqueda
          </p>
        </div>

        <div class="providers-section mt-6 mb-5">
          <h2 class="title is-3 has-text-centered mb-5">
            Compañías que nos respaldan
          </h2>
          <!-- <div class="box providers-carousel">
            <b-carousel
              :autoplay="true"
              :interval="3000"
              :pause-hover="false"
              :repeat="true"
              :arrow="false"
              :indicator="false"
              icon-pack="mdi"
              icon-prev="chevron-left"
              icon-next="chevron-right"
            >
              <b-carousel-item v-for="provider in providers" :key="provider.id">
                <div class="carousel-item-content">
                  <figure class="image is-16by9">
                    <img
                      :src="provider.image"
                      :alt="provider.name"
                      class="provider-image"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </b-carousel-item>
            </b-carousel>
          </div> -->

          <b-carousel-list
            ref="providerCarousel"
            :data="providers"
            :arrow="false"
            :arrow-hover="false"
            :items-to-show="3"
            :items-to-list="1"
            :repeat="true"
            :has-drag="true"
            :has-grayscale="false"
            :has-opacity="false"
          />
        </div>
      </div>
    </div>

    <b-modal
      v-model="isDetailModalActive"
      :width="1000"
      scroll="keep"
      class="insurance-modal"
      :full-screen="isMobile"
      :can-cancel="['escape', 'x']"
      @close="closeModal"
    >
      <div class="modal-card" v-if="selectedInsurance">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ selectedInsurance.name }}</p>
          <button
            type="button"
            class="delete"
            @click="closeModal"
          />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <div class="has-text-centered mb-4">
              <figure class="image modal-insurance-image">
                <img
                  :src="selectedInsurance.image"
                  :alt="selectedInsurance.name"
                  style="object-fit: cover; border-radius: 0.5rem"
                  loading="lazy"
                />
              </figure>
            </div>

            <div
              v-if="!selectedInsurance.formComponent"
              v-html="selectedInsurance.description"
            ></div>

            <div v-if="selectedInsurance.formComponent">
              <div class="mb-4" v-html="selectedInsurance.description"></div>

              <div class="notification is-light">
                <h4 class="title is-5">📋 Solicitar Cotización</h4>
                <p class="mb-4">
                  Complete el siguiente formulario y nos pondremos en contacto
                  con usted a la brevedad con la mejor cotización.
                </p>

                <component
                  :is="selectedInsurance.formComponent"
                  :insurance-type="selectedInsurance.name"
                />
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot" v-if="!selectedInsurance.formComponent">
          <b-button type="is-primary" expanded @click="contactUs">
            Consultar
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import VehicleInsuranceForm from "@/components/VehicleInsuranceForm.vue";
import store from "@/store";

export default {
  name: "InsuranceCompanies",
  components: {
    TopNavbar,
    VehicleInsuranceForm,
  },
  data() {
    return {
      isAuthenticated: false,
      searchQuery: "",
      isDetailModalActive: false,
      selectedInsurance: null,
      providers: [
        {
          id: 1,
          name: "La Segunda",
          image: require("@/assets/images/providers/new/1.png"),
        },
        {
          id: 2,
          name: "Federación Patronal",
          image: require("@/assets/images/providers/new/2.png"),
        },
        {
          id: 3,
          name: "Sancor Seguros",
          image: require("@/assets/images/providers/new/3.png"),
        },
        {
          id: 4,
          name: "San Cristóbal",
          image: require("@/assets/images/providers/new/4.png"),
        },
        {
          id: 5,
          name: "Mercantil Andina",
          image: require("@/assets/images/providers/new/5.png"),
        },
        {
          id: 6,
          name: "Rivadavia",
          image: require("@/assets/images/providers/new/6.png"),
        },
        {
          id: 7,
          name: "Cooperación",
          image: require("@/assets/images/providers/new/7.png"),
        },
        {
          id: 8,
          name: "Galicia",
          image: require("@/assets/images/providers/new/8.png"),
        },
        {
          id: 9,
          name: "Integrity",
          image: require("@/assets/images/providers/new/9.png"),
        },
        {
          id: 10,
          name: "Berkley",
          image: require("@/assets/images/providers/new/10.png"),
        },
        {
          id: 11,
          name: "Allianz",
          image: require("@/assets/images/providers/new/11.png"),
        },
        {
          id: 12,
          name: "Zurich",
          image: require("@/assets/images/providers/new/12.png"),
        },
        {
          id: 13,
          name: "Mapfre",
          image: require("@/assets/images/providers/new/13.png"),
        },
      ],
      insurances: [
        {
          id: 1,
          name: "Automotores",
          image:
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
          formComponent: "VehicleInsuranceForm",
          description: "",
        },
        {
          id: 2,
          name: "Motovehículos",
          image:
            "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800",
          formComponent: "VehicleInsuranceForm",
          description: "",
        },
        {
          id: 3,
          name: "Flota de Vehículos",
          image:
            "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
          description: `
            <p>Contamos con un tratamiento especial para las flotas de vehículos, donde buscamos en todas nuestras compañías aliadas, el mejor producto con el mejor costo asociado.</p>
          `,
        },
        {
          id: 4,
          name: "Hogar",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
          description: `
      <p class="mb-3">Una cobertura integral que protege tu casa y todas las cosas que con esfuerzo conseguiste, brindándote además la tranquilidad de contar con una amplia gama de servicios y beneficios. Tu casa es un bien muy importante para vos y tu familia. Y protegerla tiene un costo muy bajo.</p>
      <p><strong>Proteja su patrimonio familiar y calidad de vida ante situaciones inesperadas.</strong></p>
    `,
        },
        {
          id: 5,
          name: "Comercio",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
          description: `
      <p class="mb-3">Tanto vos como tu negocio necesitan funcionar tranquilos. Por eso te ofrecemos seguros que cuenten con variedad, tranquilidad, respaldo y confianza para cubrir todas las necesidades que tu comercio y/o PyME requiera.</p>
      <p><strong>Consultanos para recibir un asesoramiento más personalizado de acuerdo a tu actividad comercial.</strong></p>
    `,
        },
        {
          id: 6,
          name: "Incendio",
          image:
            "https://images.unsplash.com/photo-1516567832553-66232148f74c?w=800&q=80&auto=format&fit=crop",
          description: `
      <p class="mb-3">Protección específica contra daños por incendio para tu hogar o comercio. Esta cobertura te brinda la tranquilidad de saber que tu patrimonio está protegido ante uno de los riesgos más devastadores.</p>
      <p><strong>Cobertura integral que incluye daños por incendio, rayo, explosión y otros riesgos relacionados.</strong></p>
    `,
        },
        {
          id: 7,
          name: "Vida y Retiro",
          image:
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
          description: `
      <p class="mb-3">Los seguros de Vida y de Retiro son los instrumentos más eficientes para reducir la incertidumbre monetaria de los individuos y sus familias. Permiten contar con respaldo económico ante situaciones graves y repentinas, como también planificar ahorros a largo plazo con fines específicos.</p>
      <p><strong>Contratando un Seguro de Vida y/o de Retiro, podes deducir de Impuesto a las Ganancias parte de lo abonado.</strong></p>
    `,
        },
        {
          id: 8,
          name: "Accidentes Personales",
          image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
          description: `
      <p class="mb-3">Si sos trabajador autónomo, durante la actividad laboral estás expuesto a riesgos de accidentes que pueden afectar tu trabajo. Para tu tranquilidad podés contratar un seguro de accidentes personales que te ampara en caso de muerte e invalidez. Además, podes sumarle asistencia médico farmacéutica, renta diaria, y servicio de sepelio.</p>
      <p><strong>Sentirte tranquilo y cubierto al realizar tu actividad laboral no tiene precio.</strong></p>
    `,
        },
        {
          id: 9,
          name: "Salud",
          image:
            "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
          description: `
      <p>Protege a toda tu familia mediante una cobertura indemnizatoria, que te brinda dinero en efectivo para intervenciones o situaciones de salud, que habitualmente son las más costosas. Éste seguro es un complemento económico para las personas que cuenten, o no, con coberturas de Obras Sociales o Prepagas.</p>
    `,
        },
        {
          id: 10,
          name: "Transporte",
          image:
            "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800", // Camión de transporte
          description: `
      <p>Te brindamos protección para los transportes que realizas por tu actividad comercial, por agua, aire y tierra. El seguro de Transporte tiene como objetivo cubrir los bienes y mercancías transportados ante los posibles riesgos que puedan existir durante su desplazamiento de una locación a otra y, al mismo tiempo, en aquellos períodos en los cuales tales bienes deben permanecer en depósitos en tránsito, antes de su llegada a destino final.</p>
    `,
        },
        {
          id: 11,
          name: "Responsabilidad Civil",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
          description: `
      <p>Un plan que te protege ante reclamos de clientes o terceros por cualquier omisión o error en el ejercicio de tu profesión, dentro del país. Pensado exclusivamente para profesionales, este seguro te respalda ante la posibilidad de tener que indemnizar a un tercero como consecuencia de cualquier acto derivado de la prestación de tus servicios profesionales.</p>
    `,
        },
        {
          id: 12,
          name: "Caución",
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
          description: `
      <p>Es una garantía de las obligaciones que surgen de contratos, tanto de obras o suministros del ámbito público y privado, como también de operaciones de comercio exterior. En este tipo de seguros la compañía de seguro se obliga a indemnizar al asegurado frente al incumplimiento del tomador.</p>
    `,
        },
        {
          id: 13,
          name: "Todo Riesgo Operativo",
          image:
            "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800", // Fábrica/industria
          description: `
      <p>Una protección para los riesgos significativos que implica todo negocio de importancia. Si manejás grandes montos de capital, te brindamos una sólida cobertura contra una amplia gama de daños materiales, y eventuales pérdidas de beneficios.</p>
    `,
        },
        {
          id: 14,
          name: "Seguro Técnico",
          image:
            "https://images.unsplash.com/photo-1716395301237-ce4059a83c2c?w=800&q=80&auto=format&fit=crop",
          description: `
      <p>Protegé tus equipos electrónicos, maquinarias, equipos médicos o trabajos de construcción y montaje. Este seguro posee coberturas técnicas a tu medida, permitiéndote cubrir las pérdidas y/o daños materiales externos producidos en forma accidental e imprevista a tus equipos electrónicos.</p>
    `,
        },
        {
          id: 15,
          name: "Seguros Agrícolas",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
          description: `
      <p>Conocemos los riesgos a los que se expone tu producción agrícola, disponemos de diferentes coberturas que te ofrecemos para el amparo de tus cultivos. Contamos con una gran variedad de seguros acordes al tipo de producción que realices garantizándote apoyo durante todo el año. <strong>Trabajamos con Compañías Líderes en Seguros Agrícolas.</strong></p>
    `,
        },
        {
          id: 16,
          name: "Riesgos del Trabajo (ART)",
          image:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
          description: `
      <p>Cuidar a sus empleados es cuidar su empresa y sabemos lo que significa atender esas necesidades. Las Aseguradoras de Riesgos de Trabajo son las encargadas de reparar los daños en casos de accidentes de trabajo o enfermedades, establecidas a través de la Ley 24.557 y sus normas complementarias.</p>
    `,
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
    filteredInsurances() {
      if (!this.searchQuery) {
        return this.insurances;
      }

      return this.insurances.filter((insurance) =>
        insurance.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openInsuranceByName(insuranceName) {
      const insurance = this.insurances.find(
        ins => ins.name.toLowerCase() === insuranceName.toLowerCase()
      );
      if (insurance) {
        this.showInsuranceDetail(insurance);
      }
    },
    handleUrlParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      const modal = urlParams.get('showInsurance');
      
      if (modal) {
        const modalMap = {
          'car': 'Automotores',
          'motorcycle': 'Motovehículos',
        };
        
        const insuranceName = modalMap[modal.toLowerCase()];
        if (insuranceName) {
          this.$nextTick(() => {
            this.openInsuranceByName(insuranceName);
          });
        }
      }
    },
    getModalParamFromName(insuranceName) {
      const nameMap = {
        'Automotores': 'car',
        'Motovehículos': 'motorcycle',
      };

      return nameMap[insuranceName] || insuranceName.toLowerCase().replace(/\s+/g, '-');
    },
    closeModal() {
      this.isDetailModalActive = false;
      this.selectedInsurance = null;

      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    },
    resetFilters() {
      this.searchQuery = "";
    },
    showInsuranceDetail(insurance) {
      this.selectedInsurance = insurance;
      this.isDetailModalActive = true;
    },
    contactUs() {
      const phone = "5492346532089";
      const message = encodeURIComponent(
        `Hola, estoy interesado en el seguro de ${this.selectedInsurance.name}. ¿Podrían brindarme más información?`
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    },
    showLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      this.isAuthenticated = false;
    },
  },
  mounted() {
    this.handleUrlParameters();
    this.autoplayInterval = setInterval(() => {
      if (this.$refs.providerCarousel) {
        this.$refs.providerCarousel.next();
      }
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.autoplayInterval);
  },
  watch: {
    '$route'() {
      this.handleUrlParameters();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.insurance-modal {
  .modal-content {
    width: 80vw !important;
    max-width: 90vw !important;
  }
  .modal-card {
    width: 100% !important;
  }
  .modal-insurance-image {
    max-width: 350px;
    height: 200px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }
}
.insurance-companies {
  min-height: 100vh;
  background-color: $background-light;
}

.main-container {
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.hero-section {
  .intro-text {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, $primary-lightest 0%, $primary 100%);
    color: white;

    strong {
      color: white;
      font-weight: 700;
    }
  }
}

.insurance-card {
  border-radius: 0.75rem;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

    .insurance-overlay {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  .card-image {
    position: relative;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    .insurance-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      transition: background 0.3s;

      .title {
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      }
    }
  }
}

.carousel-list .carousel-slides .carousel-slide {
  padding: 0px 30px !important;
}
.modal-card {
  border-radius: 0.75rem;

  .modal-card-head {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }

  .modal-card-body {
    .content {
      p {
        text-align: justify;
      }
    }
  }
}
</style>

<style lang="scss">
.carousel-list {
  .image img {
    width: 75% !important;
  }
}
</style>