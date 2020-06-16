import {Component, attribute, consume} from '@liaison/component';
import {Routable, route} from '@liaison/routable';
import React from 'react';
import {view, useAsyncMemo} from '@liaison/react-integration';

import type {Movie} from './movie';
import type {Common} from './common';

export class MovieList extends Routable(Component) {
  ['constructor']!: typeof MovieList;

  @consume() static Movie: ReturnType<typeof Movie>;
  @consume() static Common: typeof Common;

  @attribute('Movie[]?') items?: InstanceType<ReturnType<typeof Movie>>[];

  @view() static Layout({children}: {children: React.ReactNode}) {
    return (
      <div>
        <h2>Movies</h2>
        {children}
      </div>
    );
  }

  @route('/movies', {aliases: ['/']}) @view() static Main() {
    const [movieList, isLoading, loadingError, retryLoading] = useAsyncMemo(async () => {
      const movieList = new this();

      movieList.items = await this.Movie.find(
        {},
        {title: true, year: true},
        {sort: {year: 'desc', title: 'asc'}}
      );

      return movieList;
    }, []);

    if (isLoading) {
      return <this.Common.LoadingMessage />;
    }

    if (loadingError || movieList === undefined) {
      return (
        <this.Common.ErrorMessage
          message="Sorry, something went wrong while loading the movies."
          onRetry={retryLoading}
        />
      );
    }

    return (
      <this.Layout>
        <movieList.Main />
      </this.Layout>
    );
  }

  @view() Main() {
    const {Movie} = this.constructor;

    return (
      <>
        <ul>
          {this.items!.map((movie) => (
            <movie.ListItem key={movie.id} />
          ))}
        </ul>
        <p>
          <button onClick={() => Movie.Creator.navigate()}>New</button>
        </p>
      </>
    );
  }
}
