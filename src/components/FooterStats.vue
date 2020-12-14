<template>
  <v-app>
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
          <h3>/100</h3>
          <p>TEST</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FooterStats",
  computed: {
    ...mapGetters(["averageGrade"]),
  },
};
</script>