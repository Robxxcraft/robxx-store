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
              depressed
              dark
              color="orange darken-3" style="text-transform: none;">Update</v-btn>
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
      axios
        .put(`/api/category/${this.$route.params.id}`, this.form)
        .then((res) => {
          this.$router.replace({
            name: "Categories",
            props: { success: res.data.success },
          });
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
        });
    },
  },
};
</script>

<style>
</style>