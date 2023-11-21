import { HttpException, HttpStatus } from '@nestjs/common';

export function ManualHttpException(message: string, code = 1) {
  throw new HttpException({ message, code }, HttpStatus.OK);
}
