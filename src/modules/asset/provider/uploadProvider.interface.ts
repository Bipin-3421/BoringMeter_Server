import { AssetProvider } from 'common/enum/provider.enum';

export interface UploadProvider {
  readonly type: AssetProvider;
  upload(
    buffer: Buffer,
    filename: string,
  ):
    | Promise<{ identifier: string; url: string }>
    | { identifier: string; url: string };
  delete(identifier: string): Promise<boolean> | boolean;
}
