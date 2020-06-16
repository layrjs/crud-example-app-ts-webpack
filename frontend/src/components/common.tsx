import {Component} from '@liaison/component';
import React from 'react';
import {view, useDelay} from '@liaison/react-integration';

export class Common extends Component {
  @view() static LoadingMessage() {
    return (
      <this.Delayed>
        <div>Loading...</div>
      </this.Delayed>
    );
  }

  @view() static ErrorMessage({
    message = 'Sorry, something went wrong.',
    onRetry
  }: {
    message: string;
    onRetry: Function;
  }) {
    return (
      <div>
        <p>{message}</p>
        <p>
          <button onClick={() => onRetry()}>Retry</button>
        </p>
      </div>
    );
  }

  @view() static RouteNotFound() {
    return <div>Sorry, there is nothing here.</div>;
  }

  @view() static Delayed({
    duration = 200,
    children
  }: {
    duration?: number;
    children: React.ReactNode;
  }) {
    const [isElapsed] = useDelay(duration);

    if (isElapsed) {
      return <>{children}</>;
    }

    return null;
  }
}
