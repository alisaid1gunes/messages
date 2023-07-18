import {UserDTO} from "./user.dto";

export class MessageDTO {
    content: string;
    createdAt: string;
    sender: UserDTO;
    receiver: UserDTO;
}

