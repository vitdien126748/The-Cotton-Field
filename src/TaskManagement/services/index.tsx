import type { Role, Task, UserProfile } from "../type";
import apiClient from "../lib/apiClient";

export const baseUrl = "https://server.aptech.io";

export const getTasks = async () => {
  const response: Task[] = await apiClient.get("/workspaces/tasks");
  return response;
};

export const getTasksByAssignee = async (assigneeId: number) => {
  const response: Task[] = await apiClient.get(
    `/workspaces/tasks/assignee/${assigneeId}`
  );
  return response;
};

export const createTask = async (task: Task) => {
  const response: Task = await apiClient.post("/workspaces/tasks", task);
  return response;
};

export const getTaskById = async (id: number) => {
  const response: Task = await apiClient.get(`/workspaces/tasks/${id}`);
  return response;
};

export const updateTask = async (id: number, task: Task) => {
  const response: Task = await apiClient.patch(`/workspaces/tasks/${id}`, task);
  return response;
};

export const deleteTask = async (id: number) => {
  const response: Task = await apiClient.delete(`/workspaces/tasks/${id}`);
  return response;
};

export const getUsers = async () => {
  const response: UserProfile[] = await apiClient.get("/security/users");
  return response;
};

export const getUserById = async (id: number) => {
  const response: UserProfile = await apiClient.get(`/security/users/${id}`);
  return response;
};

export const updateUser = async (id: number, user: UserProfile) => {
  const response: UserProfile = await apiClient.patch(
    `/security/users/${id}`,
    user
  );
  return response;
};
export const deleteUser = async (id: number) => {
  const response: UserProfile = await apiClient.delete(`/security/users/${id}`);
  return response;
};
export const addRolesToUser = async (userId: number, role_ids: number[]) => {
  const response: UserProfile = await apiClient.put(
    `/security/users/${userId}/add-roles-to-user`,
    { role_ids }
  );
  return response;
};
export const removeRolesFromUser = async (
  userId: number,
  role_ids: number[]
) => {
  const response: UserProfile = await apiClient.put(
    `/security/users/${userId}/remove-roles-from-user`,
    { role_ids }
  );
  return response;
};

export const getRoles = async () => {
  const response: Role[] = await apiClient.get("/security/roles");
  return response;
};
export const getRoleById = async (id: number) => {
  const response: Role = await apiClient.get(`/security/roles/${id}`);
  return response;
};

export const createRole = async (role: Role) => {
  const response: Role = await apiClient.post("/security/roles", role);
  return response;
};
export const updateRole = async (id: number, role: Role) => {
  const response: Role = await apiClient.patch(`/security/roles/${id}`, role);
  return response;
};
export const deleteRole = async (id: number) => {
  const response: Role = await apiClient.delete(`/security/roles/${id}`);
  return response;
};
