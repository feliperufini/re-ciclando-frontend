import React, { Component } from 'react';
import Router from 'next/router';
import UserService from '../services/UserService';
import DesktopMenu from '../components/DesktopMenu';
import HeaderNavbar from '../components/HeaderNavbar';

export default function withAuth(AuthComponent) {
  const userService = new UserService()
  return class Authenticated extends Component {

    static async getInitialProps(ctx) {
      // Ensures material-ui renders the correct css prefixes server-side
      let userAgent
      if (typeof window !== 'undefined') {
        userAgent = navigator.userAgent
      } else {
        userAgent = ctx.req.headers['user-agent']
      }

      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
      // Return props.
      return { ...pageProps, userAgent }
    }

    componentDidMount() {
      if (!userService.isAuthenticated()) {
        Router.push('/')
      }
    }

    render() {
      return (
        <div className="flex h-screen bg-green-100">
          <DesktopMenu />
          <div className="flex flex-col flex-1">
            <HeaderNavbar />
            <main className="h-full pb-8 overflow-y-auto">
              <AuthComponent {...this.props} auth={userService} />
            </main>
          </div >
        </div >
      )
    }
  }
}