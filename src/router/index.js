import Vue from 'vue'
import Router from 'vue-router'
import coolCollege from '@/components/coolCollege'
import elementUi from '@/components/elementUi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'coolCollege',
      component: coolCollege
    },
    {
      path: '/elementUi',
      name: 'elementUi',
      component: elementUi
    }
  ]
})
