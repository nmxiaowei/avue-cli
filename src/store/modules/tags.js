import { setStore, getStore } from 'utils/store'
import { diff } from 'utils/util'
import website from '@/config/website'
const tagWel = website.fistPage;
const tagObj = {
  label: '', //标题名称
  value: '', //标题的路径
  params: '', //标题的路径参数
  query: '', //标题的参数
  meta: {},//额外参数
}
const navs = {
  state: {
    tagList: getStore({ name: 'tagList' }) || [],
    tag: getStore({ name: 'tag' }) || tagObj,
    tagWel: tagWel
  },
  actions: {

  },
  mutations: {
    ADD_TAG: (state, action) => {
      state.tag = action;
      setStore({ name: 'tag', content: state.tag })
      if (state.tagList.some(ele => diff(ele, action))) return
      state.tagList.push(action)
      setStore({ name: 'tagList', content: state.tagList })
    },
    DEL_TAG: (state, action) => {
      state.tagList = state.tagList.filter(item => {
        return !diff(item, action);
      })
      setStore({ name: 'tagList', content: state.tagList })
    },
    DEL_ALL_TAG: (state, tagList) => {
      state.tagList = tagList || [state.tagWel];
      setStore({ name: 'tagList', content: state.tagList })
    },
    DEL_TAG_OTHER: (state) => {
      state.tagList = state.tagList.filter(item => {
        if (item.value === state.tag.value) {
          return true;
        } else if (item.value === website.fistPage.value) {
          return true;
        }
      })
      setStore({ name: 'tagList', content: state.tagList })
    },
    SET_TAG_LIST (state, tagList) {
      state.tagList = tagList;
      setStore({ name: 'tagList', content: state.tagList })
    }
  }
}
export default navs