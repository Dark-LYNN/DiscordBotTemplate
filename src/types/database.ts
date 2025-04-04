export interface databaseReturn {
  success?: boolean;
  message?: string | boolean;
  data?: Thread | Bot
  value?: string | number | boolean | Date
  updatedUser?: updatedUser
};

export interface Thread {
  createdAt: Date;
  userId: string;
  threadId: string;
  lastActive: Date;
}

export interface Bot {
  botId: string;
  userId: string;
  approvedBy: string;
  invite: number;
  createdAt: Date;
  addedAt: Date;
  library: string;
  description: string;
  prefix: string;
  botBanned: boolean;
  botAdded: boolean;
  botAwaiting: boolean;
}

export interface updatedUser {
  user_id: string;
  createdAt: Date;
  userBanned: boolean;
  hasAwaitedBot: boolean;
}

export interface updatedBot {
  approvedBy: string;
  addedAt: Date;
  botAdded: boolean;
  botAwaiting: boolean;
  prefix: string;
  invite: number;
  library: string;
  description: string;
  user_id: string;
  createdAt: Date;
  userBanned: boolean;
  hasAwaitedBot: boolean;
}
