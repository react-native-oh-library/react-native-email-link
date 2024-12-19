/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface InboxOptions {
    app?: string | null;
    title?: string;
    message?: string;
    cancelLabel?: string;
    removeText?: boolean;
    defaultEmailLabel?: string;
  }
  
  export interface ComposeOptions extends InboxOptions {
    to?: string;
    cc?: string;
    bcc?: string;
    subject?: string;
    body?: string;
    encodeBody?: boolean;
  }
  
  export class EmailException {
    message: string;
    name: string;
  }

export interface Spec extends TurboModule {
    getEmailClients(): Promise<{
        androidPackageName: string;
        title: string;
        prefix: string;
        iOSAppName: string;
        id: string;
      }[]>;

      openInbox(inboxOptions?: InboxOptions): Promise<{ app: string; title: string } | null>;

      openComposer(composeOptions? : ComposeOptions): Promise<{ app: string; title: string } | null>;
} 
 
export default TurboModuleRegistry.get<Spec>('EmailLinkNativeModule') as Spec | null;