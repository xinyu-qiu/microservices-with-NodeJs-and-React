import { Publisher, OrderCreatedEvent, Subjects } from "@tickets-xinyu/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}