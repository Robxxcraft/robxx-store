<template>
  <div>
    <v-card flat>
      <v-container>
        <v-card-title>
          Add Sale To Product - {{ this.$route.params.id }}
        </v-card-title>
        <v-card-subtitle><v-divider></v-divider></v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form.flash_start"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.flash_start"
                      :error-messages="errors.flash_start"
                      label="Flash Start"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      rounded
                      class="rounded-0"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.flash_start"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(form.flash_start)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="menus"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.flash_start_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.flash_start_time"
                      label="Flash Start Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      rounded
                      class="rounded-0"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="form.flash_start_time"
                    full-width
                    @click:minute="$refs.menus.save(form.flash_start_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  ref="menusz"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :return-value.sync="form.flash_end"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.flash_end"
                      :error-messages="errors.flash_end"
                      label="Flash End"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      rounded
                      class="rounded-0"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.flash_end"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu3 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menusz.save(form.flash_end)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="menussss"
                  v-model="menu4"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.flash_end_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.flash_end_time"
                      label="Flash End Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      rounded
                      class="rounded-0"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu4"
                    v-model="form.flash_end_time"
                    full-width
                    @click:minute="$refs.menussss.save(form.flash_end_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                right
                type="submit"
                class="mx-4"
                :disabled="loading == true"
                tile
                depressed
                dark
                color="orange darken-3"
                style="text-transform: none"
                @click.prevent="addSale()"
                >Save
              </v-btn>
              <template v-if="loading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  style="
                    margin: auto;
                    background: none;
                    display: block;
                    shape-rendering: auto;
                  "
                  width="50px"
                  height="50px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <rect x="19" y="19" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="40" y="19" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.125s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="61" y="19" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.25s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="19" y="40" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.875s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="61" y="40" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.375s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="19" y="61" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.75s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="40" y="61" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.625s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                  <rect x="61" y="61" width="20" height="20" fill="#f0f6f6">
                    <animate
                      attributeName="fill"
                      values="#FF9800;#f0f6f6;#f0f6f6"
                      keyTimes="0;0.125;1"
                      dur="1s"
                      repeatCount="indefinite"
                      begin="0.5s"
                      calcMode="discrete"
                    ></animate>
                  </rect>
                </svg>
              </template>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        flash_start: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        flash_start_time: null,
        flash_end: null,
        flash_end_time: null,
      },
      loading: false,
      errors: {},
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      menu4: false,
    };
  },
  methods: {
    addSale() {
      this.loading = true;

      let flash_starts = moment(`${this.form.flash_start} ${this.form.flash_start_time}`, 'YYYY-MM-DD HH-mm-ss').format();
      let flash_ends = moment(`${this.form.flash_end} ${this.form.flash_end_time}`, 'YYYY-MM-DD HH-mm-ss').format();

      let formData = new FormData();
      formData.append('_method', 'PUT')
      formData.append('flash_start', flash_starts)
      formData.append('flash_end', flash_ends)

      axios
        .post(`/api/sale/${this.$route.params.id}`, formData)
        .then(response => {
          this.loading = false;
          this.$router.replace({name : 'ManageProducts'})
          this.$toasted.show(response.data, {
            type: "success",
            duration: "2000",
          });
          this.$router.replace({ name: "Categories" });
        })
        .catch(errors => {
          this.loading = false;
          this.errors = errors.response.data.errors;
          this.$toasted.show("Some Error Occurred", {
            type: "error",
            duration: "2000",
          });
        });
    },
  },
};
</script>