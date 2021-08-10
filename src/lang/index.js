import { createI18n } from 'vue-i18n'
import Store from '@/store'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementJaLocale from 'element-plus/lib/locale/lang/ja'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale,
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale
  }
}

export default createI18n({
  locale: Store.getters.language,
  messages,
});