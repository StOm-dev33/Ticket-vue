<template>
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Dashboard</h2>
      <div>
        <router-link to="/tickets" class="btn">Manage Tickets</router-link>
        <button @click="logout" class="btn ghost" style="margin-left:12px">Logout</button>
      </div>
    </div>

    <section style="margin-top:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px">
      <div class="card">Total tickets<br/><strong>{{ stats.total }}</strong></div>
      <div class="card">Open tickets<br/><strong>{{ stats.open }}</strong></div>
      <div class="card">Resolved tickets<br/><strong>{{ stats.resolved }}</strong></div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: { total: 0, open: 0, resolved: 0 }
    }
  },
  methods: {
    getStats() {
      try {
        const raw = localStorage.getItem('ticketapp_tickets')
        const tickets = raw ? JSON.parse(raw) : []
        const total = tickets.length
        const open = tickets.filter(t => t.status === 'open').length
        const resolved = tickets.filter(t => t.status === 'closed').length
        this.stats = { total, open, resolved }
      } catch(e) {
        this.stats = { total: 0, open: 0, resolved: 0 }
      }
    },
    logout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/auth/login')
    }
  },
  mounted() {
    this.getStats()
  }
}
</script>