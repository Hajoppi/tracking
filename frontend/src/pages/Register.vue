<template>
  <div class="login">
    <div class="login-content">
      <h3 class="register-header">
        Register to All to X
      </h3>
      <form class="form" @submit.prevent="register(user)">
        <div class="field">
          <label class="label" for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            class="input"
            id="username"
            name="username"
          />
          <div @click="randomizeUsername()" class="randomize">Randomize</div>
          <span class="noMatch" v-if="!usernameValid"
            >The username must be 2 to 34 characters long</span
          >
        </div>
        <div class="field">
          <label class="label" for="email">Email (aalto or ayy)</label>
          <input
            name="email"
            v-model="user.email"
            type="email"
            class="input"
            id="email"
          />
        </div>
        <div class="field">
          <label class="label" for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="input"
            id="password"
            name="password"
          />
          <span class="noMatch" v-if="!passwordValid"
            >The password must be 6 to 20 characters long</span
          >
        </div>
        <div class="field">
          <label class="label" for="confirm-password"
            >Confirm your password</label
          >
          <input
            v-model="user.passwordConfirmation"
            type="password"
            class="input"
            id="confirm-password"
          />
          <span
            class="noMatch"
            v-if="!!user.passwordConfirmation.length && noMatch"
            >The passwords don't match</span
          >
        </div>

        <div class="field">
          <label class="label" for="associations">Association(s)</label>
          <v-select
            :class="
              isSafari() ? 'association-chooser-safari' : 'association-chooser'
            "
            inputId="associations"
            clerable
            multiple
            placeholder="Choose up to 3 associations"
            label="name"
            v-model="selectedAssociations"
            :options="filteredAssociations"
            :selectable="() => user.associationList.length < 3"
            @input="setSelected"
          ></v-select>

          <span class="disclaimer"
            >Please note that you can choose the associations only once.</span
          >
        </div>

        <div class="accept-field">
          <input
            id="accept"
            class="accept"
            type="checkbox"
            v-model="user.accept"
          />
          <label for="accept">
            I have read and accept the
            <a
              class="underline"
              @click.prevent="$store.dispatch('modal/set', true)"
              >Terms and Conditions and Privacy Policy</a
            >
          </label>
        </div>
        <button class="btn" :disabled="empty">Register</button>
        <div v-if="error.length > 0" class="error">{{ error }}</div>
      </form>
      <div class="register">
        Already have an account? Login
        <router-link :to="{ name: 'login.index' }">here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import Proxy from '../proxies/Proxy';
/* ============
 * Register Index Page
 * ============
 *
 * Page where the user can register.
 */
export default {
  components: {
    vSelect,
  },
  /**
   * The name of the page.
   */
  name: 'register-index',
  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      error: '',
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        associationList: [],
        accept: false,
      },
      selectedAssociations: [],
      associations: [],
    };
  },
  mounted() {
    new Proxy('associations').all().then(response => {
      this.associations = response;
    });
    this.$store.dispatch('account/randomizeUsername').then(() => {
      this.user.username = this.$store.state.account.randomUsername;
    });
  },
  /**
   * The methods the page can use.
   */
  methods: {
    /**
     * Will register the user.
     *
     * @param {Object} user The user to be registered.
     */
    register(user) {
      this.$store.dispatch('auth/register', user).catch(err => {
        const { response } = err;
        switch (response.status) {
          case 409:
            if (response.data.message === 'users_username_key') {
              this.error = 'Username already in use';
            } else {
              this.error = 'Email already in use';
            }
            break;
          case 422:
            this.error = 'Invalid fields';
            if (response.data.message !== 'invalid_fields') {
              this.error =
                'Invalid fields. Please check your email ends with aalto.fi or ayy.fi';
            }
            break;
        }
      });
    },
    setSelected(associations) {
      this.user.associationList = associations.map(a => a.id);
    },
    addToAssociation(event) {
      const id = Number(event.target.value);
      this.user.associationList.push(id);
    },
    deleteAssociation(x) {
      for (let i = 0; i < this.user.associationList.length; i++) {
        if (this.user.associationList[i] === x) {
          this.user.associationList.splice(i, 1);
        }
      }
    },
    associationIdToName(id) {
      const { associations } = this;
      for (let i = 0; i < associations.length; i++) {
        if (associations[i].id === id) {
          return associations[i].name;
        }
      }
      return '';
    },
    randomizeUsername() {
      this.$store.dispatch('account/randomizeUsername').then(() => {
        this.user.username = this.$store.state.account.randomUsername;
      });
    },
    isSafari() {
      // detects if the user is using safari
      // thanks https://github.com/ICJIA/vue-browser-detect-plugin for this
      return (
        /constructor/i.test(window.HTMLElement) ||
        (function(p) {
          return p.toString() === '[object SafariRemoteNotification]';
        })(!window['safari'] || safari.pushNotification)
      );
    },
  },
  computed: {
    filteredAssociations() {
      return this.associations.filter(
        a => this.user.associationList.indexOf(a.id) < 0
      );
    },
    noMatch() {
      return this.user.password != this.user.passwordConfirmation;
    },
    empty() {
      return (
        !this.user.accept ||
        this.noMatch ||
        !this.usernameValid ||
        !this.user.email ||
        !this.passwordValid
      );
    },
    limit() {
      return this.user.associationList.length == 3;
    },
    usernameValid() {
      const { username } = this.user;
      return (
        username.length === 0 || (username.length > 1 && username.length < 35)
      );
    },
    passwordValid() {
      const { password } = this.user;
      return (
        password.length === 0 || (password.length > 5 && password.length < 21)
      );
    },
  },
};
</script>
