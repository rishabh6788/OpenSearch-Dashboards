/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScopedHistory } from '../../../../../core/public';
import { coreMock, scopedHistoryMock } from '../../../../../core/public/mocks';
import { dataPluginMock } from '../../../../data/public/mocks';
import { embeddablePluginMock } from '../../../../embeddable/public/mocks';
import { expressionsPluginMock } from '../../../../expressions/public/mocks';
import { navigationPluginMock } from '../../../../navigation/public/mocks';
import { VisBuilderServices } from '../../types';

export const createVisBuilderServicesMock = () => {
  const coreStartMock = coreMock.createStart();
  const toastNotifications = coreStartMock.notifications.toasts;
  const applicationMock = coreStartMock.application;
  const i18nContextMock = coreStartMock.i18n.Context;
  const indexPatternMock = dataPluginMock.createStartContract().indexPatterns;
  const embeddableMock = embeddablePluginMock.createStartContract();
  const navigationMock = navigationPluginMock.createStartContract();
  const expressionMock = expressionsPluginMock.createStartContract();

  const visBuilderServicesMock = {
    ...coreStartMock,
    navigation: navigationMock,
    expression: expressionMock,
    savedVisBuilderLoader: {
      get: jest.fn(),
    } as any,
    setHeaderActionMenu: () => {},
    applicationMock,
    history: {
      push: jest.fn(),
      location: { pathname: '' },
    },
    toastNotifications,
    i18n: i18nContextMock,
    data: indexPatternMock,
    embeddable: embeddableMock,
    scopedHistory: (scopedHistoryMock.create() as unknown) as ScopedHistory,
  };

  return (visBuilderServicesMock as unknown) as jest.Mocked<VisBuilderServices>;
};
