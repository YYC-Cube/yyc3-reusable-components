export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  assignee?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export class TaskTracker {
  private tasks: Map<string, Task> = new Map();

  addTask(task: Task): void {
    this.tasks.set(task.id, task);
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const task = this.tasks.get(id);
    if (task) {
      this.tasks.set(id, { ...task, ...updates, updatedAt: new Date() });
    }
  }

  completeTask(id: string): void {
    this.updateTask(id, { status: 'completed' });
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return Array.from(this.tasks.values()).filter((t) => t.status === status);
  }

  getTasksByPriority(priority: Task['priority']): Task[] {
    return Array.from(this.tasks.values()).filter((t) => t.priority === priority);
  }

  exportTasks(): string {
    return JSON.stringify(Array.from(this.tasks.values()), null, 2);
  }
}

export const taskTracker = new TaskTracker();
