/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '../locale';

Vue.use(VueI18n);
let locale = 'fi';
if (localStorage.getItem('locale')) {
  locale = localStorage.getItem('locale');
}
export const i18n = new VueI18n({
  locale,
  fallbackLocale: 'fi',
  messages,
});

export default {
  i18n,
};
