/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import i18n from '@/i18n';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div
          className="container container--vertical"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <h1>
            🔨
            {' '}
            {i18n.t('Something went wrong...')}
          </h1>
          <h1>
            {' '}
            {i18n.t('Please reload page')}
          </h1>
          <br />
          <br />
          <h2>
            {i18n.t('We are already working on fixing this error')}
            {' '}
            🧐
          </h2>
        </div>
      );
    }

    return children;
  }
}
