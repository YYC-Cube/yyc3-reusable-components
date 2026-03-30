# 特效组件迁移指南

## 已识别的特效组件

从项目源码中识别到以下4个特效组件，建议迁移到`@yyc3/effects`包：

### 1. ParticleCanvas（粒子背景系统）
- **源文件：** `项目源码/YYC3-AI-Management/src/app/components/particle-canvas.tsx`
- **大小：** 6.83 KB
- **功能：** Canvas粒子网络背景，带霓虹连线效果
- **依赖：** 
  - `useApp` - 应用主题上下文
  - Canvas API
  - requestAnimationFrame
- **迁移建议：** 高优先级，需要抽象主题依赖

### 2. GlitchText（故障文字效果）
- **源文件：** `项目源码/YYC3-AI-Management/src/app/components/glitch-text.tsx`
- **大小：** 4.14 KB
- **功能：** 赛博朋克风格文字故障效果
- **依赖：**
  - `useApp` - 应用主题上下文
  - CSS动画
- **迁移建议：** 高优先级，需要抽象主题依赖

### 3. NeonCard（霓虹卡片）
- **源文件：** `项目源码/YYC3-AI-Management/src/app/components/neon-card.tsx`
- **大小：** 6.02 KB
- **功能：** 霓虹发光卡片效果
- **依赖：** Tailwind CSS
- **迁移建议：** 中优先级

### 4. CyberpunkWidget（赛博朋克组件）
- **源文件：** `项目源码/YYC3-AI-Management/src/app/components/cyberpunk-widget.tsx`
- **大小：** 23.67 KB
- **功能：** 复杂的赛博朋克风格组件
- **依赖：** 多个UI组件
- **迁移建议：** 低优先级（复杂度高）

## 迁移步骤

### 第一步：抽象主题依赖
将`useApp`中的主题配置转换为组件props：

```typescript
// 迁移前
const { theme } = useApp();

// 迁移后
interface ParticleCanvasProps {
  dataFlowEnabled?: boolean;
  neonIntensity?: number;
  // ...
}
```

### 第二步：创建独立组件
1. 复制组件到`packages/effects/src/components/`
2. 调整import路径
3. 添加TypeScript类型定义
4. 创建Storybook文档

### 第三步：更新导出
在`packages/effects/src/components/index.ts`中添加导出：

```typescript
export { ParticleCanvas } from './ParticleCanvas';
export { GlitchText } from './GlitchText';
export { NeonCard } from './NeonCard';
export { CyberpunkWidget } from './CyberpunkWidget';
```

### 第四步：添加测试
为每个迁移的组件创建单元测试。

## 注意事项

1. **主题依赖：** 所有组件都依赖`useApp`上下文，需要抽象为props或提供默认主题配置
2. **样式依赖：** 部分组件依赖全局CSS和Tailwind配置
3. **性能优化：** 迁移时需确保性能不受影响
4. **向后兼容：** 迁移后需要在原项目中保持兼容性

## 预计工作量

- **ParticleCanvas：** 2-3小时
- **GlitchText：** 1-2小时
- **NeonCard：** 1-2小时
- **CyberpunkWidget：** 4-5小时
- **总计：** 8-12小时

## 下一步行动

1. 创建通用主题上下文接口
2. 迁移高优先级组件（ParticleCanvas、GlitchText）
3. 创建Storybook文档和测试
4. 发布新版本
