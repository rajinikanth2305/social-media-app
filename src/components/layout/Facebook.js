import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';

export default class Example extends Component {
  render() {
    return (
        <div>
      <FacebookProvider appId="1394716667378560">
      <ShareButton href="http://www.facebook.com">
      Share
    </ShareButton>

      </FacebookProvider>
      </div>


    );
  }
}