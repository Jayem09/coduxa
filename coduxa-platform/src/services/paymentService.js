const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

class PaymentService {
  async getPackages() {
    const res = await fetch(`${API_BASE_URL}/payments/packages`);
    return await res.json();
  }

  async createInvoice({ userId, amount, credits, packTitle }) {
    const res = await fetch(`${API_BASE_URL}/payments/create-invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, credits, packTitle }),
    });
    return await res.json();
  }

  async getUserCredits(userId) {
    const res = await fetch(`${API_BASE_URL}/payments/credits/${userId}`);
    return await res.json();
  }
}

export default new PaymentService();
