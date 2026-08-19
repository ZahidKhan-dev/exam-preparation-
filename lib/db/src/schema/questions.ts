import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { papersTable } from "./papers";

export const questionsTable = pgTable("questions", {
  id: serial("id").primaryKey(),
  paperId: integer("paper_id").notNull().references(() => papersTable.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  type: text("type", { enum: ["mcq", "short", "long"] }).notNull(),
  topic: text("topic"),
  marks: integer("marks"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertQuestionSchema = createInsertSchema(questionsTable).omit({ id: true, createdAt: true });
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questionsTable.$inferSelect;
