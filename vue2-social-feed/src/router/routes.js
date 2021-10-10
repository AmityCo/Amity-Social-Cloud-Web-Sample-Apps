import Centered from '@/layouts/Centered'
import Main from '@/layouts/Main'

import Login from '@/views/Login'

import Posts from '@/views/Posts'
import Conversations from '@/views/Conversations'

import Comments from '@/views/Comments'
import CommentsLikes from '@/views/CommentsLikes'

import Compose from '@/views/Compose'
import Create from '@/views/Create'

import UserProfile from '@/views/UserProfile'
import UserPosts from '@/views/UserPosts'
import MyProfile from '@/views/MyProfile'
import EditProfile from '@/views/EditProfile'
import StoryViewer from '@/views/StoryViewer'

export default [{
  path: '/login',
  component: Login,
  meta: { layout: Centered },
}, {
  path: '/posts',
  component: Posts,
}, {
  path: '/me',
  component: MyProfile,
}, {
  path: '/me/edit',
  component: EditProfile,
}, {
  path: '/create',
  component: Create,
}, {
  path: '/posts/:postId/comments',
  component: Comments,
}, {
  path: '/posts/:postId/comments/:commentId/likes',
  component: CommentsLikes,
}, {
  path: '/conversations',
  component: Conversations,
}, {
  path: '/compose',
  component: Compose,
}, {
  path: '/users/:userId',
  component: UserProfile,
}, {
  path: '/users/:userId/posts',
  component: UserPosts,
}, {
  path: '/stories/:userId',
  component: StoryViewer,
}, {
  path: '*',
  redirect: '/posts',
}];
