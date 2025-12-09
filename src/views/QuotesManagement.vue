<template>
  <div class="quotes-listing mt-3">
    <div class="main-container">
      <loading ref="loading" />
      <div class="container is-fluid">
        <!-- Mobile Filter Toggle Button -->
        <div class="mobile-filter-toggle is-hidden-tablet">
          <b-button
            @click="showMobileFilters = !showMobileFilters"
            type="is-primary"
            size="is-small"
            icon-left="filter"
            :icon-right="showMobileFilters ? 'chevron-up' : 'chevron-down'"
            expanded
          >
            {{ showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros' }}
          </b-button>
        </div>
        
        <div class="quotes-layout">
          <!-- Mobile Filters Modal -->
          <b-modal v-model="showMobileFilters" has-modal-card>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Filtros</p>
                <button
                  type="button"
                  class="delete"
                  aria-label="close"
                  @click="showMobileFilters = false"
                ></button>
              </header>
              <section class="modal-card-body">
                <div v-if="showMobileFilters" class="mobile-filters">
                  <!-- Contenido de filtros igual al sidebar -->
                  <div class="filter-content">
                    <h2 class="title is-5">Filtrar Cotizaciones</h2>
                    <p class="subtitle is-6 has-text-grey">
                      Administra las Solicitudes
                    </p>

                    <b-field label="Nombre del Cliente">
                      <b-input
                        v-model="filters.fullname"
                        placeholder="Buscar por nombre."
                        icon="user"
                        clearable
                      />
                    </b-field>

                    <b-field label="Email">
                      <b-input
                        v-model="filters.email"
                        placeholder="Buscar por email"
                        icon="envelope"
                        clearable
                      />
                    </b-field>

                    <b-field label="Tipo de Seguro">
                      <b-select
                        v-model="filters.secureType"
                        expanded
                        placeholder="Seleccione"
                      >
                        <option value="">Todos los Tipos</option>
                        <option
                          v-for="type in filterOptions.secureTypes"
                          :key="type"
                          :value="type"
                        >
                          {{ type }}
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Marca del Vehículo">
                      <b-autocomplete
                        v-model="filters.brand"
                        :data="filteredBrands"
                        placeholder="Marca"
                        icon="car"
                        clearable
                        :open-on-focus="true"
                        @select="(option) => (selectedBrand = option)"
                        @blur="selectedBrand = null"
                      >
                        <template slot="empty">No hay resultados</template>
                      </b-autocomplete>
                    </b-field>

                    <b-field label="Año">
                      <b-field grouped>
                        <b-select
                          v-model="filters.yearFrom"
                          expanded
                          placeholder="Desde"
                        >
                          <option value="">Desde</option>
                          <option
                            v-for="year in availableYears"
                            :key="`from-${year}`"
                            :value="year"
                          >
                            {{ year }}
                          </option>
                        </b-select>
                        <b-select
                          v-model="filters.yearTo"
                          expanded
                          placeholder="Hasta"
                        >
                          <option value="">Hasta</option>
                          <option
                            v-for="year in availableYears"
                            :key="`to-${year}`"
                            :value="year"
                          >
                            {{ year }}
                          </option>
                        </b-select>
                      </b-field>
                    </b-field>

                    <b-field label="Fecha de Solicitud">
                      <b-field grouped>
                        <b-datepicker
                          v-model="filters.dateFrom"
                          placeholder="Desde"
                          icon="calendar"
                          size="is-small"
                          :max-date="new Date()"
                          expanded
                        />
                        <b-datepicker
                          v-model="filters.dateTo"
                          placeholder="Hasta"
                          icon="calendar"
                          size="is-small"
                          :max-date="new Date()"
                          expanded
                        />
                      </b-field>
                    </b-field>
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <b-button type="is-primary" @click="applyFilters(); showMobileFilters = false">
                  Aplicar Filtros
                </b-button>
                <b-button
                  type="is-light"
                  @click="resetFilters(); showMobileFilters = false"
                >
                  Limpiar
                </b-button>
              </footer>
            </div>
          </b-modal>
          
          <!-- Desktop Filter Sidebar -->
          <div class="filter-sidebar is-hidden-mobile">
            <div class="box">
              <h2 class="title is-5">Filtrar Cotizaciones</h2>
              <p class="subtitle is-6 has-text-grey">
                Administra las Solicitudes
              </p>

              <b-field label="Nombre del Cliente">
                <b-input
                  v-model="filters.fullname"
                  placeholder="Buscar por nombre."
                  icon="user"
                  clearable
                />
              </b-field>

              <b-field label="Email">
                <b-input
                  v-model="filters.email"
                  placeholder="Buscar por email"
                  icon="envelope"
                  clearable
                />
              </b-field>

              <b-field label="Tipo de Seguro">
                <b-select
                  v-model="filters.secureType"
                  expanded
                  placeholder="Seleccione"
                >
                  <option value="">Todos los Tipos</option>
                  <option
                    v-for="type in filterOptions.secureTypes"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </b-select>
              </b-field>

              <b-field label="Marca del Vehículo">
                <b-autocomplete
                  v-model="filters.brand"
                  :data="filteredBrands"
                  placeholder="Marca"
                  icon="car"
                  clearable
                  :open-on-focus="true"
                  @select="(option) => (selectedBrand = option)"
                  @blur="selectedBrand = null"
                >
                  <template slot="empty">No hay resultados</template>
                </b-autocomplete>
              </b-field>

              <b-field label="Año">
                <b-field grouped>
                  <b-select
                    v-model="filters.yearFrom"
                    expanded
                    placeholder="Desde"
                  >
                    <option value="">Desde</option>
                    <option
                      v-for="year in availableYears"
                      :key="`from-${year}`"
                      :value="year"
                    >
                      {{ year }}
                    </option>
                  </b-select>
                  <b-select
                    v-model="filters.yearTo"
                    expanded
                    placeholder="Hasta"
                  >
                    <option value="">Hasta</option>
                    <option
                      v-for="year in availableYears"
                      :key="`to-${year}`"
                      :value="year"
                    >
                      {{ year }}
                    </option>
                  </b-select>
                </b-field>
              </b-field>

              <b-field label="Fecha de Solicitud">
                <b-field grouped>
                  <b-datepicker
                    v-model="filters.dateFrom"
                    placeholder="Desde"
                    icon="calendar"
                    size="is-small"
                    :max-date="new Date()"
                    expanded
                  />
                  <b-datepicker
                    v-model="filters.dateTo"
                    placeholder="Hasta"
                    icon="calendar"
                    size="is-small"
                    :max-date="new Date()"
                    expanded
                  />
                </b-field>
              </b-field>

              <b-button type="is-primary" expanded @click="applyFilters">
                Aplicar Filtros
              </b-button>
              <b-button
                type="is-light"
                expanded
                @click="resetFilters"
                class="mt-2"
              >
                Limpiar
              </b-button>

              <hr>

              <!-- Estadísticas rápidas -->
              <div class="stats-summary">
                <h3 class="title is-6">Resumen</h3>
                <div class="stat-item">
                  <span class="has-text-weight-semibold">Total:</span>
                  <span class="has-text-primary">{{ totalQuotes }}</span>
                </div>
                <div class="stat-item">
                  <span class="has-text-weight-semibold">Hoy:</span>
                  <span class="has-text-success">{{ todayQuotes }}</span>
                </div>
                <div class="stat-item">
                  <span class="has-text-weight-semibold">Esta semana:</span>
                  <span class="has-text-info">{{ weekQuotes }}</span>
                </div>
              </div>
            </div>

            <!-- Mobile filters collapse -->
            <b-collapse
              class="card"
              animation="slide"
              v-if="isMobile"
              :open="isOpen"
            >
              <template #trigger="props">
                <div
                  class="card-header"
                  role="button"
                  :aria-expanded="props.open"
                >
                  <p class="card-header-title">Filtros</p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'caret-down' : 'caret-up'">
                    </b-icon>
                  </a>
                </div>
              </template>

              <div class="card-content">
                <div class="content">
                  <!-- Same filters as desktop but in mobile layout -->
                  <h2 class="title is-5">Filtrar Cotizaciones</h2>
                  
                  <b-field label="Nombre del Cliente">
                    <b-input
                      v-model="filters.fullname"
                      placeholder="Buscar por nombre"
                      icon="user"
                      clearable
                    />
                  </b-field>

                  <b-field label="Email">
                    <b-input
                      v-model="filters.email"
                      placeholder="Buscar por email"
                      icon="envelope"
                      clearable
                    />
                  </b-field>

                  <b-field label="Tipo de Seguro">
                    <b-select
                      v-model="filters.secureType"
                      expanded
                      placeholder="Seleccione"
                    >
                      <option value="">Todos los Tipos</option>
                      <option
                        v-for="type in filterOptions.secureTypes"
                        :key="type"
                        :value="type"
                      >
                        {{ type }}
                      </option>
                    </b-select>
                  </b-field>

                  <b-button type="is-primary" expanded @click="applyFilters">
                    Aplicar Filtros
                  </b-button>
                  <b-button
                    type="is-light"
                    expanded
                    @click="resetFilters"
                    class="mt-2"
                  >
                    Limpiar
                  </b-button>
                </div>
              </div>
            </b-collapse>
          </div>

          <!-- Main Content Area -->
          <div class="quotes-content">
            <div class="quotes-header">
              <h1 class="title is-5">
                Mostrando {{ quotes.length }} de
                {{ totalQuotes }} cotizaciones
              </h1>
            </div>
            
            <div class="content-controls">
              <div class="sort-export-controls">
                <b-field grouped group-multiline>
                  <div class="control">
                    <b-select
                      v-model="sortBy"
                      @input="applyFilters"
                      placeholder="Ordenar por..."
                      size="is-small"
                    >
                      <option value="newest">Más Recientes</option>
                      <option value="oldest">Más Antiguas</option>
                      <option value="name">Nombre A-Z</option>
                      <option value="secure-type">Tipo de Seguro</option>
                      <option value="brand">Marca</option>
                    </b-select>
                  </div>
                  <!-- <div class="control">
                    <b-button
                      type="is-success"
                      icon-left="download"
                      size="is-small"
                      @click="exportQuotes"
                    >
                      <span class="is-hidden-mobile">Exportar</span>
                    </b-button>
                  </div> -->
                </b-field>
              </div>
            </div>
            
            <Pagination
              @pageChange="handlePageQuotes"
              :total="totalQuotes"
              :perPage="perPage"
              v-if="totalQuotes > perPage"
              class="mb-4"
            />

            <div
              v-if="quotes.length === 0 && !$refs.loading?.isActive"
              class="has-text-centered py-6"
            >
              <b-icon
                icon="file-lines"
                size="is-large"
                class="has-text-grey-light mb-3"
              />
              <p class="title is-5 has-text-grey">
                No se encontraron cotizaciones
              </p>
              <p class="subtitle is-6 has-text-grey-light">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>

            <div class="quotes-grid" v-else>
              <div
                v-for="quote in quotes"
                :key="quote.id"
                class="quote-card"
              >
                <div class="card">
                  <div class="card-content">
                    <div class="quote-header">
                      <div class="quote-info">
                        <h3 class="title is-6 mb-2">{{ quote.fullname }}</h3>
                        <div class="quote-meta">
                          <b-tag
                            :type="getSecureTypeColor(quote.secureType)"
                            class="mb-2"
                          >
                            {{ quote.secureType }}
                          </b-tag>
                          <span class="has-text-grey is-size-7">
                            {{ formatDate(quote.created_at) }}
                          </span>
                        </div>
                      </div>
                      <div class="quote-actions">
                        <b-dropdown position="is-bottom-left" aria-role="menu">
                          <template #trigger>
                            <b-button
                              icon-right="ellipsis-vertical"
                              type="is-white"
                              size="is-small"
                            />
                          </template>

                          <b-dropdown-item
                            @click="viewQuoteDetail(quote)"
                            aria-role="menuitem"
                          >
                            <b-icon icon="eye" size="is-small" />
                            Ver Detalle
                          </b-dropdown-item>

                          <b-dropdown-item
                            @click="contactClient(quote)"
                            aria-role="menuitem"
                            class="whatsapp-button"
                          >
                            <b-icon icon="whatsapp" pack="fab" size="is-small" />
                            Contactar por WhatsApp
                          </b-dropdown-item>

                          <b-dropdown-item
                            @click="sendEmail(quote)"
                            aria-role="menuitem"
                          >
                            <b-icon icon="envelope" size="is-small" />
                            Enviar Email
                          </b-dropdown-item>

                          <hr class="dropdown-divider">

                          <b-dropdown-item
                            @click="deleteQuote(quote.id)"
                            aria-role="menuitem"
                            class="has-text-danger"
                          >
                            <b-icon icon="trash" size="is-small" />
                            Eliminar
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>

                    <div class="quote-details">
                      <div class="detail-row">
                        <b-icon icon="envelope" size="is-small" />
                        <span>{{ quote.email }}</span>
                      </div>
                      <div class="detail-row">
                        <b-icon icon="phone" size="is-small" />
                        <span>{{ quote.phone }}</span>
                      </div>
                      <div class="detail-row" v-if="quote.brand">
                        <b-icon icon="car" size="is-small" />
                        <span>{{ quote.brand }} {{ quote.model }} ({{ quote.year }})</span>
                      </div>
                      <div class="detail-row" v-if="quote.availability">
                        <b-icon icon="clock" size="is-small" />
                        <span>{{ quote.availability }}</span>
                      </div>
                    </div>

                    <div class="quote-footer">
                      <div class="quote-time">
                        <span class="has-text-grey is-size-7">
                          Recibida {{ timeAgo(quote.created_at) }}
                        </span>
                      </div>
                      <div class="quick-actions">
                        <b-button
                          type="is-success"
                          size="is-small"
                          @click="contactClient(quote)"
                          class="whatsapp-button"
                        >
                          <span class="icon d-block">
                            <vue-fontawesome :icon="['fab', 'whatsapp']" />
                          </span>
                          <span class="d-block">
                            Contactar
                          </span>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteDetailModal
        v-if="selectedQuote"
        :quote="selectedQuote"
        :is-active="isDetailModalActive"
        @close="closeDetailModal"
      />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/LoadingComponent.vue";
import Pagination from "@/components/PaginationComponent.vue";
import QuoteDetailModal from "@/components/QuoteDetailModal.vue";

export default {
  name: "QuotesListing",
  components: {
    Loading,
    Pagination,
    QuoteDetailModal,
  },
  data() {
    return {
      filters: {
        fullname: "",
        email: "",
        secureType: "",
        brand: "",
        yearFrom: "",
        yearTo: "",
        dateFrom: null,
        dateTo: null,
      },
      selectedBrand: null,
      appliedFilters: {},
      sortBy: "newest",
      currentPage: 1,
      perPage: 12,
      totalQuotes: 0,
      todayQuotes: 0,
      weekQuotes: 0,
      isMobile: false,
      isOpen: false,
      selectedQuote: null,
      isDetailModalActive: false,
      showMobileFilters: false,
    };
  },
  computed: {
    quotes() {
      return this.$store.getters["Quotes/quotes"] || [];
    },
    filterOptions() {
      return (
        this.$store.getters["Quotes/filterOptions"] || {
          secureTypes: [],
          brands: [],
          years: [],
        }
      );
    },
    filteredBrands() {
      const brands = this.filterOptions.brands || [];
      if (!this.filters.brand || this.filters.brand.trim() === "") {
        return brands;
      }
      return brands.filter((brand) =>
        brand.toLowerCase().includes(this.filters.brand.toLowerCase())
      );
    },
    availableYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear; year >= currentYear - 30; year--) {
        years.push(year);
      }
      return years;
    },
  },
  methods: {
    async fetchQuotes(params) {
      try {
        this.$refs.loading.show();
        const response = await this.$store.dispatch(
          "Quotes/fetchQuotes",
          params
        );
        this.totalQuotes = response.total || 0;
        this.todayQuotes = response.todayCount || 0;
        this.weekQuotes = response.weekCount || 0;
        this.$refs.loading.hide();
      } catch (err) {
        console.error("Error fetching quotes:", err);
        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: "Error al cargar las cotizaciones",
          type: "is-danger",
        });
      }
    },

    async loadFilterOptions() {
      try {
        await this.$store.dispatch("Quotes/fetchFilterOptions");
      } catch (err) {
        console.error("Error loading filter options:", err);
      }
    },

    buildQueryParams() {
      const params = {
        limit: this.perPage,
        page: this.currentPage,
      };

      if (this.appliedFilters.fullname)
        params.fullname = this.appliedFilters.fullname;
      if (this.appliedFilters.email) params.email = this.appliedFilters.email;
      if (this.appliedFilters.secureType)
        params.secureType = this.appliedFilters.secureType;
      if (this.appliedFilters.brand) params.brand = this.appliedFilters.brand;
      if (this.appliedFilters.yearFrom)
        params.yearFrom = this.appliedFilters.yearFrom;
      if (this.appliedFilters.yearTo)
        params.yearTo = this.appliedFilters.yearTo;
      if (this.appliedFilters.dateFrom)
        params.dateFrom = this.formatDateForAPI(this.appliedFilters.dateFrom);
      if (this.appliedFilters.dateTo)
        params.dateTo = this.formatDateForAPI(this.appliedFilters.dateTo);
      if (this.sortBy) params.sortBy = this.sortBy;

      return params;
    },

    handlePageQuotes(value) {
      this.currentPage = value;
      const params = this.buildQueryParams();
      this.fetchQuotes(params);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    applyFilters() {
      this.appliedFilters = JSON.parse(
        JSON.stringify({
          fullname: this.filters.fullname,
          email: this.filters.email,
          secureType: this.filters.secureType,
          brand: this.selectedBrand || this.filters.brand,
          yearFrom: this.filters.yearFrom,
          yearTo: this.filters.yearTo,
          dateFrom: this.filters.dateFrom,
          dateTo: this.filters.dateTo,
        })
      );
      this.currentPage = 1;
      const params = this.buildQueryParams();
      this.fetchQuotes(params);
    },

    resetFilters() {
      this.filters = {
        fullname: "",
        email: "",
        secureType: "",
        brand: "",
        yearFrom: "",
        yearTo: "",
        dateFrom: null,
        dateTo: null,
      };
      this.selectedBrand = null;
      this.appliedFilters = {};
      this.sortBy = "newest";
      this.currentPage = 1;
      const params = this.buildQueryParams();
      this.fetchQuotes(params);
    },

    viewQuoteDetail(quote) {
      this.selectedQuote = quote;
      this.isDetailModalActive = true;
    },

    closeDetailModal() {
      this.isDetailModalActive = false;
      this.selectedQuote = null;
    },

    contactClient(quote) {
      const phone = quote.phone.replace(/\D/g, "");
      const formattedPhone = phone.startsWith("54") ? phone : `549${phone}`;

      const message = encodeURIComponent(
        `Hola ${quote.fullname}! 👋\n\n` +
          `Soy de Estudio Brigante y recibimos tu solicitud de cotización para el seguro de ${quote.secureType}.\n\n` +
          `📋 *Datos recibidos:*\n` +
          `• Vehículo: ${quote.brand} ${quote.model} (${quote.year})\n` +
          `• Disponibilidad: ${quote.availability}\n\n` +
          `Nos pondremos en contacto contigo para brindarte la mejor cotización. ¿Hay algún detalle adicional que te gustaría agregar?\n\n` +
          `¡Gracias por confiar en nosotros! 🤝`
      );

      window.open(`https://wa.me/${formattedPhone}?text=${message}`);
    },

    sendEmail(quote) {
      const subject = encodeURIComponent(
        `Cotización de ${quote.secureType} - Estudio Brigante`
      );
      const body = encodeURIComponent(
        `Estimado/a ${quote.fullname},\n\n` +
          `Gracias por contactarnos para solicitar una cotización de seguro de ${quote.secureType}.\n\n` +
          `Hemos recibido la siguiente información:\n` +
          `- Vehículo: ${quote.brand} ${quote.model} (${quote.year})\n` +
          `- Teléfono: ${quote.phone}\n` +
          `- Disponibilidad: ${quote.availability}\n\n` +
          `En breve nos pondremos en contacto con usted para brindarle la mejor cotización.\n\n` +
          `Saludos cordiales,\n` +
          `Equipo Estudio Brigante`
      );

      window.location.href = `mailto:${quote.email}?subject=${subject}&body=${body}`;
    },

    async deleteQuote(quoteId) {
      this.$buefy.dialog.confirm({
        title: "Eliminar Cotización",
        message:
          "¿Estás seguro de que quieres eliminar esta cotización? Esta acción no se puede deshacer.",
        confirmText: "Eliminar",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            await this.$store.dispatch("Quotes/deleteQuote", quoteId);
            this.$buefy.toast.open({
              message: "Cotización eliminada correctamente",
              type: "is-success",
            });
            this.applyFilters();
          } catch (error) {
            this.$buefy.toast.open({
              message: "Error al eliminar la cotización",
              type: "is-danger",
            });
          }
        },
      });
    },

    exportQuotes() {
      this.$buefy.toast.open({
        message: "Funcionalidad de exportación en desarrollo",
        type: "is-info",
      });
    },

    getSecureTypeColor(secureType) {
      const colors = {
        Automotores: "is-primary",
        Motovehículos: "is-info",
      };
      return colors[secureType] || "is-info";
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatDateForAPI(date) {
      if (!date) return null;
      return date.toISOString().split("T")[0];
    },

    timeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return "hace menos de un minuto";
      if (diffInSeconds < 3600)
        return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
      if (diffInSeconds < 86400)
        return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
      if (diffInSeconds < 604800)
        return `hace ${Math.floor(diffInSeconds / 86400)} días`;

      return date.toLocaleDateString("es-AR");
    },
  },

  mounted() {
    this.loadFilterOptions();
    this.handlePageQuotes(1);
    this.isMobile = window.innerWidth < 768;
  },
};
</script>

<style lang="scss">
.dropdown-trigger {
  button {
    box-shadow: none !important;
  }
}
.whatsapp-button {
  span {
    display: flex !important;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.quotes-listing {
  min-height: 100vh;
  background-color: $background-light;
}

.main-container {
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.quotes-listing {
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  .main-container {
    .container {
      padding: 0;
    }
  }

  .mobile-filter-toggle {
    margin-bottom: 1rem;

    .button {
      width: 100%;
    }
  }

  .quotes-layout {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 1023px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .quotes-content {
    flex: 1;

    .quotes-header {
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        text-align: center;

        .title {
          font-size: 1.25rem !important;
        }
      }
    }

    .content-controls {
      margin-bottom: 1.5rem;

      .sort-export-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 768px) {
          flex-direction: column;
          gap: 0.75rem;
          align-items: stretch;

          .field {
            width: 100%;
          }
        }
      }
    }
  }
}

.filter-sidebar {
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 5rem;

  @media (max-width: 1023px) {
    width: 100%;
    position: static;
  }

  .box {
    border-radius: 0.75rem;

    @media (max-width: 768px) {
      border-radius: 0.5rem;
      padding: 1rem;
    }
  }

  .stats-summary {
    .stat-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  }
}

.mobile-filters {
  .filter-content {
    padding: 0;

    .title {
      margin-bottom: 1rem;
    }

    .field {
      margin-bottom: 1rem;
    }
  }
}

.quotes-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

.quote-card {
  .card {
    border-radius: 0.75rem;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;

    @media (max-width: 768px) {
      border-radius: 0.5rem;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
  }

  .card-content {
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .quote-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
    }

    .quote-info {
      flex: 1;

      .quote-meta {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        @media (max-width: 768px) {
          .title {
            font-size: 1.1rem !important;
          }

          .subtitle {
            font-size: 0.875rem !important;
          }
        }
      }
    }

    .quote-actions {
      flex-shrink: 0;

      @media (max-width: 768px) {
        width: 100%;

        .dropdown {
          width: 100%;

          .button {
            width: 100%;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .quote-details {
    margin-bottom: 1rem;

    .detail-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: $neutral-text;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }

      .icon {
        color: $primary;
        flex-shrink: 0;
      }
    }
  }

  .quote-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #f0f0f0;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;

      .buttons {
        width: 100%;

        .button {
          flex: 1;
          margin: 0 0.25rem;
        }
      }
    }
  }
}

// Responsive table overrides
@media (max-width: 768px) {
  :deep(.pagination) {
    flex-wrap: wrap;
    justify-content: center;

    .pagination-list {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  :deep(.modal-card) {
    margin: 0.5rem;
    max-height: calc(100vh - 1rem);

    .modal-card-body {
      padding: 1rem;
      max-height: calc(100vh - 200px);
      overflow-y: auto;
    }
  }

  :deep(.dropdown-menu) {
    width: 100%;
    left: 0;
    right: 0;
  }

  :deep(.field.is-grouped.is-grouped-multiline) {
    justify-content: stretch;

    .control {
      flex: 1;
      min-width: 100%;

      .field.is-grouped {
        width: 100%;

        .control:first-child {
          flex: 1;
        }
      }
    }
  }
}
</style>