import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  createOrder(@Req() req: any) {
    return this.paymentsService.createOrder(req.user.id);
  }

  @Post('verify')
  verifyPayment(
    @Req() req: any, 
    @Body('razorpay_order_id') razorpay_order_id: string,
    @Body('razorpay_payment_id') razorpay_payment_id: string,
    @Body('razorpay_signature') razorpay_signature: string
  ) {
    return this.paymentsService.verifyPayment(req.user.id, razorpay_order_id, razorpay_payment_id, razorpay_signature);
  }
}
