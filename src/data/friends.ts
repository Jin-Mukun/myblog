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
    description: '循此苦旅，以达星辰',
    avatar: 'https://s1.imagehub.cc/images/2025/12/06/28380affd86b014a6dcaf082fcc97064.png',
  },
  {
    id: 'clina',
    name: 'Clina\'s Blog',
    url: 'https://blog.clina.top/',
    description: '¡El pueblo unido jamás será vencido!',
  },
];

// 获取所有友链
export const getFriendLinks = () => friendLinks;
