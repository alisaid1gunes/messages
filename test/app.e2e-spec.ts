import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RoomsService } from './../src/rooms/rooms.service';
import {RoomDTO} from "../src/rooms/dto/room.dto";


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let roomsService: RoomsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    roomsService = moduleFixture.get<RoomsService>(RoomsService);
    await app.init();
  });

  it('/rooms (GET)', async () => {
    // Mock the getRooms method of the RoomsService
    const mockResult = Promise.resolve({
      rooms: [
        {
          id: 1,
          lastMessage: {
            content: 'Message 1',
            createdAt: new Date().toISOString(), // Convert Date to string
            receiver: { fullName: 'Receiver 1', photo: 'receiver-photo-url', id: 1 },
            sender: { fullName: 'Sender 1', photo: 'sender-photo-url', id: 2 },
          },
        },
        {
          id: 2,
          lastMessage: {
            content: 'Message 2',
            createdAt: new Date().toISOString(), // Convert Date to string
            receiver: { fullName: 'Receiver 2', photo: 'receiver-photo-url', id: 3 },
            sender: { fullName: 'Sender 2', photo: 'sender-photo-url', id: 4 },
          },
        },
      ],
      total: 10
    });

    jest.spyOn(roomsService, 'getRooms').mockReturnValue(mockResult);

    const response = await request(app.getHttpServer()).get('/rooms');

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual({
      result: await mockResult,
      message: 'All rooms found',
    });
  });
});
