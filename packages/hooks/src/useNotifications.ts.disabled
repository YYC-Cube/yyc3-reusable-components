import { useState, useEffect, useCallback, useRef } from 'react';
import type { Notification } from '../components/NotificationCenter';

// 模拟通知数据模板
const NOTIFICATION_TEMPLATES: Array<Omit<Notification, 'id' | 'timestamp' | 'read'>> = [
  {
    type: 'business',
    priority: 'critical',
    title: { en: 'High-Value Order Pending', zh: '高价值订单待处理' },
    message: { en: 'Order ORD-2025-156 worth ¥2.5M requires immediate approval', zh: '订单 ORD-2025-156 价值 ¥250万，需要立即审批' },
    actionable: true,
    actionLabel: { en: 'Review Order', zh: '查看订单' },
    actionTarget: 'orders',
    data: { orderId: 'ORD-2025-156', amount: 2500000 }
  },
  {
    type: 'alert',
    priority: 'warning',
    title: { en: 'Inventory Low Alert', zh: '库存不足预警' },
    message: { en: 'Copper Wire inventory below 20% threshold. Current: 450kg', zh: '铜线库存低于20%阈值。当前：450公斤' },
    actionable: true,
    actionLabel: { en: 'View Inventory', zh: '查看库存' },
    actionTarget: 'inventory',
    data: { material: 'Copper Wire', currentStock: 450, threshold: 1000 }
  },
  {
    type: 'approval',
    priority: 'info',
    title: { en: 'Document Approval Required', zh: '文档需要审批' },
    message: { en: 'Contract CON-2025-089 is awaiting your approval', zh: '合同 CON-2025-089 等待您的审批' },
    actionable: true,
    actionLabel: { en: 'Approve', zh: '审批' },
    actionTarget: 'approval',
    data: { documentId: 'CON-2025-089', type: 'contract' }
  },
  {
    type: 'system',
    priority: 'info',
    title: { en: 'System Update Complete', zh: '系统更新完成' },
    message: { en: 'YYC³ v2.12.0 has been successfully deployed with new features', zh: 'YYC³ v2.12.0 已成功部署，包含新功能' },
    actionable: false,
    data: { version: 'v2.12.0' }
  },
  {
    type: 'business',
    priority: 'warning',
    title: { en: 'Payment Overdue', zh: '付款逾期' },
    message: { en: 'Invoice INV-2024-234 is 5 days overdue. Amount: ¥125,000', zh: '发票 INV-2024-234 已逾期5天。金额：¥125,000' },
    actionable: true,
    actionLabel: { en: 'View Invoice', zh: '查看发票' },
    actionTarget: 'invoices',
    data: { invoiceId: 'INV-2024-234', amount: 125000, daysOverdue: 5 }
  },
  {
    type: 'alert',
    priority: 'critical',
    title: { en: 'Risk Alert: Price Volatility', zh: '风险预警：价格波动' },
    message: { en: 'Steel scrap prices dropped 8% in the last 24 hours', zh: '钢废料价格在过去24小时内下跌8%' },
    actionable: true,
    actionLabel: { en: 'View Market', zh: '查看市场' },
    actionTarget: 'market-intelligence',
    data: { material: 'Steel Scrap', priceChange: -8, timeframe: '24h' }
  },
  {
    type: 'approval',
    priority: 'warning',
    title: { en: 'Budget Approval Needed', zh: '预算需要审批' },
    message: { en: 'Q2 Procurement budget ¥4.8M requires CFO approval', zh: 'Q2 采购预算 ¥480万 需要CFO审批' },
    actionable: true,
    actionLabel: { en: 'Review Budget', zh: '查看预算' },
    actionTarget: 'budget',
    data: { budgetId: 'BUD-Q2-2025', amount: 4800000, department: 'Procurement' }
  },
  {
    type: 'business',
    priority: 'info',
    title: { en: 'New Customer Registered', zh: '新客户注册' },
    message: { en: 'Industrial Solutions Ltd. completed registration and verification', zh: '工业解决方案有限公司已完成注册和验证' },
    actionable: true,
    actionLabel: { en: 'View Customer', zh: '查看客户' },
    actionTarget: 'customers',
    data: { customerId: 'CUST-2025-089', customerName: 'Industrial Solutions Ltd.' }
  },
  {
    type: 'system',
    priority: 'warning',
    title: { en: 'Scheduled Maintenance', zh: '计划维护' },
    message: { en: 'System maintenance scheduled for Mar 15, 02:00-04:00 AM', zh: '系统维护计划于3月15日 02:00-04:00' },
    actionable: false,
    data: { maintenanceDate: '2026-03-15', startTime: '02:00', endTime: '04:00' }
  },
  {
    type: 'alert',
    priority: 'info',
    title: { en: 'Performance Report Ready', zh: '绩效报告已生成' },
    message: { en: 'February performance report is now available for review', zh: '2月绩效报告现已可供查看' },
    actionable: true,
    actionLabel: { en: 'View Report', zh: '查看报告' },
    actionTarget: 'reports',
    data: { reportId: 'RPT-2025-02', month: 'February' }
  }
];

// 初始通知（系统启动时的历史通知）
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-initial-1',
    type: 'business',
    priority: 'critical',
    title: { en: 'High-Value Order Pending', zh: '高价值订单待处理' },
    message: { en: 'Order ORD-2025-156 worth ¥2.5M requires immediate approval', zh: '订单 ORD-2025-156 价值 ¥250万，需要立即审批' },
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false,
    actionable: true,
    actionLabel: { en: 'Review Order', zh: '查看订单' },
    actionTarget: 'orders',
    data: { orderId: 'ORD-2025-156', amount: 2500000 }
  },
  {
    id: 'notif-initial-2',
    type: 'alert',
    priority: 'warning',
    title: { en: 'Inventory Low Alert', zh: '库存不足预警' },
    message: { en: 'Copper Wire inventory below 20% threshold', zh: '铜线库存低于20%阈值' },
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    read: false,
    actionable: true,
    actionLabel: { en: 'View Inventory', zh: '查看库存' },
    actionTarget: 'inventory',
    data: { material: 'Copper Wire', currentStock: 450 }
  },
  {
    id: 'notif-initial-3',
    type: 'system',
    priority: 'info',
    title: { en: 'System Update Complete', zh: '系统更新完成' },
    message: { en: 'YYC³ v2.12.0 has been successfully deployed', zh: 'YYC³ v2.12.0 已成功部署' },
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true,
    actionable: false,
    data: { version: 'v2.12.0' }
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pushIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 生成新通知
  const generateNotification = useCallback((): Notification => {
    const template = NOTIFICATION_TEMPLATES[Math.floor(Math.random() * NOTIFICATION_TEMPLATES.length)];
    return {
      ...template,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false
    };
  }, []);

  // 添加通知
  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    setHasNewNotification(true);

    // 播放通知音效（可选）
    // const audio = new Audio('/notification-sound.mp3');
    // audio.play().catch(() => {}); // 静默失败

    // 3秒后重置新通知标志
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setHasNewNotification(false);
    }, 3000);

    console.log('[Notifications] New notification pushed:', notification);
  }, []);

  // WebSocket 模拟：定期推送通知
  useEffect(() => {
    // 启动定时推送（模拟 WebSocket 实时推送）
    // 每 30-60 秒推送一次新通知
    const startPushSimulation = () => {
      const scheduleNext = () => {
        const delay = 30000 + Math.random() * 30000; // 30-60秒随机间隔
        pushIntervalRef.current = setTimeout(() => {
          const newNotification = generateNotification();
          addNotification(newNotification);
          scheduleNext(); // 调度下一次推送
        }, delay);
      };
      scheduleNext();
    };

    startPushSimulation();

    // 清理
    return () => {
      if (pushIntervalRef.current) {
        clearTimeout(pushIntervalRef.current);
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [generateNotification, addNotification]);

  // 标记为已读
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  // 标记全部已读
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  // 删除通知
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // 清空所有通知
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // 未读数量
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    hasNewNotification,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
}
