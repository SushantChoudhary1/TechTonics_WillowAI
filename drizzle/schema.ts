import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(), openId: varchar("openId", { length: 64 }).notNull().unique(), name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }), username: varchar("username", { length: 64 }).unique(), passwordHash: varchar("passwordHash", { length: 255 }), mobileNumber: varchar("mobileNumber", { length: 32 }), avatarUrl: varchar("avatarUrl", { length: 512 }), role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export const holdings = mysqlTable("holdings", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), symbol: varchar("symbol", { length: 24 }).notNull(), quantity: int("quantity").notNull(), averagePrice: decimal("averagePrice", { precision: 14, scale: 2 }).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const agentAnalyses = mysqlTable("agentAnalyses", {
  id: int("id").autoincrement().primaryKey(), userId: int("userId").notNull(), symbol: varchar("symbol", { length: 24 }).notNull(), provider: varchar("provider", { length: 32 }).notNull(), riskLevel: int("riskLevel").notNull(), technical: text("technical").notNull(), fundamentals: text("fundamentals").notNull(), sentiment: text("sentiment").notNull(), risk: text("risk").notNull(), synthesis: text("synthesis").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect; export type InsertUser = typeof users.$inferInsert; export type Holding = typeof holdings.$inferSelect; export type AgentAnalysis = typeof agentAnalyses.$inferSelect;
