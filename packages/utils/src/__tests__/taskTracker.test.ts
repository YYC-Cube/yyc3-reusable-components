import { TaskTracker, createTask, getTaskStatus } from '../taskTracker';

describe('taskTracker', () => {
  describe('TaskTracker', () => {
    it('should create task tracker instance', () => {
      const tracker = new TaskTracker();
      expect(tracker).toBeDefined();
    });

    it('should add task', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task', { priority: 'high' });
      expect(taskId).toBeDefined();
    });

    it('should update task status', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task');
      
      tracker.updateTask(taskId, { status: 'completed' });
      const task = tracker.getTask(taskId);
      
      expect(task.status).toBe('completed');
    });

    it('should remove task', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task');
      
      tracker.removeTask(taskId);
      const task = tracker.getTask(taskId);
      
      expect(task).toBeUndefined();
    });

    it('should list all tasks', () => {
      const tracker = new TaskTracker();
      tracker.addTask('Task 1');
      tracker.addTask('Task 2');
      
      const tasks = tracker.listTasks();
      expect(tasks).toHaveLength(2);
    });

    it('should filter tasks by status', () => {
      const tracker = new TaskTracker();
      const id1 = tracker.addTask('Task 1');
      tracker.addTask('Task 2');
      
      tracker.updateTask(id1, { status: 'completed' });
      
      const completedTasks = tracker.getTasksByStatus('completed');
      expect(completedTasks).toHaveLength(1);
    });

    it('should track task progress', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task');
      
      tracker.updateProgress(taskId, 50);
      const task = tracker.getTask(taskId);
      
      expect(task.progress).toBe(50);
    });

    it('should handle task dependencies', () => {
      const tracker = new TaskTracker();
      const parentTask = tracker.addTask('Parent Task');
      const childTask = tracker.addTask('Child Task', { dependsOn: parentTask });
      
      const task = tracker.getTask(childTask);
      expect(task.dependsOn).toBe(parentTask);
    });

    it('should calculate task duration', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task');
      
      tracker.updateTask(taskId, { status: 'completed' });
      const duration = tracker.getTaskDuration(taskId);
      
      expect(duration).toBeDefined();
    });
  });

  describe('createTask', () => {
    it('should create a task object', () => {
      const task = createTask('Test Task', { priority: 'high' });
      expect(task.name).toBe('Test Task');
      expect(task.priority).toBe('high');
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeDefined();
    });
  });

  describe('getTaskStatus', () => {
    it('should return task status', () => {
      const tracker = new TaskTracker();
      const taskId = tracker.addTask('Test Task');
      
      const status = getTaskStatus(tracker, taskId);
      expect(status).toBeDefined();
    });
  });
});
