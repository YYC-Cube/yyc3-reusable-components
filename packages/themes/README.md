# @yyc3/themes

YYC³ 主题系统 - Cyberpunk、Liquid Glass 等主题样式

## 安装

```bash
pnpm add @yyc3/themes
```

## 使用

### 引入样式

```css
/* 引入所有主题 */
@import '@yyc3/themes/styles';

/* 单独引入主题 */
@import '@yyc3/themes/styles/cyberpunk';
@import '@yyc3/themes/styles/liquid-glass';
```

### TypeScript API

```ts
import { applyTheme, getTheme, themes } from '@yyc3/themes';

// 获取主题配置
const theme = getTheme('cyberpunk');

// 应用主题
applyTheme('liquid-glass');
```

## 可用主题

| 主题 | 描述 |
|------|------|
| `cyberpunk` | 赛博朋克风格 - 霓虹青色 |
| `liquid-glass` | 玻璃态设计 - 绿色渐变 |
| `dark` | 深色主题 |
| `light` | 浅色主题 |

## License

MIT
