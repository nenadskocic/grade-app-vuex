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
