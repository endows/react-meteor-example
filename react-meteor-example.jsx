var App = React.createClass({
  render () {
    return (
      <div><img src='http://lohas.nicoseiga.jp/thumb/4521080i?'/>Hello worldですぅ!!!!</div>
    );
  }
});

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
  });
}
