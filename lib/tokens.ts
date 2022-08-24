export const todoStatus = ['New', 'InProgress', 'Done', 'Pending'] as const
export type TodoStatus = typeof todoStatus[number]
