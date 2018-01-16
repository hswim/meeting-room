import React from 'react';

export default class Post extends React.Component {
   
    constructor(props) {
        super(props);
    }
    
    render() {
      return (
        <div>
            <textarea placeholder="write something..." />
        </div>
      );
    }
}

