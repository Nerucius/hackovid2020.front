<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-card flat>
          <v-card-title>
            <h3>{{ $t('pages.shopCreate.title') }}</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="shop.name"
              :rules="[rules.required]"
              counter="100"
              maxlength="100"
              :label="$t('forms.fields.name')"
            />
            <v-text-field
              v-model="shop.name"
              :rules="[rules.required]"
              counter="100"
              maxlength="100"
              :label="$t('forms.fields.name')"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-flex shrink>
              <v-btn type="submit" depressed color="success">Registrar</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid: null,
      shop: {
        coverImageId: 0,
        ownerId: this.user.id,
        // coverImage: 0,
        // latitude: 0,
        // longitude: 0,
        // streetName: "string",
        // shopCategoryIds: [0],
        // shopImageIds: [0]
      },
      rules: {
        required: v => !!v || this.$t("forms.rules.requiredField"),
        isUser: v => this.isUser(v) || this.$t("forms.rules.mustBeUser"),
        isURL: v => regexIsURL(v) || this.$t("forms.rules.mustBeURL"),
        isEmail: v => regexIsEmail(v) || this.$t("forms.rules.mustBeEmail")
      }
    };
  },

  computed: {
    user() {
      return this.$store.getters["user/current"];
    }
  },

  async mounted() {},

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log("valid-form");
      }
    }
  }
};
</script>

<style>
</style>
