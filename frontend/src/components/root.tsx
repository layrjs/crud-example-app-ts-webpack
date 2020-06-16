import {Component, consume} from '@liaison/component';
import React from 'react';
import {view, useBrowserRouter} from '@liaison/react-integration';

import type {Common} from './common';

export class Root extends Component {
  @consume() static Frontend: typeof Component;
  @consume() static Common: typeof Common;

  @view() static Main() {
    const [router, isReady] = useBrowserRouter(this.Frontend);

    if (!isReady) {
      return null;
    }

    const content = router.callCurrentRoute({fallback: this.Common.RouteNotFound});

    return (
      <div>
        <h1>CRUD example app</h1>
        {content}
      </div>
    );
  }
}
