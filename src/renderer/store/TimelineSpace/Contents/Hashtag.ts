import { ipcRenderer } from 'electron'
import List, { ListState } from './Hashtag/List'
import Tag, { TagState } from './Hashtag/Tag'
import { Module, ActionTree } from 'vuex'
import { RootState } from '@/store'

export interface HashtagState {}

export interface HashtagModuleState extends HashtagState {
  List: ListState,
  Tag: TagState
}

const state = (): HashtagState => ({})

const actions: ActionTree<HashtagState, RootState> = {
  saveTag: ({ dispatch }, tag: string) => {
    ipcRenderer.once('response-save-hashtag', () => {
      dispatch('TimelineSpace/SideMenu/listTags', {}, { root: true })
    })
    ipcRenderer.send('save-hashtag', tag)
  }
}

const Hashtag: Module<HashtagState, RootState> = {
  namespaced: true,
  modules: {
    List,
    Tag
  },
  state: state,
  actions: actions
}

export default Hashtag
