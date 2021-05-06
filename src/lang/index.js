import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'
import AvueJaLocale from './avue/ja'
import { getStore } from '@/util/store'
var Avue = window.AVUE;
Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...Avue.locale.en,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...Avue.locale.zh,
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale,
    ...AvueJaLocale
  }
}

const i18n = new VueI18n({
  locale: getStore({ name: 'language' }) || 'en',
  messages
})

export default i18n