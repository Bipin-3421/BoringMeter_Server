import { Injectable, Logger } from '@nestjs/common';
import { UploadProvider } from './uploadProvider.interface';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'config/configuration';
import * as path from 'path';
import * as fs from 'fs';
import { AssetProvider } from 'common/enum/provider.enum';

@Injectable()
export class LocalStorageProvider implements UploadProvider {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  type = AssetProvider.LOCAL;

  upload(
    buffer: Buffer,
    uniqueFileName: string,
  ): { identifier: string; url: string } {
    const pathToSave = this.configService.get('assetProvider.local.rootpath', {
      infer: true,
    });

    if (!fs.existsSync(pathToSave)) {
      fs.mkdirSync(pathToSave, { recursive: true });
    }

    if (uniqueFileName.includes('.pdf')) {
      uniqueFileName = uniqueFileName.concat('.pdf');
    } else {
      uniqueFileName = uniqueFileName.concat('.png');
    }

    const absoluteFilePath = path.join(pathToSave, uniqueFileName);
    fs.writeFileSync(absoluteFilePath, buffer);

    return { identifier: uniqueFileName, url: absoluteFilePath };
  }

  delete(identifier: string): boolean {
    try {
      const assetProviderConfig = this.configService.get('assetProvider', {
        infer: true,
      });

      if (!assetProviderConfig.local) {
        throw new Error('Local storage not configured');
      }

      const folderPath = assetProviderConfig.local.rootpath;
      const filepath = path.join(folderPath, identifier);

      fs.unlinkSync(filepath);

      return true;
    } catch (err) {
      console.error(err);
      Logger.error('Error deleting file');
      return false;
    }
  }
}
// File Path Handling:

// console.error only gives error messages
// folderPath is the base directory from configuration.
