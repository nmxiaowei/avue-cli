import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Store from '@/store'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'
import AvueJaLocale from './avue/ja'
import avueZhLocale from '@smallwei/avue/lib/locale/lang/zh'
import avueEnLocale from '@smallwei/avue/lib/locale/lang/en'
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...avueEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...avueZhLocale
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale,
    ...AvueJaLocale
  }
}

const i18n = new VueI18n({
  locale: Store.getters.language,
  messages,
});


export default i18n