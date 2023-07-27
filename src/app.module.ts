import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookResolver } from './resolvers/book.resolver';
import path from 'node:path';
// import path from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          playground: true,
          typePaths: [path.resolve(__dirname, './schemas/*.gql')],
        };
      },
    }),
  ],
  providers: [AppService, BookResolver],
})
export class AppModule {}
