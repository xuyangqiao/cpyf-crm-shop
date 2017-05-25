import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['./../pages/client/client-enter.vue'], resolve)
      },
      meta: {
        title: '录入推荐患者',
        footerSelect: 0
      }
    },
    {
      path: '/not',
      component: function (resolve) {
        require(['./../pages/client/client-manage.vue'], resolve)
      },
      meta: {
        title: '患者管理',
        footerSelect: 1
      },
      children: [
        {
          path: '/not',
          component: function (resolve) {
            require(['./../pages/client/client-not.vue'], resolve)
          },
          meta: {
            title: '全部患者',
            footerSelect: 1
          }
        },
        {
          path: '/already',
          component: function (resolve) {
            require(['./../pages/client/client-already.vue'], resolve)
          },
          meta: {
            title: '已就诊患者',
            footerSelect: 1
          }
        }
      ]
    },
    {
      path: '/detail',
      component: function (resolve) {
        require(['./../pages/client/client-info.vue'], resolve)
      },
      meta: {
        title: '患者详情',
        footerSelect: 1
      }
    },
    {
      path: '/doctor',
      component: function (resolve) {
        require(['./../pages/doctor/doctor.vue'], resolve)
      },
      meta: {
        title: '推荐专家',
        footerSelect: 2
      }
    },
    {
      path: '/success',
      component: function (resolve) {
        require(['./../pages/client/client-success.vue'], resolve)
      },
      meta: {
        title: '录入成功',
        footerSelect: 0
      }
    },
    {
      path: '/fail',
      component: function (resolve) {
        require(['./../pages/client/client-fail.vue'], resolve)
      },
      meta: {
        title: '录入失败',
        footerSelect: 0
      }
    },
    {
      path: '/user',
      component: function (resolve) {
        require(['./../pages/user/user.vue'], resolve)
      },
      meta: {
        title: '个人中心',
        footerSelect: 3
      }
    },
    {
      path: '/sale',
      component: function (resolve) {
        require(['./../pages/salesman/sale-manage.vue'], resolve)
      },
      meta: {
        title: '业务员管理',
        footerSelect: 3
      }
    },
    {
      path: '/newsale',
      component: function (resolve) {
        require(['./../pages/salesman/sale-new.vue'], resolve)
      },
      meta: {
        title: '添加业务员',
        footerSelect: 3
      }
    },
    {
      path: '/share',
      component: function (resolve) {
        require(['./../pages/user/user-share.vue'], resolve)
      },
      meta: {
        title: '推荐分享',
        footerSelect: 2
      },
      children: [
        {
          path: '/share',
          component: function (resolve) {
            require(['./../pages/user/user-doctorcode.vue'], resolve)
          },
          meta: {
            title: '推广二维码',
            footerSelect: 2
          }
        },
        {
          path: '/doctorlist',
          component: function (resolve) {
            require(['./../pages/doctor/doctor-list.vue'], resolve)
          },
          meta: {
            title: '专家团队',
            footerSelect: 2
          }
        }
        // {
        //   path: '/share',
        //   component: function (resolve) {
        //     require(['./../pages/user/user-sharecode.vue'], resolve)
        //   },
        //   meta: {
        //     title: '推广二维码',
        //     footerSelect: 3
        //   }
        // }
      ]
    },
    {
      path: '/consumer',
      component: function (resolve) {
        require(['./../pages/user/user-consumer.vue'], resolve)
      },
      meta: {
        title: '消费清单',
        footerSelect: 3
      }
    },
    {
      path: '/money',
      component: function (resolve) {
        require(['./../pages/user/user-applymoney.vue'], resolve)
      },
      meta: {
        title: '申请提现',
        footerSelect: 3
      }
    }
  ]
})
