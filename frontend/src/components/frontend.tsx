import {Component, provide} from '@liaison/component';
import {Storable} from '@liaison/storable';
import {ComponentHTTPClient} from '@liaison/component-http-client';
import React from 'react';
import {view, useBrowserRouter} from '@liaison/react-integration';

import type {Movie as BackendMovie} from '../../../backend/src/components/movie';
import {MovieList} from './movie-list';
import {Movie} from './movie';
import {Common} from './common';

export const getFrontend = async ({backendURL}: {backendURL: string}) => {
  const client = new ComponentHTTPClient(backendURL, {mixins: [Storable]});

  const BackendMovieProxy = (await client.getComponent()) as typeof BackendMovie;

  class Frontend extends Component {
    @provide() static MovieList = MovieList;
    @provide() static Movie = Movie(BackendMovieProxy);
    @provide() static Common = Common;

    @view() static Main() {
      const [router, isReady] = useBrowserRouter(this);

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

  return Frontend;
};
