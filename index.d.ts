/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

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

export function getEmailClients(): Promise<
  {
    androidPackageName: string;
    title: string;
    prefix: string;
    iOSAppName: string;
    id: string;
  }[]
>;

export function openInbox({
  app,
  title,
  message,
  cancelLabel,
  removeText,
  defaultEmailLabel,
}?: InboxOptions): Promise<{ app: string; title: string } | null>;

export function openComposer({
  app,
  title,
  message,
  cancelLabel,
  removeText,
  to,
  cc,
  bcc,
  subject,
  body,
  defaultEmailLabel,
  encodeBody,
}?: ComposeOptions): Promise<{ app: string; title: string } | null>;

export class EmailException {
  message: string;
  name: string;
}
