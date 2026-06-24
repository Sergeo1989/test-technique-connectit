import { Global, Module } from "@nestjs/common";
import { CacheModule as NestJSCacheModule } from "@nestjs/cache-manager";

@Module({
	imports: [NestJSCacheModule.register({ isGlobal: true })],
	exports: [CacheModule],
})
@Global()
export class CacheModule {}
