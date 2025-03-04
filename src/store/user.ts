const state = () => ({
  all: [],
});

const getters = {};

const mutations = {
  setUsers(state, users) {
    state.all = users;
  },
};

export default {
  state,
  getters,
  mutations,
};
