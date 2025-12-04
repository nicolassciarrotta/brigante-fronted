<template>
  <div class="privacy-policy-page">
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 has-text-white">
            Política de Privacidad
          </h1>
          <p class="subtitle is-4 has-text-white mt-3">
            Términos y condiciones de uso del sitio web
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="content-wrapper">
          <div class="box policy-box">
            <h2 class="title is-3 has-text-primary">Sobre la Web</h2>
            <div class="content">
              <p>
                Esta Web pertenece a <strong>Emmanuel Alcides Brigante</strong> (en adelante LA EMPRESA) 
                y su acceso y utilización está sujeta a la aceptación y cumplimiento de los términos y 
                condiciones que se exponen a continuación:
              </p>
            </div>
          </div>

          <div class="box policy-box">
            <h2 class="title is-3 has-text-primary">Política de Privacidad</h2>
            <div class="content">
              <p>
                La utilización e ingreso a la presente página web de LA EMPRESA, será considerado como 
                aceptación de los términos de esta Política de Privacidad por parte del USUARIO y/o VISITANTE.
              </p>
              
              <p>
                Los datos personales que el USUARIO y/o VISITANTE brinde libre y voluntariamente a LA EMPRESA, 
                tales como nombres, correo electrónico, DNI, teléfono y/o número de legajo, y/o cualquier otro 
                que voluntariamente suministre a LA EMPRESA cuando ello sea necesario para brindarle un servicio 
                específico, son incluidos en archivos automatizados, procesados bajo normas de estricta 
                confidencialidad y protección de datos.
              </p>
              
              <p>
                El USUARIO y/o VISITANTE podrá brindar información con respecto a sus gustos, evaluaciones y 
                preferencias. LA EMPRESA utilizará dicha información para elaborar publicidad y/o perfeccionar 
                el servicio brindado.
              </p>
              
              <p>
                No obstante lo anterior y en cumplimiento con las leyes aplicables, LA EMPRESA coopera con las 
                autoridades gubernamentales nacionales, provinciales y municipales, e internacionales en cualquier 
                investigación en relación con el contenido, ya sean personales o privadas, transmitidas a LA EMPRESA 
                a través de este Sitio.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <h4 class="title is-6">Estudio Brigante</h4>
            <p class="has-text-grey-light">
              Soluciones integrales en seguros, gestoría, inmobiliaria e inversiones desde 2009.
            </p>
          </div>
          <div class="column is-4">
            <h4 class="title is-6">Enlaces Rápidos</h4>
            <ul>
              <li><a @click="$router.push('/home')">Inicio</a></li>
              <li><a @click="$router.push('/properties')">Propiedades</a></li>
              <li><a @click="$router.push('/insurance')">Seguros</a></li>
              <li><a @click="$router.push('/privacy-policy')">Política de Privacidad</a></li>
            </ul>
          </div>
          <div class="column is-4">
            <h4 class="title is-6">Contacto</h4>
            <p class="has-text-grey-light">
              <b-icon icon="phone" size="is-small"></b-icon>
              +54 2346-532089
            </p>
            <p class="has-text-grey-light">
              <b-icon icon="envelope" size="is-small"></b-icon>
              info@estudiobrigante.com.ar
            </p>
            <p class="has-text-grey-light">
              <b-icon icon="map-marker" size="is-small"></b-icon>
              Av. La Razón 41, Chivilcoy, Bs. As
            </p>
          </div>
        </div>
        <hr />
        <div class="has-text-centered">
          <p class="has-text-grey">
            &copy; 2025 Estudio Brigante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.privacy-policy-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  background: linear-gradient(135deg, $primary 0%, $primary-light 100%);

  .title {
    @media (max-width: 768px) {
      margin-top: 25px;
    }
  }
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

.policy-box {
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid $primary;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }

  .content p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    text-align: justify;
  }
}

.contact-box {
  background: linear-gradient(135deg, $primary-lightest 0%, #ffffff 100%);
  border: 2px solid $primary;
  padding: 2rem;
}

.footer {
  background-color: $neutral-dark;
  color: white;
  margin-top: auto;

  a {
    color: inherit;
    
    &:hover {
      color: $primary-light;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
  }

  p {
    margin-bottom: 0.5rem;
  }
}
</style>
