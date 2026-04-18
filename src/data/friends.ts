// 友链数据配置
export interface FriendLink {
  id: string;
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

// 友链列表
export const friendLinks: FriendLink[] = [
  {
    id: 'wcowin',
    name: 'Wcowin',
    url: 'https://wcowin.work/',
    description: 'Wcowin的个人博客',
  },
];

// 获取所有友链
export const getFriendLinks = () => friendLinks;
