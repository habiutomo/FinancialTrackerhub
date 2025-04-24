import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertPRSchema, 
  insertPRItemSchema, 
  insertPOSchema, 
  insertPOItemSchema, 
  insertGRSchema, 
  insertApprovalSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Purchase Requisition routes
  app.get("/api/pr", async (_req: Request, res: Response) => {
    try {
      const prs = await storage.getAllPRs();
      res.json(prs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchase requisitions", error });
    }
  });

  app.get("/api/pr/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const pr = await storage.getPR(id);
      if (!pr) {
        return res.status(404).json({ message: "Purchase requisition not found" });
      }
      
      const items = await storage.getPRItems(id);
      const approvals = await storage.getApprovals("pr", id);
      
      res.json({ pr, items, approvals });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchase requisition", error });
    }
  });

  app.post("/api/pr", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPRSchema.parse(req.body);
      const pr = await storage.createPR(validatedData);
      res.status(201).json(pr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create purchase requisition", error });
    }
  });

  app.patch("/api/pr/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertPRSchema.partial().parse(req.body);
      const pr = await storage.updatePR(id, validatedData);
      
      if (!pr) {
        return res.status(404).json({ message: "Purchase requisition not found" });
      }
      
      res.json(pr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update purchase requisition", error });
    }
  });

  app.post("/api/pr/:id/items", async (req: Request, res: Response) => {
    try {
      const prId = parseInt(req.params.id);
      if (isNaN(prId)) {
        return res.status(400).json({ message: "Invalid PR ID format" });
      }
      
      const pr = await storage.getPR(prId);
      if (!pr) {
        return res.status(404).json({ message: "Purchase requisition not found" });
      }
      
      const validatedData = insertPRItemSchema.parse({ ...req.body, prId });
      const item = await storage.createPRItem(validatedData);
      
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create PR item", error });
    }
  });

  app.get("/api/pr/:id/items", async (req: Request, res: Response) => {
    try {
      const prId = parseInt(req.params.id);
      if (isNaN(prId)) {
        return res.status(400).json({ message: "Invalid PR ID format" });
      }
      
      const items = await storage.getPRItems(prId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch PR items", error });
    }
  });

  // Purchase Order routes
  app.get("/api/po", async (_req: Request, res: Response) => {
    try {
      const pos = await storage.getAllPOs();
      res.json(pos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchase orders", error });
    }
  });

  app.get("/api/po/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const po = await storage.getPO(id);
      if (!po) {
        return res.status(404).json({ message: "Purchase order not found" });
      }
      
      const items = await storage.getPOItems(id);
      const approvals = await storage.getApprovals("po", id);
      
      // Get PR information
      const pr = await storage.getPR(po.prId);
      
      res.json({ po, items, approvals, pr });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchase order", error });
    }
  });

  app.post("/api/po", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPOSchema.parse(req.body);
      const po = await storage.createPO(validatedData);
      res.status(201).json(po);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create purchase order", error });
    }
  });

  app.patch("/api/po/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertPOSchema.partial().parse(req.body);
      const po = await storage.updatePO(id, validatedData);
      
      if (!po) {
        return res.status(404).json({ message: "Purchase order not found" });
      }
      
      res.json(po);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update purchase order", error });
    }
  });

  app.post("/api/po/:id/items", async (req: Request, res: Response) => {
    try {
      const poId = parseInt(req.params.id);
      if (isNaN(poId)) {
        return res.status(400).json({ message: "Invalid PO ID format" });
      }
      
      const po = await storage.getPO(poId);
      if (!po) {
        return res.status(404).json({ message: "Purchase order not found" });
      }
      
      const validatedData = insertPOItemSchema.parse({ ...req.body, poId });
      const item = await storage.createPOItem(validatedData);
      
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create PO item", error });
    }
  });

  app.get("/api/po/:id/items", async (req: Request, res: Response) => {
    try {
      const poId = parseInt(req.params.id);
      if (isNaN(poId)) {
        return res.status(400).json({ message: "Invalid PO ID format" });
      }
      
      const items = await storage.getPOItems(poId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch PO items", error });
    }
  });

  // Good Receipt routes
  app.get("/api/gr", async (_req: Request, res: Response) => {
    try {
      const grs = await storage.getAllGRs();
      
      // Fetch additional data for each GR
      const enrichedGrs = await Promise.all(
        grs.map(async (gr) => {
          const po = await storage.getPO(gr.poId);
          return {
            ...gr,
            poNumber: po?.poNumber || "Unknown"
          };
        })
      );
      
      res.json(enrichedGrs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch good receipts", error });
    }
  });

  app.get("/api/gr/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const gr = await storage.getGR(id);
      if (!gr) {
        return res.status(404).json({ message: "Good receipt not found" });
      }
      
      const approvals = await storage.getApprovals("gr", id);
      
      // Get PO and PR information
      const po = await storage.getPO(gr.poId);
      const pr = po ? await storage.getPR(po.prId) : null;
      const poItems = po ? await storage.getPOItems(po.id) : [];
      
      res.json({ gr, approvals, po, pr, poItems });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch good receipt", error });
    }
  });

  app.post("/api/gr", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGRSchema.parse(req.body);
      const gr = await storage.createGR(validatedData);
      res.status(201).json(gr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create good receipt", error });
    }
  });

  app.patch("/api/gr/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertGRSchema.partial().parse(req.body);
      const gr = await storage.updateGR(id, validatedData);
      
      if (!gr) {
        return res.status(404).json({ message: "Good receipt not found" });
      }
      
      res.json(gr);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update good receipt", error });
    }
  });

  // Approval routes
  app.post("/api/approvals", async (req: Request, res: Response) => {
    try {
      const validatedData = insertApprovalSchema.parse(req.body);
      const approval = await storage.createApproval(validatedData);
      res.status(201).json(approval);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create approval", error });
    }
  });

  app.patch("/api/approvals/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const { status, comments } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const approval = await storage.updateApproval(id, status, comments);
      
      if (!approval) {
        return res.status(404).json({ message: "Approval not found" });
      }
      
      res.json(approval);
    } catch (error) {
      res.status(500).json({ message: "Failed to update approval", error });
    }
  });

  app.get("/api/approvals/:documentType/:documentId", async (req: Request, res: Response) => {
    try {
      const { documentType, documentId } = req.params;
      const id = parseInt(documentId);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid document ID format" });
      }
      
      const approvals = await storage.getApprovals(documentType, id);
      res.json(approvals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch approvals", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
