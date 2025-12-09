<template>
  <aside class="menu-sidebar" :class="{ 'is-collapsed': collapsed, 'is-mobile-open': isMobileOpen }">
    <div class="sidebar-header">
      <div class="sidebar-header-content">
        <a class="navbar-item" @click="handleNavigation('/home')">
          <img src="@/assets/images/logo-brigante.png" alt="Estudio Brigante" class="navbar-logo">
        </a>
        <b-button
          @click="$emit('close')"
          type="is-light"
          icon-left="close"
          size="is-small"
          class="close-btn is-hidden-desktop"
        />
      </div>
    </div>

    <div class="sidebar-content">
      <b-menu>
        <b-menu-list>
          <b-menu-item
            v-for="item in menuItems"
            :key="item.path"
            :icon="item.icon"
            :label="collapsed ? '' : item.label"
            :active="isActive(item.path)"
            @click="navigate(item.path)"
            :expanded="item.expanded"
          >
            <b-menu-item
              v-for="subItem in item.children"
              :key="subItem.path"
              :icon="subItem.icon"
              :label="collapsed ? '' : subItem.label"
              :active="isActive(subItem.path)"
              @click="navigate(subItem.path)"
            />
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>

    <div class="sidebar-footer">
      <b-menu>
        <b-menu-list>
          <b-menu-item
            icon="arrow-right-from-bracket"
            :label="collapsed ? '' : 'Logout'"
            @click="$emit('logout')"
          />
        </b-menu-list>
      </b-menu>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    isMobileOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    navigate(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
        // Emitir close para cerrar sidebar en mobile
        this.$emit('close')
      }
    },
    isActive(path) {
      return this.$route.path === path || this.$route.path.startsWith(path + '/')
    },
    handleNavigation(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
.menu-sidebar {
  width: 260px;
  min-height: 100vh;
  background-color: white;
  border-right: 1px solid $neutral-light;
  box-shadow: 8px 3px 26px -1px rgba(0,0,0,0.33);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, transform 0.3s ease;
  
  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
    
    &.is-mobile-open {
      transform: translateX(0);
    }
  }
  
  &.is-collapsed {
    width: 80px;
    
    .sidebar-header .media-content {
      display: none;
    }
  }
  
  .sidebar-header {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid $neutral-light;
    
    .sidebar-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .navbar-item {
      padding: 0;
    }
    
    .navbar-logo {
      height: 40px;
      
      @media (max-width: 768px) {
        height: 32px;
      }
    }
    
    .close-btn {
      margin-left: auto;
    }
    
    .title {
      margin-bottom: 0.25rem;
      color: $neutral-dark;
    }
    
    .subtitle {
      color: $neutral-text;
    }
  }
  
  .sidebar-content {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
  }
  
  .sidebar-footer {
    padding: 1rem 0;
    border-top: 1px solid $neutral-light;
  }
}

::v-deep .menu-list {
  a {
    color: $neutral-dark;
    border-radius: 0.5rem;
    margin: 0.25rem 0.5rem;
    
    &:hover {
      background-color: rgba($primary, 0.1);
      color: $primary;
    }
    
    &.is-active {
      background-color: rgba($primary, 0.2);
      color: $primary;
      font-weight: 600;
    }
  }
}
</style>
