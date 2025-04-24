import {
  users, User, InsertUser,
  purchaseRequisitions, PurchaseRequisition, InsertPR,
  prItems, PRItem, InsertPRItem,
  purchaseOrders, PurchaseOrder, InsertPO,
  poItems, POItem, InsertPOItem,
  goodReceipts, GoodReceipt, InsertGR,
  approvals, Approval, InsertApproval
} from "@shared/schema";

export interface IStorage {
  // User Operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Purchase Requisition Operations
  getAllPRs(): Promise<PurchaseRequisition[]>;
  getPR(id: number): Promise<PurchaseRequisition | undefined>;
  getPRByNumber(prNumber: string): Promise<PurchaseRequisition | undefined>;
  createPR(pr: InsertPR): Promise<PurchaseRequisition>;
  updatePR(id: number, pr: Partial<InsertPR>): Promise<PurchaseRequisition | undefined>;
  
  // PR Items Operations
  getPRItems(prId: number): Promise<PRItem[]>;
  createPRItem(item: InsertPRItem): Promise<PRItem>;
  
  // Purchase Order Operations
  getAllPOs(): Promise<PurchaseOrder[]>;
  getPO(id: number): Promise<PurchaseOrder | undefined>;
  getPOByNumber(poNumber: string): Promise<PurchaseOrder | undefined>;
  createPO(po: InsertPO): Promise<PurchaseOrder>;
  updatePO(id: number, po: Partial<InsertPO>): Promise<PurchaseOrder | undefined>;
  
  // PO Items Operations
  getPOItems(poId: number): Promise<POItem[]>;
  createPOItem(item: InsertPOItem): Promise<POItem>;
  
  // Good Receipt Operations
  getAllGRs(): Promise<GoodReceipt[]>;
  getGR(id: number): Promise<GoodReceipt | undefined>;
  getGRByNumber(grNumber: string): Promise<GoodReceipt | undefined>;
  createGR(gr: InsertGR): Promise<GoodReceipt>;
  updateGR(id: number, gr: Partial<InsertGR>): Promise<GoodReceipt | undefined>;
  
  // Approval Operations
  getApprovals(documentType: string, documentId: number): Promise<Approval[]>;
  createApproval(approval: InsertApproval): Promise<Approval>;
  updateApproval(id: number, status: string, comments?: string): Promise<Approval | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private purchaseRequisitions: Map<number, PurchaseRequisition>;
  private prItems: Map<number, PRItem>;
  private purchaseOrders: Map<number, PurchaseOrder>;
  private poItems: Map<number, POItem>;
  private goodReceipts: Map<number, GoodReceipt>;
  private approvals: Map<number, Approval>;
  
  private userId: number;
  private prId: number;
  private prItemId: number;
  private poId: number;
  private poItemId: number;
  private grId: number;
  private approvalId: number;
  
  constructor() {
    this.users = new Map();
    this.purchaseRequisitions = new Map();
    this.prItems = new Map();
    this.purchaseOrders = new Map();
    this.poItems = new Map();
    this.goodReceipts = new Map();
    this.approvals = new Map();
    
    this.userId = 1;
    this.prId = 1;
    this.prItemId = 1;
    this.poId = 1;
    this.poItemId = 1;
    this.grId = 1;
    this.approvalId = 1;
    
    // Seed initial admin user
    this.createUser({
      username: 'admin',
      password: 'admin123',
      name: 'Administrator',
      role: 'admin',
      department: 'IT',
      email: 'admin@example.com',
      phone: '123456789'
    });

    // Sample PR data
    this.seedSampleData();
  }
  
  private seedSampleData() {
    // Create sample PR
    const pr1 = this.createPR({
      prNumber: 'PRG01142',
      date: new Date('2024-04-21'),
      subject: 'Pengadaan Pos Security Pos KM 35 (Hauling Road PT GBU (Pos 1))',
      department: 'EXTERNAL AFFAIR & SECURITY',
      requester: 'Halida Anggitasari',
      status: 'open',
      needsPr: true,
      typePr: 'Project',
      remarks: 'Untuk menunjang operational penggasan dan komunikasi jalan dibutuhkan penggantian radio repeater di pos Security pos 1',
      supportDoc: true,
      createdBy: 1
    });

    // Create PR items
    this.createPRItem({
      prId: pr1.id,
      description: 'Mobilisasi & Demobilisasi',
      type: 'Project',
      itemId: 'QP2AASFFP',
      quantity: 1,
      uom: 'LUMPSUM',
      price: 2500000,
      prbkb: 0,
      total: 2500000
    });

    this.createPRItem({
      prId: pr1.id,
      description: 'Pekerjaan Persiapan',
      type: 'Project',
      itemId: 'QP2AASFFP',
      quantity: 1,
      uom: 'LUMPSUM',
      price: 15450000,
      prbkb: 0,
      total: 15450000
    });

    this.createPRItem({
      prId: pr1.id,
      description: 'Pekerjaan Struktural',
      type: 'Project',
      itemId: 'QP2AASFFP',
      quantity: 1,
      uom: 'LUMPSUM',
      price: 23400000,
      prbkb: 0,
      total: 23400000
    });

    this.createPRItem({
      prId: pr1.id,
      description: 'Pekerjaan Elektrikal',
      type: 'Project',
      itemId: 'QP2AASFFP',
      quantity: 1,
      uom: 'LUMPSUM',
      price: 3146000,
      prbkb: 0,
      total: 3146000
    });

    // Create PO
    const po1 = this.createPO({
      poNumber: '1298000157',
      date: new Date('2024-02-24'),
      prId: pr1.id,
      vendor: 'CV. Jaya Computer',
      subject: 'Perjalanan Dinas PT January 2024',
      attention: 'Bambang Nugroho',
      company: 'PT GUNUNG BARA UTAMA',
      address: 'Jl. Merdeka Barat 29, Tower Graha, Darat Talukng Jawa Timur',
      phone: '(0877)52935456',
      email: 'sales.jayacomp@gmail.com',
      deliveryPoint: 'Kantor Tangsi Samarinda Kota, Jalan Berarti',
      status: 'approved',
      terms: '1. Delivery: 14 days from PO issuance\n2. Payment Terms: 14 days after delivery\n3. Warranty: 12 months for all electronic items',
      createdBy: 1
    });

    // Create PO items
    this.createPOItem({
      poId: po1.id,
      description: 'Kabel UTP CAT-6 extension cable 20 meter',
      brand: 'BELDEN',
      idNumber: 'CRNZ1353',
      quantity: 1,
      uom: 'Pcs',
      unitPrice: 325000,
      ppn: 35750,
      total: 360750
    });

    this.createPOItem({
      poId: po1.id,
      description: 'USB HandsFree Portable',
      brand: 'BELDEN',
      idNumber: 'CRNZ1263',
      quantity: 2,
      uom: 'Pcs',
      unitPrice: 145000,
      ppn: 31900,
      total: 321900
    });

    this.createPOItem({
      poId: po1.id,
      description: 'Logitech mouse G502X 25.1K Hero dual-micro switch gaming',
      brand: 'LOGITECH',
      idNumber: 'CRNZ1553',
      quantity: 1,
      uom: 'Unit',
      unitPrice: 1950000,
      ppn: 214500,
      total: 2164500
    });

    // Create GRs
    for (let i = 0; i < 7; i++) {
      const date = i < 3 ? new Date('2024-12-23') : new Date('2024-12-19');
      const grNumber = `GR00${563 - i}`;
      const poNumber = String(2300001668 - i);
      
      let description = '';
      if (i === 0) description = 'Perpanjangan Kontrak Excavator 01 GAP';
      else if (i === 1) description = 'Perpanjangan Kontrak Grader GAP 001';
      else if (i === 2) description = 'Transportasi Karyawan via Darat Melak-Tenggarong-Samarinda-Balikpapan';
      else if (i === 3) description = 'Extend Rental Pompa KSB';
      else if (i === 4) description = 'Analisa Laboratorium Sampel Batubara Eksplorasi 2024 - WO C016';
      else if (i === 5) description = 'Tools Electrical Engineer & Civil Engineer - 2024';
      else description = 'Kabel USB Radio';

      this.createGR({
        grNumber,
        date,
        poId: po1.id,
        description,
        nextApproval: 'done',
        status: 'completed',
        createdBy: 1
      });
    }
  }

  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser = { ...user, id, createdAt: new Date() };
    this.users.set(id, newUser);
    return newUser;
  }

  // Purchase Requisition Operations
  async getAllPRs(): Promise<PurchaseRequisition[]> {
    return Array.from(this.purchaseRequisitions.values());
  }

  async getPR(id: number): Promise<PurchaseRequisition | undefined> {
    return this.purchaseRequisitions.get(id);
  }

  async getPRByNumber(prNumber: string): Promise<PurchaseRequisition | undefined> {
    return Array.from(this.purchaseRequisitions.values()).find(
      (pr) => pr.prNumber === prNumber,
    );
  }

  async createPR(pr: InsertPR): Promise<PurchaseRequisition> {
    const id = this.prId++;
    const newPR = { 
      ...pr, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.purchaseRequisitions.set(id, newPR);
    return newPR;
  }

  async updatePR(id: number, pr: Partial<InsertPR>): Promise<PurchaseRequisition | undefined> {
    const existingPR = this.purchaseRequisitions.get(id);
    if (!existingPR) return undefined;
    
    const updatedPR = { ...existingPR, ...pr, updatedAt: new Date() };
    this.purchaseRequisitions.set(id, updatedPR);
    return updatedPR;
  }

  // PR Items Operations
  async getPRItems(prId: number): Promise<PRItem[]> {
    return Array.from(this.prItems.values()).filter(
      (item) => item.prId === prId,
    );
  }

  async createPRItem(item: InsertPRItem): Promise<PRItem> {
    const id = this.prItemId++;
    const newItem = { ...item, id, createdAt: new Date() };
    this.prItems.set(id, newItem);
    return newItem;
  }

  // Purchase Order Operations
  async getAllPOs(): Promise<PurchaseOrder[]> {
    return Array.from(this.purchaseOrders.values());
  }

  async getPO(id: number): Promise<PurchaseOrder | undefined> {
    return this.purchaseOrders.get(id);
  }

  async getPOByNumber(poNumber: string): Promise<PurchaseOrder | undefined> {
    return Array.from(this.purchaseOrders.values()).find(
      (po) => po.poNumber === poNumber,
    );
  }

  async createPO(po: InsertPO): Promise<PurchaseOrder> {
    const id = this.poId++;
    const newPO = { 
      ...po, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.purchaseOrders.set(id, newPO);
    return newPO;
  }

  async updatePO(id: number, po: Partial<InsertPO>): Promise<PurchaseOrder | undefined> {
    const existingPO = this.purchaseOrders.get(id);
    if (!existingPO) return undefined;
    
    const updatedPO = { ...existingPO, ...po, updatedAt: new Date() };
    this.purchaseOrders.set(id, updatedPO);
    return updatedPO;
  }

  // PO Items Operations
  async getPOItems(poId: number): Promise<POItem[]> {
    return Array.from(this.poItems.values()).filter(
      (item) => item.poId === poId,
    );
  }

  async createPOItem(item: InsertPOItem): Promise<POItem> {
    const id = this.poItemId++;
    const newItem = { ...item, id, createdAt: new Date() };
    this.poItems.set(id, newItem);
    return newItem;
  }

  // Good Receipt Operations
  async getAllGRs(): Promise<GoodReceipt[]> {
    return Array.from(this.goodReceipts.values());
  }

  async getGR(id: number): Promise<GoodReceipt | undefined> {
    return this.goodReceipts.get(id);
  }

  async getGRByNumber(grNumber: string): Promise<GoodReceipt | undefined> {
    return Array.from(this.goodReceipts.values()).find(
      (gr) => gr.grNumber === grNumber,
    );
  }

  async createGR(gr: InsertGR): Promise<GoodReceipt> {
    const id = this.grId++;
    const newGR = { 
      ...gr, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.goodReceipts.set(id, newGR);
    return newGR;
  }

  async updateGR(id: number, gr: Partial<InsertGR>): Promise<GoodReceipt | undefined> {
    const existingGR = this.goodReceipts.get(id);
    if (!existingGR) return undefined;
    
    const updatedGR = { ...existingGR, ...gr, updatedAt: new Date() };
    this.goodReceipts.set(id, updatedGR);
    return updatedGR;
  }

  // Approval Operations
  async getApprovals(documentType: string, documentId: number): Promise<Approval[]> {
    return Array.from(this.approvals.values()).filter(
      (approval) => approval.documentType === documentType && approval.documentId === documentId,
    );
  }

  async createApproval(approval: InsertApproval): Promise<Approval> {
    const id = this.approvalId++;
    const newApproval = { ...approval, id, createdAt: new Date() };
    this.approvals.set(id, newApproval);
    return newApproval;
  }

  async updateApproval(id: number, status: string, comments?: string): Promise<Approval | undefined> {
    const existingApproval = this.approvals.get(id);
    if (!existingApproval) return undefined;
    
    const updatedApproval = { 
      ...existingApproval, 
      status, 
      comments: comments || existingApproval.comments,
      approvedAt: status === 'approved' ? new Date() : existingApproval.approvedAt 
    };
    this.approvals.set(id, updatedApproval);
    return updatedApproval;
  }
}

export const storage = new MemStorage();
