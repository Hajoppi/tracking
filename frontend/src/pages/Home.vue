<template>
  <div class="home">
    <modal 
      class="confetti-popup" 
      v-if="$store.state.modal.showConfetti && level.locked === 10000" 
      :close-function="() => $store.dispatch('modal/setConfetti', false)"
      >
      <div slot="body">
        <span>
          &#127881; &#127881; &#127881; &#127881;
        </span>
        <p>The Aalto Community has now locked in 10 000€ for Save the Children Finland!</p>
        <p>The game isn't over yet, because we have a new donor: <b>Teknologiateollisuuden 
        100-vuotissäätiö</b>.</p> 
        <p>Keep collecting points because the more we collect, the more they 
        will donate (up to 10 000€ more)!</p>
        <p>Let's do this All to Gather! &#129321;</p>
        <div class="confetti-wrapper">
        <div v-for="n in 179" :key="n" :class="'confetti-' + n"></div>
      </div>
      <span>
          &#127881; &#127881; &#127881; &#127881;
        </span>
      </div>
    </modal>
    <div class="navbar-backdrop"></div>
    <report-post v-if="$store.state.modal.showReportPost"></report-post>
    <add-post v-if="$store.state.modal.showAddPost"></add-post>
    <a class="new-quiz-link" href="/quiz">
      <div class="new-quiz">
        There are new weekly quizzes available for you. 
        Click here to check them out and earn more points.
      </div>
    </a>
    <div v-if="!isShowingFeedActionModal">
      <div class="home-top">
        <span class="info-text">So far, the community has pledged</span>
        <span class="locked">{{ locked }} €</span>
        <span class="info-text">for Save the Children Finland</span>
        <br />

        <div class="progress-bar">
          <progress :value="total" :max="goal"></progress>
          <div class="points-goal">
            <span class="info-text left">{{ total }} / {{ goal }} points</span>
            <span class="info-text right"
              >Next goal: {{ nextMoneyGoal }} €</span
            >
          </div>
        </div>
      </div>
      <div class="read-more-container" @click="readMore = !readMore">
        <div class="info" v-if="level.locked !== 10000" :class="{ open: readMore }">
          <p>
            The points in All To X application are earned by completing a
            variety of tasks, such as participating in events, making posts and
            voting on them, adding Aalto Vibe daily etc.
          </p>
          <p>
            Tekniikan Akateemiset TEK, will donate money to charity depending on
            the points collected by the community.
          </p>
          <p>
            The charity selected is Save the Children Finland. The more points
            you collect, the more TEK will donate (up to 10 000 €).
          </p>
          <div class="logos">
            <img src="/src/assets/images/tek-logo.png" />
            <img src="/src/assets/images/pelastakaa_lapset_logo.png" />
          </div>
        </div>
        <div class="info new" v-if="level.locked === 10000" :class="{ open: readMore }">
          <p>
            The points in All to X are earned by being active in the application, 
            such as participating in events, making posts and liking them, updating your 
            daily Aalto vibe and answering weekly quizzes.
          </p>
          <p>
            Our sponsors will donate money to charity depending on the total amount of points 
            collected by the community. The donations will go to Save the Children Finland’s 
            Fuel for Life programme, which helps children at risk of social exclusion. 
          </p>
          <p>
            The first 10 000€ has been donated to Save the Children Finland by Tekniikan akateemiset TEK. 
            Our new sponsor is <b>Teknologiateollisuuden 100-vuotissäätiö</b>, and the more points we collect, 
            the more they donate (up to 10 000€ more)
          </p>
          <div class="logos">
            <img src="/src/assets/images/tek-logo.png" />
            <img src="/src/assets/images/pelastakaa_lapset_logo.png" />
            <img src="/src/assets/images/tt100_logo_black-1.png" />
          </div>
        </div>
        <div class="read-more-btn">
          <span v-if="!readMore">Read more</span>
          <span v-else="">Close</span>
          <chevron-down-icon
            size="1.5x"
            :class="{ rotate: readMore }"
          ></chevron-down-icon>
        </div>
      </div>

      <div
        class="reported-posts-container"
        v-if="isAdmin && $store.state.feed.reports.length > 0"
      >
        <h4 class="report-count">
          {{ $store.state.feed.reports.length }} new reported posts!
        </h4>
        <div
          class="reported-post"
          v-for="post in $store.state.feed.reports"
          :key="post.id"
        >
          <post :post="post"></post>
          <h4 class="report-reason-header">Report reasons:</h4>
          <p class="report-reason" v-for="(report, i) in post.reports" :key="i">
            {{ report }}
          </p>
          <div class="btn-container">
            <button class="approve" @click="() => approvePost(post.id)">
              Approve post
            </button>
            <button class="delete" @click="() => deletePost(post.id)">
              Delete post
            </button>
            <button
              class="delete"
              @click="() => banUser({ id: post.user_id, name: post.username })"
            >
              Ban User
            </button>
          </div>
        </div>
      </div>

      <post v-for="post in $store.state.feed.posts" :post="post" :key="post.id">
      </post>
      <br />
      <p class="no-more-content">No more posts at this moment.</p>

      <button
        v-if="postStatus.allowed"
        class="add-post-btn"
        @click="openNewPostModal"
      >
        <plus-icon size="1.5x"></plus-icon>
        <span>New Post</span>
      </button>
      <div v-else class="add-post-btn--disabled">
        <span v-if="postStatus.ban > 0">Posting restricted</span>
        <span v-else-if="postStatus.posts >= 5">daily post limit exceeded</span>
      </div>
    </div>
  </div>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */
import { ChevronDownIcon, PlusIcon } from 'vue-feather-icons';

import ReportPost from '../components/ReportPost';
import AddPost from '../components/AddPost';
import Post from '../components/Post';
import Modal from '../components/Modal';

export default {
  /**
   * Home page.
   */
  name: 'home-index',
  data() {
    return {
      tooltip: false,
      readMore: false,
      levels: [
        {
          goal: 10000,
          name: 'Level 1: Freshers',
          value: 1000,
          locked: 0,
        },
        {
          goal: 20000,
          name: 'Level 2: Students',
          value: 2000,
          locked: 1000,
        },
        {
          goal: 35000,
          name: 'Level 3: Volunteers',
          value: 2500,
          locked: 3000,
        },
        {
          goal: 50000,
          name: 'Level 4: Bachelor',
          value: 3000,
          locked: 5500,
        },
        {
          goal: 75000,
          name: 'Level 5: TBD',
          value: 1500,
          locked: 8500,
        },
        {
          goal: 100000,
          name: 'Level 6: TBD',
          value: 2500,
          locked: 10000,
        },
        {
          goal: 120000,
          name: 'Level 7: TBD',
          value: 2500,
          locked: 12500,
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch('points/total');
    this.$store.dispatch('feed/status');

    this.$store.dispatch('feed/all');
    this.interval = setInterval(() => {
      this.$store.dispatch('points/total');
    }, 60 * 1000);
    this.$store.dispatch('account/find').then(() => {
      if (this.isAdmin) {
        this.$store.dispatch('feed/allReports');
      }
      this.$store.dispatch('points/user');
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    openNewPostModal() {
      this.$store.dispatch('modal/setAddPost', true);
      window.scrollTo(0, 0);
    },
    approvePost(postId) {
      if (!window.confirm('Are you sure you want to approve this post?')) {
        return;
      }

      this.$store.dispatch('feed/approve', postId);
    },
    deletePost(postId) {
      if (!window.confirm('Are you sure you want to delete this post?')) {
        return;
      }
      this.$store.dispatch('feed/destroy', postId);
    },
    banUser(user) {
      if (!window.confirm(`Are you sure you want to ban ${user.name}`)) {
        return;
      }
      this.$store.dispatch('feed/ban', { userId: user.id, reason: 'post' });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.account.user.scope === 'admin';
    },
    total() {
      return this.$store.state.points.total;
    },
    sections() {
      return [{ value: this.total - this.previousGoal }];
    },
    goal() {
      return this.level.goal;
    },
    locked() {
      let result = 0;
      for (let l of this.levels) {
        if (this.total > l.goal) {
          result += l.value;
        }
      }
      return result;
    },
    level() {
      let result = {};
      for (let i = this.levels.length - 1; i >= 0; i -= 1) {
        const l = this.levels[i];
        if (this.total < l.goal) {
          result = l;
        }
      }
      return result;
    },
    previousGoal() {
      for (let i = 1; i < this.levels.length; i += 1) {
        if (this.levels[i].goal === this.goal) {
          return this.levels[i - 1].goal;
        }
      }
      return 0;
    },
    nextMoneyGoal() {
      for (let i = 1; i < this.levels.length; i += 1) {
        if (this.levels[i - 1].goal === this.goal) {
          return this.levels[i].locked;
        }
      }
      return 0;
    },
    userScore() {
      return this.$store.state.points.user.points;
    },
    isShowingFeedActionModal() {
      return (
        this.$store.state.modal.showReportPost ||
        this.$store.state.modal.showAddPost
      );
    },
    postStatus() {
      return this.$store.state.feed.status;
    },
  },
  components: {
    ChevronDownIcon,
    PlusIcon,
    AddPost,
    ReportPost,
    Post,
    Modal
  },
};
</script>
