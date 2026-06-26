import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(private prisma: PrismaService) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(userId: string) {
    const amount = 2000; // 20 INR in paise

    const options = {
      amount,
      currency: "INR",
      receipt: `rcpt_${userId.slice(-6)}_${Date.now()}`,
    };

    try {
      const order = await this.razorpay.orders.create(options);
      
      await this.prisma.paymentRequest.create({
        data: {
          userId,
          orderId: order.id,
          amount: 20,
          status: 'PENDING'
        }
      });

      return { orderId: order.id, amount: order.amount, currency: order.currency };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Could not create Razorpay order');
    }
  }

  async verifyPayment(userId: string, razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Signature is valid! Find order.
      const pr = await this.prisma.paymentRequest.findUnique({ where: { orderId: razorpay_order_id }});
      if (!pr) throw new BadRequestException('Order not found');

      await this.prisma.paymentRequest.update({
        where: { id: pr.id },
        data: { status: 'APPROVED', transactionId: razorpay_payment_id }
      });

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { points: { increment: 20 } }
      });

      return { success: true, points: user.points };
    } else {
      throw new BadRequestException('Invalid signature');
    }
  }
}
