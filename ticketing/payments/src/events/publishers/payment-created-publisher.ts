import { Subjects, Publisher, PaymentCreatedEvent } from "@tickets-xinyu/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}