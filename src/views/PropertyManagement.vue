<template>
  <div class="property-management">
    <loading ref="loading" />

    <div class="container is-fluid">
      <div class="level mb-5">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h1 class="title is-3">Gestión de Propiedades</h1>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button
              type="is-primary"
              icon-left="plus-circle"
              @click="openAddModal"
            >
              Agregar Propiedad
            </b-button>
          </div>
        </div>
      </div>

      <div class="box mb-5">
        <div class="columns">
          <div class="column is-6">
            <b-field label="Buscar">
              <b-input
                v-model="searchQuery"
                placeholder="Buscar propiedades"
                icon="magnifying-glass"
                icon-clickable
              />
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Estado">
              <b-select v-model="filterStatus" expanded>
                <option value="">Todos los Estados</option>
                <option value="available">Disponible</option>
                <option value="sold">Vendida</option>
                <option value="rented">Alquilada</option>
                <option value="pending">Pendiente</option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-3">
            <b-field label="Tipo">
              <b-select v-model="filterType" expanded>
                <option value="">Todos los Tipos</option>
                <option value="apartament">Departamento</option>
                <option value="home">Casa</option>
                <option value="land">Terreno</option>
                <option value="local">Local</option>
                <option value="office">Oficina</option>
              </b-select>
            </b-field>
          </div>
        </div>
      </div>

      <div class="box">
        <PropertiesTable
          :properties="paginatedProperties"
          :loading="isLoading"
          @view="viewProperty"
          @edit="editProperty"
          @manage-images="manageImages"
          @delete="deleteProperty"
        />

        <Pagination
          v-if="totalProperties > perPage"
          :total="totalProperties"
          :perPage="perPage"
          @pageChange="handlePageChange"
          class="mt-4"
        />
      </div>
    </div>

    <b-modal
      v-model="isModalActive"
      has-modal-card
      :width="1400"
      :can-cancel="false"
      class="property-modal"
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ isEditMode ? "Editar Propiedad" : "Agregar Nueva Propiedad" }}
          </p>
          <button type="button" class="delete" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Información Básica</h2>

            <b-field label="Título de la Propiedad">
              <b-input
                v-model="form.title"
                placeholder="Ej: Casa en venta - 3 dormitorios"
                required
              />
            </b-field>

            <b-field label="Descripción">
              <b-input
                v-model="form.description"
                type="textarea"
                rows="4"
                placeholder="Describe la propiedad..."
              />
            </b-field>

            <div class="columns">
              <div class="column is-4">
                <b-field label="Tipo de Propiedad">
                  <b-select v-model="form.type" expanded required>
                    <option value="home">Casa</option>
                    <option value="apartament">Departamento</option>
                    <option value="land">Terreno</option>
                    <option value="local">Local Comercial</option>
                    <option value="office">Oficina</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Operación">
                  <b-select v-model="form.operation" expanded required>
                    <option value="sale">Venta</option>
                    <option value="rent">Alquiler</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Estado">
                  <b-select v-model="form.status" expanded required>
                    <option value="available">Disponible</option>
                    <option value="pending">Pendiente</option>
                    <option value="sold">Vendida</option>
                    <option value="rented">Alquilada</option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Precio</h2>
            <div class="columns">
              <div class="column is-8">
                <b-field label="Precio">
                  <b-input
                    v-model.number="form.price"
                    type="number"
                    step="0.01"
                    required
                  />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Moneda">
                  <b-select v-model="form.currency" expanded>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Ubicación</h2>
            <b-field label="Dirección">
              <b-input
                v-model="form.address"
                placeholder="Calle y número"
                required
              />
            </b-field>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Ciudad">
                  <b-input v-model="form.city" placeholder="Ciudad" required />
                </b-field>
              </div>
              <div class="column is-6">
                <b-field label="Provincia/Estado">
                  <b-input
                    v-model="form.state"
                    placeholder="Provincia"
                    required
                  />
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Características</h2>
            <div class="columns">
              <div class="column is-3">
                <b-field label="Dormitorios">
                  <b-input
                    v-model.number="form.bedrooms"
                    type="number"
                    min="0"
                  />
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Baños">
                  <b-input
                    v-model.number="form.bathrooms"
                    type="number"
                    min="0"
                  />
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Cocheras">
                  <b-input
                    v-model.number="form.parking_spaces"
                    type="number"
                    min="0"
                  />
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Pisos">
                  <b-input v-model.number="form.floors" type="number" min="1" />
                </b-field>
              </div>
            </div>

            <div class="columns">
              <div class="column is-4">
                <b-field label="Superficie Total (m²)">
                  <b-input
                    v-model.number="form.total_area"
                    type="number"
                    step="0.01"
                    required
                  />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Superficie Construida (m²)">
                  <b-input
                    v-model.number="form.built_area"
                    type="number"
                    step="0.01"
                    required
                  />
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Año de Construcción">
                  <b-input
                    v-model.number="form.year_built"
                    type="number"
                    min="1900"
                    :max="currentYear"
                  />
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Datos importantes</h2>
            <div class="columns">
              <div class="column is-3">
                <b-field label="Nomenclatura Catastral">
                  <b-input
                    v-model="form.cadastral_nomenclature"
                    type="text"
                  />
                </b-field>
              </div>
              <div class="column is-3">
                <b-field label="Número de Partida">
                  <b-input
                    v-model="form.departure_number"
                    type="text"
                  />
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Características Especiales</h2>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-checkbox v-model="form.has_pool">Piscina</b-checkbox>
                </b-field>
                <b-field>
                  <b-checkbox v-model="form.has_garden">Jardín</b-checkbox>
                </b-field>
                <b-field>
                  <b-checkbox v-model="form.has_garage">Cochera</b-checkbox>
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-checkbox v-model="form.has_security"
                    >Seguridad 24hs</b-checkbox
                  >
                </b-field>
                <b-field>
                  <b-checkbox v-model="form.furnished">Amueblado</b-checkbox>
                </b-field>
                <b-field>
                  <b-checkbox v-model="form.featured">Destacada</b-checkbox>
                </b-field>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="subtitle is-5 mb-3">Comodidades</h2>
            <div class="columns is-multiline">
              <div
                class="column is-3"
                v-for="amenity in availableAmenities"
                :key="amenity"
              >
                <b-checkbox v-model="selectedAmenities" :native-value="amenity">
                  {{ amenity }}
                </b-checkbox>
              </div>
            </div>
          </div>

          <div class="mb-5" v-if="!isEditMode">
            <h2 class="subtitle is-5 mb-3">Imágenes</h2>
            <b-field>
              <b-upload
                v-model="imageFiles"
                multiple
                drag-drop
                accept="image/*"
                @input="handleImageUpload"
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>
                      Arrastra las imágenes aquí o haz clic para seleccionar
                    </p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div
              class="columns is-multiline mt-3"
              v-if="imagePreviews.length > 0"
            >
              <div
                class="column is-3"
                v-for="(preview, index) in imagePreviews"
                :key="index"
              >
                <div class="image-preview-card">
                  <figure class="image is-4by3">
                    <img :src="preview" loading="lazy"/>
                  </figure>
                  <b-button
                    type="is-danger"
                    size="is-small"
                    icon-left="trash"
                    @click="removeImage(index)"
                    class="remove-image-btn"
                  >
                    Eliminar
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="closeModal">Cancelar</b-button>
          <b-button type="is-primary" @click="saveProperty" :loading="isSaving">
            {{ isEditMode ? "Actualizar" : "Crear" }}
          </b-button>
        </footer>
      </div>
    </b-modal>

    <b-modal v-model="isImageModalActive" has-modal-card :width="800">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Gestionar Imágenes</p>
          <button type="button" class="delete" @click="closeImageModal" />
        </header>
        <section class="modal-card-body">
          <b-field>
            <b-upload
              v-model="newImages"
              multiple
              drag-drop
              accept="image/*"
              @input="handleNewImageUpload"
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Agregar nuevas imágenes</p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div
            class="columns is-multiline mt-4"
            v-if="currentPropertyImages.length > 0"
          >
            <div
              class="column is-4"
              v-for="image in currentPropertyImages"
              :key="image.id"
            >
              <div class="image-card">
                <figure class="image is-4by3">
                  <img :src="getImageUrl(image)" />
                </figure>
                <div class="image-actions">
                  <b-tag
                    :type="image.is_main ? 'is-success' : 'is-light'"
                    class="mb-2"
                  >
                    {{ image.is_main ? "Principal" : "Secundaria" }}
                  </b-tag>
                  <div class="buttons">
                    <b-button
                      size="is-small"
                      type="is-info"
                      v-if="!image.is_main"
                      @click="setMainImage(image)"
                    >
                      Hacer Principal
                    </b-button>
                    <b-button
                      size="is-small"
                      type="is-danger"
                      icon-left="trash"
                      @click="deleteImage(image)"
                    >
                      Eliminar
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="has-text-centered">
            <p>Esta propiedad no tiene imágenes</p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="closeImageModal">Cerrar</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Loading from "@/components/LoadingComponent.vue";
import Pagination from "@/components/PaginationComponent.vue";
import PropertiesTable from "@/components/PropertiesTable.vue";

export default {
  name: "PropertyManagement",
  components: {
    Loading,
    Pagination,
    PropertiesTable,
  },
  data() {
    return {
      searchQuery: "",
      filterStatus: "",
      filterType: "",
      isLoading: false,
      isSaving: false,
      currentPage: 1,
      perPage: 10,
      totalProperties: 0,
      isModalActive: false,
      isImageModalActive: false,
      isEditMode: false,
      form: this.getEmptyForm(),
      imageFiles: [],
      imagePreviews: [],
      newImages: [],
      currentPropertyImages: [],
      selectedProperty: null,
      selectedAmenities: [],
      availableAmenities: [
        "Aire Acondicionado",
        "Calefacción",
        "Internet/WiFi",
        "TV por Cable",
        "Lavarropas",
        "Cocina Equipada",
        "Parrilla",
        "Balcón",
        "Terraza",
        "Patio",
        "Portón Eléctrico",
        "Alarma",
        "Cámaras de Seguridad",
        "Gimnasio",
        "Quincho",
        "SUM",
        "Solarium",
        "Ascensor",
        "Baulera",
      ],
      defaultImage:
        "https://www.argentina.gob.ar/sites/default/files/0l3a8806_1.jpg",
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    properties() {
      return this.$store.getters["Properties/properties"] || [];
    },
    filteredProperties() {
      let filtered = [...this.properties];

      if (this.searchQuery) {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (p.city &&
              p.city.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
            (p.address &&
              p.address.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      }

      if (this.filterStatus) {
        filtered = filtered.filter((p) => p.status === this.filterStatus);
      }

      if (this.filterType) {
        filtered = filtered.filter((p) => p.type === this.filterType);
      }

      return filtered;
    },
    paginatedProperties() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredProperties.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchProperties();
  },
  methods: {
    async fetchProperties(page = 1) {
      try {
        this.isLoading = true;
        const response = await this.$store.dispatch(
          "Properties/fetchProperties",
          {
            limit: this.perPage,
            page: page,
          }
        );
        this.totalProperties = response.total;
        this.isLoading = false;
      } catch (err) {
        console.error("Error fetching properties:", err);
        this.isLoading = false;
        this.$buefy.toast.open({
          message: "Error al cargar las propiedades",
          type: "is-danger",
        });
      }
    },
    handlePageChange(page) {
      this.fetchProperties(page);
    },
    getEmptyForm() {
      return {
        title: "",
        description: "",
        type: "home",
        operation: "sale",
        price: "",
        currency: "USD",
        address: "",
        city: "",
        state: "Buenos Aires",
        bedrooms: 1,
        bathrooms: 1,
        parking_spaces: 0,
        total_area: "",
        built_area: "",
        floors: 1,
        year_built: null,
        has_pool: false,
        has_garden: false,
        has_garage: false,
        has_security: false,
        furnished: false,
        status: "available",
        featured: false,
        cadastral_nomenclature: "",
        departure_number: "",
      };
    },
    openAddModal() {
      this.isEditMode = false;
      this.form = this.getEmptyForm();
      this.selectedAmenities = [];
      this.imageFiles = [];
      this.imagePreviews = [];
      this.isModalActive = true;
    },
    async editProperty(property) {
      this.isEditMode = true;
      this.form = { ...property };

      if (property.amenities) {
        try {
          this.selectedAmenities =
            typeof property.amenities === "string"
              ? JSON.parse(property.amenities)
              : property.amenities;
        } catch (e) {
          this.selectedAmenities = [];
        }
      } else {
        this.selectedAmenities = [];
      }

      this.isModalActive = true;
    },
    viewProperty(property) {
      this.$router.push(`/properties/${property.id}`);
    },
    async manageImages(property) {
      this.selectedProperty = property;
      this.isImageModalActive = true;

      try {
        this.$refs.loading.show();
        const images = await this.$store.dispatch(
          "Properties/fetchPropertyImages",
          {
            id: property.id,
          }
        );
        this.currentPropertyImages = images;
        this.$refs.loading.hide();
      } catch (err) {
        console.error("Error loading images:", err);
        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: "Error al cargar las imágenes",
          type: "is-danger",
        });
      }
    },
    deleteProperty(property) {
      this.$buefy.dialog.confirm({
        title: "Eliminar Propiedad",
        message: `¿Estás seguro de eliminar <b>${property.title}</b>?`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => {
          try {
            this.$refs.loading.show();
            await this.$store.dispatch("Properties/deleteProperty", {
              id: property.id,
              admin: true,
            });
            this.$buefy.toast.open({
              message: "Propiedad eliminada!",
              type: "is-success",
            });
            await this.fetchProperties();
            this.$refs.loading.hide();
          } catch (err) {
            console.error("Error deleting property:", err);
            this.$refs.loading.hide();
            this.$buefy.toast.open({
              message: "Error al eliminar la propiedad",
              type: "is-danger",
            });
          }
        },
      });
    },
    async saveProperty() {
      try {
        this.isSaving = true;

        if (this.isEditMode) {
          const propertyData = {
            ...this.form,
            amenities: JSON.stringify(this.selectedAmenities),
          };

          await this.$store.dispatch("Properties/updateProperty", propertyData);
          
          this.$buefy.toast.open({
            message: "Propiedad actualizada!",
            type: "is-success",
          });
        } else {
          const formData = new FormData();

          formData.append('title', this.form.title);
          formData.append('description', this.form.description);
          formData.append('type', this.form.type);
          formData.append('operation', this.form.operation);
          formData.append('price', this.form.price);
          formData.append('currency', this.form.currency);
          formData.append('address', this.form.address);
          formData.append('city', this.form.city);
          formData.append('state', this.form.state);
          formData.append('bedrooms', this.form.bedrooms);
          formData.append('bathrooms', this.form.bathrooms);
          formData.append('parking_spaces', this.form.parking_spaces);
          formData.append('total_area', this.form.total_area);
          formData.append('built_area', this.form.built_area);
          formData.append('floors', this.form.floors);
          formData.append('cadastral_nomenclature', this.form.cadastral_nomenclature);
          formData.append('departure_number', this.form.departure_number);

          if (this.form.year_built) {
            formData.append('year_built', this.form.year_built);
          }

          formData.append('has_pool', this.form.has_pool ? 1 : 0);
          formData.append('has_garden', this.form.has_garden ? 1 : 0);
          formData.append('has_garage', this.form.has_garage ? 1 : 0);
          formData.append('has_security', this.form.has_security ? 1 : 0);
          formData.append('furnished', this.form.furnished ? 1 : 0);
          formData.append('featured', this.form.featured ? 1 : 0);
          formData.append('status', this.form.status);

          formData.append('amenities', JSON.stringify(this.selectedAmenities));

          if (this.imageFiles.length > 0) {
            this.imageFiles.forEach((file, index) => {
              formData.append(`images[]`, file);
              if (index === 0) {
                formData.append('main_image_index', 0);
              }
            });
          }

          await this.$store.dispatch("Properties/createPropertyWithImages", formData);

          this.$buefy.toast.open({
            message: "Propiedad creada con imágenes!",
            type: "is-success",
          });
        }

        await this.fetchProperties();
        this.isSaving = false;
        this.closeModal();
      } catch (err) {
        console.error("Error saving property:", err);
        this.isSaving = false;
        this.$buefy.toast.open({
          message: `Error al guardar la propiedad: ${err.response?.data?.message || err.message}`,
          type: "is-danger",
        });
      }
    },
    handleImageUpload() {
      this.imagePreviews = [];
      
      const validFiles = [];
      this.imageFiles.forEach((file) => {
        // Validar tamaño (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          this.$buefy.toast.open({
            message: `El archivo ${file.name} es demasiado grande (máx 10MB)`,
            type: 'is-warning'
          });
          return;
        }

        // Validar tipo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          this.$buefy.toast.open({
            message: `El archivo ${file.name} no es una imagen válida`,
            type: 'is-warning'
          });
          return;
        }

        validFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      this.imageFiles = validFiles;
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },
    async handleNewImageUpload() {
      if (!this.selectedProperty) return;

      try {
        this.$refs.loading.show();

        for (const file of this.newImages) {
          await this.$store.dispatch("Properties/uploadPropertyImage", {
            property_id: this.selectedProperty.id,
            image: file,
            is_main: 0,
          });
        }

        const images = await this.$store.dispatch(
          "Properties/fetchPropertyImages",
          {
            id: this.selectedProperty.id,
          }
        );
        this.currentPropertyImages = images;
        this.newImages = [];

        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: "Imágenes subidas correctamente",
          type: "is-success",
        });
      } catch (err) {
        console.error("Error uploading images:", err);
        this.$refs.loading.hide();
        this.$buefy.toast.open({
          message: "Error al subir las imágenes",
          type: "is-danger",
        });
      }
    },
    async setMainImage(image) {
      this.$buefy.toast.open({
        message: "Funcionalidad pendiente de implementar",
        type: "is-info",
      });
    },
    async deleteImage(image) {
      this.$buefy.dialog.confirm({
        title: "Eliminar Imagen",
        message: "¿Estás seguro de eliminar esta imagen?",
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "is-danger",
        onConfirm: async () => {
          try {
            this.$refs.loading.show();
            await this.$store.dispatch("Properties/deletePropertyImage", {
              property_id: this.selectedProperty.id,
              image_id: image.id,
            });

            const images = await this.$store.dispatch(
              "Properties/fetchPropertyImages",
              {
                id: this.selectedProperty.id,
              }
            );
            this.currentPropertyImages = images;

            this.$refs.loading.hide();
            this.$buefy.toast.open({
              message: "Imagen eliminada",
              type: "is-success",
            });
          } catch (err) {
            console.error("Error deleting image:", err);
            this.$refs.loading.hide();
            this.$buefy.toast.open({
              message: "Error al eliminar la imagen",
              type: "is-danger",
            });
          }
        },
      });
    },
    closeModal() {
      this.isModalActive = false;
      this.form = this.getEmptyForm();
      this.imageFiles = [];
      this.imagePreviews = [];
      this.selectedAmenities = [];
    },
    closeImageModal() {
      this.isImageModalActive = false;
      this.selectedProperty = null;
      this.currentPropertyImages = [];
      this.newImages = [];
    },
    getImageUrl(image) {
      if (image.path) {
        const url = process.env.VUE_APP_HOST_API;
        return `${url}storage/${image.path}`;
      }
      return this.defaultImage;
    },
  },
};
</script>

<style lang="scss">
.property-modal {
  .modal-card {
    width: 90vw !important;
    max-width: 1400px !important;
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.property-management {
  .box {
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .image-preview-card,
  .image-card {
    position: relative;
    border: 1px solid #dbdbdb;
    border-radius: 6px;
    overflow: hidden;

    .remove-image-btn {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
    }

    .main-image-tag {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
    }

    .image-actions {
      padding: 0.75rem;
      text-align: center;
    }
  }

  .modal-card-body {
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>