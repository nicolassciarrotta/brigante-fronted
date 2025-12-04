<template>
  <div class="admin-layout">
    <admin-sidebar
      :menu-items="menuItems"
      @logout="handleLogout"
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
      ]
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: $background-light;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-header {
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid $neutral-light;
  position: sticky;
  top: 0;
  z-index: 10;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>
