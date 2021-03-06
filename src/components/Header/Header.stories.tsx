import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Header } from '@comp/Header';

export default {
  title: 'Header',
};

export const Default = () => (
  <MemoryRouter initialEntries={['/auth/login']}>
    <Route
      component={Header}
      path="/auth/:id"
    />
  </MemoryRouter>
);
