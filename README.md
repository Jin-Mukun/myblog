# Jiwac's Blog

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-7.3.8-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个简洁、优雅、高性能的个人博客系统，基于 React 与 TypeScript 构建。

## 特性

- **Material Design 设计**：现代化的用户界面
- **响应式布局**：完美适配桌面、平板与移动设备
- **高性能**：支持懒加载、预加载与代码分割优化
- **Markdown 支持**：代码高亮、引用块、表格等完整支持
- **文章搜索**：实时搜索文章标题与摘要
- **分类管理**：按分类筛选文章
- **友链展示**：友情链接管理功能
- **流畅动画**：页面切换与交互动画效果

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | 前端框架 |
| TypeScript | 类型安全 |
| Vite 6 | 构建工具 |
| Material-UI v7 | UI 组件库 |
| React Router v7 | 路由管理 |
| Framer Motion | 动画效果 |
| react-markdown | Markdown 渲染 |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/yourusername/my-blog.git
cd my-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

## 添加文章

### 1. 创建 Markdown 文件

```bash
touch public/posts/my-article.md
```

### 2. 编写内容

```markdown
# 文章标题

文章内容...

```typescript
// 代码块支持语法高亮
console.log('Hello');
```
```

### 3. 注册文章

编辑 `src/data/articles.ts`：

```typescript
{
  id: 'my-article',
  title: '文章标题',
  excerpt: '文章摘要...',
  cover: 'https://example.com/cover.jpg',
  category: '技术',
  date: '2026-04-25',
  author: defaultAuthor,
}
```

## 添加友链

编辑 `src/data/friends.ts`：

```typescript
{
  id: 'friend-id',
  name: '网站名称',
  url: 'https://example.com/',
  description: '网站描述',
  avatar: 'https://example.com/avatar.png', // 可选
}
```

## 项目结构

```
my-blog/
├── public/
│   ├── posts/          # Markdown 文章
│   └── images/         # 静态图片
├── src/
│   ├── components/     # 组件
│   ├── data/           # 数据配置
│   ├── pages/          # 页面
│   └── theme/          # 主题配置
├── index.html
└── vite.config.ts
```

## 配置说明

### 网站基本信息

编辑 `src/data/articles.ts`：

```typescript
export const defaultAuthor = {
  name: '你的名字',
  avatar: '/images/avatar.webp',
  bio: '个人简介',
};
```

### SEO 与社交分享

编辑 `index.html` 中的 meta 标签：

```html
<meta property="og:url" content="https://your-domain.com" />
<meta property="og:image" content="/images/og-image.webp" />
```

## 构建部署

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

构建产物位于 `dist/` 目录，可部署至：
- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages

## 性能优化

- **图片懒加载**：非首屏图片延迟加载
- **DNS 预解析**：提前解析外部 CDN 域名
- **资源预加载**：关键资源优先加载
- **代码分割**：页面级懒加载
- **文章预加载**：空闲时预加载文章内容

## 许可证

MIT License (c) 2026 Jiwac
