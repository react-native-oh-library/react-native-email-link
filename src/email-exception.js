/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

export class EmailException extends Error {
  constructor(...params) {
    super(...params);
    this.name = "EmailException";
  }
}
