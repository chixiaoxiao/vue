import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: JSON.parse(localStorage.getItem("biggerUserInfo")) || "",
    localId: sessionStorage.getItem("biggerLocalId") || "beijing",
    projectId: sessionStorage.getItem("biggerProjectId") || 0,
    pageReload: false,
    permission: {}
}

const mutations = {
    login(state, user) {
        state.userInfo = user;
        localStorage.setItem("biggerUserInfo", JSON.stringify(user))
    },
    changeNode(state, localId) {
        state.localId = localId;
        sessionStorage.setItem("biggerLocalId", localId)
    },
    changeProject(state, projectId) {
        state.projectId = projectId;
        sessionStorage.setItem("biggerProjectId", projectId)
    },
    pageReload(state, status) {
        state.pageReload = status;
    },
    setPermission(state, permission) {
        state.permission = permission;
    }
}

const actions = {
    login({commit}, user) {
        commit('login', user);
    },
    changeNode({commit}, localId) {
        commit('changeNode', localId);
    },
    changeProject({commit}, projectId) {
        commit('changeProject', projectId);
    },
    pageReload({commit}, status) {
        commit('pageReload', status);
    },
    setPermission({commit}, permission) {
        commit('setPermission', permission);
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
