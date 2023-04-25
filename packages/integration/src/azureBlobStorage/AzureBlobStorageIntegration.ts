/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ScmIntegration, ScmIntegrationsFactory } from '../types';
import { basicIntegrations, defaultScmResolveUrl } from '../helpers';
import {
  AzureBlobStorageIntegrationConfig,
  readAzureBlobStorageIntegrationConfigs,
} from './config';

/**
 * Integrates with Azure BlobStorage
 *
 * @public
 */
export class AzureBlobStorageIntegration implements ScmIntegration {
  static factory: ScmIntegrationsFactory<AzureBlobStorageIntegration> = ({
    config,
  }) => {
    const configs = readAzureBlobStorageIntegrationConfigs(
      config.getOptionalConfigArray('integrations.azureBlobStorage') ?? [],
    );
    return basicIntegrations(
      configs.map(c => new AzureBlobStorageIntegration(c)),
      i => i.config.accountName,
    );
  };

  get type(): string {
    return 'azureBlobStorage';
  }

  get title(): string {
    return this.integrationConfig.accountName;
  }

  get config(): AzureBlobStorageIntegrationConfig {
    return this.integrationConfig;
  }

  constructor(
    private readonly integrationConfig: AzureBlobStorageIntegrationConfig,
  ) {}

  resolveUrl(options: {
    url: string;
    base: string;
    lineNumber?: number;
  }): string {
    return defaultScmResolveUrl(options);
  }

  resolveEditUrl(url: string): string {
    // TODO: Implement edit URL for azure BlobStorage
    return url;
  }
}
