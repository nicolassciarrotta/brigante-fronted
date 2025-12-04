<template>
  <div class="property-listing mt-3">
    <div class="main-container">
      <loading ref="loading" />
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-3">
            <div class="filter-sidebar" v-if="!isMobile">
              <div class="box">
                <h2 class="title is-5">Filtrar Propiedades</h2>
                <p class="subtitle is-6 has-text-grey">
                  Encuentra tu Hogar Perfecto
                </p>

                <b-field label="Ubicación">
                  <b-autocomplete
                    v-model="filters.location"
                    :data="filteredCities"
                    placeholder="Ciudad"
                    icon="map-marker"
                    clearable
                    :open-on-focus="true"
                    @select="(option) => (selectedCity = option)"
                    @blur="selectedCity = null"
                  >
                    <template slot="empty">No hay resultados</template>
                  </b-autocomplete>
                </b-field>

                <b-field label="Tipo de Propiedad">
                  <b-select
                    v-model="filters.propertyType"
                    expanded
                    placeholder="Seleccione..."
                  >
                    <option value="">Todos los Tipos</option>
                    <option
                      v-for="type in filterOptions.property_types"
                      :key="type.value"
                      :value="type.value"
                    >
                      {{ type.label }}
                    </option>
                  </b-select>
                </b-field>

                <b-field label="Operación">
                  <b-select
                    v-model="filters.operation"
                    expanded
                    placeholder="Seleccione..."
                  >
                    <option value="">Todas</option>
                    <option
                      v-for="operation in filterOptions.operations"
                      :key="operation.value"
                      :value="operation.value"
                    >
                      {{ operation.label }}
                    </option>
                  </b-select>
                </b-field>

                <b-field label="Rango de Precio">
                  <b-field grouped>
                    <b-input
                      v-model.number="filters.minPrice"
                      :placeholder="`Mín: $${formatPrice(
                        filterOptions.price_range.min
                      )}`"
                      type="number"
                      expanded
                    />
                    <b-input
                      v-model.number="filters.maxPrice"
                      :placeholder="`Máx: $${formatPrice(
                        filterOptions.price_range.max
                      )}`"
                      type="number"
                      expanded
                    />
                  </b-field>
                </b-field>

                <b-field label="Dormitorios">
                  <b-select
                    v-model="filters.bedrooms"
                    expanded
                    placeholder="Seleccione..."
                  >
                    <option value="">Cualquiera</option>
                    <option
                      v-for="n in filterOptions.max_bedrooms"
                      :key="n"
                      :value="n"
                    >
                      {{ n }}+
                    </option>
                  </b-select>
                </b-field>

                <b-field label="Baños">
                  <b-select
                    v-model="filters.bathrooms"
                    expanded
                    placeholder="Seleccione..."
                  >
                    <option value="">Cualquiera</option>
                    <option
                      v-for="n in filterOptions.max_bathrooms"
                      :key="n"
                      :value="n"
                    >
                      {{ n }}+
                    </option>
                  </b-select>
                </b-field>

                <b-field label="Superficie (m²)">
                  <b-field grouped>
                    <b-input
                      v-model.number="filters.minSqft"
                      :placeholder="`Mín: ${Math.round(
                        filterOptions.area_range.min
                      )}m²`"
                      type="number"
                      expanded
                    />
                    <b-input
                      v-model.number="filters.maxSqft"
                      :placeholder="`Máx: ${Math.round(
                        filterOptions.area_range.max
                      )}m²`"
                      type="number"
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
              </div>
            </div>

            <b-collapse
              class="card"
              animation="slide"
              aria-id="contentIdForA11y3"
              v-if="isMobile"
              :open="isOpen"
            >
              <template #trigger="props">
                <div
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3"
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
                  <div>
                    <h2 class="title is-5">Filtrar Propiedades</h2>
                    <p class="subtitle is-6 has-text-grey">
                      Encuentra tu Hogar Perfecto
                    </p>

                    <b-field label="Ubicación">
                      <b-autocomplete
                        v-model="filters.location"
                        :data="filteredCities"
                        placeholder="Ciudad"
                        icon="map-marker"
                        clearable
                        :open-on-focus="true"
                        @select="(option) => (selectedCity = option)"
                        @blur="selectedCity = null"
                      >
                        <template slot="empty">No hay resultados</template>
                      </b-autocomplete>
                    </b-field>

                    <b-field label="Tipo de Propiedad">
                      <b-select
                        v-model="filters.propertyType"
                        expanded
                        placeholder="Seleccione..."
                      >
                        <option value="">Todos los Tipos</option>
                        <option
                          v-for="type in filterOptions.property_types"
                          :key="type.value"
                          :value="type.value"
                        >
                          {{ type.label }}
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Operación">
                      <b-select
                        v-model="filters.operation"
                        expanded
                        placeholder="Seleccione..."
                      >
                        <option value="">Todas</option>
                        <option
                          v-for="operation in filterOptions.operations"
                          :key="operation.value"
                          :value="operation.value"
                        >
                          {{ operation.label }}
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Rango de Precio">
                      <b-field grouped>
                        <b-input
                          v-model.number="filters.minPrice"
                          :placeholder="`Mín: $${formatPrice(
                            filterOptions.price_range.min
                          )}`"
                          type="number"
                          expanded
                        />
                        <b-input
                          v-model.number="filters.maxPrice"
                          :placeholder="`Máx: $${formatPrice(
                            filterOptions.price_range.max
                          )}`"
                          type="number"
                          expanded
                        />
                      </b-field>
                    </b-field>

                    <b-field label="Dormitorios">
                      <b-select
                        v-model="filters.bedrooms"
                        expanded
                        placeholder="Seleccione..."
                      >
                        <option value="">Cualquiera</option>
                        <option
                          v-for="n in filterOptions.max_bedrooms"
                          :key="n"
                          :value="n"
                        >
                          {{ n }}+
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Baños">
                      <b-select
                        v-model="filters.bathrooms"
                        expanded
                        placeholder="Seleccione..."
                      >
                        <option value="">Cualquiera</option>
                        <option
                          v-for="n in filterOptions.max_bathrooms"
                          :key="n"
                          :value="n"
                        >
                          {{ n }}+
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Superficie (m²)">
                      <b-field grouped>
                        <b-input
                          v-model.number="filters.minSqft"
                          :placeholder="`Mín: ${Math.round(
                            filterOptions.area_range.min
                          )}m²`"
                          type="number"
                          expanded
                        />
                        <b-input
                          v-model.number="filters.maxSqft"
                          :placeholder="`Máx: ${Math.round(
                            filterOptions.area_range.max
                          )}m²`"
                          type="number"
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
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>

          <div class="column is-9">
            <div class="level mb-4">
              <div class="level-left">
                <div class="level-item">
                  <h1 class="title is-5">
                    Mostrando {{ properties.length }} de
                    {{ totalProperties }} propiedades
                  </h1>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <b-field>
                    <b-select
                      v-model="sortBy"
                      @input="applyFilters"
                      placeholder="Ordenar por..."
                    >
                      <option value="newest">Más Recientes</option>
                      <option value="price-low">Precio: Menor a Mayor</option>
                      <option value="price-high">Precio: Mayor a Menor</option>
                      <option value="bedrooms">Más Dormitorios</option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </div>

            <Pagination
              @pageChange="handlePageProperties"
              :total="totalProperties"
              :perPage="perPage"
              v-if="totalProperties > perPage"
              class="mb-4"
            />

            <div
              v-if="properties.length === 0 && !$refs.loading?.isActive"
              class="has-text-centered py-6"
            >
              <b-icon
                icon="home"
                size="is-large"
                class="has-text-grey-light mb-3"
              />
              <p class="title is-5 has-text-grey">
                No se encontraron propiedades
              </p>
              <p class="subtitle is-6 has-text-grey-light">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>

            <div class="columns is-multiline" v-else>
              <div
                v-for="property in properties"
                :key="property.id"
                class="column is-3"
              >
                <div
                  class="card property-card"
                  @click="goToProperty(property.id)"
                >
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img
                        :src="getPropertyImage(property)"
                        :alt="property.title"
                        loading="lazy"
                      />
                    </figure>
                    <b-tag
                      :type="getStatusColor(property.status)"
                      class="property-tag"
                    >
                      {{ getStatusLabel(property.status) }}
                    </b-tag>
                    <b-tag
                      v-if="property.featured"
                      type="is-warning"
                      class="featured-tag"
                    >
                      <span class="tag-content">
                        <b-icon icon="star" size="is-small" />
                        <span>Destacada</span>
                      </span>
                    </b-tag>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <p class="title is-6 mb-2">{{ property.title }}</p>
                      <p class="subtitle is-7 has-text-grey my-2">
                        <b-icon icon="map-marker" size="is-small" />
                        {{ property.address }}, {{ property.city }},
                        {{ property.state }}
                      </p>
                      <p
                        class="operation-tag has-text-weight-semibold is-size-7 mb-2"
                      >
                        <b-tag
                          :type="
                            property.operation === 'sale'
                              ? 'is-success'
                              : 'is-info'
                          "
                          size="is-small"
                        >
                          {{ getOperationLabel(property.operation) }}
                        </b-tag>
                        <span class="ml-2 has-text-grey">{{
                          getPropertyTypeLabel(property.type)
                        }}</span>
                      </p>
                      <p
                        class="price-tag has-text-primary has-text-weight-bold is-size-5 mb-3"
                      >
                        {{ property.currency }} ${{
                          formatPrice(property.price)
                        }}
                      </p>
                      <div
                        class="property-features"
                        v-if="
                          property.bedrooms ||
                          property.bathrooms ||
                          property.total_area
                        "
                      >
                        <span class="feature-item" v-if="property.bedrooms">
                          <b-icon icon="bed" size="is-small" />
                          {{ property.bedrooms }}
                        </span>
                        <span class="feature-item" v-if="property.bathrooms">
                          <b-icon icon="bath" size="is-small" />
                          {{ property.bathrooms }}
                        </span>
                        <span class="feature-item" v-if="property.total_area">
                          <b-icon icon="ruler-combined" size="is-small" />
                          {{ property.total_area }}m²
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Pagination
              @pageChange="handlePageProperties"
              :total="totalProperties"
              :perPage="perPage"
              v-if="totalProperties > perPage"
              class="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/LoadingComponent.vue";
import Pagination from "@/components/PaginationComponent.vue";

export default {
  name: "PropertyListing",
  components: {
    Loading,
    Pagination,
  },
  data() {
    return {
      filters: {
        location: "",
        propertyType: "",
        operation: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        minSqft: "",
        maxSqft: "",
      },
      selectedCity: null,
      appliedFilters: {},
      sortBy: "newest",
      currentPage: 1,
      perPage: 12,
      totalProperties: 0,
      defaultImage:
        "https://www.argentina.gob.ar/sites/default/files/0l3a8806_1.jpg",
      isMobile: false,
      isOpen: false,
    };
  },
  computed: {
    properties() {
      return this.$store.getters["Properties/properties"] || [];
    },
    filterOptions() {
      return (
        this.$store.getters["Properties/filterOptions"] || {
          cities: [],
          property_types: [],
          operations: [],
          max_bedrooms: 0,
          max_bathrooms: 0,
          price_range: { min: 0, max: 0 },
          area_range: { min: 0, max: 0 },
        }
      );
    },
    filteredCities() {
      const cities = this.filterOptions.cities || [];
      if (!this.filters.location || this.filters.location.trim() === "") {
        return cities;
      }
      return cities.filter((city) =>
        city.toLowerCase().includes(this.filters.location.toLowerCase())
      );
    },
  },
  methods: {
    async fetchProperties(values) {
      try {
        this.$refs.loading.show();
        const response = await this.$store.dispatch(
          "Properties/fetchProperties",
          values
        );
        this.totalProperties = response.total || 0;
        this.$refs.loading.hide();
      } catch (err) {
        console.error("Error fetching properties:", err);
        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: "Error al cargar las propiedades",
          type: "is-danger",
        });
      }
    },
    async loadFilterOptions() {
      try {
        await this.$store.dispatch("Properties/fetchFilterOptions");
      } catch (err) {
        console.error("Error loading filter options:", err);
      }
    },
    buildQueryParams() {
      const params = {
        limit: this.perPage,
        page: this.currentPage,
      };

      // SOLO usar appliedFilters
      if (this.appliedFilters.location)
        params.city = this.appliedFilters.location;
      if (this.appliedFilters.propertyType)
        params.type = this.appliedFilters.propertyType;
      if (this.appliedFilters.operation)
        params.operation = this.appliedFilters.operation;
      if (this.appliedFilters.minPrice)
        params.min_price = this.appliedFilters.minPrice;
      if (this.appliedFilters.maxPrice)
        params.max_price = this.appliedFilters.maxPrice;
      if (this.appliedFilters.bedrooms)
        params.bedrooms = this.appliedFilters.bedrooms;
      if (this.appliedFilters.bathrooms)
        params.bathrooms = this.appliedFilters.bathrooms;
      if (this.appliedFilters.minSqft)
        params.min_area = this.appliedFilters.minSqft;
      if (this.appliedFilters.maxSqft)
        params.max_area = this.appliedFilters.maxSqft;
      if (this.sortBy) params.sort_by = this.sortBy;

      return params;
    },
    handlePageProperties(value) {
      this.currentPage = value;
      const params = this.buildQueryParams();
      this.fetchProperties(params);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    applyFilters() {
      this.appliedFilters = JSON.parse(
        JSON.stringify({
          location: this.selectedCity || this.filters.location,
          propertyType: this.filters.propertyType,
          operation: this.filters.operation,
          minPrice: this.filters.minPrice,
          maxPrice: this.filters.maxPrice,
          bedrooms: this.filters.bedrooms,
          bathrooms: this.filters.bathrooms,
          minSqft: this.filters.minSqft,
          maxSqft: this.filters.maxSqft,
        })
      );
      this.currentPage = 1;
      const params = this.buildQueryParams();
      this.fetchProperties(params);
    },
    resetFilters() {
      this.filters = {
        location: "",
        propertyType: "",
        operation: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        minSqft: "",
        maxSqft: "",
      };
      this.selectedCity = null;
      this.appliedFilters = {};
      this.sortBy = "newest";
      this.currentPage = 1;
      const params = this.buildQueryParams();
      this.fetchProperties(params);
    },
    goToProperty(id) {
      this.$router.push(`/properties/${id}`);
    },
    getPropertyImage(property) {
      if (property.main_image) {
        const imageToUse = property.main_image;
        if (imageToUse.path) {
          const url = process.env.VUE_APP_HOST_API;
          return `${url}storage/${imageToUse.path}`;
        }
      }
      return this.defaultImage;
    },
    formatPrice(price) {
      if (!price) return "0";
      return Number(price).toLocaleString();
    },
    getStatusColor(status) {
      const colors = {
        available: "is-success",
        pending: "is-warning",
        sold: "is-danger",
        rented: "is-info",
      };
      return colors[status] || "is-light";
    },
    getStatusLabel(status) {
      const labels = {
        available: "Disponible",
        pending: "Pendiente",
        sold: "Vendida",
        rented: "Alquilada",
      };
      return labels[status] || status;
    },
    getPropertyTypeLabel(type) {
      const labels = {
        apartament: "Departamento",
        home: "Casa",
        land: "Terreno",
        local: "Local",
        office: "Oficina",
      };
      return labels[type] || type;
    },
    getOperationLabel(operation) {
      const labels = {
        sale: "Venta",
        rent: "Alquiler",
      };
      return labels[operation] || operation;
    },
  },
  mounted() {
    this.loadFilterOptions();
    this.handlePageProperties(1);
    this.isMobile = window.innerWidth < 768;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.property-listing {
  min-height: 100vh;
  background-color: $background-light;
}

.main-container {
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.filter-sidebar {
  position: sticky;
  top: 5rem;

  .box {
    border-radius: 0.75rem;
  }
}

.property-card {
  cursor: pointer;
  border-radius: 0.75rem;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    position: relative;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    .property-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 2;
    }

    .featured-tag {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 2;

      .tag-content {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }

  .price-tag {
    margin: 0.5rem 0;
  }

  .operation-tag {
    display: flex;
    align-items: center;
  }

  .property-features {
    display: flex;
    gap: 1rem;
    margin-top: 0.75rem;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: $neutral-text;
      font-size: 0.875rem;
    }
  }
}
</style>