<template>
  <div class="admin-layout">
    <!-- Mobile header -->
    <div class="mobile-header is-hidden-desktop">
      <div class="mobile-header-content">
        <div class="mobile-logo">
          <img src="@/assets/images/logo-brigante.png" alt="Estudio Brigante" class="navbar-logo">
        </div>
        <b-button
          @click="toggleSidebar"
          type="is-primary"
          icon-left="bars"
          size="is-small"
        />
      </div>
    </div>

    <!-- Sidebar overlay for mobile -->
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay is-hidden-desktop"
      @click="closeSidebar"
    ></div>

    <admin-sidebar
      :menu-items="menuItems"
      :is-mobile-open="isSidebarOpen"
      @logout="handleLogout"
      @close="closeSidebar"
    />
    
    <div class="main-content">
      <div class="dashboard-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar
  },
  data() {
    return {
      isSidebarOpen: false,
      menuItems: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          path: '/admin/dashboard'
        },
        {
          label: 'Propiedades',
          icon: 'home',
          path: '/admin/properties'
        },
        {
          label: 'Cotizaciones',
          icon: 'user-shield',
          path: '/admin/quotes'
        },
      ]
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
  watch: {
    '$route'() {
      // Cerrar sidebar al cambiar de ruta en mobile
      this.isSidebarOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: $background-light;
  
  @media (max-width: 1023px) {
    flex-direction: column;
  }
}

.mobile-header {
  background-color: white;
  border-bottom: 1px solid $neutral-light;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1001;
  
  .mobile-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .mobile-logo {
    .navbar-logo {
      height: 32px;
    }
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1023px) {
    margin-top: 0;
  }
}

.content-header {
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid $neutral-light;
  position: sticky;
  top: 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}
</style>
