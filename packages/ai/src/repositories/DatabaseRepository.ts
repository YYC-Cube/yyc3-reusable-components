/**
 * @file DatabaseRepository.ts
 * @description 数据库仓库存根
 */

export const databaseRepository = {
  getDatabaseConfig: () => ({}),
  saveDatabaseConfig: (_config: any) => {},
  testConnection: async () => ({ success: true, message: 'Stub connection test' }),
  isMockMode: true,
  setMockMode: (_mode: boolean) => {},
};
