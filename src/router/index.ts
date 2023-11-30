import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/chat',
        name: 'chat',
        meta: {
          title: '聊天',
          icon: 'ChatDotRound'
        },
        component: () => import('@/views/chat/index.vue')
      },
      {
        path: '/documents',
        name: 'documents',
        meta: {
          title: '上传文档',
          icon: 'Upload'
        },
        component: () => import('@/views/manage/documents/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
