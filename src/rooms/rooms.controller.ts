import {Controller, Get} from '@nestjs/common';
import {RoomService} from './rooms.service';


@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomService) {
    }

    @Get()
    findAll() {
        return this.roomService.getRooms();
    }

}
