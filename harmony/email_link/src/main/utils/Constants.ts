/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

export class Constants {
  static readonly LINK_FEATURE: string = 'ComposeMail';
  static readonly BUNDLE_NAME: string = 'com.huawei.hmos.email';
  static readonly ABILITY_NAME: string = 'EntryAbility';
  static readonly FLAGS: number = 0;
  static readonly SCENE_TYPE: number = 1;
  static readonly URI_PERMISSION_FLAG: number = 1;
  static readonly URI_AND: string = '&';
  static readonly URI_LINK: string = '?';
  static readonly EMPTY: string = '';
  static readonly MAILTO: string = 'mailto:';
  static readonly CC: string = 'cc=';
  static readonly BCC: string = 'bcc=';
  static readonly SUBJECT: string = 'subject=';
  static readonly BODY: string = 'body=';
  static readonly ACTION: string = 'ohos.want.action.viewData';
  static readonly ABILITY_TYPE: string = 'mail';
  static readonly SPACE_REGULARITY: RegExp = /\s/g;
  static readonly SPACE_VALUE: string = '%20';
}

const prefixes = {
  mail: 'com.huawei.hmos.email'
}

const titles = {
  'mail': "com.huawei.hmos.email"
};

export { prefixes, titles };
