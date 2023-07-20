import {Controller, Get, HttpException, HttpStatus, Query, UseInterceptors} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import { ControllerResponse } from '../shared/api-response';
import {Pagination} from "../shared/pagination";
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {
    }

    @UseInterceptors(CacheInterceptor)
    @Get()
    async findAll(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10):Promise<ControllerResponse <any>> {
        try {
            const result = await this.roomsService.getRooms(new Pagination(page,pageSize));
            return {result, message: 'All rooms found'}
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

}
