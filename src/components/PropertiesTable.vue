<template>
  <div class="properties-table">
    <b-table
      :data="properties"
      :loading="loading"
      :hoverable="true"
      :mobile-cards="true"
      default-sort="title"
    >
      <b-table-column field="title" label="Propiedad" sortable v-slot="props">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="getPropertyImage(props.row)" :alt="props.row.title">
            </figure>
          </div>
          <div class="media-content">
            <p class="has-text-weight-bold">{{ props.row.title }}</p>
            <p class="is-size-7 has-text-grey">{{ props.row.city }}, {{ props.row.state }}</p>
          </div>
        </div>
      </b-table-column>

      <b-table-column field="type" label="Tipo" sortable v-slot="props">
        {{ getPropertyTypeLabel(props.row.type) }}
      </b-table-column>

      <b-table-column field="operation" label="Operación" sortable v-slot="props">
        <b-tag :type="props.row.operation === 'sale' ? 'is-success' : 'is-info'">
          {{ props.row.operation === 'sale' ? 'Venta' : 'Alquiler' }}
        </b-tag>
      </b-table-column>

      <b-table-column field="price" label="Precio" sortable v-slot="props">
        {{ props.row.currency }} ${{ formatPrice(props.row.price) }}
      </b-table-column>

      <b-table-column field="bedrooms" label="Dorm." sortable centered v-slot="props">
        {{ props.row.bedrooms }}
      </b-table-column>

      <b-table-column field="bathrooms" label="Baños" sortable centered v-slot="props">
        {{ props.row.bathrooms }}
      </b-table-column>

      <b-table-column field="status" label="Estado" sortable v-slot="props">
        <b-tag :type="getStatusColor(props.row.status)">
          {{ getStatusLabel(props.row.status) }}
        </b-tag>
      </b-table-column>

      <b-table-column label="Acciones" v-slot="props">
        <b-dropdown aria-role="list" position="is-bottom-left">
          <template #trigger>
            <b-button size="is-small" icon-right="ellipsis-v" />
          </template>
          <b-dropdown-item @click="$emit('view', props.row)">
            <b-icon icon="eye" size="is-small" />
            Ver
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('edit', props.row)">
            <b-icon icon="pencil" size="is-small" />
            Editar
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('manage-images', props.row)">
            <b-icon icon="image" size="is-small" />
            Gestionar Imágenes
          </b-dropdown-item>
          <b-dropdown-item @click="$emit('delete', props.row)">
            <b-icon icon="trash" size="is-small" type="is-danger" />
            <span class="has-text-danger">Eliminar</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">
          <p>No se encontraron propiedades</p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'PropertiesTable',
  props: {
    properties: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImage: 'https://www.argentina.gob.ar/sites/default/files/0l3a8806_1.jpg'
    }
  },
  methods: {
    formatPrice(price) {
      return Number(price).toLocaleString()
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
    getPropertyImage(property) {
      if (property.main_image) {
        return this.getImageUrl(property.main_image)
      }
      return this.defaultImage
    },
    getImageUrl(image) {
      if (image.path) {
        const url = process.env.VUE_APP_HOST_API;
        return `${url}storage/${image.path}`;
      }
      return this.defaultImage
    }
  }
}
</script>

<style lang="scss" scoped>
.properties-table {
  .media {
    align-items: center;
  }

  .image {
    border-radius: 4px;
    overflow: hidden;
    
    img {
      object-fit: cover;
    }
  }
}
</style>