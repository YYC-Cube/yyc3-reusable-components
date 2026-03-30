/**
 * @file taskTracker.test.ts
 * @description 任务追踪器测试
 */

import { TaskTracker, taskTracker, Task } from '../taskTracker';

describe('taskTracker', () => {
  describe('TaskTracker', () => {
    it('should create task tracker instance', () => {
      const tracker = new TaskTracker();
      expect(tracker).toBeDefined();
    });

    it('should add task', () => {
      const tracker = new TaskTracker();
      const task: Task = {
        id: 'task-1',
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['test'],
      };
      tracker.addTask(task);
      const retrieved = tracker.getTask('task-1');
      expect(retrieved).toBeDefined();
      expect(retrieved?.title).toBe('Test Task');
    });

    it('should update task', () => {
      const tracker = new TaskTracker();
      const task: Task = {
        id: 'task-2',
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
      };
      tracker.addTask(task);
      tracker.updateTask('task-2', { status: 'in-progress' });
      const updated = tracker.getTask('task-2');
      expect(updated?.status).toBe('in-progress');
    });

    it('should complete task', () => {
      const tracker = new TaskTracker();
      const task: Task = {
        id: 'task-3',
        title: 'Test Task',
        description: 'Test Description',
        priority: 'low',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
      };
      tracker.addTask(task);
      tracker.completeTask('task-3');
      const completed = tracker.getTask('task-3');
      expect(completed?.status).toBe('completed');
    });

    it('should get tasks by status', () => {
      const tracker = new TaskTracker();
      const task1: Task = {
        id: 'task-4',
        title: 'Task 1',
        description: 'Description 1',
        priority: 'high',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
      };
      const task2: Task = {
        id: 'task-5',
        title: 'Task 2',
        description: 'Description 2',
        priority: 'medium',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
      };
      tracker.addTask(task1);
      tracker.addTask(task2);

      const pendingTasks = tracker.getTasksByStatus('pending');
      const completedTasks = tracker.getTasksByStatus('completed');

      expect(pendingTasks.length).toBe(1);
      expect(completedTasks.length).toBe(1);
    });

    it('should get tasks by priority', () => {
      const tracker = new TaskTracker();
      const task: Task = {
        id: 'task-6',
        title: 'High Priority Task',
        description: 'Description',
        priority: 'high',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
      };
      tracker.addTask(task);

      const highPriorityTasks = tracker.getTasksByPriority('high');
      expect(highPriorityTasks.length).toBe(1);
      expect(highPriorityTasks[0].title).toBe('High Priority Task');
    });

    it('should export tasks', () => {
      const tracker = new TaskTracker();
      const task: Task = {
        id: 'task-7',
        title: 'Test Task',
        description: 'Description',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['export'],
      };
      tracker.addTask(task);

      const exported = tracker.exportTasks();
      expect(typeof exported).toBe('string');
      expect(exported).toContain('Test Task');
    });
  });

  describe('taskTracker singleton', () => {
    it('should export task tracker singleton', () => {
      expect(taskTracker).toBeDefined();
      expect(taskTracker).toBeInstanceOf(TaskTracker);
    });
  });
});
