import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ExecutionResult } from 'graphql';
import { MercuriusContext } from 'mercurius';
import { GraphqlErrorCodes } from '../constants';

type ErrorFormatterResult = {
  statusCode: number;
  response: ExecutionResult;
};

export const graphqlErrorFormatter = (execution: ExecutionResult, context: MercuriusContext): ErrorFormatterResult => {
  // let isUnauthorized = false;
  // let isNotFound = false;
  // let isInternal = false;

  // execution.errors.forEach(({ originalError }) => {
  //   if (originalError instanceof UnauthorizedException) {
  //     isUnauthorized = true;
  //     return;
  //   }

  //   if (originalError instanceof NotFoundException) {
  //     isNotFound = true;
  //     return;
  //   }

  //   if (originalError instanceof InternalServerErrorException) {
  //     isInternal = true;
  //   }
  // });

  // if (isUnauthorized) {
  //   return getResponse(GraphqlErrorCodes.UNAUTHENTICATED, execution);
  // }

  // if (isNotFound) {
  //   return getResponse(GraphqlErrorCodes.NOT_FOUND, execution);
  // }

  // if (isInternal) {
  //   return getResponse(GraphqlErrorCodes.INTERNAL_ERROR, execution);
  // }

  return {
    statusCode: 200,
    response: execution,
  };
};

const getResponse = (code: GraphqlErrorCodes, execution: ExecutionResult): ErrorFormatterResult => {
  return {
    statusCode: 200,
    response: {
      ...execution,
      extensions: {
        code,
      },
    },
  };
};
