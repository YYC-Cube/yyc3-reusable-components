import { useEffect, useState, useMemo } from 'react';

/**
 * useNavigationContext Hook
 *
 * 用于业务模块消费导航上下文数据，实现跨模块数据联动
 *
 * @param navigationContext - 从 App.tsx 传入的导航上下文
 * @param moduleType - 当前模块类型，用于判断上下文相关性
 * @returns 处理后的上下文信息和辅助方法
 */

export interface NavigationContext {
  source?: string;
  sourceModule?: string;
  type?: string;
  priority?: 'high' | 'normal' | 'low';
  recommendations?: Array<{
    title: string;
    description?: string;
    action?: string;
    data?: any;
  }>;
  [key: string]: any;
}

export interface UseNavigationContextResult {
  // 上下文是否存在
  hasContext: boolean;

  // 上下文数据
  context: NavigationContext | null;

  // 提取的关键字段
  contextData: {
    customerId?: string;
    orderId?: string;
    employeeId?: string;
    projectId?: string;
    invoiceId?: string;
    [key: string]: any;
  };

  // 辅助方法：判断是否应该高亮某项数据
  shouldHighlight: (itemId: string, itemType?: string) => boolean;

  // 辅助方法：获取筛选条件
  getFilterCriteria: () => Record<string, any>;

  // 辅助方法：获取智能推荐
  getRecommendations: () => Array<{
    title: string;
    description?: string;
    action?: string;
    data?: any;
  }>;
}

export function useNavigationContext(
  navigationContext: Record<string, any> | undefined,
  moduleType: string
): UseNavigationContextResult {
  const [hasContext] = useState(!!navigationContext);

  // 提取上下文中的关键数据字段
  const contextData = useMemo(() => {
    if (!navigationContext) return {};

    const extracted: Record<string, any> = {};

    // 提取常见业务实体ID
    const idFields = [
      'customerId',
      'orderId',
      'employeeId',
      'projectId',
      'invoiceId',
      'supplierId',
      'assetId',
      'contractId',
    ];

    idFields.forEach((field) => {
      if (navigationContext[field]) {
        extracted[field] = navigationContext[field];
      }
    });

    // 提取其他有用字段
    if (navigationContext.customerName) extracted.customerName = navigationContext.customerName;
    if (navigationContext.amount) extracted.amount = navigationContext.amount;
    if (navigationContext.status) extracted.status = navigationContext.status;
    if (navigationContext.category) extracted.category = navigationContext.category;

    return extracted;
  }, [navigationContext]);

  // 判断是否应该高亮某项数据
  const shouldHighlight = (itemId: string, itemType?: string): boolean => {
    if (!navigationContext) return false;

    // 根据不同的上下文类型和模块类型判断
    switch (moduleType) {
      case 'customers':
        return contextData.customerId === itemId;

      case 'orders':
        return contextData.orderId === itemId || contextData.customerId === itemId;

      case 'employees':
        return contextData.employeeId === itemId;

      case 'projects':
        return contextData.projectId === itemId || contextData.customerId === itemId;

      case 'invoices':
        return contextData.invoiceId === itemId || contextData.customerId === itemId;

      default:
        // 通用匹配逻辑
        return Object.values(contextData).includes(itemId);
    }
  };

  // 获取筛选条件
  const getFilterCriteria = (): Record<string, any> => {
    if (!navigationContext) return {};

    const criteria: Record<string, any> = {};

    // 根据模块类型返回相应的筛选条件
    switch (moduleType) {
      case 'orders':
        if (contextData.customerId) criteria.customerId = contextData.customerId;
        if (contextData.status) criteria.status = contextData.status;
        break;

      case 'invoices':
        if (contextData.customerId) criteria.customerId = contextData.customerId;
        if (contextData.orderId) criteria.orderId = contextData.orderId;
        break;

      case 'projects':
        if (contextData.customerId) criteria.customerId = contextData.customerId;
        if (contextData.employeeId) criteria.assignee = contextData.employeeId;
        break;

      case 'employees':
        if (contextData.department) criteria.department = contextData.department;
        break;
    }

    return criteria;
  };

  // 获取智能推荐
  const getRecommendations = () => {
    if (!navigationContext?.recommendations) return [];
    return navigationContext.recommendations;
  };

  // 日志输出（开发调试用）
  useEffect(() => {
    if (navigationContext) {
      console.log(`[useNavigationContext] ${moduleType}:`, {
        hasContext,
        contextData,
        source: navigationContext.source || navigationContext.sourceModule,
      });
    }
  }, [navigationContext, moduleType, hasContext, contextData]);

  return {
    hasContext,
    context: navigationContext || null,
    contextData,
    shouldHighlight,
    getFilterCriteria,
    getRecommendations,
  };
}

/**
 * 生成智能推荐的辅助函数
 */
export function generateRecommendations(
  sourceModule: string,
  targetModule: string,
  contextData: Record<string, any>
): Array<{ title: string; description?: string; action?: string; data?: any }> {
  const recommendations: Array<any> = [];

  // 基于来源模块和目标模块生成推荐
  if (sourceModule === 'dashboard' && targetModule === 'customers') {
    if (contextData.customerId) {
      recommendations.push({
        title: '查看该客户的所有订单',
        description: '快速访问该客户的历史订单记录',
        action: 'navigate',
        data: { target: 'orders', filter: { customerId: contextData.customerId } },
      });
      recommendations.push({
        title: '查看客户项目',
        description: '查看与该客户相关的所有项目',
        action: 'navigate',
        data: { target: 'projects', filter: { customerId: contextData.customerId } },
      });
    }
  }

  if (sourceModule === 'customers' && targetModule === 'orders') {
    if (contextData.customerId) {
      recommendations.push({
        title: '创建新订单',
        description: '为该客户创建新的销售订单',
        action: 'create',
        data: { customerId: contextData.customerId },
      });
    }
  }

  if (sourceModule === 'orders' && targetModule === 'invoices') {
    if (contextData.orderId) {
      recommendations.push({
        title: '生成订单发票',
        description: '基于该订单自动生成发票',
        action: 'generate',
        data: { orderId: contextData.orderId },
      });
    }
  }

  return recommendations;
}
