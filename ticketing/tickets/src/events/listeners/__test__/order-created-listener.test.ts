import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { OrderCreatedEvent, OrderStatus } from "@tickets-xinyu/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";


const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'efwe'
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    // id: new mongoose.Types.ObjectId().toHexString(),
    id: "5f088bfb48b53d2900b3f04a",
    version: 0,
    status: OrderStatus.Created,
    userId: 'efffff',
    expiresAt: 'esff',
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, ticket, data, msg };
};

it('sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  
  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket update event', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});