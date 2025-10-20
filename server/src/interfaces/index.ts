import * as Sequelize from "sequelize";

export interface UserPayload {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  permissions: string[];
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserPayload> {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  permissions: string[];
  password: string;
  createdAt: string;
  updatedAt: string
}

export interface TicketPayload {
  id?: string;
  title: string;
  description: string;
  addedBy: object;
  assignedTo?: string;
  dateAssigned?: string;
  status?: "unassigned" | "in-progress" | "resolved" | "closed";
  dateResolved?: string;
  dateClosed?: string
}

export interface TicketQuery {
  status: "unassigned" | "in-progress" | "resolved" | "closed";
  startDate: string;
  endDate: string;
  assignedTo: string;
  addedBy: string;
}

export interface TicketModel extends Sequelize.Model<TicketModel, TicketPayload> {
  id?: string;
  title: string;
  description: string;
  addedBy: object;
  assignedTo?: string;
  dateAssigned?: string;
  status?: "unassigned" | "in-progress" | "resolved" | "closed";
  dateResolved?: string;
  dateClosed?: string;
  createdAt: string
  updatedAt: string
}

export enum ResponseType {
  SUCCESS = "success",
  FAILURE = "failure"
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export const allowedPermissions = ["users:read", "users:create", "tickets:create", "tickets:update", "tickets:delete"]