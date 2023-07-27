import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookResolver } from './resolvers/book.resolver';
import { join, resolve } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        // transformations

        return {
          playground: true,
          typePaths: [resolve(__dirname, './schemas/*.gql')],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
          },
        };
      },
    }),
  ],
  providers: [AppService, BookResolver],
})
export class AppModule {}
