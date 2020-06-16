import {Component, provide} from '@liaison/component';
import {Storable} from '@liaison/storable';
import {ComponentHTTPClient} from '@liaison/component-http-client';

import type {Movie as BackendMovie} from '../../../backend/src/components/movie';
import {Root} from './root';
import {MovieList} from './movie-list';
import {Movie} from './movie';
import {Common} from './common';

export const getFrontend = async ({backendURL}: {backendURL: string}) => {
  const client = new ComponentHTTPClient(backendURL, {mixins: [Storable]});

  const BackendMovieProxy = (await client.getComponent()) as typeof BackendMovie;

  class Frontend extends Component {
    @provide() static Root = Root;
    @provide() static MovieList = MovieList;
    @provide() static Movie = Movie(BackendMovieProxy);
    @provide() static Common = Common;
  }

  return Frontend;
};
