<template>
  <v-card flat>
    <v-container>
      <v-card-title>
        Update Category -&nbsp;<b>{{ this.$route.params.id }}</b>
      </v-card-title>
      <v-card-subtitle><v-divider></v-divider></v-card-subtitle>
      <v-card-text>
        <v-form @submit.prevent="updateCategory">
          <v-text-field
            label="Name"
            color="orange"
            filled
            rounded
            class="rounded-0"
            flat
            v-model="form.name"
            type="text"
            :error-messages="errors.name"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              right
              type="submit"
              class="mx-4"
              tile
              :disabled="loading"
              depressed
              dark
              color="orange darken-3" style="text-transform: none;">Update</v-btn>
              <template v-if="loading">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                        <rect x="19" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="19" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="40" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
                                        </rect><rect x="19" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
                                        </rect><rect x="40" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
                                        </rect><rect x="61" y="61" width="20" height="20" fill="#f0f6f6">
                                        <animate attributeName="fill" values="#FF9800;#f0f6f6;#f0f6f6" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
                                        </rect>
                                    </svg>
                                </template>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      loading: false,
      errors: {},
    };
  },
  mounted() {
    axios.get(`/api/category/${this.$route.params.id}`).then((res) => {
      this.form.name = res.data.name;
    });
  },
  methods: {
    updateCategory() {
      this.loading = true
      axios.put(`/api/category/${this.$route.params.id}`, this.form)
        .then((res) => {
          this.loading = false
          this.$toasted.show(response.data, {
            type: 'success',
            duration: '2000'
          })
          this.$router.replace({
            name: "Categories",
          });
        })
        .catch((errors) => {
          this.loading = false
          this.errors = errors.response.data.errors
          this.$toasted.show("Some Error Occurred", {
            type: 'error',
            duration: '2000'
          })
        });
    },
  },
};
</script>

<style>
</style>