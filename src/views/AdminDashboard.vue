<template>
  <div class="admin-dashboard">
    <loading ref="loading" />

    <div class="container is-fluid">
      <h1 class="title is-3 mb-5 dashboard-title">Dashboard Resumen</h1>

      <div class="stats-grid">
        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

        <div class="stat-card">
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

      <div class="recent-properties">
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

      <div class="charts-section">
        <div class="chart-card">
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

        <div class="chart-card">
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
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .dashboard-title {
    @media (max-width: 768px) {
      text-align: center;
      font-size: 1.5rem !important;
    }
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
  
  .stat-card {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    @media (max-width: 768px) {
      border-radius: 0.5rem;
    }
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    
    .card-content {
      padding: 1.5rem;
      
      @media (max-width: 768px) {
        padding: 1rem;
      }
      
      .media {
        @media (max-width: 480px) {
          flex-direction: column;
          text-align: center;
        }
        
        .media-left {
          @media (max-width: 480px) {
            margin-bottom: 0.5rem;
          }
        }
        
        .title {
          @media (max-width: 768px) {
            font-size: 1.5rem !important;
          }
        }
        
        .subtitle {
          @media (max-width: 768px) {
            font-size: 0.875rem !important;
          }
        }
      }
    }
  }
  
  .recent-properties {
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      margin-bottom: 1.5rem;
    }
    
    .card {
      border-radius: 0.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      @media (max-width: 768px) {
        border-radius: 0.5rem;
      }
      
      .card-header {
        @media (max-width: 768px) {
          padding: 0.75rem 1rem;
        }
        
        .card-header-title {
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
      
      .card-content {
        @media (max-width: 768px) {
          padding: 0.75rem;
        }
      }
    }
  }
  
  .charts-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  
  .chart-card {
    .card {
      border-radius: 0.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      @media (max-width: 768px) {
        border-radius: 0.5rem;
      }
      
      .card-header {
        @media (max-width: 768px) {
          padding: 0.75rem 1rem;
        }
        
        .card-header-title {
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
      
      .card-content {
        @media (max-width: 768px) {
          padding: 1rem;
        }
      }
    }
  }

  .property-thumbnail {
    border-radius: 0.5rem;
    object-fit: cover;
    width: 64px;
    height: 64px;
    
    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }

  .operation-stats {
    display: flex;
    gap: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
    
    .stat-item {
      flex: 1;
      text-align: center;
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: $background-light;
      
      @media (max-width: 768px) {
        padding: 1rem;
      }
      
      .stat-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 1rem;
        
        @media (max-width: 768px) {
          font-size: 0.875rem;
        }
      }
      
      .stat-value {
        font-size: 2rem;
        
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
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
      
      @media (max-width: 768px) {
        padding: 0.5rem 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      &:last-child {
        border-bottom: none;
      }
      
      .stat-value {
        font-size: 1.25rem;
        
        @media (max-width: 768px) {
          font-size: 1rem;
          align-self: flex-end;
        }
      }
    }
  }
}

// Responsive table overrides
@media (max-width: 768px) {
  :deep(.table) {
    font-size: 0.75rem;
    
    th, td {
      padding: 0.5rem 0.25rem;
      vertical-align: middle;
    }
    
    .title {
      font-size: 1rem !important;
    }
    
    .subtitle {
      font-size: 0.75rem !important;
    }
  }
  
  :deep(.tag) {
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
  }
  
  :deep(.button) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
}</style>