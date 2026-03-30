# @yyc3/utils

> YYC³ Utils库 - 工具函数集合

## 📦 简介

`@yyc3/utils` 提供了常用的工具函数，帮助开发者快速实现常见功能。

## 🎯 特性

- ✅ **丰富工具函数** - 涵盖字符串、数组、对象等
- 🔧 **类型安全** - TypeScript类型定义
- ⚡ **高性能** - 优化的实现
- 🧪 **测试覆盖** - 单元测试覆盖
- 📦 **零依赖** - 最小依赖原则

## 📥 安装

```bash
# npm
npm install @yyc3/utils

# yarn
yarn add @yyc3/utils

# pnpm
pnpm add @yyc3/utils
```

## 🚀 快速开始

```tsx
import { formatDate, debounce, deepClone } from '@yyc3/utils';

function App() {
  const formattedDate = formatDate(new Date(), 'YYYY-MM-DD');
  
  const handleSearch = debounce((query) => {
    console.log('Searching:', query);
  }, 300);
  
  const clonedData = deepClone(originalData);
  
  return (
    <div>
      <p>Date: {formattedDate}</p>
      <input onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
```

## 📚 工具函数列表

### 字符串工具
- formatString - 字符串格式化
- capitalize - 首字母大写
- camelCase - 驼峰转换
- kebabCase - 短横线转换

### 数组工具
- uniqueArray - 数组去重
- groupBy - 分组
- sortBy - 排序
- flatten - 扁平化

### 对象工具
- deepClone - 深拷贝
- deepMerge - 深合并
- pick - 提取属性
- omit - 忽略属性

### 日期工具
- formatDate - 日期格式化
- parseDate - 日期解析
- dateDiff - 日期差值

### 函数工具
- debounce - 防抖
- throttle - 节流
- memoize - 记忆化
- curry - 柯里化

### 验证工具
- isEmail - 邮箱验证
- isPhone - 手机号验证
- isUrl - URL验证
- isEmpty - 空值检查

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 类型检查
pnpm typecheck

# Lint
pnpm lint
```

## 📖 API文档

详细的API文档请查看 [文档](链接待补充)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](../../CONTRIBUTING.md)

## 📄 许可证

MIT © YYC³ Team

## 🔗 相关链接

- [YYC³组件库](../..)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/YYC-Cube/yyc3-reusable-components/issues)
