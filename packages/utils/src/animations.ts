/**
 * YYC³ 统一动画系统
 * 基于 Glassmorphism 2.0 设计规范
 */

// 标准缓动函数
export const easing = {
  // 弹簧效果 - 适用于卡片、模态框
  spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],

  // 流畅进出 - 适用于页面切换
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],

  // 快速进入 - 适用于下拉菜单
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],

  // 快速退出 - 适用于关闭动画
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
};

// 标准持续时间（毫秒）
export const duration = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 700,
};

// 页面切换动画变体
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: easing.easeInOut },
};

// 卡片进入动画变体
export const cardEnter = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: easing.spring },
};

// 列表项依次进入动画
export const staggerList = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: easing.easeOut },
  },
};

// 模态框动画变体
export const modalAnimation = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
};

// 侧边栏滑入动画
export const sidebarAnimation = {
  initial: { opacity: 0, x: -400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -400 },
  transition: { type: 'spring', damping: 30, stiffness: 300 },
};

// 通知滑入动画
export const notificationSlide = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 400 },
  transition: { type: 'spring', damping: 25, stiffness: 300 },
};

// 浮动动画（用于Logo、图标等）
export const floatAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 脉冲动画（用于通知徽章）
export const pulseAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 摇晃动画（用于警告、错误）
export const shakeAnimation = {
  animate: {
    rotate: [0, -15, 15, -15, 15, 0],
    transition: {
      duration: 0.5,
      repeat: 2,
    },
  },
};

// 光泽扫过动画（用于按钮、卡片）
export const shimmerAnimation = {
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s linear infinite',
  backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
};

// 渐变背景流动动画
export const liquidFlowAnimation = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Hover 缩放效果
export const hoverScale = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: easing.easeOut },
};

// 按钮点击效果
export const buttonTap = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 },
};

// 展开/收起动画
export const expandCollapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: easing.easeInOut },
};

// Tab 切换动画
export const tabSwitch = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2, ease: easing.easeOut },
};

// 徽章进入动画
export const badgeEnter = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  transition: { type: 'spring', stiffness: 500, damping: 15 },
};

// Tooltip 进入动画
export const tooltipEnter = {
  initial: { opacity: 0, scale: 0.8, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -10 },
  transition: { duration: 0.15, ease: easing.easeOut },
};

// 下拉菜单动画
export const dropdownAnimation = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
  transition: { duration: 0.15, ease: easing.easeOut },
};
