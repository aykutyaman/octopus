import React from 'react';

export const MeteorData = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const sub = this.props.subscribe()
      const data = this.props.fetch()
      data.loading = !sub.ready()
      return data;
  },
  render() {
    return this.props.render(this.data)
  }
});
