<template>
  <v-footer app height="auto">
    <v-layout>
      <v-flex xs12>
        <v-card flat>
          <v-card-text class="py-2 px-3 grey--text">
            <v-layout>
              <v-flex shrink>
                {{ $t('app.name') }}
              </v-flex>
              <v-spacer />
              <v-flex shrink>
                &copy; EnteBrain {{ currentYear }}
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
