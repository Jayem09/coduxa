declare const paymentService: {
  createInvoice(args: { userId: string; amount: number; credits: number; packTitle: string }): Promise<any>;
  getPackages(): Promise<any>;
  getUserCredits(userId: string): Promise<any>;
};
export default paymentService;


