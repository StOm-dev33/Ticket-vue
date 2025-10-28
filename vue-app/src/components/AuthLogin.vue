<template>
  <div class="auth-page">
    <header class="auth-header site-header">
      <div class="container">
        <div class="brand">TicketApp</div>
        <nav>
          <router-link to="/auth/login" class="btn">Login</router-link>
          <router-link to="/auth/signup" class="btn ghost">Get Started</router-link>
        </nav>
      </div>
    </header>

    <main class="auth-hero">
      <div class="container auth-card-wrap">
        <div class="auth-card" role="main" aria-labelledby="login-heading">
          <h2 id="login-heading">Login</h2>
          <p style="color:var(--muted)">Access your account to manage tickets.</p>

          <form class="form" @submit.prevent="handleSubmit" aria-describedby="login-desc">
            <div class="field">
              <label for="email">Email</label>
              <input id="email" v-model="email" aria-label="email" />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input id="password" type="password" v-model="password" aria-label="password" />
            </div>
            <div v-if="error" class="error" role="alert">{{ error }}</div>
            <div style="margin-top:12px;display:flex;align-items:center">
              <button class="btn" type="submit">Login</button>
              <router-link to="/auth/signup" style="margin-left:12px">Signup</router-link>
            </div>
          </form>
        </div>
      </div>

      <img src="/assets/circle.svg" alt="decorative circle" class="decorative-circle"/>
      <div class="hero-wave"><img src="/assets/wave.svg" alt="wave"/></div>
    </main>

    <footer class="site-footer">
      <div class="container">© TicketApp - Example implementation</div>
    </footer>

    <div v-if="toast" class="toast" role="status">{{ toast }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      toast: null
    }
  },
  methods: {
    handleSubmit() {
      if(!this.email || !this.password) {
        this.error = 'Email and password are required'
        return
      }
      try {
        const token = btoa(this.email + ':' + Date.now())
        localStorage.setItem('ticketapp_session', token)
        if(!localStorage.getItem('ticketapp_tickets')) {
          const sample = [{
            id: 1,
            title: 'Sample ticket',
            description: 'This is a sample',
            status: 'open',
            priority: 'low',
            createdAt: Date.now()
          }]
          localStorage.setItem('ticketapp_tickets', JSON.stringify(sample))
        }
        this.toast = 'Signed in'
        setTimeout(() => this.$router.push('/dashboard'), 600)
      } catch(err) {
        this.error = 'Failed to sign in — please try again.'
      }
    }
  }
}
</script>