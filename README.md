# 行走的驾驶舱

一个简洁优雅的个人博客网站。

## 在线访问

[https://dev.dpdns.org](https://dev.dpdns.org)

## 技术栈

- **前端框架**: React 18 + TypeScript
- **UI 组件库**: Material-UI (MUI)
- **构建工具**: Vite
- **路由**: React Router
- **代码高亮**: highlight.js + rehype-highlight
- **部署**: Cloudflare Pages

## 功能特性

- 响应式设计，支持多端访问
- 文章分类管理
- Markdown 文章渲染
- 代码语法高亮
- 流畅的页面动画

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
my-blog/
├── public/              # 静态资源
│   ├── articles/        # Markdown 文章
│   └── images/          # 图片资源
├── src/
│   ├── components/      # 组件
│   │   └── layout/      # 布局组件
│   ├── data/            # 数据配置
│   ├── pages/           # 页面
│   ├── theme/           # 主题配置
│   └── main.tsx         # 入口文件
└── index.html
```

## 关于作者

- 名称: 行走的驾驶舱
- 身份: 在读中学生
- 兴趣: 业余开发、F1赛车
- GitHub: [Jin-Mukun](https://github.com/Jin-Mukun)

## 开源协议

MIT License
