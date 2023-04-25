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

import { Config } from '@backstage/config';

/**
 * The configuration parameters for a single Azure BlobStorage provider.
 *
 * @public
 */
export type AzureBlobStorageIntegrationConfig = {
  /**
   * accountName, typically BlobStorage url https://{accountName}/.blob.core.windows.net
   */
  accountName: string;

  /**
   * SAS-Token, with leading '?'
   */
  secretAccessKey?: string;

  /**
   * (Optional) External ID to use when multiple integrations
   */
  externalId?: string;
};

/**
 * Reads a single Azure BlobStorage integration config.
 *
 * @param config - The config object of a single integration
 * @public
 */
export function readAzureBlobStorageIntegrationConfig(
  config: Config,
): AzureBlobStorageIntegrationConfig {
  const accountName = config.getOptionalString('accountName');
  const endpoint = `https://${accountName}.blob.core.windows.net`;
  if (accountName) {
    try {
      const url = new URL(endpoint);
    } catch {
      throw new Error(
        `Invalid azure storage integration config, host '${endpoint}' is not a valid URL`,
      );
    }
  } else {
    throw new Error(
      'Invalid azure storage integration config, no accountName provided',
    );
  }

  const secretAccessKey = config.has('secretAccessKey')
    ? config.getOptionalString('secretAccessKey')
    : '';
  const externalId = config.has('externalId')
    ? config.getOptionalString('externalId')
    : '';
  return {
    accountName,
    secretAccessKey,
    externalId,
  };
}

/**
 * Reads a set of Azure storage integration configs
 *
 * @param config - The config objects of the integrations
 * @public
 */
export function readAzureBlobStorageIntegrationConfigs(
  config: Config[],
): AzureBlobStorageIntegrationConfig[] {
  return config.map(readAzureBlobStorageIntegrationConfig);
}
