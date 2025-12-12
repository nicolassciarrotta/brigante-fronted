<template>
  <div class="auto-insurance-form">
    <form @submit.prevent="submitForm">
      <div class="columns is-multiline">
        <!-- brand -->
        <div class="column is-6">
          <b-field 
            label="Marca *"
            :type="errors.brand ? 'is-danger' : ''"
            :message="errors.brand"
          >
            <b-input 
              v-model="form.brand"
              placeholder="Ej: Toyota, Ford, Chevrolet"
              :class="{ 'is-danger': errors.brand }"
              @blur="validateField('brand')"
            />
          </b-field>
        </div>

        <!-- model -->
        <div class="column is-6">
          <b-field 
            label="Modelo *"
            :type="errors.model ? 'is-danger' : ''"
            :message="errors.model"
          >
            <b-input 
              v-model="form.model"
              placeholder="Ej: Corolla, Focus, Onix"
              :class="{ 'is-danger': errors.model }"
              @blur="validateField('model')"
            />
          </b-field>
        </div>

        <!-- year -->
        <div class="column is-6">
          <b-field 
            label="Año *"
            :type="errors.year ? 'is-danger' : ''"
            :message="errors.year"
          >
            <b-select 
              v-model="form.year"
              placeholder="Seleccionar año"
              :class="{ 'is-danger': errors.year }"
              @blur="validateField('year')"
              expanded
            >
              <option 
                v-for="year in availableYears" 
                :key="year" 
                :value="year"
              >
                {{ year }}
              </option>
            </b-select>
          </b-field>
        </div>

        <!-- Código Postal -->
        <div class="column is-6">
          <b-field 
            label="Código Postal *"
            :type="errors.postalCode ? 'is-danger' : ''"
            :message="errors.postalCode"
          >
            <b-input 
              v-model="form.postalCode"
              placeholder="Ej: 1234"
              :class="{ 'is-danger': errors.postalCode }"
              @blur="validateField('postalCode')"
            />
          </b-field>
        </div>

        <div class="column is-6" v-if="isCar">
          <b-field>
            <b-checkbox v-model="form.hasGNC">
              Vehículo con GNC
            </b-checkbox>
          </b-field>
        </div>

        <!-- Nombre y Apellido -->
        <div class="column is-12">
          <b-field 
            label="Nombre y Apellido *"
            :type="errors.fullname ? 'is-danger' : ''"
            :message="errors.fullname"
          >
            <b-input 
              v-model="form.fullname"
              placeholder="Ingrese su nombre completo"
              :class="{ 'is-danger': errors.fullname }"
              @blur="validateField('fullname')"
            />
          </b-field>
        </div>

        <!-- Email -->
        <div class="column is-6">
          <b-field 
            label="Email *"
            :type="errors.email ? 'is-danger' : ''"
            :message="errors.email"
          >
            <b-input 
              v-model="form.email"
              type="email"
              placeholder="ejemplo@email.com"
              :class="{ 'is-danger': errors.email }"
              @blur="validateField('email')"
            />
          </b-field>
        </div>

        <!-- phone -->
        <div class="column is-6">
          <b-field 
            label="Teléfono *"
            :type="errors.phone ? 'is-danger' : ''"
            :message="errors.phone"
          >
            <b-input 
              v-model="form.phone"
              placeholder="11 2345-6789"
              :class="{ 'is-danger': errors.phone }"
              @blur="validateField('phone')"
            />
          </b-field>
        </div>

        <!-- availability Horaria -->
        <div class="column is-12">
          <b-field 
            label="Disponibilidad Horaria *"
            :type="errors.availability ? 'is-danger' : ''"
            :message="errors.availability"
          >
            <b-select 
              v-model="form.availability"
              placeholder="Seleccione su horario de preferencia"
              :class="{ 'is-danger': errors.availability }"
              @blur="validateField('availability')"
              expanded
            >
              <option 
                v-for="horario in horariosDisponibles" 
                :key="horario" 
                :value="horario"
              >
                {{ horario }}
              </option>
            </b-select>
          </b-field>
        </div>

        <!-- Botón de envío -->
        <div class="column is-12">
          <b-button 
            type="is-primary" 
            expanded 
            :loading="isSubmitting"
            :disabled="!isFormValid || isSubmitting"
            native-type="submit"
          >
            Solicitar Cotización
          </b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AutoInsuranceForm',
  props: {
    insuranceType: {
      type: String,
      default: 'Automotor'
    }
  },
  data() {
    return {
      form: {
        brand: '',
        model: '',
        year: null,
        postalCode: '',
        fullname: '',
        email: '',
        phone: '',
        availability: '',
        hasGNC: false,
      },
      errors: {
        brand: '',
        model: '',
        year: '',
        postalCode: '',
        fullname: '',
        email: '',
        phone: '',
        availability: '',
      },
      captcha: {
        num1: 0,
        num2: 0,
        operator: '+',
        correctAnswer: 0
      },
      isSubmitting: false,
      horariosDisponibles: [
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 13:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
        '18:00 - 19:00'
      ]
    };
  },
  computed: {
    isCar() {
      return this.insuranceType.toLowerCase() === 'automotores';
    },
    availableYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear; year >= currentYear - 30; year--) {
        years.push(year);
      }
      return years;
    },
    isFormValid() {
      return (
        this.form.brand.trim() !== '' &&
        this.form.model.trim() !== '' &&
        this.form.year !== null &&
        this.form.postalCode.trim() !== '' &&
        this.form.fullname.trim() !== '' &&
        this.form.email.trim() !== '' &&
        this.form.phone.trim() !== '' &&
        this.form.availability !== '' &&
        !Object.values(this.errors).some(error => error !== '')
      );
    }
  },
  methods: {
    generateCaptcha() {
      const operators = ['+', '-', '*'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
      
      let num1, num2, correctAnswer;
      
      switch (operator) {
        case '+':
          num1 = Math.floor(Math.random() * 20) + 1; // 1-20
          num2 = Math.floor(Math.random() * 20) + 1; // 1-20
          correctAnswer = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 20) + 10; // 10-29
          num2 = Math.floor(Math.random() * 10) + 1;  // 1-10
          // Asegurar que el resultado sea positivo
          if (num2 > num1) {
            [num1, num2] = [num2, num1];
          }
          correctAnswer = num1 - num2;
          break;
        case '*':
          num1 = Math.floor(Math.random() * 9) + 2;  // 2-10
          num2 = Math.floor(Math.random() * 9) + 2;  // 2-10
          correctAnswer = num1 * num2;
          break;
      }
      
      this.captcha = {
        num1,
        num2,
        operator,
        correctAnswer
      };

      this.form.captcha = '';
      this.errors.captcha = '';
    },
    validateField(fieldName) {
      this.errors[fieldName] = '';
      
      switch (fieldName) {
        case 'brand':
          if (!this.form.brand.trim()) {
            this.errors.brand = 'La marca es requerida';
          }
          break;
          
        case 'model':
          if (!this.form.model.trim()) {
            this.errors.model = 'El modelo es requerido';
          }
          break;
          
        case 'year':
          if (!this.form.year) {
            this.errors.year = 'El año es requerido';
          }
          break;
          
        case 'postalCode':
          if (!this.form.postalCode.trim()) {
            this.errors.postalCode = 'El código postal es requerido';
          } else if (!/^\d{4,5}$/.test(this.form.postalCode)) {
            this.errors.postalCode = 'Ingrese un código postal válido';
          }
          break;
          
        case 'fullname':
          if (!this.form.fullname.trim()) {
            this.errors.fullname = 'El nombre y apellido es requerido';
          } else if (this.form.fullname.trim().length < 3) {
            this.errors.fullname = 'Ingrese su nombre completo';
          }
          break;
          
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.form.email.trim()) {
            this.errors.email = 'El email es requerido';
          } else if (!emailRegex.test(this.form.email)) {
            this.errors.email = 'Ingrese un email válido';
          }
          break;
          
        case 'phone':
          if (!this.form.phone.trim()) {
            this.errors.phone = 'El teléfono es requerido';
          } else if (!/^[\d\s\-\(\)]{8,15}$/.test(this.form.phone)) {
            this.errors.phone = 'Ingrese un teléfono válido';
          }
          break;
          
        case 'availability':
          if (!this.form.availability) {
            this.errors.availability = 'La disponibilidad horaria es requerida';
          }
          break;
      }
    },
    validateForm() {
      Object.keys(this.form).forEach(field => {
        this.validateField(field);
      });
      
      return !Object.values(this.errors).some(error => error !== '');
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        this.$buefy.toast.open({
          message: 'Por favor corrija los errores en el formulario',
          type: 'is-warning',
          duration: 4000
        });
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        const formData = {
          ...this.form,
          secureType: this.insuranceType
        };

        await this.storeQuotes(formData);
        this.sendWhatsAppMessage(formData);
        
        this.$buefy.toast.open({
          message: 'Formulario enviado correctamente. Te contactaremos pronto.',
          type: 'is-success',
          duration: 5000
        });
        
        this.resetForm();
        
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Error al enviar el formulario. Intente nuevamente.',
          type: 'is-danger',
          duration: 4000
        });
        
        console.error('Error:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    
    sendWhatsAppMessage(data) {
      const phone = "5492346532089";
      const message = encodeURIComponent(
        `🚗 *Solicitud de Cotización - ${data.secureType}*\n\n` +
        `👤 *Datos del Cliente:*\n` +
        `• Nombre: ${data.fullname}\n` +
        `• Email: ${data.email}\n` +
        `• phone: ${data.phone}\n` +
        `• Código Postal: ${data.postalCode}\n\n` +
        `🚙 *Datos del Vehículo:*\n` +
        `• marca: ${data.brand}\n` +
        `• modelo: ${data.model}\n` +
        `• año: ${data.year}\n\n` +
        `${data.hasGNC ? '• GNC: Sí\n' : ''}` +
        `⏰ *disponibilidad:* ${data.availability}\n\n` +
        `¿Podrían contactarme para brindarme una cotización?`
      );
      window.open(`https://wa.me/${phone}?text=${message}`);
    },
    
    resetForm() {
      this.form = {
        brand: '',
        model: '',
        year: null,
        postalCode: '',
        fullname: '',
        email: '',
        phone: '',
        availability: '',
        hasGNC: false,
      };
      this.errors = {
        brand: '',
        model: '',
        year: '',
        postalCode: '',
        fullname: '',
        email: '',
        phone: '',
        availability: '',
      };
    },
    async storeQuotes(values) {
      try {
        const response = await this.$store.dispatch("Quotes/storeQuotes", values);
        return response;
      } catch (err) {
        console.error("Error storing quotes:", err);
        throw err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.auto-insurance-form {
  .field {
    &.is-danger {
      .input, .select select {
        border-color: #ff3860;
        
        &:focus {
          border-color: #ff3860;
          box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);
        }
      }
    }
  }

  .help.is-danger {
    color: #ff3860;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
}
</style>