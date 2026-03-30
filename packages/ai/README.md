# @yyc3/ai

> YYC³ AI组件库 - AI聊天和对话组件

## 📦 简介

`@yyc3/ai` 提供了12个AI聊天和对话组件，专注于构建智能对话界面和AI交互体验。

## 🎯 特性

- ✅ **12个AI组件** - AI对话界面组件
- 💬 **聊天组件** - 完整的聊天UI组件
- 🤖 **AI集成** - 支持多种AI服务集成
- 📝 **Markdown渲染** - 支持Markdown内容渲染
- 🎨 **主题定制** - 支持Tailwind CSS主题
- 🔄 **TypeScript支持** - 完整类型定义

## 📥 安装

```bash
# npm
npm install @yyc3/ai

# yarn
yarn add @yyc3/ai

# pnpm
pnpm add @yyc3/ai
```

## 🚀 快速开始

```tsx
import { ChatInterface, MessageList, AIInput } from '@yyc3/ai';

function App() {
  return (
    <ChatInterface>
      <MessageList messages={messages} />
      <AIInput onSubmit={handleSubmit} />
    </ChatInterface>
  );
}
```

## 📚 组件列表

### 聊天界面

- ChatInterface - 聊天界面容器
- MessageList - 消息列表
- MessageItem - 消息项
- AIInput - AI输入框

### AI集成

- AIProvider - AI服务提供者
- ModelSelector - 模型选择器
- ProviderConfig - 服务配置

### 辅助组件

- MarkdownRenderer - Markdown渲染器
- CodeHighlight - 代码高亮
- TypingIndicator - 输入指示器
- SuggestionList - 建议列表
- ConversationHistory - 对话历史

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

详细的API文档请查看 [Storybook](链接待补充)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](../../CONTRIBUTING.md)

## 📄 许可证

MIT © YYC³ Team

## 🔗 相关链接

- [YYC³组件库](../..)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/YYC-Cube/yyc3-reusable-components/issues)
