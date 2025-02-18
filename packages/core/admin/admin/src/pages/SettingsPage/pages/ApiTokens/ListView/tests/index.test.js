import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useRBAC, TrackingProvider } from '@strapi/helper-plugin';
import { QueryClient, QueryClientProvider } from 'react-query';
import { lightTheme, darkTheme } from '@strapi/design-system';
import Theme from '../../../../../../components/Theme';
import ThemeToggleProvider from '../../../../../../components/ThemeToggleProvider';
import ListView from '../index';

jest.mock('@strapi/helper-plugin', () => ({
  ...jest.requireActual('@strapi/helper-plugin'),
  useNotification: jest.fn(),
  useFocusWhenNavigate: jest.fn(),
  useRBAC: jest.fn(),
  useGuidedTour: jest.fn(() => ({
    startSection: jest.fn(),
  })),
  useFetchClient: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: 'My super token',
            description: 'This describe my super token',
            type: 'read-only',
            createdAt: '2021-11-15T00:00:00.000Z',
          },
        ],
      },
    }),
  }),
}));

jest.spyOn(Date, 'now').mockImplementation(() => new Date('2015-10-01T08:00:00.000Z'));

// TO BE REMOVED: we have added this mock to prevent errors in the snapshots caused by the Unicode space character
// before AM/PM in the dates, after the introduction of node 18.13
jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl');
  const intl = reactIntl.createIntl({
    locale: 'en',
  });

  intl.formatDate = jest.fn(() => '11/15/2021');
  intl.formatTime = jest.fn(() => '12:00 AM');

  return {
    ...reactIntl,
    useIntl: () => intl,
  };
});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const makeApp = (history) => {
  return (
    <QueryClientProvider client={client}>
      <TrackingProvider>
        <IntlProvider messages={{}} defaultLocale="en" textComponent="span" locale="en">
          <ThemeToggleProvider themes={{ light: lightTheme, dark: darkTheme }}>
            <Theme>
              <Router history={history}>
                <Route path="/settings/api-tokens">
                  <ListView />
                </Route>
              </Router>
            </Theme>
          </ThemeToggleProvider>
        </IntlProvider>
      </TrackingProvider>
    </QueryClientProvider>
  );
};

describe('ADMIN | Pages | API TOKENS | ListPage', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should show a list of api tokens', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: true,
        canDelete: true,
        canRead: true,
        canUpdate: true,
        canRegenerate: true,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container, getByText } = render(app);

    await waitFor(() => {
      expect(getByText('My super token')).toBeInTheDocument();
      expect(getByText('This describe my super token')).toBeInTheDocument();
    });

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c26 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c2 {
        background: #f6f6f9;
        padding-top: 40px;
        padding-right: 56px;
        padding-bottom: 40px;
        padding-left: 56px;
      }

      .c9 {
        padding-right: 8px;
      }

      .c12 {
        padding-right: 56px;
        padding-left: 56px;
      }

      .c13 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c15 {
        position: relative;
      }

      .c17 {
        padding-right: 24px;
        padding-left: 24px;
      }

      .c30 {
        max-width: 15.625rem;
      }

      .c37 {
        padding-left: 4px;
      }

      .c3 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c4 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .c33 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: end;
        -webkit-justify-content: end;
        -ms-flex-pack: end;
        justify-content: end;
      }

      .c6 {
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
        color: #32324d;
      }

      .c10 {
        font-size: 0.75rem;
        line-height: 1.33;
        font-weight: 600;
        color: #32324d;
      }

      .c11 {
        font-size: 1rem;
        line-height: 1.5;
        color: #666687;
      }

      .c23 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
        color: #666687;
      }

      .c29 {
        font-size: 0.875rem;
        line-height: 1.43;
        font-weight: 600;
        color: #32324d;
      }

      .c31 {
        font-size: 0.875rem;
        line-height: 1.43;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #32324d;
      }

      .c32 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c36 {
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
        position: relative;
        outline: none;
      }

      .c7 svg {
        height: 12px;
        width: 12px;
      }

      .c7 svg > g,
      .c7 svg path {
        fill: #ffffff;
      }

      .c7[aria-disabled='true'] {
        pointer-events: none;
      }

      .c7:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c7:focus-visible {
        outline: none;
      }

      .c7:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c38 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c38 .c5 {
        color: #ffffff;
      }

      .c38[aria-disabled='true'] .c5 {
        color: #666687;
      }

      .c38[aria-disabled='true']:active .c5 {
        color: #666687;
      }

      .c38:active .c5 {
        color: #4945ff;
      }

      .c38 .c5 {
        color: #271fe0;
      }

      .c14 {
        overflow: hidden;
        border: 1px solid #eaeaef;
      }

      .c19 {
        width: 100%;
        white-space: nowrap;
      }

      .c16:before {
        background: linear-gradient(90deg,#c0c0cf 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        left: 0;
      }

      .c16:after {
        background: linear-gradient(270deg,#c0c0cf 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        right: 0;
        top: 0;
      }

      .c18 {
        overflow-x: auto;
      }

      .c28 tr:last-of-type {
        border-bottom: none;
      }

      .c20 {
        border-bottom: 1px solid #eaeaef;
      }

      .c21 {
        border-bottom: 1px solid #eaeaef;
      }

      .c21 td,
      .c21 th {
        padding: 16px;
      }

      .c21 td:first-of-type,
      .c21 th:first-of-type {
        padding: 0 4px;
      }

      .c21 th {
        padding-top: 0;
        padding-bottom: 0;
        height: 3.5rem;
      }

      .c22 {
        vertical-align: middle;
        text-align: left;
        color: #666687;
        outline-offset: -4px;
      }

      .c22 input {
        vertical-align: sub;
      }

      .c24 svg {
        height: 0.25rem;
      }

      .c25 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 2rem;
        width: 2rem;
        border: none;
      }

      .c25 svg > g,
      .c25 svg path {
        fill: #8e8ea9;
      }

      .c25:hover svg > g,
      .c25:hover svg path {
        fill: #666687;
      }

      .c25:active svg > g,
      .c25:active svg path {
        fill: #a5a5ba;
      }

      .c25[aria-disabled='true'] {
        background-color: #eaeaef;
      }

      .c25[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c34 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        position: relative;
        outline: none;
      }

      .c34 svg path {
        fill: #4945ff;
      }

      .c34 svg {
        font-size: 0.625rem;
      }

      .c34:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c34:focus-visible {
        outline: none;
      }

      .c34:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c8 {
        padding: 8px 16px;
        background: #4945ff;
        border: 1px solid #4945ff;
        border-radius: 4px;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .c8 .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c8 .c5 {
        color: #ffffff;
      }

      .c8[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true'] .c5 {
        color: #666687;
      }

      .c8[aria-disabled='true'] svg > g,.c8[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c8[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c8[aria-disabled='true']:active .c5 {
        color: #666687;
      }

      .c8[aria-disabled='true']:active svg > g,.c8[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c8:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c8:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c8 svg > g,
      .c8 svg path {
        fill: #ffffff;
      }

      .c27 {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .c0:focus-visible {
        outline: none;
      }

      .c35 svg path {
        fill: #8e8ea9;
      }

      .c35:hover svg path,
      .c35:focus svg path {
        fill: #32324d;
      }

      <main
        aria-busy="false"
        aria-labelledby="main-content-title"
        class="c0"
        id="main-content"
        tabindex="-1"
      >
        <div
          style="height: 0px;"
        >
          <div
            class="c1 c2"
            data-strapi-header="true"
          >
            <div
              class="c1 c3"
            >
              <div
                class="c1 c4"
              >
                <h1
                  class="c5 c6"
                >
                  API Tokens
                </h1>
              </div>
              <a
                aria-disabled="false"
                class="c7 c8"
                data-testid="create-api-token-button"
                href="/settings/api-tokens/create"
                variant="default"
              >
                <div
                  aria-hidden="true"
                  class="c1 c9"
                >
                  <svg
                    fill="none"
                    height="1em"
                    viewBox="0 0 24 24"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                      fill="#212134"
                    />
                  </svg>
                </div>
                <span
                  class="c5 c10"
                >
                  Create new API Token
                </span>
              </a>
            </div>
            <p
              class="c5 c11"
            >
              List of generated tokens to consume the API
            </p>
          </div>
        </div>
        <div
          class="c1 c12"
        >
          <div
            class="c1 c13 c14"
          >
            <div
              class="c1 c15 c16"
            >
              <div
                class="c1 c17 c18"
              >
                <table
                  aria-colcount="5"
                  aria-rowcount="2"
                  class="c19"
                  role="grid"
                >
                  <thead
                    class="c20"
                  >
                    <tr
                      aria-rowindex="1"
                      class="c1 c21"
                    >
                      <th
                        aria-colindex="1"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="0"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="0"
                              class="c5 c23"
                              label="Name"
                              tabindex="-1"
                            >
                              Name
                            </span>
                          </span>
                          <span
                            class="c24"
                          >
                            <span>
                              <button
                                aria-disabled="false"
                                aria-labelledby="1"
                                class="c7 c25"
                                tabindex="-1"
                                type="button"
                              >
                                <span
                                  class="c26"
                                >
                                  Sort on Name
                                </span>
                                <svg
                                  aria-hidden="true"
                                  class="c27"
                                  fill="none"
                                  focusable="false"
                                  height="1em"
                                  viewBox="0 0 14 8"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clip-rule="evenodd"
                                    d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                                    fill="#32324D"
                                    fill-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </span>
                          </span>
                        </div>
                      </th>
                      <th
                        aria-colindex="2"
                        class="c1 c22"
                        role="gridcell"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="2"
                              class="c5 c23"
                              label="Description"
                              tabindex="-1"
                            >
                              Description
                            </span>
                          </span>
                          <span
                            class="c24"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="3"
                        class="c1 c22"
                        role="gridcell"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="3"
                              class="c5 c23"
                              label="Created at"
                              tabindex="-1"
                            >
                              Created at
                            </span>
                          </span>
                          <span
                            class="c24"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="4"
                        class="c1 c22"
                        role="gridcell"
                      >
                        <div
                          class="c1 c4"
                        >
                          <span>
                            <span
                              aria-labelledby="4"
                              class="c5 c23"
                              label="Last used"
                              tabindex="-1"
                            >
                              Last used
                            </span>
                          </span>
                          <span
                            class="c24"
                          />
                        </div>
                      </th>
                      <th
                        aria-colindex="5"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="-1"
                      >
                        <div
                          class="c1 c4"
                        >
                          <div
                            class="c26"
                          >
                            Actions
                          </div>
                          <span
                            class="c24"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="c28"
                  >
                    <tr
                      aria-rowindex="2"
                      class="c1 c21"
                      style="cursor: pointer;"
                    >
                      <td
                        aria-colindex="1"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c29"
                        >
                          My super token
                        </span>
                      </td>
                      <td
                        aria-colindex="2"
                        class="c1 c30 c22"
                        role="gridcell"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c31"
                        >
                          This describe my super token
                        </span>
                      </td>
                      <td
                        aria-colindex="3"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="-1"
                      >
                        <span
                          class="c5 c32"
                        >
                          <time
                            datetime="2021-11-15T00:00:00.000Z"
                            title="11/15/2021 12:00 AM"
                          >
                            in 6 years
                          </time>
                        </span>
                      </td>
                      <td
                        aria-colindex="4"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="-1"
                      />
                      <td
                        aria-colindex="5"
                        class="c1 c22"
                        role="gridcell"
                        tabindex="-1"
                      >
                        <div
                          class="c1 c33"
                        >
                          <a
                            class="c34 c35"
                            href="/settings/api-tokens/1"
                            tabindex="-1"
                            title="Edit My super token"
                          >
                            <span
                              class="c5 c36"
                            >
                              <svg
                                fill="none"
                                height="1em"
                                viewBox="0 0 24 24"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  clip-rule="evenodd"
                                  d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                                  fill="#212134"
                                  fill-rule="evenodd"
                                />
                              </svg>
                            </span>
                          </a>
                          <div
                            aria-hidden="true"
                            class="c1 c37"
                            role="button"
                          >
                            <span>
                              <button
                                aria-disabled="false"
                                aria-labelledby="5"
                                class="c7 c25"
                                name="delete"
                                tabindex="-1"
                                type="button"
                              >
                                <span
                                  class="c26"
                                >
                                  Delete My super token
                                </span>
                                <svg
                                  aria-hidden="true"
                                  fill="none"
                                  focusable="false"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.236 6.149a.2.2 0 00-.197.233L6 24h12l2.96-17.618a.2.2 0 00-.196-.233H3.236zM21.8 1.983c.11 0 .2.09.2.2v1.584a.2.2 0 01-.2.2H2.2a.2.2 0 01-.2-.2V2.183c0-.11.09-.2.2-.2h5.511c.9 0 1.631-1.09 1.631-1.983h5.316c0 .894.73 1.983 1.631 1.983H21.8z"
                                    fill="#32324D"
                                  />
                                </svg>
                              </button>
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    `);
  });

  it('should not show the create button when the user does not have the rights to create', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: true,
        canRegenerate: true,
      },
    }));

    const history = createMemoryHistory();
    const app = makeApp(history);

    const { queryByTestId } = render(app);

    await waitFor(() => expect(queryByTestId('create-api-token-button')).not.toBeInTheDocument());
  });

  it('should show the delete button when the user have the rights to delete', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: false,
        canRegenerate: false,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container } = render(app);

    await waitFor(() => {
      expect(container.querySelector('button[name="delete"]')).toBeInTheDocument();
    });
  });

  it('should show the read button when the user have the rights to read and not to update', async () => {
    useRBAC.mockImplementation(() => ({
      allowedActions: {
        canCreate: false,
        canDelete: true,
        canRead: true,
        canUpdate: false,
        canRegenerate: false,
      },
    }));
    const history = createMemoryHistory();
    history.push('/settings/api-tokens');
    const app = makeApp(history);

    const { container } = render(app);

    await waitFor(() => {
      expect(container.querySelector('a[title*="Read"]')).toBeInTheDocument();
    });
  });
});
