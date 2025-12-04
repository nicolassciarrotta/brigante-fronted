<template>
  <div class="insurance-management">
    <div class="dashboard-layout">
      <div class="main-content">
        <div class="container is-fluid">
          <div class="level mb-5">
            <div class="level-left">
              <div class="level-item">
                <div>
                  <h1 class="title is-3">Insurance Company Management</h1>
                  <p class="subtitle is-6 has-text-grey">Add, edit, or delete insurance company records</p>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <b-button 
                  type="is-primary" 
                  icon-left="plus"
                  @click="openAddModal"
                >
                  Add New Company
                </b-button>
              </div>
            </div>
          </div>

          <div class="box mb-5">
            <b-field>
              <b-input
                v-model="searchQuery"
                placeholder="Search companies..."
                icon="magnify"
                icon-clickable
                expanded
              />
            </b-field>
          </div>

          <div class="box">
            <b-table
              :data="filteredCompanies"
              :loading="isLoading"
              :hoverable="true"
              :mobile-cards="true"
              :paginated="true"
              :per-page="perPage"
              :current-page.sync="currentPage"
              default-sort="name"
            >
              <b-table-column field="id" label="ID" width="60" sortable v-slot="props">
                {{ props.row.id }}
              </b-table-column>

              <b-table-column field="name" label="Company" sortable v-slot="props">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="props.row.logo" :alt="props.row.name" loading="lazy">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="has-text-weight-bold">{{ props.row.name }}</p>
                    <p class="is-size-7 has-text-grey">{{ props.row.email }}</p>
                  </div>
                </div>
              </b-table-column>

              <b-table-column field="city" label="Location" sortable v-slot="props">
                {{ props.row.city }}, {{ props.row.state }}
              </b-table-column>

              <b-table-column field="phone" label="Phone" v-slot="props">
                {{ props.row.phone }}
              </b-table-column>

              <b-table-column field="rating" label="Rating" sortable centered v-slot="props">
                <b-rate v-model="props.row.rating" disabled size="is-small" />
              </b-table-column>

              <b-table-column field="status" label="Status" sortable v-slot="props">
                <b-tag :type="props.row.active ? 'is-success' : 'is-danger'">
                  {{ props.row.active ? 'Active' : 'Inactive' }}
                </b-tag>
              </b-table-column>

              <b-table-column label="Actions" v-slot="props">
                <b-dropdown aria-role="list" position="is-bottom-left">
                  <template #trigger>
                    <b-button size="is-small" icon-right="dots-vertical" />
                  </template>
                  <b-dropdown-item @click="editCompany(props.row)">
                    <b-icon icon="pencil" size="is-small" />
                    Edit
                  </b-dropdown-item>
                  <b-dropdown-item @click="toggleStatus(props.row)">
                    <b-icon icon="power" size="is-small" />
                    {{ props.row.active ? 'Deactivate' : 'Activate' }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="deleteCompany(props.row)">
                    <b-icon icon="delete" size="is-small" type="is-danger" />
                    <span class="has-text-danger">Delete</span>
                  </b-dropdown-item>
                </b-dropdown>
              </b-table-column>

              <template #empty>
                <div class="has-text-centered">
                  <p>No insurance companies found</p>
                </div>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="isModalActive" has-modal-card :width="700">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ isEditMode ? 'Edit Company' : 'Add New Company' }}</p>
          <button type="button" class="delete" @click="closeModal" />
        </header>
        <section class="modal-card-body">
          <b-field label="Company Name">
            <b-input v-model="form.name" required />
          </b-field>
          
          <div class="columns">
            <div class="column is-6">
              <b-field label="City">
                <b-input v-model="form.city" required />
              </b-field>
            </div>
            <div class="column is-6">
              <b-field label="State">
                <b-input v-model="form.state" required />
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <b-field label="Phone">
                <b-input v-model="form.phone" type="tel" required />
              </b-field>
            </div>
            <div class="column is-6">
              <b-field label="Email">
                <b-input v-model="form.email" type="email" required />
              </b-field>
            </div>
          </div>

          <b-field label="Rating">
            <b-rate v-model="form.rating" :max="5" />
          </b-field>

          <b-field label="Logo URL">
            <b-input v-model="form.logo" placeholder="https://..." />
          </b-field>

          <b-field>
            <b-checkbox v-model="form.active">
              Active
            </b-checkbox>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="closeModal">Cancel</b-button>
          <b-button type="is-primary" @click="saveCompany">
            {{ isEditMode ? 'Update' : 'Create' }}
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'InsuranceManagement',
  data() {
    return {
      sidebarMenu: [
        { label: 'Dashboard', icon: 'view-dashboard', path: '/admin/dashboard' },
        { label: 'Properties', icon: 'home-city', path: '/admin/properties' },
        { label: 'Insurance', icon: 'shield-check', path: '/admin/insurance' },
        { label: 'Users', icon: 'account-group', path: '/admin/users' }
      ],
      searchQuery: '',
      isLoading: false,
      currentPage: 1,
      perPage: 10,
      isModalActive: false,
      isEditMode: false,
      form: this.getEmptyForm(),
      companies: [
        {
          id: 1,
          name: 'SecureHome Insurance',
          logo: 'https://via.placeholder.com/96',
          rating: 4.5,
          city: 'New York',
          state: 'NY',
          phone: '(555) 123-4567',
          email: 'info@securehome.com',
          active: true
        },
        {
          id: 2,
          name: 'PropertyGuard Co.',
          logo: 'https://via.placeholder.com/96',
          rating: 4.8,
          city: 'Los Angeles',
          state: 'CA',
          phone: '(555) 234-5678',
          email: 'contact@propertyguard.com',
          active: true
        },
        {
          id: 3,
          name: 'RealtyShield',
          logo: 'https://via.placeholder.com/96',
          rating: 4.3,
          city: 'Chicago',
          state: 'IL',
          phone: '(555) 345-6789',
          email: 'support@realtyshield.com',
          active: false
        }
      ]
    }
  },
  computed: {
    filteredCompanies() {
      let filtered = [...this.companies]
      
      if (this.searchQuery) {
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          c.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      return filtered
    }
  },
  methods: {
    getEmptyForm() {
      return {
        name: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        rating: 0,
        logo: 'https://via.placeholder.com/96',
        active: true
      }
    },
    openAddModal() {
      this.isEditMode = false
      this.form = this.getEmptyForm()
      this.isModalActive = true
    },
    editCompany(company) {
      this.isEditMode = true
      this.form = { ...company }
      this.isModalActive = true
    },
    toggleStatus(company) {
      company.active = !company.active
      this.$buefy.toast.open({
        message: `Company ${company.active ? 'activated' : 'deactivated'}!`,
        type: 'is-success'
      })
    },
    deleteCompany(company) {
      this.$buefy.dialog.confirm({
        title: 'Delete Company',
        message: `Are you sure you want to delete <b>${company.name}</b>?`,
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          const index = this.companies.findIndex(c => c.id === company.id)
          if (index > -1) {
            this.companies.splice(index, 1)
          }
          this.$buefy.toast.open({
            message: 'Company deleted!',
            type: 'is-success'
          })
        }
      })
    },
    saveCompany() {
      if (this.isEditMode) {
        const index = this.companies.findIndex(c => c.id === this.form.id)
        if (index > -1) {
          this.companies.splice(index, 1, { ...this.form })
        }
        this.$buefy.toast.open({
          message: 'Company updated!',
          type: 'is-success'
        })
      } else {
        const newCompany = {
          ...this.form,
          id: this.companies.length + 1
        }
        this.companies.push(newCompany)
        this.$buefy.toast.open({
          message: 'Company created!',
          type: 'is-success'
        })
      }
      this.closeModal()
    },
    closeModal() {
      this.isModalActive = false
      this.form = this.getEmptyForm()
    },
    handleLogout() {
      this.$router.push('/login')
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.insurance-management {
  min-height: 100vh;
  background-color: $background-light;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.box {
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
