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
          @click="honoursSearch"
          color="#0EEB50"
          options="hsOptions"
          label="Honours"
        >
        </v-switch>
        <v-switch
          v-model="failedSwitch"
          @click="failedSearch"
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
            v-model="searchCourse"
            append-icon="mdi-magnify"
            placeholder="Search Course"
          >
          </v-text-field>
        </v-toolbar>
      </div>

      <div>
        <v-container class="mt-7">
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="headers"
                label="Course"
                v-model="itemType"
                solo
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div>
        <div>
          <v-btn
            height="20px"
            @click="sort('asc')"
            :disabled="sortDirection == 'asc'"
          >
            <img src="../assets/ascArrow.png" height="56px" width="56px" />
          </v-btn>
        </div>
        <div>
          <v-btn
            height="20px"
            @click="sort('desc')"
            :disabled="sortDirection == 'desc'"
          >
            <img src="../assets/descArrow.png" height="56px" width="56px" />
          </v-btn>
        </div>
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
            <span>{{ dialogTitle }}</span>
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
                  <v-btn color="red" @click="cancel">Cancel</v-btn>
                </v-flex>
                <v-flex class="text-left">
                  <v-btn
                    color="primary"
                    @click="addEditCourse"
                    :disabled="!isSubmitValid"
                    >{{ dialogBtnTitle }}</v-btn
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
            <th
              class="text-left"
              v-for="header in headers"
              v-bind:key="header.page"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in filteredUsers" v-bind:key="index">
            <td>{{ course.courseName }}</td>
            <td>{{ course.mark }}</td>

            <td>
              <v-btn @click="removeCourses(index)" height="24px">
                <img
                  src="../assets/removeIcon.png"
                  height="24px"
                  width="24px"
                />
              </v-btn>
              <v-btn @click="editCourse(index)" height="24px">
                <img src="../assets/editIcon.svg" height="24px" width="24px" />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-footer>
      <v-row>
        <v-col>
          <h3>Minimum</h3>
          <p>{{ minGrade.mark }}</p>
        </v-col>
        <v-col>
          <h3>Maximum</h3>
          <p>{{ maxGrade.mark }}</p>
        </v-col>
        <v-col>
          <h3>Average</h3>
          <p>{{ avgGrade }}/100</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
//import FooterStats from "@/components/FooterStats.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Grades",

  data: () => ({
    rules: {
      gradeRequired: (value) => !!value || "Please input a grade.",
      gradeLength: (value) => value.length <= 3 || "Max 3 digits.",
      courseRequired: (value) => !!value || "Please input a course name.",
    },
    honoursSwitch: false,
    failedSwitch: false,
    dialog: false,
    isSubmitValid: false,
    dialogTitle: "",
    newCourse: "",
    newGrade: "",
    sortDirection: "asc",
    dialogBtnTitle: "",
    itemType: "",
    col: "",
    searchCourse: "",
  }),
  components: {},
  computed: {
    ...mapState(["title", "courses", "headers"]),

    filteredUsers: function () {
      return this.courses
        .filter(this.searchByCourse)
        .filter(this.honoursSearch)
        .filter(this.failedSearch);
    },
    minGrade() {
      if (this.filteredUsers.length == 0) {
        return;
      }

      return this.filteredUsers.reduce((a, b) =>
        Number(a.mark) < Number(b.mark) ? a : b
      );
    },
    maxGrade() {
      if (this.filteredUsers.length == 0) {
        return;
      }

      return this.filteredUsers.reduce((a, b) =>
        Number(a.mark) > Number(b.mark) ? a : b
      );
    },
    avgGrade() {
      if (this.filteredUsers.length == 0) {
        return;
      }
      let sum = this.filteredUsers.reduce(
        (a, b) => Number(a.mark) + Number(b.mark)
      );
      return sum;
    },
  },
  methods: {
    ...mapMutations(["ADD_COURSE", "EDIT_COURSE"]),
    ...mapActions(["removeCourse"]),

    addEditCourse: function () {
      if (this.dialogTitle == "Add Grade") {
        this.ADD_COURSE({ courseName: this.newCourse, mark: this.newGrade });
        this.newCourse = "";
        this.newGrade = "";
        this.dialog = false;
      } else {
        this.editCourse();
      }
    },
    removeCourses: function (course) {
      this.removeCourse(course);
    },
    editCourse: function () {
      this.dialog = true;
      this.dialogTitle = "Edit Grade";
      this.dialogBtnTitle = "Save";
    },
    isDialog() {
      return this.dialog;
    },
    createBtnClick() {
      this.dialog = true;
      this.dialogTitle = "Add Grade";
      this.dialogBtnTitle = "Create";
    },
    cancel() {
      this.dialog = false;
    },
    sort(direction) {
      this.sortDirection = direction;

      var col = this.itemType;

      if (this.sortDirection == "desc") {
        this.courses.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      } else {
        this.courses.sort((a, b) => (a[col] < b[col] ? 1 : -1));
      }
    },
    searchByCourse(course) {
      if (this.searchCourse.length === 0) {
        return true;
      }

      return (
        course.courseName
          .toLowerCase()
          .indexOf(this.searchCourse.toLowerCase()) > -1
      );
    },
    honoursSearch(course) {
      if (this.honoursSwitch == true) {
        return course.mark >= 80;
      } else {
        return true;
      }
    },
    failedSearch(course) {
      if (this.failedSwitch == true) {
        return course.mark < 50;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: rgb(73, 76, 80);
}
.table thead th {
  font-size: 20px !important;
  text-decoration: underline;
}
h1 {
  white-space: nowrap;
}
</style>
