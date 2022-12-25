import { Publisher, Subjects, TicketCreatedEvent } from "@tickets-xinyu/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
