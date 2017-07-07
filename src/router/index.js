import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['./../pages/client/client-index.vue'], resolve)
      },
      meta: {
        title: '录入推荐客户',
        footerSelect: 0
      },
      children: [
        {
          path: '/',
          component: function (resolve) {
            require(['./../pages/client/client-enter.vue'], resolve)
          },
          meta: {
            title: '录入推荐客户',
            footerSelect: 0
          }
        },
        {
          path: '/clientapply',
          component: function (resolve) {
            require(['./../pages/client/client-apply.vue'], resolve)
          },
          meta: {
            title: '帮助客户预约',
            footerSelect: 0
          }
        }
      ]
    },
    {
      path: '/clientapplysuccess',
      component: function (resolve) {
        require(['./../pages/client/client-applysuccess.vue'], resolve)
      },
      meta: {
        title: '预约成功',
        footerSelect: 1
      }
    },
    {
      path: '/not',
      component: function (resolve) {
        require(['./../pages/client/client-manage.vue'], resolve)
      },
      meta: {
        title: '客户管理',
        footerSelect: 1
      },
      children: [
        {
          path: '/not',
          component: function (resolve) {
            require(['./../pages/client/client-not.vue'], resolve)
          },
          meta: {
            title: '全部客户',
            footerSelect: 1
          }
        },
        {
          path: '/already',
          component: function (resolve) {
            require(['./../pages/client/client-already.vue'], resolve)
          },
          meta: {
            title: '已就诊客户',
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
        title: '客户详情',
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
      path: '/skill',
      component: function (resolve) {
        require(['./../pages/user/user-shareskill.vue'], resolve)
      },
      meta: {
        title: '分享技巧',
        footerSelect: 2
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
          path: '/poster',
          component: function (resolve) {
            require(['./../pages/user/user-poster.vue'], resolve)
          },
          meta: {
            title: '分享海报',
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
    },
    {
      path: '/friend',
      component: function (resolve) {
        require(['./../pages/share/share-friend.vue'], resolve)
      },
      meta: {
        title: '我的好友',
        footerSelect: 3
      }
    }
  ]
})
