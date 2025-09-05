const API_BASE_URL: string = (import.meta as any).env?.VITE_SERVER_URL || "http://localhost:4000";

type CreateInvoiceArgs = {
  userId: string;
  amount: number;
  credits: number;
  packTitle: string;
};

class PaymentService {
  async getPackages(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/packages`);
    return await res.json();
  }

  async createInvoice({ userId, amount, credits, packTitle }: CreateInvoiceArgs): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/create-invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, credits, packTitle }),
    });
    return await res.json();
  }

  async getUserCredits(userId: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/credits/${userId}`);
    return await res.json();
  }
}

export default new PaymentService();


