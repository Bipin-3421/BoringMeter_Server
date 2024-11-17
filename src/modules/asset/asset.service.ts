import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'config/configuration';
import { TransactionalConnection } from '../connecion/connection.service';
import { AssetProvider } from 'common/enum/provider.enum';
import { RequestContext } from 'common/request.context';
import { Asset } from 'common/entities/asset.entity';
import { UploadProvider } from './provider/uploadProvider.interface';
import { LocalStorageProvider } from './provider/local.provider';
import { AssetFor } from 'common/enum/asset.enum';

@Injectable()
export class AssetService {
  constructor(
    private readonly configService: ConfigService<AppConfig, true>,
    private readonly connection: TransactionalConnection,
  ) {}
  getProvider(provider?: string): UploadProvider {
    const assetProvider =
      provider ||
      this.configService.get('assetProvider.name', {
        infer: true,
      });
    if (assetProvider === AssetProvider.LOCAL) {
      return new LocalStorageProvider(this.configService);
    } else {
      throw new Error('No provider found');
    }
  }

  async upload(
    ctx: RequestContext,
    buffer: Buffer,
    assetFor: AssetFor,
  ): Promise<Asset> {
    const assetRepo = this.connection.getRepository(ctx, Asset);
    const provider = this.getProvider();

    const uniqueFileName = `${assetFor.toString().toLowerCase()}_${Date.now()}`;

    const { identifier, url } = await provider.upload(buffer, uniqueFileName);
    console.log(`identifier:${identifier}`);
    console.log(`url:${url}`);

    const asset = new Asset({
      name: uniqueFileName,
      identifier,
      provider: provider.type,
      size: buffer.length,
      url: url,
      for: assetFor,
    });

    // Save the simple asset instance
    try {
      await assetRepo.save(asset);
      console.log('Simple asset saved:', asset);
    } catch (error) {
      console.error('Error during simple save:', error);
      throw error;
    }

    return asset;
  }
  async delete(ctx: RequestContext, id: string): Promise<boolean> {
    const assetRepo = this.connection.getRepository(ctx, Asset);

    const asset = await assetRepo.findOne({
      where: { id: id },
    });

    if (!asset) {
      return false;
    }

    const provider = this.getProvider(asset.provider);
    await provider.delete(asset.identifier);

    await assetRepo.delete({ id: id });

    return true;
  }
}
