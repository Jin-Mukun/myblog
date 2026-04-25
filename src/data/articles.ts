// 作者信息配置
export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

// 默认作者信息
export const defaultAuthor: Author = {
  name: 'Jiwac',
  avatar: '/images/jinmukun-avatar.webp',
  bio: '业余开发爱好者',
};

// 文章数据配置
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  // optional cover image URL
  cover?: string;
  category: string;
  date: string;
  author: Author;
}

// 文章元数据列表
export const articles: Article[] = [
  {
    id: 'blog-anniversary',
    title: '博客成立纪念日',
    excerpt: '记录博客的成立时刻，开启无限进步的旅程...',
    cover: 'https://256.dpdns.org/file/images/1775896212464_jmk-blog.webp',
    category: '其他',
    date: '2026-03-14',
    author: defaultAuthor,
  },
  {
    id: 'greedy-math-problems',
    title: '什么，用贪心做初中数学？',
    excerpt: '我自己也没想到最后居然真的凑出来了',
    cover: 'https://256.dpdns.org/file/images/1777105104178_my-cpp-solution.webp.webp',
    category: '其他',
    date: '2026-04-25',
    author: defaultAuthor,
  },
];

// 获取所有分类
export const getCategories = () => {
  const categoryMap = new Map<string, number>();
  articles.forEach((article) => {
    const count = categoryMap.get(article.category) || 0;
    categoryMap.set(article.category, count + 1);
  });
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
};

// 根据 ID 获取文章
export const getArticleById = (id: string) => {
  return articles.find((article) => article.id === id);
};

// 根据分类获取文章
export const getArticlesByCategory = (category: string) => {
  return articles.filter((article) => article.category === category);
};

const articleCache = new Map<string, string>();

export const loadArticleContent = async (id: string): Promise<string> => {
  
  if (articleCache.has(id)) {
    return articleCache.get(id)!;
  }

  try {
    const response = await fetch(`/posts/${id}.md`);
    if (!response.ok) {
      throw new Error('Failed to load article');
    }
    const content = await response.text();
    // 存入缓存
    articleCache.set(id, content);
    return content;
  } catch (error) {
    console.error('Error loading article:', error);
    return '# 文章加载失败\n\n请稍后重试。';
  }
};

// 预加载文章（在浏览器空闲时执行）
export const preloadArticle = (id: string): void => {
  if (articleCache.has(id)) return;

  // 使用 requestIdleCallback 在浏览器空闲时加载
  const loadWhenIdle = () => {
    fetch(`/posts/${id}.md`)
      .then((response) => response.text())
      .then((content) => {
        articleCache.set(id, content);
      })
      .catch(() => {
        // 静默失败，不影响用户体验
      });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadWhenIdle, { timeout: 2000 });
  } else {
    // 降级方案：使用 setTimeout
    setTimeout(loadWhenIdle, 100);
  }
};

// 预加载所有文章
export const preloadAllArticles = (): void => {
  articles.forEach((article) => {
    preloadArticle(article.id);
  });
};
