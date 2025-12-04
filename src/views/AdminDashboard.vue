<template>
  <div class="admin-dashboard">
    <loading ref="loading" />
    
    <div class="container is-fluid">
      <h1 class="title is-3 mb-5">Dashboard Resumen</h1>

      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="home-user" size="is-large" custom-class="has-text-primary" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.total_properties || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Total Propiedades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="home" size="is-large" custom-class="has-text-success" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_type?.home || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Casas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="building" size="is-large" custom-class="has-text-info" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_type?.apartament || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Departamentos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="person-digging" size="is-large" custom-class="has-text-warning" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_type?.land || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Terrenos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="store" size="is-large" custom-class="has-text-danger" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_type?.local || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Locales</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="briefcase" size="is-large" custom-class="has-text-link" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_type?.office || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Oficinas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="check-circle" size="is-large" custom-class="has-text-success" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_status?.available || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Disponibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-3">
          <div class="card stats-card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <b-icon icon="clock" size="is-large" custom-class="has-text-warning" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ stats.properties_by_status?.pending || 0 }}</p>
                  <p class="subtitle is-6 has-text-grey">Pendientes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns mt-4">
        <div class="column is-12">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <b-icon icon="history" class="mr-2" />
                Últimas 5 Propiedades Creadas
              </p>
              <button class="card-header-icon" @click="$router.push('/admin/properties')">
                <span class="icon">
                  <b-icon icon="arrow-right" />
                </span>
              </button>
            </header>
            <div class="card-content">
              <b-table
                :data="latestProperties"
                :hoverable="true"
                :mobile-cards="false"
                :loading="isLoading"
              >
                <b-table-column field="title" label="Propiedad" v-slot="props">
                  <div>
                    <p class="has-text-weight-semibold">{{ props.row.title }}</p>
                    <p class="is-size-7 has-text-grey">
                      <b-icon icon="map-marker" size="is-small" />
                      {{ props.row.city }}, {{ props.row.state }}
                    </p>
                  </div>
                </b-table-column>

                <b-table-column field="type" label="Tipo" v-slot="props">
                  <b-tag :type="getTypeColor(props.row.type)">
                    {{ getTypeLabel(props.row.type) }}
                  </b-tag>
                </b-table-column>

                <b-table-column field="operation" label="Operación" v-slot="props">
                  <b-tag :type="props.row.operation === 'sale' ? 'is-success' : 'is-info'">
                    {{ getOperationLabel(props.row.operation) }}
                  </b-tag>
                </b-table-column>

                <b-table-column field="price" label="Precio" v-slot="props">
                  <span class="has-text-weight-semibold has-text-primary">
                    {{ props.row.currency }} ${{ formatPrice(props.row.price) }}
                  </span>
                </b-table-column>

                <b-table-column field="status" label="Estado" v-slot="props">
                  <b-tag :type="getStatusColor(props.row.status)">
                    {{ getStatusLabel(props.row.status) }}
                  </b-tag>
                </b-table-column>

                <b-table-column field="created_at" label="Creado" v-slot="props">
                  <span class="is-size-7 has-text-grey">
                    {{ formatDate(props.row.created_at) }}
                  </span>
                </b-table-column>

                <template #empty>
                  <div class="has-text-centered py-5">
                    <b-icon icon="home" size="is-large" class="has-text-grey-light" />
                    <p class="has-text-grey mt-3">No hay propiedades todavía</p>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>

      <div class="columns mt-4">
        <div class="column is-6">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <b-icon icon="chart-pie" class="mr-2" />
                Propiedades por Operación
              </p>
            </header>
            <div class="card-content">
              <div class="operation-stats">
                <div class="stat-item">
                  <div class="stat-label">
                    <b-icon icon="tag" type="is-success" />
                    <span>En Venta</span>
                  </div>
                  <div class="stat-value has-text-success has-text-weight-bold">
                    {{ stats.properties_by_operation?.sale || 0 }}
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">
                    <b-icon icon="key" type="is-info" />
                    <span>En Alquiler</span>
                  </div>
                  <div class="stat-value has-text-info has-text-weight-bold">
                    {{ stats.properties_by_operation?.rent || 0 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <b-icon icon="circle-info" class="mr-2" />
                Estados de Propiedades
              </p>
            </header>
            <div class="card-content">
              <div class="status-stats">
                <div class="stat-row">
                  <span class="stat-label">
                    <b-tag type="is-success" size="is-small">Disponible</b-tag>
                  </span>
                  <span class="stat-value has-text-weight-bold">
                    {{ stats.properties_by_status?.available || 0 }}
                  </span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">
                    <b-tag type="is-warning" size="is-small">Pendiente</b-tag>
                  </span>
                  <span class="stat-value has-text-weight-bold">
                    {{ stats.properties_by_status?.pending || 0 }}
                  </span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">
                    <b-tag type="is-danger" size="is-small">Vendida</b-tag>
                  </span>
                  <span class="stat-value has-text-weight-bold">
                    {{ stats.properties_by_status?.sold || 0 }}
                  </span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">
                    <b-tag type="is-info" size="is-small">Alquilada</b-tag>
                  </span>
                  <span class="stat-value has-text-weight-bold">
                    {{ stats.properties_by_status?.rented || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/LoadingComponent.vue'

export default {
  name: 'AdminDashboard',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      stats: {
        total_properties: 0,
        properties_by_type: {
          home: 0,
          apartament: 0,
          land: 0,
          local: 0,
          office: 0
        },
        properties_by_status: {
          available: 0,
          pending: 0,
          sold: 0,
          rented: 0
        },
        properties_by_operation: {
          sale: 0,
          rent: 0
        }
      },
      latestProperties: [],
      defaultImage: 'https://www.argentina.gob.ar/sites/default/files/0l3a8806_1.jpg'
    }
  },
  async mounted() {
    await this.fetchStats()
  },
  methods: {
    async fetchStats() {
      try {
        this.$refs.loading.show()
        this.isLoading = true
        
        const response = await this.$store.dispatch('Properties/fetchStats')
        
        this.stats = {
          total_properties: response.total_properties || 0,
          properties_by_type: response.properties_by_type || {},
          properties_by_status: response.properties_by_status || {},
          properties_by_operation: response.properties_by_operation || {}
        }
        
        this.latestProperties = response.latest_properties || []
        
        this.$refs.loading.hide()
        this.isLoading = false
      } catch (err) {
        console.error('Error fetching stats:', err)
        this.$refs.loading.hide()
        this.isLoading = false
        this.$buefy.toast.open({
          message: 'Error al cargar las estadísticas',
          type: 'is-danger'
        })
      }
    },
    getPropertyImage(property) {
      if (property.main_image && property.main_image.path) {
        return `${process.env.VUE_APP_API_URL}/storage/${property.main_image.path}`
      }
      return this.defaultImage
    },
    handleImageError(event) {
      event.target.src = this.defaultImage
    },
    formatPrice(price) {
      if (!price) return '0'
      return Number(price).toLocaleString()
    },
    formatDate(date) {
      if (!date) return '-'
      const d = new Date(date)
      return d.toLocaleDateString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      })
    },
    getTypeLabel(type) {
      const labels = {
        'apartament': 'Departamento',
        'home': 'Casa',
        'land': 'Terreno',
        'local': 'Local',
        'office': 'Oficina'
      }
      return labels[type] || type
    },
    getTypeColor(type) {
      const colors = {
        'home': 'is-success',
        'apartament': 'is-info',
        'land': 'is-warning',
        'local': 'is-danger',
        'office': 'is-link'
      }
      return colors[type] || 'is-light'
    },
    getOperationLabel(operation) {
      const labels = {
        'sale': 'Venta',
        'rent': 'Alquiler'
      }
      return labels[operation] || operation
    },
    getStatusColor(status) {
      const colors = {
        'available': 'is-success',
        'pending': 'is-warning',
        'sold': 'is-danger',
        'rented': 'is-info'
      }
      return colors[status] || 'is-light'
    },
    getStatusLabel(status) {
      const labels = {
        'available': 'Disponible',
        'pending': 'Pendiente',
        'sold': 'Vendida',
        'rented': 'Alquilada'
      }
      return labels[status] || status
    },
    viewProperty(id) {
      this.$router.push(`/properties/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.admin-dashboard {
  .stats-card {
    height: 100%;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .card {
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .property-thumbnail {
    border-radius: 0.5rem;
    object-fit: cover;
    width: 64px;
    height: 64px;
  }

  .operation-stats {
    display: flex;
    gap: 2rem;
    
    .stat-item {
      flex: 1;
      text-align: center;
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: $background-light;
      
      .stat-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 1rem;
      }
      
      .stat-value {
        font-size: 2rem;
      }
    }
  }

  .status-stats {
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      border-bottom: 1px solid $neutral-light;
      
      &:last-child {
        border-bottom: none;
      }
      
      .stat-value {
        font-size: 1.25rem;
      }
    }
  }
}
</style>