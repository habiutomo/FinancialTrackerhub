import { pgTable, text, serial, integer, decimal, date, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  department: text("department"),
  role: text("role").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  department: true,
  role: true,
  email: true,
  phone: true,
});

// Purchase Requisition schema
export const purchaseRequisitions = pgTable("purchase_requisitions", {
  id: serial("id").primaryKey(),
  prNumber: text("pr_number").notNull().unique(),
  date: date("date").notNull(),
  subject: text("subject").notNull(),
  department: text("department").notNull(),
  requester: text("requester").notNull(),
  status: text("status").notNull().default("draft"),
  needsPr: boolean("needs_pr").default(true),
  typePr: text("type_pr").notNull(),
  remarks: text("remarks"),
  supportDoc: boolean("support_doc").default(false),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPRSchema = createInsertSchema(purchaseRequisitions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// PR Items schema
export const prItems = pgTable("pr_items", {
  id: serial("id").primaryKey(),
  prId: integer("pr_id").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  itemId: text("item_id"),
  assetNumber: text("asset_number"),
  brand: text("brand"),
  quantity: integer("quantity").notNull(),
  uom: text("uom").notNull(),
  price: decimal("price", { precision: 18, scale: 2 }).notNull(),
  prbkb: decimal("prbkb", { precision: 18, scale: 2 }).default("0"),
  total: decimal("total", { precision: 18, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPRItemSchema = createInsertSchema(prItems).omit({
  id: true,
  createdAt: true,
});

// Purchase Order schema
export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  poNumber: text("po_number").notNull().unique(),
  date: date("date").notNull(),
  prId: integer("pr_id").notNull(),
  vendor: text("vendor").notNull(),
  subject: text("subject").notNull(),
  attention: text("attention"),
  company: text("company").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  deliveryPoint: text("delivery_point"),
  status: text("status").notNull().default("draft"),
  terms: text("terms"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPOSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// PO Items schema
export const poItems = pgTable("po_items", {
  id: serial("id").primaryKey(),
  poId: integer("po_id").notNull(),
  prItemId: integer("pr_item_id"),
  description: text("description").notNull(),
  brand: text("brand"),
  idNumber: text("id_number"),
  quantity: integer("quantity").notNull(),
  uom: text("uom").notNull(),
  unitPrice: decimal("unit_price", { precision: 18, scale: 2 }).notNull(),
  ppn: decimal("ppn", { precision: 18, scale: 2 }).default("0"),
  total: decimal("total", { precision: 18, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPOItemSchema = createInsertSchema(poItems).omit({
  id: true,
  createdAt: true,
});

// Good Receipt schema
export const goodReceipts = pgTable("good_receipts", {
  id: serial("id").primaryKey(),
  grNumber: text("gr_number").notNull().unique(),
  date: date("date").notNull(),
  poId: integer("po_id").notNull(),
  description: text("description").notNull(),
  nextApproval: text("next_approval"),
  status: text("status").notNull().default("draft"),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGRSchema = createInsertSchema(goodReceipts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Approvals schema
export const approvals = pgTable("approvals", {
  id: serial("id").primaryKey(),
  documentType: text("document_type").notNull(),
  documentId: integer("document_id").notNull(),
  role: text("role").notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").notNull().default("pending"),
  comments: text("comments"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApprovalSchema = createInsertSchema(approvals).omit({
  id: true,
  approvedAt: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type PurchaseRequisition = typeof purchaseRequisitions.$inferSelect;
export type InsertPR = z.infer<typeof insertPRSchema>;

export type PRItem = typeof prItems.$inferSelect;
export type InsertPRItem = z.infer<typeof insertPRItemSchema>;

export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertPO = z.infer<typeof insertPOSchema>;

export type POItem = typeof poItems.$inferSelect;
export type InsertPOItem = z.infer<typeof insertPOItemSchema>;

export type GoodReceipt = typeof goodReceipts.$inferSelect;
export type InsertGR = z.infer<typeof insertGRSchema>;

export type Approval = typeof approvals.$inferSelect;
export type InsertApproval = z.infer<typeof insertApprovalSchema>;
