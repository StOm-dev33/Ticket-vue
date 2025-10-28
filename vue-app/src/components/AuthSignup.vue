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
        <div class="auth-card" role="main" aria-labelledby="signup-heading">
          <h2 id="signup-heading">Create account</h2>
          <p style="color:var(--muted)">Sign up to get started with TicketApp.</p>

          <form class="form" @submit.prevent="handleSubmit">
            <div class="field">
              <label for="email">Email</label>
              <input id="email" v-model="email" aria-label="email" />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input id="password" type="password" v-model="password" aria-label="password" />
            </div>
            <div v-if="error" class="error" role="alert">{{ error }}</div>
            <div style="margin-top:12px">
              <button class="btn" type="submit">Create account</button>
              <router-link to="/auth/login" style="margin-left:12px">Login</router-link>
            </div>
          </form>
        </div>
      </div>

      <img src="/assets/circle.svg" alt="decorative circle" class="decorative-circle"/>
      <div class="hero-wave"><img src="/assets/wave.svg" alt="wave"/></div>
    </main>

    <footer class="site-footer">
      <div class="container">© TicketApp — Example implementation</div>
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
        localStorage.setItem('ticketapp_user', JSON.stringify({email: this.email}))
        const token = btoa(this.email + ':' + Date.now())
        localStorage.setItem('ticketapp_session', token)
        this.toast = 'Account created'
        setTimeout(() => this.$router.push('/dashboard'), 600)
      } catch(err) {
        this.error = 'Failed to create account — please try again.'
      }
    }
  }
}
</script>