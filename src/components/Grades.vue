<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>{{ title }}</h1>
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
        <v-toolbar height="50px" width="300px">
          <v-text-field
            dark
            class="mt-5"
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
        <v-btn height="20px">
          <img src="../assets/ascArrow.png" height="56px" width="56px" />
        </v-btn>
        <v-btn height="20px">
          <img src="../assets/descArrow.png" height="56px" width="56px" />
        </v-btn>
      </div>

      <div class="ml-10">
        <template>
          <v-btn @click="createBtnClick">
            <span class="mr-2">Create</span>
          </v-btn>
        </template>
      </div>

      <v-dialog persistent max-width="600px" dark v-model="dialog">
        <v-card>
          <v-card-title class="justify-center">
            <span>Add Grade</span>
          </v-card-title>

          <v-form v-model="isSubmitValid">
            <v-container grid-list-md text-xs-center>
              <v-layout row>
                <v-flex xs6>
                  <v-text-field
                    label="Course"
                    :rules="[rules.courseRequired]"
                    v-model="newCourse"
                    courseRequired
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    :rules="[rules.gradeRequired, rules.gradeLength]"
                    v-model="newGrade"
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
                  <v-btn color="primary" @click="addCourseAndGrade" :disabled="!isSubmitValid"
                    >Create</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
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
          <tr v-for="(course, index) in courses" v-bind:key="index">
            <td>{{ course.courseName }}</td>
            <td>{{ course.mark }}</td>

            <td>
              <v-btn @click="removeCourses(index)">
                <img src="../assets/removeBtn.png" height="24px" width="24px" />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <FooterStats />
  </v-app>
</template>

<script>
import FooterStats from "@/components/FooterStats.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Grades",

  data: () => ({
    items: ["Course", "Mark"],

    rules: {
      gradeRequired: (value) => !!value || "Please input a grade.",
      gradeLength: (value) => value.length <= 3 || "Max 3 digits.",
      courseRequired: (value) => !!value || "Please input a course name.",
    },
    honoursSwitch: false,
    failedSwitch: false,
    dialog: false,
    isSubmitValid: false,
    newCourse: "",
    newGrade: "",
  }),
  components: {
    FooterStats,
  },
  computed: {
    ...mapState(["title", "courses"]),
  },
  methods: {
    ...mapMutations(["ADD_COURSE"]),
    ...mapActions(["removeCourse"]),
    addCourseAndGrade: function () {
      this.ADD_COURSE({ courseName: this.newCourse, mark: this.newGrade });
      this.newCourse = "";
      this.newGrade = "";
      this.dialog = false;
    },
    removeCourses: function (course) {
      this.removeCourse(course);
    },
    isDialog() {
      return this.dialog;
    },
    createBtnClick() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: rgb(73, 76, 80);
}
.table thead th {
  font-size: 24px !important;
  text-decoration: underline;
}
h1 {
  white-space: nowrap;
}

</style>
