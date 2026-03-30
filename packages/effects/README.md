# @yyc3/effects

> YYC³ Effects组件库 - 特效和动画组件

## 📦 简介

`@yyc3/effects` 提供了7个特效和动画组件，专注于提升用户体验的视觉效果，包括赛博朋克风格的视觉特效组件。

## 🎯 特性

- ✅ **7个特效组件** - 精选的高质量特效
- 🎨 **视觉效果** - 丰富的视觉特效（3D、粒子、故障效果）
- ⚡ **高性能** - 优化的动画性能（RAF动画、React.memo）
- 🎬 **可定制** - 灵活的动画配置
- 🔄 **TypeScript支持** - 完整类型定义
- 🎭 **双主题支持** - 赛博朋克 + 液态玻璃

## 📥 安装

```bash
# npm
npm install @yyc3/effects

# yarn
yarn add @yyc3/effects

# pnpm
pnpm add @yyc3/effects
```

## 🚀 快速开始

```tsx
import { ParticleCanvas, GlitchText, NeonCard, CyberpunkWidget } from '@yyc3/effects';

function App() {
  return (
    <div>
      <ParticleCanvas config={{ neonIntensity: 80 }} />
      <GlitchText color="#00f0ff">赛博朋克</GlitchText>
      <NeonCard themeMode="cyberpunk">
        <h3>霓虹卡片</h3>
      </NeonCard>
    </div>
  );
}
```

## 📚 组件列表

### 3D特效组件
| 组件 | 描述 | 状态 |
|------|------|------|
| `_3DEffects` | 3D特效系统 | ✅ 稳定 |
| `MicroInteractions` | 微交互动画 | ✅ 稳定 |
| `ParallaxScroll` | 视差滚动 | ✅ 稳定 |

### 赛博朋克特效组件
| 组件 | 描述 | 状态 |
|------|------|------|
| `ParticleCanvas` | Canvas粒子网络背景 | ✅ 新增 |
| `GlitchText` | 故障文字效果 | ✅ 新增 |
| `NeonCard` | 霓虹发光卡片 | ✅ 新增 |
| `CyberpunkWidget` | 赛博朋克悬浮窗口 | ✅ 新增 |

## 📖 API文档

### ParticleCanvas

Canvas粒子网络背景组件，支持霓虹连线效果和鼠标交互。

```tsx
import { ParticleCanvas } from '@yyc3/effects';

<ParticleCanvas
  config={{
    enabled: true,
    neonIntensity: 80,
    colors: ['#00f0ff', '#00d4ff', '#00ffcc'],
    opacity: 0.6,
    maxParticles: 60,
  }}
  enableMouseInteraction={true}
  autoResize={true}
/>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config` | `ParticleCanvasConfig` | - | 粒子画布配置 |
| `enableMouseInteraction` | `boolean` | `true` | 是否启用鼠标交互 |
| `autoResize` | `boolean` | `true` | 是否自动适应父容器大小 |
| `className` | `string` | - | 额外的CSS类名 |
| `style` | `CSSProperties` | - | 内联样式 |

### GlitchText

赛博朋克风格文字故障效果组件。

```tsx
import { GlitchText } from '@yyc3/effects';

<GlitchText
  color="#00f0ff"
  intensity={1.2}
  interval={[3000, 8000]}
  as="h1"
>
  赛博朋克
</GlitchText>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `string` | - | 要显示的文字内容 |
| `color` | `string` | `#00f0ff` | 主要霓虹颜色 |
| `intensity` | `number` | `1` | 故障强度乘数 (0-2) |
| `interval` | `[number, number] \| null` | `[3000, 8000]` | 随机故障间隔范围 |
| `as` | `'span' \| 'div' \| 'h1' \| 'h2' \| 'h3' \| 'p'` | `'span'` | 使用的HTML标签 |
| `enabled` | `boolean` | `true` | 是否启用故障效果 |

### NeonCard

霓虹发光卡片组件，支持双主题。

```tsx
import { NeonCard } from '@yyc3/effects';

<NeonCard
  color="#00f0ff"
  hoverable={true}
  themeMode="cyberpunk"
  onClick={() => console.log('clicked')}
>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</NeonCard>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 卡片内容 |
| `color` | `string` | `#00f0ff` | 霓虹发光颜色 |
| `hoverable` | `boolean` | `true` | 是否启用hover效果 |
| `noReveal` | `boolean` | `false` | 禁用滚动显示动画 |
| `themeMode` | `'cyberpunk' \| 'liquidGlass'` | `'cyberpunk'` | 主题模式 |
| `onClick` | `() => void` | - | 点击回调 |

### CyberpunkWidget

可拖拽、可缩放的赛博朋克风格悬浮窗口组件。

```tsx
import { CyberpunkWidget, type WidgetTabConfig } from '@yyc3/effects';

const tabs: WidgetTabConfig[] = [
  { id: 'chat', label: '聊天', icon: '💬', color: '#00f0ff', content: <ChatPanel /> },
  { id: 'tools', label: '工具', icon: '🔧', color: '#00ffcc', content: <ToolsPanel /> },
];

<CyberpunkWidget
  tabs={tabs}
  title="AI助手"
  themeColor="#00f0ff"
  onSwitchMode={() => {}}
/>
```

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tabs` | `WidgetTabConfig[]` | - | 标签页配置列表 |
| `title` | `string` | `'YYC³'` | 窗口标题 |
| `subtitle` | `string` | `'智能助手'` | 窗口副标题 |
| `themeColor` | `string` | `#00f0ff` | 主题颜色 |
| `showQuickActions` | `boolean` | `true` | 是否显示快速操作栏 |
| `onSwitchMode` | `() => void` | - | 切换到独立模式回调 |

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

# 测试覆盖率
pnpm test:coverage

# 类型检查
pnpm typecheck

# Lint
pnpm lint
```

## 🎨 主题配置

### 赛博朋克主题 (Cyberpunk)
- 青色霓虹配色 (#00f0ff)
- 深色背景 (#0a0a0a)
- 扫描线和电路网格

### 液态玻璃主题 (LiquidGlass)
- 渐变玻璃效果
- 白色透明背景
- 圆角和模糊效果

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](../../CONTRIBUTING.md)

## 📄 许可证

MIT © YYC³ Team

## 🔗 相关链接

- [YYC³组件库](../..)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/YYC-Cube/yyc3-reusable-components/issues)
- [Storybook文档](链接待补充)
