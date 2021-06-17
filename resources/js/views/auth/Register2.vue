<template>
  <div>
    <!-- Navbar-->
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light py-3">
        <div class="container">
          <!-- Navbar Brand -->
          <a href="#" class="navbar-brand">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1571398888/Group_1514_tjekh3_zkts1c.svg"
              alt="logo"
              width="150"
            />
          </a>
        </div>
      </nav>
    </header>

    <div class="container">
      <div class="row py-5 mt-4 align-items-center">
        <!-- For Demo Purpose -->
        <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg"
            alt=""
            class="img-fluid mb-3 d-none d-md-block"
          />
          <h1>Register</h1>
          <p class="font-italic text-muted mb-0">Create new an account.</p>
          <p class="font-italic text-muted">
            Snippet By
            <a href="https://bootstrapious.com" class="text-muted">
              <u>Bootstrapious</u></a
            >
          </p>
        </div>

        <!-- Registeration Form -->
        <div class="col-md-7 col-lg-6 ml-auto">
          <form @submit.prevent="submit">
            
            <div class="row">

              <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text bg-white px-4 border-md border-right-0"
                  >
                    <i class="fa fa-envelope text-muted"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  v-model="form.name"
                  placeholder="Full Name"
                  class="form-control bg-white border-left-0 border-md"
                />
              </div>
              <!-- Email Address -->
              <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text bg-white px-4 border-md border-right-0"
                  >
                    <i class="fa fa-envelope text-muted"></i>
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="form.email"
                  placeholder="Email Address"
                  class="form-control bg-white border-left-0 border-md"
                />
              </div>

              <!-- Password -->
              <div class="input-group col-lg-12 mb-4">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text bg-white px-4 border-md border-right-0"
                  >
                    <i class="fa fa-lock text-muted"></i>
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  v-model="form.password"
                  placeholder="Password"
                  class="form-control bg-white border-left-0 border-md"
                />
              </div>

              <!-- Submit Button -->
              <div class="form-group col-lg-12 mx-auto mb-0">
                <button type="submit" class="btn btn-primary btn-block py-2">
                  <span class="font-weight-bold">Sign Up</span>
                </button>
              </div>

              <!-- Divider Text -->
              <div
                class="form-group col-lg-12 mx-auto d-flex align-items-center my-4"
              >
                <div class="border-bottom w-100 ml-5"></div>
                <span class="px-2 small text-muted font-weight-bold text-muted"
                  >OR</span
                >
                <div class="border-bottom w-100 mr-5"></div>
              </div>

              <!-- Social Login -->
              <div class="form-group col-lg-12 mx-auto">
                <a href="#" class="btn btn-primary btn-block py-2 btn-facebook">
                  <i class="fa fa-facebook-f mr-2"></i>
                  <span class="font-weight-bold">Continue with Facebook</span>
                </a>
                <a href="#" class="btn btn-primary btn-block py-2 btn-twitter">
                  <i class="fa fa-twitter mr-2"></i>
                  <span class="font-weight-bold">Continue with Twitter</span>
                </a>
              </div>

              <!-- Already Registered -->
              <div class="text-center w-100">
                <p class="text-muted font-weight-bold">
                  Already Registered?
                  <router-link :to="{name: 'Login'}" class="text-primary ml-2">Login</router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {}
    };
  },

  methods: {

    async submit() {

      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
        .post("/api/register", this.form)
        .then(response => {
          console.log(response.data)
        }).catch(errors => { 
          console.log(errors.response.data.errors) 
        })
      })
      
    },
  },
};
</script>

<style>
/*
*
* ==========================================
* CUSTOM UTIL CLASSES
* ==========================================
*
*/

.border-md {
  border-width: 2px;
}

.btn-facebook {
  background: #405d9d;
  border: none;
}

.btn-facebook:hover,
.btn-facebook:focus {
  background: #314879;
}

.btn-twitter {
  background: #42aeec;
  border: none;
}

.btn-twitter:hover,
.btn-twitter:focus {
  background: #1799e4;
}

/*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/

body {
  min-height: 100vh;
}

.form-control:not(select) {
  padding: 1.5rem 0.5rem;
}

select.form-control {
  height: 52px;
  padding-left: 0.5rem;
}

.form-control::placeholder {
  color: #ccc;
  font-weight: bold;
  font-size: 0.9rem;
}
.form-control:focus {
  box-shadow: none;
}
</style>