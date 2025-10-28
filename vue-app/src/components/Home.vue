<template>
  <div class="site">
    <header class="site-header">
      <div class="container">
        <div class="brand">TicketApp</div>
        <nav>
          <router-link to="/auth/login" class="btn">Login</router-link>
          <router-link to="/auth/signup" class="btn ghost">Get Started</router-link>
        </nav>
      </div>
    </header>

    <main class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1>Manage tickets simply and beautifully</h1>
          <p>Track, update and resolve tickets with a consistent interface — built in Vue.</p>
          <div class="cta">
            <router-link to="/auth/login" class="btn large">Login</router-link>
            <router-link to="/auth/signup" class="btn ghost large">Get Started</router-link>
          </div>
        </div>
        <div class="hero-decor">
          <img src="/assets/circle.svg" alt="decorative circle" />
        </div>
      </div>
      <div class="hero-wave"><img src="/assets/wave.svg" alt="wave"/></div>
    </main>

    <section class="container features">
      <div class="card">Fast ticket CRUD</div>
      <div class="card">Protected routes & auth</div>
      <div class="card">Accessible & responsive</div>
    </section>

    <footer class="site-footer">
      <div class="container">© TicketApp — Example implementation</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>