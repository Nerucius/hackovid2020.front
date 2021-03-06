<template>
  <v-layout row justify-center>
    <v-flex mt-3 xs12 md10 lg8 xl6>
      <v-card flat>
        <!-- <v-toolbar dense flat dark color="primary">
          <v-toolbar-title>{{ $t('forms.titles.login') }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <LanguageSelector />
          </v-toolbar-items>
        </v-toolbar>-->

        <v-card-title>
          <v-layout>
            <v-flex grow>
              <h2>{{ $t('pages.login.title') }}</h2>
            </v-flex>
            <v-flex shrink>
              <LanguageSelector />
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <!-- Logo -->
          <v-layout row wrap justify-space-around align-center px-2>
            <v-flex xs12 pa-0 />

            <!-- <v-flex md3 class="hidden-sm-and-down">
              <v-img src="/img/branding/inspires.png" />
            </v-flex>-->

            <!-- Form to login with credentials -->
            <v-flex v-if="!resetPassword" sm12 md8>
              <v-alert
                :value="failedLogin"
                dismissible
                type="error"
                class="my-3"
              >
                {{ $t("forms.errors.invalidCredentials") }}
              </v-alert>

              <v-form
                ref="form"
                v-model="valid"
                @keyup.native.enter="valid && submitLogin()"
                @submit.prevent="submitLogin()"
              >
                <v-text-field
                  v-model="credentials.mail"
                  prepend-icon="person"
                  :label="$t('forms.fields.email')"
                  :rules="rules"
                  type="text"
                />
                <v-text-field
                  v-model="credentials.password"
                  prepend-icon="lock"
                  :label="$t('forms.fields.password')"
                  :rules="rules"
                  type="password"
                />
              </v-form>

              <!-- <div class="text-xs-right">
                <a href="#forgot-password" @click="resetPassword = true">
                  {{ $t("pages.login.forgotPassword") }}
                </a>
              </div>-->
            </v-flex>

            <!-- Form to reset password -->
            <v-flex v-else sm12 md8>
              <v-alert
                :value="resetPasswordSubmitted"
                type="info"
                class="my-3"
              >
                {{ $t("forms.toasts.resetPasswordSubmitted") }}
              </v-alert>

              <v-form
                ref="formResetPassword"
                v-model="validResetPassword"
                @submit.prevent="submitResetPassword()"
              >
                <v-text-field
                  v-model="credentials.mail"
                  prepend-icon="person"
                  :label="$t('forms.fields.usernameOrEmail')"
                  :rules="rules"
                  type="text"
                />
              </v-form>

              <div class="text-xs-right">
                <a
                  href="#"
                  @click="resetPassword = false"
                >{{ $t("pages.resetPassword.goBackToLogin") }}</a>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions class="mt-2 pb-3 px-3 text-xs-center">
          <v-flex v-if="!resetPassword" shrink>
            <v-btn
              :to="{name:'register'}"
              dark
              flat
              outline
              color="primary"
            >
              {{ $t('pages.login.register') }}
            </v-btn>
          </v-flex>
          <v-spacer />

          <!-- Login with credentials action -->
          <v-flex v-if="!resetPassword" shrink>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submitLogin()"
            >
              {{ $t("actions.login") }}
            </v-btn>
          </v-flex>

          <!-- Reset password action -->
          <v-flex v-else shrink>
            <v-btn
              :disabled="!validResetPassword || resetPasswordSubmitted"
              color="primary"
              @click="submitResetPassword()"
            >
              {{ $t("pages.resetPassword.resetPassword") }}
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import LanguageSelector from "@/components/toolbar/LanguageSelector";

export default {
  metaInfo() {
    return {
      title: this.$t("forms.titles.login")
    };
  },

  components: {
    LanguageSelector
  },

  data() {
    return {
      failedLogin: false,
      resetPassword: false,
      resetPasswordSubmitted: false,
      valid: null,
      validResetPassword: null,
      credentials: {
        mail: "",
        password: ""
      },
      rules: [v => !!v || this.$t("forms.rules.requiredField")]
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },

  mounted() {
    // Avoid showing this page if the user is logged in
    setTimeout(() => {
      if (this.isLoggedIn) {
        this.redirectToPage();
      }
    }, 500);
  },

  methods: {
    submitLogin() {
      if (this.$refs.form.validate()) {
        this.failedLogin = false;
        this.attemptLogin();
      }
    },

    async submitResetPassword() {
      if (this.$refs.formResetPassword.validate()) {
        try {
          await this.$store.dispatch("user/resetPassword", this.credentials);
          this.resetPasswordSubmitted = true;
        } catch (error) {
          this.$store.dispatch("toast/error", {
            message: this.$t("pages.login.resetPasswordError"),
            error
          });
        }
      }
    },

    attemptLogin() {
      // Send the credentials to be logged in and redirect to the
      // next page if successful

      this.$store
        .dispatch("user/login", this.credentials)
        .then(() => {
          this.redirectToPage();
        })
        .catch(error => {
          console.log(error)
          // this.$refs.form.reset();
          this.credentials.password = "";
          this.failedLogin = true;
        });
    },

    redirectToPage() {
      // Redirect to requested route before force login
      // or homepage if landed on login
      let path = this.$route.query.redirect || "/";
      path = path == "/login" ? "/" : path;
      this.$router.push({ path });
    }
  }
};
</script>
