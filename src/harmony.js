/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import { EmailException } from "./email-exception";
import EmailLinkNativeModule from './NativeEmailLink';


let emailLinkModules = EmailLinkNativeModule;


export async function getEmailClients() {
 return emailLinkModules.getEmailClients();
}


export async function openInbox(options = {}) {
  return emailLinkModules.openInbox(options);
}


export async function openComposer(options = {}) {
  return emailLinkModules.openComposer(options);
}
