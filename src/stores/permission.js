import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    roles: [],
    permissions: []
  }),
  getters: {
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission)
    }
  },
  actions: {
    setRoles(roles) {
      this.roles = roles
    },
    setPermissions(permissions) {
      this.permissions = permissions
    }
  }
}) 