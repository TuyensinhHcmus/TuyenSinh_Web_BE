import { Request } from 'express';
import {User} from '../users/users.model';
 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;