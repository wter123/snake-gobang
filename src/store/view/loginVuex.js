const loginVuex = {
    state: {
        //是否登录判断
        islogin: false,
    },
    mutations: {
        login: (state, n) => {
            //传入登录状态islogin
            let islogin = JSON.parse(n);
            localStorage.setItem('islogin', JSON.stringify(islogin));
            state.islogin = islogin;
        },


    },
    actions: {
        login: ({ commit, state }, n) => {
            return commit('login', n)
        }
    }
}


export default loginVuex