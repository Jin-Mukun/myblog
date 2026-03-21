# Jiwac's Blog

一个基于 React + TypeScript 构建的简洁优雅的个人博客网站。

## 在线访问

[https://dev.dpdns.org](https://dev.dpdns.org)

[https://jmk.gv.uy](https://jmk.gv.uyg)

## 技术栈

- **前端框架**: React 18 + TypeScript
- **UI 组件库**: Material-UI (MUI) v7
- **构建工具**: Vite 6
- **路由管理**: React Router v7
- **动画效果**: Framer Motion
- **Markdown 渲染**: react-markdown + rehype-highlight
- **代码高亮**: highlight.js
- **部署平台**: Cloudflare Pages

## 功能特性

- 响应式设计，完美适配桌面端、平板和移动设备
- Markdown 文章渲染，支持代码语法高亮
- 文章分类管理，支持按分类筛选
- 文章搜索功能
- 网格/列表双视图切换
- 流畅的页面切换动画
- 图片懒加载优化
- 文章预加载机制

## 本地开发

### 环境要求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 本地预览生产构建

```bash
npm run preview
```

## 项目结构

```
my-blog/
├── public/                      # 静态资源目录
│   ├── articles/                # Markdown 文章存放目录
│   │   └── blog-anniversary.md  # 文章文件
│   └── images/                  # 图片资源
│       ├── favicon.ico          # 网站图标
│       └── jinmukun-avatar.jpg  # 作者头像
├── src/
│   ├── components/              # 组件目录
│   │   ├── common/              # 通用组件
│   │   │   ├── LazyImage.tsx    # 懒加载图片组件
│   │   │   └── ArticleCardSkeleton.tsx  # 文章卡片骨架屏
│   │   └── layout/              # 布局组件
│   │       ├── Header.tsx       # 顶部导航栏
│   │       ├── Footer.tsx       # 页脚
│   │       └── Layout.tsx       # 页面布局容器
│   ├── data/
│   │   └── articles.ts          # 文章数据配置
│   ├── pages/                   # 页面组件
│   │   ├── Home.tsx             # 首页
│   │   ├── Articles.tsx         # 文章列表页
│   │   ├── ArticleDetail.tsx    # 文章详情页
│   │   ├── Categories.tsx       # 分类页面
│   │   └── About.tsx            # 关于页面
│   ├── theme/
│   │   └── index.ts             # MUI 主题配置
│   ├── App.tsx                  # 应用根组件
│   └── main.tsx                 # 入口文件
├── index.html                   # HTML 模板
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖
```

## 如何添加新文章

### 第一步：创建 Markdown 文件

在 `public/articles/` 目录下创建新的 Markdown 文件，文件名格式为 `文章id.md`，例如 `my-first-post.md`。

```bash
# 示例：创建新文章
touch public/articles/my-first-post.md
```

### 第二步：编写文章内容

使用标准 Markdown 语法编写文章内容，支持代码块高亮：

```markdown
# 文章标题

## 引言

这是文章的引言部分...

## 正文

正文内容支持：

- **粗体** 和 *斜体*
- [链接](https://example.com)
- 代码块：

```typescript
function hello() {
  console.log('Hello World');
}
```

## 结语

文章结尾...

---

*作者名*
*日期*
```

### 第三步：注册文章元数据

打开 `src/data/articles.ts` 文件，在 `articles` 数组中添加文章元数据：

```typescript
export const articles: Article[] = [
  // 已有文章...
  {
    id: 'my-first-post',           // 与文件名一致（不含 .md 后缀）
    title: '文章标题',              // 文章显示标题
    excerpt: '文章摘要...',        // 文章摘要，显示在列表页
    image: 'https://example.com/image.jpg',  // 封面图片 URL
    category: '技术',               // 文章分类
    date: '2026-03-20',            // 发布日期，格式：YYYY-MM-DD
    author: {
      name: 'Jiwac',               // 作者名称
      avatar: '/images/jinmukun-avatar.jpg',  // 作者头像路径
      bio: '业余开发爱好者 | F1爱好者',        // 作者简介
    },
  },
];
```

### 第四步：验证文章

1. 启动开发服务器：`npm run dev`
2. 访问文章列表页查看新文章是否显示
3. 点击文章标题进入详情页，验证 Markdown 渲染是否正常
4. 检查代码高亮、图片显示等功能是否正常

### 文章编写规范

1. **文件名**：使用小写字母，单词间用连字符分隔，例如 `my-first-post.md`
2. **ID 规范**：与文件名保持一致，不要包含特殊字符
3. **图片引用**：
   - 外部图片：直接使用 URL
   - 本地图片：放在 `public/images/` 目录，引用路径为 `/images/xxx.jpg`
4. **代码高亮**：支持所有 highlight.js 支持的编程语言
5. **分类管理**：分类名称会自动聚合，相同分类名称的文章会被归类到一起

## 部署

### 部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库
2. 登录 Cloudflare Dashboard
3. 进入 Pages 服务，选择 "Create a project"
4. 连接 GitHub 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
6. 点击保存并部署

### 其他静态托管平台

构建后的 `dist/` 目录可以部署到任何静态托管平台：

- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS
- 腾讯云 COS

## 性能优化

- **代码分割**：使用 Vite 的自动代码分割功能
- **懒加载**：图片使用 Intersection Observer 实现懒加载
- **预加载**：文章 Markdown 在浏览器空闲时预加载
- **缓存策略**：构建产物文件名包含哈希，支持长期缓存

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 关于作者

- **名称**: 行走的驾驶舱
- **身份**: 在读中学生
- **兴趣**: 业余开发、F1赛车
- **GitHub**: [mukunjin](https://github.com/mukunjin)

## 开源协议

MIT License

Copyright (c) 2026 Mukun Jin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
