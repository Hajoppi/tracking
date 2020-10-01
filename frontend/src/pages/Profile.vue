<template>
  <div class="profile-page">
    <br />
    <Accordion ref="profileAccordion" class="large-accordion">
      <div slot="header">
        <div class="profile-image"></div>
        <div class="profile-summary">
          <at-sign-icon class="at-icon" size="0.9x"></at-sign-icon>
          {{ user.username }}
          <div class="profile-score">{{ score }} pts</div>
        </div>
      </div>
      <div class="profile-card-body">
        <div class="data-label">Username</div>
        <div class="data-field">
          <input class="input-field" v-model="newUsername" />
        </div>
        <div @click="randomizeUsername()" class="randomize">Randomize</div>
        <div class="data-label">Email</div>
        <div class="data-field">
          <input disabled class="input-field" v-model="user.email" />
        </div>
        <br />
        <div class="data-label">New password</div>
        <div class="data-field">
          <input
            class="input-field"
            type="password"
            placeholder="Leave empty for no change"
            v-model="newPassword"
          />
        </div>
        <br />
        <div class="data-label">Repeat password</div>
        <div class="data-field">
          <input
            class="input-field"
            type="password"
            placeholder="Leave empty for no change"
            v-model="newPasswordConfirm"
          />
        </div>
        <div class="status-message">
          <span class="noMatch" v-if="noMatch">The passwords don't match</span>
          <br />
          <span class="noMatch" v-if="errorMessage.length > 0">{{
            errorMessage
          }}</span>
        </div>
        <br />
        <button class="btn primary save-button" @click="update()">Save</button>
      </div>
    </Accordion>

    <br />

    <div
      class="guild-card"
      v-for="guild in user.associations"
      :value="guild"
      :key="guild.id"
    >
      <div class="guild-header">{{ guild.name }}</div>
      <div class="guild-points">{{ associationScores[guild.id] }} pts.</div>
    </div>
  </div>
</template>

<script>
/* ============
 * Profile Index Page
 * ============
 *
 * The profile index page.
 */

import { UserIcon, Edit3Icon, AtSignIcon } from 'vue-feather-icons';
import Accordion from '/src/components/Accordion';
export default {
  /**
   * The name of the page.
   */
  name: 'profile-index',
  data() {
    return {
      newUsername: '',
      newPassword: '',
      newPasswordConfirm: '',
      errorMessage: '',
    };
  },
  mounted() {
    this.$store
      .dispatch('account/find')
      .then(() => {
        this.$store.dispatch('points/user');
      })
      .then(() => {
        this.newUsername = this.user.username;
        this.user.associations.forEach(association => {
          this.$store.dispatch('points/association', association.id);
        });
      });
  },
  methods: {
    update() {
      this.$store
        .dispatch('account/update', {
          username:
            this.newUsername !== this.user.username ? this.newUsername : '',
          password: this.passwordValid && !this.noMatch ? this.newPassword : '',
        })
        .then(() => {
          this.$store.dispatch('account/find');
          this.$refs.profileAccordion.toggle();
        })
        .catch(e => {
          this.errorMessage = "Couldn't save, username already exists.";
          console.error(this.errorMessage, e);
        });
    },
    randomizeUsername() {
      this.$store.dispatch('account/randomizeUsername').then(() => {
        this.newUsername = this.$store.state.account.randomUsername;
      });
    },
  },
  components: {
    UserIcon,
    Edit3Icon,
    AtSignIcon,
    Accordion,
  },
  computed: {
    user() {
      return this.$store.state.account.user;
    },
    associationScores() {
      return this.$store.state.points.associations;
    },
    noMatch() {
      return this.newPassword !== this.newPasswordConfirm;
    },
    score() {
      return this.$store.state.points.user.points;
    },
    usernameValid() {
      const username = this.newUsername;
      return (
        username.length === 0 || (username.length > 1 && username.length < 35)
      );
    },
    passwordValid() {
      const password = this.newPassword;
      return password.length > 5 && password.length < 21;
    },
  },
};
</script>
