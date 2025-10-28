<template>
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Tickets</h2>
    </div>

    <div style="margin-top:16px">
      <form class="form" @submit.prevent="editing ? handleUpdate() : handleCreate()">
        <div class="field">
          <label>Title *</label>
          <input v-model="form.title" />
          <div v-if="!form.title" class="error">Title is required</div>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="form.description"></textarea>
        </div>
        <div class="field">
          <label>Status *</label>
          <select v-model="form.status">
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
        </div>
        <div class="field">
          <label>Priority</label>
          <select v-model="form.priority">
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <div>
          <button class="btn" type="submit">{{ editing ? 'Update' : 'Create' }}</button>
          <button v-if="editing" type="button" class="btn ghost" style="margin-left:12px" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <section style="margin-top:24px">
      <div class="tickets-grid">
        <article v-for="t in tickets" :key="t.id" class="ticket-card">
          <h3>{{ t.title }}</h3>
          <div style="margin-bottom:8px">
            <span :class="['status', t.status]">{{ t.status }}</span>
          </div>
          <p style="color:#374151">{{ t.description }}</p>
          <div style="margin-top:12px;display:flex;gap:8px">
            <button class="btn" @click="startEdit(t)">Edit</button>
            <button class="btn ghost" @click="handleDelete(t.id)">Delete</button>
          </div>
        </article>
        <div v-if="tickets.length === 0" class="card">No tickets yet.</div>
      </div>
    </section>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
      editing: null,
      form: {
        title: '',
        description: '',
        status: 'open',
        priority: 'low'
      },
      error: null,
      toast: null
    }
  },
  methods: {
    loadTickets() {
      try {
        const raw = localStorage.getItem('ticketapp_tickets')
        this.tickets = raw ? JSON.parse(raw) : []
      } catch(e) {
        this.tickets = []
      }
    },
    saveToStorage(list) {
      localStorage.setItem('ticketapp_tickets', JSON.stringify(list))
    },
    handleCreate() {
      this.error = null
      if(!this.form.title) {
        this.error = 'Title is required'
        return
      }
      if(!['open','in_progress','closed'].includes(this.form.status)) {
        this.error = 'Invalid status'
        return
      }
      const newTicket = {...this.form, id: Date.now(), createdAt: Date.now()}
      const next = [newTicket, ...this.tickets]
      this.tickets = next
      this.saveToStorage(next)
      this.form = {title:'',description:'',status:'open',priority:'low'}
      this.toast = 'Ticket created'
      setTimeout(() => this.toast = null, 2000)
    },
    startEdit(t) {
      this.editing = t
      this.form = {...t}
    },
    handleUpdate() {
      if(!this.form.title) {
        this.error = 'Title is required'
        return
      }
      const next = this.tickets.map(t => t.id === this.form.id ? {...t, ...this.form} : t)
      this.tickets = next
      this.saveToStorage(next)
      this.editing = null
      this.toast = 'Ticket updated'
      setTimeout(() => this.toast = null, 2000)
    },
    handleDelete(id) {
      if(!confirm('Delete ticket?')) return
      const next = this.tickets.filter(t => t.id !== id)
      this.tickets = next
      this.saveToStorage(next)
      this.toast = 'Ticket deleted'
      setTimeout(() => this.toast = null, 2000)
    },
    cancelEdit() {
      this.editing = null
      this.form = {title:'',description:'',status:'open',priority:'low'}
    }
  },
  mounted() {
    this.loadTickets()
  }
}
</script>