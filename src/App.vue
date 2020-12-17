/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
<template>
  <v-app>
    <v-main>
      <Grades />
    </v-main>
  </v-app>
</template>

<script>
import Grades from "./components/Grades";

export default {
  name: "App",

  components: {
    Grades,
  },

  data: () => ({
    //
  }),
};
</script>
