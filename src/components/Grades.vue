<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Grade App</h1>
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          width="100"
        />
      </div>

      <v-row class="mt-5">
        <v-switch
          class="mr-16"
          v-model="honoursSwitch"
          color="#0EEB50"
          options="hsOptions"
          label="Honours"
        >
        </v-switch>
        <v-switch
          v-model="failedSwitch"
          color="#FF0000"
          options="fsOptions"
          label="Failed"
        ></v-switch>
      </v-row>

      <div class="mr-16">
        <v-toolbar height="50px" width="400px">
          <v-text-field
            dark
            class="mt-5"
            v-model="search"
            append-icon="mdi-magnify"
            placeholder="Search"
          >
          </v-text-field>
        </v-toolbar>
      </div>

      <div>
        <v-container class="mt-7">
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select :items="items" label="Course" solo></v-select>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div>
        <v-btn>
          <img src="../assets/ascArrow.png" height="56px" width="56px" />
        </v-btn>
        <v-btn>
          <img src="../assets/descArrow.png" height="56px" width="56px" />
        </v-btn>
      </div>

      <v-row class="text-right">
        <v-col>
          <v-dialog v-model="dialog" persistent max-width="600px" dark>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                <span class="mr-2">Create</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-center">
                <span>Add Grade</span>
              </v-card-title>

              <v-form>
                <v-container grid-list-md text-xs-center>
                  <v-layout row>
                    <v-flex xs6>
                      <v-text-field
                        label="Course"
                        :rules="[rules.courseRequired]"
                        courseRequired
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        type="number"
                        :rules="[rules.gradeRequired, rules.gradeLength]"
                        gradeLength
                        maxlength="3"
                        label="Grade"
                        placeholder="0"
                        min="0"
                        max="100"
                        outlined
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex class="text-right">
                      <v-btn color="red">Cancel</v-btn>
                    </v-flex>
                    <v-flex class="text-left">
                      <v-btn color="primary" @click="createGrade">Create</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-simple-table dark class="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Course</th>
            <th class="text-left">Mark</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courses" :key="item.course">
            <td>{{ item.course }}</td>
            <td>{{ item.mark }}</td>
            <td>{{ item.action }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-footer>
      <v-row>
        <v-col>
          <h3>Minimum</h3>
          <p>TEST</p>
        </v-col>
        <v-col>
          <h3>Maximum</h3>
          <p>TEST</p>
        </v-col>
        <v-col>
          <h3>Average</h3>
          <p>TEST</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Grades",

  data: () => ({
    items: ["Course", "Mark"],
    courses: [
      {
        course: "Emerging Web Technologies",
        mark: "60",
      },
      {
        course: "Software Capstone",
        mark: "80",
      },
      {
        course: "Enterprise Java",
        mark: "90",
      },
      {
        course: "Machine Learning",
        mark: "70",
      },
      {
        course: "iPhone Programming",
        mark: "40",
      },
    ],
    rules: {
      gradeRequired: (value) => !!value || "Please input a grade.",
      gradeLength: (value) => value.length <= 3 || "Max 3 digits.",
      courseRequired: (value) => !!value || "Please input a course name.",
    },
    honoursSwitch: false,
    failedSwitch: false,
    dialog: false,
  }),
  methods: {
    createGradeClicked() {},
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: dimgray;
}
.table thead th {
  font-size: 24px !important;
  text-decoration: underline;
}
</style>
